# ✅ CHECKLIST DE DEPLOYMENT - META CAPI

**Data:** __________ | **Responsável:** __________

---

## 📋 PRÉ-DEPLOYMENT

### Validação de Código
- [ ] Testes passando: `npm run test` (30/30) ✅
- [ ] Build success: `npm run build` ✅
- [ ] TypeScript sem erros ✅
- [ ] Documentação revisada ✅

### Credenciais Preparadas
- [ ] `META_PIXEL_ID` = 1908080873443730
- [ ] `META_ACCESS_TOKEN` = EAANlax... (token completo)
- [ ] `META_TEST_CODE` = TEST55523 (apenas dev/staging)
- [ ] `BUCKPAY_SECRET_KEY` obtido
- [ ] `BUCKPAY_USER_AGENT` obtido

---

## 🚀 DEPLOYMENT

### 1. Configurar Vercel (5 min)
- [ ] Acesso a: https://vercel.com/projeto/settings/environment-variables
- [ ] Adicionado `META_PIXEL_ID` (Plain Text) ✅
- [ ] Adicionado `META_ACCESS_TOKEN` (Secret) ✅
- [ ] Adicionado `META_TEST_CODE` (Plain Text, Dev/Preview apenas) ✅
- [ ] Aplicado a: Production + Preview + Development ✅
- [ ] Clicado "Save" em todas ✅

### 2. Deploy para Staging
- [ ] Branch merged para main ou staging
- [ ] Vercel auto-deploy iniciado
- [ ] Deploy concluído sem erros
- [ ] URL de staging acessível

### 3. Configurar Webhook BuckPay
- [ ] Dashboard BuckPay acessado
- [ ] Webhook URL configurada: `https://dominio.com/api/webhooks/buckpay`
- [ ] Eventos selecionados: `transaction.created`, `transaction.processed`
- [ ] Testado com transação de teste

---

## 🧪 VALIDAÇÃO (CRÍTICO!)

### Meta Events Manager - Test Events
- [ ] Acessado: https://business.facebook.com/events_manager
- [ ] Pixel selecionado: "Quiz Xamânico" (1908080873443730)
- [ ] Tab "Test Events" aberta
- [ ] Código inserido: `TEST55523`
- [ ] Modo anônimo aberto para teste

### Teste do Funil Completo (< 5 min)
- [ ] ✅ Página inicial carregada
- [ ] ✅ Quiz iniciado (nome fornecido)
- [ ] ✅ Todas perguntas respondidas
- [ ] ✅ Página de oferta visualizada
- [ ] ✅ Botão "Comprar" clicado
- [ ] ✅ (Opcional) Compra simulada

### Verificação de Eventos (< 20 segundos)

**Evento 1: Lead (Quiz Iniciado)**
- [ ] Aparece em azul (test mode) ✅
- [ ] Source: "Browser" + "Server" (2 fontes) ✅
- [ ] Event ID idêntico entre fontes ✅
- [ ] Parameters > 80% ✅

**Evento 2: CompleteRegistration (Quiz Completado)**
- [ ] Aparece em azul ✅
- [ ] Source: "Browser" + "Server" ✅
- [ ] Event ID idêntico ✅
- [ ] Parameters > 80% ✅

**Evento 3: ViewContent (Oferta Visualizada)**
- [ ] Aparece em azul ✅
- [ ] Source: "Browser" + "Server" ✅
- [ ] Event ID idêntico ✅
- [ ] Parameters > 80% ✅

**Evento 4: InitiateCheckout (Clicou Comprar)**
- [ ] Aparece em azul ✅
- [ ] Source: "Browser" + "Server" ✅
- [ ] Event ID idêntico ✅
- [ ] Parameters > 80% ✅

**Evento 5: Purchase (Compra Confirmada) - Se testado**
- [ ] Aparece em azul ✅
- [ ] Source: "Browser" + "Server" ✅
- [ ] Event ID idêntico ✅
- [ ] Parameters > 80% ✅
- [ ] `order_id`, `content_ids`, `num_items` presentes ✅

### Métricas Críticas
- [ ] **Deduplication Rate:** >95% ✅
- [ ] **Event Match Quality (EMQ):** >6.0 (idealmente >8.0) ✅
- [ ] **Customer Info Parameters:** ≥12 campos ✅
- [ ] **Event IDs:** 100% idênticos entre Browser e Server ✅

### Console do Navegador
- [ ] Sem erros JavaScript ✅
- [ ] Logs de tracking visíveis (modo dev) ✅
- [ ] fbq, gtag, clarity inicializados ✅

---

## 🎯 DEPLOY PRODUÇÃO

### Pré-Deploy Final
- [ ] Todos testes em staging passaram ✅
- [ ] Métricas validadas (Dedup >95%, EMQ >6.0) ✅
- [ ] `META_TEST_CODE` removido de Production ✅
- [ ] Backup do código atual feito ✅

### Deploy
- [ ] Merged para branch `main`
- [ ] Deploy automático iniciado
- [ ] Deploy concluído sem erros
- [ ] URL de produção acessível

### Validação Pós-Deploy (Produção)
- [ ] Site carregando normalmente ✅
- [ ] Quiz funcional ✅
- [ ] Eventos chegando ao Meta (sem test code) ✅
- [ ] Webhook BuckPay funcional ✅
- [ ] Consent banner aparecendo ✅

### Smoke Tests (15 min)
- [ ] Teste 1: Quiz completo → Lead/CompleteRegistration
- [ ] Teste 2: Visualização de oferta → ViewContent
- [ ] Teste 3: Clique comprar → InitiateCheckout
- [ ] Teste 4: Compra real → Purchase (webhook)

---

## 📊 MONITORAMENTO (Primeiras 24h)

### Métricas para Acompanhar
- [ ] **Meta Events Manager:** Eventos chegando normalmente
- [ ] **Vercel Analytics:** `/api/track-event` response time <500ms
- [ ] **Vercel Logs:** Sem erros críticos
- [ ] **Event Match Quality:** Mantém >6.0
- [ ] **Deduplication Rate:** Mantém >95%

### Checklist Horário (Primeiras 6h)
| Hora | Events OK | Errors | EMQ | Dedup | Notes |
|------|-----------|--------|-----|-------|-------|
| +1h  | [ ]       | [ ]    | ___ | ___   |       |
| +2h  | [ ]       | [ ]    | ___ | ___   |       |
| +4h  | [ ]       | [ ]    | ___ | ___   |       |
| +6h  | [ ]       | [ ]    | ___ | ___   |       |

### Ações em Caso de Problema
- [ ] Logs verificados: `vercel logs`
- [ ] Rollback preparado (se necessário)
- [ ] Time notificado
- [ ] Documentação consultada: CAPI_DOCUMENTATION.md

---

## 🎊 SUCESSO!

### Confirmações Finais
- [ ] Deduplication Rate >95% confirmado ✅
- [ ] Event Match Quality >6.0 confirmado ✅
- [ ] Sem erros críticos em 24h ✅
- [ ] Webhook funcionando corretamente ✅
- [ ] Time notificado do sucesso ✅

### Próximas 2 Semanas
- [ ] Monitoramento diário de métricas
- [ ] CPA sendo acompanhado
- [ ] ROAS sendo medido
- [ ] Relatório semanal preparado

### Impacto Esperado (30 dias)
- [ ] CPA: R$ 384 → R$ 240 (-37%)
- [ ] Compras/mês: 26 → 41 (+58%)
- [ ] Receita extra: +R$ 4.989/mês

---

## 📝 NOTAS E OBSERVAÇÕES

**Problemas Encontrados:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Soluções Aplicadas:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

**Melhorias Futuras:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

## 👥 ASSINATURAS

**Deploy Executado por:** _______________________ **Data:** __________

**Validação QA:** _______________________ **Data:** __________

**Aprovação Final:** _______________________ **Data:** __________

---

**Status Final:** [ ] ✅ SUCESSO | [ ] ⚠️ PARCIAL | [ ] ❌ ROLLBACK

**Observações Finais:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Arquivos de Referência:**
- `GUIA_DEPLOY_RAPIDO.md` - Instruções passo a passo
- `CAPI_DOCUMENTATION.md` - Documentação técnica completa
- `IMPLEMENTACAO_IMPACTO.md` - Relatório de impacto
- `.env.example` - Template de variáveis de ambiente
