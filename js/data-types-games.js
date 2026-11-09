// ============================================================================
// TABELAS DE TIPOS, GERAÇÕES, VERSÕES DE JOGOS (GEN 1-9 + UNBOUND & LAZARUS),
// ITENS E ATAQUES (MOVES)
// ============================================================================

window.POKE_DATA = window.POKE_DATA || {};

// Lista completa de tipos e metadados visuais
window.POKE_DATA.TYPES = {
  normal:   { id: 'normal',   name: 'Normal',    color: '#9fa19f', bg: 'rgba(159, 161, 159, 0.18)', icon: '⚪' },
  fire:     { id: 'fire',     name: 'Fogo',      color: '#e62829', bg: 'rgba(230, 40, 41, 0.18)',   icon: '🔥' },
  water:    { id: 'water',    name: 'Água',      color: '#2980ef', bg: 'rgba(41, 128, 239, 0.18)',  icon: '💧' },
  electric: { id: 'electric', name: 'Elétrico',  color: '#fac000', bg: 'rgba(250, 192, 0, 0.18)',   icon: '⚡' },
  grass:    { id: 'grass',    name: 'Planta',    color: '#3fa129', bg: 'rgba(63, 161, 41, 0.18)',   icon: '🌿' },
  ice:      { id: 'ice',      name: 'Gelo',      color: '#3dcef3', bg: 'rgba(61, 206, 243, 0.18)',  icon: '❄️' },
  fighting: { id: 'fighting', name: 'Lutador',   color: '#ff8000', bg: 'rgba(255, 128, 0, 0.18)',   icon: '🥊' },
  poison:   { id: 'poison',   name: 'Venenoso',  color: '#9141cb', bg: 'rgba(145, 65, 203, 0.18)',  icon: '☠️' },
  ground:   { id: 'ground',   name: 'Terrestre', color: '#915121', bg: 'rgba(145, 81, 33, 0.18)',   icon: '⛰️' },
  flying:   { id: 'flying',   name: 'Voador',    color: '#81b9ef', bg: 'rgba(129, 185, 239, 0.18)', icon: '🪽' },
  psychic:  { id: 'psychic',  name: 'Psíquico',  color: '#ef4179', bg: 'rgba(239, 65, 121, 0.18)',  icon: '🔮' },
  bug:      { id: 'bug',      name: 'Inseto',    color: '#91a119', bg: 'rgba(145, 161, 25, 0.18)',  icon: '🪲' },
  rock:     { id: 'rock',     name: 'Pedra',     color: '#afa981', bg: 'rgba(175, 169, 129, 0.18)', icon: '🪨' },
  ghost:    { id: 'ghost',    name: 'Fantasma',  color: '#704170', bg: 'rgba(112, 65, 112, 0.18)',  icon: '👻' },
  dragon:   { id: 'dragon',   name: 'Dragão',    color: '#5060e1', bg: 'rgba(80, 96, 225, 0.18)',   icon: '🐉' },
  dark:     { id: 'dark',     name: 'Sombrio',   color: '#624d4e', bg: 'rgba(98, 77, 78, 0.22)',    icon: '🌙' },
  steel:    { id: 'steel',    name: 'Metálico',  color: '#60a1b8', bg: 'rgba(96, 161, 184, 0.18)',  icon: '⚙️' },
  fairy:    { id: 'fairy',    name: 'Fada',      color: '#ef70ef', bg: 'rgba(239, 112, 239, 0.18)', icon: '✨' }
};

// Tabela de efetividade moderna (Gen 6+)
// Atacante -> Defensor: multiplicador (quando diferente de 1)
window.POKE_DATA.TYPE_CHART_MODERN = {
  normal:   { rock: 0.5, ghost: 0, steel: 0.5 },
  fire:     { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water:    { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass:    { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice:      { fire: 0.5, water: 0.5, grass: 2, ice: 0.5, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 2, ghost: 0, dark: 2, steel: 2, fairy: 0.5 },
  poison:   { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground:   { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying:   { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic:  { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug:      { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock:     { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost:    { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon:   { dragon: 2, steel: 0.5, fairy: 0 },
  dark:     { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel:    { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, steel: 0.5, fairy: 2 },
  fairy:    { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 }
};

// ============================================================================
// CATÁLOGO COMPLETO DE JOGOS E VERSÕES (GEN 1 A GEN 9 + FAN GAMES)
// ============================================================================
window.POKE_DATA.GAMES = [
  // GERAÇÃO 1
  {
    id: 'gen1-rb',
    generation: 1,
    genLabel: 'Geração I',
    name: 'Pokémon Red / Blue',
    versions: ['Red', 'Blue'],
    region: 'Kanto',
    maxDexGen: 1,
    typeChartMode: 'gen1',
    mechanics: [],
    hasItems: false,
    hasAbilities: false,
    starters: ['bulbasaur', 'charmander', 'squirtle'],
    featuredMons: ['venusaur', 'charizard', 'blastoise', 'alakazam', 'gengar', 'snorlax', 'lapras', 'zapdos', 'tauros', 'gyarados', 'nidoking', 'starmie', 'jolteon', 'dragonite', 'rhydon', 'exeggutor'],
    notes: 'Mecânica clássica da Gen 1: Sem itens segurados, Psíquico imune a Fantasma, sem tipos Metálico/Sombrio/Fada. Velocidade define crítico.'
  },
  {
    id: 'gen1-yellow',
    generation: 1,
    genLabel: 'Geração I',
    name: 'Pokémon Yellow (Special Pikachu Edition)',
    versions: ['Yellow'],
    region: 'Kanto',
    maxDexGen: 1,
    typeChartMode: 'gen1',
    mechanics: [],
    hasItems: false,
    hasAbilities: false,
    starters: ['pikachu', 'bulbasaur', 'charmander', 'squirtle'],
    featuredMons: ['pikachu', 'venusaur', 'charizard', 'blastoise', 'nidoking', 'alakazam', 'snorlax', 'gengar', 'dugtrio', 'starmie', 'lapras', 'zapdos'],
    notes: 'Você começa com Pikachu e pode obter Bulbasaur, Charmander e Squirtle durante a jornada em Kanto!'
  },

  // GERAÇÃO 2
  {
    id: 'gen2-gsc',
    generation: 2,
    genLabel: 'Geração II',
    name: 'Pokémon Gold / Silver / Crystal',
    versions: ['Gold', 'Silver', 'Crystal'],
    region: 'Johto',
    maxDexGen: 2,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: false,
    starters: ['chikorita', 'cyndaquil', 'totodile'],
    featuredMons: ['typhlosion', 'feraligatr', 'meganium', 'ampharos', 'heracross', 'espeon', 'umbreon', 'tyranitar', 'scizor', 'kingdra', 'CROBAT', 'houndoom', 'gyarados', 'snorlax', 'suicune'],
    notes: 'Introduz os tipos Sombrio (Dark) e Metálico (Steel), além de Itens Segurados (Leftovers, Berries, Charcoal, Mystic Water).'
  },

  // GERAÇÃO 3
  {
    id: 'gen3-rse',
    generation: 3,
    genLabel: 'Geração III',
    name: 'Pokémon Ruby / Sapphire / Emerald',
    versions: ['Ruby', 'Sapphire', 'Emerald'],
    region: 'Hoenn',
    maxDexGen: 3,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['treecko', 'torchic', 'mudkip'],
    featuredMons: ['swampert', 'blaziken', 'sceptile', 'gardevoir', 'metagross', 'salamence', 'aggron', 'breloom', 'flygon', 'milotic', 'manectric', 'absol', 'slaking', 'altaria', 'hariyama'],
    notes: 'Introduz Habilidades (Abilities) e Naturezas (Natures). Swampert + Gardevoir + Breloom/Salamence formam o núcleo clássico de Hoenn.'
  },
  {
    id: 'gen3-frlg',
    generation: 3,
    genLabel: 'Geração III',
    name: 'Pokémon FireRed / LeafGreen',
    versions: ['FireRed', 'LeafGreen'],
    region: 'Kanto',
    maxDexGen: 3,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['bulbasaur', 'charmander', 'squirtle'],
    featuredMons: ['venusaur', 'charizard', 'blastoise', 'nidoking', 'starmie', 'alakazam', 'snorlax', 'jolteon', 'gyarados', 'lapras', 'arcanine', 'gengar', 'heracross', 'tyranitar'],
    notes: 'Remakes de Kanto com Habilidades, Naturezas e tipos Sombrio/Metálico (Magnemite vira Electric/Steel!).'
  },

  // GERAÇÃO 4
  {
    id: 'gen4-dpp',
    generation: 4,
    genLabel: 'Geração IV',
    name: 'Pokémon Diamond / Pearl / Platinum',
    versions: ['Diamond', 'Pearl', 'Platinum'],
    region: 'Sinnoh',
    maxDexGen: 4,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['turtwig', 'chimchar', 'piplup'],
    featuredMons: ['infernape', 'empoleon', 'torterra', 'garchomp', 'staraptor', 'luxray', 'lucario', 'roserade', 'togekiss', 'weavile', 'gliscor', 'gallade', 'magnezone', 'gastrodon', 'gyarados'],
    notes: 'Introduz a divisão Físico/Especial por ataque individual! Platinum expande muito os Pokémon de Fogo e Gelo em Sinnoh.'
  },
  {
    id: 'gen4-hgss',
    generation: 4,
    genLabel: 'Geração IV',
    name: 'Pokémon HeartGold / SoulSilver',
    versions: ['HeartGold', 'SoulSilver'],
    region: 'Johto',
    maxDexGen: 4,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['chikorita', 'cyndaquil', 'totodile'],
    featuredMons: ['feraligatr', 'typhlosion', 'meganium', 'ampharos', 'heracross', 'crobat', 'espeon', 'mamoswine', 'gyarados', 'scizor', 'dragonite', 'tyranitar', 'arcanine'],
    notes: 'Feraligatr agora aproveita ataques físicos de Água (Waterfall, Ice Fang) graças ao split Físico/Especial da Gen 4!'
  },

  // GERAÇÃO 5
  {
    id: 'gen5-bw',
    generation: 5,
    genLabel: 'Geração V',
    name: 'Pokémon Black / White',
    versions: ['Black', 'White'],
    region: 'Unova',
    maxDexGen: 5,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['snivy', 'tepig', 'oshawott'],
    featuredMons: ['excadrill', 'krookodile', 'darmanitan', 'chandelure', 'haxorus', 'hydreigon', 'volcarona', 'ferrothorn', 'scrafty', 'sigilyph', 'seismitoad', 'reuniclus', 'galvantula', 'emboar', 'samurott', 'serperior'],
    notes: 'TMs infinitos e Hidden Abilities! Campanha principal foca exclusivamente nos 156 novos Pokémon de Unova.'
  },
  {
    id: 'gen5-b2w2',
    generation: 5,
    genLabel: 'Geração V',
    name: 'Pokémon Black 2 / White 2',
    versions: ['Black 2', 'White 2'],
    region: 'Unova',
    maxDexGen: 5,
    typeChartMode: 'gen2-5',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['snivy', 'tepig', 'oshawott'],
    featuredMons: ['lucario', 'magnezone', 'arcanine', 'excadrill', 'krookodile', 'flygon', 'starmie', 'heracross', 'chandelure', 'volcarona', 'haxorus', 'azumarill', 'zoroark', 'espeon'],
    notes: 'Um dos melhores elencos regionais da franquia: Riolu, Mareep, Growlithe e Magnemite disponíveis logo no início!'
  },

  // GERAÇÃO 6
  {
    id: 'gen6-xy',
    generation: 6,
    genLabel: 'Geração VI',
    name: 'Pokémon X / Y',
    versions: ['X', 'Y'],
    region: 'Kalos',
    maxDexGen: 6,
    typeChartMode: 'modern',
    mechanics: ['mega'],
    hasItems: true,
    hasAbilities: true,
    starters: ['chespin', 'fennekin', 'froakie'],
    featuredMons: ['greninja', 'delphox', 'chesnaught', 'talonflame', 'aegislash', 'sylveon', 'lucario', 'charizard', 'venusaur', 'blastoise', 'gardevoir', 'garchomp', 'gyarados', 'goodra', 'hawlucha'],
    notes: 'Introduz o tipo Fada (Fairy) e as MEGA EVOLUÇÕES! Você recebe um inicial de Kalos, um inicial de Kanto (com Mega Stone) e um Mega Lucario.'
  },
  {
    id: 'gen6-oras',
    generation: 6,
    genLabel: 'Geração VI',
    name: 'Pokémon Omega Ruby / Alpha Sapphire',
    versions: ['Omega Ruby', 'Alpha Sapphire'],
    region: 'Hoenn',
    maxDexGen: 6,
    typeChartMode: 'modern',
    mechanics: ['mega', 'primal'],
    hasItems: true,
    hasAbilities: true,
    starters: ['treecko', 'torchic', 'mudkip'],
    featuredMons: ['swampert', 'blaziken', 'sceptile', 'metagross', 'salamence', 'gardevoir', 'altaria', 'aggron', 'mawile', 'lopunny', 'gallade', 'breloom', 'kyogre', 'groudon', 'rayquaza'],
    notes: 'Novas Mega Evoluções (Mega Sceptile, Mega Swampert, Mega Metagross, Mega Salamence, Mega Altaria) e Primal Reversion!'
  },

  // GERAÇÃO 7
  {
    id: 'gen7-sm-usum',
    generation: 7,
    genLabel: 'Geração VII',
    name: 'Pokémon Sun / Moon / Ultra Sun / Ultra Moon',
    versions: ['Sun', 'Moon', 'Ultra Sun', 'Ultra Moon'],
    region: 'Alola',
    maxDexGen: 7,
    typeChartMode: 'modern',
    mechanics: ['zmove', 'mega'],
    hasItems: true,
    hasAbilities: true,
    starters: ['rowlet', 'litten', 'popplio'],
    featuredMons: ['primarina', 'incineroar', 'decidueye', 'mimikyu', 'toxapex', 'kommo-o', 'ribombee', 'mudsdale', 'salazzle', 'ninetales-alola', 'raichu-alola', 'magnezone', 'hawlucha', 'gyarados', 'metagross'],
    notes: 'Introduz Formas de Alola e Z-MOVES (além de Mega Evoluções no late/post-game). Sem HMs obrigatórios!'
  },
  {
    id: 'gen7-lgpe',
    generation: 7,
    genLabel: 'Geração VII',
    name: "Pokémon Let's Go, Pikachu! / Let's Go, Eevee!",
    versions: ["Let's Go Pikachu", "Let's Go Eevee"],
    region: 'Kanto',
    maxDexGen: 1,
    typeChartMode: 'modern',
    mechanics: ['mega'],
    hasItems: false,
    hasAbilities: false,
    starters: ['pikachu', 'eevee'],
    featuredMons: ['pikachu', 'venusaur', 'charizard', 'blastoise', 'alakazam', 'gengar', 'gyarados', 'aerodactyl', 'snorlax', 'nidoking', 'starmie', 'melmetal', 'ninetales-alola'],
    notes: 'Kanto com tabela de tipos moderna (Fada incluso), Formas de Alola e Mega Evoluções para Kanto!'
  },

  // GERAÇÃO 8
  {
    id: 'gen8-swsh',
    generation: 8,
    genLabel: 'Geração VIII',
    name: 'Pokémon Sword / Shield',
    versions: ['Sword', 'Shield'],
    region: 'Galar',
    maxDexGen: 8,
    typeChartMode: 'modern',
    mechanics: ['dynamax'],
    hasItems: true,
    hasAbilities: true,
    starters: ['grookey', 'scorbunny', 'sobble'],
    featuredMons: ['cinderace', 'rillaboom', 'inteleon', 'corviknight', 'dragapult', 'excadrill', 'toxtricity', 'grimmsnarl', 'dracovish', 'darmanitan-galar', 'gyarados', 'togekiss', 'tyranitar', 'ferrothorn', 'urshifu'],
    notes: 'Introduz o fenômeno DYNAMAX e GIGANTAMAX, além de Formas de Galar e a Wild Area.'
  },
  {
    id: 'gen8-bdsp',
    generation: 8,
    genLabel: 'Geração VIII',
    name: 'Pokémon Brilliant Diamond / Shining Pearl',
    versions: ['Brilliant Diamond', 'Shining Pearl'],
    region: 'Sinnoh',
    maxDexGen: 4,
    typeChartMode: 'modern',
    mechanics: [],
    hasItems: true,
    hasAbilities: true,
    starters: ['turtwig', 'chimchar', 'piplup'],
    featuredMons: ['infernape', 'empoleon', 'torterra', 'garchomp', 'togekiss', 'lucario', 'roserade', 'staraptor', 'weavile', 'azumarill', 'gyarados', 'magnezone', 'clefable', 'gliscor'],
    notes: 'Sinnoh com o tipo Fada (Togekiss, Clefable e Azumarill brilham contra o Garchomp da Cynthia!). Grand Underground expande as capturas.'
  },
  {
    id: 'gen8-pla',
    generation: 8,
    genLabel: 'Geração VIII',
    name: 'Pokémon Legends: Arceus',
    versions: ['Legends: Arceus'],
    region: 'Hisui',
    maxDexGen: 8,
    typeChartMode: 'modern',
    mechanics: [],
    hasItems: false,
    hasAbilities: false,
    starters: ['rowlet', 'cyndaquil', 'oshawott'],
    featuredMons: ['typhlosion-hisui', 'samurott-hisui', 'decidueye-hisui', 'ursaluna', 'kleavor', 'zoroark-hisui', 'goodra-hisui', 'arcanine-hisui', 'garchomp', 'lucario', 'togekiss', 'gardevoir'],
    notes: 'Introduz as poderosas Formas e Evoluções de Hisui (Ursaluna, Hisuian Zoroark, Kleavor, Goodra de Hisui) e estilos Agile/Strong.'
  },

  // GERAÇÃO 9
  {
    id: 'gen9-sv',
    generation: 9,
    genLabel: 'Geração IX',
    name: 'Pokémon Scarlet / Violet',
    versions: ['Scarlet', 'Violet'],
    region: 'Paldea',
    maxDexGen: 9,
    typeChartMode: 'modern',
    mechanics: ['tera'],
    hasItems: true,
    hasAbilities: true,
    starters: ['sprigatito', 'fuecoco', 'quaxly'],
    featuredMons: ['skeledirge', 'meowscarada', 'quaquaval', 'annihilape', 'gholdengo', 'kingambit', 'tinkaton', 'baxcalibur', 'ceruledge', 'armarouge', 'garganacl', 'clodsire', 'flutter-mane', 'iron-valiant', 'great-tusk', 'dragonite'],
    notes: 'Introduz o fenômeno TERASTAL (Tera Type), que muda o tipo do Pokémon em batalha para cobrir fraquezas ou turbinar o STAB em 2x!'
  },
  {
    id: 'gen9-lza',
    generation: 9,
    genLabel: 'Geração IX',
    name: 'Pokémon Legends: Z-A (+ DLC Mega Dimension)',
    versions: ['Legends: Z-A'],
    region: 'Kalos (Lumiose)',
    maxDexGen: 9,
    typeChartMode: 'modern',
    mechanics: ['mega'],
    hasItems: true,
    hasAbilities: true,
    starters: ['chikorita', 'tepig', 'totodile'],
    featuredMons: ['feraligatr', 'emboar', 'meganium', 'greninja', 'delphox', 'chesnaught', 'dragonite', 'lucario', 'garchomp', 'gardevoir', 'charizard', 'excadrill', 'chandelure', 'hawlucha', 'starmie', 'clefable', 'baxcalibur', 'zeraora', 'zygardite', 'zygarde', 'raichu', 'absol', 'staraptor'],
    notes: 'Retorno triunfal das MEGA EVOLUÇÕES em Lumiose City com 26 novas Megas do jogo base (Mega Meganium, Mega Emboar, Mega Feraligatr, Mega Greninja, Mega Dragonite, etc.) + 19 novas Megas da DLC Mega Dimension (Mega Raichu X/Y, Mega Lucario Z, Mega Garchomp Z, Mega Baxcalibur, Mega Zeraora, etc.)!'
  },

  // ==========================================================================
  // FAN GAMES E ROM HACKS ESPECIAIS SOLICITADOS
  // ==========================================================================
  {
    id: 'fangame-unbound',
    generation: 99,
    genLabel: 'Fan Game / ROM Hack',
    name: 'Pokémon Unbound (Borrius)',
    versions: ['Vanilla / Difficult', 'Expert / Insane'],
    region: 'Borrius',
    maxDexGen: 8,
    typeChartMode: 'modern',
    mechanics: ['mega', 'zmove', 'dynamax', 'primal'],
    hasItems: true,
    hasAbilities: true,
    starters: ['beldum', 'larvitar', 'gible'],
    featuredMons: ['metagross', 'tyranitar', 'garchomp', 'lucario', 'togekiss', 'excadrill', 'greninja', 'aegislash', 'volcarona', 'ferrothorn', 'gliscor', 'salazzle', 'serperior', 'ribombee', 'weavile', 'gyarados', 'gardevoir', 'gengar', 'mamoswine', 'ursaluna', 'kleavor', 'corviknight', 'dragapult'],
    notes: 'O mais aclamado ROM Hack! Começa com um Pseudo-Lendário (Beldum, Larvitar ou Gible) e inclui Mega Evoluções, Z-Moves, Pokémon até Gen 8 + Hisui, Hidden Abilities e desafios táticos intensos.'
  },
  {
    id: 'fangame-lazarus',
    generation: 99,
    genLabel: 'Fan Game / ROM Hack',
    name: 'Pokémon Lazarus',
    versions: ['Standard', 'Hardcore Mode'],
    region: 'Lazarus Region',
    maxDexGen: 9,
    typeChartMode: 'modern',
    mechanics: ['mega', 'tera', 'zmove'],
    hasItems: true,
    hasAbilities: true,
    starters: ['charmander', 'totodile', 'treecko', 'riolu', 'eevee', 'ralts'],
    featuredMons: ['charizard', 'feraligatr', 'sceptile', 'lucario', 'gardevoir', 'sylveon', 'garchomp', 'gengar', 'metagross', 'kingambit', 'annihilape', 'volcarona', 'greninja', 'dragapult', 'tyranitar', 'aegislash', 'excadrill', 'Mimikyu', 'ceruledge', 'scizor', 'toxapex'],
    notes: 'Fan game completo com balanceamento moderno, Mega Evoluções, Terastal opcional, Pokémon de todas as gerações com movesets atualizados e chefes estratégicos que exigem sinergia elemental perfeita.'
  }
];

// ============================================================================
// MECÂNICAS DOS JOGOS - DEFINIÇÕES
// ============================================================================
window.POKE_DATA.MECHANICS = {
  mega: {
    id: 'mega',
    name: 'Mega Evolução',
    shortName: 'Mega',
    badgeColor: '#ec4899',
    icon: '🧬',
    description: 'Transformação temporária em batalha que aumenta drasticamente os atributos (+100 BST), pode mudar o Tipo e a Habilidade, exigindo a Mega Stone específica.'
  },
  primal: {
    id: 'primal',
    name: 'Primal Reversion',
    shortName: 'Primal',
    badgeColor: '#ef4444',
    icon: '🌋',
    description: 'Reversão Primitiva para Kyogre (Blue Orb) e Groudon (Red Orb), ativada automaticamente ao entrar em campo.'
  },
  zmove: {
    id: 'zmove',
    name: 'Z-Move (Cristal Z)',
    shortName: 'Z-Move',
    badgeColor: '#eab308',
    icon: '💎',
    description: 'Transforma um ataque do mesmo tipo do Z-Crystal em um golpe devastador de uso único na batalha que atravessa Protect.'
  },
  dynamax: {
    id: 'dynamax',
    name: 'Dynamax / Gigantamax',
    shortName: 'Dynamax',
    badgeColor: '#f43f5e',
    icon: '🌩️',
    description: 'Dobra o HP do Pokémon por 3 turnos e converte todos os seus ataques em Max Moves (ou G-Max Moves) com efeitos secundários de campo.'
  },
  tera: {
    id: 'tera',
    name: 'Terastal (Tera Type)',
    shortName: 'Terastal',
    badgeColor: '#06b6d4',
    icon: '👑',
    description: 'Muda o tipo defensivo do Pokémon para o Tera Type escolhido (eliminando fraquezas antigas) e concede bônus STAB (1.5x ou 2.0x) ao tipo Tera.'
  }
};

// ============================================================================
// BANCO DE DADOS DE ITENS (COM RECOMENDAÇÃO INTELIGENTE)
// ============================================================================
window.POKE_DATA.ITEMS = {
  // Itens universais / competitivos / campanha
  'leftovers':       { id: 'leftovers', name: 'Leftovers', minGen: 2, category: 'recovery', icon: '🍎', desc: 'Recupera 1/16 do HP máximo ao final de cada turno. Ideal para Tanks, Bulky e Setup.' },
  'life-orb':        { id: 'life-orb', name: 'Life Orb', minGen: 4, category: 'offense', icon: '🔮', desc: 'Aumenta o poder de todos os ataques em 30% em troca de 10% do HP por golpe. Melhor item para Sweepers versáteis.' },
  'choice-band':     { id: 'choice-band', name: 'Choice Band', minGen: 3, category: 'offense', icon: '🎗️', desc: 'Aumenta o Ataque Físico em 50%, mas trava no primeiro ataque usado.' },
  'choice-specs':    { id: 'choice-specs', name: 'Choice Specs', minGen: 4, category: 'offense', icon: '👓', desc: 'Aumenta o Ataque Especial em 50%, mas trava no primeiro ataque usado.' },
  'choice-scarf':    { id: 'choice-scarf', name: 'Choice Scarf', minGen: 4, category: 'speed', icon: '🧣', desc: 'Aumenta a Velocidade (Speed) em 50%, excelente para Revenge Killers e Wallbreakers mais lentos.' },
  'focus-sash':      { id: 'focus-sash', name: 'Focus Sash', minGen: 4, category: 'survival', icon: '🥋', desc: 'Garante sobreviver com 1 HP a um golpe fatal se estiver com HP cheio. Perfeito para atacantes frágeis e Leads.' },
  'heavy-duty-boots':{ id: 'heavy-duty-boots', name: 'Heavy-Duty Boots', minGen: 8, category: 'utility', icon: '🥾', desc: 'Protege contra armadilhas de entrada (Stealth Rock, Spikes). Indispensável para tipos Fogo/Voador/Gelo/Inseto.' },
  'assault-vest':    { id: 'assault-vest', name: 'Assault Vest', minGen: 6, category: 'defense', icon: '🦺', desc: 'Aumenta a Defesa Especial em 50%, mas exige usar 4 ataques ofensivos.' },
  'rocky-helmet':    { id: 'rocky-helmet', name: 'Rocky Helmet', minGen: 5, category: 'defense', icon: '🪖', desc: 'Causa 1/6 de dano ao oponente que fizer contato físico. Ótimo para tanques físicos (Ferrothorn, Corviknight, Garchomp).' },
  'black-sludge':    { id: 'black-sludge', name: 'Black Sludge', minGen: 4, category: 'recovery', icon: '🧪', desc: 'Recupera 1/16 de HP por turno para Pokémon do tipo Venenoso.' },
  'toxic-orb':       { id: 'toxic-orb', name: 'Toxic Orb', minGen: 4, category: 'ability', icon: '🟣', desc: 'Ativa Poison Heal (Gliscor, Breloom) ou Guts (Ursaluna, Heracross) para cura/poder massivo.' },
  'flame-orb':       { id: 'flame-orb', name: 'Flame Orb', minGen: 4, category: 'ability', icon: '🔥', desc: 'Ativa a habilidade Guts (+50% Attack ignorando redução de Burn) ou Marvel Scale.' },
  'expert-belt':     { id: 'expert-belt', name: 'Expert Belt', minGen: 4, category: 'offense', icon: 'ベルト', desc: 'Aumenta ataques Super Efetivos em 20% sem perder HP. Excelente para campanha in-game com ampla cobertura!' },
  'sitrus-berry':    { id: 'sitrus-berry', name: 'Sitrus Berry', minGen: 3, category: 'recovery', icon: '🍊', desc: 'Cura 25% do HP imediatamente quando o HP cai abaixo da metade.' },
  'lum-berry':       { id: 'lum-berry', name: 'Lum Berry', minGen: 3, category: 'utility', icon: '🍒', desc: 'Cura qualquer condição de status (Burn, Paralysis, Sleep, Confusion) uma vez. Perfeito com Dragon Dance/Outrage.' },
  'light-clay':      { id: 'light-clay', name: 'Light Clay', minGen: 4, category: 'support', icon: '🧱', desc: 'Estende a duração de Reflect, Light Screen e Aurora Veil de 5 para 8 turnos.' },
  'booster-energy':  { id: 'booster-energy', name: 'Booster Energy', minGen: 9, category: 'ability', icon: '⚡', desc: 'Ativa Protosynthesis ou Quark Drive em Pokémon Paradoxo, aumentando seu maior atributo.' },
  'weakness-policy': { id: 'weakness-policy', name: 'Weakness Policy', minGen: 6, category: 'offense', icon: '📜', desc: 'Aumenta Ataque e Ataque Especial em +2 níveis ao receber um golpe Super Efetivo. Letal com Dynamax ou Multiscale!' },
  'loaded-dice':     { id: 'loaded-dice', name: 'Loaded Dice', minGen: 9, category: 'offense', icon: '🎲', desc: 'Garante 4 a 5 acertos em ataques multi-hit (Icicle Spear, Scale Shot, Bullet Seed).' },
  'throat-spray':    { id: 'throat-spray', name: 'Throat Spray', minGen: 8, category: 'offense', icon: '🎤', desc: 'Aumenta o Sp. Atk em +1 após usar um movimento sonoro (Torch Song, Hyper Voice, Boomburst).' },
  'light-ball':      { id: 'light-ball', name: 'Light Ball', minGen: 2, category: 'exclusive', icon: '🟡', desc: 'Item exclusivo do Pikachu: DOBRA tanto o Attack quanto o Sp. Atk!' },
  'thick-club':      { id: 'thick-club', name: 'Thick Club', minGen: 2, category: 'exclusive', icon: '🦴', desc: 'Dobra o Attack de Marowak.' },
  // Itens de aumento por tipo (ótimos em Gen 2 e Gen 3 in-game)
  'charcoal':        { id: 'charcoal', name: 'Charcoal', minGen: 2, category: 'type-boost', boostType: 'fire', icon: '🪵', desc: 'Aumenta ataques do tipo Fogo em 20% sem restrições.' },
  'mystic-water':    { id: 'mystic-water', name: 'Mystic Water', minGen: 2, category: 'type-boost', boostType: 'water', icon: '💧', desc: 'Aumenta ataques do tipo Água em 20% sem restrições.' },
  'miracle-seed':    { id: 'miracle-seed', name: 'Miracle Seed', minGen: 2, category: 'type-boost', boostType: 'grass', icon: '🌱', desc: 'Aumenta ataques do tipo Planta em 20% sem restrições.' },
  'magnet':          { id: 'magnet', name: 'Magnet', minGen: 2, category: 'type-boost', boostType: 'electric', icon: '🧲', desc: 'Aumenta ataques do tipo Elétrico em 20% sem restrições.' },
  'never-melt-ice':  { id: 'never-melt-ice', name: 'Never-Melt Ice', minGen: 2, category: 'type-boost', boostType: 'ice', icon: '🧊', desc: 'Aumenta ataques do tipo Gelo em 20% sem restrições.' },
  'twisted-spoon':   { id: 'twisted-spoon', name: 'Twisted Spoon', minGen: 2, category: 'type-boost', boostType: 'psychic', icon: '🥄', desc: 'Aumenta ataques do tipo Psíquico em 20% sem restrições.' },
  'spell-tag':       { id: 'spell-tag', name: 'Spell Tag', minGen: 2, category: 'type-boost', boostType: 'ghost', icon: '🧧', desc: 'Aumenta ataques do tipo Fantasma em 20% sem restrições.' },
  'black-glasses':   { id: 'black-glasses', name: 'Black Glasses', minGen: 2, category: 'type-boost', boostType: 'dark', icon: '🕶️', desc: 'Aumenta ataques do tipo Sombrio em 20% sem restrições.' },
  'soft-sand':       { id: 'soft-sand', name: 'Soft Sand', minGen: 2, category: 'type-boost', boostType: 'ground', icon: '⏳', desc: 'Aumenta ataques do tipo Terrestre em 20% sem restrições.' },
  'black-belt':      { id: 'black-belt', name: 'Black Belt', minGen: 2, category: 'type-boost', boostType: 'fighting', icon: '🥋', desc: 'Aumenta ataques do tipo Lutador em 20% sem restrições.' },
  'metal-coat':      { id: 'metal-coat', name: 'Metal Coat', minGen: 2, category: 'type-boost', boostType: 'steel', icon: '🔩', desc: 'Aumenta ataques do tipo Metálico em 20% sem restrições.' },
  'hard-stone':      { id: 'hard-stone', name: 'Hard Stone', minGen: 2, category: 'type-boost', boostType: 'rock', icon: '🪨', desc: 'Aumenta ataques do tipo Pedra em 20% sem restrições.' },
  'sharp-beak':      { id: 'sharp-beak', name: 'Sharp Beak', minGen: 2, category: 'type-boost', boostType: 'flying', icon: '🪶', desc: 'Aumenta ataques do tipo Voador em 20% sem restrições.' },
  'scope-lens':      { id: 'scope-lens', name: 'Scope Lens', minGen: 2, category: 'offense', icon: '🔍', desc: 'Aumenta a taxa de acerto crítico em +1 estágio (excelente com Sharpness/Super Luck).' },
  'red-card':        { id: 'red-card', name: 'Red Card', minGen: 5, category: 'utility', icon: '🟥', desc: 'Força o oponente a trocar de Pokémon após acertar o portador (ótimo com Disguise de Mimikyu).' },
  'air-balloon':     { id: 'air-balloon', name: 'Air Balloon', minGen: 5, category: 'utility', icon: '🎈', desc: 'Torna o Pokémon imune a ataques Terrestres até receber um golpe direto.' },
  'punching-glove':  { id: 'punching-glove', name: 'Punching Glove', minGen: 9, category: 'offense', icon: '🥊', desc: 'Aumenta ataques de soco em 10% e evita dano de contato (Rocky Helmet/Rough Skin).' },

  // Mega Stones
  'venusaurite':     { id: 'venusaurite', name: 'Venusaurite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Venusaur Mega Evolua em batalha (ganha Thick Fat, perdendo fraqueza a Fogo e Gelo!).' },
  'charizardite-x':  { id: 'charizardite-x', name: 'Charizardite X', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite Mega Evoluir para Mega Charizard X (Fogo/Dragão com Tough Claws).' },
  'charizardite-y':  { id: 'charizardite-y', name: 'Charizardite Y', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite Mega Evoluir para Mega Charizard Y (ativa Drought/Sol e Sp. Atk 159).' },
  'blastoisinite':   { id: 'blastoisinite', name: 'Blastoisinite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Blastoise Mega Evolua com Mega Launcher (+50% em Aura Sphere/Dark Pulse/Water Pulse).' },
  'alakazite':       { id: 'alakazite', name: 'Alakazite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Alakazam Mega Evolua (175 Sp. Atk e 150 Speed com Trace).' },
  'gengarite':       { id: 'gengarite', name: 'Gengarite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Gengar Mega Evolua (Shadow Tag + 170 Sp. Atk).' },
  'gyaradosite':     { id: 'gyaradosite', name: 'Gyaradosite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Gyarados Mega Evolua (vira Água/Sombrio com Mold Breaker).' },
  'aerodactylite':   { id: 'aerodactylite', name: 'Aerodactylite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Aerodactyl Mega Evolua com Tough Claws e 150 Speed.' },
  'ampharosite':     { id: 'ampharosite', name: 'Ampharosite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Ampharos Mega Evolua (vira Elétrico/Dragão com 165 Sp. Atk).' },
  'scizorite':       { id: 'scizorite', name: 'Scizorite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Scizor Mega Evolua mantendo Technician com defesa e ataque colossais.' },
  'heracronite':     { id: 'heracronite', name: 'Heracronite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Heracross Mega Evolua (185 Attack com Skill Link!).' },
  'houndoominite':   { id: 'houndoominite', name: 'Houndoominite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Houndoom Mega Evolua com Solar Power.' },
  'tyranitarite':    { id: 'tyranitarite', name: 'Tyranitarite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Tyranitar Mega Evolua (700 BST, Sand Stream e defesas titânicas).' },
  'sceptilite':      { id: 'sceptilite', name: 'Sceptilite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Sceptile Mega Evolua (vira Planta/Dragão com Lightning Rod - imune a Elétrico!).' },
  'blazikenite':     { id: 'blazikenite', name: 'Blazikenite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Blaziken Mega Evolua (160 Attack + Speed Boost todo turno!).' },
  'swampertite':     { id: 'swampertite', name: 'Swampertite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Swampert Mega Evolua (150 Attack + Swift Swim).' },
  'gardevoirite':    { id: 'gardevoirite', name: 'Gardevoirite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Gardevoir Mega Evolua (165 Sp. Atk + Pixilate para Hyper Voice Fada).' },
  'aggronite':       { id: 'aggronite', name: 'Aggronite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Aggron Mega Evolua (vira Metálico puro com 230 Defense e Filter!).' },
  'manectite':       { id: 'manectite', name: 'Manectite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Manectric Mega Evolua (135 Speed/Sp.Atk + Intimidate).' },
  'altarianite':     { id: 'altarianite', name: 'Altarianite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Altaria Mega Evolua (vira Dragão/Fada com Pixilate!).' },
  'absolite':        { id: 'absolite', name: 'Absolite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Absol Mega Evolua com Magic Bounce.' },
  'salamencite':     { id: 'salamencite', name: 'Salamencite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Salamence Mega Evolua (Aerilate + 700 BST).' },
  'metagrossite':    { id: 'metagrossite', name: 'Metagrossite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Metagross Mega Evolua (Tough Claws + 110 Speed e 145 Attack!).' },
  'lopunnite':       { id: 'lopunnite', name: 'Lopunnite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Lopunny Mega Evolua (vira Normal/Lutador com Scrappy - acerta Fantasmas!).' },
  'garchompite':     { id: 'garchompite', name: 'Garchompite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Garchomp Mega Evolua (170 Attack e 120 Sp. Atk com Sand Force).' },
  'lucarionite':     { id: 'lucarionite', name: 'Lucarionite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Lucario Mega Evolua (Adaptability dobra o bônus STAB para 2x!).' },
  'galladite':       { id: 'galladite', name: 'Galladite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Gallade Mega Evolua (165 Attack e 110 Speed).' },
  'mawilite':        { id: 'mawilite', name: 'Mawilite', minGen: 6, category: 'mega', icon: '🧬', desc: 'Permite que Mawile Mega Evolua (Huge Power dobra seu Attack de 105!).' },
  'red-orb':         { id: 'red-orb', name: 'Red Orb', minGen: 6, category: 'primal', icon: '🔴', desc: 'Ativa Primal Reversion de Groudon (vira Terrestre/Fogo imune a Água!).' },
  'blue-orb':        { id: 'blue-orb', name: 'Blue Orb', minGen: 6, category: 'primal', icon: '🔵', desc: 'Ativa Primal Reversion de Kyogre (Primordial Sea com 180 Sp. Atk).' },

  // Z-Crystals
  'firium-z':        { id: 'firium-z', name: 'Firium Z', minGen: 7, category: 'zmove', zType: 'fire', icon: '💎', desc: 'Converte um ataque de Fogo em Inferno Overdrive.' },
  'waterium-z':      { id: 'waterium-z', name: 'Waterium Z', minGen: 7, category: 'zmove', zType: 'water', icon: '💎', desc: 'Converte um ataque de Água em Hydro Vortex.' },
  'grassium-z':      { id: 'grassium-z', name: 'Grassium Z', minGen: 7, category: 'zmove', zType: 'grass', icon: '💎', desc: 'Converte um ataque de Planta em Bloom Doom.' },
  'electrium-z':     { id: 'electrium-z', name: 'Electrium Z', minGen: 7, category: 'zmove', zType: 'electric', icon: '💎', desc: 'Converte um ataque Elétrico em Gigavolt Havoc.' },
  'fightinium-z':    { id: 'fightinium-z', name: 'Fightinium Z', minGen: 7, category: 'zmove', zType: 'fighting', icon: '💎', desc: 'Converte um ataque Lutador em All-Out Pummeling.' },
  'groundium-z':     { id: 'groundium-z', name: 'Groundium Z', minGen: 7, category: 'zmove', zType: 'ground', icon: '💎', desc: 'Converte um ataque Terrestre em Tectonic Rage.' },
  'dragonium-z':     { id: 'dragonium-z', name: 'Dragonium Z', minGen: 7, category: 'zmove', zType: 'dragon', icon: '💎', desc: 'Converte um ataque Dragão em Devastating Drake.' },
  'fairium-z':       { id: 'fairium-z', name: 'Fairium Z', minGen: 7, category: 'zmove', zType: 'fairy', icon: '💎', desc: 'Converte um ataque Fada em Twinkle Tackle.' },
  'ghostium-z':      { id: 'ghostium-z', name: 'Ghostium Z', minGen: 7, category: 'zmove', zType: 'ghost', icon: '💎', desc: 'Converte um ataque Fantasma em Never-Ending Nightmare.' },
  'psychium-z':      { id: 'psychium-z', name: 'Psychium Z', minGen: 7, category: 'zmove', zType: 'psychic', icon: '💎', desc: 'Converte um ataque Psíquico em Shattered Psyche.' },
  'steelium-z':      { id: 'steelium-z', name: 'Steelium Z', minGen: 7, category: 'zmove', zType: 'steel', icon: '💎', desc: 'Converte um ataque Metálico em Corkscrew Crash.' },
  'darkinium-z':     { id: 'darkinium-z', name: 'Darkinium Z', minGen: 7, category: 'zmove', zType: 'dark', icon: '💎', desc: 'Converte um ataque Sombrio em Black Hole Eclipse.' },
  'icium-z':         { id: 'icium-z', name: 'Icium Z', minGen: 7, category: 'zmove', zType: 'ice', icon: '💎', desc: 'Converte um ataque de Gelo em Subzero Slammer.' },
  'flyinium-z':      { id: 'flyinium-z', name: 'Flyinium Z', minGen: 7, category: 'zmove', zType: 'flying', icon: '💎', desc: 'Converte um ataque Voador em Supersonic Skystrike.' },
  'rockium-z':       { id: 'rockium-z', name: 'Rockium Z', minGen: 7, category: 'zmove', zType: 'rock', icon: '💎', desc: 'Converte um ataque de Pedra em Continental Crush.' }
};

// ============================================================================
// BANCO DE DADOS DE ATAQUES (MOVES) COM CATEGORIA, PODER, PRECISÃO E EFEITO
// ============================================================================
window.POKE_DATA.MOVES = {
  // FOGO
  'flamethrower':  { name: 'Flamethrower', type: 'fire', category: 'Special', power: 90, acc: 100, desc: 'Ataque de Fogo confiável com 10% de chance de Burn.' },
  'fire-blast':    { name: 'Fire Blast', type: 'fire', category: 'Special', power: 110, acc: 85, desc: 'Ataque devastador de Fogo com alto poder base.' },
  'flare-blitz':   { name: 'Flare Blitz', type: 'fire', category: 'Physical', power: 120, acc: 100, desc: 'Ataque físico massivo de Fogo com recuo de 1/3.' },
  'fire-punch':    { name: 'Fire Punch', type: 'fire', category: 'Physical', power: 75, acc: 100, desc: 'Soco de Fogo 100% preciso para cobertura física.' },
  'fire-fang':     { name: 'Fire Fang', type: 'fire', category: 'Physical', power: 65, acc: 95, desc: 'Presa de Fogo com chance de Burn e Flinch.' },
  'overheat':      { name: 'Overheat', type: 'fire', category: 'Special', power: 130, acc: 90, desc: 'Explosão térmica de 130 de poder (reduz Sp. Atk em 2 níveis).' },
  'torch-song':    { name: 'Torch Song', type: 'fire', category: 'Special', power: 80, acc: 100, desc: 'Canto flamejante que aumenta o Sp. Atk em +1 a cada uso!' },
  'pyro-ball':     { name: 'Pyro Ball', type: 'fire', category: 'Physical', power: 120, acc: 90, desc: 'Assinatura de Cinderace com 120 de poder sem dano de recuo.' },
  'bitter-blade':  { name: 'Bitter Blade', type: 'fire', category: 'Physical', power: 90, acc: 100, desc: 'Lâmina de Fogo que drena 50% do dano causado como HP.' },
  'fiery-dance':   { name: 'Fiery Dance', type: 'fire', category: 'Special', power: 80, acc: 100, desc: '50% de chance de aumentar o Sp. Atk em +1 nível.' },
  'mystical-fire': { name: 'Mystical Fire', type: 'fire', category: 'Special', power: 75, acc: 100, desc: 'Sempre reduz o Sp. Atk do alvo em 1 nível.' },
  'will-o-wisp':   { name: 'Will-O-Wisp', type: 'fire', category: 'Status', power: 0, acc: 85, desc: 'Causa Burn no alvo, cortando seu Ataque Físico pela metade.' },

  // ÁGUA
  'surf':          { name: 'Surf', type: 'water', category: 'Special', power: 90, acc: 100, desc: 'O ataque Especial de Água mais confiável e preciso.' },
  'hydro-pump':    { name: 'Hydro Pump', type: 'water', category: 'Special', power: 110, acc: 80, desc: 'Jato de Água de altíssimo poder para nocautes imediatos.' },
  'scald':         { name: 'Scald', type: 'water', category: 'Special', power: 80, acc: 100, desc: 'Água fervente com 30% de chance de causar Burn no inimigo!' },
  'waterfall':     { name: 'Waterfall', type: 'water', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico de Água 100% preciso com 20% de Flinch.' },
  'liquidation':   { name: 'Liquidation', type: 'water', category: 'Physical', power: 85, acc: 100, desc: 'Ataque físico de Água com 20% de chance de reduzir a Defesa.' },
  'aqua-jet':      { name: 'Aqua Jet', type: 'water', category: 'Physical', power: 40, acc: 100, desc: 'Ataque de Água com Prioridade +1 para finalizar inimigos.' },
  'wave-crash':    { name: 'Wave Crash', type: 'water', category: 'Physical', power: 120, acc: 100, desc: 'Investida aquática de 120 de poder com dano de recuo.' },
  'aqua-step':     { name: 'Aqua Step', type: 'water', category: 'Physical', power: 80, acc: 100, desc: 'Sempre aumenta a Velocidade (Speed) do usuário em +1!' },
  'flip-turn':     { name: 'Flip Turn', type: 'water', category: 'Physical', power: 60, acc: 100, desc: 'Causa dano de Água e troca o Pokémon mantendo o momentum.' },
  'fishious-rend': { name: 'Fishious Rend', type: 'water', category: 'Physical', power: 85, acc: 100, desc: 'Dobra de poder (170!) se o usuário atacar primeiro.' },
  'origin-pulse':  { name: 'Origin Pulse', type: 'water', category: 'Special', power: 110, acc: 85, desc: 'Ataque assinatura de Kyogre que atinge todos os oponentes.' },

  // PLANTA
  'energy-ball':   { name: 'Energy Ball', type: 'grass', category: 'Special', power: 90, acc: 100, desc: 'Esfera de Planta com 10% de chance de reduzir Sp. Def.' },
  'giga-drain':    { name: 'Giga Drain', type: 'grass', category: 'Special', power: 75, acc: 100, desc: 'Causa dano de Planta e recupera 50% do dano como HP.' },
  'leaf-blade':    { name: 'Leaf Blade', type: 'grass', category: 'Physical', power: 90, acc: 100, desc: 'Lâmina de folha física com alta taxa de golpe crítico.' },
  'seed-bomb':     { name: 'Seed Bomb', type: 'grass', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico de Planta confiável sem efeitos negativos.' },
  'wood-hammer':   { name: 'Wood Hammer', type: 'grass', category: 'Physical', power: 120, acc: 100, desc: 'Golpe físico de Planta devastador com recuo de 1/3.' },
  'flower-trick':  { name: 'Flower Trick', type: 'grass', category: 'Physical', power: 70, acc: 100, desc: 'SEMPRE acerta golpe crítico (105 poder efetivo) e nunca erra!' },
  'leaf-storm':    { name: 'Leaf Storm', type: 'grass', category: 'Special', power: 130, acc: 90, desc: 'Tempestade de folhas (Com Contrary em Serperior, AUMENTA Sp. Atk +2!).' },
  'grassy-glide':  { name: 'Grassy Glide', type: 'grass', category: 'Physical', power: 55, acc: 100, desc: 'Ganha Prioridade +1 quando Grassy Terrain está ativo.' },
  'spore':         { name: 'Spore', type: 'grass', category: 'Status', power: 0, acc: 100, desc: 'Coloca o oponente para dormir com 100% de precisão!' },
  'leech-seed':    { name: 'Leech Seed', type: 'grass', category: 'Status', power: 0, acc: 90, desc: 'Drena 1/8 do HP do oponente a cada turno para curar sua equipe.' },
  'Bullet-seed':   { name: 'Bullet Seed', type: 'grass', category: 'Physical', power: 25, acc: 100, desc: 'Acerta de 2 a 5 vezes (letal com Technician ou Loaded Dice).' },

  // ELÉTRICO
  'thunderbolt':   { name: 'Thunderbolt', type: 'electric', category: 'Special', power: 90, acc: 100, desc: 'Ataque Elétrico padrão-ouro com 100% de precisão.' },
  'thunder':       { name: 'Thunder', type: 'electric', category: 'Special', power: 110, acc: 70, desc: 'Trovão de 110 de poder (nunca erra na chuva ou com Compound Eyes).' },
  'volt-switch':   { name: 'Volt Switch', type: 'electric', category: 'Special', power: 70, acc: 100, desc: 'Ataca com eletricidade e troca de Pokémon imediatamente.' },
  'wild-charge':   { name: 'Wild Charge', type: 'electric', category: 'Physical', power: 90, acc: 100, desc: 'Investida elétrica física com leve recuo.' },
  'thunder-punch': { name: 'Thunder Punch', type: 'electric', category: 'Physical', power: 75, acc: 100, desc: 'Soco elétrico excelente para cobertura contra Água e Voador.' },
  'discharge':     { name: 'Discharge', type: 'electric', category: 'Special', power: 80, acc: 100, desc: 'Descarga elétrica com 30% de chance de paralisar.' },
  'thunder-wave':  { name: 'Thunder Wave', type: 'electric', category: 'Status', power: 0, acc: 90, desc: 'Paralisa o alvo, reduzindo sua Velocidade pela metade.' },

  // GELO
  'ice-beam':      { name: 'Ice Beam', type: 'ice', category: 'Special', power: 90, acc: 100, desc: 'Essencial para cobertura contra Dragão, Terra, Planta e Voador.' },
  'blizzard':      { name: 'Blizzard', type: 'ice', category: 'Special', power: 110, acc: 70, desc: 'Nevasca de 110 de poder (100% precisa sob Hail/Snow).' },
  'ice-punch':     { name: 'Ice Punch', type: 'ice', category: 'Physical', power: 75, acc: 100, desc: 'Soco de Gelo físico para destruir Dragões e Voadores.' },
  'icicle-crash':  { name: 'Icicle Crash', type: 'ice', category: 'Physical', power: 85, acc: 90, desc: 'Forte ataque físico de Gelo com 30% de chance de Flinch.' },
  'icicle-spear':  { name: 'Icicle Spear', type: 'ice', category: 'Physical', power: 25, acc: 100, desc: 'Acerta de 2 a 5 vezes, quebrando Focus Sash e Disguise.' },
  'ice-shard':     { name: 'Ice Shard', type: 'ice', category: 'Physical', power: 40, acc: 100, desc: 'Prioridade +1 de Gelo: abate Garchomp, Salamence e Dragapult antes de agirem!' },
  'freeze-dry':    { name: 'Freeze-Dry', type: 'ice', category: 'Special', power: 70, acc: 100, desc: 'Ataque de Gelo que também é SUPER EFETIVO contra tipos Água (4x em Swampert/Gyarados)!' },
  'triple-axel':   { name: 'Triple Axel', type: 'ice', category: 'Physical', power: 120, acc: 90, desc: 'Chute triplo de Gelo que atinge até 120 de poder total.' },
  'aurora-veil':   { name: 'Aurora Veil', type: 'ice', category: 'Status', power: 0, acc: 100, desc: 'Sob neve, reduz todo dano físico e especial pela metade por 5-8 turnos.' },

  // LUTADOR
  'close-combat':  { name: 'Close Combat', type: 'fighting', category: 'Physical', power: 120, acc: 100, desc: 'O melhor ataque físico Lutador (120 de poder e 100% precisão).' },
  'aura-sphere':   { name: 'Aura Sphere', type: 'fighting', category: 'Special', power: 80, acc: 100, desc: 'Esfera de aura Especial que nunca erra.' },
  'drain-punch':   { name: 'Drain Punch', type: 'fighting', category: 'Physical', power: 75, acc: 100, desc: 'Soco Lutador que recupera 50% do dano causado como HP.' },
  'brick-break':   { name: 'Brick Break', type: 'fighting', category: 'Physical', power: 75, acc: 100, desc: 'Destrói barreiras (Reflect/Light Screen/Aurora Veil) do oponente.' },
  'mach-punch':    { name: 'Mach Punch', type: 'fighting', category: 'Physical', power: 40, acc: 100, desc: 'Soco Lutador com Prioridade +1 (devastador com Technician!).' },
  'focus-blast':   { name: 'Focus Blast', type: 'fighting', category: 'Special', power: 120, acc: 70, desc: 'Cobertura Especial Lutadora de 120 de poder contra Aço e Sombrio.' },
  'body-press':    { name: 'Body Press', type: 'fighting', category: 'Physical', power: 80, acc: 100, desc: 'Calcula o dano usando a DEFESA do usuário em vez do Ataque!' },
  'superpower':    { name: 'Superpower', type: 'fighting', category: 'Physical', power: 120, acc: 100, desc: 'Golpe Lutador de 120 de poder.' },
  'high-jump-kick':{ name: 'High Jump Kick', type: 'fighting', category: 'Physical', power: 130, acc: 90, desc: 'Chute voador de 130 de poder.' },
  'sacred-sword':  { name: 'Sacred Sword', type: 'fighting', category: 'Physical', power: 90, acc: 100, desc: 'Espada sagrada que ignora aumentos de defesa do alvo.' },

  // VENENOSO
  'sludge-bomb':   { name: 'Sludge Bomb', type: 'poison', category: 'Special', power: 90, acc: 100, desc: 'Forte ataque Especial Venenoso com 30% de chance de envenenar.' },
  'sludge-wave':   { name: 'Sludge Wave', type: 'poison', category: 'Special', power: 95, acc: 100, desc: 'Onda tóxica Especial com 95 de poder para abater Fadas e Plantas.' },
  'poison-jab':    { name: 'Poison Jab', type: 'poison', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico Venenoso confiável com 30% de Poison.' },
  'gunk-shot':     { name: 'Gunk Shot', type: 'poison', category: 'Physical', power: 120, acc: 80, desc: 'O ataque físico Venenoso mais poderoso (120 de poder).' },
  'toxic':         { name: 'Toxic', type: 'poison', category: 'Status', power: 0, acc: 90, desc: 'Envenenamento grave que aumenta o dano a cada turno.' },

  // TERRESTRE
  'earthquake':    { name: 'Earthquake', type: 'ground', category: 'Physical', power: 100, acc: 100, desc: 'Um dos melhores ataques do jogo: 100 de poder e 100% de precisão!' },
  'earth-power':   { name: 'Earth Power', type: 'ground', category: 'Special', power: 90, acc: 100, desc: 'Ataque Especial Terrestre excelente (perfeito com Sheer Force!).' },
  'headlong-rush': { name: 'Headlong Rush', type: 'ground', category: 'Physical', power: 120, acc: 100, desc: 'Investida Terrestre de 120 de poder (Ursaluna / Great Tusk / Torterra).' },
  'precipice-blades': { name: 'Precipice Blades', type: 'ground', category: 'Physical', power: 120, acc: 85, desc: 'Ataque assinatura de Groudon com 120 de poder.' },
  'high-horsepower':{ name: 'High Horsepower', type: 'ground', category: 'Physical', power: 95, acc: 95, desc: 'Ataque Terrestre de alvo único (não tem poder reduzido por Grassy Terrain).' },

  // VOADOR
  'brave-bird':    { name: 'Brave Bird', type: 'flying', category: 'Physical', power: 120, acc: 100, desc: 'Investida aérea devastadora de 120 de poder.' },
  'air-slash':     { name: 'Air Slash', type: 'flying', category: 'Special', power: 75, acc: 95, desc: '30% de chance de Flinch (60% com Serene Grace em Togekiss!).' },
  'hurricane':     { name: 'Hurricane', type: 'flying', category: 'Special', power: 110, acc: 70, desc: 'Furacão Voador de 110 de poder com 30% de confusão.' },
  'acrobatics':    { name: 'Acrobatics', type: 'flying', category: 'Physical', power: 110, acc: 100, desc: 'Atinge 110 de poder quando o Pokémon não segura item ou consome Berry/Seed.' },
  'dual-wingbeat': { name: 'Dual Wingbeat', type: 'flying', category: 'Physical', power: 80, acc: 90, desc: 'Golpe duplo Voador (excelente com Technician em Scyther/Salamence).' },
  'roost':         { name: 'Roost', type: 'flying', category: 'Status', power: 0, acc: 100, desc: 'Recupera 50% do HP máximo e remove temporariamente o tipo Voador.' },

  // PSÍQUICO
  'psychic':       { name: 'Psychic', type: 'psychic', category: 'Special', power: 90, acc: 100, desc: 'O principal ataque Especial Psíquico com 10% de queda de Sp. Def.' },
  'psyshock':      { name: 'Psyshock', type: 'psychic', category: 'Special', power: 80, acc: 100, desc: 'Ataque Especial que causa dano na DEFESA FÍSICA do alvo (vence Blissey/Clodsire).' },
  'zen-headbutt':  { name: 'Zen Headbutt', type: 'psychic', category: 'Physical', power: 80, acc: 90, desc: 'Cabeçada Psíquica física com 20% de chance de Flinch.' },
  'psycho-cut':    { name: 'Psycho Cut', type: 'psychic', category: 'Physical', power: 70, acc: 100, desc: 'Corte Psíquico físico 100% preciso com alta taxa de crítico (bom com Sharpness).' },
  'calm-mind':     { name: 'Calm Mind', type: 'psychic', category: 'Status', power: 0, acc: 100, desc: 'Aumenta Sp. Atk e Sp. Def em +1 nível.' },
  'agility':       { name: 'Agility', type: 'psychic', category: 'Status', power: 0, acc: 100, desc: 'Aumenta drasticamente a Velocidade (+2 níveis).' },

  // INSETO
  'bug-buzz':      { name: 'Bug Buzz', type: 'bug', category: 'Special', power: 90, acc: 100, desc: 'Onda sonora de Inseto que atravessa Substitute.' },
  'u-turn':        { name: 'U-turn', type: 'bug', category: 'Physical', power: 70, acc: 100, desc: 'Causa dano e troca de Pokémon imediatamente para manter vantagem.' },
  'megahorn':      { name: 'Megahorn', type: 'bug', category: 'Physical', power: 120, acc: 85, desc: 'Chifrada de Inseto com 120 de poder base.' },
  'x-scissor':     { name: 'X-Scissor', type: 'bug', category: 'Physical', power: 80, acc: 100, desc: 'Corte cruzado de Inseto 100% preciso.' },
  'leech-life':    { name: 'Leech Life', type: 'bug', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico de Inseto (80 de poder) que cura 50% do dano causado!' },
  'quiver-dance':  { name: 'Quiver Dance', type: 'bug', category: 'Status', power: 0, acc: 100, desc: 'Um dos melhores setups: aumenta Sp. Atk, Sp. Def e Speed em +1!' },

  // PEDRA
  'stone-edge':    { name: 'Stone Edge', type: 'rock', category: 'Physical', power: 100, acc: 80, desc: 'Ataque de Pedra de 100 de poder com alta taxa de crítico.' },
  'rock-slide':    { name: 'Rock Slide', type: 'rock', category: 'Physical', power: 75, acc: 90, desc: 'Deslizamento de rochas com 30% de chance de Flinch.' },
  'power-gem':     { name: 'Power Gem', type: 'rock', category: 'Special', power: 80, acc: 100, desc: 'Ataque Especial de Pedra 100% preciso.' },
  'stone-axe':     { name: 'Stone Axe', type: 'rock', category: 'Physical', power: 65, acc: 90, desc: 'Causa dano de Pedra E instala Stealth Rock automaticamente no campo inimigo!' },
  'salt-cure':     { name: 'Salt Cure', type: 'rock', category: 'Physical', power: 40, acc: 100, desc: 'Causa dano residual contínuo (25% por turno contra Água e Metálico!).' },
  'stealth-rock':  { name: 'Stealth Rock', type: 'rock', category: 'Status', power: 0, acc: 100, desc: 'Armadilha de entrada essencial que fere inimigos ao entrarem em campo.' },

  // FANTASMA
  'shadow-ball':   { name: 'Shadow Ball', type: 'ghost', category: 'Special', power: 80, acc: 100, desc: 'Principal ataque Especial Fantasma com ampla cobertura neutra.' },
  'shadow-claw':   { name: 'Shadow Claw', type: 'ghost', category: 'Physical', power: 70, acc: 100, desc: 'Garra Fantasma física com alta taxa de golpe crítico.' },
  'poltergeist':   { name: 'Poltergeist', type: 'ghost', category: 'Physical', power: 110, acc: 90, desc: 'Ataque físico Fantasma de 110 de poder se o alvo tiver item.' },
  'shadow-sneak':  { name: 'Shadow Sneak', type: 'ghost', category: 'Physical', power: 40, acc: 100, desc: 'Golpe Fantasma com Prioridade +1.' },
  'rage-fist':     { name: 'Rage Fist', type: 'ghost', category: 'Physical', power: 100, acc: 100, desc: 'Assinatura de Annihilape: ganha +50 de poder a cada golpe recebido (até 350!).' },
  'hex':           { name: 'Hex', type: 'ghost', category: 'Special', power: 65, acc: 100, desc: 'Dobra de poder para 130 se o alvo estiver com condição de status!' },

  // DRAGÃO
  'dragon-claw':   { name: 'Dragon Claw', type: 'dragon', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico Dragão confiável e sem efeitos negativos.' },
  'outrage':       { name: 'Outrage', type: 'dragon', category: 'Physical', power: 120, acc: 100, desc: 'Fúria Dragão de 120 de poder por 2-3 turnos.' },
  'draco-meteor':  { name: 'Draco Meteor', type: 'dragon', category: 'Special', power: 130, acc: 90, desc: 'Meteoro Dragão Especial devastador de 130 de poder.' },
  'dragon-pulse':  { name: 'Dragon Pulse', type: 'dragon', category: 'Special', power: 85, acc: 100, desc: 'Pulso Especial Dragão consistente e 100% preciso.' },
  'glaive-rush':   { name: 'Glaive Rush', type: 'dragon', category: 'Physical', power: 120, acc: 100, desc: 'Assinatura de Baxcalibur com 120 de poder sem ficar preso.' },
  'dragon-darts':  { name: 'Dragon Darts', type: 'dragon', category: 'Physical', power: 100, acc: 100, desc: 'Assinatura de Dragapult: acerta duas vezes (50+50) quebrando Sash!' },
  'scale-shot':    { name: 'Scale Shot', type: 'dragon', category: 'Physical', power: 100, acc: 90, desc: 'Acerta de 2 a 5 vezes e aumenta a Velocidade em +1!' },
  'dragon-dance':  { name: 'Dragon Dance', type: 'dragon', category: 'Status', power: 0, acc: 100, desc: 'Aumenta o Ataque Físico e a Velocidade em +1 nível. Vence jogos!' },

  // SOMBRIO
  'crunch':        { name: 'Crunch', type: 'dark', category: 'Physical', power: 80, acc: 100, desc: 'Mordida Sombria com 20% de chance de reduzir a Defesa.' },
  'knock-off':     { name: 'Knock Off', type: 'dark', category: 'Physical', power: 97, acc: 100, desc: 'Remove o item do oponente e causa 97.5 de poder base!' },
  'dark-pulse':    { name: 'Dark Pulse', type: 'dark', category: 'Special', power: 80, acc: 100, desc: 'Pulso Especial Sombrio com 20% de chance de Flinch.' },
  'sucker-punch':  { name: 'Sucker Punch', type: 'dark', category: 'Physical', power: 70, acc: 100, desc: 'Golpe Sombrio de Prioridade +1 se o alvo preparar um ataque.' },
  'kowtow-cleave': { name: 'Kowtow Cleave', type: 'dark', category: 'Physical', power: 85, acc: 100, desc: 'Golpe assinatura de Kingambit que nunca erra.' },
  'ceaseless-edge':{ name: 'Ceaseless Edge', type: 'dark', category: 'Physical', power: 65, acc: 90, desc: 'Causa dano Sombrio E instala Spikes no campo adversário!' },
  'night-slash':   { name: 'Night Slash', type: 'dark', category: 'Physical', power: 70, acc: 100, desc: 'Corte Sombrio com alta chance de acerto crítico.' },
  'nasty-plot':    { name: 'Nasty Plot', type: 'dark', category: 'Status', power: 0, acc: 100, desc: 'Aumenta drasticamente o Ataque Especial em +2 níveis!' },

  // METÁLICO
  'iron-head':     { name: 'Iron Head', type: 'steel', category: 'Physical', power: 80, acc: 100, desc: 'Cabeçada Metálica com 30% de chance de Flinch.' },
  'meteor-mash':   { name: 'Meteor Mash', type: 'steel', category: 'Physical', power: 90, acc: 90, desc: 'Soco meteórico de 90 de poder com 20% de chance de aumentar o Attack!' },
  'bullet-punch':  { name: 'Bullet Punch', type: 'steel', category: 'Physical', power: 40, acc: 100, desc: 'Prioridade +1 Metálica (chega a 90 de poder em Scizor com Technician + STAB!).' },
  'flash-cannon':  { name: 'Flash Cannon', type: 'steel', category: 'Special', power: 80, acc: 100, desc: 'Canhão Especial Metálico para destruir Fadas, Gelo e Pedra.' },
  'make-it-rain':  { name: 'Make It Rain', type: 'steel', category: 'Special', power: 120, acc: 100, desc: 'Assinatura de Gholdengo com 120 de poder e 100% de precisão.' },
  'gigaton-hammer':{ name: 'Gigaton Hammer', type: 'steel', category: 'Physical', power: 160, acc: 100, desc: 'Martelo colosso de Tinkaton com 160 de poder base!' },

  // FADA
  'moonblast':     { name: 'Moonblast', type: 'fairy', category: 'Special', power: 95, acc: 100, desc: 'O melhor ataque Especial de Fada (95 de poder, 30% de reduzir Sp. Atk).' },
  'dazzling-gleam':{ name: 'Dazzling Gleam', type: 'fairy', category: 'Special', power: 80, acc: 100, desc: 'Brilho de Fada que atinge todos os oponentes.' },
  'play-rough':    { name: 'Play Rough', type: 'fairy', category: 'Physical', power: 90, acc: 90, desc: 'Principal ataque físico de Fada com 90 de poder.' },
  'spirit-break':  { name: 'Spirit Break', type: 'fairy', category: 'Physical', power: 75, acc: 100, desc: 'Golpe físico de Fada que SEMPRE reduz o Sp. Atk do inimigo.' },
  'draining-kiss': { name: 'Draining Kiss', type: 'fairy', category: 'Special', power: 50, acc: 100, desc: 'Drena 75% do dano causado como HP.' },

  // NORMAL & UTILIDADE
  'body-slam':     { name: 'Body Slam', type: 'normal', category: 'Physical', power: 85, acc: 100, desc: 'Clássico ataque físico com 30% de chance de paralisar o alvo.' },
  'return':        { name: 'Return / Double-Edge', type: 'normal', category: 'Physical', power: 102, acc: 100, desc: 'Ataque físico Normal de 102 de poder (converte em Fada/Voador com Pixilate/Aerilate!).' },
  'extreme-speed': { name: 'Extreme Speed', type: 'normal', category: 'Physical', power: 80, acc: 100, desc: 'Velocidade Extrema: Prioridade +2 com 80 de poder base!' },
  'fake-out':      { name: 'Fake Out', type: 'normal', category: 'Physical', power: 40, acc: 100, desc: 'Prioridade +3 no primeiro turno que garante Flinch no oponente.' },
  'hyper-voice':   { name: 'Hyper Voice', type: 'normal', category: 'Special', power: 90, acc: 100, desc: 'Onda sonora que atravessa Substitute (vira Fada com Pixilate!).' },
  'facade':        { name: 'Facade', type: 'normal', category: 'Physical', power: 70, acc: 100, desc: 'Dobra para 140 de poder se o usuário estiver queimado/envenenado (letal com Guts!).' },
  'swords-dance':  { name: 'Swords Dance', type: 'normal', category: 'Status', power: 0, acc: 100, desc: 'Dobra o Ataque Físico (+2 níveis) em um único turno.' },
  'recover':       { name: 'Recover / Soft-Boiled', type: 'normal', category: 'Status', power: 0, acc: 100, desc: 'Recupera instantaneamente 50% do HP máximo.' },
  'shell-smash':   { name: 'Shell Smash', type: 'normal', category: 'Status', power: 0, acc: 100, desc: 'Aumenta Attack, Sp. Atk e Speed em +2 níveis de uma só vez!' },
  'protect':       { name: 'Protect / King\'s Shield', type: 'normal', category: 'Status', power: 0, acc: 100, desc: 'Bloqueia ataques no turno e garante recuperação de Leftovers / Speed Boost.' },
  'ice-fang':      { name: 'Ice Fang', type: 'ice', category: 'Physical', power: 65, acc: 95, desc: 'Presa de Gelo física com chance de Freeze e Flinch (cobre Dragão e Voador).' },
  'ice-spinner':   { name: 'Ice Spinner', type: 'ice', category: 'Physical', power: 80, acc: 100, desc: 'Ataque físico de Gelo 100% preciso que também remove Terrenos do campo.' },
  'bounce':        { name: 'Bounce', type: 'flying', category: 'Physical', power: 85, acc: 85, desc: 'Ataque físico Voador (base para Max Airstream no Dynamax de Gyarados).' },
  'quick-attack':  { name: 'Quick Attack', type: 'normal', category: 'Physical', power: 40, acc: 100, desc: 'Ataque físico com Prioridade +1.' },
  'heat-wave':     { name: 'Heat Wave', type: 'fire', category: 'Special', power: 95, acc: 90, desc: 'Onda de calor Especial de Fogo que cobre Aço e Gelo.' },
  'spirit-shackle':{ name: 'Spirit Shackle', type: 'ghost', category: 'Physical', power: 80, acc: 100, desc: 'Assinatura de Decidueye: causa dano Fantasma e impede o alvo de fugir/trocar.' }
};
