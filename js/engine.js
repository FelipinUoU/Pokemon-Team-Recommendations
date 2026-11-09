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
    // Regra: Em jogos com itens segurados, o Pokémon está em Mega Evolução se e somente se estiver segurando sua Mega Stone!
    const megaActive = isPokemonMegaActive(slot, game);
    const primalActive = isPokemonPrimalActive(slot, game);

    if (megaActive) {
      slot.mechanic = 'mega';
      const useAltMega = (!game || game.hasItems)
        ? Boolean(mon.megaAlt && canPokemonMegaAltInGame(mon, game) && slot.item === mon.megaAlt.stone)
        : Boolean(slot.megaVariant === 'x' && canPokemonMegaAltInGame(mon, game));
      if (useAltMega) slot.megaVariant = 'x';
      else if (slot.megaVariant === 'x' && (!game || game.hasItems)) slot.megaVariant = 'default';
      const megaData = useAltMega ? mon.megaAlt : mon.mega;
      types = [...megaData.types];
      stats = { ...megaData.stats };
      ability = megaData.ability;
      displayName = megaData.name;
      spriteId = megaData.spriteId || spriteId;
      activeMechanicNote = megaData.note;
    } else if (primalActive) {
      slot.mechanic = 'primal';
      types = [...mon.primal.types];
      stats = { ...mon.primal.stats };
      ability = mon.primal.ability;
      displayName = mon.primal.name;
      spriteId = mon.primal.spriteId || spriteId;
      activeMechanicNote = mon.primal.note;
    } else {
      if (game && game.hasItems && (slot.mechanic === 'mega' || slot.mechanic === 'primal')) {
        slot.mechanic = null;
      }
      if (slot.mechanic === 'tera' && slot.teraType && game && game.mechanics.includes('tera')) {
        if (slot.applyTeraDefense) {
          types = [slot.teraType];
        }
        activeMechanicNote = `Tera Tipo: ${TYPES[slot.teraType]?.name || slot.teraType} (Bônus STAB e mudança defensiva sob Terastal)`;
      }
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
        const memberInfo = {
          id: slot.pokemon.id,
          dex: slot.pokemon.dex,
          name: state.name,
          spriteId: state.spriteId
        };
        if (m >= 4) {
          cell.weak4x++;
          cell.totalWeak++;
          cell.netScore -= 2.2;
          cell.weakMembers.push({ ...memberInfo, mult: '4x' });
        } else if (m > 1) {
          cell.weak2x++;
          cell.totalWeak++;
          cell.netScore -= 1;
          cell.weakMembers.push({ ...memberInfo, mult: '2x' });
        } else if (m === 0) {
          cell.immune++;
          cell.totalSafe++;
          cell.netScore += 1.6;
          cell.safeMembers.push({ ...memberInfo, mult: '0x' });
        } else if (m <= 0.25) {
          cell.resist4x++;
          cell.totalSafe++;
          cell.netScore += 1.4;
          cell.safeMembers.push({ ...memberInfo, mult: '¼x' });
        } else if (m < 1) {
          cell.resist2x++;
          cell.totalSafe++;
          cell.netScore += 1;
          cell.safeMembers.push({ ...memberInfo, mult: '½x' });
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

  // Verifica se o Pokémon pode Mega Evoluir no jogo selecionado (Megas de Legends: Z-A / DLC ficam ativas em Legends: Z-A e Fan Games)
  function canPokemonMegaInGame(pokemon, game) {
    if (!pokemon || !pokemon.mega || !game || !game.mechanics || !game.mechanics.includes('mega')) return false;
    if (pokemon.mega.isLzaMega && !['gen9-lza', 'fangame-unbound', 'fangame-lazarus'].includes(game.id)) {
      return false;
    }
    return true;
  }

  function canPokemonMegaAltInGame(pokemon, game) {
    if (!pokemon || !pokemon.megaAlt || !game || !game.mechanics || !game.mechanics.includes('mega')) return false;
    if (pokemon.megaAlt.isLzaMega && !['gen9-lza', 'fangame-unbound', 'fangame-lazarus'].includes(game.id)) {
      return false;
    }
    return true;
  }

  // Verifica se o Pokémon do slot está efetivamente Mega Evoluído (exige carregar sua Mega Stone nos jogos com itens)
  function isPokemonMegaActive(slot, game) {
    if (!slot || !slot.pokemon || !canPokemonMegaInGame(slot.pokemon, game)) return false;
    if (!game || game.hasItems) {
      const isPrimaryStone = Boolean(slot.pokemon.mega && slot.item === slot.pokemon.mega.stone);
      const isAltStone = Boolean(slot.pokemon.megaAlt && canPokemonMegaAltInGame(slot.pokemon, game) && slot.item === slot.pokemon.megaAlt.stone);
      return isPrimaryStone || isAltStone;
    }
    return slot.mechanic === 'mega';
  }

  function isPokemonPrimalActive(slot, game) {
    if (!slot || !slot.pokemon || !slot.pokemon.primal || !game || !game.mechanics || !game.mechanics.includes('primal')) return false;
    if (game.hasItems) {
      return slot.item === slot.pokemon.primal.stone;
    }
    return slot.mechanic === 'primal';
  }

  // Retorna a mecânica ativa exibida no selo do slot (Mega só aparece se estiver segurando a Mega Stone correspondente)
  function getActiveSlotMechanic(slot, game) {
    if (!slot || !slot.pokemon) return null;
    if (isPokemonMegaActive(slot, game)) return 'mega';
    if (isPokemonPrimalActive(slot, game)) return 'primal';
    if (slot.mechanic === 'mega' || slot.mechanic === 'primal') return null;
    if (slot.mechanic === 'zmove' && game && game.hasItems) {
      const itemObj = slot.item ? ITEMS[slot.item] : null;
      if (!itemObj || itemObj.category !== 'zmove') return null;
    }
    if (slot.mechanic && game && game.mechanics && game.mechanics.includes(slot.mechanic)) {
      return slot.mechanic;
    }
    return null;
  }

  // ==========================================================================
  // RECOMENDADOR DE MELHOR ITEM PARA UM POKÉMON (RESPEITANDO GERAÇÃO E MECÂNICA)
  // ==========================================================================
  function getRecommendedItemsForPokemon(pokemon, game, currentSlot) {
    if (!pokemon || (game && !game.hasItems)) return [];
    const maxGen = game ? game.maxDexGen : 9;
    const state = getEffectivePokemonState(currentSlot || { pokemon }, game);
    const wantsMega = Boolean(currentSlot && (currentSlot.mechanic === 'mega' || isPokemonMegaActive(currentSlot, game)));

    const results = [];

    // 1. Se Mega Evolução está ativa ou disponível
    if (canPokemonMegaInGame(pokemon, game)) {
      const hasAlt = canPokemonMegaAltInGame(pokemon, game);
      const stoneId = (currentSlot?.megaVariant === 'x' && hasAlt)
        ? pokemon.megaAlt.stone
        : pokemon.mega.stone;
      const stoneItem = ITEMS[stoneId];
      if (stoneItem) {
        results.push({
          ...stoneItem,
          score: wantsMega ? 200 : 95,
          badge: '🧬 Mega Stone Oficial',
          reason: `Necessária para transformar em ${currentSlot?.megaVariant === 'x' && hasAlt ? pokemon.megaAlt.name : pokemon.mega.name}`
        });
      }
      if (hasAlt) {
        const altStone = ITEMS[pokemon.megaAlt.stone];
        if (altStone && altStone.id !== stoneId) {
          results.push({
            ...altStone,
            score: wantsMega ? 190 : 92,
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

  // Dex clássicas de Hoenn, Sinnoh, Unova B2W2, Kalos, Alola, Galar, Hisui e Paldea (Pokémon de gerações anteriores presentes na Pokédex Regional)
  const HOENN_RETURNING_DEX = new Set([
    25, 26, 27, 28, 37, 38, 39, 40, 41, 42, 43, 44, 45, 54, 55, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76,
    81, 82, 84, 85, 88, 89, 100, 101, 109, 110, 111, 112, 116, 117, 118, 119, 120, 121, 127, 129, 130,
    169, 170, 171, 172, 174, 177, 178, 182, 183, 184, 202, 203, 214, 222, 227, 230, 231, 232
  ]);
  const SINNOH_RETURNING_DEX = new Set([
    25, 26, 35, 36, 41, 42, 54, 55, 63, 64, 65, 66, 67, 68, 72, 73, 74, 75, 76, 77, 78, 81, 82, 92, 93, 94,
    95, 108, 111, 112, 113, 114, 118, 119, 122, 123, 125, 126, 129, 130, 133, 134, 135, 136, 137, 143,
    163, 164, 169, 172, 173, 175, 176, 183, 184, 185, 190, 193, 194, 195, 196, 197, 198, 200, 201, 203,
    207, 208, 212, 214, 215, 220, 221, 223, 224, 226, 228, 229, 233, 239, 240, 242,
    265, 266, 267, 268, 269, 278, 279, 280, 281, 282, 299, 307, 308, 315, 333, 334, 339, 340, 349, 350, 355, 356, 357, 358, 359, 361, 362
  ]);
  const B2W2_RETURNING_DEX = new Set([
    25, 26, 27, 28, 35, 36, 37, 38, 39, 40, 41, 42, 54, 55, 58, 59, 60, 61, 62, 74, 75, 76, 81, 82, 88, 89,
    95, 108, 109, 110, 113, 114, 116, 117, 120, 121, 123, 125, 126, 127, 129, 130, 131, 132, 133, 134, 135, 136,
    147, 148, 149, 169, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 183, 184, 185, 186, 191, 192, 193,
    196, 197, 206, 207, 208, 212, 213, 214, 215, 220, 221, 222, 223, 224, 225, 226, 227, 230, 239, 240, 242, 246, 247, 248,
    270, 271, 272, 276, 277, 278, 279, 280, 281, 282, 283, 284, 287, 288, 289, 298, 299, 300, 301, 302, 303, 304, 305, 306,
    315, 316, 317, 318, 319, 320, 321, 322, 323, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338,
    341, 342, 343, 344, 353, 354, 357, 359, 360, 363, 364, 365, 371, 372, 373, 374, 375, 376,
    406, 407, 415, 416, 418, 419, 425, 426, 427, 428, 434, 435, 436, 437, 438, 440, 442, 443, 444, 445, 446, 447, 448,
    451, 452, 453, 454, 456, 457, 458, 461, 462, 463, 465, 466, 467, 468, 469, 470, 471, 472, 473, 475, 476, 478
  ]);

  // ==========================================================================
  // CONJUNTOS DE POKÉMON EXCLUSIVOS DE DLC NOS JOGOS MODERNOS (GEN 8 & GEN 9)
  // ==========================================================================
  // Pokémon exclusivos das DLCs de Sword / Shield (The Isle of Armor & The Crown Tundra)
  const SWSH_DLC_DEX = new Set([
    1, 2, 3, 7, 8, 9, 27, 28, 29, 30, 31, 32, 33, 34, 39, 40, 41, 42, 54, 55, 60, 61, 62, 63, 64, 65,
    72, 73, 79, 80, 81, 82, 102, 103, 104, 105, 108, 113, 114, 115, 116, 117, 120, 121, 123, 124, 125, 126, 127, 128,
    137, 138, 139, 140, 141, 142, 144, 145, 146, 147, 148, 149, 150, 151,
    169, 173, 174, 179, 180, 181, 183, 184, 186, 199, 206, 212, 214, 226, 227, 230, 233, 238, 239, 240, 241, 242, 243, 244, 245, 249, 250, 251,
    252, 253, 254, 255, 256, 257, 258, 259, 260, 293, 294, 295, 298, 304, 305, 306, 318, 319, 333, 334, 345, 346, 347, 348, 359, 363, 364, 365, 369,
    371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385,
    403, 404, 405, 427, 428, 440, 442, 443, 444, 445, 451, 452, 462, 463, 465, 466, 467, 469, 474, 480, 481, 482, 483, 484, 485, 486, 487, 488, 494,
    506, 507, 508, 531, 543, 544, 545, 548, 549, 551, 552, 553, 561, 564, 565, 566, 567, 570, 571, 587, 590, 591, 615, 619, 620, 621, 626, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 649,
    661, 662, 663, 679, 680, 681, 690, 691, 692, 693, 696, 697, 698, 699, 702, 703, 707, 716, 717, 718, 719, 721,
    722, 723, 724, 725, 726, 727, 728, 729, 730, 744, 745, 753, 754, 764, 769, 770, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795, 796, 797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807,
    891, 892, 893, 894, 895, 896, 897, 898
  ]);

  // Pokémon exclusivos das DLCs de Scarlet / Violet (The Teal Mask & The Indigo Disk)
  const SV_DLC_DEX = new Set([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 23, 24, 27, 28, 35, 36, 37, 38, 43, 44, 45, 60, 61, 62, 69, 70, 71, 72, 73, 74, 75, 76, 79, 84, 85, 86, 87, 95,
    102, 103, 106, 107, 108, 109, 110, 111, 112, 116, 117, 123, 125, 126, 131, 137, 143, 144, 145, 146, 150, 151,
    152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 167, 168, 173, 182, 186, 190, 193, 199, 207, 208, 209, 210, 218, 219, 220, 221, 227, 230, 233, 235, 236, 237, 239, 240, 243, 244, 245, 249, 250,
    252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 270, 271, 272, 273, 274, 275, 299, 307, 308, 311, 312, 313, 314, 315, 322, 323, 328, 329, 330, 339, 340, 341, 342, 349, 350, 355, 356, 358, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386,
    387, 388, 389, 390, 391, 392, 393, 394, 395, 401, 402, 406, 407, 408, 409, 410, 411, 417, 424, 433, 446, 463, 464, 466, 467, 469, 472, 473, 474, 476, 477, 480, 481, 482, 483, 484, 485, 486, 487, 488, 491, 492, 493,
    495, 496, 497, 498, 499, 500, 501, 502, 503, 522, 523, 529, 530, 532, 533, 534, 540, 541, 542, 546, 547, 559, 560, 572, 573, 577, 578, 579, 595, 596, 607, 608, 609, 619, 620, 622, 623, 629, 630, 638, 639, 640, 643, 644, 646, 647, 648,
    650, 651, 652, 653, 654, 655, 656, 657, 658, 677, 678, 686, 687, 703, 708, 709, 719, 720, 721,
    722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 736, 737, 738, 742, 743, 751, 752, 764, 774, 779, 782, 783, 784, 791, 792, 800, 801,
    810, 811, 812, 813, 814, 815, 816, 817, 818, 845, 868, 869, 877, 884, 891, 892, 894, 895, 896, 897, 898, 900, 901,
    1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025
  ]);
  const SV_DLC_IDS = new Set([
    'sandshrew-alola', 'sandslash-alola', 'vulpix-alola', 'ninetales-alola', 'raichu-alola'
  ]);

  // Pokémon & Megas exclusivos da DLC de Pokémon Legends: Z-A ("Mega Dimension")
  const LZA_DLC_DEX = new Set([
    25, 26, 172, 358, 396, 397, 398, 433, 485, 491, 622, 623, 677, 678, 739, 740, 767, 768,
    801, 807, 951, 952, 969, 970, 978, 996, 997, 998
  ]);

  // Retorna informações do selo "DLC" caso o Pokémon (ou Mega ativa) seja exclusivo de uma DLC nos jogos atuais
  function getDlcBadgeInfo(mon, game, slot = null) {
    if (!mon || !game) return null;

    if (game.id === 'gen8-swsh') {
      if (SWSH_DLC_DEX.has(mon.dex)) {
        return {
          label: 'DLC',
          dlcName: 'Pokémon Sword/Shield Expansion Pass (Isle of Armor / Crown Tundra)'
        };
      }
    } else if (game.id === 'gen9-sv') {
      if (SV_DLC_DEX.has(mon.dex) || SV_DLC_IDS.has(mon.id)) {
        return {
          label: 'DLC',
          dlcName: 'Pokémon Scarlet/Violet DLC: The Hidden Treasure of Area Zero (Teal Mask / Indigo Disk)'
        };
      }
    } else if (game.id === 'gen9-lza') {
      const hasDlcMegaActive = slot && slot.mechanic === 'mega' && (
        (slot.megaVariant === 'x' && mon.megaAlt && mon.megaAlt.isDlcMega) ||
        (slot.megaVariant !== 'x' && mon.mega && mon.mega.isDlcMega)
      );
      const isPrimaryDlcMegaMon = Boolean(mon.mega && mon.mega.isDlcMega);
      if (LZA_DLC_DEX.has(mon.dex) || isPrimaryDlcMegaMon || hasDlcMegaActive) {
        return {
          label: 'DLC',
          dlcName: 'Pokémon Legends: Z-A — DLC Mega Dimension'
        };
      }
    }
    return null;
  }

  // Exclusivos de versão: Pokémon que NÃO podem ser capturados naquela versão específica (exclusivos da versão oposta)
  const VERSION_EXCLUSIONS = {
    // Geração I — Red / Blue / Yellow
    'Red': { dex: new Set([27, 28, 37, 38, 52, 53, 69, 70, 71, 126, 127]) },
    'Blue': { dex: new Set([23, 24, 43, 44, 45, 56, 57, 58, 59, 123, 125]) },
    'Yellow': { dex: new Set([13, 14, 15, 23, 24, 26, 52, 53, 109, 110, 124, 125, 126]) },

    // Geração II — Gold / Silver / Crystal
    'Gold': { dex: new Set([37, 38, 52, 53, 165, 166, 225, 227, 231, 232]) },
    'Silver': { dex: new Set([56, 57, 58, 59, 167, 168, 207, 216, 217, 226]) },
    'Crystal': { dex: new Set([37, 38, 56, 57, 179, 180, 181, 203, 223, 224]) },

    // Geração III — Ruby / Sapphire / Emerald
    'Ruby': { dex: new Set([270, 271, 272, 302, 336, 337, 380, 382]) },
    'Sapphire': { dex: new Set([273, 274, 275, 303, 335, 338, 381, 383]) },
    'Emerald': { dex: new Set([283, 284, 307, 308, 315, 335, 337]) },

    // Geração III — FireRed / LeafGreen
    'FireRed': { dex: new Set([27, 28, 37, 38, 69, 70, 71, 79, 80, 120, 121, 126, 127, 183, 184, 199, 200, 215, 223, 224, 226, 240, 298]) },
    'LeafGreen': { dex: new Set([23, 24, 43, 44, 45, 54, 55, 58, 59, 90, 91, 123, 125, 182, 194, 195, 198, 211, 212, 225, 227, 239]) },

    // Geração IV — Diamond / Pearl / Platinum
    'Diamond': { dex: new Set([79, 80, 127, 185, 199, 200, 228, 229, 234, 363, 364, 365, 371, 372, 373, 410, 411, 429, 431, 432, 438, 484]) },
    'Pearl': { dex: new Set([86, 87, 122, 123, 198, 212, 246, 247, 248, 261, 262, 304, 305, 306, 352, 408, 409, 430, 434, 435, 439, 483]) },
    'Platinum': { dex: new Set([198, 200, 328, 329, 330, 366, 367, 368, 429, 430, 431, 432, 434, 435]) },

    // Geração IV — HeartGold / SoulSilver
    'HeartGold': { dex: new Set([37, 38, 52, 53, 127, 165, 166, 216, 217, 225, 227, 303, 316, 317, 345, 346, 371, 372, 373, 381, 383]) },
    'SoulSilver': { dex: new Set([27, 28, 56, 57, 58, 59, 123, 167, 168, 207, 226, 231, 232, 302, 343, 344, 347, 348, 380, 382, 458, 472]) },

    // Geração V — Black / White & Black 2 / White 2
    'Black': { dex: new Set([548, 549, 577, 578, 579, 627, 628, 642, 644]) },
    'White': { dex: new Set([546, 547, 574, 575, 576, 629, 630, 641, 643]) },
    'Black 2': { dex: new Set([122, 125, 127, 239, 300, 301, 322, 323, 378, 380, 427, 428, 439, 466, 548, 549, 577, 578, 579, 627, 628, 643]) },
    'White 2': { dex: new Set([126, 185, 214, 240, 325, 326, 379, 381, 438, 443, 444, 445, 467, 546, 547, 574, 575, 576, 629, 630, 644]) },

    // Geração VI — X / Y & Omega Ruby / Alpha Sapphire
    'X': { dex: new Set([90, 91, 138, 139, 214, 246, 247, 248, 309, 310, 509, 510, 538, 682, 683, 690, 691, 717]) },
    'Y': { dex: new Set([120, 121, 127, 140, 141, 228, 229, 261, 262, 304, 305, 306, 539, 684, 685, 692, 693, 716]) },
    'Omega Ruby': { dex: new Set([270, 271, 272, 302, 336, 337, 380, 382]) },
    'Alpha Sapphire': { dex: new Set([273, 274, 275, 303, 335, 338, 381, 383]) },

    // Geração VII — Sun / Moon / Ultra Sun / Ultra Moon / Let's Go
    'Sun': {
      dex: new Set([27, 28, 410, 411, 548, 549, 566, 567, 629, 630, 765, 780, 792, 795, 797]),
      ids: new Set(['sandshrew-alola', 'sandslash-alola'])
    },
    'Moon': {
      dex: new Set([37, 38, 408, 409, 546, 547, 564, 565, 627, 628, 766, 776, 791, 794, 798]),
      ids: new Set(['vulpix-alola', 'ninetales-alola'])
    },
    'Ultra Sun': {
      dex: new Set([27, 28, 309, 310, 343, 344, 410, 411, 548, 549, 566, 567, 629, 630, 690, 691, 765, 780, 792, 795, 797, 805]),
      ids: new Set(['sandshrew-alola', 'sandslash-alola'])
    },
    'Ultra Moon': {
      dex: new Set([37, 38, 228, 229, 408, 409, 546, 547, 564, 565, 622, 623, 627, 628, 692, 693, 766, 776, 791, 794, 798, 806]),
      ids: new Set(['vulpix-alola', 'ninetales-alola'])
    },
    "Let's Go Pikachu": {
      dex: new Set([23, 24, 37, 38, 52, 53, 69, 70, 71, 109, 110, 127]),
      ids: new Set(['vulpix-alola', 'ninetales-alola'])
    },
    "Let's Go Eevee": {
      dex: new Set([27, 28, 43, 44, 45, 56, 57, 58, 59, 88, 89, 123]),
      ids: new Set(['sandshrew-alola', 'sandslash-alola'])
    },

    // Geração VIII — Sword / Shield (+ DLCs Isle of Armor & Crown Tundra) & Brilliant Diamond / Shining Pearl
    'Sword': {
      dex: new Set([
        77, 78, 140, 141, 214, 222, 246, 247, 248, 249, 270, 271, 272, 302, 337, 380, 382,
        443, 444, 445, 453, 454, 484, 577, 578, 579, 629, 630, 642, 644, 682, 683, 690, 691,
        704, 705, 706, 717, 765, 780, 792, 842, 864, 875, 889
      ]),
      ids: new Set(['ponyta-galar', 'rapidash-galar', 'corsola-galar'])
    },
    'Shield': {
      dex: new Set([
        83, 127, 138, 139, 250, 273, 274, 275, 303, 338, 371, 372, 373, 381, 383, 483,
        554, 555, 559, 560, 574, 575, 576, 627, 628, 633, 634, 635, 641, 643, 684, 685, 692, 693,
        716, 766, 776, 782, 783, 784, 791, 841, 865, 874, 888
      ]),
      ids: new Set(['farfetchd-galar', 'darmanitan-galar'])
    },
    'Brilliant Diamond': { dex: new Set([79, 80, 127, 185, 199, 200, 228, 229, 234, 363, 364, 365, 371, 372, 373, 410, 411, 429, 431, 432, 438, 484]) },
    'Shining Pearl': { dex: new Set([86, 87, 122, 123, 198, 212, 246, 247, 248, 261, 262, 304, 305, 306, 352, 408, 409, 430, 434, 435, 439, 483]) },

    // Geração IX — Scarlet / Violet (+ DLCs The Teal Mask & The Indigo Disk)
    'Scarlet': {
      dex: new Set([
        27, 28, 190, 200, 249, 316, 317, 371, 372, 373, 381, 382, 410, 411, 424, 429,
        638, 639, 640, 644, 692, 693, 766, 792, 875, 877, 885, 886, 887, 897,
        937, 990, 991, 992, 993, 994, 995, 1006, 1008, 1010, 1022, 1023
      ]),
      ids: new Set(['sandshrew-alola', 'sandslash-alola'])
    },
    'Violet': {
      dex: new Set([
        37, 38, 207, 243, 244, 245, 246, 247, 248, 250, 380, 383, 408, 409, 425, 426, 434, 435, 472,
        633, 634, 635, 643, 690, 691, 765, 791, 845, 874, 896,
        936, 984, 985, 986, 987, 988, 989, 1005, 1007, 1009, 1020, 1021
      ]),
      ids: new Set(['vulpix-alola', 'ninetales-alola'])
    }
  };

  // Versão "par" de cada jogo (ex.: FireRed ↔ LeafGreen).
  const VERSION_COUNTERPART = {
    'Red': 'Blue', 'Blue': 'Red',
    'Gold': 'Silver', 'Silver': 'Gold',
    'Ruby': 'Sapphire', 'Sapphire': 'Ruby',
    'FireRed': 'LeafGreen', 'LeafGreen': 'FireRed',
    'Diamond': 'Pearl', 'Pearl': 'Diamond',
    'HeartGold': 'SoulSilver', 'SoulSilver': 'HeartGold',
    'Black': 'White', 'White': 'Black',
    'Black 2': 'White 2', 'White 2': 'Black 2',
    'X': 'Y', 'Y': 'X',
    'Omega Ruby': 'Alpha Sapphire', 'Alpha Sapphire': 'Omega Ruby',
    'Sun': 'Moon', 'Moon': 'Sun',
    'Ultra Sun': 'Ultra Moon', 'Ultra Moon': 'Ultra Sun',
    "Let's Go Pikachu": "Let's Go Eevee", "Let's Go Eevee": "Let's Go Pikachu",
    'Sword': 'Shield', 'Shield': 'Sword',
    'Brilliant Diamond': 'Shining Pearl', 'Shining Pearl': 'Brilliant Diamond',
    'Scarlet': 'Violet', 'Violet': 'Scarlet'
  };

  // Cor oficial de cada versão (usada no selo de exclusivo)
  const VERSION_COLORS = {
    'Red': '#e53935', 'Blue': '#1e88e5',
    'Gold': '#d4a017', 'Silver': '#b0bec5',
    'Ruby': '#c2185b', 'Sapphire': '#1565c0',
    'FireRed': '#ff5722', 'LeafGreen': '#43a047',
    'Diamond': '#64b5f6', 'Pearl': '#f48fb1',
    'HeartGold': '#ffb300', 'SoulSilver': '#cfd8dc',
    'Black': '#2b2b2b', 'White': '#f5f5f5',
    'Black 2': '#37474f', 'White 2': '#eceff1',
    'X': '#1e5fbf', 'Y': '#d32f2f',
    'Omega Ruby': '#b71c1c', 'Alpha Sapphire': '#0d47a1',
    'Sun': '#ff9800', 'Moon': '#7e57c2',
    'Ultra Sun': '#ff6f00', 'Ultra Moon': '#5e35b1',
    "Let's Go Pikachu": '#fbc02d', "Let's Go Eevee": '#a1887f',
    'Sword': '#00a3e0', 'Shield': '#e4006f',
    'Brilliant Diamond': '#3f7fd9', 'Shining Pearl': '#e58fb3',
    'Scarlet': '#f34134', 'Violet': '#8334b7'
  };

  function isRuleExcluding(versionKey, mon) {
    const rule = VERSION_EXCLUSIONS[versionKey];
    if (!rule) return false;
    if (rule.ids && rule.ids.has(mon.id)) return true;
    if (rule.dex && rule.dex.has(mon.dex)) return true;
    return false;
  }

  // Retorna o selo de exclusivo de versão de um Pokémon (ou null se estiver disponível em ambas as versões)
  function getVersionExclusiveInfo(mon, game) {
    if (!mon || !game || !Array.isArray(game.versions)) return null;
    const primaryVer = game.versions.find(v => VERSION_COUNTERPART[v]);
    if (!primaryVer) return null;
    const counterpart = VERSION_COUNTERPART[primaryVer];
    if (!counterpart || !game.versions.includes(counterpart)) return null;

    const excludedInPrimary = isRuleExcluding(primaryVer, mon);
    const excludedInCounterpart = isRuleExcluding(counterpart, mon);
    if (excludedInPrimary === excludedInCounterpart) return null; // Disponível em ambos (ou em nenhum)

    const exclusiveVersion = excludedInPrimary ? counterpart : primaryVer;
    const color = VERSION_COLORS[exclusiveVersion] || '#8ed5ff';
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return {
      version: exclusiveVersion,
      color,
      textColor: luminance > 0.6 ? '#111827' : '#ffffff'
    };
  }

  // Retorna informações dos 2 modos do Switch: "Pokédex (Regional do Jogo)" vs "National Dex (da Época do Jogo)"
  function getDexScopeInfo(game) {
    if (!game) {
      return {
        regionalLabel: 'Pokédex Regional',
        nationalLabel: 'National Dex',
        eraNationalGen: 9
      };
    }
    const eraGen = game.id === 'fangame-unbound' ? 8 : (game.generation === 99 ? 9 : game.generation);
    const maxDexByGen = { 1: 151, 2: 251, 3: 386, 4: 493, 5: 649, 6: 721, 7: 809, 8: 905, 9: 1025 };
    const natMaxNum = maxDexByGen[eraGen] || 1025;
    return {
      regionalLabel: `Pokédex (${game.region})`,
      nationalLabel: `National Dex (Até Gen ${eraGen} • #${natMaxNum})`,
      eraNationalGen: eraGen,
      natMaxNum
    };
  }

  // Verifica se um Pokémon pertence à Pokédex Regional do jogo ou à National Dex da época em que o jogo foi lançado
  function isPokemonAvailableInGame(mon, game, useNationalDex = false) {
    if (!game) return true;
    const { eraNationalGen } = getDexScopeInfo(game);

    // Formas de Hisui só aparecem em Legends: Arceus, Gen 9, Unbound e Lazarus
    if (mon.id.endsWith('-hisui') && !['gen8-pla', 'gen9-sv', 'gen9-lza', 'fangame-unbound', 'fangame-lazarus'].includes(game.id)) {
      return false;
    }

    // 1. Limite máximo da época em que o jogo foi lançado (nunca mostra Pokémon de gerações futuras ao jogo!)
    if (mon.gen > eraNationalGen) {
      return false;
    }

    // 2. Se o Switch estiver em "National Dex", libera toda a National Dex da época!
    if (useNationalDex) {
      return true;
    }

    // 3. No modo "Pokédex" do jogo, mostra todos os Pokémon da Pokédex Regional do game (incluindo exclusivos de ambas as versões com seu selo e DLCs!)
    const isFeatured = (game.featuredMons || []).some(f => f.toLowerCase() === mon.id.toLowerCase());
    const isStarter = (game.starters || []).includes(mon.starterRef) || (game.starters || []).includes(mon.id);

    switch (game.id) {
      case 'gen1-rb':
      case 'gen1-yellow':
      case 'gen3-frlg': // Remake de Kanto: Pokédex Regional = exatamente os 151 de Kanto; National Dex = 386 da Gen 3!
        return mon.dex >= 1 && mon.dex <= 151 && mon.gen === 1;

      case 'gen7-lgpe':
        return (mon.dex >= 1 && mon.dex <= 151) || mon.dex === 808 || mon.dex === 809;

      case 'gen2-gsc':
        return mon.dex >= 1 && mon.dex <= 251 && mon.gen <= 2;

      case 'gen4-hgss': // Remake de Johto: Pokédex Regional = 256 de Johto/Kanto; National Dex = 493 da Gen 4!
        return (mon.dex >= 1 && mon.dex <= 251 && mon.gen <= 2) || [424, 438, 439, 463, 465, 469, 473].includes(mon.dex);

      case 'gen5-bw': // Black/White 1: Pokédex Regional de Unova possui exclusivamente os 156 Pokémon da Gen 5!
        return mon.gen === 5;

      case 'gen3-rse':
        return mon.gen === 3 || HOENN_RETURNING_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen6-oras': // Remake de Hoenn: Pokédex Regional = Hoenn Dex + evoluções diretas adicionadas no ORAS; National Dex = 721 da Gen 6!
        return mon.gen === 3 || HOENN_RETURNING_DEX.has(mon.dex) || [406, 407, 433, 462, 464, 475, 476, 477, 478].includes(mon.dex) || isFeatured || isStarter;

      case 'gen4-dpp':
      case 'gen8-bdsp': // Remake de Sinnoh: Pokédex Regional = Sinnoh Dex; National Dex = National Dex da época!
        return mon.gen === 4 || SINNOH_RETURNING_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen5-b2w2': // Black 2/White 2: New Unova Dex
        return mon.gen === 5 || B2W2_RETURNING_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen6-xy':
        return mon.gen === 6 || mon.gen === 1 || canPokemonMegaInGame(mon, game) || SINNOH_RETURNING_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen7-sm-usum':
        return mon.gen === 7 || mon.id.endsWith('-alola') || mon.gen === 1 || HOENN_RETURNING_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen8-swsh':
        return mon.gen === 8 || mon.id.endsWith('-galar') || B2W2_RETURNING_DEX.has(mon.dex) || SWSH_DLC_DEX.has(mon.dex) || isFeatured || isStarter;

      case 'gen8-pla':
        return mon.id.endsWith('-hisui') || mon.gen === 4 || SINNOH_RETURNING_DEX.has(mon.dex) || (mon.dex >= 899 && mon.dex <= 905) || isFeatured || isStarter;

      case 'gen9-sv':
        return mon.gen === 9 || mon.id.endsWith('-paldea') || B2W2_RETURNING_DEX.has(mon.dex) || SINNOH_RETURNING_DEX.has(mon.dex) || SV_DLC_DEX.has(mon.dex) || SV_DLC_IDS.has(mon.id) || isFeatured || isStarter;

      case 'gen9-lza':
        return mon.gen === 6 || Boolean(mon.mega) || Boolean(mon.megaAlt) || LZA_DLC_DEX.has(mon.dex) || HOENN_RETURNING_DEX.has(mon.dex) || [152, 153, 154, 158, 159, 160, 498, 499, 500].includes(mon.dex) || isFeatured || isStarter;

      case 'fangame-unbound':
        return mon.gen <= 7 || mon.id.endsWith('-hisui') || isFeatured || isStarter;

      case 'fangame-lazarus':
      default:
        return mon.gen <= eraNationalGen;
    }
  }

  // ==========================================================================
  // NUMERAÇÃO E ORDEM OFICIAL DA POKÉDEX REGIONAL DE CADA JOGO (ex: Emerald #001 Treecko)
  // ==========================================================================
  // Ordem oficial da Pokédex de Hoenn (Ruby / Sapphire / Emerald — #001 Treecko até #202 Deoxys)
  const HOENN_REGIONAL_ORDER = [
    252, 253, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275,
    276, 277, 278, 279, 280, 281, 282, 283, 284, 285, 286, 287, 288, 289, 63, 64, 65, 290, 291, 292, 293, 294, 295,
    296, 297, 118, 119, 129, 130, 298, 183, 184, 74, 75, 76, 299, 300, 301, 41, 42, 169, 72, 73, 302, 303, 304, 305, 306,
    66, 67, 68, 307, 308, 309, 310, 311, 312, 81, 82, 100, 101, 313, 314, 43, 44, 45, 182, 84, 85, 315, 316, 317, 318, 319,
    320, 321, 322, 323, 218, 219, 324, 88, 89, 109, 110, 325, 326, 27, 28, 327, 227, 328, 329, 330, 331, 332, 333, 334,
    335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 174, 39, 40, 349, 350, 351, 120, 121, 352,
    353, 354, 355, 356, 357, 358, 359, 37, 38, 172, 25, 26, 54, 55, 360, 202, 177, 178, 203, 231, 232, 127, 214, 111, 112,
    361, 362, 363, 364, 365, 366, 367, 368, 369, 222, 170, 171, 370, 116, 117, 230, 371, 372, 373, 374, 375, 376,
    377, 378, 379, 380, 381, 382, 383, 384, 385, 386
  ];

  // Ordem oficial da Pokédex de Sinnoh (Diamond / Pearl / Platinum — #001 Turtwig até #210 Giratina)
  const SINNOH_REGIONAL_ORDER = [
    387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 63, 64, 65, 129, 130,
    406, 315, 407, 41, 42, 169, 74, 75, 76, 95, 208, 408, 409, 410, 411, 66, 67, 68, 54, 55, 412, 413, 414, 265, 266, 267, 268, 269,
    415, 416, 417, 418, 419, 420, 421, 422, 423, 214, 190, 424, 425, 426, 427, 428, 92, 93, 94, 200, 429, 198, 430, 431, 432,
    118, 119, 339, 340, 433, 358, 434, 435, 307, 308, 436, 437, 77, 78, 438, 185, 439, 122, 440, 113, 242, 173, 35, 36,
    441, 172, 25, 26, 163, 164, 442, 443, 444, 445, 446, 143, 201, 447, 448, 194, 195, 278, 279, 203, 449, 450, 298, 183, 184,
    451, 452, 453, 454, 455, 223, 224, 456, 457, 72, 73, 349, 350, 458, 226, 459, 460, 215, 461, 480, 481, 482, 483, 484, 490,
    468, 175, 176, 228, 229, 280, 281, 282, 475, 108, 463, 193, 469, 333, 334, 133, 134, 135, 136, 196, 197, 470, 471,
    207, 472, 299, 476, 81, 82, 462, 137, 233, 474, 355, 356, 477, 123, 212, 239, 125, 466, 240, 126, 467, 220, 221, 473,
    361, 362, 478, 359, 479, 111, 112, 464, 114, 465, 487
  ];

  // Ordem oficial da Pokédex de Johto (Gold / Silver / Crystal / HGSS — #001 Chikorita até #251 Celebi)
  const JOHTO_REGIONAL_ORDER = [
    152, 153, 154, 155, 156, 157, 158, 159, 160, 16, 17, 18, 21, 22, 163, 164, 19, 20, 161, 162, 172, 25, 26,
    10, 11, 12, 13, 14, 15, 165, 166, 167, 168, 74, 75, 76, 41, 42, 169, 173, 35, 36, 174, 39, 40, 175, 176,
    27, 28, 23, 24, 206, 179, 180, 181, 194, 195, 92, 93, 94, 201, 95, 208, 69, 70, 71, 187, 188, 189, 46, 47,
    60, 61, 62, 186, 129, 130, 118, 119, 79, 80, 199, 43, 44, 45, 182, 96, 97, 63, 64, 65, 132, 204, 205,
    29, 30, 31, 32, 33, 34, 193, 469, 191, 192, 102, 103, 185, 202, 48, 49, 123, 212, 127, 214, 109, 110, 88, 89,
    81, 82, 100, 101, 190, 424, 209, 210, 37, 38, 58, 59, 234, 183, 184, 50, 51, 56, 57, 52, 53, 54, 55,
    66, 67, 68, 236, 106, 107, 237, 203, 128, 241, 240, 126, 238, 124, 239, 125, 122, 235, 83, 177, 178,
    211, 72, 73, 98, 99, 213, 120, 121, 90, 91, 222, 223, 224, 170, 171, 86, 87, 108, 463, 114, 465,
    133, 134, 135, 136, 196, 197, 116, 117, 230, 207, 225, 220, 221, 473, 216, 217, 231, 232, 226, 227,
    84, 85, 77, 78, 104, 105, 115, 111, 112, 198, 228, 229, 218, 219, 215, 200, 137, 233, 113, 242, 131,
    138, 139, 140, 141, 142, 143, 3, 2, 1, 6, 5, 4, 9, 8, 7, 144, 145, 146, 243, 244, 245, 147, 148, 149, 246, 247, 248, 249, 250, 150, 151, 251
  ];

  const regionalDexCache = {};

  function buildRegionalDexMapForGame(game) {
    if (!game) return new Map();
    if (regionalDexCache[game.id]) return regionalDexCache[game.id];

    const map = new Map();
    const dexToRegionalNum = new Map();
    let counter = 1;

    function getOrAssignDexNum(dexNum) {
      if (!dexToRegionalNum.has(dexNum)) {
        dexToRegionalNum.set(dexNum, counter++);
      }
      return dexToRegionalNum.get(dexNum);
    }

    function assignByDex(dexNum) {
      POKEMON.forEach(m => {
        if (m.dex === dexNum && !map.has(m.id) && isPokemonAvailableInGame(m, game, false)) {
          map.set(m.id, getOrAssignDexNum(m.dex));
        }
      });
    }

    if (['gen1-rb', 'gen1-yellow', 'gen3-frlg', 'gen7-lgpe'].includes(game.id)) {
      POKEMON.forEach(m => {
        if (isPokemonAvailableInGame(m, game, false)) {
          if (m.dex === 808) map.set(m.id, 152);
          else if (m.dex === 809) map.set(m.id, 153);
          else map.set(m.id, m.dex);
        }
      });
    } else if (['gen3-rse', 'gen6-oras'].includes(game.id)) {
      HOENN_REGIONAL_ORDER.forEach(d => assignByDex(d));
    } else if (['gen4-dpp', 'gen8-bdsp'].includes(game.id)) {
      SINNOH_REGIONAL_ORDER.forEach(d => assignByDex(d));
    } else if (['gen2-gsc', 'gen4-hgss'].includes(game.id)) {
      // Corrige ordem dos iniciais de Kanto no fim da Johto Dex (1, 2, 3, 4, 5, 6, 7, 8, 9)
      const johtoFixed = JOHTO_REGIONAL_ORDER.map(x => x);
      johtoFixed.forEach(d => assignByDex(d));
    } else if (game.id === 'gen5-bw') {
      POKEMON.filter(m => m.gen === 5).sort((a, b) => a.dex - b.dex).forEach(m => {
        // Na Pokédex de Unova, Snivy (#495) é #001 (e Victini #494 é #000)
        map.set(m.id, m.dex - 494);
      });
    } else {
      // Jogos de Unova B2W2, Kalos, Alola, Galar, Hisui, Paldea, Lumiose (Legends Z-A) e Fan Games:
      // 1º: Iniciais oficiais do jogo e suas linhas evolutivas (#001 a #009)
      const starterOrderByGame = {
        'gen5-b2w2': [495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 509, 510, 519, 520, 521, 540, 541, 542, 191, 192, 506, 507, 508, 179, 180, 181, 54, 55, 298, 183, 184, 447, 448],
        'gen6-xy': [650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671, 672, 673, 674, 675, 676, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        'gen7-sm-usum': [722, 723, 724, 725, 726, 727, 728, 729, 730, 731, 732, 733, 734, 735, 736, 737, 738],
        'gen8-swsh': [810, 811, 812, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 829, 830, 831, 832, 833, 834, 835, 836, 837, 838, 839],
        'gen8-pla': [722, 723, 724, 155, 156, 157, 501, 502, 503, 399, 400, 396, 397, 398, 403, 404, 405, 265, 266, 267, 268, 269, 77, 78, 133, 134, 135, 136, 196, 197, 470, 471, 700, 41, 42, 169, 425, 426, 401, 402, 418, 419, 412, 413, 414, 74, 75, 76, 234, 899],
        'gen9-sv': [906, 907, 908, 909, 910, 911, 912, 913, 914, 915, 916, 917, 918, 919, 920, 921, 922, 923],
        'gen9-lza': [152, 153, 154, 498, 499, 500, 158, 159, 160, 650, 651, 652, 653, 654, 655, 656, 657, 658, 659, 660, 661, 662, 663, 664, 665, 666, 667, 668, 669, 670, 671],
        'fangame-unbound': [374, 375, 376, 246, 247, 248, 443, 444, 445],
        'fangame-lazarus': [4, 5, 6, 158, 159, 160, 252, 253, 254, 447, 448, 133, 280, 281, 282, 475]
      };

      const priorityDexList = starterOrderByGame[game.id] || [];
      priorityDexList.forEach(d => assignByDex(d));

      // 2º: Pokémon nativos da geração principal do jogo (não-DLC)
      const targetGen = game.id === 'gen9-lza' ? 6 : game.generation;
      POKEMON.forEach(m => {
        if (!map.has(m.id) && m.gen === targetGen && isPokemonAvailableInGame(m, game, false) && !getDlcBadgeInfo(m, game)) {
          map.set(m.id, getOrAssignDexNum(m.dex));
        }
      });

      // 3º: Demais Pokémon da Pokédex Regional base (não-DLC)
      POKEMON.forEach(m => {
        if (!map.has(m.id) && isPokemonAvailableInGame(m, game, false) && !getDlcBadgeInfo(m, game)) {
          map.set(m.id, getOrAssignDexNum(m.dex));
        }
      });
    }

    // Por fim, atribui numeração sequencial a qualquer Pokémon restante da Pokédex / DLC do jogo
    POKEMON.forEach(m => {
      if (!map.has(m.id) && isPokemonAvailableInGame(m, game, false)) {
        map.set(m.id, getOrAssignDexNum(m.dex));
      }
    });

    regionalDexCache[game.id] = map;
    return map;
  }

  function getRegionalDexNumber(mon, game) {
    if (!mon) return 1;
    if (!game) return mon.dex;
    const map = buildRegionalDexMapForGame(game);
    if (map.has(mon.id)) return map.get(mon.id);
    return mon.dex;
  }

  // Retorna todas as variantes/formas regionais de um Pokémon disponíveis na geração do jogo selecionado
  function getPokemonVariants(mon, game) {
    if (!mon) return [];
    const { eraNationalGen } = getDexScopeInfo(game);
    const variants = POKEMON.filter(p => {
      if (p.dex !== mon.dex) return false;
      if (p.gen > eraNationalGen) return false;
      if (p.id.endsWith('-hisui') && game && !['gen8-pla', 'gen9-sv', 'gen9-lza', 'fangame-unbound', 'fangame-lazarus'].includes(game.id)) {
        return false;
      }
      return true;
    });

    variants.sort((a, b) => {
      const aIsVariant = Boolean(a.variantLabel) || a.id.endsWith('-alola') || a.id.endsWith('-galar') || a.id.endsWith('-hisui') || a.id.includes('-paldea');
      const bIsVariant = Boolean(b.variantLabel) || b.id.endsWith('-alola') || b.id.endsWith('-galar') || b.id.endsWith('-hisui') || b.id.includes('-paldea');
      if (aIsVariant !== bIsVariant) return aIsVariant ? 1 : -1;
      if (a.gen !== b.gen) return a.gen - b.gen;
      return a.id.localeCompare(b.id);
    });
    return variants;
  }

  // Rótulo curto para o dropdown de variante no card do slot (ex: "Kanto", "Alola", "Hisui", "Wash (Água)")
  function getVariantShortLabel(v, allVariants = []) {
    if (!v) return '';
    if (v.variantLabel) return v.variantLabel;
    if (v.id.endsWith('-alola')) return 'Alola';
    if (v.id.endsWith('-galar')) return 'Galar';
    if (v.id.endsWith('-hisui')) return 'Hisui';
    if (v.id.includes('-paldea')) return 'Paldea';

    const baseSpecialLabels = {
      'rotom': 'Normal (Elétrico)',
      'urshifu': 'Fluido (Water)',
      'lycanroc': 'Diurno (Midday)',
      'toxtricity': 'Amped',
      'ogerpon': 'Turquesa (Grass)',
      'oricorio': 'Baile (Fogo)',
      'wormadam': 'Planta',
      'giratina': 'Alterada',
      'shaymin': 'Forma Terra',
      'tornadus': 'Incarnate',
      'thundurus': 'Incarnate',
      'landorus': 'Incarnate',
      'enamorus': 'Incarnate',
      'hoopa': 'Confined',
      'palafin': 'Forma Zero',
      'ursaluna': 'Hisui (Base)',
      'deoxys': 'Normal',
      'kyurem': 'Base',
      'necrozma': 'Base',
      'calyrex': 'Base'
    };
    if (baseSpecialLabels[v.id]) return baseSpecialLabels[v.id];

    const hasRegionalSibling = allVariants.some(o =>
      o.id.endsWith('-alola') || o.id.endsWith('-galar') || o.id.endsWith('-hisui') || o.id.includes('-paldea')
    );
    if (hasRegionalSibling) {
      const originByGen = {
        1: 'Kanto (Base)',
        2: 'Johto (Base)',
        3: 'Hoenn (Base)',
        4: 'Sinnoh (Base)',
        5: 'Unova (Base)',
        6: 'Kalos (Base)',
        7: 'Alola (Base)',
        8: 'Galar (Base)',
        9: 'Paldea (Base)'
      };
      return originByGen[v.gen] || 'Forma Base';
    }
    return 'Forma Base';
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
      // Filtra respeitando o jogo selecionado e o Switch "Pokédex" vs "National Dex"
      if (!isPokemonAvailableInGame(mon, game, Boolean(filterOptions.allowNationalDex))) {
        return false;
      }
      // Se não estiver pesquisando nem no modo Pokédex completa, prioriza formas finais nas recomendações
      if (!filterOptions.includePreEvos && !filterOptions.searchQuery && mon.isFinalEvo === false) {
        return false;
      }
      if (filterOptions.typeFilter && filterOptions.typeFilter !== 'all') {
        if (!mon.types.includes(filterOptions.typeFilter)) return false;
      }
      if (filterOptions.secondaryTypeFilter && filterOptions.secondaryTypeFilter !== 'all') {
        if (!mon.types.includes(filterOptions.secondaryTypeFilter)) return false;
      }
      if (filterOptions.mechanicFilter === 'mega') {
        if (!canPokemonMegaInGame(mon, game) && !canPokemonMegaAltInGame(mon, game)) return false;
      }
      if (filterOptions.searchQuery) {
        const rawQ = filterOptions.searchQuery.toLowerCase().trim();
        const numQ = rawQ.replace(/^#0*/, '');
        const paddedNatDex = String(mon.dex).padStart(3, '0');
        const regNum = getRegionalDexNumber(mon, game);
        const paddedRegDex = String(regNum).padStart(3, '0');
        const matchName = mon.name.toLowerCase().includes(rawQ) || mon.id.toLowerCase().includes(rawQ);
        const matchRole = (mon.role || '').toLowerCase().includes(rawQ);
        const matchNatDex = String(mon.dex) === numQ || paddedNatDex.includes(rawQ.replace('#', ''));
        const matchRegDex = !filterOptions.allowNationalDex && (String(regNum) === numQ || paddedRegDex.includes(rawQ.replace('#', '')));
        if (!matchName && !matchRole && !matchNatDex && !matchRegDex) return false;
      }
      return true;
    });

    const scoredCandidates = candidates.map(mon => {
      // Se o jogo suporta Mega e a equipe ainda não tem Mega, avalia o Pokémon considerando sua potencial Mega
      const canBeTeamMega = !hasMegaInTeam && canPokemonMegaInGame(mon, game);
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
      if (canPokemonMegaInGame(pokemon, game) && !hasMegaAlready) {
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
    let initialItem = null;
    if (mechanic === 'mega' && (!game || game.hasItems) && pokemon.mega) {
      initialItem = pokemon.mega.stone;
    } else if (mechanic === 'primal' && (!game || game.hasItems) && pokemon.primal) {
      initialItem = pokemon.primal.stone;
    }

    const tempSlot = {
      pokemon,
      mechanic,
      megaVariant: 'default',
      teraType,
      applyTeraDefense: false,
      ability: (pokemon.abilities && pokemon.abilities[0]) || 'Overgrow',
      nature: pokemon.bestNature || 'Adamant (+Atk, -SpA)',
      item: initialItem,
      moves: [null, null, null, null],
      evIvEnabled: false,
      ivs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
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

  // ==========================================================================
  // NATUREZAS (NATURES), DESCRIÇÕES DE HABILIDADES E CATEGORIAS DA POKÉDEX
  // ==========================================================================
  const NATURES = [
    { id: 'Adamant (+Atk, -SpA)', name: 'Adamant', label: 'Adamant (+10% Attack, -10% Sp. Atk)', up: 'atk', down: 'spa' },
    { id: 'Jolly (+Spe, -SpA)',   name: 'Jolly',   label: 'Jolly (+10% Speed, -10% Sp. Atk)',   up: 'spe', down: 'spa' },
    { id: 'Modest (+SpA, -Atk)',  name: 'Modest',  label: 'Modest (+10% Sp. Atk, -10% Attack)', up: 'spa', down: 'atk' },
    { id: 'Timid (+Spe, -Atk)',   name: 'Timid',   label: 'Timid (+10% Speed, -10% Attack)',   up: 'spe', down: 'atk' },
    { id: 'Bold (+Def, -Atk)',    name: 'Bold',    label: 'Bold (+10% Defense, -10% Attack)',   up: 'def', down: 'atk' },
    { id: 'Impish (+Def, -SpA)',  name: 'Impish',  label: 'Impish (+10% Defense, -10% Sp. Atk)', up: 'def', down: 'spa' },
    { id: 'Calm (+SpD, -Atk)',    name: 'Calm',    label: 'Calm (+10% Sp. Def, -10% Attack)',   up: 'spd', down: 'atk' },
    { id: 'Careful (+SpD, -SpA)', name: 'Careful', label: 'Careful (+10% Sp. Def, -10% Sp. Atk)', up: 'spd', down: 'spa' },
    { id: 'Brave (+Atk, -Spe)',   name: 'Brave',   label: 'Brave (+10% Attack, -10% Speed)',    up: 'atk', down: 'spe' },
    { id: 'Quiet (+SpA, -Spe)',   name: 'Quiet',   label: 'Quiet (+10% Sp. Atk, -10% Speed)',   up: 'spa', down: 'spe' },
    { id: 'Relaxed (+Def, -Spe)', name: 'Relaxed', label: 'Relaxed (+10% Defense, -10% Speed)', up: 'def', down: 'spe' },
    { id: 'Sassy (+SpD, -Spe)',   name: 'Sassy',   label: 'Sassy (+10% Sp. Def, -10% Speed)',   up: 'spd', down: 'spe' },
    { id: 'Naive (+Spe, -SpD)',   name: 'Naive',   label: 'Naive (+10% Speed, -10% Sp. Def)',   up: 'spe', down: 'spd' },
    { id: 'Hasty (+Spe, -Def)',   name: 'Hasty',   label: 'Hasty (+10% Speed, -10% Defense)',   up: 'spe', down: 'def' },
    { id: 'Lonely (+Atk, -Def)',  name: 'Lonely',  label: 'Lonely (+10% Attack, -10% Defense)', up: 'atk', down: 'def' },
    { id: 'Naughty (+Atk, -SpD)', name: 'Naughty', label: 'Naughty (+10% Attack, -10% Sp. Def)', up: 'atk', down: 'spd' },
    { id: 'Mild (+SpA, -Def)',    name: 'Mild',    label: 'Mild (+10% Sp. Atk, -10% Defense)',  up: 'spa', down: 'def' },
    { id: 'Rash (+SpA, -SpD)',    name: 'Rash',    label: 'Rash (+10% Sp. Atk, -10% Sp. Def)',  up: 'spa', down: 'spd' },
    { id: 'Lax (+Def, -SpD)',     name: 'Lax',     label: 'Lax (+10% Defense, -10% Sp. Def)',   up: 'def', down: 'spd' },
    { id: 'Gentle (+SpD, -Def)',  name: 'Gentle',  label: 'Gentle (+10% Sp. Def, -10% Defense)', up: 'spd', down: 'def' },
    { id: 'Serious (Neutra)',     name: 'Serious', label: 'Serious / Hardy / Docile (Neutra • Sem alteração)', up: null, down: null }
  ];

  function getNatureInfo(natureStr) {
    if (!natureStr) return NATURES[0];
    const clean = String(natureStr).trim().toLowerCase();
    const firstWord = clean.split(/[\s/(-]+/)[0];
    const found = NATURES.find(n => n.id.toLowerCase() === clean || n.name.toLowerCase() === firstWord);
    return found || NATURES[0];
  }

  const ABILITY_DESCRIPTIONS = {
    'Overgrow': 'Aumenta o poder dos ataques do tipo Planta em 50% quando o HP está abaixo de 1/3.',
    'Chlorophyll': 'Dobra a Velocidade (Speed) do Pokémon sob Sol forte (Sunny Day / Drought).',
    'Thick Fat': 'Reduz pela metade (50%) todo o dano recebido de ataques dos tipos Fogo e Gelo.',
    'Blaze': 'Aumenta o poder dos ataques do tipo Fogo em 50% quando o HP está abaixo de 1/3.',
    'Solar Power': 'Sob o Sol, aumenta o Ataque Especial (Sp. Atk) em 50%, mas consome 1/8 do HP por turno.',
    'Drought': 'Invoca Sol forte automaticamente ao entrar em batalha (+50% Fogo, -50% Água).',
    'Tough Claws': 'Aumenta em 30% o poder de todos os ataques físicos que fazem contato direto.',
    'Torrent': 'Aumenta o poder dos ataques do tipo Água em 50% quando o HP está abaixo de 1/3.',
    'Rain Dish': 'Recupera 1/16 do HP máximo ao final de cada turno enquanto estiver chovendo.',
    'Mega Launcher': 'Aumenta em 50% o poder de movimentos de aura e pulso (Dark Pulse, Aura Sphere, Water Pulse, Dragon Pulse).',
    'Static': '30% de chance de paralisar o oponente quando ele atinge este Pokémon com um golpe de contato.',
    'Lightning Rod': 'Concede imunidade total a ataques Elétricos e aumenta o Sp. Atk em +1 estágio ao ser atingido por um.',
    'Surge Surfer': 'Dobra a Velocidade (Speed) quando o campo está sob Electric Terrain.',
    'Sheer Force': 'Remove efeitos secundários dos ataques para aumentar seu poder base em 30% (e anula o recuo da Life Orb!).',
    'Poison Point': '30% de chance de envenenar o oponente ao receber um ataque de contato.',
    'Magic Guard': 'Impede todo dano indireto (Stealth Rock, queimadura, veneno, clima e recuo da Life Orb).',
    'Unaware': 'Ignora completamente quaisquer aumentos de atributos (+Atk, +SpA, +Def) do oponente ao atacar ou defender.',
    'Snow Warning': 'Invoca Neve/Granizo automaticamente ao entrar em campo, permitindo usar Aurora Veil e Blizzard 100% preciso.',
    'Intimidate': 'Reduz o Ataque Físico (Attack) do oponente em 1 estágio (-33%) assim que entra em batalha.',
    'Flash Fire': 'Concede imunidade total a ataques de Fogo e aumenta o poder dos próprios golpes de Fogo em 50%.',
    'Rock Head': 'Impede que o Pokémon receba dano de recuo (recoil) em ataques como Flare Blitz, Brave Bird, Head Smash e Wood Hammer.',
    'Synchronize': 'Se o Pokémon receber queimadura, paralisia ou envenenamento, transfere a mesma condição ao oponente.',
    'Trace': 'Copia a habilidade ativa do Pokémon adversário ao entrar em batalha.',
    'Cursed Body': '30% de chance de desabilitar (Disable) por 4 turnos um golpe que atinja este Pokémon.',
    'Levitate': 'Concede imunidade total a ataques do tipo Terrestre (Ground) e a Spikes / Toxic Spikes.',
    'Levitate (Gen 3-6)': 'Concede imunidade total a ataques do tipo Terrestre (Ground) da Geração 3 até a Geração 6.',
    'Shadow Tag': 'Impede que Pokémon adversários (exceto tipo Fantasma) fujam ou sejam trocados da batalha.',
    'Natural Cure': 'Cura automaticamente qualquer problema de status (paralisia, queimadura, sono, veneno) ao sair de campo.',
    'Analytic': 'Aumenta o poder dos ataques em 30% caso o Pokémon se mova por último no turno.',
    'Moxie': 'Aumenta o Ataque Físico (Attack) em +1 estágio toda vez que nocauteia um Pokémon adversário.',
    'Mold Breaker': 'Ignora habilidades defensivas do alvo (como Levitate, Sturdy, Multiscale, Unaware e Wonder Guard) ao atacar.',
    'Water Absorb': 'Concede imunidade total a ataques de Água, recuperando 25% do HP máximo ao ser atingido por eles.',
    'Shell Armor': 'Protege o Pokémon, impedindo que oponentes acertem Golpes Críticos (Critical Hits).',
    'Adaptability': 'Aumenta o bônus de ataques do mesmo tipo (STAB) de 1.5x para 2.0x (dano dobrado!).',
    'Volt Absorb': 'Concede imunidade total a ataques Elétricos, recuperando 25% do HP máximo ao ser atingido por eles.',
    'Unnerve': 'Deixa o oponente tenso e o impede de consumir Berries durante a batalha.',
    'Immunity': 'Impede completamente que este Pokémon seja envenenado (Poison / Toxic).',
    'Pressure': 'Faz com que cada ataque usado pelo oponente contra este Pokémon consuma 2 PP em vez de 1.',
    'Multiscale': 'Reduz pela metade (50%) todo o dano recebido enquanto o Pokémon estiver com o HP cheio (100%).',
    'Inner Focus': 'Impede que o Pokémon hesite (Flinch, como Fake Out/Air Slash) e bloqueia o efeito de Intimidate.',
    'Leaf Guard': 'Protege contra condições negativas de status enquanto o Sol forte estiver ativo.',
    'Frisk': 'Revela qual item segurado (Held Item) o Pokémon adversário está carregando ao entrar em campo.',
    'Infiltrator': 'Os ataques atravessam barreiras do oponente (Reflect, Light Screen, Aurora Veil e Substitute).',
    'Huge Power': 'Dobra (2x) o atributo de Ataque Físico (Attack) efetivo do Pokémon em batalha!',
    'Magic Bounce': 'Reflete de volta contra o oponente movimentos de status, Stealth Rock, Spikes, Toxic e Taunt.',
    'Technician': 'Aumenta em 50% o poder de todos os ataques com poder base igual ou inferior a 60 (ex: Bullet Punch, Mach Punch).',
    'Swarm': 'Aumenta o poder dos ataques do tipo Inseto em 50% quando o HP está abaixo de 1/3.',
    'Guts': 'Aumenta o Ataque Físico em 50% quando afetado por status (Burn, Poison, Paralysis) e ignora o corte de ataque do Burn!',
    'Skill Link': 'Garante que ataques de múltiplos acertos (Bullet Seed, Icicle Spear, Rock Blast, Scale Shot) acertem sempre 5 vezes.',
    'Early Bird': 'Faz o Pokémon acordar do sono (Sleep) duas vezes mais rápido.',
    'Swift Swim': 'Dobra a Velocidade (Speed) do Pokémon enquanto estiver chovendo (Rain Dance / Drizzle).',
    'Sniper': 'Aumenta o multiplicador de dano dos Golpes Críticos em +50% adicional (de 1.5x para 2.25x).',
    'Sand Stream': 'Invoca uma Tempestade de Areia (Sandstorm) ao entrar em batalha (+50% Sp. Def para Pokémon de Pedra).',
    'Unburden': 'Dobra a Velocidade (Speed) assim que o item segurado pelo Pokémon é consumido ou perdido.',
    'Speed Boost': 'Aumenta automaticamente a Velocidade (Speed) em +1 estágio ao final de cada turno.',
    'Damp': 'Impede o uso de movimentos explosivos (Self-Destruct, Explosion e Mind Blown) em campo.',
    'Pixilate': 'Transforma ataques do tipo Normal em tipo Fada e aumenta seu poder em 20% (além de ganhar STAB Fada!).',
    'Poison Heal': 'Recupera 1/8 (12.5%) do HP máximo a cada turno quando o Pokémon está envenenado (combo clássico com Toxic Orb).',
    'Sturdy': 'Garante que o Pokémon sobreviva com 1 HP a qualquer golpe que o nocautearia estando com o HP cheio.',
    'Filter': 'Reduz em 25% o dano recebido de ataques que sejam Super Efetivos contra este Pokémon.',
    'Cloud Nine': 'Anula todos os efeitos de clima (Sol, Chuva, Areia e Neve) enquanto o Pokémon estiver em batalha.',
    'Marvel Scale': 'Aumenta a Defesa Física (Defense) em 50% quando o Pokémon sofre alguma condição de status.',
    'Competitive': 'Aumenta o Ataque Especial (Sp. Atk) em +2 estágios sempre que qualquer atributo seu for reduzido pelo oponente.',
    'Super Luck': 'Aumenta a taxa de Golpes Críticos (Critical Hit ratio) de todos os ataques em +1 estágio.',
    'Justified': 'Aumenta o Ataque Físico (Attack) em +1 estágio ao ser atingido por um golpe do tipo Sombrio (Dark).',
    'Aerilate': 'Transforma ataques do tipo Normal em tipo Voador e aumenta seu poder em 20% (além de ganhar STAB Voador!).',
    'Clear Body': 'Impede que oponentes reduzam qualquer atributo deste Pokémon (imune a Intimidate, Sticky Web, Icy Wind).',
    'Drizzle': 'Invoca Chuva forte automaticamente ao entrar em batalha (+50% Água, -50% Fogo, Thunder 100% preciso).',
    'Primordial Sea': 'Invoca Chuva Primordial extrema que anula completamente qualquer ataque do tipo Fogo e fortalece Água em 50%.',
    'Desolate Land': 'Invoca Sol Desolador extremo que evapora e anula completamente qualquer ataque do tipo Água e fortalece Fogo em 50%.',
    'Iron Fist': 'Aumenta em 20% o poder de ataques de soco (Drain Punch, Mach Punch, Ice Punch, Thunder Punch, Fire Punch).',
    'Reckless': 'Aumenta em 20% o poder de ataques que causam dano de recuo (Flare Blitz, Brave Bird, Wild Charge, High Jump Kick).',
    'Cute Charm': '30% de chance de apaixonar (Infatuate) o oponente do gênero oposto ao receber contato.',
    'Limber': 'Protege o Pokémon, tornando-o completamente imune à Paralisia.',
    'Scrappy': 'Permite que movimentos dos tipos Normal e Lutador atinjam Pokémon do tipo Fantasma, além de bloquear Intimidate.',
    'Rough Skin': 'Causa dano equivalente a 1/8 do HP máximo do atacante sempre que este Pokémon recebe um golpe de contato.',
    'Sand Veil': 'Aumenta a evasão em 20% durante uma Tempestade de Areia e concede imunidade ao dano da areia.',
    'Sand Force': 'Aumenta em 30% o poder de ataques dos tipos Terrestre, Pedra e Metálico durante uma Tempestade de Areia.',
    'Pickpocket': 'Rouba o item segurado do oponente quando atingido por um ataque de contato (se estiver sem item).',
    'Magnet Pull': 'Prende Pokémon adversários do tipo Metálico (Steel) em campo, impedindo que sejam trocados.',
    'Serene Grace': 'Dobra a chance de ativação de todos os efeitos secundários dos ataques (ex: Air Slash tem 60% de chance de Flinch!).',
    'Hyper Cutter': 'Impede que o atributo de Ataque Físico (Attack) deste Pokémon seja reduzido por Intimidate ou golpes.',
    'Oblivious': 'Torna o Pokémon imune a Taunt (Provocação), Infatuação e Intimidate.',
    'Sharpness': 'Aumenta em 50% o poder de todos os ataques cortantes (Sacred Sword, Psycho Cut, Leaf Blade, Night Slash, Ceaseless Edge, Stone Axe).',
    'Steadfast': 'Aumenta a Velocidade (Speed) em +1 estágio sempre que o Pokémon sofre Flinch.',
    'Contrary': 'Inverte todas as mudanças de atributos: golpes como Leaf Storm e Superpower aumentam seus atributos em vez de reduzir!',
    'Sand Rush': 'Dobra a Velocidade (Speed) do Pokémon durante uma Tempestade de Areia (Sandstorm).',
    'Gorilla Tactics': 'Aumenta o Ataque Físico em 50% (como uma Choice Band embutida), mas trava o Pokémon no primeiro golpe escolhido.',
    'Illusion': 'Entra em batalha disfarçado como o último Pokémon da sua equipe até receber dano direto de um ataque.',
    'Iron Barbs': 'Causa dano igual a 1/8 do HP máximo do oponente sempre que ele atingir este Pokémon com um golpe de contato.',
    'Flame Body': '30% de chance de causar Queimadura (Burn) no oponente quando ele atinge este Pokémon com um golpe de contato.',
    'Bulletproof': 'Concede imunidade total a ataques de projétil, bola e bomba (Shadow Ball, Sludge Bomb, Focus Blast, Energy Ball, Aura Sphere).',
    'Protean': 'Muda o tipo do Pokémon para o mesmo tipo do ataque que ele está prestes a usar, garantindo STAB (+50%) em todos os golpes!',
    'Battle Bond': 'Ao nocautear um oponente, fortalece drasticamente o Pokémon (Ash-Greninja ou +1 Attack, +1 Sp. Atk e +1 Speed).',
    'Gale Wings': 'Concede prioridade (+1) aos movimentos do tipo Voador (como Brave Bird e Roost) quando o HP está em 100%.',
    'Stance Change': 'Alterna automaticamente entre a Forma Escudo (140 Def / 140 SpD) ao defender e a Forma Espada (140 Atk / 140 SpA) ao atacar.',
    'Sap Sipper': 'Concede imunidade total a ataques do tipo Planta e aumenta o Ataque Físico em +1 estágio ao ser atingido por um.',
    'Long Reach': 'Permite usar qualquer ataque físico sem nunca fazer contato direto (evitando Rough Skin, Iron Barbs, Rocky Helmet e Static).',
    'Liquid Voice': 'Transforma todos os movimentos baseados em som (como Hyper Voice) em ataques do tipo Água.',
    'Shield Dust': 'Bloqueia completamente os efeitos secundários de ataques adversários (como paralisia, queimadura, congelamento ou Flinch).',
    'Regenerator': 'Recupera automaticamente 1/3 (33.3%) do HP máximo toda vez que o Pokémon é substituído de volta para a Poké Bola.',
    'Merciless': 'Garante que todos os ataques deste Pokémon acertem Golpe Crítico (100% Crit) caso o alvo esteja envenenado.',
    'Stamina': 'Aumenta a Defesa Física (Defense) em +1 estágio toda vez que o Pokémon recebe dano de um ataque.',
    'Corrosion': 'Permite envenenar (Poison / Toxic) até mesmo Pokémon dos tipos Metálico (Steel) e Venenoso (Poison)!',
    'Disguise': 'O disfarce absorve o primeiro ataque direto recebido na batalha, bloqueando o dano (custa apenas 1/8 de HP).',
    'Soundproof': 'Concede imunidade total a movimentos baseados em som (Hyper Voice, Bug Buzz, Boomburst, Torch Song, Roar).',
    'Grassy Surge': 'Ativa Grassy Terrain automaticamente ao entrar em campo (+30% em golpes de Planta, cura 1/16 de HP por turno e reduz Earthquake pela metade).',
    'Libero': 'Muda o tipo do Pokémon para o mesmo tipo do movimento utilizado, garantindo bônus STAB (+50%) em qualquer ataque!',
    'Mirror Armor': 'Reflete de volta ao atacante qualquer tentativa de reduzir os atributos deste Pokémon (inclusive Intimidate).',
    'Punk Rock': 'Aumenta em 30% o poder de ataques sonoros (Overdrive, Boomburst, Hyper Voice) e reduz pela metade o dano recebido de som.',
    'Prankster': 'Concede prioridade (+1) a todos os movimentos de Status (Thunder Wave, Reflect, Light Screen, Taunt, Will-O-Wisp).',
    'Strong Jaw': 'Aumenta em 50% o poder de ataques de mordida (Fishious Rend, Crunch, Ice Fang, Fire Fang, Thunder Fang).',
    'Unseen Fist': 'Seus ataques de contato atravessam completamente Protect, Detect, Spiky Shield e Baneful Bunker do oponente.',
    'Purifying Salt': 'Torna o Pokémon imune a todas as condições de status e reduz pela metade (50%) o dano recebido de ataques Fantasma.',
    'Weak Armor': 'Ao receber um ataque físico, reduz a Defesa em 1 estágio, mas aumenta a Velocidade (Speed) em +2 estágios (dobrando a Speed!).',
    'Defiant': 'Aumenta o Ataque Físico (Attack) em +2 estágios sempre que o oponente reduz qualquer atributo deste Pokémon.',
    'Vital Spirit': 'Impede que o Pokémon adormeça (imune a Spore, Sleep Powder, Hypnosis e Yawn).',
    'Supreme Overlord': 'Aumenta o poder dos ataques em +10% para cada aliado da sua equipe que já tiver sido derrotado na batalha (até +50%).',
    'Protosynthesis': 'Sob Sol forte ou segurando Booster Energy, aumenta o seu maior atributo em 30% (ou 50% se for Velocidade).',
    'Thermal Exchange': 'Aumenta o Ataque Físico em +1 estágio quando atingido por um golpe de Fogo e torna o Pokémon totalmente imune a Queimadura (Burn).',
    'Good as Gold': 'Concede imunidade total a todos os movimentos de Status usados por oponentes (imune a Spore, Thunder Wave, Toxic, Defog, Roar).',
    'Quark Drive': 'Sob Electric Terrain ou segurando Booster Energy, aumenta o seu maior atributo em 30% (ou 50% se for Velocidade).',
    'No Guard': 'Garante que todos os ataques usados por ou contra este Pokémon tenham 100% de precisão (Hurricane, Focus Blast e Stone Edge nunca erram!).',
    'Parental Bond': 'Permite que o Pokémon ataque 2 vezes seguidas no mesmo turno com cada golpe ofensivo.',
    'Insomnia': 'Impede completamente que o Pokémon adormeça (imune a Spore, Sleep Powder e Hypnosis).',
    'Pure Power': 'Dobra (2x) o atributo de Ataque Físico (Attack) efetivo do Pokémon em batalha!',
    'Refrigerate': 'Transforma ataques do tipo Normal em tipo Gelo e aumenta seu poder em 20% (além de ganhar STAB Gelo!).',
    'Delta Stream': 'Invoca ventos misteriosos extremos que eliminam todas as fraquezas dos Pokémon do tipo Voador.',
    'Healer': '30% de chance ao final de cada turno de curar problemas de status dos aliados em batalha.',
    'Aura Break': 'Inverte os efeitos de Fairy Aura e Dark Aura em campo, reduzindo o poder de ataques Fada e Sombrio do oponente.',
    'Berserk': 'Aumenta o Ataque Especial (Sp. Atk) em +1 estágio sempre que um ataque reduz o HP do Pokémon abaixo da metade.',
    'Bad Dreams': 'Causa dano de 1/8 do HP máximo por turno a qualquer Pokémon adversário que esteja dormindo.',
    'Soul-Heart': 'Aumenta o Ataque Especial (Sp. Atk) em +1 estágio toda vez que qualquer Pokémon em campo é nocauteado.',
    'Storm Drain': 'Concede imunidade total a ataques do tipo Água e aumenta o Ataque Especial (Sp. Atk) em +1 estágio ao ser atingido por um.',
    'Natural Talent': 'Habilidade versátil que mantém o foco e o desempenho consistente do Pokémon em batalha.'
  };

  function getAbilityDescription(abilityName) {
    if (!abilityName) return 'Concede efeitos passivos estratégicos durante a batalha.';
    if (ABILITY_DESCRIPTIONS[abilityName]) return ABILITY_DESCRIPTIONS[abilityName];
    const key = Object.keys(ABILITY_DESCRIPTIONS).find(k => k.toLowerCase() === String(abilityName).toLowerCase());
    if (key) return ABILITY_DESCRIPTIONS[key];
    return `Habilidade especial (${abilityName}) que concede vantagens táticas passivas em combate.`;
  }

  // Categorias oficiais da Pokédex (ex: Bulbasaur -> Pokémon Semente)
  const POKEMON_CATEGORIES_BY_DEX = {
    1: 'Pokémon Semente', 2: 'Pokémon Semente', 3: 'Pokémon Semente',
    4: 'Pokémon Lagarto', 5: 'Pokémon Chama', 6: 'Pokémon Chama',
    7: 'Pokémon Tartaruga Pequena', 8: 'Pokémon Tartaruga', 9: 'Pokémon Marisco',
    10: 'Pokémon Minhoca', 11: 'Pokémon Casulo', 12: 'Pokémon Borboleta',
    13: 'Pokémon Inseto Peludo', 14: 'Pokémon Casulo', 15: 'Pokémon Abelha Venenosa',
    16: 'Pokémon Pássaro Pequeno', 17: 'Pokémon Pássaro', 18: 'Pokémon Pássaro',
    19: 'Pokémon Rato', 20: 'Pokémon Rato', 21: 'Pokémon Pássaro Pequeno', 22: 'Pokémon Bico',
    23: 'Pokémon Cobra', 24: 'Pokémon Naja', 25: 'Pokémon Rato', 26: 'Pokémon Rato',
    27: 'Pokémon Rato', 28: 'Pokémon Rato', 29: 'Pokémon Ferrão Venenoso', 30: 'Pokémon Ferrão Venenoso',
    31: 'Pokémon Broca', 32: 'Pokémon Ferrão Venenoso', 33: 'Pokémon Ferrão Venenoso', 34: 'Pokémon Broca',
    35: 'Pokémon Fada', 36: 'Pokémon Fada', 37: 'Pokémon Raposa', 38: 'Pokémon Raposa',
    39: 'Pokémon Balão', 40: 'Pokémon Balão', 41: 'Pokémon Morcego', 42: 'Pokémon Morcego',
    43: 'Pokémon Erva Daninha', 44: 'Pokémon Erva Daninha', 45: 'Pokémon Flor',
    46: 'Pokémon Cogumelo', 47: 'Pokémon Cogumelo', 48: 'Pokémon Inseto', 49: 'Pokémon Mariposa Venenosa',
    50: 'Pokémon Toupeira', 51: 'Pokémon Toupeira', 52: 'Pokémon Gato Arranhão', 53: 'Pokémon Gato de Classe',
    54: 'Pokémon Pato', 55: 'Pokémon Pato', 56: 'Pokémon Macaco Porco', 57: 'Pokémon Macaco Porco',
    58: 'Pokémon Filhote', 59: 'Pokémon Lendário', 60: 'Pokémon Girino', 61: 'Pokémon Girino', 62: 'Pokémon Girino',
    63: 'Pokémon Psi', 64: 'Pokémon Psi', 65: 'Pokémon Psi',
    66: 'Pokémon Superpoder', 67: 'Pokémon Superpoder', 68: 'Pokémon Superpoder',
    69: 'Pokémon Flor', 70: 'Pokémon Papa-Moscas', 71: 'Pokémon Papa-Moscas',
    72: 'Pokémon Água-Viva', 73: 'Pokémon Água-Viva', 74: 'Pokémon Rocha', 75: 'Pokémon Rocha', 76: 'Pokémon Megaton',
    77: 'Pokémon Cavalo de Fogo', 78: 'Pokémon Cavalo de Fogo', 79: 'Pokémon Pateta', 80: 'Pokémon Caranguejo Ermitão',
    81: 'Pokémon Ímã', 82: 'Pokémon Ímã', 83: 'Pokémon Pato Selvagem', 84: 'Pokémon Pássaro Gêmeo', 85: 'Pokémon Pássaro Triplo',
    86: 'Pokémon Leão-Marinho', 87: 'Pokémon Leão-Marinho', 88: 'Pokémon Lodo', 89: 'Pokémon Lodo',
    90: 'Pokémon Bivalve', 91: 'Pokémon Bivalve', 92: 'Pokémon Gás', 93: 'Pokémon Gás', 94: 'Pokémon Sombra',
    95: 'Pokémon Serpente de Pedra', 96: 'Pokémon Hipnose', 97: 'Pokémon Hipnose',
    98: 'Pokémon Caranguejo de Rio', 99: 'Pokémon Pinça', 100: 'Pokémon Bola', 101: 'Pokémon Bola',
    102: 'Pokémon Ovo', 103: 'Pokémon Coco', 104: 'Pokémon Solitário', 105: 'Pokémon Guarda-Ossos',
    106: 'Pokémon Chutador', 107: 'Pokémon Socador', 108: 'Pokémon Lambedor',
    109: 'Pokémon Gás Venenoso', 110: 'Pokémon Gás Venenoso', 111: 'Pokémon Espinhos', 112: 'Pokémon Broca',
    113: 'Pokémon Ovo', 114: 'Pokémon Vinha', 115: 'Pokémon Materno',
    116: 'Pokémon Dragão', 117: 'Pokémon Dragão', 118: 'Pokémon Peixe Dourado', 119: 'Pokémon Peixe Dourado',
    120: 'Pokémon Estrela', 121: 'Pokémon Misterioso', 122: 'Pokémon Barreira', 123: 'Pokémon Louva-a-Deus',
    124: 'Pokémon Forma Humana', 125: 'Pokémon Elétrico', 126: 'Pokémon Cuspidor de Fogo', 127: 'Pokémon Besouro Chifrudo',
    128: 'Pokémon Touro Bravo', 129: 'Pokémon Peixe', 130: 'Pokémon Atroz', 131: 'Pokémon Transporte',
    132: 'Pokémon Transformação', 133: 'Pokémon Evolução', 134: 'Pokémon Jato de Bolhas', 135: 'Pokémon Relâmpago', 136: 'Pokémon Chama',
    137: 'Pokémon Virtual', 138: 'Pokémon Espiral', 139: 'Pokémon Espiral', 140: 'Pokémon Marisco', 141: 'Pokémon Marisco',
    142: 'Pokémon Fóssil', 143: 'Pokémon Dorminhoco', 144: 'Pokémon Congelante', 145: 'Pokémon Elétrico', 146: 'Pokémon Chama',
    147: 'Pokémon Dragão', 148: 'Pokémon Dragão', 149: 'Pokémon Dragão', 150: 'Pokémon Genético', 151: 'Pokémon Nova Espécie',
    152: 'Pokémon Folha', 153: 'Pokémon Folha', 154: 'Pokémon Erva',
    155: 'Pokémon Rato de Fogo', 156: 'Pokémon Vulcão', 157: 'Pokémon Vulcão',
    158: 'Pokémon Mandíbula Grande', 159: 'Pokémon Mandíbula Grande', 160: 'Pokémon Mandíbula Grande',
    169: 'Pokémon Morcego', 181: 'Pokémon Luz', 184: 'Pokémon Coelho de Água', 196: 'Pokémon Sol', 197: 'Pokémon Luar',
    212: 'Pokémon Pinça', 214: 'Pokémon Chifre Único', 229: 'Pokémon Sombrio', 230: 'Pokémon Dragão',
    248: 'Pokémon Armadura', 252: 'Pokémon Geco da Floresta', 253: 'Pokémon Geco da Floresta', 254: 'Pokémon Floresta',
    255: 'Pokémon Pintinho', 256: 'Pokémon Ave Jovem', 257: 'Pokémon Labareda',
    258: 'Pokémon Peixe-Lama', 259: 'Pokémon Peixe-Lama', 260: 'Pokémon Peixe-Lama',
    280: 'Pokémon Sentimento', 281: 'Pokémon Emoção', 282: 'Pokémon Abraço', 286: 'Pokémon Cogumelo',
    303: 'Pokémon Enganador', 306: 'Pokémon Armadura de Ferro', 310: 'Pokémon Descarga', 330: 'Pokémon Místico',
    334: 'Pokémon Pássaro Cantante', 350: 'Pokémon Ternura', 359: 'Pokémon Desastre', 373: 'Pokémon Dragão',
    374: 'Pokémon Bola de Ferro', 375: 'Pokémon Garra de Ferro', 376: 'Pokémon Perna de Ferro',
    382: 'Pokémon Bacia Oceânica', 383: 'Pokémon Continente', 384: 'Pokémon Céu',
    387: 'Pokémon Folha Pequena', 389: 'Pokémon Continente', 390: 'Pokémon Chimpanzé', 392: 'Pokémon Chama',
    393: 'Pokémon Pinguim', 395: 'Pokémon Imperador', 398: 'Pokémon Predador', 405: 'Pokémon Olhos Brilhantes',
    407: 'Pokémon Buquê', 428: 'Pokémon Coelho', 443: 'Pokémon Tubarão Terrestre', 445: 'Pokémon Mach',
    447: 'Pokémon Emanação', 448: 'Pokémon Aura', 461: 'Pokémon Garra Afiada', 462: 'Pokémon Área Magnética',
    468: 'Pokémon Júbilo', 472: 'Pokémon Escorpião Presa', 473: 'Pokémon Presas Gêmeas', 475: 'Pokémon Lâmina',
    495: 'Pokémon Serpente de Grama', 497: 'Pokémon Realeza', 498: 'Pokémon Porco de Fogo', 500: 'Pokémon Mega Porco de Fogo',
    501: 'Pokémon Lontra Marinha', 503: 'Pokémon Formidável', 530: 'Pokémon Subterrâneo', 553: 'Pokémon Intimidação',
    555: 'Pokémon Flamejante', 571: 'Pokémon Raposa Ilusória', 598: 'Pokémon Vagem de Espinhos',
    609: 'Pokémon Atração', 612: 'Pokémon Maxilar de Machado', 635: 'Pokémon Brutal', 637: 'Pokémon Sol',
    650: 'Pokémon Castanha Espinhosa', 652: 'Pokémon Armadura de Espinhos', 653: 'Pokémon Raposa', 655: 'Pokémon Raposa',
    656: 'Pokémon Sapo de Bolhas', 658: 'Pokémon Ninja', 663: 'Pokémon Brasas', 681: 'Pokémon Espada Real',
    700: 'Pokémon Entrelaçado', 701: 'Pokémon Luta Livre', 706: 'Pokémon Dragão',
    722: 'Pokémon Coruja de Grama', 724: 'Pokémon Pena de Flecha', 725: 'Pokémon Gato de Fogo', 727: 'Pokémon Vilão',
    728: 'Pokémon Leão-Marinho', 730: 'Pokémon Solista', 743: 'Pokémon Mosca-Abelha', 748: 'Pokémon Estrela Brutal',
    750: 'Pokémon Cavalo de Tração', 758: 'Pokémon Lagarto Tóxico', 778: 'Pokémon Disfarce', 784: 'Pokémon Escamoso',
    810: 'Pokémon Chimpanzé', 812: 'Pokémon Baterista', 813: 'Pokémon Coelho', 815: 'Pokémon Artilheiro',
    816: 'Pokémon Lagarto Aquático', 818: 'Pokémon Agente Secreto', 823: 'Pokémon Corvo', 849: 'Pokémon Punk',
    861: 'Pokémon Corpulento', 882: 'Pokémon Fóssil', 887: 'Pokémon Furtivo', 892: 'Pokémon Wushu',
    900: 'Pokémon Machado', 901: 'Pokémon Turfa',
    906: 'Pokémon Gato de Grama', 908: 'Pokémon Mágico', 909: 'Pokémon Crocodilo de Fogo', 911: 'Pokémon Cantor',
    912: 'Pokémon Patinho', 914: 'Pokémon Dançarino', 934: 'Pokémon Salgema', 936: 'Pokémon Guerreiro de Fogo',
    937: 'Pokémon Lâminas de Fogo', 959: 'Pokémon Martelo', 979: 'Pokémon Macaco Furioso', 980: 'Pokémon Peixe Espinhoso',
    983: 'Pokémon Grande Lâmina', 984: 'Pokémon Paradoxo', 987: 'Pokémon Paradoxo', 998: 'Pokémon Dragão de Gelo',
    1000: 'Pokémon Entidade de Tesouro', 1006: 'Pokémon Paradoxo'
  };

  const DEFAULT_CATEGORY_BY_TYPE = {
    grass: 'Pokémon Planta',
    fire: 'Pokémon Chama',
    water: 'Pokémon Aquático',
    electric: 'Pokémon Elétrico',
    ice: 'Pokémon Gelo',
    fighting: 'Pokémon Lutador',
    poison: 'Pokémon Venenoso',
    ground: 'Pokémon Terrestre',
    flying: 'Pokémon Ave',
    psychic: 'Pokémon Místico',
    bug: 'Pokémon Inseto',
    rock: 'Pokémon Mineral',
    ghost: 'Pokémon Espírito',
    dragon: 'Pokémon Dragão',
    dark: 'Pokémon Noturno',
    steel: 'Pokémon couraçado',
    fairy: 'Pokémon Fada',
    normal: 'Pokémon Mamífero'
  };

  function getPokemonCategory(pokemon) {
    if (!pokemon) return 'Pokémon';
    if (pokemon.category) return pokemon.category;
    if (POKEMON_CATEGORIES_BY_DEX[pokemon.dex]) return POKEMON_CATEGORIES_BY_DEX[pokemon.dex];
    const primaryType = (pokemon.types && pokemon.types[0]) || 'normal';
    return DEFAULT_CATEGORY_BY_TYPE[primaryType] || 'Pokémon';
  }
  function getSpriteUrl(spriteId) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${spriteId}.png`;
  }

  return {
    NATURES,
    getNatureInfo,
    getAbilityDescription,
    getPokemonCategory,
    getActiveTypesForGame,
    getSingleTypeEffectiveness,
    getEffectivePokemonState,
    getPokemonDefensiveProfile,
    analyzeTeam,
    getRecommendedMovesForPokemon,
    getRecommendedItemsForPokemon,
    getRecommendedPokemonForTeam,
    getDexScopeInfo,
    getVersionExclusiveInfo,
    getDlcBadgeInfo,
    getRegionalDexNumber,
    getPokemonVariants,
    getVariantShortLabel,
    canPokemonMegaInGame,
    canPokemonMegaAltInGame,
    isPokemonMegaActive,
    isPokemonPrimalActive,
    getActiveSlotMechanic,
    isPokemonAvailableInGame,
    createOptimizedSlot,
    fetchPokemonFromPokeAPI,
    getSpriteUrl
  };
})();
