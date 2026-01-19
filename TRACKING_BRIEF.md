# Tracking Brief (Quiz + Meta Ads)

## 🚀 FUNIL OFICIAL OTIMIZADO

```
PageView → Lead → QuizComplete → ViewContent → InitiateCheckout → AddPaymentInfo → Purchase
```

### Objetivo da Otimização
- Reduzir ruído algorítmico
- Aumentar qualidade de sinal para Meta
- Melhorar aprendizado da máquina
- Baixar CPA em escala

---

## 1) Stack

| Componente | Tecnologia |
|------------|------------|
| **Framework** | React 18 + TypeScript + Vite 5 |
| **Hosting** | Vercel (Static Build + Edge Functions) |
| **Backend/Functions** | Vercel Edge Functions (`/api/*`) |
| **Checkout** | Lowify (`https://pay.lowify.com.br/checkout.php?product_id=manflx`) |
| **Tag Manager** | Não utiliza GTM - Scripts diretos no HTML |

## 2) URLs / Rotas do Funil

| Etapa | Rota / URL |
|-------|------------|
| **Entrada do Quiz** | `/` (Hero → Quiz) |
| **Steps** | Não mudam URL (SPA - Single Page Application) |
| **Resultado do Quiz** | `/` (tela de loading → VSL na mesma página) |
| **VSL** | `/` (componente `VSLPage` após loading) |
| **Checkout** | Externo - `https://pay.lowify.com.br/checkout.php?product_id=manflx` |
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
          → Checkout (Lowify)
            → Upsell 1 (/up1)
              → Downsell 1 (/down1) [se recusar]
                → Obrigado (/obrigado)
```

## 3) Eventos Meta (OTIMIZADO)

| Item | Valor/Status |
|------|--------------|
| **Pixel ID** | `1908080873443730` |
| **CAPI ativo?** | ✅ Sim - via `/api/track-event` e `/api/webhooks/lowify` (Vercel Edge Functions) |
| **Onde o pixel é inicializado** | `index.html` (linha 49) e `public/obrigado.html` (linha 38-49) |
| **Onde eventos disparam** | Utilitário centralizado: `src/utils/tracking.ts` |
| **Deduplicação (event_id)?** | ✅ Sim - `src/utils/eventIdGenerator.ts` gera IDs únicos para client e server |
| **Deduplicação por sessão?** | ✅ Sim - sessionStorage guards para InitiateCheckout, ViewContent, QuizHalfway |
| **Advanced Matching?** | ✅ Sim - 12+ parâmetros via `src/utils/advancedMatching.ts` |

### Eventos Trackados (Funil Limpo):

#### Eventos Standard Meta Pixel:
| Evento | Quando Dispara | Deduplicação | Localização |
|--------|----------------|--------------|-------------|
| `PageView` | Carregamento de todas as páginas | Automática | `index.html`, `public/obrigado.html` |
| `Lead` | Usuário clica para iniciar o quiz | Não | `Hero.tsx` → `tracking.meta.lead()` |
| `CompleteRegistration` | Quiz completo | Não | `Quiz.tsx` → `tracking.meta.completeRegistration()` |
| `ViewContent` | VSL ou oferta visível | ✅ 1x/sessão | `tracking.funnel.viewOffer()` |
| `InitiateCheckout` | Click REAL no botão de checkout | ✅ 1x/sessão | `tracking.meta.initiateCheckout()` |
| `AddPaymentInfo` | PIX gerado no checkout | Via CAPI/Webhook | Webhook Lowify → `/api/webhooks/lowify` |
| `Purchase` | Compra confirmada | Via CAPI/Webhook | Webhook Lowify → `/api/webhooks/lowify` |

#### Eventos Custom (trackCustom) - Ativos:
| Evento | Quando Dispara | Deduplicação | Dados Enviados |
|--------|----------------|--------------|----------------|
| `QuizStarted` | Usuário digita nome e inicia | Não | `name_provided`, `user_name` |
| `QuizHalfway` | 50% do quiz completo (opcional) | ✅ 1x/sessão | - |
| `QuizComplete` | Quiz finalizado | Não | `content_name`, `path`, `quiz_score`, `quiz_segment`, `time_to_complete` |
| `CTAClick` | Click em CTAs | Não | `content_name` |
| `ViewUpsell` | Visualização de upsell | Não | `content_name` |
| `ViewDownsell` | Visualização de downsell | Não | `content_name` |

---

## ⚠️ EVENTOS DEPRECATED (NÃO USAR)

Os seguintes eventos foram **removidos/desativados** para reduzir ruído algorítmico:

| Evento | Status | Motivo |
|--------|--------|--------|
| `QuizAnswer` | ❌ DEPRECATED | Redundante - agregado em QuizComplete |
| `QuizProgress` | ❌ DEPRECATED | Redundante - agregado em QuizComplete |
| `SubscribedButtonClick` | ❌ DEPRECATED | Tóxico - duplicação de InitiateCheckout |
| `button_clicked` | ❌ DEPRECATED | Tóxico - duplicação de InitiateCheckout |
| `vsl_page_view` | ❌ DEPRECATED | Redundante - substituído por ViewContent |

### Regras de Deduplicação por Sessão:

1. **InitiateCheckout**: Dispara APENAS 1x por sessão via `sessionStorage.ic_fired`
2. **ViewContent**: Dispara APENAS 1x por sessão via `sessionStorage.vc_fired`
3. **QuizHalfway**: Dispara APENAS 1x por sessão via `sessionStorage.qh_fired`

---

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
| `api/webhooks/lowify.ts` | **Webhook Lowify - AddPaymentInfo + Purchase** |
| `api/webhooks/buckpay.ts` | Webhook handler BuckPay (legado) |
| `index.html` | Scripts de tracking (Meta Pixel, GA4, Clarity, UTMFY) |
| `public/obrigado.html` | Página de obrigado com tracking |

---

## Webhook Lowify (Implementação Production-Ready)

### Endpoint
```
POST https://www.mapaxamanicooficial.online/api/webhooks/lowify
```

### Características:
- **Idempotência:** Previne duplicatas via cache (TTL 30 dias)
  - Key format: `lowify:${eventType}:${orderId}`
  - Retries da Lowify não geram eventos duplicados
- **Parsing flexível:** JSON, form-urlencoded, texto
- **Logging seguro:** PII mascarada (email: `a***@g***.com`, phone: `55*********`)
- **Modo debug:** `LOWIFY_WEBHOOK_DEBUG=true` para inspeção de payloads
- **Detecção heurística:** Identifica PIX_GENERATED vs APPROVED automaticamente
- **Rate limiting:** 30 requests/minute per IP
- **event_time:** Epoch seconds UTC (conversão automática)

### Eventos Trackados via CAPI:

| Status Detectado | Evento Meta | event_source_url |
|------------------|-------------|------------------|
| `PIX_GENERATED` (pending, waiting, pix_generated, aguardando) | `AddPaymentInfo` | `https://www.mapaxamanicooficial.online/checkout` |
| `APPROVED` (approved, paid, completed, aprovada, pago) | `Purchase` | `https://www.mapaxamanicooficial.online/obrigado` |
| `UNKNOWN` | Nenhum (apenas log) | - |

### Estratégia de event_id (Deduplicação):

| Cenário | event_id Format |
|---------|-----------------|
| Com order_id (AddPaymentInfo) | `lowify_addpayment_${orderId}` |
| Com order_id (Purchase) | `lowify_purchase_${orderId}` |
| Sem order_id (fallback) | `lowify_${event}_hash_${sha256(rawBody).slice(0,16)}` |

**Importante:** AddPaymentInfo e Purchase NUNCA compartilham o mesmo event_id.

### Normalização user_data (Meta CAPI Compliant):

| Campo | Normalização |
|-------|--------------|
| `email (em)` | trim + lowercase + SHA256 |
| `phone (ph)` | digits only + E.164 (55+DDD+número) + SHA256 |
| `external_id` | email normalizado (fallback) ou phone |

### Extração de Campos (Mapeamento Flexível):

| Campo | Paths Procurados |
|-------|------------------|
| `order_id` | `order_id`, `orderId`, `transaction_id`, `id`, `code`, `data.order_id` |
| `value` | `value`, `amount`, `total`, `price`, `data.value` (auto-converte centavos >1000) |
| `email` | `email`, `buyer_email`, `customer_email`, `customer.email`, `data.email` |
| `phone` | `phone`, `buyer_phone`, `customer_phone`, `data.phone` |
| `name` | `name`, `buyer_name`, `customer_name`, `data.name` |
| `fbp/fbc` | `fbp`, `_fbp`, `fbc`, `_fbc`, `fbclid` |

### Response (modo debug):

```json
{
  "success": true,
  "eventType": "APPROVED",
  "orderId": "ABC123",
  "eventId": "lowify_purchase_ABC123",
  "debug": {
    "detectedEventType": "APPROVED",
    "extracted": {
      "order_id": "ABC123",
      "value": 97.00,
      "currency": "BRL",
      "email_present": true,
      "phone_present": true
    },
    "idempotencyKey": "lowify:APPROVED:ABC123",
    "wasAlreadyProcessed": false
  },
  "debugKey": "lowify_debug:1705612345678:abc123de"
}
```

---

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

# Lowify Webhook (opcional)
LOWIFY_WEBHOOK_DEBUG=true  # Habilita logs detalhados

# VTurb (opcional, para VSL)
VITE_VTURB_API_TOKEN=seu_token_vturb
```

---

*Última atualização: Janeiro 2025*
