# 🛡️ Proteção Anti-Plágio - Documentação Completa

## Visão Geral

Este sistema implementa múltiplas camadas de proteção contra clonagem e plágio do site, seguindo as melhores práticas de segurança.

## 🔒 Proteções Implementadas

### 1. Verificação de Domínio

**Arquivo:** `src/utils/anti-clone.ts` e inline nos arquivos HTML

**Como funciona:**
- Verifica se o site está rodando no domínio autorizado: `mapaxamanicooficial.online`
- Se detectar domínio não autorizado, o site é imediatamente limpo (tela branca)
- Em desenvolvimento (localhost), a verificação é desabilitada automaticamente

**Domínios permitidos:**
- `mapaxamanicooficial.online`
- `www.mapaxamanicooficial.online`
- `localhost` (apenas para desenvolvimento)

### 2. Token de Sessão Único

**Como funciona:**
```javascript
window.__tkn = crypto.randomUUID();
```

- Gera um token único para cada sessão usando `crypto.randomUUID()`
- O token é único e impossível de replicar
- Usado para rastreamento e identificação de sessões

### 3. Watermark Dinâmico

**Como funciona:**
- Adiciona uma marca d'água invisível no canto inferior direito da página
- Exibe os primeiros 8 caracteres do token da sessão
- Opacidade de 0.2 (quase invisível, mas presente no código)
- Impossível de remover via CSS porque é injetado dinamicamente

**Exemplo visual:**
```
ID:a3f2b1c4  (canto inferior direito, cinza claro)
```

### 4. Bloqueio de DevTools

**Atalhos bloqueados:**
- `F12` - Console do desenvolvedor
- `Ctrl+Shift+I` - Ferramentas de desenvolvedor
- `Ctrl+Shift+J` - Console JavaScript
- `Ctrl+U` - Ver código-fonte
- `Ctrl+S` - Salvar página
- `Ctrl+Shift+C` - Inspetor de elementos
- `Botão direito do mouse` - Menu de contexto

**Observação:** Em ambiente de desenvolvimento (localhost), essas proteções não interferem no trabalho dos desenvolvedores.

### 5. Detecção de DevTools Aberto

**Como funciona:**
- Monitora o tamanho da janela a cada segundo
- Se detectar que as DevTools estão abertas (diferença de tamanho > 160px)
- Registra no console para fins de auditoria

### 6. Bloqueio de User-Agents Maliciosos

**Arquivo:** `blocklist-agents.txt`

**Bots e scrapers bloqueados:**
- HTTrack, WebCopier, WebZIP (clonadores de sites)
- wget, curl (ferramentas de download)
- Scrapy, python-requests (frameworks de scraping)
- AhrefsBot, SemrushBot (bots de SEO)
- E muitos outros...

### 7. Proteção Contra Hotlinking

**Configurado em:** `.htaccess` e `nginx.conf`

**Como funciona:**
- Bloqueia o uso de imagens do site em outros domínios
- Apenas o domínio `mapaxamanicooficial.online` pode carregar as imagens
- Economiza banda e previne uso não autorizado de recursos

### 8. Headers de Segurança

**Headers implementados:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: frame-ancestors 'self'
```

**O que cada um faz:**
- **X-Content-Type-Options:** Previne ataques MIME sniffing
- **X-Frame-Options:** Previne clickjacking (site não pode ser incorporado em iframe)
- **X-XSS-Protection:** Ativa proteção contra XSS no navegador
- **Referrer-Policy:** Controla informações de referência enviadas
- **Content-Security-Policy:** Previne incorporação em outros sites

## 📁 Arquivos Criados/Modificados

### Arquivos de Proteção
1. **`src/utils/anti-clone.ts`** - Módulo completo de proteção (versão legível)
2. **`src/utils/anti-clone-inline.html`** - Versão minificada para injeção inline
3. **`blocklist-agents.txt`** - Lista de user-agents bloqueados
4. **`public/.htaccess`** - Configuração Apache
5. **`nginx.conf`** - Configuração Nginx

### Arquivos HTML Modificados
1. **`index.html`** - Página principal (proteção inline injetada)
2. **`public/obrigado.html`** - Página de agradecimento (proteção inline injetada)

## 🚀 Como Funciona na Prática

### Cenário 1: Acesso Autorizado (Domínio Correto)
```
1. Usuário acessa https://mapaxamanicooficial.online
2. Script de proteção verifica o domínio ✅
3. Token único é gerado
4. Watermark é adicionado
5. Site funciona normalmente
```

### Cenário 2: Tentativa de Clone (Domínio Não Autorizado)
```
1. Clone hospedado em https://site-pirata.com
2. Script de proteção verifica o domínio ❌
3. Página é imediatamente limpa (innerHTML = '')
4. Erro é lançado
5. Site não funciona (tela branca)
```

### Cenário 3: Desenvolvimento Local
```
1. Desenvolvedor acessa http://localhost:5173
2. Script detecta ambiente de desenvolvimento
3. Verificações de domínio são desabilitadas
4. DevTools funcionam normalmente
5. Desenvolvimento não é afetado ✅
```

## 🔧 Configuração para Produção

### Vercel (Configuração Atual)

O projeto já está configurado para Vercel. A proteção funciona automaticamente porque:
1. Os scripts inline estão nos arquivos HTML
2. Vercel serve os arquivos estáticos com os headers corretos
3. A proteção JavaScript é executada no lado do cliente

### Apache

1. Copie o arquivo `public/.htaccess` para o diretório raiz do site
2. Certifique-se de que `mod_rewrite` e `mod_headers` estão habilitados
3. Reinicie o Apache

```bash
sudo a2enmod rewrite
sudo a2enmod headers
sudo systemctl restart apache2
```

### Nginx

1. Copie o conteúdo de `nginx.conf` para sua configuração
2. Atualize os caminhos dos certificados SSL
3. Teste e recarregue o Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 🧪 Como Testar

### Teste 1: Verificação de Domínio (Desenvolvimento)

```bash
npm run dev
# Abra http://localhost:5173
# Site deve funcionar normalmente
# Console deve mostrar: "[Anti-Clone] Development mode - domain check bypassed"
```

### Teste 2: Watermark

```
1. Abra o site
2. Role até o final da página
3. Procure no canto inferior direito
4. Você verá um texto cinza claro: "ID:xxxxxxxx"
```

### Teste 3: Bloqueio de DevTools

```
1. Tente abrir DevTools com F12
2. Tente usar Ctrl+Shift+I
3. Tente clicar com botão direito
4. Todas as tentativas devem ser bloqueadas
```

### Teste 4: Bloqueio de Domínio (Simulação)

Para simular, você pode temporariamente mudar o domínio permitido no código:

```javascript
// Mude temporariamente em index.html para testar
const a=['site-teste.com','localhost'];
// Acesse com localhost - verá a tela branca
```

## 📊 Monitoramento

### Console Logs

A proteção registra eventos no console:

```javascript
// Desenvolvimento
"[Anti-Clone] Development mode - domain check bypassed"

// Erro de domínio
"[Anti-Clone] Unauthorized domain detected"

// Erro de inicialização
"[AC] <erro>"
```

### Como Verificar se Está Funcionando

1. Inspecione o código-fonte da página (View Source)
2. Procure por `window.__tkn` - deve estar presente
3. Procure por `const a=['mapaxamanicooficial.online'` - verifica domínio
4. Abra o console e veja se há logs de proteção

## 🔐 Segurança Adicional

### Recomendações

1. **HTTPS Obrigatório**
   - Sempre use HTTPS em produção
   - Configure redirects de HTTP para HTTPS

2. **CDN/Cloudflare**
   - Use um CDN para proteção adicional contra DDoS
   - Cloudflare oferece proteção contra bots automaticamente

3. **Rate Limiting**
   - Configure rate limiting no servidor
   - Previne scraping automatizado

4. **Monitoramento**
   - Configure alertas para acessos suspeitos
   - Use ferramentas como Google Analytics ou Cloudflare Analytics

5. **Atualizações Regulares**
   - Mantenha a `blocklist-agents.txt` atualizada
   - Adicione novos bots e scrapers conforme necessário

## ⚠️ Avisos Importantes

### Durante Desenvolvimento

- A proteção de domínio está DESABILITADA em localhost
- Você pode usar DevTools normalmente em desenvolvimento
- O watermark ainda aparecerá (para teste)

### Em Produção

- A proteção de domínio está ATIVADA
- Certifique-se de que o domínio está correto: `mapaxamanicooficial.online`
- DevTools serão bloqueados para usuários finais
- Qualquer tentativa de clone resultará em tela branca

### Limitações

- **Não é 100% inquebrável**: Um desenvolvedor muito experiente pode desabilitar as proteções
- **Objetivo**: Tornar a clonagem difícil e desencorajar copycats
- **Proteção em camadas**: Múltiplas proteções aumentam a dificuldade exponencialmente

## 🛠️ Manutenção

### Adicionar Novo Domínio Permitido

Edite os seguintes arquivos:

1. **`index.html`** (linha 8-9)
```javascript
const a=['mapaxamanicooficial.online','novodominio.com','localhost']
```

2. **`public/obrigado.html`** (linha 8-9)
```javascript
const a=['mapaxamanicooficial.online','novodominio.com','localhost']
```

3. **`src/utils/anti-clone.ts`** (linha 12-16)
```typescript
const ALLOWED_DOMAINS = [
  'mapaxamanicooficial.online',
  'novodominio.com',
  'localhost',
];
```

### Adicionar Novo Bot à Blocklist

Edite **`blocklist-agents.txt`** e adicione o nome do bot:
```
NomeDoNovoBot
```

Depois atualize `.htaccess` ou `nginx.conf` com as regras correspondentes.

## 📞 Suporte

Se encontrar problemas:

1. Verifique o console do navegador para erros
2. Confirme que está usando o domínio correto
3. Teste em modo de desenvolvimento primeiro
4. Verifique se os arquivos HTML têm o script de proteção

## ✅ Checklist de Implementação

- [x] Script anti-clone criado (`src/utils/anti-clone.ts`)
- [x] Versão minificada inline criada
- [x] Proteção adicionada ao `index.html`
- [x] Proteção adicionada ao `public/obrigado.html`
- [x] Blocklist de user-agents criada
- [x] Configuração Apache criada (`.htaccess`)
- [x] Configuração Nginx criada
- [x] Domínio configurado: `mapaxamanicooficial.online`
- [x] Documentação completa
- [x] Proteção testada em desenvolvimento

## 🎯 Resultado

Com todas essas proteções implementadas, o site está muito mais seguro contra:
- ✅ Clonagem direta do site
- ✅ Scraping de conteúdo
- ✅ Hotlinking de imagens
- ✅ Incorporação em iframes
- ✅ Ataques de bots maliciosos
- ✅ Visualização fácil do código-fonte

**Status:** 🛡️ **PROTEÇÃO ATIVA E FUNCIONANDO**
