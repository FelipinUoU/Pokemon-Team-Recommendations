# Pokémon Team Recommendations

> **Projeto pessoal e sem fins lucrativos**, criado para resolver uma dificuldade real que sempre tive ao jogar Pokémon: planejar equipes equilibradas para cada jogo, cobrir todas as fraquezas e defesas elementais do time, e escolher os melhores 4 ataques, itens segurados e mecânicas especiais sem precisar abrir dezenas de abas diferentes, com um sistema de recomendação dinâmica.

Desenvolvido no **Google Antigravity**.

---

## 🎯 Sobre o Projeto

Ao jogar qualquer campanha de Pokémon — desde os clássicos da **1ª Geração (Red/Blue/Yellow)** até a **9ª Geração (Scarlet/Violet e Legends: Z-A)**, ou ROM Hacks e Fan Games que eu gosto bastante como **Pokémon Unbound** e **Pokémon Lazarus** — sempre surge a mesma dúvida:
- *"Quais Pokémon disponíveis nesse jogo combinam melhor com os que eu já escolhi?"*
- *"Que tipos ainda ameaçam minha equipe e quais ataques devo colocar em cada Pokémon para cobrir essas fraquezas?"*
- *"Qual o melhor item segurado e qual Mega Evolução / Tera Type / Z-Move vale mais a pena usar?"*

O **Pokémon Team Recommendations** foi pensado exatamente para resolver esse problema de forma rápida, visual e 100% local.

---

## ✨ Funcionalidades Principais

- 🎮 **Todas as Gerações (Gen 1 a Gen 9) + Fan Games**:
  - Suporte completo com seleção de versões para **Geração I a IX** (*Red, Blue, Yellow, Gold, Silver, Crystal, Ruby, Sapphire, Emerald, FireRed, LeafGreen, Diamond, Pearl, Platinum, HeartGold, SoulSilver, Black, White, Black 2, White 2, X, Y, Omega Ruby, Alpha Sapphire, Sun, Moon, Ultra Sun, Ultra Moon, Let's Go Pikachu/Eevee, Sword, Shield, Brilliant Diamond, Shining Pearl, Legends: Arceus, Scarlet, Violet, Legends: Z-A*).
  - Inclui os fan games **Pokémon Unbound** (Região de Borrius, iniciais *Beldum, Larvitar e Gible*, modos *Vanilla/Difficult* e *Expert/Insane*) e **Pokémon Lazarus**.
  - Adapta automaticamente a **Tabela de Tipos** conforme a época do jogo (15 tipos na Gen 1, 17 tipos na Gen 2–5 e 18 tipos com Fada na Gen 6+ e fan games).
- 📖 **Pokédex Completa por Jogo (1.025 Pokémon + Formas Regionais)**:
  - Ao clicar em qualquer um dos 6 slots da equipe, abre-se o seletor com **todos os Pokémon disponíveis naquele jogo**, permitindo pesquisar instantaneamente pelo **Nome** ou pelo **Número da Pokédex (`#001` a `#1025`)**.
- 🛡️ **Matriz de Defesa Elemental & Recomendador de Sinergia**:
  - Calcula em tempo real as fraquezas (`2x`, `4x`), resistências (`½x`, `¼x`) e imunidades (`0x`) da equipe inteira (levando em conta habilidades como *Levitate, Thick Fat, Flash Fire, Water Absorb*, etc.).
  - O botão **✨ Auto-Completar Vagas Vazias** preenche apenas os espaços em branco da equipe com a melhor combinação matemática, **sem nunca substituir os Pokémon que você já escolheu**.
- ⚔️ **Recomendação dos 4 Melhores Ataques (Moveset)**:
  - Sugere os 4 melhores ataques para cada Pokémon priorizando bônus **STAB**, alinhamento Físico/Especial e cobertura para os tipos que sua equipe ainda não atinge com dano Super Efetivo.
- 🎒 **Recomendação de Itens Segurados (Held Items)**:
  - Indica os melhores itens para cada Pokémon respeitando a geração do jogo (*Leftovers, Life Orb, Heavy-Duty Boots, Choice Band/Specs/Scarf, Assault Vest, Flame/Toxic Orb, Light Ball* ou *Mega Stones / Z-Crystals*).
- 🧬 **Mecânicas Especiais dos Jogos**:
  - Ative **Mega Evoluções** (incluindo variantes X e Y), **Primal Reversion**, **Z-Moves**, **Dynamax / Gigantamax** e **Terastal (Tera Type)** com recálculo automático de tipos, atributos e habilidades.
- 💾 **Menu Lateral de Equipes Salvas (100% Local no seu PC)**:
  - Dê o nome que quiser para suas equipes e salve no menu lateral.
  - Os dados ficam salvos localmente no navegador da sua própria máquina (`localStorage`) **e** você também pode clicar em **⬇️ Baixar Backup no PC (`.json`)** e **⬆️ Carregar do PC (`.json`)** para guardar os arquivos das suas equipes diretamente em qualquer pasta do seu computador.
- 🧭 **GPS Pokémon (`gps.html`) — Mapa Interativo de Rotas, Encontros, Itens & TMs**:
  - Página integrada ao ecossistema do site (acessível pelo seletor **PTR | GPS Pokémon** no topo da tela).
  - **Jogos Suportados (Gen 1 a Gen 8 + Pokémon Unbound & Lazarus)**: suporte completo com mapas interativos de **Kanto**, **Johto**, **Hoenn**, **Sinnoh**, **Unova**, **Kalos**, **Alola**, **Galar**, **Hisui**, **Borrius (Pokémon Unbound)** e **Ilios (Pokémon Lazarus)**, organizados exatamente no mesmo esquema e ordem de gerações do PTR.
  - **Menu Lateral "Modos do GPS"**: sidebar recolhida por padrão (igual ao PTR) com alternância entre dois modos:
    - **Pesquisa de Pokémon**: inspecione rotas, cavernas e taxas de aparição (`%`), faixa de nível (`Lv.`), métodos de captura (*🌿 Grama Alta, ⛰️ Caverna, 🎣 Pesca, 🌊 Surf, 🎁 Estático / Troca*) e exclusividades de versão.
    - **Pesquisa de Itens & TMs**: localize **TMs, HMs, Held Items (Itens Segurados), Pedras de Evolução e Itens Chave** em cada rota ou cidade do jogo, com instruções detalhadas de como obtê-los.
  - **Integração Direta com o PTR (Ícone de Busca 🔍)**: nos cards dos Pokémon e no painel de edição de status (abas de **4 Ataques** e **Item Recomendado**), clique no ícone de lupa ao lado de qualquer **Item** ou **Ataque** para abrir o **GPS Pokémon** automaticamente no jogo da sua equipe e localizar onde aquele item ou TM/HM é encontrado!
  - **Mapa no Formato Clássico Town Map com Visual Radar**: rotas terrestres e marítimas ortogonais numeradas, cidades em quadrados vermelhos chanfrados e cavernas/locais especiais em círculos verdes, com navegação livre segurando o botão do scroll do mouse (pan) e controle de zoom.

---

## 🛠️ Linguagens e Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (sem necessidade de servidores externos ou bancos de dados na nuvem), garantindo que rode instantaneamente em qualquer computador:

- **HTML5** — Estrutura semântica da aplicação, modais da Pokédex e painel lateral de equipes.
- **CSS3 / Tailwind CSS** — Estilização responsiva em Dark Mode (*Tactical Esports Deck* via Google Stitch), variáveis CSS, animações e cores temáticas para os 18 tipos elementais.
- **JavaScript (ES6+ / Vanilla JS)** — Motor matemático de efetividade elemental, algoritmo de recomendação de sinergia de equipe, recomendação de movesets/itens, persistência local (`localStorage` + exportação/importação de arquivos `.json` no computador) e integração opcional com a *PokéAPI*.
- **Ambiente de Desenvolvimento**: Construído utilizando o **Google Antigravity** e design integrado com **Google Stitch**.

---

## 🚀 Como Acessar ou Executar

Você pode usar o projeto de duas formas:

### 🌐 1. Acessar Online (Direto pelo Navegador)
Basta abrir o link do site oficial já hospedado online:
👉 **[https://felipinuou.github.io/Pokemon-Team-Recommendations/](https://felipinuou.github.io/Pokemon-Team-Recommendations/)**

### 📱 2. Versão Mobile Android (Aplicativo APK Oficial)
Existe uma versão nativa para celulares Android! O código-fonte completo e ambiente de desenvolvimento ficam organizados na branch [`mobile`](https://github.com/FelipinUoU/Pokemon-Team-Recommendations/tree/mobile).

- **📥 Como Baixar e Instalar**:
  1. Baixe o instalador direto pelo link: **[Pokemon-Team-Recommendations-mobile.apk](https://github.com/FelipinUoU/Pokemon-Team-Recommendations/raw/main/Pokemon-Team-Recommendations-mobile.apk)**.
  2. No seu aparelho Android, abra o arquivo `.apk` baixado.
  3. Confirme a instalação (caso o sistema pergunte, permita a instalação de apps dessa fonte/gerenciador de arquivos).
  4. Pronto! O app estará instalado com ícone próprio e navegação tática otimizada para toque.

- **🛡️ 100% Seguro e Totalmente Offline**:
  - **Zero risco de segurança**: o aplicativo é de código aberto, livre de anúncios, não pede permissões invasivas (como localização, contatos ou câmera) e não coleta absolutamente nenhum dado pessoal.
  - **Funciona 100% sem internet**: todo o banco de dados (Gen 1–9, Unbound e Lazarus, sinergias, ataques e itens) e fontes estão embutidos dentro do próprio APK. Suas equipes ficam salvas exclusivamente na memória local do seu aparelho.

### 💻 3. Rodar Localmente no seu Computador
1. Baixe ou clone este repositório no seu computador.
2. Abra o arquivo [`index.html`](./index.html) em qualquer navegador moderno (Chrome, Edge, Firefox, Brave, Opera).
3. Pronto! Suas equipes criadas e salvas ficarão armazenadas localmente no seu computador.

---

## ⚖️ Aviso Legal (Disclaimer)

Este é um **projeto pessoal de fã, totalmente gratuito e sem fins lucrativos**, desenvolvido apenas para estudo e auxílio pessoal durante a jogatina.
*Pokémon* e todos os nomes de personagens, jogos, criaturas e marcas associadas são propriedades intelectuais e marcas registradas da **Nintendo**, **Creatures Inc.** e **GAME FREAK**. *Pokémon Unbound* e *Pokémon Lazarus* são projetos criados por seus respectivos desenvolvedores na comunidade de fãs.

---

## 🔍 Palavras-Chave (Keywords / Tags)

`Pokémon Team Recommendations` • `Pokemon Team Builder` • `Planejador de Equipes Pokémon` • `Montar Time Pokémon` • `Construtor de Equipes Pokémon` • `Melhores Equipes Pokémon` • `Melhor Time Pokémon` • `Calculadora de Sinergia Pokémon` • `Cobertura de Tipos Pokémon` • `Pokemon Team Planner` • `Best Pokemon Team` • `Pokemon FireRed Team Builder` • `Pokemon Emerald Team Builder` • `Pokemon Platinum Team Builder` • `Pokemon HeartGold SoulSilver Team` • `Pokemon Black White Team Builder` • `Pokemon Scarlet Violet Team Builder` • `Pokemon Legends Z-A` • `Pokemon Unbound Team Builder` • `Pokemon Lazarus Team Builder` • `Moveset Pokémon` • `EVs e IVs Pokémon` • `Pokédex Completa`

