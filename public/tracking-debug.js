(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    maxEvents: 50,
    autoExpand: false,
    position: 'bottom-right',
    theme: {
      primary: '#FFD700',
      secondary: '#FFA500',
      background: '#1a1a1a',
      surface: '#2d2d2d',
      text: '#ffffff',
      textMuted: '#a0a0a0',
      success: '#4ade80',
      error: '#f87171',
      warning: '#fbbf24'
    }
  };

  // State management
  const state = {
    events: [],
    isVisible: true,
    isMinimized: false,
    activeTab: 'events',
    pixelStatus: {
      metaPixel: false,
      ga4: false,
      clarity: false
    }
  };

  // Create debug panel
  function createDebugPanel() {
    const panel = document.createElement('div');
    panel.id = 'tracking-debug-panel';
    panel.innerHTML = `
      <style>
        #tracking-debug-panel {
          position: fixed;
          ${CONFIG.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
          ${CONFIG.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
          width: 420px;
          max-height: 600px;
          background: ${CONFIG.theme.background};
          border: 2px solid ${CONFIG.theme.primary};
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(255, 215, 0, 0.3);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          z-index: 999999;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        #tracking-debug-panel.minimized {
          max-height: 50px;
        }

        .debug-header {
          background: linear-gradient(135deg, ${CONFIG.theme.primary}, ${CONFIG.theme.secondary});
          color: ${CONFIG.theme.background};
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: move;
          user-select: none;
          font-weight: bold;
          font-size: 14px;
        }

        .debug-header-title {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .debug-header-controls {
          display: flex;
          gap: 8px;
        }

        .debug-btn {
          background: rgba(0, 0, 0, 0.3);
          border: none;
          color: ${CONFIG.theme.background};
          width: 24px;
          height: 24px;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: background 0.2s;
        }

        .debug-btn:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .debug-tabs {
          display: flex;
          background: ${CONFIG.theme.surface};
          border-bottom: 1px solid ${CONFIG.theme.primary};
        }

        .debug-tab {
          flex: 1;
          padding: 10px;
          background: transparent;
          border: none;
          color: ${CONFIG.theme.textMuted};
          cursor: pointer;
          font-size: 12px;
          font-weight: 500;
          transition: all 0.2s;
          border-bottom: 3px solid transparent;
        }

        .debug-tab:hover {
          color: ${CONFIG.theme.primary};
        }

        .debug-tab.active {
          color: ${CONFIG.theme.primary};
          border-bottom-color: ${CONFIG.theme.primary};
        }

        .debug-content {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
          font-size: 11px;
          color: ${CONFIG.theme.text};
        }

        .debug-content::-webkit-scrollbar {
          width: 8px;
        }

        .debug-content::-webkit-scrollbar-track {
          background: ${CONFIG.theme.background};
        }

        .debug-content::-webkit-scrollbar-thumb {
          background: ${CONFIG.theme.primary};
          border-radius: 4px;
        }

        .debug-section {
          display: none;
        }

        .debug-section.active {
          display: block;
        }

        .status-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .status-card {
          background: ${CONFIG.theme.surface};
          padding: 12px;
          border-radius: 8px;
          border-left: 4px solid ${CONFIG.theme.textMuted};
        }

        .status-card.active {
          border-left-color: ${CONFIG.theme.success};
        }

        .status-card-title {
          font-size: 10px;
          color: ${CONFIG.theme.textMuted};
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 4px;
        }

        .status-card-value {
          font-size: 14px;
          font-weight: bold;
          color: ${CONFIG.theme.text};
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: ${CONFIG.theme.error};
          animation: pulse 2s infinite;
        }

        .status-indicator.active {
          background: ${CONFIG.theme.success};
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .event-item {
          background: ${CONFIG.theme.surface};
          margin-bottom: 8px;
          border-radius: 6px;
          border-left: 4px solid ${CONFIG.theme.primary};
          overflow: hidden;
          transition: all 0.2s;
        }

        .event-item:hover {
          box-shadow: 0 2px 8px rgba(255, 215, 0, 0.2);
        }

        .event-header {
          padding: 10px 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .event-title {
          font-weight: bold;
          color: ${CONFIG.theme.primary};
          font-size: 12px;
        }

        .event-meta {
          display: flex;
          gap: 8px;
          align-items: center;
          font-size: 10px;
          color: ${CONFIG.theme.textMuted};
        }

        .event-type-badge {
          background: ${CONFIG.theme.primary};
          color: ${CONFIG.theme.background};
          padding: 2px 6px;
          border-radius: 3px;
          font-size: 9px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .event-type-badge.meta { background: #1877f2; }
        .event-type-badge.ga4 { background: #e37400; }
        .event-type-badge.clarity { background: #0078d4; }

        .event-details {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .event-details.expanded {
          max-height: 400px;
        }

        .event-details-content {
          padding: 12px;
          background: rgba(0, 0, 0, 0.3);
          border-top: 1px solid rgba(255, 215, 0, 0.2);
        }

        .event-details pre {
          margin: 0;
          white-space: pre-wrap;
          word-wrap: break-word;
          color: ${CONFIG.theme.text};
          font-size: 10px;
          line-height: 1.5;
        }

        .data-item {
          background: ${CONFIG.theme.surface};
          padding: 8px 12px;
          margin-bottom: 6px;
          border-radius: 4px;
          border-left: 3px solid ${CONFIG.theme.secondary};
        }

        .data-item-key {
          color: ${CONFIG.theme.primary};
          font-weight: bold;
          margin-bottom: 4px;
          font-size: 11px;
        }

        .data-item-value {
          color: ${CONFIG.theme.text};
          word-break: break-all;
          font-size: 10px;
          font-family: 'Courier New', monospace;
        }

        .empty-state {
          text-align: center;
          padding: 40px 20px;
          color: ${CONFIG.theme.textMuted};
        }

        .empty-state-icon {
          font-size: 48px;
          margin-bottom: 12px;
          opacity: 0.3;
        }

        .clear-btn {
          background: ${CONFIG.theme.error};
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 11px;
          font-weight: bold;
          margin-top: 8px;
          transition: all 0.2s;
        }

        .clear-btn:hover {
          opacity: 0.8;
          transform: translateY(-1px);
        }

        .timestamp {
          color: ${CONFIG.theme.textMuted};
          font-size: 9px;
        }
      </style>

      <div class="debug-header">
        <div class="debug-header-title">
          <span>✨</span>
          <span>Tracking Debug Panel</span>
        </div>
        <div class="debug-header-controls">
          <button class="debug-btn" id="minimize-btn" title="Minimize">−</button>
          <button class="debug-btn" id="close-btn" title="Close">×</button>
        </div>
      </div>

      <div class="debug-tabs">
        <button class="debug-tab active" data-tab="events">Events</button>
        <button class="debug-tab" data-tab="status">Status</button>
        <button class="debug-tab" data-tab="storage">Storage</button>
        <button class="debug-tab" data-tab="cookies">Cookies</button>
      </div>

      <div class="debug-content">
        <!-- Events Tab -->
        <div class="debug-section active" id="events-section">
          <div id="events-list"></div>
          <div id="events-empty" class="empty-state">
            <div class="empty-state-icon">📊</div>
            <div>No events captured yet</div>
            <div style="font-size: 10px; margin-top: 8px;">Tracking events will appear here in real-time</div>
          </div>
        </div>

        <!-- Status Tab -->
        <div class="debug-section" id="status-section">
          <div class="status-grid">
            <div class="status-card" id="status-meta">
              <div class="status-card-title">Meta Pixel</div>
              <div class="status-card-value">
                <span class="status-indicator"></span>
                <span>Inactive</span>
              </div>
            </div>
            <div class="status-card" id="status-ga4">
              <div class="status-card-title">Google Analytics 4</div>
              <div class="status-card-value">
                <span class="status-indicator"></span>
                <span>Inactive</span>
              </div>
            </div>
            <div class="status-card" id="status-clarity">
              <div class="status-card-title">Microsoft Clarity</div>
              <div class="status-card-value">
                <span class="status-indicator"></span>
                <span>Inactive</span>
              </div>
            </div>
            <div class="status-card">
              <div class="status-card-title">Total Events</div>
              <div class="status-card-value">
                <span style="color: ${CONFIG.theme.primary};">📈</span>
                <span id="total-events">0</span>
              </div>
            </div>
          </div>
          <div id="status-details"></div>
        </div>

        <!-- Storage Tab -->
        <div class="debug-section" id="storage-section">
          <div id="storage-list"></div>
        </div>

        <!-- Cookies Tab -->
        <div class="debug-section" id="cookies-section">
          <div id="cookies-list"></div>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
    attachEventListeners();
    makeElementDraggable(panel);
  }

  // Make panel draggable
  function makeElementDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const header = element.querySelector('.debug-header');

    header.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      element.style.top = (element.offsetTop - pos2) + "px";
      element.style.left = (element.offsetLeft - pos1) + "px";
      element.style.bottom = 'auto';
      element.style.right = 'auto';
    }

    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Attach event listeners
  function attachEventListeners() {
    // Tab switching
    document.querySelectorAll('.debug-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;
        switchTab(tabName);
      });
    });

    // Minimize button
    document.getElementById('minimize-btn').addEventListener('click', () => {
      state.isMinimized = !state.isMinimized;
      const panel = document.getElementById('tracking-debug-panel');
      panel.classList.toggle('minimized');
      document.getElementById('minimize-btn').textContent = state.isMinimized ? '+' : '−';
    });

    // Close button
    document.getElementById('close-btn').addEventListener('click', () => {
      document.getElementById('tracking-debug-panel').remove();
    });
  }

  // Switch tabs
  function switchTab(tabName) {
    state.activeTab = tabName;

    // Update tab buttons
    document.querySelectorAll('.debug-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update sections
    document.querySelectorAll('.debug-section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(`${tabName}-section`).classList.add('active');

    // Refresh content
    if (tabName === 'storage') updateStorageView();
    if (tabName === 'cookies') updateCookiesView();
    if (tabName === 'status') updateStatusView();
  }

  // Add event to list
  function addEvent(eventData) {
    const event = {
      ...eventData,
      timestamp: new Date().toISOString(),
      id: Date.now() + Math.random()
    };

    state.events.unshift(event);
    if (state.events.length > CONFIG.maxEvents) {
      state.events = state.events.slice(0, CONFIG.maxEvents);
    }

    updateEventsView();
    updateStatusView();
  }

  // Update events view
  function updateEventsView() {
    const eventsList = document.getElementById('events-list');
    const eventsEmpty = document.getElementById('events-empty');
    const totalEventsEl = document.getElementById('total-events');

    if (state.events.length === 0) {
      eventsList.style.display = 'none';
      eventsEmpty.style.display = 'block';
      totalEventsEl.textContent = '0';
      return;
    }

    eventsList.style.display = 'block';
    eventsEmpty.style.display = 'none';
    totalEventsEl.textContent = state.events.length;

    eventsList.innerHTML = state.events.map(event => `
      <div class="event-item">
        <div class="event-header" onclick="this.nextElementSibling.classList.toggle('expanded')">
          <div>
            <div class="event-title">${escapeHtml(event.name)}</div>
            <div class="timestamp">${formatTimestamp(event.timestamp)}</div>
          </div>
          <div class="event-meta">
            <span class="event-type-badge ${event.type}">${event.type.toUpperCase()}</span>
          </div>
        </div>
        <div class="event-details">
          <div class="event-details-content">
            <pre>${JSON.stringify(event.data, null, 2)}</pre>
          </div>
        </div>
      </div>
    `).join('');

    // Add clear button
    if (!document.getElementById('clear-events-btn')) {
      const clearBtn = document.createElement('button');
      clearBtn.id = 'clear-events-btn';
      clearBtn.className = 'clear-btn';
      clearBtn.textContent = 'Clear All Events';
      clearBtn.onclick = () => {
        state.events = [];
        updateEventsView();
      };
      eventsList.appendChild(clearBtn);
    }
  }

  // Update status view
  function updateStatusView() {
    // Update pixel status cards
    ['meta', 'ga4', 'clarity'].forEach(type => {
      const card = document.getElementById(`status-${type}`);
      const isActive = state.pixelStatus[type === 'meta' ? 'metaPixel' : type];
      const indicator = card.querySelector('.status-indicator');
      const text = card.querySelector('.status-card-value span:last-child');
      
      if (isActive) {
        card.classList.add('active');
        indicator.classList.add('active');
        text.textContent = 'Active';
      } else {
        card.classList.remove('active');
        indicator.classList.remove('active');
        text.textContent = 'Inactive';
      }
    });

    // Update status details
    const statusDetails = document.getElementById('status-details');
    const metaEvents = state.events.filter(e => e.type === 'meta').length;
    const ga4Events = state.events.filter(e => e.type === 'ga4').length;
    const clarityEvents = state.events.filter(e => e.type === 'clarity').length;

    statusDetails.innerHTML = `
      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid ${CONFIG.theme.surface};">
        <div style="color: ${CONFIG.theme.textMuted}; font-size: 10px; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Event Breakdown</div>
        ${metaEvents > 0 ? `<div class="data-item"><div class="data-item-key">Meta Pixel Events</div><div class="data-item-value">${metaEvents}</div></div>` : ''}
        ${ga4Events > 0 ? `<div class="data-item"><div class="data-item-key">GA4 Events</div><div class="data-item-value">${ga4Events}</div></div>` : ''}
        ${clarityEvents > 0 ? `<div class="data-item"><div class="data-item-key">Clarity Events</div><div class="data-item-value">${clarityEvents}</div></div>` : ''}
      </div>
    `;
  }

  // Update storage view
  function updateStorageView() {
    const storageList = document.getElementById('storage-list');
    const items = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      items.push({ key, value });
    }

    if (items.length === 0) {
      storageList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📦</div><div>No localStorage data</div></div>';
      return;
    }

    storageList.innerHTML = items.map(item => `
      <div class="data-item">
        <div class="data-item-key">${escapeHtml(item.key)}</div>
        <div class="data-item-value">${escapeHtml(item.value)}</div>
      </div>
    `).join('');
  }

  // Update cookies view
  function updateCookiesView() {
    const cookiesList = document.getElementById('cookies-list');
    const cookies = document.cookie.split(';').map(c => {
      const [key, ...valueParts] = c.trim().split('=');
      return { key, value: valueParts.join('=') };
    }).filter(c => c.key);

    if (cookies.length === 0) {
      cookiesList.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🍪</div><div>No cookies found</div></div>';
      return;
    }

    cookiesList.innerHTML = cookies.map(cookie => `
      <div class="data-item">
        <div class="data-item-key">${escapeHtml(cookie.key)}</div>
        <div class="data-item-value">${escapeHtml(decodeURIComponent(cookie.value))}</div>
      </div>
    `).join('');
  }

  // Utility functions
  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleTimeString() + '.' + String(date.getMilliseconds()).padStart(3, '0');
  }

  // Intercept Meta Pixel events
  function interceptMetaPixel() {
    const originalFbq = window.fbq;
    if (originalFbq) {
      state.pixelStatus.metaPixel = true;
      window.fbq = function(...args) {
        const [command, eventName, data] = args;
        if (command === 'track' || command === 'trackCustom') {
          addEvent({
            type: 'meta',
            name: eventName,
            data: data || {},
            command
          });
        }
        return originalFbq.apply(this, args);
      };
      // Copy properties
      Object.keys(originalFbq).forEach(key => {
        window.fbq[key] = originalFbq[key];
      });
    } else {
      // Set up listener for when fbq loads
      Object.defineProperty(window, 'fbq', {
        configurable: true,
        enumerable: true,
        get() {
          return this._fbq;
        },
        set(value) {
          this._fbq = value;
          state.pixelStatus.metaPixel = true;
          interceptMetaPixel();
        }
      });
    }
  }

  // Intercept GA4 events
  function interceptGA4() {
    const originalGtag = window.gtag;
    if (originalGtag) {
      state.pixelStatus.ga4 = true;
      window.gtag = function(...args) {
        const [command, ...params] = args;
        if (command === 'event') {
          const [eventName, data] = params;
          addEvent({
            type: 'ga4',
            name: eventName,
            data: data || {},
            command
          });
        }
        return originalGtag.apply(this, args);
      };
    } else {
      // Set up listener for when gtag loads
      Object.defineProperty(window, 'gtag', {
        configurable: true,
        enumerable: true,
        get() {
          return this._gtag;
        },
        set(value) {
          this._gtag = value;
          state.pixelStatus.ga4 = true;
          interceptGA4();
        }
      });
    }
  }

  // Intercept Clarity events
  function interceptClarity() {
    const originalClarity = window.clarity;
    if (originalClarity) {
      state.pixelStatus.clarity = true;
      window.clarity = function(...args) {
        const [command, ...params] = args;
        addEvent({
          type: 'clarity',
          name: command,
          data: params,
          command
        });
        return originalClarity.apply(this, args);
      };
    } else {
      // Set up listener for when clarity loads
      Object.defineProperty(window, 'clarity', {
        configurable: true,
        enumerable: true,
        get() {
          return this._clarity;
        },
        set(value) {
          this._clarity = value;
          state.pixelStatus.clarity = true;
          interceptClarity();
        }
      });
    }
  }

  // Initialize
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    createDebugPanel();
    interceptMetaPixel();
    interceptGA4();
    interceptClarity();

    // Add keyboard shortcut (Ctrl+Shift+D) to toggle panel
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        const panel = document.getElementById('tracking-debug-panel');
        if (panel) {
          panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
        }
      }
    });

    console.log('%c✨ Tracking Debug Panel Loaded', 
      `background: ${CONFIG.theme.primary}; color: ${CONFIG.theme.background}; padding: 8px 16px; border-radius: 4px; font-weight: bold;`);
    console.log('%cPress Ctrl+Shift+D to toggle the debug panel', 
      `color: ${CONFIG.theme.primary}; font-size: 12px;`);
  }

  // Start initialization
  init();
})();
