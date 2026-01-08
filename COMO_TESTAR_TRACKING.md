# 🎯 COMO TESTAR SEU TRACKING - SUPER FÁCIL

## ⚡ MÉTODO MAIS FÁCIL (3 minutos)

### PASSO 1: Copiar o Script

1. Abra este arquivo: `public/tracking-debug.js`
2. **Copie TODO o conteúdo** (Ctrl+A, Ctrl+C)

### PASSO 2: Abrir seu Site

1. Abra seu site no navegador: `https://quiz-xamanico.vercel.app`
2. Pressione **F12** (abre DevTools)
3. Clique na aba **Console**

### PASSO 3: Colar e Executar

1. **Cole o script** no console (Ctrl+V)
2. Pressione **ENTER**
3. **PRONTO!** 🎉

---

## 🎨 O QUE VAI ACONTECER

Um painel visual vai aparecer no canto superior direito mostrando:

### ✅ Status dos Pixels
```
📡 Pixels Carregados
✅ Meta Pixel (ID: 1908080873443730)
✅ Google Analytics (ID: G-M78M3RH56H)
✅ Microsoft Clarity (ID: uq1qfi7fwi)
```

### ✅ LocalStorage
```
💾 LocalStorage
✅ Dados Persistidos
   Chaves encontradas: 3
   • advanced_tracking_state
   • utm_params
   • session_id
```

### ✅ Cookies
```
🍪 Cookies de Tracking
_fbp: ✅ fb.1.1234567890.987654321
_fbc: N/A (normal se não veio de ad)
_ga: ✅ GA1.1.1234567890.987654321
```

### ✅ Eventos em Tempo Real
```
📊 Eventos Capturados (5)

📘 Meta Pixel | 14:23:45
track: Lead
└─ Ver parâmetros ▼
   {
     "content_name": "Quiz Iniciado",
     "value": 0
   }

📊 GA4 | 14:23:46
quiz_started
└─ Ver parâmetros ▼
   {
     "user_name": "Daniel"
   }
```

---

## 🎮 COMO USAR

### 1. Deixe o Painel Aberto

O painel fica fixo no canto da tela enquanto você navega.

### 2. Use o Site Normalmente

- Clique em "Começar Quiz"
- Responda as perguntas
- Vá para a página de oferta
- Clique nos botões

### 3. Veja os Eventos Aparecerem

A cada ação, novos eventos aparecem na lista **em tempo real**!

### 4. Expandir Detalhes

Clique em **"Ver parâmetros"** para ver todos os dados enviados.

---

## ✅ CHECKLIST VISUAL

Depois de navegar pelo site, você deve ver:

```
✅ Meta Pixel carregado (verde)
✅ GA4 carregado (verde)
✅ Clarity carregado (verde)
✅ LocalStorage com dados (verde)
✅ Cookies _fbp e _ga presentes (verde)
✅ Eventos aparecendo na lista
```

Se TUDO estiver verde = **🎉 TRACKING FUNCIONANDO 100%**

---

## ❌ SE ALGO ESTIVER VERMELHO

### ❌ Meta Pixel não carregado
**Possível causa:** AdBlock bloqueando

**Solução:**
1. Desative AdBlock no seu site
2. Recarregue a página (F5)
3. Execute o script novamente

### ❌ LocalStorage vazio
**Normal se:**
- É a primeira vez que você acessa o site
- Você limpou os dados do browser

**Solução:**
1. Responda uma pergunta do quiz
2. Veja os dados aparecerem

### ❌ Nenhum evento capturado
**Possível causa:** Você executou o script mas não fez nenhuma ação

**Solução:**
1. Com o painel aberto, navegue pelo site
2. Clique em botões
3. Responda perguntas
4. Veja eventos aparecerem

---

## 📸 TIRE UM PRINT

Quando tudo estiver verde:

1. Com o painel aberto
2. Pressione **Windows + Shift + S** (Windows) ou **Cmd + Shift + 4** (Mac)
3. Tire print da tela
4. Salve como comprovante de que está tudo funcionando

---

## 🔄 TESTAR NOVAMENTE

Para executar o script novamente:

1. Feche o painel (clique no X)
2. No console, pressione **Seta para Cima** (recupera último comando)
3. Pressione **ENTER**
4. Painel reabre atualizado

---

## 💡 DICAS PRO

### Ver Lead Score em Tempo Real
1. Deixe o painel aberto
2. Responda as perguntas do quiz
3. Nos eventos `QuizAnswer`, expanda "Ver parâmetros"
4. Veja o `lead_score` aumentando

### Testar Diferentes Respostas
1. Complete o quiz uma vez
2. Limpe LocalStorage: `localStorage.clear()`
3. Recarregue a página (F5)
4. Faça o quiz novamente com respostas diferentes
5. Compare os lead scores

### Testar UTM Params
1. Adicione UTMs na URL:
   ```
   ?utm_source=facebook&utm_campaign=teste
   ```
2. Execute o script
3. Veja os UTMs no painel

---

## 🎉 RESULTADO FINAL

Se você viu tudo isso no painel:

```
✅ 3 Pixels carregados (verde)
✅ Dados no LocalStorage
✅ Cookies presentes
✅ 10+ eventos capturados
✅ Lead score sendo calculado
✅ Parâmetros corretos nos eventos
```

**PARABÉNS!** 🎊

Sua estrutura de tracking avançada está **100% FUNCIONAL** e pronta para escalar! 

---

## 🆘 PRECISA DE AJUDA?

Se algo não funcionar:

1. **Tire um print** do painel
2. **Copie** as mensagens do console
3. Me envie dizendo: "X está vermelho, por quê?"

Vou te ajudar a resolver! 🚀
