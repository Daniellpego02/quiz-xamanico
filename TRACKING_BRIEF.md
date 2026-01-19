# Tracking Brief (Quiz + Meta Ads)

## 1) Stack

| Componente | Tecnologia |
|------------|------------|
| **Framework** | React 18 + TypeScript + Vite 5 |
| **Hosting** | Vercel (Static Build + Edge Functions) |
| **Backend/Functions** | Vercel Edge Functions (`/api/*`) |
| **Checkout** | BuckPay (PerfectPay) - PIX e Cartão |
| **Tag Manager** | Não utiliza GTM - Scripts diretos no HTML |

## 2) URLs / Rotas do Funil

| Etapa | Rota / URL |
|-------|------------|
| **Entrada do Quiz** | `/` (Hero → Quiz) |
| **Steps** | Não mudam URL (SPA - Single Page Application) |
| **Resultado do Quiz** | `/` (tela de loading → VSL na mesma página) |
| **VSL** | `/` (componente `VSLPage` após loading) |
| **Checkout** | Externo - `https://go.perfectpay.com.br/PPU38CQ4OE0` |
| **Oferta Principal** | `/oferta1` |
| **Oferta Alternativa** | `/oferta2` |
| **Upsell 1** | `/up1` |
| **Downsell 1** | `/down1` |
| **Obrigado** | `/obrigado` (página estática separada: `public/obrigado.html`) |

### Fluxo Completo do Funil:
```
Hero (/)
  → Quiz (4 perguntas)
    → Loading/Análise
      → VSL Page
        → Offer Page
          → Checkout (PerfectPay/BuckPay)
            → Upsell 1 (/up1)
              → Downsell 1 (/down1) [se recusar]
                → Obrigado (/obrigado)
```

## 3) Eventos Meta (atual)

| Item | Valor/Status |
|------|--------------|
| **Pixel ID** | `1908080873443730` |
| **CAPI ativo?** | ✅ Sim - via `/api/track-event` (Vercel Edge Function) |
| **Onde o pixel é inicializado** | `index.html` (linha 49) e `public/obrigado.html` (linha 38-49) |
| **Onde eventos disparam** | Utilitário centralizado: `src/utils/tracking.ts` |
| **Deduplicação (event_id)?** | ✅ Sim - `src/utils/eventIdGenerator.ts` gera IDs únicos para client e server |
| **Advanced Matching?** | ✅ Sim - 12+ parâmetros via `src/utils/advancedMatching.ts` |

### Eventos Trackados:

#### Eventos Standard Meta Pixel:
| Evento | Quando Dispara | Localização |
|--------|----------------|-------------|
| `PageView` | Carregamento de todas as páginas | `index.html`, `public/obrigado.html` |
| `Lead` | Usuário clica para iniciar o quiz | `Hero.tsx` → `tracking.meta.lead()` |
| `CompleteRegistration` | Quiz completo | `Quiz.tsx` → `tracking.meta.completeRegistration()` |
| `ViewContent` | Visualização da oferta | `tracking.funnel.viewOffer()` |
| `InitiateCheckout` | Click no botão de compra | `tracking.meta.initiateCheckout()` |
| `Purchase` | Compra confirmada | Webhook BuckPay → `/api/webhooks/buckpay` → CAPI |

#### Eventos Custom (trackCustom):
| Evento | Quando Dispara | Dados Enviados |
|--------|----------------|----------------|
| `QuizStarted` | Usuário digita nome e inicia | `name_provided`, `user_name` |
| `QuizAnswer` | Cada resposta do quiz | `question_step`, `answer_value`, `answer_label`, `quiz_path` |
| `QuizProgress` | Após cada resposta | `percentage`, `step` |
| `QuizHalfway` | 50% do quiz completo | - |
| `QuizComplete` | Quiz finalizado | `content_name`, `path` |
| `CTAClick` | Click em CTAs | `content_name` |
| `ViewUpsell` | Visualização de upsell | `content_name` |
| `ViewDownsell` | Visualização de downsell | `content_name` |

### Configuração CAPI (Conversions API):

```typescript
// Endpoint: POST /api/track-event
// Arquivo: api/track-event.ts

{
  eventName: string;        // Nome do evento
  eventId?: string;         // ID único para deduplicação
  userData: {               // Advanced Matching (12+ parâmetros)
    email: string;
    phone: string;
    firstName?: string;
    lastName?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    // ...
  };
  customData?: {            // Dados específicos do evento
    value?: number;
    currency?: string;
    content_ids?: string[];
    order_id?: string;
    // ...
  };
  eventSourceUrl?: string;
}
```

## 4) Quiz: dados e lógica

### Perguntas (lista curta):

| # | Título | Tipo |
|---|--------|------|
| 0 | **CONEXÃO ENERGÉTICA** | Input (nome do usuário) |
| 1 | **PASSO 1 DE 4** | Múltipla escolha (3 opções) - Responsabilidade familiar/financeira |
| 2 | **PASSO 2 DE 4** | Múltipla escolha (3 opções) - Visão de prosperidade na família |
| 3 | **PASSO 3 DE 4** | Múltipla escolha (3 opções) - Maior medo nos próximos 6 meses |
| 4 | **PASSO 4 DE 4** | Botão único (aceitar diagnóstico) |

### Resultado final (tipos de perfil):

O quiz possui uma **estratégia de fluxo único** (single flow):
- **Quiz Path:** `finance` (hardcoded)
- Todos os usuários recebem o mesmo diagnóstico: **"Lealdade Invisível" e padrão de autopunição energética**
- Não há segmentação por tipo de perfil

### Variáveis que você salva:

| Variável | Storage | Descrição |
|----------|---------|-----------|
| `userName` | React State | Nome do usuário (em memória durante sessão) |
| `quizPath` | React State | Caminho do quiz (`finance`) |
| `utm_params` | sessionStorage | Parâmetros UTM da campanha |
| `event_ids_sent` | localStorage | IDs de eventos enviados (últimos 100) para deduplicação |
| `consent_preferences` | localStorage | Preferências de consentimento LGPD/GDPR |

### Como identifica sessão/usuário hoje:

| Método | Implementação |
|--------|---------------|
| **Session** | Não há identificação persistente de sessão |
| **UTM Tracking** | UTMFY captura e persiste UTMs via sessionStorage |
| **Facebook Click ID** | Captura `_fbc` cookie do Facebook (fbclid) |
| **Facebook Browser ID** | Captura `_fbp` cookie do Facebook |
| **Event ID** | Gerado via `crypto.randomUUID()` para cada evento |
| **Transaction ID** | Gerado pelo BuckPay no webhook de compra |

## 5) Objetivo de otimização

| Item | Valor |
|------|-------|
| **KPI principal** | Purchase (Compras via CAPI) |
| **Volume atual** | A definir (não especificado) |
| **Orçamento/dia** | A definir (não especificado) |
| **Janela de atribuição desejada** | 7 dias click, 1 dia view (padrão Meta) |

### Métricas de Tracking Alvo:

| Métrica | Target | Status |
|---------|--------|--------|
| **Event Match Quality (EMQ)** | > 8.0 | ✅ Implementado (12+ parâmetros) |
| **Deduplication Rate** | > 95% | ✅ Implementado (event_id unificado) |
| **CAPI Coverage** | 100% | ✅ Todos eventos enviados via CAPI |

---

## Resumo da Implementação Técnica

### Arquivos Principais de Tracking:

| Arquivo | Função |
|---------|--------|
| `src/utils/tracking.ts` | API centralizada para tracking client-side |
| `src/utils/eventIdGenerator.ts` | Geração de event_id para deduplicação |
| `src/utils/advancedMatching.ts` | Normalização e hashing para Advanced Matching |
| `src/utils/capi.ts` | Cliente CAPI com builders de payload |
| `src/config/tracking.config.ts` | Configurações centralizadas (Pixel ID, etc.) |
| `api/track-event.ts` | Endpoint CAPI (Vercel Edge Function) |
| `api/webhooks/buckpay.ts` | Webhook handler para Purchase events |
| `index.html` | Scripts de tracking (Meta Pixel, GA4, Clarity, UTMFY) |
| `public/obrigado.html` | Página de obrigado com tracking |

### Outros Sistemas de Tracking Integrados:

| Sistema | ID/Config | Função |
|---------|-----------|--------|
| **Google Analytics (GA4)** | `G-M78M3RH56H` | Analytics comportamental |
| **Microsoft Clarity** | `uq1qfi7fwi` | Session recordings e heatmaps |
| **UTMFY Pixel** | `69346cfb70f1cd636eb5e31c` | Atribuição UTM |

---

## Variáveis de Ambiente Necessárias

```bash
# Meta CAPI (server-side, sem prefixo VITE_)
META_ACCESS_TOKEN=seu_token_aqui
META_PIXEL_ID=1908080873443730

# Meta Test Events (desenvolvimento)
VITE_META_TEST_EVENT_CODE=TEST12345

# BuckPay (pagamentos)
VITE_BUCKPAY_SECRET_KEY=sua_chave_secreta
VITE_BUCKPAY_USER_AGENT=seu_user_agent

# VTurb (opcional, para VSL)
VITE_VTURB_API_TOKEN=seu_token_vturb
```

---

*Última atualização: Janeiro 2025*
