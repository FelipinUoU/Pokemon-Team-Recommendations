// ============================================================================
// BANCO DE DADOS DE POKÉMON (GEN 1 A GEN 9 + FORMAS MEGA/REGIONAIS + UNBOUND/LAZARUS)
// ============================================================================

window.POKE_DATA = window.POKE_DATA || {};

window.POKE_DATA.POKEMON = [
  // ==================== GERAÇÃO 1 (KANTO) ====================
  {
    id: 'venusaur', dex: 3, name: 'Venusaur', gen: 1, isStarter: true, starterRef: 'bulbasaur',
    types: ['grass', 'poison'], role: 'Bulky Special / Tank',
    stats: { hp: 80, atk: 82, def: 83, spa: 100, spd: 100, spe: 80 },
    abilities: ['Overgrow', 'Chlorophyll'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['giga-drain', 'sludge-bomb', 'earth-power', 'leech-seed', 'energy-ball', 'toxic', 'protect'],
    bestItems: ['black-sludge', 'leftovers', 'miracle-seed', 'life-orb'],
    bestTera: 'fire',
    mega: {
      name: 'Mega Venusaur', stone: 'venusaurite', spriteId: 10033,
      types: ['grass', 'poison'], ability: 'Thick Fat',
      stats: { hp: 80, atk: 100, def: 123, spa: 122, spd: 120, spe: 80 },
      note: 'Thick Fat elimina as fraquezas a Fogo e Gelo, deixando apenas Voador e Psíquico!'
    }
  },
  {
    id: 'charizard', dex: 6, name: 'Charizard', gen: 1, isStarter: true, starterRef: 'charmander',
    types: ['fire', 'flying'], role: 'Special Sweeper / Wallbreaker',
    stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
    abilities: ['Blaze', 'Solar Power'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'air-slash', 'dragon-pulse', 'roost', 'fire-blast', 'focus-blast', 'flare-blitz', 'dragon-dance', 'earthquake'],
    bestItems: ['heavy-duty-boots', 'charcoal', 'life-orb', 'choice-specs'],
    bestTera: 'fire',
    hasGmax: true,
    mega: {
      name: 'Mega Charizard Y', stone: 'charizardite-y', spriteId: 10035,
      types: ['fire', 'flying'], ability: 'Drought',
      stats: { hp: 78, atk: 104, def: 78, spa: 159, spd: 115, spe: 100 },
      note: 'Ativa Sol (Drought) automaticamente, aumentando ataques de Fogo em +50% e cortando Água pela metade!'
    },
    megaAlt: {
      name: 'Mega Charizard X', stone: 'charizardite-x', spriteId: 10034,
      types: ['fire', 'dragon'], ability: 'Tough Claws',
      stats: { hp: 78, atk: 130, def: 111, spa: 130, spd: 85, spe: 100 },
      bestMoves: ['flare-blitz', 'dragon-claw', 'dragon-dance', 'earthquake'],
      note: 'Muda para Fogo/Dragão com Tough Claws (+30% em contato), perdendo a fraqueza 4x a Pedra!'
    }
  },
  {
    id: 'blastoise', dex: 9, name: 'Blastoise', gen: 1, isStarter: true, starterRef: 'squirtle',
    types: ['water'], role: 'Bulky Sweeper / Tank',
    stats: { hp: 79, atk: 83, def: 100, spa: 85, spd: 105, spe: 78 },
    abilities: ['Torrent', 'Rain Dish'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['surf', 'ice-beam', 'dark-pulse', 'shell-smash', 'aura-sphere', 'hydro-pump', 'flash-cannon'],
    bestItems: ['leftovers', 'mystic-water', 'life-orb', 'sitrus-berry'],
    bestTera: 'water',
    hasGmax: true,
    mega: {
      name: 'Mega Blastoise', stone: 'blastoisinite', spriteId: 10036,
      types: ['water'], ability: 'Mega Launcher',
      stats: { hp: 79, atk: 103, def: 120, spa: 135, spd: 115, spe: 78 },
      note: 'Mega Launcher aumenta o poder de Dark Pulse e Aura Sphere em 50%!'
    }
  },
  {
    id: 'pikachu', dex: 25, name: 'Pikachu (Partner / Light Ball)', gen: 1, isStarter: true, starterRef: 'pikachu',
    types: ['electric'], role: 'Glass Cannon / Mixed Attacker',
    stats: { hp: 65, atk: 80, def: 50, spa: 75, spd: 60, spe: 120 },
    abilities: ['Static', 'Lightning Rod'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['thunderbolt', 'surf', 'volt-switch', 'play-rough', 'thunder-wave', 'brick-break'],
    bestItems: ['light-ball', 'magnet', 'focus-sash'],
    bestTera: 'water',
    hasGmax: true
  },
  {
    id: 'raichu-alola', dex: 26, spriteId: 10100, name: 'Raichu de Alola', gen: 7,
    types: ['electric', 'psychic'], role: 'Fast Special Sweeper',
    stats: { hp: 60, atk: 85, def: 50, spa: 95, spd: 85, spe: 110 },
    abilities: ['Surge Surfer'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['thunderbolt', 'psychic', 'surf', 'nasty-plot', 'volt-switch', 'focus-blast'],
    bestItems: ['life-orb', 'magnet', 'focus-sash', 'twisted-spoon'],
    bestTera: 'electric'
  },
  {
    id: 'nidoking', dex: 34, name: 'Nidoking', gen: 1,
    types: ['poison', 'ground'], role: 'Sheer Force Wallbreaker',
    stats: { hp: 81, atk: 102, def: 77, spa: 85, spd: 75, spe: 85 },
    abilities: ['Sheer Force', 'Poison Point'], bestNature: 'Timid (+Spe, -Atk) / Adamant',
    bestMoves: ['earth-power', 'sludge-wave', 'ice-beam', 'thunderbolt', 'flamethrower', 'earthquake', 'poison-jab', 'megahorn'],
    bestItems: ['life-orb', 'soft-sand', 'expert-belt'],
    bestTera: 'ground'
  },
  {
    id: 'clefable', dex: 36, name: 'Clefable', gen: 1,
    types: ['fairy'], gen1To5Types: ['normal'], role: 'Utility Tank / Calm Mind',
    stats: { hp: 95, atk: 70, def: 73, spa: 95, spd: 90, spe: 60 },
    abilities: ['Magic Guard', 'Unaware'], bestNature: 'Bold (+Def, -Atk)',
    bestMoves: ['moonblast', 'flamethrower', 'calm-mind', 'recover', 'thunderbolt', 'ice-beam', 'stealth-rock'],
    bestItems: ['leftovers', 'life-orb', 'rocky-helmet'],
    bestTera: 'steel'
  },
  {
    id: 'ninetales-alola', dex: 38, spriteId: 10104, name: 'Ninetales de Alola', gen: 7,
    types: ['ice', 'fairy'], role: 'Aurora Veil Support / Fast Special',
    stats: { hp: 73, atk: 67, def: 75, spa: 81, spd: 100, spe: 109 },
    abilities: ['Snow Warning'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['blizzard', 'moonblast', 'freeze-dry', 'aurora-veil', 'nasty-plot', 'dark-pulse'],
    bestItems: ['light-clay', 'never-melt-ice', 'focus-sash'],
    bestTera: 'water'
  },
  {
    id: 'arcanine', dex: 59, name: 'Arcanine', gen: 1,
    types: ['fire'], role: 'Intimidate Pivot / Physical Attacker',
    stats: { hp: 90, atk: 110, def: 80, spa: 100, spd: 80, spe: 95 },
    abilities: ['Intimidate', 'Flash Fire'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['flare-blitz', 'extreme-speed', 'wild-charge', 'close-combat', 'crunch', 'flamethrower', 'will-o-wisp'],
    bestItems: ['heavy-duty-boots', 'leftovers', 'charcoal', 'life-orb'],
    bestTera: 'normal'
  },
  {
    id: 'arcanine-hisui', dex: 59, spriteId: 10230, name: 'Arcanine de Hisui', gen: 8,
    types: ['fire', 'rock'], role: 'Rock Head Wallbreaker',
    stats: { hp: 95, atk: 115, def: 80, spa: 95, spd: 80, spe: 90 },
    abilities: ['Rock Head', 'Intimidate'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['flare-blitz', 'stone-edge', 'extreme-speed', 'close-combat', 'wild-charge'],
    bestItems: ['choice-band', 'life-orb', 'heavy-duty-boots'],
    bestTera: 'normal'
  },
  {
    id: 'alakazam', dex: 65, name: 'Alakazam', gen: 1,
    types: ['psychic'], role: 'Hyper Special Sweeper',
    stats: { hp: 55, atk: 50, def: 45, spa: 135, spd: 95, spe: 120 },
    abilities: ['Magic Guard', 'Synchronize'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['psychic', 'shadow-ball', 'focus-blast', 'dazzling-gleam', 'energy-ball', 'calm-mind', 'recover'],
    bestItems: ['focus-sash', 'life-orb', 'twisted-spoon', 'choice-specs'],
    bestTera: 'psychic',
    mega: {
      name: 'Mega Alakazam', stone: 'alakazite', spriteId: 10037,
      types: ['psychic'], ability: 'Trace',
      stats: { hp: 55, atk: 50, def: 65, spa: 175, spd: 105, spe: 150 },
      note: '175 de Ataque Especial e 150 de Velocidade: supera praticamente qualquer oponente!'
    }
  },
  {
    id: 'gengar', dex: 94, name: 'Gengar', gen: 1,
    types: ['ghost', 'poison'], role: 'Fast Special Sweeper',
    stats: { hp: 60, atk: 65, def: 60, spa: 130, spd: 75, spe: 110 },
    abilities: ['Cursed Body', 'Levitate (Gen 3-6)'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['shadow-ball', 'sludge-bomb', 'focus-blast', 'nasty-plot', 'thunderbolt', 'dazzling-gleam', 'will-o-wisp', 'hex'],
    bestItems: ['focus-sash', 'life-orb', 'choice-specs', 'black-sludge', 'spell-tag'],
    bestTera: 'ghost',
    hasGmax: true,
    mega: {
      name: 'Mega Gengar', stone: 'gengarite', spriteId: 10038,
      types: ['ghost', 'poison'], ability: 'Shadow Tag',
      stats: { hp: 60, atk: 65, def: 80, spa: 170, spd: 95, spe: 130 },
      note: 'Shadow Tag impede que o oponente troque de Pokémon enquanto você usa Nasty Plot / ataques de 170 Sp. Atk!'
    }
  },
  {
    id: 'starmie', dex: 121, name: 'Starmie', gen: 1,
    types: ['water', 'psychic'], role: 'Fast Special Coverage Sweeper',
    stats: { hp: 60, atk: 75, def: 85, spa: 100, spd: 85, spe: 115 },
    abilities: ['Natural Cure', 'Analytic'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['surf', 'psychic', 'ice-beam', 'thunderbolt', 'recover', 'hydro-pump', 'psyshock'],
    bestItems: ['life-orb', 'expert-belt', 'mystic-water', 'leftovers'],
    bestTera: 'water'
  },
  {
    id: 'gyarados', dex: 130, name: 'Gyarados', gen: 1,
    types: ['water', 'flying'], role: 'Dragon Dance Sweeper / Intimidate',
    stats: { hp: 95, atk: 125, def: 79, spa: 60, spd: 100, spe: 81 },
    abilities: ['Intimidate', 'Moxie'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['waterfall', 'earthquake', 'ice-fang', 'dragon-dance', 'crunch', 'stone-edge', 'bounce'],
    bestItems: ['leftovers', 'heavy-duty-boots', 'lum-berry', 'life-orb'],
    bestTera: 'ground',
    mega: {
      name: 'Mega Gyarados', stone: 'gyaradosite', spriteId: 10041,
      types: ['water', 'dark'], ability: 'Mold Breaker',
      stats: { hp: 95, atk: 155, def: 109, spa: 70, spd: 130, spe: 81 },
      note: 'Muda para Água/Sombrio (ganha STAB em Crunch e perde fraqueza 4x a Elétrico) com Mold Breaker!'
    }
  },
  {
    id: 'lapras', dex: 131, name: 'Lapras', gen: 1,
    types: ['water', 'ice'], role: 'Bulky Special Tank',
    stats: { hp: 130, atk: 85, def: 80, spa: 85, spd: 95, spe: 60 },
    abilities: ['Water Absorb', 'Shell Armor'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['surf', 'ice-beam', 'freeze-dry', 'thunderbolt', 'psychic', 'ice-shard'],
    bestItems: ['leftovers', 'assault-vest', 'mystic-water', 'never-melt-ice'],
    bestTera: 'water',
    hasGmax: true
  },
  {
    id: 'eevee', dex: 133, name: 'Eevee (Partner)', gen: 1, isStarter: true, starterRef: 'eevee',
    types: ['normal'], role: 'Versatile Adaptability Attacker',
    stats: { hp: 65, atk: 75, def: 70, spa: 65, spd: 85, spe: 75 },
    abilities: ['Adaptability'], bestNature: 'Jolly / Timid',
    bestMoves: ['return', 'shadow-ball', 'quick-attack', 'protect'],
    bestItems: ['sitrus-berry', 'leftovers'],
    bestTera: 'normal'
  },
  {
    id: 'jolteon', dex: 135, name: 'Jolteon', gen: 1,
    types: ['electric'], role: 'Speed Control / Volt Switch Pivot',
    stats: { hp: 65, atk: 65, def: 60, spa: 110, spd: 95, spe: 130 },
    abilities: ['Volt Absorb'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['thunderbolt', 'volt-switch', 'shadow-ball', 'calm-mind', 'thunder-wave'],
    bestItems: ['magnet', 'choice-specs', 'life-orb', 'heavy-duty-boots'],
    bestTera: 'ice'
  },
  {
    id: 'aerodactyl', dex: 142, name: 'Aerodactyl', gen: 1,
    types: ['rock', 'flying'], role: 'Fast Physical Attacker / Lead',
    stats: { hp: 80, atk: 105, def: 65, spa: 60, spd: 75, spe: 130 },
    abilities: ['Rock Head', 'Unnerve'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['rock-slide', 'earthquake', 'dual-wingbeat', 'crunch', 'stone-edge', 'stealth-rock', 'ice-fang'],
    bestItems: ['focus-sash', 'life-orb', 'hard-stone'],
    bestTera: 'rock',
    mega: {
      name: 'Mega Aerodactyl', stone: 'aerodactylite', spriteId: 10042,
      types: ['rock', 'flying'], ability: 'Tough Claws',
      stats: { hp: 80, atk: 135, def: 85, spa: 70, spd: 95, spe: 150 },
      note: 'Tough Claws aumenta ataques de contato em 30% com 150 de Velocidade!'
    }
  },
  {
    id: 'snorlax', dex: 143, name: 'Snorlax', gen: 1,
    types: ['normal'], role: 'Special Wall / Physical Tank',
    stats: { hp: 160, atk: 110, def: 65, spa: 65, spd: 110, spe: 30 },
    abilities: ['Thick Fat', 'Immunity'], bestNature: 'Adamant (+Atk, -SpA) / Careful',
    bestMoves: ['body-slam', 'earthquake', 'crunch', 'fire-punch', 'ice-punch', 'brick-break', 'recover'],
    bestItems: ['leftovers', 'sitrus-berry', 'assault-vest'],
    bestTera: 'ghost',
    hasGmax: true
  },
  {
    id: 'zapdos', dex: 145, name: 'Zapdos', gen: 1,
    types: ['electric', 'flying'], role: 'Defensive Pivot / Special Attacker',
    stats: { hp: 90, atk: 90, def: 85, spa: 125, spd: 90, spe: 100 },
    abilities: ['Static', 'Pressure'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['thunderbolt', 'hurricane', 'volt-switch', 'roost', 'heat-wave', 'discharge'],
    bestItems: ['heavy-duty-boots', 'leftovers', 'magnet'],
    bestTera: 'steel'
  },
  {
    id: 'dragonite', dex: 149, name: 'Dragonite', gen: 1,
    types: ['dragon', 'flying'], role: 'Multiscale Dragon Dance Sweeper',
    stats: { hp: 91, atk: 134, def: 95, spa: 100, spd: 100, spe: 80 },
    abilities: ['Multiscale', 'Inner Focus'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['extreme-speed', 'earthquake', 'dragon-dance', 'dragon-claw', 'fire-punch', 'ice-punch', 'outrage', 'roost'],
    bestItems: ['heavy-duty-boots', 'weakness-policy', 'lum-berry', 'leftovers'],
    bestTera: 'normal'
  },

  // ==================== GERAÇÃO 2 (JOHTO) ====================
  {
    id: 'meganium', dex: 154, name: 'Meganium', gen: 2, isStarter: true, starterRef: 'chikorita',
    types: ['grass'], role: 'Dual Screens / Bulky Support',
    stats: { hp: 80, atk: 82, def: 100, spa: 83, spd: 100, spe: 80 },
    abilities: ['Overgrow', 'Leaf Guard'], bestNature: 'Bold / Calm',
    bestMoves: ['giga-drain', 'dazzling-gleam', 'leech-seed', 'earth-power', 'energy-ball', 'body-slam'],
    bestItems: ['leftovers', 'light-clay', 'miracle-seed'],
    bestTera: 'fairy'
  },
  {
    id: 'typhlosion', dex: 157, name: 'Typhlosion', gen: 2, isStarter: true, starterRef: 'cyndaquil',
    types: ['fire'], role: 'Fast Special Fire Sweeper',
    stats: { hp: 78, atk: 84, def: 78, spa: 109, spd: 85, spe: 100 },
    abilities: ['Blaze', 'Flash Fire'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'fire-blast', 'earth-power', 'shadow-ball', 'focus-blast', 'thunder-punch'],
    bestItems: ['charcoal', 'choice-specs', 'heavy-duty-boots', 'life-orb'],
    bestTera: 'fire'
  },
  {
    id: 'typhlosion-hisui', dex: 157, spriteId: 10233, name: 'Typhlosion de Hisui', gen: 8, isStarter: true, starterRef: 'cyndaquil',
    types: ['fire', 'ghost'], role: 'Special Ghost/Fire Wallbreaker',
    stats: { hp: 73, atk: 84, def: 78, spa: 119, spd: 85, spe: 95 },
    abilities: ['Frisk', 'Blaze'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'shadow-ball', 'will-o-wisp', 'hex', 'focus-blast', 'calm-mind'],
    bestItems: ['heavy-duty-boots', 'choice-specs', 'spell-tag', 'charcoal'],
    bestTera: 'fire'
  },
  {
    id: 'feraligatr', dex: 160, name: 'Feraligatr', gen: 2, isStarter: true, starterRef: 'totodile',
    types: ['water'], role: 'Sheer Force Dragon Dance Sweeper',
    stats: { hp: 85, atk: 105, def: 100, spa: 79, spd: 83, spe: 78 },
    abilities: ['Sheer Force', 'Torrent'], bestNature: 'Adamant / Jolly',
    bestMoves: ['liquidation', 'ice-punch', 'crunch', 'dragon-dance', 'waterfall', 'earthquake', 'aqua-jet'],
    bestItems: ['life-orb', 'mystic-water', 'lum-berry', 'leftovers'],
    bestTera: 'water'
  },
  {
    id: 'crobat', dex: 169, name: 'Crobat', gen: 2,
    types: ['poison', 'flying'], role: 'Ultra-Fast Pivot & Disruptor',
    stats: { hp: 85, atk: 90, def: 80, spa: 70, spd: 80, spe: 130 },
    abilities: ['Inner Focus', 'Infiltrator'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['brave-bird', 'poison-jab', 'u-turn', 'roost', 'acrobatics', 'leech-life'],
    bestItems: ['heavy-duty-boots', 'black-sludge', 'sharp-beak'],
    bestTera: 'flying'
  },
  {
    id: 'ampharos', dex: 181, name: 'Ampharos', gen: 2,
    types: ['electric'], role: 'Bulky Special Attacker',
    stats: { hp: 90, atk: 75, def: 85, spa: 115, spd: 90, spe: 55 },
    abilities: ['Static'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['thunderbolt', 'dragon-pulse', 'power-gem', 'volt-switch', 'focus-blast', 'thunder-wave'],
    bestItems: ['leftovers', 'magnet', 'assault-vest'],
    bestTera: 'dragon',
    mega: {
      name: 'Mega Ampharos', stone: 'ampharosite', spriteId: 10045,
      types: ['electric', 'dragon'], ability: 'Mold Breaker',
      stats: { hp: 90, atk: 95, def: 105, spa: 165, spd: 110, spe: 45 },
      note: 'Ganha o tipo Dragão e 165 de Sp. Atk com Mold Breaker!'
    }
  },
  {
    id: 'azumarill', dex: 184, name: 'Azumarill', gen: 2,
    types: ['water', 'fairy'], gen1To5Types: ['water'], role: 'Huge Power Wallbreaker',
    stats: { hp: 100, atk: 50, def: 80, spa: 60, spd: 80, spe: 50 },
    abilities: ['Huge Power'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['liquidation', 'play-rough', 'aqua-jet', 'superpower', 'ice-punch', 'waterfall'],
    bestItems: ['sitrus-berry', 'assault-vest', 'choice-band', 'mystic-water'],
    bestTera: 'water'
  },
  {
    id: 'espeon', dex: 196, name: 'Espeon', gen: 2,
    types: ['psychic'], role: 'Magic Bounce Special Sweeper',
    stats: { hp: 65, atk: 65, def: 60, spa: 130, spd: 95, spe: 110 },
    abilities: ['Magic Bounce', 'Synchronize'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['psychic', 'shadow-ball', 'dazzling-gleam', 'calm-mind', 'psyshock'],
    bestItems: ['twisted-spoon', 'life-orb', 'leftovers', 'choice-specs'],
    bestTera: 'fairy'
  },
  {
    id: 'umbreon', dex: 197, name: 'Umbreon', gen: 2,
    types: ['dark'], role: 'Supreme Mixed Wall / Cleric',
    stats: { hp: 95, atk: 65, def: 110, spa: 60, spd: 130, spe: 65 },
    abilities: ['Synchronize', 'Inner Focus'], bestNature: 'Calm / Careful',
    bestMoves: ['dark-pulse', 'toxic', 'recover', 'protect', 'crunch'],
    bestItems: ['leftovers', 'rocky-helmet'],
    bestTera: 'poison'
  },
  {
    id: 'scizor', dex: 212, name: 'Scizor', gen: 2,
    types: ['bug', 'steel'], role: 'Technician Priority Pivot',
    stats: { hp: 70, atk: 130, def: 100, spa: 55, spd: 80, spe: 65 },
    abilities: ['Technician', 'Swarm'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['bullet-punch', 'u-turn', 'swords-dance', 'close-combat', 'knock-off', 'dual-wingbeat', 'x-scissor'],
    bestItems: ['life-orb', 'choice-band', 'metal-coat', 'leftovers', 'heavy-duty-boots'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Scizor', stone: 'scizorite', spriteId: 10046,
      types: ['bug', 'steel'], ability: 'Technician',
      stats: { hp: 70, atk: 150, def: 140, spa: 65, spd: 100, spe: 75 },
      note: 'Apenas 1 fraqueza (Fogo), 140 Defense e Bullet Punch fortalecido por Technician!'
    }
  },
  {
    id: 'heracross', dex: 214, name: 'Heracross', gen: 2,
    types: ['bug', 'fighting'], role: 'Guts / Moxie Physical Breaker',
    stats: { hp: 80, atk: 125, def: 75, spa: 40, spd: 95, spe: 85 },
    abilities: ['Guts', 'Moxie', 'Swarm'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['close-combat', 'megahorn', 'facade', 'knock-off', 'stone-edge', 'earthquake', 'swords-dance'],
    bestItems: ['flame-orb', 'choice-scarf', 'life-orb', 'black-belt'],
    bestTera: 'normal',
    mega: {
      name: 'Mega Heracross', stone: 'heracronite', spriteId: 10047,
      types: ['bug', 'fighting'], ability: 'Skill Link',
      stats: { hp: 80, atk: 185, def: 115, spa: 40, spd: 105, spe: 75 },
      note: '185 de Attack base com Skill Link (garante 5 acertos em ataques multi-hit)!'
    }
  },
  {
    id: 'houndoom', dex: 229, name: 'Houndoom', gen: 2,
    types: ['dark', 'fire'], role: 'Nasty Plot Special Sweeper',
    stats: { hp: 75, atk: 90, def: 50, spa: 110, spd: 80, spe: 95 },
    abilities: ['Flash Fire', 'Early Bird'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'dark-pulse', 'sludge-bomb', 'nasty-plot', 'fire-blast'],
    bestItems: ['life-orb', 'black-glasses', 'charcoal', 'heavy-duty-boots'],
    bestTera: 'dark',
    mega: {
      name: 'Mega Houndoom', stone: 'houndoominite', spriteId: 10048,
      types: ['dark', 'fire'], ability: 'Solar Power',
      stats: { hp: 75, atk: 90, def: 90, spa: 140, spd: 90, spe: 115 },
      note: '115 Speed e 140 Sp. Atk!'
    }
  },
  {
    id: 'kingdra', dex: 230, name: 'Kingdra', gen: 2,
    types: ['water', 'dragon'], role: 'Swift Swim / Sniper Special Attacker',
    stats: { hp: 75, atk: 95, def: 95, spa: 95, spd: 95, spe: 85 },
    abilities: ['Swift Swim', 'Sniper'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['surf', 'draco-meteor', 'ice-beam', 'hydro-pump', 'dragon-pulse', 'flip-turn'],
    bestItems: ['life-orb', 'choice-specs', 'mystic-water'],
    bestTera: 'water'
  },
  {
    id: 'tyranitar', dex: 248, name: 'Tyranitar', gen: 2, isStarter: true, starterRef: 'larvitar',
    types: ['rock', 'dark'], role: 'Sand Stream Pseudo-Legendary Tank',
    stats: { hp: 100, atk: 134, def: 110, spa: 95, spd: 100, spe: 61 },
    abilities: ['Sand Stream'], bestNature: 'Adamant / Careful',
    bestMoves: ['stone-edge', 'crunch', 'earthquake', 'dragon-dance', 'ice-punch', 'fire-punch', 'stealth-rock', 'rock-slide'],
    bestItems: ['leftovers', 'assault-vest', 'weakness-policy', 'choice-band'],
    bestTera: 'flying',
    mega: {
      name: 'Mega Tyranitar', stone: 'tyranitarite', spriteId: 10049,
      types: ['rock', 'dark'], ability: 'Sand Stream',
      stats: { hp: 100, atk: 164, def: 150, spa: 95, spd: 120, spe: 71 },
      note: 'Inicial de Pokémon Unbound! 700 BST com 164 Attack, 150 Defense e +50% Sp. Def sob Sandstorm!'
    }
  },

  // ==================== GERAÇÃO 3 (HOENN) ====================
  {
    id: 'sceptile', dex: 254, name: 'Sceptile', gen: 3, isStarter: true, starterRef: 'treecko',
    types: ['grass'], role: 'Fast Special / Mixed Grass Sweeper',
    stats: { hp: 70, atk: 85, def: 65, spa: 105, spd: 85, spe: 120 },
    abilities: ['Overgrow', 'Unburden'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['energy-ball', 'dragon-pulse', 'focus-blast', 'giga-drain', 'leaf-blade', 'leaf-storm', 'earthquake'],
    bestItems: ['miracle-seed', 'life-orb', 'sitrus-berry', 'focus-sash'],
    bestTera: 'dragon',
    mega: {
      name: 'Mega Sceptile', stone: 'sceptilite', spriteId: 10065,
      types: ['grass', 'dragon'], ability: 'Lightning Rod',
      stats: { hp: 70, atk: 110, def: 75, spa: 145, spd: 85, spe: 145 },
      note: 'Vira Planta/Dragão com 145 Sp. Atk, 145 Speed e imune a Elétrico (Lightning Rod)!'
    }
  },
  {
    id: 'blaziken', dex: 257, name: 'Blaziken', gen: 3, isStarter: true, starterRef: 'torchic',
    types: ['fire', 'fighting'], role: 'Speed Boost Hyper Sweeper',
    stats: { hp: 80, atk: 120, def: 70, spa: 110, spd: 70, spe: 80 },
    abilities: ['Speed Boost', 'Blaze'], bestNature: 'Adamant / Jolly',
    bestMoves: ['flare-blitz', 'close-combat', 'swords-dance', 'protect', 'thunder-punch', 'stone-edge', 'brave-bird'],
    bestItems: ['life-orb', 'leftovers', 'focus-sash', 'charcoal'],
    bestTera: 'fire',
    mega: {
      name: 'Mega Blaziken', stone: 'blazikenite', spriteId: 10050,
      types: ['fire', 'fighting'], ability: 'Speed Boost',
      stats: { hp: 80, atk: 160, def: 80, spa: 130, spd: 80, spe: 100 },
      note: '160 de Attack + Speed Boost (+1 Speed todo turno). Um dos Mega Pokémon mais fortes já criados!'
    }
  },
  {
    id: 'swampert', dex: 260, name: 'Swampert', gen: 3, isStarter: true, starterRef: 'mudkip',
    types: ['water', 'ground'], role: 'Elite Bulky Pivot / Tank',
    stats: { hp: 100, atk: 110, def: 90, spa: 85, spd: 90, spe: 60 },
    abilities: ['Torrent', 'Damp'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['earthquake', 'waterfall', 'ice-punch', 'stealth-rock', 'flip-turn', 'liquidation', 'stone-edge', 'surf'],
    bestItems: ['leftovers', 'sitrus-berry', 'assault-vest', 'soft-sand'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Swampert', stone: 'swampertite', spriteId: 10064,
      types: ['water', 'ground'], ability: 'Swift Swim',
      stats: { hp: 100, atk: 150, def: 110, spa: 95, spd: 110, spe: 70 },
      note: 'Apenas 1 fraqueza (Planta), imune a Elétrico, 150 Attack e dobra a Velocidade na chuva!'
    }
  },
  {
    id: 'gardevoir', dex: 282, name: 'Gardevoir', gen: 3, isStarter: true, starterRef: 'ralts',
    types: ['psychic', 'fairy'], gen1To5Types: ['psychic'], role: 'Special Fairy/Psychic Sweeper',
    stats: { hp: 68, atk: 65, def: 65, spa: 125, spd: 115, spe: 80 },
    abilities: ['Trace', 'Synchronize'], bestNature: 'Timid / Modest',
    bestMoves: ['moonblast', 'psychic', 'mystical-fire', 'calm-mind', 'shadow-ball', 'thunderbolt', 'focus-blast', 'hyper-voice'],
    bestItems: ['choice-scarf', 'life-orb', 'leftovers', 'twisted-spoon'],
    bestTera: 'fairy',
    mega: {
      name: 'Mega Gardevoir', stone: 'gardevoirite', spriteId: 10051,
      types: ['psychic', 'fairy'], ability: 'Pixilate',
      stats: { hp: 68, atk: 85, def: 65, spa: 165, spd: 135, spe: 100 },
      note: 'Pixilate transforma Hyper Voice em um ataque Fada de 108 de poder base que atravessa Substitute com 165 Sp. Atk!'
    }
  },
  {
    id: 'breloom', dex: 286, name: 'Breloom', gen: 3,
    types: ['grass', 'fighting'], role: 'Spore + Technician Attacker',
    stats: { hp: 60, atk: 130, def: 80, spa: 60, spd: 60, spe: 70 },
    abilities: ['Technician', 'Poison Heal'], bestNature: 'Jolly / Adamant',
    bestMoves: ['spore', 'mach-punch', 'Bullet-seed', 'close-combat', 'seed-bomb', 'rock-slide', 'swords-dance'],
    bestItems: ['focus-sash', 'toxic-orb', 'loaded-dice', 'life-orb'],
    bestTera: 'fighting'
  },
  {
    id: 'mawile', dex: 303, name: 'Mawile', gen: 3,
    types: ['steel', 'fairy'], gen1To5Types: ['steel'], role: 'Defensive Typing / Mega Breaker',
    stats: { hp: 50, atk: 85, def: 85, spa: 55, spd: 55, spe: 50 },
    abilities: ['Intimidate'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['play-rough', 'iron-head', 'sucker-punch', 'swords-dance', 'fire-fang'],
    bestItems: ['mawilite', 'leftovers', 'life-orb'],
    bestTera: 'fairy',
    mega: {
      name: 'Mega Mawile', stone: 'mawilite', spriteId: 10052,
      types: ['steel', 'fairy'], ability: 'Huge Power',
      stats: { hp: 50, atk: 105, def: 125, spa: 55, spd: 95, spe: 50 },
      note: 'Metálico/Fada (a melhor combinação defensiva do jogo, 9 resistências e 2 imunidades) + Huge Power (maior ataque efetivo do jogo)!'
    }
  },
  {
    id: 'aggron', dex: 306, name: 'Aggron', gen: 3,
    types: ['steel', 'rock'], role: 'Physical Wall / Rock Head',
    stats: { hp: 70, atk: 110, def: 180, spa: 60, spd: 60, spe: 50 },
    abilities: ['Rock Head', 'Sturdy'], bestNature: 'Impish / Adamant',
    bestMoves: ['iron-head', 'stone-edge', 'earthquake', 'body-press', 'stealth-rock'],
    bestItems: ['leftovers', 'rocky-helmet', 'assault-vest'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Aggron', stone: 'aggronite', spriteId: 10053,
      types: ['steel'], ability: 'Filter',
      stats: { hp: 70, atk: 140, def: 230, spa: 60, spd: 80, spe: 50 },
      note: 'Perde o tipo Pedra e vira Metálico puro com 230 Defense + Filter (reduz golpes super efetivos em 25%)!'
    }
  },
  {
    id: 'manectric', dex: 310, name: 'Manectric', gen: 3,
    types: ['electric'], role: 'Fast Electric Pivot',
    stats: { hp: 70, atk: 75, def: 60, spa: 105, spd: 60, spe: 105 },
    abilities: ['Lightning Rod', 'Static'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['thunderbolt', 'flamethrower', 'volt-switch', 'overheat', 'discharge'],
    bestItems: ['magnet', 'life-orb', 'choice-specs'],
    bestTera: 'ice',
    mega: {
      name: 'Mega Manectric', stone: 'manectite', spriteId: 10055,
      types: ['electric'], ability: 'Intimidate',
      stats: { hp: 70, atk: 75, def: 80, spa: 135, spd: 80, spe: 135 },
      note: '135 Speed, 135 Sp. Atk, Intimidate e Flamethrower nativo para destruir Planta/Aço!'
    }
  },
  {
    id: 'flygon', dex: 330, name: 'Flygon', gen: 3,
    types: ['ground', 'dragon'], role: 'Levitate Dragon Dance / Pivot',
    stats: { hp: 80, atk: 100, def: 80, spa: 80, spd: 80, spe: 100 },
    abilities: ['Levitate'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['earthquake', 'dragon-claw', 'dragon-dance', 'u-turn', 'fire-punch', 'earth-power', 'roost'],
    bestItems: ['life-orb', 'soft-sand', 'choice-scarf', 'lum-berry'],
    bestTera: 'ground'
  },
  {
    id: 'altaria', dex: 334, name: 'Altaria', gen: 3,
    types: ['dragon', 'flying'], role: 'Defensive Support / Mega Sweeper',
    stats: { hp: 75, atk: 70, def: 90, spa: 70, spd: 105, spe: 80 },
    abilities: ['Natural Cure', 'Cloud Nine'], bestNature: 'Modest / Adamant',
    bestMoves: ['return', 'hyper-voice', 'roost', 'flamethrower', 'dragon-dance', 'earthquake', 'dragon-pulse'],
    bestItems: ['leftovers', 'heavy-duty-boots'],
    bestTera: 'fairy',
    mega: {
      name: 'Mega Altaria', stone: 'altarianite', spriteId: 10067,
      types: ['dragon', 'fairy'], ability: 'Pixilate',
      stats: { hp: 75, atk: 110, def: 110, spa: 110, spd: 105, spe: 80 },
      note: 'Único Pokémon Dragão/Fada! Imune a Dragão e ganha Pixilate para Return/Hyper Voice!'
    }
  },
  {
    id: 'milotic', dex: 350, name: 'Milotic', gen: 3,
    types: ['water'], role: 'Bulky Water Tank',
    stats: { hp: 95, atk: 60, def: 79, spa: 100, spd: 125, spe: 81 },
    abilities: ['Marvel Scale', 'Competitive'], bestNature: 'Bold (+Def, -Atk)',
    bestMoves: ['scald', 'ice-beam', 'recover', 'flip-turn', 'surf', 'toxic'],
    bestItems: ['leftovers', 'flame-orb', 'mystic-water'],
    bestTera: 'fairy'
  },
  {
    id: 'absol', dex: 359, name: 'Absol', gen: 3,
    types: ['dark'], role: 'Super Luck Critical Striker',
    stats: { hp: 65, atk: 130, def: 60, spa: 75, spd: 60, spe: 75 },
    abilities: ['Super Luck', 'Justified'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['knock-off', 'sucker-punch', 'swords-dance', 'play-rough', 'close-combat', 'psycho-cut', 'night-slash'],
    bestItems: ['life-orb', 'black-glasses', 'focus-sash'],
    bestTera: 'dark',
    mega: {
      name: 'Mega Absol', stone: 'absolite', spriteId: 10057,
      types: ['dark'], ability: 'Magic Bounce',
      stats: { hp: 65, atk: 150, def: 60, spa: 115, spd: 60, spe: 115 },
      note: '150 Attack, 115 Speed e Magic Bounce (reflete Stealth Rock e Status de volta ao oponente)!'
    }
  },
  {
    id: 'salamence', dex: 373, name: 'Salamence', gen: 3,
    types: ['dragon', 'flying'], role: 'Pseudo-Legendary Sweeper',
    stats: { hp: 95, atk: 135, def: 80, spa: 110, spd: 80, spe: 100 },
    abilities: ['Intimidate', 'Moxie'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['dragon-claw', 'earthquake', 'dragon-dance', 'dual-wingbeat', 'flamethrower', 'roost', 'return', 'outrage'],
    bestItems: ['heavy-duty-boots', 'lum-berry', 'life-orb'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Salamence', stone: 'salamencite', spriteId: 10089,
      types: ['dragon', 'flying'], ability: 'Aerilate',
      stats: { hp: 95, atk: 145, def: 130, spa: 120, spd: 90, spe: 120 },
      note: '700 BST com Aerilate (converte Return/Double-Edge em ataques Voadores devastadores) e 130 Defense!'
    }
  },
  {
    id: 'metagross', dex: 376, name: 'Metagross', gen: 3, isStarter: true, starterRef: 'beldum',
    types: ['steel', 'psychic'], role: 'Pseudo-Legendary Tank / Sweeper',
    stats: { hp: 80, atk: 135, def: 130, spa: 95, spd: 90, spe: 70 },
    abilities: ['Clear Body'], bestNature: 'Adamant / Jolly',
    bestMoves: ['meteor-mash', 'zen-headbutt', 'earthquake', 'bullet-punch', 'ice-punch', 'thunder-punch', 'agility'],
    bestItems: ['leftovers', 'weakness-policy', 'assault-vest', 'life-orb', 'metal-coat'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Metagross', stone: 'metagrossite', spriteId: 10076,
      types: ['steel', 'psychic'], ability: 'Tough Claws',
      stats: { hp: 80, atk: 145, def: 150, spa: 105, spd: 110, spe: 110 },
      note: 'O melhor inicial de Pokémon Unbound! Ganha +40 Speed (chegando a 110), 145 Attack, 150 Defense e Tough Claws!'
    }
  },
  {
    id: 'kyogre', dex: 382, name: 'Kyogre', gen: 3,
    types: ['water'], role: 'Rain Uber Special Titan',
    stats: { hp: 100, atk: 100, def: 90, spa: 150, spd: 140, spe: 90 },
    abilities: ['Drizzle'], bestNature: 'Modest / Timid',
    bestMoves: ['origin-pulse', 'surf', 'ice-beam', 'thunder', 'calm-mind'],
    bestItems: ['blue-orb', 'choice-scarf', 'leftovers', 'mystic-water'],
    bestTera: 'water',
    primal: {
      name: 'Primal Kyogre', stone: 'blue-orb', spriteId: 10077,
      types: ['water'], ability: 'Primordial Sea',
      stats: { hp: 100, atk: 150, def: 90, spa: 180, spd: 160, spe: 90 },
      note: 'Primordial Sea anula ataques de Fogo e eleva o Sp. Atk para 180!'
    }
  },
  {
    id: 'groudon', dex: 383, name: 'Groudon', gen: 3,
    types: ['ground'], role: 'Sun Uber Physical Titan',
    stats: { hp: 100, atk: 150, def: 140, spa: 100, spd: 90, spe: 90 },
    abilities: ['Drought'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['precipice-blades', 'earthquake', 'fire-punch', 'stone-edge', 'swords-dance', 'stealth-rock'],
    bestItems: ['red-orb', 'leftovers', 'soft-sand'],
    bestTera: 'fire',
    primal: {
      name: 'Primal Groudon', stone: 'red-orb', spriteId: 10078,
      types: ['ground', 'fire'], ability: 'Desolate Land',
      stats: { hp: 100, atk: 180, def: 160, spa: 150, spd: 90, spe: 90 },
      note: 'Vira Terrestre/Fogo com Desolate Land: IMUNE A ÁGUA e Elétrico com 180 Attack!'
    }
  },

  // ==================== GERAÇÃO 4 (SINNOH) ====================
  {
    id: 'torterra', dex: 389, name: 'Torterra', gen: 4, isStarter: true, starterRef: 'turtwig',
    types: ['grass', 'ground'], role: 'Physical Tank / Shell Smash',
    stats: { hp: 95, atk: 109, def: 105, spa: 75, spd: 85, spe: 56 },
    abilities: ['Overgrow', 'Shell Armor'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['earthquake', 'wood-hammer', 'stone-edge', 'shell-smash', 'seed-bomb', 'stealth-rock', 'leech-seed'],
    bestItems: ['leftovers', 'soft-sand', 'miracle-seed', 'loaded-dice'],
    bestTera: 'rock'
  },
  {
    id: 'infernape', dex: 392, name: 'Infernape', gen: 4, isStarter: true, starterRef: 'chimchar',
    types: ['fire', 'fighting'], role: 'Fast Mixed Wallbreaker',
    stats: { hp: 76, atk: 104, def: 71, spa: 104, spd: 71, spe: 108 },
    abilities: ['Blaze', 'Iron Fist'], bestNature: 'Jolly / Naive',
    bestMoves: ['close-combat', 'flare-blitz', 'mach-punch', 'thunder-punch', 'u-turn', 'swords-dance', 'flamethrower', 'nasty-plot'],
    bestItems: ['life-orb', 'focus-sash', 'expert-belt', 'charcoal'],
    bestTera: 'fire'
  },
  {
    id: 'empoleon', dex: 395, name: 'Empoleon', gen: 4, isStarter: true, starterRef: 'piplup',
    types: ['water', 'steel'], role: 'Defensive Steel/Water Tank',
    stats: { hp: 84, atk: 86, def: 88, spa: 111, spd: 101, spe: 60 },
    abilities: ['Torrent', 'Competitive'], bestNature: 'Modest / Calm',
    bestMoves: ['surf', 'flash-cannon', 'ice-beam', 'roost', 'stealth-rock', 'flip-turn', 'hydro-pump'],
    bestItems: ['leftovers', 'mystic-water', 'assault-vest'],
    bestTera: 'fairy'
  },
  {
    id: 'staraptor', dex: 398, name: 'Staraptor', gen: 4,
    types: ['normal', 'flying'], role: 'Reckless Intimidate Breaker',
    stats: { hp: 85, atk: 120, def: 70, spa: 50, spd: 60, spe: 100 },
    abilities: ['Intimidate', 'Reckless'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['brave-bird', 'close-combat', 'return', 'u-turn', 'roost'],
    bestItems: ['choice-scarf', 'choice-band', 'heavy-duty-boots', 'life-orb'],
    bestTera: 'flying'
  },
  {
    id: 'luxray', dex: 405, name: 'Luxray', gen: 4,
    types: ['electric'], role: 'Intimidate / Guts Physical Electric',
    stats: { hp: 80, atk: 120, def: 79, spa: 95, spd: 79, spe: 70 },
    abilities: ['Intimidate', 'Guts'], bestNature: 'Adamant / Jolly',
    bestMoves: ['wild-charge', 'crunch', 'ice-fang', 'facade', 'volt-switch', 'superpower'],
    bestItems: ['flame-orb', 'magnet', 'assault-vest', 'leftovers'],
    bestTera: 'normal'
  },
  {
    id: 'roserade', dex: 407, name: 'Roserade', gen: 4,
    types: ['grass', 'poison'], role: 'Special Grass/Poison Sweeper',
    stats: { hp: 60, atk: 70, def: 65, spa: 125, spd: 105, spe: 90 },
    abilities: ['Technician', 'Natural Cure'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['energy-ball', 'sludge-bomb', 'dazzling-gleam', 'shadow-ball', 'giga-drain', 'leech-seed'],
    bestItems: ['black-sludge', 'life-orb', 'miracle-seed', 'choice-specs'],
    bestTera: 'fire'
  },
  {
    id: 'lopunny', dex: 428, name: 'Lopunny', gen: 4,
    types: ['normal'], role: 'Mega Physical Speedster',
    stats: { hp: 65, atk: 76, def: 84, spa: 54, spd: 96, spe: 105 },
    abilities: ['Cute Charm', 'Limber'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['return', 'close-combat', 'fake-out', 'u-turn', 'ice-punch', 'high-jump-kick'],
    bestItems: ['lopunnite', 'life-orb'],
    bestTera: 'fighting',
    mega: {
      name: 'Mega Lopunny', stone: 'lopunnite', spriteId: 10088,
      types: ['normal', 'fighting'], ability: 'Scrappy',
      stats: { hp: 65, atk: 136, def: 94, spa: 54, spd: 96, spe: 135 },
      note: 'Scrappy permite que seus golpes Normal e Lutador acertem Fantasmas sem nenhum Pokémon resistir aos dois!'
    }
  },
  {
    id: 'garchomp', dex: 445, name: 'Garchomp', gen: 4, isStarter: true, starterRef: 'gible',
    types: ['dragon', 'ground'], role: 'Supreme Pseudo-Legendary Sweeper',
    stats: { hp: 108, atk: 130, def: 95, spa: 80, spd: 85, spe: 102 },
    abilities: ['Rough Skin', 'Sand Veil'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['earthquake', 'dragon-claw', 'swords-dance', 'stone-edge', 'scale-shot', 'fire-fang', 'iron-head', 'stealth-rock'],
    bestItems: ['life-orb', 'loaded-dice', 'rocky-helmet', 'leftovers', 'soft-sand'],
    bestTera: 'steel',
    mega: {
      name: 'Mega Garchomp', stone: 'garchompite', spriteId: 10058,
      types: ['dragon', 'ground'], ability: 'Sand Force',
      stats: { hp: 108, atk: 170, def: 115, spa: 120, spd: 95, spe: 92 },
      note: 'Inicial estrela de Pokémon Unbound! Com Scale Shot + Swords Dance ou Mega Stone, atinge 170 de Attack!'
    }
  },
  {
    id: 'lucario', dex: 448, name: 'Lucario', gen: 4, isStarter: true, starterRef: 'riolu',
    types: ['fighting', 'steel'], role: 'Versatile Physical / Special Sweeper',
    stats: { hp: 70, atk: 110, def: 70, spa: 115, spd: 70, spe: 90 },
    abilities: ['Inner Focus', 'Justified'], bestNature: 'Jolly / Timid',
    bestMoves: ['close-combat', 'meteor-mash', 'extreme-speed', 'swords-dance', 'aura-sphere', 'flash-cannon', 'nasty-plot', 'ice-punch'],
    bestItems: ['life-orb', 'focus-sash', 'expert-belt', 'black-belt'],
    bestTera: 'normal',
    mega: {
      name: 'Mega Lucario', stone: 'lucarionite', spriteId: 10059,
      types: ['fighting', 'steel'], ability: 'Adaptability',
      stats: { hp: 70, atk: 145, def: 88, spa: 140, spd: 70, spe: 112 },
      note: 'Adaptability aumenta o bônus STAB de 1.5x para 2.0x em Close Combat, Aura Sphere e Meteor Mash!'
    }
  },
  {
    id: 'weavile', dex: 461, name: 'Weavile', gen: 4,
    types: ['dark', 'ice'], role: 'Fast Dragon Slayer / Knock Off Sweeper',
    stats: { hp: 70, atk: 120, def: 65, spa: 45, spd: 85, spe: 125 },
    abilities: ['Pressure', 'Pickpocket'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['knock-off', 'icicle-crash', 'ice-shard', 'swords-dance', 'triple-axel', 'brick-break'],
    bestItems: ['heavy-duty-boots', 'life-orb', 'focus-sash', 'never-melt-ice'],
    bestTera: 'ice'
  },
  {
    id: 'magnezone', dex: 462, name: 'Magnezone', gen: 4,
    types: ['electric', 'steel'], role: 'Steel Trapper & Defensive Pivot',
    stats: { hp: 70, atk: 70, def: 115, spa: 130, spd: 90, spe: 60 },
    abilities: ['Magnet Pull', 'Sturdy', 'Analytic'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['thunderbolt', 'flash-cannon', 'volt-switch', 'body-press', 'thunder-wave'],
    bestItems: ['leftovers', 'assault-vest', 'choice-specs', 'magnet'],
    bestTera: 'flying'
  },
  {
    id: 'togekiss', dex: 468, name: 'Togekiss', gen: 4,
    types: ['fairy', 'flying'], gen1To5Types: ['normal', 'flying'], role: 'Serene Grace ParaFlinch / Nasty Plot',
    stats: { hp: 85, atk: 50, def: 95, spa: 120, spd: 115, spe: 80 },
    abilities: ['Serene Grace'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['air-slash', 'dazzling-gleam', 'aura-sphere', 'flamethrower', 'nasty-plot', 'thunder-wave', 'roost'],
    bestItems: ['leftovers', 'heavy-duty-boots', 'choice-scarf', 'weakness-policy'],
    bestTera: 'steel'
  },
  {
    id: 'gliscor', dex: 472, name: 'Gliscor', gen: 4,
    types: ['ground', 'flying'], role: 'Poison Heal Immortal Tank',
    stats: { hp: 75, atk: 95, def: 125, spa: 45, spd: 75, spe: 95 },
    abilities: ['Poison Heal', 'Hyper Cutter'], bestNature: 'Jolly / Impish',
    bestMoves: ['earthquake', 'knock-off', 'roost', 'swords-dance', 'protect', 'toxic', 'stealth-rock', 'dual-wingbeat'],
    bestItems: ['toxic-orb', 'leftovers', 'soft-sand'],
    bestTera: 'water'
  },
  {
    id: 'mamoswine', dex: 473, name: 'Mamoswine', gen: 4,
    types: ['ice', 'ground'], role: 'Offensive Ground/Ice Wallbreaker',
    stats: { hp: 110, atk: 130, def: 80, spa: 70, spd: 60, spe: 80 },
    abilities: ['Thick Fat', 'Oblivious'], bestNature: 'Adamant / Jolly',
    bestMoves: ['earthquake', 'icicle-crash', 'ice-shard', 'stone-edge', 'stealth-rock', 'high-horsepower'],
    bestItems: ['life-orb', 'never-melt-ice', 'choice-band', 'focus-sash'],
    bestTera: 'ice'
  },
  {
    id: 'gallade', dex: 475, name: 'Gallade', gen: 4,
    types: ['psychic', 'fighting'], role: 'Sharpness Physical Blade Breaker',
    stats: { hp: 68, atk: 125, def: 65, spa: 65, spd: 115, spe: 80 },
    abilities: ['Sharpness', 'Justified', 'Steadfast'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['sacred-sword', 'psycho-cut', 'leaf-blade', 'night-slash', 'close-combat', 'swords-dance', 'drain-punch'],
    bestItems: ['life-orb', 'expert-belt', 'choice-scarf', 'scope-lens'],
    bestTera: 'fighting',
    mega: {
      name: 'Mega Gallade', stone: 'galladite', spriteId: 10068,
      types: ['psychic', 'fighting'], ability: 'Inner Focus',
      stats: { hp: 68, atk: 165, def: 95, spa: 65, spd: 115, spe: 110 },
      note: '165 de Attack e 110 de Speed com cobertura física perfeita!'
    }
  },

  // ==================== GERAÇÃO 5 (UNOVA) ====================
  {
    id: 'serperior', dex: 497, name: 'Serperior', gen: 5, isStarter: true, starterRef: 'snivy',
    types: ['grass'], role: 'Contrary Leaf Storm Sweeper',
    stats: { hp: 75, atk: 75, def: 95, spa: 75, spd: 95, spe: 113 },
    abilities: ['Contrary', 'Overgrow'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['leaf-storm', 'dragon-pulse', 'giga-drain', 'leech-seed', 'energy-ball'],
    bestItems: ['leftovers', 'miracle-seed', 'life-orb'],
    bestTera: 'fire'
  },
  {
    id: 'emboar', dex: 500, name: 'Emboar', gen: 5, isStarter: true, starterRef: 'tepig',
    types: ['fire', 'fighting'], role: 'Reckless Heavy Wallbreaker',
    stats: { hp: 110, atk: 123, def: 65, spa: 100, spd: 65, spe: 65 },
    abilities: ['Reckless', 'Blaze'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['flare-blitz', 'close-combat', 'wild-charge', 'earthquake', 'sucker-punch', 'drain-punch'],
    bestItems: ['leftovers', 'assault-vest', 'charcoal', 'life-orb'],
    bestTera: 'electric'
  },
  {
    id: 'samurott', dex: 503, name: 'Samurott', gen: 5, isStarter: true, starterRef: 'oshawott',
    types: ['water'], role: 'Mixed / Swords Dance Attacker',
    stats: { hp: 95, atk: 100, def: 85, spa: 108, spd: 70, spe: 70 },
    abilities: ['Torrent', 'Shell Armor'], bestNature: 'Adamant / Modest',
    bestMoves: ['waterfall', 'megahorn', 'aqua-jet', 'swords-dance', 'surf', 'ice-beam'],
    bestItems: ['mystic-water', 'life-orb', 'leftovers'],
    bestTera: 'water'
  },
  {
    id: 'samurott-hisui', dex: 503, spriteId: 10236, name: 'Samurott de Hisui', gen: 8, isStarter: true, starterRef: 'oshawott',
    types: ['water', 'dark'], role: 'Sharpness Ceaseless Edge Sweeper',
    stats: { hp: 90, atk: 108, def: 80, spa: 100, spd: 65, spe: 85 },
    abilities: ['Sharpness'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['ceaseless-edge', 'liquidation', 'sacred-sword', 'aqua-jet', 'swords-dance', 'x-scissor'],
    bestItems: ['focus-sash', 'life-orb', 'mystic-water', 'black-glasses'],
    bestTera: 'dark'
  },
  {
    id: 'excadrill', dex: 530, name: 'Excadrill', gen: 5,
    types: ['ground', 'steel'], role: 'Sand Rush / Mold Breaker Sweeper',
    stats: { hp: 110, atk: 135, def: 60, spa: 50, spd: 65, spe: 88 },
    abilities: ['Sand Rush', 'Mold Breaker'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['earthquake', 'iron-head', 'rock-slide', 'swords-dance', 'stealth-rock', 'brick-break'],
    bestItems: ['leftovers', 'focus-sash', 'life-orb', 'soft-sand'],
    bestTera: 'ground'
  },
  {
    id: 'krookodile', dex: 553, name: 'Krookodile', gen: 5,
    types: ['ground', 'dark'], role: 'Moxie Snowball / Intimidate',
    stats: { hp: 95, atk: 117, def: 80, spa: 65, spd: 70, spe: 92 },
    abilities: ['Moxie', 'Intimidate'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['earthquake', 'knock-off', 'crunch', 'close-combat', 'stone-edge', 'stealth-rock'],
    bestItems: ['choice-scarf', 'life-orb', 'black-glasses', 'soft-sand'],
    bestTera: 'dark'
  },
  {
    id: 'darmanitan', dex: 555, name: 'Darmanitan', gen: 5,
    types: ['fire'], role: 'Sheer Force Nuke',
    stats: { hp: 105, atk: 140, def: 55, spa: 30, spd: 55, spe: 95 },
    abilities: ['Sheer Force'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['flare-blitz', 'earthquake', 'rock-slide', 'u-turn', 'superpower', 'fire-punch'],
    bestItems: ['life-orb', 'choice-scarf', 'charcoal'],
    bestTera: 'fire'
  },
  {
    id: 'darmanitan-galar', dex: 555, spriteId: 10177, name: 'Darmanitan de Galar', gen: 8,
    types: ['ice'], role: 'Gorilla Tactics Physical Nuke',
    stats: { hp: 105, atk: 140, def: 55, spa: 30, spd: 55, spe: 95 },
    abilities: ['Gorilla Tactics'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['icicle-crash', 'flare-blitz', 'earthquake', 'u-turn', 'superpower'],
    bestItems: ['choice-scarf', 'choice-band', 'heavy-duty-boots'],
    bestTera: 'ice'
  },
  {
    id: 'zoroark-hisui', dex: 571, spriteId: 10239, name: 'Zoroark de Hisui', gen: 8,
    types: ['normal', 'ghost'], role: 'Illusion Sweeper (3 Imunidades!)',
    stats: { hp: 55, atk: 100, def: 60, spa: 125, spd: 60, spe: 110 },
    abilities: ['Illusion'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['shadow-ball', 'hyper-voice', 'flamethrower', 'nasty-plot', 'focus-blast', 'u-turn'],
    bestItems: ['focus-sash', 'life-orb', 'choice-specs'],
    bestTera: 'ghost'
  },
  {
    id: 'ferrothorn', dex: 598, name: 'Ferrothorn', gen: 5,
    types: ['grass', 'steel'], role: 'Supreme Hazard & Physical Wall',
    stats: { hp: 74, atk: 94, def: 131, spa: 54, spd: 116, spe: 20 },
    abilities: ['Iron Barbs'], bestNature: 'Relaxed / Impish',
    bestMoves: ['leech-seed', 'iron-head', 'body-press', 'stealth-rock', 'knock-off', 'seed-bomb', 'protect'],
    bestItems: ['leftovers', 'rocky-helmet'],
    bestTera: 'water'
  },
  {
    id: 'chandelure', dex: 609, name: 'Chandelure', gen: 5,
    types: ['ghost', 'fire'], role: '145 Sp. Atk Special Wallbreaker',
    stats: { hp: 60, atk: 55, def: 90, spa: 145, spd: 90, spe: 80 },
    abilities: ['Flash Fire', 'Flame Body'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['shadow-ball', 'flamethrower', 'energy-ball', 'calm-mind', 'fire-blast', 'will-o-wisp', 'hex'],
    bestItems: ['choice-scarf', 'heavy-duty-boots', 'spell-tag', 'life-orb'],
    bestTera: 'grass'
  },
  {
    id: 'haxorus', dex: 612, name: 'Haxorus', gen: 5,
    types: ['dragon'], role: 'Mold Breaker Dragon Dance Breaker',
    stats: { hp: 76, atk: 147, def: 90, spa: 60, spd: 70, spe: 97 },
    abilities: ['Mold Breaker'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['dragon-claw', 'earthquake', 'dragon-dance', 'close-combat', 'iron-head', 'outrage', 'swords-dance'],
    bestItems: ['lum-berry', 'life-orb', 'loaded-dice'],
    bestTera: 'steel'
  },
  {
    id: 'hydreigon', dex: 635, name: 'Hydreigon', gen: 5,
    types: ['dark', 'dragon'], role: 'Levitate Special Pseudo-Legendary',
    stats: { hp: 92, atk: 105, def: 90, spa: 125, spd: 90, spe: 98 },
    abilities: ['Levitate'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['dark-pulse', 'draco-meteor', 'flamethrower', 'flash-cannon', 'nasty-plot', 'earth-power', 'roost', 'u-turn'],
    bestItems: ['life-orb', 'leftovers', 'choice-scarf', 'black-glasses'],
    bestTera: 'steel'
  },
  {
    id: 'volcarona', dex: 637, name: 'Volcarona', gen: 5,
    types: ['bug', 'fire'], role: 'Quiver Dance Special Boss',
    stats: { hp: 85, atk: 60, def: 65, spa: 135, spd: 105, spe: 100 },
    abilities: ['Flame Body'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['quiver-dance', 'fiery-dance', 'bug-buzz', 'giga-drain', 'flamethrower', 'roost', 'psychic'],
    bestItems: ['heavy-duty-boots', 'leftovers', 'charcoal'],
    bestTera: 'grass'
  },

  // ==================== GERAÇÃO 6 (KALOS) ====================
  {
    id: 'chesnaught', dex: 652, name: 'Chesnaught', gen: 6, isStarter: true, starterRef: 'chespin',
    types: ['grass', 'fighting'], role: 'Bulletproof Physical Wall',
    stats: { hp: 88, atk: 107, def: 122, spa: 74, spd: 75, spe: 64 },
    abilities: ['Bulletproof', 'Overgrow'], bestNature: 'Impish (+Def, -SpA)',
    bestMoves: ['body-press', 'seed-bomb', 'leech-seed', 'drain-punch', 'wood-hammer', 'earthquake'],
    bestItems: ['leftovers', 'rocky-helmet'],
    bestTera: 'steel'
  },
  {
    id: 'delphox', dex: 655, name: 'Delphox', gen: 6, isStarter: true, starterRef: 'fennekin',
    types: ['fire', 'psychic'], role: 'Fast Special Fire/Psychic',
    stats: { hp: 75, atk: 69, def: 72, spa: 114, spd: 100, spe: 104 },
    abilities: ['Blaze'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'psychic', 'shadow-ball', 'calm-mind', 'dazzling-gleam', 'nasty-plot'],
    bestItems: ['heavy-duty-boots', 'life-orb', 'charcoal'],
    bestTera: 'fairy'
  },
  {
    id: 'greninja', dex: 658, name: 'Greninja (Protean / Battle Bond)', gen: 6, isStarter: true, starterRef: 'froakie',
    types: ['water', 'dark'], role: 'Protean / Battle Bond Ninja Sweeper',
    stats: { hp: 72, atk: 95, def: 67, spa: 103, spd: 71, spe: 122 },
    abilities: ['Protean', 'Battle Bond', 'Torrent'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['surf', 'dark-pulse', 'ice-beam', 'u-turn', 'hydro-pump', 'gunk-shot', 'energy-ball'],
    bestItems: ['life-orb', 'expert-belt', 'choice-specs', 'focus-sash'],
    bestTera: 'water'
  },
  {
    id: 'talonflame', dex: 663, name: 'Talonflame', gen: 6,
    types: ['fire', 'flying'], role: 'Gale Wings Priority / Speed Control',
    stats: { hp: 78, atk: 81, def: 71, spa: 74, spd: 69, spe: 126 },
    abilities: ['Gale Wings', 'Flame Body'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['brave-bird', 'flare-blitz', 'swords-dance', 'roost', 'u-turn', 'will-o-wisp'],
    bestItems: ['heavy-duty-boots', 'sharp-beak', 'charcoal'],
    bestTera: 'flying'
  },
  {
    id: 'aegislash', dex: 681, name: 'Aegislash', gen: 6,
    types: ['steel', 'ghost'], role: 'Stance Change Tactical Master',
    stats: { hp: 60, atk: 140, def: 140, spa: 140, spd: 140, spe: 60 },
    abilities: ['Stance Change'], bestNature: 'Quiet / Adamant',
    bestMoves: ['shadow-ball', 'flash-cannon', 'close-combat', 'protect', 'shadow-sneak', 'swords-dance', 'iron-head', 'sacred-sword'],
    bestItems: ['leftovers', 'weakness-policy', 'spell-tag'],
    bestTera: 'fighting'
  },
  {
    id: 'sylveon', dex: 700, name: 'Sylveon', gen: 6,
    types: ['fairy'], role: 'Pixilate Special Tank & Sweeper',
    stats: { hp: 95, atk: 65, def: 65, spa: 110, spd: 130, spe: 60 },
    abilities: ['Pixilate', 'Cute Charm'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['hyper-voice', 'moonblast', 'mystical-fire', 'psyshock', 'calm-mind', 'shadow-ball', 'draining-kiss'],
    bestItems: ['leftovers', 'throat-spray', 'choice-specs'],
    bestTera: 'fire'
  },
  {
    id: 'hawlucha', dex: 701, name: 'Hawlucha', gen: 6,
    types: ['fighting', 'flying'], role: 'Unburden Acrobatics Sweeper',
    stats: { hp: 78, atk: 92, def: 75, spa: 74, spd: 63, spe: 118 },
    abilities: ['Unburden', 'Limber'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['close-combat', 'acrobatics', 'swords-dance', 'roost', 'high-jump-kick', 'stone-edge'],
    bestItems: ['sitrus-berry', 'black-belt', 'focus-sash'],
    bestTera: 'flying'
  },
  {
    id: 'goodra-hisui', dex: 706, spriteId: 10242, name: 'Goodra de Hisui', gen: 8,
    types: ['steel', 'dragon'], role: '9-Resistances Special Fortress',
    stats: { hp: 80, atk: 100, def: 100, spa: 110, spd: 150, spe: 60 },
    abilities: ['Sap Sipper', 'Shell Armor'], bestNature: 'Modest / Calm',
    bestMoves: ['draco-meteor', 'flash-cannon', 'flamethrower', 'thunderbolt', 'body-press', 'ice-beam'],
    bestItems: ['leftovers', 'assault-vest'],
    bestTera: 'flying'
  },

  // ==================== GERAÇÃO 7 (ALOLA) ====================
  {
    id: 'decidueye', dex: 724, name: 'Decidueye', gen: 7, isStarter: true, starterRef: 'rowlet',
    types: ['grass', 'ghost'], role: 'Ghost/Grass Sniper',
    stats: { hp: 78, atk: 107, def: 75, spa: 100, spd: 100, spe: 70 },
    abilities: ['Overgrow', 'Long Reach'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['leaf-blade', 'poltergeist', 'shadow-sneak', 'swords-dance', 'u-turn', 'roost', 'spirit-shackle'],
    bestItems: ['miracle-seed', 'spell-tag', 'life-orb', 'heavy-duty-boots'],
    bestTera: 'ghost'
  },
  {
    id: 'decidueye-hisui', dex: 724, spriteId: 10244, name: 'Decidueye de Hisui', gen: 8, isStarter: true, starterRef: 'rowlet',
    types: ['grass', 'fighting'], role: 'Scrappy Physical Attacker',
    stats: { hp: 88, atk: 112, def: 80, spa: 95, spd: 95, spe: 60 },
    abilities: ['Scrappy', 'Overgrow'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['close-combat', 'leaf-blade', 'u-turn', 'roost', 'swords-dance', 'brave-bird'],
    bestItems: ['leftovers', 'assault-vest', 'black-belt'],
    bestTera: 'steel'
  },
  {
    id: 'incineroar', dex: 727, name: 'Incineroar', gen: 7, isStarter: true, starterRef: 'litten',
    types: ['fire', 'dark'], role: 'Ultimate Intimidate Pivot',
    stats: { hp: 95, atk: 115, def: 90, spa: 80, spd: 90, spe: 60 },
    abilities: ['Intimidate', 'Blaze'], bestNature: 'Careful / Adamant',
    bestMoves: ['flare-blitz', 'knock-off', 'fake-out', 'u-turn', 'will-o-wisp', 'close-combat', 'swords-dance'],
    bestItems: ['heavy-duty-boots', 'sitrus-berry', 'assault-vest', 'leftovers'],
    bestTera: 'ghost'
  },
  {
    id: 'primarina', dex: 730, name: 'Primarina', gen: 7, isStarter: true, starterRef: 'popplio',
    types: ['water', 'fairy'], role: 'Bulky Special Fairy/Water',
    stats: { hp: 80, atk: 74, def: 74, spa: 126, spd: 116, spe: 60 },
    abilities: ['Torrent', 'Liquid Voice'], bestNature: 'Modest (+SpA, -Atk)',
    bestMoves: ['moonblast', 'surf', 'ice-beam', 'calm-mind', 'energy-ball', 'flip-turn', 'psychic'],
    bestItems: ['leftovers', 'throat-spray', 'choice-specs', 'mystic-water'],
    bestTera: 'steel'
  },
  {
    id: 'ribombee', dex: 743, name: 'Ribombee', gen: 7,
    types: ['bug', 'fairy'], role: 'Quiver Dance Speedster & Lead',
    stats: { hp: 60, atk: 55, def: 60, spa: 95, spd: 70, spe: 124 },
    abilities: ['Shield Dust'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['moonblast', 'bug-buzz', 'quiver-dance', 'psychic', 'energy-ball', 'u-turn'],
    bestItems: ['focus-sash', 'heavy-duty-boots', 'life-orb'],
    bestTera: 'ground'
  },
  {
    id: 'toxapex', dex: 748, name: 'Toxapex', gen: 7,
    types: ['poison', 'water'], role: 'Regenerator Immortal Wall',
    stats: { hp: 50, atk: 63, def: 152, spa: 53, spd: 142, spe: 35 },
    abilities: ['Regenerator', 'Merciless'], bestNature: 'Bold (+Def, -Atk)',
    bestMoves: ['scald', 'toxic', 'recover', 'sludge-bomb', 'ice-beam'],
    bestItems: ['black-sludge', 'rocky-helmet', 'leftovers'],
    bestTera: 'fairy'
  },
  {
    id: 'mudsdale', dex: 750, name: 'Mudsdale', gen: 7,
    types: ['ground'], role: 'Stamina Physical Fortress',
    stats: { hp: 100, atk: 125, def: 100, spa: 55, spd: 85, spe: 35 },
    abilities: ['Stamina'], bestNature: 'Adamant / Impish',
    bestMoves: ['earthquake', 'body-press', 'iron-head', 'rock-slide', 'stealth-rock', 'close-combat'],
    bestItems: ['leftovers', 'assault-vest', 'soft-sand'],
    bestTera: 'fighting'
  },
  {
    id: 'salazzle', dex: 758, name: 'Salazzle', gen: 7,
    types: ['poison', 'fire'], role: 'Corrosion Fast Special Breaker',
    stats: { hp: 68, atk: 64, def: 60, spa: 111, spd: 60, spe: 117 },
    abilities: ['Corrosion'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['flamethrower', 'sludge-wave', 'nasty-plot', 'toxic', 'dragon-pulse'],
    bestItems: ['heavy-duty-boots', 'black-sludge', 'focus-sash', 'life-orb'],
    bestTera: 'grass'
  },
  {
    id: 'mimikyu', dex: 778, name: 'Mimikyu', gen: 7,
    types: ['ghost', 'fairy'], role: 'Disguise Swords Dance Sweeper',
    stats: { hp: 55, atk: 90, def: 80, spa: 50, spd: 105, spe: 96 },
    abilities: ['Disguise'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['play-rough', 'shadow-claw', 'shadow-sneak', 'swords-dance', 'drain-punch'],
    bestItems: ['life-orb', 'spell-tag', 'red-card'],
    bestTera: 'ghost'
  },
  {
    id: 'kommo-o', dex: 784, name: 'Kommo-o', gen: 7,
    types: ['dragon', 'fighting'], role: 'Clangorous Soul / Body Press Pseudo',
    stats: { hp: 75, atk: 110, def: 125, spa: 100, spd: 105, spe: 85 },
    abilities: ['Bulletproof', 'Soundproof'], bestNature: 'Jolly / Timid',
    bestMoves: ['close-combat', 'dragon-claw', 'poison-jab', 'dragon-dance', 'body-press', 'flamethrower', 'flash-cannon'],
    bestItems: ['throat-spray', 'leftovers', 'life-orb'],
    bestTera: 'steel'
  },

  // ==================== GERAÇÃO 8 (GALAR & HISUI) ====================
  {
    id: 'rillaboom', dex: 812, name: 'Rillaboom', gen: 8, isStarter: true, starterRef: 'grookey',
    types: ['grass'], role: 'Grassy Surge Priority King',
    stats: { hp: 100, atk: 125, def: 90, spa: 60, spd: 70, spe: 85 },
    abilities: ['Grassy Surge', 'Overgrow'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['grassy-glide', 'wood-hammer', 'knock-off', 'u-turn', 'high-horsepower', 'swords-dance', 'drain-punch'],
    bestItems: ['miracle-seed', 'choice-band', 'assault-vest', 'life-orb'],
    bestTera: 'grass',
    hasGmax: true
  },
  {
    id: 'cinderace', dex: 815, name: 'Cinderace', gen: 8, isStarter: true, starterRef: 'scorbunny',
    types: ['fire'], role: 'Libero Fast Physical Striker',
    stats: { hp: 80, atk: 116, def: 75, spa: 65, spd: 75, spe: 119 },
    abilities: ['Libero', 'Blaze'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['pyro-ball', 'high-jump-kick', 'u-turn', 'sucker-punch', 'gunk-shot', 'zen-headbutt'],
    bestItems: ['heavy-duty-boots', 'life-orb', 'charcoal'],
    bestTera: 'fire',
    hasGmax: true
  },
  {
    id: 'inteleon', dex: 818, name: 'Inteleon', gen: 8, isStarter: true, starterRef: 'sobble',
    types: ['water'], role: 'Sniper Critical Special Sweeper',
    stats: { hp: 70, atk: 85, def: 65, spa: 125, spd: 65, spe: 120 },
    abilities: ['Sniper', 'Torrent'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['surf', 'ice-beam', 'dark-pulse', 'u-turn', 'hydro-pump', 'air-slash'],
    bestItems: ['choice-specs', 'mystic-water', 'life-orb'],
    bestTera: 'water',
    hasGmax: true
  },
  {
    id: 'corviknight', dex: 823, name: 'Corviknight', gen: 8,
    types: ['flying', 'steel'], role: 'Mirror Armor Physical Wall & Pivot',
    stats: { hp: 98, atk: 87, def: 105, spa: 53, spd: 85, spe: 67 },
    abilities: ['Mirror Armor', 'Pressure'], bestNature: 'Impish (+Def, -SpA)',
    bestMoves: ['brave-bird', 'body-press', 'roost', 'u-turn', 'iron-head'],
    bestItems: ['leftovers', 'rocky-helmet'],
    bestTera: 'dragon',
    hasGmax: true
  },
  {
    id: 'toxtricity', dex: 849, name: 'Toxtricity', gen: 8,
    types: ['electric', 'poison'], role: 'Punk Rock Sound Wallbreaker',
    stats: { hp: 75, atk: 98, def: 70, spa: 114, spd: 70, spe: 75 },
    abilities: ['Punk Rock'], bestNature: 'Modest / Timid',
    bestMoves: ['thunderbolt', 'sludge-bomb', 'hyper-voice', 'volt-switch'],
    bestItems: ['throat-spray', 'choice-specs', 'magnet'],
    bestTera: 'normal',
    hasGmax: true
  },
  {
    id: 'grimmsnarl', dex: 861, name: 'Grimmsnarl', gen: 8,
    types: ['dark', 'fairy'], role: 'Prankster Support & Bulk Attacker',
    stats: { hp: 95, atk: 120, def: 65, spa: 95, spd: 75, spe: 60 },
    abilities: ['Prankster'], bestNature: 'Careful / Adamant',
    bestMoves: ['spirit-break', 'sucker-punch', 'thunder-wave', 'crunch', 'play-rough', 'drain-punch'],
    bestItems: ['light-clay', 'leftovers', 'black-glasses'],
    bestTera: 'ghost',
    hasGmax: true
  },
  {
    id: 'dracovish', dex: 882, name: 'Dracovish', gen: 8,
    types: ['water', 'dragon'], role: 'Strong Jaw Fishious Rend Nuke',
    stats: { hp: 90, atk: 90, def: 100, spa: 70, spd: 80, spe: 75 },
    abilities: ['Strong Jaw', 'Water Absorb'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['fishious-rend', 'crunch', 'outrage', 'ice-fang', 'earthquake'],
    bestItems: ['choice-scarf', 'choice-band', 'mystic-water'],
    bestTera: 'water'
  },
  {
    id: 'dragapult', dex: 887, name: 'Dragapult', gen: 8,
    types: ['dragon', 'ghost'], role: '142-Speed Pseudo-Legendary Ace',
    stats: { hp: 88, atk: 120, def: 75, spa: 100, spd: 75, spe: 142 },
    abilities: ['Infiltrator', 'Clear Body'], bestNature: 'Timid / Jolly',
    bestMoves: ['dragon-darts', 'shadow-ball', 'u-turn', 'flamethrower', 'draco-meteor', 'will-o-wisp', 'hex', 'dragon-dance'],
    bestItems: ['choice-specs', 'heavy-duty-boots', 'life-orb', 'spell-tag'],
    bestTera: 'ghost'
  },
  {
    id: 'urshifu', dex: 892, spriteId: 10191, name: 'Urshifu (Rapid Strike)', gen: 8,
    types: ['fighting', 'water'], role: 'Unseen Fist Multi-Strike Breaker',
    stats: { hp: 100, atk: 130, def: 100, spa: 63, spd: 60, spe: 97 },
    abilities: ['Unseen Fist'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['close-combat', 'waterfall', 'aqua-jet', 'u-turn', 'ice-punch', 'swords-dance'],
    bestItems: ['mystic-water', 'choice-band', 'focus-sash', 'life-orb'],
    bestTera: 'water',
    hasGmax: true
  },
  {
    id: 'kleavor', dex: 900, name: 'Kleavor', gen: 8,
    types: ['bug', 'rock'], role: 'Sharpness Stone Axe Hazard Setter',
    stats: { hp: 70, atk: 135, def: 95, spa: 45, spd: 70, spe: 85 },
    abilities: ['Sharpness', 'Sheer Force'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['stone-axe', 'x-scissor', 'close-combat', 'night-slash', 'u-turn', 'swords-dance'],
    bestItems: ['focus-sash', 'choice-scarf', 'heavy-duty-boots', 'life-orb'],
    bestTera: 'rock'
  },
  {
    id: 'ursaluna', dex: 901, name: 'Ursaluna', gen: 8,
    types: ['ground', 'normal'], role: 'Guts Facade Colossal Wallbreaker',
    stats: { hp: 130, atk: 140, def: 105, spa: 45, spd: 80, spe: 50 },
    abilities: ['Guts', 'Bulletproof'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['facade', 'headlong-rush', 'earthquake', 'fire-punch', 'swords-dance', 'crunch'],
    bestItems: ['flame-orb', 'leftovers', 'assault-vest'],
    bestTera: 'normal'
  },

  // ==================== GERAÇÃO 9 (PALDEA) ====================
  {
    id: 'meowscarada', dex: 908, name: 'Meowscarada', gen: 9, isStarter: true, starterRef: 'sprigatito',
    types: ['grass', 'dark'], role: 'Protean Flower Trick Speedster',
    stats: { hp: 76, atk: 110, def: 70, spa: 81, spd: 70, spe: 123 },
    abilities: ['Protean', 'Overgrow'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['flower-trick', 'knock-off', 'u-turn', 'play-rough', 'triple-axel', 'sucker-punch'],
    bestItems: ['heavy-duty-boots', 'choice-band', 'focus-sash', 'miracle-seed'],
    bestTera: 'grass'
  },
  {
    id: 'skeledirge', dex: 911, name: 'Skeledirge', gen: 9, isStarter: true, starterRef: 'fuecoco',
    types: ['fire', 'ghost'], role: 'Unaware Torch Song Tank & Sweeper',
    stats: { hp: 104, atk: 75, def: 100, spa: 110, spd: 75, spe: 66 },
    abilities: ['Unaware', 'Blaze'], bestNature: 'Bold / Modest',
    bestMoves: ['torch-song', 'shadow-ball', 'recover', 'will-o-wisp', 'hex', 'earth-power'],
    bestItems: ['heavy-duty-boots', 'leftovers', 'throat-spray'],
    bestTera: 'fairy'
  },
  {
    id: 'quaquaval', dex: 914, name: 'Quaquaval', gen: 9, isStarter: true, starterRef: 'quaxly',
    types: ['water', 'fighting'], role: 'Moxie + Aqua Step Snowball Sweeper',
    stats: { hp: 85, atk: 120, def: 80, spa: 85, spd: 75, spe: 85 },
    abilities: ['Moxie', 'Torrent'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['aqua-step', 'close-combat', 'ice-spinner', 'swords-dance', 'aqua-jet', 'roost', 'brave-bird'],
    bestItems: ['life-orb', 'mystic-water', 'leftovers'],
    bestTera: 'water'
  },
  {
    id: 'garganacl', dex: 934, name: 'Garganacl', gen: 9,
    types: ['rock'], role: 'Purifying Salt Immortal Fortress',
    stats: { hp: 100, atk: 100, def: 130, spa: 45, spd: 90, spe: 35 },
    abilities: ['Purifying Salt'], bestNature: 'Careful / Impish',
    bestMoves: ['salt-cure', 'recover', 'body-press', 'stealth-rock', 'earthquake', 'protect'],
    bestItems: ['leftovers', 'rocky-helmet'],
    bestTera: 'water'
  },
  {
    id: 'armarouge', dex: 936, name: 'Armarouge', gen: 9,
    types: ['fire', 'psychic'], role: 'Weak Armor / Flash Fire Special Cannon',
    stats: { hp: 85, atk: 60, def: 100, spa: 125, spd: 80, spe: 75 },
    abilities: ['Flash Fire', 'Weak Armor'], bestNature: 'Modest / Timid',
    bestMoves: ['flamethrower', 'psychic', 'aura-sphere', 'energy-ball', 'calm-mind', 'dark-pulse'],
    bestItems: ['weakness-policy', 'heavy-duty-boots', 'life-orb'],
    bestTera: 'grass'
  },
  {
    id: 'ceruledge', dex: 937, name: 'Ceruledge', gen: 9,
    types: ['fire', 'ghost'], role: 'Bitter Blade Swords Dance Sweeper',
    stats: { hp: 75, atk: 125, def: 80, spa: 60, spd: 100, spe: 85 },
    abilities: ['Flash Fire', 'Weak Armor'], bestNature: 'Jolly / Adamant',
    bestMoves: ['bitter-blade', 'poltergeist', 'shadow-sneak', 'swords-dance', 'close-combat', 'shadow-claw'],
    bestItems: ['focus-sash', 'heavy-duty-boots', 'life-orb', 'charcoal'],
    bestTera: 'fire'
  },
  {
    id: 'tinkaton', dex: 959, name: 'Tinkaton', gen: 9,
    types: ['fairy', 'steel'], role: 'Gigaton Hammer Utility & Support',
    stats: { hp: 85, atk: 75, def: 77, spa: 70, spd: 105, spe: 94 },
    abilities: ['Mold Breaker'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['gigaton-hammer', 'play-rough', 'knock-off', 'stealth-rock', 'swords-dance', 'thunder-wave', 'fake-out'],
    bestItems: ['leftovers', 'air-balloon', 'metal-coat'],
    bestTera: 'steel'
  },
  {
    id: 'annihilape', dex: 979, name: 'Annihilape', gen: 9,
    types: ['fighting', 'ghost'], role: 'Rage Fist Unstoppable Titan',
    stats: { hp: 110, atk: 115, def: 80, spa: 50, spd: 90, spe: 90 },
    abilities: ['Defiant', 'Vital Spirit'], bestNature: 'Careful / Jolly',
    bestMoves: ['rage-fist', 'drain-punch', 'close-combat', 'ice-punch', 'stealth-rock', 'u-turn'],
    bestItems: ['leftovers', 'sitrus-berry', 'punching-glove'],
    bestTera: 'water'
  },
  {
    id: 'clodsire', dex: 980, name: 'Clodsire', gen: 9,
    types: ['poison', 'ground'], role: 'Water Absorb / Unaware Special Wall',
    stats: { hp: 130, atk: 75, def: 60, spa: 45, spd: 100, spe: 20 },
    abilities: ['Water Absorb', 'Unaware'], bestNature: 'Careful (+SpD, -SpA)',
    bestMoves: ['earthquake', 'poison-jab', 'recover', 'toxic', 'stealth-rock'],
    bestItems: ['black-sludge', 'leftovers', 'heavy-duty-boots'],
    bestTera: 'dark'
  },
  {
    id: 'kingambit', dex: 983, name: 'Kingambit', gen: 9,
    types: ['dark', 'steel'], role: 'Supreme Overlord Late-Game Cleaner',
    stats: { hp: 100, atk: 135, def: 120, spa: 60, spd: 85, spe: 50 },
    abilities: ['Supreme Overlord', 'Defiant'], bestNature: 'Adamant (+Atk, -SpA)',
    bestMoves: ['kowtow-cleave', 'sucker-punch', 'iron-head', 'swords-dance', 'brick-break'],
    bestItems: ['leftovers', 'black-glasses', 'lum-berry', 'assault-vest'],
    bestTera: 'flying'
  },
  {
    id: 'great-tusk', dex: 984, name: 'Great Tusk', gen: 9,
    types: ['ground', 'fighting'], role: 'Protosynthesis Physical Titan',
    stats: { hp: 115, atk: 131, def: 131, spa: 53, spd: 53, spe: 87 },
    abilities: ['Protosynthesis'], bestNature: 'Jolly (+Spe, -SpA)',
    bestMoves: ['headlong-rush', 'close-combat', 'knock-off', 'ice-spinner', 'earthquake', 'stealth-rock'],
    bestItems: ['booster-energy', 'leftovers', 'rocky-helmet'],
    bestTera: 'steel'
  },
  {
    id: 'flutter-mane', dex: 987, name: 'Flutter Mane', gen: 9,
    types: ['ghost', 'fairy'], role: 'Protosynthesis Special Uber Sweeper',
    stats: { hp: 55, atk: 55, def: 55, spa: 135, spd: 135, spe: 135 },
    abilities: ['Protosynthesis'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['moonblast', 'shadow-ball', 'mystical-fire', 'calm-mind', 'thunderbolt', 'psyshock'],
    bestItems: ['booster-energy', 'choice-specs', 'focus-sash'],
    bestTera: 'fairy'
  },
  {
    id: 'baxcalibur', dex: 998, name: 'Baxcalibur', gen: 9,
    types: ['dragon', 'ice'], role: 'Thermal Exchange Pseudo-Legendary',
    stats: { hp: 115, atk: 145, def: 92, spa: 75, spd: 86, spe: 87 },
    abilities: ['Thermal Exchange'], bestNature: 'Jolly / Adamant',
    bestMoves: ['glaive-rush', 'icicle-spear', 'ice-shard', 'earthquake', 'dragon-dance', 'icicle-crash'],
    bestItems: ['loaded-dice', 'heavy-duty-boots', 'never-melt-ice'],
    bestTera: 'ground'
  },
  {
    id: 'gholdengo', dex: 1000, name: 'Gholdengo', gen: 9,
    types: ['steel', 'ghost'], role: 'Good as Gold Status-Immune Sweeper',
    stats: { hp: 87, atk: 60, def: 95, spa: 133, spd: 91, spe: 84 },
    abilities: ['Good as Gold'], bestNature: 'Timid (+Spe, -Atk)',
    bestMoves: ['make-it-rain', 'shadow-ball', 'nasty-plot', 'recover', 'thunderbolt', 'focus-blast'],
    bestItems: ['air-balloon', 'leftovers', 'choice-scarf'],
    bestTera: 'flying'
  },
  {
    id: 'iron-valiant', dex: 1006, name: 'Iron Valiant', gen: 9,
    types: ['fairy', 'fighting'], role: 'Quark Drive Mixed Speedster',
    stats: { hp: 74, atk: 130, def: 90, spa: 120, spd: 60, spe: 116 },
    abilities: ['Quark Drive'], bestNature: 'Naive / Timid',
    bestMoves: ['moonblast', 'close-combat', 'knock-off', 'thunderbolt', 'swords-dance', 'calm-mind', 'spirit-break'],
    bestItems: ['booster-energy', 'life-orb'],
    bestTera: 'electric'
  }
];

// ============================================================================
// TEMPLATES DE EQUIPES CAMPEÃS RECOMENDADAS POR JOGO (INCLUINDO UNBOUND E LAZARUS)
// ============================================================================
window.POKE_DATA.PRESET_TEAMS = {
  'gen1-rb': {
    name: 'Kanto Clássica Campeã (Red/Blue)',
    members: [
      { id: 'venusaur' }, { id: 'starmie' }, { id: 'alakazam' },
      { id: 'snorlax' }, { id: 'nidoking' }, { id: 'zapdos' }
    ]
  },
  'gen1-yellow': {
    name: 'Trio Kanto + Pikachu (Yellow)',
    members: [
      { id: 'pikachu' }, { id: 'charizard' }, { id: 'blastoise' },
      { id: 'venusaur' }, { id: 'nidoking' }, { id: 'snorlax' }
    ]
  },
  'gen2-gsc': {
    name: 'Lendas de Johto (Gold/Silver/Crystal)',
    members: [
      { id: 'feraligatr' }, { id: 'ampharos' }, { id: 'heracross' },
      { id: 'espeon' }, { id: 'crobat' }, { id: 'tyranitar' }
    ]
  },
  'gen3-rse': {
    name: 'Sinergia Suprema de Hoenn (Emerald)',
    members: [
      { id: 'swampert' }, { id: 'gardevoir' }, { id: 'breloom' },
      { id: 'salamence' }, { id: 'manectric' }, { id: 'metagross' }
    ]
  },
  'gen3-frlg': {
    name: 'Kanto Reforçada (FireRed/LeafGreen)',
    members: [
      { id: 'charizard' }, { id: 'starmie' }, { id: 'jolteon' },
      { id: 'nidoking' }, { id: 'snorlax' }, { id: 'alakazam' }
    ]
  },
  'gen4-dpp': {
    name: 'Esquadrão Anti-Cynthia (Platinum)',
    members: [
      { id: 'infernape' }, { id: 'garchomp' }, { id: 'staraptor' },
      { id: 'roserade' }, { id: 'weavile' }, { id: 'gyarados' }
    ]
  },
  'gen4-hgss': {
    name: 'Campeões de Johto & Kanto (HGSS)',
    members: [
      { id: 'feraligatr' }, { id: 'ampharos' }, { id: 'heracross' },
      { id: 'arcanine' }, { id: 'mamoswine' }, { id: 'dragonite' }
    ]
  },
  'gen5-bw': {
    name: 'Domínio de Unova (Black/White)',
    members: [
      { id: 'samurott' }, { id: 'excadrill' }, { id: 'darmanitan' },
      { id: 'krookodile' }, { id: 'ferrothorn' }, { id: 'haxorus' }
    ]
  },
  'gen5-b2w2': {
    name: 'All-Stars de Unova (Black 2/White 2)',
    members: [
      { id: 'lucario' }, { id: 'excadrill' }, { id: 'magnezone' },
      { id: 'starmie' }, { id: 'volcarona' }, { id: 'krookodile' }
    ]
  },
  'gen6-xy': {
    name: 'Dupla Mega Kalos (X/Y)',
    members: [
      { id: 'greninja' }, { id: 'charizard', mechanic: 'mega' }, { id: 'aegislash' },
      { id: 'sylveon' }, { id: 'garchomp' }, { id: 'venusaur' }
    ]
  },
  'gen6-oras': {
    name: 'Mega Hoenn Suprema (ORAS)',
    members: [
      { id: 'swampert', mechanic: 'mega' }, { id: 'gardevoir' }, { id: 'breloom' },
      { id: 'metagross' }, { id: 'talonflame' }, { id: 'salamence' }
    ]
  },
  'gen7-sm-usum': {
    name: 'Guardiões de Alola (USUM)',
    members: [
      { id: 'primarina', mechanic: 'zmove' }, { id: 'magnezone' }, { id: 'mimikyu' },
      { id: 'hawlucha' }, { id: 'salazzle' }, { id: 'mudsdale' }
    ]
  },
  'gen7-lgpe': {
    name: "Mestres de Kanto (Let's Go)",
    members: [
      { id: 'pikachu' }, { id: 'charizard', mechanic: 'mega' }, { id: 'starmie' },
      { id: 'venusaur' }, { id: 'nidoking' }, { id: 'snorlax' }
    ]
  },
  'gen8-swsh': {
    name: 'Campeões Dynamax de Galar (Sword/Shield)',
    members: [
      { id: 'cinderace', mechanic: 'dynamax' }, { id: 'corviknight' }, { id: 'dragapult' },
      { id: 'excadrill' }, { id: 'toxtricity' }, { id: 'gyarados' }
    ]
  },
  'gen8-bdsp': {
    name: 'Sinnoh Grand Underground (BDSP)',
    members: [
      { id: 'infernape' }, { id: 'garchomp' }, { id: 'togekiss' },
      { id: 'azumarill' }, { id: 'roserade' }, { id: 'magnezone' }
    ]
  },
  'gen8-pla': {
    name: 'Relíquias de Hisui (Legends: Arceus)',
    members: [
      { id: 'typhlosion-hisui' }, { id: 'ursaluna' }, { id: 'goodra-hisui' },
      { id: 'zoroark-hisui' }, { id: 'samurott-hisui' }, { id: 'togekiss' }
    ]
  },
  'gen9-sv': {
    name: 'Tera Meta de Paldea (Scarlet/Violet)',
    members: [
      { id: 'skeledirge', mechanic: 'tera', teraType: 'fairy' },
      { id: 'great-tusk' },
      { id: 'gholdengo' },
      { id: 'kingambit' },
      { id: 'baxcalibur' },
      { id: 'iron-valiant' }
    ]
  },
  'gen9-lza': {
    name: 'Mega Lumiose (Legends: Z-A)',
    members: [
      { id: 'feraligatr' }, { id: 'lucario', mechanic: 'mega' }, { id: 'gardevoir' },
      { id: 'garchomp' }, { id: 'chandelure' }, { id: 'aegislash' }
    ]
  },
  'fangame-unbound': {
    name: 'Borrius Insane/Expert Meta (Pokémon Unbound)',
    members: [
      { id: 'metagross', mechanic: 'mega' },
      { id: 'garchomp' },
      { id: 'greninja', mechanic: 'zmove' },
      { id: 'togekiss' },
      { id: 'volcarona' },
      { id: 'ferrothorn' }
    ]
  },
  'fangame-lazarus': {
    name: 'Sinergia Suprema (Pokémon Lazarus)',
    members: [
      { id: 'charizard', mechanic: 'mega' },
      { id: 'feraligatr' },
      { id: 'gardevoir' },
      { id: 'excadrill' },
      { id: 'annihilape' },
      { id: 'kingambit', mechanic: 'tera', teraType: 'flying' }
    ]
  }
};
