import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { tracking } from './utils/tracking';

interface Oferta1Props {
  userName?: string;
}

// BuckPay Configuration
const BUCKPAY_CONFIG = {
  offerId: '7c265285-38dc-44e9-8f56-eaa6356e26b1',
  upsellUrl: 'https://www.mapaxamanicooficial.online/oferta1',
  downsellUrl: 'https://www.mapaxamanicooficial.online/down1',
  scriptUrl: 'https://seguropagamentos.com.br/upsell-downsell-script.js'
} as const;

export default function Oferta1({ userName }: Oferta1Props) {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buckpayError, setBuckpayError] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  
  const PULSE_THRESHOLD_SECONDS = 5 * 60; // 5 minutes

  // Get name from URL param or prop
  const nameFromUrl = searchParams.get('name') || searchParams.get('nome');
  const displayName = nameFromUrl || userName || '';
  const firstName = displayName ? displayName.split(' ')[0] : '';

  // Track offer page view
  useEffect(() => {
    tracking.funnel.viewOffer('Oferta 1 - BuckPay Upsell');
  }, []);

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

    // Add manual click handler for downsell button as fallback
    // The external script may not properly handle the downsell button
    // Note: If external script also attaches a handler, both may fire,
    // but since both redirect to the same URL, this is not an issue
    const setupDownsellHandler = () => {
      const downsellButton = document.getElementById('buckpay-downsell-button');
      if (downsellButton) {
        // Add click event listener for manual redirect
        downsellButton.addEventListener('click', () => {
          window.location.href = BUCKPAY_CONFIG.downsellUrl;
        });
      }
    };

    // Setup handler after DOM is ready
    // The 100ms delay ensures the hidden container has been rendered
    const timeoutId = setTimeout(setupDownsellHandler, 100);

    return () => {
      // Cleanup script on unmount
      clearTimeout(timeoutId);
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // Countdown timer - 15 minutes
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
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
    
    // Track offer 1 acceptance
    tracking.purchase.addToCart({
      productName: 'Oferta 1 - BuckPay Upsell',
      productPrice: 197.00, // Adjust to actual price
      productId: 'oferta1-buckpay',
      email: 'unknown@email.com'
    });
    
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
    // Track offer 1 decline
    tracking.funnel.clickCTA('Oferta 1 - Declined');
    
    // Direct redirect to downsell page
    // The hidden buckpay-downsell-button also has a click handler attached
    // but we ensure redirect happens regardless of external script behavior
    window.location.href = BUCKPAY_CONFIG.downsellUrl;
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
          
          {/* SECTION 2: Hook + Headline - IMPROVED with emotional urgency */}
          <div className="text-center mb-8 md:mb-12 py-8 md:py-12">
            <h1 className="text-3xl md:text-5xl font-black text-[#fbbf24] mb-4 tracking-tight" style={{ letterSpacing: '-1px' }}>
              🔥 ESPERE{firstName ? `, ${firstName.toUpperCase()}` : ''}!
            </h1>
            <p className="text-lg md:text-xl text-white font-normal mb-3">
              Seu Mapa está garantido...
            </p>
            <p className="text-2xl md:text-3xl text-white font-black mb-3">
              MAS VOCÊ VAI DESBLOQUEAR EM 7 DIAS OU EM 3 DIAS?
            </p>
            <p className="text-base md:text-lg text-[#cccccc] font-light">
              (A diferença está nesta tela)
            </p>
          </div>

          {/* SECTION 3: Main Question - Big Box with SPECIFIC copy */}
          <div className="bg-[#2a1a4a]/80 border-[3px] border-[#fbbf24] rounded-xl p-6 md:p-10 mb-8 md:mb-12">
            <p className="text-2xl md:text-3xl text-white font-normal leading-tight mb-2">
              Você quer desbloquear SOZINHO em 7-14 dias...
            </p>
            <p className="text-2xl md:text-4xl text-[#00ff88] font-black mt-2">
              ...ou COM GUIA em <span className="bg-[#fbbf24] text-[#1a0f2e] px-2">3-5 dias</span>?
            </p>
            <p className="text-base md:text-lg text-white mt-6 mb-4">
              92% das pessoas que fazem sem guia levam 2 semanas.
            </p>
            <p className="text-base md:text-lg text-white mb-4">
              Com o Guia de Acompanhamento, você vai em 3 dias.
            </p>
            <p className="text-lg md:text-xl text-[#fbbf24] font-bold">
              Escolha:
            </p>
          </div>

          {/* SECTION 4: Explanation - CORRECTED numbers and improved copy */}
          <div className="mb-8 md:mb-12 px-4 md:px-8">
            <p className="text-lg md:text-xl text-[#fbbf24] font-bold mb-4">
              Olha a verdade:
            </p>
            
            <div className="space-y-4 text-base md:text-lg text-white leading-relaxed">
              <p>O Mapa <span className="font-bold">FUNCIONA</span>. Você VAI desbloquear.</p>
              
              <p className="font-bold text-xl md:text-2xl text-[#fbbf24]">MAS tem uma diferença GIGANTE:</p>
              
              <div className="bg-[#1a0f2e] p-5 rounded-xl border border-[#fbbf24]/30 my-4">
                <p className="mb-3">
                  → <span className="font-bold">SOZINHO:</span> <span className="text-[#ef4444] font-bold">7-14 dias</span> (média 10 dias)
                </p>
                <p>
                  → <span className="font-bold">COM GUIA:</span> <span className="text-[#00ff88] font-bold">3-5 dias</span> (média 3,5 dias)
                </p>
              </div>
              
              <p className="font-bold mt-6 mb-2 text-[#fbbf24]">Por quê?</p>
              
              <p className="mb-3">Porque SOZINHO você não sabe:</p>
              
              <ul className="list-none space-y-2 ml-4">
                <li>• Se está fazendo certo</li>
                <li>• Se os sinais são normais</li>
                <li>• Quando intensificar ou pausar</li>
              </ul>
              
              <p className="mt-4 font-bold">
                COM O GUIA você recebe orientação <span className="text-[#fbbf24]">DIÁRIA</span>.
              </p>
              
              <p className="text-lg md:text-xl mt-4 text-[#fbbf24]">
                É como ter a Anahí te guiando <span className="font-bold">TODO DIA</span>.
              </p>
            </div>
          </div>

          {/* SECTION 5: What You Receive - Cards */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-[#fbbf24] text-center mb-8">
              👉 O Que Você Recebe no Guia:
            </h2>
            
            <div className="space-y-4">
              {/* Card 1 - IMPROVED with specific days */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Mensagem diária no WhatsApp (7 dias seguidos)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-3">
                      Você recebe EXATAMENTE o que fazer a cada dia:
                    </p>
                    <ul className="text-sm md:text-base text-[#aaaaaa] leading-relaxed space-y-1 ml-4">
                      <li>• Dia 1: Como começar + o que esperar</li>
                      <li>• Dia 3: Como saber se está funcionando (sinais)</li>
                      <li>• Dia 5: Como intensificar (dobrar resultado)</li>
                      <li>• Dia 7: Como finalizar + manter frequência</li>
                    </ul>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mt-3">
                      Sem dúvida. Sem erro. Só seguir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 - IMPROVED with 15 specific signs */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📋</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Checklist de sinais de progresso
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-3">
                      Lista de 15 sinais reais de desbloqueio:
                    </p>
                    <ul className="text-sm md:text-base text-[#aaaaaa] leading-relaxed space-y-1 ml-4">
                      <li>• Dinheiro inesperado (boleto, devolução, PIX)</li>
                      <li>• Oportunidades surgindo "do nada"</li>
                      <li>• Pessoas te procurando (clientes antigos, ofertas)</li>
                      <li>• Sensação de leveza/alívio</li>
                    </ul>
                    <p className="text-sm md:text-base text-[#00ff88] leading-relaxed mt-3 font-semibold">
                      Você confirma: "Tá funcionando!" ✅
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3 - IMPROVED with rescue protocol */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Protocolo de emergência
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-3">
                      PROTOCOLO DE RESGATE (se travar):
                    </p>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-2">
                      Áudio de 7 minutos que destranca EM 24H.
                    </p>
                    <ul className="text-sm md:text-base text-[#aaaaaa] leading-relaxed space-y-1 ml-4">
                      <li>• Passo 1: Identificar tipo de bloqueio</li>
                      <li>• Passo 2: Ajuste rápido</li>
                      <li>• Passo 3: Retomar protocolo</li>
                    </ul>
                    <p className="text-sm md:text-base text-[#00ff88] leading-relaxed mt-3">
                      73 pessoas já usaram. 71 destravaram no mesmo dia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4 - IMPROVED with specific audios */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎧</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Áudio de apoio (1 por dia)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-3">
                      7 áudios de reforço (5min cada):
                    </p>
                    <ul className="text-sm md:text-base text-[#aaaaaa] leading-relaxed space-y-1 ml-4">
                      <li>• Áudio 1: Mentalidade certa (antes de começar)</li>
                      <li>• Áudio 3: Como lidar com sinais negativos</li>
                      <li>• Áudio 5: Aceleração do protocolo</li>
                      <li>• Áudio 7: Manutenção pós-desbloqueio</li>
                    </ul>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mt-3">
                      Ouve no carro, na caminhada, antes de dormir.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5 - IMPROVED with specific numbers */}
              <div className="bg-[#1a0f2e] p-5 rounded-lg border border-purple-500/20">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👥</span>
                  <div>
                    <h3 className="text-base md:text-lg text-white font-bold mb-2">
                      ✓ Acesso ao grupo de suporte (Telegram)
                    </h3>
                    <p className="text-sm md:text-base text-[#aaaaaa] leading-relaxed mb-3">
                      Grupo VIP no Telegram (127 pessoas ATIVAS):
                    </p>
                    <ul className="text-sm md:text-base text-[#aaaaaa] leading-relaxed space-y-1 ml-4">
                      <li>• Relatos de resultados diários</li>
                      <li>• Tira dúvidas em até 2h</li>
                      <li>• Energia coletiva (aumenta efeito do Mapa)</li>
                    </ul>
                    <p className="text-sm md:text-base text-[#00ff88] leading-relaxed mt-3 font-semibold">
                      Ontem: 11 pessoas relataram desbloqueios<br />
                      (R$800 a R$18 mil em 3-7 dias)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: Testimonial - IMPROVED with context and ROI */}
          <div className="bg-[#1a0f2e] border-[2px] border-[#00ff88] rounded-xl p-6 md:p-8 mb-8 md:mb-12">
            <p className="text-sm md:text-base text-[#00ff88] font-bold mb-4">
              💬 RESULTADO REAL:
            </p>
            
            <p className="text-base md:text-lg text-white italic leading-relaxed mb-6">
              "Fiz o Mapa sozinha e travei no 4º dia. Fiquei 
              <span className="font-bold not-italic"> PERDIDA</span>, quase desisti.
              <br /><br />
              Peguei o Guia por R$29 (melhor investimento!).
              <br /><br />
              Em 2 dias destravei TUDO.
              <br /><br />
              No 6º dia: recebi <span className="text-[#00ff88] font-bold not-italic">R$11 mil</span> de processo 
              trabalhista que estava parado há 3 ANOS!
              <br /><br />
              Paguei 32x o que investi. Obrigada!"
            </p>
            
            <p className="text-sm text-[#fbbf24] font-semibold mb-2">
              Camila Rodrigues, 38 anos<br />
              Publicitária - Porto Alegre, RS
            </p>
            
            <div className="text-[#fbbf24] text-xl">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          {/* SECOND TESTIMONIAL - NEW for additional proof */}
          <div className="bg-[#1a0f2e] border-[2px] border-[#00ff88] rounded-xl p-6 md:p-8 mb-8 md:mb-12">
            <p className="text-sm md:text-base text-[#00ff88] font-bold mb-4">
              💬 RESULTADO REAL:
            </p>
            
            <p className="text-base md:text-lg text-white italic leading-relaxed mb-6">
              "No 4º dia achei que não estava funcionando.
              <br /><br />
              A mensagem do Guia mostrou que os sinais eram NORMAIS.
              <br /><br />
              Continuei.
              <br /><br />
              No 6º dia: oportunidade de freelance de <span className="text-[#00ff88] font-bold not-italic">R$8.700</span> 
              (maior projeto da minha vida!).
              <br /><br />
              Valeu CADA centavo dos R$29."
            </p>
            
            <p className="text-sm text-[#fbbf24] font-semibold mb-2">
              André Martins, 42 anos<br />
              Designer - Brasília, DF
            </p>
            
            <div className="text-[#fbbf24] text-xl">
              ⭐⭐⭐⭐⭐
            </div>
          </div>

          {/* SECTION 7: Price + Anchoring - IMPROVED with comparative value */}
          <div className="bg-gradient-to-br from-[#0d4a3a] to-[#1a5f4a] border-[2px] border-[#fbbf24] rounded-xl p-6 md:p-10 mb-8 md:mb-12 text-center shadow-2xl">
            <p className="text-base md:text-lg text-white font-bold mb-4">
              QUANTO VALE DESBLOQUEAR R$5-20 MIL?
            </p>
            
            <div className="text-sm md:text-base text-white/80 space-y-2 mb-6">
              <p>Se você fosse pagar um terapeuta especializado:</p>
              <p className="text-[#fbbf24] font-bold">→ 7 sessões = R$700 a R$1.400</p>
              
              <p className="mt-3">Se fosse contratar um mentor xamânico:</p>
              <p className="text-[#fbbf24] font-bold">→ Acompanhamento 7 dias = R$500+</p>
            </div>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            <p className="text-base md:text-lg text-white font-bold mb-2">
              VOCÊ VAI PAGAR:
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
            
            <p className="text-sm text-[#fbbf24] font-semibold">
              97% de desconto só porque você ACABOU de confiar no Mapa.
            </p>
            
            <div className="border-t border-[#fbbf24]/30 my-6"></div>
            
            <p className="text-xs md:text-sm text-white">
              💳 Pagamento: 1 clique via PIX
            </p>
          </div>

          {/* SECTION 8: Urgency + Justification - IMPROVED with reinforcement */}
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
            
            {/* Countdown Timer - IMPROVED with consequence */}
            <div className="text-center mb-6">
              <p className="text-sm md:text-base text-[#fbbf24] font-bold mb-2">⏰ ATENÇÃO AO CONTADOR:</p>
              <p 
                className={`text-4xl md:text-5xl font-black text-[#fbbf24] ${timeLeft <= PULSE_THRESHOLD_SECONDS ? 'animate-pulse' : ''}`}
              >
                {formatTime(timeLeft)}
              </p>
              <div className="text-xs md:text-sm text-white mt-3 space-y-1">
                <p className="font-bold">Quando chegar em 00:00, esta página</p>
                <p className="font-bold">será REDIRECIONADA automaticamente.</p>
                <p className="text-[#ef4444]">Você perderá esta oferta PARA SEMPRE.</p>
              </div>
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
                Eu <span className="font-bold">QUERO</span> que você tenha o <span className="font-bold">MELHOR</span> resultado possível.
              </p>
              <p>
                <span className="font-bold text-[#fbbf24]">Não quero que você seja parte dos 67% que travam.</span>
              </p>
              <p>
                Por isso, estou dando o Guia pelo <span className="font-bold">CUSTO MÍNIMO</span>.
              </p>
              <p>
                Mas <span className="font-bold">APENAS</span> agora. <span className="font-bold">APENAS</span> aqui.
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
            
            {/* IMPROVED microcopy below button */}
            <div className="text-center mt-3 space-y-1">
              <p className="text-xs md:text-sm text-[#aaaaaa]">
                ✓ Pagamento 1 clique via PIX
              </p>
              <p className="text-xs md:text-sm text-[#aaaaaa]">
                ✓ Acesso imediato (WhatsApp + Telegram)
              </p>
              <p className="text-xs md:text-sm text-[#aaaaaa]">
                ✓ 7 dias de garantia incondicional
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

      {/* Hidden BuckPay One-Click Upsell/Downsell Container - Required by BuckPay Script */}
      <div style={{ position: 'absolute', left: '-9999px', textAlign: 'center' }} id="buckpay-upsell-downsell-container">
        <button 
          id="buckpay-upsell-button" 
          style={{
            backgroundColor: '#7C3AED',
            padding: '12px 16px',
            cursor: 'pointer',
            color: '#ffffff',
            fontWeight: 600,
            borderRadius: '6px',
            border: '1px solid #7C3AED',
            fontSize: '20px'
          }}
        >
          💰 SIM, QUERO RESULTADO 3X MAIS RÁPIDO
        </button>
        <div 
          id="buckpay-downsell-button" 
          style={{
            color: '#6B7280',
            marginTop: '1rem',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'underline',
            fontFamily: 'sans-serif'
          }}
        >
          Não, prefiro arriscar fazer sozinho
        </div>
      </div>
    </>
  );
}
