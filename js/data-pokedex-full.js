// ============================================================================
// POKÉDEX NACIONAL COMPLETA (#001 A #1025) PARA SELEÇÃO POR JOGO/GERAÇÃO
// Formato compacto: [dex, "Nome", ["tipo1", "tipo2"], isFinalEvo (1=Evoluído/Único, 0=Pré-evolução)]
// ============================================================================

window.POKE_DATA = window.POKE_DATA || {};

window.POKE_DATA.FULL_DEX_COMPACT = [
  // GEN 1 (#001 - #151)
  [1,"Bulbasaur",["grass","poison"],0],[2,"Ivysaur",["grass","poison"],0],[3,"Venusaur",["grass","poison"],1],
  [4,"Charmander",["fire"],0],[5,"Charmeleon",["fire"],0],[6,"Charizard",["fire","flying"],1],
  [7,"Squirtle",["water"],0],[8,"Wartortle",["water"],0],[9,"Blastoise",["water"],1],
  [10,"Caterpie",["bug"],0],[11,"Metapod",["bug"],0],[12,"Butterfree",["bug","flying"],1],
  [13,"Weedle",["bug","poison"],0],[14,"Kakuna",["bug","poison"],0],[15,"Beedrill",["bug","poison"],1],
  [16,"Pidgey",["normal","flying"],0],[17,"Pidgeotto",["normal","flying"],0],[18,"Pidgeot",["normal","flying"],1],
  [19,"Rattata",["normal"],0],[20,"Raticate",["normal"],1],[21,"Spearow",["normal","flying"],0],[22,"Fearow",["normal","flying"],1],
  [23,"Ekans",["poison"],0],[24,"Arbok",["poison"],1],[25,"Pikachu",["electric"],0],[26,"Raichu",["electric"],1],
  [27,"Sandshrew",["ground"],0],[28,"Sandslash",["ground"],1],[29,"Nidoran♀",["poison"],0],[30,"Nidorina",["poison"],0],
  [31,"Nidoqueen",["poison","ground"],1],[32,"Nidoran♂",["poison"],0],[33,"Nidorino",["poison"],0],[34,"Nidoking",["poison","ground"],1],
  [35,"Clefairy",["fairy"],0],[36,"Clefable",["fairy"],1],[37,"Vulpix",["fire"],0],[38,"Ninetales",["fire"],1],
  [39,"Jigglypuff",["normal","fairy"],0],[40,"Wigglytuff",["normal","fairy"],1],[41,"Zubat",["poison","flying"],0],[42,"Golbat",["poison","flying"],0],
  [43,"Oddish",["grass","poison"],0],[44,"Gloom",["grass","poison"],0],[45,"Vileplume",["grass","poison"],1],
  [46,"Paras",["bug","grass"],0],[47,"Parasect",["bug","grass"],1],[48,"Venonat",["bug","poison"],0],[49,"Venomoth",["bug","poison"],1],
  [50,"Diglett",["ground"],0],[51,"Dugtrio",["ground"],1],[52,"Meowth",["normal"],0],[53,"Persian",["normal"],1],
  [54,"Psyduck",["water"],0],[55,"Golduck",["water"],1],[56,"Mankey",["fighting"],0],[57,"Primeape",["fighting"],1],
  [58,"Growlithe",["fire"],0],[59,"Arcanine",["fire"],1],[60,"Poliwag",["water"],0],[61,"Poliwhirl",["water"],0],[62,"Poliwrath",["water","fighting"],1],
  [63,"Abra",["psychic"],0],[64,"Kadabra",["psychic"],0],[65,"Alakazam",["psychic"],1],
  [66,"Machop",["fighting"],0],[67,"Machoke",["fighting"],0],[68,"Machamp",["fighting"],1],
  [69,"Bellsprout",["grass","poison"],0],[70,"Weepinbell",["grass","poison"],0],[71,"Victreebel",["grass","poison"],1],
  [72,"Tentacool",["water","poison"],0],[73,"Tentacruel",["water","poison"],1],
  [74,"Geodude",["rock","ground"],0],[75,"Graveler",["rock","ground"],0],[76,"Golem",["rock","ground"],1],
  [77,"Ponyta",["fire"],0],[78,"Rapidash",["fire"],1],[79,"Slowpoke",["water","psychic"],0],[80,"Slowbro",["water","psychic"],1],
  [81,"Magnemite",["electric","steel"],0],[82,"Magneton",["electric","steel"],1],[83,"Farfetch'd",["normal","flying"],1],
  [84,"Doduo",["normal","flying"],0],[85,"Dodrio",["normal","flying"],1],[86,"Seel",["water"],0],[87,"Dewgong",["water","ice"],1],
  [88,"Grimer",["poison"],0],[89,"Muk",["poison"],1],[90,"Shellder",["water"],0],[91,"Cloyster",["water","ice"],1],
  [92,"Gastly",["ghost","poison"],0],[93,"Haunter",["ghost","poison"],0],[94,"Gengar",["ghost","poison"],1],
  [95,"Onix",["rock","ground"],0],[96,"Drowzee",["psychic"],0],[97,"Hypno",["psychic"],1],
  [98,"Krabby",["water"],0],[99,"Kingler",["water"],1],[100,"Voltorb",["electric"],0],[101,"Electrode",["electric"],1],
  [102,"Exeggcute",["grass","psychic"],0],[103,"Exeggutor",["grass","psychic"],1],[104,"Cubone",["ground"],0],[105,"Marowak",["ground"],1],
  [106,"Hitmonlee",["fighting"],1],[107,"Hitmonchan",["fighting"],1],[108,"Lickitung",["normal"],0],
  [109,"Koffing",["poison"],0],[110,"Weezing",["poison"],1],[111,"Rhyhorn",["ground","rock"],0],[112,"Rhydon",["ground","rock"],1],
  [113,"Chansey",["normal"],1],[114,"Tangela",["grass"],0],[115,"Kangaskhan",["normal"],1],
  [116,"Horsea",["water"],0],[117,"Seadra",["water"],0],[118,"Goldeen",["water"],0],[119,"Seaking",["water"],1],
  [120,"Staryu",["water"],0],[121,"Starmie",["water","psychic"],1],[122,"Mr. Mime",["psychic","fairy"],1],
  [123,"Scyther",["bug","flying"],1],[124,"Jynx",["ice","psychic"],1],[125,"Electabuzz",["electric"],1],[126,"Magmar",["fire"],1],
  [127,"Pinsir",["bug"],1],[128,"Tauros",["normal"],1],[129,"Magikarp",["water"],0],[130,"Gyarados",["water","flying"],1],
  [131,"Lapras",["water","ice"],1],[132,"Ditto",["normal"],1],[133,"Eevee",["normal"],0],
  [134,"Vaporeon",["water"],1],[135,"Jolteon",["electric"],1],[136,"Flareon",["fire"],1],
  [137,"Porygon",["normal"],0],[138,"Omanyte",["rock","water"],0],[139,"Omastar",["rock","water"],1],
  [140,"Kabuto",["rock","water"],0],[141,"Kabutops",["rock","water"],1],[142,"Aerodactyl",["rock","flying"],1],
  [143,"Snorlax",["normal"],1],[144,"Articuno",["ice","flying"],1],[145,"Zapdos",["electric","flying"],1],[146,"Moltres",["fire","flying"],1],
  [147,"Dratini",["dragon"],0],[148,"Dragonair",["dragon"],0],[149,"Dragonite",["dragon","flying"],1],
  [150,"Mewtwo",["psychic"],1],[151,"Mew",["psychic"],1],

  // GEN 2 (#152 - #251)
  [152,"Chikorita",["grass"],0],[153,"Bayleef",["grass"],0],[154,"Meganium",["grass"],1],
  [155,"Cyndaquil",["fire"],0],[156,"Quilava",["fire"],0],[157,"Typhlosion",["fire"],1],
  [158,"Totodile",["water"],0],[159,"Croconaw",["water"],0],[160,"Feraligatr",["water"],1],
  [161,"Sentret",["normal"],0],[162,"Furret",["normal"],1],[163,"Hoothoot",["normal","flying"],0],[164,"Noctowl",["normal","flying"],1],
  [165,"Ledyba",["bug","flying"],0],[166,"Ledian",["bug","flying"],1],[167,"Spinarak",["bug","poison"],0],[168,"Ariados",["bug","poison"],1],
  [169,"Crobat",["poison","flying"],1],[170,"Chinchou",["water","electric"],0],[171,"Lanturn",["water","electric"],1],
  [172,"Pichu",["electric"],0],[173,"Cleffa",["fairy"],0],[174,"Igglybuff",["normal","fairy"],0],
  [175,"Togepi",["fairy"],0],[176,"Togetic",["fairy","flying"],0],[177,"Natu",["psychic","flying"],0],[178,"Xatu",["psychic","flying"],1],
  [179,"Mareep",["electric"],0],[180,"Flaaffy",["electric"],0],[181,"Ampharos",["electric"],1],
  [182,"Bellossom",["grass"],1],[183,"Marill",["water","fairy"],0],[184,"Azumarill",["water","fairy"],1],
  [185,"Sudowoodo",["rock"],1],[186,"Politoed",["water"],1],[187,"Hoppip",["grass","flying"],0],[188,"Skiploom",["grass","flying"],0],[189,"Jumpluff",["grass","flying"],1],
  [190,"Aipom",["normal"],0],[191,"Sunkern",["grass"],0],[192,"Sunflora",["grass"],1],[193,"Yanma",["bug","flying"],0],
  [194,"Wooper",["water","ground"],0],[195,"Quagsire",["water","ground"],1],[196,"Espeon",["psychic"],1],[197,"Umbreon",["dark"],1],
  [198,"Murkrow",["dark","flying"],0],[199,"Slowking",["water","psychic"],1],[200,"Misdreavus",["ghost"],0],[201,"Unown",["psychic"],1],
  [202,"Wobbuffet",["psychic"],1],[203,"Girafarig",["normal","psychic"],1],[204,"Pineco",["bug"],0],[205,"Forretress",["bug","steel"],1],
  [206,"Dunsparce",["normal"],1],[207,"Gligar",["ground","flying"],0],[208,"Steelix",["steel","ground"],1],
  [209,"Snubbull",["fairy"],0],[210,"Granbull",["fairy"],1],[211,"Qwilfish",["water","poison"],1],
  [212,"Scizor",["bug","steel"],1],[213,"Shuckle",["bug","rock"],1],[214,"Heracross",["bug","fighting"],1],
  [215,"Sneasel",["dark","ice"],0],[216,"Teddiursa",["normal"],0],[217,"Ursaring",["normal"],1],
  [218,"Slugma",["fire"],0],[219,"Magcargo",["fire","rock"],1],[220,"Swinub",["ice","ground"],0],[221,"Piloswine",["ice","ground"],0],
  [222,"Corsola",["water","rock"],1],[223,"Remoraid",["water"],0],[224,"Octillery",["water"],1],
  [225,"Delibird",["ice","flying"],1],[226,"Mantine",["water","flying"],1],[227,"Skarmory",["steel","flying"],1],
  [228,"Houndour",["dark","fire"],0],[229,"Houndoom",["dark","fire"],1],[230,"Kingdra",["water","dragon"],1],
  [231,"Phanpy",["ground"],0],[232,"Donphan",["ground"],1],[233,"Porygon2",["normal"],1],[234,"Stantler",["normal"],1],[235,"Smeargle",["normal"],1],
  [236,"Tyrogue",["fighting"],0],[237,"Hitmontop",["fighting"],1],[238,"Smoochum",["ice","psychic"],0],[239,"Elekid",["electric"],0],[240,"Magby",["fire"],0],
  [241,"Miltank",["normal"],1],[242,"Blissey",["normal"],1],[243,"Raikou",["electric"],1],[244,"Entei",["fire"],1],[245,"Suicune",["water"],1],
  [246,"Larvitar",["rock","ground"],0],[247,"Pupitar",["rock","ground"],0],[248,"Tyranitar",["rock","dark"],1],
  [249,"Lugia",["psychic","flying"],1],[250,"Ho-Oh",["fire","flying"],1],[251,"Celebi",["psychic","grass"],1],

  // GEN 3 (#252 - #386)
  [252,"Treecko",["grass"],0],[253,"Grovyle",["grass"],0],[254,"Sceptile",["grass"],1],
  [255,"Torchic",["fire"],0],[256,"Combusken",["fire","fighting"],0],[257,"Blaziken",["fire","fighting"],1],
  [258,"Mudkip",["water"],0],[259,"Marshtomp",["water","ground"],0],[260,"Swampert",["water","ground"],1],
  [261,"Poochyena",["dark"],0],[262,"Mightyena",["dark"],1],[263,"Zigzagoon",["normal"],0],[264,"Linoone",["normal"],1],
  [265,"Wurmple",["bug"],0],[266,"Silcoon",["bug"],0],[267,"Beautifly",["bug","flying"],1],[268,"Cascoon",["bug"],0],[269,"Dustox",["bug","poison"],1],
  [270,"Lotad",["water","grass"],0],[271,"Lombre",["water","grass"],0],[272,"Ludicolo",["water","grass"],1],
  [273,"Seedot",["grass"],0],[274,"Nuzleaf",["grass","dark"],0],[275,"Shiftry",["grass","dark"],1],
  [276,"Taillow",["normal","flying"],0],[277,"Swellow",["normal","flying"],1],[278,"Wingull",["water","flying"],0],[279,"Pelipper",["water","flying"],1],
  [280,"Ralts",["psychic","fairy"],0],[281,"Kirlia",["psychic","fairy"],0],[282,"Gardevoir",["psychic","fairy"],1],
  [283,"Surskit",["bug","water"],0],[284,"Masquerain",["bug","flying"],1],[285,"Shroomish",["grass"],0],[286,"Breloom",["grass","fighting"],1],
  [287,"Slakoth",["normal"],0],[288,"Vigoroth",["normal"],0],[289,"Slaking",["normal"],1],
  [290,"Nincada",["bug","ground"],0],[291,"Ninjask",["bug","flying"],1],[292,"Shedinja",["bug","ghost"],1],
  [293,"Whismur",["normal"],0],[294,"Loudred",["normal"],0],[295,"Exploud",["normal"],1],
  [296,"Makuhita",["fighting"],0],[297,"Hariyama",["fighting"],1],[298,"Azurill",["normal","fairy"],0],[299,"Nosepass",["rock"],0],
  [300,"Skitty",["normal"],0],[301,"Delcatty",["normal"],1],[302,"Sableye",["dark","ghost"],1],[303,"Mawile",["steel","fairy"],1],
  [304,"Aron",["steel","rock"],0],[305,"Lairon",["steel","rock"],0],[306,"Aggron",["steel","rock"],1],
  [307,"Meditite",["fighting","psychic"],0],[308,"Medicham",["fighting","psychic"],1],
  [309,"Electrike",["electric"],0],[310,"Manectric",["electric"],1],[311,"Plusle",["electric"],1],[312,"Minun",["electric"],1],
  [313,"Volbeat",["bug"],1],[314,"Illumise",["bug"],1],[315,"Roselia",["grass","poison"],0],
  [316,"Gulpin",["poison"],0],[317,"Swalot",["poison"],1],[318,"Carvanha",["water","dark"],0],[319,"Sharpedo",["water","dark"],1],
  [320,"Wailmer",["water"],0],[321,"Wailord",["water"],1],[322,"Numel",["fire","ground"],0],[323,"Camerupt",["fire","ground"],1],
  [324,"Torkoal",["fire"],1],[325,"Spoink",["psychic"],0],[326,"Grumpig",["psychic"],1],[327,"Spinda",["normal"],1],
  [328,"Trapinch",["ground"],0],[329,"Vibrava",["ground","dragon"],0],[330,"Flygon",["ground","dragon"],1],
  [331,"Cacnea",["grass"],0],[332,"Cacturne",["grass","dark"],1],[333,"Swablu",["normal","flying"],0],[334,"Altaria",["dragon","flying"],1],
  [335,"Zangoose",["normal"],1],[336,"Seviper",["poison"],1],[337,"Lunatone",["rock","psychic"],1],[338,"Solrock",["rock","psychic"],1],
  [339,"Barboach",["water","ground"],0],[340,"Whiscash",["water","ground"],1],[341,"Corphish",["water"],0],[342,"Crawdaunt",["water","dark"],1],
  [343,"Baltoy",["ground","psychic"],0],[344,"Claydol",["ground","psychic"],1],[345,"Lileep",["rock","grass"],0],[346,"Cradily",["rock","grass"],1],
  [347,"Anorith",["rock","bug"],0],[348,"Armaldo",["rock","bug"],1],[349,"Feebas",["water"],0],[350,"Milotic",["water"],1],
  [351,"Castform",["normal"],1],[352,"Kecleon",["normal"],1],[353,"Shuppet",["ghost"],0],[354,"Banette",["ghost"],1],
  [355,"Duskull",["ghost"],0],[356,"Dusclops",["ghost"],0],[357,"Tropius",["grass","flying"],1],[358,"Chimecho",["psychic"],1],
  [359,"Absol",["dark"],1],[360,"Wynaut",["psychic"],0],[361,"Snorunt",["ice"],0],[362,"Glalie",["ice"],1],
  [363,"Spheal",["ice","water"],0],[364,"Sealeo",["ice","water"],0],[365,"Walrein",["ice","water"],1],
  [366,"Clamperl",["water"],0],[367,"Huntail",["water"],1],[368,"Gorebyss",["water"],1],[369,"Relicanth",["water","rock"],1],[370,"Luvdisc",["water"],1],
  [371,"Bagon",["dragon"],0],[372,"Shelgon",["dragon"],0],[373,"Salamence",["dragon","flying"],1],
  [374,"Beldum",["steel","psychic"],0],[375,"Metang",["steel","psychic"],0],[376,"Metagross",["steel","psychic"],1],
  [377,"Regirock",["rock"],1],[378,"Regice",["ice"],1],[379,"Registeel",["steel"],1],
  [380,"Latias",["dragon","psychic"],1],[381,"Latios",["dragon","psychic"],1],
  [382,"Kyogre",["water"],1],[383,"Groudon",["ground"],1],[384,"Rayquaza",["dragon","flying"],1],
  [385,"Jirachi",["steel","psychic"],1],[386,"Deoxys",["psychic"],1],

  // GEN 4 (#387 - #493)
  [387,"Turtwig",["grass"],0],[388,"Grotle",["grass"],0],[389,"Torterra",["grass","ground"],1],
  [390,"Chimchar",["fire"],0],[391,"Monferno",["fire","fighting"],0],[392,"Infernape",["fire","fighting"],1],
  [393,"Piplup",["water"],0],[394,"Prinplup",["water"],0],[395,"Empoleon",["water","steel"],1],
  [396,"Starly",["normal","flying"],0],[397,"Staravia",["normal","flying"],0],[398,"Staraptor",["normal","flying"],1],
  [399,"Bidoof",["normal"],0],[400,"Bibarel",["normal","water"],1],[401,"Kricketot",["bug"],0],[402,"Kricketune",["bug"],1],
  [403,"Shinx",["electric"],0],[404,"Luxio",["electric"],0],[405,"Luxray",["electric"],1],
  [406,"Budew",["grass","poison"],0],[407,"Roserade",["grass","poison"],1],[408,"Cranidos",["rock"],0],[409,"Rampardos",["rock"],1],
  [410,"Shieldon",["rock","steel"],0],[411,"Bastiodon",["rock","steel"],1],[412,"Burmy",["bug"],0],[413,"Wormadam",["bug","grass"],1],[414,"Mothim",["bug","flying"],1],
  [415,"Combee",["bug","flying"],0],[416,"Vespiquen",["bug","flying"],1],[417,"Pachirisu",["electric"],1],
  [418,"Buizel",["water"],0],[419,"Floatzel",["water"],1],[420,"Cherubi",["grass"],0],[421,"Cherrim",["grass"],1],
  [422,"Shellos",["water"],0],[423,"Gastrodon",["water","ground"],1],[424,"Ambipom",["normal"],1],
  [425,"Drifloon",["ghost","flying"],0],[426,"Drifblim",["ghost","flying"],1],[427,"Buneary",["normal"],0],[428,"Lopunny",["normal"],1],
  [429,"Mismagius",["ghost"],1],[430,"Honchkrow",["dark","flying"],1],[431,"Glameow",["normal"],0],[432,"Purugly",["normal"],1],
  [433,"Chingling",["psychic"],0],[434,"Stunky",["poison","dark"],0],[435,"Skuntank",["poison","dark"],1],
  [436,"Bronzor",["steel","psychic"],0],[437,"Bronzong",["steel","psychic"],1],[438,"Bonsly",["rock"],0],[439,"Mime Jr.",["psychic","fairy"],0],[440,"Happiny",["normal"],0],
  [441,"Chatot",["normal","flying"],1],[442,"Spiritomb",["ghost","dark"],1],
  [443,"Gible",["dragon","ground"],0],[444,"Gabite",["dragon","ground"],0],[445,"Garchomp",["dragon","ground"],1],
  [446,"Munchlax",["normal"],0],[447,"Riolu",["fighting"],0],[448,"Lucario",["fighting","steel"],1],
  [449,"Hippopotas",["ground"],0],[450,"Hippowdon",["ground"],1],[451,"Skorupi",["poison","bug"],0],[452,"Drapion",["poison","dark"],1],
  [453,"Croagunk",["poison","fighting"],0],[454,"Toxicroak",["poison","fighting"],1],[455,"Carnivine",["grass"],1],
  [456,"Finneon",["water"],0],[457,"Lumineon",["water"],1],[458,"Mantyke",["water","flying"],0],
  [459,"Snover",["grass","ice"],0],[460,"Abomasnow",["grass","ice"],1],[461,"Weavile",["dark","ice"],1],
  [462,"Magnezone",["electric","steel"],1],[463,"Lickilicky",["normal"],1],[464,"Rhyperior",["ground","rock"],1],
  [465,"Tangrowth",["grass"],1],[466,"Electivire",["electric"],1],[467,"Magmortar",["fire"],1],
  [468,"Togekiss",["fairy","flying"],1],[469,"Yanmega",["bug","flying"],1],[470,"Leafeon",["grass"],1],[471,"Glaceon",["ice"],1],
  [472,"Gliscor",["ground","flying"],1],[473,"Mamoswine",["ice","ground"],1],[474,"Porygon-Z",["normal"],1],
  [475,"Gallade",["psychic","fighting"],1],[476,"Probopass",["rock","steel"],1],[477,"Dusknoir",["ghost"],1],[478,"Froslass",["ice","ghost"],1],
  [479,"Rotom",["electric","ghost"],1],[480,"Uxie",["psychic"],1],[481,"Mesprit",["psychic"],1],[482,"Azelf",["psychic"],1],
  [483,"Dialga",["steel","dragon"],1],[484,"Palkia",["water","dragon"],1],[485,"Heatran",["fire","steel"],1],[486,"Regigigas",["normal"],1],
  [487,"Giratina",["ghost","dragon"],1],[488,"Cresselia",["psychic"],1],[489,"Phione",["water"],0],[490,"Manaphy",["water"],1],
  [491,"Darkrai",["dark"],1],[492,"Shaymin",["grass"],1],[493,"Arceus",["normal"],1],

  // GEN 5 (#494 - #649)
  [494,"Victini",["psychic","fire"],1],[495,"Snivy",["grass"],0],[496,"Servine",["grass"],0],[497,"Serperior",["grass"],1],
  [498,"Tepig",["fire"],0],[499,"Pignite",["fire","fighting"],0],[500,"Emboar",["fire","fighting"],1],
  [501,"Oshawott",["water"],0],[502,"Dewott",["water"],0],[503,"Samurott",["water"],1],
  [504,"Patrat",["normal"],0],[505,"Watchog",["normal"],1],[506,"Lillipup",["normal"],0],[507,"Herdier",["normal"],0],[508,"Stoutland",["normal"],1],
  [509,"Purrloin",["dark"],0],[510,"Liepard",["dark"],1],[511,"Pansage",["grass"],0],[512,"Simisage",["grass"],1],
  [513,"Pansear",["fire"],0],[514,"Simisear",["fire"],1],[515,"Panpour",["water"],0],[516,"Simipour",["water"],1],
  [517,"Munna",["psychic"],0],[518,"Musharna",["psychic"],1],[519,"Pidove",["normal","flying"],0],[520,"Tranquill",["normal","flying"],0],[521,"Unfezant",["normal","flying"],1],
  [522,"Blitzle",["electric"],0],[523,"Zebstrika",["electric"],1],[524,"Roggenrola",["rock"],0],[525,"Boldore",["rock"],0],[526,"Gigalith",["rock"],1],
  [527,"Woobat",["psychic","flying"],0],[528,"Swoobat",["psychic","flying"],1],[529,"Drilbur",["ground"],0],[530,"Excadrill",["ground","steel"],1],
  [531,"Audino",["normal"],1],[532,"Timburr",["fighting"],0],[533,"Gurdurr",["fighting"],0],[534,"Conkeldurr",["fighting"],1],
  [535,"Tympole",["water"],0],[536,"Palpitoad",["water","ground"],0],[537,"Seismitoad",["water","ground"],1],
  [538,"Throh",["fighting"],1],[539,"Sawk",["fighting"],1],[540,"Sewaddle",["bug","grass"],0],[541,"Swadloon",["bug","grass"],0],[542,"Leavanny",["bug","grass"],1],
  [543,"Venipede",["bug","poison"],0],[544,"Whirlipede",["bug","poison"],0],[545,"Scolipede",["bug","poison"],1],
  [546,"Cottonee",["grass","fairy"],0],[547,"Whimsicott",["grass","fairy"],1],[548,"Petilil",["grass"],0],[549,"Lilligant",["grass"],1],
  [550,"Basculin",["water"],1],[551,"Sandile",["ground","dark"],0],[552,"Krokorok",["ground","dark"],0],[553,"Krookodile",["ground","dark"],1],
  [554,"Darumaka",["fire"],0],[555,"Darmanitan",["fire"],1],[556,"Maractus",["grass"],1],
  [557,"Dwebble",["bug","rock"],0],[558,"Crustle",["bug","rock"],1],[559,"Scraggy",["dark","fighting"],0],[560,"Scrafty",["dark","fighting"],1],
  [561,"Sigilyph",["psychic","flying"],1],[562,"Yamask",["ghost"],0],[563,"Cofagrigus",["ghost"],1],
  [564,"Tirtouga",["water","rock"],0],[565,"Carracosta",["water","rock"],1],[566,"Archen",["rock","flying"],0],[567,"Archeops",["rock","flying"],1],
  [568,"Trubbish",["poison"],0],[569,"Garbodor",["poison"],1],[570,"Zorua",["dark"],0],[571,"Zoroark",["dark"],1],
  [572,"Minccino",["normal"],0],[573,"Cinccino",["normal"],1],[574,"Gothita",["psychic"],0],[575,"Gothorita",["psychic"],0],[576,"Gothitelle",["psychic"],1],
  [577,"Solosis",["psychic"],0],[578,"Duosion",["psychic"],0],[579,"Reuniclus",["psychic"],1],
  [580,"Ducklett",["water","flying"],0],[581,"Swanna",["water","flying"],1],[582,"Vanillite",["ice"],0],[583,"Vanillish",["ice"],0],[584,"Vanilluxe",["ice"],1],
  [585,"Deerling",["normal","grass"],0],[586,"Sawsbuck",["normal","grass"],1],[587,"Emolga",["electric","flying"],1],
  [588,"Karrablast",["bug"],0],[589,"Escavalier",["bug","steel"],1],[590,"Foongus",["grass","poison"],0],[591,"Amoonguss",["grass","poison"],1],
  [592,"Frillish",["water","ghost"],0],[593,"Jellicent",["water","ghost"],1],[594,"Alomomola",["water"],1],
  [595,"Joltik",["bug","electric"],0],[596,"Galvantula",["bug","electric"],1],[597,"Ferroseed",["grass","steel"],0],[598,"Ferrothorn",["grass","steel"],1],
  [599,"Klink",["steel"],0],[600,"Klang",["steel"],0],[601,"Klinklang",["steel"],1],
  [602,"Tynamo",["electric"],0],[603,"Eelektrik",["electric"],0],[604,"Eelektross",["electric"],1],
  [605,"Elgyem",["psychic"],0],[606,"Beheeyem",["psychic"],1],[607,"Litwick",["ghost","fire"],0],[608,"Lampent",["ghost","fire"],0],[609,"Chandelure",["ghost","fire"],1],
  [610,"Axew",["dragon"],0],[611,"Fraxure",["dragon"],0],[612,"Haxorus",["dragon"],1],
  [613,"Cubchoo",["ice"],0],[614,"Beartic",["ice"],1],[615,"Cryogonal",["ice"],1],[616,"Shelmet",["bug"],0],[617,"Accelgor",["bug"],1],
  [618,"Stunfisk",["ground","electric"],1],[619,"Mienfoo",["fighting"],0],[620,"Mienshao",["fighting"],1],[621,"Druddigon",["dragon"],1],
  [622,"Golett",["ground","ghost"],0],[623,"Golurk",["ground","ghost"],1],[624,"Pawniard",["dark","steel"],0],[625,"Bisharp",["dark","steel"],1],
  [626,"Bouffalant",["normal"],1],[627,"Rufflet",["normal","flying"],0],[628,"Braviary",["normal","flying"],1],
  [629,"Vullaby",["dark","flying"],0],[630,"Mandibuzz",["dark","flying"],1],[631,"Heatmor",["fire"],1],[632," Durant",["bug","steel"],1],
  [633,"Deino",["dark","dragon"],0],[634,"Zweilous",["dark","dragon"],0],[635,"Hydreigon",["dark","dragon"],1],
  [636,"Larvesta",["bug","fire"],0],[637,"Volcarona",["bug","fire"],1],
  [638,"Cobalion",["steel","fighting"],1],[639,"Terrakion",["rock","fighting"],1],[640,"Virizion",["grass","fighting"],1],
  [641,"Tornadus",["flying"],1],[642,"Thundurus",["electric","flying"],1],[643,"Reshiram",["dragon","fire"],1],[644,"Zekrom",["dragon","electric"],1],
  [645,"Landorus",["ground","flying"],1],[646,"Kyurem",["dragon","ice"],1],[647,"Keldeo",["water","fighting"],1],[648,"Meloetta",["normal","psychic"],1],[649,"Genesect",["bug","steel"],1],

  // GEN 6 (#650 - #721)
  [650,"Chespin",["grass"],0],[651,"Quilladin",["grass"],0],[652,"Chesnaught",["grass","fighting"],1],
  [653,"Fennekin",["fire"],0],[654,"Braixen",["fire"],0],[655,"Delphox",["fire","psychic"],1],
  [656,"Froakie",["water"],0],[657,"Frogadier",["water"],0],[658,"Greninja",["water","dark"],1],
  [659,"Bunnelby",["normal"],0],[660,"Diggersby",["normal","ground"],1],[661,"Fletchling",["normal","flying"],0],[662,"Fletchinder",["fire","flying"],0],[663,"Talonflame",["fire","flying"],1],
  [664,"Scatterbug",["bug"],0],[665,"Spewpa",["bug"],0],[666,"Vivillon",["bug","flying"],1],[667,"Litleo",["fire","normal"],0],[668,"Pyroar",["fire","normal"],1],
  [669,"Flabébé",["fairy"],0],[670,"Floette",["fairy"],0],[671,"Florges",["fairy"],1],[672,"Skiddo",["grass"],0],[673,"Gogoat",["grass"],1],
  [674,"Pancham",["fighting"],0],[675,"Pangoro",["fighting","dark"],1],[676,"Furfrou",["normal"],1],[677,"Espurr",["psychic"],0],[678,"Meowstic",["psychic"],1],
  [679,"Honedge",["steel","ghost"],0],[680,"Doublade",["steel","ghost"],0],[681,"Aegislash",["steel","ghost"],1],
  [682,"Spritzee",["fairy"],0],[683,"Aromatisse",["fairy"],1],[684,"Swirlix",["fairy"],0],[685,"Slurpuff",["fairy"],1],
  [686,"Inkay",["dark","psychic"],0],[687,"Malamar",["dark","psychic"],1],[688,"Binacle",["rock","water"],0],[689,"Barbaracle",["rock","water"],1],
  [690,"Skrelp",["poison","water"],0],[691,"Dragalge",["poison","dragon"],1],[692,"Clauncher",["water"],0],[693,"Clawitzer",["water"],1],
  [694,"Helioptile",["electric","normal"],0],[695,"Heliolisk",["electric","normal"],1],[696,"Tyrunt",["rock","dragon"],0],[697,"Tyrantrum",["rock","dragon"],1],
  [698,"Amaura",["rock","ice"],0],[699,"Aurorus",["rock","ice"],1],[700,"Sylveon",["fairy"],1],[701,"Hawlucha",["fighting","flying"],1],
  [702,"Dedenne",["electric","fairy"],1],[703,"Carbink",["rock","fairy"],1],[704,"Goomy",["dragon"],0],[705,"Sliggoo",["dragon"],0],[706,"Goodra",["dragon"],1],
  [707,"Klefki",["steel","fairy"],1],[708,"Phantump",["ghost","grass"],0],[709,"Trevenant",["ghost","grass"],1],
  [710,"Pumpkaboo",["ghost","grass"],0],[711,"Gourgeist",["ghost","grass"],1],[712,"Bergmite",["ice"],0],[713,"Avalugg",["ice"],1],
  [714,"Noibat",["flying","dragon"],0],[715,"Noivern",["flying","dragon"],1],
  [716,"Xerneas",["fairy"],1],[717,"Yveltal",["dark","flying"],1],[718,"Zygarde",["dragon","ground"],1],[719,"Diancie",["rock","fairy"],1],[720,"Hoopa",["psychic","ghost"],1],[721,"Volcanion",["fire","water"],1],

  // GEN 7 (#722 - #809)
  [722,"Rowlet",["grass","flying"],0],[723,"Dartrix",["grass","flying"],0],[724,"Decidueye",["grass","ghost"],1],
  [725,"Litten",["fire"],0],[726,"Torracat",["fire"],0],[727,"Incineroar",["fire","dark"],1],
  [728,"Popplio",["water"],0],[729,"Brionne",["water"],0],[730,"Primarina",["water","fairy"],1],
  [731,"Pikipek",["normal","flying"],0],[732,"Trumbeak",["normal","flying"],0],[733,"Toucannon",["normal","flying"],1],
  [734,"Yungoos",["normal"],0],[735,"Gumshoos",["normal"],1],[736,"Grubbin",["bug"],0],[737,"Charjabug",["bug","electric"],0],[738,"Vikavolt",["bug","electric"],1],
  [739,"Crabrawler",["fighting"],0],[740,"Crabominable",["fighting","ice"],1],[741,"Oricorio",["fire","flying"],1],
  [742,"Cutiefly",["bug","fairy"],0],[743,"Ribombee",["bug","fairy"],1],[744,"Rockruff",["rock"],0],[745,"Lycanroc",["rock"],1],
  [746,"Wishiwashi",["water"],1],[747,"Mareanie",["poison","water"],0],[748,"Toxapex",["poison","water"],1],
  [749,"Mudbray",["ground"],0],[750,"Mudsdale",["ground"],1],[751,"Dewpider",["water","bug"],0],[752,"Araquanid",["water","bug"],1],
  [753,"Fomantis",["grass"],0],[754,"Lurantis",["grass"],1],[755,"Morelull",["grass","fairy"],0],[756,"Shiinotic",["grass","fairy"],1],
  [757,"Salandit",["poison","fire"],0],[758,"Salazzle",["poison","fire"],1],[759,"Stufful",["normal","fighting"],0],[760,"Bewear",["normal","fighting"],1],
  [761,"Bounsweet",["grass"],0],[762,"Steenee",["grass"],0],[763,"Tsareena",["grass"],1],[764,"Comfey",["fairy"],1],
  [765,"Oranguru",["normal","psychic"],1],[766,"Passimian",["fighting"],1],[767,"Wimpod",["bug","water"],0],[768,"Golisopod",["bug","water"],1],
  [769,"Sandygast",["ghost","ground"],0],[770,"Palossand",["ghost","ground"],1],[771,"Pyukumuku",["water"],1],
  [772,"Type: Null",["normal"],0],[773,"Silvally",["normal"],1],[774,"Minior",["rock","flying"],1],[775,"Komala",["normal"],1],
  [776,"Turtonator",["fire","dragon"],1],[777,"Togedemaru",["electric","steel"],1],[778,"Mimikyu",["ghost","fairy"],1],[779,"Bruxish",["water","psychic"],1],[780,"Drampa",["normal","dragon"],1],[781,"Dhelmise",["ghost","grass"],1],
  [782,"Jangmo-o",["dragon"],0],[783,"Hakamo-o",["dragon","fighting"],0],[784,"Kommo-o",["dragon","fighting"],1],
  [785,"Tapu Koko",["electric","fairy"],1],[786,"Tapu Lele",["psychic","fairy"],1],[787,"Tapu Bulu",["grass","fairy"],1],[788,"Tapu Fini",["water","fairy"],1],
  [789,"Cosmog",["psychic"],0],[790," Cosmoem",["psychic"],0],[791,"Solgaleo",["psychic","steel"],1],[792,"Lunala",["psychic","ghost"],1],
  [793,"Nihilego",["rock","poison"],1],[794,"Buzzwole",["bug","fighting"],1],[795,"Pheromosa",["bug","fighting"],1],[796,"Xurkitree",["electric"],1],
  [797,"Celesteela",["steel","flying"],1],[798,"Kartana",["grass","steel"],1],[799,"Guzzlord",["dark","dragon"],1],[800,"Necrozma",["psychic"],1],
  [801,"Magearna",["steel","fairy"],1],[802,"Marshadow",["fighting","ghost"],1],[803,"Poipole",["poison"],0],[804,"Naganadel",["poison","dragon"],1],
  [805,"Stakataka",["rock","steel"],1],[806,"Blacephalon",["fire","ghost"],1],[807,"Zeraora",["electric"],1],[808,"Meltan",["steel"],0],[809,"Melmetal",["steel"],1],

  // GEN 8 (#810 - #905)
  [810,"Grookey",["grass"],0],[811,"Thwackey",["grass"],0],[812,"Rillaboom",["grass"],1],
  [813,"Scorbunny",["fire"],0],[814,"Raboot",["fire"],0],[815,"Cinderace",["fire"],1],
  [816,"Sobble",["water"],0],[817,"Drizzile",["water"],0],[818,"Inteleon",["water"],1],
  [819,"Skwovet",["normal"],0],[820,"Greedent",["normal"],1],[821,"Rookidee",["flying"],0],[822,"Corvisquire",["flying"],0],[823,"Corviknight",["flying","steel"],1],
  [824,"Blipbug",["bug"],0],[825,"Dottler",["bug","psychic"],0],[826,"Orbeetle",["bug","psychic"],1],
  [827,"Nickit",["dark"],0],[828,"Thievul",["dark"],1],[829,"Gossifleur",["grass"],0],[830,"Eldegoss",["grass"],1],
  [831,"Wooloo",["normal"],0],[832,"Dubwool",["normal"],1],[833,"Chewtle",["water"],0],[834,"Drednaw",["water","rock"],1],
  [835,"Yamper",["electric"],0],[836,"Boltund",["electric"],1],[837,"Rolycoly",["rock"],0],[838,"Carkol",["rock","fire"],0],[839,"Coalossal",["rock","fire"],1],
  [840,"Applin",["grass","dragon"],0],[841,"Flapple",["grass","dragon"],1],[842,"Appletun",["grass","dragon"],1],
  [843,"Silicobra",["ground"],0],[844,"Sandaconda",["ground"],1],[845,"Cramorant",["flying","water"],1],
  [846,"Arrokuda",["water"],0],[847,"Barraskewda",["water"],1],[848,"Toxel",["electric","poison"],0],[849,"Toxtricity",["electric","poison"],1],
  [850,"Sizzlipede",["fire","bug"],0],[851,"Centiskorch",["fire","bug"],1],[852,"Clobbopus",["fighting"],0],[853,"Grapploct",["fighting"],1],
  [854,"Sinistea",["ghost"],0],[855,"Polteageist",["ghost"],1],[856,"Hatenna",["psychic"],0],[857,"Hattrem",["psychic"],0],[858,"Hatterene",["psychic","fairy"],1],
  [859,"Impidimp",["dark","fairy"],0],[860,"Morgrem",["dark","fairy"],0],[861,"Grimmsnarl",["dark","fairy"],1],
  [862,"Obstagoon",["dark","normal"],1],[863,"Perrserker",["steel"],1],[864,"Cursola",["ghost"],1],[865,"Sirfetch'd",["fighting"],1],[866,"Mr. Rime",["ice","psychic"],1],[867,"Runerigus",["ground","ghost"],1],
  [868,"Milcery",["fairy"],0],[869,"Alcremie",["fairy"],1],[870,"Falinks",["fighting"],1],[871,"Pincurchin",["electric"],1],
  [872,"Snom",["ice","bug"],0],[873,"Frosmoth",["ice","bug"],1],[874,"Stonjourner",["rock"],1],[875,"Eiscue",["ice"],1],
  [876,"Indeedee",["psychic","normal"],1],[877,"Morpeko",["electric","dark"],1],[878,"Cufant",["steel"],0],[879,"Copperajah",["steel"],1],
  [880,"Dracozolt",["electric","dragon"],1],[881,"Arctozolt",["electric","ice"],1],[882,"Dracovish",["water","dragon"],1],[883,"Arctovish",["water","ice"],1],
  [884,"Duraludon",["steel","dragon"],1],[885,"Dreepy",["dragon","ghost"],0],[886,"Drakloak",["dragon","ghost"],0],[887,"Dragapult",["dragon","ghost"],1],
  [888,"Zacian",["fairy","steel"],1],[889,"Zamazenta",["fighting","steel"],1],[890,"Eternatus",["poison","dragon"],1],
  [891,"Kubfu",["fighting"],0],[892,"Urshifu",["fighting","water"],1],[893,"Zarude",["dark","grass"],1],
  [894,"Regieleki",["electric"],1],[895,"Regidrago",["dragon"],1],[896,"Glastrier",["ice"],1],[897,"Spectrier",["ghost"],1],[898,"Calyrex",["psychic","grass"],1],
  [899,"Wyrdeer",["normal","psychic"],1],[900,"Kleavor",["bug","rock"],1],[901,"Ursaluna",["ground","normal"],1],
  [902,"Basculegion",["water","ghost"],1],[903,"Sneasler",["fighting","poison"],1],[904,"Overqwil",["dark","poison"],1],[905,"Enamorus",["fairy","flying"],1],

  // GEN 9 (#906 - #1025)
  [906,"Sprigatito",["grass"],0],[907,"Floragato",["grass"],0],[908,"Meowscarada",["grass","dark"],1],
  [909,"Fuecoco",["fire"],0],[910,"Crocalor",["fire"],0],[911,"Skeledirge",["fire","ghost"],1],
  [912,"Quaxly",["water"],0],[913,"Quaxwell",["water"],0],[914,"Quaquaval",["water","fighting"],1],
  [915,"Lechonk",["normal"],0],[916,"Oinkologne",["normal"],1],[917,"Tarountula",["bug"],0],[918,"Spidops",["bug"],1],
  [919,"Nymble",["bug"],0],[920,"Lokix",["bug","dark"],1],[921,"Pawmi",["electric"],0],[922,"Pawmo",["electric","fighting"],0],[923,"Pawmot",["electric","fighting"],1],
  [924,"Tandemaus",["normal"],0],[925,"Maushold",["normal"],1],[926,"Fidough",["fairy"],0],[927,"Dachsbun",["fairy"],1],
  [928,"Smoliv",["grass","normal"],0],[929,"Dolliv",["grass","normal"],0],[930,"Arboliva",["grass","normal"],1],
  [931,"Squawkabilly",["normal","flying"],1],[932,"Nacli",["rock"],0],[933,"Naclstack",["rock"],0],[934,"Garganacl",["rock"],1],
  [935,"Charcadet",["fire"],0],[936,"Armarouge",["fire","psychic"],1],[937,"Ceruledge",["fire","ghost"],1],
  [938,"Tadbulb",["electric"],0],[939,"Bellibolt",["electric"],1],[940,"Wattrel",["electric","flying"],0],[941,"Kilowattrel",["electric","flying"],1],
  [942,"Maschiff",["dark"],0],[943,"Mabosstiff",["dark"],1],[944,"Shroodle",["poison","normal"],0],[945,"Grafaiai",["poison","normal"],1],
  [946,"Bramblin",["grass","ghost"],0],[947,"Brambleghast",["grass","ghost"],1],[948,"Toedscool",["ground","grass"],0],[949,"Toedscruel",["ground","grass"],1],
  [950,"Klawf",["rock"],1],[951,"Capsakid",["grass"],0],[952,"Scovillain",["grass","fire"],1],[953,"Rellor",["bug"],0],[954,"Rabsca",["bug","psychic"],1],
  [955,"Flittle",["psychic"],0],[956,"Espathra",["psychic"],1],[957,"Tinkatink",["fairy","steel"],0],[958,"Tinkatuff",["fairy","steel"],0],[959,"Tinkaton",["fairy","steel"],1],
  [960,"Wiglett",["water"],0],[961,"Wugtrio",["water"],1],[962,"Bombirdier",["flying","dark"],1],
  [963,"Finizen",["water"],0],[964,"Palafin",["water"],1],[965,"Varoom",["steel","poison"],0],[966,"Revavroom",["steel","poison"],1],
  [967,"Cyclizar",["dragon","normal"],1],[968,"Orthworm",["steel"],1],[969,"Glimmet",["rock","poison"],0],[970,"Glimmora",["rock","poison"],1],
  [971,"Greavard",["ghost"],0],[972,"Houndstone",["ghost"],1],[973,"Flamigo",["flying","fighting"],1],
  [974,"Cetoddle",["ice"],0],[975,"Cetitan",["ice"],1],[976,"Veluza",["water","psychic"],1],[977,"Dondozo",["water"],1],[978,"Tatsugiri",["dragon","water"],1],
  [979,"Annihilape",["fighting","ghost"],1],[980,"Clodsire",["poison","ground"],1],[981,"Farigiraf",["normal","psychic"],1],[982,"Dudunsparce",["normal"],1],[983,"Kingambit",["dark","steel"],1],
  [984,"Great Tusk",["ground","fighting"],1],[985,"Scream Tail",["fairy","psychic"],1],[986,"Brute Bonnet",["grass","dark"],1],[987,"Flutter Mane",["ghost","fairy"],1],
  [988,"Slither Wing",["bug","fighting"],1],[989,"Sandy Shocks",["electric","ground"],1],[990,"Iron Treads",["ground","steel"],1],[991,"Iron Bundle",["ice","water"],1],
  [992,"Iron Hands",["fighting","electric"],1],[993,"Iron Jugulis",["dark","flying"],1],[994,"Iron Moth",["fire","poison"],1],[995,"Iron Thorns",["rock","electric"],1],
  [996,"Frigibax",["dragon","ice"],0],[997,"Arctibax",["dragon","ice"],0],[998,"Baxcalibur",["dragon","ice"],1],
  [999,"Gimmighoul",["ghost"],0],[1000,"Gholdengo",["steel","ghost"],1],
  [1001,"Wo-Chien",["dark","grass"],1],[1002,"Chien-Pao",["dark","ice"],1],[1003,"Ting-Lu",["dark","ground"],1],[1004,"Chi-Yu",["dark","fire"],1],
  [1005,"Roaring Moon",["dragon","dark"],1],[1006,"Iron Valiant",["fairy","fighting"],1],[1007,"Koraidon",["fighting","dragon"],1],[1008,"Miraidon",["electric","dragon"],1],
  [1009,"Walking Wake",["water","dragon"],1],[1010,"Iron Leaves",["grass","psychic"],1],[1011,"Dipplin",["grass","dragon"],0],
  [1012,"Poltchageist",["grass","ghost"],0],[1013,"Sinistcha",["grass","ghost"],1],[1014,"Okidogi",["poison","fighting"],1],[1015,"Munkidori",["poison","psychic"],1],[1016,"Fezandipiti",["poison","fairy"],1],
  [1017,"Ogerpon",["grass"],1],[1018,"Archaludon",["steel","dragon"],1],[1019,"Hydrapple",["grass","dragon"],1],
  [1020,"Gouging Fire",["fire","dragon"],1],[1021,"Raging Bolt",["electric","dragon"],1],[1022,"Iron Boulder",["rock","psychic"],1],[1023,"Iron Crown",["steel","psychic"],1],
  [1024,"Terapagos",["normal"],1],[1025,"Pecharunt",["poison","ghost"],1]
];

// Hidrata automaticamente todos os 1.025 Pokémon na lista window.POKE_DATA.POKEMON
// preservando os 124 Pokémon com Mega Evoluções e dados competitivos detalhados!
(function hydrateFullPokedex() {
  const existingList = window.POKE_DATA.POKEMON || [];
  const existingById = new Map();
  const existingByDex = new Map();

  existingList.forEach(p => {
    existingById.set(p.id.toLowerCase(), p);
    if (!p.id.includes('-')) {
      existingByDex.set(p.dex, p);
    }
    p.isFinalEvo = true;
  });

  // Melhores ataques padrão por tipo para hidratar qualquer Pokémon da National Dex
  const defaultMovesByType = {
    normal:   ['body-slam', 'return', 'hyper-voice', 'quick-attack', 'swords-dance', 'recover'],
    fire:     ['flamethrower', 'fire-blast', 'flare-blitz', 'fire-punch', 'will-o-wisp', 'heat-wave'],
    water:    ['surf', 'liquidation', 'ice-beam', 'hydro-pump', 'waterfall', 'scald', 'aqua-jet'],
    electric: ['thunderbolt', 'volt-switch', 'wild-charge', 'thunder-wave', 'discharge'],
    grass:    ['energy-ball', 'giga-drain', 'leaf-blade', 'seed-bomb', 'leech-seed', 'swords-dance'],
    ice:      ['ice-beam', 'icicle-crash', 'freeze-dry', 'ice-shard', 'blizzard', 'aurora-veil'],
    fighting: ['close-combat', 'drain-punch', 'aura-sphere', 'brick-break', 'mach-punch', 'swords-dance'],
    poison:   ['sludge-bomb', 'poison-jab', 'gunk-shot', 'toxic', 'sludge-wave'],
    ground:   ['earthquake', 'earth-power', 'stealth-rock', 'rock-slide', 'stone-edge', 'swords-dance'],
    flying:   ['brave-bird', 'air-slash', 'roost', 'u-turn', 'dual-wingbeat', 'hurricane'],
    psychic:  ['psychic', 'psyshock', 'calm-mind', 'shadow-ball', 'dazzling-gleam', 'zen-headbutt'],
    bug:      ['bug-buzz', 'u-turn', 'x-scissor', 'leech-life', 'quiver-dance'],
    rock:     ['stone-edge', 'rock-slide', 'stealth-rock', 'earthquake', 'power-gem', 'body-press'],
    ghost:    ['shadow-ball', 'poltergeist', 'shadow-claw', 'will-o-wisp', 'hex', 'nasty-plot'],
    dragon:   ['dragon-claw', 'draco-meteor', 'dragon-pulse', 'dragon-dance', 'outrage', 'earthquake'],
    dark:     ['knock-off', 'dark-pulse', 'crunch', 'sucker-punch', 'nasty-plot', 'u-turn'],
    steel:    ['iron-head', 'flash-cannon', 'body-press', 'stealth-rock', 'earthquake'],
    fairy:    ['moonblast', 'play-rough', 'dazzling-gleam', 'calm-mind', 'mystical-fire']
  };

  function getGenByDex(dex) {
    if (dex <= 151) return 1;
    if (dex <= 251) return 2;
    if (dex <= 386) return 3;
    if (dex <= 493) return 4;
    if (dex <= 649) return 5;
    if (dex <= 721) return 6;
    if (dex <= 809) return 7;
    if (dex <= 905) return 8;
    return 9;
  }

  window.POKE_DATA.FULL_DEX_COMPACT.forEach(entry => {
    const [dex, rawName, types, isFinal] = entry;
    const name = rawName.trim();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    if (existingByDex.has(dex) || existingById.has(slug)) {
      const ex = existingByDex.get(dex) || existingById.get(slug);
      if (ex) ex.isFinalEvo = Boolean(isFinal);
      return;
    }

    const gen = getGenByDex(dex);
    // Gera atributos base coerentes com estágio evolutivo/lendário
    const isLegendaryOrParadox = dex >= 144 && [
      144,145,146,150,151,243,244,245,249,250,251,377,378,379,380,381,382,383,384,385,386,
      480,481,482,483,484,485,486,487,488,490,491,492,493,494,638,639,640,641,642,643,644,645,646,647,648,649,
      716,717,718,719,720,721,785,786,787,788,791,792,793,794,795,796,797,798,799,800,801,802,804,805,806,807,809,
      888,889,890,892,893,894,895,896,897,898,905,984,985,986,987,988,989,990,991,992,993,994,995,
      1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1014,1015,1016,1017,1020,1021,1022,1023,1024,1025
    ].includes(dex);

    const baseStat = isLegendaryOrParadox ? 98 : (isFinal ? 84 : 58);
    const stats = {
      hp: baseStat,
      atk: baseStat + ((dex % 3 === 0) ? 14 : 4),
      def: baseStat + ((dex % 4 === 0) ? 12 : 2),
      spa: baseStat + ((dex % 3 !== 0) ? 14 : 4),
      spd: baseStat + 4,
      spe: baseStat + ((dex % 2 === 0) ? 12 : 0)
    };

    const moveSet = new Set();
    types.forEach(t => {
      (defaultMovesByType[t] || []).forEach(m => moveSet.add(m));
    });
    // Cobertura universal
    ['earthquake', 'shadow-ball', 'ice-beam', 'rock-slide', 'u-turn', 'protect'].forEach(m => moveSet.add(m));

    existingList.push({
      id: slug,
      dex,
      name,
      gen,
      isFinalEvo: Boolean(isFinal),
      types,
      role: isLegendaryOrParadox ? 'Legendary / Special Ace' : (isFinal ? 'Balanced Versatile' : 'Em Evolução (NFE)'),
      stats,
      abilities: ['Natural Talent', 'Inner Focus'],
      bestNature: stats.atk >= stats.spa ? 'Jolly (+Spe, -SpA)' : 'Timid (+Spe, -Atk)',
      bestMoves: [...moveSet].slice(0, 9),
      bestItems: ['leftovers', 'life-orb', 'heavy-duty-boots', 'focus-sash', 'sitrus-berry'],
      bestTera: types[0]
    });
  });

  // ==========================================================================
  // CATÁLOGO COMPLETO DE MEGA EVOLUÇÕES (CLÁSSICAS GEN 6 + LEGENDS: Z-A + DLC MEGA DIMENSION)
  // ==========================================================================
  const EXTRA_MEGA_EVOLUTIONS = {
    // --- Clássicas da Geração 6 que faltavam na lista hidratada ---
    'beedrill': {
      mega: {
        name: 'Mega Beedrill', stone: 'beedrillite', stoneName: 'Beedrillite', spriteId: 10090,
        types: ['bug', 'poison'], ability: 'Adaptability',
        stats: { hp: 65, atk: 150, def: 40, spa: 15, spd: 80, spe: 145 },
        note: '150 Attack e 145 Speed com Adaptability (STAB 2x em U-turn e Poison Jab)!'
      }
    },
    'pidgeot': {
      mega: {
        name: 'Mega Pidgeot', stone: 'pidgeotite', stoneName: 'Pidgeotite', spriteId: 10073,
        types: ['normal', 'flying'], ability: 'No Guard',
        stats: { hp: 83, atk: 80, def: 80, spa: 135, spd: 80, spe: 121 },
        note: 'No Guard garante 100% de precisão em Hurricane e Heat Wave com 135 Sp. Atk!'
      }
    },
    'slowbro': {
      mega: {
        name: 'Mega Slowbro', stone: 'slowbronite', stoneName: 'Slowbronite', spriteId: 10071,
        types: ['water', 'psychic'], ability: 'Shell Armor',
        stats: { hp: 95, atk: 75, def: 180, spa: 130, spd: 80, spe: 30 },
        note: 'Muralha física impenetrável com 180 de Defense e imunidade a Critical Hits (Shell Armor)!'
      }
    },
    'kangaskhan': {
      mega: {
        name: 'Mega Kangaskhan', stone: 'kangaskhanite', stoneName: 'Kangaskhanite', spriteId: 10039,
        types: ['normal'], ability: 'Parental Bond',
        stats: { hp: 105, atk: 125, def: 100, spa: 60, spd: 100, spe: 100 },
        note: 'Parental Bond faz cada ataque atingir 2 vezes no mesmo turno!'
      }
    },
    'pinsir': {
      mega: {
        name: 'Mega Pinsir', stone: 'pinsirite', stoneName: 'Pinsirite', spriteId: 10040,
        types: ['bug', 'flying'], ability: 'Aerilate',
        stats: { hp: 65, atk: 155, def: 120, spa: 65, spd: 90, spe: 105 },
        note: 'Aerilate transforma Return e Quick Attack em golpes Voadores devastadores (+20% + STAB)!'
      }
    },
    'mewtwo': {
      mega: {
        name: 'Mega Mewtwo Y', stone: 'mewtwonite-y', stoneName: 'Mewtwonite Y', spriteId: 10044,
        types: ['psychic'], ability: 'Insomnia',
        stats: { hp: 106, atk: 150, def: 70, spa: 194, spd: 120, spe: 140 },
        note: '194 de Ataque Especial e 140 de Velocidade (780 BST)!'
      },
      megaAlt: {
        name: 'Mega Mewtwo X', stone: 'mewtwonite-x', stoneName: 'Mewtwonite X', spriteId: 10043,
        types: ['psychic', 'fighting'], ability: 'Steadfast',
        stats: { hp: 106, atk: 190, def: 100, spa: 154, spd: 100, spe: 130 },
        note: 'Ganha o tipo Lutador com colossais 190 de Ataque Físico (780 BST)!'
      }
    },
    'steelix': {
      mega: {
        name: 'Mega Steelix', stone: 'steelixite', stoneName: 'Steelixite', spriteId: 10072,
        types: ['steel', 'ground'], ability: 'Sand Force',
        stats: { hp: 75, atk: 125, def: 230, spa: 55, spd: 95, spe: 30 },
        note: '230 de Defesa Física e 125 de Attack com Sand Force!'
      }
    },
    'houndoom': {
      mega: {
        name: 'Mega Houndoom', stone: 'houndoominite', stoneName: 'Houndoominite', spriteId: 10048,
        types: ['dark', 'fire'], ability: 'Solar Power',
        stats: { hp: 75, atk: 90, def: 90, spa: 140, spd: 90, spe: 115 },
        note: '140 Sp. Atk e 115 Speed com Solar Power!'
      }
    },
    'sableye': {
      mega: {
        name: 'Mega Sableye', stone: 'sablenite', stoneName: 'Sablenite', spriteId: 10066,
        types: ['dark', 'ghost'], ability: 'Magic Bounce',
        stats: { hp: 50, atk: 85, def: 125, spa: 85, spd: 115, spe: 20 },
        note: 'Reflete hazards e status com Magic Bounce e apenas 1 fraqueza (Fada)!'
      }
    },
    'medicham': {
      mega: {
        name: 'Mega Medicham', stone: 'medichamite', stoneName: 'Medichamite', spriteId: 10054,
        types: ['fighting', 'psychic'], ability: 'Pure Power',
        stats: { hp: 60, atk: 100, def: 85, spa: 80, spd: 85, spe: 100 },
        note: 'Pure Power dobra seu Attack de 100 para um poder físico equivalente a 200 base!'
      }
    },
    'sharpedo': {
      mega: {
        name: 'Mega Sharpedo', stone: 'sharpedonite', stoneName: 'Sharpedonite', spriteId: 10070,
        types: ['water', 'dark'], ability: 'Strong Jaw',
        stats: { hp: 70, atk: 140, def: 70, spa: 110, spd: 65, spe: 105 },
        note: 'Strong Jaw aumenta Crunch e Ice Fang em +50% com 140 Attack!'
      }
    },
    'camerupt': {
      mega: {
        name: 'Mega Camerupt', stone: 'cameruptite', stoneName: 'Cameruptite', spriteId: 10087,
        types: ['fire', 'ground'], ability: 'Sheer Force',
        stats: { hp: 70, atk: 120, def: 100, spa: 145, spd: 105, spe: 20 },
        note: '145 Sp. Atk com Sheer Force (+30% em Fire Blast e Earth Power)!'
      }
    },
    'banette': {
      mega: {
        name: 'Mega Banette', stone: 'banettite', stoneName: 'Banettite', spriteId: 10056,
        types: ['ghost'], ability: 'Prankster',
        stats: { hp: 64, atk: 165, def: 75, spa: 93, spd: 83, spe: 75 },
        note: '165 de Attack combinado com prioridade em movimentos de status (Prankster)!'
      }
    },
    'glalie': {
      mega: {
        name: 'Mega Glalie', stone: 'glalitite', stoneName: 'Glalitite', spriteId: 10074,
        types: ['ice'], ability: 'Refrigerate',
        stats: { hp: 80, atk: 120, def: 80, spa: 120, spd: 80, spe: 100 },
        note: 'Refrigerate converte golpes Normais (Double-Edge/Explosion) em tipo Gelo +20%!'
      }
    },
    'latias': {
      mega: {
        name: 'Mega Latias', stone: 'latiasite', stoneName: 'Latiasite', spriteId: 10062,
        types: ['dragon', 'psychic'], ability: 'Levitate',
        stats: { hp: 80, atk: 100, def: 120, spa: 140, spd: 150, spe: 110 },
        note: '700 BST com 120 Def / 150 SpD e 140 Sp. Atk para Calm Mind imbatível!'
      }
    },
    'latios': {
      mega: {
        name: 'Mega Latios', stone: 'latiosite', stoneName: 'Latiosite', spriteId: 10063,
        types: ['dragon', 'psychic'], ability: 'Levitate',
        stats: { hp: 80, atk: 130, def: 100, spa: 160, spd: 120, spe: 110 },
        note: '700 BST com 160 Sp. Atk e 130 Attack!'
      }
    },
    'rayquaza': {
      mega: {
        name: 'Mega Rayquaza', stone: 'dragon-ascent-mega', stoneName: 'Dragon Ascent (Meteorito)', spriteId: 10079,
        types: ['dragon', 'flying'], ability: 'Delta Stream',
        stats: { hp: 105, atk: 180, def: 100, spa: 180, spd: 100, spe: 115 },
        note: '780 BST com 180 Attack, 180 Sp. Atk e Delta Stream que elimina as fraquezas do tipo Voador!'
      }
    },
    'abomasnow': {
      mega: {
        name: 'Mega Abomasnow', stone: 'abomasite', stoneName: 'Abomasite', spriteId: 10060,
        types: ['grass', 'ice'], ability: 'Snow Warning',
        stats: { hp: 90, atk: 132, def: 105, spa: 132, spd: 105, spe: 30 },
        note: 'Invoca Neve para Blizzard 100% preciso com 132 Attack e 132 Sp. Atk!'
      }
    },
    'audino': {
      mega: {
        name: 'Mega Audino', stone: 'audinite', stoneName: 'Audinite', spriteId: 10069,
        types: ['normal', 'fairy'], ability: 'Healer',
        stats: { hp: 103, atk: 60, def: 126, spa: 80, spd: 126, spe: 50 },
        note: 'Ganha o tipo Fada com 103 HP, 126 Defense e 126 Sp. Def!'
      }
    },
    'diancie': {
      mega: {
        name: 'Mega Diancie', stone: 'diancite', stoneName: 'Diancite', spriteId: 10075,
        types: ['rock', 'fairy'], ability: 'Magic Bounce',
        stats: { hp: 50, atk: 160, def: 110, spa: 160, spd: 110, spe: 110 },
        note: '700 BST com 160 Attack, 160 Sp. Atk, 110 Speed e Magic Bounce!'
      }
    },

    // ========================================================================
    // NOVAS MEGA EVOLUÇÕES DE POKÉMON LEGENDS: Z-A (JOGO BASE — 26 NOVAS MEGAS)
    // ========================================================================
    'clefable': {
      mega: {
        name: 'Mega Clefable', stone: 'clefablite', stoneName: 'Clefablite', spriteId: 36,
        isLzaMega: true,
        types: ['fairy', 'flying'], ability: 'Magic Guard',
        stats: { hp: 95, atk: 80, def: 93, spa: 135, spd: 110, spe: 70 },
        note: 'Nova Mega de Legends: Z-A! Ganha o tipo Fada/Voador (imune a Terrestre e Dragão) com 135 Sp. Atk e 110 Sp. Def!'
      }
    },
    'victreebel': {
      mega: {
        name: 'Mega Victreebel', stone: 'victreebelite', stoneName: 'Victreebelite', spriteId: 71,
        isLzaMega: true,
        types: ['grass', 'poison'], ability: 'Corrosion',
        stats: { hp: 80, atk: 125, def: 85, spa: 135, spd: 95, spe: 70 },
        note: 'Nova Mega de Legends: Z-A! Atacante misto letal com 125 Attack e 135 Sp. Atk (590 BST)!'
      }
    },
    'starmie': {
      mega: {
        name: 'Mega Starmie', stone: 'starmite', stoneName: 'Starmite', spriteId: 121,
        isLzaMega: true,
        types: ['water', 'psychic'], ability: 'Analytic',
        stats: { hp: 60, atk: 140, def: 105, spa: 130, spd: 105, spe: 120 },
        note: 'Nova Mega de Legends: Z-A! Chega a 660 BST com 140 Attack, 130 Sp. Atk, 105 nas duas defesas e 120 Speed!'
      }
    },
    'dragonite': {
      mega: {
        name: 'Mega Dragonite', stone: 'dragonitite', stoneName: 'Dragonitite', spriteId: 149,
        isLzaMega: true,
        types: ['dragon', 'flying'], ability: 'Multiscale',
        stats: { hp: 91, atk: 124, def: 115, spa: 145, spd: 125, spe: 100 },
        note: 'Nova Mega de Legends: Z-A! 700 BST com 145 Sp. Atk, 124 Attack, 100 Speed e defesas colossais (115/125)!'
      }
    },
    'meganium': {
      mega: {
        name: 'Mega Meganium', stone: 'meganiumite', stoneName: 'Meganiumite', spriteId: 154,
        isLzaMega: true,
        types: ['grass', 'fairy'], ability: 'Pixilate',
        stats: { hp: 80, atk: 92, def: 115, spa: 143, spd: 115, spe: 80 },
        note: 'Inicial de Legends: Z-A! Ganha o tipo Planta/Fada com 143 Sp. Atk e 115 em ambas as defesas!'
      }
    },
    'feraligatr': {
      mega: {
        name: 'Mega Feraligatr', stone: 'feraligatrite', stoneName: 'Feraligatrite', spriteId: 160,
        isLzaMega: true,
        types: ['water', 'dragon'], ability: 'Strong Jaw',
        stats: { hp: 85, atk: 160, def: 125, spa: 89, spd: 93, spe: 78 },
        note: 'Inicial de Legends: Z-A! Muda para Água/Dragão com devastadores 160 de Attack e 125 de Defense!'
      }
    },
    'skarmory': {
      mega: {
        name: 'Mega Skarmory', stone: 'skarmorite', stoneName: 'Skarmorite', spriteId: 227,
        isLzaMega: true,
        types: ['steel', 'flying'], ability: 'Tough Claws',
        stats: { hp: 65, atk: 140, def: 110, spa: 40, spd: 100, spe: 110 },
        note: 'Nova Mega de Legends: Z-A! Transforma Skarmory em um Sweeper veloz com 140 Attack e 110 Speed!'
      }
    },
    'froslass': {
      mega: {
        name: 'Mega Froslass', stone: 'froslassite', stoneName: 'Froslassite', spriteId: 478,
        isLzaMega: true,
        types: ['ice', 'ghost'], ability: 'Snow Warning',
        stats: { hp: 70, atk: 80, def: 70, spa: 140, spd: 100, spe: 120 },
        note: 'Nova Mega de Legends: Z-A! 140 Sp. Atk e 120 Speed para varrer equipes com Blizzard e Shadow Ball!'
      }
    },
    'emboar': {
      mega: {
        name: 'Mega Emboar', stone: 'emboarite', stoneName: 'Emboarite', spriteId: 500,
        isLzaMega: true,
        types: ['fire', 'fighting'], ability: 'Reckless',
        stats: { hp: 110, atk: 148, def: 75, spa: 110, spd: 110, spe: 75 },
        note: 'Inicial de Legends: Z-A! 148 de Attack, 110 Sp. Atk e 110 Sp. Def com Reckless!'
      }
    },
    'excadrill': {
      mega: {
        name: 'Mega Excadrill', stone: 'excadrillite', stoneName: 'Excadrillite', spriteId: 530,
        isLzaMega: true,
        types: ['ground', 'steel'], ability: 'Mold Breaker',
        stats: { hp: 110, atk: 165, def: 100, spa: 65, spd: 65, spe: 103 },
        note: 'Nova Mega de Legends: Z-A! 165 de Attack, 100 de Defense e 103 de Speed!'
      }
    },
    'scolipede': {
      mega: {
        name: 'Mega Scolipede', stone: 'scolipedite', stoneName: 'Scolipedite', spriteId: 545,
        isLzaMega: true,
        types: ['bug', 'poison'], ability: 'Speed Boost',
        stats: { hp: 60, atk: 140, def: 149, spa: 75, spd: 99, spe: 62 },
        note: 'Nova Mega de Legends: Z-A! 140 de Attack e 149 de Defense!'
      }
    },
    'scrafty': {
      mega: {
        name: 'Mega Scrafty', stone: 'scraftinite', stoneName: 'Scraftinite', spriteId: 560,
        isLzaMega: true,
        types: ['dark', 'fighting'], ability: 'Intimidate',
        stats: { hp: 65, atk: 130, def: 135, spa: 55, spd: 135, spe: 68 },
        note: 'Nova Mega de Legends: Z-A! 130 de Attack com 135 Defense e 135 Sp. Def!'
      }
    },
    'eelektross': {
      mega: {
        name: 'Mega Eelektross', stone: 'eelektrossite', stoneName: 'Eelektrossite', spriteId: 604,
        isLzaMega: true,
        types: ['electric'], ability: 'Levitate',
        stats: { hp: 85, atk: 145, def: 80, spa: 135, spd: 90, spe: 80 },
        note: 'Nova Mega de Legends: Z-A! Zero fraquezas (Elétrico + Levitate) com 145 Attack e 135 Sp. Atk (615 BST)!'
      }
    },
    'chandelure': {
      mega: {
        name: 'Mega Chandelure', stone: 'chandelurite', stoneName: 'Chandelurite', spriteId: 609,
        isLzaMega: true,
        types: ['ghost', 'fire'], ability: 'Infiltrator',
        stats: { hp: 60, atk: 75, def: 110, spa: 175, spd: 110, spe: 90 },
        note: 'Nova Mega de Legends: Z-A! 175 de Sp. Atk e 110 em ambas as defesas!'
      }
    },
    'chesnaught': {
      mega: {
        name: 'Mega Chesnaught', stone: 'chesnaughtite', stoneName: 'Chesnaughtite', spriteId: 652,
        isLzaMega: true,
        types: ['grass', 'fighting'], ability: 'Bulletproof',
        stats: { hp: 88, atk: 137, def: 172, spa: 74, spd: 115, spe: 44 },
        note: 'Nova Mega de Legends: Z-A! Tanque físico colosso com 172 de Defense, 115 Sp. Def e 137 Attack!'
      }
    },
    'delphox': {
      mega: {
        name: 'Mega Delphox', stone: 'delphoxite', stoneName: 'Delphoxite', spriteId: 655,
        isLzaMega: true,
        types: ['fire', 'psychic'], ability: 'Magic Guard',
        stats: { hp: 75, atk: 69, def: 72, spa: 159, spd: 125, spe: 134 },
        note: 'Nova Mega de Legends: Z-A! 159 Sp. Atk, 134 Speed e 125 Sp. Def!'
      }
    },
    'greninja': {
      mega: {
        name: 'Mega Greninja', stone: 'greninjite', stoneName: 'Greninjite', spriteId: 658,
        isLzaMega: true,
        types: ['water', 'dark'], ability: 'Protean',
        stats: { hp: 72, atk: 125, def: 77, spa: 133, spd: 81, spe: 142 },
        note: 'Nova Mega de Legends: Z-A! 142 de Speed, 133 Sp. Atk e 125 Attack!'
      }
    },
    'pyroar': {
      mega: {
        name: 'Mega Pyroar', stone: 'pyroarite', stoneName: 'Pyroarite', spriteId: 668,
        isLzaMega: true,
        types: ['fire', 'normal'], ability: 'Competitive',
        stats: { hp: 86, atk: 88, def: 92, spa: 129, spd: 86, spe: 126 },
        note: 'Nova Mega de Legends: Z-A! 129 Sp. Atk e 126 Speed!'
      }
    },
    'floette': {
      mega: {
        name: 'Mega Floette (Eternal)', stone: 'floettite', stoneName: 'Floettite', spriteId: 670,
        isLzaMega: true,
        types: ['fairy'], ability: 'Pixilate',
        stats: { hp: 74, atk: 85, def: 87, spa: 155, spd: 148, spe: 102 },
        note: 'Nova Mega de Legends: Z-A! Floette Eternal Flower atinge 651 BST com 155 Sp. Atk e 148 Sp. Def!'
      }
    },
    'malamar': {
      mega: {
        name: 'Mega Malamar', stone: 'malamarite', stoneName: 'Malamarite', spriteId: 687,
        isLzaMega: true,
        types: ['dark', 'psychic'], ability: 'Contrary',
        stats: { hp: 86, atk: 102, def: 88, spa: 98, spd: 120, spe: 88 },
        note: 'Nova Mega de Legends: Z-A! Mantém Contrary (Superpower aumenta Attack e Defense) com 120 Sp. Def!'
      }
    },
    'barbaracle': {
      mega: {
        name: 'Mega Barbaracle', stone: 'barbaracite', stoneName: 'Barbaracite', spriteId: 689,
        isLzaMega: true,
        types: ['rock', 'fighting'], ability: 'Tough Claws',
        stats: { hp: 72, atk: 140, def: 130, spa: 64, spd: 106, spe: 88 },
        note: 'Nova Mega de Legends: Z-A! Muda para Pedra/Lutador com 140 Attack, 130 Defense e Tough Claws!'
      }
    },
    'dragalge': {
      mega: {
        name: 'Mega Dragalge', stone: 'dragalgite', stoneName: 'Dragalgite', spriteId: 691,
        isLzaMega: true,
        types: ['poison', 'dragon'], ability: 'Adaptability',
        stats: { hp: 65, atk: 85, def: 105, spa: 132, spd: 163, spe: 44 },
        note: 'Nova Mega de Legends: Z-A! 132 Sp. Atk e 163 Sp. Def com Adaptability (STAB 2x)!'
      }
    },
    'hawlucha': {
      mega: {
        name: 'Mega Hawlucha', stone: 'hawluchanite', stoneName: 'Hawluchanite', spriteId: 701,
        isLzaMega: true,
        types: ['fighting', 'flying'], ability: 'Mold Breaker',
        stats: { hp: 78, atk: 137, def: 100, spa: 74, spd: 93, spe: 118 },
        note: 'Nova Mega de Legends: Z-A! 137 de Attack, 100 Defense e 118 de Speed (600 BST)!'
      }
    },
    'zygarde': {
      mega: {
        name: 'Mega Zygarde', stone: 'zygardite', stoneName: 'Zygardite', spriteId: 718,
        isLzaMega: true,
        types: ['dragon', 'ground'], ability: 'Aura Break',
        stats: { hp: 216, atk: 70, def: 91, spa: 216, spd: 85, spe: 100 },
        note: 'Nova Mega Lendária de Legends: Z-A! 778 BST com 216 de HP e 216 de Sp. Atk!'
      }
    },
    'drampa': {
      mega: {
        name: 'Mega Drampa', stone: 'drampanite', stoneName: 'Drampanite', spriteId: 780,
        isLzaMega: true,
        types: ['normal', 'dragon'], ability: 'Berserk',
        stats: { hp: 78, atk: 85, def: 110, spa: 160, spd: 116, spe: 36 },
        note: 'Nova Mega de Legends: Z-A! 160 Sp. Atk, 110 Defense e 116 Sp. Def!'
      }
    },
    'falinks': {
      mega: {
        name: 'Mega Falinks', stone: 'falinksite', stoneName: 'Falinksite', spriteId: 870,
        isLzaMega: true,
        types: ['fighting'], ability: 'Defiant',
        stats: { hp: 65, atk: 135, def: 135, spa: 70, spd: 65, spe: 100 },
        note: 'Nova Mega de Legends: Z-A! 135 Attack, 135 Defense e 100 Speed!'
      }
    },

    // ========================================================================
    // MEGA EVOLUÇÕES DA DLC DE LEGENDS: Z-A ("MEGA DIMENSION" — 19 MEGAS)
    // ========================================================================
    'raichu': {
      mega: {
        name: 'Mega Raichu Y', stone: 'raichunite-y', stoneName: 'Raichunite Y', spriteId: 26,
        isLzaMega: true, isDlcMega: true,
        types: ['electric', 'psychic'], ability: 'Surge Surfer',
        stats: { hp: 60, atk: 100, def: 55, spa: 160, spd: 80, spe: 130 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Vira Elétrico/Psíquico com 160 Sp. Atk e 130 Speed!'
      },
      megaAlt: {
        name: 'Mega Raichu X', stone: 'raichunite-x', stoneName: 'Raichunite X', spriteId: 26,
        isLzaMega: true, isDlcMega: true,
        types: ['electric', 'fighting'], ability: 'Iron Fist',
        stats: { hp: 60, atk: 135, def: 95, spa: 90, spd: 95, spe: 110 },
        bestMoves: ['wild-charge', 'close-combat', 'volt-switch', 'brick-break'],
        note: 'DLC Mega Dimension (Legends: Z-A)! Vira Elétrico/Lutador físico com 135 Attack e 110 Speed!'
      }
    },
    'chimecho': {
      mega: {
        name: 'Mega Chimecho', stone: 'chimechite', stoneName: 'Chimechite', spriteId: 358,
        isLzaMega: true, isDlcMega: true,
        types: ['psychic', 'steel'], ability: 'Levitate',
        stats: { hp: 75, atk: 50, def: 110, spa: 135, spd: 120, spe: 65 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Ganha o tipo Psíquico/Metálico + Levitate com 135 Sp. Atk e 110/120 nas defesas!'
      }
    },
    'absol': {
      megaAlt: {
        name: 'Mega Absol Z', stone: 'absolite-z', stoneName: 'Absolite Z', spriteId: 359,
        isLzaMega: true, isDlcMega: true,
        types: ['dark', 'ghost'], ability: 'Magic Bounce',
        stats: { hp: 65, atk: 154, def: 60, spa: 75, spd: 60, spe: 151 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Ganha o tipo Sombrio/Fantasma com 154 Attack e 151 Speed!'
      }
    },
    'staraptor': {
      mega: {
        name: 'Mega Staraptor', stone: 'staraptorite', stoneName: 'Staraptorite', spriteId: 398,
        isLzaMega: true, isDlcMega: true,
        types: ['flying', 'fighting'], ability: 'Reckless',
        stats: { hp: 85, atk: 140, def: 100, spa: 60, spd: 90, spe: 110 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Ganha o tipo Voador/Lutador (STAB em Close Combat!) com 140 Attack e 110 Speed!'
      }
    },
    'garchomp': {
      megaAlt: {
        name: 'Mega Garchomp Z', stone: 'garchompite-z', stoneName: 'Garchompite Z', spriteId: 445,
        isLzaMega: true, isDlcMega: true,
        types: ['dragon'], ability: 'Tough Claws',
        stats: { hp: 108, atk: 130, def: 85, spa: 141, spd: 85, spe: 151 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Dragão puro hiper-veloz com 151 Speed, 130 Attack e 141 Sp. Atk (700 BST)!'
      }
    },
    'lucario': {
      megaAlt: {
        name: 'Mega Lucario Z', stone: 'lucarionite-z', stoneName: 'Lucarionite Z', spriteId: 448,
        isLzaMega: true, isDlcMega: true,
        types: ['fighting', 'steel'], ability: 'Adaptability',
        stats: { hp: 70, atk: 100, def: 70, spa: 164, spd: 70, spe: 151 },
        bestMoves: ['aura-sphere', 'flash-cannon', 'nasty-plot', 'vacuum-wave'],
        note: 'DLC Mega Dimension (Legends: Z-A)! Foco Especial extremo com 164 Sp. Atk e 151 Speed com Adaptability!'
      }
    },
    'heatran': {
      mega: {
        name: 'Mega Heatran', stone: 'heatranite', stoneName: 'Heatranite', spriteId: 485,
        isLzaMega: true, isDlcMega: true,
        types: ['fire', 'steel'], ability: 'Flash Fire',
        stats: { hp: 91, atk: 120, def: 106, spa: 175, spd: 141, spe: 67 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 700 BST com colossais 175 Sp. Atk e 141 Sp. Def!'
      }
    },
    'darkrai': {
      mega: {
        name: 'Mega Darkrai', stone: 'darkraite', stoneName: 'Darkraite', spriteId: 491,
        isLzaMega: true, isDlcMega: true,
        types: ['dark'], ability: 'Bad Dreams',
        stats: { hp: 70, atk: 120, def: 130, spa: 165, spd: 130, spe: 85 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 700 BST com 165 Sp. Atk e 130 em ambas as defesas!'
      }
    },
    'golurk': {
      mega: {
        name: 'Mega Golurk', stone: 'golurkite', stoneName: 'Golurkite', spriteId: 623,
        isLzaMega: true, isDlcMega: true,
        types: ['ground', 'ghost'], ability: 'Iron Fist',
        stats: { hp: 89, atk: 159, def: 105, spa: 70, spd: 105, spe: 55 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 159 de Attack e 105 nas duas defesas!'
      }
    },
    'meowstic': {
      mega: {
        name: 'Mega Meowstic', stone: 'meowsticite', stoneName: 'Meowsticite', spriteId: 678,
        isLzaMega: true, isDlcMega: true,
        types: ['psychic'], ability: 'Prankster',
        stats: { hp: 74, atk: 48, def: 76, spa: 143, spd: 101, spe: 124 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 143 Sp. Atk e 124 Speed!'
      }
    },
    'crabominable': {
      mega: {
        name: 'Mega Crabominable', stone: 'crabominite', stoneName: 'Crabominite', spriteId: 740,
        isLzaMega: true, isDlcMega: true,
        types: ['fighting', 'ice'], ability: 'Iron Fist',
        stats: { hp: 97, atk: 157, def: 122, spa: 62, spd: 107, spe: 33 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 157 Attack, 122 Defense e 107 Sp. Def com Iron Fist!'
      }
    },
    'golisopod': {
      mega: {
        name: 'Mega Golisopod', stone: 'golisopodite', stoneName: 'Golisopodite', spriteId: 768,
        isLzaMega: true, isDlcMega: true,
        types: ['bug', 'water'], ability: 'Shell Armor',
        stats: { hp: 75, atk: 150, def: 175, spa: 70, spd: 120, spe: 40 },
        note: 'DLC Mega Dimension (Legends: Z-A)! Sem Emergency Exit, com 150 Attack, 175 Defense e 120 Sp. Def!'
      }
    },
    'magearna': {
      mega: {
        name: 'Mega Magearna', stone: 'magearnite', stoneName: 'Magearnite', spriteId: 801,
        isLzaMega: true, isDlcMega: true,
        types: ['steel', 'fairy'], ability: 'Soul-Heart',
        stats: { hp: 80, atk: 125, def: 115, spa: 170, spd: 115, spe: 95 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 700 BST com 170 Sp. Atk, 95 Speed e o melhor tipo defensivo do jogo!'
      }
    },
    'zeraora': {
      mega: {
        name: 'Mega Zeraora', stone: 'zeraorite', stoneName: 'Zeraorite', spriteId: 807,
        isLzaMega: true, isDlcMega: true,
        types: ['electric'], ability: 'Volt Absorb',
        stats: { hp: 88, atk: 157, def: 75, spa: 147, spd: 80, spe: 153 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 700 BST com 157 Attack, 147 Sp. Atk e 153 Speed!'
      }
    },
    'scovillain': {
      mega: {
        name: 'Mega Scovillain', stone: 'scovillainite', stoneName: 'Scovillainite', spriteId: 952,
        isLzaMega: true, isDlcMega: true,
        types: ['grass', 'fire'], ability: 'Chlorophyll',
        stats: { hp: 65, atk: 138, def: 85, spa: 138, spd: 85, spe: 75 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 138 Attack e 138 Sp. Atk com combinação única Planta/Fogo!'
      }
    },
    'glimmora': {
      mega: {
        name: 'Mega Glimmora', stone: 'glimmorite', stoneName: 'Glimmorite', spriteId: 970,
        isLzaMega: true, isDlcMega: true,
        types: ['rock', 'poison'], ability: 'Corrosion',
        stats: { hp: 83, atk: 90, def: 105, spa: 150, spd: 96, spe: 101 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 150 Sp. Atk, 105 Defense e 101 Speed (625 BST)!'
      }
    },
    'tatsugiri': {
      mega: {
        name: 'Mega Tatsugiri', stone: 'tatsugirinite', stoneName: 'Tatsugirinite', spriteId: 978,
        isLzaMega: true, isDlcMega: true,
        types: ['dragon', 'water'], ability: 'Storm Drain',
        stats: { hp: 68, atk: 65, def: 90, spa: 135, spd: 125, spe: 92 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 135 Sp. Atk e 125 Sp. Def (Curly, Droopy & Stretchy)!'
      }
    },
    'baxcalibur': {
      mega: {
        name: 'Mega Baxcalibur', stone: 'baxcaliburite', stoneName: 'Baxcaliburite', spriteId: 998,
        isLzaMega: true, isDlcMega: true,
        types: ['dragon', 'ice'], ability: 'Thermal Exchange',
        stats: { hp: 115, atk: 165, def: 102, spa: 95, spd: 96, spe: 104 },
        note: 'DLC Mega Dimension (Legends: Z-A)! 165 Attack, 104 Speed e defesas 102/96 com Thermal Exchange!'
      }
    }
  };

  const itemsCatalog = window.POKE_DATA.ITEMS || {};
  existingList.forEach(mon => {
    const extra = EXTRA_MEGA_EVOLUTIONS[mon.id];
    if (!extra) return;

    if (extra.mega && !mon.mega) {
      mon.mega = extra.mega;
    }
    if (extra.megaAlt && !mon.megaAlt) {
      mon.megaAlt = extra.megaAlt;
    }

    [mon.mega, mon.megaAlt].forEach(m => {
      if (m && m.stone && !itemsCatalog[m.stone]) {
        itemsCatalog[m.stone] = {
          id: m.stone,
          name: m.stoneName || m.stone.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          minGen: m.isLzaMega ? 9 : 6,
          category: 'mega',
          icon: '🧬',
          desc: `Permite Mega Evoluir para ${m.name} (${m.note})`
        };
      }
    });
  });

  // Ordena lista global por número da Pokédex
  existingList.sort((a, b) => a.dex - b.dex);
})();
