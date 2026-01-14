# 📚 Documentação Completa: Meta Conversions API (CAPI)

## 🎯 Visão Geral

Este documento apresenta a implementação completa do sistema de tracking reestruturado para o projeto `quiz-xamanico`, incluindo:

- **Unified Event ID**: Geração consistente de IDs para deduplicação entre client-side e server-side
- **Advanced Matching**: 12+ parâmetros de informação do cliente para maximizar EMQ (Event Match Quality > 8.0)
- **Purchase Event Parameters**: Parâmetros completos para eventos de compra (content_ids, content_type, order_id, num_items)
- **Test Events**: Suporte para código de teste no ambiente de desenvolvimento
- **LGPD/GDPR Compliance**: Banner de consentimento e bloqueio de tracking
- **Testes Automatizados**: Testes unitários para validação da implementação

---

## 📁 Estrutura de Arquivos

```
quiz-xamanico/
├── api/
│   ├── track-event.ts              # Endpoint CAPI para tracking server-side
│   └── webhooks/
│       └── buckpay.ts               # Webhook handler para BuckPay
├── src/
│   ├── components/
│   │   └── ConsentBanner.tsx        # Banner de consentimento LGPD/GDPR
│   ├── config/
│   │   └── tracking.config.ts       # Configurações centralizadas
│   └── utils/
│       ├── eventIdGenerator.ts      # Gerador unificado de event_id
│       ├── advancedMatching.ts      # Normalização e hashing para Advanced Matching
│       ├── capi.ts                  # Cliente CAPI com builders de payload
│       ├── tracking.ts              # Sistema de tracking legado (mantido)
│       ├── advancedTracking.ts      # Sistema avançado (mantido)
│       └── buckpay.ts               # Integração BuckPay (mantido)
├── test/
│   ├── setup.ts                     # Configuração de testes
│   ├── eventIdGenerator.test.ts     # Testes para event_id
│   └── advancedMatching.test.ts     # Testes para normalização
└── vitest.config.ts                 # Configuração do Vitest
```

---

## 🔑 Componentes Principais

### 1. Event ID Generator (`src/utils/eventIdGenerator.ts`)

Gera IDs de evento únicos e consistentes para deduplicação entre pixel client-side e CAPI server-side.

**Formato do Event ID:**
- UUID: `evt_550e8400-e29b-41d4-a716-446655440000`
- Timestamp (fallback): `evt_l8x9m2_a4b5c6d`

**Funções Principais:**

```typescript
import { eventIdGenerator } from './utils/eventIdGenerator';

// Gerar event_id simples
const eventId = eventIdGenerator.generate();

// Gerar com metadados
const metadata = eventIdGenerator.generateWithMetadata('Purchase', 'client');
// { eventId: 'evt_...', timestamp: 1234567890, eventName: 'Purchase', source: 'client' }

// Validar event_id
eventIdGenerator.validate(eventId); // true/false

// Armazenar para detecção de duplicatas
eventIdGenerator.store(eventId, 'Purchase');

// Verificar duplicata
eventIdGenerator.isDuplicate(eventId); // true/false

// Limpar histórico (útil para testes)
eventIdGenerator.clearStored();
```

**Características:**
- ✅ Compatível com Web Crypto API
- ✅ Fallback para navegadores antigos
- ✅ Armazena últimos 100 eventos em localStorage
- ✅ Detecção de duplicatas

---

### 2. Advanced Matching (`src/utils/advancedMatching.ts`)

Implementa normalização e hashing de dados do usuário conforme especificações Meta para maximizar EMQ.

**Campos Suportados (12+):**

| Campo | Tipo | Normalização | Hashing | Descrição |
|-------|------|--------------|---------|-----------|
| `email` | String | Lowercase, trim | SHA-256 | Email do usuário |
| `phone` | String | Apenas números, código país | SHA-256 | Telefone com código país |
| `firstName` | String | Lowercase, sem especiais | SHA-256 | Primeiro nome |
| `lastName` | String | Lowercase, sem especiais | SHA-256 | Sobrenome |
| `city` | String | Lowercase, sem especiais | SHA-256 | Cidade |
| `state` | String | Código 2 letras | SHA-256 | Estado/província |
| `zipCode` | String | Alfanumérico | SHA-256 | CEP |
| `country` | String | Código ISO 2 letras | SHA-256 | País |
| `gender` | 'm'\|'f' | - | Não | Gênero |
| `dateOfBirth` | String | YYYYMMDD | Não | Data de nascimento |
| `fbp` | String | - | Não | Facebook Browser ID (cookie _fbp) |
| `fbc` | String | - | Não | Facebook Click ID (cookie _fbc ou fbclid) |
| `clientIpAddress` | String | - | Não | IP do cliente (server-side) |
| `clientUserAgent` | String | - | Não | User agent do navegador |
| `externalId` | String | - | Não | ID do usuário no seu sistema |

**Exemplo de Uso:**

```typescript
import { advancedMatching } from './utils/advancedMatching';

const userData = {
  email: 'USUARIO@EXAMPLE.COM',
  phone: '(11) 99999-9999',
  firstName: 'João',
  lastName: 'Silva',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100',
  country: 'Brasil',
  gender: 'm',
  dateOfBirth: '1990-01-15',
  fbp: getFbpCookie(),
  fbc: getFbcCookie(),
};

// Normalizar e hashar automaticamente
const normalizedData = await advancedMatching.build(userData);

// Resultado:
// {
//   em: '482a...', // SHA-256 de 'usuario@example.com'
//   ph: 'e3b0...', // SHA-256 de '5511999999999'
//   fn: 'a8b9...', // SHA-256 de 'joao'
//   ln: 'c7d8...', // SHA-256 de 'silva'
//   ct: 'f2e1...', // SHA-256 de 'sao paulo'
//   st: 'd4c3...', // SHA-256 de 'sp'
//   zp: 'b5a6...', // SHA-256 de '01310100'
//   country: '9e8f...', // SHA-256 de 'br'
//   ge: 'm',
//   db: '19900115',
//   fbp: 'fb.1.123456.abcdef',
//   fbc: 'fb.1.123456.ghijkl'
// }

// Contar parâmetros fornecidos
const count = advancedMatching.count(normalizedData); // 12

// Validar
const validation = advancedMatching.validate(normalizedData);
// {
//   valid: true,
//   message: 'Advanced Matching configured with 12 parameters (target: 12+)',
//   parameterCount: 12
// }
```

**Funções de Normalização Individual:**

```typescript
// Email
advancedMatching.normalizeEmail('  TEST@EXAMPLE.COM  '); // 'test@example.com'

// Telefone
advancedMatching.normalizePhone('(11) 99999-9999'); // '5511999999999'

// Nome
advancedMatching.normalizeName('João-Paulo!'); // 'joaopaulo'

// Estado
advancedMatching.normalizeState('São Paulo'); // 'sp'

// CEP
advancedMatching.normalizeZipCode('01310-100'); // '01310100'

// País
advancedMatching.normalizeCountry('Brasil'); // 'br'

// Data de nascimento
advancedMatching.normalizeDateOfBirth('1990-01-15'); // '19900115'

// Hash SHA-256
await advancedMatching.hash('test@example.com'); // '973dfe463ec85785f5f95af5ba3906ee...'
```

---

### 3. CAPI Client (`src/utils/capi.ts`)

Cliente completo para envio de eventos ao Meta Conversions API.

**Builders de Custom Data:**

```typescript
import { capi } from './utils/capi';

// Purchase Event
const purchaseData = capi.buildPurchaseCustomData({
  value: 97.00,
  currency: 'BRL',
  contentIds: ['mapa-xamanico-001'],
  contentName: 'Mapa Xamânico - Curso Completo',
  contentType: 'product',
  orderId: 'order_12345',
  numItems: 1,
  contents: [
    { id: 'mapa-xamanico-001', quantity: 1, item_price: 97.00 }
  ]
});

// Lead Event
const leadData = capi.buildLeadCustomData({
  contentName: 'Quiz Completo',
  value: 100,
  currency: 'BRL',
  status: 'completed',
  predictedLtv: 297.00
});

// InitiateCheckout Event
const checkoutData = capi.buildInitiateCheckoutCustomData({
  value: 97.00,
  currency: 'BRL',
  contentIds: ['mapa-xamanico-001'],
  contentName: 'Mapa Xamânico',
  numItems: 1
});

// ViewContent Event
const viewData = capi.buildViewContentCustomData({
  contentIds: ['mapa-xamanico-001'],
  contentName: 'Mapa Xamânico',
  contentType: 'product',
  value: 97.00,
  currency: 'BRL'
});
```

**Build Event Payload:**

```typescript
// Construir payload completo
const payload = await capi.buildEventPayload(
  'Purchase',                    // Nome do evento
  userData,                      // Dados do usuário (serão normalizados e hashados)
  customData,                    // Custom data do evento
  'https://example.com/obrigado', // URL onde ocorreu o evento
  'evt_12345',                   // Event ID (opcional, será gerado se não fornecido)
  'TEST12345'                    // Test event code (opcional)
);

// Payload resultante:
// {
//   event_name: 'Purchase',
//   event_time: 1704729600,
//   event_id: 'evt_12345',
//   event_source_url: 'https://example.com/obrigado',
//   action_source: 'website',
//   user_data: { em: '...', ph: '...', ... },
//   custom_data: { value: 97.00, currency: 'BRL', ... },
//   test_event_code: 'TEST12345'
// }
```

**Validação de Payload:**

```typescript
const validation = capi.validatePayload(payload);
// {
//   valid: true,
//   errors: []
// }
```

---

### 4. API Endpoint (`/api/track-event`)

Vercel Edge Function para tracking server-side.

**Request:**

```typescript
POST /api/track-event
Content-Type: application/json

{
  "eventName": "Purchase",
  "eventId": "evt_12345",  // Opcional, será gerado se não fornecido
  "userData": {
    "email": "usuario@example.com",
    "phone": "11999999999",
    "firstName": "João",
    "lastName": "Silva",
    "city": "São Paulo",
    "state": "SP",
    "zipCode": "01310100",
    "country": "BR"
    // ... outros campos
  },
  "customData": {
    "value": 97.00,
    "currency": "BRL",
    "content_ids": ["mapa-xamanico-001"],
    "content_name": "Mapa Xamânico",
    "content_type": "product",
    "order_id": "order_12345",
    "num_items": 1
  },
  "eventSourceUrl": "https://example.com/obrigado",
  "testEventCode": "TEST12345"  // Opcional
}
```

**Response:**

```typescript
// Sucesso
{
  "success": true,
  "eventId": "evt_12345",
  "message": "Event tracked successfully",
  "eventsReceived": 1,
  "fbTraceId": "A1B2C3D4E5"
}

// Erro
{
  "success": false,
  "error": "Invalid payload",
  "errors": ["user_data must contain at least email or phone"]
}
```

**Exemplo de Uso Client-Side:**

```typescript
// Após o usuário completar uma compra
const response = await fetch('/api/track-event', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    eventName: 'Purchase',
    eventId: eventIdGenerator.generate(), // Gerar mesmo event_id usado no pixel
    userData: {
      email: userEmail,
      phone: userPhone,
      firstName: userFirstName,
      // ... outros dados
    },
    customData: {
      value: 97.00,
      currency: 'BRL',
      content_ids: ['mapa-xamanico-001'],
      order_id: transactionId,
      num_items: 1
    }
  })
});

const result = await response.json();
console.log('CAPI Event:', result);
```

---

### 5. Webhook Handler (`/api/webhooks/buckpay`)

Processa webhooks do BuckPay e envia eventos Purchase para CAPI.

**Eventos Suportados:**

- `transaction.created`: PIX gerado, aguardando pagamento → envia `InitiateCheckout`
- `transaction.processed`: Pagamento confirmado (status: paid) → envia `Purchase`

**Fluxo:**

1. BuckPay envia webhook quando transação muda de status
2. Handler valida payload
3. Extrai dados do comprador (email, telefone, nome)
4. Gera event_id consistente: `purchase_{transaction_id}`
5. Verifica duplicatas (previne reprocessamento)
6. Envia evento para CAPI com Advanced Matching
7. Armazena event_id para futura validação

**Configuração no BuckPay:**

```
Webhook URL: https://seu-dominio.com/api/webhooks/buckpay
Eventos: transaction.created, transaction.processed
```

---

### 6. Consent Banner (`src/components/ConsentBanner.tsx`)

Banner de consentimento LGPD/GDPR para bloqueio de tracking.

**Características:**

- ✅ Bloqueia tracking até consentimento do usuário
- ✅ Opções: Aceitar Todos, Personalizar, Apenas Essenciais
- ✅ Armazena preferências em localStorage
- ✅ Versão de consentimento (requer novo consentimento se política mudar)
- ✅ Design responsivo e acessível

**Integração no App:**

```tsx
import { ConsentBanner, blockTrackingUntilConsent } from './components/ConsentBanner';

function App() {
  useEffect(() => {
    // Bloquear tracking antes de inicializar pixels
    blockTrackingUntilConsent();
  }, []);

  return (
    <>
      <ConsentBanner
        onConsentGiven={(preferences) => {
          console.log('Consent given:', preferences);
          // Recarrega a página para inicializar tracking
        }}
        onConsentDeclined={() => {
          console.log('Consent declined');
        }}
      />
      {/* Resto da aplicação */}
    </>
  );
}
```

**API de Consentimento:**

```typescript
import {
  getConsentPreferences,
  saveConsentPreferences,
  clearConsentPreferences,
  hasTrackingConsent,
  hasAnalyticsConsent,
  hasMarketingConsent,
} from './components/ConsentBanner';

// Verificar consentimento
if (hasMarketingConsent()) {
  // Inicializar Meta Pixel
  fbq('track', 'PageView');
}

// Salvar preferências
saveConsentPreferences({
  analytics: true,
  marketing: false
});

// Limpar (opt-out)
clearConsentPreferences();
```

---

## 🎯 Implementação Passo a Passo

### Passo 1: Configurar Variáveis de Ambiente

Crie arquivo `.env` na raiz do projeto:

```bash
# Meta CAPI
VITE_META_ACCESS_TOKEN=your_meta_access_token_here
VITE_META_PIXEL_ID=1908080873443730
VITE_META_TEST_EVENT_CODE=TEST12345  # Apenas para dev/test

# BuckPay
VITE_BUCKPAY_SECRET_KEY=your_buckpay_secret_key
VITE_BUCKPAY_USER_AGENT=your_user_agent

# VTurb
VITE_VTURB_API_TOKEN=your_vturb_token
```

**Importante:** No Vercel, configure essas variáveis em:
`Settings → Environment Variables`

### Passo 2: Tracking Client-Side com Event ID

```typescript
import { eventIdGenerator } from './utils/eventIdGenerator';

// No click do botão "Comprar"
const handlePurchaseClick = () => {
  // Gerar event_id
  const eventId = eventIdGenerator.generate();
  
  // Enviar para Meta Pixel (client-side)
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: 97.00,
      currency: 'BRL',
      content_ids: ['mapa-xamanico-001'],
      content_type: 'product'
    }, {
      eventID: eventId  // IMPORTANTE: passar event_id para deduplicação
    });
  }
  
  // Enviar para CAPI (server-side) com MESMO event_id
  fetch('/api/track-event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName: 'Purchase',
      eventId: eventId,  // MESMO ID!
      userData: {
        email: userEmail,
        phone: userPhone,
        // ... outros dados
      },
      customData: {
        value: 97.00,
        currency: 'BRL',
        content_ids: ['mapa-xamanico-001'],
        content_type: 'product',
        order_id: orderId,
        num_items: 1
      }
    })
  });
  
  // Armazenar event_id para evitar duplicatas
  eventIdGenerator.store(eventId, 'Purchase');
};
```

### Passo 3: Verificar Eventos no Meta Events Manager

1. Acesse: https://business.facebook.com/events_manager
2. Selecione seu pixel: `1908080873443730`
3. Vá em: **Test Events**
4. Se configurou `VITE_META_TEST_EVENT_CODE`, verá eventos aparecerem em tempo real
5. Verifique:
   - Event Match Quality (EMQ) > 8.0
   - Deduplication Rate > 95%
   - Customer Information Parameters ≥ 12

### Passo 4: Medir Deduplication Rate

No Meta Events Manager:

1. **Overview** → **Event Match Quality**
2. Procure por: **"Events matched between sources"**
3. Meta:
   - Server events: 100%
   - Browser events: 100%
   - Matched events: >95% ✅

**Fórmula:**
```
Deduplication Rate = (Matched Events / Total Events) × 100%
```

---

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm run test

# Executar com UI
npm run test:ui

# Executar com coverage
npm run test:coverage
```

### Estrutura de Testes

```
test/
├── setup.ts                      # Mock de localStorage
├── eventIdGenerator.test.ts      # 15+ testes
└── advancedMatching.test.ts      # 20+ testes
```

**Coverage Esperado:**
- Event ID Generator: 100%
- Advanced Matching: 95%+
- CAPI Builders: 90%+

---

## 📊 Métricas de Sucesso

### Objetivos

| Métrica | Target | Como Medir |
|---------|--------|------------|
| **Deduplication Rate** | >95% | Meta Events Manager → Overview |
| **Event Match Quality** | >8.0 | Meta Events Manager → Data Quality |
| **Customer Info Parameters** | ≥12 | CAPI payloads |
| **Test Event Success Rate** | 100% | Test Events tab |
| **API Response Time** | <500ms | Vercel Analytics |
| **Test Coverage** | >90% | `npm run test:coverage` |

### Monitoramento

**Meta Events Manager:**
- Overview → Event Match Quality
- Diagnostics → Data Quality
- Test Events (em desenvolvimento)

**Vercel Analytics:**
- `/api/track-event` - Response time
- `/api/webhooks/buckpay` - Success rate

**Browser Console (Dev):**
```javascript
// Verificar event IDs armazenados
eventIdGenerator.getStored();

// Verificar consentimento
hasTrackingConsent();
```

---

## 🔐 Segurança

### Tokens e Chaves

- ❌ **NUNCA** exponha `META_ACCESS_TOKEN` no client-side
- ✅ Use apenas em Edge Functions (`/api/*`)
- ✅ Configure como variável de ambiente no Vercel
- ✅ Rotacione tokens regularmente

### Dados do Usuário

- ✅ Todos os dados sensíveis são hashados (SHA-256)
- ✅ Normalização antes do hash (compliance com Meta)
- ✅ Sem logs de PII (email, telefone, etc)
- ✅ Consentimento explícito (LGPD/GDPR)

### Webhooks

- ✅ Validação de payload
- ✅ Detecção de duplicatas
- ✅ Rate limiting (Vercel Edge Network)
- ⚠️ Considere adicionar signature validation do BuckPay

---

## 🐛 Troubleshooting

### Problema: Events não aparecem no Meta Events Manager

**Soluções:**
1. Verifique `VITE_META_ACCESS_TOKEN` está configurado
2. Confirme Pixel ID correto: `1908080873443730`
3. Aguarde 2-5 minutos (delay normal)
4. Use Test Events com `test_event_code`
5. Verifique Console do navegador por erros

### Problema: EMQ < 8.0

**Soluções:**
1. Adicione mais campos em `userData`:
   - ✅ email, phone, firstName, lastName
   - ✅ city, state, zipCode, country
   - ✅ fbp, fbc (cookies do Facebook)
   - ✅ gender, dateOfBirth
2. Certifique-se de normalizar antes de hashar
3. Envie `client_ip_address` do server-side

### Problema: Deduplication Rate < 95%

**Soluções:**
1. Use **mesmo** `event_id` no pixel e CAPI
2. Envie eventos client-side e server-side **simultaneamente**
3. Verifique timing: eventos devem chegar em <5 minutos
4. Valide `event_id` está no formato correto

### Problema: Consent Banner não aparece

**Soluções:**
1. Verifique se já há consentimento salvo: `getConsentPreferences()`
2. Limpe localStorage: `clearConsentPreferences()`
3. Verifique se componente está importado no App
4. Veja Console por erros de renderização

### Problema: Webhook não processa eventos

**Soluções:**
1. Verifique URL do webhook no BuckPay dashboard
2. Teste localmente com ngrok ou similar
3. Veja logs do Vercel: `vercel logs`
4. Valide formato do payload do BuckPay
5. Certifique-se de retornar sempre `200 OK`

---

## 📚 Referências

- [Meta Conversions API Documentation](https://developers.facebook.com/docs/marketing-api/conversions-api)
- [Meta Advanced Matching](https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/customer-information-parameters)
- [Meta Event Deduplication](https://developers.facebook.com/docs/marketing-api/conversions-api/deduplicate-pixel-and-server-events)
- [LGPD (Lei Geral de Proteção de Dados)](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [GDPR (General Data Protection Regulation)](https://gdpr.eu/)
- [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions)

---

## 🆘 Suporte

Para dúvidas ou problemas:

1. Consulte esta documentação primeiro
2. Verifique os testes: `npm run test`
3. Veja o código-fonte com comentários detalhados
4. Revise os logs do Vercel
5. Teste no Meta Events Manager (Test Events)

---

**Última Atualização:** 14 de Janeiro de 2024  
**Versão:** 1.0.0  
**Status:** ✅ Implementação Completa
