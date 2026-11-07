# ⚽ ISSD — Deutscher Fussball 2026/27 Deluxe (SNES Web Player)

Aplicação web estática de alta performance para jogar **International Superstar Soccer Deluxe — Deutscher Fussball 2026-27 Deluxe** (*Skinboll Patch*) diretamente no navegador em **60 FPS** via WebAssembly (`snes9x` / EmulatorJS), com carregamento automático para Desktop e Mobile.

- 🌐 **Site Principal:** [https://deutscherfussball.martynfigueiredo.com](https://deutscherfussball.martynfigueiredo.com)
- 🔗 **Mirror GitHub Pages:** [https://martynrangelfigueiredo.github.io/deutscherfussball/](https://martynrangelfigueiredo.github.io/deutscherfussball/)
- 📦 **Repositório:** [github.com/martynrangelfigueiredo/deutscherfussball](https://github.com/martynrangelfigueiredo/deutscherfussball)

---

## ✨ Funcionalidades

- 🚀 **Auto-Start Instantâneo (60 FPS):** O jogo inicia automaticamente assim que a página carrega (`EJS_startOnLoaded = true`), com `devicePixelRatio` otimizado em `1x` (`image-rendering: pixelated`), Direct GPU Swapchain 4:3 e baixa latência de áudio via OpenAL.
- 🎨 **Tema Roxo Synth-Grid & Menu Unificado (`☰ Menu`):** Visual moderno em tons de roxo vibrante (SNES / Synthwave) com detalhes nas cores da Alemanha e barra superior limpa com o título **Deutscher Fussball 26/27** totalmente visível em smartphones.
- 🎮 **Controles Otimizados (Posição Física do SNES):**
  - Mapeamento padrão fiel à posição física dos botões do Super Nintendo em controles Xbox, PlayStation e USB/Bluetooth.
  - Opção **⚙️ Editar Botões** no menu para abrir o remapeador completo do emulador (Teclado e até 4 Gamepads).
  - Atalho de 1 clique (**🔄 Inverter A↔B / X↔Y**) para controles genéricos USB.
- 🔴 **Gravador de Partidas Integrado:** Grave suas partidas em **60 FPS** (proporção 4:3 limpa + áudio estéreo nativo do SNES), com indicador ao vivo no topo da tela. Ao clicar em **Parar**, o vídeo é salvo automaticamente na pasta **Downloads** com o formato:
  `ISSD - Deutscher Fussball 2026-27 - DD-MM-AAAA HHhMM.mp4` *(ou `.webm`)*.
- ⬇️ **Download Direto da ROM (`.ZIP`):** Opção dedicada no menu e no modal de informações para baixar a ROM compactada e jogar em qualquer emulador de Super Nintendo.
- 📺 **Filtro CRT & Tela Cheia:** Alternância instantânea de scanlines estilo TV de tubo via GPU e modo tela cheia.
- ❓ **Sobre o Jogo & Dicas:** Ficha técnica do *Skinboll Patch*, clubes alemães da temporada 2026/27 e comandos especiais do ISSD.

---

## 🎮 Mapa de Controles Padrão

| Botão SNES | Ação no ISSD | Controle (PS / Xbox) | Teclado |
| :--- | :--- | :--- | :--- |
| **B** *(Baixo)* | Passe rasteiro / Carrinho | `✕` / `A` *(Botão Sul)* | `Z` |
| **Y** *(Esquerda)* | Chute / Corrida (Sprint) | `▢` / `X` *(Botão Oeste)* | `A` |
| **A** *(Direita)* | Cruzamento / Balão | `◯` / `B` *(Botão Leste)* | `X` |
| **X** *(Cima)* | Lançamento forte / Sair com goleiro | `△` / `Y` *(Botão Norte)* | `S` |
| **L / R** | Estratégia / Tabela | `L1` / `R1` | `Q` / `W` |
| **Start / Select** | Pausar / Opções | `Start` / `Select` | `Enter` / `Shift` |
| **Direcionais** | Movimentação | `D-Pad` ou `Analógico Esq.` | `Setas` |

---

## 📁 Estrutura do Projeto

```text
deutscherfussball/
├── .github/workflows/
│   └── deploy.yml                                      # Pipeline CI/CD para o GitHub Pages
├── rom/
│   ├── ISSD - Deutscher Fussball 2026-27 Deluxe.smc    # ROM do jogo (4.00 MB)
│   ├── ISSD - Deutscher Fussball 2026-27 Deluxe.zip    # ROM compactada para download (1.99 MB)
│   └── ISSD - Deutscher Fussball 2026-27 Deluxe.ips    # Patch IPS original (2.12 MB)
├── index.html                                          # Aplicação web single-page (UI + Emulador + Gravador)
├── server.js                                           # Servidor HTTP local zero-dependências
├── package.json                                        # Metadados e script de execução local
├── CNAME                                               # Configuração do subdomínio customizado
├── .nojekyll                                           # Desativa processamento Jekyll no GitHub Pages
└── LICENSE                                             # Licença GNU GPL v3.0
```

---

## 💻 Como Rodar Localmente

Não é necessário instalar pacotes externos (`node_modules`). Basta ter o [Node.js](https://nodejs.org/) instalado e executar:

```bash
npm start
# ou diretamente:
node server.js
```

Em seguida, abra no navegador:
👉 `http://localhost:8080`

---

## 🚀 Deploy Automático (GitHub Actions + GitHub Pages)

O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) publica o pacote de produção (`_site/`) automaticamente a cada `push` na branch `main`:

1. Em **Settings → Pages** no GitHub, mantenha **Source** configurado como **GitHub Actions**.
2. Em **Custom domain**, informe `deutscherfussball.martynfigueiredo.com` e marque **Enforce HTTPS**.
3. No provedor de DNS de `martynfigueiredo.com`, aponte um registro `CNAME` de `deutscherfussball` para `martynrangelfigueiredo.github.io`.

---

## 👏 Créditos

- **Jogo Base:** *International Superstar Soccer Deluxe* (Konami, Super Nintendo, 1995)
- **Patch / Modificação:** *Deutscher Fussball 2026-27 Deluxe* — **Skinboll Patch ("For The People")**
- **Motor de Emulação Web:** [EmulatorJS](https://emulatorjs.org/) (`snes9x` WebAssembly core)
