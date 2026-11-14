/**
 * GPS POKÉMON — SISTEMA CARTOGRÁFICO TÁTICO (KANTO GEN 1: RED & BLUE)
 * Dados interativos de rotas, cavernas, zonas especiais e taxas de encontro.
 */

/**
 * Configuração de mecânicas ambientais por jogo:
 * - hasTimeOfDay: Implementado a partir de Johto (Gen 2+).
 * - hasSeasons: Exclusivo de Unova (Black & White 1 e 2), exibido apenas
 *   para Pokémon cuja taxa de aparecimento muda conforme a estação (enc.seasonTag).
 */
const GAME_GPS_CONFIG = {
  rb: { region: "Kanto", hasTimeOfDay: false, hasSeasons: false },
  gsc: { region: "Johto", hasTimeOfDay: true, hasSeasons: false },
  rse: { region: "Hoenn", hasTimeOfDay: false, hasSeasons: false },
  frlg: { region: "Kanto", hasTimeOfDay: false, hasSeasons: false },
  dppt: { region: "Sinnoh", hasTimeOfDay: true, hasSeasons: false },
  hgss: { region: "Johto", hasTimeOfDay: true, hasSeasons: false },
  bw: { region: "Unova", hasTimeOfDay: true, hasSeasons: true },
  bw2: { region: "Unova", hasTimeOfDay: true, hasSeasons: true },
  xy: { region: "Kalos", hasTimeOfDay: true, hasSeasons: false },
  oras: { region: "Hoenn", hasTimeOfDay: true, hasSeasons: false },
  sm: { region: "Alola", hasTimeOfDay: true, hasSeasons: false },
  usum: { region: "Alola", hasTimeOfDay: true, hasSeasons: false },
  swsh: { region: "Galar", hasTimeOfDay: true, hasSeasons: false },
  sv: { region: "Paldea", hasTimeOfDay: true, hasSeasons: false }
};

const KANTO_GEN1_AREAS = [
  {
    id: "route-1",
    name: "Rota 1",
    sector: "Setor Kanto 01",
    category: "route",
    connections: "Pallet Town (Sul) ⇄ Viridian City (Norte)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Voador",
    coords: { x: 170, y: 465 },
    labelWidth: 74,
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 5", rateRed: 50, rateBlue: 50, highlight: "Mais Comum" },
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 50, rateBlue: 50 }
    ]
  },
  {
    id: "route-22",
    name: "Rota 22",
    sector: "Setor Oeste Liga",
    category: "route",
    connections: "Viridian City (Leste) ⇄ Pokémon League Front Gate (Oeste)",
    levelRange: "Lv. 2 — 5",
    dominantTypes: "Normal / Lutador / Veneno",
    coords: { x: 95, y: 410 },
    labelWidth: 76,
    encounters: [
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 50, rateBlue: 50 },
      { id: 29, name: "Nidoran♀", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 5, rateBlue: 45 },
      { id: 32, name: "Nidoran♂", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 4", rateRed: 45, rateBlue: 5, recommended: true },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 10, rateBlue: 10 },
      { id: 60, name: "Poliwag", types: ["Água"], method: "fish", methodLabel: "🎣 Good Rod", levels: "Lv. 10", rateRed: 50, rateBlue: 50 },
      { id: 118, name: "Goldeen", types: ["Água"], method: "fish", methodLabel: "🎣 Good Rod", levels: "Lv. 10", rateRed: 50, rateBlue: 50 }
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
    coords: { x: 170, y: 335 },
    labelWidth: 74,
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 40, rateBlue: 40 },
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 2 — 5", rateRed: 45, rateBlue: 45 },
      { id: 10, name: "Caterpie", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 0, rateBlue: 15 },
      { id: 13, name: "Weedle", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 15, rateBlue: 0 },
      { id: 122, name: "Mr. Mime", types: ["Psíquico"], method: "static", methodLabel: "🎁 Troca NPC (Por Abra)", levels: "Lv. 6 — 30", rateRed: 100, rateBlue: 100, recommended: true }
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
    coords: { x: 170, y: 245 },
    labelWidth: 124,
    encounters: [
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 5, rateBlue: 5, highlight: "⚡ Ultra Raro (5%)", recommended: true },
      { id: 10, name: "Caterpie", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 5, rateBlue: 45 },
      { id: 11, name: "Metapod", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 4 — 6", rateRed: 5, rateBlue: 40 },
      { id: 13, name: "Weedle", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 5", rateRed: 45, rateBlue: 5 },
      { id: 14, name: "Kakuna", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 4 — 6", rateRed: 40, rateBlue: 5 }
    ]
  },
  {
    id: "route-3",
    name: "Rota 3",
    sector: "Setor Montanhoso 03",
    category: "route",
    connections: "Pewter City (Oeste) ⇄ Entrada do Mt. Moon (Leste)",
    levelRange: "Lv. 3 — 9",
    dominantTypes: "Voador / Normal / Veneno",
    coords: { x: 270, y: 140 },
    labelWidth: 72,
    encounters: [
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 8", rateRed: 45, rateBlue: 45 },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 5 — 8", rateRed: 45, rateBlue: 45 },
      { id: 39, name: "Jigglypuff", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 3 — 7", rateRed: 10, rateBlue: 10, highlight: "Raro (10%)", recommended: true },
      { id: 129, name: "Magikarp", types: ["Água"], method: "static", methodLabel: "🎁 Vendedor do PokéCenter (₽500)", levels: "Lv. 5", rateRed: 100, rateBlue: 100, recommended: true }
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
    coords: { x: 380, y: 140 },
    labelWidth: 94,
    encounters: [
      { id: 41, name: "Zubat", types: ["Veneno", "Voador"], method: "cave", methodLabel: "⛰️ Caverna (1F a B2F)", levels: "Lv. 6 — 11", rateRed: 79, rateBlue: 79 },
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Caverna (1F a B2F)", levels: "Lv. 7 — 10", rateRed: 15, rateBlue: 15 },
      { id: 46, name: "Paras", types: ["Inseto", "Planta"], method: "cave", methodLabel: "⛰️ Caverna (B2F: 100% nas escadas)", levels: "Lv. 8 — 12", rateRed: 5, rateBlue: 5, recommended: true },
      { id: 35, name: "Clefairy", types: ["Normal"], method: "cave", methodLabel: "⛰️ Caverna (1% no 1F / 6% no B2F)", levels: "Lv. 8 — 12", rateRed: 6, rateBlue: 6, highlight: "⚡ Raro (1%–6%)", recommended: true },
      { id: 138, name: "Omanyte (Helix Fossil)", types: ["Pedra", "Água"], method: "static", methodLabel: "🎁 Escolha de Fóssil (B2F)", levels: "Lv. 30 (Cinnabar)", rateRed: 100, rateBlue: 100 },
      { id: 140, name: "Kabuto (Dome Fossil)", types: ["Pedra", "Água"], method: "static", methodLabel: "🎁 Escolha de Fóssil (B2F)", levels: "Lv. 30 (Cinnabar)", rateRed: 100, rateBlue: 100 }
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
    coords: { x: 465, y: 140 },
    labelWidth: 70,
    encounters: [
      { id: 19, name: "Rattata", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 40, rateBlue: 40 },
      { id: 21, name: "Spearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 35, rateBlue: 35 },
      { id: 23, name: "Ekans", types: ["Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 12", rateRed: 25, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 27, name: "Sandshrew", types: ["Terra"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 6 — 12", rateRed: 0, rateBlue: 25, versionTag: "🔵 Exclusivo Blue", recommended: true }
    ]
  },
  {
    id: "route-24-25",
    name: "Rotas 24 & 25 (Nugget Bridge)",
    sector: "Setor Norte Cerulean",
    category: "route",
    connections: "Cerulean City (Sul) ⇄ Casa do Bill (Cabo de Cerulean)",
    levelRange: "Lv. 7 — 14",
    dominantTypes: "Psíquico / Planta / Veneno / Inseto",
    coords: { x: 540, y: 68 },
    labelWidth: 112,
    encounters: [
      { id: 63, name: "Abra", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 8 — 12", rateRed: 15, rateBlue: 15, highlight: "🎯 Cuidado: Usa Teleport!", recommended: true },
      { id: 43, name: "Oddish", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 14", rateRed: 25, rateBlue: 0, versionTag: "🔴 Exclusivo Red", recommended: true },
      { id: 69, name: "Bellsprout", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 14", rateRed: 0, rateBlue: 25, versionTag: "🔵 Exclusivo Blue", recommended: true },
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 12 — 13", rateRed: 20, rateBlue: 20 },
      { id: 10, name: "Caterpie", types: ["Inseto"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 7", rateRed: 5, rateBlue: 20 },
      { id: 13, name: "Weedle", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 7", rateRed: 20, rateBlue: 5 }
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
    coords: { x: 540, y: 210 },
    labelWidth: 88,
    encounters: [
      { id: 56, name: "Mankey", types: ["Lutador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 10 — 16", rateRed: 35, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 52, name: "Meowth", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 10 — 16", rateRed: 0, rateBlue: 35, versionTag: "🔵 Exclusivo Blue", recommended: true },
      { id: 43, name: "Oddish", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 40, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 69, name: "Bellsprout", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 0, rateBlue: 40, versionTag: "🔵 Exclusivo Blue" },
      { id: 16, name: "Pidgey", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 13 — 16", rateRed: 25, rateBlue: 25 }
    ]
  },
  {
    id: "digletts-cave",
    name: "Diglett's Cave & Rota 11",
    sector: "Setor Vermilion Leste",
    category: "cave",
    connections: "Rota 11 (Vermilion) ⇄ Túnel Subterrâneo ⇄ Rota 2 (Viridian)",
    levelRange: "Lv. 15 — 31",
    dominantTypes: "Terra / Psíquico",
    coords: { x: 605, y: 390 },
    labelWidth: 112,
    encounters: [
      { id: 50, name: "Diglett", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave", levels: "Lv. 15 — 22", rateRed: 95, rateBlue: 95, recommended: true },
      { id: 51, name: "Dugtrio", types: ["Terra"], method: "cave", methodLabel: "⛰️ Diglett's Cave", levels: "Lv. 29 — 31", rateRed: 5, rateBlue: 5, highlight: "⚡ 5% Boss Raro", recommended: true },
      { id: 96, name: "Drowzee", types: ["Psíquico"], method: "grass", methodLabel: "🌿 Rota 11 (Grama Alta)", levels: "Lv. 9 — 15", rateRed: 25, rateBlue: 25 },
      { id: 83, name: "Farfetch'd (Dux)", types: ["Normal", "Voador"], method: "static", methodLabel: "🎁 Troca NPC em Vermilion (Por Spearow)", levels: "Lv. 15", rateRed: 100, rateBlue: 100 }
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
    coords: { x: 690, y: 140 },
    labelWidth: 108,
    encounters: [
      { id: 66, name: "Machop", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Rock Tunnel (1F / B1F)", levels: "Lv. 15 — 17", rateRed: 15, rateBlue: 15 },
      { id: 95, name: "Onix", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Rock Tunnel (1F / B1F)", levels: "Lv. 13 — 17", rateRed: 6, rateBlue: 6, highlight: "Raro (6%)" },
      { id: 74, name: "Geodude", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 15 — 17", rateRed: 35, rateBlue: 35 },
      { id: 41, name: "Zubat", types: ["Veneno", "Voador"], method: "cave", methodLabel: "⛰️ Rock Tunnel", levels: "Lv. 15 — 16", rateRed: 44, rateBlue: 44 },
      { id: 100, name: "Voltorb", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Rota 10 (Grama Alta)", levels: "Lv. 14 — 17", rateRed: 40, rateBlue: 40 }
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
    coords: { x: 750, y: 200 },
    labelWidth: 112,
    encounters: [
      { id: 145, name: "Zapdos", types: ["Elétrico", "Voador"], method: "static", methodLabel: "🎁 Encontro Lendário Estático", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "⚡ LENDÁRIO LV. 50", recommended: true },
      { id: 125, name: "Electabuzz", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 33 — 36", rateRed: 5, rateBlue: 0, versionTag: "🔴 Exclusivo Red", highlight: "Raro (5%)" },
      { id: 81, name: "Magnemite", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 21 — 35", rateRed: 35, rateBlue: 35 },
      { id: 82, name: "Magneton", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 32 — 35", rateRed: 10, rateBlue: 10 },
      { id: 25, name: "Pikachu", types: ["Elétrico"], method: "grass", methodLabel: "🌿 Interior da Usina", levels: "Lv. 20 — 24", rateRed: 25, rateBlue: 25 }
    ]
  },
  {
    id: "pokemon-tower",
    name: "Pokémon Tower (Lavender)",
    sector: "Setor Espiritual 05",
    category: "special",
    connections: "Lavender Town (Requer Silph Scope p/ Identificar Fantasmas)",
    levelRange: "Lv. 13 — 24",
    dominantTypes: "Fantasma / Veneno / Terra",
    coords: { x: 755, y: 270 },
    labelWidth: 112,
    encounters: [
      { id: 92, name: "Gastly", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Andares 3F a 7F", levels: "Lv. 13 — 19", rateRed: 85, rateBlue: 85, recommended: true },
      { id: 93, name: "Haunter", types: ["Fantasma", "Veneno"], method: "cave", methodLabel: "⛰️ Andares 5F a 7F", levels: "Lv. 20 — 24", rateRed: 6, rateBlue: 6, highlight: "Raro (6%)", recommended: true },
      { id: 104, name: "Cubone", types: ["Terra"], method: "cave", methodLabel: "⛰️ Andares 3F a 7F", levels: "Lv. 15 — 19", rateRed: 9, rateBlue: 9 }
    ]
  },
  {
    id: "route-7-8",
    name: "Rotas 7 & 8 (Celadon ⇄ Lavender)",
    sector: "Setor Central Leste/Oeste",
    category: "route",
    connections: "Celadon City ⇄ Saffron City ⇄ Lavender Town",
    levelRange: "Lv. 15 — 22",
    dominantTypes: "Fogo / Planta / Veneno",
    coords: { x: 460, y: 270 },
    labelWidth: 88,
    encounters: [
      { id: 58, name: "Growlithe", types: ["Fogo"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 18 — 20", rateRed: 20, rateBlue: 0, versionTag: "🔴 Exclusivo Red", recommended: true },
      { id: 37, name: "Vulpix", types: ["Fogo"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 18 — 20", rateRed: 0, rateBlue: 20, versionTag: "🔵 Exclusivo Blue", recommended: true },
      { id: 133, name: "Eevee", types: ["Normal"], method: "static", methodLabel: "🎁 Celadon Mansion (Topo do Prédio)", levels: "Lv. 25", rateRed: 100, rateBlue: 100, highlight: "🎁 Presente Único", recommended: true },
      { id: 106, name: "Hitmonlee / Hitmonchan", types: ["Lutador"], method: "static", methodLabel: "🎁 Fighting Dojo (Saffron City)", levels: "Lv. 30", rateRed: 100, rateBlue: 100 },
      { id: 131, name: "Lapras", types: ["Água", "Gelo"], method: "static", methodLabel: "🎁 Silph Co. 7F (Saffron City)", levels: "Lv. 15", rateRed: 100, rateBlue: 100, highlight: "🎁 Presente Silph Co.", recommended: true }
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
    coords: { x: 690, y: 380 },
    labelWidth: 112,
    encounters: [
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueio da Rota 12 (Poké Flute)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "💤 BOSS ESTÁTICO", recommended: true },
      { id: 132, name: "Ditto", types: ["Normal"], method: "grass", methodLabel: "🌿 Rotas 13, 14 & 15", levels: "Lv. 23 — 26", rateRed: 10, rateBlue: 10, highlight: "Raro (10%)" },
      { id: 48, name: "Venonat", types: ["Inseto", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 22 — 26", rateRed: 20, rateBlue: 20 },
      { id: 44, name: "Gloom", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 28 — 30", rateRed: 5, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 70, name: "Weepinbell", types: ["Planta", "Veneno"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 28 — 30", rateRed: 0, rateBlue: 5, versionTag: "🔵 Exclusivo Blue" },
      { id: 98, name: "Krabby", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod", levels: "Lv. 15 — 25", rateRed: 50, rateBlue: 50 }
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
    coords: { x: 350, y: 380 },
    labelWidth: 112,
    encounters: [
      { id: 143, name: "Snorlax", types: ["Normal"], method: "static", methodLabel: "🎁 Bloqueio da Rota 16 (Poké Flute)", levels: "Lv. 30", rateRed: 100, rateBlue: 100, highlight: "💤 BOSS ESTÁTICO", recommended: true },
      { id: 84, name: "Doduo", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta (Rota 16–18)", levels: "Lv. 18 — 26", rateRed: 35, rateBlue: 35, recommended: true },
      { id: 22, name: "Fearow", types: ["Normal", "Voador"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 25 — 29", rateRed: 15, rateBlue: 15 },
      { id: 20, name: "Raticate", types: ["Normal"], method: "grass", methodLabel: "🌿 Grama Alta", levels: "Lv. 20 — 25", rateRed: 10, rateBlue: 10 }
    ]
  },
  {
    id: "safari-zone",
    name: "Safari Zone (Fuchsia City)",
    sector: "Reserva Ecológica Kanto",
    category: "special",
    connections: "Norte de Fuchsia City (4 Áreas + Secret House HM03 Surf)",
    levelRange: "Lv. 22 — 33",
    dominantTypes: "Normal / Dragão / Terra / Planta",
    coords: { x: 500, y: 455 },
    labelWidth: 104,
    encounters: [
      { id: 128, name: "Tauros", types: ["Normal"], method: "grass", methodLabel: "🌿 Área 2 & 3", levels: "Lv. 26 — 28", rateRed: 4, rateBlue: 4, highlight: "👑 S+ TIER RARO (4%)", recommended: true },
      { id: 113, name: "Chansey", types: ["Normal"], method: "grass", methodLabel: "🌿 Área Central & 2", levels: "Lv. 23 — 26", rateRed: 4, rateBlue: 4, highlight: "💎 ULTRA RARO (1%–4%)", recommended: true },
      { id: 147, name: "Dratini", types: ["Dragão"], method: "fish", methodLabel: "🎣 Super Rod (Lagos do Safari)", levels: "Lv. 15 — 25", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 102, name: "Exeggcute", types: ["Planta", "Psíquico"], method: "grass", methodLabel: "🌿 Todas as Áreas", levels: "Lv. 24 — 27", rateRed: 20, rateBlue: 20, recommended: true },
      { id: 111, name: "Rhyhorn", types: ["Terra", "Pedra"], method: "grass", methodLabel: "🌿 Todas as Áreas", levels: "Lv. 25 — 26", rateRed: 20, rateBlue: 20 },
      { id: 123, name: "Scyther", types: ["Inseto", "Voador"], method: "grass", methodLabel: "🌿 Área Central & 1", levels: "Lv. 23 — 28", rateRed: 4, rateBlue: 0, versionTag: "🔴 Exclusivo Red", highlight: "Raro (4%)" },
      { id: 127, name: "Pinsir", types: ["Inseto"], method: "grass", methodLabel: "🌿 Área Central & 1", levels: "Lv. 23 — 28", rateRed: 0, rateBlue: 4, versionTag: "🔵 Exclusivo Blue", highlight: "Raro (4%)" },
      { id: 115, name: "Kangaskhan", types: ["Normal"], method: "grass", methodLabel: "🌿 Área 1 & 3", levels: "Lv. 25 — 28", rateRed: 4, rateBlue: 4, highlight: "Raro (4%)" }
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
    coords: { x: 350, y: 540 },
    labelWidth: 112,
    encounters: [
      { id: 144, name: "Articuno", types: ["Gelo", "Voador"], method: "static", methodLabel: "🎁 Seafoam B4F (Encontro Lendário)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "❄️ LENDÁRIO LV. 50", recommended: true },
      { id: 120, name: "Staryu", types: ["Água"], method: "fish", methodLabel: "🎣 Super Rod (Rota 19–20 / Seafoam)", levels: "Lv. 15 — 30", rateRed: 25, rateBlue: 25, recommended: true },
      { id: 86, name: "Seel", types: ["Água"], method: "cave", methodLabel: "⛰️ Seafoam Islands", levels: "Lv. 28 — 32", rateRed: 25, rateBlue: 25 },
      { id: 79, name: "Slowpoke", types: ["Água", "Psíquico"], method: "cave", methodLabel: "⛰️ Seafoam Islands", levels: "Lv. 28 — 30", rateRed: 15, rateBlue: 15 },
      { id: 72, name: "Tentacool", types: ["Água", "Veneno"], method: "surf", methodLabel: "🌊 Surf (Rotas 19, 20 & 21)", levels: "Lv. 5 — 40", rateRed: 100, rateBlue: 100 }
    ]
  },
  {
    id: "pokemon-mansion",
    name: "Pokémon Mansion & Rota 21",
    sector: "Setor Vulcânico Cinnabar",
    category: "special",
    connections: "Cinnabar Island (Chave Secreta do Ginásio de Blaine) ⇄ Rota 21 (Pallet)",
    levelRange: "Lv. 28 — 40",
    dominantTypes: "Fogo / Veneno / Planta",
    coords: { x: 170, y: 558 },
    labelWidth: 118,
    encounters: [
      { id: 126, name: "Magmar", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Pokémon Mansion (1F a B1F)", levels: "Lv. 34 — 38", rateRed: 0, rateBlue: 10, versionTag: "🔵 Exclusivo Blue", highlight: "Raro (10%)" },
      { id: 77, name: "Ponyta", types: ["Fogo"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 28 — 36", rateRed: 30, rateBlue: 30 },
      { id: 109, name: "Koffing", types: ["Veneno"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 30 — 32", rateRed: 35, rateBlue: 5 },
      { id: 88, name: "Grimer", types: ["Veneno"], method: "cave", methodLabel: "⛰️ Pokémon Mansion", levels: "Lv. 30 — 32", rateRed: 5, rateBlue: 35 },
      { id: 114, name: "Tangela", types: ["Planta"], method: "grass", methodLabel: "🌿 Rota 21 (Grama Costeira)", levels: "Lv. 28 — 32", rateRed: 15, rateBlue: 15 },
      { id: 142, name: "Aerodactyl (Old Amber)", types: ["Pedra", "Voador"], method: "static", methodLabel: "🎁 Reviver no Lab de Cinnabar", levels: "Lv. 30", rateRed: 100, rateBlue: 100 }
    ]
  },
  {
    id: "victory-road",
    name: "Rota 23 & Victory Road",
    sector: "Setor Final — Indigo Plateau",
    category: "cave",
    connections: "Portão das 8 Insígnias ⇄ Victory Road ⇄ Liga Pokémon (Elite Four)",
    levelRange: "Lv. 26 — 50",
    dominantTypes: "Fogo / Pedra / Lutador / Veneno",
    coords: { x: 90, y: 200 },
    labelWidth: 110,
    encounters: [
      { id: 146, name: "Moltres", types: ["Fogo", "Voador"], method: "static", methodLabel: "🎁 Victory Road 2F (Encontro Lendário)", levels: "Lv. 50", rateRed: 100, rateBlue: 100, highlight: "🔥 LENDÁRIO LV. 50", recommended: true },
      { id: 67, name: "Machoke", types: ["Lutador"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 39 — 42", rateRed: 15, rateBlue: 15 },
      { id: 75, name: "Graveler", types: ["Pedra", "Terra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 41 — 43", rateRed: 10, rateBlue: 10 },
      { id: 105, name: "Marowak", types: ["Terra"], method: "cave", methodLabel: "⛰️ Victory Road", levels: "Lv. 40 — 43", rateRed: 5, rateBlue: 5 },
      { id: 24, name: "Arbok", types: ["Veneno"], method: "grass", methodLabel: "🌿 Rota 23 (Grama Alta)", levels: "Lv. 41", rateRed: 15, rateBlue: 0, versionTag: "🔴 Exclusivo Red" },
      { id: 28, name: "Sandslash", types: ["Terra"], method: "grass", methodLabel: "🌿 Rota 23 (Grama Alta)", levels: "Lv. 41", rateRed: 0, rateBlue: 15, versionTag: "🔵 Exclusivo Blue" }
    ]
  },
  {
    id: "cerulean-cave",
    name: "Cerulean Cave (Unknown Dungeon)",
    sector: "Setor Pós-Game — Nível S+",
    category: "special",
    connections: "Oeste de Cerulean City (Desbloqueado após vencer a Elite Four)",
    levelRange: "Lv. 46 — 70",
    dominantTypes: "Psíquico / Normal / Elétrico",
    coords: { x: 465, y: 78 },
    labelWidth: 114,
    encounters: [
      { id: 150, name: "Mewtwo", types: ["Psíquico"], method: "static", methodLabel: "🎁 Cerulean Cave B1F (Boss Final)", levels: "Lv. 70", rateRed: 100, rateBlue: 100, highlight: "👑 BOSS SUPREMO LV. 70", recommended: true },
      { id: 113, name: "Chansey", types: ["Normal"], method: "cave", methodLabel: "⛰️ Cerulean Cave (2F & B1F)", levels: "Lv. 56 — 64", rateRed: 10, rateBlue: 10, recommended: true },
      { id: 132, name: "Ditto", types: ["Normal"], method: "cave", methodLabel: "⛰️ Cerulean Cave (B1F)", levels: "Lv. 55 — 67", rateRed: 15, rateBlue: 15 },
      { id: 26, name: "Raichu", types: ["Elétrico"], method: "cave", methodLabel: "⛰️ Cerulean Cave (1F & B1F)", levels: "Lv. 53 — 64", rateRed: 5, rateBlue: 5 },
      { id: 112, name: "Rhydon", types: ["Terra", "Pedra"], method: "cave", methodLabel: "⛰️ Cerulean Cave (1F & 2F)", levels: "Lv. 52 — 58", rateRed: 15, rateBlue: 15 }
    ]
  }
];

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
  "Dragão": "bg-indigo-600/25 text-indigo-300 border-indigo-500/40"
};

let gpsState = {
  gameId: "rb",
  selectedAreaId: "viridian-forest",
  methodFilter: "all", // all | grass | surf | fish | cave | static
  versionFilter: "both", // both | red | blue
  searchQuery: "",
  zoom: 1,
  panX: 0,
  panY: 0
};

function getSpriteUrl(pokemonId) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
}

/**
 * Geometria Clássica do Town Map de Kanto (no visual Radar):
 * 1) Rotas ortogonais numeradas (1 a 25) — terrestres e marítimas
 * 2) Cidades (Quadrados vermelhos chanfrados)
 * 3) Locais / Cavernas (Círculos verdes esmeralda)
 */
const KANTO_MAP_ROUTES = [
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
];

const KANTO_MAP_CITIES = [
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
];

const KANTO_MAP_SITES = [
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
];

function renderInteractiveMapNodes() {
  const nodesGroup = document.getElementById("kanto-interactive-nodes");
  if (!nodesGroup) return;

  const query = gpsState.searchQuery.trim().toLowerCase();

  const isAreaMatched = areaId => {
    const area = KANTO_GEN1_AREAS.find(a => a.id === areaId);
    if (!area || !query) return false;
    return (
      area.name.toLowerCase().includes(query) ||
      area.encounters.some(e => e.name.toLowerCase().includes(query))
    );
  };

  const isAreaMethodActive = areaId => {
    if (gpsState.methodFilter === "all") return true;
    const area = KANTO_GEN1_AREAS.find(a => a.id === areaId);
    return area ? area.encounters.some(e => e.method === gpsState.methodFilter) : true;
  };

  // 1. Render Orthogonal Route Strips (Border + Fill + Route Number)
  const routesSvg = KANTO_MAP_ROUTES.map(r => {
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
        <path d="${r.path}" stroke="${outerStroke}" stroke-width="26" stroke-linecap="square" stroke-linejoin="miter" ${isSelected ? 'filter="url(#glow-cyan)"' : ""}></path>
        <path d="${r.path}" stroke="${innerStroke}" stroke-width="19" stroke-linecap="square" stroke-linejoin="miter" class="group-hover:stroke-[#1e3a5f] transition-colors"></path>
        <text x="${r.lx}" y="${r.ly + 4}" fill="${numFill}" font-family="JetBrains Mono" font-size="12" font-weight="800" text-anchor="middle">${r.num}</text>
      </g>
    `;
  }).join("");

  // 2. Render Beveled Red Square Cities (Ville)
  const citiesSvg = KANTO_MAP_CITIES.map(c => {
    const isSelected = c.areaId === gpsState.selectedAreaId;
    return `
      <g class="cursor-pointer group" data-area-id="${c.areaId}" transform="translate(${c.x}, ${c.y})">
        <!-- Beveled Outer Frame -->
        <rect x="-17" y="-17" width="34" height="34" fill="#475569" stroke="${isSelected ? "#38bdf8" : "#94a3b8"}" stroke-width="${isSelected ? "2.5" : "1.5"}" />
        <polygon points="-17,-17 17,-17 11,-11 -11,-11" fill="#94a3b8" opacity="0.55" />
        <polygon points="-17,17 17,17 11,11 -11,11" fill="#1e293b" opacity="0.8" />
        <!-- Inner Red City Core -->
        <rect x="-11" y="-11" width="22" height="22" fill="#ef4444" class="group-hover:fill-[#f87171] transition-colors" filter="url(#glow-red)" />
      </g>
      <text x="${c.lx}" y="${c.ly}" fill="#dde2f7" font-family="Plus Jakarta Sans" font-size="12.5" font-weight="800" text-anchor="${c.anchor}" style="paint-order: stroke; stroke: #060c1a; stroke-width: 4px; stroke-linejoin: round;">${c.name}</text>
    `;
  }).join("");

  // 3. Render Green Circular Sites / Dungeons (Site)
  const sitesSvg = KANTO_MAP_SITES.map(s => {
    const isSelected = s.areaId === gpsState.selectedAreaId;
    const matched = isAreaMatched(s.areaId);
    const hasMethod = isAreaMethodActive(s.areaId);
    const opacity = !hasMethod ? "0.35" : "1";

    return `
      <g class="cursor-pointer group" data-area-id="${s.areaId}" opacity="${opacity}">
        ${isSelected ? `<circle class="animate-target-pulse" cx="${s.x}" cy="${s.y}" r="24" fill="#38bdf8" opacity="0.25"></circle>` : ""}
        <circle
          cx="${s.x}"
          cy="${s.y}"
          r="14"
          fill="${isSelected ? "#38bdf8" : matched ? "#f59e0b" : "#10b981"}"
          stroke="${isSelected ? "#e0f2fe" : "#64748b"}"
          stroke-width="3.5"
          filter="${isSelected ? "url(#glow-cyan)" : "url(#glow-emerald)"}"
          class="group-hover:scale-110 transition-transform"
          style="transform-origin: ${s.x}px ${s.y}px;"
        ></circle>
        ${!s.hideLabel ? `
          <text
            x="${s.lx}"
            y="${s.ly}"
            fill="${isSelected ? "#8ed5ff" : "#56e5a9"}"
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

  bar.innerHTML = KANTO_GEN1_AREAS.map(area => {
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

function renderSelectedAreaDetails() {
  const area = KANTO_GEN1_AREAS.find(a => a.id === gpsState.selectedAreaId) || KANTO_GEN1_AREAS[0];
  if (!area) return;

  const gameConfig = GAME_GPS_CONFIG[gpsState.gameId] || { region: "Kanto", hasTimeOfDay: false, hasSeasons: false };

  const regionTitleEl = document.getElementById("map-region-title");
  if (regionTitleEl && gameConfig.region) {
    regionTitleEl.textContent = `Região de ${gameConfig.region}`;
  }

  // Update telemetry HUD on map
  const hudLevel = document.getElementById("hud-level-range");
  const hudTypes = document.getElementById("hud-dominant-types");
  const hudCount = document.getElementById("hud-species-count");

  if (hudLevel) hudLevel.textContent = area.levelRange;
  if (hudTypes) hudTypes.textContent = area.dominantTypes;
  if (hudCount) hudCount.textContent = `${area.encounters.length} Catalogadas`;

  // Update right panel header
  const sectorEl = document.getElementById("panel-area-sector");
  const titleEl = document.getElementById("panel-area-title");
  const connEl = document.getElementById("panel-area-connections");

  if (sectorEl) sectorEl.textContent = area.sector;
  if (titleEl) titleEl.textContent = area.name;
  if (connEl) connEl.textContent = `${area.connections} • ${area.encounters.length} Espécies Registradas`;

  // Filter encounters
  const query = gpsState.searchQuery.trim().toLowerCase();
  const filtered = area.encounters.filter(enc => {
    if (gpsState.methodFilter !== "all" && enc.method !== gpsState.methodFilter) return false;
    if (gpsState.versionFilter === "red" && enc.rateRed === 0) return false;
    if (gpsState.versionFilter === "blue" && enc.rateBlue === 0) return false;
    if (query && !enc.name.toLowerCase().includes(query) && !area.name.toLowerCase().includes(query)) return false;
    return true;
  });

  const listEl = document.getElementById("encounter-cards-list");
  if (!listEl) return;

  if (filtered.length === 0) {
    listEl.innerHTML = `
      <div class="bg-surface-container rounded-lg p-6 border border-outline-variant text-center space-y-2">
        <span class="material-symbols-outlined text-3xl text-outline">travel_explore</span>
        <p class="font-headline-sm text-headline-sm text-on-surface">Nenhum Pokémon encontrado com o filtro atual nesta área</p>
        <p class="font-body-sm text-body-sm text-on-surface-variant">Experimente mudar o filtro de método ("Todos os Métodos") ou clicar em outra rota destacada no mapa.</p>
      </div>
    `;
    return;
  }

  listEl.innerHTML = filtered.map(enc => {
    const paddedId = String(enc.id).padStart(3, "0");
    const typeBadges = enc.types.map(t => {
      const cls = TYPE_BADGE_STYLES[t] || "bg-slate-500/20 text-slate-200 border-slate-500/40";
      return `<span class="px-1.5 py-0.5 rounded font-label-sm text-label-sm border uppercase ${cls}">${t}</span>`;
    }).join("");

    // Determine rate display based on version filter
    let rateLabel = "";
    let barWidth = 50;
    let barColor = "bg-primary-container";
    let badgeClass = "bg-primary-container/20 text-primary border-primary/40";

    if (gpsState.versionFilter === "red") {
      rateLabel = `${enc.rateRed}% (Red)`;
      barWidth = enc.rateRed;
      barColor = "bg-error";
      badgeClass = "bg-error-container/30 text-error border-error/40";
    } else if (gpsState.versionFilter === "blue") {
      rateLabel = `${enc.rateBlue}% (Blue)`;
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
        rateLabel = `Red: ${enc.rateRed}% / Blue: ${enc.rateBlue}%`;
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

    // Somente exibe tags de horário/estação se o jogo possuir a mecânica e o Pokémon tiver variação
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

        <!-- Barra de Probabilidade de Encontro -->
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

function selectArea(areaId) {
  gpsState.selectedAreaId = areaId;
  renderInteractiveMapNodes();
  renderAreaSelectorQuickList();
  renderSelectedAreaDetails();
}

function initGpsPage() {
  // Sidebar "Modos do GPS" (mesmo comportamento do menu lateral do PTR)
  const sidebarEl = document.getElementById("gps-modes-sidebar");
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  if (sidebarEl && btnToggleSidebar) {
    // Desktop: inicia aberta. Mobile: inicia fechada (abre por cima, como no PTR)
    if (window.matchMedia("(min-width: 1024px)").matches) {
      sidebarEl.classList.remove("collapsed");
      document.body.classList.remove("sidebar-closed");
    }
    btnToggleSidebar.addEventListener("click", () => {
      sidebarEl.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-closed");
    });
  }

  // Modos do GPS: Pesquisa de Pokémon (ativo) | Pesquisa de Itens (futuro, sem função por enquanto)
  document.getElementById("btn-gps-mode-items")?.addEventListener("click", () => {
    // Placeholder: função ainda não implementada
  });
  document.getElementById("btn-gps-mode-pokemon")?.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 1023px)").matches && sidebarEl) {
      sidebarEl.classList.add("collapsed");
      document.body.classList.add("sidebar-closed");
    }
  });

  // Game Selector
  const gameSelect = document.getElementById("gps-game-select");
  if (gameSelect) {
    gameSelect.addEventListener("change", e => {
      gpsState.gameId = e.target.value;
      renderSelectedAreaDetails();
    });
  }

  // Method Filter Select + Buttons
  const methodSelect = document.getElementById("gps-method-select");
  if (methodSelect) {
    methodSelect.addEventListener("change", e => {
      gpsState.methodFilter = e.target.value;
      renderInteractiveMapNodes();
      renderSelectedAreaDetails();
    });
  }

  document.querySelectorAll("[data-method-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      gpsState.methodFilter = btn.getAttribute("data-method-filter");
      document.querySelectorAll("[data-method-filter]").forEach(b => {
        const active = b.getAttribute("data-method-filter") === gpsState.methodFilter;
        b.className = active
          ? "px-2.5 py-1 rounded bg-primary-container text-on-primary-container font-label-md text-label-md font-bold flex items-center space-x-1 shadow-sm cursor-pointer"
          : "px-2 py-1 rounded bg-surface-container hover:bg-surface-container-high border border-outline-variant text-on-surface-variant font-label-md text-label-md flex items-center space-x-1 cursor-pointer";
      });
      renderInteractiveMapNodes();
      renderSelectedAreaDetails();
    });
  });

  // Version Filter Buttons
  document.querySelectorAll("[data-version-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      gpsState.versionFilter = btn.getAttribute("data-version-filter");
      document.querySelectorAll("[data-version-filter]").forEach(b => {
        const v = b.getAttribute("data-version-filter");
        const active = v === gpsState.versionFilter;
        if (!active) {
          b.className = "px-2.5 py-1 rounded font-label-sm text-label-sm font-medium text-on-surface-variant hover:text-primary transition-colors cursor-pointer";
        } else if (v === "red") {
          b.className = "px-2.5 py-1 rounded font-label-sm text-label-sm font-bold bg-error-container/40 text-error border border-error/50 cursor-pointer";
        } else if (v === "blue") {
          b.className = "px-2.5 py-1 rounded font-label-sm text-label-sm font-bold bg-primary-container/30 text-primary border border-primary/50 cursor-pointer";
        } else {
          b.className = "px-2.5 py-1 rounded font-label-sm text-label-sm font-bold bg-surface-container-high text-primary border border-primary/40 cursor-pointer";
        }
      });
      renderSelectedAreaDetails();
    });
  });

  // Search Input
  const searchInput = document.getElementById("gps-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", e => {
      gpsState.searchQuery = e.target.value;
      const q = gpsState.searchQuery.trim().toLowerCase();
      if (q) {
        const matchedArea = KANTO_GEN1_AREAS.find(
          a => a.name.toLowerCase().includes(q) || a.encounters.some(enc => enc.name.toLowerCase().includes(q))
        );
        if (matchedArea && matchedArea.id !== gpsState.selectedAreaId) {
          gpsState.selectedAreaId = matchedArea.id;
        }
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

  // Map Zoom & Pan Controls (Middle Mouse Button / Scroll Hold + Wheel Zoom)
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

    // Prevent browser auto-scroll icon when pressing middle mouse button (scroll wheel)
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

    // Optional smooth wheel zoom on the map
    mapViewport.addEventListener("wheel", e => {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      gpsState.zoom = Math.min(2.2, Math.max(0.65, +(gpsState.zoom + delta).toFixed(2)));
      applyMapTransform();
    }, { passive: false });
  }

  renderInteractiveMapNodes();
  renderAreaSelectorQuickList();
  renderSelectedAreaDetails();
}

document.addEventListener("DOMContentLoaded", initGpsPage);
