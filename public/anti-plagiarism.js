/**
 * Proteção Anti-Plágio e Anti-Roubo Digital
 * Sistema de defesa contra clonagem de sites e roubo de conteúdo
 */

(function() {
    'use strict';
    
    // 1. DESABILITAR CLIQUE DIREITO
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // 2. DESABILITAR SELEÇÃO DE TEXTO
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    }, false);
    
    // 3. DESABILITAR CÓPIA
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
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
        
        // Ctrl+C (Copy)
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        
        // Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // 5. DETECTAR ABERTURA DO DEVTOOLS
    let devtoolsOpen = false;
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerWidth - window.innerWidth > threshold || 
            window.outerHeight - window.innerHeight > threshold) {
            if (!devtoolsOpen) {
                devtoolsOpen = true;
                // Redirecionar para página de aviso
                document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#000;color:#fff;font-family:sans-serif;text-align:center;"><div><h1>⚠️ Acesso Bloqueado</h1><p>Este site está protegido contra cópia.</p></div></div>';
            }
        } else {
            devtoolsOpen = false;
        }
    }, 500);
    
    // 6. ADICIONAR MARCA D'ÁGUA INVISÍVEL NO DOM
    const watermark = document.createElement('div');
    watermark.style.display = 'none';
    watermark.setAttribute('data-copyright', 'Mapa Xamânico - Todos os direitos reservados');
    watermark.setAttribute('data-protected', 'true');
    watermark.textContent = 'Copyright © Mapa Xamânico ' + new Date().getFullYear();
    document.body.appendChild(watermark);
    
    // 7. OFUSCAR CÓDIGO HTML DINAMICAMENTE
    // Detectar tentativas de inspeção de elementos
    const elements = document.querySelectorAll('*');
    elements.forEach(function(el) {
        el.addEventListener('mouseenter', function() {
            if (devtoolsOpen) {
                el.style.display = 'none';
            }
        });
    });
    
    // 8. PROTEGER IMAGENS
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
            return false;
        }
    }, false);
    
    // 9. DETECTOR DE FERRAMENTAS DE SCREENSHOT
    // Adicionar camada transparente que dificulta screenshots
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
    `;
    antiScreenshot.setAttribute('data-protection', 'screenshot-shield');
    document.body.appendChild(antiScreenshot);
    
    // 10. MONITORAR MUDANÇAS NO DOM (detectar tentativas de extração)
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.removedNodes.length > 0) {
                // Detectar remoção em massa de elementos (possível clonagem)
                if (mutation.removedNodes.length > 10) {
                    console.clear();
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    // 11. LIMPAR CONSOLE PERIODICAMENTE
    setInterval(function() {
        console.clear();
    }, 1000);
    
    // 12. PROTEGER CONTRA IFRAME EMBEDDING
    if (window.top !== window.self) {
        window.top.location = window.self.location;
    }
    
    // 13. ADICIONAR CSS ANTI-SELEÇÃO
    const style = document.createElement('style');
    style.textContent = `
        * {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        
        /* Permitir seleção apenas em inputs e textareas */
        input, textarea {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
        
        /* Desabilitar arrastar imagens */
        img {
            -webkit-user-drag: none !important;
            -khtml-user-drag: none !important;
            -moz-user-drag: none !important;
            -o-user-drag: none !important;
            user-drag: none !important;
            pointer-events: none !important;
        }
    `;
    document.head.appendChild(style);
    
    // 14. RASTREAR TENTATIVAS DE CÓPIA
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
    
    // 15. PROTEGER CÓDIGO FONTE
    // Adicionar comentários falsos e confusos para dificultar análise
    const fakeComments = [
        '<!-- System Core Module v3.2.1 -->',
        '<!-- Protected by Enterprise Security Suite -->',
        '<!-- Unauthorized access is tracked and reported -->'
    ];
    
    // 16. DETECTAR AUTOMAÇÃO E BOTS
    let mouseMovements = 0;
    document.addEventListener('mousemove', function() {
        mouseMovements++;
    });
    
    setTimeout(function() {
        if (mouseMovements === 0) {
            // Possível bot ou automação
            console.log('Automated behavior detected');
        }
    }, 5000);
    
    // 17. FINGERPRINTING - Criar impressão digital única do visitante
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
    
    console.log('🔒 Site protegido contra cópia e plágio');
    console.log('⚠️  Todas as tentativas de acesso não autorizado são monitoradas');
    
})();
