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

---

## 🛠️ Linguagens e Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras (sem necessidade de servidores externos ou bancos de dados na nuvem), garantindo que rode instantaneamente em qualquer computador:

- **HTML5** — Estrutura semântica da aplicação, modais da Pokédex e painel lateral de equipes.
- **CSS3** — Estilização responsiva em Dark Mode, variáveis CSS, animações e cores temáticas para os 18 tipos elementais.
- **JavaScript (ES6+ / Vanilla JS)** — Motor matemático de efetividade elemental, algoritmo de recomendação de sinergia de equipe, recomendação de movesets/itens, persistência local (`localStorage` + exportação/importação de arquivos `.json` no computador) e integração opcional com a *PokéAPI*.
- **Ambiente de Desenvolvimento**: Construído utilizando o **Google Antigravity**.

---

## ⚖️ Aviso Legal (Disclaimer)

Este é um **projeto pessoal de fã, totalmente gratuito e sem fins lucrativos**, desenvolvido apenas para estudo e auxílio pessoal durante a jogatina.
*Pokémon* e todos os nomes de personagens, jogos, criaturas e marcas associadas são propriedades intelectuais e marcas registradas da **Nintendo**, **Creatures Inc.** e **GAME FREAK**. *Pokémon Unbound* e *Pokémon Lazarus* são projetos criados por seus respectivos desenvolvedores na comunidade de fãs.
