# 🔍 AUDITORIA COMPLETA DO SISTEMA DE TRACKING

**Data:** 2026-01-18  
**Auditor:** Senior Analytics Engineer  
**Status:** ✅ Completa  

---

## 📋 SUMÁRIO EXECUTIVO

Esta auditoria analisa todos os arquivos de tracking do projeto Quiz Xamânico, identificando pontos fortes, áreas de melhoria e recomendações de segurança.

### Arquivos Auditados

| Arquivo | Status | Criticidade |
|---------|--------|-------------|
| `src/utils/advancedTracking.ts` | ✅ Analisado | Alta |
| `src/hooks/useTrackingState.ts` | ✅ Analisado | Média |
| `src/utils/buckpay.ts` | ✅ Analisado | Alta |
| `src/components/VTurbTracker.tsx` | ✅ Analisado | Média |
| `src/utils/tracking.ts` | ✅ Analisado | Média |
| `src/config/tracking.config.ts` | ✅ Analisado | Alta |
| `src/utils/capi.ts` | ✅ Analisado | Alta |
| `src/utils/advancedMatching.ts` | ✅ Analisado | Alta |
| `src/utils/eventIdGenerator.ts` | ✅ Analisado | Média |
| `api/webhooks/buckpay.ts` | ✅ Analisado | Alta |
| `public/tracking-debug.js` | ✅ Analisado | Baixa |

---

## 1️⃣ ARQUIVO: `src/utils/advancedTracking.ts`

### 📊 Visão Geral

Módulo principal de tracking que implementa:
- Deduplicação de eventos com `event_id`
- Hashing SHA-256 para PII (Web Crypto API)
- Lead Scoring baseado em respostas do quiz
- Tracking híbrido (Client-Side + Server-Side ready)
- Integração com VTurb, Google Analytics (gtag), e Microsoft Clarity
- Persistência de estado via LocalStorage

### ✅ Pontos Fortes

1. **Arquitetura bem estruturada** - Separação clara entre tipos, constantes, utilitários e funções de tracking
2. **Event ID único** - Usa `crypto.randomUUID()` com fallback para browsers antigos
3. **Hashing de PII** - Implementação correta de SHA-256 para email e telefone
4. **Lead Scoring** - Sistema de pontuação bem definido com segmentação (hot/warm/disqualified)
5. **Persistência de sessão** - Estado mantido via LocalStorage com expiração de 30 minutos
6. **Logging condicional** - Logs apenas em desenvolvimento via `import.meta.env?.DEV`
7. **Type-safe** - Interfaces bem definidas para todos os tipos de dados

### ⚠️ Áreas de Atenção

1. **Singleton mutable** (Linha 905-915)
   ```typescript
   let trackingStateInstance: TrackingState | null = null;
   ```
   - **Risco:** Estado global pode causar race conditions em SSR
   - **Recomendação:** Considerar contexto React para gerenciamento de estado

2. **Video milestones mutável** (Linha 621-622)
   ```typescript
   let videoMilestones = [...VIDEO_MILESTONES];
   let pitchTracked = false;
   ```
   - **Risco:** Estado mutável fora do React pode causar inconsistências
   - **Recomendação:** Mover para o hook `useVTurbTracking`

3. **Erro silencioso em hashing** (Linha 165-168)
   ```typescript
   } catch (error) {
     console.error('[AdvancedTracking] Error hashing data:', error);
     return null;
   }
   ```
   - **Risco:** Falha silenciosa pode enviar dados não-hasheados
   - **Recomendação:** Considerar telemetry para erros de hashing

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| PII Hashing | ✅ OK | SHA-256 via Web Crypto API |
| Validação de entrada | ⚠️ | Normalização implementada, mas sem sanitização |
| XSS Prevention | ✅ OK | Não há injeção de HTML |
| CORS | N/A | Client-side only |
| Secrets exposure | ✅ OK | Nenhum secret no código |

### 📈 Eventos Implementados

| Evento | Tipo | Parâmetros |
|--------|------|------------|
| `Lead` | Meta Standard | value, currency, lead_score, lead_segment |
| `CompleteRegistration` | Meta Standard | value, currency, status, lead_score |
| `ViewContent` | Meta Standard | content_name, value, currency, content_type |
| `InitiateCheckout` | Meta Standard | content_name, value, currency, lead_score |
| `Purchase` | Meta Standard | content_name, value, currency, transaction_id |
| `QuizAnswer` | Meta Custom | content_name, question_id, answer_value, score |
| `VideoProgress25/50/75/95` | Meta Custom | content_name, video_percent, video_time |
| `PitchViewed` | Meta Custom | content_name, time_watched, pitch_time |
| `VideoPlay/Pause/Complete` | Meta Custom | content_name, video_time |
| `CTAClick` | Meta Custom | content_name, lead_score |
| `ViewUpsell/ViewDownsell` | Meta Custom | content_name, lead_score |

---

## 2️⃣ ARQUIVO: `src/hooks/useTrackingState.ts`

### 📊 Visão Geral

React Hook para gerenciar estado de tracking em componentes, fornecendo:
- Acesso reativo ao lead scoring
- Sincronização entre abas via `storage` event
- Wrappers para todas as funções de tracking

### ✅ Pontos Fortes

1. **Sincronização cross-tab** - Usa `StorageEvent` listener para sincronizar estado
2. **Memoization adequada** - `useMemo` para valores computados
3. **Callbacks otimizados** - `useCallback` para todas as funções de tracking
4. **Interface limpa** - API clara e bem documentada

### ⚠️ Áreas de Atenção

1. **Dependência de estado mutável** (Linha 101-103)
   ```typescript
   }, [state, refreshState]);
   ```
   - **Risco:** `state` nas dependências pode causar loops de re-render
   - **Recomendação:** Usar `useRef` para estado que não precisa re-render

2. **Cleanup incompleto** (Linha 86-87)
   ```typescript
   return () => window.removeEventListener('storage', handleStorageChange);
   ```
   - **Status:** OK - cleanup implementado corretamente

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Memory leaks | ✅ OK | Cleanup no useEffect |
| State exposure | ⚠️ | Lead score visível no DevTools |
| XSS | ✅ OK | Sem injeção de dados |

---

## 3️⃣ ARQUIVO: `src/utils/buckpay.ts`

### 📊 Visão Geral

Módulo de integração com BuckPay/RealTech para:
- Criação de transações PIX
- Tracking de checkout e compra
- Webhooks de pagamento

### ✅ Pontos Fortes

1. **Types completos** - Interfaces para todos os payloads da API
2. **Tracking integrado** - Eventos de checkout, PIX e purchase
3. **Utilitários de conversão** - `toCentavos`, `toBRL` para evitar erros
4. **External ID único** - Geração de ID externo para transações

### ⚠️ Áreas de Atenção

1. **Secret key no client** (Linha 388-394)
   ```typescript
   headers: {
     'Authorization': `Bearer ${BUCKPAY_CONFIG.secretKey}`,
     ...
   }
   ```
   - **RISCO CRÍTICO:** Comentário indica uso server-side, mas função pode ser chamada no client
   - **Recomendação:** Remover a função do bundle client ou adicionar runtime check

2. **Webhook parsing** (Linha 440-449)
   ```typescript
   export function parseWebhookPayload(payload: string): BuckPayWebhookPayload | null {
     try {
       return JSON.parse(payload) as BuckPayWebhookPayload;
     } catch (error) {
       // Include truncated payload for debugging
       const truncatedPayload = payload.length > 200 ? payload.substring(0, 200) + '...' : payload;
       console.error('[BuckPay] Error parsing webhook payload:', error, 'Payload:', truncatedPayload);
   ```
   - **Segurança:** ✅ Trunca payload para não expor dados sensíveis em logs

3. **Tracking de email** (Linha 244)
   ```typescript
   buyerEmail?: string
   ```
   - **Atenção:** Email passado mas não usado diretamente na função

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Secret Key | ⚠️ CRÍTICO | Deve ser apenas server-side |
| API URL | ✅ OK | HTTPS enforced |
| Input validation | ⚠️ | Sem validação de CPF/telefone |
| PII in logs | ✅ OK | Payload truncado em erros |

### 🚨 RECOMENDAÇÃO CRÍTICA

**Problema:** `createPixTransaction` e `getTransactionByExternalId` podem expor a secret key se chamadas do client-side.

**Solução:**
```typescript
export async function createPixTransaction(request: BuckPayCreateTransactionRequest): Promise<BuckPayTransactionResponse> {
  if (typeof window !== 'undefined') {
    throw new Error('[BuckPay] createPixTransaction must be called from server-side only');
  }
  // ... rest of function
}
```

---

## 4️⃣ ARQUIVO: `src/components/VTurbTracker.tsx`

### 📊 Visão Geral

Componente React para tracking de vídeos VTurb com:
- Milestones de progresso (25%, 50%, 75%, 95%)
- Eventos de play/pause/complete
- Detecção do momento do pitch

### ✅ Pontos Fortes

1. **Validação de origem** (Linha 82-93)
   ```typescript
   const allowedDomains = [
     'https://scripts.converteai.net',
     'https://cdn.converteai.net',
     'https://player.converteai.net',
   ];
   ```
   - **Segurança:** Validação de domínio para mensagens postMessage

2. **Cleanup de event listeners** (Linha 180-186)
   ```typescript
   useEffect(() => {
     window.addEventListener('message', handleMessage);
     return () => {
       window.removeEventListener('message', handleMessage);
     };
   }, [handleMessage]);
   ```
   - **Memory safe:** Cleanup adequado

3. **Hook separado** - `useVTurbTracking` para uso manual

### ⚠️ Áreas de Atenção

1. **Verificação de origem** (Linha 88-89)
   ```typescript
   const isAllowedOrigin = allowedDomains.some(domain => 
     event.origin === domain || event.origin.startsWith(domain)
   );
   ```
   - **Atenção:** `startsWith` pode ser bypassado com subdomínios maliciosos
   - **Recomendação:** Usar comparação exata ou regex mais estrito

2. **Iframe sem sandbox** (Linha 200-213)
   ```typescript
   <iframe
     ref={iframeRef}
     src={embedUrl}
     ...
     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
   ```
   - **Atenção:** Considerar adicionar `sandbox` attribute se possível

### 🔍 Detalhes da Vulnerabilidade PostMessage

O uso de `startsWith` na validação de origem pode permitir ataques de subdomínio:

```javascript
// Exemplo de bypass:
// Domínio malicioso: https://scripts.converteai.net.attacker.com
// event.origin.startsWith('https://scripts.converteai.net') === true

// Recomendação: usar comparação exata
const isAllowedOrigin = allowedDomains.includes(event.origin);
```

**Vetores de Ataque:**
- Atacante registra domínio `scripts.converteai.net.malicious.com`
- Envia mensagens postMessage falsas para manipular tracking
- Pode injetar eventos falsos ou extrair dados do vídeo

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| PostMessage origin | ⚠️ | startsWith pode ser bypassado |
| XSS via message | ✅ OK | JSON.parse com try/catch |
| Iframe security | ⚠️ | Sem sandbox attribute |

---

## 5️⃣ ARQUIVO: `src/config/tracking.config.ts`

### 📊 Visão Geral

Configurações centralizadas para todos os serviços de tracking.

### ✅ Pontos Fortes

1. **Variáveis de ambiente** - Secrets via `import.meta.env`
2. **Configuração centralizada** - Fácil manutenção
3. **Feature flags** - Permite desativar funcionalidades

### ⚠️ Áreas de Atenção

1. **Pixel IDs hardcoded** (Linha 14, 36, 41, 47)
   ```typescript
   export const META_PIXEL_ID = '1908080873443730';
   export const GA4_MEASUREMENT_ID = 'G-M78M3RH56H';
   export const CLARITY_PROJECT_ID = 'uq1qfi7fwi';
   export const UTMFY_PIXEL_ID = '69346cfb70f1cd636eb5e31c';
   ```
   - **Recomendação:** Mover para variáveis de ambiente para facilitar deploy em diferentes ambientes

2. **Secret key no client** (Linha 63)
   ```typescript
   secretKey: import.meta.env?.VITE_BUCKPAY_SECRET_KEY || '',
   ```
   - **RISCO:** Variáveis `VITE_*` são expostas no client bundle
   - **Recomendação:** Renomear para `BUCKPAY_SECRET_KEY` (sem VITE_) e usar apenas server-side

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Secrets exposure | ⚠️ CRÍTICO | VITE_BUCKPAY_SECRET_KEY exposto |
| Meta Access Token | ✅ OK | Sem prefixo VITE_ |
| API Keys | ⚠️ | Pixel IDs expostos (esperado) |

### 🚨 RECOMENDAÇÃO CRÍTICA

**Problema:** `VITE_BUCKPAY_SECRET_KEY` e `VITE_BUCKPAY_USER_AGENT` são expostos no bundle client.

**Impacto Potencial:**
- **Transações não autorizadas:** Atacante pode criar cobranças PIX em nome da empresa
- **Abuso de API:** Rate limits e quotas consumidos por requisições maliciosas
- **Fraude financeira:** Criação de transações falsas para manipular relatórios
- **Exposição de dados:** Acesso a informações de transações existentes

**Solução:**
1. Remover prefixo `VITE_` das variáveis sensíveis
2. Mover para variáveis de ambiente server-side
3. Usar apenas em API routes/Edge Functions

```typescript
// tracking.config.ts
export const BUCKPAY_CONFIG = {
  // Client-safe config
  apiUrl: 'https://api.realtechdev.com.br',
  webhookPath: '/api/webhooks/buckpay',
  // NOTE: secretKey and userAgent must be accessed server-side only
  // via process.env.BUCKPAY_SECRET_KEY
};
```

---

## 6️⃣ ARQUIVO: `src/utils/capi.ts`

### 📊 Visão Geral

Implementação do Meta Conversions API (CAPI) para tracking server-side.

### ✅ Pontos Fortes

1. **Deduplicação** - Event ID consistente entre client e server
2. **EMQ otimizado** - Target 12+ parâmetros de Advanced Matching
3. **Payload validation** - Função `validateCAPIPayload`
4. **Batch support** - Envio de múltiplos eventos
5. **IP extraction** - Suporte a múltiplos headers de proxy

### ⚠️ Áreas de Atenção

1. **Test event code em produção** (Linha 133-136)
   ```typescript
   if (import.meta.env?.DEV) {
     return 'TEST12345'; // Default test code for dev
   }
   ```
   - **Status:** OK - Apenas em desenvolvimento

2. **Access token como parâmetro** (Linha 316-320)
   ```typescript
   export async function sendCAPIEvent(
     payload: CAPIEventPayload,
     accessToken: string,
   ```
   - **Status:** OK - Token passado como parâmetro, não hardcoded

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Access Token | ✅ OK | Passado como parâmetro |
| PII Hashing | ✅ OK | Usa advancedMatching |
| HTTPS | ✅ OK | graph.facebook.com |
| Input validation | ✅ OK | validatePayload disponível |

---

## 7️⃣ ARQUIVO: `src/utils/advancedMatching.ts`

### 📊 Visão Geral

Implementação de Advanced Matching para Meta CAPI com normalização e hashing.

### ✅ Pontos Fortes

1. **Normalização completa** - Email, telefone, nome, cidade, estado, CEP, país, data de nascimento
2. **Mapeamento de estados brasileiros** - Conversão de nome para sigla
3. **Hashing SHA-256** - Web Crypto API
4. **Validação** - `validateAdvancedMatching` com contagem de parâmetros
5. **Testes unitários** - Cobertura em `test/advancedMatching.test.ts`

### ⚠️ Áreas de Atenção

1. **Regex para nomes** (Linha 163-164)
   ```typescript
   .replace(/[^a-z\s]/gi, '');
   ```
   - **Atenção:** Remove caracteres acentuados (ã, é, etc.)
   - **Recomendação:** Usar regex que preserve acentos ou normalize para ASCII

2. **Estado brasileiro incompleto** (Linha 204-244)
   - **Status:** OK - Todos os 27 estados mapeados

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Hashing | ✅ OK | SHA-256 |
| Normalization | ✅ OK | Meta compliant |
| PII exposure | ✅ OK | Dados hasheados antes de enviar |

---

## 8️⃣ ARQUIVO: `src/utils/eventIdGenerator.ts`

### 📊 Visão Geral

Gerador de Event IDs únicos para deduplicação entre client e server.

### ✅ Pontos Fortes

1. **UUID nativo** - Usa `crypto.randomUUID()` quando disponível
2. **Fallback** - Alternativa para browsers antigos
3. **Storage** - Persistência de IDs para validação de duplicatas
4. **Validação** - Regex para formato de Event ID

### ⚠️ Áreas de Atenção

1. **Limite de armazenamento** (Linha 119)
   ```typescript
   const MAX_STORED_EVENT_IDS = 100;
   ```
   - **Status:** OK - Limite razoável para evitar uso excessivo de storage

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Randomness | ✅ OK | crypto.randomUUID ou fallback |
| Storage | ⚠️ | localStorage pode ser manipulado |
| Uniqueness | ✅ OK | Alta entropia |

---

## 9️⃣ ARQUIVO: `api/webhooks/buckpay.ts`

### 📊 Visão Geral

Edge Function para processar webhooks de pagamento do BuckPay.

### ✅ Pontos Fortes

1. **Edge runtime** - Configurado para Edge Function
2. **Event deduplication** - Verifica duplicatas antes de processar
3. **CAPI integration** - Envia Purchase para Meta CAPI

### ⚠️ Áreas de Atenção

1. **Sem validação de assinatura** (Linha 68-82)
   ```typescript
   export default async function handler(request: Request) {
     if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
     try {
       const payload: BuckPayWebhookPayload = await request.json();
   ```
   - **RISCO:** Webhooks podem ser forjados
   - **Recomendação:** Adicionar validação de assinatura HMAC do BuckPay

2. **Erro silencioso** (Linha 79-81)
   ```typescript
   } catch (error) {
     console.error('[BuckPay Webhook] Error:', error);
     return new Response('OK', { status: 200 });
   }
   ```
   - **Atenção:** Retorna 200 mesmo em erro para evitar retry
   - **Status:** OK - Prática comum para webhooks

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| Webhook signature | ⚠️ CRÍTICO | Sem validação de assinatura |
| Method validation | ✅ OK | Apenas POST aceito |
| Error handling | ✅ OK | Não expõe detalhes de erro |
| Rate limiting | ⚠️ | Sem rate limit implementado |

### 🚨 RECOMENDAÇÃO CRÍTICA

**Problema:** Webhooks podem ser forjados por atacantes.

**Cenários de Ataque:**
- **Confirmações de pagamento falsas:** Atacante envia webhook fake com `status: 'paid'` para liberar produtos sem pagar
- **Fraude financeira:** Manipulação de eventos de compra para inflacionar métricas
- **Bypass de lógica de negócio:** Acionamento de fluxos de pós-venda sem pagamento real
- **Negação de serviço:** Flood de webhooks falsos para sobrecarregar o sistema

**Solução:**
```typescript
function validateWebhookSignature(request: Request, payload: string): boolean {
  const signature = request.headers.get('x-buckpay-signature');
  if (!signature) return false;
  
  const secret = process.env.BUCKPAY_WEBHOOK_SECRET;
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

---

## 🔟 ARQUIVO: `public/tracking-debug.js`

### 📊 Visão Geral

Painel de debug para visualizar eventos de tracking em tempo real.

### ✅ Pontos Fortes

1. **Interceptação de pixels** - Meta, GA4, Clarity
2. **UI informativa** - Tabs para eventos, status, storage, cookies
3. **Keyboard shortcut** - Ctrl+Shift+D para toggle

### ⚠️ Áreas de Atenção

1. **Exposição de dados** (Linha 615-630)
   ```typescript
   for (let i = 0; i < localStorage.length; i++) {
     const key = localStorage.key(i);
     const value = localStorage.getItem(key);
   ```
   - **Atenção:** Expõe todos os dados do localStorage
   - **Status:** OK para debug, mas não deve ir para produção

2. **XSS em HTML** (Linha 656-665)
   ```typescript
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
   ```
   - **Status:** ✅ OK - HTML é sanitizado corretamente

### 🔒 Análise de Segurança

| Item | Status | Notas |
|------|--------|-------|
| XSS | ✅ OK | escapeHtml implementado |
| Data exposure | ⚠️ | Expõe localStorage/cookies |
| Production | ⚠️ | Deve ser desabilitado em prod |

---

## 📊 RESUMO DE SEGURANÇA

### 🚨 Issues Críticos

1. **Secret Key Exposure**
   - `VITE_BUCKPAY_SECRET_KEY` exposto no bundle client
   - **Ação:** Remover prefixo VITE_ e usar apenas server-side

2. **Webhook sem Validação**
   - `api/webhooks/buckpay.ts` não valida assinatura
   - **Ação:** Implementar validação HMAC

### ⚠️ Issues Médios

3. **PostMessage Origin**
   - `VTurbTracker.tsx` usa `startsWith` para validação
   - **Ação:** Usar comparação exata de domínios

4. **Debug Panel em Produção**
   - `tracking-debug.js` pode expor dados sensíveis
   - **Ação:** Garantir que não seja carregado em produção

### ✅ Boas Práticas Implementadas

1. PII hasheado com SHA-256
2. Event deduplication via event_id
3. LocalStorage com expiração de sessão
4. Cleanup de event listeners
5. Error handling com logs truncados
6. Type-safe com TypeScript

---

## 📈 MÉTRICAS DE TRACKING

### Cobertura de Eventos

| Estágio do Funil | Eventos | Status |
|------------------|---------|--------|
| Landing Page | PageView, Lead | ✅ |
| Quiz | QuizAnswer, QuizProgress | ✅ |
| Loading | - | ⚠️ Não implementado |
| Oferta | ViewContent, VideoProgress | ✅ |
| Checkout | InitiateCheckout | ✅ |
| Pagamento | Purchase | ✅ |
| Upsell/Downsell | ViewUpsell, ViewDownsell | ✅ |

### Lead Scoring

| Segmento | Score Range | Value |
|----------|-------------|-------|
| Hot | 70-100 | R$ 100 |
| Warm | 30-69 | R$ 10 |
| Disqualified | 0-29 | R$ 0 |

### Plataformas Integradas

- ✅ Meta Pixel (Client + CAPI)
- ✅ Google Analytics 4
- ✅ Microsoft Clarity
- ✅ UTMFY
- ⚠️ TikTok Pixel (placeholder - ID não configurado, necessita implementação real com credenciais de produção)

---

## 📝 RECOMENDAÇÕES FINAIS

### Alta Prioridade

1. **Remover VITE_BUCKPAY_SECRET_KEY do client bundle**
2. **Implementar validação de assinatura de webhook**
3. **Adicionar loading screen tracking**

### Média Prioridade

4. **Corrigir validação de origem do VTurb**
5. **Adicionar TikTok Pixel real**
6. **Implementar scroll depth tracking na página de oferta**

### Baixa Prioridade

7. **Mover pixel IDs para variáveis de ambiente**
8. **Adicionar rate limiting em webhooks**
9. **Implementar A/B testing support**

---

## 🔧 COMANDOS ÚTEIS

```bash
# Rodar testes
npm test

# Build para produção
npm run build

# Verificar tipos
npx tsc --noEmit

# Rodar em desenvolvimento
npm run dev
```

---

**Auditoria realizada em:** 2026-01-18  
**Próxima revisão recomendada:** Em 90 dias ou após mudanças significativas  
**Contato:** Equipe de Analytics
