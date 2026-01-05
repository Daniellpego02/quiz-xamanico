# 🎯 GUIA COMPLETO: RASTREAMENTO DE QUIZ + GA4 + PIXELS

## 📊 O QUE ESTÁ SENDO RASTREADO

```
┌─────────────────────────────────────────────┐
│ FUNIL DO QUIZ - EVENTOS RASTREADOS          │
├─────────────────────────────────────────────┤
│ ✅ quiz_started        → Pessoa clica começar quiz
│ ✅ quiz_question       → Responde cada questão
│ ✅ quiz_completed      → Completa todas questões
│ ✅ resultado_view      → Vê página de resultado/oferta
│ ✅ add_to_cart         → Clica em "Comprar Agora"
│ ✅ purchase            → Completa compra (página obrigado)
└─────────────────────────────────────────────┘
```

## 🔧 IMPLEMENTAÇÃO TÉCNICA

### 1️⃣ PIXELS INSTALADOS

#### Google Analytics 4 (GA4)
- **ID**: `G-M78M3RH56H`
- **Localização**: `index.html`, `public/obrigado.html`
- **Status**: ✅ Ativo

#### Facebook Pixel
- **ID**: `1908080873443730`
- **Localização**: `index.html`, `public/obrigado.html`
- **Status**: ✅ Ativo

#### TikTok Pixel
- **ID**: `PLACEHOLDER_TIKTOK_PIXEL_ID` (⚠️ PRECISA SER SUBSTITUÍDO)
- **Localização**: `index.html`, `public/obrigado.html`
- **Status**: 🟡 Configurado mas precisa do ID real

#### Google Ads
- **Configuração**: Usando mesmo GA4 ID
- **Localização**: `index.html`
- **Status**: ✅ Ativo

#### UTMFY
- **Pixel ID**: `69346cfb70f1cd636eb5e31c`
- **Status**: ✅ Ativo

#### Microsoft Clarity
- **Project ID**: `uq1qfi7fwi`
- **Status**: ✅ Ativo

---

## 2️⃣ FUNÇÃO CENTRAL DE RASTREAMENTO

### Arquivo: `src/utils/tracking.ts`

A função `trackEvent()` envia automaticamente para todas as plataformas:

```typescript
trackEvent(eventName: string, eventData: Record<string, any>)
```

**Características:**
- ✅ Envia para GA4, Facebook, TikTok, e Google Ads simultaneamente
- ✅ Adiciona automaticamente: timestamp, URL, título da página, session ID, e UTM params
- ✅ Mapeia eventos para formatos específicos de cada plataforma
- ✅ Tratamento de erros robusto
- ✅ Logs no console para debugging

**Mapeamento de Eventos:**

| Evento Custom | GA4 | Facebook | TikTok | Google Ads |
|--------------|-----|----------|--------|------------|
| quiz_started | quiz_started | ViewContent | ViewContent | view_item |
| quiz_question | quiz_question | CustomEvent | - | - |
| quiz_completed | quiz_completed | Lead | Contact | generate_lead |
| resultado_view | resultado_view | ViewContent | - | - |
| add_to_cart | add_to_cart | AddToCart | AddToCart | add_to_cart |
| purchase | purchase | Purchase | CompletePayment | purchase |

---

## 3️⃣ EVENTOS IMPLEMENTADOS

### 📍 quiz_started
**Dispara quando**: Usuário clica no botão "Começar Quiz" na página Hero

**Arquivo**: `src/components/Hero.tsx`

**Código**:
```typescript
tracking.quiz.started();
```

**Dados enviados**:
```javascript
{
  quiz_name: 'Mapa Xamânico',
  user_name: 'Unknown',
  name_provided: false,
  timestamp: '2024-01-01T12:00:00.000Z',
  page_location: 'https://...',
  session_id: 'session_...',
  utm_source: 'direct',
  utm_medium: 'direct',
  utm_campaign: 'direct'
}
```

---

### 📍 quiz_question
**Dispara quando**: Usuário responde cada pergunta do quiz

**Arquivo**: `src/components/Quiz.tsx`

**Código**:
```typescript
tracking.quiz.answer({
  questionTitle: currentQuestion?.title || '',
  questionStep: currentIndex + 1,
  answerValue: option.value,
  answerLabel: option.label,
  quizPath: QUIZ_PATH
});
```

**Dados enviados**:
```javascript
{
  quiz_name: 'Mapa Xamânico',
  question_number: 2,
  question_title: '⚡ PERGUNTA 2 DE 6 ⚡',
  answer_selected: 'leak',
  answer_label: 'O dinheiro entra, mas some em imprevistos',
  quiz_path: 'finance',
  // + dados automáticos (timestamp, session_id, UTMs, etc)
}
```

---

### 📍 quiz_completed
**Dispara quando**: Usuário responde a última pergunta do quiz

**Arquivo**: `src/components/Quiz.tsx`

**Código**:
```typescript
tracking.quiz.complete(QUIZ_PATH, userName, activeQuestions.length);
```

**Dados enviados**:
```javascript
{
  quiz_name: 'Mapa Xamânico',
  quiz_path: 'finance',
  user_name: 'João',
  total_questions: 6,
  // + dados automáticos
}
```

---

### 📍 resultado_view
**Dispara quando**: Página de resultado/oferta é exibida

**Arquivo**: `src/components/OfferNew.tsx`

**Código**:
```typescript
useEffect(() => {
  tracking.result.view('Mapa Xamânico', 100);
}, []);
```

**Dados enviados**:
```javascript
{
  quiz_name: 'Mapa Xamânico',
  result_type: 'Mapa Xamânico',
  result_score: 100,
  // + dados automáticos
}
```

---

### 📍 add_to_cart
**Dispara quando**: Usuário clica no botão "Comprar Agora"

**Arquivo**: `src/components/OfferNew.tsx`

**Código**:
```typescript
tracking.purchase.addToCart({
  productName: 'Mapa Xamânico - Curso Completo',
  productPrice: 27.90,
  productId: 'mapa-xamanico-001',
  email: 'unknown@email.com'
});
```

**Dados enviados**:
```javascript
{
  quiz_name: 'Mapa Xamânico',
  product_name: 'Mapa Xamânico - Curso Completo',
  product_price: 27.90,
  product_id: 'mapa-xamanico-001',
  currency: 'BRL',
  email: 'unknown@email.com',
  // + dados automáticos
}
```

---

### 📍 purchase (MAIS IMPORTANTE!)
**Dispara quando**: Página de obrigado (sucesso) carrega

**Arquivo**: `public/obrigado.html`

**Código**:
```javascript
trackEvent('purchase', {
  transaction_id: transactionId,
  email: email,
  product_id: 'mapa-xamanico-001',
  product_name: 'Mapa Xamânico - Curso Completo',
  value: 27.90,
  currency: 'BRL',
  quiz_name: 'Mapa Xamânico'
});
```

**Dados enviados**:
```javascript
{
  transaction_id: 'TXN_1234567890',
  email: 'cliente@email.com',
  product_id: 'mapa-xamanico-001',
  product_name: 'Mapa Xamânico - Curso Completo',
  value: 27.90,
  currency: 'BRL',
  quiz_name: 'Mapa Xamânico',
  // + dados automáticos
}
```

**Nota**: O transaction_id vem da URL (`?transaction_id=xxx`) ou é gerado automaticamente se não existir.

---

## 4️⃣ DADOS AUTOMÁTICOS EM TODOS OS EVENTOS

Todos os eventos incluem automaticamente:

```javascript
{
  timestamp: '2024-01-01T12:00:00.000Z',      // ISO 8601
  page_location: 'https://mapaxamanico.com/', // URL completa
  page_title: 'Quiz Completo – Mapa Xamânico', // Título da página
  session_id: 'session_1234567890_abc123',     // ID único da sessão
  utm_source: 'facebook',                      // Origem do tráfego
  utm_medium: 'cpc',                           // Meio
  utm_campaign: 'mapa-xamanico-jan24'          // Campanha
}
```

---

## 5️⃣ COMO TESTAR

### Opção 1: Console do Navegador

1. Abra o quiz: `http://localhost:5173` (dev) ou seu domínio
2. Pressione `F12` para abrir DevTools
3. Vá para a aba "Console"
4. Passe pelo funil completo do quiz
5. Procure por mensagens como:

```
✅ GA4 Event sent: quiz_started
✅ FB Pixel Event: ViewContent
✅ TikTok Event: ViewContent
✅ Google Ads Event: view_item
```

### Opção 2: GA4 Tempo Real

1. Acesse [Google Analytics](https://analytics.google.com)
2. Selecione a propriedade `G-M78M3RH56H`
3. Menu esquerdo → **Relatórios** → **Tempo real**
4. Você verá eventos chegando em tempo real

### Opção 3: Facebook Events Manager

1. Acesse [Facebook Ads Manager](https://facebook.com/ads/manager)
2. Menu → **Ferramentas** → **Gerenciador de eventos**
3. Selecione o pixel `1908080873443730`
4. Clique em "Test Events" para ver eventos de teste

### Opção 4: TikTok Events

1. Acesse [TikTok Ads](https://ads.tiktok.com)
2. **Ferramentas** → **Eventos**
3. Você verá os eventos chegando (após configurar o pixel ID real)

---

## 6️⃣ CONFIGURAÇÕES NECESSÁRIAS

### ⚠️ AÇÃO REQUERIDA: TikTok Pixel ID

O TikTok Pixel está instalado mas precisa do ID real:

**Arquivos para atualizar:**
- `index.html` linha 80
- `public/obrigado.html` linha 68

**Substituir**:
```javascript
ttq.load('PLACEHOLDER_TIKTOK_PIXEL_ID');
```

**Por**:
```javascript
ttq.load('SEU_TIKTOK_PIXEL_ID_REAL');
```

### ✅ Configurações Já Feitas

- ✅ GA4 ID configurado: `G-M78M3RH56H`
- ✅ Facebook Pixel ID: `1908080873443730`
- ✅ UTMFY Pixel ID: `69346cfb70f1cd636eb5e31c`
- ✅ Microsoft Clarity: `uq1qfi7fwi`

---

## 7️⃣ ESTRUTURA DE ARQUIVOS

```
src/
├── utils/
│   └── tracking.ts          # Função central + API de tracking
├── components/
│   ├── Hero.tsx             # quiz_started
│   ├── Quiz.tsx             # quiz_question, quiz_completed
│   └── OfferNew.tsx         # resultado_view, add_to_cart
public/
└── obrigado.html            # purchase
```

---

## 8️⃣ API DE TRACKING

### Métodos Disponíveis

```typescript
// Quiz Events
tracking.quiz.started(userName?: string)
tracking.quiz.answer(data: QuizAnswerData)
tracking.quiz.complete(path: string, userName?: string, totalQuestions?: number)

// Result/Offer Events
tracking.result.view(resultType?: string, resultScore?: number)

// Email Capture (se implementar)
tracking.email.captured(email: string, name?: string, value?: number)

// Purchase Events
tracking.purchase.addToCart(params: AddToCartParams)
tracking.purchase.complete(params: PurchaseParams)

// UTM Management
tracking.utm.getParams()
tracking.utm.storeParams()
tracking.utm.getStoredParams()

// Direct access to central function
tracking.trackEvent(eventName: string, eventData: any)
```

---

## 9️⃣ VALIDAÇÃO E MONITORAMENTO

### Checklist de Validação

```
[ ] GA4 instalado e funcionando (G-M78M3RH56H)
[ ] Facebook Pixel instalado (1908080873443730)
[ ] TikTok Pixel ID configurado (PRECISA SER FEITO!)
[ ] Evento quiz_started dispara ao clicar em "Começar"
[ ] Evento quiz_question dispara a cada resposta
[ ] Evento quiz_completed dispara ao terminar quiz
[ ] Evento resultado_view dispara na página de oferta
[ ] Evento add_to_cart dispara ao clicar "Comprar"
[ ] Evento purchase dispara na página obrigado
[ ] UTM parameters sendo capturados corretamente
[ ] Session ID sendo gerado e persistido
[ ] Console mostrando "✅" para cada evento
[ ] GA4 Tempo Real mostrando eventos
[ ] Facebook Events Manager mostrando eventos
```

### Monitoramento Contínuo

**GA4 - Eventos Personalizados**:
1. Analytics → Configurar → Eventos
2. Procure por: `quiz_started`, `quiz_completed`, `purchase`

**Facebook - Conversões**:
1. Ads Manager → Configurar → Conversões
2. Crie conversões customizadas baseadas nos eventos

**Google Ads - Conversões**:
1. Google Ads → Ferramentas → Conversões
2. Configure conversão para o evento `purchase`

---

## 🔟 DADOS IMPORTANTES POR EVENTO

### quiz_started
```typescript
{
  quiz_name: string,           // 'Mapa Xamânico'
  user_name: string,           // Nome ou 'Unknown'
  name_provided: boolean       // true/false
}
```

### quiz_question
```typescript
{
  quiz_name: string,           // 'Mapa Xamânico'
  question_number: number,     // 1, 2, 3...
  question_title: string,      // Título da pergunta
  answer_selected: string,     // Valor da resposta
  answer_label: string,        // Label da resposta
  quiz_path: string            // 'finance'
}
```

### quiz_completed
```typescript
{
  quiz_name: string,           // 'Mapa Xamânico'
  quiz_path: string,           // 'finance'
  user_name: string,           // Nome do usuário
  total_questions: number      // Total de perguntas
}
```

### resultado_view
```typescript
{
  quiz_name: string,           // 'Mapa Xamânico'
  result_type: string,         // Tipo de resultado
  result_score: number         // Score/pontuação
}
```

### add_to_cart
```typescript
{
  quiz_name: string,           // 'Mapa Xamânico'
  product_name: string,        // Nome do produto
  product_price: number,       // 27.90
  product_id: string,          // 'mapa-xamanico-001'
  currency: string,            // 'BRL'
  email: string                // Email ou 'unknown@email.com'
}
```

### purchase (MAIS IMPORTANTE!)
```typescript
{
  transaction_id: string,      // ID único da transação
  email: string,               // Email do comprador
  product_id: string,          // 'mapa-xamanico-001'
  product_name: string,        // Nome do produto
  value: number,               // 27.90
  currency: string,            // 'BRL'
  quiz_name: string            // 'Mapa Xamânico'
}
```

---

## 1️⃣1️⃣ TROUBLESHOOTING

### Problema: Eventos não aparecem no console

**Solução**:
1. Verifique se você está em modo desenvolvimento (`npm run dev`)
2. Abra o DevTools (F12)
3. Recarregue a página
4. Procure por erros no console

### Problema: GA4 não mostra eventos

**Solução**:
1. Verifique se o GA4 ID está correto: `G-M78M3RH56H`
2. Aguarde 2-5 minutos (pode haver delay)
3. Use o relatório "Tempo Real" em vez de outros relatórios
4. Verifique se o script do gtag está carregando (Network tab)

### Problema: Facebook Pixel não funciona

**Solução**:
1. Verifique se o Pixel ID está correto: `1908080873443730`
2. Instale o Facebook Pixel Helper (extensão do Chrome)
3. Verifique se não há bloqueadores de anúncios ativos
4. Use o Test Events no Events Manager

### Problema: TikTok Pixel não funciona

**Solução**:
1. ⚠️ PRIMEIRO: Configure o TikTok Pixel ID real!
2. Verifique se o script está carregando (Network tab)
3. Aguarde alguns minutos para os eventos aparecerem

### Problema: UTM parameters não são capturados

**Solução**:
1. Acesse a URL com UTMs: `?utm_source=test&utm_medium=test&utm_campaign=test`
2. Verifique o sessionStorage no DevTools (Application tab)
3. Procure por `utm_params` em sessionStorage

---

## 1️⃣2️⃣ PRÓXIMOS PASSOS

1. **Configurar TikTok Pixel ID** ⚠️ PRIORITÁRIO
   - Obtenha o ID real do TikTok Ads Manager
   - Substitua `PLACEHOLDER_TIKTOK_PIXEL_ID` nos arquivos

2. **Criar Conversões no Google Ads**
   - Importe o evento `purchase` como conversão
   - Configure valor de conversão: R$ 27,90

3. **Configurar Públicos no Facebook**
   - Crie público de quem iniciou o quiz (quiz_started)
   - Crie público de quem completou o quiz (quiz_completed)
   - Crie público de quem adicionou ao carrinho (add_to_cart)

4. **Otimizar Campanhas**
   - Use o evento `purchase` como meta de otimização
   - Configure ROAS (Return on Ad Spend)
   - Teste diferentes públicos baseados nos eventos

5. **Monitoramento**
   - Configure alertas no GA4 para queda de eventos
   - Monitore Taxa de Conversão: quiz_started → purchase
   - Analise onde as pessoas abandonam o funil

---

## 1️⃣3️⃣ CONTATO E SUPORTE

Para dúvidas ou problemas com a implementação de tracking:

1. Verifique este documento primeiro
2. Consulte o código em `src/utils/tracking.ts`
3. Teste os eventos no console do navegador
4. Verifique os relatórios em tempo real de cada plataforma

---

**Última atualização**: 2024-01-05  
**Versão**: 1.0  
**Status**: ✅ Implementado (exceto TikTok Pixel ID)
