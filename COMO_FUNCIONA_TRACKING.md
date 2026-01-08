# 🎯 Como Funciona o Rastreamento - Explicação Simples

## O Que Foi Criado?

Imagina que seu funil é como uma loja física. O sistema de rastreamento que criei é como ter **câmeras de segurança inteligentes** que:

1. Identificam cada visitante que entra
2. Acompanham por onde ele anda
3. Registram o que ele faz
4. Avisam você quando ele compra

---

## 🔄 Fluxo Simplificado

```
VISITANTE CHEGA
      ↓
[1] Sistema cria um "crachá" único pra ele
      ↓
[2] Cada passo que ele dá é registrado
      ↓
[3] As respostas do quiz dão uma "nota" pra ele
      ↓
[4] Facebook/Google recebem essa nota
      ↓
[5] Eles aprendem quem compra e quem não compra
      ↓
[6] Seus anúncios ficam mais baratos! 💰
```

---

## 📊 O Que Cada Plataforma Faz

### 🔵 Meta Pixel (Facebook/Instagram Ads)
**O que faz:** Conta pro Facebook tudo que o visitante faz no seu site.

**Por que é importante:** O Facebook usa essas informações pra encontrar pessoas parecidas com quem comprou. Quanto mais dados você dá, mais barato fica o anúncio.

### 📈 Google Analytics (GA4)
**O que faz:** Te mostra relatórios bonitos sobre o comportamento dos visitantes.

**Por que é importante:** Você consegue ver onde as pessoas desistem, qual pergunta do quiz "trava" elas, etc.

### 🔍 Microsoft Clarity
**O que faz:** Grava a tela dos visitantes (como se fosse um vídeo).

**Por que é importante:** Você pode assistir o que a pessoa fez e descobrir por que ela não comprou.

### 🎬 VTurb
**O que faz:** Rastreia quanto do seu vídeo de vendas a pessoa assistiu.

**Por que é importante:** Você descobre se as pessoas estão assistindo até a oferta ou saindo antes.

### 💳 BuckPay
**O que faz:** Processa o pagamento via PIX e avisa quando alguém pagou.

**Por que é importante:** Quando o pagamento é confirmado, todas as plataformas são avisadas automaticamente.

---

## ⭐ O Sistema de Lead Scoring (Pontuação)

Essa é a parte mais importante! Funciona assim:

### Como a Pontuação é Calculada

Cada resposta do quiz dá pontos:

| Resposta | Pontos | Por quê? |
|----------|--------|----------|
| "Teto de Vidro" | 35 | Indica dor forte e clara |
| "Família passar necessidade" | 35 | Alta urgência emocional |
| "Envelhecer sem patrimônio" | 30 | Pensamento de longo prazo |
| "Montanha Russa" | 30 | Dor reconhecida |
| ... | ... | ... |

### O Que Acontece com a Pontuação

| Pontuação Total | Categoria | Valor Enviado pro Facebook |
|-----------------|-----------|---------------------------|
| 0-29 pontos | ❌ Desqualificado | R$ 0,00 |
| 30-69 pontos | 🟡 Morno | R$ 10,00 |
| 70-100 pontos | 🔥 Quente (Hot) | R$ 100,00 |

### Por Que Isso Importa?

O Facebook vê que leads "quentes" valem R$ 100 e leads "frios" valem R$ 0.

**Resultado:** Ele para de mostrar seus anúncios pra curiosos e foca em pessoas que têm perfil de comprador!

**Traduzindo:** Vendas mais baratas! 🎉

---

## 🔧 O Que Você Precisa Configurar

### Na Vercel (onde seu site está hospedado)

Vá em **Settings → Environment Variables** e adicione:

```
VITE_VTURB_API_TOKEN = 3032350019e84cd96c6e18de4a3f7cc45ea9952635eb0965e836022905ddc2a4
VITE_BUCKPAY_SECRET_KEY = [REDACTED]
VITE_BUCKPAY_USER_AGENT = [pedir pro seu gerente de contas do BuckPay]
```

### No BuckPay

Configure o webhook para apontar para:
```
https://seu-dominio.com/api/webhooks/buckpay
```

---

## 📱 Como Ver Se Está Funcionando

### 1. Meta Pixel Helper (Extensão do Chrome)
- Instale a extensão "Meta Pixel Helper"
- Acesse seu site
- Clique no ícone da extensão
- Deve mostrar os eventos sendo disparados

### 2. Google Analytics
- Acesse: https://analytics.google.com
- Vá em "Tempo Real" → "Eventos"
- Você verá os eventos chegando

### 3. Clarity
- Acesse: https://clarity.microsoft.com
- Veja as gravações de sessão
- Filtre por tags como `lead_qualidade: hot`

---

## 🎬 Para o Vídeo VTurb

Se você quiser rastrear o vídeo, precisa usar o componente assim no código:

```jsx
import { VTurbTracker } from './components/VTurbTracker';

<VTurbTracker
  videoId="SEU_VIDEO_ID_AQUI"
  pitchTimeSeconds={930}  // Momento da oferta em segundos (15m30s = 930)
/>
```

---

## 📝 Resumo Final

| O Que | Para Que Serve |
|-------|----------------|
| **event_id** | Evita contar a mesma venda 2 vezes |
| **Lead Score** | Ensina o Facebook quem é bom comprador |
| **UTM Tracking** | Sabe de qual anúncio veio cada venda |
| **Video Tracking** | Sabe se a pessoa viu a oferta |
| **Clarity Tags** | Permite ver gravações de leads quentes |

---

## ❓ Dúvidas Comuns

**P: Preciso fazer alguma coisa no código do quiz?**
R: Não! O sistema já está integrado e funcionando.

**P: Como sei se está funcionando?**
R: Use o Meta Pixel Helper no Chrome. Se aparecer eventos, está funcionando.

**P: Quanto tempo demora pra ver resultado?**
R: O Facebook precisa de ~50 conversões pra aprender bem. Geralmente 1-2 semanas.

**P: E se eu mudar as perguntas do quiz?**
R: Você precisa atualizar os valores de pontuação no arquivo `advancedTracking.ts`.

---

## 🆘 Precisa de Ajuda?

Se algo não estiver funcionando:

1. Verifique se as variáveis de ambiente estão configuradas na Vercel
2. Use o Meta Pixel Helper pra ver se os eventos estão disparando
3. Olhe o Console do navegador (F12) por erros

---

**Pronto!** Seu funil agora está configurado pra dar dados de qualidade pro Facebook e conseguir vendas mais baratas! 🚀
