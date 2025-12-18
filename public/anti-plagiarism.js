/**
 * Proteção Anti-Plágio e Anti-Roubo Digital
 * Sistema de defesa contra clonagem de sites e roubo de conteúdo
 * Versão balanceada para manter acessibilidade
 */

(function() {
    'use strict';
    
    // 1. DESABILITAR CLIQUE DIREITO
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // 2. DESABILITAR SELEÇÃO DE TEXTO (exceto inputs/textareas)
    document.addEventListener('selectstart', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // 3. DESABILITAR CÓPIA (exceto inputs/textareas)
    document.addEventListener('copy', function(e) {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // 4. DESABILITAR ATALHOS DO TECLADO (F12, Ctrl+U, Ctrl+Shift+I, etc.)
    document.addEventListener('keydown', function(e) {
        // F12 (DevTools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+C (Copy) - apenas fora de inputs
        if (e.ctrlKey && e.keyCode === 67) {
            if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                return false;
            }
        }
    }, false);
    
    // 5. ADICIONAR MARCA D'ÁGUA INVISÍVEL NO DOM
    const watermark = document.createElement('div');
    watermark.style.display = 'none';
    watermark.setAttribute('data-copyright', 'Mapa Xamânico - Todos os direitos reservados');
    watermark.setAttribute('data-protected', 'true');
    watermark.textContent = 'Copyright © Mapa Xamânico ' + new Date().getFullYear();
    document.body.appendChild(watermark);
    
    // 6. PROTEGER IMAGENS
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // 7. ADICIONAR CSS ANTI-SELEÇÃO (melhorado para acessibilidade)
    const style = document.createElement('style');
    style.textContent = `
        /* Desabilitar seleção exceto em inputs */
        body, body * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        
        /* Permitir seleção em inputs e textareas */
        input, textarea, [contenteditable="true"] {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        
        /* Desabilitar arrastar imagens mantendo acessibilidade */
        img {
            -webkit-user-drag: none !important;
            -khtml-user-drag: none !important;
            -moz-user-drag: none !important;
            -o-user-drag: none !important;
            user-drag: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // 8. RASTREAR TENTATIVAS DE CÓPIA
    let copyAttempts = 0;
    document.addEventListener('copy', function() {
        copyAttempts++;
        if (copyAttempts > 3) {
            // Registrar IP e comportamento suspeito (se tiver analytics)
            if (window.fbq) {
                window.fbq('trackCustom', 'SuspiciousCopyBehavior', {
                    attempts: copyAttempts
                });
            }
        }
    });
    
    // 9. PROTEGER CONTRA IFRAME EMBEDDING
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // 10. FINGERPRINTING - Criar impressão digital única do visitante
    const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: screen.width + 'x' + screen.height,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: Date.now()
    };
    
    // Armazenar fingerprint (pode ser enviado para analytics)
    sessionStorage.setItem('visitor_fp', JSON.stringify(fingerprint));
    
    // 11. DETECTAR AUTOMAÇÃO E BOTS
    let mouseMovements = 0;
    document.addEventListener('mousemove', function() {
        mouseMovements++;
    });
    
    setTimeout(function() {
        if (mouseMovements === 0) {
            // Possível bot ou automação
            if (window.fbq) {
                window.fbq('trackCustom', 'PossibleBotDetected', {
                    timestamp: Date.now()
                });
            }
        }
    }, 5000);
    
    // 12. CAMADA ANTI-SCREENSHOT (sutil)
    const antiScreenshot = document.createElement('div');
    antiScreenshot.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 999999;
        background: transparent;
        mix-blend-mode: difference;
        opacity: 0.01;
    `;
    antiScreenshot.setAttribute('data-protection', 'screenshot-shield');
    document.body.appendChild(antiScreenshot);
    
    console.log('🔒 Site protegido contra cópia e plágio');
    console.log('⚠️  Todas as tentativas de acesso não autorizado são monitoradas');
    
})();
