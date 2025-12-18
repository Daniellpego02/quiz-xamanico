import { useEffect } from 'react';

/**
 * Anti-Plagiarism Protection Component
 * 
 * Implements comprehensive content protection measures:
 * - Disables right-click context menu
 * - Disables text selection on protected content
 * - Blocks common developer tool shortcuts
 * - Prevents printing and screenshots where possible
 * - Detects and warns about DevTools
 */
export const AntiPlagiarismProtection = () => {
  useEffect(() => {
    // Disable right-click context menu globally
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts for developer tools and screenshots
    const handleKeyDown = (e: KeyboardEvent) => {
      // F12 - DevTools
      if (e.key === 'F12') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I - DevTools
      // Ctrl+Shift+J - Console
      // Ctrl+Shift+C - Inspect Element
      if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U - View Source
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+S - Save Page
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+P - Print
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        return false;
      }
      
      // Print Screen key
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        // Clear clipboard on print screen attempt
        navigator.clipboard.writeText('').catch(() => {
          // Silently fail if clipboard access is denied
        });
        return false;
      }
      
      // Cmd+Option+I on Mac (DevTools)
      if (e.metaKey && e.altKey && e.key === 'i') {
        e.preventDefault();
        return false;
      }
      
      // Cmd+Option+J on Mac (Console)
      if (e.metaKey && e.altKey && e.key === 'j') {
        e.preventDefault();
        return false;
      }
      
      // Cmd+Option+C on Mac (Inspect Element)
      if (e.metaKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        return false;
      }

      return true;
    };

    // Disable drag and drop for images and other content
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Disable copy/cut
    const handleCopy = (e: ClipboardEvent) => {
      const selection = window.getSelection();
      const target = e.target as HTMLElement;
      
      // Allow copy on input/textarea fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true;
      }
      
      // Prevent copying of other content
      if (selection && selection.toString()) {
        e.preventDefault();
        return false;
      }
      
      return true;
    };

    // DevTools detection
    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold = window.outerHeight - window.innerHeight > threshold;
      
      if (widthThreshold || heightThreshold) {
        // DevTools is likely open
        console.clear();
        console.log('%cAVISO DE SEGURANÇA', 'color: red; font-size: 20px; font-weight: bold;');
        console.log('%cEste conteúdo é protegido por direitos autorais.', 'color: red; font-size: 14px;');
        console.log('%cQualquer tentativa de copiar, reproduzir ou distribuir este conteúdo sem autorização é ilegal.', 'color: red; font-size: 14px;');
      }
    };

    // Check for DevTools periodically
    const devToolsInterval = setInterval(detectDevTools, 1000);

    // Disable console methods to prevent debugging in production
    if (import.meta.env.PROD) {
      const noop = () => {};
      ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace'].forEach(method => {
        (console as any)[method] = noop;
      });
    }

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);

    // Disable image dragging specifically
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.setAttribute('draggable', 'false');
      img.style.userSelect = 'none';
      img.style.webkitUserSelect = 'none';
      (img.style as any).MozUserSelect = 'none';
    });

    // Add CSS to prevent selection on body
    const style = document.createElement('style');
    style.innerHTML = `
      .no-select {
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        user-select: none !important;
        -webkit-touch-callout: none !important;
      }
      
      img, video {
        -webkit-user-drag: none !important;
        -khtml-user-drag: none !important;
        -moz-user-drag: none !important;
        -o-user-drag: none !important;
        user-drag: none !important;
        pointer-events: none !important;
      }
      
      /* Allow pointer events on video controls */
      video::-webkit-media-controls,
      video::-webkit-media-controls-enclosure {
        pointer-events: auto !important;
      }
      
      /* Watermark for protection */
      body::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        background: repeating-linear-gradient(
          45deg,
          transparent,
          transparent 200px,
          rgba(0, 0, 0, 0.01) 200px,
          rgba(0, 0, 0, 0.01) 220px
        );
      }
    `;
    document.head.appendChild(style);

    // Warning on page unload attempt
    const handleBeforeUnload = () => {
      // This is mainly for protection awareness
      return undefined;
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(devToolsInterval);
      style.remove();
    };
  }, []);

  return null; // This component doesn't render anything
};

export default AntiPlagiarismProtection;
