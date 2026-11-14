/**
 * GPS POKÉMON — SISTEMA CARTOGRÁFICO TÁTICO (GEN 1 A GEN 8 + POKÉMON UNBOUND)
 * - Jogos suportados: Gen 1 (RB/Y), Gen 2 (GSC), Gen 3 (RSE/FRLG), Gen 4 (DPP/HGSS),
 *   Gen 5 (BW/B2W2), Gen 6 (XY/ORAS), Gen 7 (SM/USUM/LGPE), Gen 8 (SwSh/BDSP/PLA) e Pokémon Unbound (Borrius)
 * - Modos do GPS: "Pesquisa de Pokémon" (Encontros & Spawns) e "Pesquisa de Itens & TMs" (Held Items, TMs/HMs, Pedras, Mega Stones)
 * - Integração direta com o Pokémon Team Recommendations (PTR) via parâmetros de URL (?game=...&mode=items&q=...)
 */

const GAME_GPS_CONFIG = {
  "gen1-rb": {
    id: "gen1-rb",
    name: "Pokémon Red / Blue",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Red", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "Blue", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen1-yellow": {
    id: "gen1-yellow",
    name: "Pokémon Yellow (Special Pikachu Edition)",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "both", label: "Special Pikachu Edition (Yellow)", activeClass: "bg-secondary-container/30 text-secondary border border-secondary/50" }
    ]
  },
  "gen2-gsc": {
    id: "gen2-gsc",
    name: "Pokémon Gold / Silver / Crystal",
    region: "Johto",
    hasDualRegions: true,
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Gold", activeClass: "bg-secondary-container/35 text-secondary border border-secondary/50" },
      { key: "blue", label: "Silver", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Gold / Silver / Crystal", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen3-rse": {
    id: "gen3-rse",
    name: "Pokémon Ruby / Sapphire / Emerald",
    region: "Hoenn",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Ruby", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "Sapphire", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Ruby / Sapphire / Emerald", activeClass: "bg-tertiary-container/30 text-tertiary border border-tertiary/50" }
    ]
  },
  "gen3-frlg": {
    id: "gen3-frlg",
    name: "Pokémon FireRed / LeafGreen",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "FireRed", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "LeafGreen", activeClass: "bg-tertiary-container/30 text-tertiary border border-tertiary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen4-dpp": {
    id: "gen4-dpp",
    name: "Pokémon Diamond / Pearl / Platinum",
    region: "Sinnoh",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Diamond", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Pearl", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Diamond / Pearl / Platinum", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen4-hgss": {
    id: "gen4-hgss",
    name: "Pokémon HeartGold / SoulSilver",
    region: "Johto",
    hasDualRegions: true,
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "HeartGold", activeClass: "bg-secondary-container/35 text-secondary border border-secondary/50" },
      { key: "blue", label: "SoulSilver", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen5-bw": {
    id: "gen5-bw",
    name: "Pokémon Black / White",
    region: "Unova",
    hasTimeOfDay: true,
    hasSeasons: true,
    versions: [
      { key: "red", label: "Black", activeClass: "bg-surface-container-highest text-on-surface border border-outline" },
      { key: "blue", label: "White", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen5-b2w2": {
    id: "gen5-b2w2",
    name: "Pokémon Black 2 / White 2",
    region: "Unova",
    hasTimeOfDay: true,
    hasSeasons: true,
    versions: [
      { key: "red", label: "Black 2", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "White 2", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen6-xy": {
    id: "gen6-xy",
    name: "Pokémon X / Y",
    region: "Kalos",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Pokémon X", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Pokémon Y", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen6-oras": {
    id: "gen6-oras",
    name: "Pokémon Omega Ruby / Alpha Sapphire",
    region: "Hoenn",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Omega Ruby", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "blue", label: "Alpha Sapphire", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen7-sm-usum": {
    id: "gen7-sm-usum",
    name: "Pokémon Sun / Moon / Ultra Sun / Ultra Moon",
    region: "Alola",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Sun / Ultra Sun", activeClass: "bg-secondary-container/35 text-secondary border border-secondary/50" },
      { key: "blue", label: "Moon / Ultra Moon", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "both", label: "Todas as Versões", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen7-lgpe": {
    id: "gen7-lgpe",
    name: "Pokémon Let's Go, Pikachu! / Let's Go, Eevee!",
    region: "Kanto",
    hasTimeOfDay: false,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Let's Go Pikachu", activeClass: "bg-secondary-container/35 text-secondary border border-secondary/50" },
      { key: "blue", label: "Let's Go Eevee", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen8-swsh": {
    id: "gen8-swsh",
    name: "Pokémon Sword / Shield",
    region: "Galar",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Sword", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Shield", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "gen8-bdsp": {
    id: "gen8-bdsp",
    name: "Pokémon Brilliant Diamond / Shining Pearl",
    region: "Sinnoh",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Brilliant Diamond", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Shining Pearl", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Comparar Ambas", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "fangame-unbound": {
    id: "fangame-unbound",
    name: "Pokémon Unbound (Borrius)",
    region: "Borrius",
    isMapBugged: true,
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Vanilla / Difficult", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Expert / Insane", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Todas as Dificuldades", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  },
  "fangame-lazarus": {
    id: "fangame-lazarus",
    name: "Pokémon Lazarus (Ilios)",
    region: "Ilios",
    hasTimeOfDay: true,
    hasSeasons: false,
    versions: [
      { key: "red", label: "Standard", activeClass: "bg-primary-container/30 text-primary border border-primary/50" },
      { key: "blue", label: "Hardcore Mode", activeClass: "bg-error-container/40 text-error border border-error/50" },
      { key: "both", label: "Todas as Modalidades", activeClass: "bg-surface-container-high text-primary border border-primary/40" }
    ]
  }
};

// Mapeamento dos IDs de jogos do PTR (index.html) e atalhos legados para o GPS Pokémon
const PTR_GAME_ID_MAP = {
  "rb": "gen1-rb",
  "yellow": "gen1-yellow",
  "gsc": "gen2-gsc",
  "rse": "gen3-rse",
  "frlg": "gen3-frlg",
  "gen1-rb": "gen1-rb",
  "gen1-yellow": "gen1-yellow",
  "gen2-gsc": "gen2-gsc",
  "gen3-rse": "gen3-rse",
  "gen3-frlg": "gen3-frlg",
  "gen4-dpp": "gen4-dpp",
  "gen4-hgss": "gen4-hgss",
  "gen5-bw": "gen5-bw",
  "gen5-b2w2": "gen5-b2w2",
  "gen6-xy": "gen6-xy",
  "gen6-oras": "gen6-oras",
  "gen7-sm-usum": "gen7-sm-usum",
  "gen7-lgpe": "gen7-lgpe",
  "gen8-swsh": "gen8-swsh",
  "gen8-bdsp": "gen8-bdsp",
  "fangame-unbound": "fangame-unbound",
  "fangame-lazarus": "fangame-lazarus"
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
  "Venenoso": "bg-purple-500/20 text-purple-300 border-purple-500/40",
  "Terra": "bg-amber-600/20 text-amber-300 border-amber-500/40",
  "Terrestre": "bg-amber-600/20 text-amber-300 border-amber-500/40",
  "Voador": "bg-indigo-400/20 text-indigo-200 border-indigo-400/40",
  "Psíquico": "bg-pink-500/20 text-pink-300 border-pink-500/40",
  "Inseto": "bg-lime-500/20 text-lime-300 border-lime-500/40",
  "Pedra": "bg-yellow-700/25 text-amber-200 border-yellow-600/40",
  "Fantasma": "bg-violet-600/25 text-violet-300 border-violet-500/40",
  "Dragão": "bg-indigo-600/25 text-indigo-300 border-indigo-500/40",
  "Aço": "bg-slate-400/25 text-slate-200 border-slate-400/40",
  "Metálico": "bg-slate-400/25 text-slate-200 border-slate-400/40",
  "Noturno": "bg-neutral-700/40 text-neutral-200 border-neutral-500/40",
  "Sombrio": "bg-neutral-700/40 text-neutral-200 border-neutral-500/40",
  "Fada": "bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40"
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
// 2B. DADOS DE KANTO NOS JOGOS DE JOHTO (GSC GEN 2 & HGSS GEN 4 — 2ª REGIÃO)
// ============================================================================
const JOHTO_KANTO_AREAS = [
  {
    id: "jk-vermilion-diglett-11",
    name: "Vermilion City (Porto S.S. Aqua), Rota 6, Rota 11 & Diglett's Cave",
    sector: "Setor Kanto Central-Sul — Chegada de Navio",
    category: "route",
    connections: "Porto de Olivine (S.S. Aqua) ⇄ Vermilion City ⇄ Rota 6 (Saffron) & Rota 11 (Diglett's Cave)",
    levelRange: "Lv. 13 — 50",
    dominantTypes: "Normal / Terra / Elétrico / Psíquico",
    encounters: [
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueando a entrada da Diglett's Cave na Rota 11 (Sintonize a PokéFlute na Rádio!)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "🍎 Vem segurando Leftovers!", recommended: true },
      { id: 51, name: "Dugtrio", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave (Liga a Rota 11 à Rota 2)", levels: "Lv. 19 — 31", rateRed: 15, rateBlue: 15, highlight: "⚡ Velocidade 120 + Earthquake", recommended: true },
      { id: 50, name: "Diglett", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave", levels: "Lv. 13 — 19", rateRed: 85, rateBlue: 85 },
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "grass", methodLabel: "🌿 Rota 6 & Rota 11", levels: "Lv. 14 — 16", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 96, name: "Drowzee", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 6 & Rota 11", levels: "Lv. 13 — 16", rateRed: 30, rateBlue: 30 },
      { id: 380, name: "Latias / Latios (HGSS)", types: ["Dragão", "Psíquico"], method: "static", methodLabel: "🎁 Encontro com Steven Stone saindo do Pokémon Fan Club de Vermilion (Latias em HG / Latios em SS)", levels: "Lv. 35", rateRed: 100, rateBlue: 100, highlight: "🐉 LENDÁRIO ERRANTE (HGSS)", recommended: true }
    ],
    items: [
      { name: "Leftovers", category: "held", icon: "🍎", how: "Segurado pelo Snorlax Lv. 50 estacionado na entrada da Diglett's Cave na Rota 11!" },
      { name: "Lost Item (Poké Doll da Copycat)", category: "key", icon: "🧸", how: "Entregue pelo homem com Clefairy dentro do Pokémon Fan Club de Vermilion City (após restaurar a Power Plant). Devolva para a Copycat em Saffron City para ganhar o Pass do Magnet Train!" },
      { name: "TM34 — Shock Wave (HGSS)", move: "Shock Wave", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio do Líder Lt. Surge no Ginásio de Vermilion City (HeartGold / SoulSilver)." },
      { name: "HP Up & Rare Candy", category: "key", icon: "🍬", how: "Entregue pelo Presidente do Pokémon Fan Club de Vermilion City ao ouvir suas histórias." }
    ]
  },
  {
    id: "jk-saffron-celadon-7-8",
    name: "Saffron City, Celadon City & Rotas 5, 7 e 8 (Houndour & Murkrow!)",
    sector: "Metrópole de Kanto — Exclusivos Noturnos de Johto",
    category: "route",
    connections: "Rota 5 ⇄ Saffron City ⇄ Rota 7 ⇄ Celadon City & Rota 8",
    levelRange: "Lv. 15 — 25",
    dominantTypes: "Noturno / Fogo / Psíquico / Fantasma",
    encounters: [
      { id: 228, name: "Houndour", types: ["Noturno", "Fogo"], method: "grass", methodLabel: "🌿 Rota 7 (Grama Alta entre Saffron e Celadon — Somente à Noite!)", levels: "Lv. 15 — 18", rateRed: 30, rateBlue: 30, timeTag: "🌙 Somente à Noite", highlight: "🔥 ÚNICO LUGAR DE GSC/HGSS P/ CAPTURAR HOUNDOUR!", recommended: true },
      { id: 198, name: "Murkrow", types: ["Noturno", "Voador"], method: "grass", methodLabel: "🌿 Rota 7 & Rota 16 (Somente à Noite!)", levels: "Lv. 15 — 18", rateRed: 20, rateBlue: 20, timeTag: "🌙 Somente à Noite", highlight: "🦅 Nativo de Johto encontrado só em Kanto!", recommended: true },
      { id: 137, name: "Porygon", types: ["Normal"], method: "static", methodLabel: "🎁 Celadon Game Corner (Prêmio de Fichas em Celadon City)", levels: "Lv. 15 — 20", rateRed: 100, rateBlue: 100, highlight: "🤖 Evolui p/ Porygon2 com Up-Grade da Silph Co.!", recommended: true },
      { id: 64, name: "Kadabra", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 8 (Entre Saffron e Lavender)", levels: "Lv. 15 — 17", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 93, name: "Haunter", types: ["Fantasma", "Veneno"], method: "grass", methodLabel: "🌿 Rota 8 (Noite)", levels: "Lv. 15 — 18", rateRed: 20, rateBlue: 20, timeTag: "🌙 Noite", recommended: true },
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "grass", methodLabel: "🌿 Rotas 7 & 8 (Gold / HeartGold)", levels: "Lv. 15 — 18", rateRed: 20, rateBlue: 0, versionTag: "🟡 Gold / HeartGold", recommended: true },
      { id: 37, name: "Vulpix", types: ["Fogo"], method: "grass", methodLabel: "🌿 Rotas 7 & 8 (Silver / SoulSilver)", levels: "Lv. 15 — 18", rateRed: 0, rateBlue: 20, versionTag: "⚪ Silver / SoulSilver" }
    ],
    items: [
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Entregue pelo Sr. Psychic na casa ao sul de Saffron City (ou por 3.500 fichas no Cassino de Celadon)!" },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Escondido na lata de lixo no fundo do Restaurante de Celadon City!" },
      { name: "Up-Grade (Evolui Porygon p/ Porygon2)", category: "stone", icon: "💾", how: "Entregue pelo guarda no balcão da Silph Co. em Saffron City!" },
      { name: "TM19 — Giga Drain", move: "Giga Drain", moveType: "Planta", category: "tm", icon: "💿", how: "Prêmio da Líder Erika no Ginásio de Celadon City!" },
      { name: "TM03 — Curse (GSC)", move: "Curse", moveType: "Fantasma", category: "tm", icon: "💿", how: "Entregue pelo homem no 3º andar da Celadon Mansion à noite (entrando pela porta dos fundos)." },
      { name: "TM48 — Skill Swap (HGSS)", move: "Skill Swap", moveType: "Psíquico", category: "tm", icon: "💿", how: "Prêmio da Líder Sabrina no Ginásio de Saffron City (HeartGold / SoulSilver)." },
      { name: "Magnet Train Pass & TM31 — Mimic", move: "Mimic", moveType: "Normal", category: "key", icon: "🚆", how: "Entregue pela Copycat em Saffron City ao devolver a Poké Doll perdida no Pokémon Fan Club de Vermilion." },
      { name: "Cleanse Tag", category: "held", icon: "🧿", how: "Entregue pela avó no último andar da Celadon Mansion." }
    ]
  },
  {
    id: "jk-cerulean-24-25-power-plant",
    name: "Cerulean City, Rotas 9–10, Rotas 24–25, Rock Tunnel, Power Plant & Cerulean Cave",
    sector: "Setor Kanto Nordeste — Usina Elétrica & Lendários",
    category: "cave",
    connections: "Cerulean City ⇄ Rotas 24–25 (Casa do Bill) ⇄ Rotas 9–10 ⇄ Rock Tunnel & Power Plant",
    levelRange: "Lv. 15 — 70",
    dominantTypes: "Elétrico / Água / Psíquico / Lutador",
    encounters: [
      { id: 125, name: "Electabuzz", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Grama da Rota 10 em frente à Power Plant", levels: "Lv. 15 — 18", rateRed: 25, rateBlue: 25, highlight: "⚡ Forte atacante elétrico", recommended: true },
      { id: 245, name: "Suicune (HGSS)", types: ["Água"], method: "static", methodLabel: "🎁 Colina da Rota 25 ao lado da Casa do Bill (Após derrotar a Misty em HGSS)", levels: "Lv. 40", rateRed: 100, rateBlue: 100, highlight: "💧 LENDÁRIO ESTÁTICO (HGSS)", recommended: true },
      { id: 145, name: "Zapdos (HGSS)", types: ["Elétrico", "Voador"], method: "static", methodLabel: "🎁 Exterior da Power Plant na Rota 10 (Após obter as 16 Insígnias em HGSS)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "⚡ AVE LENDÁRIA (HGSS)", recommended: true },
      { id: 150, name: "Mewtwo (HGSS)", types: ["Psíquico"], method: "static", methodLabel: "🎁 Profundezas da Cerulean Cave (Após conquistar as 16 Insígnias em HGSS!)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "👑 LENDÁRIO SUPREMO LV. 70", recommended: true },
      { id: 115, name: "Kangaskhan", types: ["Normal"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 15", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 67, name: "Machoke", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 16 — 18", rateRed: 20, rateBlue: 20 },
      { id: 105, name: "Marowak", types: ["Terra"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 14 — 17", rateRed: 15, rateBlue: 15 }
    ],
    items: [
      { name: "Machine Part (Peça da Usina)", category: "key", icon: "⚙️", how: "Escondida nas boias da piscina esquerda do Ginásio de Cerulean City (após encontrar o capanga da Equipe Rocket na ponte da Rota 24). Entregue na Power Plant!" },
      { name: "TM07 — Zap Cannon (GSC) / TM57 — Charge Beam (HGSS)", move: "Charge Beam", moveType: "Elétrico", category: "tm", icon: "💿", how: "Entregue pelo Diretor da Power Plant após você devolver a Machine Part roubada!" },
      { name: "Fire Stone, Water Stone, Thunder Stone, Leaf Stone & Everstone", category: "stone", icon: "💎", how: "Entregues pelo Avô do Bill na Casa do Bill (Cabo de Cerulean — Rota 25) ao mostrar os Pokémon que ele pede (Lickitung, Oddish, Staryu, Growlithe/Vulpix e Pichu)!" },
      { name: "TM03 — Water Pulse (HGSS)", move: "Water Pulse", moveType: "Água", category: "tm", icon: "💿", how: "Prêmio da Líder Misty no Ginásio de Cerulean City (HeartGold / SoulSilver)." },
      { name: "Nugget", category: "key", icon: "🪙", how: "Prêmio ao derrotar os treinadores da Nugget Bridge nas Rotas 24 e 25." },
      { name: "Berserk Gene (GSC)", category: "held", icon: "🧬", how: "Usando Itemfinder na água ao noroeste de Cerulean City (onde ficava a entrada da Cerulean Cave em GSC)." }
    ]
  },
  {
    id: "jk-lavender-12-15-fuchsia",
    name: "Lavender Town (Kanto Radio Tower), Rotas 12–15 & Fuchsia City",
    sector: "Setor Kanto Sudeste — Rádio, Pesca & Chansey",
    category: "route",
    connections: "Lavender Town ⇄ Rota 12 (Super Rod) ⇄ Rotas 13–15 ⇄ Fuchsia City (Ginásio Veneno / Pal Park)",
    levelRange: "Lv. 20 — 30",
    dominantTypes: "Normal / Veneno / Água / Voador",
    encounters: [
      { id: 113, name: "Chansey", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 13, 14 & 15 (Grama Alta — 1% ou Enxame!)", levels: "Lv. 23 — 25", rateRed: 5, rateBlue: 5, highlight: "🥚 Evolui p/ Blissey + pode segurar Lucky Egg!", recommended: true },
      { id: 142, name: "Aerodactyl", types: ["Pedra", "Voador"], method: "static", methodLabel: "🎁 Troca NPC na Rota 14 (Por Chansey em GSC) ou revivendo Old Amber em Pewter (HGSS)", levels: "Lv. 20 — 25", rateRed: 100, rateBlue: 100, highlight: "🦖 Velocidade 130", recommended: true },
      { id: 195, name: "Quagsire", types: ["Água", "Terra"], method: "grass", methodLabel: "🌿 Rotas 12, 13, 14 & 15 (Noite / Surf)", levels: "Lv. 22 — 26", rateRed: 30, rateBlue: 30, recommended: true },
      { id: 211, name: "Qwilfish", types: ["Água", "Veneno"], method: "fish", methodLabel: "🎣 Super Rod na Rota 12 e Rota 13", levels: "Lv. 20 — 40", rateRed: 15, rateBlue: 15 },
      { id: 33, name: "Nidorino / Nidorina", types: ["Veneno"], method: "grass", methodLabel: "🌿 Rotas 13, 14 & 15", levels: "Lv. 22 — 25", rateRed: 30, rateBlue: 30 }
    ],
    items: [
      { name: "EXPN Card (Cartão de Expansão da Rádio — PokéFlute)", category: "key", icon: "📻", how: "Entregue pelo Diretor dentro da Kanto Radio Tower em Lavender Town após consertar a Power Plant! Permite tocar a PokéFlute no Pokégear para acordar o Snorlax!" },
      { name: "Super Rod", category: "key", icon: "🎣", how: "Entregue pelo Guru da Pesca na casa da ponte da Rota 12 (ao sul de Lavender Town)!" },
      { name: "TM06 — Toxic (GSC) / TM84 — Poison Jab (HGSS)", move: "Toxic", moveType: "Veneno", category: "tm", icon: "💿", how: "Prêmio da Líder Janine no Ginásio de Fuchsia City!" },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Segurado por Chansey selvagens nas Rotas 13, 14 e 15!" },
      { name: "Soul Dew (HGSS)", category: "held", icon: "💧", how: "Evento de Latias/Latios no Museu de Pewter City (Enigma Stone)." }
    ]
  },
  {
    id: "jk-cycling-16-18",
    name: "Cycling Road (Rotas 16, 17 & 18 — Slugma & Murkrow!)",
    sector: "Ciclovia de Kanto",
    category: "route",
    connections: "Celadon City (Oeste) ⇄ Rota 16 ⇄ Rota 17 (Cycling Road) ⇄ Rota 18 ⇄ Fuchsia City",
    levelRange: "Lv. 16 — 29",
    dominantTypes: "Fogo / Noturno / Veneno / Voador",
    encounters: [
      { id: 218, name: "Slugma", types: ["Fogo"], method: "grass", methodLabel: "🌿 Grama das Rotas 16, 17 & 18 (Cycling Road)", levels: "Lv. 22 — 29", rateRed: 30, rateBlue: 30, highlight: "🌋 ÚNICO LUGAR EM GSC P/ CAPTURAR SLUGMA!", recommended: true },
      { id: 198, name: "Murkrow", types: ["Noturno", "Voador"], method: "grass", methodLabel: "🌿 Rota 16 & Rota 18 (Noite)", levels: "Lv. 24 — 28", rateRed: 20, rateBlue: 20, timeTag: "🌙 Noite", recommended: true },
      { id: 89, name: "Muk", types: ["Veneno"], method: "grass", methodLabel: "🌿 Rotas 16, 17 & 18", levels: "Lv. 26 — 29", rateRed: 15, rateBlue: 15 },
      { id: 22, name: "Fearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rotas 16, 17 & 18 (Manhã / Dia)", levels: "Lv. 25 — 29", rateRed: 35, rateBlue: 35 }
    ],
    items: [
      { name: "PP Up & Max Ether", category: "key", icon: "🧪", how: "Escondidos na pista da Cycling Road (Rota 17) usando o Itemfinder / Dowsing MCHN." }
    ]
  },
  {
    id: "jk-pewter-mt-moon-3-4",
    name: "Pewter City, Rota 3, Mt. Moon & Rota 4",
    sector: "Setor Kanto Noroeste — Pena Lendária & Pedra da Lua",
    category: "cave",
    connections: "Viridian City ⇄ Pewter City ⇄ Rota 3 ⇄ Mt. Moon ⇄ Rota 4 ⇄ Cerulean City",
    levelRange: "Lv. 10 — 20",
    dominantTypes: "Fada / Pedra / Terra / Voador",
    encounters: [
      { id: 35, name: "Clefairy", types: ["Normal"], method: "cave", methodLabel: "⛰️ Mt. Moon & Mt. Moon Square (Dança nas segundas-feiras à noite!)", levels: "Lv. 12 — 16", rateRed: 20, rateBlue: 20, highlight: "🌙 Deixa Moon Stone toda segunda à noite!", recommended: true },
      { id: 138, name: "Omanyte / Kabuto / Aerodactyl (HGSS)", types: ["Pedra", "Água"], method: "static", methodLabel: "🎁 Reviva Helix Fossil, Dome Fossil e Old Amber no Museu de Pewter City (HGSS)", levels: "Lv. 20", rateRed: 100, rateBlue: 100, recommended: true },
      { id: 28, name: "Sandslash", types: ["Terra"], method: "cave", methodLabel: "⛰️ Mt. Moon", levels: "Lv. 15", rateRed: 20, rateBlue: 0, versionTag: "🟡 Gold / HeartGold" },
      { id: 39, name: "Jigglypuff", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 3 & 4", levels: "Lv. 12 — 15", rateRed: 20, rateBlue: 20 }
    ],
    items: [
      { name: "Silver Wing (Gold/HG) / Rainbow Wing (Silver/SS)", category: "key", icon: "🪶", how: "Entregue pelo velhinho na saída leste de Pewter City! Libera o encontro com Lugia Lv. 70 (em Gold) ou Ho-Oh Lv. 70 (em Silver)!" },
      { name: "Moon Stone", category: "stone", icon: "🌙", how: "Na Mt. Moon Square toda segunda-feira à noite: assista aos Clefairy dançando e use Rock Smash na pedra central!" },
      { name: "TM80 — Rock Slide (HGSS)", move: "Rock Slide", moveType: "Pedra", category: "tm", icon: "💿", how: "Prêmio do Líder Brock no Ginásio de Pewter City (HeartGold / SoulSilver)." }
    ]
  },
  {
    id: "jk-pallet-viridian-1-2",
    name: "Pallet Town (Lab. do Prof. Oak), Rota 1, Viridian City, Rota 2 & Viridian Forest",
    sector: "Setor Kanto Oeste — 16ª Insígnia & Iniciais Extras",
    category: "route",
    connections: "Pallet Town ⇄ Rota 1 ⇄ Viridian City (Ginásio do Blue / Trainer House) ⇄ Rota 2 & Viridian Forest",
    levelRange: "Lv. 3 — 50",
    dominantTypes: "Elétrico / Planta / Fogo / Água / Inseto",
    encounters: [
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 2 & Viridian Forest", levels: "Lv. 3 — 7", rateRed: 10, rateBlue: 10, highlight: "⚡ Ícone de Kanto", recommended: true },
      { id: 1, name: "Bulbasaur / Charmander / Squirtle (HGSS)", types: ["Planta", "Fogo"], method: "static", methodLabel: "🎁 Entregue pelo Prof. Oak no Laboratório de Pallet Town após derrotar Red no Mt. Silver (HGSS)!", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "👑 Inicial Clássico de Kanto!", recommended: true },
      { id: 252, name: "Treecko / Torchic / Mudkip (HGSS)", types: ["Planta", "Água"], method: "static", methodLabel: "🎁 Entregue por Steven Stone na Silph Co. (Saffron) após derrotar Red no Mt. Silver (HGSS)!", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "👑 Inicial de Hoenn!", recommended: true },
      { id: 166, name: "Ledian / Ariados", types: ["Inseto"], method: "grass", methodLabel: "🌿 Rota 2 & Viridian Forest", levels: "Lv. 7 — 12", rateRed: 25, rateBlue: 25 }
    ],
    items: [
      { name: "HM08 — Rock Climb (HGSS)", move: "Rock Climb", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Prof. Oak no laboratório de Pallet Town após você conquistar todas as 16 Insígnias (Johto + Kanto)! Libera o acesso ao Mt. Silver!" },
      { name: "TM42 — Dream Eater", move: "Dream Eater", moveType: "Psíquico", category: "tm", icon: "💿", how: "Entregue pelo homem dormindo atrás do arbusto de Cut no canto sudoeste de Viridian City!" },
      { name: "TM92 — Trick Room (HGSS)", move: "Trick Room", moveType: "Psíquico", category: "tm", icon: "💿", how: "Prêmio do Líder Blue no Ginásio de Viridian City (16ª Insígnia em HeartGold / SoulSilver)." }
    ]
  },
  {
    id: "jk-cinnabar-seafoam-19-21",
    name: "Rotas Marítimas 19–21, Seafoam Islands & Cinnabar Island",
    sector: "Setor Insular Sul de Kanto — Vulcão & Caverna de Gelo",
    category: "cave",
    connections: "Pallet Town ⇄ Rota 21 ⇄ Cinnabar Island (Blue) ⇄ Rota 20 ⇄ Seafoam Islands (Blaine) ⇄ Rota 19 ⇄ Fuchsia City",
    levelRange: "Lv. 20 — 50",
    dominantTypes: "Gelo / Água / Fogo / Psíquico",
    encounters: [
      { id: 144, name: "Articuno (HGSS)", types: ["Gelo", "Voador"], method: "static", methodLabel: "🎁 Profundezas das Seafoam Islands (Após conquistar as 16 Insígnias em HGSS)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "❄️ AVE LENDÁRIA (HGSS)", recommended: true },
      { id: 124, name: "Jynx", types: ["Gelo", "Psíquico"], method: "cave", methodLabel: "⛰️ Seafoam Islands (HGSS)", levels: "Lv. 30 — 34", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 87, name: "Dewgong", types: ["Água", "Gelo"], method: "cave", methodLabel: "⛰️ Seafoam Islands", levels: "Lv. 32 — 36", rateRed: 25, rateBlue: 25 },
      { id: 120, name: "Staryu", types: ["Água"], method: "fish", methodLabel: "🎣 Rotas 19, 20 & 21 (Noite)", levels: "Lv. 20 — 30", rateRed: 30, rateBlue: 30, recommended: true }
    ],
    items: [
      { name: "TM13 — Ice Beam (HGSS)", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Andar subterrâneo das Seafoam Islands (HeartGold / SoulSilver)!" },
      { name: "TM50 — Overheat (HGSS)", move: "Overheat", moveType: "Fogo", category: "tm", icon: "💿", how: "Prêmio do Líder Blaine no Ginásio reconstruído nas Seafoam Islands (HeartGold / SoulSilver)." }
    ]
  },
  {
    id: "jk-victory-mt-silver-22-28",
    name: "Rotas 22, 26, 27, 28, Victory Road, Indigo Plateau & Mt. Silver (Red!)",
    sector: "Fronteira Kanto-Johto & Batalha Final no Mt. Silver",
    category: "cave",
    connections: "Viridian City ⇄ Rota 22 ⇄ Victory Road / Indigo Plateau & Rota 28 ⇄ Mt. Silver (Treinador Red Lv. 81–88!)",
    levelRange: "Lv. 30 — 55",
    dominantTypes: "Pedra / Terra / Fantasma / Noturno / Fogo",
    encounters: [
      { id: 246, name: "Larvitar & Pupitar", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Interior do Mt. Silver (1F, 2F e Topo)", levels: "Lv. 15 — 40", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Tyranitar (600 BST Pseudo-Lendário!)", recommended: true },
      { id: 200, name: "Misdreavus", types: ["Fantasma"], method: "cave", methodLabel: "⛰️ Caverna do Mt. Silver (Somente à Noite!)", levels: "Lv. 42 — 45", rateRed: 10, rateBlue: 10, timeTag: "🌙 Somente à Noite", highlight: "👻 ÚNICO LUGAR DE GSC P/ CAPTURAR MISDREAVUS!", recommended: true },
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "grass", methodLabel: "🌿 Rota 28 & Exterior do Mt. Silver (Noite)", levels: "Lv. 38 — 42", rateRed: 20, rateBlue: 20, timeTag: "🌙 Noite", recommended: true },
      { id: 146, name: "Moltres (HGSS)", types: ["Fogo", "Voador"], method: "static", methodLabel: "🎁 Interior da Caverna do Mt. Silver (Requer Waterfall & Rock Climb em HGSS)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "🔥 AVE LENDÁRIA (HGSS)", recommended: true },
      { id: 232, name: "Donphan", types: ["Terra"], method: "cave", methodLabel: "⛰️ Rota 28 & Mt. Silver (Silver / SoulSilver)", levels: "Lv. 40 — 42", rateRed: 0, rateBlue: 25, versionTag: "⚪ Silver / SoulSilver", recommended: true },
      { id: 217, name: "Ursaring", types: ["Normal"], method: "cave", methodLabel: "⛰️ Rota 28 & Mt. Silver (Gold / HeartGold)", levels: "Lv. 40 — 42", rateRed: 25, rateBlue: 0, versionTag: "🟡 Gold / HeartGold", recommended: true }
    ],
    items: [
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "1º andar (1F) da Victory Road (caia pelo buraco no canto noroeste do 2º andar)!" },
      { name: "TM47 — Steel Wing", move: "Steel Wing", moveType: "Aço", category: "tm", icon: "💿", how: "Entregue pela celebridade na casa isolada da Rota 28 (usando Cut ao norte da rota rumo ao Mt. Silver)!" },
      { name: "TM22 — Solar Beam", move: "Solar Beam", moveType: "Planta", category: "tm", icon: "💿", how: "Penhasco da Rota 27 usando Whirlpool após atravessar as Tohjo Falls." },
      { name: "Expert Belt & Flame Orb (HGSS)", category: "held", icon: "🥋", how: "Interior do Mt. Silver (Expert Belt) e loja da Battle Frontier (Flame Orb)." }
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
// 4A. DADOS DE SINNOH (DIAMOND/PEARL/PLATINUM & BRILLIANT DIAMOND/SHINING PEARL)
// ============================================================================
const SINNOH_AREAS = [
  {
    id: "sinnoh-twinleaf-jubilife",
    name: "Twinleaf Town, Lake Verity, Sandgem & Jubilife (Rotas 201–203)",
    sector: "Setor Sinnoh Sul-Oeste",
    category: "route",
    connections: "Twinleaf Town ⇄ Lake Verity ⇄ Sandgem Town ⇄ Jubilife City (Rotas 201, 202 e 203)",
    levelRange: "Lv. 2 — 7",
    dominantTypes: "Normal / Voador / Elétrico / Planta",
    encounters: [
      { id: 387, name: "Turtwig", types: ["Planta"], method: "static", methodLabel: "🎁 Inicial do Prof. Rowan (Rota 201 / Lake Verity)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Planta", recommended: true },
      { id: 390, name: "Chimchar", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial do Prof. Rowan (Rota 201 / Lake Verity)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "⭐ Melhor Inicial de Sinnoh", recommended: true },
      { id: 393, name: "Piplup", types: ["Água"], method: "static", methodLabel: "🎁 Inicial do Prof. Rowan (Rota 201 / Lake Verity)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Água", recommended: true },
      { id: 396, name: "Starly", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta (Rotas 201, 202 e 203)", levels: "Lv. 2 — 6", rateRed: 50, rateBlue: 50, highlight: "Evolui p/ Staraptor (Intimidate + Close Combat)", recommended: true },
      { id: 403, name: "Shinx", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Grama Alta (Rotas 202 e 203)", levels: "Lv. 3 — 6", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Luxray", recommended: true },
      { id: 63, name: "Abra", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Grama Alta (Rota 203)", levels: "Lv. 4 — 6", rateRed: 15, rateBlue: 15, recommended: true },
      { id: 280, name: "Ralts", types: ["Psíquico", "Fada"], method: "grass", methodLabel: "🌿 Rota 203 / 204 (Platinum & Grand Underground em BDSP)", levels: "Lv. 4 — 7", rateRed: 15, rateBlue: 15, highlight: "Evolui p/ Gardevoir ou Gallade", recommended: true },
      { id: 481, name: "Mesprit", types: ["Psíquico"], method: "static", methodLabel: "🎁 Lake Verity Cavern (Passa a vagar por Sinnoh)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "Lendário Guardião" }
    ],
    items: [
      { name: "TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue pelo Prof. Rowan na Rota 201/Sandgem Town (ou em Jubilife TV Station)!" },
      { name: "Quick Claw", category: "held", icon: "🐾", how: "Entregue pela garota no 1º andar do condomínio de Jubilife City (nordeste)." },
      { name: "Old Rod", category: "key", icon: "🎣", how: "Pescador no portão oeste de Jubilife City (saída para a Rota 218)." },
      { name: "Pokétch", category: "key", icon: "⌚", how: "Entregue pelo presidente da Pokétch Company em Jubilife City após responder aos 3 palhaços." }
    ]
  },
  {
    id: "sinnoh-oreburgh-floaroma-eterna",
    name: "Oreburgh City, Floaroma, Valley Windworks & Eterna Forest (Rotas 204–205)",
    sector: "Setor Sinnoh Oeste",
    category: "route",
    connections: "Jubilife ⇄ Oreburgh City ⇄ Floaroma Town ⇄ Valley Windworks ⇄ Eterna Forest",
    levelRange: "Lv. 5 — 16",
    dominantTypes: "Planta / Água / Fantasma / Pedra",
    encounters: [
      { id: 406, name: "Budew", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Rota 204 & Eterna Forest", levels: "Lv. 4 — 12", rateRed: 25, rateBlue: 25, highlight: "Evolui p/ Roserade", recommended: true },
      { id: 422, name: "Shellos", types: ["Água"], method: "grass", methodLabel: "🌿 Rota 205 & Valley Windworks (West Sea Rosa)", levels: "Lv. 8 — 12", rateRed: 45, rateBlue: 45, highlight: "Evolui p/ Gastrodon (Água/Terra)", recommended: true },
      { id: 425, name: "Drifloon", types: ["Fantasma", "Voador"], method: "static", methodLabel: "🎁 Em frente à Valley Windworks (Sextas-feiras)", levels: "Lv. 15 — 22", rateRed: 100, rateBlue: 100, highlight: "🎈 Estático de Sexta-feira", recommended: true },
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Old Chateau (Interior da Eterna Forest)", levels: "Lv. 12 — 16", rateRed: 100, rateBlue: 100, highlight: "Evolui p/ Gengar", recommended: true },
      { id: 479, name: "Rotom", types: ["Elétrico", "Fantasma"], method: "static", methodLabel: "🎁 TV do Old Chateau na Eterna Forest (Noite)", levels: "Lv. 15 — 20", rateRed: 100, rateBlue: 100, timeTag: "🌙 Noite", highlight: "📺 Formas Rotom (Platinum/BDSP)", recommended: true },
      { id: 408, name: "Cranidos", types: ["Pedra"], method: "static", methodLabel: "🎁 Reviver Skull Fossil no Museu de Oreburgh", levels: "Lv. 20", rateRed: 100, rateBlue: 0, versionTag: "🔵 Exclusivo Diamond / BD" },
      { id: 410, name: "Shieldon", types: ["Pedra", "Aço"], method: "static", methodLabel: "🎁 Reviver Armor Fossil no Museu de Oreburgh", levels: "Lv. 20", rateRed: 0, rateBlue: 100, versionTag: "🔴 Exclusivo Pearl / SP" }
    ],
    items: [
      { name: "TM76 — Stealth Rock", move: "Stealth Rock", moveType: "Pedra", category: "tm", icon: "💿", how: "Prêmio do Líder Roark no Ginásio de Oreburgh City!" },
      { name: "TM31 — Brick Break", move: "Brick Break", moveType: "Lutador", category: "tm", icon: "💿", how: "Andar B1F do Oreburgh Gate (use Rock Smash e Surf)!" },
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Atrás da usina Valley Windworks (use Surf no rio à direita da usina) ou no Cassino de Veilstone!" },
      { name: "TM35 — Flamethrower", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "Interior da Fuego Ironworks (use Surf ao norte do Floaroma Meadow na Rota 205)!" },
      { name: "Fire Stone", category: "stone", icon: "🔥", how: "Interior da Fuego Ironworks (encontram-se 2 Fire Stones na fundição!)." },
      { name: "Electirizer & Magmarizer", category: "stone", icon: "⚡", how: "Valley Windworks (Electirizer) e Fuego Ironworks (Magmarizer) em Pokémon Platinum (ou via Elekid/Magby no Grand Underground em BDSP)!" },
      { name: "Miracle Seed", category: "held", icon: "🌱", how: "Floaroma Meadow (entrada norte da Rota 204 usando Cut)." },
      { name: "Soothe Bell", category: "held", icon: "🔔", how: "Pokémon Mansion na Rota 212 ou entregue por Cheryl na Eterna Forest." }
    ]
  },
  {
    id: "sinnoh-eterna-wayward-coronet",
    name: "Eterna City, Cycling Road (Rota 206), Wayward Cave & Mt. Coronet",
    sector: "Setor Sinnoh Central-Oeste",
    category: "cave",
    connections: "Eterna City ⇄ Rota 206 (Wayward Cave) ⇄ Rota 207 ⇄ Mt. Coronet (Spear Pillar)",
    levelRange: "Lv. 14 — 47",
    dominantTypes: "Dragão / Terra / Lutador / Aço",
    encounters: [
      { id: 443, name: "Gible", types: ["Dragão", "Terra"], method: "cave", methodLabel: "⛰️ Wayward Cave (Entrada Secreta sob a Ponte da Rota 206)", levels: "Lv. 15 — 20", rateRed: 20, rateBlue: 20, highlight: "👑 Evolui p/ Garchomp (Top 1 Sinnoh)", recommended: true },
      { id: 207, name: "Gligar", types: ["Terra", "Voador"], method: "grass", methodLabel: "🌿 Rota 206 (Platinum & Grand Underground BD)", levels: "Lv. 14 — 19", rateRed: 20, rateBlue: 15, highlight: "Evolui p/ Gliscor (Razor Fang)", recommended: true },
      { id: 175, name: "Togepi", types: ["Fada"], method: "static", methodLabel: "🎁 Ovo entregue por Cynthia em Eterna City (Platinum) / Grand Underground (BDSP)", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "🥚 Evolui p/ Togekiss (Shiny Stone)", recommended: true },
      { id: 436, name: "Bronzor", types: ["Aço", "Psíquico"], method: "cave", methodLabel: "⛰️ Wayward Cave & Mt. Coronet", levels: "Lv. 14 — 25", rateRed: 30, rateBlue: 30, recommended: true },
      { id: 35, name: "Clefairy", types: ["Fada"], method: "cave", methodLabel: "⛰️ Mt. Coronet", levels: "Lv. 14 — 38", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 349, name: "Feebas", types: ["Água"], method: "fish", methodLabel: "🎣 Lago subterrâneo do Mt. Coronet B1F (4 tiles especiais)", levels: "Lv. 10 — 20", rateRed: 50, rateBlue: 50, highlight: "Evolui p/ Milotic" },
      { id: 483, name: "Dialga", types: ["Aço", "Dragão"], method: "static", methodLabel: "🎁 Spear Pillar no topo do Mt. Coronet", levels: "Lv. 47 — 70", rateRed: 100, rateBlue: 0, versionTag: "🔵 Diamond / BD / Platinum", highlight: "⏳ LENDÁRIO DE CAPA", recommended: true },
      { id: 484, name: "Palkia", types: ["Água", "Dragão"], method: "static", methodLabel: "🎁 Spear Pillar no topo do Mt. Coronet", levels: "Lv. 47 — 70", rateRed: 0, rateBlue: 100, versionTag: "🔴 Pearl / SP / Platinum", highlight: "🌌 LENDÁRIO DE CAPA", recommended: true }
    ],
    items: [
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Fundo da entrada secreta da Wayward Cave (debaixo da ponte de ciclismo na Rota 206, onde se captura Gible)!" },
      { name: "TM02 — Dragon Claw", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Interior do Mt. Coronet (andar 4F na subida para o Spear Pillar, usando Surf e Rock Climb)!" },
      { name: "TM86 — Grass Knot", move: "Grass Knot", moveType: "Planta", category: "tm", icon: "💿", how: "Prêmio da Líder Gardenia no Ginásio de Eterna City!" },
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue por Cynthia em frente ao prédio da Team Galactic em Eterna City!" },
      { name: "Exp. Share", category: "held", icon: "🧢", how: "Entregue pelo assistente do Prof. Rowan no portão sul da Rota 206 após registrar 35 Pokémon na Pokédex!" },
      { name: "Adamant Orb & Lustrous Orb", category: "held", icon: "💎", how: "Topo do Spear Pillar no Mt. Coronet!" }
    ]
  },
  {
    id: "sinnoh-hearthome-solaceon-celestic",
    name: "Hearthome City, Solaceon Town & Celestic Town (Rotas 208–211)",
    sector: "Setor Sinnoh Central",
    category: "route",
    connections: "Hearthome City ⇄ Rota 209 (Lost Tower) ⇄ Solaceon Town ⇄ Rota 210 ⇄ Celestic Town",
    levelRange: "Lv. 16 — 28",
    dominantTypes: "Fantasma / Normal / Psíquico / Fogo",
    encounters: [
      { id: 133, name: "Eevee", types: ["Normal"], method: "static", methodLabel: "🎁 Entregue por Bebe na casa ao lado do Pokémon Center de Hearthome City", levels: "Lv. 20", rateRed: 100, rateBlue: 100, highlight: "⭐ Evolui p/ Espeon, Umbreon, Leafeon, Glaceon, Jolteon...", recommended: true },
      { id: 123, name: "Scyther", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Rota 210 e Rota 215 (Diamond/Platinum/BD)", levels: "Lv. 19 — 24", rateRed: 15, rateBlue: 10, highlight: "Evolui p/ Scizor", recommended: true },
      { id: 113, name: "Chansey", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 209 & Rota 210 (5% Chance de segurar Lucky Egg!)", levels: "Lv. 16 — 20", rateRed: 5, rateBlue: 5 },
      { id: 355, name: "Duskull", types: ["Fantasma"], method: "cave", methodLabel: "⛰️ Lost Tower (Rota 209)", levels: "Lv. 16 — 20", rateRed: 25, rateBlue: 25 },
      { id: 442, name: "Spiritomb", types: ["Fantasma", "Noturno"], method: "static", methodLabel: "🎁 Hallowed Tower na Rota 209 (Use Odd Keystone + 32 conversas no Underground)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "Sem Fraquezas na Gen 4!" }
    ],
    items: [
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Rota 210 Norte (use Defog e atravesse as pontes de bicicleta na neblina)!" },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Rota 211 Leste (use Rock Climb na encosta ao lado de Celestic Town) ou no Cassino de Veilstone!" },
      { name: "TM51 — Roost", move: "Roost", moveType: "Voador", category: "tm", icon: "💿", how: "Entregue pela garota no penhasco sul da Rota 210!" },
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Entregue pela avó de Cynthia nas ruínas de Celestic Town!" },
      { name: "HM04 — Strength", move: "Strength", moveType: "Normal", category: "tm", icon: "💿", how: "Topo da Lost Tower na Rota 209 (ou entregue por Riley na Iron Island em Platinum)!" },
      { name: "Choice Specs", category: "held", icon: "👓", how: "Loja de Celestic Town falando com o homem de óculos escuros entre 04h00 e 09h59 da manhã!" },
      { name: "Wise Glasses & Black Glasses", category: "held", icon: "🕶️", how: "Mesma loja de Celestic Town (Wise Glasses das 10h às 19h59; Black Glasses das 20h às 03h59)!" },
      { name: "Good Rod", category: "key", icon: "🎣", how: "Pescador na Rota 209 (ao lado do riacho)." }
    ]
  },
  {
    id: "sinnoh-veilstone-pastoria-valor",
    name: "Veilstone City, Pastoria (Great Marsh) & Lake Valor (Rotas 212–215)",
    sector: "Setor Sinnoh Sudeste",
    category: "route",
    connections: "Veilstone City ⇄ Rota 214 ⇄ Lake Valor ⇄ Rota 213 ⇄ Pastoria City (Great Marsh) ⇄ Rota 212",
    levelRange: "Lv. 20 — 32",
    dominantTypes: "Lutador / Fogo / Água / Veneno",
    encounters: [
      { id: 228, name: "Houndour", types: ["Noturno", "Fogo"], method: "grass", methodLabel: "🌿 Rota 214 (Platinum) & Grand Underground (BDSP)", levels: "Lv. 22 — 26", rateRed: 20, rateBlue: 20, highlight: "🔥 Evolui p/ Houndoom", recommended: true },
      { id: 137, name: "Porygon", types: ["Normal"], method: "static", methodLabel: "🎁 Entregue por um homem na casa ao norte do Pokémon Center de Veilstone (Platinum)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "Evolui p/ Porygon-Z", recommended: true },
      { id: 453, name: "Croagunk", types: ["Veneno", "Lutador"], method: "grass", methodLabel: "🌿 Great Marsh (Pastoria Safari) & Rota 212", levels: "Lv. 22 — 28", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 183, name: "Marill", types: ["Água", "Fada"], method: "grass", methodLabel: "🌿 Great Marsh & Rota 215", levels: "Lv. 20 — 26", rateRed: 25, rateBlue: 25, highlight: "Huge Power Azumarill", recommended: true },
      { id: 482, name: "Azelf", types: ["Psíquico"], method: "static", methodLabel: "🎁 Valor Cavern no centro do Lake Valor", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "⭐ Guardião Lendário (Nasty Plot)", recommended: true }
    ],
    items: [
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Galpão da Team Galactic (Galactic Warehouse) em Veilstone City após vencer a Líder Maylene!" },
      { name: "HM05 — Defog", move: "Defog", moveType: "Voador", category: "tm", icon: "💿", how: "Entregue pelo treinador logo na entrada do Great Marsh (Safari de Pastoria City)!" },
      { name: "TM75 — Swords Dance, TM13 — Ice Beam, TM24 — Thunderbolt & TM35 — Flamethrower", move: "Swords Dance", moveType: "Normal", category: "tm", icon: "💿", how: "Prêmios do Veilstone Game Corner ou à venda no Veilstone Department Store (BDSP)!" },
      { name: "TM36 — Sludge Bomb", move: "Sludge Bomb", moveType: "Veneno", category: "tm", icon: "💿", how: "Subsolo do Galactic Warehouse em Veilstone City!" },
      { name: "Dusk Stone", category: "stone", icon: "🌑", how: "Interior do Galactic Warehouse em Veilstone City (evolui Murkrow p/ Honchkrow e Misdreavus p/ Mismagius)!" },
      { name: "Dawn Stone", category: "stone", icon: "🌅", how: "Lamaçal da Rota 212 (use o Dowsing Machine perto de Pastoria) ou no Mt. Coronet 1F (evolui Kirlia macho p/ Gallade e Snorunt fêmea p/ Froslass)!" },
      { name: "Razor Fang", category: "stone", icon: "🦷", how: "Jardim Sul da Rota 214 (oculto na grama em Platinum) ou no Battle Park (evolui Gligar p/ Gliscor à noite)!" }
    ]
  },
  {
    id: "sinnoh-canalave-iron-island",
    name: "Canalave City, Rota 218 & Iron Island",
    sector: "Setor Sinnoh Porto Oeste",
    category: "cave",
    connections: "Jubilife City ⇄ Rota 218 (Surf) ⇄ Canalave City ⇄ Barco p/ Iron Island",
    levelRange: "Lv. 28 — 35",
    dominantTypes: "Lutador / Aço / Água",
    encounters: [
      { id: 447, name: "Riolu", types: ["Lutador"], method: "static", methodLabel: "🎁 Ovo entregue por Riley no fundo da Iron Island", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Lucario (Aura Sphere + Swords Dance)", recommended: true },
      { id: 304, name: "Aron", types: ["Aço", "Pedra"], method: "cave", methodLabel: "⛰️ Iron Island (Poké Radar Diamond / Grand Underground)", levels: "Lv. 28 — 32", rateRed: 20, rateBlue: 0 },
      { id: 95, name: "Onix", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Iron Island", levels: "Lv. 30 — 34", rateRed: 30, rateBlue: 30 },
      { id: 130, name: "Gyarados", types: ["Água", "Voador"], method: "fish", methodLabel: "🎣 Super Rod / Good Rod (Rota 218 & Canalave)", levels: "Lv. 20 — 40", rateRed: 40, rateBlue: 40, recommended: true }
    ],
    items: [
      { name: "TM89 — U-turn", move: "U-turn", moveType: "Inseto", category: "tm", icon: "💿", how: "Pier sul de Canalave City (use Surf ao sul da ponte de Canalave)!" },
      { name: "TM91 — Flash Cannon", move: "Flash Cannon", moveType: "Aço", category: "tm", icon: "💿", how: "Prêmio do Líder Byron no Ginásio de Canalave City!" },
      { name: "Shiny Stone", category: "stone", icon: "✨", how: "Sala final da Iron Island (logo antes da saída após ajudar Riley — evolui Togetic p/ Togekiss e Roselia p/ Roserade)!" },
      { name: "Metal Coat", category: "stone", icon: "🔩", how: "Casa de Byron na Iron Island (após obter a National Dex) ou equipado em Bronzor/Magnemite selvagens (5%)!" }
    ]
  },
  {
    id: "sinnoh-snowpoint-acuity",
    name: "Rotas 216–217, Lake Acuity & Snowpoint City",
    sector: "Setor Gelado Norte",
    category: "route",
    connections: "Mt. Coronet ⇄ Rota 216 ⇄ Rota 217 ⇄ Lake Acuity & Snowpoint City",
    levelRange: "Lv. 32 — 42",
    dominantTypes: "Gelo / Noturno / Terra / Psíquico",
    encounters: [
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "grass", methodLabel: "🌿 Rotas 216, 217 & Lake Acuity", levels: "Lv. 32 — 38", rateRed: 25, rateBlue: 25, highlight: "❄️ Evolui p/ Weavile (Razor Claw)", recommended: true },
      { id: 220, name: "Swinub", types: ["Gelo", "Terra"], method: "grass", methodLabel: "🌿 Rota 217 & Lake Acuity", levels: "Lv. 32 — 36", rateRed: 35, rateBlue: 35, highlight: "Evolui p/ Mamoswine (Ancient Power)", recommended: true },
      { id: 361, name: "Snorunt", types: ["Gelo"], method: "grass", methodLabel: "🌿 Rotas 216 & 217 (Noite em Platinum)", levels: "Lv. 32 — 35", rateRed: 20, rateBlue: 20, timeTag: "🌙 Noite", highlight: "Evolui p/ Froslass (Dawn Stone)", recommended: true },
      { id: 459, name: "Snover", types: ["Planta", "Gelo"], method: "grass", methodLabel: "🌿 Rotas 216 & 217", levels: "Lv. 32 — 36", rateRed: 35, rateBlue: 35 },
      { id: 480, name: "Uxie", types: ["Psíquico"], method: "static", methodLabel: "🎁 Acuity Cavern no centro do Lake Acuity", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "Guardião Lendário" }
    ],
    items: [
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Encosta da Rota 216 (use Rock Climb acima da cabana de descanso na neve)!" },
      { name: "HM08 — Rock Climb", move: "Rock Climb", moveType: "Normal", category: "tm", icon: "💿", how: "Na neve da Rota 217 atrás da casa do montanhista (noroeste da Rota 217)!" },
      { name: "TM14 — Blizzard", move: "Blizzard", moveType: "Gelo", category: "tm", icon: "💿", how: "Lake Acuity (use Surf no nordeste do lago) ou no Veilstone Department Store!" },
      { name: "Icicle Plate & Spell Tag", category: "held", icon: "🧊", how: "Entregue pelo montanhista na cabana da Rota 217 após devolver o HM08 (Icicle Plate) e pela mulher fantasma na cabana nordeste (Spell Tag)." }
    ]
  },
  {
    id: "sinnoh-sunyshore-league-battlezone",
    name: "Sunyshore City, Victory Road, Pokémon League & Battle Zone (Stark Mountain)",
    sector: "Setor Liga Sinnoh & Pós-Game",
    category: "special",
    connections: "Rota 222 ⇄ Sunyshore City ⇄ Rota 223 ⇄ Victory Road ⇄ Pokémon League ⇄ Fight Area & Stark Mountain",
    levelRange: "Lv. 38 — 70",
    dominantTypes: "Elétrico / Dragão / Aço / Fogo",
    encounters: [
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "grass", methodLabel: "🌿 Rota 222 & Fuego Ironworks", levels: "Lv. 38 — 41", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Magnezone no Mt. Coronet", recommended: true },
      { id: 239, name: "Elekid", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 222 (Platinum) & Grand Underground (BD)", levels: "Lv. 38 — 40", rateRed: 20, rateBlue: 0, highlight: "Evolui p/ Electivire", recommended: true },
      { id: 464, name: "Rhyperior", types: ["Terra", "Pedra"], method: "cave", methodLabel: "⛰️ Victory Road & Stark Mountain (Evolui de Rhydon c/ Protector)", levels: "Lv. 42 — 55", rateRed: 25, rateBlue: 25 },
      { id: 487, name: "Giratina", types: ["Fantasma", "Dragão"], method: "static", methodLabel: "🎁 Distortion World (Platinum) / Turnback Cave (DP/BDSP)", levels: "Lv. 47 — 70", rateRed: 100, rateBlue: 100, highlight: "👻 LENDÁRIO CAPA DE PLATINUM", recommended: true },
      { id: 485, name: "Heatran", types: ["Fogo", "Aço"], method: "static", methodLabel: "🎁 Câmara Profunda da Stark Mountain (Battle Zone)", levels: "Lv. 50 — 70", rateRed: 100, rateBlue: 100, highlight: "🌋 Lendário Fogo/Aço", recommended: true }
    ],
    items: [
      { name: "HM07 — Waterfall", move: "Waterfall", moveType: "Água", category: "tm", icon: "💿", how: "Entregue por Jasmine na praia norte de Sunyshore City após conquistar a 8ª Insígnia (Beacon Badge)!" },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Parte pós-game da Victory Road de Sinnoh (sala da neblina perto da Rota 224) ou equipado em Munchlax selvagens!" },
      { name: "Razor Claw", category: "stone", icon: "爪", how: "Victory Road 1F (use Rock Climb) e no jardim do prédio da Team Galactic em Veilstone City — evolui Sneasel p/ Weavile à noite!" },
      { name: "Life Orb", category: "held", icon: "🔮", how: "Exterior da Stark Mountain na Rota 227 (use Rock Climb) ou por 48 BP no Battle Park / Battle Frontier!" },
      { name: "Choice Band & Choice Scarf", category: "held", icon: "🎗️", how: "48 BP na Battle Tower / Battle Frontier (Fight Area)!" },
      { name: "Dragon Scale & King's Rock", category: "stone", icon: "👑", how: "Victory Road de Sinnoh (Dragon Scale) e equipado em Poliwhirl/Hariyama selvagens." },
      { name: "Super Rod", category: "key", icon: "🎣", how: "Entregue pelo pescador no píer da Fight Area (Battle Zone)!" }
    ]
  }
];

// ============================================================================
// 4B. DADOS DE UNOVA (BLACK/WHITE & BLACK 2/WHITE 2 — COM ESTAÇÕES DO ANO)
// ============================================================================
const UNOVA_AREAS = [
  {
    id: "unova-southeast-nuvema-nacrene",
    name: "Nuvema Town, Accumula, Striaton, Wellspring Cave & Nacrene (Rotas 1–3)",
    sector: "Setor Unova Sudeste (Início BW)",
    category: "route",
    connections: "Nuvema Town ⇄ Rota 1 ⇄ Accumula Town ⇄ Rota 2 ⇄ Striaton City ⇄ Rota 3 (Wellspring Cave) ⇄ Nacrene City",
    levelRange: "Lv. 2 — 15",
    dominantTypes: "Terra / Água / Lutador / Planta",
    encounters: [
      { id: 495, name: "Snivy", types: ["Planta"], method: "static", methodLabel: "🎁 Inicial da Prof. Juniper (Nuvema / Aspertia)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Planta", recommended: true },
      { id: 498, name: "Tepig", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial da Prof. Juniper (Nuvema / Aspertia)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Fogo", recommended: true },
      { id: 501, name: "Oshawott", types: ["Água"], method: "static", methodLabel: "🎁 Inicial da Prof. Juniper (Nuvema / Aspertia)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Água", recommended: true },
      { id: 529, name: "Drilbur", types: ["Terra"], method: "cave", methodLabel: "⛰️ Nuvens de Poeira na Wellspring Cave (Rota 3)", levels: "Lv. 10 — 13", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Excadrill (Top 1 Unova)", recommended: true },
      { id: 535, name: "Tympole", types: ["Água"], method: "grass", methodLabel: "🌿 Exterior da Pinwheel Forest (Nacrene City)", levels: "Lv. 12 — 15", rateRed: 40, rateBlue: 40, highlight: "Evolui p/ Seismitoad (Água/Terra)", recommended: true },
      { id: 532, name: "Timburr", types: ["Lutador"], method: "grass", methodLabel: "🌿 Exterior da Pinwheel Forest", levels: "Lv. 13 — 15", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Conkeldurr" }
    ],
    items: [
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue por Fennel em Striaton City após vencer o 1º Ginásio (BW)!" },
      { name: "TM94 — Rock Smash", move: "Rock Smash", moveType: "Lutador", category: "tm", icon: "💿", how: "Entregue pela treinadora na entrada externa da Pinwheel Forest (Nacrene City)!" },
      { name: "Miracle Seed, Charcoal & Mystic Water", category: "held", icon: "🌱", how: "Entregue pelo senhor no 1º andar da Escola de Treinadores de Striaton City (ou em Castelia City) de acordo com o inicial escolhido!" },
      { name: "Chesto Berry & Lum Berry", category: "held", icon: "🍒", how: "Entregue por Cheren no Ginásio de Nacrene City." }
    ]
  },
  {
    id: "unova-southwest-aspertia-virbank",
    name: "Aspertia City, Floccesy Ranch & Virbank Complex (Rotas 19–20 — Início B2W2)",
    sector: "Setor Unova Sudoeste (Início B2W2)",
    category: "route",
    connections: "Aspertia City ⇄ Rota 19 ⇄ Floccesy Town (Floccesy Ranch) ⇄ Rota 20 ⇄ Virbank City (Virbank Complex)",
    levelRange: "Lv. 2 — 15",
    dominantTypes: "Lutador / Elétrico / Aço / Fogo",
    encounters: [
      { id: 447, name: "Riolu", types: ["Lutador"], method: "grass", methodLabel: "🌿 Floccesy Ranch (B2W2)", levels: "Lv. 5 — 7", rateRed: 10, rateBlue: 10, highlight: "👑 Lucario logo antes do 1º Ginásio!", recommended: true },
      { id: 179, name: "Mareep", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Floccesy Ranch (B2W2)", levels: "Lv. 5 — 7", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Ampharos", recommended: true },
      { id: 298, name: "Azurill", types: ["Normal", "Fada"], method: "grass", methodLabel: "🌿 Floccesy Ranch & Rota 20 (B2W2)", levels: "Lv. 4 — 7", rateRed: 20, rateBlue: 20, highlight: "Huge Power Azumarill", recommended: true },
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "grass", methodLabel: "🌿 Virbank Complex (B2W2)", levels: "Lv. 10 — 13", rateRed: 25, rateBlue: 25, highlight: "🛡️ Imune ao Veneno da Roxie — Evolui p/ Magnezone!", recommended: true },
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "grass", methodLabel: "🌿 Virbank Complex (B2W2)", levels: "Lv. 10 — 13", rateRed: 15, rateBlue: 15, highlight: "🔥 Evolui p/ Arcanine", recommended: true },
      { id: 109, name: "Koffing", types: ["Veneno"], method: "grass", methodLabel: "🌿 Virbank Complex (B2W2)", levels: "Lv. 10 — 13", rateRed: 20, rateBlue: 20 }
    ],
    items: [
      { name: "TM21 — Frustration / TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "TM21 no Floccesy Ranch (entregue por Janitor Orville) e TM27 entregue por Bianca em Aspertia City (B2W2)!" },
      { name: "TM46 — Thief", move: "Thief", moveType: "Noturno", category: "tm", icon: "💿", how: "Interior do Virbank Complex (use Cut ou contorne os contêineres)!" },
      { name: "Silk Scarf", category: "held", icon: "🧣", how: "Interior do Virbank Complex (após derrotar os 3 operários)." }
    ]
  },
  {
    id: "unova-castelia-desert-nimbasa",
    name: "Castelia City, Rota 4, Desert Resort, Relic Castle & Nimbasa City",
    sector: "Setor Unova Central & Deserto",
    category: "route",
    connections: "Pinwheel Forest / Virbank ⇄ Castelia City ⇄ Rota 4 (Desert Resort & Relic Castle) ⇄ Nimbasa City",
    levelRange: "Lv. 15 — 35",
    dominantTypes: "Terra / Noturno / Fogo / Psíquico",
    encounters: [
      { id: 551, name: "Sandile", types: ["Terra", "Noturno"], method: "grass", methodLabel: "🌿 Rota 4, Desert Resort & Relic Castle", levels: "Lv. 15 — 22", rateRed: 40, rateBlue: 40, highlight: "👑 Evolui p/ Krookodile (Moxie)", recommended: true },
      { id: 554, name: "Darumaka", types: ["Fogo"], method: "grass", methodLabel: "🌿 Rota 4 & Desert Resort", levels: "Lv. 15 — 22", rateRed: 35, rateBlue: 35, highlight: "🔥 Evolui p/ Darmanitan (Sheer Force)", recommended: true },
      { id: 559, name: "Scraggy", types: ["Noturno", "Lutador"], method: "grass", methodLabel: "🌿 Rota 4 & Desert Resort", levels: "Lv. 15 — 22", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Scrafty (Moxie)", recommended: true },
      { id: 561, name: "Sigilyph", types: ["Psíquico", "Voador"], method: "grass", methodLabel: "🌿 Desert Resort", levels: "Lv. 19 — 22", rateRed: 10, rateBlue: 10, highlight: "⭐ Magic Guard Sweeper", recommended: true },
      { id: 637, name: "Volcarona", types: ["Inseto", "Fogo"], method: "static", methodLabel: "🎁 Câmara Profunda do Relic Castle (Lv. 35 em B2W2 / Lv. 70 em BW)", levels: "Lv. 35 — 70", rateRed: 100, rateBlue: 100, highlight: "☀️ Quiver Dance Sweeper", recommended: true },
      { id: 214, name: "Heracross", types: ["Inseto", "Lutador"], method: "grass", methodLabel: "🌿 Lostlorn Forest (Rota 16 a leste de Nimbasa)", levels: "Lv. 21 — 25", rateRed: 15, rateBlue: 10, highlight: "Moxie / Guts", recommended: true }
    ],
    items: [
      { name: "Leftovers", category: "held", icon: "🍎", how: "Castelia Sewers (Esgotos de Castelia em B2W2 — acessível na Primavera/Verão quando a água sobe!) ou na Village Bridge (BW)!" },
      { name: "Eviolite", category: "held", icon: "💎", how: "Prédio comercial na rua norte de Castelia City (após registrar 40 Pokémon na Pokédex)!" },
      { name: "Exp. Share", category: "held", icon: "🧢", how: "55º andar do prédio da Battle Company em Castelia City!" },
      { name: "Fire Stone, Water Stone & Leaf Stone", category: "stone", icon: "🔥", how: "Entregue pelo cavalheiro no Píer Oeste de Castelia City (Liberty Pier) — escolha qualquer uma das 3 pedras!" },
      { name: "TM28 — Dig", move: "Dig", moveType: "Terra", category: "tm", icon: "💿", how: "Casa na entrada da Rota 4 (logo ao norte de Castelia City)!" },
      { name: "TM39 — Rock Tomb", move: "Rock Tomb", moveType: "Pedra", category: "tm", icon: "💿", how: "Deserto do Desert Resort (oeste da entrada do Relic Castle)!" },
      { name: "TM26 — Earthquake & TM30 — Shadow Ball", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Subsolo profundo do Relic Castle (TM26 no 1F do castelo pós-game e TM30 nas câmaras inferiores)!" },
      { name: "TM72 — Volt Switch", move: "Volt Switch", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio da Líder Elesa no Ginásio de Nimbasa City!" }
    ]
  },
  {
    id: "unova-driftveil-chargestone-mistralton",
    name: "Driftveil City, Chargestone Cave, Mistralton & Celestial Tower (Rotas 5–7)",
    sector: "Setor Unova Oeste",
    category: "cave",
    connections: "Nimbasa ⇄ Rota 5 ⇄ Driftveil City ⇄ Rota 6 ⇄ Chargestone Cave ⇄ Mistralton City ⇄ Rota 7 (Celestial Tower)",
    levelRange: "Lv. 22 — 33",
    dominantTypes: "Elétrico / Aço / Fantasma / Fogo",
    encounters: [
      { id: 570, name: "Zorua", types: ["Noturno"], method: "static", methodLabel: "🎁 Entregue por Rood na casa da Equipe Plasma em Driftveil City (B2W2)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "🦊 Evolui p/ Zoroark (Illusion)", recommended: true },
      { id: 595, name: "Joltik", types: ["Inseto", "Elétrico"], method: "cave", methodLabel: "⛰️ Chargestone Cave", levels: "Lv. 24 — 28", rateRed: 30, rateBlue: 30, highlight: "⚡ Compound Eyes Thunder (Galvantula)", recommended: true },
      { id: 597, name: "Ferroseed", types: ["Planta", "Aço"], method: "cave", methodLabel: "⛰️ Chargestone Cave", levels: "Lv. 24 — 28", rateRed: 20, rateBlue: 20, highlight: "🛡️ Evolui p/ Ferrothorn (Iron Barbs)", recommended: true },
      { id: 602, name: "Tynamo", types: ["Elétrico"], method: "cave", methodLabel: "⛰️ Chargestone Cave (B2F)", levels: "Lv. 26 — 28", rateRed: 8, rateBlue: 8, highlight: "Evolui p/ Eelektross (Sem Fraquezas!)", recommended: true },
      { id: 607, name: "Litwick", types: ["Fantasma", "Fogo"], method: "cave", methodLabel: "⛰️ Celestial Tower (Rota 7)", levels: "Lv. 26 — 29", rateRed: 100, rateBlue: 100, highlight: "🕯️ Evolui p/ Chandelure (145 Sp. Atk)", recommended: true },
      { id: 577, name: "Solosis", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 5 e Rota 16 (Exclusivo White / White 2)", levels: "Lv. 19 — 24", rateRed: 0, rateBlue: 30, versionTag: "⚪ White / White 2", highlight: "Evolui p/ Reuniclus", recommended: true },
      { id: 574, name: "Gothita", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 5 e Rota 16 (Exclusivo Black / Black 2)", levels: "Lv. 19 — 24", rateRed: 30, rateBlue: 0, versionTag: "⚫ Black / Black 2" }
    ],
    items: [
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Entregue por Bianca em Driftveil City após derrotar o Líder Clay!" },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Entregue pela Prof. Juniper na entrada da Chargestone Cave (BW) ou no topo da Celestial Tower (B2W2)!" },
      { name: "Thunder Stone", category: "stone", icon: "⚡", how: "Interior da Chargestone Cave (B1F) e na Rota 9!" },
      { name: "Shiny Stone", category: "stone", icon: "✨", how: "Casa na Rota 6 (ao norte do Pokémon Breeder)!" },
      { name: "Dusk Stone", category: "stone", icon: "🌑", how: "Interior da Mistralton Cave (Rota 6, use Surf e Strength) ou na Strange House (B2W2) — evolui Lampent p/ Chandelure!" },
      { name: "TM80 — Rock Slide", move: "Rock Slide", moveType: "Pedra", category: "tm", icon: "💿", how: "Guidance Chamber no fundo da Mistralton Cave (onde também fica Cobalion)!" },
      { name: "TM61 — Will-O-Wisp", move: "Will-O-Wisp", moveType: "Fogo", category: "tm", icon: "💿", how: "3º andar da Celestial Tower na Rota 7!" },
      { name: "Choice Band, Choice Specs, Choice Scarf & Life Orb", category: "held", icon: "🎗️", how: "Loja de BP do Pokémon World Tournament (PWT em Driftveil City — B2W2) ou no Battle Subway (Nimbasa City)!" }
    ]
  },
  {
    id: "unova-icirrus-opelucid-victory",
    name: "Twist Mountain, Icirrus City, Opelucid City & Victory Road (Rotas 8–10 / 23)",
    sector: "Setor Unova Norte & Liga",
    category: "cave",
    connections: "Mistralton ⇄ Twist Mountain ⇄ Icirrus City ⇄ Rotas 8–9 ⇄ Opelucid City ⇄ Victory Road ⇄ Pokémon League",
    levelRange: "Lv. 28 — 50",
    dominantTypes: "Dragão / Noturno / Gelo / Lutador",
    encounters: [
      { id: 610, name: "Axew", types: ["Dragão"], method: "cave", methodLabel: "⛰️ Mistralton Cave (Rota 6) & Rota 23", levels: "Lv. 30 — 33", rateRed: 20, rateBlue: 20, highlight: "🐉 Evolui p/ Haxorus (147 Attack + Dragon Dance)", recommended: true },
      { id: 633, name: "Deino", types: ["Noturno", "Dragão"], method: "cave", methodLabel: "⛰️ Victory Road (1F / 3F)", levels: "Lv. 38 — 42", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Hydreigon", recommended: true },
      { id: 619, name: "Mienfoo", types: ["Lutador"], method: "grass", methodLabel: "🌿 Dragonspiral Tower & Victory Road", levels: "Lv. 30 — 42", rateRed: 30, rateBlue: 30, seasonTag: "🌸☀️🍂 Exceto Inverno", highlight: "Evolui p/ Mienshao (Regenerator)", recommended: true },
      { id: 615, name: "Cryogonal", types: ["Gelo"], method: "cave", methodLabel: "⛰️ Twist Mountain (Comum no Inverno!)", levels: "Lv. 28 — 32", rateRed: 15, rateBlue: 15, seasonTag: "❄️ Inverno (15%)" },
      { id: 639, name: "Terrakion", types: ["Pedra", "Lutador"], method: "static", methodLabel: "🎁 Trial Chamber na Victory Road (BW) / Rota 22 (B2W2)", levels: "Lv. 42 — 45", rateRed: 100, rateBlue: 100, highlight: "⚔️ Espadachim Lendário", recommended: true }
    ],
    items: [
      { name: "TM31 — Brick Break", move: "Brick Break", moveType: "Lutador", category: "tm", icon: "💿", how: "Entregue pela senhora no Pokémon Center de Icirrus City!" },
      { name: "TM91 — Flash Cannon", move: "Flash Cannon", moveType: "Aço", category: "tm", icon: "💿", how: "Subsolo da Twist Mountain!" },
      { name: "TM02 — Dragon Claw", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Andar 3F da Victory Road de Unova!" },
      { name: "TM93 — Wild Charge", move: "Wild Charge", moveType: "Elétrico", category: "tm", icon: "💿", how: "Exterior da Victory Road de Unova!" },
      { name: "TM71 — Stone Edge", move: "Stone Edge", moveType: "Pedra", category: "tm", icon: "💿", how: "Subsolo da Challenger's Cave na Rota 9 (BW) ou no fundo da Twist Mountain!" }
    ]
  },
  {
    id: "unova-east-undella-humilau-chasm",
    name: "Undella Town, Reversal Mountain, Humilau City & Giant Chasm (Rotas 11–15 / 21–22)",
    sector: "Setor Unova Leste (Campanha B2W2 & Pós-Game BW)",
    category: "special",
    connections: "Opelucid ⇄ Village Bridge ⇄ Lacunosa (Giant Chasm) ⇄ Rota 13 ⇄ Undella (Reversal Mtn) ⇄ Humilau City",
    levelRange: "Lv. 32 — 65",
    dominantTypes: "Água / Psíquico / Dragão / Gelo",
    encounters: [
      { id: 328, name: "Trapinch", types: ["Terra"], method: "cave", methodLabel: "⛰️ Reversal Mountain & Desert Resort (B2W2)", levels: "Lv. 32 — 36", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Flygon", recommended: true },
      { id: 120, name: "Staryu", types: ["Água"], method: "surf", methodLabel: "🌊 Surf / Rippling Water na Rota 13 & Undella Town", levels: "Lv. 34 — 45", rateRed: 30, rateBlue: 30, highlight: "⭐ Evolui p/ Starmie (Water Stone)", recommended: true },
      { id: 375, name: "Metang", types: ["Aço", "Psíquico"], method: "grass", methodLabel: "🌿 Planície interna do Giant Chasm", levels: "Lv. 45 — 55", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Metagross", recommended: true },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "surf", methodLabel: "🌊 Rippling Water sob a Village Bridge (5%)", levels: "Lv. 35 — 45", rateRed: 5, rateBlue: 5, recommended: true },
      { id: 646, name: "Kyurem", types: ["Dragão", "Gelo"], method: "static", methodLabel: "🎁 Caverna interna do Giant Chasm", levels: "Lv. 70 — 75", rateRed: 100, rateBlue: 100, highlight: "❄️ LENDÁRIO DE CAPA (Black/White Kyurem)", recommended: true }
    ],
    items: [
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Planície interna do Giant Chasm (noroeste do lago congelado)!" },
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Atrás do laboratório P2 Laboratory na Rota 17/18 (use Surf a oeste da Rota 1)!" },
      { name: "TM35 — Flamethrower", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "Abundant Shrine na Rota 14 (use Surf e Waterfall no santuário)!" },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Penhasco da Rota 13 (use Strength e Cut perto de Giant Chasm)!" },
      { name: "TM55 — Scald", move: "Scald", moveType: "Água", category: "tm", icon: "💿", how: "Prêmio do Líder Marlon no Ginásio de Humilau City (B2W2) ou na Cold Storage (BW)!" },
      { name: "TM75 — Swords Dance", move: "Swords Dance", moveType: "Normal", category: "tm", icon: "💿", how: "Dreamyard Subsolo (BW pós-game) ou na loja de BP do PWT (B2W2)!" },
      { name: "HM03 — Surf & HM05 — Waterfall", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Surf entregue por Alder/Cheren na Twist Mountain/Rota 6; Waterfall na Rota 18 (BW) ou entregue por N na Victory Road (B2W2)!" }
    ]
  }
];

// ============================================================================
// 4C. DADOS DE KALOS (POKÉMON X & Y — MEGA EVOLUÇÕES & TIPO FADA)
// ============================================================================
const KALOS_AREAS = [
  {
    id: "kalos-vaniville-santalune",
    name: "Vaniville Town, Santalune Forest, Santalune City & Rota 22 (Rotas 1–3)",
    sector: "Setor Kalos Central-Sul",
    category: "route",
    connections: "Vaniville Town ⇄ Aquacorde ⇄ Santalune Forest ⇄ Santalune City ⇄ Rota 22 & Rota 3",
    levelRange: "Lv. 2 — 8",
    dominantTypes: "Fogo / Voador / Elétrico / Lutador",
    encounters: [
      { id: 650, name: "Chespin", types: ["Planta"], method: "static", methodLabel: "🎁 Inicial em Aquacorde Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Planta", recommended: true },
      { id: 653, name: "Fennekin", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial em Aquacorde Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Inicial de Fogo", recommended: true },
      { id: 656, name: "Froakie", types: ["Água"], method: "static", methodLabel: "🎁 Inicial em Aquacorde Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "⭐ Evolui p/ Greninja (Água/Sombrio)", recommended: true },
      { id: 661, name: "Fletchling", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rotas 2 e 3", levels: "Lv. 2 — 5", rateRed: 35, rateBlue: 35, highlight: "🔥 Evolui p/ Talonflame (Fogo/Voador)", recommended: true },
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Santalune Forest & Rota 3", levels: "Lv. 3 — 6", rateRed: 12, rateBlue: 12, highlight: "Pode segurar Light Ball!", recommended: true },
      { id: 447, name: "Riolu", types: ["Lutador"], method: "grass", methodLabel: "🌿 Rota 22 (A leste de Santalune City)", levels: "Lv. 6 — 7", rateRed: 10, rateBlue: 10, highlight: "Evolui p/ Lucario", recommended: true },
      { id: 183, name: "Marill", types: ["Água", "Fada"], method: "grass", methodLabel: "🌿 Rota 3 (Ou Azurill na Rota 22)", levels: "Lv. 5 — 7", rateRed: 20, rateBlue: 20, highlight: "Novo Tipo Fada!", recommended: true }
    ],
    items: [
      { name: "Exp. Share", category: "key", icon: "🧢", how: "Entregue por Alexa na saída norte de Santalune City (Rota 4) após vencer a Líder Viola!" },
      { name: "TM27 — Return", move: "Return", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue por Dexio no portão entre a Rota 4 e Lumiose City!" }
    ]
  },
  {
    id: "kalos-lumiose-central",
    name: "Lumiose City, Rota 4, Rota 5, Camphrier & Rota 6–7 (Parfum Palace)",
    sector: "Setor Metropolitano de Lumiose",
    category: "route",
    connections: "Rota 4 ⇄ Lumiose City ⇄ Rota 5 ⇄ Camphrier Town ⇄ Rota 6 (Parfum Palace) & Rota 7",
    levelRange: "Lv. 8 — 16",
    dominantTypes: "Aço / Fantasma / Fada / Fogo / Planta",
    encounters: [
      { id: 1, name: "Bulbasaur", types: ["Planta", "Veneno"], method: "static", methodLabel: "🎁 Laboratório do Prof. Sycamore em Lumiose City (+ Venusaurite!)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "🧬 Acompanha Venusaurite", recommended: true },
      { id: 4, name: "Charmander", types: ["Fogo"], method: "static", methodLabel: "🎁 Laboratório do Prof. Sycamore em Lumiose City (+ Charizardite X/Y!)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "🧬 Acompanha Charizardite X ou Y", recommended: true },
      { id: 7, name: "Squirtle", types: ["Água"], method: "static", methodLabel: "🎁 Laboratório do Prof. Sycamore em Lumiose City (+ Blastoisinite!)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "🧬 Acompanha Blastoisinite", recommended: true },
      { id: 679, name: "Honedge", types: ["Aço", "Fantasma"], method: "grass", methodLabel: "🌿 Rota 6 (Alameda lateral rumo ao Parfum Palace)", levels: "Lv. 11 — 12", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Aegislash (Stance Change)", recommended: true },
      { id: 280, name: "Ralts", types: ["Psíquico", "Fada"], method: "grass", methodLabel: "🌿 Rota 4 (+ Troca c/ Diantha no Café Soleil em Lumiose c/ Gardevoirite!)", levels: "Lv. 8", rateRed: 15, rateBlue: 15, highlight: "🧬 Evolui p/ Mega Gardevoir", recommended: true },
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueando a Ponte da Rota 7 (Acorde com a Poké Flute)", levels: "Lv. 15", rateRed: 100, rateBlue: 100, highlight: "Tanque Clássico", recommended: true }
    ],
    items: [
      { name: "Venusaurite, Charizardite X / Y & Blastoisinite", category: "stone", icon: "🧬", how: "Entregue pelo Prof. Sycamore no Laboratório de Lumiose City junto com o Inicial de Kanto (as outras duas podem ser compradas no Stone Emporium em Vernal Avenue)!" },
      { name: "Gardevoirite", category: "stone", icon: "🧬", how: "Equipada no Ralts trocado pela Campeã Diantha no Café Soleil (South Boulevard em Lumiose City, pós-game)!" },
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Jardim do Parfum Palace na Rota 6 (labirinto de sebes à esquerda)!" },
      { name: "TM09 — Venoshock", move: "Venoshock", moveType: "Veneno", category: "tm", icon: "💿", how: "Rota 6 (caminho lateral de grama alta após o Parfum Palace)!" },
      { name: "Soothe Bell & Amulet Coin", category: "held", icon: "🔔", how: "Amulet Coin na lareira do 2º andar do Parfum Palace; Soothe Bell em Shalour City!" }
    ]
  },
  {
    id: "kalos-coastal-ambrette-shalour-coumarine",
    name: "Ambrette Town, Cyllage, Geosenge, Shalour (Tower of Mastery) & Coumarine (Rotas 8–13)",
    sector: "Setor Kalos Costeiro (Coastal Kalos)",
    category: "route",
    connections: "Rota 8 ⇄ Ambrette ⇄ Cyllage ⇄ Rota 10 (Geosenge) ⇄ Reflection Cave ⇄ Shalour City ⇄ Rota 12 ⇄ Coumarine ⇄ Rota 13",
    levelRange: "Lv. 14 — 32",
    dominantTypes: "Lutador / Fada / Dragão / Terra",
    encounters: [
      { id: 448, name: "Lucario", types: ["Lutador", "Aço"], method: "static", methodLabel: "🎁 Presente da Líder Korrina no topo da Tower of Mastery (Shalour City)", levels: "Lv. 32", rateRed: 100, rateBlue: 100, highlight: "🧬 JÁ VEM COM LUCARIONITE!", recommended: true },
      { id: 133, name: "Eevee", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 10 (Grama e Flores Amarelas)", levels: "Lv. 19 — 21", rateRed: 20, rateBlue: 20, highlight: "🎀 Evolui p/ Sylveon (Tipo Fada + golpe Fairy!)", recommended: true },
      { id: 701, name: "Hawlucha", types: ["Lutador", "Voador"], method: "grass", methodLabel: "🌿 Rota 10", levels: "Lv. 19 — 21", rateRed: 20, rateBlue: 20, highlight: "⚡ Flying Press + Unburden", recommended: true },
      { id: 371, name: "Bagon", types: ["Dragão"], method: "grass", methodLabel: "🌿 Rota 8 (Penhasco superior próximo à Connecting Cave)", levels: "Lv. 14 — 15", rateRed: 10, rateBlue: 10, highlight: "🐉 Evolui p/ Salamence", recommended: true },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "static", methodLabel: "🎁 Entregue pelo treinador logo na entrada da Rota 12 (A leste de Shalour)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "Surfista Gratuito Lv. 30!", recommended: true },
      { id: 443, name: "Gible", types: ["Dragão", "Terra"], method: "grass", methodLabel: "🌿 Rota 13 (Kalos Badlands — Monte de terra que se move)", levels: "Lv. 26 — 28", rateRed: 20, rateBlue: 20, highlight: "👑 Evolui p/ Garchomp", recommended: true }
    ],
    items: [
      { name: "Lucarionite & Mega Ring", category: "stone", icon: "🧬", how: "Entregues por Korrina no topo da Tower of Mastery em Shalour City!" },
      { name: "HM04 — Strength, HM03 — Surf & HM02 — Fly", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Strength entregue por Grant em Cyllage City; Surf por Calem/Serena em Shalour City; Fly pelo Prof. Sycamore em Coumarine City!" },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Rota 12 (use Cut nos arbustos da colina leste logo após a fazenda de Skiddo)!" },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Recepção do Coumarine Hotel (mostre um Pokémon com alta amizade para a garota no lobby)!" },
      { name: "Thunder Stone, Fire Stone & Leaf Stone", category: "stone", icon: "⚡", how: "Thunder Stone na Rota 10 (entre os menires); Fire e Leaf Stone na Rota 13 (Kalos Badlands) ou no Stone Emporium de Lumiose!" },
      { name: "Aerodactylite", category: "stone", icon: "🧬", how: "Entregue pelo cientista no laboratório de fósseis de Ambrette Town!" }
    ]
  },
  {
    id: "kalos-mountain-laverre-anistar-league",
    name: "Laverre City, Dendemille, Anistar, Snowbelle, Victory Road & Kiloude (Rotas 14–21)",
    sector: "Setor Kalos Montanhoso & Liga",
    category: "special",
    connections: "Lumiose ⇄ Rota 14 ⇄ Laverre City ⇄ Dendemille (Frost Cavern) ⇄ Anistar ⇄ Terminus Cave ⇄ Snowbelle ⇄ Pokémon League",
    levelRange: "Lv. 30 — 70",
    dominantTypes: "Dragão / Fada / Gelo / Fantasma",
    encounters: [
      { id: 704, name: "Goomy", types: ["Dragão"], method: "grass", methodLabel: "🌿 Rota 14 (Laverre Nature Trail)", levels: "Lv. 30 — 32", rateRed: 20, rateBlue: 20, highlight: "🌧️ Evolui p/ Goodra (Na chuva da Rota 14!)", recommended: true },
      { id: 93, name: "Haunter", types: ["Fantasma", "Veneno"], method: "grass", methodLabel: "🌿 Rota 14, Rota 19 & Victory Road", levels: "Lv. 30 — 57", rateRed: 20, rateBlue: 20, highlight: "🧬 Gengarite em Laverre City!", recommended: true },
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "grass", methodLabel: "🌿 Rota 17 (Mamoswine Road)", levels: "Lv. 38 — 40", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 716, name: "Xerneas", types: ["Fada"], method: "static", methodLabel: "🎁 Team Flare Secret HQ (Geosenge Town — Pokémon X)", levels: "Lv. 50", rateRed: 100, rateBlue: 0, versionTag: "🔵 Exclusivo Pokémon X", highlight: "🦌 LENDÁRIO DE CAPA (Geomancy)", recommended: true },
      { id: 717, name: "Yveltal", types: ["Noturno", "Voador"], method: "static", methodLabel: "🎁 Team Flare Secret HQ (Geosenge Town — Pokémon Y)", levels: "Lv. 50", rateRed: 0, rateBlue: 100, versionTag: "🔴 Exclusivo Pokémon Y", highlight: "🦅 LENDÁRIO DE CAPA (Oblivion Wing)", recommended: true },
      { id: 718, name: "Zygarde", types: ["Dragão", "Terra"], method: "static", methodLabel: "🎁 Câmara Profunda da Terminus Cave (Rota 18)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "🐍 Lendário Lv. 70" },
      { id: 150, name: "Mewtwo", types: ["Psíquico"], method: "static", methodLabel: "🎁 Unknown Dungeon no Pokémon Village (Rota 20)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "🧬 Acompanha Mewtwonite X ou Y!", recommended: true }
    ],
    items: [
      { name: "Gengarite", category: "stone", icon: "🧬", how: "Entregue pela Hex Maniac no noroeste de Laverre City!" },
      { name: "Dusk Stone & Shiny Stone", category: "stone", icon: "🌑", how: "Dusk Stone no fundo da Terminus Cave (Rota 18 — evolui Doublade p/ Aegislash!); Shiny Stone na Rota 12 (montando Skiddo)!" },
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Interior da Terminus Cave (Rota 18)!" },
      { name: "TM24 — Thunderbolt & TM35 — Flamethrower", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "TM24 é prêmio do Líder Clemont (Ginásio de Lumiose); TM35 é entregue pela Hex Maniac no Pokémon Center de Anistar City (pela manhã)!" },
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Prêmio do Líder Wulfric no Ginásio de Snowbelle City!" },
      { name: "TM26 — Earthquake & TM02 — Dragon Claw", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "TM26 na Rota 22 (use Surf e Waterfall); TM02 na Victory Road!" },
      { name: "TM29 — Psychic & TM36 — Sludge Bomb", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "TM29 no Pokémon Village (Rota 20); TM36 na Rota 19!" },
      { name: "Garchompite, Gyaradosite & Alakazite", category: "stone", icon: "🧬", how: "Aparecem brilhando entre 20h00 e 21h00 após atualizar o Mega Ring em Anistar City (Garchompite na Victory Road, Gyaradosite em Couriway Town, Alakazite na Reflection Cave)!" }
    ]
  }
];

// ============================================================================
// 4D. DADOS DE ALOLA (SUN / MOON / ULTRA SUN / ULTRA MOON — 4 ILHAS & Z-MOVES)
// ============================================================================
const ALOLA_AREAS = [
  {
    id: "alola-melemele",
    name: "Melemele Island (Iki Town, Hau'oli City, Rotas 1–3, Verdant Cavern & Ten Carat Hill)",
    sector: "Ilha Melemele (Noroeste)",
    category: "route",
    connections: "Iki Town ⇄ Rota 1 ⇄ Hau'oli City ⇄ Rota 2 (Verdant Cavern) ⇄ Rota 3 (Melemele Meadow & Ten Carat Hill)",
    levelRange: "Lv. 2 — 15",
    dominantTypes: "Fada / Elétrico / Lutador / Voador",
    encounters: [
      { id: 722, name: "Rowlet", types: ["Planta", "Voador"], method: "static", methodLabel: "🎁 Inicial em Iki Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "Evolui p/ Decidueye (Planta/Fantasma)", recommended: true },
      { id: 725, name: "Litten", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial em Iki Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "🔥 Evolui p/ Incineroar (Fogo/Sombrio)", recommended: true },
      { id: 728, name: "Popplio", types: ["Água"], method: "static", methodLabel: "🎁 Inicial em Iki Town", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Primarina (Água/Fada — Top 1 Alola)", recommended: true },
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "grass", methodLabel: "🌿 Rota 1 (Trainers' School) & Hau'oli City", levels: "Lv. 5 — 8", rateRed: 50, rateBlue: 50, highlight: "🛡️ Melhor tanque inicial (Magnezone)", recommended: true },
      { id: 742, name: "Cutiefly", types: ["Inseto", "Fada"], method: "grass", methodLabel: "🌿 Rota 2, Rota 3 & Melemele Meadow", levels: "Lv. 9 — 12", rateRed: 30, rateBlue: 30, highlight: "🎀 Evolui p/ Ribombee (Quiver Dance)", recommended: true },
      { id: 701, name: "Hawlucha", types: ["Lutador", "Voador"], method: "grass", methodLabel: "🌿 Rota 2 (USUM — ou Troca por Spearow no Pokémon Center da Rota 2!)", levels: "Lv. 8 — 10", rateRed: 20, rateBlue: 20, highlight: "⚡ Chauncey (Troca na Rota 2)", recommended: true },
      { id: 371, name: "Bagon", types: ["Dragão"], method: "grass", methodLabel: "🌿 Rota 3 (Penhasco sul) & Kala'e Bay (SOS Battle pode chamar Salamence Lv. 12!)", levels: "Lv. 9 — 12", rateRed: 10, rateBlue: 10, highlight: "🐉 Evolui p/ Salamence", recommended: true },
      { id: 570, name: "Zorua", types: ["Noturno"], method: "grass", methodLabel: "🌿 Rota 1 (Trainers' School em USUM)", levels: "Lv. 6 — 8", rateRed: 20, rateBlue: 20, highlight: "👑 Cheese contra Ultra Necrozma!", recommended: true }
    ],
    items: [
      { name: "Normalium Z & Fightinium Z", category: "key", icon: "💎", how: "Normalium Z na Verdant Cavern (Trial de Ilima) e Fightinium Z após vencer o Kahuna Hala em Iki Town!" },
      { name: "Flyinium Z & Rockium Z (Ten Carat Hill)", category: "key", icon: "💎", how: "Flyinium Z no Farthest Hollow do Ten Carat Hill (use Machamp Shove na pedra)! TM80 Rock Slide também fica na baía do Ten Carat Hill (Surf)." },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Equipado com 100% de chance em Munchlax selvagens na Rota 1 (abaixo das rochas de Tauros Charge) ou por 48 BP no Battle Royal Dome!" },
      { name: "TM01 — Work Up & Exp. Share", move: "Work Up", moveType: "Normal", category: "tm", icon: "💿", how: "Entregues pelo Prof. Kukui na Trainers' School da Rota 1!" },
      { name: "Soothe Bell", category: "held", icon: "🔔", how: "Entregue pelo cavalheiro na Rota 3 (ao sul da ponte)!" }
    ]
  },
  {
    id: "alola-akala",
    name: "Akala Island (Heahea, Paniola, Brooklet Hill, Wela Volcano, Lush Jungle & Konikoni)",
    sector: "Ilha Akala (Nordeste)",
    category: "route",
    connections: "Heahea City ⇄ Rota 4 ⇄ Paniola Ranch ⇄ Rota 5 (Brooklet Hill) ⇄ Royal Avenue ⇄ Wela Volcano ⇄ Lush Jungle ⇄ Konikoni City",
    levelRange: "Lv. 13 — 26",
    dominantTypes: "Terra / Fogo / Veneno / Água",
    encounters: [
      { id: 749, name: "Mudbray", types: ["Terra"], method: "grass", methodLabel: "🌿 Rota 4, Paniola Ranch & Rota 6", levels: "Lv. 12 — 17", rateRed: 30, rateBlue: 30, highlight: "🐴 Evolui p/ Mudsdale (Stamina)", recommended: true },
      { id: 757, name: "Salandit", types: ["Veneno", "Fogo"], method: "grass", methodLabel: "🌿 Wela Volcano Park & Rota 8", levels: "Lv. 16 — 20", rateRed: 30, rateBlue: 30, highlight: "🔥 Fêmeas evoluem p/ Salazzle!", recommended: true },
      { id: 747, name: "Mareanie", types: ["Veneno", "Água"], method: "fish", methodLabel: "🎣 SOS Battle de Corsola (Rota 9 & Melemele Sea)", levels: "Lv. 14 — 22", rateRed: 20, rateBlue: 20, highlight: "🛡️ Evolui p/ Toxapex (Regenerator)", recommended: true },
      { id: 133, name: "Eevee", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 4 & Rota 6 (+ Ovo na creche do Paniola Ranch!)", levels: "Lv. 11 — 16", rateRed: 100, rateBlue: 100, highlight: "🥚 Ovo gratuito no Paniola Ranch", recommended: true },
      { id: 246, name: "Larvitar", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Diglett's Tunnel (USUM)", levels: "Lv. 20 — 23", rateRed: 10, rateBlue: 10, highlight: "Evolui p/ Tyranitar", recommended: true }
    ],
    items: [
      { name: "Waterium Z, Firium Z, Grassium Z & Rockium Z", category: "key", icon: "💎", how: "Conquistados nos Trials de Lana (Brooklet Hill), Kiawe (Wela Volcano), Mallow (Lush Jungle) e na Grande Prova de Olivia (Ruins of Life)!" },
      { name: "TM55 — Scald", move: "Scald", moveType: "Água", category: "tm", icon: "💿", how: "Brooklet Hill (no 2º lago, use Lapras Paddle para o canto sul)!" },
      { name: "TM39 — Rock Tomb & TM43 — Flame Charge", move: "Rock Tomb", moveType: "Pedra", category: "tm", icon: "💿", how: "Encosta do Wela Volcano Park (Rota 7)!" },
      { name: "Fire Stone, Water Stone, Thunder Stone & Leaf Stone", category: "stone", icon: "🔥", how: "Vendidas na joalheria de Olivia em Konikoni City por ₽3.000 cada (e uma Fire Stone também fica no Diglett's Tunnel)!" },
      { name: "Eviolite", category: "held", icon: "💎", how: "Farol de Konikoni City (ao lado do restaurante)!" },
      { name: "Amulet Coin & Mystic Water", category: "held", icon: "🪙", how: "Paniola Ranch (atrás dos caminhões no sul do rancho)!" }
    ]
  },
  {
    id: "alola-ulaula",
    name: "Ula'ula Island (Malie City, Mt. Hokulani, Tapu Village, Thrifty Megamart & Mt. Lanakila)",
    sector: "Ilha Ula'ula (Sudeste & Liga Alola)",
    category: "special",
    connections: "Malie City ⇄ Mt. Hokulani ⇄ Rotas 11–13 ⇄ Tapu Village ⇄ Rota 14 (Thrifty Megamart) ⇄ Po Town ⇄ Mt. Lanakila (Pokémon League)",
    levelRange: "Lv. 26 — 55",
    dominantTypes: "Fantasma / Fada / Aço / Gelo",
    encounters: [
      { id: 778, name: "Mimikyu", types: ["Fantasma", "Fada"], method: "cave", methodLabel: "⛰️ Thrifty Megamart (Abandoned Site na Rota 14)", levels: "Lv. 29 — 32", rateRed: 15, rateBlue: 15, highlight: "👑 Disguise + Swords Dance (Top Tier)", recommended: true },
      { id: 374, name: "Beldum", types: ["Aço", "Psíquico"], method: "grass", methodLabel: "🌿 Mount Hokulani", levels: "Lv. 25 — 28", rateRed: 10, rateBlue: 10, highlight: "👑 Evolui p/ Metagross", recommended: true },
      { id: 37, name: "Alolan Vulpix", types: ["Gelo"], method: "grass", methodLabel: "🌿 Tapu Village, Rota 14 & Mount Lanakila (Sun / Ultra Sun)", levels: "Lv. 28 — 45", rateRed: 20, rateBlue: 0, versionTag: "☀️ Sun / Ultra Sun", highlight: "❄️ Evolui p/ Alolan Ninetales (Gelo/Fada + Snow Warning)", recommended: true },
      { id: 27, name: "Alolan Sandshrew", types: ["Gelo", "Aço"], method: "grass", methodLabel: "🌿 Tapu Village, Rota 14 & Mount Lanakila (Moon / Ultra Moon)", levels: "Lv. 28 — 45", rateRed: 0, rateBlue: 20, versionTag: "🌙 Moon / Ultra Moon", highlight: "❄️ Evolui p/ Alolan Sandslash", recommended: true },
      { id: 551, name: "Sandile", types: ["Terra", "Noturno"], method: "grass", methodLabel: "🌿 Haina Desert (Rota 13)", levels: "Lv. 28 — 31", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Krookodile", recommended: true }
    ],
    items: [
      { name: "Electrium Z, Steelium Z, Ghostium Z & Darkinium Z", category: "key", icon: "💎", how: "Conquistados no Trial de Sophocles (Hokulani Observatory), Acerola (Thrifty Megamart) e Nanu (Malie City)!" },
      { name: "Mimikium Z", category: "key", icon: "💎", how: "Interior do Thrifty Megamart (Abandoned Site) à noite em USUM!" },
      { name: "Ice Stone", category: "stone", icon: "🧊", how: "Jardim da Shady House em Po Town (a esquerda da piscina — evolui Alolan Vulpix p/ Alolan Ninetales e Alolan Sandshrew p/ Alolan Sandslash)!" },
      { name: "Dusk Stone", category: "stone", icon: "🌑", how: "Comprada na loja de pulgas do Malie City Community Center (USUM) ou no fundo do Poni Meadow!" },
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Praia da Rota 14 (a oeste da entrada do Thrifty Megamart)!" },
      { name: "TM24 — Thunderbolt & TM36 — Sludge Bomb", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "TM24 nas dunas da Poni Plains / Seafolk; TM36 na Shady House em Po Town!" },
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "Interior da caverna do Mount Lanakila (a caminho da Liga Pokémon)!" },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Entregue pelo Prof. Kukui no seu laboratório (após registrar 50 Pokémon) ou na recepção do Mount Lanakila (USUM)!" }
    ]
  },
  {
    id: "alola-poni-aether",
    name: "Poni Island & Aether Paradise (Seafolk Village, Vast Poni Canyon, Altar & Battle Tree)",
    sector: "Ilha Poni & Aether Paradise (Sudoeste & Centro)",
    category: "special",
    connections: "Aether Paradise ⇄ Seafolk Village ⇄ Poni Wilds ⇄ Vast Poni Canyon ⇄ Altar of the Sunne/Moone ⇄ Battle Tree",
    levelRange: "Lv. 40 — 65",
    dominantTypes: "Dragão / Lutador / Psíquico / Fada",
    encounters: [
      { id: 782, name: "Jangmo-o", types: ["Dragão"], method: "cave", methodLabel: "⛰️ Vast Poni Canyon (Caverna externa antes da sala do Totem)", levels: "Lv. 41 — 44", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Kommo-o (Clangorous Soulblaze)", recommended: true },
      { id: 791, name: "Solgaleo", types: ["Psíquico", "Aço"], method: "static", methodLabel: "🎁 Altar of the Sunne / Mahalo Trail (Sun & Ultra Sun)", levels: "Lv. 55 — 60", rateRed: 100, rateBlue: 0, versionTag: "☀️ Sun / Ultra Sun", highlight: "🦁 LENDÁRIO DE CAPA", recommended: true },
      { id: 792, name: "Lunala", types: ["Psíquico", "Fantasma"], method: "static", methodLabel: "🎁 Altar of the Moone / Mahalo Trail (Moon & Ultra Moon)", levels: "Lv. 55 — 60", rateRed: 0, rateBlue: 100, versionTag: "🌙 Moon / Ultra Moon", highlight: "🦇 LENDÁRIO DE CAPA", recommended: true },
      { id: 800, name: "Necrozma", types: ["Psíquico"], method: "static", methodLabel: "🎁 Mount Lanakila (USUM) / Ten Carat Hill (SM)", levels: "Lv. 65 — 75", rateRed: 100, rateBlue: 100, highlight: "🌟 Ultra Necrozma (Ultranecrozium Z)", recommended: true },
      { id: 785, name: "Tapu Koko", types: ["Elétrico", "Fada"], method: "static", methodLabel: "🎁 Ruins of Conflict (Melemele Island)", levels: "Lv. 60", rateRed: 100, rateBlue: 100, highlight: "⚡ Guardião Elétrico/Fada", recommended: true }
    ],
    items: [
      { name: "Dragonium Z, Fairium Z & Groundium Z", category: "key", icon: "💎", how: "Dragonium Z na sala do Totem Kommo-o (Vast Poni Canyon), Fairium Z entregue por Mina e Groundium Z após vencer a Kahuna Hapu!" },
      { name: "TM02 — Dragon Claw & TM35 — Flamethrower", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Ambos estão no Vast Poni Canyon (TM02 após a prova de Kommo-o; TM35 na caverna inferior usando Tauros Charge)!" },
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Resolution Cave (no fundo do Poni Meadow, usando Lapras Paddle e Machamp Shove)!" },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Entregue por Wicke nas docas do Aether Paradise!" },
      { name: "Key Stone & Todas as Mega Stones (Alakazite, Salamencite, Metagrossite, Lucarionite, Gengarite)", category: "stone", icon: "🧬", how: "Key Stone entregue por Dexio & Sina no Ancient Poni Path; Mega Stones vendidas por 64 BP na Battle Tree (Poni Gauntlet)!" },
      { name: "Focus Sash, Assault Vest, Life Orb & Choice Items", category: "held", icon: "🎗️", how: "Focus Sash ao derrotar a dançarina Oricorio no Poni Wilds; Life Orb na Resolution Cave; Choice Band/Specs/Scarf na Battle Tree!" }
    ]
  }
];

// ============================================================================
// 4E. DADOS DE GALAR (POKÉMON SWORD & SHIELD — WILD AREA & DYNAMAX)
// ============================================================================
const GALAR_AREAS = [
  {
    id: "galar-postwick-motostoke",
    name: "Postwick, Slumbering Weald, Wedgehurst & Motostoke (Rotas 1–2)",
    sector: "Setor Galar Sul",
    category: "route",
    connections: "Postwick (Slumbering Weald) ⇄ Rota 1 ⇄ Wedgehurst ⇄ Rota 2 ⇄ Motostoke",
    levelRange: "Lv. 2 — 14",
    dominantTypes: "Voador / Aço / Fogo / Planta / Água",
    encounters: [
      { id: 810, name: "Grookey", types: ["Planta"], method: "static", methodLabel: "🎁 Inicial em Postwick", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "🥁 Evolui p/ Rillaboom (Grassy Surge)", recommended: true },
      { id: 813, name: "Scorbunny", types: ["Fogo"], method: "static", methodLabel: "🎁 Inicial em Postwick", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "⚽ Evolui p/ Cinderace (Pyro Ball + Libero)", recommended: true },
      { id: 816, name: "Sobble", types: ["Água"], method: "static", methodLabel: "🎁 Inicial em Postwick", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "🎯 Evolui p/ Inteleon (Snipe Shot)", recommended: true },
      { id: 821, name: "Rookidee", types: ["Voador"], method: "grass", methodLabel: "🌿 Rotas 1, 2 e 3", levels: "Lv. 2 — 10", rateRed: 40, rateBlue: 40, highlight: "👑 Evolui p/ Corviknight (Voador/Aço)", recommended: true },
      { id: 888, name: "Zacian", types: ["Fada", "Aço"], method: "static", methodLabel: "🎁 Energy Plant / Slumbering Weald (Pokémon Sword)", levels: "Lv. 70", rateRed: 100, rateBlue: 0, versionTag: "🔵 Exclusivo Sword", highlight: "🗡️ LENDÁRIO DE CAPA (Behemoth Blade)", recommended: true },
      { id: 889, name: "Zamazenta", types: ["Lutador", "Aço"], method: "static", methodLabel: "🎁 Energy Plant / Slumbering Weald (Pokémon Shield)", levels: "Lv. 70", rateRed: 0, rateBlue: 100, versionTag: "🔴 Exclusivo Shield", highlight: "盾 LENDÁRIO DE CAPA (Behemoth Bash)", recommended: true }
    ],
    items: [
      { name: "Leftovers", category: "held", icon: "🍎", how: "Árvores de Berry na Wild Area (Rolling Fields / Giant's Seat — sacuda a árvore até cair Leftovers!) ou equipado em Munchlax/Snorlax!" },
      { name: "Life Orb", category: "held", icon: "🔮", how: "Fundo da Slumbering Weald (atravesse o rio à esquerda do altar das espadas)!" },
      { name: "Rusted Sword & Rusted Shield", category: "held", icon: "⚔️", how: "Altar da Slumbering Weald no pós-game!" },
      { name: "Choice Scarf", category: "held", icon: "🧣", how: "Entregue por Frank em Ballonlea após entregar a Old Letter da menina de Hammerlocke!" }
    ]
  },
  {
    id: "galar-wild-area-south-mines",
    name: "Wild Area Sul, Galar Mine No. 1, Turffield, Hulbury & Galar Mine No. 2 (Rotas 3–5)",
    sector: "Setor Galar Central-Sul",
    category: "route",
    connections: "Wild Area Sul (Rolling Fields) ⇄ Motostoke ⇄ Rota 3 (Galar Mine No. 1) ⇄ Turffield ⇄ Rota 5 ⇄ Hulbury ⇄ Galar Mine No. 2",
    levelRange: "Lv. 10 — 28",
    dominantTypes: "Terra / Aço / Elétrico / Veneno / Fada",
    encounters: [
      { id: 529, name: "Drilbur", types: ["Terra"], method: "cave", methodLabel: "⛰️ Galar Mine No. 1 (Montes de poeira)", levels: "Lv. 12 — 15", rateRed: 35, rateBlue: 35, highlight: "👑 Evolui p/ Excadrill (Terra/Aço)", recommended: true },
      { id: 848, name: "Toxel", types: ["Elétrico", "Veneno"], method: "static", methodLabel: "🎁 Presente da cuidadora dentro da Pokémon Nursery na Rota 5!", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "🎸 Evolui p/ Toxtricity no Lv. 30 (Punk Rock)", recommended: true },
      { id: 280, name: "Ralts", types: ["Psíquico", "Fada"], method: "grass", methodLabel: "🌿 Wild Area (Rolling Fields e Dappled Grove com Neblina/Nublado)", levels: "Lv. 10 — 26", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Gardevoir ou Gallade", recommended: true },
      { id: 130, name: "Gyarados", types: ["Água", "Voador"], method: "surf", methodLabel: "🌊 East Lake Axewell & Rota 2 (Ou Magikarp em qualquer rio)", levels: "Lv. 20 — 60", rateRed: 45, rateBlue: 45, highlight: "Moxie + Max Airstream!", recommended: true },
      { id: 597, name: "Ferroseed", types: ["Planta", "Aço"], method: "grass", methodLabel: "🌿 Rota 4", levels: "Lv. 14 — 17", rateRed: 15, rateBlue: 15, highlight: "Evolui p/ Ferrothorn", recommended: true }
    ],
    items: [
      { name: "Expert Belt", category: "held", icon: "🥋", how: "Resolva o enigma dos 3 pilares de pedra em Turffield (Água -> Planta -> Fogo)!" },
      { name: "Charcoal, Mystic Water & Miracle Seed", category: "held", icon: "🔥", how: "Barraca de incensos e itens no mercado de rua de Hulbury!" },
      { name: "Heavy-Duty Boots", category: "held", icon: "🥾", how: "Interior da Galar Mine No. 2 (caminho ao norte dos trilhos após derrotar Kabu)!" },
      { name: "TM49 — Sand Tomb & TM54 — Rock Blast", move: "Sand Tomb", moveType: "Terra", category: "tm", icon: "💿", how: "Interior da Galar Mine No. 1 (TM54) e Galar Mine No. 2 (TM49)!" },
      { name: "Dawn Stone, Dusk Stone, Shiny Stone, Fire/Water/Thunder/Leaf/Ice Stones", category: "stone", icon: "💎", how: "Todas as 10 Pedras de Evolução respawam diariamente atrás dos pilares do círculo de pedras de Lake of Outrage (Wild Area) e com os Digging Duo (Bridge Field)!" }
    ]
  },
  {
    id: "galar-hammerlocke-wild-north",
    name: "Wild Area Norte (Lake of Outrage), Hammerlocke, Stow-on-Side & Ballonlea (Rota 6 & Glimwood Tangle)",
    sector: "Setor Galar Central & Fada",
    category: "special",
    connections: "Wild Area Norte (Lake of Outrage) ⇄ Hammerlocke ⇄ Rota 6 ⇄ Stow-on-Side ⇄ Glimwood Tangle ⇄ Ballonlea",
    levelRange: "Lv. 28 — 60",
    dominantTypes: "Dragão / Fantasma / Fada / Sombrio",
    encounters: [
      { id: 885, name: "Dreepy", types: ["Dragão", "Fantasma"], method: "grass", methodLabel: "🌿 Lake of Outrage na Wild Area (Ou Drakloak nadando com Surf!)", levels: "Lv. 50 — 60", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Dragapult (600 BST Pseudo-Lendário)", recommended: true },
      { id: 859, name: "Impidimp", types: ["Noturno", "Fada"], method: "grass", methodLabel: "🌿 Glimwood Tangle (Toca nos cogumelos brilhantes!)", levels: "Lv. 32 — 36", rateRed: 100, rateBlue: 100, highlight: "👹 Evolui p/ Grimmsnarl (Prankster Screens)", recommended: true },
      { id: 882, name: "Dracovish", types: ["Água", "Dragão"], method: "static", methodLabel: "🎁 Combine Fossilized Fish + Fossilized Drake com Cara Liss na Rota 6!", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "🦖 Fishious Rend (85x2 Base Power!)", recommended: true },
      { id: 176, name: "Togetic", types: ["Fada", "Voador"], method: "static", methodLabel: "🎁 Troque Toxel por Togepi em Hammerlocke (Ou capture Togekiss em Dusty Bowl!)", levels: "Lv. 25 — 60", rateRed: 100, rateBlue: 100, highlight: "⭐ Max Airstream + Serene Grace", recommended: true },
      { id: 246, name: "Larvitar", types: ["Pedra", "Terra"], method: "grass", methodLabel: "🌿 Lake of Outrage & Dusty Bowl (Shield)", levels: "Lv. 50 — 55", rateRed: 0, rateBlue: 20, versionTag: "🔴 Exclusivo Shield", highlight: "Evolui p/ Tyranitar", recommended: true }
    ],
    items: [
      { name: "Assault Vest", category: "held", icon: "🦺", how: "Colina nordeste do Lake of Outrage (Wild Area Norte, logo após atravessar a água com a Rotom Bike)!" },
      { name: "Choice Specs & Choice Band", category: "held", icon: "👓", how: "Choice Specs na colina atrás dos pilares de pedra do Lake of Outrage; Choice Band na Rota 2 (usando a Rotom Bike aquática a oeste da casa da Professora)!" },
      { name: "Focus Sash", category: "held", icon: "🎗️", how: "Giant's Cap na Wild Area (ou por 15 BP na Battle Tower de Wyndon)!" },
      { name: "Eviolite", category: "held", icon: "💎", how: "Derrote a treinadora dentro da casa à direita do Pokémon Center de Ballonlea!" },
      { name: "Cracked Pot & Sweet/Tart Apple", category: "stone", icon: "🫖", how: "Cracked Pot no telhado ao lado do Ginásio de Stow-on-Side (evolui Sinistea); Sweet/Tart Apple com o garoto no oeste de Hammerlocke (evolui Applin)!" },
      { name: "TR24 — Outrage, TR10 — Earthquake, TR02 — Flamethrower, TR05 — Ice Beam, TR08 — Thunderbolt & TR11 — Psychic", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Vendidos pelos Watt Traders espalhados pela Wild Area (em troca de Watts) ou garantidos em Max Raid Battles de 4–5 estrelas!" }
    ]
  },
  {
    id: "galar-circhester-spikemuth-wyndon-dlc",
    name: "Circhester, Spikemuth, Wyndon & DLCs (Isle of Armor & Crown Tundra — Rotas 7–10)",
    sector: "Setor Galar Norte, Liga & DLCs",
    category: "special",
    connections: "Hammerlocke ⇄ Rotas 7–8 ⇄ Circhester ⇄ Rota 9 ⇄ Spikemuth ⇄ Rota 10 ⇄ Wyndon ⇄ Isle of Armor & Crown Tundra",
    levelRange: "Lv. 38 — 70",
    dominantTypes: "Gelo / Lutador / Dragão / Veneno",
    encounters: [
      { id: 554, name: "Galarian Darumaka", types: ["Gelo"], method: "grass", methodLabel: "🌿 Rota 8 (Steamdrift Way) e Rota 10 (Pokémon Sword)", levels: "Lv. 38 — 46", rateRed: 20, rateBlue: 0, versionTag: "🔵 Exclusivo Sword", highlight: "❄️ Gorilla Tactics Galarian Darmanitan (Ice Stone)", recommended: true },
      { id: 447, name: "Riolu", types: ["Lutador"], method: "grass", methodLabel: "🌿 Giant's Cap na Wild Area (Nevasca) & Roaring-Sea Caves (Crown Tundra)", levels: "Lv. 32 — 60", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Lucario", recommended: true },
      { id: 891, name: "Kubfu", types: ["Lutador"], method: "static", methodLabel: "🎁 Presente de Mustard no Master Dojo (Isle of Armor)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "🥋 Evolui p/ Urshifu (Single Strike ou Rapid Strike)", recommended: true },
      { id: 890, name: "Eternatus", types: ["Veneno", "Dragão"], method: "static", methodLabel: "🎁 Topo da Energy Plant em Hammerlocke (Campanha Principal)", levels: "Lv. 60", rateRed: 100, rateBlue: 100, highlight: "☄️ Dynamax Cannon (160 Sp. Atk)", recommended: true }
    ],
    items: [
      { name: "TM76 — Round, TM19 — Safeguard, TM27 — Icy Wind & TM99 — Breaking Swipe", move: "Icy Wind", moveType: "Gelo", category: "tm", icon: "💿", how: "Vendidos nos centros Pokémon de Circhester, Hammerlocke e Wyndon!" },
      { name: "Lucky Egg", category: "held", icon: "🥚", how: "Entregue pelo chef do restaurante Seafood em Hulbury após completar as 3 entregas de ingredientes!" },
      { name: "Bottle Cap, Ability Capsule, Ability Patch & Nature Mints", category: "key", icon: "🌿", how: "Loja de BP na Battle Tower de Wyndon e na Dyna Tree Hill (Crown Tundra)!" }
    ]
  }
];

// ============================================================================
// 4G. DADOS DE BORRIUS (POKÉMON UNBOUND — BASEADO NA DOCUMENTAÇÃO OFICIAL)
// ============================================================================
const BORRIUS_AREAS = [
  {
    id: "borrius-frozen-heights-bellin",
    name: "Frozen Heights, Rota 1, Bellin Town, Icicle Cave & Icy Hole",
    sector: "Setor Borrius Norte — Início",
    category: "route",
    connections: "Frozen Heights ⇄ Rota 1 (Icicle Cave Superior) ⇄ Bellin Town (Icy Hole) ⇄ Rota 2",
    levelRange: "Lv. 2 — 15",
    dominantTypes: "Aço / Pedra / Dragão / Gelo / Terra",
    encounters: [
      { id: 374, name: "Beldum", types: ["Aço", "Psíquico"], method: "static", methodLabel: "🎁 Inicial Pseudo-Lendário na Base da Equipe Shadow (Frozen Heights)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Mega Metagross!", recommended: true },
      { id: 246, name: "Larvitar", types: ["Pedra", "Terra"], method: "static", methodLabel: "🎁 Inicial Pseudo-Lendário na Base da Equipe Shadow (Frozen Heights)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Mega Tyranitar!", recommended: true },
      { id: 443, name: "Gible", types: ["Dragão", "Terra"], method: "static", methodLabel: "🎁 Inicial Pseudo-Lendário na Base da Equipe Shadow (Frozen Heights)", levels: "Lv. 10", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Mega Garchomp!", recommended: true },
      { id: 529, name: "Drilbur", types: ["Terra"], method: "cave", methodLabel: "⛰️ Icicle Cave (Andares 1F–3F)", levels: "Lv. 8 — 13", rateRed: 20, rateBlue: 20, highlight: "⭐ Evolui p/ Excadrill (Top Tier Borrius)", recommended: true },
      { id: 220, name: "Swinub", types: ["Gelo", "Terra"], method: "cave", methodLabel: "⛰️ Icicle Cave", levels: "Lv. 8 — 13", rateRed: 20, rateBlue: 20, highlight: "❄️ Evolui p/ Mamoswine", recommended: true },
      { id: 361, name: "Snorunt", types: ["Gelo"], method: "grass", methodLabel: "🌿 Rota 1 & Icicle Cave", levels: "Lv. 3 — 12", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Froslass ou Mega Glalie", recommended: true },
      { id: 396, name: "Starly", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rota 1 (Dia)", levels: "Lv. 3 — 6", rateRed: 30, rateBlue: 30, timeTag: "☀️ Dia", highlight: "Evolui p/ Staraptor", recommended: true },
      { id: 731, name: "Pikipek", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Rota 1", levels: "Lv. 3 — 6", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Toucannon" }
    ],
    items: [
      { name: "TM13 — Ice Beam", move: "Ice Beam", moveType: "Gelo", category: "tm", icon: "💿", how: "4º Andar (4F) da Icicle Cave — use Surf na parte superior da caverna, suba a escada oculta e derrote a dupla de Ace Trainers!" },
      { name: "Metagrossite, Tyranitarite & Garchompite (Mega Stone do Inicial)", category: "stone", icon: "🧬", how: "Na sua própria casa em Frozen Heights ou na Base da Equipe Shadow (após desbloquear a Mega Evolução em Tarmigan Mansion / missão Portal Purge)!" },
      { name: "Never-Melt Ice & Ice Stone", category: "stone", icon: "🧊", how: "Interior da Icicle Cave e Icy Hole (quebrando pedras de minério na Icicle Cave também caem Ice Stone e Everstone)!" },
      { name: "Stat Scanner", category: "key", icon: "📟", how: "Entregue pelo assistente do Prof. Log no Laboratório de Frozen Heights após registrar 50 Pokémon!" }
    ]
  },
  {
    id: "borrius-dresco-route2-flower",
    name: "Dresco Town, Rota 2, Rota 3 & Flower Paradise",
    sector: "Setor Borrius Norte-Central (1º Ginásio)",
    category: "route",
    connections: "Bellin Town ⇄ Rota 2 ⇄ Dresco Town ⇄ Rota 3 (Flower Paradise) ⇄ Grim Woods",
    levelRange: "Lv. 7 — 16",
    dominantTypes: "Lutador / Fada / Inseto / Planta",
    encounters: [
      { id: 447, name: "Riolu", types: ["Lutador"], method: "grass", methodLabel: "🌿 Rota 2 (Grama alta a oeste da ponte rumo a Dresco Town!)", levels: "Lv. 7 — 9", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Mega Lucario logo no início!", recommended: true },
      { id: 742, name: "Cutiefly", types: ["Inseto", "Fada"], method: "grass", methodLabel: "🌿 Flores do Flower Paradise (Ao norte da Rota 3)", levels: "Lv. 9 — 13", rateRed: 30, rateBlue: 30, highlight: "🎀 Evolui p/ Ribombee (Sticky Web + Quiver Dance)", recommended: true },
      { id: 298, name: "Azurill", types: ["Normal", "Fada"], method: "grass", methodLabel: "🌿 Rota 2", levels: "Lv. 6 — 9", rateRed: 20, rateBlue: 20, highlight: "Huge Power Azumarill", recommended: true },
      { id: 179, name: "Mareep", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 2 & Dresco Town", levels: "Lv. 7 — 10", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Mega Ampharos", recommended: true },
      { id: 406, name: "Budew", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Rota 2 & Flower Paradise", levels: "Lv. 7 — 11", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Roserade", recommended: true },
      { id: 669, name: "Flabébé", types: ["Fada"], method: "grass", methodLabel: "🌿 Flower Paradise", levels: "Lv. 9 — 12", rateRed: 35, rateBlue: 35 }
    ],
    items: [
      { name: "TM86 — Grass Knot", move: "Grass Knot", moveType: "Planta", category: "tm", icon: "💿", how: "Prêmio do Líder Mirskle no Ginásio de Dresco Town (1ª Insígnia)!" },
      { name: "HM01 — Cut", move: "Cut", moveType: "Normal", category: "tm", icon: "💿", how: "Entregue no Flower Paradise (ao norte da Rota 3) após derrotar a Equipe Shadow!" },
      { name: "Soothe Bell", category: "held", icon: "🔔", how: "Entregue pela senhora em Dresco Town (essencial para evoluir Riolu, Budew e Azurill rapidamente no início)!" },
      { name: "Miracle Seed & Honey", category: "held", icon: "🌱", how: "Interior do Flower Paradise!" }
    ]
  },
  {
    id: "borrius-grim-volcano-crater",
    name: "Grim Woods, Rota 4, Cinder Volcano, Rota 5 (Daycare) & Crater Town",
    sector: "Setor Vulcânico Oeste (2º Ginásio)",
    category: "cave",
    connections: "Dresco Town ⇄ Grim Woods ⇄ Rota 4 (Cinder Volcano) ⇄ Rota 5 (Pokémon Daycare) ⇄ Crater Town",
    levelRange: "Lv. 12 — 24",
    dominantTypes: "Psíquico / Fada / Fogo / Veneno / Fantasma",
    encounters: [
      { id: 280, name: "Ralts", types: ["Psíquico", "Fada"], method: "grass", methodLabel: "🌿 Rota 4 (Grama antes da entrada do Cinder Volcano)", levels: "Lv. 13 — 16", rateRed: 12, rateBlue: 12, highlight: "👑 Evolui p/ Mega Gardevoir ou Mega Gallade!", recommended: true },
      { id: 757, name: "Salandit", types: ["Veneno", "Fogo"], method: "cave", methodLabel: "⛰️ Cinder Volcano (Andares internos)", levels: "Lv. 15 — 19", rateRed: 25, rateBlue: 25, highlight: "🔥 Fêmeas evoluem p/ Salazzle!", recommended: true },
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "grass", methodLabel: "🌿 Grim Woods", levels: "Lv. 11 — 14", rateRed: 25, rateBlue: 25, highlight: "👻 Evolui p/ Gengar (Link Stone em Fallshore)", recommended: true },
      { id: 495, name: "Snivy", types: ["Planta"], method: "static", methodLabel: "🎁 Casa na Rota 5 (Escolha entre Snivy, Tepig ou Oshawott!)", levels: "Lv. 15", rateRed: 100, rateBlue: 100, highlight: "🐍 Contrary Serperior!", recommended: true },
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Cinder Volcano & Rota 5", levels: "Lv. 14 — 18", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Arcanine", recommended: true },
      { id: 198, name: "Murkrow", types: ["Noturno", "Voador"], method: "grass", methodLabel: "🌿 Grim Woods", levels: "Lv. 11 — 14", rateRed: 20, rateBlue: 20 }
    ],
    items: [
      { name: "TM35 — Flamethrower", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "Andar 1F do Cinder Volcano — entre pelo lado de Grim Woods, use Surf na primeira piscina de lava com um Pokémon de Fogo na equipe!" },
      { name: "TM46 — Thief", move: "Thief", moveType: "Noturno", category: "tm", icon: "💿", how: "Prêmio do Líder Véga no Ginásio de Crater Town (2ª Insígnia)!" },
      { name: "Fire Stone, Water Stone, Thunder Stone, Leaf Stone, Dusk Stone, Dawn Stone & Shiny Stone", category: "stone", icon: "💎", how: "Mineração nas paredes da KBT Expressway (ao norte de Crater Town — fale com o minerador para cavar pedras de evolução infinitas)!" },
      { name: "Banettite & Houndoominite", category: "stone", icon: "🧬", how: "Banettite resolvendo o enigma das tabuletas em Grim Woods (Missão #007); Houndoominite entregue por Véga após revê-lo!" }
    ]
  },
  {
    id: "borrius-blizzard-route8-frost",
    name: "Blizzard City, Frozen Forest, Rota 8, Frozen Mtn., Rota 6 (Valley Cave), Rota 7 & Rota 9",
    sector: "Setor Alpino Extremo Oeste (3º Ginásio)",
    category: "route",
    connections: "Crater Town ⇄ Rota 6 (Valley Cave) ⇄ Rota 7 ⇄ Rota 8 (Frozen Mtn.) ⇄ Blizzard City (Frozen Forest) & Rota 9 (Underground Pass)",
    levelRange: "Lv. 18 — 28",
    dominantTypes: "Gelo / Noturno / Voador / Terra",
    encounters: [
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "grass", methodLabel: "🌿 Rota 8 & Frozen Forest (Noite) / Frozen Mountain", levels: "Lv. 22 — 26", rateRed: 25, rateBlue: 25, timeTag: "🌙 Noite / Caverna", highlight: "❄️ Evolui p/ Weavile (Razor Claw)", recommended: true },
      { id: 207, name: "Gligar", types: ["Terra", "Voador"], method: "cave", methodLabel: "⛰️ Valley Cave (Rota 6) & Rota 9", levels: "Lv. 18 — 24", rateRed: 25, rateBlue: 25, highlight: "🦇 Evolui p/ Gliscor (Razor Fang)", recommended: true },
      { id: 133, name: "Eevee", types: ["Normal"], method: "grass", methodLabel: "🌿 Rota 7 / Prêmio no Cassino de Dehara City", levels: "Lv. 20 — 24", rateRed: 15, rateBlue: 15, highlight: "Evolui p/ Sylveon, Espeon, Umbreon, Glaceon...", recommended: true },
      { id: 37, name: "Alolan Vulpix", types: ["Gelo"], method: "static", methodLabel: "🎁 Recompensa de Missão em Blizzard City (Nine Tails of Snow)", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "❄️ Snow Warning + Aurora Veil", recommended: true },
      { id: 304, name: "Aron", types: ["Aço", "Pedra"], method: "cave", methodLabel: "⛰️ Valley Cave & Underground Pass (Rota 9)", levels: "Lv. 18 — 25", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Mega Aggron" }
    ],
    items: [
      { name: "TM40 — Aerial Ace", move: "Aerial Ace", moveType: "Voador", category: "tm", icon: "💿", how: "Prêmio da Líder Alice no Ginásio de Blizzard City (3ª Insígnia)!" },
      { name: "HM04 — Strength & HM06 — Rock Smash", move: "Strength", moveType: "Normal", category: "tm", icon: "💿", how: "Rock Smash na Valley Cave (Rota 6); Strength em Blizzard City / KBT Expressway!" },
      { name: "Abomasite & Glalitite", category: "stone", icon: "🧬", how: "Abomasite na Frozen Forest (acima do covil de Crabominable); Glalitite na Frozen Mountain!" },
      { name: "Leftovers", category: "held", icon: "🍎", how: "Checando as lixeiras dentro das casas de Blizzard City e Tehl Town (ou equipado em Munchlax selvagens)!" }
    ]
  },
  {
    id: "borrius-tehl-fallshore-epidimy",
    name: "Tehl Town, Auburn Waterway, Rota 10 (Cave of Being), Fallshore City, Rota 11 & Epidimy (Thundercap Mtn.)",
    sector: "Setor Costeiro Sul (4º Ginásio & Thundercap Mtn.)",
    category: "route",
    connections: "Tehl Town ⇄ Auburn Waterway / Rota 10 (Cave of Being) ⇄ Fallshore City ⇄ Rota 11 ⇄ Epidimy Town (Thundercap Mtn.)",
    levelRange: "Lv. 26 — 38",
    dominantTypes: "Fada / Voador / Água / Elétrico / Aço",
    encounters: [
      { id: 175, name: "Togepi", types: ["Fada"], method: "static", methodLabel: "🎁 Ovo entregue pela senhora na casa a leste do Pokémon Center de Fallshore City!", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "👑 Evolui p/ Togekiss (Shiny Stone — Top Tier Borrius!)", recommended: true },
      { id: 130, name: "Gyarados", types: ["Água", "Voador"], method: "fish", methodLabel: "🎣 Auburn Waterway, Rota 10 & Fallshore City", levels: "Lv. 25 — 35", rateRed: 45, rateBlue: 45, highlight: "🧬 Evolui p/ Mega Gyarados!", recommended: true },
      { id: 81, name: "Magnemite", types: ["Elétrico", "Aço"], method: "cave", methodLabel: "⛰️ Thundercap Mountain (Epidimy Town)", levels: "Lv. 30 — 36", rateRed: 35, rateBlue: 35, highlight: "⚡ Evolui p/ Magnezone ali mesmo na Thundercap Mtn.!", recommended: true },
      { id: 597, name: "Ferroseed", types: ["Planta", "Aço"], method: "cave", methodLabel: "⛰️ Thundercap Mountain", levels: "Lv. 30 — 35", rateRed: 25, rateBlue: 25, highlight: "🛡️ Evolui p/ Ferrothorn (Iron Barbs)", recommended: true },
      { id: 498, name: "Tepig / Oshawott (Iniciais de Unova)", types: ["Fogo", "Água"], method: "static", methodLabel: "🎁 Casa a noroeste de Epidimy Town (Mais um Inicial de Unova!)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, recommended: true }
    ],
    items: [
      { name: "TM24 — Thunderbolt", move: "Thunderbolt", moveType: "Elétrico", category: "tm", icon: "💿", how: "Interior da Thundercap Mountain (logo após a entrada de Epidimy Town, usando Surf à direita)!" },
      { name: "TM42 — Facade & HM02 — Fly", move: "Facade", moveType: "Normal", category: "tm", icon: "💿", how: "Prêmios ao derrotar o Líder Mel no Ginásio Inverse Battle de Fallshore City (4ª Insígnia)!" },
      { name: "Link Stone (Evolui Haunter, Kadabra, Machoke, Graveler sem troca!)", category: "stone", icon: "🔗", how: "Vendida no mercado de rua de Fallshore City e encontrada na KBT Expressway!" },
      { name: "Ampharosite & Manectite", category: "stone", icon: "🧬", how: "Interior da Thundercap Mountain!" }
    ]
  },
  {
    id: "borrius-tarmigan-dehara-routes12-14",
    name: "Tarmigan Town (Tarmigan Mansion), Rota 12, Rota 13, Rota 14 (Ruins of Void) & Dehara City",
    sector: "Setor Borrius Central (Mega Ring & 5º Ginásio)",
    category: "special",
    connections: "Rota 11 ⇄ Tarmigan Town (Tarmigan Mansion) ⇄ Rota 12 ⇄ Rota 13 & Rota 14 (Ruins of Void) ⇄ Dehara City",
    levelRange: "Lv. 32 — 45",
    dominantTypes: "Elétrico / Aço / Água / Fada",
    encounters: [
      { id: 650, name: "Chespin / Fennekin / Froakie (Iniciais de Kalos)", types: ["Água", "Fogo", "Planta"], method: "static", methodLabel: "🎁 Casa a nordeste de Dehara City (Escolha um Inicial de Kalos!)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "🐸 Battle Bond / Protean Greninja!", recommended: true },
      { id: 137, name: "Porygon", types: ["Normal"], method: "static", methodLabel: "🎁 Dehara Game Corner (Prêmio de Fichas)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "Evolui p/ Porygon2 / Porygon-Z", recommended: true },
      { id: 120, name: "Staryu", types: ["Água"], method: "surf", methodLabel: "🌊 Surf / Pesca nas Rotas 13 e 14", levels: "Lv. 32 — 38", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Starmie", recommended: true },
      { id: 278, name: "Pelipper", types: ["Água", "Voador"], method: "surf", methodLabel: "🌊 Rotas 13 e 14", levels: "Lv. 32 — 38", rateRed: 35, rateBlue: 35, highlight: "🌧️ Drizzle Setter" }
    ],
    items: [
      { name: "Mega Ring / Mega Cuff (Desbloqueia Mega Evolução!)", category: "key", icon: "🧬", how: "Entregue pela Successor Maxima após derrotá-la na Tarmigan Mansion (Tarmigan Town)!" },
      { name: "TM75 — Swords Dance, TM13 — Ice Beam, TM24 — Thunderbolt & TM35 — Flamethrower", move: "Swords Dance", moveType: "Normal", category: "tm", icon: "💿", how: "Comprados no Dehara Game Corner (TM75 Swords Dance custa 4.000 moedas!) e itens evolutivos no Dehara Department Store!" },
      { name: "TM92 — Volt Switch", move: "Volt Switch", moveType: "Elétrico", category: "tm", icon: "💿", how: "Prêmio do Líder Galavan no Ginásio de Dehara City (5ª Insígnia)!" },
      { name: "TM83 — Scald", move: "Scald", moveType: "Água", category: "tm", icon: "💿", how: "Ilha norte da Rota 14 (próxima à Rota 6, subindo com Rock Climb acima da entrada da KBT Expressway)!" },
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Entregue pelo Rival em Dehara City após vencer o Ginásio de Galavan!" },
      { name: "Gardevoirite & Galladite", category: "stone", icon: "🧬", how: "Tarmigan Mansion / Missões de Tarmigan Town e Dehara City!" }
    ]
  },
  {
    id: "borrius-desert-vivill-gurun",
    name: "The Great Desert (Tomb of Borrius), Rota 15, Vivill Town, Vivill Woods & Gurun Town",
    sector: "Setor Grande Deserto & Vivill",
    category: "route",
    connections: "Dehara City ⇄ The Great Desert (Tomb of Borrius) ⇄ Gurun Town ⇄ Vivill Woods ⇄ Vivill Town ⇄ Rota 15",
    levelRange: "Lv. 36 — 48",
    dominantTypes: "Terra / Fogo / Inseto / Fantasma",
    encounters: [
      { id: 636, name: "Larvesta", types: ["Inseto", "Fogo"], method: "cave", methodLabel: "⛰️ Tomb of Borrius (The Great Desert — ou Ovo de Missão em Gurun Town!)", levels: "Lv. 35 — 42", rateRed: 20, rateBlue: 20, highlight: "☀️ Evolui p/ Volcarona (Quiver Dance)", recommended: true },
      { id: 551, name: "Sandile", types: ["Terra", "Noturno"], method: "grass", methodLabel: "🌿 The Great Desert", levels: "Lv. 36 — 40", rateRed: 35, rateBlue: 35, highlight: "Evolui p/ Krookodile (Moxie)", recommended: true },
      { id: 554, name: "Darumaka", types: ["Fogo"], method: "grass", methodLabel: "🌿 The Great Desert", levels: "Lv. 36 — 40", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Darmanitan", recommended: true },
      { id: 607, name: "Litwick", types: ["Fantasma", "Fogo"], method: "cave", methodLabel: "⛰️ Tomb of Borrius / Derrubando paredes na KBT", levels: "Lv. 35 — 40", rateRed: 25, rateBlue: 25, highlight: "🕯️ Evolui p/ Chandelure", recommended: true },
      { id: 546, name: "Cottonee", types: ["Planta", "Fada"], method: "grass", methodLabel: "🌿 Vivill Woods", levels: "Lv. 36 — 40", rateRed: 30, rateBlue: 30, highlight: "Prankster Whimsicott", recommended: true }
    ],
    items: [
      { name: "TM26 — Earthquake", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "The Great Desert — na encosta diretamente acima da entrada da Tomb of Borrius (use Rock Climb na parede externa)!" },
      { name: "TM30 — Shadow Ball", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Interior da Tomb of Borrius no Great Desert!" },
      { name: "Lucarionite", category: "stone", icon: "🧬", how: "Recompensa da missão 'A Hero's Journey' no Great Desert (derrote 2.000 Pokémon ou conte histórias para o viajante no deserto)!" },
      { name: "Gyaradosite", category: "stone", icon: "🧬", how: "Rota 15 / Vivill Warehouse (após derrotar os pescadores na Rota 15)!" }
    ]
  },
  {
    id: "borrius-antisis-seaport-league",
    name: "Rota 16, Antisis City (Sewers), Rota 17, Seaport City (Battle Frontier), Rota 18 & Pokémon League",
    sector: "Setor Sudeste, Porto & Liga Borrius (6º Ginásio & Elite Four)",
    category: "special",
    connections: "Gurun Town ⇄ Rota 16 ⇄ Antisis City (Antisis Sewers) | Rota 17 ⇄ Seaport City (Battle Frontier) | Rota 18 ⇄ Victory Rd. ⇄ Pokémon League",
    levelRange: "Lv. 42 — 75",
    dominantTypes: "Lutador / Veneno / Dragão / Aço",
    encounters: [
      { id: 821, name: "Rookidee / Corvisquire", types: ["Voador", "Aço"], method: "grass", methodLabel: "🌿 Rota 17 & Rota 18 (Encostas rumo à Victory Road)", levels: "Lv. 42 — 52", rateRed: 30, rateBlue: 30, highlight: "👑 Evolui p/ Corviknight", recommended: true },
      { id: 885, name: "Dreepy / Drakloak", types: ["Dragão", "Fantasma"], method: "cave", methodLabel: "⛰️ Victory Road / Special Encounter com DexNav", levels: "Lv. 48 — 55", rateRed: 15, rateBlue: 15, highlight: "👻 Evolui p/ Dragapult", recommended: true },
      { id: 109, name: "Koffing & Grimer", types: ["Veneno"], method: "cave", methodLabel: "⛰️ Antisis Sewers", levels: "Lv. 40 — 45", rateRed: 40, rateBlue: 40 },
      { id: 491, name: "Darkrai & Cresselia", types: ["Noturno", "Psíquico"], method: "static", methodLabel: "🎁 Newmoon Island & Fullmoon Island (Barco a partir de Seaport City)", levels: "Lv. 65 — 70", rateRed: 100, rateBlue: 100, highlight: "🌙 Lendários das Ilhas Lua", recommended: true }
    ],
    items: [
      { name: "TM60 — Drain Punch", move: "Drain Punch", moveType: "Lutador", category: "tm", icon: "💿", how: "Prêmio do Líder Big Mo no Ginásio de Antisis City (6ª Insígnia)!" },
      { name: "TM36 — Sludge Bomb", move: "Sludge Bomb", moveType: "Veneno", category: "tm", icon: "💿", how: "Interior dos esgotos Antisis Sewers!" },
      { name: "TM02 — Dragon Claw & TM80 — Rock Slide", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Interior da Victory Road de Borrius (Rota 18)!" },
      { name: "Gengarite", category: "stone", icon: "🧬", how: "Victory Road de Borrius (caverna externa de neve na subida para a Liga Pokémon)!" },
      { name: "Choice Band, Choice Specs, Choice Scarf, Life Orb, Assault Vest & Focus Sash", category: "held", icon: "🎗️", how: "Loja de BP da Battle Frontier (ao sul de Seaport City) ou recompensas de Raid Dens 5–6 estrelas!" }
    ]
  },
  {
    id: "borrius-east-polder-redwood-cube",
    name: "Polder Town, Cootes Bog, Crystal Peak, Magnolia Town, Redwood Village & Cube Corp.",
    sector: "Setor Leste de Borrius (7º e 8º Ginásios & Cube Corp.)",
    category: "special",
    connections: "Polder Town ⇄ Cootes Bog (Crystal Peak) ⇄ Magnolia Town ⇄ Magnolia Fields ⇄ Redwood Village ⇄ Redwood Forest ⇄ Cube Corp.",
    levelRange: "Lv. 45 — 75",
    dominantTypes: "Água / Fantasma / Aço / Inseto / Terra",
    encounters: [
      { id: 679, name: "Honedge / Doublade", types: ["Aço", "Fantasma"], method: "grass", methodLabel: "🌿 Polder Town Safari Zone (Dificuldade Insane do minigame Safari!)", levels: "Lv. 45 — 50", rateRed: 25, rateBlue: 25, highlight: "👑 Evolui p/ Aegislash (Dusk Stone)", recommended: true },
      { id: 656, name: "Froakie & Iniciais de Todas as Regiões", types: ["Água"], method: "static", methodLabel: "🎁 Senhora de Ovos em frente ao Magnolia Café (Magnolia Town)", levels: "Lv. 1", rateRed: 100, rateBlue: 100, highlight: "🥚 Ovos de Iniciais no Magnolia Café", recommended: true },
      { id: 216, name: "Teddiursa / Ursaring (Ursaluna)", types: ["Normal", "Terra"], method: "grass", methodLabel: "🌿 Redwood Forest & Cube Corp. (Evolui p/ Ursaluna com Peat Block!)", levels: "Lv. 48 — 55", rateRed: 30, rateBlue: 30, highlight: "🐻 Evolui p/ Ursaluna & Kleavor!", recommended: true },
      { id: 704, name: "Goomy / Sliggoo", types: ["Dragão"], method: "grass", methodLabel: "🌿 Cootes Bog (Chuva Constante!)", levels: "Lv. 45 — 50", rateRed: 30, rateBlue: 30, highlight: "Evolui p/ Goodra ali mesmo na chuva", recommended: true },
      { id: 123, name: "Scyther", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Redwood Forest (Headbutt nas árvores!)", levels: "Lv. 46 — 52", rateRed: 25, rateBlue: 25, highlight: "Evolui p/ Mega Scizor ou Kleavor", recommended: true }
    ],
    items: [
      { name: "HM07 — Waterfall & HM08 — Rock Climb", move: "Waterfall", moveType: "Água", category: "tm", icon: "💿", how: "Waterfall é prêmio da Líder Tessy no Ginásio de Polder Town (7ª Insígnia); Rock Climb na Rota 17 / Crystal Peak!" },
      { name: "TM49 — Leech Life", move: "Leech Life", moveType: "Inseto", category: "tm", icon: "💿", how: "Prêmio do Líder Benjamin no Ginásio de Redwood Village (8ª Insígnia)!" },
      { name: "TM29 — Psychic", move: "Psychic", moveType: "Psíquico", category: "tm", icon: "💿", how: "Interior do Crystal Peak (acessível pelo Cootes Bog)!" },
      { name: "Blazikenite, Sceptilite, Swampertite, Salamencite, Mawilite & Mega Stone Maker", category: "stone", icon: "🧬", how: "Forjadas no Mega Stone Maker dentro da Cube Corp. (trocando 5 Gems do tipo correspondente) e nas trocas do Magnolia Café!" },
      { name: "Venusaurite, Charizardite X/Y & Blastoisinite", category: "stone", icon: "🧬", how: "Entregues pelos treinadores visitantes no Magnolia Café (Magnolia Town) em dias específicos da semana!" },
      { name: "Peat Block & Black Augurite (Ursaluna & Kleavor)", category: "stone", icon: "🪨", how: "Raid Dens de Redwood Forest / Cube Corp. para evoluir Ursaring em Ursaluna e Scyther em Kleavor!" }
    ]
  }
];

// ============================================================================
// 4H. DADOS DE ILIOS (POKÉMON LAZARUS — POR NEMO622, DOCUMENTAÇÃO OFICIAL)
// ============================================================================
const ILIOS_AREAS = [
  {
    id: "ilios-acrisia-bronze",
    name: "Acrisia City, Acrisia University, Acrisia Mountains & Bronze Fields (North & South)",
    sector: "Setor Ilios Noroeste — Universidade & Início",
    category: "route",
    connections: "Acrisia Mountains (Norte) ⇄ Acrisia City (Acrisia University) ⇄ Bronze Fields (Sul) & Riverwalk Trail (Sudeste)",
    levelRange: "Lv. 2 — 12",
    dominantTypes: "Planta / Fogo / Água / Voador / Elétrico",
    encounters: [
      { id: 722, name: "Rowlet / Litten / Popplio (Iniciais Gen 7)", types: ["Planta", "Fogo", "Água"], method: "static", methodLabel: "🎁 Escolha de Inicial c/ Prof. Elia na Acrisia University (Ou 100/135/170 na Pokédex!)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "⭐ 9 Opções de Iniciais em Acrisia!", recommended: true },
      { id: 650, name: "Chespin / Fennekin / Froakie (Iniciais Gen 6)", types: ["Planta", "Fogo", "Água"], method: "static", methodLabel: "🎁 Escolha de Inicial c/ Prof. Elia na Acrisia University", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "🐸 Evolui p/ Greninja / Delphox / Chesnaught", recommended: true },
      { id: 906, name: "Sprigatito / Fuecoco / Quaxly (Iniciais Gen 9)", types: ["Planta", "Fogo", "Água"], method: "static", methodLabel: "🎁 Escolha de Inicial c/ Prof. Elia na Acrisia University", levels: "Lv. 5", rateRed: 100, rateBlue: 100, highlight: "🔥 Evolui p/ Meowscarada / Skeledirge / Quaquaval", recommended: true },
      { id: 731, name: "Pikipek", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Bronze Fields (North & South)", levels: "Lv. 3 — 7", rateRed: 30, rateBlue: 30, highlight: "🧬 Evolui p/ MEGA TOUCANNON exclusivo de Lazarus!", recommended: true },
      { id: 179, name: "Mareep", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Bronze Fields", levels: "Lv. 3 — 7", rateRed: 25, rateBlue: 25, highlight: "Evolui p/ Mega Ampharos", recommended: true },
      { id: 163, name: "Hoothoot", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Bronze Fields (Noite) & Acrisia Mountains", levels: "Lv. 3 — 9", rateRed: 25, rateBlue: 25, timeTag: "🌙 Noite", highlight: "Evolui p/ Noctowl", recommended: true }
    ],
    items: [
      { name: "Mega Stone Shop (Todas as 58 Mega Stones de Ilios, incluindo Mega Toucannon, Mega Ribombee, Mega Flygon, Mega Tinkaton e Mega Cyclizar!)", category: "stone", icon: "🧬", how: "Loja gerenciada por Niko dentro da Acrisia University (desbloqueada após concluir a missão de Niko em Sofos City; o estoque aumenta a cada Insígnia)!" },
      { name: "Exp. Share & Rotom Phone", category: "key", icon: "📱", how: "Obtidos logo no início da jornada entre Acrisia City e Bronze Fields!" },
      { name: "Loaded Dice, TM27 — Return, Oval Charm & 3x Leftovers", move: "Return", moveType: "Normal", category: "held", icon: "🍎", how: "Recompensas da Prof. Elia na Acrisia University ao registrar Pokémon na Ilios Dex (Loaded Dice c/ 25, TM27 Return c/ 50, Iniciais extras c/ 100/135/170 e 3 Leftovers c/ 250 capturados)!" },
      { name: "Espathra Whistle (Montaria Rápida)", category: "key", icon: "🪈", how: "Obtido nas Acrisia Mountains!" }
    ]
  },
  {
    id: "ilios-jusmail-riverwalk-kalami",
    name: "Jusmail Town (1º Ginásio), Riverwalk Trail & Kalami City (2º Ginásio)",
    sector: "Setor Ilios Norte-Central — Musas Polymnia & Ourani",
    category: "route",
    connections: "Bronze Fields ⇄ Jusmail Town | Acrisia City ⇄ Riverwalk Trail (West & South) ⇄ Kalami City",
    levelRange: "Lv. 7 — 20",
    dominantTypes: "Inseto / Fada / Terra / Aço / Fogo",
    encounters: [
      { id: 742, name: "Cutiefly", types: ["Inseto", "Fada"], method: "grass", methodLabel: "🌿 Riverwalk Trail & Jusmail Gardens", levels: "Lv. 8 — 14", rateRed: 25, rateBlue: 25, highlight: "🧬 Evolui p/ MEGA RIBOMBEE exclusivo de Lazarus!", recommended: true },
      { id: 304, name: "Aron", types: ["Aço", "Pedra"], method: "grass", methodLabel: "🌿 Riverwalk Trail & Kalami Outskirts", levels: "Lv. 9 — 15", rateRed: 25, rateBlue: 25, highlight: "Evolui p/ Mega Aggron", recommended: true },
      { id: 749, name: "Mudbray", types: ["Terra"], method: "grass", methodLabel: "🌿 Riverwalk Trail", levels: "Lv. 10 — 15", rateRed: 20, rateBlue: 20, highlight: "🐴 Evolui p/ Mudsdale (Stamina)", recommended: true },
      { id: 551, name: "Sandile", types: ["Terra", "Noturno"], method: "grass", methodLabel: "🌿 Riverwalk Trail (South)", levels: "Lv. 10 — 15", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Krookodile (Moxie)", recommended: true },
      { id: 406, name: "Budew & Shroomish", types: ["Planta"], method: "grass", methodLabel: "🌿 Jusmail Town & Riverwalk Trail", levels: "Lv. 7 — 13", rateRed: 25, rateBlue: 25, highlight: "Evoluem p/ Roserade e Breloom", recommended: true },
      { id: 840, name: "Applin (Segura Leftovers!)", types: ["Planta", "Dragão"], method: "grass", methodLabel: "🌿 Árvores e Pomares de Jusmail Town / Bronze Fields", levels: "Lv. 8 — 14", rateRed: 15, rateBlue: 15, highlight: "🍎 Chance de segurar Leftovers selvagem!", recommended: true }
    ],
    items: [
      { name: "TM09 — Bullet Seed & HM01 — Cut", move: "Bullet Seed", moveType: "Planta", category: "tm", icon: "💿", how: "Prêmios ao derrotar a 1ª Líder de Ginásio Polymnia (Musa da Agricultura) em Jusmail Town (Harvest Badge)!" },
      { name: "HM06 — Rock Smash, DexNav & Ability Capsule", move: "Rock Smash", moveType: "Lutador", category: "tm", icon: "💿", how: "Prêmios ao derrotar a 2ª Líder de Ginásio Ourani em Kalami City (Gemstone Badge) e falar com a Prof. Elia!" },
      { name: "Nature Mints & Berry Club", category: "key", icon: "🌿", how: "Jusmail Town Berry Club (permite cultivar Berries e obter Mints para ajustar a Nature dos Pokémon)!" },
      { name: "Old Rod", category: "key", icon: "🎣", how: "Entregue pelo pescador nos píeres a leste de Kalami City!" },
      { name: "Leftovers (Farm Rápido c/ Thief/DexNav)", category: "held", icon: "🍎", how: "Equipado em Applin selvagens (use o DexNav + golpe Thief/Covet para farmar Leftovers logo no início da campanha)!" }
    ]
  },
  {
    id: "ilios-wanderers-pythios-kaptara",
    name: "Wanderer's Woods, Pythios Town (3º Ginásio), Satyr's Lair & Kaptara Island",
    sector: "Setor Ilios Sudoeste — Musa Kleio & Ilha Kaptara",
    category: "route",
    connections: "Jusmail Town ⇄ Wanderer's Woods ⇄ Pythios Town (Pythios Cemetery) ⇄ Satyr's Lair ⇄ Kaptara Island",
    levelRange: "Lv. 16 — 38",
    dominantTypes: "Fantasma / Psíquico / Fada / Aço",
    encounters: [
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "grass", methodLabel: "🌿 Wanderer's Woods & Pythios Cemetery", levels: "Lv. 16 — 22", rateRed: 30, rateBlue: 30, highlight: "👻 Evolui p/ Mega Gengar", recommended: true },
      { id: 957, name: "Tinkatink", types: ["Fada", "Aço"], method: "grass", methodLabel: "🌿 Ruínas de Pythios & Satyr's Lair", levels: "Lv. 18 — 26", rateRed: 20, rateBlue: 20, highlight: "🔨 Evolui p/ MEGA TINKATON exclusivo de Lazarus!", recommended: true },
      { id: 859, name: "Impidimp", types: ["Noturno", "Fada"], method: "grass", methodLabel: "🌿 Wanderer's Woods", levels: "Lv. 16 — 21", rateRed: 25, rateBlue: 25, highlight: "👹 Evolui p/ Grimmsnarl (Prankster)", recommended: true },
      { id: 280, name: "Ralts", types: ["Psíquico", "Fada"], method: "grass", methodLabel: "🌿 Wanderer's Woods", levels: "Lv. 15 — 20", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Mega Gardevoir ou Mega Gallade", recommended: true },
      { id: 234, name: "Stantler (Wyrdeer)", types: ["Normal", "Psíquico"], method: "grass", methodLabel: "🌿 Satyr's Lair & Kaptara Island", levels: "Lv. 22 — 32", rateRed: 25, rateBlue: 25, highlight: "🦌 Evolui p/ Wyrdeer!" }
    ],
    items: [
      { name: "TM04 — Calm Mind", move: "Calm Mind", moveType: "Psíquico", category: "tm", icon: "💿", how: "Prêmio da 3ª Líder de Ginásio Kleio (Musa da História — Fantasma/Psíquico) em Pythios Town (Grave Badge)!" },
      { name: "HM02 — Fly", move: "Fly", moveType: "Voador", category: "tm", icon: "💿", how: "Obtido na exploração de Satyr's Lair e Kaptara Island (ao sul de Pythios Town)!" },
      { name: "TM30 — Shadow Ball & Deepwater Curse", move: "Shadow Ball", moveType: "Fantasma", category: "tm", icon: "💿", how: "Pythios Cemetery e estudante universitário em Wanderer's Woods!" }
    ]
  },
  {
    id: "ilios-erinys-froslass-sofos",
    name: "Erinys Path (West & East), Froslass Cavern, Asfal Hills & Sofos City (4º Ginásio)",
    sector: "Setor Ilios Central — Musa Terpsikore & Key Stone",
    category: "cave",
    connections: "Pythios Town ⇄ Erinys Path ⇄ Froslass Cavern ⇄ Asfal Hills ⇄ Sofos City (Acropolis Temple)",
    levelRange: "Lv. 22 — 32",
    dominantTypes: "Gelo / Fada / Lutador / Psíquico",
    encounters: [
      { id: 175, name: "Togepi", types: ["Fada"], method: "grass", methodLabel: "🌿 Erinys Path (West & East)", levels: "Lv. 20 — 24", rateRed: 15, rateBlue: 15, highlight: "👑 Evolui p/ Togekiss (Air Slash + Serene Grace)", recommended: true },
      { id: 361, name: "Snorunt", types: ["Gelo"], method: "cave", methodLabel: "⛰️ Froslass Cavern (1F, B1F e B2F)", levels: "Lv. 22 — 27", rateRed: 30, rateBlue: 30, highlight: "❄️ Evolui p/ Froslass ou Mega Glalie", recommended: true },
      { id: 215, name: "Sneasel", types: ["Noturno", "Gelo"], method: "cave", methodLabel: "⛰️ Froslass Cavern", levels: "Lv. 23 — 27", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Weavile", recommended: true },
      { id: 577, name: "Solosis", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Erinys Path", levels: "Lv. 21 — 25", rateRed: 25, rateBlue: 25, highlight: "Evolui p/ Reuniclus", recommended: true },
      { id: 672, name: "Skiddo / Gogoat", types: ["Planta"], method: "grass", methodLabel: "🌿 Asfal Hills & Sofos City", levels: "Lv. 24 — 28", rateRed: 30, rateBlue: 30, recommended: true },
      { id: 243, name: "Raikou, Entei & Suicune", types: ["Elétrico", "Fogo", "Água"], method: "static", methodLabel: "🎁 Estátuas do Sofos Acropolis Temple (Despertam na campanha/pós-game)", levels: "Lv. 50 — 60", rateRed: 100, rateBlue: 100, highlight: "⚡🔥💧 Feras Lendárias do Templo de Sofos!" }
    ],
    items: [
      { name: "Key Stone (Desbloqueia Mega Evolução e a Loja de Mega Stones!)", category: "key", icon: "🧬", how: "Conclua a missão de Niko em Sofos City / Asfal Hills!" },
      { name: "HM03 — Surf", move: "Surf", moveType: "Água", category: "tm", icon: "💿", how: "Entregue por Niko em Asfal Hills / Sofos City!" },
      { name: "TM53 — Power-Up Punch", move: "Power-Up Punch", moveType: "Lutador", category: "tm", icon: "💿", how: "Prêmio da 4ª Líder de Ginásio Terpsikore (Musa da Dança — Lutador/Psíquico) em Sofos City!" },
      { name: "TM08 — Bulk Up", move: "Bulk Up", moveType: "Lutador", category: "tm", icon: "💿", how: "Penhasco sudoeste de Erinys Path (West), com vista para o mar!" },
      { name: "TM06 — Toxic", move: "Toxic", moveType: "Veneno", category: "tm", icon: "💿", how: "Entregue pelo marinheiro a oeste do Battle Pavilion em Sofos City!" },
      { name: "Fire Stone, Water Stone, Thunder Stone, Leaf Stone, Sun Stone & Moon Stone (Troca de Shards)", category: "stone", icon: "💎", how: "Trocador de Shards em Sofos City (Red Shard = Fire/Sun Stone; Blue Shard = Water/Moon Stone; Green Shard = Leaf Stone; Yellow Shard = Thunder Stone)!" },
      { name: "Amulet Coin & Good Rod", category: "held", icon: "🪙", how: "Amulet Coin com o estudante universitário de Sofos City; Good Rod com o Fishing Guru de Sofos City!" }
    ]
  },
  {
    id: "ilios-asteri-myrrini-fresco",
    name: "Sea of Asteri, Marmaro Island (Mines), Myrrini Island (5º Ginásio), Sea of Vulcai & Fresco Isles (6º Ginásio)",
    sector: "Setor Arquipélago de Ilios — Musas Euterpe, Thalia & Melpomene",
    category: "route",
    connections: "Sofos City ⇄ Sea of Asteri ⇄ Marmaro Island (Marmaro Mines) ⇄ Myrrini Island ⇄ Sea of Vulcai ⇄ Fresco Isles",
    levelRange: "Lv. 28 — 38",
    dominantTypes: "Água / Veneno / Terra / Dragão / Elétrico",
    encounters: [
      { id: 328, name: "Trapinch", types: ["Terra"], method: "cave", methodLabel: "⛰️ Marmaro Mines & Fresco Isles", levels: "Lv. 28 — 34", rateRed: 25, rateBlue: 25, highlight: "🧬 Evolui p/ MEGA FLYGON exclusivo de Lazarus!", recommended: true },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "surf", methodLabel: "🌊 Sea of Asteri & Sea of Vulcai", levels: "Lv. 30 — 36", rateRed: 15, rateBlue: 15, highlight: "Tanque Água/Gelo", recommended: true },
      { id: 878, name: "Cufant", types: ["Aço"], method: "cave", methodLabel: "⛰️ Marmaro Mines", levels: "Lv. 28 — 33", rateRed: 25, rateBlue: 25, highlight: "🐘 Evolui p/ Copperajah (Sheer Force)", recommended: true },
      { id: 694, name: "Helioptile", types: ["Elétrico", "Normal"], method: "grass", methodLabel: "🌿 Fresco Isles", levels: "Lv. 31 — 35", rateRed: 25, rateBlue: 25, highlight: "☀️ Evolui p/ Heliolisk (Sun Stone)", recommended: true },
      { id: 155, name: "Cyndaquil / Quilava", types: ["Fogo"], method: "grass", methodLabel: "🌿 Encostas vulcânicas do Sea of Vulcai / Fresco Isles", levels: "Lv. 30 — 36", rateRed: 20, rateBlue: 20, highlight: "🧬 Evolui p/ MEGA TYPHLOSION exclusivo de Lazarus!", recommended: true }
    ],
    items: [
      { name: "HM08 — Dive", move: "Dive", moveType: "Água", category: "tm", icon: "💿", how: "Obtido no interior das Marmaro Mines (permite mergulhar nas trincheiras do Sea of Asteri e Sea of Vulcai)!" },
      { name: "TM21 — Acid Spray & TM84 — Poison Jab", move: "Poison Jab", moveType: "Veneno", category: "tm", icon: "💿", how: "TM21 é prêmio da 5ª Líder de Ginásio Euterpe (Musa do Entretenimento — Água/Veneno) em Myrrini Island; TM Poison Jab com o estudante universitário de Myrrini!" },
      { name: "TM49 — Bulldoze & Permissão do HM04 — Strength", move: "Bulldoze", moveType: "Terra", category: "tm", icon: "💿", how: "Prêmio das Líderes Gêmeas Thalia & Melpomene (6º Ginásio em Dupla — Elétrico/Terra) nas Fresco Isles (Theatrical Badge)!" }
    ]
  },
  {
    id: "ilios-palati-pello-areios",
    name: "Palati City (7º Ginásio), Tower of Dioxippus, Port Pello, Corrin Crossing & Areios Town (8º Ginásio)",
    sector: "Setor Ilios Sul & Leste — Musas Rhadine & Kalliope",
    category: "special",
    connections: "Sea of Vulcai ⇄ Palati City (Tower of Dioxippus) | Myrrini ⇄ Port Pello ⇄ Corrin Crossing ⇄ Areios Town (Areios Hideout)",
    levelRange: "Lv. 36 — 52",
    dominantTypes: "Fogo / Voador / Dragão / Normal",
    encounters: [
      { id: 967, name: "Cyclizar", types: ["Dragão", "Normal"], method: "grass", methodLabel: "🌿 Corrin Crossing & Areios Outskirts", levels: "Lv. 38 — 46", rateRed: 25, rateBlue: 25, highlight: "👑 Evolui p/ MEGA CYCLIZAR S/V (As do Campeão Anyalios)!", recommended: true },
      { id: 850, name: "Sizzlipede / Centiskorch", types: ["Fogo", "Inseto"], method: "cave", methodLabel: "⛰️ Tower of Dioxippus & Palati City", levels: "Lv. 36 — 42", rateRed: 25, rateBlue: 25, highlight: "🔥 Flash Fire / White Smoke", recommended: true },
      { id: 696, name: "Tyrunt & Amaura", types: ["Pedra", "Dragão"], method: "cave", methodLabel: "⛰️ Deserto e Montanhas de Areios Town", levels: "Lv. 40 — 46", rateRed: 20, rateBlue: 20, highlight: "🦖 Evoluem p/ Tyrantrum (Strong Jaw) e Aurorus", recommended: true },
      { id: 629, name: "Vullaby / Mandibuzz", types: ["Noturno", "Voador"], method: "grass", methodLabel: "🌿 Corrin Crossing & Areios Desert", levels: "Lv. 40 — 48", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 674, name: "Pancham / Pangoro", types: ["Lutador", "Noturno"], method: "grass", methodLabel: "🌿 Port Pello & Corrin Crossing", levels: "Lv. 38 — 45", rateRed: 25, rateBlue: 25, recommended: true }
    ],
    items: [
      { name: "TM35 — Flamethrower, TM57 — Roost & TM58 — Thunder Wave", move: "Flamethrower", moveType: "Fogo", category: "tm", icon: "💿", how: "TM35 Flamethrower é prêmio da 7ª Líder de Ginásio Rhadine (Fogo/Voador) em Palati City; TM57 Roost e TM58 Thunder Wave nas missões de Palati City!" },
      { name: "TM02 — Dragon Claw", move: "Dragon Claw", moveType: "Dragão", category: "tm", icon: "💿", how: "Prêmio do 8º Ginásio em Areios Town após desmantelar o Areios Hideout da Team Chimera!" },
      { name: "TM54 — Spikes", move: "Spikes", moveType: "Terra", category: "tm", icon: "💿", how: "Entregue pelo estudante universitário na ponte de Corrin Crossing!" }
    ]
  },
  {
    id: "ilios-pentepetal-ahiyawa-bastion",
    name: "Péntepetal City, Davosi Straits, Ruins of Ahiyawa (Liga Ilios) & Skyborne Bastion",
    sector: "Setor Liga Ilios & Pós-Game (Ruins of Ahiyawa & Skyborne Bastion)",
    category: "special",
    connections: "Erinys Path ⇄ Péntepetal City ⇄ Davosi Straits (Waterfall) ⇄ Ruins of Ahiyawa (Elite Four & Campeão Anyalios) & Skyborne Bastion",
    levelRange: "Lv. 48 — 78",
    dominantTypes: "Dragão / Aço / Pedra / Psíquico / Fada",
    encounters: [
      { id: 147, name: "Dratini / Dragonair", types: ["Dragão"], method: "surf", methodLabel: "🌊 Cachoeiras de Davosi Straits & Ruins of Ahiyawa", levels: "Lv. 45 — 55", rateRed: 20, rateBlue: 20, highlight: "👑 Evolui p/ Dragonite (Multiscale)", recommended: true },
      { id: 246, name: "Larvitar / Pupitar", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Ruins of Ahiyawa & Skyborne Bastion", levels: "Lv. 48 — 58", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Mega Tyranitar", recommended: true },
      { id: 870, name: "Falinks", types: ["Lutador"], method: "grass", methodLabel: "🌿 Ruins of Ahiyawa & Skyborne Bastion", levels: "Lv. 48 — 56", rateRed: 20, rateBlue: 20, highlight: "🧬 Evolui p/ MEGA FALINKS exclusivo de Lazarus!", recommended: true },
      { id: 123, name: "Scyther / Scizor", types: ["Inseto", "Aço"], method: "grass", methodLabel: "🌿 Péntepetal Outskirts & Skyborne Bastion", levels: "Lv. 46 — 55", rateRed: 20, rateBlue: 20, highlight: "Evolui p/ Mega Scizor", recommended: true }
    ],
    items: [
      { name: "HM07 — Waterfall", move: "Waterfall", moveType: "Água", category: "tm", icon: "💿", how: "Obtido nos estreitos aquáticos de Davosi Straits (necessário para subir as cachoeiras até as Ruins of Ahiyawa e enfrentar a Elite Four)!" },
      { name: "Mercado de TMs de Péntepetal City (TM51 a TM55, Earthquake, Ice Beam, Thunderbolt, Psychic, Swords Dance)", move: "Earthquake", moveType: "Terra", category: "tm", icon: "💿", how: "Vendidos pelos mercadores de rua no grande bazar de Péntepetal City e no lobby das Ruins of Ahiyawa!" },
      { name: "Choice Band, Choice Specs, Choice Scarf, Life Orb, Focus Sash & Assault Vest", category: "held", icon: "🎗️", how: "Bazar de Péntepetal City, Battle Pavilion de Sofos City e Skyborne Bastion!" }
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

  // ==========================================================================
  // KANTO NOS JOGOS DE JOHTO (GEN 2 GSC & GEN 4 HGSS — 2ª REGIÃO COM MT. SILVER)
  // ==========================================================================
  KantoJohto: {
    terrainSvg: `
      <line x1="240" y1="240" x2="620" y2="445" stroke="#10b981" stroke-width="4.5" stroke-dasharray="8 4" opacity="0.8" filter="url(#glow-emerald)" />
      <line x1="560" y1="315" x2="40" y2="315" stroke="#38bdf8" stroke-width="3.5" stroke-dasharray="6 6" opacity="0.55" />
    `,
    routes: [
      { num: "1", areaId: "jk-pallet-viridian-1-2", path: "M 240 415 L 240 560", lx: 240, ly: 492, marine: false },
      { num: "2", areaId: "jk-pallet-viridian-1-2", path: "M 240 175 L 240 415", lx: 240, ly: 362, marine: false },
      { num: "3", areaId: "jk-pewter-mt-moon-3-4", path: "M 240 175 L 400 175", lx: 320, ly: 175, marine: false },
      { num: "4", areaId: "jk-pewter-mt-moon-3-4", path: "M 400 175 L 560 175", lx: 480, ly: 175, marine: false },
      { num: "5", areaId: "jk-saffron-celadon-7-8", path: "M 560 175 L 560 315", lx: 560, ly: 245, marine: false },
      { num: "6", areaId: "jk-vermilion-diglett-11", path: "M 560 315 L 560 445", lx: 560, ly: 380, marine: false },
      { num: "7", areaId: "jk-saffron-celadon-7-8", path: "M 420 315 L 560 315", lx: 490, ly: 315, marine: false },
      { num: "8", areaId: "jk-saffron-celadon-7-8", path: "M 560 315 L 760 315", lx: 660, ly: 315, marine: false },
      { num: "9", areaId: "jk-cerulean-24-25-power-plant", path: "M 560 175 L 760 175", lx: 660, ly: 175, marine: false },
      { num: "10", areaId: "jk-cerulean-24-25-power-plant", path: "M 760 175 L 760 315", lx: 760, ly: 255, marine: false },
      { num: "11", areaId: "jk-vermilion-diglett-11", path: "M 560 445 L 760 445", lx: 695, ly: 445, marine: false },
      { num: "12", areaId: "jk-lavender-12-15-fuchsia", path: "M 760 315 L 760 520", lx: 760, ly: 482, marine: false },
      { num: "13", areaId: "jk-lavender-12-15-fuchsia", path: "M 760 520 L 650 520", lx: 705, ly: 520, marine: false },
      { num: "14", areaId: "jk-lavender-12-15-fuchsia", path: "M 650 520 L 650 620", lx: 650, ly: 572, marine: false },
      { num: "15", areaId: "jk-lavender-12-15-fuchsia", path: "M 650 620 L 515 620", lx: 582, ly: 620, marine: false },
      { num: "16", areaId: "jk-cycling-16-18", path: "M 420 315 L 345 315", lx: 378, ly: 315, marine: false },
      { num: "17", areaId: "jk-cycling-16-18", path: "M 345 315 L 345 620", lx: 345, ly: 475, marine: false },
      { num: "18", areaId: "jk-cycling-16-18", path: "M 345 620 L 515 620", lx: 430, ly: 620, marine: false },
      { num: "19", areaId: "jk-cinnabar-seafoam-19-21", path: "M 515 620 L 515 690 L 380 690", lx: 455, ly: 690, marine: true },
      { num: "20", areaId: "jk-cinnabar-seafoam-19-21", path: "M 380 690 L 240 690", lx: 310, ly: 690, marine: true },
      { num: "21", areaId: "jk-cinnabar-seafoam-19-21", path: "M 240 560 L 240 690", lx: 240, ly: 625, marine: true },
      { num: "22", areaId: "jk-victory-mt-silver-22-28", path: "M 240 415 L 115 415", lx: 178, ly: 415, marine: false },
      { num: "26", areaId: "jk-victory-mt-silver-22-28", path: "M 115 415 L 115 585", lx: 115, ly: 500, marine: false },
      { num: "27", areaId: "jk-victory-mt-silver-22-28", path: "M 115 585 L 45 585", lx: 80, ly: 585, marine: true },
      { num: "23", areaId: "jk-victory-mt-silver-22-28", path: "M 115 415 L 115 125", lx: 115, ly: 335, marine: false },
      { num: "28", areaId: "jk-victory-mt-silver-22-28", path: "M 115 415 L 48 415", lx: 82, ly: 415, marine: false },
      { num: "24", areaId: "jk-cerulean-24-25-power-plant", path: "M 560 175 L 560 55", lx: 560, ly: 112, marine: false },
      { num: "25", areaId: "jk-cerulean-24-25-power-plant", path: "M 560 55 L 705 55", lx: 632, ly: 55, marine: false }
    ],
    cities: [
      { name: "Indigo Plateau", areaId: "jk-victory-mt-silver-22-28", x: 115, y: 125, lx: 115, ly: 86, anchor: "middle" },
      { name: "Pewter City", areaId: "jk-pewter-mt-moon-3-4", x: 240, y: 175, lx: 240, ly: 140, anchor: "middle" },
      { name: "Viridian City", areaId: "jk-pallet-viridian-1-2", x: 240, y: 415, lx: 274, ly: 420, anchor: "start" },
      { name: "Pallet Town", areaId: "jk-pallet-viridian-1-2", x: 240, y: 560, lx: 205, ly: 564, anchor: "end" },
      { name: "Cinnabar Island", areaId: "jk-cinnabar-seafoam-19-21", x: 240, y: 690, lx: 204, ly: 694, anchor: "end" },
      { name: "Cerulean City", areaId: "jk-cerulean-24-25-power-plant", x: 560, y: 175, lx: 594, ly: 152, anchor: "start" },
      { name: "Celadon City", areaId: "jk-saffron-celadon-7-8", x: 420, y: 315, lx: 420, ly: 280, anchor: "middle" },
      { name: "Saffron City", areaId: "jk-saffron-celadon-7-8", x: 560, y: 315, lx: 595, ly: 292, anchor: "start" },
      { name: "Vermilion City", areaId: "jk-vermilion-diglett-11", x: 560, y: 445, lx: 525, ly: 449, anchor: "end" },
      { name: "Lavender Town", areaId: "jk-lavender-12-15-fuchsia", x: 760, y: 315, lx: 760, ly: 356, anchor: "middle" },
      { name: "Fuchsia City", areaId: "jk-lavender-12-15-fuchsia", x: 515, y: 620, lx: 515, ly: 660, anchor: "middle" }
    ],
    sites: [
      { name: "Mt. Silver", areaId: "jk-victory-mt-silver-22-28", x: 48, y: 415, lx: 48, ly: 382, anchor: "middle" },
      { name: "Victory Road", areaId: "jk-victory-mt-silver-22-28", x: 115, y: 240, lx: 142, ly: 244, anchor: "start" },
      { name: "Tohjo Falls", areaId: "jk-victory-mt-silver-22-28", x: 45, y: 585, lx: 45, ly: 618, anchor: "middle" },
      { name: "Diglett's Cave", areaId: "jk-vermilion-diglett-11", x: 240, y: 240, lx: 214, ly: 244, anchor: "end", hideLabel: true },
      { name: "Viridian Forest", areaId: "jk-pallet-viridian-1-2", x: 240, y: 305, lx: 212, ly: 308, anchor: "end" },
      { name: "Mt. Moon", areaId: "jk-pewter-mt-moon-3-4", x: 400, y: 175, lx: 400, ly: 142, anchor: "middle" },
      { name: "Cerulean Cave", areaId: "jk-cerulean-24-25-power-plant", x: 510, y: 108, lx: 510, ly: 76, anchor: "middle" },
      { name: "Rock Tunnel", areaId: "jk-cerulean-24-25-power-plant", x: 760, y: 175, lx: 786, ly: 179, anchor: "start" },
      { name: "Power Plant", areaId: "jk-cerulean-24-25-power-plant", x: 786, y: 228, lx: 760, ly: 224, anchor: "end" },
      { name: "Radio Tower", areaId: "jk-lavender-12-15-fuchsia", x: 786, y: 284, lx: 758, ly: 282, anchor: "end" },
      { name: "Diglett's Cave", areaId: "jk-vermilion-diglett-11", x: 620, y: 445, lx: 620, ly: 482, anchor: "middle" },
      { name: "Pal Park / Fuchsia", areaId: "jk-lavender-12-15-fuchsia", x: 515, y: 565, lx: 515, ly: 534, anchor: "middle" },
      { name: "Seafoam Islands", areaId: "jk-cinnabar-seafoam-19-21", x: 380, y: 690, lx: 380, ly: 728, anchor: "middle" }
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
  },

  Sinnoh: {
    terrainSvg: ``,
    routes: [
      { num: "201", areaId: "sinnoh-twinleaf-jubilife", path: "M 160 660 L 160 595 L 230 595", lx: 192, ly: 595, marine: false },
      { num: "202", areaId: "sinnoh-twinleaf-jubilife", path: "M 230 595 L 230 505", lx: 230, ly: 550, marine: false },
      { num: "218", areaId: "sinnoh-canalave-iron-island", path: "M 230 505 L 105 505", lx: 168, ly: 505, marine: true },
      { num: "Iron", areaId: "sinnoh-canalave-iron-island", path: "M 105 505 L 105 345", lx: 105, ly: 425, marine: true },
      { num: "203", areaId: "sinnoh-twinleaf-jubilife", path: "M 230 505 L 355 505", lx: 292, ly: 505, marine: false },
      { num: "204", areaId: "sinnoh-oreburgh-floaroma-eterna", path: "M 230 505 L 230 375", lx: 230, ly: 440, marine: false },
      { num: "205", areaId: "sinnoh-oreburgh-floaroma-eterna", path: "M 230 375 L 230 265 L 335 265", lx: 280, ly: 265, marine: false },
      { num: "206", areaId: "sinnoh-eterna-wayward-coronet", path: "M 335 265 L 335 435 L 355 505", lx: 335, ly: 350, marine: false },
      { num: "207", areaId: "sinnoh-eterna-wayward-coronet", path: "M 355 505 L 355 435 L 495 435", lx: 400, ly: 435, marine: false },
      { num: "211", areaId: "sinnoh-hearthome-solaceon-celestic", path: "M 335 265 L 505 265", lx: 420, ly: 265, marine: false },
      { num: "216", areaId: "sinnoh-snowpoint-acuity", path: "M 435 265 L 435 165", lx: 435, ly: 215, marine: false },
      { num: "217", areaId: "sinnoh-snowpoint-acuity", path: "M 435 165 L 435 80", lx: 435, ly: 122, marine: false },
      { num: "209", areaId: "sinnoh-hearthome-solaceon-celestic", path: "M 495 435 L 585 435 L 585 365", lx: 545, ly: 435, marine: false },
      { num: "210", areaId: "sinnoh-hearthome-solaceon-celestic", path: "M 585 365 L 585 265 L 505 265", lx: 585, ly: 315, marine: false },
      { num: "215", areaId: "sinnoh-veilstone-pastoria-valor", path: "M 585 365 L 705 365", lx: 645, ly: 365, marine: false },
      { num: "214", areaId: "sinnoh-veilstone-pastoria-valor", path: "M 705 365 L 705 585", lx: 705, ly: 465, marine: false },
      { num: "213", areaId: "sinnoh-veilstone-pastoria-valor", path: "M 705 585 L 595 585", lx: 650, ly: 585, marine: false },
      { num: "212", areaId: "sinnoh-veilstone-pastoria-valor", path: "M 495 435 L 495 585 L 595 585", lx: 495, ly: 515, marine: false },
      { num: "222", areaId: "sinnoh-sunyshore-league-battlezone", path: "M 705 585 L 820 585", lx: 762, ly: 585, marine: false },
      { num: "223", areaId: "sinnoh-sunyshore-league-battlezone", path: "M 820 585 L 820 265", lx: 820, ly: 420, marine: true },
      { num: "225", areaId: "sinnoh-sunyshore-league-battlezone", path: "M 665 185 L 665 105 L 745 105", lx: 665, ly: 145, marine: false },
      { num: "227", areaId: "sinnoh-sunyshore-league-battlezone", path: "M 745 105 L 745 65", lx: 745, ly: 84, marine: false }
    ],
    cities: [
      { name: "Twinleaf Town", areaId: "sinnoh-twinleaf-jubilife", x: 160, y: 660, lx: 160, ly: 698, anchor: "middle" },
      { name: "Sandgem Town", areaId: "sinnoh-twinleaf-jubilife", x: 230, y: 595, lx: 268, ly: 600, anchor: "start" },
      { name: "Jubilife City", areaId: "sinnoh-twinleaf-jubilife", x: 230, y: 505, lx: 195, ly: 482, anchor: "end" },
      { name: "Canalave City", areaId: "sinnoh-canalave-iron-island", x: 105, y: 505, lx: 105, ly: 545, anchor: "middle" },
      { name: "Oreburgh City", areaId: "sinnoh-oreburgh-floaroma-eterna", x: 355, y: 505, lx: 355, ly: 545, anchor: "middle" },
      { name: "Floaroma Town", areaId: "sinnoh-oreburgh-floaroma-eterna", x: 230, y: 375, lx: 192, ly: 380, anchor: "end" },
      { name: "Eterna City", areaId: "sinnoh-eterna-wayward-coronet", x: 335, y: 265, lx: 335, ly: 230, anchor: "middle" },
      { name: "Hearthome City", areaId: "sinnoh-hearthome-solaceon-celestic", x: 495, y: 435, lx: 495, ly: 400, anchor: "middle" },
      { name: "Solaceon Town", areaId: "sinnoh-hearthome-solaceon-celestic", x: 585, y: 365, lx: 548, ly: 368, anchor: "end" },
      { name: "Celestic Town", areaId: "sinnoh-hearthome-solaceon-celestic", x: 505, y: 265, lx: 505, ly: 230, anchor: "middle" },
      { name: "Snowpoint City", areaId: "sinnoh-snowpoint-acuity", x: 435, y: 80, lx: 435, ly: 46, anchor: "middle" },
      { name: "Veilstone City", areaId: "sinnoh-veilstone-pastoria-valor", x: 705, y: 365, lx: 742, ly: 370, anchor: "start" },
      { name: "Pastoria City", areaId: "sinnoh-veilstone-pastoria-valor", x: 595, y: 585, lx: 595, ly: 625, anchor: "middle" },
      { name: "Sunyshore City", areaId: "sinnoh-sunyshore-league-battlezone", x: 820, y: 585, lx: 820, ly: 625, anchor: "middle" },
      { name: "Pokémon League", areaId: "sinnoh-sunyshore-league-battlezone", x: 820, y: 200, lx: 820, ly: 165, anchor: "middle" },
      { name: "Fight Area", areaId: "sinnoh-sunyshore-league-battlezone", x: 665, y: 185, lx: 665, ly: 222, anchor: "middle" }
    ],
    sites: [
      { name: "Lake Verity", areaId: "sinnoh-twinleaf-jubilife", x: 110, y: 595, lx: 110, ly: 628, anchor: "middle" },
      { name: "Iron Island", areaId: "sinnoh-canalave-iron-island", x: 105, y: 345, lx: 105, ly: 315, anchor: "middle" },
      { name: "Valley Windworks", areaId: "sinnoh-oreburgh-floaroma-eterna", x: 278, y: 375, lx: 278, ly: 405, anchor: "middle" },
      { name: "Eterna Forest", areaId: "sinnoh-oreburgh-floaroma-eterna", x: 230, y: 295, lx: 198, ly: 298, anchor: "end" },
      { name: "Wayward Cave", areaId: "sinnoh-eterna-wayward-coronet", x: 335, y: 318, lx: 364, ly: 322, anchor: "start" },
      { name: "Mt. Coronet / Spear Pillar", areaId: "sinnoh-eterna-wayward-coronet", x: 435, y: 355, lx: 435, ly: 325, anchor: "middle" },
      { name: "Lake Acuity", areaId: "sinnoh-snowpoint-acuity", x: 375, y: 95, lx: 345, ly: 98, anchor: "end" },
      { name: "Great Marsh", areaId: "sinnoh-veilstone-pastoria-valor", x: 595, y: 540, lx: 595, ly: 512, anchor: "middle" },
      { name: "Lake Valor", areaId: "sinnoh-veilstone-pastoria-valor", x: 665, y: 515, lx: 665, ly: 488, anchor: "middle" },
      { name: "Victory Road", areaId: "sinnoh-sunyshore-league-battlezone", x: 820, y: 265, lx: 788, ly: 268, anchor: "end" },
      { name: "Stark Mountain", areaId: "sinnoh-sunyshore-league-battlezone", x: 745, y: 65, lx: 745, ly: 38, anchor: "middle" }
    ]
  },

  Unova: {
    terrainSvg: ``,
    routes: [
      { num: "1", areaId: "unova-southeast-nuvema-nacrene", path: "M 745 645 L 745 535", lx: 745, ly: 590, marine: false },
      { num: "2", areaId: "unova-southeast-nuvema-nacrene", path: "M 745 535 L 745 415", lx: 745, ly: 475, marine: false },
      { num: "3", areaId: "unova-southeast-nuvema-nacrene", path: "M 745 415 L 595 415", lx: 670, ly: 415, marine: false },
      { num: "Sky", areaId: "unova-castelia-desert-nimbasa", path: "M 595 415 L 535 465 L 445 545", lx: 505, ly: 495, marine: false },
      { num: "19", areaId: "unova-southwest-aspertia-virbank", path: "M 135 645 L 135 555 L 205 555", lx: 135, ly: 600, marine: false },
      { num: "20", areaId: "unova-southwest-aspertia-virbank", path: "M 205 555 L 295 555", lx: 250, ly: 555, marine: false },
      { num: "Boat", areaId: "unova-southwest-aspertia-virbank", path: "M 295 555 L 445 545", lx: 370, ly: 550, marine: true },
      { num: "4", areaId: "unova-castelia-desert-nimbasa", path: "M 445 545 L 445 355", lx: 445, ly: 455, marine: false },
      { num: "5", areaId: "unova-driftveil-chargestone-mistralton", path: "M 445 355 L 255 355", lx: 350, ly: 355, marine: false },
      { num: "6", areaId: "unova-driftveil-chargestone-mistralton", path: "M 255 355 L 175 280 L 175 195", lx: 175, ly: 280, marine: false },
      { num: "7", areaId: "unova-driftveil-chargestone-mistralton", path: "M 175 195 L 255 155 L 335 155", lx: 245, ly: 155, marine: false },
      { num: "8", areaId: "unova-icirrus-opelucid-victory", path: "M 335 155 L 435 155", lx: 385, ly: 155, marine: false },
      { num: "9", areaId: "unova-icirrus-opelucid-victory", path: "M 435 155 L 535 155", lx: 485, ly: 155, marine: false },
      { num: "10", areaId: "unova-icirrus-opelucid-victory", path: "M 535 155 L 535 75 L 465 75", lx: 535, ly: 112, marine: false },
      { num: "11", areaId: "unova-east-undella-humilau-chasm", path: "M 535 155 L 655 155", lx: 595, ly: 155, marine: false },
      { num: "12", areaId: "unova-east-undella-humilau-chasm", path: "M 655 155 L 755 155", lx: 705, ly: 155, marine: false },
      { num: "13", areaId: "unova-east-undella-humilau-chasm", path: "M 755 155 L 815 215 L 815 275", lx: 815, ly: 215, marine: false },
      { num: "21", areaId: "unova-east-undella-humilau-chasm", path: "M 815 275 L 855 135", lx: 838, ly: 205, marine: true },
      { num: "14", areaId: "unova-east-undella-humilau-chasm", path: "M 815 275 L 715 355", lx: 765, ly: 315, marine: false },
      { num: "15", areaId: "unova-castelia-desert-nimbasa", path: "M 715 355 L 445 355", lx: 580, ly: 355, marine: false }
    ],
    cities: [
      { name: "Nuvema Town", areaId: "unova-southeast-nuvema-nacrene", x: 745, y: 645, lx: 745, ly: 682, anchor: "middle" },
      { name: "Accumula Town", areaId: "unova-southeast-nuvema-nacrene", x: 745, y: 535, lx: 785, ly: 540, anchor: "start" },
      { name: "Striaton City", areaId: "unova-southeast-nuvema-nacrene", x: 745, y: 415, lx: 785, ly: 420, anchor: "start" },
      { name: "Nacrene City", areaId: "unova-southeast-nuvema-nacrene", x: 595, y: 415, lx: 595, ly: 452, anchor: "middle" },
      { name: "Aspertia City", areaId: "unova-southwest-aspertia-virbank", x: 135, y: 645, lx: 135, ly: 682, anchor: "middle" },
      { name: "Floccesy Town", areaId: "unova-southwest-aspertia-virbank", x: 205, y: 555, lx: 205, ly: 592, anchor: "middle" },
      { name: "Virbank City", areaId: "unova-southwest-aspertia-virbank", x: 295, y: 555, lx: 295, ly: 520, anchor: "middle" },
      { name: "Castelia City", areaId: "unova-castelia-desert-nimbasa", x: 445, y: 545, lx: 445, ly: 585, anchor: "middle" },
      { name: "Nimbasa City", areaId: "unova-castelia-desert-nimbasa", x: 445, y: 355, lx: 445, ly: 320, anchor: "middle" },
      { name: "Driftveil City", areaId: "unova-driftveil-chargestone-mistralton", x: 255, y: 355, lx: 255, ly: 392, anchor: "middle" },
      { name: "Mistralton City", areaId: "unova-driftveil-chargestone-mistralton", x: 175, y: 195, lx: 135, ly: 200, anchor: "end" },
      { name: "Icirrus City", areaId: "unova-icirrus-opelucid-victory", x: 335, y: 155, lx: 335, ly: 192, anchor: "middle" },
      { name: "Opelucid City", areaId: "unova-icirrus-opelucid-victory", x: 535, y: 155, lx: 535, ly: 192, anchor: "middle" },
      { name: "Pokémon League", areaId: "unova-icirrus-opelucid-victory", x: 465, y: 75, lx: 465, ly: 42, anchor: "middle" },
      { name: "Lacunosa Town", areaId: "unova-east-undella-humilau-chasm", x: 755, y: 155, lx: 755, ly: 192, anchor: "middle" },
      { name: "Undella Town", areaId: "unova-east-undella-humilau-chasm", x: 815, y: 275, lx: 775, ly: 280, anchor: "end" },
      { name: "Humilau City", areaId: "unova-east-undella-humilau-chasm", x: 855, y: 135, lx: 855, ly: 100, anchor: "middle" }
    ],
    sites: [
      { name: "Wellspring Cave", areaId: "unova-southeast-nuvema-nacrene", x: 675, y: 385, lx: 675, ly: 358, anchor: "middle" },
      { name: "Pinwheel Forest", areaId: "unova-southeast-nuvema-nacrene", x: 535, y: 465, lx: 535, ly: 495, anchor: "middle" },
      { name: "Floccesy Ranch", areaId: "unova-southwest-aspertia-virbank", x: 205, y: 505, lx: 205, ly: 478, anchor: "middle" },
      { name: "Virbank Complex", areaId: "unova-southwest-aspertia-virbank", x: 295, y: 605, lx: 295, ly: 635, anchor: "middle" },
      { name: "Relic Castle / Desert", areaId: "unova-castelia-desert-nimbasa", x: 390, y: 445, lx: 358, ly: 450, anchor: "end" },
      { name: "Chargestone Cave", areaId: "unova-driftveil-chargestone-mistralton", x: 175, y: 245, lx: 142, ly: 248, anchor: "end" },
      { name: "Celestial Tower", areaId: "unova-driftveil-chargestone-mistralton", x: 215, y: 135, lx: 215, ly: 105, anchor: "middle" },
      { name: "Twist Mountain", areaId: "unova-icirrus-opelucid-victory", x: 285, y: 155, lx: 285, ly: 126, anchor: "middle" },
      { name: "Victory Road", areaId: "unova-icirrus-opelucid-victory", x: 535, y: 75, lx: 565, ly: 78, anchor: "start" },
      { name: "Giant Chasm", areaId: "unova-east-undella-humilau-chasm", x: 755, y: 100, lx: 755, ly: 72, anchor: "middle" },
      { name: "Reversal Mountain", areaId: "unova-east-undella-humilau-chasm", x: 855, y: 275, lx: 855, ly: 308, anchor: "middle" }
    ]
  },

  Kalos: {
    terrainSvg: ``,
    routes: [
      { num: "1", areaId: "kalos-vaniville-santalune", path: "M 455 660 L 455 595", lx: 455, ly: 628, marine: false },
      { num: "2", areaId: "kalos-vaniville-santalune", path: "M 455 595 L 455 480", lx: 455, ly: 540, marine: false },
      { num: "3", areaId: "kalos-vaniville-santalune", path: "M 455 480 L 455 345", lx: 455, ly: 415, marine: false },
      { num: "22", areaId: "kalos-vaniville-santalune", path: "M 455 480 L 585 480", lx: 520, ly: 480, marine: false },
      { num: "5", areaId: "kalos-lumiose-central", path: "M 455 345 L 305 425", lx: 380, ly: 385, marine: false },
      { num: "6", areaId: "kalos-lumiose-central", path: "M 305 425 L 305 345", lx: 305, ly: 385, marine: false },
      { num: "7", areaId: "kalos-lumiose-central", path: "M 305 425 L 155 425", lx: 230, ly: 425, marine: false },
      { num: "8", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 155 425 L 155 535", lx: 155, ly: 480, marine: false },
      { num: "9", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 155 535 L 255 535", lx: 205, ly: 535, marine: false },
      { num: "10", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 155 355 L 155 235", lx: 155, ly: 295, marine: false },
      { num: "11", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 155 235 L 265 175", lx: 210, ly: 205, marine: false },
      { num: "12", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 265 175 L 375 195", lx: 320, ly: 185, marine: true },
      { num: "13", areaId: "kalos-coastal-ambrette-shalour-coumarine", path: "M 375 195 L 455 345", lx: 415, ly: 270, marine: false },
      { num: "14", areaId: "kalos-mountain-laverre-anistar-league", path: "M 455 345 L 455 155", lx: 455, ly: 250, marine: false },
      { num: "15", areaId: "kalos-mountain-laverre-anistar-league", path: "M 455 155 L 615 195", lx: 535, ly: 175, marine: false },
      { num: "17", areaId: "kalos-mountain-laverre-anistar-league", path: "M 615 195 L 755 235", lx: 685, ly: 215, marine: false },
      { num: "18", areaId: "kalos-mountain-laverre-anistar-league", path: "M 755 235 L 755 395", lx: 755, ly: 315, marine: false },
      { num: "19", areaId: "kalos-mountain-laverre-anistar-league", path: "M 755 395 L 655 535", lx: 705, ly: 465, marine: false },
      { num: "21", areaId: "kalos-mountain-laverre-anistar-league", path: "M 655 535 L 615 445", lx: 635, ly: 490, marine: false }
    ],
    cities: [
      { name: "Vaniville Town", areaId: "kalos-vaniville-santalune", x: 455, y: 660, lx: 455, ly: 698, anchor: "middle" },
      { name: "Santalune City", areaId: "kalos-vaniville-santalune", x: 455, y: 480, lx: 415, ly: 485, anchor: "end" },
      { name: "Lumiose City", areaId: "kalos-lumiose-central", x: 455, y: 345, lx: 495, ly: 350, anchor: "start" },
      { name: "Camphrier Town", areaId: "kalos-lumiose-central", x: 305, y: 425, lx: 305, ly: 462, anchor: "middle" },
      { name: "Ambrette Town", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 155, y: 535, lx: 155, ly: 572, anchor: "middle" },
      { name: "Cyllage City", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 155, y: 355, lx: 115, ly: 360, anchor: "end" },
      { name: "Geosenge Town", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 155, y: 235, lx: 115, ly: 240, anchor: "end" },
      { name: "Shalour City", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 265, y: 175, lx: 265, ly: 138, anchor: "middle" },
      { name: "Coumarine City", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 375, y: 195, lx: 375, ly: 158, anchor: "middle" },
      { name: "Laverre City", areaId: "kalos-mountain-laverre-anistar-league", x: 455, y: 155, lx: 455, ly: 118, anchor: "middle" },
      { name: "Dendemille Town", areaId: "kalos-mountain-laverre-anistar-league", x: 615, y: 195, lx: 615, ly: 232, anchor: "middle" },
      { name: "Anistar City", areaId: "kalos-mountain-laverre-anistar-league", x: 755, y: 235, lx: 795, ly: 240, anchor: "start" },
      { name: "Couriway Town", areaId: "kalos-mountain-laverre-anistar-league", x: 755, y: 395, lx: 795, ly: 400, anchor: "start" },
      { name: "Snowbelle City", areaId: "kalos-mountain-laverre-anistar-league", x: 655, y: 535, lx: 655, ly: 572, anchor: "middle" },
      { name: "Pokémon League", areaId: "kalos-mountain-laverre-anistar-league", x: 615, y: 415, lx: 615, ly: 380, anchor: "middle" },
      { name: "Kiloude City", areaId: "kalos-mountain-laverre-anistar-league", x: 755, y: 635, lx: 755, ly: 672, anchor: "middle" }
    ],
    sites: [
      { name: "Santalune Forest", areaId: "kalos-vaniville-santalune", x: 455, y: 550, lx: 418, ly: 554, anchor: "end" },
      { name: "Parfum Palace", areaId: "kalos-lumiose-central", x: 305, y: 345, lx: 305, ly: 318, anchor: "middle" },
      { name: "Glittering Cave", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 255, y: 535, lx: 255, ly: 568, anchor: "middle" },
      { name: "Reflection Cave", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 210, y: 205, lx: 180, ly: 190, anchor: "end" },
      { name: "Tower of Mastery", areaId: "kalos-coastal-ambrette-shalour-coumarine", x: 265, y: 120, lx: 265, ly: 92, anchor: "middle" },
      { name: "Frost Cavern", areaId: "kalos-mountain-laverre-anistar-league", x: 615, y: 125, lx: 615, ly: 98, anchor: "middle" },
      { name: "Terminus Cave", areaId: "kalos-mountain-laverre-anistar-league", x: 805, y: 315, lx: 805, ly: 288, anchor: "middle" },
      { name: "Pokémon Village", areaId: "kalos-mountain-laverre-anistar-league", x: 605, y: 595, lx: 605, ly: 625, anchor: "middle" },
      { name: "Victory Road", areaId: "kalos-mountain-laverre-anistar-league", x: 585, y: 480, lx: 585, ly: 510, anchor: "middle" }
    ]
  },

  Alola: {
    terrainSvg: ``,
    routes: [
      // Melemele Island
      { num: "1", areaId: "alola-melemele", path: "M 185 165 L 185 265 L 135 265", lx: 185, ly: 215, marine: false },
      { num: "2", areaId: "alola-melemele", path: "M 135 265 L 255 215", lx: 195, ly: 245, marine: false },
      { num: "3", areaId: "alola-melemele", path: "M 255 215 L 255 155 L 185 165", lx: 255, ly: 185, marine: false },
      // Marine Ferry Links via Aether Paradise (Center)
      { num: "Sea", areaId: "alola-melemele", path: "M 255 265 L 425 365", lx: 335, ly: 315, marine: true },
      { num: "Sea", areaId: "alola-akala", path: "M 425 365 L 545 275", lx: 485, ly: 320, marine: true },
      { num: "Sea", areaId: "alola-ulaula", path: "M 425 365 L 625 465", lx: 525, ly: 415, marine: true },
      { num: "Sea", areaId: "alola-poni-aether", path: "M 425 365 L 245 505", lx: 335, ly: 435, marine: true },
      // Akala Island
      { num: "4", areaId: "alola-akala", path: "M 545 275 L 615 225", lx: 580, ly: 250, marine: false },
      { num: "5", areaId: "alola-akala", path: "M 615 225 L 615 145 L 545 145", lx: 615, ly: 185, marine: false },
      { num: "7", areaId: "alola-akala", path: "M 615 225 L 705 195 L 705 135", lx: 665, ly: 210, marine: false },
      { num: "9", areaId: "alola-akala", path: "M 545 275 L 545 345", lx: 545, ly: 310, marine: false },
      // Ula'ula Island
      { num: "10", areaId: "alola-ulaula", path: "M 695 455 L 605 455", lx: 650, ly: 455, marine: false },
      { num: "12", areaId: "alola-ulaula", path: "M 695 455 L 755 535 L 665 605", lx: 735, ly: 515, marine: false },
      { num: "15", areaId: "alola-ulaula", path: "M 665 605 L 565 555 L 565 415", lx: 565, ly: 495, marine: false },
      // Poni Island
      { num: "Poni", areaId: "alola-poni-aether", path: "M 185 575 L 185 505 L 265 505 L 265 425", lx: 225, ly: 505, marine: false }
    ],
    cities: [
      { name: "Iki Town", areaId: "alola-melemele", x: 185, y: 165, lx: 185, ly: 130, anchor: "middle" },
      { name: "Hau'oli City", areaId: "alola-melemele", x: 135, y: 265, lx: 135, ly: 305, anchor: "middle" },
      { name: "Aether Paradise", areaId: "alola-poni-aether", x: 425, y: 365, lx: 425, ly: 330, anchor: "middle" },
      { name: "Heahea City", areaId: "alola-akala", x: 545, y: 275, lx: 508, ly: 278, anchor: "end" },
      { name: "Paniola Town", areaId: "alola-akala", x: 615, y: 225, lx: 652, ly: 230, anchor: "start" },
      { name: "Konikoni City", areaId: "alola-akala", x: 545, y: 345, lx: 545, ly: 382, anchor: "middle" },
      { name: "Malie City", areaId: "alola-ulaula", x: 695, y: 455, lx: 732, ly: 458, anchor: "start" },
      { name: "Tapu Village", areaId: "alola-ulaula", x: 665, y: 605, lx: 665, ly: 642, anchor: "middle" },
      { name: "Po Town", areaId: "alola-ulaula", x: 565, y: 415, lx: 565, ly: 380, anchor: "middle" },
      { name: "Pokémon League", areaId: "alola-ulaula", x: 625, y: 515, lx: 625, ly: 482, anchor: "middle" },
      { name: "Seafolk Village", areaId: "alola-poni-aether", x: 185, y: 575, lx: 185, ly: 615, anchor: "middle" },
      { name: "Battle Tree", areaId: "alola-poni-aether", x: 265, y: 405, lx: 265, ly: 372, anchor: "middle" }
    ],
    sites: [
      { name: "Verdant Cavern", areaId: "alola-melemele", x: 255, y: 155, lx: 285, ly: 158, anchor: "start" },
      { name: "Ten Carat Hill", areaId: "alola-melemele", x: 225, y: 285, lx: 225, ly: 315, anchor: "middle" },
      { name: "Brooklet Hill", areaId: "alola-akala", x: 545, y: 145, lx: 545, ly: 118, anchor: "middle" },
      { name: "Wela Volcano", areaId: "alola-akala", x: 705, y: 195, lx: 735, ly: 198, anchor: "start" },
      { name: "Lush Jungle", areaId: "alola-akala", x: 705, y: 135, lx: 705, ly: 108, anchor: "middle" },
      { name: "Mt. Hokulani", areaId: "alola-ulaula", x: 605, y: 455, lx: 605, ly: 428, anchor: "middle" },
      { name: "Thrifty Megamart", areaId: "alola-ulaula", x: 725, y: 615, lx: 755, ly: 618, anchor: "start" },
      { name: "Mt. Lanakila", areaId: "alola-ulaula", x: 625, y: 555, lx: 625, ly: 582, anchor: "middle" },
      { name: "Vast Poni Canyon", areaId: "alola-poni-aether", x: 265, y: 465, lx: 295, ly: 468, anchor: "start" },
      { name: "Altar of Sunne/Moone", areaId: "alola-poni-aether", x: 315, y: 425, lx: 345, ly: 428, anchor: "start" }
    ]
  },

  Galar: {
    terrainSvg: ``,
    routes: [
      { num: "1", areaId: "galar-postwick-motostoke", path: "M 455 665 L 455 595", lx: 455, ly: 630, marine: false },
      { num: "2", areaId: "galar-postwick-motostoke", path: "M 455 595 L 535 595", lx: 495, ly: 595, marine: false },
      { num: "Wild S", areaId: "galar-wild-area-south-mines", path: "M 455 595 L 455 465", lx: 455, ly: 530, marine: false },
      { num: "3", areaId: "galar-wild-area-south-mines", path: "M 455 465 L 305 465", lx: 380, ly: 465, marine: false },
      { num: "4", areaId: "galar-wild-area-south-mines", path: "M 305 465 L 305 365", lx: 305, ly: 415, marine: false },
      { num: "5", areaId: "galar-wild-area-south-mines", path: "M 305 365 L 555 365", lx: 430, ly: 365, marine: false },
      { num: "Mine 2", areaId: "galar-wild-area-south-mines", path: "M 555 365 L 555 465 L 455 465", lx: 555, ly: 415, marine: false },
      { num: "Wild N", areaId: "galar-hammerlocke-wild-north", path: "M 455 465 L 455 265", lx: 455, ly: 315, marine: false },
      { num: "6", areaId: "galar-hammerlocke-wild-north", path: "M 455 265 L 265 265", lx: 360, ly: 265, marine: false },
      { num: "Tangle", areaId: "galar-hammerlocke-wild-north", path: "M 265 265 L 215 165", lx: 240, ly: 215, marine: false },
      { num: "7", areaId: "galar-circhester-spikemuth-wyndon-dlc", path: "M 455 265 L 575 265", lx: 515, ly: 265, marine: false },
      { num: "8", areaId: "galar-circhester-spikemuth-wyndon-dlc", path: "M 575 265 L 645 165", lx: 610, ly: 215, marine: false },
      { num: "9", areaId: "galar-circhester-spikemuth-wyndon-dlc", path: "M 645 165 L 725 245 L 725 325", lx: 725, ly: 245, marine: true },
      { num: "10", areaId: "galar-circhester-spikemuth-wyndon-dlc", path: "M 455 265 L 455 95", lx: 455, ly: 180, marine: false }
    ],
    cities: [
      { name: "Postwick", areaId: "galar-postwick-motostoke", x: 455, y: 665, lx: 455, ly: 702, anchor: "middle" },
      { name: "Wedgehurst", areaId: "galar-postwick-motostoke", x: 455, y: 595, lx: 415, ly: 600, anchor: "end" },
      { name: "Motostoke", areaId: "galar-postwick-motostoke", x: 455, y: 465, lx: 495, ly: 445, anchor: "start" },
      { name: "Turffield", areaId: "galar-wild-area-south-mines", x: 305, y: 365, lx: 265, ly: 370, anchor: "end" },
      { name: "Hulbury", areaId: "galar-wild-area-south-mines", x: 555, y: 365, lx: 595, ly: 370, anchor: "start" },
      { name: "Hammerlocke", areaId: "galar-hammerlocke-wild-north", x: 455, y: 265, lx: 495, ly: 242, anchor: "start" },
      { name: "Stow-on-Side", areaId: "galar-hammerlocke-wild-north", x: 265, y: 265, lx: 265, ly: 302, anchor: "middle" },
      { name: "Ballonlea", areaId: "galar-hammerlocke-wild-north", x: 215, y: 165, lx: 215, ly: 128, anchor: "middle" },
      { name: "Circhester", areaId: "galar-circhester-spikemuth-wyndon-dlc", x: 645, y: 165, lx: 645, ly: 128, anchor: "middle" },
      { name: "Spikemuth", areaId: "galar-circhester-spikemuth-wyndon-dlc", x: 725, y: 325, lx: 725, ly: 362, anchor: "middle" },
      { name: "Wyndon", areaId: "galar-circhester-spikemuth-wyndon-dlc", x: 455, y: 95, lx: 455, ly: 58, anchor: "middle" }
    ],
    sites: [
      { name: "Slumbering Weald", areaId: "galar-postwick-motostoke", x: 385, y: 665, lx: 355, ly: 668, anchor: "end" },
      { name: "Wild Area (Sul)", areaId: "galar-wild-area-south-mines", x: 455, y: 530, lx: 425, ly: 534, anchor: "end" },
      { name: "Galar Mine No. 1", areaId: "galar-wild-area-south-mines", x: 305, y: 465, lx: 305, ly: 498, anchor: "middle" },
      { name: "Galar Mine No. 2", areaId: "galar-wild-area-south-mines", x: 555, y: 435, lx: 585, ly: 438, anchor: "start" },
      { name: "Lake of Outrage", areaId: "galar-hammerlocke-wild-north", x: 415, y: 315, lx: 385, ly: 318, anchor: "end" },
      { name: "Glimwood Tangle", areaId: "galar-hammerlocke-wild-north", x: 240, y: 215, lx: 210, ly: 218, anchor: "end" },
      { name: "Isle of Armor", areaId: "galar-circhester-spikemuth-wyndon-dlc", x: 765, y: 505, lx: 765, ly: 538, anchor: "middle" },
      { name: "Crown Tundra", areaId: "galar-circhester-spikemuth-wyndon-dlc", x: 225, y: 625, lx: 225, ly: 658, anchor: "middle" }
    ]
  },

  // ==========================================================================
  // GEOMETRIA EXATA DE BORRIUS (POKÉMON UNBOUND — BASEADO NA IMAGEM ENVIADA)
  // ==========================================================================
  Borrius: {
    terrainSvg: ``,
    routes: [
      { num: "1", areaId: "borrius-frozen-heights-bellin", path: "M 430 95 L 430 195", lx: 430, ly: 145, marine: false },
      { num: "2", areaId: "borrius-dresco-route2-flower", path: "M 430 195 L 430 275 L 355 275", lx: 398, ly: 275, marine: false },
      { num: "3", areaId: "borrius-dresco-route2-flower", path: "M 355 275 L 355 185", lx: 355, ly: 185, marine: false },
      { num: "4", areaId: "borrius-grim-volcano-crater", path: "M 355 275 L 245 275", lx: 272, ly: 275, marine: false },
      { num: "5", areaId: "borrius-grim-volcano-crater", path: "M 245 275 L 245 315 L 175 315 L 175 395", lx: 175, ly: 315, marine: false },
      { num: "6", areaId: "borrius-blizzard-route8-frost", path: "M 175 395 L 130 395 L 130 475", lx: 130, ly: 435, marine: false },
      { num: "7", areaId: "borrius-blizzard-route8-frost", path: "M 65 475 L 130 475", lx: 95, ly: 475, marine: false },
      { num: "8", areaId: "borrius-blizzard-route8-frost", path: "M 65 225 L 65 475", lx: 65, ly: 295, marine: false },
      { num: "9", areaId: "borrius-blizzard-route8-frost", path: "M 65 475 L 65 635 L 130 635", lx: 65, ly: 575, marine: false },
      { num: "Waterway", areaId: "borrius-tehl-fallshore-epidimy", path: "M 115 475 L 115 555 L 195 555 L 195 635", lx: 162, ly: 555, marine: true },
      { num: "10", areaId: "borrius-tehl-fallshore-epidimy", path: "M 130 635 L 285 635", lx: 185, ly: 635, marine: false },
      { num: "11", areaId: "borrius-tehl-fallshore-epidimy", path: "M 285 635 L 405 635", lx: 345, ly: 635, marine: false },
      { num: "12", areaId: "borrius-tarmigan-dehara-routes12-14", path: "M 355 275 L 355 635", lx: 355, ly: 465, marine: false },
      { num: "13", areaId: "borrius-tarmigan-dehara-routes12-14", path: "M 285 275 L 285 475 M 285 365 L 355 365", lx: 285, ly: 365, marine: true },
      { num: "14", areaId: "borrius-tarmigan-dehara-routes12-14", path: "M 130 475 L 355 475", lx: 242, ly: 475, marine: true },
      { num: "15", areaId: "borrius-desert-vivill-gurun", path: "M 430 275 L 510 275", lx: 472, ly: 275, marine: true },
      { num: "Desert", areaId: "borrius-desert-vivill-gurun", path: "M 355 365 L 510 365", lx: 448, ly: 365, marine: false },
      { num: "16", areaId: "borrius-antisis-seaport-league", path: "M 510 475 L 510 635", lx: 510, ly: 552, marine: true },
      { num: "17", areaId: "borrius-antisis-seaport-league", path: "M 510 365 L 510 475 L 620 475", lx: 565, ly: 475, marine: false },
      { num: "18", areaId: "borrius-antisis-seaport-league", path: "M 510 365 L 620 365 L 620 275", lx: 572, ly: 365, marine: true },
      { num: "Bog", areaId: "borrius-east-polder-redwood-cube", path: "M 735 195 L 735 365 M 735 275 L 780 275", lx: 735, ly: 275, marine: false },
      { num: "Fields", areaId: "borrius-east-polder-redwood-cube", path: "M 735 195 L 840 195", lx: 788, ly: 195, marine: true },
      { num: "Forest", areaId: "borrius-east-polder-redwood-cube", path: "M 840 195 L 840 345", lx: 840, ly: 270, marine: false }
    ],
    cities: [
      { name: "Frozen Heights", areaId: "borrius-frozen-heights-bellin", x: 430, y: 95, lx: 430, ly: 60, anchor: "middle" },
      { name: "Bellin Town", areaId: "borrius-frozen-heights-bellin", x: 430, y: 195, lx: 430, ly: 162, anchor: "middle" },
      { name: "Dresco Town", areaId: "borrius-dresco-route2-flower", x: 355, y: 275, lx: 355, ly: 242, anchor: "middle" },
      { name: "Blizzard City", areaId: "borrius-blizzard-route8-frost", x: 65, y: 225, lx: 65, ly: 190, anchor: "middle" },
      { name: "Crater Town", areaId: "borrius-grim-volcano-crater", x: 175, y: 395, lx: 175, ly: 362, anchor: "middle" },
      { name: "Tehl Town", areaId: "borrius-tehl-fallshore-epidimy", x: 130, y: 635, lx: 130, ly: 600, anchor: "middle" },
      { name: "Fallshore City", areaId: "borrius-tehl-fallshore-epidimy", x: 285, y: 635, lx: 285, ly: 600, anchor: "middle" },
      { name: "Epidimy Town", areaId: "borrius-tehl-fallshore-epidimy", x: 405, y: 635, lx: 405, ly: 598, anchor: "middle" },
      { name: "Tarmigan Town", areaId: "borrius-tarmigan-dehara-routes12-14", x: 355, y: 540, lx: 355, ly: 506, anchor: "middle" },
      { name: "Dehara City", areaId: "borrius-tarmigan-dehara-routes12-14", x: 355, y: 365, lx: 355, ly: 332, anchor: "middle" },
      { name: "Vivill Town", areaId: "borrius-desert-vivill-gurun", x: 510, y: 275, lx: 510, ly: 242, anchor: "middle" },
      { name: "Gurun Town", areaId: "borrius-desert-vivill-gurun", x: 510, y: 365, lx: 510, ly: 332, anchor: "middle" },
      { name: "Pokémon League", areaId: "borrius-antisis-seaport-league", x: 620, y: 275, lx: 620, ly: 242, anchor: "middle" },
      { name: "Seaport City", areaId: "borrius-antisis-seaport-league", x: 620, y: 475, lx: 620, ly: 440, anchor: "middle" },
      { name: "Antisis City", areaId: "borrius-antisis-seaport-league", x: 510, y: 635, lx: 510, ly: 600, anchor: "middle" },
      { name: "Magnolia Town", areaId: "borrius-east-polder-redwood-cube", x: 735, y: 195, lx: 735, ly: 158, anchor: "middle" },
      { name: "Polder Town", areaId: "borrius-east-polder-redwood-cube", x: 735, y: 365, lx: 735, ly: 405, anchor: "middle" },
      { name: "Redwood Village", areaId: "borrius-east-polder-redwood-cube", x: 840, y: 195, lx: 840, ly: 158, anchor: "middle" },
      { name: "Cube Corp.", areaId: "borrius-east-polder-redwood-cube", x: 840, y: 345, lx: 840, ly: 385, anchor: "middle" }
    ],
    sites: [
      { name: "Icicle Cave", areaId: "borrius-frozen-heights-bellin", x: 455, y: 145, lx: 482, ly: 148, anchor: "start" },
      { name: "Icy Hole", areaId: "borrius-frozen-heights-bellin", x: 448, y: 215, lx: 475, ly: 218, anchor: "start" },
      { name: "Flower Paradise", areaId: "borrius-dresco-route2-flower", x: 368, y: 210, lx: 395, ly: 214, anchor: "start" },
      { name: "Grim Woods", areaId: "borrius-grim-volcano-crater", x: 315, y: 275, lx: 315, ly: 248, anchor: "middle" },
      { name: "Cinder Volcano", areaId: "borrius-grim-volcano-crater", x: 245, y: 235, lx: 245, ly: 208, anchor: "middle" },
      { name: "Pokémon Daycare", areaId: "borrius-grim-volcano-crater", x: 198, y: 332, lx: 225, ly: 335, anchor: "start" },
      { name: "Frozen Forest", areaId: "borrius-blizzard-route8-frost", x: 82, y: 248, lx: 108, ly: 252, anchor: "start" },
      { name: "Frozen Mtn.", areaId: "borrius-blizzard-route8-frost", x: 65, y: 365, lx: 92, ly: 368, anchor: "start" },
      { name: "Valley Cave", areaId: "borrius-blizzard-route8-frost", x: 142, y: 395, lx: 112, ly: 392, anchor: "end" },
      { name: "Underground Pass", areaId: "borrius-blizzard-route8-frost", x: 65, y: 525, lx: 92, ly: 528, anchor: "start" },
      { name: "Ruins of Void", areaId: "borrius-tarmigan-dehara-routes12-14", x: 215, y: 432, lx: 215, ly: 405, anchor: "middle" },
      { name: "Cave of Being", areaId: "borrius-tehl-fallshore-epidimy", x: 225, y: 635, lx: 225, ly: 668, anchor: "middle" },
      { name: "Tarmigan Mansion", areaId: "borrius-tarmigan-dehara-routes12-14", x: 375, y: 558, lx: 402, ly: 562, anchor: "start" },
      { name: "Thundercap Mtn.", areaId: "borrius-tehl-fallshore-epidimy", x: 425, y: 652, lx: 425, ly: 682, anchor: "middle" },
      { name: "Tomb of Borrius", areaId: "borrius-desert-vivill-gurun", x: 405, y: 382, lx: 405, ly: 412, anchor: "middle" },
      { name: "Vivill Woods", areaId: "borrius-desert-vivill-gurun", x: 510, y: 318, lx: 538, ly: 322, anchor: "start" },
      { name: "Antisis Sewers", areaId: "borrius-antisis-seaport-league", x: 532, y: 652, lx: 532, ly: 682, anchor: "middle" },
      { name: "Victory Rd.", areaId: "borrius-antisis-seaport-league", x: 620, y: 322, lx: 648, ly: 325, anchor: "start" },
      { name: "Battle Frontier", areaId: "borrius-antisis-seaport-league", x: 642, y: 492, lx: 642, ly: 522, anchor: "middle" },
      { name: "Fullmoon / Newmoon Island", areaId: "borrius-antisis-seaport-league", x: 685, y: 635, lx: 685, ly: 668, anchor: "middle" },
      { name: "Crystal Peak", areaId: "borrius-east-polder-redwood-cube", x: 780, y: 275, lx: 780, ly: 305, anchor: "middle" },
      { name: "Redwood Forest", areaId: "borrius-east-polder-redwood-cube", x: 840, y: 270, lx: 812, ly: 274, anchor: "end" }
    ]
  },

  // ==========================================================================
  // GEOMETRIA EXATA DE ILIOS (POKÉMON LAZARUS — BASEADO NA IMAGEM ENVIADA)
  // ==========================================================================
  Ilios: {
    terrainSvg: ``,
    routes: [
      // Noroeste: Acrisia City, Acrisia Mountains, Riverwalk Trail & Bronze Fields
      { num: "Mtn", areaId: "ilios-acrisia-bronze", path: "M 180 205 L 150 205 L 150 115 M 180 205 L 85 205", lx: 120, ly: 205, marine: false },
      { num: "River", areaId: "ilios-jusmail-riverwalk-kalami", path: "M 180 205 L 250 205 L 250 265", lx: 225, ly: 205, marine: false },
      { num: "Bronze", areaId: "ilios-acrisia-bronze", path: "M 180 205 L 180 355", lx: 180, ly: 280, marine: false },
      { num: "Woods", areaId: "ilios-wanderers-pythios-kaptara", path: "M 180 355 L 180 465", lx: 180, ly: 410, marine: false },
      // Sudoeste: Kaptara Island & Satyr's Lair
      { num: "Kaptara", areaId: "ilios-wanderers-pythios-kaptara", path: "M 180 465 L 180 565 M 205 595 L 205 695", lx: 205, ly: 645, marine: false },
      // Centro: Erinys Path, Froslass Cavern, Asfal Hills & Sofos City
      { num: "Erinys", areaId: "ilios-erinys-froslass-sofos", path: "M 180 465 L 380 465", lx: 332, ly: 465, marine: false },
      // Península Sul da Liga: Péntepetal City, Davosi Straits & Ruins of Ahiyawa
      { num: "Davosi", areaId: "ilios-pentepetal-ahiyawa-bastion", path: "M 305 465 L 305 695", lx: 305, ly: 640, marine: false },
      // Mar Central: Sea of Asteri & Sea of Vulcai
      { num: "Asteri", areaId: "ilios-asteri-myrrini-fresco", path: "M 380 465 L 545 465", lx: 425, ly: 465, marine: true },
      { num: "Vulcai", areaId: "ilios-asteri-myrrini-fresco", path: "M 440 465 L 440 665 M 405 665 L 475 665", lx: 440, ly: 565, marine: true },
      // Nordeste: Travessia Marítima p/ Port Pello, Corrin Crossing & Areios Town
      { num: "Ferry", areaId: "ilios-palati-pello-areios", path: "M 545 465 L 545 275 L 675 275", lx: 545, ly: 370, marine: true },
      { num: "Corrin", areaId: "ilios-palati-pello-areios", path: "M 675 275 L 740 275 L 740 175 L 845 175", lx: 740, ly: 225, marine: true }
    ],
    cities: [
      { name: "Acrisia Mountains", areaId: "ilios-acrisia-bronze", x: 150, y: 115, lx: 150, ly: 78, anchor: "middle" },
      { name: "Acrisia City", areaId: "ilios-acrisia-bronze", x: 180, y: 205, lx: 142, ly: 182, anchor: "end" },
      { name: "Kalami City", areaId: "ilios-jusmail-riverwalk-kalami", x: 250, y: 265, lx: 288, ly: 270, anchor: "start" },
      { name: "Jusmail Town", areaId: "ilios-jusmail-riverwalk-kalami", x: 180, y: 355, lx: 142, ly: 360, anchor: "end" },
      { name: "Pythios Town", areaId: "ilios-wanderers-pythios-kaptara", x: 180, y: 465, lx: 142, ly: 470, anchor: "end" },
      { name: "Kaptara Island", areaId: "ilios-wanderers-pythios-kaptara", x: 205, y: 695, lx: 168, ly: 700, anchor: "end" },
      { name: "Sofos City", areaId: "ilios-erinys-froslass-sofos", x: 380, y: 465, lx: 380, ly: 430, anchor: "middle" },
      { name: "Péntepetal City", areaId: "ilios-pentepetal-ahiyawa-bastion", x: 305, y: 585, lx: 268, ly: 590, anchor: "end" },
      { name: "Ruins of Ahiyawa", areaId: "ilios-pentepetal-ahiyawa-bastion", x: 305, y: 695, lx: 342, ly: 700, anchor: "start" },
      { name: "Marmaro Island", areaId: "ilios-asteri-myrrini-fresco", x: 475, y: 465, lx: 475, ly: 430, anchor: "middle" },
      { name: "Myrrini Island", areaId: "ilios-asteri-myrrini-fresco", x: 545, y: 465, lx: 582, ly: 470, anchor: "start" },
      { name: "Fresco Isles", areaId: "ilios-asteri-myrrini-fresco", x: 475, y: 585, lx: 512, ly: 590, anchor: "start" },
      { name: "Palati City", areaId: "ilios-palati-pello-areios", x: 440, y: 665, lx: 440, ly: 705, anchor: "middle" },
      { name: "Port Pello", areaId: "ilios-palati-pello-areios", x: 675, y: 275, lx: 675, ly: 315, anchor: "middle" },
      { name: "Areios Town", areaId: "ilios-palati-pello-areios", x: 810, y: 175, lx: 810, ly: 215, anchor: "middle" },
      { name: "Skyborne Bastion", areaId: "ilios-pentepetal-ahiyawa-bastion", x: 835, y: 535, lx: 835, ly: 575, anchor: "middle" }
    ],
    sites: [
      { name: "Acrisia University", areaId: "ilios-acrisia-bronze", x: 85, y: 205, lx: 85, ly: 175, anchor: "middle" },
      { name: "Froslass Cavern", areaId: "ilios-erinys-froslass-sofos", x: 270, y: 465, lx: 270, ly: 435, anchor: "middle" },
      { name: "Satyr's Lair", areaId: "ilios-wanderers-pythios-kaptara", x: 205, y: 595, lx: 175, ly: 598, anchor: "end" },
      { name: "Ilios League Temple", areaId: "ilios-pentepetal-ahiyawa-bastion", x: 305, y: 730, lx: 305, ly: 746, anchor: "middle" },
      { name: "Tower of Dioxippus", areaId: "ilios-palati-pello-areios", x: 482, y: 690, lx: 510, ly: 694, anchor: "start" },
      { name: "Areios Hideout", areaId: "ilios-palati-pello-areios", x: 840, y: 135, lx: 840, ly: 108, anchor: "middle" }
    ]
  }
};

// ============================================================================
// 5. ESTADO GLOBAL & FUNÇÕES UTILITÁRIAS
// ============================================================================
let gpsState = {
  gameId: "gen1-rb",
  subRegion: "Johto", // Usado nos jogos de Johto (gen2-gsc e gen4-hgss) para alternar entre "Johto" e "Kanto"
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
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  if (cfg.hasDualRegions) {
    return gpsState.subRegion === "Kanto" ? JOHTO_KANTO_AREAS : JOHTO_AREAS;
  }
  if (cfg.region === "Johto") return JOHTO_AREAS;
  if (cfg.region === "Hoenn") return HOENN_AREAS;
  if (cfg.region === "Sinnoh") return SINNOH_AREAS;
  if (cfg.region === "Unova") return UNOVA_AREAS;
  if (cfg.region === "Kalos") return KALOS_AREAS;
  if (cfg.region === "Alola") return ALOLA_AREAS;
  if (cfg.region === "Galar") return GALAR_AREAS;
  if (cfg.region === "Borrius") return BORRIUS_AREAS;
  if (cfg.region === "Ilios") return ILIOS_AREAS;
  return KANTO_AREAS;
}

// Retorna todas as áreas do jogo atual (incluindo Johto + Kanto juntas nos jogos de 2ª Geração e Remakes HGSS)
function getAllAreasForCurrentGame() {
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  if (cfg.hasDualRegions) {
    return [...JOHTO_AREAS, ...JOHTO_KANTO_AREAS];
  }
  return getAreasForCurrentGame();
}

function setSubRegion(targetRegion) {
  if (targetRegion !== "Johto" && targetRegion !== "Kanto") return;
  gpsState.subRegion = targetRegion;
  gpsState.selectedAreaId = null;
  renderSubRegionSwitcher();
  renderInteractiveMapNodes();
  renderAreaSelectorQuickList();
  renderSelectedAreaDetails();
}

function renderSubRegionSwitcher() {
  const switcher = document.getElementById("johto-kanto-region-switcher");
  if (!switcher) return;
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];

  if (!cfg.hasDualRegions) {
    switcher.classList.add("hidden");
    switcher.classList.remove("flex");
    switcher.innerHTML = "";
    return;
  }

  switcher.classList.remove("hidden");
  switcher.classList.add("flex");

  const isKanto = gpsState.subRegion === "Kanto";
  switcher.innerHTML = `
    <button
      type="button"
      data-switch-subregion="Johto"
      class="px-3 py-1 rounded-md font-label-sm text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
        !isKanto
          ? "bg-primary text-on-primary shadow-sm"
          : "text-on-surface-variant hover:text-primary"
      }"
    >
      <span>🏯</span>
      <span>1ª Região: Johto</span>
    </button>
    <button
      type="button"
      data-switch-subregion="Kanto"
      class="px-3 py-1 rounded-md font-label-sm text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
        isKanto
          ? "bg-primary text-on-primary shadow-sm"
          : "text-on-surface-variant hover:text-primary"
      }"
    >
      <span>⛰️</span>
      <span>2ª Região: Kanto</span>
    </button>
  `;

  switcher.querySelectorAll("[data-switch-subregion]").forEach(btn => {
    btn.addEventListener("click", () => {
      setSubRegion(btn.getAttribute("data-switch-subregion"));
    });
  });
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
  const coordGrid = document.getElementById("radar-coord-grid");
  const subtitleEl = document.querySelector("header p");

  const isItems = gpsState.mode === "items";

  // Alterna a paleta de cores inteira do GPS Pokémon para o tema âmbar/dourado de Pesquisa de Itens
  document.body.classList.toggle("gps-items-mode", isItems);

  if (coordGrid) {
    coordGrid.setAttribute("stroke", isItems ? "#ffb95f" : "#38bdf8");
  }
  if (subtitleEl) {
    subtitleEl.textContent = isItems
      ? "O guia interativo de localização de Itens, TMs e HMs!"
      : "O guia interativo de rotas e localização de Pokémon!";
  }

  if (btnPokemon && btnItems) {
    if (!isItems) {
      btnPokemon.className = "w-full text-left p-space-md rounded-xl bg-surface-container-high border border-[#8ed5ff]/50 shadow-md transition-all cursor-pointer flex items-start gap-3";
      btnItems.className = "w-full text-left p-space-md rounded-xl bg-surface-container hover:bg-surface-container-high border border-outline-variant/40 transition-all cursor-pointer flex items-start gap-3";
    } else {
      btnItems.className = "w-full text-left p-space-md rounded-xl bg-surface-container-high border border-[#ffb95f]/60 shadow-md transition-all cursor-pointer flex items-start gap-3";
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
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  const versions = cfg.versions || GAME_GPS_CONFIG["gen1-rb"].versions;

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

  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  const layoutKey = cfg.hasDualRegions
    ? (gpsState.subRegion === "Kanto" ? "KantoJohto" : "Johto")
    : cfg.region;
  const layout = REGION_MAP_LAYOUTS[layoutKey] || REGION_MAP_LAYOUTS.Kanto;
  const areas = getAreasForCurrentGame();
  const query = gpsState.searchQuery.trim().toLowerCase();

  renderSubRegionSwitcher();

  const warningBanner = document.getElementById("unbound-bug-warning-banner");
  if (warningBanner) {
    warningBanner.classList.toggle("hidden", !cfg.isMapBugged);
  }

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

  const isItems = gpsState.mode === "items";
  const selAccent = isItems ? "#ffb95f" : "#38bdf8";
  const selInner = isItems ? "#78350f" : "#0c4a6e";
  const selText = isItems ? "#ffddb8" : "#8ed5ff";

  // 1. Render Orthogonal Route Strips (Border + Fill + Route Number)
  const routesSvg = layout.routes.map(r => {
    const isSelected = r.areaId === gpsState.selectedAreaId;
    const matched = isAreaMatched(r.areaId);
    const hasMethod = isAreaMethodActive(r.areaId);
    const opacity = !hasMethod ? "0.35" : "1";

    const outerStroke = isSelected
      ? selAccent
      : matched
        ? "#f59e0b"
        : r.marine
          ? "#0284c7"
          : "#475569";

    const innerStroke = isSelected
      ? selInner
      : matched
        ? "#78350f"
        : r.marine
          ? "#0369a1"
          : "#1e293b";

    const numFill = isSelected
      ? selText
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
          <rect x="-22" y="-22" width="44" height="44" rx="4" fill="none" stroke="${matched ? "#f59e0b" : selAccent}" stroke-width="2.5" opacity="0.55">
            <animate attributeName="x" values="-18;-25;-18" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="y" values="-18;-25;-18" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="width" values="36;50;36" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="height" values="36;50;36" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.65;0.15;0.65" dur="1.6s" repeatCount="indefinite" />
          </rect>
        ` : ""}
        <rect x="-17" y="-17" width="34" height="34" fill="#475569" stroke="${isSelected ? selAccent : matched ? "#f59e0b" : "#94a3b8"}" stroke-width="${isSelected || matched ? "2.5" : "1.5"}" />
        <polygon points="-17,-17 17,-17 11,-11 -11,-11" fill="#94a3b8" opacity="0.55" />
        <polygon points="-17,17 17,17 11,11 -11,11" fill="#1e293b" opacity="0.8" />
        <rect x="-11" y="-11" width="22" height="22" fill="${isSelected ? selAccent : matched ? "#f59e0b" : "#ef4444"}" class="group-hover:fill-[#f87171] transition-colors" filter="url(#glow-red)" />
      </g>
      <text x="${c.lx}" y="${c.ly}" fill="${isSelected ? selText : matched ? "#fde047" : "#dde2f7"}" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" text-anchor="${c.anchor}" style="paint-order: stroke; stroke: #060c1a; stroke-width: 4px; stroke-linejoin: round;">${c.name}</text>
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
          <circle cx="${s.x}" cy="${s.y}" r="16" fill="${matched ? "#f59e0b" : selAccent}" opacity="0.35">
            <animate attributeName="r" values="14;25;14" dur="1.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.55;0.12;0.55" dur="1.6s" repeatCount="indefinite" />
          </circle>
        ` : ""}
        <circle
          cx="${s.x}"
          cy="${s.y}"
          r="14"
          fill="${isSelected ? selAccent : matched ? "#f59e0b" : "#10b981"}"
          stroke="${isSelected ? "#fef3c7" : "#64748b"}"
          stroke-width="3.5"
          filter="${isSelected ? "url(#glow-cyan)" : "url(#glow-emerald)"}"
        >
          ${isSelected || matched ? `<animate attributeName="r" values="13.5;16;13.5" dur="1.6s" repeatCount="indefinite" />` : ""}
        </circle>
        ${!s.hideLabel ? `
          <text
            x="${s.lx}"
            y="${s.ly}"
            fill="${isSelected ? selText : matched ? "#fde047" : "#56e5a9"}"
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

  const buggedStampSvg = cfg.isMapBugged ? `
    <g pointer-events="none">
      <rect x="110" y="10" width="660" height="40" rx="10" fill="#450a0a" fill-opacity="0.92" stroke="#ef4444" stroke-width="2.5" />
      <text x="440" y="35" fill="#fecaca" font-family="Plus Jakarta Sans" font-size="13.5" font-weight="800" text-anchor="middle">
        ⚠️ AVISO: MAPA DE POKÉMON UNBOUND ESTÁ BUGADO E SERÁ ARRUMADO EM OUTRO MOMENTO
      </text>
    </g>
  ` : "";

  const dualRegionPortalSvg = cfg.hasDualRegions
    ? (gpsState.subRegion === "Kanto"
      ? `
        <g class="cursor-pointer group" data-portal-subregion="Johto" transform="translate(20, 16)">
          <rect x="0" y="0" width="248" height="36" rx="8" fill="#0f172a" stroke="${selAccent}" stroke-width="2" />
          <text x="124" y="22.5" fill="${selText}" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" text-anchor="middle">
            ⬅ VOLTAR P/ MAPA DE JOHTO 🏯
          </text>
        </g>
      `
      : `
        <g class="cursor-pointer group" data-portal-subregion="Kanto" transform="translate(612, 16)">
          <rect x="0" y="0" width="248" height="36" rx="8" fill="#0f172a" stroke="${selAccent}" stroke-width="2" />
          <text x="124" y="22.5" fill="${selText}" font-family="Plus Jakarta Sans" font-size="12" font-weight="800" text-anchor="middle">
            ⛰️ IR P/ MAPA DE KANTO ➔
          </text>
        </g>
      `)
    : "";

  nodesGroup.innerHTML = routesSvg + citiesSvg + sitesSvg + buggedStampSvg + dualRegionPortalSvg;

  nodesGroup.querySelectorAll("[data-area-id]").forEach(node => {
    node.addEventListener("click", () => {
      const areaId = node.getAttribute("data-area-id");
      selectArea(areaId);
    });
  });

  nodesGroup.querySelectorAll("[data-portal-subregion]").forEach(portal => {
    portal.addEventListener("click", () => {
      setSubRegion(portal.getAttribute("data-portal-subregion"));
    });
  });
}

function renderAreaSelectorQuickList() {
  const bar = document.getElementById("quick-route-pills");
  if (!bar) return;
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  const areas = getAreasForCurrentGame();

  const dualSwitchPill = cfg.hasDualRegions
    ? `<button
        type="button"
        data-quick-switch-subregion="${gpsState.subRegion === "Kanto" ? "Johto" : "Kanto"}"
        class="shrink-0 px-3 py-1 rounded font-label-sm text-label-sm font-extrabold transition-all cursor-pointer border bg-primary-container/25 hover:bg-primary-container text-primary hover:text-on-primary-container border-primary/50 shadow-sm flex items-center gap-1"
      >
        <span>${gpsState.subRegion === "Kanto" ? "🏯 Ver Rotas de Johto" : "⛰️ Ver Rotas de Kanto (2ª Região)"}</span>
      </button>`
    : "";

  bar.innerHTML = dualSwitchPill + areas.map(area => {
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

  bar.querySelectorAll("[data-quick-switch-subregion]").forEach(btn => {
    btn.addEventListener("click", () => {
      setSubRegion(btn.getAttribute("data-quick-switch-subregion"));
    });
  });
}

// ============================================================================
// 8. RENDERIZAÇÃO DO PAINEL DIREITO (MODO POKÉMON OU MODO ITENS & TMS)
// ============================================================================
function renderSelectedAreaDetails() {
  const areas = getAreasForCurrentGame();
  const allGameAreas = getAllAreasForCurrentGame();
  const area = gpsState.selectedAreaId
    ? areas.find(a => a.id === gpsState.selectedAreaId)
    : null;

  const gameConfig = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];

  const regionTitleEl = document.getElementById("map-region-title");
  if (regionTitleEl) {
    if (gameConfig.isMapBugged) {
      regionTitleEl.innerHTML = `
        <span>Região de ${gameConfig.region}</span>
        <span class="px-2.5 py-0.5 rounded-full bg-[#ef4444] text-white font-label-sm text-[11px] font-extrabold uppercase tracking-wider shadow-md animate-pulse">
          ⚠️ Mapa Bugado — Será arrumado em outro momento
        </span>
      `;
    } else if (gameConfig.hasDualRegions) {
      regionTitleEl.textContent = `Região de ${gpsState.subRegion === "Kanto" ? "Kanto" : "Johto"}`;
    } else {
      regionTitleEl.textContent = `Região de ${gameConfig.region}`;
    }
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
        renderItemsPanelList(listEl, areas[0], allGameAreas, gameConfig);
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
    renderItemsPanelList(listEl, area, allGameAreas, gameConfig);
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
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  if (cfg.hasDualRegions && areaId) {
    if (areaId.startsWith("jk-") && gpsState.subRegion !== "Kanto") {
      gpsState.subRegion = "Kanto";
    } else if (areaId.startsWith("johto-") && gpsState.subRegion !== "Johto") {
      gpsState.subRegion = "Johto";
    }
  }
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
  const cfg = GAME_GPS_CONFIG[gpsState.gameId] || GAME_GPS_CONFIG["gen1-rb"];
  // Primeiro tenta na sub-região ativa; se for um jogo de Johto (GSC/HGSS) e o Pokémon/Item estiver em Kanto (ou vice-versa), alterna automaticamente!
  const currentAreas = getAreasForCurrentGame();
  let matchedArea = currentAreas.find(a => doesAreaMatchSearch(a, q));
  if (!matchedArea && cfg.hasDualRegions) {
    const allAreas = getAllAreasForCurrentGame();
    matchedArea = allAreas.find(a => doesAreaMatchSearch(a, q));
    if (matchedArea) {
      gpsState.subRegion = matchedArea.id.startsWith("jk-") ? "Kanto" : "Johto";
    }
  }
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

  // Seletor de Jogo
  const gameSelect = document.getElementById("gps-game-select");
  if (gameSelect) {
    gameSelect.addEventListener("change", e => {
      gpsState.gameId = e.target.value;
      gpsState.subRegion = "Johto";
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
