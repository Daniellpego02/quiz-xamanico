import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

interface Oferta1Props {
  userName?: string;
}

// BuckPay Configuration
const BUCKPAY_CONFIG = {
  offerId: '7c265285-38dc-44e9-8f56-eaa6356e26b1',
  upsellUrl: 'https://www.mapaxamanicooficial.online/oferta1',
  downsellUrl: 'https://www.mapaxamanicooficial.online/down1',
  scriptUrl: 'https://www.seguropagamentos.com.br/upsell-downsell-script.js'
} as const;

export default function Oferta1({ userName }: Oferta1Props) {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buckpayError, setBuckpayError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  
  // Get name from URL param or prop
  const nameFromUrl = searchParams.get('name') || searchParams.get('nome');
  const displayName = nameFromUrl || userName || '';
  const firstName = displayName ? displayName.split(' ')[0] : '';

  // Load BuckPay one-click upsell script
  useEffect(() => {
    // Set BuckPay configuration
    (window as any).buckpayOfferId = BUCKPAY_CONFIG.offerId;
    (window as any).buckpayUpsellUrl = BUCKPAY_CONFIG.upsellUrl;
    (window as any).buckpayDownsellUrl = BUCKPAY_CONFIG.downsellUrl;

    // Load BuckPay script
    const script = document.createElement('script');
    script.src = BUCKPAY_CONFIG.scriptUrl;
    script.async = true;
    script.onerror = () => {
      console.error('Failed to load BuckPay script');
      setBuckpayError(true);
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAccept = () => {
    setIsProcessing(true);
    
    // Trigger BuckPay one-click upsell
    const buckpayButton = document.getElementById('buckpay-upsell-button');
    
    if (buckpayButton) {
      buckpayButton.click();
    } else {
      // Fallback: show error and reset
      console.error('BuckPay button not found');
      setTimeout(() => {
        setIsProcessing(false);
        setBuckpayError(true);
        alert('Erro ao processar pagamento. Por favor, tente novamente ou entre em contato com o suporte.');
      }, 1000);
    }
  };

  const handleDecline = () => {
    // Trigger BuckPay downsell button (redirects to /down1)
    const buckpayDownsellButton = document.getElementById('buckpay-downsell-button');
    
    if (buckpayDownsellButton) {
      buckpayDownsellButton.click();
    } else {
      // Fallback: direct redirect
      window.location.href = '/down1';
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#0f0a1a] via-[#1a0f2e] to-[#0f0a1a] text-white">
        
        {/* SECTION 1: Progress Bar - Fixed Top */}
        <div className="sticky top-0 z-50 bg-[#2a1a4a] h-[60px] border-b border-purple-500/20">
          <div className="max-w-5xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#10b981]">✅</span>
              <span className="text-white text-xs md:text-sm">Compra confirmada</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#fbbf24] animate-pulse">⏳</span>
              <span className="text-white text-xs md:text-sm">Passo opcional</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#666666]">⬜</span>
              <span className="text-white text-xs md:text-sm hidden md:inline">Início do Mapa</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
          
          {/* SECTION 2: Hook + Headline */}
          <div className="text-center mb-8 md:mb-12 py-8 md:py-12">
            <h1 className="text-3xl md:text-5xl font-black text-[#fbbf24] mb-4 tracking-tight" style={{ letterSpacing: '-1px' }}>
              🔥 ESPERE{firstName ? `, ${firstName.toUpperCase()}` : ''}!
            </h1>
            <p className="text-lg md:text-xl text-white font-normal mb-3">
              Seu Mapa Xamânico está garantido.
            </p>
            <p className="text-base md:text-lg text-[#cccccc] font-light">
              MAS antes de começar, uma pergunta rápida:
            </p>
          </div>

          {/* SECTION 3: Main Question - Big Box */}
          <div className="bg-[#2a1a4a]/80 border-[3px] border-[#fbbf24] rounded-xl p-6 md:p-10 mb-8 md:mb-12">
            <p className="text-2xl md:text-3xl text-white font-normal leading-tight mb-2">
              Você quer desbloquear em 7 dias...
            </p>
            <p className="text-2xl md:text-4xl text-[#00ff88] font-black mt-2">
              ...ou quer desbloquear em <span className="bg-[#fbbf24] text-[#1a0f2e] px-2">3 DIAS</span>?
            </p>
          </div>

          {/* SECTION 4: Explanation */}
          <div className="mb-8 md:mb-12 px-4 md:px-8">
            <p className="text-lg md:text-xl text-[#fbbf24] font-bold mb-4">
              Olha a verdade:
            </p>
            
            <div className="space-y-4 text-base md:text-lg text-white leading-relaxed">
              <p>O Mapa funciona. Você VAI desbloquear.</p>
              
              <p className="font-bold">MAS...</p>
              
              <p>
                <span className="text-[#00ff88] font-bold">92%</span> das pessoas que fazem <span className="text-[#fbbf24] font-bold">SOZINHAS</span> levam <span className="text-[#00ff88] font-bold">7-14 dias</span>.
              </p>
              
              <p>
                As pessoas que fazem <span className="text-[#fbbf24] font-bold">COM O GUIA DE ACOMPANHAMENTO</span> levam <span className="text-[#00ff88] font-bold">3-5 dias</span>.
              </p>
              
              <p className="font-bold mt-6 mb-2">Por quê?</p>
              
              <p>
                Porque você recebe <span className="text-[#fbbf24] font-bold">ORIENTAÇÃO DIÁRIA</span> de onde está,
                se está fazendo certo, e o que fazer <span className="text-[#fbbf24] font-bold">EXATAMENTE</span> no 
                dia seguinte.
              </p>
              
              <p className="text-lg md:text-xl mt-4 text-[#fbbf24]">
                É como ter a Anahí segurando sua mão <span className="font-bold">TODO DIA</span>.
              </p>
            </div>
          </div>

          {/* SECTION 5: What You Receive - Cards */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-[#fbbf24] text-center mb-8">
              👉 O Que Você Recebe no Guia:
            </h2>
            
            <div className="space-y-4">
              {/* Card 1 */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Mensagem diária no WhatsApp (7 dias seguidos)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed">
                      Você recebe TODO DIA uma mensagem dizendo:
                      "Hoje você faz X. Amanhã faz Y."
                      <br /><br />
                      Sem dúvida. Sem travar. Você só segue.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Checklist de sinais de progresso
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed">
                      Como saber que está funcionando? Veja a lista 
                      de sinais reais (dinheiro inesperado, oportunidades, 
                      ligações antigas).
                      <br /><br />
                      Você confirma: "Tá funcionando!"
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Protocolo de emergência
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed">
                      Se sentir bloqueio no meio do caminho, você tem 
                      um "botão de pânico".
                      <br /><br />
                      Áudio de 7 minutos que destranca na hora.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Áudio de apoio (1 por dia)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed">
                      7 áudios de 5 minutos. Só dar play e seguir.
                      <br /><br />
                      Reforça o protocolo e mantém sua frequência alta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Acesso ao grupo de suporte (Telegram)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed">
                      Mais de 50 pessoas fazendo JUNTO com você AGORA.
                      <br /><br />
                      Troca de experiências em tempo real. Você não 
                      está sozinho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: Testimonial */}
          <div className="bg-[#1a0f2e] border-[2px] border-[#00ff88] rounded-xl p-6 md:p-8 mb-8 md:mb-12">
            <p className="text-sm md:text-base text-[#00ff88] font-bold mb-4">
              💬 RESULTADO REAL:
            </p>
            
            <p className="text-base md:text-lg text-white italic leading-relaxed mb-6">
              "Fiz o Mapa sozinha e travei no 4º dia. Fiquei 
              perdida, achei que não estava funcionando.
              <br /><br />
              Peguei o Guia e em 2 dias destravei TUDO.
              <br /><br />
              No 6º dia recebi <span className="text-[#00ff88] font-bold not-italic">R$11 mil</span> que nem esperava mais 
              (processo trabalhista de 3 anos atrás!)."
            </p>
            
            <p className="text-sm text-[#fbbf24] font-semibold mb-2">
              Camila Rodrigues, 38 anos<br />
              Porto Alegre, RS
            </p>
            
            <div className="text-[#fbbf24] text-xl">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          {/* SECTION 7: Price + Anchoring */}
          <div className="bg-gradient-to-br from-[#0d4a3a] to-[#1a5f4a] border-[2px] border-[#fbbf24] rounded-xl p-6 md:p-10 mb-8 md:mb-12 text-center shadow-2xl">
            <p className="text-sm md:text-base text-white/60 line-through mb-4">
              VALOR REAL DO GUIA: R$ 197,00
            </p>
            
            <p className="text-base md:text-lg text-white mb-2">
              Você <span className="font-bold">NÃO</span> vai pagar R$197.
            </p>
            <p className="text-base md:text-lg text-white mb-6">
              Você <span className="font-bold">NÃO</span> vai pagar nem R$97.
            </p>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            <p className="text-sm md:text-base text-[#fbbf24] font-bold uppercase tracking-wider mb-4">
              OFERTA EXCLUSIVA AGORA:
            </p>
            
            <p 
              className="text-6xl md:text-7xl font-black text-[#00ff88] my-6"
              style={{ 
                textShadow: '0 0 20px rgba(0, 255, 136, 0.6)',
                lineHeight: '1'
              }}
            >
              R$ 29,00
            </p>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            <p className="text-xs md:text-sm text-white">
              💳 Pagamento: 1 clique via PIX
            </p>
          </div>

          {/* SECTION 8: Urgency + Justification */}
          <div className="bg-[#f59e0b]/20 border-[2px] border-[#fbbf24] rounded-lg p-6 md:p-8 mb-8 md:mb-12">
            <p className="text-lg md:text-xl text-[#fbbf24] font-black mb-4">
              ⚠️ ATENÇÃO:
            </p>
            
            <div className="text-sm md:text-base text-white space-y-3 mb-6">
              <p>
                Essa oferta <span className="font-bold text-[#fbbf24]">SOME</span> quando você sair desta página.
              </p>
              <p>
                Se voltar depois, o Guia estará <span className="font-bold text-[#fbbf24]">R$97</span>.
              </p>
            </div>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            {/* Countdown Timer */}
            <div className="text-center mb-6">
              <p className="text-sm text-[#fbbf24] mb-2">⏰ Oferta expira em:</p>
              <p 
                className={`text-4xl md:text-5xl font-black text-[#fbbf24] ${timeLeft <= 300 ? 'animate-pulse' : ''}`}
              >
                {formatTime(timeLeft)}
              </p>
              <p className="text-xs text-white/60 mt-2">
                (Esta tela será redirecionada automaticamente)
              </p>
            </div>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            <p className="text-base md:text-lg text-[#fbbf24] font-bold mb-4">
              Por que tão barato?
            </p>
            
            <div className="text-sm md:text-base text-white space-y-3">
              <p>
                Porque você <span className="font-bold">ACABOU</span> de confiar no Mapa.
              </p>
              <p>
                Eu quero que você tenha o <span className="font-bold">MELHOR</span> resultado possível.
              </p>
              <p>
                Então estou dando o Guia pelo custo mínimo.
              </p>
              <p>
                Mas só <span className="font-bold">AGORA</span>. Só <span className="font-bold">AQUI</span>.
              </p>
            </div>
          </div>

          {/* SECTION 9: Guarantee */}
          <div className="text-center mb-8 md:mb-12">
            <p className="text-base md:text-lg text-[#00ff88] font-bold mb-3">
              🔒 MESMA GARANTIA DE 7 DIAS
            </p>
            <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed max-w-2xl mx-auto">
              Se você não sentir que o Guia acelerou seu processo,
              devolvo R$29 sem perguntar nada.
              <br /><br />
              Risco ZERO para você.
            </p>
          </div>

          {/* SECTION 10: Main CTA Button */}
          <div className="mb-6">
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="w-full max-w-[600px] mx-auto block bg-gradient-to-r from-[#7c3aed] to-[#a855f7] hover:from-[#6d28d9] hover:to-[#9333ea] disabled:from-[#7c3aed]/70 disabled:to-[#a855f7]/70 text-white font-black text-lg md:text-xl py-5 md:py-6 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 disabled:cursor-not-allowed"
              style={{
                boxShadow: '0 8px 24px rgba(124, 58, 237, 0.5)',
                letterSpacing: '0.5px'
              }}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Processando...
                </span>
              ) : (
                '🚀 SIM, QUERO DESBLOQUEAR EM 3 DIAS (R$29) →'
              )}
            </button>
            
            <div className="text-center mt-3 space-y-1">
              <p className="text-xs md:text-sm text-[#aaaaaa]">
                ✓ Pagamento via PIX • Acesso imediato
              </p>
              <p className="text-xs md:text-sm text-[#aaaaaa]">
                ✓ 7 dias de garantia • Suporte direto
              </p>
            </div>
          </div>

          {/* SECTION 11: Decline Button */}
          <div className="text-center mb-12">
            <button
              onClick={handleDecline}
              className="text-sm text-[#666666] hover:text-[#ef4444] underline transition-colors"
            >
              Não, prefiro fazer sozinho e arriscar travar no processo
            </button>
          </div>

          {/* SECTION 12: Footer */}
          <div className="text-center py-6 border-t border-purple-500/20">
            <p className="text-xs text-[#666666]">
              Dúvidas? Entre em contato: suporte@mapaxamanicooficial.com
            </p>
          </div>

        </div>
      </div>

      {/* Hidden BuckPay One-Click Upsell/Downsell Container */}
      <div style={{ display: 'none', textAlign: 'center' }} id="buckpay-upsell-downsell-container">
        <button 
          id="buckpay-upsell-button" 
          style={{
            backgroundColor: '#09a530',
            padding: '12px 16px',
            cursor: 'pointer',
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: '6px',
            border: '1px solid #09a530',
            fontSize: '20px'
          }}
        >
          Sim, eu quero essa oferta!
        </button>
        <div 
          id="buckpay-downsell-button" 
          style={{
            color: '#ffffff',
            marginTop: '1rem',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'underline',
            fontFamily: 'sans-serif'
          }}
        >
          Não, eu gostaria de recusar essa oferta
        </div>
      </div>
    </>
  );
}
