/**
 * GPS POKÉMON — SISTEMA CARTOGRÁFICO TÁTICO (KANTO, JOHTO & HOENN — GEN 1 A GEN 3)
 * - Jogos suportados: Red & Blue, Yellow, Gold/Silver/Crystal, Ruby/Sapphire/Emerald, FireRed/LeafGreen
 * - Modos do GPS: "Pesquisa de Pokémon" (Encontros & Spawns) e "Pesquisa de Itens & TMs" (Held Items, TMs/HMs, Pedras)
 * - Integração direta com o Pokémon Team Recommendations (PTR) via parâmetros de URL (?game=...&mode=items&q=...)
 */

const GAME_GPS_CONFIG = {
  rb: {
    id: "rb",
    name: "Pokémon Red & Blue (Gen 1 - Kanto)",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Red", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "Blue", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  yellow: {
    id: "yellow",
    name: "Pokémon Yellow (Gen 1 - Kanto)",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "both", label: "Special Pikachu Edition (Yellow)", activeClass: "bg-secondary-container/30 text-secondary border border-secondary/50" }
    ]
  },
  gsc: {
    id: "gsc",
    name: "Pokémon Gold, Silver & Crystal (Gen 2 - Johto)",
    region: "Johto",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Gold", activeClass: "bg-secondary-container/35 text-secondary border border-secondary/50" },
      { key: "blue", label: "Silver", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Gold / Silver / Crystal", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  rse: {
    id: "rse",
    name: "Pokémon Ruby, Sapphire & Emerald (Gen 3 - Hoenn)",
    region: "Hoenn",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Ruby", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "Sapphire", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Ruby / Sapphire / Emerald", activeClass: "bg-tertiary-container/30 text-tertiary border border-tertiary/50" }
    ]
  },
  frlg: {
    id: "frlg",
    name: "Pokémon FireRed & LeafGreen (Gen 3 - Kanto)",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "FireRed", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "LeafGreen", activeClass: "bg-tertiary-container/30 text-tertiary border border-tertiary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  }
};

// Mapeamento dos IDs de jogos do PTR (index.html) para o GPS Pokémon
const PTR_GAME_ID_MAP = {
  "gen1-rb": "rb",
  "gen1-yellow": "yellow",
  "gen2-gsc": "gsc",
  "gen3-rse": "rse",
  "gen3-frlg": "frlg",
  "gen4-hgss": "gsc",
  "gen6-oras": "rse",
  "gen7-lgpe": "yellow"
};

const TYPE_BADGE_STYLES = {
  "Normal": "bg-slate-500/20 text-slate-200 border-slate-500/40",
  "Fogo": "bg-orange-500/20 text-orange-300 border-orange-500/40",
  "Água": "bg-sky-500/20 text-sky-300 border-sky-500/40",
  "Planta": "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  "Elétrico": "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
  "Gelo": "bg-cyan-400/20 text-cyan-200 border-cyan-400/40",
  "Lutador": "bg-rose-600/20 text-rose-300 border-rose-500/40",
  "Veneno": "bg-purple-500/20 text-purple-300 border-purple-500/40",
  "Terra": "bg-amber-600/20 text-amber-300 border-amber-500/40",
  "Voador": "bg-indigo-400/20 text-indigo-200 border-indigo-400/40",
  "Psíquico": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  "Inseto": "bg-lime-500/20 text-lime-300 border-lime-500/40",
  "Pedra": "bg-yellow-700/25 text-amber-200 border-yellow-600/40",
  "Fantasma": "bg-violet-600/25 text-violet-300 border-violet-500/40",
  "Dragão": "bg-indigo-600/25 text-indigo-300 border-indigo-500/40",
  "Aço": "bg-slate-400/25 text-slate-200 border-slate-400/40",
  "Noturno": "bg-neutral-700/40 text-neutral-200 border-neutral-500/40"
};

const ITEM_CATEGORY_META = {
  tm: { label: "💿 TM / HM (Ataque)", badgeClass: "bg-primary-container/25 text-primary border-primary/40" },
  held: { label: "🎒 Item Segurado (Held)", badgeClass: "bg-secondary-container/25 text-secondary border-secondary/40" },
  stone: { label: "💎 Pedra / Evolução", badgeClass: "bg-tertiary-container/25 text-tertiary border-tertiary/40" },
  key: { label: "🔑 Item Chave / Especial", badgeClass: "bg-purple-500/20 text-purple-300 border-purple-500/40" }
};

// ============================================================================
// 1. DADOS DE KANTO (RED/BLUE, YELLOW & FIRERED/LEAFGREEN)
// ============================================================================
const KANTO_AREAS = [
  {
    id: "route-1",
    name: "Pallet Town & Rota 1",
    sector: "Setor Kanto 01",
    category: "route",
    connections: "Pallet Town (Sul) ⇄ Viridian City (Norte)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Voador",
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 5", rateRed: 50, rateBlue: 50, highlight: "Mais Comum" },
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 50, rateBlue: 50 },
      { id: 1, name: "Bulbasaur", types: ["Planta", "Veneno"], method: "static", methodLabel: "🎁 Inicial do Prof. Oak (Pallet) / Presente em Cerulean (Yellow)", levels: "Lv. 5 — 10", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 4, name: "Charmander", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial do Prof. Oak (Pallet) / Rota 24 (Yellow)", levels: "Lv. 5 — 10", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 7, name: "Squirtle", types: ["Água"], method: "static", methodLabel: "🎁 Inicial do Prof. Oak (Pallet) / Vermilion (Yellow)", levels: "Lv. 5 — 10", rateRed: 100, rateBlue: 100, recommended: true }
    ],
    items: [
      { name: "Potion", category: "key", icon: "🧪", how: "Fale com o funcionário do Poké Mart no meio da Rota 1 para ganhar uma amostra grátis." },
      { name: "Town Map", category: "key", icon: "🗺️", how: "Entregue pela irmã do Rival (Daisy Oak) em Pallet Town após entregar o Oak's Parcel." }
    ]
  },
  {
    id: "route-22",
    name: "Viridian City & Rota 22",
    sector: "Setor Oeste Liga",
    category: "route",
    connections: "Viridian City (Leste) ⇄ Portão da Liga Pokémon (Oeste)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Lutador / Veneno",
    encounters: [
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 50, rateBlue: 50 },
      { id: 29, name: "Nidoran♀", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 5, rateBlue: 45 },
      { id: 32, name: "Nidoran♂", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 45, rateBlue: 5, recommended: true },
      { id: 56, name: "Mankey", types: ["Lutador"], method: "grass", methodLabel: "🌿 Grama Alta (Yellow / FRLG)", levels: "Lv. 2 — 5", rateRed: 20, rateBlue: 20, highlight: "Ótimo vs Brock", recommended: true },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 10, rateBlue: 10 },
      { id: 60, name: "Poliwag", types: ["Água"], method: "fish", methodLabel: "🎣 Good Rod", levels: "Lv. 10", rateRed: 50, rateBlue: 50 }
    ],
    items: [
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Prêmio do Líder Giovanni no Ginásio de Viridian City (FRLG) / Silph Co. 10F (Red/Blue/Yellow)." },
      { name: "TM27 — Fissure", move: "Fissure", moveType: "Terra", category: "tm", icon: "💿", how: "Prêmio de Giovanni no Ginásio de Viridian City (Red/Blue/Yellow)." },
      { name: "TM42 — Dream Eater", move: "Dream Eater", moveType: "Psíquico", category: "tm", icon: "💿", how: "Homem adormecido no canto sudoeste de Viridian City (requer Cut ou Surf)." },
      { name: "Macho Brace", category: "held", icon: "🏋️", how: "No chão onde Giovanni estava no Ginásio de Viridian City após derrotá-lo (FireRed/LeafGreen)." }
    ]
  },
  {
    id: "route-2",
    name: "Rota 2",
    sector: "Setor Kanto 02",
    category: "route",
    connections: "Viridian City (Sul) ⇄ Viridian Forest ⇄ Pewter City (Norte)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Inseto / Voador",
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 40, rateBlue: 40 },
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 5", rateRed: 45, rateBlue: 45 },
      { id: 10, name: "Caterpie", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 0, rateBlue: 15 },
      { id: 13, name: "Weedle", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 15, rateBlue: 0 },
      { id: 122, name: "Mr. Mime", types: ["Psíquico"], method: "static", methodLabel: "🎁 Troca NPC (Por Abra / Clefairy)", levels: "Lv. 6 — 30", rateRed: 100, rateBlue: 100, recommended: true }
    ],
    items: [
      { name: "HM05 — Flash", move: "Flash", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Assistente do Prof. Oak no portão leste da Rota 2 (requer 10 Pokémon na Pokédex)." },
      { name: "Moon Stone", category: "stone", icon: "🌙", how: "Item no corredor leste da Rota 2 (acessível usando Cut ao sul de Pewter City)." },
      { name: "HP Up", category: "key", icon: "💊", how: "Item no corredor leste da Rota 2 (requer Cut)." }
    ]
  },
  {
    id: "viridian-forest",
    name: "Viridian Forest",
    sector: "Setor Kanto 02 — Zona Especial",
    category: "special",
    connections: "Rota 2 Sul (Viridian) ⇄ Rota 2 Norte (Pewter City)",
    levelRange: "Lv. 3 — 6",
    dominantTypes: "Inseto / Veneno / Elétrico",
    encounters: [
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 5, rateBlue: 5, highlight: "⚡ Ultra Raro (5%)", recommended: true },
      { id: 10, name: "Caterpie", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 5, rateBlue: 45 },
      { id: 11, name: "Metapod", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 4 — 6", rateRed: 5, rateBlue: 40 },
      { id: 13, name: "Weedle", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 45, rateBlue: 5 },
      { id: 14, name: "Kakuna", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 4 — 6", rateRed: 40, rateBlue: 5 },
      { id: 17, name: "Pidgeotto", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta (Exclusivo Yellow)", levels: "Lv. 9", rateRed: 1, rateBlue: 1, highlight: "1% em Yellow" }
    ],
    items: [
      { name: "Light Ball", category: "held", icon: "⚡", how: "Segurado por Pikachu selvagens (5% de chance) ou transferido do Pikachu inicial." },
      { name: "Antidote", category: "key", icon: "🧪", how: "Pokébola no caminho leste de Viridian Forest." },
      { name: "Potion", category: "key", icon: "🧪", how: "Item oculto diante do último Bug Catcher antes da saída norte para Pewter City." }
    ]
  },
  {
    id: "route-3",
    name: "Pewter City & Rota 3",
    sector: "Setor Montanhoso 03",
    category: "route",
    connections: "Pewter City (Oeste) ⇄ Entrada do Mt. Moon (Leste)",
    levelRange: "Lv. 3 — 9",
    dominantTypes: "Voador / Normal / Lutador",
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 8", rateRed: 45, rateBlue: 45 },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 5 — 8", rateRed: 45, rateBlue: 45 },
      { id: 39, name: "Jigglypuff", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 7", rateRed: 10, rateBlue: 10, highlight: "Raro (10%)", recommended: true },
      { id: 56, name: "Mankey", types: ["Lutador"], method: "grass", methodLabel: "🌿 Grama Alta (Red / FRLG)", levels: "Lv. 6 — 8", rateRed: 15, rateBlue: 15 },
      { id: 129, name: "Magikarp", types: ["Água"], method: "static", methodLabel: "🎁 Vendedor do PokéCenter (₽500)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true }
    ],
    items: [
      { name: "TM39 — Rock Tomb", move: "Rock Tomb", moveType: "Pedra", category: "tm", icon: "💿", how: "Prêmio do Líder Brock no Ginásio de Pewter City (FireRed/LeafGreen)." },
      { name: "TM34 — Bide", move: "Bide", moveType: "Normal", category: "tm", icon: "💿", how: "Prêmio do Líder Brock no Ginásio de Pewter City (Red/Blue/Yellow)." },
      { name: "Old Amber (Aerodactyl)", category: "key", icon: "🪨", how: "Nos fundos do Museu de Ciência de Pewter City (requer Cut na lateral leste do Museu)." },
      { name: "Running Shoes", category: "key", icon: "👟", how: "Entregue pelo Assistente do Prof. Oak na saída leste de Pewter City rumo à Rota 3 (FRLG)." }
    ]
  },
  {
    id: "mt-moon",
    name: "Mt. Moon",
    sector: "Setor Subterrâneo 01",
    category: "cave",
    connections: "Rota 3 (Oeste) ⇄ Rota 4 / Cerulean City (Leste)",
    levelRange: "Lv. 6 — 12",
    dominantTypes: "Pedra / Terra / Normal / Veneno",
    encounters: [
      { id: 41, name: "Zubat", types: ["Veneno", "Voador"], method: "cave", methodLabel: "⛰️ Caverna (1F a B2F)", levels: "Lv. 6 — 11", rateRed: 79, rateBlue: 79 },
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Caverna (1F a B2F)", levels: "Lv. 7 — 10", rateRed: 15, rateBlue: 15 },
      { id: 46, name: "Paras", types: ["Inseto", "Planta"], method: "cave", methodLabel: "⛰️ Caverna (B2F: 100% nas escadas)", levels: "Lv. 8 — 12", rateRed: 5, rateBlue: 5, recommended: true },
      { id: 35, name: "Clefairy", types: ["Normal"], method: "cave", methodLabel: "⛰️ Caverna (1% no 1F / 6% no B2F)", levels: "Lv. 8 — 12", rateRed: 6, rateBlue: 6, highlight: "⚡ Raro (1%–6%)", recommended: true },
      { id: 138, name: "Omanyte (Helix Fossil)", types: ["Pedra", "Água"], method: "static", methodLabel: "🎁 Escolha de Fóssil (B2F)", levels: "Lv. 30 (Cinnabar)", rateRed: 100, rateBlue: 100 },
      { id: 140, name: "Kabuto (Dome Fossil)", types: ["Pedra", "Água"], method: "static", methodLabel: "🎁 Escolha de Fóssil (B2F)", levels: "Lv. 30 (Cinnabar)", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "Moon Stone", category: "stone", icon: "🌙", how: "2 unidades no Mt. Moon: 1F (canto noroeste) e oculta na rocha antes dos fósseis no B2F." },
      { name: "TM01 — Mega Punch / Focus Punch", move: "Mega Punch", moveType: "Normal", category: "tm", icon: "💿", how: "Andar B2F do Mt. Moon (Red/Blue) ou Silph Co. 5F (FRLG)." },
      { name: "TM12 — Water Gun", move: "Water Gun", moveType: "Água", category: "tm", icon: "💿", how: "Andar 1F do Mt. Moon (canto sudoeste, em Red/Blue/Yellow)." },
      { name: "TM46 — Thief", move: "Thief", moveType: "Noturno", category: "tm", icon: "💿", how: "Andar B2F do Mt. Moon (FireRed/LeafGreen)." },
      { name: "Helix Fossil / Dome Fossil", category: "key", icon: "🐚", how: "Escolha um dos dois fósseis após vencer o Super Nerd no final do andar B2F." }
    ]
  },
  {
    id: "route-4",
    name: "Rota 4",
    sector: "Setor Kanto 04",
    category: "route",
    connections: "Saída do Mt. Moon (Oeste) ⇄ Cerulean City (Leste)",
    levelRange: "Lv. 6 — 12",
    dominantTypes: "Veneno / Terra / Voador",
    encounters: [
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 40, rateBlue: 40 },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 35, rateBlue: 35 },
      { id: 23, name: "Ekans", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 12", rateRed: 25, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed" },
      { id: 27, name: "Sandshrew", types: ["Terra"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 12", rateRed: 0, rateBlue: 25, versionTag: "🔵 Exclusivo Blue/LeafGreen", recommended: true }
    ],
    items: [
      { name: "TM05 — Roar", move: "Roar", moveType: "Normal", category: "tm", icon: "💿", how: "A leste da saída do Mt. Moon na Rota 4 (FireRed/LeafGreen) / Mega Kick (Red/Blue)." },
      { name: "Mega Punch & Mega Kick (Move Tutors)", move: "Mega Kick", moveType: "Normal", category: "tm", icon: "🥊", how: "Dois lutadores de karatê na saída do Mt. Moon ensinam Mega Punch e Mega Kick (FRLG)." }
    ]
  },
  {
    id: "route-24-25",
    name: "Cerulean City & Rotas 24–25",
    sector: "Setor Norte Cerulean",
    category: "route",
    connections: "Cerulean City (Sul) ⇄ Nugget Bridge ⇄ Casa do Bill",
    levelRange: "Lv. 7 — 14",
    dominantTypes: "Psíquico / Planta / Água",
    encounters: [
      { id: 63, name: "Abra", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 15, rateBlue: 15, highlight: "🎯 Cuidado: Usa Teleport!", recommended: true },
      { id: 43, name: "Oddish", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 14", rateRed: 25, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed", recommended: true },
      { id: 69, name: "Bellsprout", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 14", rateRed: 0, rateBlue: 25, versionTag: "🔵 Exclusivo Blue/LeafGreen", recommended: true },
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 13", rateRed: 20, rateBlue: 20 },
      { id: 124, name: "Jynx (Zynx)", types: ["Gelo", "Psíquico"], method: "static", methodLabel: "🎁 Troca NPC em Cerulean City (Por Poliwhirl)", levels: "Lv. 20", rateRed: 100, rateBlue: 100, recommended: true }
    ],
    items: [
      { name: "TM03 — Water Pulse", move: "Water Pulse", moveType: "Água", category: "tm", icon: "💿", how: "Prêmio da Líder Misty no Ginásio de Cerulean City (FireRed/LeafGreen)." },
      { name: "TM11 — BubbleBeam", move: "BubbleBeam", moveType: "Água", category: "tm", icon: "💿", how: "Prêmio da Líder Misty no Ginásio de Cerulean City (Red/Blue/Yellow)." },
      { name: "TM28 — Dig", move: "Dig", moveType: "Terra", category: "tm", icon: "💿", how: "Derrote o capanga da Equipe Rocket atrás da casa invadida em Cerulean City." },
      { name: "TM45 — Thunder Wave / Attract", move: "Thunder Wave", moveType: "Elétrico", category: "tm", icon: "💿", how: "Planalto norte da Rota 24 após a Nugget Bridge." },
      { name: "TM19 — Seismic Toss", move: "Seismic Toss", moveType: "Lutador", category: "tm", icon: "💿", how: "Na Rota 25 atrás de um arbusto de Cut perto do Hiker (Red/Blue/Yellow)." },
      { name: "TwistedSpoon", category: "held", icon: "🥄", how: "Segurado por Abra selvagens (5% de chance) nas Rotas 24 e 25 (FRLG)." },
      { name: "Mystic Water / Miracle Seed / Charcoal", category: "held", icon: "💧", how: "Em FRLG, obtido no pós-game / tutor ou segurado na Sevii Island." },
      { name: "S.S. Ticket", category: "key", icon: "🎟️", how: "Entregue por Bill no Cabo de Cerulean (Rota 25) após ajudá-lo no teletransportador." }
    ]
  },
  {
    id: "route-5-6",
    name: "Rotas 5 & 6",
    sector: "Setor Central Sul",
    category: "route",
    connections: "Cerulean City (Norte) ⇄ Caminho Subterrâneo ⇄ Vermilion City (Sul)",
    levelRange: "Lv. 10 — 16",
    dominantTypes: "Planta / Lutador / Normal",
    encounters: [
      { id: 56, name: "Mankey", types: ["Lutador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 10 — 16", rateRed: 35, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 52, name: "Meowth", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 10 — 16", rateRed: 0, rateBlue: 35, versionTag: "🔵 Exclusivo Blue / Ambos em FRLG", recommended: true },
      { id: 43, name: "Oddish", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 40, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed" },
      { id: 69, name: "Bellsprout", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 0, rateBlue: 40, versionTag: "🔵 Exclusivo Blue/LeafGreen" },
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 25, rateBlue: 25 }
    ],
    items: [
      { name: "Day Care (Creche Pokémon)", category: "key", icon: "🥚", how: "Localizada ao centro da Rota 5, logo ao sul de Cerulean City." },
      { name: "Nidoran♀ / Nidoran♂ (Troca NPC)", category: "key", icon: "🔄", how: "No portão do Underground Path da Rota 5." }
    ]
  },
  {
    id: "digletts-cave",
    name: "Vermilion, Rota 11 & Diglett's Cave",
    sector: "Setor Vermilion Leste",
    category: "cave",
    connections: "Vermilion City ⇄ Rota 11 ⇄ Diglett's Cave ⇄ Rota 2",
    levelRange: "Lv. 15 — 31",
    dominantTypes: "Terra / Psíquico / Elétrico",
    encounters: [
      { id: 50, name: "Diglett", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave", levels: "Lv. 15 — 22", rateRed: 95, rateBlue: 95, recommended: true },
      { id: 51, name: "Dugtrio", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave", levels: "Lv. 29 — 31", rateRed: 5, rateBlue: 5, highlight: "⚡ 5% Boss Raro", recommended: true },
      { id: 96, name: "Drowzee", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 11 (Grama Alta)", levels: "Lv. 9 — 15", rateRed: 25, rateBlue: 25 },
      { id: 83, name: "Farfetch'd (Dux)", types: ["Normal", "Voador"], method: "static", methodLabel: "🎁 Troca NPC em Vermilion (Por Spearow)", levels: "Lv. 15", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Capitão do navio S.S. Anne no porto de Vermilion City." },
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio do Líder Lt. Surge em Vermilion (Red/Blue/Yellow) ou Cassino de Celadon (FRLG)." },
      { name: "TM34 — Shock Wave", move: "Shock Wave", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio do Líder Lt. Surge no Ginásio de Vermilion City (FireRed/LeafGreen)." },
      { name: "TM08 — Body Slam", move: "Body Slam", moveType: "Normal", category: "tm", icon: "💿", how: "Cabine do 1º andar do navio S.S. Anne (Red/Blue/Yellow) ou Move Tutor em Silph Co. (FRLG)." },
      { name: "TM31 — Brick Break", move: "Brick Break", moveType: "Lutador", category: "tm", icon: "💿", how: "Cabine do 1º andar do navio S.S. Anne em Vermilion City (FireRed/LeafGreen)." },
      { name: "TM44 — Rest", move: "Rest", moveType: "Psíquico", category: "tm", icon: "💿", how: "Andar B1F do navio S.S. Anne em Vermilion City." },
      { name: "Old Rod & Bike Voucher", category: "key", icon: "🎣", how: "Guru da Pesca e Presidente do Pokémon Fan Club em Vermilion City." },
      { name: "Itemfinder", category: "key", icon: "📡", how: "Assistente do Prof. Oak no 2º andar do portão da Rota 11 (requer 30 Pokémon na Pokédex)." }
    ]
  },
  {
    id: "rock-tunnel",
    name: "Rotas 9, 10 & Rock Tunnel",
    sector: "Setor Leste Montanhoso",
    category: "cave",
    connections: "Cerulean City (Oeste) ⇄ Rock Tunnel ⇄ Lavender Town (Sul)",
    levelRange: "Lv. 13 — 17",
    dominantTypes: "Pedra / Lutador / Elétrico",
    encounters: [
      { id: 66, name: "Machop", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Rock Tunnel (1F / B1F)", levels: "Lv. 15 — 17", rateRed: 15, rateBlue: 15 },
      { id: 95, name: "Onix", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Rock Tunnel (1F / B1F)", levels: "Lv. 13 — 17", rateRed: 6, rateBlue: 6, highlight: "Raro (6%)" },
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 15 — 17", rateRed: 35, rateBlue: 35 },
      { id: 41, name: "Zubat", types: ["Veneno", "Voador"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 15 — 16", rateRed: 44, rateBlue: 44 },
      { id: 100, name: "Voltorb", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 10 (Grama Alta)", levels: "Lv. 14 — 17", rateRed: 40, rateBlue: 40 }
    ],
    items: [
      { name: "TM30 — Teleport", move: "Teleport", moveType: "Psíquico", category: "tm", icon: "💿", how: "Canto sudoeste da Rota 9 (Red/Blue/Yellow)." },
      { name: "TM40 — Aerial Ace", move: "Aerial Ace", moveType: "Voador", category: "tm", icon: "💿", how: "Canto sudoeste da Rota 9 (FireRed/LeafGreen)." },
      { name: "Rock Slide (Move Tutor)", move: "Rock Slide", moveType: "Pedra", category: "tm", icon: "🪨", how: "Jovem treinador no final do Rock Tunnel ensina Rock Slide em FireRed/LeafGreen (ou TM48 no topo do Celadon Dept Store em RBY)." },
      { name: "Everstone", category: "held", icon: "🪨", how: "Assistente do Prof. Oak no PokéCenter da Rota 10 (requer 20 Pokémon na Pokédex em FRLG)." }
    ]
  },
  {
    id: "power-plant",
    name: "Power Plant (Usina Elétrica)",
    sector: "Setor Restrito Rota 10",
    category: "special",
    connections: "Acesso via Surf pela Rota 10 Norte",
    levelRange: "Lv. 20 — 50",
    dominantTypes: "Elétrico / Voador",
    encounters: [
      { id: 145, name: "Zapdos", types: ["Elétrico", "Voador"], method: "static", methodLabel: "🎁 Encontro Lendário Estático", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "⚡ LENDÁRIO LV. 50", recommended: true },
      { id: 125, name: "Electabuzz", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 33 — 36", rateRed: 5, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed", highlight: "Raro (5%)" },
      { id: 81, name: "Magnemite", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 21 — 35", rateRed: 35, rateBlue: 35 },
      { id: 82, name: "Magneton", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 32 — 35", rateRed: 10, rateBlue: 10 },
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 20 — 24", rateRed: 25, rateBlue: 25 }
    ],
    items: [
      { name: "TM25 — Thunder", move: "Thunder", moveType: "Elétrico", category: "tm", icon: "💿", how: "Canto sudeste da Power Plant (Usina Elétrica)." },
      { name: "TM33 — Reflect", move: "Reflect", moveType: "Psíquico", category: "tm", icon: "💿", how: "Power Plant (Red/Blue/Yellow) ou Celadon Dept. Store 2F (FRLG)." },
      { name: "Magnet", category: "held", icon: "🧲", how: "Segurado por Magneton selvagens na Power Plant (5% de chance em FRLG)." },
      { name: "Thunder Stone", category: "stone", icon: "⚡", how: "Sala nordeste da Power Plant (FireRed/LeafGreen) ou Celadon Dept. Store 4F." }
    ]
  },
  {
    id: "pokemon-tower",
    name: "Lavender Town & Pokémon Tower",
    sector: "Setor Espiritual 05",
    category: "special",
    connections: "Lavender Town (Requer Silph Scope p/ Identificar Fantasmas)",
    levelRange: "Lv. 13 — 24",
    dominantTypes: "Fantasma / Veneno / Terra",
    encounters: [
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Andares 3F a 7F", levels: "Lv. 13 — 19", rateRed: 85, rateBlue: 85, recommended: true },
      { id: 93, name: "Haunter", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Andares 5F a 7F", levels: "Lv. 20 — 24", rateRed: 6, rateBlue: 6, highlight: "Raro (6%)", recommended: true },
      { id: 104, name: "Cubone", types: ["Terra"], method: "cave", methodLabel: "⛰️ Andares 3F a 7F", levels: "Lv. 15 — 19", rateRed: 9, rateBlue: 9 }
    ],
    items: [
      { name: "Poké Flute", category: "key", icon: "🪈", how: "Entregue pelo Sr. Fuji em Lavender Town após resgatá-lo no 7º andar da Pokémon Tower." },
      { name: "Soothe Bell", category: "held", icon: "🔔", how: "Item oculto exatamente no piso onde o Sr. Fuji estava no 7º andar da Pokémon Tower (usar Itemfinder em FRLG)." },
      { name: "Cleanse Tag", category: "held", icon: "🏷️", how: "No 5º andar da Pokémon Tower, dentro da zona de cura espiritual." },
      { name: "Thick Club", category: "held", icon: "🦴", how: "Segurado por Cubone/Marowak selvagens (5% de chance em FRLG)." }
    ]
  },
  {
    id: "route-7-8",
    name: "Celadon, Saffron & Rotas 7–8",
    sector: "Setor Central Metropolitano",
    category: "route",
    connections: "Celadon City ⇄ Rota 7 ⇄ Saffron City ⇄ Rota 8 ⇄ Lavender Town",
    levelRange: "Lv. 15 — 22",
    dominantTypes: "Fogo / Planta / Psíquico",
    encounters: [
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 18 — 20", rateRed: 20, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed", recommended: true },
      { id: 37, name: "Vulpix", types: ["Fogo"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 18 — 20", rateRed: 0, rateBlue: 20, versionTag: "🔵 Exclusivo Blue/LeafGreen", recommended: true },
      { id: 133, name: "Eevee", types: ["Normal"], method: "static", methodLabel: "🎁 Celadon Mansion (Topo do Prédio)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "🎁 Presente Único", recommended: true },
      { id: 106, name: "Hitmonlee / Hitmonchan", types: ["Lutador"], method: "static", methodLabel: "🎁 Fighting Dojo (Saffron City)", levels: "Lv. 30", rateRed: 100, rateBlue: 100 },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "static", methodLabel: "🎁 Silph Co. 7F (Saffron City)", levels: "Lv. 15", rateRed: 100, rateBlue: 100, highlight: "🎁 Presente Silph Co.", recommended: true },
      { id: 137, name: "Porygon / Dratini / Scyther", types: ["Normal"], method: "static", methodLabel: "🎁 Prêmios do Celadon Game Corner", levels: "Lv. 18 — 26", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "Fire Stone, Water Stone, Thunder Stone & Leaf Stone", category: "stone", icon: "💎", how: "Vendidas livremente por ₽2.100 no 4º andar da Loja de Departamentos de Celadon City!" },
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Terraço do Celadon Dept. Store dando Fresh Water para a garotinha (Red/Blue/Yellow) ou Cassino de Celadon por 4.000 fichas (FRLG)." },
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Cassino de Celadon por 4.000 fichas (FireRed/LeafGreen) ou Ginásio de Vermilion (RBY)." },
      { name: "TM35 — Flamethrower", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "Cassino de Celadon por 4.000 fichas (FireRed/LeafGreen)." },
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Cassino de Celadon por 4.500 fichas (FireRed/LeafGreen)." },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Casa do Sr. Psychic no sudeste de Saffron City (entregue gratuitamente!)." },
      { name: "TM04 — Calm Mind", move: "Calm Mind", moveType: "Psíquico", category: "tm", icon: "💿", how: "Prêmio da Líder Sabrina no Ginásio de Saffron City (FireRed/LeafGreen)." },
      { name: "TM19 — Giga Drain", move: "Giga Drain", moveType: "Planta", category: "tm", icon: "💿", how: "Prêmio da Líder Erika no Ginásio de Celadon City (FRLG) / TM21 Mega Drain (RBY)." },
      { name: "TM15 — Hyper Beam", move: "Hyper Beam", moveType: "Normal", category: "tm", icon: "💿", how: "Loja de Prêmios do Cassino de Celadon City (5.500 fichas)." },
      { name: "TM16 — Light Screen & TM33 — Reflect & TM20 — Safeguard", move: "Light Screen", moveType: "Psíquico", category: "tm", icon: "💿", how: "Terraço da Loja de Departamentos de Celadon City (dê Fresh Water, Soda Pop e Lemonade para a garotinha em FRLG)." },
      { name: "TM48 — Rock Slide & TM49 — Tri Attack", move: "Rock Slide", moveType: "Pedra", category: "tm", icon: "💿", how: "Terraço da Loja de Departamentos de Celadon City (Red/Blue/Yellow)." },
      { name: "Master Ball", category: "key", icon: "🟣", how: "Entregue pelo Presidente da Silph Co. no 11º andar após derrotar Giovanni em Saffron City." },
      { name: "Silph Scope", category: "key", icon: "🔭", how: "Esconderijo da Equipe Rocket (Rocket Hideout B4F) abaixo do Cassino de Celadon." }
    ]
  },
  {
    id: "route-12-15",
    name: "Rotas 12 a 15 (Silence Bridge)",
    sector: "Setor Costeiro Leste",
    category: "route",
    connections: "Lavender Town (Norte) ⇄ Pier de Pesca ⇄ Fuchsia City (Sul)",
    levelRange: "Lv. 22 — 30",
    dominantTypes: "Normal / Planta / Água",
    encounters: [
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueio da Rota 12 (Poké Flute)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "💤 BOSS ESTÁTICO", recommended: true },
      { id: 132, name: "Ditto", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 13, 14 & 15", levels: "Lv. 23 — 26", rateRed: 10, rateBlue: 10, highlight: "Raro (10%)" },
      { id: 48, name: "Venonat", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 22 — 26", rateRed: 20, rateBlue: 20 },
      { id: 44, name: "Gloom", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 28 — 30", rateRed: 5, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed" },
      { id: 70, name: "Weepinbell", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 28 — 30", rateRed: 0, rateBlue: 5, versionTag: "🔵 Exclusivo Blue/LeafGreen" },
      { id: 98, name: "Krabby", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod", levels: "Lv. 15 — 25", rateRed: 50, rateBlue: 50 }
    ],
    items: [
      { name: "Leftovers", category: "held", icon: "🍎", how: "Use o Itemfinder exatamente no quadrado onde o Snorlax dormia na Rota 12 (e também na Rota 16) em FireRed/LeafGreen!" },
      { name: "Exp. Share (Exp. All)", category: "held", icon: "📡", how: "Assistente do Prof. Oak no 2º andar do portão da Rota 15 (requer 50 Pokémon registrados na Pokédex)." },
      { name: "Super Rod", category: "key", icon: "🎣", how: "Casa do Guru da Pesca na Rota 12 (ao sul de Lavender Town)." },
      { name: "TM16 — Pay Day / TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "Rota 12 (2º andar do portão norte em FRLG entrega TM27 Return; em RBY encontra-se TM16 Pay Day)." }
    ]
  },
  {
    id: "route-16-18",
    name: "Rotas 16 a 18 (Cycling Road)",
    sector: "Setor Oeste Cicloviário",
    category: "route",
    connections: "Celadon City (Norte) ⇄ Ciclovia ⇄ Fuchsia City (Sul)",
    levelRange: "Lv. 18 — 30",
    dominantTypes: "Normal / Voador",
    encounters: [
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueio da Rota 16 (Poké Flute)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "💤 BOSS ESTÁTICO", recommended: true },
      { id: 84, name: "Doduo", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta (Rota 16–18)", levels: "Lv. 18 — 26", rateRed: 35, rateBlue: 35, recommended: true },
      { id: 22, name: "Fearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 25 — 29", rateRed: 15, rateBlue: 15 },
      { id: 108, name: "Lickitung", types: ["Normal"], method: "static", methodLabel: "🎁 Troca NPC no Portão da Rota 18", levels: "Lv. 25", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Casa secreta no noroeste da Rota 16 (use Cut no arbusto antes do portão da Ciclovia)." },
      { name: "Leftovers (2ª Unidade)", category: "held", icon: "🍎", how: "Use o Itemfinder exatamente no quadrado onde o Snorlax dormia na Rota 16 (FireRed/LeafGreen)." },
      { name: "Sharp Beak", category: "held", icon: "🦅", how: "Segurado por Doduo/Fearow selvagens nas Rotas 16–18 (5% de chance em FRLG)." },
      { name: "Amulet Coin", category: "held", icon: "🪙", how: "Assistente do Prof. Oak no 2º andar do portão da Rota 16 (requer 40 Pokémon na Pokédex em FRLG)." }
    ]
  },
  {
    id: "safari-zone",
    name: "Fuchsia City & Safari Zone",
    sector: "Reserva Ecológica Kanto",
    category: "special",
    connections: "Fuchsia City ⇄ Safari Zone (4 Áreas + Secret House)",
    levelRange: "Lv. 22 — 33",
    dominantTypes: "Normal / Dragão / Terra / Planta",
    encounters: [
      { id: 128, name: "Tauros", types: ["Normal"], method: "grass", methodLabel: "🌿 Área 2 & 3", levels: "Lv. 26 — 28", rateRed: 4, rateBlue: 4, highlight: "👑 S+ TIER RARO (4%)", recommended: true },
      { id: 113, name: "Chansey", types: ["Normal"], method: "grass", methodLabel: "🌿 Área Central & 2", levels: "Lv. 23 — 26", rateRed: 4, rateBlue: 4, highlight: "💎 ULTRA RARO (1%–4%)", recommended: true },
      { id: 147, name: "Dratini", types: ["Dragão"], method: "fish", methodLabel: "🎣 Super Rod (Lagos do Safari)", levels: "Lv. 15 — 25", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 102, name: "Exeggcute", types: ["Planta", "Psíquico"], method: "grass", methodLabel: "🌿 Todas as Áreas", levels: "Lv. 24 — 27", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 111, name: "Rhyhorn", types: ["Terra", "Pedra"], method: "grass", methodLabel: "🌿 Todas as Áreas", levels: "Lv. 25 — 26", rateRed: 20, rateBlue: 20 },
      { id: 123, name: "Scyther", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Área Central & 1", levels: "Lv. 23 — 28", rateRed: 4, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed", highlight: "Raro (4%)" },
      { id: 127, name: "Pinsir", types: ["Inseto"], method: "grass", methodLabel: "🌿 Área Central & 1", levels: "Lv. 23 — 28", rateRed: 0, rateBlue: 4, versionTag: "🔵 Exclusivo Blue/LeafGreen", highlight: "Raro (4%)" },
      { id: 115, name: "Kangaskhan", types: ["Normal"], method: "grass", methodLabel: "🌿 Área 1 & 3", levels: "Lv. 25 — 28", rateRed: 4, rateBlue: 4, highlight: "Raro (4%)" }
    ],
    items: [
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Secret House no final da Área 3 (Oeste) da Safari Zone." },
      { name: "HM04 — Strength", move: "Strength", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Safari Warden em Fuchsia City ao devolver os Gold Teeth encontrados na Área 3 da Safari Zone." },
      { name: "TM06 — Toxic", move: "Toxic", moveType: "Veneno", category: "tm", icon: "💿", how: "Prêmio do Líder Koga no Ginásio de Fuchsia City!" },
      { name: "TM32 — Double Team", move: "Double Team", moveType: "Normal", category: "tm", icon: "💿", how: "Área 3 (Oeste) da Safari Zone (ou Cassino de Celadon)." },
      { name: "TM47 — Steel Wing", move: "Steel Wing", moveType: "Aço", category: "tm", icon: "💿", how: "Área 2 (Norte) da Safari Zone (FireRed/LeafGreen)." },
      { name: "Quick Claw", category: "held", icon: "🐾", how: "Área 2 (Norte) da Safari Zone (FireRed/LeafGreen)." },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Segurado por Chansey selvagens na Safari Zone (5% de chance em FRLG)." },
      { name: "Swords Dance (Move Tutor)", move: "Swords Dance", moveType: "Normal", category: "tm", icon: "⚔️", how: "Silph Co. 7F (Red/Blue TM03) ou Move Tutor na Sevii Island 7 (FRLG)." }
    ]
  },
  {
    id: "seafoam-islands",
    name: "Rotas 19, 20 & Seafoam Islands",
    sector: "Setor Marítimo Sul",
    category: "cave",
    connections: "Fuchsia City (Leste) ⇄ Ilhas Seafoam ⇄ Cinnabar Island (Oeste)",
    levelRange: "Lv. 25 — 50",
    dominantTypes: "Gelo / Água / Psíquico",
    encounters: [
      { id: 144, name: "Articuno", types: ["Gelo", "Voador"], method: "static", methodLabel: "🎁 Seafoam B4F (Encontro Lendário)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "❄️ LENDÁRIO LV. 50", recommended: true },
      { id: 120, name: "Staryu", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod (Rota 19–20 / Seafoam)", levels: "Lv. 15 — 30", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 86, name: "Seel", types: ["Água"], method: "cave", methodLabel: "⛰️ Seafoam Islands", levels: "Lv. 28 — 32", rateRed: 25, rateBlue: 25 },
      { id: 79, name: "Slowpoke", types: ["Água", "Psíquico"], method: "cave", methodLabel: "⛰️ Seafoam Islands", levels: "Lv. 28 — 30", rateRed: 15, rateBlue: 15 },
      { id: 72, name: "Tentacool", types: ["Água", "Veneno"], method: "surf", methodLabel: "🌊 Surf (Rotas 19, 20 & 21)", levels: "Lv. 5 — 40", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "Never-Melt Ice", category: "held", icon: "🧊", how: "Segurado por Dewgong selvagens nas Seafoam Islands (5% de chance em FRLG)." },
      { name: "Water Stone", category: "stone", icon: "💧", how: "Item oculto nas Seafoam Islands B4F (ou comprada em Celadon City)." }
    ]
  },
  {
    id: "pokemon-mansion",
    name: "Cinnabar, Pokémon Mansion & Rota 21",
    sector: "Setor Vulcânico Cinnabar",
    category: "special",
    connections: "Cinnabar Island (Ginásio + Laboratório + Mansion) ⇄ Rota 21",
    levelRange: "Lv. 28 — 40",
    dominantTypes: "Fogo / Veneno / Planta",
    encounters: [
      { id: 126, name: "Magmar", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Pokémon Mansion / Mt. Ember", levels: "Lv. 34 — 38", rateRed: 0, rateBlue: 10, versionTag: "🔵 Exclusivo Blue/LeafGreen", highlight: "Raro (10%)" },
      { id: 77, name: "Ponyta", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 28 — 36", rateRed: 30, rateBlue: 30 },
      { id: 109, name: "Koffing", types: ["Veneno"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 30 — 32", rateRed: 35, rateBlue: 5 },
      { id: 88, name: "Grimer", types: ["Veneno"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 30 — 32", rateRed: 5, rateBlue: 35 },
      { id: 114, name: "Tangela", types: ["Planta"], method: "grass", methodLabel: "🌿 Rota 21 (Grama Costeira)", levels: "Lv. 28 — 32", rateRed: 15, rateBlue: 15 },
      { id: 142, name: "Aerodactyl (Old Amber)", types: ["Pedra", "Voador"], method: "static", methodLabel: "🎁 Reviver no Lab de Cinnabar", levels: "Lv. 30", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "TM14 — Blizzard", move: "Blizzard", moveType: "Gelo", category: "tm", icon: "💿", how: "Subsolo (B1F) da Pokémon Mansion em Cinnabar Island!" },
      { name: "TM22 — Solar Beam", move: "Solar Beam", moveType: "Planta", category: "tm", icon: "💿", how: "Subsolo (B1F) da Pokémon Mansion em Cinnabar Island!" },
      { name: "TM38 — Fire Blast", move: "Fire Blast", moveType: "Fogo", category: "tm", icon: "💿", how: "Prêmio do Líder Blaine no Ginásio de Cinnabar Island!" },
      { name: "Secret Key", category: "key", icon: "🔑", how: "Subsolo (B1F) da Pokémon Mansion para destrancar o Ginásio de Cinnabar." },
      { name: "Metronome (TM35 / Move Tutor)", move: "Metronome", moveType: "Normal", category: "tm", icon: "☝️", how: "cientista na sala do meio do Laboratório de Cinnabar Island." }
    ]
  },
  {
    id: "victory-road",
    name: "Rota 23, Victory Road & Indigo Plateau",
    sector: "Setor Final — Indigo Plateau",
    category: "cave",
    connections: "Portão das 8 Insígnias ⇄ Victory Road ⇄ Liga Pokémon (Elite Four)",
    levelRange: "Lv. 26 — 50",
    dominantTypes: "Fogo / Pedra / Lutador / Veneno",
    encounters: [
      { id: 146, name: "Moltres", types: ["Fogo", "Voador"], method: "static", methodLabel: "🎁 Victory Road 2F (RBY) / Mt. Ember (FRLG)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "🔥 LENDÁRIO LV. 50", recommended: true },
      { id: 67, name: "Machoke", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 39 — 42", rateRed: 15, rateBlue: 15 },
      { id: 75, name: "Graveler", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 41 — 43", rateRed: 10, rateBlue: 10 },
      { id: 105, name: "Marowak", types: ["Terra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 40 — 43", rateRed: 5, rateBlue: 5 },
      { id: 24, name: "Arbok", types: ["Veneno"], method: "grass", methodLabel: "🌿 Rota 23 (Grama Alta)", levels: "Lv. 41", rateRed: 15, rateBlue: 0, versionTag: "🔴 Exclusivo Red/FireRed" },
      { id: 28, name: "Sandslash", types: ["Terra"], method: "grass", methodLabel: "🌿 Rota 23 (Grama Alta)", levels: "Lv. 41", rateRed: 0, rateBlue: 15, versionTag: "🔵 Exclusivo Blue/LeafGreen" }
    ],
    items: [
      { name: "TM02 — Dragon Claw", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "1º andar (1F) da Victory Road após empurrar a pedra com Strength (FireRed/LeafGreen)." },
      { name: "TM07 — Hail / Horn Drill", move: "Hail", moveType: "Gelo", category: "tm", icon: "💿", how: "2º andar (2F) da Victory Road (FireRed/LeafGreen)." },
      { name: "TM37 — Double-Edge / Egg Bomb", move: "Double-Edge", moveType: "Normal", category: "tm", icon: "💿", how: "3º andar da Victory Road (RBY) ou Move Tutor no final da Victory Road (FRLG)." },
      { name: "TM50 — Overheat / Sky Attack", move: "Overheat", moveType: "Fogo", category: "tm", icon: "💿", how: "Victory Road 1F (RBY: TM43 Sky Attack) / Pós-Game (FRLG)." },
      { name: "Black Belt", category: "held", icon: "🥋", how: "Segurado por Machoke na Victory Road (ou obtido com Bruno / Karate Master)." }
    ]
  },
  {
    id: "cerulean-cave",
    name: "Cerulean Cave (Unknown Dungeon)",
    sector: "Setor Pós-Game — Nível S+",
    category: "special",
    connections: "Noroeste de Cerulean City (Desbloqueado após vencer a Elite Four)",
    levelRange: "Lv. 46 — 70",
    dominantTypes: "Psíquico / Normal / Elétrico",
    encounters: [
      { id: 150, name: "Mewtwo", types: ["Psíquico"], method: "static", methodLabel: "🎁 Cerulean Cave B1F (Boss Final)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "👑 BOSS SUPREMO LV. 70", recommended: true },
      { id: 113, name: "Chansey", types: ["Normal"], method: "cave", methodLabel: "⛰️ Cerulean Cave (2F & B1F)", levels: "Lv. 56 — 64", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 132, name: "Ditto", types: ["Normal"], method: "cave", methodLabel: "⛰️ Cerulean Cave (B1F)", levels: "Lv. 55 — 67", rateRed: 15, rateBlue: 15 },
      { id: 26, name: "Raichu", types: ["Elétrico"], method: "cave", methodLabel: "⛰️ Cerulean Cave (1F & B1F)", levels: "Lv. 53 — 64", rateRed: 5, rateBlue: 5 },
      { id: 112, name: "Rhydon", types: ["Terra", "Pedra"], method: "cave", methodLabel: "⛰️ Cerulean Cave (1F & 2F)", levels: "Lv. 52 — 58", rateRed: 15, rateBlue: 15 }
    ],
    items: [
      { name: "PP Max & Ultra Balls", category: "key", icon: "✨", how: "Andares 2F e B1F da Cerulean Cave." },
      { name: "TM36 — Sludge Bomb", move: "Sludge Bomb", moveType: "Veneno", category: "tm", icon: "💿", how: "Rocket Warehouse nas Sevii Islands (Five Island) no Pós-Game de FireRed/LeafGreen." },
      { name: "King's Rock & Metal Coat", category: "held", icon: "👑", how: "Sevii Islands (Seven Island / Memorial Pillar) no Pós-Game de FireRed/LeafGreen." }
    ]
  }
];

// ============================================================================
// 2. DADOS DE JOHTO (GOLD, SILVER & CRYSTAL — GEN 2)
// ============================================================================
const JOHTO_AREAS = [
  {
    id: "johto-new-bark-29",
    name: "New Bark Town & Rota 29",
    sector: "Setor Johto Leste",
    category: "route",
    connections: "New Bark Town (Leste) ⇄ Rota 29 ⇄ Cherrygrove City (Oeste)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Voador / Planta",
    encounters: [
      { id: 152, name: "Chikorita", types: ["Planta"], method: "static", methodLabel: "🎁 Inicial do Lab. do Prof. Elm", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 155, name: "Cyndaquil", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial do Lab. do Prof. Elm", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 158, name: "Totodile", types: ["Água"], method: "static", methodLabel: "🎁 Inicial do Lab. do Prof. Elm", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 161, name: "Sentret", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 3", rateRed: 40, rateBlue: 40, timeTag: "☀️ Manhã / 🌤️ Dia" },
      { id: 163, name: "Hoothoot", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 3", rateRed: 85, rateBlue: 85, timeTag: "🌙 Noite" },
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 55, rateBlue: 55, timeTag: "☀️ Manhã / 🌤️ Dia" }
    ],
    items: [
      { name: "Mystic Water", category: "held", icon: "💧", how: "Entregue pelo pescador numa ilha ao centro de Cherrygrove City (requer Surf)." },
      { name: "Pink Bow (Polkadot Bow)", category: "held", icon: "🎀", how: "Entregue por Tuscany (irmã das terças-feiras) na Rota 29 após vencer Falkner." },
      { name: "Master Ball", category: "key", icon: "🟣", how: "Entregue pelo Prof. Elm em New Bark Town após conquistar a 8ª Insígnia de Johto." },
      { name: "Everstone", category: "held", icon: "🪨", how: "Entregue pelo Prof. Elm ao mostrar o Togepi chocado do Mistery Egg." }
    ]
  },
  {
    id: "johto-route-30-31",
    name: "Rotas 30, 31 & Dark Cave",
    sector: "Setor Sudeste Montanhoso",
    category: "route",
    connections: "Cherrygrove City (Sul) ⇄ Casa do Mr. Pokémon ⇄ Violet City (Oeste)",
    levelRange: "Lv. 2 — 6",
    dominantTypes: "Inseto / Pedra / Veneno",
    encounters: [
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Dark Cave / Rota 46", levels: "Lv. 2 — 4", rateRed: 60, rateBlue: 60, highlight: "Dominante vs Falkner & Bugsy", recommended: true },
      { id: 167, name: "Spinarak", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 4", rateRed: 30, rateBlue: 0, timeTag: "🌙 Noite", versionTag: "🟡 Exclusivo Gold" },
      { id: 165, name: "Ledyba", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 4", rateRed: 0, rateBlue: 30, timeTag: "☀️ Manhã", versionTag: "⚪ Exclusivo Silver" },
      { id: 69, name: "Bellsprout", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Rota 31", levels: "Lv. 4 — 5", rateRed: 20, rateBlue: 20 },
      { id: 206, name: "Dunsparce", types: ["Normal"], method: "cave", methodLabel: "⛰️ Dark Cave", levels: "Lv. 4", rateRed: 1, rateBlue: 1, highlight: "Ultra Raro (1%)" }
    ],
    items: [
      { name: "Exp. Share", category: "held", icon: "📡", how: "Entregue pelo Mr. Pokémon na Rota 30 ao trocar pela Red Scale (obtida do Gyarados Vermelho no Lake of Rage)." },
      { name: "TM50 — Nightmare", move: "Nightmare", moveType: "Fantasma", category: "tm", icon: "💿", how: "Entregue pelo guarda do portão da Rota 31 ao entregar a carta do guarda da Rota 35." },
      { name: "BlackGlasses", category: "held", icon: "🕶️", how: "Entregue por um homem no fundo da Dark Cave (entrada da Rota 45 usando Surf)." }
    ]
  },
  {
    id: "johto-violet-sprout",
    name: "Violet City, Sprout Tower & Ruins of Alph",
    sector: "Setor Histórico Central",
    category: "special",
    connections: "Rota 31 (Leste) ⇄ Violet City ⇄ Ruins of Alph / Rota 32 (Sul)",
    levelRange: "Lv. 3 — 10",
    dominantTypes: "Voador / Fantasma / Psíquico",
    encounters: [
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Sprout Tower (2F & 3F)", levels: "Lv. 3 — 6", rateRed: 85, rateBlue: 85, timeTag: "🌙 Noite", recommended: true },
      { id: 175, name: "Togepi (Ovo)", types: ["Normal"], method: "static", methodLabel: "🎁 Ovo do Assistente do Prof. Elm (PokéCenter)", levels: "Lv. 5", rateRed: 100, rateBlue: 100 },
      { id: 95, name: "Onix (Rocky)", types: ["Pedra", "Terra"], method: "static", methodLabel: "🎁 Troca NPC em Violet City (Por Bellsprout)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 201, name: "Unown", types: ["Psíquico"], method: "cave", methodLabel: "⛰️ Ruins of Alph (Após quebrar os puzzles)", levels: "Lv. 5", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM05 — Flash", move: "Flash", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Ancião Li no topo (3º andar) da Sprout Tower em Violet City." },
      { name: "TM31 — Mud-Slap", move: "Mud-Slap", moveType: "Terra", category: "tm", icon: "💿", how: "Prêmio do Líder Falkner no Ginásio de Violet City." },
      { name: "Miracle Seed", category: "held", icon: "🌱", how: "Entregue pelo homem bloqueando o Sudowoodo na Rota 32 norte após derrotar Falkner." }
    ]
  },
  {
    id: "johto-route-32-union",
    name: "Rota 32, Union Cave & Rota 33",
    sector: "Setor Costeiro Sul",
    category: "cave",
    connections: "Violet City (Norte) ⇄ Rota 32 ⇄ Union Cave ⇄ Azalea Town",
    levelRange: "Lv. 6 — 20",
    dominantTypes: "Água / Terra / Elétrico",
    encounters: [
      { id: 179, name: "Mareep", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 32 (Grama Alta)", levels: "Lv. 6", rateRed: 20, rateBlue: 20, highlight: "⚡ Melhor Elétrico de Johto", recommended: true },
      { id: 194, name: "Wooper", types: ["Água", "Terra"], method: "grass", methodLabel: "🌿 Rota 32 / Union Cave", levels: "Lv. 4 — 8", rateRed: 35, rateBlue: 35, timeTag: "🌙 Noite", recommended: true },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "static", methodLabel: "🎁 Union Cave B2F (Sextas-feiras c/ Surf)", levels: "Lv. 20", rateRed: 100, rateBlue: 100, highlight: "❄️ Sexta-feira Estático", recommended: true },
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Union Cave", levels: "Lv. 6 — 8", rateRed: 40, rateBlue: 40 },
      { id: 95, name: "Onix", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Union Cave", levels: "Lv. 6 — 8", rateRed: 10, rateBlue: 10 }
    ],
    items: [
      { name: "TM05 — Roar", move: "Roar", moveType: "Normal", category: "tm", icon: "💿", how: "Rota 32 norte (requer Cut no arbusto)." },
      { name: "TM39 — Swift", move: "Swift", moveType: "Normal", category: "tm", icon: "💿", how: "Andar B1F da Union Cave." },
      { name: "Poison Barb", category: "held", icon: "🦂", how: "Entregue por Frieda (irmã das sextas-feiras) atrás do PokéCenter da Rota 32." },
      { name: "Old Rod", category: "key", icon: "🎣", how: "Guru da Pesca dentro do Pokémon Center da Rota 32." }
    ]
  },
  {
    id: "johto-azalea-ilex",
    name: "Azalea Town, Slowpoke Well & Ilex Forest",
    sector: "Setor Florestal Sul",
    category: "special",
    connections: "Rota 33 ⇄ Azalea Town ⇄ Ilex Forest ⇄ Rota 34",
    levelRange: "Lv. 5 — 12",
    dominantTypes: "Inseto / Água / Planta",
    encounters: [
      { id: 79, name: "Slowpoke", types: ["Água", "Psíquico"], method: "cave", methodLabel: "⛰️ Slowpoke Well", levels: "Lv. 6 — 8", rateRed: 15, rateBlue: 15, recommended: true },
      { id: 214, name: "Heracross", types: ["Inseto", "Lutador"], method: "static", methodLabel: "🎁 Headbutt em Árvores (Azalea / Rota 33)", levels: "Lv. 10", rateRed: 30, rateBlue: 30, highlight: "👑 S+ TIER HEADBUTT", recommended: true },
      { id: 43, name: "Oddish", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Ilex Forest", levels: "Lv. 5 — 7", rateRed: 60, rateBlue: 60, timeTag: "🌙 Noite" },
      { id: 46, name: "Paras", types: ["Inseto", "Planta"], method: "grass", methodLabel: "🌿 Ilex Forest", levels: "Lv. 5 — 7", rateRed: 15, rateBlue: 15 }
    ],
    items: [
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo mestre do carvão na Ilex Forest ao capturar os Farfetch'd fugitivos." },
      { name: "Charcoal", category: "held", icon: "🔥", how: "Entregue na casa do mestre do carvão em Azalea Town após devolver os Farfetch'd." },
      { name: "King's Rock", category: "held", icon: "👑", how: "Andar B2F do Slowpoke Well em Azalea Town (requer Surf e Strength)." },
      { name: "TM02 — Headbutt", move: "Headbutt", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo jovem no meio da Ilex Forest (depois pode ser comprado na loja de Goldenrod)." },
      { name: "TM12 — Sweet Scent", move: "Sweet Scent", moveType: "Normal", category: "tm", icon: "💿", how: "Portão de saída norte da Ilex Forest para a Rota 34." },
      { name: "TM49 — Fury Cutter", move: "Fury Cutter", moveType: "Inseto", category: "tm", icon: "💿", how: "Prêmio do Líder Bugsy no Ginásio de Azalea Town." },
      { name: "TM18 — Rain Dance", move: "Rain Dance", moveType: "Água", category: "tm", icon: "💿", how: "Andar B2F do Slowpoke Well (requer Surf e Strength)." }
    ]
  },
  {
    id: "johto-goldenrod-34",
    name: "Rota 34, Goldenrod City & National Park",
    sector: "Metrópole de Johto",
    category: "route",
    connections: "Ilex Forest (Sul) ⇄ Rota 34 ⇄ Goldenrod City ⇄ Rota 35 & National Park",
    levelRange: "Lv. 10 — 16",
    dominantTypes: "Psíquico / Normal / Inseto",
    encounters: [
      { id: 63, name: "Abra", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 34 / 35 ou Game Corner (200 fichas)", levels: "Lv. 10 — 12", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 96, name: "Drowzee", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 34 & 35", levels: "Lv. 10 — 14", rateRed: 30, rateBlue: 30 },
      { id: 132, name: "Ditto", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 34 (Perto da Day Care)", levels: "Lv. 10", rateRed: 5, rateBlue: 5 },
      { id: 133, name: "Eevee", types: ["Normal"], method: "static", methodLabel: "🎁 Casa do Bill em Goldenrod (Após falar c/ ele em Ecruteak)", levels: "Lv. 20", rateRed: 100, rateBlue: 100, highlight: "🎁 Presente do Bill", recommended: true },
      { id: 123, name: "Scyther", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Bug-Catching Contest (Ter/Qui/Sáb)", levels: "Lv. 13 — 14", rateRed: 5, rateBlue: 5, recommended: true },
      { id: 66, name: "Machop (Muscle)", types: ["Lutador"], method: "static", methodLabel: "🎁 Troca NPC no 5º andar do Goldenrod Dept. Store (Por Drowzee)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "Destrói a Miltank da Whitney!", recommended: true }
    ],
    items: [
      { name: "TM33 — Ice Punch, TM48 — Fire Punch & TM41 — ThunderPunch", move: "Ice Punch", moveType: "Gelo", category: "tm", icon: "💿", how: "Vendidos livremente por ₽3.000 cada no 5º andar da Loja de Departamentos de Goldenrod City!" },
      { name: "TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "5º andar da Loja de Departamentos de Goldenrod City aos domingos (com Pokémon feliz na liderança)." },
      { name: "TM28 — Dig", move: "Dig", moveType: "Terra", category: "tm", icon: "💿", how: "Canto direito do National Park através de um buraco na cerca." },
      { name: "TM45 — Attract", move: "Attract", moveType: "Normal", category: "tm", icon: "💿", how: "Prêmio da Líder Whitney no Ginásio de Goldenrod City." },
      { name: "TM14 — Blizzard, TM25 — Thunder & TM38 — Fire Blast", move: "Blizzard", moveType: "Gelo", category: "tm", icon: "💿", how: "Loja de Prêmios do Cassino de Goldenrod City (5.500 fichas cada)." },
      { name: "Quick Claw", category: "held", icon: "🐾", how: "Entregue pela mulher sentada no banco direito do National Park!" },
      { name: "Sun Stone", category: "stone", icon: "☀️", how: "1º lugar no Bug-Catching Contest do National Park (terças, quintas e sábados)." },
      { name: "SquirtBottle & Bicycle", category: "key", icon: "🚲", how: "Floricultura e Loja de Bicicletas de Goldenrod City." },
      { name: "Flamethrower, Ice Beam & Thunderbolt (Move Tutor Crystal)", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "⚡", how: "Em Pokémon Crystal, um Move Tutor fora do Cassino de Goldenrod ensina Flamethrower, Ice Beam e Thunderbolt às quartas e sábados após a Liga." }
    ]
  },
  {
    id: "johto-ecruteak-36-37",
    name: "Rotas 36–37, Ecruteak City & Burned Tower",
    sector: "Setor Tradicional Central",
    category: "special",
    connections: "National Park ⇄ Rota 36 (Sudowoodo) ⇄ Ecruteak City",
    levelRange: "Lv. 13 — 20",
    dominantTypes: "Fogo / Fantasma / Pedra",
    encounters: [
      { id: 185, name: "Sudowoodo", types: ["Pedra"], method: "static", methodLabel: "🎁 Bloqueio da Rota 36 (Usar SquirtBottle)", levels: "Lv. 20", rateRed: 100, rateBlue: 100, highlight: "🌳 Encontro Único", recommended: true },
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "grass", methodLabel: "🌿 Rotas 36 & 37", levels: "Lv. 13 — 15", rateRed: 10, rateBlue: 0, versionTag: "🟡 Exclusivo Gold", recommended: true },
      { id: 37, name: "Vulpix", types: ["Fogo"], method: "grass", methodLabel: "🌿 Rotas 36 & 37", levels: "Lv. 13 — 15", rateRed: 0, rateBlue: 10, versionTag: "⚪ Exclusivo Silver" },
      { id: 234, name: "Stantler", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 36 & 37", levels: "Lv. 14 — 15", rateRed: 30, rateBlue: 30 },
      { id: 126, name: "Magmar", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Burned Tower (Subsolo)", levels: "Lv. 14 — 16", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 243, name: "Raikou / Entei / Suicune", types: ["Elétrico"], method: "static", methodLabel: "🎁 Despertados no Subsolo da Burned Tower", levels: "Lv. 40", rateRed: 100, rateBlue: 100, highlight: "⚡ Feras Lendárias" }
    ],
    items: [
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Dance Theater de Ecruteak City após derrotar as 5 Kimono Girls!" },
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Prêmio do Líder Morty no Ginásio de Ecruteak City!" },
      { name: "TM08 — Rock Smash", move: "Rock Smash", moveType: "Lutador", category: "tm", icon: "💿", how: "Entregue pelo homem gordinho na Rota 36 após capturar/derrotar o Sudowoodo." },
      { name: "TM20 — Endure", move: "Endure", moveType: "Normal", category: "tm", icon: "💿", how: "Subsolo da Burned Tower (use Strength na pedra)." },
      { name: "Magnet", category: "held", icon: "🧲", how: "Entregue por Sunny (irmão dos domingos) nas duas macieiras da Rota 37." },
      { name: "Hard Stone", category: "held", icon: "🪨", how: "Entregue por Arthur (irmão das quintas-feiras) na Rota 36." },
      { name: "Itemfinder", category: "key", icon: "📡", how: "Casa a oeste do Ginásio de Ecruteak City." }
    ]
  },
  {
    id: "johto-olivine-38-39",
    name: "Rotas 38–39 & Olivine City",
    sector: "Setor Portuário Oeste",
    category: "route",
    connections: "Ecruteak City (Leste) ⇄ Moomoo Farm ⇄ Olivine City (Oeste)",
    levelRange: "Lv. 15 — 20",
    dominantTypes: "Aço / Elétrico / Normal",
    encounters: [
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "grass", methodLabel: "🌿 Rotas 38 & 39", levels: "Lv. 16", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 241, name: "Miltank", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 38 & 39", levels: "Lv. 13 — 16", rateRed: 5, rateBlue: 5, highlight: "Raro (5%)", recommended: true },
      { id: 128, name: "Tauros", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 38 & 39", levels: "Lv. 13 — 16", rateRed: 5, rateBlue: 5, highlight: "Raro (5%)" },
      { id: 170, name: "Chinchou", types: ["Água", "Elétrico"], method: "fish", methodLabel: "🎣 Good Rod (Porto de Olivine / Rota 40)", levels: "Lv. 20", rateRed: 30, rateBlue: 30, recommended: true }
    ],
    items: [
      { name: "HM04 — Strength", move: "Strength", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo marinheiro no Olivine Café (ao lado do Pokémon Center de Olivine City)." },
      { name: "TM23 — Iron Tail", move: "Iron Tail", moveType: "Aço", category: "tm", icon: "💿", how: "Prêmio da Líder Jasmine no Ginásio de Olivine City!" },
      { name: "TM13 — Snore", move: "Snore", moveType: "Normal", category: "tm", icon: "💿", how: "Moomoo Farm na Rota 39 após curar a Miltank doente com 7 Berries." },
      { name: "TM34 — Swagger", move: "Swagger", moveType: "Normal", category: "tm", icon: "💿", how: "5º andar do Farol de Olivine (Olivine Lighthouse)." },
      { name: "Metal Coat", category: "held", icon: "⚙️", how: "Navio S.S. Aqua (Porto de Olivine no pós-game) ou segurado por Magnemite selvagens (2% de chance)." },
      { name: "Good Rod", category: "key", icon: "🎣", how: "Casa do Guru da Pesca em Olivine City." }
    ]
  },
  {
    id: "johto-cianwood-whirl",
    name: "Rotas 40–41, Whirl Islands & Cianwood City",
    sector: "Setor Marítimo Sudoeste",
    category: "cave",
    connections: "Olivine City ⇄ Rotas Marítimas 40–41 ⇄ Whirl Islands ⇄ Cianwood City",
    levelRange: "Lv. 15 — 45",
    dominantTypes: "Água / Lutador / Voador",
    encounters: [
      { id: 249, name: "Lugia", types: ["Psíquico", "Voador"], method: "static", methodLabel: "🎁 Whirl Islands B2F (Silver Wing)", levels: "Lv. 40 — 70", rateRed: 100, rateBlue: 100, highlight: "🌊 LENDÁRIO DE CAPA", recommended: true },
      { id: 72, name: "Tentacool", types: ["Água", "Veneno"], method: "surf", methodLabel: "🌊 Surf (Rotas 40 & 41)", levels: "Lv. 15 — 24", rateRed: 90, rateBlue: 90 },
      { id: 226, name: "Mantine", types: ["Água", "Voador"], method: "surf", methodLabel: "🌊 Surf (Rota 41)", levels: "Lv. 20 — 24", rateRed: 10, rateBlue: 0, versionTag: "🟡 Exclusivo Gold / Crystal" },
      { id: 116, name: "Horsea", types: ["Água"], method: "cave", methodLabel: "🌊 Surf em Whirl Islands B2F", levels: "Lv. 15 — 25", rateRed: 90, rateBlue: 90 },
      { id: 213, name: "Shuckle (Shuckie)", types: ["Inseto", "Pedra"], method: "static", methodLabel: "🎁 Emprestado por um garoto em Cianwood City", levels: "Lv. 15", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Entregue pela esposa do Líder Chuck do lado de fora do Ginásio de Cianwood City após derrotá-lo!" },
      { name: "TM01 — DynamicPunch", move: "DynamicPunch", moveType: "Lutador", category: "tm", icon: "💿", how: "Prêmio do Líder Chuck no Ginásio de Cianwood City!" },
      { name: "Sharp Beak", category: "held", icon: "🦅", how: "Entregue por Monica (irmã das segundas-feiras) na praia da Rota 40." },
      { name: "SecretPotion", category: "key", icon: "🧪", how: "Farmácia de Cianwood City (para curar a Ampharos do Farol de Olivine)." }
    ]
  },
  {
    id: "johto-mahogany-rage",
    name: "Rota 42, Mt. Mortar, Mahogany & Lake of Rage",
    sector: "Setor Norte Montanhoso",
    category: "special",
    connections: "Ecruteak (Oeste) ⇄ Mt. Mortar ⇄ Mahogany Town ⇄ Lake of Rage (Norte)",
    levelRange: "Lv. 15 — 30",
    dominantTypes: "Água / Gelo / Lutador",
    encounters: [
      { id: 130, name: "Gyarados (Shiny Vermelho)", types: ["Água", "Voador"], method: "static", methodLabel: "🎁 Centro do Lake of Rage (Encontro Estático)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "✨ SHINY GARANTIDO LV. 30", recommended: true },
      { id: 236, name: "Tyrogue", types: ["Lutador"], method: "static", methodLabel: "🎁 Presente do Karate King no fundo do Mt. Mortar", levels: "Lv. 10", rateRed: 100, rateBlue: 100 },
      { id: 183, name: "Marill", types: ["Água"], method: "cave", methodLabel: "⛰️ Mt. Mortar 1F", levels: "Lv. 15", rateRed: 1, rateBlue: 1, highlight: "Raro (1%)" },
      { id: 203, name: "Girafarig", types: ["Normal", "Psíquico"], method: "grass", methodLabel: "🌿 Rota 43 (Rumando ao Lake of Rage)", levels: "Lv. 15 — 17", rateRed: 30, rateBlue: 30, recommended: true }
    ],
    items: [
      { name: "HM06 — Whirlpool", move: "Whirlpool", moveType: "Água", category: "tm", icon: "💿", how: "Entregue por Lance após derrotar a Equipe Rocket no esconderijo subterrâneo de Mahogany Town." },
      { name: "TM16 — Icy Wind", move: "Icy Wind", moveType: "Gelo", category: "tm", icon: "💿", how: "Prêmio do Líder Pryce no Ginásio de Mahogany Town!" },
      { name: "TM36 — Sludge Bomb", move: "Sludge Bomb", moveType: "Veneno", category: "tm", icon: "💿", how: "Entregue pelo guarda do portão da Rota 43 após limpar o esconderijo da Equipe Rocket em Mahogany Town!" },
      { name: "TM10 — Hidden Power", move: "Hidden Power", moveType: "Normal", category: "tm", icon: "💿", how: "Casa no canto noroeste do Lake of Rage (usando Cut e Surf)." },
      { name: "TM43 — Detect", move: "Detect", moveType: "Lutador", category: "tm", icon: "💿", how: "Canto noroeste do Lake of Rage." },
      { name: "TM40 — Defense Curl", move: "Defense Curl", moveType: "Normal", category: "tm", icon: "💿", how: "Interior do Mt. Mortar 2F." },
      { name: "Black Belt", category: "held", icon: "🥋", how: "Entregue por Wesley (irmão das quartas-feiras) no Lake of Rage." },
      { name: "Dragon Scale", category: "stone", icon: "🐉", how: "Interior do Mt. Mortar 2F (para evoluir Seadra em Kingdra)." }
    ]
  },
  {
    id: "johto-ice-blackthorn",
    name: "Rota 44, Ice Path, Blackthorn City & Rota 45",
    sector: "Setor Glacial & Dragões",
    category: "cave",
    connections: "Mahogany Town ⇄ Rota 44 ⇄ Ice Path ⇄ Blackthorn City ⇄ Rota 45",
    levelRange: "Lv. 21 — 27",
    dominantTypes: "Gelo / Dragão / Terra / Aço",
    encounters: [
      { id: 220, name: "Swinub", types: ["Gelo", "Terra"], method: "cave", methodLabel: "⛰️ Ice Path (Todos os Andares)", levels: "Lv. 21 — 24", rateRed: 40, rateBlue: 40, recommended: true },
      { id: 124, name: "Jynx", types: ["Gelo", "Psíquico"], method: "cave", methodLabel: "⛰️ Ice Path 1F & B1F", levels: "Lv. 22 — 24", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 147, name: "Dratini (ExtremeSpeed)", types: ["Dragão"], method: "static", methodLabel: "🎁 Dragon's Den (Ou Surf/Super Rod em Dragon's Den)", levels: "Lv. 15", rateRed: 100, rateBlue: 100, highlight: "🐉 Presente / Surf", recommended: true },
      { id: 227, name: "Skarmory", types: ["Aço", "Voador"], method: "grass", methodLabel: "🌿 Rota 45 (Sul de Blackthorn)", levels: "Lv. 27", rateRed: 0, rateBlue: 5, versionTag: "⚪ Exclusivo Silver / Crystal", highlight: "Raro (5%)", recommended: true },
      { id: 207, name: "Gligar", types: ["Terra", "Voador"], method: "grass", methodLabel: "🌿 Rota 45", levels: "Lv. 24", rateRed: 20, rateBlue: 0, versionTag: "🟡 Exclusivo Gold" },
      { id: 231, name: "Phanpy", types: ["Terra"], method: "grass", methodLabel: "🌿 Rota 45 (Manhã)", levels: "Lv. 20", rateRed: 0, rateBlue: 30, timeTag: "☀️ Manhã" },
      { id: 216, name: "Teddiursa", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 45 (Manhã)", levels: "Lv. 20", rateRed: 30, rateBlue: 0, timeTag: "☀️ Manhã" }
    ],
    items: [
      { name: "HM07 — Waterfall", move: "Waterfall", moveType: "Água", category: "tm", icon: "💿", how: "1º andar (1F) da Ice Path (deslize pelo gelo até o canto direito)." },
      { name: "TM44 — Rest", move: "Rest", moveType: "Psíquico", category: "tm", icon: "💿", how: "Andar B2F da Ice Path." },
      { name: "Never-Melt Ice", category: "held", icon: "🧊", how: "Andar B3F da Ice Path." },
      { name: "TM24 — DragonBreath", move: "DragonBreath", moveType: "Dragão", category: "tm", icon: "💿", how: "Prêmio da Líder Clair após passar no teste da Dragon's Den em Blackthorn City." },
      { name: "Dragon Fang", category: "held", icon: "🦷", how: "Ao leste do santuário dentro da Dragon's Den em Blackthorn City." },
      { name: "Spell Tag", category: "held", icon: "📿", how: "Entregue por Santos (irmão dos sábados) em Blackthorn City." }
    ]
  },
  {
    id: "johto-victory-silver",
    name: "Rotas 26–28, Victory Road & Mt. Silver",
    sector: "Setor Liga Indigo & Pós-Game",
    category: "cave",
    connections: "New Bark Town (Surf Leste) ⇄ Rotas 27 & 26 ⇄ Victory Road ⇄ Mt. Silver",
    levelRange: "Lv. 28 — 50",
    dominantTypes: "Pedra / Terra / Fogo / Psíquico",
    encounters: [
      { id: 246, name: "Larvitar", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Mt. Silver (Interior)", levels: "Lv. 15 — 20", rateRed: 5, rateBlue: 5, highlight: "👑 Pseudo-Lendário", recommended: true },
      { id: 228, name: "Houndour", types: ["Noturno", "Fogo"], method: "grass", methodLabel: "🌿 Rota 7 de Kanto (Noite)", levels: "Lv. 15 — 18", rateRed: 30, rateBlue: 30, timeTag: "🌙 Noite", recommended: true },
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "cave", methodLabel: "⛰️ Mt. Silver / Ice Path (Crystal)", levels: "Lv. 35 — 40", rateRed: 10, rateBlue: 10 },
      { id: 112, name: "Rhydon", types: ["Terra", "Pedra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 35", rateRed: 15, rateBlue: 15 },
      { id: 232, name: "Donphan", types: ["Terra"], method: "cave", methodLabel: "⛰️ Victory Road / Rota 28", levels: "Lv. 33 — 35", rateRed: 0, rateBlue: 15, versionTag: "⚪ Exclusivo Silver" },
      { id: 217, name: "Ursaring", types: ["Normal"], method: "cave", methodLabel: "⛰️ Victory Road / Rota 28", levels: "Lv. 33 — 35", rateRed: 15, rateBlue: 0, versionTag: "🟡 Exclusivo Gold" }
    ],
    items: [
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "1º andar (1F) da Victory Road (caia pelo buraco no canto noroeste do 2º andar)!" },
      { name: "TM22 — Solar Beam", move: "Solar Beam", moveType: "Planta", category: "tm", icon: "💿", how: "Penhasco da Rota 27 usando Whirlpool após atravessar as Tohjo Falls." },
      { name: "TM37 — Sandstorm", move: "Sandstorm", moveType: "Pedra", category: "tm", icon: "💿", how: "Entregue na casa da recepcionista da Rota 27 com um Pokémon feliz na liderança." },
      { name: "TM47 — Steel Wing", move: "Steel Wing", moveType: "Aço", category: "tm", icon: "💿", how: "Casa isolada na Rota 28 (rumando ao Mt. Silver) ou Rock Tunnel." },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Restaurante de Celadon City (lixeira) e segurado pelo Snorlax Lv. 50 em Vermilion City no Pós-Game!" },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Casa do Sr. Psychic em Saffron City ou Cassino de Celadon (3.500 fichas)." },
      { name: "TM03 — Curse", move: "Curse", moveType: "Fantasma", category: "tm", icon: "💿", how: "Celadon Mansion 3F à noite." },
      { name: "TwistedSpoon", category: "held", icon: "🥄", how: "Entregue por Monica/Tuscany ou segurado por Kadabra/Abra." }
    ]
  }
];

// ============================================================================
// 3. DADOS DE HOENN (RUBY, SAPPHIRE & EMERALD — GEN 3)
// ============================================================================
const HOENN_AREAS = [
  {
    id: "hoenn-littleroot-102",
    name: "Littleroot, Oldale, Petalburg & Rotas 101–103",
    sector: "Setor Hoenn Sudoeste",
    category: "route",
    connections: "Littleroot Town ⇄ Oldale Town ⇄ Rota 102 ⇄ Petalburg City",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Psíquico / Água / Normal",
    encounters: [
      { id: 252, name: "Treecko", types: ["Planta"], method: "static", methodLabel: "🎁 Bolsa do Prof. Birch (Rota 101)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 255, name: "Torchic", types: ["Fogo"], method: "static", methodLabel: "🎁 Bolsa do Prof. Birch (Rota 101)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 258, name: "Mudkip", types: ["Água"], method: "static", methodLabel: "🎁 Bolsa do Prof. Birch (Rota 101)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "👑 Melhor Inicial de Hoenn", recommended: true },
      { id: 280, name: "Ralts", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 102 (Grama Alta)", levels: "Lv. 4", rateRed: 4, rateBlue: 4, highlight: "⚡ Raro (4%) — Evolui p/ Gardevoir", recommended: true },
      { id: 270, name: "Lotad", types: ["Água", "Planta"], method: "grass", methodLabel: "🌿 Rota 102", levels: "Lv. 3 — 4", rateRed: 0, rateBlue: 20, versionTag: "🔵 Sapphire / Emerald", recommended: true },
      { id: 273, name: "Seedot", types: ["Planta"], method: "grass", methodLabel: "🌿 Rota 102", levels: "Lv. 3 — 4", rateRed: 20, rateBlue: 0, versionTag: "🔴 Ruby / Emerald" },
      { id: 278, name: "Wingull", types: ["Água", "Voador"], method: "grass", methodLabel: "🌿 Rota 103", levels: "Lv. 2 — 4", rateRed: 20, rateBlue: 20 },
      { id: 263, name: "Zigzagoon", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 101–103", levels: "Lv. 2 — 4", rateRed: 20, rateBlue: 20, highlight: "Habilidade Pickup!" }
    ],
    items: [
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Entregue pelos pais do Wally na casa ao lado do Ginásio de Petalburg City após derrotar o Líder Norman (5ª Insígnia)!" },
      { name: "TM42 — Facade", move: "Facade", moveType: "Normal", category: "tm", icon: "💿", how: "Prêmio do Líder Norman no Ginásio de Petalburg City." },
      { name: "Amulet Coin", category: "held", icon: "🪙", how: "Entregue pela sua Mãe em Littleroot Town após vencer o Ginásio de Petalburg." }
    ]
  },
  {
    id: "hoenn-woods-rustboro",
    name: "Rota 104, Petalburg Woods, Rustboro & Rota 116",
    sector: "Setor Florestal Oeste",
    category: "special",
    connections: "Petalburg City ⇄ Petalburg Woods ⇄ Rustboro City ⇄ Rusturf Tunnel",
    levelRange: "Lv. 4 — 10",
    dominantTypes: "Planta / Voador / Normal",
    encounters: [
      { id: 285, name: "Shroomish", types: ["Planta"], method: "grass", methodLabel: "🌿 Petalburg Woods", levels: "Lv. 5 — 6", rateRed: 15, rateBlue: 15, highlight: "🍄 Evolui p/ Breloom!", recommended: true },
      { id: 276, name: "Taillow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rota 104 / Petalburg Woods", levels: "Lv. 4 — 8", rateRed: 10, rateBlue: 10, highlight: "🦅 Guts + Facade", recommended: true },
      { id: 287, name: "Slakoth", types: ["Normal"], method: "grass", methodLabel: "🌿 Petalburg Woods", levels: "Lv. 5 — 6", rateRed: 5, rateBlue: 5, highlight: "Raro (5%)" },
      { id: 290, name: "Nincada", types: ["Inseto", "Terra"], method: "grass", methodLabel: "🌿 Rota 116", levels: "Lv. 6 — 7", rateRed: 20, rateBlue: 20 },
      { id: 293, name: "Whismur", types: ["Normal"], method: "cave", methodLabel: "⛰️ Rusturf Tunnel / Rota 116", levels: "Lv. 5 — 8", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Casa do Cortador (Cutter's House) ao lado esquerdo do Pokémon Center de Rustboro City." },
      { name: "HM04 — Strength", move: "Strength", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo namorado da Wanda ao quebrar as rochas com Rock Smash dentro do Rusturf Tunnel." },
      { name: "Exp. Share", category: "held", icon: "📡", how: "Entregue pelo Presidente Mr. Stone no último andar da Devon Corporation em Rustboro City (após entregar a carta para Steven em Dewford)!" },
      { name: "Quick Claw", category: "held", icon: "🐾", how: "Entregue pelo professor dentro da Escola de Treinadores de Rustboro City!" },
      { name: "Miracle Seed", category: "held", icon: "🌱", how: "Entregue pela garota no lado direito de Petalburg Woods (requer Cut após voltar por Rustboro)." },
      { name: "TM39 — Rock Tomb", move: "Rock Tomb", moveType: "Pedra", category: "tm", icon: "💿", how: "Prêmio da Líder Roxanne no Ginásio de Rustboro City." },
      { name: "TM09 — Bullet Seed", move: "Bullet Seed", moveType: "Planta", category: "tm", icon: "💿", how: "Garoto na saída norte de Petalburg Woods na Rota 104." },
      { name: "BlackGlasses", category: "held", icon: "🕶️", how: "Saída leste do Rusturf Tunnel na Rota 116." }
    ]
  },
  {
    id: "hoenn-dewford-granite",
    name: "Dewford Town, Granite Cave & Abandoned Ship",
    sector: "Setor Insular Sudoeste",
    category: "cave",
    connections: "Rota 104 (Barco do Sr. Briney) ⇄ Dewford Town ⇄ Granite Cave ⇄ Rota 108",
    levelRange: "Lv. 6 — 13",
    dominantTypes: "Lutador / Aço / Pedra",
    encounters: [
      { id: 304, name: "Aron", types: ["Aço", "Pedra"], method: "cave", methodLabel: "⛰️ Granite Cave (1F a B2F)", levels: "Lv. 9 — 12", rateRed: 40, rateBlue: 40, highlight: "🛡️ Evolui p/ Aggron", recommended: true },
      { id: 296, name: "Makuhita", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Granite Cave (1F & B1F)", levels: "Lv. 6 — 10", rateRed: 50, rateBlue: 50, recommended: true },
      { id: 63, name: "Abra", types: ["Psíquico"], method: "cave", methodLabel: "⛰️ Granite Cave", levels: "Lv. 8 — 10", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 302, name: "Sableye", types: ["Noturno", "Fantasma"], method: "cave", methodLabel: "⛰️ Granite Cave B2F", levels: "Lv. 9 — 11", rateRed: 0, rateBlue: 20, versionTag: "🔵 Sapphire / Emerald" },
      { id: 303, name: "Mawile", types: ["Aço"], method: "cave", methodLabel: "⛰️ Granite Cave B2F", levels: "Lv. 9 — 11", rateRed: 20, rateBlue: 0, versionTag: "🔴 Ruby" }
    ],
    items: [
      { name: "HM05 — Flash", move: "Flash", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Hiker logo na entrada do 1º andar da Granite Cave." },
      { name: "TM08 — Bulk Up", move: "Bulk Up", moveType: "Lutador", category: "tm", icon: "💿", how: "Prêmio do Líder Brawly no Ginásio de Dewford Town!" },
      { name: "TM47 — Steel Wing", move: "Steel Wing", moveType: "Aço", category: "tm", icon: "💿", how: "Entregue por Steven Stone na sala do fundo da Granite Cave ao entregar a Carta de Mr. Stone." },
      { name: "TM36 — Sludge Bomb", move: "Sludge Bomb", moveType: "Veneno", category: "tm", icon: "💿", how: "Entregue pelo homem no Dewford Hall após você conquistar a 5ª Insígnia (Norman)!" },
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Sala trancada do Abandoned Ship na Rota 108 (use Surf e Dive) ou Cassino de Mauville (4.000 fichas)!" },
      { name: "TM18 — Rain Dance", move: "Rain Dance", moveType: "Água", category: "tm", icon: "💿", how: "Interior do Abandoned Ship na Rota 108 (requer Surf e Dive)." },
      { name: "Silk Scarf", category: "held", icon: "🧣", how: "Casa a leste do Pokémon Center de Dewford Town." },
      { name: "Everstone", category: "held", icon: "🪨", how: "Pedra escura no andar B2F da Granite Cave (inspecione a rocha)." }
    ]
  },
  {
    id: "hoenn-slateport-mauville",
    name: "Slateport City, Rota 110, Mauville & New Mauville",
    sector: "Eixo Central Eletromagnético",
    category: "route",
    connections: "Slateport City ⇄ Rota 110 (Cycling Road) ⇄ Mauville City ⇄ Verdanturf",
    levelRange: "Lv. 12 — 26",
    dominantTypes: "Elétrico / Aço / Veneno",
    encounters: [
      { id: 309, name: "Electrike", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 110 & Rota 118", levels: "Lv. 12 — 13", rateRed: 30, rateBlue: 30, highlight: "⚡ Evolui p/ Manectric", recommended: true },
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "cave", methodLabel: "⛰️ New Mauville (Subterrâneo)", levels: "Lv. 22 — 26", rateRed: 50, rateBlue: 50, recommended: true },
      { id: 315, name: "Roselia", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Rota 117 (Entre Mauville e Verdanturf)", levels: "Lv. 13 — 14", rateRed: 30, rateBlue: 30 },
      { id: 316, name: "Gulpin", types: ["Veneno"], method: "grass", methodLabel: "🌿 Rota 110", levels: "Lv. 12 — 13", rateRed: 15, rateBlue: 15 }
    ],
    items: [
      { name: "HM06 — Rock Smash", move: "Rock Smash", moveType: "Lutador", category: "tm", icon: "💿", how: "Casa do cientista no canto sudeste de Mauville City!" },
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Entregue pelo Líder Wattson no meio da praça de Mauville City após desligar o gerador de New Mauville (ou no Cassino de Mauville por 4.000 fichas)!" },
      { name: "TM34 — Shock Wave", move: "Shock Wave", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio do Líder Wattson no Ginásio de Mauville City!" },
      { name: "TM13 — Ice Beam, TM24 — Thunderbolt, TM35 — Flamethrower & TM29 — Psychic", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "Vendidos no Mauville Game Corner (Cassino de Mauville City) por 4.000 fichas (3.500 para Psychic)!" },
      { name: "TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo irmão do presidente do Fan Club em Pacifidlog ou ao devolver o Meteorito para o Prof. Cozmo em Fallarbor Town!" },
      { name: "Macho Brace", category: "held", icon: "🏋️", how: "Casa da Família Winstrate na Rota 111 (logo ao norte de Mauville City) após vencer as 4 batalhas seguidas!" },
      { name: "Soothe Bell", category: "held", icon: "🔔", how: "Pokémon Fan Club em Slateport City (com um Pokémon amigável na liderança)." },
      { name: "Soft Sand", category: "held", icon: "🏖️", how: "Entregue pela garotinha na praia de Slateport City (Rota 109)." },
      { name: "Mach Bike / Acro Bike", category: "key", icon: "🚲", how: "Rydel's Cycles em Mauville City (gratuito!)." }
    ]
  },
  {
    id: "hoenn-chimney-lavaridge",
    name: "Rotas 111–113, Mt. Chimney, Lavaridge & Fallarbor",
    sector: "Setor Vulcânico & Desértico",
    category: "cave",
    connections: "Rota 112 ⇄ Fiery Path / Mt. Chimney ⇄ Lavaridge Town & Deserto da Rota 111",
    levelRange: "Lv. 14 — 22",
    dominantTypes: "Fogo / Terra / Dragão / Aço",
    encounters: [
      { id: 328, name: "Trapinch", types: ["Terra"], method: "cave", methodLabel: "🏜️ Deserto da Rota 111", levels: "Lv. 19 — 22", rateRed: 35, rateBlue: 35, highlight: "🐉 Evolui p/ Flygon!", recommended: true },
      { id: 322, name: "Numel", types: ["Fogo", "Terra"], method: "grass", methodLabel: "🌿 Rota 112 / Jagged Pass", levels: "Lv. 14 — 16", rateRed: 75, rateBlue: 75, recommended: true },
      { id: 324, name: "Torkoal", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Fiery Path", levels: "Lv. 14 — 16", rateRed: 18, rateBlue: 18, recommended: true },
      { id: 227, name: "Skarmory", types: ["Aço", "Voador"], method: "grass", methodLabel: "🌿 Rota 113 (Chuva de Cinzas)", levels: "Lv. 16", rateRed: 5, rateBlue: 5, highlight: "🛡️ Raro (5%)" },
      { id: 333, name: "Swablu", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rota 114 & 115", levels: "Lv. 15 — 17", rateRed: 40, rateBlue: 40, recommended: true }
    ],
    items: [
      { name: "TM50 — Overheat", move: "Overheat", moveType: "Fogo", category: "tm", icon: "💿", how: "Prêmio da Líder Flannery no Ginásio de Lavaridge Town!" },
      { name: "TM06 — Toxic", move: "Toxic", moveType: "Veneno", category: "tm", icon: "💿", how: "Canto oeste do Fiery Path (use Strength para empurrar as rochas)." },
      { name: "Fire Stone", category: "stone", icon: "🔥", how: "Canto noroeste do Fiery Path (requer Strength) ou trocando Red Shard na Rota 124." },
      { name: "Charcoal", category: "held", icon: "🔥", how: "Loja de Ervas Medicinais de Lavaridge Town." },
      { name: "White Herb", category: "held", icon: "🌿", how: "Mulher do lado de fora da Floricultura Pretty Petal na Rota 104 (após vencer Flannery)." },
      { name: "TM37 — Sandstorm", move: "Sandstorm", moveType: "Pedra", category: "tm", icon: "💿", how: "Canto sul do Deserto da Rota 111 (requer Go-Goggles)." },
      { name: "TM43 — Secret Power", move: "Secret Power", moveType: "Normal", category: "tm", icon: "💿", how: "Garoto diante da grande árvore na Rota 111 norte." },
      { name: "TM28 — Dig", move: "Dig", moveType: "Terra", category: "tm", icon: "💿", how: "Casa do Fossil Maniac no oeste de Fallarbor Town (Rota 114)." },
      { name: "Swords Dance (Move Tutor Emerald)", move: "Swords Dance", moveType: "Normal", category: "tm", icon: "⚔️", how: "Battle Frontier (48 BP) ou Move Tutor em Lavaridge/Fallarbor (Emerald)." }
    ]
  },
  {
    id: "hoenn-meteor-falls",
    name: "Meteor Falls & Rota 115",
    sector: "Setor Caverna de Meteoros",
    category: "cave",
    connections: "Rota 114 (Fallarbor) ⇄ Meteor Falls ⇄ Rota 115 (Rustboro)",
    levelRange: "Lv. 16 — 40",
    dominantTypes: "Dragão / Pedra / Psíquico",
    encounters: [
      { id: 371, name: "Bagon", types: ["Dragão"], method: "cave", methodLabel: "⛰️ Sala Profunda de Meteor Falls (Requer Surf + Waterfall)", levels: "Lv. 25 — 35", rateRed: 25, rateBlue: 25, highlight: "👑 Evolui p/ Salamence!", recommended: true },
      { id: 337, name: "Lunatone", types: ["Pedra", "Psíquico"], method: "cave", methodLabel: "⛰️ Meteor Falls", levels: "Lv. 16 — 20", rateRed: 0, rateBlue: 20, versionTag: "🔵 Exclusivo Sapphire" },
      { id: 338, name: "Solrock", types: ["Pedra", "Psíquico"], method: "cave", methodLabel: "⛰️ Meteor Falls", levels: "Lv. 16 — 20", rateRed: 20, rateBlue: 0, versionTag: "🔴 Exclusivo Ruby / Emerald" }
    ],
    items: [
      { name: "TM02 — Dragon Claw", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Sala mais profunda de Meteor Falls (exatamente no mesmo local onde Bagon aparece, requer Surf e Waterfall)!" },
      { name: "TM23 — Iron Tail", move: "Iron Tail", moveType: "Aço", category: "tm", icon: "💿", how: "Caverna oeste de Meteor Falls (requer Surf e Waterfall)." },
      { name: "TM01 — Focus Punch", move: "Focus Punch", moveType: "Lutador", category: "tm", icon: "💿", how: "Norte da Rota 115 (use Surf na praia de Rustboro e suba até os treinadores de karatê)." },
      { name: "Moon Stone", category: "stone", icon: "🌙", how: "1º andar de Meteor Falls (ou segurada por Lunatone)." }
    ]
  },
  {
    id: "hoenn-fortree-119-120",
    name: "Rotas 118–120, Weather Institute, Fortree & Scorched Slab",
    sector: "Setor Tropical Central",
    category: "route",
    connections: "Mauville (Surf Leste) ⇄ Rota 119 ⇄ Fortree City ⇄ Rota 120",
    levelRange: "Lv. 23 — 27",
    dominantTypes: "Voador / Planta / Água / Normal",
    encounters: [
      { id: 359, name: "Absol", types: ["Noturno"], method: "grass", methodLabel: "🌿 Rota 120", levels: "Lv. 25 — 27", rateRed: 8, rateBlue: 8, highlight: "⚔️ Raro (8%) — Alto Atk", recommended: true },
      { id: 357, name: "Tropius", types: ["Planta", "Voador"], method: "grass", methodLabel: "🌿 Rota 119 (Grama Gigante)", levels: "Lv. 25 — 27", rateRed: 9, rateBlue: 9 },
      { id: 349, name: "Feebas", types: ["Água"], method: "fish", methodLabel: "🎣 6 Quadrados Especiais do Rio da Rota 119", levels: "Lv. 20 — 25", rateRed: 50, rateBlue: 50, highlight: "💎 Evolui p/ Milotic", recommended: true },
      { id: 352, name: "Kecleon", types: ["Normal"], method: "static", methodLabel: "🎁 Invisíveis em Fortree / Rota 120 (Devon Scope)", levels: "Lv. 30", rateRed: 100, rateBlue: 100 },
      { id: 351, name: "Castform", types: ["Normal"], method: "static", methodLabel: "🎁 Presente do Weather Institute (Segura Mystic Water)", levels: "Lv. 25", rateRed: 100, rateBlue: 100 }
    ],
    items: [
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Entregue pela sua Rival (May/Brendan) após a batalha na ponte da Rota 119 (antes de Fortree City)!" },
      { name: "TM40 — Aerial Ace", move: "Aerial Ace", moveType: "Voador", category: "tm", icon: "💿", how: "Prêmio da Líder Winona no Ginásio de Fortree City!" },
      { name: "TM11 — Sunny Day", move: "Sunny Day", moveType: "Fogo", category: "tm", icon: "💿", how: "No fundo da caverna Scorched Slab (no meio do lago da Rota 120 usando Surf)!" },
      { name: "Mystic Water", category: "held", icon: "💧", how: "Vem equipado no Castform recebido no 2º andar do Weather Institute na Rota 119!" },
      { name: "Leaf Stone", category: "stone", icon: "🍃", how: "Canto sul do rio da Rota 119 (use Surf e Acro Bike) ou trocando Green Shard na Rota 124." }
    ]
  },
  {
    id: "hoenn-lilycove-pyre-safari",
    name: "Rota 121, Safari Zone, Mt. Pyre & Lilycove City",
    sector: "Setor Leste Costeiro",
    category: "special",
    connections: "Rota 121 (Safari Zone) ⇄ Mt. Pyre (Rota 122) ⇄ Lilycove City",
    levelRange: "Lv. 25 — 32",
    dominantTypes: "Fantasma / Lutador / Água / Elétrico",
    encounters: [
      { id: 214, name: "Heracross", types: ["Inseto", "Lutador"], method: "grass", methodLabel: "🌿 Safari Zone (Área Nordeste — Acro Bike)", levels: "Lv. 27 — 29", rateRed: 5, rateBlue: 5, highlight: "👑 S+ TIER RARO", recommended: true },
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Safari Zone (Área Sul/Sudeste)", levels: "Lv. 25 — 27", rateRed: 5, rateBlue: 5, recommended: true },
      { id: 353, name: "Shuppet", types: ["Fantasma"], method: "cave", methodLabel: "⛰️ Mt. Pyre (Interior & Topo)", levels: "Lv. 22 — 28", rateRed: 85, rateBlue: 85 },
      { id: 355, name: "Duskull", types: ["Fantasma"], method: "cave", methodLabel: "⛰️ Mt. Pyre (Exterior & Topo)", levels: "Lv. 22 — 28", rateRed: 85, rateBlue: 85 },
      { id: 320, name: "Wailmer", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod (Praia de Lilycove)", levels: "Lv. 25 — 40", rateRed: 85, rateBlue: 85 },
      { id: 120, name: "Staryu", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod em Lilycove City", levels: "Lv. 25 — 35", rateRed: 15, rateBlue: 15, highlight: "⭐ Evolui p/ Starmie!", recommended: true }
    ],
    items: [
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "6º andar (6F) do interior do Mt. Pyre!" },
      { name: "TM22 — Solar Beam", move: "Solar Beam", moveType: "Planta", category: "tm", icon: "💿", how: "Área Noroeste da Safari Zone (requer Surf e Mach Bike)!" },
      { name: "TM19 — Giga Drain", move: "Giga Drain", moveType: "Planta", category: "tm", icon: "💿", how: "Rota 123 (logo ao sul do Mt. Pyre) falando com a garota perto das árvores de Berry com um Pokémon de Planta na equipe!" },
      { name: "TM14 — Blizzard, TM25 — Thunder, TM38 — Fire Blast & TM15 — Hyper Beam", move: "Fire Blast", moveType: "Fogo", category: "tm", icon: "💿", how: "Vendidos no 4º andar da Loja de Departamentos de Lilycove City!" },
      { name: "TM16 — Light Screen, TM33 — Reflect & TM20 — Safeguard", move: "Light Screen", moveType: "Psíquico", category: "tm", icon: "💿", how: "Vendidos no 4º andar da Loja de Departamentos de Lilycove City!" },
      { name: "Master Ball", category: "key", icon: "🟣", how: "Esconderijo da Team Aqua / Magma (Hideout) a nordeste de Lilycove City (sala do chefe)!" },
      { name: "Spell Tag", category: "held", icon: "📿", how: "No Mt. Pyre (4º andar)." },
      { name: "Light Ball", category: "held", icon: "⚡", how: "Segurado por Pikachu selvagens na Safari Zone de Hoenn (5% de chance)." }
    ]
  },
  {
    id: "hoenn-mossdeep-shoal",
    name: "Rotas 124–125, Mossdeep City & Shoal Cave",
    sector: "Setor Oceânico Nordeste",
    category: "cave",
    connections: "Lilycove City (Leste) ⇄ Rota 124 ⇄ Mossdeep City ⇄ Shoal Cave",
    levelRange: "Lv. 26 — 35",
    dominantTypes: "Gelo / Água / Psíquico / Aço",
    encounters: [
      { id: 363, name: "Spheal", types: ["Gelo", "Água"], method: "cave", methodLabel: "⛰️ Shoal Cave (Todas as Salas)", levels: "Lv. 26 — 32", rateRed: 50, rateBlue: 50, highlight: "❄️ Evolui p/ Walrein!", recommended: true },
      { id: 361, name: "Snorunt", types: ["Gelo"], method: "cave", methodLabel: "⛰️ Shoal Cave (Sala Congelada na Maré Baixa)", levels: "Lv. 26 — 30", rateRed: 10, rateBlue: 10 },
      { id: 374, name: "Beldum", types: ["Aço", "Psíquico"], method: "static", methodLabel: "🎁 Casa do Steven Stone em Mossdeep (Pós-Game)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Metagross", recommended: true },
      { id: 319, name: "Sharpedo", types: ["Água", "Noturno"], method: "fish", methodLabel: "🎣 Super Rod (Rota 124 & Mossdeep)", levels: "Lv. 30 — 35", rateRed: 40, rateBlue: 40 }
    ],
    items: [
      { name: "HM08 — Dive", move: "Dive", moveType: "Água", category: "tm", icon: "💿", how: "Entregue por Steven Stone em sua casa no noroeste de Mossdeep City (ou no Space Center em Emerald)!" },
      { name: "TM04 — Calm Mind", move: "Calm Mind", moveType: "Psíquico", category: "tm", icon: "💿", how: "Prêmio dos Líderes Tate & Liza no Ginásio de Mossdeep City!" },
      { name: "TM07 — Hail", move: "Hail", moveType: "Gelo", category: "tm", icon: "💿", how: "Sala de Gelo no fundo da Shoal Cave (acessível durante a Maré Baixa: 03h–09h e 15h–21h)!" },
      { name: "Never-Melt Ice", category: "held", icon: "🧊", how: "Sala de Gelo no fundo da Shoal Cave (Maré Baixa)." },
      { name: "Shell Bell", category: "held", icon: "🐚", how: "Entregue pelo senhor na entrada da Shoal Cave ao coletar 4 Shoal Shells (Maré Alta) e 4 Shoal Salts (Maré Baixa)!" },
      { name: "King's Rock", category: "held", icon: "👑", how: "Garoto ao lado da casa do Steven Stone em Mossdeep City (perto da pedra branca)!" },
      { name: "Sun Stone", category: "stone", icon: "☀️", how: "Marinheiro no 1º andar do Mossdeep Space Center!" },
      { name: "Fire Stone, Water Stone, Thunder Stone & Leaf Stone", category: "stone", icon: "💎", how: "Casa do Caçador de Tesouros (Diving Treasure Hunter) na Rota 124 trocando Red, Blue, Yellow e Green Shards!" },
      { name: "Super Rod", category: "key", icon: "🎣", how: "Casa do pescador a nordeste do Ginásio de Mossdeep City." }
    ]
  },
  {
    id: "hoenn-sootopolis-sky",
    name: "Rotas 126–134, Sootopolis City & Sky Pillar",
    sector: "Setor Abissal & Lendário Sul",
    category: "special",
    connections: "Rota 126 (Dive) ⇄ Sootopolis City ⇄ Pacifidlog Town ⇄ Sky Pillar (Rota 131)",
    levelRange: "Lv. 30 — 70",
    dominantTypes: "Água / Dragão / Terra",
    encounters: [
      { id: 384, name: "Rayquaza", types: ["Dragão", "Voador"], method: "static", methodLabel: "🎁 Topo do Sky Pillar (Rota 131)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "🐉 LENDÁRIO SUPREMO LV. 70", recommended: true },
      { id: 382, name: "Kyogre", types: ["Água"], method: "static", methodLabel: "🎁 Cave of Origin (Sapphire) / Marine Cave (Emerald)", levels: "Lv. 45 — 70", rateRed: 0, rateBlue: 100, versionTag: "🔵 Sapphire / Emerald", highlight: "🌊 LENDÁRIO DE CAPA", recommended: true },
      { id: 383, name: "Groudon", types: ["Terra"], method: "static", methodLabel: "🎁 Cave of Origin (Ruby) / Terra Cave (Emerald)", levels: "Lv. 45 — 70", rateRed: 100, rateBlue: 0, versionTag: "🔴 Ruby / Emerald", highlight: "🌋 LENDÁRIO DE CAPA", recommended: true },
      { id: 170, name: "Chinchou", types: ["Água", "Elétrico"], method: "surf", methodLabel: "🌊 Ervas Subaquáticas (Dive nas Rotas 124 e 126)", levels: "Lv. 20 — 30", rateRed: 60, rateBlue: 60, recommended: true },
      { id: 369, name: "Relicanth", types: ["Água", "Pedra"], method: "surf", methodLabel: "🌊 Ervas Subaquáticas (Dive nas Rotas 124 e 126)", levels: "Lv. 30 — 35", rateRed: 5, rateBlue: 5, highlight: "Chave dos Regis (5%)" }
    ],
    items: [
      { name: "HM07 — Waterfall", move: "Waterfall", moveType: "Água", category: "tm", icon: "💿", how: "Cave of Origin em Sootopolis City (Ruby/Sapphire) ou entregue por Wallace após acalmar Groudon/Kyogre (Emerald)!" },
      { name: "TM03 — Water Pulse", move: "Water Pulse", moveType: "Água", category: "tm", icon: "💿", how: "Prêmio do Líder Wallace / Juan no Ginásio de Sootopolis City!" },
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Seafloor Cavern na Rota 128 (use Dive e vá até a última sala antes de Archie/Maxie)!" },
      { name: "TM31 — Brick Break", move: "Brick Break", moveType: "Lutador", category: "tm", icon: "💿", how: "Casa no noroeste de Sootopolis City falando com o lutador de karatê!" }
    ]
  },
  {
    id: "hoenn-ever-grande",
    name: "Ever Grande City, Victory Road & Battle Frontier",
    sector: "Setor Liga Hoenn & Pós-Game",
    category: "cave",
    connections: "Rota 128 (Waterfall) ⇄ Victory Road ⇄ Pokémon League & Battle Frontier",
    levelRange: "Lv. 36 — 45",
    dominantTypes: "Lutador / Aço / Psíquico / Dragão",
    encounters: [
      { id: 297, name: "Hariyama", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 38 — 40", rateRed: 25, rateBlue: 25 },
      { id: 305, name: "Lairon", types: ["Aço", "Pedra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 38 — 42", rateRed: 25, rateBlue: 25 },
      { id: 308, name: "Medicham", types: ["Lutador", "Psíquico"], method: "cave", methodLabel: "⛰️ Victory Road (Ruby/Sapphire)", levels: "Lv. 40", rateRed: 10, rateBlue: 10 }
    ],
    items: [
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Andar B1F da Victory Road de Hoenn (use Strength e Rock Smash) ou no Cassino de Mauville!" },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Lixeira no subsolo do navio S.S. Tidal (após vencer a Elite Four) ou por 48 BP na Battle Frontier / Battle Tower!" },
      { name: "Choice Band", category: "held", icon: "🎗️", how: "Prêmio da Battle Tower (64 BP em Emerald Battle Frontier ou sequência de vitórias em Ruby/Sapphire)!" },
      { name: "Rock Slide, Swords Dance, Body Slam & Thunder Wave (Move Tutors)", move: "Rock Slide", moveType: "Pedra", category: "tm", icon: "🏆", how: "Tutors da Battle Frontier em Pokémon Emerald!" }
    ]
  }
];

// ============================================================================
// 4. GEOMETRIA CLÁSSICA DO TOWN MAP (KANTO, JOHTO & HOENN) NO TEMA RADAR
// ============================================================================
const REGION_MAP_LAYOUTS = {
  Kanto: {
    terrainSvg: `
      <line x1="240" y1="240" x2="620" y2="445" stroke="#10b981" stroke-width="4.5" stroke-dasharray="8 4" opacity="0.8" filter="url(#glow-emerald)" />
    `,
    routes: [
      { num: "1", areaId: "route-1", path: "M 240 415 L 240 560", lx: 240, ly: 492, marine: false },
      { num: "2", areaId: "route-2", path: "M 240 175 L 240 415", lx: 240, ly: 362, marine: false },
      { num: "3", areaId: "route-3", path: "M 240 175 L 400 175", lx: 320, ly: 175, marine: false },
      { num: "4", areaId: "route-4", path: "M 400 175 L 560 175", lx: 480, ly: 175, marine: false },
      { num: "5", areaId: "route-5-6", path: "M 560 175 L 560 315", lx: 560, ly: 245, marine: false },
      { num: "6", areaId: "route-5-6", path: "M 560 315 L 560 445", lx: 560, ly: 380, marine: false },
      { num: "7", areaId: "route-7-8", path: "M 420 315 L 560 315", lx: 490, ly: 315, marine: false },
      { num: "8", areaId: "route-7-8", path: "M 560 315 L 760 315", lx: 660, ly: 315, marine: false },
      { num: "9", areaId: "rock-tunnel", path: "M 560 175 L 760 175", lx: 660, ly: 175, marine: false },
      { num: "10", areaId: "rock-tunnel", path: "M 760 175 L 760 315", lx: 760, ly: 255, marine: false },
      { num: "11", areaId: "digletts-cave", path: "M 560 445 L 760 445", lx: 695, ly: 445, marine: false },
      { num: "12", areaId: "route-12-15", path: "M 760 315 L 760 520", lx: 760, ly: 482, marine: false },
      { num: "13", areaId: "route-12-15", path: "M 760 520 L 650 520", lx: 705, ly: 520, marine: false },
      { num: "14", areaId: "route-12-15", path: "M 650 520 L 650 620", lx: 650, ly: 572, marine: false },
      { num: "15", areaId: "route-12-15", path: "M 650 620 L 515 620", lx: 582, ly: 620, marine: false },
      { num: "16", areaId: "route-16-18", path: "M 420 315 L 345 315", lx: 378, ly: 315, marine: false },
      { num: "17", areaId: "route-16-18", path: "M 345 315 L 345 620", lx: 345, ly: 475, marine: false },
      { num: "18", areaId: "route-16-18", path: "M 345 620 L 515 620", lx: 430, ly: 620, marine: false },
      { num: "19", areaId: "seafoam-islands", path: "M 515 620 L 515 690 L 380 690", lx: 455, ly: 690, marine: true },
      { num: "20", areaId: "seafoam-islands", path: "M 380 690 L 240 690", lx: 310, ly: 690, marine: true },
      { num: "21", areaId: "pokemon-mansion", path: "M 240 560 L 240 690", lx: 240, ly: 625, marine: true },
      { num: "22", areaId: "route-22", path: "M 240 415 L 85 415", lx: 162, ly: 415, marine: false },
      { num: "23", areaId: "victory-road", path: "M 85 415 L 85 125", lx: 85, ly: 335, marine: false },
      { num: "24", areaId: "route-24-25", path: "M 560 175 L 560 55", lx: 560, ly: 112, marine: false },
      { num: "25", areaId: "route-24-25", path: "M 560 55 L 705 55", lx: 632, ly: 55, marine: false }
    ],
    cities: [
      { name: "Indigo Plateau", areaId: "victory-road", x: 85, y: 125, lx: 85, ly: 86, anchor: "middle" },
      { name: "Pewter City", areaId: "route-3", x: 240, y: 175, lx: 240, ly: 140, anchor: "middle" },
      { name: "Viridian City", areaId: "route-22", x: 240, y: 415, lx: 274, ly: 420, anchor: "start" },
      { name: "Pallet Town", areaId: "route-1", x: 240, y: 560, lx: 205, ly: 564, anchor: "end" },
      { name: "Cinnabar Island", areaId: "pokemon-mansion", x: 240, y: 690, lx: 204, ly: 694, anchor: "end" },
      { name: "Cerulean City", areaId: "route-24-25", x: 560, y: 175, lx: 594, ly: 152, anchor: "start" },
      { name: "Celadon City", areaId: "route-7-8", x: 420, y: 315, lx: 420, ly: 280, anchor: "middle" },
      { name: "Saffron City", areaId: "route-7-8", x: 560, y: 315, lx: 595, ly: 292, anchor: "start" },
      { name: "Vermilion City", areaId: "digletts-cave", x: 560, y: 445, lx: 525, ly: 449, anchor: "end" },
      { name: "Lavender Town", areaId: "pokemon-tower", x: 760, y: 315, lx: 760, ly: 356, anchor: "middle" },
      { name: "Fuchsia City", areaId: "safari-zone", x: 515, y: 620, lx: 515, ly: 660, anchor: "middle" }
    ],
    sites: [
      { name: "Victory Road", areaId: "victory-road", x: 85, y: 240, lx: 112, ly: 244, anchor: "start" },
      { name: "Diglett's Cave", areaId: "digletts-cave", x: 240, y: 240, lx: 214, ly: 244, anchor: "end", hideLabel: true },
      { name: "Viridian Forest", areaId: "viridian-forest", x: 240, y: 305, lx: 212, ly: 308, anchor: "end" },
      { name: "Mt. Moon", areaId: "mt-moon", x: 400, y: 175, lx: 400, ly: 142, anchor: "middle" },
      { name: "Cerulean Cave", areaId: "cerulean-cave", x: 510, y: 108, lx: 510, ly: 76, anchor: "middle" },
      { name: "Rock Tunnel", areaId: "rock-tunnel", x: 760, y: 175, lx: 786, ly: 179, anchor: "start" },
      { name: "Power Plant", areaId: "power-plant", x: 786, y: 228, lx: 760, ly: 224, anchor: "end" },
      { name: "Pokémon Tower", areaId: "pokemon-tower", x: 786, y: 284, lx: 758, ly: 282, anchor: "end" },
      { name: "Diglett's Cave", areaId: "digletts-cave", x: 620, y: 445, lx: 620, ly: 482, anchor: "middle" },
      { name: "Safari Zone", areaId: "safari-zone", x: 515, y: 565, lx: 515, ly: 534, anchor: "middle" },
      { name: "Seafoam Islands", areaId: "seafoam-islands", x: 380, y: 690, lx: 380, ly: 728, anchor: "middle" }
    ]
  },

  Johto: {
    terrainSvg: ``,
    routes: [
      { num: "29", areaId: "johto-new-bark-29", path: "M 540 520 L 680 520", lx: 610, ly: 520, marine: false },
      { num: "30", areaId: "johto-route-30-31", path: "M 540 520 L 540 340", lx: 540, ly: 430, marine: false },
      { num: "31", areaId: "johto-route-30-31", path: "M 540 340 L 450 340", lx: 495, ly: 340, marine: false },
      { num: "32", areaId: "johto-route-32-union", path: "M 450 340 L 450 610", lx: 450, ly: 475, marine: false },
      { num: "33", areaId: "johto-route-32-union", path: "M 450 610 L 350 610", lx: 395, ly: 610, marine: false },
      { num: "34", areaId: "johto-goldenrod-34", path: "M 320 610 L 320 445", lx: 320, ly: 525, marine: false },
      { num: "35", areaId: "johto-goldenrod-34", path: "M 320 445 L 320 280", lx: 320, ly: 365, marine: false },
      { num: "36", areaId: "johto-ecruteak-36-37", path: "M 320 280 L 450 280 L 450 340", lx: 395, ly: 280, marine: false },
      { num: "37", areaId: "johto-ecruteak-36-37", path: "M 390 280 L 390 210", lx: 390, ly: 245, marine: false },
      { num: "38", areaId: "johto-olivine-38-39", path: "M 390 210 L 235 210", lx: 312, ly: 210, marine: false },
      { num: "39", areaId: "johto-olivine-38-39", path: "M 235 210 L 235 325", lx: 235, ly: 268, marine: false },
      { num: "40", areaId: "johto-cianwood-whirl", path: "M 235 325 L 235 455 L 175 455", lx: 235, ly: 395, marine: true },
      { num: "41", areaId: "johto-cianwood-whirl", path: "M 175 455 L 175 560 L 105 560", lx: 175, ly: 520, marine: true },
      { num: "42", areaId: "johto-mahogany-rage", path: "M 390 210 L 540 210", lx: 445, ly: 210, marine: false },
      { num: "43", areaId: "johto-mahogany-rage", path: "M 540 210 L 540 95", lx: 540, ly: 152, marine: false },
      { num: "44", areaId: "johto-ice-blackthorn", path: "M 540 210 L 660 210", lx: 590, ly: 210, marine: false },
      { num: "45", areaId: "johto-ice-blackthorn", path: "M 660 210 L 660 395", lx: 660, ly: 305, marine: false },
      { num: "46", areaId: "johto-route-30-31", path: "M 660 395 L 620 395 L 620 520", lx: 620, ly: 455, marine: false },
      { num: "27", areaId: "johto-victory-silver", path: "M 680 520 L 805 520", lx: 742, ly: 520, marine: true },
      { num: "26", areaId: "johto-victory-silver", path: "M 805 520 L 805 220", lx: 805, ly: 390, marine: false },
      { num: "28", areaId: "johto-victory-silver", path: "M 805 280 L 735 280", lx: 770, ly: 280, marine: false }
    ],
    cities: [
      { name: "New Bark Town", areaId: "johto-new-bark-29", x: 680, y: 520, lx: 680, ly: 560, anchor: "middle" },
      { name: "Cherrygrove City", areaId: "johto-new-bark-29", x: 540, y: 520, lx: 540, ly: 560, anchor: "middle" },
      { name: "Violet City", areaId: "johto-violet-sprout", x: 450, y: 340, lx: 486, ly: 368, anchor: "start" },
      { name: "Azalea Town", areaId: "johto-azalea-ilex", x: 350, y: 610, lx: 350, ly: 650, anchor: "middle" },
      { name: "Goldenrod City", areaId: "johto-goldenrod-34", x: 320, y: 445, lx: 282, ly: 450, anchor: "end" },
      { name: "Ecruteak City", areaId: "johto-ecruteak-36-37", x: 390, y: 210, lx: 390, ly: 172, anchor: "middle" },
      { name: "Olivine City", areaId: "johto-olivine-38-39", x: 235, y: 325, lx: 196, ly: 330, anchor: "end" },
      { name: "Cianwood City", areaId: "johto-cianwood-whirl", x: 105, y: 560, lx: 105, ly: 602, anchor: "middle" },
      { name: "Mahogany Town", areaId: "johto-mahogany-rage", x: 540, y: 210, lx: 540, ly: 248, anchor: "middle" },
      { name: "Blackthorn City", areaId: "johto-ice-blackthorn", x: 660, y: 210, lx: 660, ly: 172, anchor: "middle" },
      { name: "Indigo Plateau", areaId: "johto-victory-silver", x: 805, y: 155, lx: 805, ly: 118, anchor: "middle" }
    ],
    sites: [
      { name: "Dark Cave", areaId: "johto-route-30-31", x: 585, y: 340, lx: 585, ly: 310, anchor: "middle" },
      { name: "Ruins of Alph", areaId: "johto-violet-sprout", x: 410, y: 395, lx: 382, ly: 400, anchor: "end" },
      { name: "Union Cave", areaId: "johto-route-32-union", x: 450, y: 610, lx: 450, ly: 644, anchor: "middle" },
      { name: "Ilex Forest", areaId: "johto-azalea-ilex", x: 320, y: 585, lx: 292, ly: 588, anchor: "end" },
      { name: "National Park", areaId: "johto-goldenrod-34", x: 320, y: 280, lx: 292, ly: 284, anchor: "end" },
      { name: "Whirl Islands", areaId: "johto-cianwood-whirl", x: 175, y: 455, lx: 145, ly: 458, anchor: "end" },
      { name: "Mt. Mortar", areaId: "johto-mahogany-rage", x: 485, y: 210, lx: 485, ly: 180, anchor: "middle" },
      { name: "Lake of Rage", areaId: "johto-mahogany-rage", x: 540, y: 95, lx: 540, ly: 64, anchor: "middle" },
      { name: "Ice Path", areaId: "johto-ice-blackthorn", x: 632, y: 210, lx: 632, ly: 180, anchor: "middle" },
      { name: "Mt. Silver", areaId: "johto-victory-silver", x: 735, y: 280, lx: 735, ly: 248, anchor: "middle" },
      { name: "Victory Road", areaId: "johto-victory-silver", x: 805, y: 220, lx: 832, ly: 224, anchor: "start" }
    ]
  },

  Hoenn: {
    terrainSvg: ``,
    routes: [
      { num: "101", areaId: "hoenn-littleroot-102", path: "M 190 540 L 190 465", lx: 190, ly: 502, marine: false },
      { num: "103", areaId: "hoenn-littleroot-102", path: "M 190 465 L 285 465", lx: 242, ly: 465, marine: true },
      { num: "102", areaId: "hoenn-littleroot-102", path: "M 190 465 L 115 465", lx: 152, ly: 465, marine: false },
      { num: "104", areaId: "hoenn-woods-rustboro", path: "M 115 465 L 75 465 L 75 305", lx: 75, ly: 410, marine: false },
      { num: "116", areaId: "hoenn-woods-rustboro", path: "M 75 305 L 205 305", lx: 140, ly: 305, marine: false },
      { num: "115", areaId: "hoenn-meteor-falls", path: "M 75 305 L 75 190", lx: 75, ly: 248, marine: false },
      { num: "114", areaId: "hoenn-meteor-falls", path: "M 75 190 L 75 140 L 195 140", lx: 135, ly: 140, marine: false },
      { num: "113", areaId: "hoenn-chimney-lavaridge", path: "M 195 140 L 315 140", lx: 255, ly: 140, marine: false },
      { num: "111", areaId: "hoenn-chimney-lavaridge", path: "M 315 140 L 315 335", lx: 315, ly: 270, marine: false },
      { num: "112", areaId: "hoenn-chimney-lavaridge", path: "M 315 225 L 235 225", lx: 278, ly: 225, marine: false },
      { num: "117", areaId: "hoenn-slateport-mauville", path: "M 205 335 L 315 335", lx: 260, ly: 335, marine: false },
      { num: "110", areaId: "hoenn-slateport-mauville", path: "M 315 335 L 315 480", lx: 315, ly: 408, marine: false },
      { num: "105", areaId: "hoenn-dewford-granite", path: "M 75 465 L 75 645 L 140 645", lx: 75, ly: 560, marine: true },
      { num: "107", areaId: "hoenn-dewford-granite", path: "M 140 645 L 315 645 L 315 480", lx: 230, ly: 645, marine: true },
      { num: "118", areaId: "hoenn-fortree-119-120", path: "M 315 335 L 395 335", lx: 355, ly: 335, marine: true },
      { num: "119", areaId: "hoenn-fortree-119-120", path: "M 395 335 L 395 155", lx: 395, ly: 245, marine: false },
      { num: "120", areaId: "hoenn-fortree-119-120", path: "M 395 155 L 460 155 L 460 275", lx: 460, ly: 215, marine: false },
      { num: "121", areaId: "hoenn-lilycove-pyre-safari", path: "M 460 275 L 555 275", lx: 508, ly: 275, marine: false },
      { num: "122", areaId: "hoenn-lilycove-pyre-safari", path: "M 510 275 L 510 355", lx: 510, ly: 318, marine: true },
      { num: "123", areaId: "hoenn-lilycove-pyre-safari", path: "M 510 355 L 395 355", lx: 452, ly: 355, marine: false },
      { num: "124", areaId: "hoenn-mossdeep-shoal", path: "M 555 275 L 715 275", lx: 635, ly: 275, marine: true },
      { num: "125", areaId: "hoenn-mossdeep-shoal", path: "M 715 275 L 715 195", lx: 715, ly: 232, marine: true },
      { num: "126", areaId: "hoenn-sootopolis-sky", path: "M 715 275 L 645 275 L 645 435", lx: 645, ly: 360, marine: true },
      { num: "128", areaId: "hoenn-ever-grande", path: "M 645 435 L 812 435", lx: 730, ly: 435, marine: true },
      { num: "130", areaId: "hoenn-sootopolis-sky", path: "M 645 435 L 645 555 L 485 555", lx: 575, ly: 555, marine: true },
      { num: "132", areaId: "hoenn-sootopolis-sky", path: "M 485 555 L 315 555", lx: 400, ly: 555, marine: true }
    ],
    cities: [
      { name: "Littleroot Town", areaId: "hoenn-littleroot-102", x: 190, y: 540, lx: 190, ly: 578, anchor: "middle" },
      { name: "Oldale Town", areaId: "hoenn-littleroot-102", x: 190, y: 465, lx: 190, ly: 435, anchor: "middle" },
      { name: "Petalburg City", areaId: "hoenn-littleroot-102", x: 115, y: 465, lx: 115, ly: 504, anchor: "middle" },
      { name: "Rustboro City", areaId: "hoenn-woods-rustboro", x: 75, y: 305, lx: 45, ly: 309, anchor: "end" },
      { name: "Dewford Town", areaId: "hoenn-dewford-granite", x: 140, y: 645, lx: 140, ly: 684, anchor: "middle" },
      { name: "Slateport City", areaId: "hoenn-slateport-mauville", x: 315, y: 480, lx: 352, ly: 484, anchor: "start" },
      { name: "Mauville City", areaId: "hoenn-slateport-mauville", x: 315, y: 335, lx: 350, ly: 318, anchor: "start" },
      { name: "Verdanturf Town", areaId: "hoenn-slateport-mauville", x: 205, y: 335, lx: 205, ly: 372, anchor: "middle" },
      { name: "Fallarbor Town", areaId: "hoenn-chimney-lavaridge", x: 195, y: 140, lx: 195, ly: 105, anchor: "middle" },
      { name: "Lavaridge Town", areaId: "hoenn-chimney-lavaridge", x: 235, y: 225, lx: 200, ly: 229, anchor: "end" },
      { name: "Fortree City", areaId: "hoenn-fortree-119-120", x: 395, y: 155, lx: 395, ly: 120, anchor: "middle" },
      { name: "Lilycove City", areaId: "hoenn-lilycove-pyre-safari", x: 555, y: 275, lx: 555, ly: 240, anchor: "middle" },
      { name: "Mossdeep City", areaId: "hoenn-mossdeep-shoal", x: 715, y: 275, lx: 752, ly: 279, anchor: "start" },
      { name: "Sootopolis City", areaId: "hoenn-sootopolis-sky", x: 645, y: 435, lx: 608, ly: 439, anchor: "end" },
      { name: "Pacifidlog Town", areaId: "hoenn-sootopolis-sky", x: 485, y: 555, lx: 485, ly: 594, anchor: "middle" },
      { name: "Ever Grande City", areaId: "hoenn-ever-grande", x: 812, y: 435, lx: 812, ly: 398, anchor: "middle" }
    ],
    sites: [
      { name: "Petalburg Woods", areaId: "hoenn-woods-rustboro", x: 75, y: 365, lx: 104, ly: 369, anchor: "start" },
      { name: "Granite Cave", areaId: "hoenn-dewford-granite", x: 105, y: 615, lx: 105, ly: 586, anchor: "middle" },
      { name: "Abandoned Ship", areaId: "hoenn-dewford-granite", x: 235, y: 645, lx: 235, ly: 616, anchor: "middle" },
      { name: "Meteor Falls", areaId: "hoenn-meteor-falls", x: 75, y: 190, lx: 104, ly: 194, anchor: "start" },
      { name: "Mt. Chimney", areaId: "hoenn-chimney-lavaridge", x: 265, y: 195, lx: 265, ly: 168, anchor: "middle" },
      { name: "Safari Zone", areaId: "hoenn-lilycove-pyre-safari", x: 495, y: 240, lx: 495, ly: 212, anchor: "middle" },
      { name: "Mt. Pyre", areaId: "hoenn-lilycove-pyre-safari", x: 510, y: 320, lx: 538, ly: 324, anchor: "start" },
      { name: "Shoal Cave", areaId: "hoenn-mossdeep-shoal", x: 715, y: 195, lx: 715, ly: 166, anchor: "middle" },
      { name: "Sky Pillar", areaId: "hoenn-sootopolis-sky", x: 555, y: 520, lx: 555, ly: 492, anchor: "middle" },
      { name: "Victory Road", areaId: "hoenn-ever-grande", x: 812, y: 472, lx: 812, ly: 504, anchor: "middle" }
    ]
  }
};

// ============================================================================
// 5. ESTADO GLOBAL & FUNÇÕES UTILITÁRIAS
// ============================================================================
let gpsState = {
  gameId: "rb",
  mode: "pokemon", // "pokemon" | "items"
  selectedAreaId: null, // Só destaca após o usuário clicar em uma rota/cidade ou pesquisar
  methodFilter: "all",
  versionFilter: "both",
  searchQuery: "",
  zoom: 1,
  panX: 0,
  panY: 0
};

function getSpriteUrl(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

function getAreasForCurrentGame() {
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG.rb;
  if (cfg.region === "Johto") return JOHTO_AREAS;
  if (cfg.region === "Hoenn") return HOENN_AREAS;
  return KANTO_AREAS;
}

function doesItemMatchQuery(item, area, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  return (
    item.name.toLowerCase().includes(q) ||
    (item.move && item.move.toLowerCase().includes(q)) ||
    item.how.toLowerCase().includes(q) ||
    area.name.toLowerCase().includes(q)
  );
}

function doesAreaMatchSearch(area, query) {
  if (!query) return false;
  const q = query.toLowerCase();
  if (gpsState.mode === "items") {
    return (
      area.name.toLowerCase().includes(q) ||
      (area.items && area.items.some(it => doesItemMatchQuery(it, area, q)))
    );
  }
  return (
    area.name.toLowerCase().includes(q) ||
    area.encounters.some(e => e.name.toLowerCase().includes(q))
  );
}

function doesAreaMatchFilter(area) {
  if (gpsState.methodFilter === "all") return true;
  if (gpsState.mode === "items") {
    return area.items ? area.items.some(it => it.category === gpsState.methodFilter) : false;
  }
  return area.encounters.some(e => e.method === gpsState.methodFilter);
}

// ============================================================================
// 6. RENDERIZAÇÃO DOS MODOS DA SIDEBAR, FILTROS E SELETORES DE VERSÃO
// ============================================================================
function syncModeSidebarUI() {
  const btnPokemon = document.getElementById("btn-gps-mode-pokemon");
  const btnItems = document.getElementById("btn-gps-mode-items");
  const searchInput = document.getElementById("gps-search-input");
  const methodSelect = document.getElementById("gps-method-select");

  const isItems = gpsState.mode === "items";

  if (btnPokemon && btnItems) {
    if (!isItems) {
      btnPokemon.className = "w-full text-left p-space-md rounded-xl bg-surface-container-high border border-primary/50 shadow-md transition-all cursor-pointer flex items-start gap-3";
      btnItems.className = "w-full text-left p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-all cursor-pointer flex items-start gap-3";
    } else {
      btnItems.className = "w-full text-left p-space-md rounded-xl bg-surface-container-high border border-secondary/60 shadow-md transition-all cursor-pointer flex items-start gap-3";
      btnPokemon.className = "w-full text-left p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-all cursor-pointer flex items-start gap-3";
    }
  }

  if (searchInput) {
    searchInput.placeholder = isItems
      ? "Buscar Item, TM/HM ou Ataque (ex: Leftovers, Thunderbolt, Earthquake, Surf, Ice Beam)..."
      : "Buscar Rota (ex: Viridian Forest, Rota 32, Safari) ou Pokémon (ex: Pikachu, Ralts, Heracross)...";
  }

  if (methodSelect) {
    if (isItems) {
      methodSelect.innerHTML = `
        <option class="bg-surface-container-highest text-on-surface" value="all">Todos os Itens &amp; TMs</option>
        <option class="bg-surface-container-highest text-on-surface" value="tm">💿 TMs &amp; HMs (Ataques)</option>
        <option class="bg-surface-container-highest text-on-surface" value="held">🎒 Itens Segurados (Held)</option>
        <option class="bg-surface-container-highest text-on-surface" value="stone">💎 Pedras &amp; Evolução</option>
        <option class="bg-surface-container-highest text-on-surface" value="key">🔑 Itens Chave / Especiais</option>
      `;
    } else {
      methodSelect.innerHTML = `
        <option class="bg-surface-container-highest text-on-surface" value="all">Todos os Métodos</option>
        <option class="bg-surface-container-highest text-on-surface" value="grass">🌿 Grama Alta</option>
        <option class="bg-surface-container-highest text-on-surface" value="cave">⛰️ Caverna</option>
        <option class="bg-surface-container-highest text-on-surface" value="fish">🎣 Pesca</option>
        <option class="bg-surface-container-highest text-on-surface" value="surf">🌊 Surf</option>
        <option class="bg-surface-container-highest text-on-surface" value="static">🎁 Estático / Troca</option>
      `;
    }
    methodSelect.value = gpsState.methodFilter;
  }
}

function renderVersionFilterBar() {
  const bar = document.getElementById("version-filter-bar");
  if (!bar) return;
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG.rb;
  const versions = cfg.versions || GAME_GPS_CONFIG.rb.versions;

  if (!versions.some(v => v.key === gpsState.versionFilter)) {
    gpsState.versionFilter = "both";
  }

  bar.innerHTML = versions.map(v => {
    const active = v.key === gpsState.versionFilter;
    const cls = active
      ? `px-2.5 py-1 rounded font-label-sm text-label-sm font-bold ${v.activeClass} cursor-pointer`
      : "px-2.5 py-1 rounded font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer";
    return `<button type="button" data-version-filter="${v.key}" class="${cls}">${v.label}</button>`;
  }).join("");

  bar.querySelectorAll("[data-version-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      gpsState.versionFilter = btn.getAttribute("data-version-filter");
      renderVersionFilterBar();
      renderSelectedAreaDetails();
    });
  });
}

// ============================================================================
// 7. RENDERIZAÇÃO DO MAPA SVG (KANTO, JOHTO E HOENN EM ESTILO TOWN MAP RADAR)
// ============================================================================
function renderInteractiveMapNodes() {
  const nodesGroup = document.getElementById("kanto-interactive-nodes");
  const terrainGroup = document.getElementById("region-terrain-layer");
  if (!nodesGroup) return;

  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG.rb;
  const layout = REGION_MAP_LAYOUTS[cfg.region] || REGION_MAP_LAYOUTS.Kanto;
  const areas = getAreasForCurrentGame();
  const query = gpsState.searchQuery.trim().toLowerCase();

  if (terrainGroup) {
    terrainGroup.innerHTML = layout.terrainSvg;
  }

  const isAreaMatched = areaId => {
    const area = areas.find(a => a.id === areaId);
    return area ? doesAreaMatchSearch(area, query) : false;
  };

  const isAreaMethodActive = areaId => {
    const area = areas.find(a => a.id === areaId);
    return area ? doesAreaMatchFilter(area) : true;
  };

  // 1. Render Orthogonal Route Strips (Border + Fill + Route Number)
  const routesSvg = layout.routes.map(r => {
    const isSelected = r.areaId === gpsState.selectedAreaId;
    const matched = isAreaMatched(r.areaId);
    const hasMethod = isAreaMethodActive(r.areaId);
    const opacity = !hasMethod ? "0.35" : "1";

    const outerStroke = isSelected
      ? "#38bdf8"
      : matched
        ? "#f59e0b"
        : r.marine
          ? "#0284c7"
          : "#475569";

    const innerStroke = isSelected
      ? "#0c4a6e"
      : matched
        ? "#78350f"
        : r.marine
          ? "#0369a1"
          : "#1e293b";

    const numFill = isSelected
      ? "#8ed5ff"
      : matched
        ? "#fde047"
        : r.marine
          ? "#7dd3fc"
          : "#dde2f7";

    return `
      <g class="cursor-pointer group" data-area-id="${r.areaId}" opacity="${opacity}">
        <path d="${r.path}" stroke="${outerStroke}" stroke-width="26" stroke-linecap="square" stroke-linejoin="miter" ${isSelected ? 'filter="url(#glow-cyan)"' : ""}>
          ${isSelected || matched ? `<animate attributeName="stroke-width" values="25;30;25" dur="1.6s" repeatCount="indefinite" />` : ""}
        </path>
        <path d="${r.path}" stroke="${innerStroke}" stroke-width="19" stroke-linecap="square" stroke-linejoin="miter" class="group-hover:stroke-[#1e3a5f] transition-colors"></path>
        <text x="${r.lx}" y="${r.ly + 4}" fill="${numFill}" font-family="JetBrains Mono" font-size="11.5" font-weight="800" text-anchor="middle">${r.num}</text>
      </g>
    `;
  }).join("");

  // 2. Render Beveled Red Square Cities (Ville)
  const citiesSvg = layout.cities.map(c => {
    const isSelected = c.areaId === gpsState.selectedAreaId;
    const matched = isAreaMatched(c.areaId);
    return `
      <g class="cursor-pointer group" data-area-id="${c.areaId}" transform="translate(${c.x}, ${c.y})">
        ${isSelected || matched ? `
          <rect x="-22" y="-22" width="44" height="44" rx="4" fill="none" stroke="${matched ? "#f59e0b" : "#38bdf8"}" stroke-width="2.5" opacity="0.55">
            <animate attributeName="x" values="-18;-25;-18" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="-18;-25;-18" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="width" values="36;50;36" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="height" values="36;50;36" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.65;0.15;0.65" dur="1.6s" repeatCount="indefinite" />
          </rect>
        ` : ""}
        <rect x="-17" y="-17" width="34" height="34" fill="#475569" stroke="${isSelected ? "#38bdf8" : matched ? "#f59e0b" : "#94a3b8"}" stroke-width="${isSelected || matched ? "2.5" : "1.5"}" />
        <polygon points="-17,-17 17,-17 11,-11 -11,-11" fill="#94a3b8" opacity="0.55" />
        <polygon points="-17,17 17,17 11,11 -11,11" fill="#1e293b" opacity="0.8" />
        <rect x="-11" y="-11" width="22" height="22" fill="${isSelected ? "#38bdf8" : matched ? "#f59e0b" : "#ef4444"}" class="group-hover:fill-[#f87171] transition-colors" filter="url(#glow-red)" />
      </g>
      <text x="${c.lx}" y="${c.ly}" fill="${isSelected ? "#8ed5ff" : matched ? "#fde047" : "#dde2f7"}" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" text-anchor="${c.anchor}" style="paint-order: stroke; stroke: #060c1a; stroke-width: 4px; stroke-linejoin: round;">${c.name}</text>
    `;
  }).join("");

  // 3. Render Green Circular Sites / Dungeons (Site)
  const sitesSvg = layout.sites.map(s => {
    const isSelected = s.areaId === gpsState.selectedAreaId;
    const matched = isAreaMatched(s.areaId);
    const hasMethod = isAreaMethodActive(s.areaId);
    const opacity = !hasMethod ? "0.35" : "1";

    return `
      <g class="cursor-pointer group" data-area-id="${s.areaId}" opacity="${opacity}">
        ${isSelected || matched ? `
          <circle cx="${s.x}" cy="${s.y}" r="16" fill="${matched ? "#f59e0b" : "#38bdf8"}" opacity="0.35">
            <animate attributeName="r" values="14;25;14" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0.12;0.55" dur="1.6s" repeatCount="indefinite" />
          </circle>
        ` : ""}
        <circle
          cx="${s.x}"
          cy="${s.y}"
          r="14"
          fill="${isSelected ? "#38bdf8" : matched ? "#f59e0b" : "#10b981"}"
          stroke="${isSelected ? "#e0f2fe" : "#64748b"}"
          stroke-width="3.5"
          filter="${isSelected ? "url(#glow-cyan)" : "url(#glow-emerald)"}"
        >
          ${isSelected || matched ? `<animate attributeName="r" values="13.5;16;13.5" dur="1.6s" repeatCount="indefinite" />` : ""}
        </circle>
        ${!s.hideLabel ? `
          <text
            x="${s.lx}"
            y="${s.ly}"
            fill="${isSelected ? "#8ed5ff" : matched ? "#fde047" : "#56e5a9"}"
            font-family="Plus Jakarta Sans"
            font-size="11.5"
            font-weight="700"
            text-anchor="${s.anchor}"
            style="paint-order: stroke; stroke: #060c1a; stroke-width: 4px; stroke-linejoin: round;"
          >${s.name}</text>
        ` : ""}
      </g>
    `;
  }).join("");

  nodesGroup.innerHTML = routesSvg + citiesSvg + sitesSvg;

  nodesGroup.querySelectorAll("[data-area-id]").forEach(node => {
    node.addEventListener("click", () => {
      const areaId = node.getAttribute("data-area-id");
      selectArea(areaId);
    });
  });
}

function renderAreaSelectorQuickList() {
  const bar = document.getElementById("quick-route-pills");
  if (!bar) return;
  const areas = getAreasForCurrentGame();

  bar.innerHTML = areas.map(area => {
    const active = area.id === gpsState.selectedAreaId;
    return `
      <button
        type="button"
        data-quick-area="${area.id}"
        class="shrink-0 px-2.5 py-1 rounded font-label-sm text-label-sm transition-all cursor-pointer border ${
          active
            ? "bg-primary text-on-primary border-primary font-bold shadow-sm"
            : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-primary border-outline-variant"
        }"
      >
        ${area.name}
      </button>
    `;
  }).join("");

  bar.querySelectorAll("[data-quick-area]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectArea(btn.getAttribute("data-quick-area"));
    });
  });
}

// ============================================================================
// 8. RENDERIZAÇÃO DO PAINEL DIREITO (MODO POKÉMON OU MODO ITENS & TMS)
// ============================================================================
function renderSelectedAreaDetails() {
  const areas = getAreasForCurrentGame();
  const area = gpsState.selectedAreaId
    ? areas.find(a => a.id === gpsState.selectedAreaId)
    : null;

  const gameConfig = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG.rb;

  const regionTitleEl = document.getElementById("map-region-title");
  if (regionTitleEl) {
    regionTitleEl.textContent = `Região de ${gameConfig.region}`;
  }

  // Update telemetry HUD on map
  const hudLevel = document.getElementById("hud-level-range");
  const hudTypes = document.getElementById("hud-dominant-types");
  const hudCount = document.getElementById("hud-species-count");

  const titleEl = document.getElementById("panel-area-title");
  const connEl = document.getElementById("panel-area-connections");
  const listEl = document.getElementById("encounter-cards-list");

  // Estado padrão quando o usuário ainda não clicou em nenhuma rota/cidade/caverna
  if (!area) {
    if (hudLevel) hudLevel.textContent = "—";
    if (hudTypes) hudTypes.textContent = "Selecione uma rota";
    if (hudCount) hudCount.textContent = `${areas.length} Zonas no Mapa`;

    if (titleEl) titleEl.textContent = "Selecione uma Rota ou Cidade";
    if (connEl) {
      connEl.textContent = "Clique em qualquer rota, cidade ou caverna no mapa ao lado para destacar e inspecionar";
    }

    if (listEl) {
      if (gpsState.mode === "items" && gpsState.searchQuery.trim()) {
        renderItemsPanelList(listEl, areas[0], areas, gameConfig);
      } else {
        listEl.innerHTML = `
          <div class="bg-surface-container rounded-lg p-6 border border-outline-variant text-center space-y-2.5">
            <span class="material-symbols-outlined text-3xl text-primary">ads_click</span>
            <p class="font-headline-sm text-headline-sm text-on-surface">Nenhuma localização selecionada no mapa</p>
            <p class="font-body-sm text-body-sm text-on-surface-variant">
              Clique em qualquer <strong>rota numerada</strong>, <strong>cidade (quadrado vermelho)</strong> ou <strong>caverna/local (círculo verde)</strong> no mapa para ver ${gpsState.mode === "items" ? "os Itens, TMs e HMs" : "os Pokémon e taxas de aparição"} daquela área.
            </p>
          </div>
        `;
      }
    }
    return;
  }

  if (hudLevel) hudLevel.textContent = area.levelRange;
  if (hudTypes) hudTypes.textContent = area.dominantTypes;
  if (hudCount) {
    hudCount.textContent = gpsState.mode === "items"
      ? `${(area.items || []).length} Itens / TMs`
      : `${area.encounters.length} Catalogadas`;
  }

  if (titleEl) titleEl.textContent = area.name;
  if (connEl) {
    connEl.textContent = gpsState.mode === "items"
      ? `${area.connections} • ${(area.items || []).length} Itens / TMs nesta área`
      : `${area.connections} • ${area.encounters.length} Espécies Registradas`;
  }

  if (!listEl) return;

  // MODO 2: PESQUISA DE ITENS & TMs
  if (gpsState.mode === "items") {
    renderItemsPanelList(listEl, area, areas, gameConfig);
    return;
  }

  // MODO 1: PESQUISA DE POKÉMON
  const query = gpsState.searchQuery.trim().toLowerCase();
  const filtered = area.encounters.filter(enc => {
    if (gpsState.methodFilter !== "all" && enc.method !== gpsState.methodFilter) return false;
    if (gpsState.versionFilter === "red" && enc.rateRed === 0) return false;
    if (gpsState.versionFilter === "blue" && enc.rateBlue === 0) return false;
    if (query && !enc.name.toLowerCase().includes(query) && !area.name.toLowerCase().includes(query)) return false;
    return true;
  });

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="bg-surface-container rounded-lg p-6 border border-outline-variant text-center space-y-2">
        <span class="material-symbols-outlined text-3xl text-outline">travel_explore</span>
        <p class="font-headline-sm text-headline-sm text-on-surface">Nenhum Pokémon encontrado com o filtro atual nesta área</p>
        <p class="font-body-sm text-body-sm text-on-surface-variant">Experimente mudar o filtro de método ("Todos os Métodos") ou clicar em outra rota destacada em amarelo no mapa.</p>
      </div>
    `;
    return;
  }

  const v1Name = gameConfig.versions[0]?.label || "Red";
  const v2Name = gameConfig.versions[1]?.label || "Blue";

  listEl.innerHTML = filtered.map(enc => {
    const paddedId = String(enc.id).padStart(3, "0");
    const typeBadges = enc.types.map(t => {
      const cls = TYPE_BADGE_STYLES[t] || "bg-slate-500/20 text-slate-200 border-slate-500/40";
      return `<span class="px-1.5 py-0.5 rounded font-label-sm text-label-sm border uppercase ${cls}">${t}</span>`;
    }).join("");

    let rateLabel = "";
    let barWidth = 50;
    let barColor = "bg-primary-container";
    let badgeClass = "bg-primary-container/20 text-primary border-primary/40";

    if (gpsState.versionFilter === "red") {
      rateLabel = `${enc.rateRed}% (${v1Name})`;
      barWidth = enc.rateRed;
      barColor = "bg-error";
      badgeClass = "bg-error-container/30 text-error border-error/40";
    } else if (gpsState.versionFilter === "blue") {
      rateLabel = `${enc.rateBlue}% (${v2Name})`;
      barWidth = enc.rateBlue;
      barColor = "bg-primary-container";
      badgeClass = "bg-primary-container/20 text-primary border-primary/40";
    } else {
      if (enc.rateRed === enc.rateBlue) {
        rateLabel = `${enc.rateRed}% Spawn`;
        barWidth = enc.rateRed;
        if (enc.rateRed <= 10) {
          barColor = "bg-secondary";
          badgeClass = "bg-secondary-container/30 text-secondary border-secondary/40";
        } else {
          barColor = "bg-tertiary";
          badgeClass = "bg-tertiary-container/30 text-tertiary border-tertiary/40";
        }
      } else {
        rateLabel = `${v1Name}: ${enc.rateRed}% / ${v2Name}: ${enc.rateBlue}%`;
        barWidth = Math.max(enc.rateRed, enc.rateBlue);
        if (enc.rateRed > enc.rateBlue) {
          barColor = "bg-error";
          badgeClass = "bg-error-container/30 text-error border-error/40";
        } else {
          barColor = "bg-primary-container";
          badgeClass = "bg-primary-container/20 text-primary border-primary/40";
        }
      }
    }

    const timeTagHtml = (gameConfig.hasTimeOfDay && enc.timeTag)
      ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm border border-outline-variant/60" title="Período de Aparição">${enc.timeTag}</span>`
      : "";
    const seasonTagHtml = (gameConfig.hasSeasons && enc.seasonTag)
      ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-label-sm border border-outline-variant/60" title="Estação com Taxa Alterada">${enc.seasonTag}</span>`
      : "";
    const versionTagHtml = enc.versionTag
      ? `<span class="text-[10px] px-1.5 py-0.5 rounded bg-surface-container-low text-primary font-label-sm border border-primary/30">${enc.versionTag}</span>`
      : "";

    const hasAnyTags = Boolean(timeTagHtml || seasonTagHtml || versionTagHtml);

    return `
      <div class="bg-surface-container rounded-lg p-space-md border ${enc.recommended ? "border-primary/45 shadow-md" : "border-outline-variant"} hover:border-primary transition-all duration-150">
        <div class="flex items-start justify-between gap-2">
          <div class="flex items-center space-x-space-md">
            <div class="relative w-14 h-14 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <div class="absolute inset-0 ${enc.recommended ? "bg-primary/10" : "bg-surface-container-lowest/40"} rounded-lg"></div>
              <img
                class="w-full h-full object-contain relative z-10"
                alt="${enc.name}"
                loading="lazy"
                src="${getSpriteUrl(enc.id)}"
              />
            </div>
            <div>
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="font-headline-sm text-headline-sm text-on-surface">${enc.name}</span>
                <span class="font-label-sm text-label-sm text-outline">#${paddedId}</span>
                ${typeBadges}
              </div>
              <div class="text-label-sm font-label-sm text-on-surface-variant mt-1">
                Faixa de Nível: <span class="text-on-surface font-semibold">${enc.levels}</span> • ${enc.methodLabel}
              </div>
              ${hasAnyTags ? `
                <div class="flex flex-wrap items-center gap-1 mt-1.5">
                  ${timeTagHtml}
                  ${seasonTagHtml}
                  ${versionTagHtml}
                </div>
              ` : ""}
            </div>
          </div>

          <div class="text-right shrink-0">
            <span class="inline-block px-2 py-0.5 rounded font-label-md text-label-md font-bold border ${badgeClass}">
              ${rateLabel}
            </span>
            ${enc.highlight ? `<span class="block text-[10px] text-secondary font-label-sm uppercase mt-1 font-bold">${enc.highlight}</span>` : ""}
          </div>
        </div>

        <div class="mt-2.5">
          <div class="flex justify-between text-label-sm font-label-sm mb-1">
            <span class="text-outline">Chance de Encontro na Área:</span>
            <span class="text-on-surface font-bold">${rateLabel}</span>
          </div>
          <div class="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
            <div class="h-full ${barColor} rounded-full transition-all duration-300" style="width: ${Math.max(3, barWidth)}%"></div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderItemsPanelList(listEl, currentArea, allAreas, gameConfig) {
  const query = gpsState.searchQuery.trim().toLowerCase();

  // Se houver uma busca ativa (ex: vindo do PTR clicando na lupa de um Item ou Ataque),
  // mostramos os resultados encontrados na rota atual E em qualquer outra rota da região!
  let itemsToShow = [];

  if (query) {
    allAreas.forEach(a => {
      (a.items || []).forEach(it => {
        if (gpsState.methodFilter !== "all" && it.category !== gpsState.methodFilter) return;
        if (doesItemMatchQuery(it, a, query)) {
          itemsToShow.push({ item: it, area: a });
        }
      });
    });
  } else {
    (currentArea.items || []).forEach(it => {
      if (gpsState.methodFilter !== "all" && it.category !== gpsState.methodFilter) return;
      itemsToShow.push({ item: it, area: currentArea });
    });
  }

  if (itemsToShow.length === 0) {
    listEl.innerHTML = `
      <div class="bg-surface-container rounded-lg p-6 border border-outline-variant text-center space-y-2.5">
        <span class="material-symbols-outlined text-3xl text-secondary">inventory_2</span>
        <p class="font-headline-sm text-headline-sm text-on-surface">
          ${query
            ? `Nenhum Item ou TM/HM específico para "${gpsState.searchQuery}" catalogado em ${gameConfig.name}`
            : "Nenhum item desta categoria nesta área"}
        </p>
        <p class="font-body-sm text-body-sm text-on-surface-variant">
          ${query
            ? "Nota: Alguns golpes são aprendidos naturalmente por Nível (Level-Up), Egg Move ou surgiram como TM em outras gerações. Limpe a busca acima para ver todos os TMs, HMs e Held Items desta rota!"
            : "Experimente selecionar 'Todos os Itens & TMs' no filtro acima ou clicar em outra rota/cidade do mapa."}
        </p>
        ${query ? `
          <button type="button" id="btn-clear-item-query" class="mt-2 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-headline font-bold text-xs cursor-pointer">
            Ver Todos os Itens de ${currentArea.name}
          </button>
        ` : ""}
      </div>
    `;
    document.getElementById("btn-clear-item-query")?.addEventListener("click", () => {
      gpsState.searchQuery = "";
      const input = document.getElementById("gps-search-input");
      if (input) input.value = "";
      renderInteractiveMapNodes();
      renderSelectedAreaDetails();
    });
    return;
  }

  listEl.innerHTML = itemsToShow.map(({ item, area }) => {
    const catMeta = ITEM_CATEGORY_META[item.category] || ITEM_CATEGORY_META.key;
    const moveTypeBadge = item.moveType
      ? `<span class="px-1.5 py-0.5 rounded font-label-sm text-label-sm border uppercase ${TYPE_BADGE_STYLES[item.moveType] || TYPE_BADGE_STYLES.Normal}">${item.moveType}</span>`
      : "";
    const isOtherArea = area.id !== gpsState.selectedAreaId;

    return `
      <div class="bg-surface-container rounded-lg p-space-md border ${query ? "border-secondary/60 shadow-md" : "border-outline-variant"} hover:border-secondary transition-all duration-150">
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-start space-x-space-md min-w-0">
            <div class="w-12 h-12 rounded-xl bg-surface-container-high border border-outline-variant flex items-center justify-center text-2xl shrink-0">
              ${item.icon || "🎒"}
            </div>
            <div class="min-w-0">
              <div class="flex flex-wrap items-center gap-1.5">
                <span class="font-headline-sm text-headline-sm text-on-surface">${item.name}</span>
                ${moveTypeBadge}
              </div>
              <div class="flex flex-wrap items-center gap-1.5 mt-1">
                <span class="px-2 py-0.5 rounded font-label-sm text-[10px] font-bold border ${catMeta.badgeClass}">
                  ${catMeta.label}
                </span>
                <button type="button" data-focus-item-area="${area.id}" class="px-2 py-0.5 rounded bg-surface-container-highest hover:bg-primary-container text-primary hover:text-on-primary-container font-label-sm text-[10px] font-bold border border-primary/30 flex items-center gap-1 cursor-pointer transition-colors" title="Focar esta rota no mapa">
                  <span class="material-symbols-outlined text-[12px]">pin_drop</span>
                  ${area.name}
                </button>
              </div>
              <p class="text-xs text-on-surface-variant mt-2 leading-relaxed">
                <strong class="text-on-surface">Como obter:</strong> ${item.how}
              </p>
            </div>
          </div>
          ${isOtherArea ? `
            <button type="button" data-focus-item-area="${area.id}" class="shrink-0 px-2.5 py-1 rounded bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container border border-primary/40 font-label-sm text-[10px] font-bold cursor-pointer">
              Ver no Mapa
            </button>
          ` : ""}
        </div>
      </div>
    `;
  }).join("");

  listEl.querySelectorAll("[data-focus-item-area]").forEach(btn => {
    btn.addEventListener("click", () => {
      selectArea(btn.getAttribute("data-focus-item-area"));
    });
  });
}

function selectArea(areaId) {
  gpsState.selectedAreaId = areaId;
  renderInteractiveMapNodes();
  renderAreaSelectorQuickList();
  renderSelectedAreaDetails();
}

function setGpsMode(newMode) {
  if (newMode !== "pokemon" && newMode !== "items") return;
  gpsState.mode = newMode;
  gpsState.methodFilter = "all";
  syncModeSidebarUI();
  renderInteractiveMapNodes();
  renderSelectedAreaDetails();
}

function autoSelectMatchingAreaForQuery(q) {
  if (!q) return;
  const areas = getAreasForCurrentGame();
  const matchedArea = areas.find(a => doesAreaMatchSearch(a, q));
  if (matchedArea) {
    gpsState.selectedAreaId = matchedArea.id;
  }
}

// ============================================================================
// 9. INICIALIZAÇÃO & LEITURA DOS PARÂMETROS DE BUSCA DO PTR (?game=&mode=&q=)
// ============================================================================
function applyUrlQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const rawGame = params.get("game");
  const rawMode = params.get("mode");
  const rawQuery = params.get("q");

  if (rawGame) {
    const mappedGame = PTR_GAME_ID_MAP[rawGame] || (GAME_GPS_CONFIG[rawGame] ? rawGame : null);
    if (mappedGame) {
      gpsState.gameId = mappedGame;
      const gameSelect = document.getElementById("gps-game-select");
      if (gameSelect) gameSelect.value = mappedGame;
    }
  }

  if (rawMode === "items" || rawMode === "pokemon") {
    gpsState.mode = rawMode;
  }

  if (rawQuery) {
    gpsState.searchQuery = rawQuery.trim();
    const searchInput = document.getElementById("gps-search-input");
    if (searchInput) searchInput.value = gpsState.searchQuery;
    autoSelectMatchingAreaForQuery(gpsState.searchQuery);
  }
}

function initGpsPage() {
  // Sidebar "Modos do GPS": Inicia sempre FECHADA (collapsed + sidebar-closed), igual ao PTR!
  const sidebarEl = document.getElementById("gps-modes-sidebar");
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  if (sidebarEl && btnToggleSidebar) {
    sidebarEl.classList.add("collapsed");
    document.body.classList.add("sidebar-closed");

    btnToggleSidebar.addEventListener("click", () => {
      sidebarEl.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-closed");
    });
  }

  // Botões de Modo do GPS: Pesquisa de Pokémon | Pesquisa de Itens & TMs
  document.getElementById("btn-gps-mode-pokemon")?.addEventListener("click", () => {
    setGpsMode("pokemon");
    if (window.matchMedia("(max-width: 1023px)").matches && sidebarEl) {
      sidebarEl.classList.add("collapsed");
      document.body.classList.add("sidebar-closed");
    }
  });

  document.getElementById("btn-gps-mode-items")?.addEventListener("click", () => {
    setGpsMode("items");
    if (window.matchMedia("(max-width: 1023px)").matches && sidebarEl) {
      sidebarEl.classList.add("collapsed");
      document.body.classList.add("sidebar-closed");
    }
  });

  // Seletor de Jogo (Até Hoenn)
  const gameSelect = document.getElementById("gps-game-select");
  if (gameSelect) {
    gameSelect.addEventListener("change", e => {
      gpsState.gameId = e.target.value;
      gpsState.selectedAreaId = null;
      if (gpsState.searchQuery) {
        autoSelectMatchingAreaForQuery(gpsState.searchQuery);
      }
      renderVersionFilterBar();
      renderInteractiveMapNodes();
      renderAreaSelectorQuickList();
      renderSelectedAreaDetails();
    });
  }

  // Filtro de Método / Categoria de Item
  const methodSelect = document.getElementById("gps-method-select");
  if (methodSelect) {
    methodSelect.addEventListener("change", e => {
      gpsState.methodFilter = e.target.value;
      renderInteractiveMapNodes();
      renderSelectedAreaDetails();
    });
  }

  // Campo de Busca
  const searchInput = document.getElementById("gps-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      gpsState.searchQuery = e.target.value;
      const q = gpsState.searchQuery.trim().toLowerCase();
      if (q) {
        autoSelectMatchingAreaForQuery(q);
      }
      renderInteractiveMapNodes();
      renderAreaSelectorQuickList();
      renderSelectedAreaDetails();
    });

    window.addEventListener("keydown", e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // Controles de Zoom & Pan do Mapa (Botão do Meio / Scroll Hold + Roda do Mouse)
  const svgEl = document.getElementById("kanto-radar-svg");
  const mapViewport = svgEl?.parentElement;

  const applyMapTransform = (isDragging = false) => {
    if (svgEl) {
      svgEl.style.transition = isDragging ? "none" : "transform 180ms ease-out";
      svgEl.style.transform = `translate(${gpsState.panX}px, ${gpsState.panY}px) scale(${gpsState.zoom})`;
      svgEl.style.transformOrigin = "center center";
    }
  };

  document.getElementById("btn-zoom-in")?.addEventListener("click", () => {
    gpsState.zoom = Math.min(2.2, +(gpsState.zoom + 0.15).toFixed(2));
    applyMapTransform();
  });
  document.getElementById("btn-zoom-out")?.addEventListener("click", () => {
    gpsState.zoom = Math.max(0.65, +(gpsState.zoom - 0.15).toFixed(2));
    applyMapTransform();
  });
  document.getElementById("btn-zoom-reset")?.addEventListener("click", () => {
    gpsState.zoom = 1;
    gpsState.panX = 0;
    gpsState.panY = 0;
    applyMapTransform();
  });

  if (mapViewport) {
    let isPanning = false;
    let startX = 0;
    let startY = 0;

    mapViewport.addEventListener("mousedown", e => {
      if (e.button === 1) {
        e.preventDefault();
        isPanning = true;
        startX = e.clientX - gpsState.panX;
        startY = e.clientY - gpsState.panY;
        mapViewport.style.cursor = "grabbing";
      }
    });

    mapViewport.addEventListener("auxclick", e => {
      if (e.button === 1) e.preventDefault();
    });

    window.addEventListener("mousemove", e => {
      if (!isPanning) return;
      gpsState.panX = e.clientX - startX;
      gpsState.panY = e.clientY - startY;
      applyMapTransform(true);
    });

    window.addEventListener("mouseup", e => {
      if (isPanning && e.button === 1) {
        isPanning = false;
        mapViewport.style.cursor = "";
        applyMapTransform(false);
      }
    });

    mapViewport.addEventListener("wheel", e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      gpsState.zoom = Math.min(2.2, Math.max(0.65, +(gpsState.zoom + delta).toFixed(2)));
      applyMapTransform();
    }, { passive: false });
  }

  // Aplica parâmetros vindos da URL (?game=...&mode=items&q=...) e renderiza tudo
  applyUrlQueryParams();
  syncModeSidebarUI();
  renderVersionFilterBar();
  renderInteractiveMapNodes();
  renderAreaSelectorQuickList();
  renderSelectedAreaDetails();
}

document.addEventListener("DOMContentLoaded", initGpsPage);
