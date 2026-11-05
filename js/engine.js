// ============================================================================
// MOTOR DE SINERGIA ELEMENTAL, RECOMENDAÇÃO DE EQUIPE, ATAQUES, ITENS E MECÂNICAS
// ============================================================================

window.POKE_ENGINE = (function () {
  const { TYPES, TYPE_CHART_MODERN, GAMES, MECHANICS, ITEMS, MOVES, POKEMON } = window.POKE_DATA;

  // Obtém lista de tipos ativos na geração do jogo selecionado
  function getActiveTypesForGame(game) {
    const mode = game ? game.typeChartMode : 'modern';
    const allTypes = Object.keys(TYPES);
    if (mode === 'gen1') {
      return allTypes.filter(t => t !== 'dark' && t !== 'steel' && t !== 'fairy');
    }
    if (mode === 'gen2-5') {
      return allTypes.filter(t => t !== 'fairy');
    }
    return allTypes;
  }

  // Calcula multiplicador de ataque (atkType -> defType) respeitando a geração do jogo
  function getSingleTypeEffectiveness(atkType, defType, mode = 'modern') {
    if (mode === 'gen1') {
      if (atkType === 'ghost' && defType === 'psychic') return 0; // Bug clássico da Gen 1
      if (atkType === 'bug' && defType === 'poison') return 2;
      if (atkType === 'poison' && defType === 'bug') return 2;
      if (atkType === 'ice' && defType === 'fire') return 1;
    }
    if (mode === 'gen2-5') {
      // Nas Gens 2 a 5, Steel resistia a Ghost e Dark!
      if ((atkType === 'ghost' || atkType === 'dark') && defType === 'steel') return 0.5;
    }
    const row = TYPE_CHART_MODERN[atkType] || {};
    return row[defType] !== undefined ? row[defType] : 1;
  }

  // Resolve os tipos efetivos de um Pokémon na geração selecionada e com mecânica ativa
  function getEffectivePokemonState(slot, game) {
    if (!slot || !slot.pokemon) return null;
    const mon = slot.pokemon;
    const mode = game ? game.typeChartMode : 'modern';

    let types = [...mon.types];
    if (mode !== 'modern' && mon.gen1To5Types) {
      types = [...mon.gen1To5Types];
    }
    // Filtra tipos inexistentes na Gen 1 (ex: Magnemite Electric puro na Gen 1)
    if (mode === 'gen1') {
      types = types.filter(t => t !== 'steel' && t !== 'dark' && t !== 'fairy');
      if (types.length === 0) types = ['normal'];
    } else if (mode === 'gen2-5') {
      types = types.map(t => (t === 'fairy' ? 'normal' : t));
      types = [...new Set(types)];
    }

    let stats = { ...mon.stats };
    let ability = slot.ability || (mon.abilities && mon.abilities[0]) || 'Overgrow';
    let displayName = mon.name;
    let spriteId = mon.spriteId || mon.dex;
    let activeMechanicNote = null;

    // Verifica se a mecânica ativa altera forma/tipos/stats
    if (slot.mechanic === 'mega' && mon.mega && game && game.mechanics.includes('mega')) {
      const megaData = (slot.megaVariant === 'x' && mon.megaAlt) ? mon.megaAlt : mon.mega;
      types = [...megaData.types];
      stats = { ...megaData.stats };
      ability = megaData.ability;
      displayName = megaData.name;
      spriteId = megaData.spriteId || spriteId;
      activeMechanicNote = megaData.note;
    } else if (slot.mechanic === 'primal' && mon.primal && game && game.mechanics.includes('primal')) {
      types = [...mon.primal.types];
      stats = { ...mon.primal.stats };
      ability = mon.primal.ability;
      displayName = mon.primal.name;
      spriteId = mon.primal.spriteId || spriteId;
      activeMechanicNote = mon.primal.note;
    } else if (slot.mechanic === 'tera' && slot.teraType && game && game.mechanics.includes('tera')) {
      if (slot.applyTeraDefense) {
        types = [slot.teraType];
      }
      activeMechanicNote = `Tera Tipo: ${TYPES[slot.teraType]?.name || slot.teraType} (Bônus STAB e mudança defensiva sob Terastal)`;
    }

    const bst = stats.hp + stats.atk + stats.def + stats.spa + stats.spd + stats.spe;

    return {
      id: mon.id,
      dex: mon.dex,
      spriteId,
      name: displayName,
      baseName: mon.name,
      types,
      baseTypes: mon.types,
      stats,
      bst,
      ability,
      role: mon.role,
      activeMechanicNote
    };
  }

  // Calcula o multiplicador de dano recebido por um Pokémon de cada tipo de ataque
  // (incluindo imunidades/resistências de Habilidades quando o jogo tem habilidades!)
  function getPokemonDefensiveProfile(slot, game) {
    const state = getEffectivePokemonState(slot, game);
    if (!state) return {};

    const mode = game ? game.typeChartMode : 'modern';
    const hasAbilities = game ? game.hasAbilities : true;
    const activeTypes = getActiveTypesForGame(game);
    const profile = {};

    activeTypes.forEach(atkType => {
      let mult = 1;
      state.types.forEach(defType => {
        mult *= getSingleTypeEffectiveness(atkType, defType, mode);
      });

      // Ajustes de Habilidades Defensivas icônicas
      if (hasAbilities && state.ability) {
        const ab = state.ability.toLowerCase();
        if (ab.includes('levitate') && atkType === 'ground') mult = 0;
        if (ab.includes('flash fire') && atkType === 'fire') mult = 0;
        if ((ab.includes('water absorb') || ab.includes('storm drain') || ab.includes('dry skin')) && atkType === 'water') mult = 0;
        if (ab.includes('desolate land') && atkType === 'water') mult = 0;
        if (ab.includes('primordial sea') && atkType === 'fire') mult = 0;
        if ((ab.includes('volt absorb') || ab.includes('lightning rod') || ab.includes('motor drive')) && atkType === 'electric') mult = 0;
        if (ab.includes('sap sipper') && atkType === 'grass') mult = 0;
        if (ab.includes('thick fat') && (atkType === 'fire' || atkType === 'ice')) mult *= 0.5;
        if (ab.includes('purifying salt') && atkType === 'ghost') mult *= 0.5;
        if (ab.includes('thermal exchange') && atkType === 'fire') mult = 0;
        if ((ab.includes('filter') || ab.includes('solid rock') || ab.includes('prism armor')) && mult > 1) mult *= 0.75;
      }

      profile[atkType] = mult;
    });

    return profile;
  }

  // Analisa toda a equipe de até 6 Pokémon (Matriz Defensiva + Cobertura Ofensiva dos 4 Ataques)
  function analyzeTeam(teamSlots, game) {
    const activeTypes = getActiveTypesForGame(game);
    const mode = game ? game.typeChartMode : 'modern';
    const filledSlots = teamSlots.filter(s => s && s.pokemon);

    const defenseMatrix = {};
    activeTypes.forEach(t => {
      defenseMatrix[t] = {
        type: t,
        weak2x: 0,
        weak4x: 0,
        totalWeak: 0,
        resist2x: 0,
        resist4x: 0,
        immune: 0,
        totalSafe: 0,
        netScore: 0,
        weakMembers: [],
        safeMembers: []
      };
    });

    // Calcula perfil defensivo de cada membro
    filledSlots.forEach(slot => {
      const state = getEffectivePokemonState(slot, game);
      const prof = getPokemonDefensiveProfile(slot, game);

      activeTypes.forEach(t => {
        const m = prof[t];
        const cell = defenseMatrix[t];
        if (m >= 4) {
          cell.weak4x++;
          cell.totalWeak++;
          cell.netScore -= 2.2;
          cell.weakMembers.push({ name: state.name, mult: '4x' });
        } else if (m > 1) {
          cell.weak2x++;
          cell.totalWeak++;
          cell.netScore -= 1;
          cell.weakMembers.push({ name: state.name, mult: '2x' });
        } else if (m === 0) {
          cell.immune++;
          cell.totalSafe++;
          cell.netScore += 1.6;
          cell.safeMembers.push({ name: state.name, mult: '0x' });
        } else if (m <= 0.25) {
          cell.resist4x++;
          cell.totalSafe++;
          cell.netScore += 1.4;
          cell.safeMembers.push({ name: state.name, mult: '¼x' });
        } else if (m < 1) {
          cell.resist2x++;
          cell.totalSafe++;
          cell.netScore += 1;
          cell.safeMembers.push({ name: state.name, mult: '½x' });
        }
      });
    });

    // Cobertura ofensiva baseada nos ataques escolhidos (e STABs dos Pokémon)
    const offensiveCoverage = {};
    activeTypes.forEach(defType => {
      offensiveCoverage[defType] = {
        type: defType,
        superEffectiveCount: 0,
        stabSuperEffectiveCount: 0,
        coveredBy: []
      };
    });

    filledSlots.forEach(slot => {
      const state = getEffectivePokemonState(slot, game);
      const chosenMoves = (slot.moves || []).filter(Boolean);
      const attackTypesUsed = new Set();

      chosenMoves.forEach(moveId => {
        const mv = MOVES[moveId];
        if (mv && mv.power > 0 && activeTypes.includes(mv.type)) {
          attackTypesUsed.add(mv.type);
        }
      });

      // Caso o Pokémon ainda não tenha ataques preenchidos, considera seus tipos STAB
      if (attackTypesUsed.size === 0) {
        state.types.forEach(t => attackTypesUsed.add(t));
      }

      attackTypesUsed.forEach(atkType => {
        const isStab = state.types.includes(atkType) || (slot.mechanic === 'tera' && slot.teraType === atkType);
        activeTypes.forEach(defType => {
          const eff = getSingleTypeEffectiveness(atkType, defType, mode);
          if (eff >= 2) {
            offensiveCoverage[defType].superEffectiveCount++;
            if (isStab) offensiveCoverage[defType].stabSuperEffectiveCount++;
            if (!offensiveCoverage[defType].coveredBy.includes(state.name)) {
              offensiveCoverage[defType].coveredBy.push(state.name);
            }
          }
        });
      });
    });

    // Fraquezas críticas da equipe (muitos fracos ou nenhum resistente)
    const criticalWeaknesses = Object.values(defenseMatrix)
      .filter(c => filledSlots.length > 0 && (c.totalWeak >= 2 && c.totalSafe === 0 || c.totalWeak >= 3 || c.netScore <= -2))
      .sort((a, b) => a.netScore - b.netScore);

    // Lacunas ofensivas (tipos que nenhum ataque da equipe acerta 2x)
    const offensiveGaps = Object.values(offensiveCoverage)
      .filter(c => filledSlots.length > 0 && c.superEffectiveCount === 0)
      .map(c => c.type);

    // Calcula Nota Geral de Sinergia da Equipe (0 a 100)
    let synergyScore = 0;
    if (filledSlots.length > 0) {
      let defPoints = 0;
      activeTypes.forEach(t => {
        const c = defenseMatrix[t];
        if (c.totalSafe > 0 && c.totalWeak <= 1) defPoints += 1;
        else if (c.totalSafe >= c.totalWeak) defPoints += 0.7;
        else if (c.totalWeak >= 3) defPoints -= 0.4;
      });
      const defRatio = Math.max(0, Math.min(1, defPoints / activeTypes.length));

      const coveredTypesCount = Object.values(offensiveCoverage).filter(c => c.superEffectiveCount > 0).length;
      const offRatio = coveredTypesCount / activeTypes.length;

      const sizeFactor = Math.min(1, filledSlots.length / 6);
      synergyScore = Math.round(((defRatio * 0.55) + (offRatio * 0.45)) * (0.4 + 0.6 * sizeFactor) * 100);
    }

    return {
      filledCount: filledSlots.length,
      activeTypes,
      defenseMatrix,
      offensiveCoverage,
      criticalWeaknesses,
      offensiveGaps,
      synergyScore
    };
  }

  // ==========================================================================
  // RECOMENDADOR DE MELHORES ATAQUES (4 MOVES) PARA UM POKÉMON NA EQUIPE
  // ==========================================================================
  function getRecommendedMovesForPokemon(pokemon, game, currentTeamAnalysis, currentSlot) {
    if (!pokemon) return [];
    const mode = game ? game.typeChartMode : 'modern';
    const activeTypes = getActiveTypesForGame(game);
    const state = getEffectivePokemonState(currentSlot || { pokemon }, game);

    // Coleta os movimentos candidatos do Pokémon + movimentos compatíveis do banco
    const candidateIds = new Set(pokemon.bestMoves || []);
    if ( currentSlot && currentSlot.mechanic === 'mega' && currentSlot.megaVariant === 'x' && pokemon.megaAlt && pokemon.megaAlt.bestMoves ) {
      pokemon.megaAlt.bestMoves.forEach(m => candidateIds.add(m));
    }

    // Garante pelo menos 10 opções adicionando movimentos do mesmo tipo ou cobertura universal
    Object.keys(MOVES).forEach(mId => {
      const mv = MOVES[mId];
      if (state.types.includes(mv.type) || mv.id === 'protect' || mv.id === 'swords-dance' || mv.id === 'calm-mind') {
        candidateIds.add(mId);
      }
    });

    const isPhysicalPreferred = state.stats.atk >= state.stats.spa + 15;
    const isSpecialPreferred = state.stats.spa >= state.stats.atk + 15;

    const scoredMoves = [];
    candidateIds.forEach(moveId => {
      const mv = MOVES[moveId];
      if (!mv) return;
      if (!activeTypes.includes(mv.type)) return; // Ex: não sugere Fada na Gen 1-5

      let score = 50;
      const reasons = [];
      const isInBestList = (pokemon.bestMoves || []).includes(moveId);
      if (isInBestList) score += 28;

      const isStab = state.types.includes(mv.type) || (currentSlot?.mechanic === 'tera' && currentSlot?.teraType === mv.type);
      if (isStab && mv.power > 0) {
        score += 32;
        reasons.push('STAB (+50% Dano)');
      }

      // Alinhamento com o maior atributo ofensivo (Attack vs Sp. Atk)
      if (mv.category === 'Physical') {
        if (isPhysicalPreferred) {
          score += 18;
          reasons.push(`Usa seu alto Attack (${state.stats.atk})`);
        } else if (isSpecialPreferred) {
          score -= 18;
        }
      } else if (mv.category === 'Special') {
        if (isSpecialPreferred) {
          score += 18;
          reasons.push(`Usa seu alto Sp. Atk (${state.stats.spa})`);
        } else if (isPhysicalPreferred) {
          score -= 18;
        }
      } else if (mv.category === 'Status') {
        if (isInBestList) {
          score += 24;
          reasons.push('Setup / Utilidade Chave');
        }
      }

      // Poder e confiabilidade
      if (mv.power >= 80 && mv.acc >= 95) score += 14;
      else if (mv.power >= 100) score += 10;

      // Cobertura ofensiva para tipos que faltam na equipe!
      if (mv.power > 0 && currentTeamAnalysis) {
        const coveredGaps = [];
        const coveredWeakThreats = [];
        activeTypes.forEach(defType => {
          if (getSingleTypeEffectiveness(mv.type, defType, mode) >= 2) {
            if (currentTeamAnalysis.offensiveGaps.includes(defType)) {
              coveredGaps.push(TYPES[defType].name);
            }
            if (currentTeamAnalysis.defenseMatrix[defType]?.totalWeak >= 2) {
              coveredWeakThreats.push(TYPES[defType].name);
            }
          }
        });

        if (coveredGaps.length > 0) {
          score += Math.min(25, coveredGaps.length * 9);
          reasons.push(`Cobre lacuna da equipe contra ${coveredGaps.slice(0, 2).join('/')}`);
        } else if (coveredWeakThreats.length > 0 && !isStab) {
          score += 10;
          reasons.push(`Cobertura contra ${coveredWeakThreats.slice(0, 2).join('/')}`);
        }
      }

      let badge = 'Cobertura';
      if (isStab && mv.power > 0) badge = '★ STAB Principal';
      else if (mv.category === 'Status') badge = '🛡️ Setup / Suporte';
      else if (reasons.some(r => r.includes('lacuna'))) badge = '⚡ Cobre Equipe';

      scoredMoves.push({
        id: moveId,
        ...mv,
        score,
        badge,
        reason: reasons.join(' • ') || mv.desc
      });
    });

    scoredMoves.sort((a, b) => b.score - a.score);

    // Seleciona os 4 melhores ataques garantindo diversidade de tipos (não colocar 3 ataques do mesmo tipo)
    const top4Ids = [];
    const usedAttackTypes = new Set();
    let statusCount = 0;

    for (const m of scoredMoves) {
      if (top4Ids.length >= 4) break;
      if (m.category === 'Status') {
        if (statusCount >= 1) continue;
        statusCount++;
        top4Ids.push(m.id);
      } else {
        if (!usedAttackTypes.has(m.type)) {
          usedAttackTypes.add(m.type);
          top4Ids.push(m.id);
        }
      }
    }
    // Completa se faltar
    for (const m of scoredMoves) {
      if (top4Ids.length >= 4) break;
      if (!top4Ids.includes(m.id)) top4Ids.push(m.id);
    }

    return {
      top4Ids,
      allScoredMoves: scoredMoves
    };
  }

  // ==========================================================================
  // RECOMENDADOR DE MELHOR ITEM PARA UM POKÉMON (RESPEITANDO GERAÇÃO E MECÂNICA)
  // ==========================================================================
  function getRecommendedItemsForPokemon(pokemon, game, currentSlot) {
    if (!pokemon || (game && !game.hasItems)) return [];
    const maxGen = game ? game.maxDexGen : 9;
    const state = getEffectivePokemonState(currentSlot || { pokemon }, game);

    const results = [];

    // 1. Se Mega Evolução está ativa ou disponível
    if (pokemon.mega && game && game.mechanics.includes('mega')) {
      const stoneId = (currentSlot?.megaVariant === 'x' && pokemon.megaAlt)
        ? pokemon.megaAlt.stone
        : pokemon.mega.stone;
      const stoneItem = ITEMS[stoneId];
      if (stoneItem) {
        results.push({
          ...stoneItem,
          score: currentSlot?.mechanic === 'mega' ? 200 : 120,
          badge: '🧬 Mega Stone Oficial',
          reason: `Necessária para transformar em ${currentSlot?.megaVariant === 'x' && pokemon.megaAlt ? pokemon.megaAlt.name : pokemon.mega.name}`
        });
      }
      if (pokemon.megaAlt) {
        const altStone = ITEMS[pokemon.megaAlt.stone];
        if (altStone && altStone.id !== stoneId) {
          results.push({
            ...altStone,
            score: 115,
            badge: '🧬 Mega Alternativa',
            reason: `Transforma em ${pokemon.megaAlt.name}`
          });
        }
      }
    }

    // 2. Se Primal Reversion está disponível
    if (pokemon.primal && game && game.mechanics.includes('primal')) {
      const orb = ITEMS[pokemon.primal.stone];
      if (orb) {
        results.push({
          ...orb,
          score: 195,
          badge: '🌋 Primal Orb',
          reason: `Ativa automaticamente ${pokemon.primal.name}`
        });
      }
    }

    // 3. Se Z-Move está ativo ou disponível no jogo
    if (game && game.mechanics.includes('zmove')) {
      const primaryType = state.types[0];
      const zCrystal = Object.values(ITEMS).find(i => i.category === 'zmove' && i.zType === primaryType);
      if (zCrystal) {
        results.push({
          ...zCrystal,
          score: currentSlot?.mechanic === 'zmove' ? 190 : 105,
          badge: '💎 Cristal Z STAB',
          reason: `Libera o Z-Move supremo do tipo ${TYPES[primaryType]?.name}`
        });
      }
    }

    // 4. Itens curados do Pokémon + itens universais compatíveis com a geração do jogo
    Object.values(ITEMS).forEach(item => {
      if (item.category === 'mega' || item.category === 'primal' || item.category === 'zmove') return;
      if (item.minGen > maxGen && game.generation !== 99) return;
      if (results.some(r => r.id === item.id)) return;

      let score = 40;
      let badge = 'Item Útil';
      let reason = item.desc;

      const idxInBest = (pokemon.bestItems || []).indexOf(item.id);
      if (idxInBest !== -1) {
        score += 65 - (idxInBest * 8);
        badge = idxInBest === 0 ? '★ Melhor Escolha' : '⭐ Altamente Recomendado';
      }

      // Bônus por sinergia de tipo (Charcoal, Mystic Water, etc. especialmente forte em Gen 2-3)
      if (item.category === 'type-boost' && state.types.includes(item.boostType)) {
        score += (maxGen <= 3 ? 45 : 22);
        if (badge === 'Item Útil') badge = '🔥 Bônus STAB +20%';
      }

      // Heavy-Duty Boots para quem é fraco a Pedra (Fogo, Voador, Gelo, Inseto)
      if (item.id === 'heavy-duty-boots' && state.types.some(t => ['fire', 'flying', 'ice', 'bug'].includes(t))) {
        score += 20;
        reason = 'Elimina o dano de Stealth Rock contra seu tipo Fogo/Voador/Gelo/Inseto!';
      }

      // Black Sludge apenas para Venenoso
      if (item.id === 'black-sludge' && !state.types.includes('poison')) {
        return;
      }

      results.push({
        ...item,
        score,
        badge,
        reason
      });
    });

    results.sort((a, b) => b.score - a.score);
    return results;
  }

  // ==========================================================================
  // MOTOR DE RECOMENDAÇÃO DE POKÉMON PARA A EQUIPE (COBERTURA DE FRAQUEZAS E DEFESAS)
  // ==========================================================================
  function getRecommendedPokemonForTeam(teamSlots, game, filterOptions = {}) {
    const analysis = analyzeTeam(teamSlots, game);
    const activeTypes = analysis.activeTypes;
    const mode = game ? game.typeChartMode : 'modern';
    const currentIds = new Set(teamSlots.filter(s => s && s.pokemon).map(s => s.pokemon.id));
    const hasMegaInTeam = teamSlots.some(s => s && s.pokemon && s.mechanic === 'mega');

    const candidates = POKEMON.filter(mon => {
      if (!filterOptions.includeCurrentTeam && currentIds.has(mon.id)) return false;
      // Filtra por disponibilidade na geração do jogo (a menos que filterOptions.allowNationalDex esteja ativo)
      if (!filterOptions.allowNationalDex && game && game.maxDexGen) {
        const isFeatured = (game.featuredMons || []).some(f => f.toLowerCase() === mon.id.toLowerCase());
        const isStarter = (game.starters || []).includes(mon.starterRef) || (game.starters || []).includes(mon.id);
        if (!isFeatured && !isStarter && mon.gen > game.maxDexGen) return false;
      }
      // Se não estiver pesquisando nem no modo Pokédex completa, prioriza formas finais nas recomendações
      if (!filterOptions.includePreEvos && !filterOptions.searchQuery && mon.isFinalEvo === false) {
        return false;
      }
      if (filterOptions.typeFilter && filterOptions.typeFilter !== 'all') {
        if (!mon.types.includes(filterOptions.typeFilter)) return false;
      }
      if (filterOptions.mechanicFilter === 'mega') {
        if (!mon.mega) return false;
      }
      if (filterOptions.searchQuery) {
        const rawQ = filterOptions.searchQuery.toLowerCase().trim();
        const numQ = rawQ.replace(/^#0*/, '');
        const paddedDex = String(mon.dex).padStart(3, '0');
        const matchName = mon.name.toLowerCase().includes(rawQ) || mon.id.toLowerCase().includes(rawQ);
        const matchRole = (mon.role || '').toLowerCase().includes(rawQ);
        const matchDex = String(mon.dex) === numQ || paddedDex.includes(rawQ.replace('#', ''));
        if (!matchName && !matchRole && !matchDex) return false;
      }
      return true;
    });

    const scoredCandidates = candidates.map(mon => {
      // Se o jogo suporta Mega e a equipe ainda não tem Mega, avalia o Pokémon considerando sua potencial Mega
      const canBeTeamMega = !hasMegaInTeam && mon.mega && game && game.mechanics.includes('mega');
      const virtualSlot = {
        pokemon: mon,
        mechanic: canBeTeamMega ? 'mega' : null
      };
      const state = getEffectivePokemonState(virtualSlot, game);
      const defProf = getPokemonDefensiveProfile(virtualSlot, game);

      let rawScore = 45;
      const coveredWeaknesses = [];
      const immunitiesAdded = [];
      const sharedBadWeaknesses = [];
      const offensiveGapsCovered = [];

      // 1. Cobertura Defensiva: O candidato resiste ou é imune às fraquezas da equipe?
      activeTypes.forEach(t => {
        const mult = defProf[t];
        const teamCell = analysis.defenseMatrix[t];

        if (mult < 1) {
          if (mult === 0) {
            immunitiesAdded.push(TYPES[t].name);
            rawScore += 7;
          }
          // Se a equipe tem fraqueza descoberta a esse tipo, grande bônus!
          if (teamCell.totalWeak >= 2 && teamCell.totalSafe === 0) {
            rawScore += (mult === 0 ? 22 : 16);
            coveredWeaknesses.push(`${TYPES[t].name} (${mult === 0 ? 'Imune' : 'Resiste'})`);
          } else if (teamCell.totalWeak >= 1 && teamCell.netScore < 0) {
            rawScore += (mult === 0 ? 14 : 10);
            coveredWeaknesses.push(`${TYPES[t].name}`);
          } else if (teamCell.totalSafe === 0 && analysis.filledCount >= 2) {
            rawScore += 5;
          }
        } else if (mult > 1) {
          // Penaliza se empilhar uma fraqueza que a equipe já sofre muito!
          if (teamCell.totalWeak >= 2) {
            rawScore -= (mult >= 4 ? 18 : 11);
            sharedBadWeaknesses.push(TYPES[t].name);
          }
        }
      });

      // 2. Cobertura Ofensiva (STAB + Melhores Ataques cobrem lacunas da equipe)
      const moveTypes = new Set(state.types);
      (mon.bestMoves || []).slice(0, 4).forEach(mId => {
        if (MOVES[mId] && MOVES[mId].power > 0) moveTypes.add(MOVES[mId].type);
      });

      activeTypes.forEach(defType => {
        const hitsSuper = [...moveTypes].some(atkT => getSingleTypeEffectiveness(atkT, defType, mode) >= 2);
        if (hitsSuper) {
          if (analysis.offensiveGaps.includes(defType)) {
            rawScore += 7;
            offensiveGapsCovered.push(TYPES[defType].name);
          }
        }
      });

      // 3. Diversidade de Tipos (evitar repetir exatamente os mesmos tipos na equipe)
      const existingTypes = new Set();
      teamSlots.forEach(s => {
        if (s && s.pokemon) {
          const st = getEffectivePokemonState(s, game);
          st.types.forEach(t => existingTypes.add(t));
        }
      });
      const bringsNewType = state.types.every(t => !existingTypes.has(t));
      const overlapsAllTypes = state.types.every(t => existingTypes.has(t));
      if (bringsNewType && analysis.filledCount > 0) rawScore += 12;
      if (overlapsAllTypes && analysis.filledCount > 0) rawScore -= 14;

      // 4. Bônus se for Destaque / Starter daquele Jogo (ex: Unbound / Lazarus / Regional Meta)
      const isStarterInGame = game && (game.starters || []).includes(mon.starterRef);
      const isFeaturedInGame = game && (game.featuredMons || []).some(f => f.toLowerCase() === mon.id.toLowerCase());
      if (isStarterInGame && analysis.filledCount === 0) rawScore += 20;
      if (isFeaturedInGame) rawScore += 12;

      // 5. Qualidade de Atributos (BST) e Mega Evolução disponível
      rawScore += Math.round((state.bst - 480) / 14);
      if (canBeTeamMega) rawScore += 10;

      const synergyPercent = Math.max(25, Math.min(99, Math.round(rawScore)));

      // Monta justificativa clara em Português
      const reasons = [];
      if (coveredWeaknesses.length > 0) {
        reasons.push(`🛡️ Cobre fraquezas a ${coveredWeaknesses.slice(0, 3).join(', ')}`);
      } else if (immunitiesAdded.length > 0) {
        reasons.push(`🛡️ Imune a ${immunitiesAdded.slice(0, 2).join(', ')}`);
      }
      if (offensiveGapsCovered.length > 0) {
        reasons.push(`⚔️ Ataca 2x contra ${offensiveGapsCovered.slice(0, 3).join(', ')}`);
      }
      if (canBeTeamMega) {
        reasons.push(`🧬 Adiciona ${mon.mega.name} à equipe`);
      }
      if (isStarterInGame) {
        reasons.push(`🌟 Inicial oficial deste jogo`);
      } else if (isFeaturedInGame && reasons.length < 2) {
        reasons.push(`🏆 Top Tier na campanha de ${game.region}`);
      }

      return {
        pokemon: mon,
        state,
        synergyPercent,
        coveredWeaknesses,
        immunitiesAdded,
        offensiveGapsCovered,
        sharedBadWeaknesses,
        canBeTeamMega,
        isStarterInGame,
        isFeaturedInGame,
        reasonText: reasons.join(' • ') || `${mon.role} com excelente distribuição de atributos (${state.bst} BST).`
      };
    });

    scoredCandidates.sort((a, b) => b.synergyPercent - a.synergyPercent);
    return scoredCandidates;
  }

  // Cria um slot de equipe completo e já otimizado (com os 4 melhores ataques, melhor item e mecânica ideal)
  function createOptimizedSlot(pokemon, game, currentTeamSlots = [], forcedMechanic = null, forcedTera = null) {
    if (!pokemon) return null;
    const hasMegaAlready = currentTeamSlots.some(s => s && s.pokemon && s.mechanic === 'mega');
    const hasZMoveAlready = currentTeamSlots.some(s => s && s.pokemon && s.mechanic === 'zmove');

    let mechanic = forcedMechanic;
    if (!mechanic && game) {
      if (game.mechanics.includes('mega') && pokemon.mega && !hasMegaAlready) {
        mechanic = 'mega';
      } else if (game.mechanics.includes('primal') && pokemon.primal) {
        mechanic = 'primal';
      } else if (game.mechanics.includes('tera')) {
        mechanic = 'tera';
      } else if (game.mechanics.includes('zmove') && !hasZMoveAlready && currentTeamSlots.filter(s => s && s.pokemon).length >= 4) {
        mechanic = 'zmove';
      }
    }

    const teraType = forcedTera || pokemon.bestTera || pokemon.types[0];
    const tempSlot = {
      pokemon,
      mechanic,
      megaVariant: 'default',
      teraType,
      applyTeraDefense: false,
      ability: (pokemon.abilities && pokemon.abilities[0]) || 'Overgrow',
      nature: pokemon.bestNature || 'Adamant (+Atk, -SpA)',
      item: null,
      moves: [null, null, null, null]
    };

    const currentAnalysis = analyzeTeam(currentTeamSlots, game);
    const moveRecs = getRecommendedMovesForPokemon(pokemon, game, currentAnalysis, tempSlot);
    tempSlot.moves = [
      moveRecs.top4Ids[0] || null,
      moveRecs.top4Ids[1] || null,
      moveRecs.top4Ids[2] || null,
      moveRecs.top4Ids[3] || null
    ];

    const itemRecs = getRecommendedItemsForPokemon(pokemon, game, tempSlot);
    if (itemRecs.length > 0 && (!game || game.hasItems)) {
      tempSlot.item = itemRecs[0].id;
    }

    return tempSlot;
  }

  // Busca qualquer Pokémon extra direto da PokéAPI caso o usuário digite um nome/número que não esteja no catálogo local
  async function fetchPokemonFromPokeAPI(query) {
    const clean = String(query).toLowerCase().trim();
    if (!clean) return null;
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(clean)}`);
      if (!res.ok) return null;
      const data = await res.json();

      const types = data.types.map(t => t.type.name).filter(t => TYPES[t]);
      const statsMap = { hp: 70, atk: 70, def: 70, spa: 70, spd: 70, spe: 70 };
      data.stats.forEach(s => {
        if (s.stat.name === 'hp') statsMap.hp = s.base_stat;
        if (s.stat.name === 'attack') statsMap.atk = s.base_stat;
        if (s.stat.name === 'defense') statsMap.def = s.base_stat;
        if (s.stat.name === 'special-attack') statsMap.spa = s.base_stat;
        if (s.stat.name === 'special-defense') statsMap.spd = s.base_stat;
        if (s.stat.name === 'speed') statsMap.spe = s.base_stat;
      });

      const abilities = data.abilities.map(a =>
        a.ability.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      );

      // Infere geração pelo ID da National Dex
      const dex = data.id;
      let gen = 9;
      if (dex <= 151) gen = 1;
      else if (dex <= 251) gen = 2;
      else if (dex <= 386) gen = 3;
      else if (dex <= 493) gen = 4;
      else if (dex <= 649) gen = 5;
      else if (dex <= 721) gen = 6;
      else if (dex <= 809) gen = 7;
      else if (dex <= 905) gen = 8;

      // Infere melhores ataques compatíveis a partir dos movimentos que aprende na PokéAPI
      const apiMoveNames = new Set(data.moves.map(m => m.move.name));
      const matchedMoves = Object.keys(MOVES).filter(mId => apiMoveNames.has(mId));
      // Se tiver poucos, adiciona STABs padrão
      types.forEach(t => {
        Object.keys(MOVES).forEach(mId => {
          if (MOVES[mId].type === t && !matchedMoves.includes(mId)) {
            matchedMoves.push(mId);
          }
        });
      });

      const isPhys = statsMap.atk >= statsMap.spa;
      const role = statsMap.spe >= 100
        ? (isPhys ? 'Fast Physical Sweeper' : 'Fast Special Sweeper')
        : (statsMap.hp + statsMap.def >= 180 ? 'Bulky Tank / Pivot' : 'Balanced Attacker');

      const newMon = {
        id: data.name,
        dex: dex <= 1025 ? dex : dex,
        spriteId: data.id,
        name: data.name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        gen,
        types,
        role,
        stats: statsMap,
        abilities: abilities.length ? abilities : ['Overgrow'],
        bestNature: isPhys ? 'Jolly (+Spe, -SpA)' : 'Timid (+Spe, -Atk)',
        bestMoves: matchedMoves.slice(0, 10),
        bestItems: ['leftovers', 'life-orb', 'heavy-duty-boots', 'focus-sash'],
        bestTera: types[0] || 'normal'
      };

      // Adiciona ao banco em memória para uso imediato
      if (!POKEMON.some(p => p.id === newMon.id)) {
        POKEMON.push(newMon);
      }
      return newMon;
    } catch (e) {
      return null;
    }
  }

  // Gera o URL oficial de sprite da PokéAPI (com fallback seguro)
  function getSpriteUrl(spriteId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteId}.png`;
  }

  return {
    getActiveTypesForGame,
    getSingleTypeEffectiveness,
    getEffectivePokemonState,
    getPokemonDefensiveProfile,
    analyzeTeam,
    getRecommendedMovesForPokemon,
    getRecommendedItemsForPokemon,
    getRecommendedPokemonForTeam,
    createOptimizedSlot,
    fetchPokemonFromPokeAPI,
    getSpriteUrl
  };
})();
