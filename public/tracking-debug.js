/**
 * 🎯 TRACKING DEBUG TOOL - VISUAL & INTERACTIVE
 * 
 * Como usar:
 * 1. Abra seu site no navegador
 * 2. Abra o Console (F12)
 * 3. Cole este script e pressione ENTER
 * 4. Um painel visual vai aparecer mostrando status de tudo
 */

(function() {
  'use strict';

  // ============================================================================
  // CONFIGURAÇÃO
  // ============================================================================
  
  const CONFIG = {
    META_PIXEL_ID: '1908080873443730',
    GA4_ID: 'G-M78M3RH56H',
    CLARITY_ID: 'uq1qfi7fwi',
  };

  // ============================================================================
  // CRIAR PAINEL VISUAL
  // ============================================================================
  
  function createDebugPanel() {
    // Remove painel anterior se existir
    const existing = document.getElementById('tracking-debug-panel');
    if (existing) existing.remove();

    const panel = document.createElement('div');
    panel.id = 'tracking-debug-panel';
    panel.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 400px;
      max-height: 90vh;
      overflow-y: auto;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      border: 2px solid #D4AF37;
      border-radius: 12px;
      padding: 20px;
      z-index: 999999;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      box-shadow: 0 8px 32px rgba(212, 175, 55, 0.3);
    `;

    panel.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 style="margin: 0; color: #D4AF37; font-size: 18px;">
          🎯 Tracking Monitor
        </h3>
        <button id="close-debug-panel" style="
          background: #D4AF37;
          border: none;
          color: #1a1a2e;
          padding: 5px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
        ">✕</button>
      </div>
      
      <div id="debug-content" style="color: #fff; font-size: 14px;">
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 40px;">⏳</div>
          <p>Verificando...</p>
        </div>
      </div>
      
      <div id="events-log" style="
        margin-top: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(212, 175, 55, 0.3);
        max-height: 300px;
        overflow-y: auto;
      ">
        <h4 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px;">
          📊 Eventos Capturados
        </h4>
        <div id="events-list" style="font-size: 12px;"></div>
      </div>
    `;

    document.body.appendChild(panel);

    // Botão fechar
    document.getElementById('close-debug-panel').onclick = () => {
      panel.remove();
      stopMonitoring();
    };

    return panel;
  }

  // ============================================================================
  // VERIFICAÇÕES
  // ============================================================================
  
  function checkPixels() {
    const results = {
      metaPixel: {
        loaded: typeof window.fbq === 'function',
        id: CONFIG.META_PIXEL_ID,
      },
      ga4: {
        loaded: typeof window.gtag === 'function',
        id: CONFIG.GA4_ID,
      },
      clarity: {
        loaded: typeof window.clarity === 'function',
        id: CONFIG.CLARITY_ID,
      },
    };

    return results;
  }

  function checkLocalStorage() {
    const keys = Object.keys(localStorage);
    const trackingKeys = keys.filter(k => 
      k.includes('track') || 
      k.includes('utm') || 
      k.includes('quiz') ||
      k.includes('advanced')
    );

    return {
      found: trackingKeys.length > 0,
      keys: trackingKeys,
      data: trackingKeys.map(k => ({
        key: k,
        value: localStorage.getItem(k)
      }))
    };
  }

  function checkCookies() {
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = value;
      return acc;
    }, {});

    return {
      fbp: cookies._fbp || null,
      fbc: cookies._fbc || null,
      ga: cookies._ga || null,
    };
  }

  function checkUTMParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) utmParams[param] = value;
    });

    return {
      found: Object.keys(utmParams).length > 0,
      params: utmParams
    };
  }

  // ============================================================================
  // RENDERIZAR RESULTADOS
  // ============================================================================
  
  function renderResults() {
    const pixels = checkPixels();
    const storage = checkLocalStorage();
    const cookies = checkCookies();
    const utm = checkUTMParams();

    const content = document.getElementById('debug-content');
    
    const statusIcon = (condition) => condition ? '✅' : '❌';
    const statusColor = (condition) => condition ? '#4ade80' : '#f87171';

    content.innerHTML = `
      <!-- PIXELS -->
      <div style="margin-bottom: 15px;">
        <h4 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px;">
          📡 Pixels Carregados
        </h4>
        
        <div style="margin-bottom: 8px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Meta Pixel</span>
            <span style="color: ${statusColor(pixels.metaPixel.loaded)}; font-weight: bold;">
              ${statusIcon(pixels.metaPixel.loaded)}
            </span>
          </div>
          <div style="font-size: 11px; color: #999; margin-top: 4px;">
            ID: ${pixels.metaPixel.id}
          </div>
        </div>

        <div style="margin-bottom: 8px; padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Google Analytics</span>
            <span style="color: ${statusColor(pixels.ga4.loaded)}; font-weight: bold;">
              ${statusIcon(pixels.ga4.loaded)}
            </span>
          </div>
          <div style="font-size: 11px; color: #999; margin-top: 4px;">
            ID: ${pixels.ga4.id}
          </div>
        </div>

        <div style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Microsoft Clarity</span>
            <span style="color: ${statusColor(pixels.clarity.loaded)}; font-weight: bold;">
              ${statusIcon(pixels.clarity.loaded)}
            </span>
          </div>
          <div style="font-size: 11px; color: #999; margin-top: 4px;">
            ID: ${pixels.clarity.id}
          </div>
        </div>
      </div>

      <!-- LOCALSTORAGE -->
      <div style="margin-bottom: 15px;">
        <h4 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px;">
          💾 LocalStorage
        </h4>
        <div style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>Dados Persistidos</span>
            <span style="color: ${statusColor(storage.found)}; font-weight: bold;">
              ${statusIcon(storage.found)}
            </span>
          </div>
          ${storage.found ? `
            <div style="font-size: 11px; color: #999; margin-top: 8px;">
              Chaves encontradas: ${storage.keys.length}
              <ul style="margin: 5px 0; padding-left: 20px;">
                ${storage.keys.map(k => `<li style="margin: 2px 0;">${k}</li>`).join('')}
              </ul>
            </div>
          ` : '<div style="font-size: 11px; color: #999; margin-top: 4px;">Nenhum dado encontrado</div>'}
        </div>
      </div>

      <!-- COOKIES -->
      <div style="margin-bottom: 15px;">
        <h4 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px;">
          🍪 Cookies de Tracking
        </h4>
        <div style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px; font-size: 12px;">
          <div style="margin-bottom: 6px;">
            <span style="color: #999;">_fbp:</span> 
            <span style="color: ${cookies.fbp ? '#4ade80' : '#f87171'};">
              ${cookies.fbp || '❌ Não encontrado'}
            </span>
          </div>
          <div style="margin-bottom: 6px;">
            <span style="color: #999;">_fbc:</span> 
            <span style="color: ${cookies.fbc ? '#4ade80' : '#999'};">
              ${cookies.fbc || 'N/A (normal se não veio de ad)'}
            </span>
          </div>
          <div>
            <span style="color: #999;">_ga:</span> 
            <span style="color: ${cookies.ga ? '#4ade80' : '#f87171'};">
              ${cookies.ga || '❌ Não encontrado'}
            </span>
          </div>
        </div>
      </div>

      <!-- UTM PARAMS -->
      <div>
        <h4 style="color: #D4AF37; margin: 0 0 10px 0; font-size: 14px;">
          🔗 Parâmetros UTM
        </h4>
        <div style="padding: 8px; background: rgba(255,255,255,0.05); border-radius: 6px;">
          ${utm.found ? `
            <div style="font-size: 12px;">
              ${Object.entries(utm.params).map(([k, v]) => `
                <div style="margin-bottom: 4px;">
                  <span style="color: #D4AF37;">${k}:</span> ${v}
                </div>
              `).join('')}
            </div>
          ` : `
            <div style="font-size: 12px; color: #999;">
              ℹ️ Nenhum parâmetro UTM na URL atual
            </div>
          `}
        </div>
      </div>
    `;
  }

  // ============================================================================
  // MONITORAR EVENTOS
  // ============================================================================
  
  let eventCount = 0;
  const maxEvents = 50;
  let isMonitoring = false;

  function addEventToLog(type, eventName, params) {
    if (!isMonitoring) return;

    eventCount++;
    const eventsList = document.getElementById('events-list');
    if (!eventsList) return;

    const time = new Date().toLocaleTimeString();
    const eventDiv = document.createElement('div');
    eventDiv.style.cssText = `
      margin-bottom: 8px;
      padding: 8px;
      background: rgba(212, 175, 55, 0.1);
      border-left: 3px solid #D4AF37;
      border-radius: 4px;
      animation: slideIn 0.3s ease-out;
    `;

    const paramsStr = params ? JSON.stringify(params, null, 2) : '';
    
    eventDiv.innerHTML = `
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <span style="color: #D4AF37; font-weight: bold;">${type}</span>
        <span style="color: #999; font-size: 11px;">${time}</span>
      </div>
      <div style="color: #fff; margin-bottom: 4px;">${eventName}</div>
      ${paramsStr ? `
        <details style="margin-top: 6px;">
          <summary style="color: #999; cursor: pointer; font-size: 11px;">Ver parâmetros</summary>
          <pre style="
            color: #4ade80; 
            font-size: 10px; 
            margin: 6px 0 0 0; 
            padding: 6px; 
            background: rgba(0,0,0,0.3); 
            border-radius: 4px;
            overflow-x: auto;
          ">${paramsStr}</pre>
        </details>
      ` : ''}
    `;

    eventsList.insertBefore(eventDiv, eventsList.firstChild);

    // Limitar número de eventos
    while (eventsList.children.length > maxEvents) {
      eventsList.removeChild(eventsList.lastChild);
    }

    // Update badge
    updateEventBadge();
  }

  function updateEventBadge() {
    const badge = document.getElementById('event-badge');
    if (badge) {
      badge.textContent = eventCount;
    }
  }

  function interceptFbq() {
    if (typeof window.fbq !== 'function') return;

    const originalFbq = window.fbq;
    window.fbq = new Proxy(originalFbq, {
      apply: function(target, thisArg, args) {
        const [action, eventName, params] = args;
        addEventToLog('📘 Meta Pixel', `${action}: ${eventName}`, params);
        return target.apply(thisArg, args);
      }
    });
  }

  function interceptGtag() {
    if (typeof window.gtag !== 'function') return;

    const originalGtag = window.gtag;
    window.gtag = new Proxy(originalGtag, {
      apply: function(target, thisArg, args) {
        const [command, ...params] = args;
        if (command === 'event') {
          addEventToLog('📊 GA4', params[0], params[1]);
        }
        return target.apply(thisArg, args);
      }
    });
  }

  function startMonitoring() {
    isMonitoring = true;
    interceptFbq();
    interceptGtag();
    
    console.log('%c🎯 Tracking Monitor ATIVADO', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cEventos serão capturados e exibidos no painel', 'color: #4ade80;');
  }

  function stopMonitoring() {
    isMonitoring = false;
    console.log('%c🛑 Tracking Monitor DESATIVADO', 'color: #f87171; font-size: 14px;');
  }

  // ============================================================================
  // ADICIONAR CSS DE ANIMAÇÃO
  // ============================================================================
  
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateX(20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      #tracking-debug-panel::-webkit-scrollbar {
        width: 8px;
      }
      
      #tracking-debug-panel::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 4px;
      }
      
      #tracking-debug-panel::-webkit-scrollbar-thumb {
        background: #D4AF37;
        border-radius: 4px;
      }
      
      #events-log::-webkit-scrollbar {
        width: 6px;
      }
      
      #events-log::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.05);
        border-radius: 3px;
      }
      
      #events-log::-webkit-scrollbar-thumb {
        background: rgba(212, 175, 55, 0.5);
        border-radius: 3px;
      }
    `;
    document.head.appendChild(style);
  }

  // ============================================================================
  // INICIAR
  // ============================================================================
  
  function init() {
    injectStyles();
    createDebugPanel();
    renderResults();
    startMonitoring();

    // Adicionar badge de eventos no título
    const title = document.querySelector('#tracking-debug-panel h3');
    if (title) {
      const badge = document.createElement('span');
      badge.id = 'event-badge';
      badge.style.cssText = `
        background: #4ade80;
        color: #1a1a2e;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        margin-left: 8px;
      `;
      badge.textContent = '0';
      title.appendChild(badge);
    }

    console.log('%c╔════════════════════════════════════════════╗', 'color: #D4AF37;');
    console.log('%c║   🎯 TRACKING DEBUG TOOL ATIVADO          ║', 'color: #D4AF37; font-weight: bold;');
    console.log('%c╚════════════════════════════════════════════╝', 'color: #D4AF37;');
    console.log('');
    console.log('%c📊 Painel visual aberto no canto superior direito', 'color: #4ade80;');
    console.log('%c🔍 Todos os eventos de tracking estão sendo monitorados', 'color: #4ade80;');
    console.log('');
    console.log('%cPara fechar: clique no X no painel', 'color: #999;');
  }

  // Iniciar tudo
  init();
})();
