/**
 * VTurb Video Tracking Component
 * 
 * This component wraps a VTurb video iframe and implements
 * advanced tracking for video engagement milestones.
 * 
 * Usage:
 * <VTurbTracker
 *   videoId="YOUR_VTURB_VIDEO_ID"
 *   pitchTimeSeconds={930} // 15m 30s - when the pitch/offer is made
 * />
 */

import React, { useEffect, useRef, useCallback } from 'react';
import {
  resetVideoTracking,
  trackVideoProgress,
  trackVideoPlay,
  trackVideoPause,
  trackVideoComplete,
  getTrackingState,
} from '../utils/advancedTracking';
import { VTURB_API_TOKEN, VTURB_EMBED_BASE_URL } from '../config/tracking.config';

interface VTurbTrackerProps {
  videoId: string;
  pitchTimeSeconds?: number;
  className?: string;
  width?: string | number;
  height?: string | number;
  autoplay?: boolean;
  muted?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  onPitchViewed?: () => void;
  /** Custom API token (optional, uses config default) */
  apiToken?: string;
}

interface VTurbMessage {
  type: string;
  event?: string;
  currentTime?: number;
  duration?: number;
  percent?: number;
}

export const VTurbTracker: React.FC<VTurbTrackerProps> = ({
  videoId,
  pitchTimeSeconds,
  className = '',
  width = '100%',
  height = '100%',
  autoplay = false,
  muted = false,
  onPlay,
  onPause,
  onComplete,
  onPitchViewed,
  apiToken = VTURB_API_TOKEN,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const pitchTrackedRef = useRef(false);
  const lastTimeRef = useRef(0);
  const durationRef = useRef(0);
  
  // Reset tracking state when component mounts
  useEffect(() => {
    resetVideoTracking();
    pitchTrackedRef.current = false;
    
    return () => {
      // Cleanup on unmount
    };
  }, [videoId]);
  
  // Handle messages from VTurb player iframe
  const handleMessage = useCallback((event: MessageEvent) => {
    // Verify the message is from VTurb
    if (!event.origin.includes('vturb') && !event.origin.includes('cdn')) {
      return;
    }
    
    let data: VTurbMessage;
    
    try {
      // VTurb sends messages as strings or objects
      if (typeof event.data === 'string') {
        data = JSON.parse(event.data);
      } else {
        data = event.data;
      }
    } catch {
      return;
    }
    
    const state = getTrackingState();
    
    // Handle different VTurb events
    switch (data.type || data.event) {
      case 'play':
      case 'vturb_play':
        trackVideoPlay(state);
        onPlay?.();
        break;
        
      case 'pause':
      case 'vturb_pause':
        if (durationRef.current > 0) {
          trackVideoPause(lastTimeRef.current, durationRef.current, state);
        }
        onPause?.();
        break;
        
      case 'ended':
      case 'complete':
      case 'vturb_ended':
        trackVideoComplete(state);
        onComplete?.();
        break;
        
      case 'timeupdate':
      case 'vturb_timeupdate':
        if (data.currentTime !== undefined && data.duration !== undefined) {
          lastTimeRef.current = data.currentTime;
          durationRef.current = data.duration;
          
          // Track video progress milestones
          trackVideoProgress(
            data.currentTime,
            data.duration,
            state,
            pitchTimeSeconds
          );
          
          // Check for pitch time
          if (
            pitchTimeSeconds &&
            !pitchTrackedRef.current &&
            data.currentTime >= pitchTimeSeconds
          ) {
            pitchTrackedRef.current = true;
            onPitchViewed?.();
          }
        }
        break;
        
      case 'progress':
      case 'vturb_progress':
        // Alternative progress event format
        if (data.percent !== undefined && data.duration !== undefined) {
          const currentTime = (data.percent / 100) * data.duration;
          lastTimeRef.current = currentTime;
          durationRef.current = data.duration;
          
          trackVideoProgress(
            currentTime,
            data.duration,
            state,
            pitchTimeSeconds
          );
        }
        break;
    }
  }, [pitchTimeSeconds, onPlay, onPause, onComplete, onPitchViewed]);
  
  // Set up message listener
  useEffect(() => {
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);
  
  // Build VTurb embed URL with parameters
  const embedUrl = React.useMemo(() => {
    const params = new URLSearchParams();
    if (autoplay) params.set('autoplay', '1');
    if (muted) params.set('muted', '1');
    params.set('api', '1'); // Enable API for tracking
    if (apiToken) params.set('token', apiToken); // Add API token for enhanced tracking
    
    const queryString = params.toString();
    return `${VTURB_EMBED_BASE_URL}/${videoId}/embed.html${queryString ? '?' + queryString : ''}`;
  }, [videoId, autoplay, muted, apiToken]);
  
  return (
    <div className={`vturb-tracker-container ${className}`} style={{ width, height }}>
      <iframe
        ref={iframeRef}
        src={embedUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: 'none' }}
        title="VTurb Video Player"
      />
    </div>
  );
};

/**
 * Hook for manual VTurb tracking (when using your own iframe)
 */
export function useVTurbTracking(pitchTimeSeconds?: number) {
  const pitchTrackedRef = useRef(false);
  
  useEffect(() => {
    resetVideoTracking();
    pitchTrackedRef.current = false;
  }, []);
  
  const handleTimeUpdate = useCallback((currentTime: number, duration: number) => {
    const state = getTrackingState();
    trackVideoProgress(currentTime, duration, state, pitchTimeSeconds);
    
    if (
      pitchTimeSeconds &&
      !pitchTrackedRef.current &&
      currentTime >= pitchTimeSeconds
    ) {
      pitchTrackedRef.current = true;
      return true; // Pitch was viewed
    }
    
    return false;
  }, [pitchTimeSeconds]);
  
  const handlePlay = useCallback(() => {
    const state = getTrackingState();
    trackVideoPlay(state);
  }, []);
  
  const handlePause = useCallback((currentTime: number, duration: number) => {
    const state = getTrackingState();
    trackVideoPause(currentTime, duration, state);
  }, []);
  
  const handleComplete = useCallback(() => {
    const state = getTrackingState();
    trackVideoComplete(state);
  }, []);
  
  return {
    handleTimeUpdate,
    handlePlay,
    handlePause,
    handleComplete,
    resetTracking: () => {
      resetVideoTracking();
      pitchTrackedRef.current = false;
    },
  };
}

export default VTurbTracker;
