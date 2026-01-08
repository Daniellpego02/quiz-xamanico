/**
 * useTrackingState Hook
 * 
 * React hook for managing advanced tracking state across components.
 * Provides reactive access to lead scoring, quiz answers, and tracking state.
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  TrackingState,
  QuizAnswerData,
  getTrackingState,
  getLeadSegment,
  calculateLeadScore,
  getAnswerScore,
  trackQuizAnswerWithScore,
  trackLeadWithValue,
  trackCompleteRegistration,
  trackCTAClick,
  trackOfferView,
  trackInitiateCheckout,
  trackPurchase,
  trackUpsellView,
  trackDownsellView,
  trackPageView,
  setClarityTag,
} from '../utils/advancedTracking';

export interface UseTrackingStateReturn {
  // State
  state: TrackingState;
  leadScore: number;
  leadSegment: { name: string; value: number };
  quizAnswers: QuizAnswerData[];
  sessionId: string;
  userId: string;
  
  // Actions
  trackQuizAnswer: (data: {
    questionId: number;
    questionTitle: string;
    answerValue: string;
    answerLabel: string;
    quizPath: string;
  }) => void;
  trackLead: (params?: { content_name?: string; userName?: string }) => string;
  trackCompleteRegistration: (params?: { content_name?: string; path?: string; userName?: string }) => string;
  trackCTAClick: (ctaName: string) => string;
  trackOfferView: (offerName: string, offerValue: number) => string;
  trackInitiateCheckout: (params: { content_name: string; value: number }) => string;
  trackPurchase: (params: { content_name: string; value: number; transaction_id?: string }) => string;
  trackUpsellView: (upsellName: string) => string;
  trackDownsellView: (downsellName: string) => string;
  trackPageView: (pageName: string) => void;
  
  // Utilities
  getAnswerScore: (answerValue: string) => number;
  setClarityTag: (key: string, value: string) => void;
  refreshState: () => void;
}

/**
 * Hook to manage tracking state in React components
 */
export function useTrackingState(): UseTrackingStateReturn {
  const [state, setState] = useState<TrackingState>(() => getTrackingState());
  
  // Refresh state from storage
  const refreshState = useCallback(() => {
    const currentState = getTrackingState();
    setState(currentState);
  }, []);
  
  // Initialize tracking on mount
  useEffect(() => {
    refreshState();
    
    // Set up storage event listener for cross-tab sync
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'advanced_tracking_state') {
        refreshState();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshState]);
  
  // Computed values
  const leadScore = useMemo(() => calculateLeadScore(state.quizAnswers), [state.quizAnswers]);
  const leadSegment = useMemo(() => getLeadSegment(leadScore), [leadScore]);
  
  // Track quiz answer and update state
  const handleTrackQuizAnswer = useCallback((data: {
    questionId: number;
    questionTitle: string;
    answerValue: string;
    answerLabel: string;
    quizPath: string;
  }) => {
    trackQuizAnswerWithScore(data, state);
    refreshState();
  }, [state, refreshState]);
  
  // Track lead event
  const handleTrackLead = useCallback((params?: { content_name?: string; userName?: string }) => {
    const eventId = trackLeadWithValue(params || {}, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track complete registration
  const handleTrackCompleteRegistration = useCallback((params?: { content_name?: string; path?: string; userName?: string }) => {
    const eventId = trackCompleteRegistration(params || {}, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track CTA click
  const handleTrackCTAClick = useCallback((ctaName: string) => {
    const eventId = trackCTAClick(ctaName, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track offer view
  const handleTrackOfferView = useCallback((offerName: string, offerValue: number) => {
    const eventId = trackOfferView(offerName, offerValue, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track initiate checkout
  const handleTrackInitiateCheckout = useCallback((params: { content_name: string; value: number }) => {
    const eventId = trackInitiateCheckout(params, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track purchase
  const handleTrackPurchase = useCallback((params: { content_name: string; value: number; transaction_id?: string }) => {
    const eventId = trackPurchase(params, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track upsell view
  const handleTrackUpsellView = useCallback((upsellName: string) => {
    const eventId = trackUpsellView(upsellName, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track downsell view
  const handleTrackDownsellView = useCallback((downsellName: string) => {
    const eventId = trackDownsellView(downsellName, state);
    refreshState();
    return eventId;
  }, [state, refreshState]);
  
  // Track page view
  const handleTrackPageView = useCallback((pageName: string) => {
    trackPageView(pageName, state);
    refreshState();
  }, [state, refreshState]);
  
  return {
    // State
    state,
    leadScore,
    leadSegment,
    quizAnswers: state.quizAnswers,
    sessionId: state.sessionId,
    userId: state.userId,
    
    // Actions
    trackQuizAnswer: handleTrackQuizAnswer,
    trackLead: handleTrackLead,
    trackCompleteRegistration: handleTrackCompleteRegistration,
    trackCTAClick: handleTrackCTAClick,
    trackOfferView: handleTrackOfferView,
    trackInitiateCheckout: handleTrackInitiateCheckout,
    trackPurchase: handleTrackPurchase,
    trackUpsellView: handleTrackUpsellView,
    trackDownsellView: handleTrackDownsellView,
    trackPageView: handleTrackPageView,
    
    // Utilities
    getAnswerScore,
    setClarityTag,
    refreshState,
  };
}

export default useTrackingState;
