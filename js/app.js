// ============================================================================
// CONTROLADOR DA APLICAÇÃO WEB - POKÉTEAM PRO (GEN 1 A GEN 9 + UNBOUND & LAZARUS)
// ============================================================================

(function () {
  const { TYPES, GAMES, MECHANICS, ITEMS, MOVES, POKEMON, PRESET_TEAMS } = window.POKE_DATA;
  const ENGINE = window.POKE_ENGINE;

  const STORAGE_KEY_ACTIVE = 'poketeam_pro_state_v2';
  const STORAGE_KEY_SAVED_LIST = 'poketeam_pro_saved_teams_v2';

  // Estado global da aplicação
  const state = {
    selectedGameId: 'fangame-unbound',
    selectedVersion: 'Vanilla / Difficult',
    team: [null, null, null, null, null, null],
    activeSlotIndex: 0,
    // Filtros da seção inferior
    filterType: 'all',
    filterMechanic: 'all',
    searchQuery: '',
    sortMode: 'synergy', // 'synergy' | 'dex' | 'alpha'
    includePreEvos: true,
    allowNationalDex: false,
    showAllInBottomGrid: false,
    // Estado do Modal Seletor de Pokédex (ao clicar num slot)
    pickerOpen: false,
    pickerTargetSlot: 0,
    pickerSearch: '',
    pickerSort: 'dex', // 'dex' | 'synergy' | 'alpha'
    pickerType: 'all',
    pickerPreEvos: true,
    pickerNatDex: false,
    // Editor detalhado
    activeEditorTab: 'moves',
    activeMoveSlotIndex: 0,
    // Equipes Salvas no Menu Lateral
    savedTeams: [],
    activeSavedTeamId: null
  };

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'toast-msg';
    el.textContent = message;
    container.appendChild(el);
    setTimeout(() => {
      el.remove();
    }, 3400);
  }

  function getCurrentGame() {
    return GAMES.find(g => g.id === state.selectedGameId) || GAMES[0];
  }

  function findPokemonById(id) {
    if (!id) return null;
    return POKEMON.find(p => p.id.toLowerCase() === id.toLowerCase()) || null;
  }

  function formatDexNum(dex) {
    return `#${String(dex).padStart(3, '0')}`;
  }

  // Serializa e desserializa um array de 6 slots
  function serializeTeamSlots(teamArr) {
    return teamArr.map(s => {
      if (!s || !s.pokemon) return null;
      return {
        pokemonId: s.pokemon.id,
        mechanic: s.mechanic,
        megaVariant: s.megaVariant,
        teraType: s.teraType,
        applyTeraDefense: s.applyTeraDefense,
        ability: s.ability,
        nature: s.nature,
        item: s.item,
        moves: s.moves
      };
    });
  }

  function deserializeTeamSlots(serializedArr) {
    if (!Array.isArray(serializedArr)) return [null, null, null, null, null, null];
    const result = [null, null, null, null, null, null];
    serializedArr.slice(0, 6).forEach((item, idx) => {
      if (!item || !item.pokemonId) return;
      const mon = findPokemonById(item.pokemonId);
      if (!mon) return;
      result[idx] = {
        pokemon: mon,
        mechanic: item.mechanic || null,
        megaVariant: item.megaVariant || 'default',
        teraType: item.teraType || mon.bestTera || mon.types[0],
        applyTeraDefense: Boolean(item.applyTeraDefense),
        ability: item.ability || (mon.abilities && mon.abilities[0]) || 'Overgrow',
        nature: item.nature || mon.bestNature || 'Adamant (+Atk, -SpA)',
        item: item.item || null,
        moves: Array.isArray(item.moves) ? [...item.moves] : [null, null, null, null]
      };
    });
    return result;
  }

  // Persistência em LocalStorage
  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify({
        selectedGameId: state.selectedGameId,
        selectedVersion: state.selectedVersion,
        activeSavedTeamId: state.activeSavedTeamId,
        team: serializeTeamSlots(state.team)
      }));
      localStorage.setItem(STORAGE_KEY_SAVED_LIST, JSON.stringify(state.savedTeams));
    } catch (e) {
      // Ignora erro de quota
    }
  }

  function loadFromStorage() {
    let loadedActive = false;
    try {
      const rawSavedList = localStorage.getItem(STORAGE_KEY_SAVED_LIST);
      if (rawSavedList) {
        const parsedList = JSON.parse(rawSavedList);
        if (Array.isArray(parsedList)) {
          state.savedTeams = parsedList;
        }
      }

      const rawActive = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (rawActive) {
        const parsed = JSON.parse(rawActive);
        if (parsed.selectedGameId && GAMES.some(g => g.id === parsed.selectedGameId)) {
          state.selectedGameId = parsed.selectedGameId;
          const g = getCurrentGame();
          state.selectedVersion = parsed.selectedVersion || g.versions[0];
        }
        state.activeSavedTeamId = parsed.activeSavedTeamId || null;
        if (Array.isArray(parsed.team)) {
          state.team = deserializeTeamSlots(parsed.team);
          loadedActive = true;
        }
      }
    } catch (e) {
      loadedActive = false;
    }
    return loadedActive;
  }

  // Renderiza badge de um Tipo Elemental
  function renderTypeBadge(typeId, extraClass = '') {
    const t = TYPES[typeId];
    if (!t) return '';
    return `<span class="type-badge ${extraClass}" style="background:${t.bg}; color:${t.color}; border-color:${t.color}55;">
      <span class="type-icon">${t.icon}</span> ${t.name}
    </span>`;
  }

  // ==========================================================================
  // 0. RENDERIZAÇÃO DO MENU LATERAL DE EQUIPES SALVAS
  // ==========================================================================
  function renderSavedTeamsSidebar() {
    const listEl = document.getElementById('saved-teams-list');
    const countEl = document.getElementById('saved-teams-count');
    if (!listEl) return;

    if (countEl) {
      countEl.textContent = String(state.savedTeams.length);
    }

    if (state.savedTeams.length === 0) {
      listEl.innerHTML = `
        <div class="saved-team-empty">
          <p><strong>Nenhuma equipe salva ainda.</strong></p>
          <p style="margin-top:4px;">Monte sua equipe ao lado, digite um nome no campo acima e clique em <strong>"💾 Salvar Equipe Atual"</strong>!</p>
        </div>
      `;
      return;
    }

    listEl.innerHTML = state.savedTeams.map(saved => {
      const isActive = saved.id === state.activeSavedTeamId;
      const spritesHtml = [0, 1, 2, 3, 4, 5].map(i => {
        const slotData = saved.team && saved.team[i];
        const mon = slotData && slotData.pokemonId ? findPokemonById(slotData.pokemonId) : null;
        if (!mon) {
          return `<div class="saved-mini-slot"><span class="saved-mini-empty">•</span></div>`;
        }
        return `
          <div class="saved-mini-slot" title="${formatDexNum(mon.dex)} ${mon.name}">
            <img src="${ENGINE.getSpriteUrl(mon.spriteId || mon.dex)}" alt="${mon.name}" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex}.png'" />
          </div>
        `;
      }).join('');

      return `
        <div class="saved-team-card ${isActive ? 'active-saved' : ''}">
          <div class="saved-team-head">
            <div>
              <div class="saved-team-title">${saved.name}</div>
              <div class="saved-team-game">${saved.gameName} (${saved.version})</div>
            </div>
          </div>

          <div class="saved-team-sprites">
            ${spritesHtml}
          </div>

          <div class="saved-team-actions">
            <button class="btn-saved-load" data-load-saved="${saved.id}" title="Carregar esta equipe no construtor">
              📂 Carregar
            </button>
            <button class="btn-saved-update" data-update-saved="${saved.id}" title="Sobrescrever esta equipe salva com a equipe atual da tela">
              🔄 Atualizar
            </button>
            <button class="btn-saved-delete" data-delete-saved="${saved.id}" title="Excluir equipe salva">
              🗑️
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function saveCurrentTeamWithName() {
    const filledCount = state.team.filter(s => s && s.pokemon).length;
    if (filledCount === 0) {
      showToast('⚠️ Adicione pelo menos 1 Pokémon na equipe antes de salvar!');
      return;
    }

    const inputEl = document.getElementById('save-team-name-input');
    const game = getCurrentGame();
    let customName = inputEl ? inputEl.value.trim() : '';
    if (!customName) {
      customName = `Equipe ${game.region} (${state.selectedVersion})`;
    }

    const newSaved = {
      id: 'team_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
      name: customName,
      gameId: state.selectedGameId,
      gameName: game.name,
      version: state.selectedVersion,
      createdAt: new Date().toISOString(),
      team: serializeTeamSlots(state.team)
    };

    state.savedTeams.unshift(newSaved);
    state.activeSavedTeamId = newSaved.id;
    if (inputEl) inputEl.value = '';
    renderAll();
    showToast(`💾 Equipe "${customName}" salva com sucesso no menu lateral!`);
  }

  function loadSavedTeamById(savedId) {
    const found = state.savedTeams.find(t => t.id === savedId);
    if (!found) return;
    if (found.gameId && GAMES.some(g => g.id === found.gameId)) {
      state.selectedGameId = found.gameId;
      const g = getCurrentGame();
      state.selectedVersion = found.version || g.versions[0];
    }
    state.team = deserializeTeamSlots(found.team);
    state.activeSavedTeamId = found.id;
    state.activeSlotIndex = 0;
    const inputEl = document.getElementById('save-team-name-input');
    if (inputEl) inputEl.value = found.name;
    renderAll();
    showToast(`📂 Equipe "${found.name}" carregada!`);
  }

  function updateSavedTeamById(savedId) {
    const idx = state.savedTeams.findIndex(t => t.id === savedId);
    if (idx === -1) return;
    const filledCount = state.team.filter(s => s && s.pokemon).length;
    if (filledCount === 0) {
      showToast('⚠️ A equipe atual está vazia!');
      return;
    }
    const game = getCurrentGame();
    const inputEl = document.getElementById('save-team-name-input');
    const updatedName = (inputEl && inputEl.value.trim()) ? inputEl.value.trim() : state.savedTeams[idx].name;

    state.savedTeams[idx] = {
      ...state.savedTeams[idx],
      name: updatedName,
      gameId: state.selectedGameId,
      gameName: game.name,
      version: state.selectedVersion,
      team: serializeTeamSlots(state.team)
    };
    state.activeSavedTeamId = savedId;
    renderAll();
    showToast(`🔄 Equipe "${updatedName}" atualizada!`);
  }

  function deleteSavedTeamById(savedId) {
    const found = state.savedTeams.find(t => t.id === savedId);
    state.savedTeams = state.savedTeams.filter(t => t.id !== savedId);
    if (state.activeSavedTeamId === savedId) {
      state.activeSavedTeamId = null;
    }
    renderAll();
    if (found) showToast(`🗑️ Equipe "${found.name}" removida.`);
  }

  // ==========================================================================
  // 1. RENDERIZAÇÃO DO SELETOR DE JOGOS, VERSÕES, INICIAIS E MECÂNICAS DO JOGO
  // ==========================================================================
  function renderGameHeader() {
    const game = getCurrentGame();
    const gameSelectEl = document.getElementById('game-select');
    const versionContainer = document.getElementById('version-pills');
    const mechanicsContainer = document.getElementById('game-mechanics-badges');
    const startersContainer = document.getElementById('game-starters-bar');
    const notesEl = document.getElementById('game-notes-text');
    const regionBadgeEl = document.getElementById('game-region-badge');

    if (gameSelectEl && gameSelectEl.options.length === 0) {
      const groups = {};
      GAMES.forEach(g => {
        if (!groups[g.genLabel]) groups[g.genLabel] = [];
        groups[g.genLabel].push(g);
      });

      Object.keys(groups).forEach(label => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = label;
        groups[label].forEach(g => {
          const opt = document.createElement('option');
          opt.value = g.id;
          opt.textContent = g.name;
          optgroup.appendChild(opt);
        });
        gameSelectEl.appendChild(optgroup);
      });
    }
    if (gameSelectEl) gameSelectEl.value = state.selectedGameId;

    if (versionContainer) {
      versionContainer.innerHTML = game.versions.map(v => {
        const active = v === state.selectedVersion ? 'active' : '';
        return `<button class="version-pill ${active}" data-version="${v}">${v}</button>`;
      }).join('');
    }

    if (regionBadgeEl) {
      const chartLabel = game.typeChartMode === 'gen1'
        ? '15 Tipos (Gen 1)'
        : (game.typeChartMode === 'gen2-5' ? '17 Tipos (Gen 2-5)' : '18 Tipos (Tabela Moderna c/ Fada)');
      regionBadgeEl.innerHTML = `
        <span class="meta-chip">🌍 Região: <strong>${game.region}</strong></span>
        <span class="meta-chip">📊 Tabela: <strong>${chartLabel}</strong></span>
        <span class="meta-chip">${game.hasItems ? '🎒 Itens Segurados: <strong>Ativos</strong>' : '🚫 Sem Itens Segurados'}</span>
      `;
    }

    if (mechanicsContainer) {
      if (game.mechanics.length === 0) {
        mechanicsContainer.innerHTML = `<span class="mech-chip mech-classic">⚔️ Batalha Clássica (Sem Transformações Especiais)</span>`;
      } else {
        mechanicsContainer.innerHTML = game.mechanics.map(mId => {
          const m = MECHANICS[mId];
          if (!m) return '';
          return `<span class="mech-chip" style="border-color:${m.badgeColor}; color:${m.badgeColor}; background:${m.badgeColor}18" title="${m.description}">
            ${m.icon} ${m.name} Disponível
          </span>`;
        }).join('');
      }
    }

    if (notesEl) {
      notesEl.textContent = game.notes;
    }

    // Barra rápida de Iniciais (Starters) daquele jogo
    if (startersContainer) {
      const starterMons = POKEMON.filter(p => (game.starters || []).includes(p.starterRef));
      const filteredStarters = starterMons.filter(p => {
        if (p.id.endsWith('-hisui')) {
          return ['gen8-pla', 'fangame-unbound', 'fangame-lazarus'].includes(game.id);
        }
        if (game.id === 'gen8-pla' && ['typhlosion', 'samurott', 'decidueye'].includes(p.id)) {
          return false;
        }
        return true;
      });

      startersContainer.innerHTML = filteredStarters.map(mon => {
        const inTeam = state.team.some(s => s && s.pokemon && s.pokemon.id === mon.id);
        return `
          <button class="starter-quick-btn ${inTeam ? 'in-team' : ''}" data-add-mon="${mon.id}" title="Adicionar ${mon.name} (${formatDexNum(mon.dex)})">
            <img src="${ENGINE.getSpriteUrl(mon.spriteId || mon.dex)}" alt="${mon.name}" loading="lazy" onerror="this.style.display='none'" />
            <div class="starter-quick-info">
              <span class="starter-quick-name">${formatDexNum(mon.dex)} ${mon.name}</span>
              <span class="starter-quick-sub">Inicial (${mon.starterRef})</span>
            </div>
            <span class="starter-quick-action">${inTeam ? '✓ Na Equipe' : '+ Adicionar'}</span>
          </button>
        `;
      }).join('');
    }
  }

  // ==========================================================================
  // 2. RENDERIZAÇÃO DOS 6 SLOTS DA EQUIPE (CLIQUE ABRE A POKÉDEX DO JOGO)
  // ==========================================================================
  function renderTeamSlots() {
    const gridEl = document.getElementById('team-slots-grid');
    if (!gridEl) return;
    const game = getCurrentGame();

    gridEl.innerHTML = state.team.map((slot, idx) => {
      const isSelected = idx === state.activeSlotIndex;
      if (!slot || !slot.pokemon) {
        return `
          <div class="team-slot-card empty-slot ${isSelected ? 'selected-slot' : ''}" data-open-picker-slot="${idx}">
            <div class="slot-header">
              <span class="slot-number">SLOT #${idx + 1}</span>
              <button class="slot-pick-poke-btn" data-open-picker-slot="${idx}">🔍 Escolher Pokémon</button>
            </div>
            <div class="empty-slot-body">
              <div class="pokeball-placeholder">⊕</div>
              <p><strong>Clique aqui para escolher um Pokémon</strong> de ${game.name} (pesquise por Nome ou Nº da Pokédex)</p>
            </div>
          </div>
        `;
      }

      const eff = ENGINE.getEffectivePokemonState(slot, game);
      const itemObj = slot.item ? ITEMS[slot.item] : null;
      const mechObj = slot.mechanic ? MECHANICS[slot.mechanic] : null;

      const movesHtml = [0, 1, 2, 3].map(mIdx => {
        const mId = slot.moves[mIdx];
        const mv = mId ? MOVES[mId] : null;
        if (!mv) {
          return `<div class="slot-move-pill empty-move" data-slot-index="${idx}" data-edit-tab="moves" data-move-idx="${mIdx}">+ Escolher Ataque ${mIdx + 1}</div>`;
        }
        const t = TYPES[mv.type] || TYPES.normal;
        return `
          <div class="slot-move-pill" data-slot-index="${idx}" data-edit-tab="moves" data-move-idx="${mIdx}" style="border-left: 3px solid ${t.color}">
            <span class="slot-move-name">${mv.name}</span>
            <span class="slot-move-type" style="color:${t.color}">${t.icon} ${mv.power || 'Status'}</span>
          </div>
        `;
      }).join('');

      return `
        <div class="team-slot-card filled-slot ${isSelected ? 'selected-slot' : ''}" data-slot-index="${idx}">
          <div class="slot-header">
            <div style="display:flex; align-items:center; gap:6px;">
              <span class="slot-number">SLOT #${idx + 1}</span>
              <span class="dex-num-badge">${formatDexNum(eff.dex)}</span>
            </div>
            <div class="slot-actions">
              ${mechObj ? `<span class="slot-mech-badge" style="background:${mechObj.badgeColor}25; color:${mechObj.badgeColor}; border-color:${mechObj.badgeColor}">${mechObj.icon} ${slot.mechanic === 'tera' ? `Tera ${TYPES[slot.teraType]?.name || ''}` : mechObj.shortName}</span>` : ''}
              <button class="slot-pick-poke-btn" data-open-picker-slot="${idx}" title="Trocar Pokémon deste slot">🔄 Trocar</button>
              <button class="slot-remove-btn" data-remove-slot="${idx}" title="Remover Pokémon da equipe">✕</button>
            </div>
          </div>

          <div class="slot-main-info" data-open-picker-slot="${idx}" title="Clique para trocar o Pokémon deste slot">
            <div class="slot-sprite-wrap">
              <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="slot-sprite" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eff.dex}.png'" />
              <span class="slot-bst-pill" title="Base Stat Total">${eff.bst} BST</span>
            </div>
            <div class="slot-identity">
              <h3 class="slot-poke-name">${eff.name}</h3>
              <div class="slot-types-row">
                ${eff.types.map(t => renderTypeBadge(t, 'sm')).join('')}
              </div>
              <div class="slot-meta-row">
                ${game.hasAbilities ? `<span class="slot-ability-label" title="Habilidade">✨ ${eff.ability}</span>` : ''}
                ${game.hasItems ? `
                  <button class="slot-item-chip" data-slot-index="${idx}" data-edit-tab="item" title="Clique para trocar ou ver recomendações de Item">
                    ${itemObj ? `${itemObj.icon} ${itemObj.name}` : '🎒 + Escolher Item'}
                  </button>
                ` : ''}
              </div>
            </div>
          </div>

          <div class="slot-moves-grid">
            ${movesHtml}
          </div>

          <div class="slot-footer-bar">
            <button class="slot-configure-btn" data-slot-index="${idx}" data-edit-tab="moves">⚔️ 4 Ataques</button>
            ${game.hasItems ? `<button class="slot-configure-btn" data-slot-index="${idx}" data-edit-tab="item">🎒 Item</button>` : ''}
            ${game.mechanics.length > 0 ? `<button class="slot-configure-btn" data-slot-index="${idx}" data-edit-tab="mechanics">🧬 Mecânica</button>` : ''}
          </div>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // 2B. MODAL SELETOR DA POKÉDEX COMPLETA DO JOGO (AO CLICAR NUM SLOT)
  // ==========================================================================
  function openPokedexPickerModal(slotIndex) {
    state.pickerTargetSlot = slotIndex;
    state.activeSlotIndex = slotIndex;
    state.pickerOpen = true;
    const modal = document.getElementById('pokedex-picker-modal');
    if (modal) modal.classList.add('open');

    renderPokedexPickerModalContent();
    const searchEl = document.getElementById('picker-search-input');
    if (searchEl) {
      setTimeout(() => searchEl.focus(), 60);
    }
  }

  function closePokedexPickerModal() {
    state.pickerOpen = false;
    const modal = document.getElementById('pokedex-picker-modal');
    if (modal) modal.classList.remove('open');
  }

  function renderPokedexPickerModalContent() {
    if (!state.pickerOpen) return;
    const game = getCurrentGame();
    const titleEl = document.getElementById('picker-modal-title');
    const subEl = document.getElementById('picker-modal-subtitle');
    const countBarEl = document.getElementById('picker-count-bar');
    const gridEl = document.getElementById('picker-pokemon-grid');
    const typeSelectEl = document.getElementById('picker-type-filter');

    if (titleEl) {
      const currentSlotMon = state.team[state.pickerTargetSlot]?.pokemon;
      titleEl.textContent = currentSlotMon
        ? `🔄 Trocar Pokémon do Slot #${state.pickerTargetSlot + 1} (Atual: ${currentSlotMon.name})`
        : `🔍 Escolher Pokémon para o Slot #${state.pickerTargetSlot + 1}`;
    }
    if (subEl) {
      subEl.textContent = `Exibindo todos os Pokémon disponíveis em ${game.name} — Pesquise pelo Nome ou pelo Número da Pokédex (#001 a #1025)`;
    }

    if (typeSelectEl && typeSelectEl.options.length <= 1) {
      const activeTypes = ENGINE.getActiveTypesForGame(game);
      typeSelectEl.innerHTML = `<option value="all">Todos os Tipos (${activeTypes.length})</option>` +
        activeTypes.map(t => `<option value="${t}" ${state.pickerType === t ? 'selected' : ''}>${TYPES[t].icon} ${TYPES[t].name}</option>`).join('');
    }

    const candidates = ENGINE.getRecommendedPokemonForTeam(state.team, game, {
      typeFilter: state.pickerType,
      searchQuery: state.pickerSearch,
      includePreEvos: state.pickerPreEvos,
      allowNationalDex: state.pickerNatDex,
      includeCurrentTeam: true
    });

    // Ordenação escolhida pelo usuário no modal
    if (state.pickerSort === 'dex') {
      candidates.sort((a, b) => a.pokemon.dex - b.pokemon.dex);
    } else if (state.pickerSort === 'alpha') {
      candidates.sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name));
    } else {
      candidates.sort((a, b) => b.synergyPercent - a.synergyPercent);
    }

    if (countBarEl) {
      countBarEl.innerHTML = `
        <span>Encontrados <strong>${candidates.length} Pokémon</strong> disponíveis ${state.pickerNatDex ? 'na National Dex Completa' : `em ${game.name}`}</span>
        <span>Clique em qualquer Pokémon para colocá-lo no <strong>Slot #${state.pickerTargetSlot + 1}</strong></span>
      `;
    }

    if (!gridEl) return;
    if (candidates.length === 0) {
      gridEl.innerHTML = `
        <div class="no-recs-box" style="grid-column: 1 / -1; text-align:center; padding: 30px;">
          <p>Nenhum Pokémon encontrado para <strong>"${state.pickerSearch}"</strong> neste filtro.</p>
          <p style="margin-top:8px; font-size:0.82rem; color:var(--text-secondary);">Dica: marque a caixa <strong>"National Dex"</strong> acima para pesquisar Pokémon de outras gerações!</p>
        </div>
      `;
      return;
    }

    const currentTeamIds = new Set(state.team.filter(s => s && s.pokemon).map(s => s.pokemon.id));

    gridEl.innerHTML = candidates.map(rec => {
      const { pokemon, state: eff, synergyPercent, reasonText } = rec;
      const alreadyInTeam = currentTeamIds.has(pokemon.id);
      return `
        <div class="picker-poke-item ${alreadyInTeam ? 'in-team-already' : ''}" data-pick-modal-mon="${pokemon.id}">
          <div class="picker-item-top">
            <span class="dex-num-badge">${formatDexNum(pokemon.dex)}</span>
            <span class="synergy-pill">${synergyPercent}% Sinergia</span>
          </div>

          <div class="picker-item-main">
            <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${pokemon.name}" class="picker-item-sprite" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dex}.png'" />
            <div>
              <div class="picker-item-name">${pokemon.name}</div>
              <div style="display:flex; flex-wrap:wrap; gap:4px;">
                ${eff.types.map(t => renderTypeBadge(t, 'xs')).join('')}
              </div>
            </div>
          </div>

          <p class="picker-item-reason">${reasonText}</p>

          <button class="btn-add-rec-poke">
            ${alreadyInTeam ? '✓ Já está na Equipe (Selecionar)' : `+ Escolher para o Slot #${state.pickerTargetSlot + 1}`}
          </button>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // 3. PAINEL DE EDIÇÃO PROFUNDA DO POKÉMON SELECIONADO (4 ATAQUES, ITEM, MECÂNICAS)
  // ==========================================================================
  function renderActiveSlotEditor(teamAnalysis) {
    const container = document.getElementById('slot-detail-editor');
    if (!container) return;

    const game = getCurrentGame();
    const slot = state.team[state.activeSlotIndex];

    if (!slot || !slot.pokemon) {
      container.innerHTML = `
        <div class="editor-empty-state">
          <div class="editor-empty-icon">🎯</div>
          <div style="flex:1;">
            <h3>Slot #${state.activeSlotIndex + 1} está vazio</h3>
            <p>Clique no botão ao lado para abrir a <strong>Pokédex Completa de ${game.name}</strong> e escolher o Pokémon deste slot, ou escolha uma recomendação abaixo.</p>
          </div>
          <button class="btn-primary" data-open-picker-slot="${state.activeSlotIndex}">
            🔍 Abrir Pokédex do Jogo (Slot #${state.activeSlotIndex + 1})
          </button>
        </div>
      `;
      return;
    }

    const eff = ENGINE.getEffectivePokemonState(slot, game);
    const moveRecs = ENGINE.getRecommendedMovesForPokemon(slot.pokemon, game, teamAnalysis, slot);
    const itemRecs = ENGINE.getRecommendedItemsForPokemon(slot.pokemon, game, slot);
    const defProfile = ENGINE.getPokemonDefensiveProfile(slot, game);

    const myWeak = [];
    const myRes = [];
    Object.entries(defProfile).forEach(([t, m]) => {
      if (m > 1) myWeak.push({ t, m });
      else if (m < 1) myRes.push({ t, m });
    });

    let tabBodyHtml = '';

    if (state.activeEditorTab === 'moves') {
      const currentMoves = slot.moves || [null, null, null, null];
      const moveSlotsBar = [0, 1, 2, 3].map(idx => {
        const mId = currentMoves[idx];
        const mv = mId ? MOVES[mId] : null;
        const activeClass = idx === state.activeMoveSlotIndex ? 'active-move-slot' : '';
        if (!mv) {
          return `
            <div class="editor-move-slot ${activeClass}" data-select-move-slot="${idx}">
              <span class="move-slot-idx">Ataque #${idx + 1}</span>
              <strong class="move-slot-empty">Vazio (Clique num ataque abaixo)</strong>
            </div>
          `;
        }
        const t = TYPES[mv.type] || TYPES.normal;
        return `
          <div class="editor-move-slot ${activeClass}" data-select-move-slot="${idx}" style="border-color:${t.color}88">
            <div class="move-slot-top">
              <span class="move-slot-idx">Ataque #${idx + 1}</span>
              <span class="move-cat-tag">${mv.category}</span>
            </div>
            <div class="move-slot-main">
              <strong>${mv.name}</strong>
              ${renderTypeBadge(mv.type, 'xs')}
            </div>
            <div class="move-slot-sub">Poder: <strong>${mv.power || '—'}</strong> • Precisão: <strong>${mv.acc}%</strong></div>
          </div>
        `;
      }).join('');

      const recommendedListHtml = moveRecs.allScoredMoves.map(m => {
        const isEquipped = currentMoves.includes(m.id);
        const isTop4 = moveRecs.top4Ids.includes(m.id);
        return `
          <div class="rec-move-row ${isEquipped ? 'equipped' : ''} ${isTop4 ? 'top4-rec' : ''}" data-pick-move="${m.id}">
            <div class="rec-move-left">
              <div class="rec-move-title-row">
                <strong>${m.name}</strong>
                ${renderTypeBadge(m.type, 'xs')}
                <span class="rec-move-cat">${m.category}</span>
                <span class="rec-move-badge ${isTop4 ? 'highlight' : ''}">${isTop4 ? '⭐ Top 4 Recomendado • ' : ''}${m.badge}</span>
              </div>
              <p class="rec-move-desc">${m.reason} — <em>${m.desc}</em></p>
            </div>
            <div class="rec-move-right">
              <div class="rec-move-stats">
                <span>PWR: <strong>${m.power || '—'}</strong></span>
                <span>ACC: <strong>${m.acc}%</strong></span>
              </div>
              <button class="btn-equip-move ${isEquipped ? 'equipped' : ''}">
                ${isEquipped ? '✓ Equipado' : `Equipar no #${state.activeMoveSlotIndex + 1}`}
              </button>
            </div>
          </div>
        `;
      }).join('');

      tabBodyHtml = `
        <div class="editor-tab-section">
          <div class="editor-section-header">
            <div>
              <h4>Escolha os 4 Ataques de ${eff.name}</h4>
              <p>Clique em um dos 4 slots abaixo e escolha um ataque recomendado para cobrir as fraquezas da equipe.</p>
            </div>
            <button class="btn-secondary btn-sm" id="btn-auto-fill-moves">✨ Preencher 4 Melhores Ataques</button>
          </div>
          <div class="editor-4moves-bar">${moveSlotsBar}</div>
          <div class="rec-moves-list">${recommendedListHtml}</div>
        </div>
      `;
    } else if (state.activeEditorTab === 'item') {
      if (!game.hasItems) {
        tabBodyHtml = `
          <div class="editor-tab-section">
            <p class="empty-notice">🚫 Os jogos <strong>${game.name}</strong> não possuem a mecânica de Itens Segurados em batalha.</p>
          </div>
        `;
      } else {
        const itemsHtml = itemRecs.map((it, i) => {
          const isEquipped = slot.item === it.id;
          return `
            <div class="rec-item-card ${isEquipped ? 'equipped' : ''} ${i < 3 ? 'top-item' : ''}" data-pick-item="${it.id}">
              <div class="rec-item-icon">${it.icon}</div>
              <div class="rec-item-body">
                <div class="rec-item-header">
                  <strong>${it.name}</strong>
                  <span class="rec-item-badge ${i === 0 ? 'best' : ''}">${it.badge}</span>
                </div>
                <p>${it.reason}</p>
              </div>
              <button class="btn-equip-item ${isEquipped ? 'equipped' : ''}">
                ${isEquipped ? '✓ Equipado' : 'Equipar'}
              </button>
            </div>
          `;
        }).join('');

        tabBodyHtml = `
          <div class="editor-tab-section">
            <div class="editor-section-header">
              <div>
                <h4>Escolha o Item Segurado (Held Item) para ${eff.name}</h4>
                <p>Itens ordenados por sinergia com os atributos, habilidade e mecânica ativa de ${eff.name}.</p>
              </div>
            </div>
            <div class="rec-items-grid">${itemsHtml}</div>
          </div>
        `;
      }
    } else if (state.activeEditorTab === 'mechanics') {
      const canMega = game.mechanics.includes('mega') && Boolean(slot.pokemon.mega);
      const canPrimal = game.mechanics.includes('primal') && Boolean(slot.pokemon.primal);
      const canZMove = game.mechanics.includes('zmove');
      const canDynamax = game.mechanics.includes('dynamax');
      const canTera = game.mechanics.includes('tera');
      const activeTypes = ENGINE.getActiveTypesForGame(game);

      tabBodyHtml = `
        <div class="editor-tab-section">
          <div class="editor-section-header">
            <div>
              <h4>Mecânicas Especiais de Batalha (${game.name})</h4>
              <p>Ative transformações disponíveis neste jogo para recalcular atributos, tipos, itens e sinergia da equipe.</p>
            </div>
          </div>

          <div class="mechanics-cards-grid">
            <div class="mech-option-card ${!slot.mechanic ? 'active' : ''}" data-set-mechanic="none">
              <div class="mech-opt-head">
                <span class="mech-opt-icon">⚪</span>
                <strong>Forma Base Padrão</strong>
              </div>
              <p>Usa ${slot.pokemon.name} em sua forma normal com item livre (Leftovers, Life Orb, Choice, etc.).</p>
            </div>

            ${game.mechanics.includes('mega') ? `
              <div class="mech-option-card ${slot.mechanic === 'mega' ? 'active' : ''} ${!canMega ? 'disabled' : ''}" ${canMega ? 'data-set-mechanic="mega"' : ''}>
                <div class="mech-opt-head">
                  <span class="mech-opt-icon">🧬</span>
                  <strong>Mega Evolução ${canMega ? `(${slot.pokemon.mega.name})` : '(Indisponível para esta espécie)'}</strong>
                </div>
                <p>${canMega ? slot.pokemon.mega.note : `${slot.pokemon.name} não possui Mega Evolução oficial.`}</p>
                ${canMega && slot.pokemon.megaAlt ? `
                  <div class="mega-variant-switch">
                    <button class="variant-btn ${slot.megaVariant !== 'x' ? 'active' : ''}" data-mega-variant="default">${slot.pokemon.mega.name}</button>
                    <button class="variant-btn ${slot.megaVariant === 'x' ? 'active' : ''}" data-mega-variant="x">${slot.pokemon.megaAlt.name}</button>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ${canPrimal ? `
              <div class="mech-option-card ${slot.mechanic === 'primal' ? 'active' : ''}" data-set-mechanic="primal">
                <div class="mech-opt-head">
                  <span class="mech-opt-icon">🌋</span>
                  <strong>Primal Reversion (${slot.pokemon.primal.name})</strong>
                </div>
                <p>${slot.pokemon.primal.note}</p>
              </div>
            ` : ''}

            ${canZMove ? `
              <div class="mech-option-card ${slot.mechanic === 'zmove' ? 'active' : ''}" data-set-mechanic="zmove">
                <div class="mech-opt-head">
                  <span class="mech-opt-icon">💎</span>
                  <strong>Portador de Z-Crystal (Z-Move)</strong>
                </div>
                <p>Equipa automaticamente o Cristal Z ideal para disparar uma explosão STAB única na partida.</p>
              </div>
            ` : ''}

            ${canDynamax ? `
              <div class="mech-option-card ${slot.mechanic === 'dynamax' ? 'active' : ''}" data-set-mechanic="dynamax">
                <div class="mech-opt-head">
                  <span class="mech-opt-icon">🌩️</span>
                  <strong>Dynamax ${slot.pokemon.hasGmax ? '/ Gigantamax Ace' : 'Ace'}</strong>
                </div>
                <p>Dobra o HP por 3 turnos e transforma seus ataques em Max Moves que invocam clima/terreno ou aumentam atributos!</p>
              </div>
            ` : ''}

            ${canTera ? `
              <div class="mech-option-card ${slot.mechanic === 'tera' ? 'active' : ''}" data-set-mechanic="tera">
                <div class="mech-opt-head">
                  <span class="mech-opt-icon">👑</span>
                  <strong>Fenômeno Terastal (Tera Type)</strong>
                </div>
                <p>Tera Recomendado para ${slot.pokemon.name}: <strong>${TYPES[slot.pokemon.bestTera]?.name || 'Fada'}</strong>. Escolha o Tera Type abaixo:</p>
                <div class="tera-selector-row">
                  <select id="select-tera-type" class="tera-select">
                    ${activeTypes.map(t => `<option value="${t}" ${slot.teraType === t ? 'selected' : ''}>${TYPES[t].icon} Tera ${TYPES[t].name} ${t === slot.pokemon.bestTera ? '★ (Recomendado)' : ''}</option>`).join('')}
                  </select>
                  <label class="tera-def-toggle">
                    <input type="checkbox" id="toggle-tera-defense" ${slot.applyTeraDefense ? 'checked' : ''} />
                    <span>Simular defesa do Tera Type na Matriz da Equipe</span>
                  </label>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    } else if (state.activeEditorTab === 'stats') {
      const statNames = [
        { k: 'hp', label: 'HP', val: eff.stats.hp, color: '#22c55e' },
        { k: 'atk', label: 'Attack', val: eff.stats.atk, color: '#f97316' },
        { k: 'def', label: 'Defense', val: eff.stats.def, color: '#eab308' },
        { k: 'spa', label: 'Sp. Atk', val: eff.stats.spa, color: '#3b82f6' },
        { k: 'spd', label: 'Sp. Def', val: eff.stats.spd, color: '#a855f7' },
        { k: 'spe', label: 'Speed', val: eff.stats.spe, color: '#ec4899' }
      ];

      tabBodyHtml = `
        <div class="editor-tab-section stats-and-defense-grid">
          <div class="stats-bars-box">
            <h4>Atributos Base (${eff.name} — ${eff.bst} BST)</h4>
            ${statNames.map(s => {
              const pct = Math.min(100, Math.round((s.val / 180) * 100));
              return `
                <div class="stat-bar-row">
                  <span class="stat-label">${s.label}</span>
                  <strong class="stat-val">${s.val}</strong>
                  <div class="stat-track">
                    <div class="stat-fill" style="width:${pct}%; background:${s.color}"></div>
                  </div>
                </div>
              `;
            }).join('')}
            <div class="nature-ability-controls">
              ${game.hasAbilities ? `
                <label>Habilidade:
                  <select id="editor-ability-select">
                    ${(slot.pokemon.abilities || ['Overgrow']).map(ab => `<option value="${ab}" ${slot.ability === ab ? 'selected' : ''}>${ab}</option>`).join('')}
                  </select>
                </label>
              ` : ''}
              <label>Natureza Recomendada: <strong>${slot.nature}</strong></label>
            </div>
          </div>

          <div class="indiv-defense-box">
            <h4>Perfil Defensivo Individual de ${eff.name}</h4>
            <div class="indiv-def-group">
              <span>⚠️ Fraquezas Recebidas:</span>
              <div class="indiv-badges-wrap">
                ${myWeak.map(x => `<span class="eff-pill weak">${renderTypeBadge(x.t, 'xs')} <strong>${x.m}x</strong></span>`).join('') || '<em>Nenhuma!</em>'}
              </div>
            </div>
            <div class="indiv-def-group">
              <span>🛡️ Resistências e Imunidades:</span>
              <div class="indiv-badges-wrap">
                ${myRes.map(x => `<span class="eff-pill safe">${renderTypeBadge(x.t, 'xs')} <strong>${x.m === 0 ? 'IMUNE (0x)' : `${x.m}x`}</strong></span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div class="editor-card">
        <div class="editor-top-bar">
          <div class="editor-poke-summary">
            <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="editor-poke-img" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eff.dex}.png'" />
            <div>
              <div class="editor-title-line">
                <span class="editor-slot-tag">Slot #${state.activeSlotIndex + 1} • ${formatDexNum(eff.dex)}</span>
                <h3>${eff.name}</h3>
                ${eff.types.map(t => renderTypeBadge(t, 'sm')).join('')}
                <button class="slot-pick-poke-btn" data-open-picker-slot="${state.activeSlotIndex}">🔄 Trocar Pokémon</button>
              </div>
              <p class="editor-sub-line">
                Função: <strong>${eff.role}</strong> • Natureza Ideal: <strong>${slot.nature}</strong>
                ${eff.activeMechanicNote ? ` • <span class="mech-note-inline">🧬 ${eff.activeMechanicNote}</span>` : ''}
              </p>
            </div>
          </div>

          <div class="editor-tabs-nav">
            <button class="editor-tab-btn ${state.activeEditorTab === 'moves' ? 'active' : ''}" data-editor-tab="moves">
              ⚔️ 4 Ataques Recomendados
            </button>
            ${game.hasItems ? `
              <button class="editor-tab-btn ${state.activeEditorTab === 'item' ? 'active' : ''}" data-editor-tab="item">
                🎒 Item Recomendado
              </button>
            ` : ''}
            ${game.mechanics.length > 0 ? `
              <button class="editor-tab-btn ${state.activeEditorTab === 'mechanics' ? 'active' : ''}" data-editor-tab="mechanics">
                🧬 Mecânicas (${game.mechanics.map(m => MECHANICS[m]?.shortName).join('/')})
              </button>
            ` : ''}
            <button class="editor-tab-btn ${state.activeEditorTab === 'stats' ? 'active' : ''}" data-editor-tab="stats">
              📊 Atributos & Defesas
            </button>
          </div>
        </div>

        ${tabBodyHtml}
      </div>
    `;
  }

  // ==========================================================================
  // 4. MATRIZ DE DEFESA ELEMENTAL & COBERTURA OFENSIVA DA EQUIPE
  // ==========================================================================
  function renderSynergyDashboard(analysis) {
    const scoreEl = document.getElementById('synergy-score-badge');
    const alertsEl = document.getElementById('synergy-alerts-box');
    const matrixEl = document.getElementById('elemental-matrix-grid');

    if (scoreEl) {
      let color = '#22c55e';
      if (analysis.synergyScore < 50) color = '#ef4444';
      else if (analysis.synergyScore < 75) color = '#f59e0b';
      scoreEl.innerHTML = `
        <div class="synergy-Ring" style="border-color:${color}; color:${color}">
          <strong>${analysis.synergyScore}%</strong>
          <span>Sinergia</span>
        </div>
      `;
    }

    if (alertsEl) {
      if (analysis.filledCount === 0) {
        alertsEl.innerHTML = `<div class="synergy-alert info">Clique em qualquer Slot acima para escolher seus Pokémon da Pokédex do jogo e ver a cobertura de fraquezas!</div>`;
      } else {
        const critHtml = analysis.criticalWeaknesses.length > 0
          ? `<div class="synergy-alert danger">
              <strong>⚠️ Fraquezas Descobertas na Equipe:</strong>
              Cuidado com ataques de ${analysis.criticalWeaknesses.slice(0, 4).map(c => `${renderTypeBadge(c.type, 'xs')} (${c.totalWeak} fracos / ${c.totalSafe} resistentes)`).join(' ')}
            </div>`
          : `<div class="synergy-alert success">
              <strong>🛡️ Defesa Elemental Sólida!</strong> Todas as fraquezas da sua equipe possuem cobertura defensiva ou imunidades.
            </div>`;

        const gapHtml = analysis.offensiveGaps.length > 0
          ? `<div class="synergy-alert warning">
              <strong>⚔️ Tipos sem Ataque Super Efetivo (2x) nos seus Movesets:</strong>
              ${analysis.offensiveGaps.slice(0, 6).map(t => renderTypeBadge(t, 'xs')).join(' ')}
            </div>`
          : `<div class="synergy-alert success">
              <strong>⚡ Cobertura Ofensiva Total!</strong> Os ataques da sua equipe acertam todos os ${analysis.activeTypes.length} tipos com dano Super Efetivo!
            </div>`;

        alertsEl.innerHTML = critHtml + gapHtml;
      }
    }

    if (matrixEl) {
      matrixEl.innerHTML = analysis.activeTypes.map(t => {
        const def = analysis.defenseMatrix[t];
        const off = analysis.offensiveCoverage[t];
        const typeMeta = TYPES[t];

        let statusClass = 'neutral-cell';
        if (def.totalWeak >= 2 && def.totalSafe === 0 || def.netScore <= -2) statusClass = 'danger-cell';
        else if (def.totalSafe > def.totalWeak) statusClass = 'safe-cell';

        return `
          <div class="matrix-type-card ${statusClass}" title="Fracos: ${def.weakMembers.map(m => `${m.name}(${m.mult})`).join(', ') || 'Nenhum'} | Resistentes/Imunes: ${def.safeMembers.map(m => `${m.name}(${m.mult})`).join(', ') || 'Nenhum'}">
            <div class="matrix-card-top">
              ${renderTypeBadge(t, 'xs')}
              <span class="matrix-off-indicator ${off.superEffectiveCount > 0 ? 'covered' : 'uncovered'}" title="Quantos Pokémon seus têm ataques 2x contra ${typeMeta.name}">
                ⚔️ ${off.superEffectiveCount}x
              </span>
            </div>
            <div class="matrix-counts-row">
              <div class="matrix-stat weak-stat ${def.totalWeak > 0 ? 'has-val' : ''}">
                <span>Fracos</span>
                <strong>${def.totalWeak}${def.weak4x > 0 ? ` <em>(${def.weak4x}×4x)</em>` : ''}</strong>
              </div>
              <div class="matrix-stat safe-stat ${def.totalSafe > 0 ? 'has-val' : ''}">
                <span>Res/Imu</span>
                <strong>${def.totalSafe}${def.immune > 0 ? ` <em>(${def.immune}★)</em>` : ''}</strong>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  // ==========================================================================
  // 5. PAINEL DE RECOMENDAÇÕES & POKÉDEX COMPLETA DO JOGO NA PARTE INFERIOR
  // ==========================================================================
  function renderPokemonRecommendations() {
    const game = getCurrentGame();
    const listEl = document.getElementById('recommended-pokemon-grid');
    const typeFilterEl = document.getElementById('rec-type-filter');
    if (!listEl) return;

    if (typeFilterEl) {
      const activeTypes = ENGINE.getActiveTypesForGame(game);
      const currentVal = state.filterType;
      typeFilterEl.innerHTML = `<option value="all">Todos os Tipos (${activeTypes.length})</option>` +
        activeTypes.map(t => `<option value="${t}" ${currentVal === t ? 'selected' : ''}>${TYPES[t].icon} ${TYPES[t].name}</option>`).join('');
    }

    const recommendations = ENGINE.getRecommendedPokemonForTeam(state.team, game, {
      typeFilter: state.filterType,
      mechanicFilter: state.filterMechanic,
      searchQuery: state.searchQuery,
      includePreEvos: state.includePreEvos,
      allowNationalDex: state.allowNationalDex
    });

    if (state.sortMode === 'dex') {
      recommendations.sort((a, b) => a.pokemon.dex - b.pokemon.dex);
    } else if (state.sortMode === 'alpha') {
      recommendations.sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name));
    } else {
      recommendations.sort((a, b) => b.synergyPercent - a.synergyPercent);
    }

    if (recommendations.length === 0) {
      listEl.innerHTML = `
        <div class="no-recs-box" style="grid-column: 1 / -1;">
          <p>Nenhum Pokémon encontrado nos filtros atuais para <strong>"${state.searchQuery}"</strong>.</p>
          <div class="no-recs-actions" style="margin-top:10px; display:flex; gap:10px;">
            <button class="btn-primary btn-sm" id="btn-fetch-pokeapi">🌐 Buscar "${state.searchQuery}" na PokéAPI</button>
            <button class="btn-secondary btn-sm" id="btn-reset-filters">Limpar Filtros</button>
          </div>
        </div>
      `;
      return;
    }

    const visibleList = (state.showAllInBottomGrid || state.searchQuery)
      ? recommendations
      : recommendations.slice(0, 60);

    const targetSlot = getNextTargetSlotIndex();

    const cardsHtml = visibleList.map((rec, idx) => {
      const { pokemon, state: eff, synergyPercent, reasonText, canBeTeamMega, isStarterInGame } = rec;
      const isTopSynergy = state.sortMode === 'synergy' && idx < 3;

      return `
        <div class="rec-poke-card ${isTopSynergy ? 'top-pick' : ''}">
          <div class="rec-poke-top">
            <div class="rec-poke-rank">
              <span class="dex-num-badge">${formatDexNum(pokemon.dex)}</span>
              ${isTopSynergy ? `<span class="rank-crown">🏆 Top #${idx + 1}</span>` : `<span class="rank-role">${pokemon.role}</span>`}
              ${isStarterInGame ? `<span class="starter-mini-tag">🌟 Inicial</span>` : ''}
              ${pokemon.mega && game.mechanics.includes('mega') ? `<span class="mega-mini-tag">🧬 Mega</span>` : ''}
            </div>
            <span class="synergy-pill">${synergyPercent}% Sinergia</span>
          </div>

          <div class="rec-poke-main">
            <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="rec-poke-sprite" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dex}.png'" />
            <div class="rec-poke-info">
              <h4>${pokemon.name} ${canBeTeamMega ? `<small class="mega-hint">(${pokemon.mega.name})</small>` : ''}</h4>
              <div class="rec-poke-types">
                ${eff.types.map(t => renderTypeBadge(t, 'xs')).join('')}
                <span class="rec-bst-tag">${eff.bst} BST</span>
              </div>
              <p class="rec-reason-text">${reasonText}</p>
            </div>
          </div>

          <div class="rec-poke-preview-kit">
            <span><strong>Ataques Sugeridos:</strong> ${(pokemon.bestMoves || []).slice(0, 4).map(m => MOVES[m]?.name || m).join(', ')}</span>
          </div>

          <button class="btn-add-rec-poke" data-add-mon="${pokemon.id}">
            + Adicionar ao Slot #${targetSlot + 1} (Com Melhores Ataques & Item)
          </button>
        </div>
      `;
    }).join('');

    const showMoreBtnHtml = (!state.showAllInBottomGrid && !state.searchQuery && recommendations.length > 60)
      ? `<div style="grid-column: 1 / -1; text-align:center; padding: 12px 0;">
          <button class="btn-secondary" id="btn-show-all-bottom-dex">
            📖 Mostrar Todos os ${recommendations.length} Pokémon Disponíveis neste Jogo
          </button>
        </div>`
      : '';

    listEl.innerHTML = cardsHtml + showMoreBtnHtml;
  }

  function getNextTargetSlotIndex() {
    if (!state.team[state.activeSlotIndex] || !state.team[state.activeSlotIndex].pokemon) {
      return state.activeSlotIndex;
    }
    const firstEmpty = state.team.findIndex(s => !s || !s.pokemon);
    return firstEmpty !== -1 ? firstEmpty : state.activeSlotIndex;
  }

  // Adiciona um Pokémon na equipe já otimizado
  function addPokemonToTeam(pokemonId, forcedMechanic = null, forcedTera = null, targetSlot = null) {
    const mon = findPokemonById(pokemonId);
    if (!mon) return;
    const game = getCurrentGame();

    const existingIdx = state.team.findIndex(s => s && s.pokemon && s.pokemon.id === mon.id);
    if (existingIdx !== -1 && targetSlot === null) {
      state.activeSlotIndex = existingIdx;
      renderAll();
      return;
    }

    const slotIdx = targetSlot !== null ? targetSlot : getNextTargetSlotIndex();
    const optimizedSlot = ENGINE.createOptimizedSlot(mon, game, state.team, forcedMechanic, forcedTera);
    state.team[slotIdx] = optimizedSlot;
    state.activeSlotIndex = slotIdx;
    renderAll();
  }

  // ==========================================================================
  // AUTO-COMPLETAR VAGAS VAZIAS (NUNCA SOBREPÕE POKÉMON JÁ ESCOLHIDOS!)
  // ==========================================================================
  function autoCompleteTeam() {
    const game = getCurrentGame();
    let addedCount = 0;

    for (let i = 0; i < 6; i++) {
      // NUNCA sobrepõe um slot que já possui um Pokémon escolhido pelo usuário!
      if (state.team[i] && state.team[i].pokemon) {
        continue;
      }

      const recs = ENGINE.getRecommendedPokemonForTeam(state.team, game, {
        includePreEvos: false,
        allowNationalDex: state.allowNationalDex
      });
      if (recs.length > 0) {
        const best = recs[0];
        state.team[i] = ENGINE.createOptimizedSlot(best.pokemon, game, state.team);
        addedCount++;
      }
    }

    if (addedCount === 0) {
      showToast('ℹ️ Todos os 6 slots já estão preenchidos! Nenhum Pokémon da sua seleção foi substituído.');
    } else {
      renderAll();
      showToast(`✨ ${addedCount} vaga(s) vazia(s) preenchida(s) mantendo os Pokémon que você já tinha escolhido!`);
    }
  }

  // Carrega a equipe campeã recomendada (Preset Meta) para o jogo atual
  function loadChampionPresetForCurrentGame() {
    const game = getCurrentGame();
    const preset = PRESET_TEAMS[game.id];
    state.team = [null, null, null, null, null, null];
    state.activeSavedTeamId = null;

    if (preset && Array.isArray(preset.members)) {
      preset.members.slice(0, 6).forEach((m, idx) => {
        const mon = findPokemonById(m.id);
        if (mon) {
          state.team[idx] = ENGINE.createOptimizedSlot(mon, game, state.team, m.mechanic || null, m.teraType || null);
        }
      });
    } else {
      autoCompleteTeam();
      return;
    }
    state.activeSlotIndex = 0;
    renderAll();
    showToast(`🏆 Sugestão Campeã de ${game.name} carregada!`);
  }

  // Exporta equipe no formato Pokémon Showdown
  function exportShowdownText() {
    const game = getCurrentGame();
    const lines = [];
    state.team.forEach(slot => {
      if (!slot || !slot.pokemon) return;
      const eff = ENGINE.getEffectivePokemonState(slot, game);
      const itemObj = (game.hasItems && slot.item) ? ITEMS[slot.item] : null;
      lines.push(`${slot.pokemon.name}${itemObj ? ` @ ${itemObj.name}` : ''}`);
      if (game.hasAbilities) lines.push(`Ability: ${eff.ability}`);
      if (slot.mechanic === 'tera' && slot.teraType) {
        lines.push(`Tera Type: ${TYPES[slot.teraType]?.name || slot.teraType}`);
      }
      const natureName = (slot.nature || 'Adamant').split(' ')[0];
      lines.push(`${natureName} Nature`);
      (slot.moves || []).forEach(mId => {
        if (mId && MOVES[mId]) {
          lines.push(`- ${MOVES[mId].name}`);
        }
      });
      lines.push('');
    });
    return lines.join('\n').trim();
  }

  // Renderiza tudo e persiste
  function renderAll() {
    const game = getCurrentGame();
    const analysis = ENGINE.analyzeTeam(state.team, game);
    renderSavedTeamsSidebar();
    renderGameHeader();
    renderTeamSlots();
    renderActiveSlotEditor(analysis);
    renderSynergyDashboard(analysis);
    renderPokemonRecommendations();
    if (state.pickerOpen) {
      renderPokedexPickerModalContent();
    }
    saveToStorage();
  }

  // ==========================================================================
  // EVENT LISTENERS E INTERAÇÕES
  // ==========================================================================
  function bindEvents() {
    // Alternar Menu Lateral de Equipes Salvas
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const sidebarEl = document.getElementById('saved-teams-sidebar');
    if (btnToggleSidebar && sidebarEl) {
      btnToggleSidebar.addEventListener('click', () => {
        sidebarEl.classList.toggle('collapsed');
      });
    }

    // Salvar Equipe Atual com Nome
    const btnSaveTeam = document.getElementById('btn-save-current-team');
    const saveNameInput = document.getElementById('save-team-name-input');
    if (btnSaveTeam) {
      btnSaveTeam.addEventListener('click', () => saveCurrentTeamWithName());
    }
    if (saveNameInput) {
      saveNameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveCurrentTeamWithName();
        }
      });
    }

    // Exportar / Baixar Equipes Salvas como Arquivo Local (.json) no Computador
    const btnExportJsonPc = document.getElementById('btn-export-json-pc');
    if (btnExportJsonPc) {
      btnExportJsonPc.addEventListener('click', () => {
        if (state.savedTeams.length === 0) {
          // Se ainda não salvou na lista lateral, salva a equipe atual antes de baixar
          const hasAnyMon = state.team.some(s => s && s.pokemon);
          if (hasAnyMon) {
            saveCurrentTeamWithName();
          } else {
            showToast('⚠️ Salve ou monte pelo menos 1 equipe antes de baixar o arquivo no PC!');
            return;
          }
        }
        const payload = {
          app: 'Pokémon Team Recommendations',
          exportedAt: new Date().toISOString(),
          savedTeams: state.savedTeams
        };
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `minhas-equipes-pokemon.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        showToast('⬇️ Arquivo "minhas-equipes-pokemon.json" salvo no seu PC!');
      });
    }

    // Carregar / Importar Arquivo Local (.json) do Computador
    const inputImportJsonPc = document.getElementById('input-import-json-pc');
    if (inputImportJsonPc) {
      inputImportJsonPc.addEventListener('change', e => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = evt => {
          try {
            const parsed = JSON.parse(evt.target.result);
            const list = Array.isArray(parsed) ? parsed : (parsed.savedTeams || []);
            if (!Array.isArray(list) || list.length === 0) {
              showToast('❌ O arquivo selecionado não contém equipes válidas.');
              return;
            }
            const existingIds = new Set(state.savedTeams.map(t => t.id));
            let importedCount = 0;
            list.forEach(item => {
              if (item && item.name && Array.isArray(item.team)) {
                const newId = existingIds.has(item.id)
                  ? ('team_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6))
                  : (item.id || ('team_' + Date.now()));
                state.savedTeams.unshift({ ...item, id: newId });
                importedCount++;
              }
            });
            if (importedCount > 0) {
              loadSavedTeamById(state.savedTeams[0].id);
              showToast(`⬆️ ${importedCount} equipe(s) carregada(s) do seu PC com sucesso!`);
            }
          } catch (err) {
            showToast('❌ Erro ao ler o arquivo JSON do seu computador.');
          }
          inputImportJsonPc.value = '';
        };
        reader.readAsText(file);
      });
    }

    // Mudança de Jogo
    const gameSelect = document.getElementById('game-select');
    if (gameSelect) {
      gameSelect.addEventListener('change', e => {
        state.selectedGameId = e.target.value;
        const g = getCurrentGame();
        state.selectedVersion = g.versions[0];
        state.showAllInBottomGrid = false;

        // Reseta opções de tipos do modal picker para recarregar conforme a geração
        const pickerTypeSelect = document.getElementById('picker-type-filter');
        if (pickerTypeSelect) pickerTypeSelect.innerHTML = '<option value="all">Todos os Tipos</option>';

        state.team.forEach(slot => {
          if (!slot || !slot.pokemon) return;
          if (slot.mechanic && !g.mechanics.includes(slot.mechanic)) {
            slot.mechanic = null;
          }
          if (!g.hasItems) {
            slot.item = null;
          } else {
            const recs = ENGINE.getRecommendedItemsForPokemon(slot.pokemon, g, slot);
            if (recs.length > 0) slot.item = recs[0].id;
          }
        });
        renderAll();
      });
    }

    // Fechar Modal Seletor de Pokédex
    const btnClosePicker = document.getElementById('btn-close-picker-modal');
    const pickerModal = document.getElementById('pokedex-picker-modal');
    if (btnClosePicker) {
      btnClosePicker.addEventListener('click', () => closePokedexPickerModal());
    }
    if (pickerModal) {
      pickerModal.addEventListener('click', e => {
        if (e.target === pickerModal) closePokedexPickerModal();
      });
    }

    // Filtros dentro do Modal Seletor da Pokédex
    const pickerSearchInput = document.getElementById('picker-search-input');
    if (pickerSearchInput) {
      pickerSearchInput.addEventListener('input', e => {
        state.pickerSearch = e.target.value;
        renderPokedexPickerModalContent();
      });
    }

    // Delegação global de cliques
    document.body.addEventListener('click', async e => {
      // Ações do Menu Lateral de Equipes Salvas
      const loadSavedBtn = e.target.closest('[data-load-saved]');
      if (loadSavedBtn) {
        loadSavedTeamById(loadSavedBtn.dataset.loadSaved);
        return;
      }

      const updateSavedBtn = e.target.closest('[data-update-saved]');
      if (updateSavedBtn) {
        updateSavedTeamById(updateSavedBtn.dataset.updateSaved);
        return;
      }

      const deleteSavedBtn = e.target.closest('[data-delete-saved]');
      if (deleteSavedBtn) {
        deleteSavedTeamById(deleteSavedBtn.dataset.deleteSaved);
        return;
      }

      // Abrir Modal Seletor da Pokédex do Jogo ao clicar em "Escolher / Trocar Pokémon" ou num slot vazio
      const openPickerTrigger = e.target.closest('[data-open-picker-slot]');
      if (openPickerTrigger && !e.target.closest('[data-remove-slot]') && !e.target.closest('[data-edit-tab]')) {
        e.stopPropagation();
        const slotIdx = Number(openPickerTrigger.dataset.openPickerSlot);
        openPokedexPickerModal(slotIdx);
        return;
      }

      // Escolher um Pokémon dentro do Modal da Pokédex do Jogo
      const pickModalMon = e.target.closest('[data-pick-modal-mon]');
      if (pickModalMon) {
        const monId = pickModalMon.dataset.pickModalMon;
        addPokemonToTeam(monId, null, null, state.pickerTargetSlot);
        closePokedexPickerModal();
        showToast(`✓ Pokémon adicionado ao Slot #${state.pickerTargetSlot + 1}!`);
        return;
      }

      // Botão Mostrar Todos os Pokémon na grade inferior
      if (e.target.closest('#btn-show-all-bottom-dex')) {
        state.showAllInBottomGrid = true;
        renderPokemonRecommendations();
        return;
      }

      // Escolha de versão
      const verBtn = e.target.closest('[data-version]');
      if (verBtn) {
        state.selectedVersion = verBtn.dataset.version;
        renderAll();
        return;
      }

      // Remover Pokémon de um slot
      const remBtn = e.target.closest('[data-remove-slot]');
      if (remBtn) {
        e.stopPropagation();
        const idx = Number(remBtn.dataset.removeSlot);
        state.team[idx] = null;
        state.activeSlotIndex = idx;
        renderAll();
        return;
      }

      // Atalho de aba de edição dentro do card do slot
      const editTabTrigger = e.target.closest('[data-edit-tab]');
      if (editTabTrigger) {
        e.stopPropagation();
        state.activeSlotIndex = Number(editTabTrigger.dataset.slotIndex);
        state.activeEditorTab = editTabTrigger.dataset.editTab;
        if (editTabTrigger.dataset.moveIdx !== undefined) {
          state.activeMoveSlotIndex = Number(editTabTrigger.dataset.moveIdx);
        }
        renderAll();
        const editorEl = document.getElementById('slot-detail-editor');
        if (editorEl) editorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Selecionar um dos 6 slots da equipe
      const slotCard = e.target.closest('[data-slot-index]');
      if (slotCard) {
        state.activeSlotIndex = Number(slotCard.dataset.slotIndex);
        renderAll();
        return;
      }

      // Adicionar Pokémon (de Inicial ou Recomendação inferior)
      const addMonBtn = e.target.closest('[data-add-mon]');
      if (addMonBtn) {
        const monId = addMonBtn.dataset.addMon;
        addPokemonToTeam(monId);
        return;
      }

      // Trocar de aba no Editor Detalhado
      const editorTabBtn = e.target.closest('[data-editor-tab]');
      if (editorTabBtn) {
        state.activeEditorTab = editorTabBtn.dataset.editorTab;
        renderAll();
        return;
      }

      // Selecionar qual dos 4 slots de ataque está sendo editado
      const moveSlotEl = e.target.closest('[data-select-move-slot]');
      if (moveSlotEl) {
        state.activeMoveSlotIndex = Number(moveSlotEl.dataset.selectMoveSlot);
        renderAll();
        return;
      }

      // Equipar um ataque recomendado no slot ativo
      const pickMoveEl = e.target.closest('[data-pick-move]');
      if (pickMoveEl) {
        const moveId = pickMoveEl.dataset.pickMove;
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon) {
          const existingIdx = slot.moves.indexOf(moveId);
          if (existingIdx !== -1) {
            slot.moves[existingIdx] = null;
          } else {
            slot.moves[state.activeMoveSlotIndex] = moveId;
            const nextEmpty = slot.moves.findIndex(m => !m);
            state.activeMoveSlotIndex = nextEmpty !== -1 ? nextEmpty : (state.activeMoveSlotIndex + 1) % 4;
          }
          renderAll();
        }
        return;
      }

      // Botão Preencher 4 Melhores Ataques
      if (e.target.closest('#btn-auto-fill-moves')) {
        const slot = state.team[state.activeSlotIndex];
        const game = getCurrentGame();
        if (slot && slot.pokemon) {
          const analysis = ENGINE.analyzeTeam(state.team, game);
          const recs = ENGINE.getRecommendedMovesForPokemon(slot.pokemon, game, analysis, slot);
          slot.moves = recs.top4Ids.slice(0, 4);
          renderAll();
        }
        return;
      }

      // Equipar um Item recomendado
      const pickItemEl = e.target.closest('[data-pick-item]');
      if (pickItemEl) {
        const itemId = pickItemEl.dataset.pickItem;
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon) {
          slot.item = itemId;
          const itemObj = ITEMS[itemId];
          if (itemObj && itemObj.category === 'mega') {
            slot.mechanic = 'mega';
            if (itemId === 'charizardite-x') slot.megaVariant = 'x';
            else slot.megaVariant = 'default';
          } else if (itemObj && itemObj.category === 'zmove') {
            slot.mechanic = 'zmove';
          }
          renderAll();
        }
        return;
      }

      // Alternar variante Mega X / Y
      const megaVarBtn = e.target.closest('[data-mega-variant]');
      if (megaVarBtn) {
        e.stopPropagation();
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon) {
          slot.mechanic = 'mega';
          slot.megaVariant = megaVarBtn.dataset.megaVariant;
          const stone = (slot.megaVariant === 'x' && slot.pokemon.megaAlt)
            ? slot.pokemon.megaAlt.stone
            : slot.pokemon.mega.stone;
          slot.item = stone;
          const game = getCurrentGame();
          const analysis = ENGINE.analyzeTeam(state.team, game);
          const recs = ENGINE.getRecommendedMovesForPokemon(slot.pokemon, game, analysis, slot);
          slot.moves = recs.top4Ids.slice(0, 4);
          renderAll();
        }
        return;
      }

      // Ativar/Desativar Mecânica no Pokémon
      const setMechEl = e.target.closest('[data-set-mechanic]');
      if (setMechEl && !e.target.closest('.tera-selector-row')) {
        const mType = setMechEl.dataset.setMechanic;
        const slot = state.team[state.activeSlotIndex];
        const game = getCurrentGame();
        if (slot && slot.pokemon) {
          slot.mechanic = mType === 'none' ? null : mType;
          if (game.hasItems) {
            const recs = ENGINE.getRecommendedItemsForPokemon(slot.pokemon, game, slot);
            if (recs.length > 0) slot.item = recs[0].id;
          }
          renderAll();
        }
        return;
      }

      // Buscar Pokémon na PokéAPI ao vivo
      if (e.target.closest('#btn-fetch-pokeapi')) {
        const btn = e.target.closest('#btn-fetch-pokeapi');
        btn.textContent = '⏳ Buscando na PokéAPI...';
        const found = await ENGINE.fetchPokemonFromPokeAPI(state.searchQuery);
        if (found) {
          state.allowNationalDex = true;
          const natToggle = document.getElementById('toggle-national-dex');
          if (natToggle) natToggle.checked = true;
          renderAll();
        } else {
          btn.textContent = '❌ Pokémon não encontrado. Verifique o nome ou nº da Dex.';
        }
        return;
      }

      if (e.target.closest('#btn-reset-filters')) {
        state.searchQuery = '';
        state.filterType = 'all';
        state.filterMechanic = 'all';
        const searchInput = document.getElementById('rec-search-input');
        if (searchInput) searchInput.value = '';
        renderAll();
        return;
      }
    });

    // Eventos de Change em Selects e Checkboxes
    document.body.addEventListener('change', e => {
      if (e.target.id === 'select-tera-type') {
        const slot = state.team[state.activeSlotIndex];
        if (slot) {
          slot.mechanic = 'tera';
          slot.teraType = e.target.value;
          renderAll();
        }
      } else if (e.target.id === 'toggle-tera-defense') {
        const slot = state.team[state.activeSlotIndex];
        if (slot) {
          slot.mechanic = 'tera';
          slot.applyTeraDefense = e.target.checked;
          renderAll();
        }
      } else if (e.target.id === 'editor-ability-select') {
        const slot = state.team[state.activeSlotIndex];
        if (slot) {
          slot.ability = e.target.value;
          renderAll();
        }
      } else if (e.target.id === 'rec-sort-mode') {
        state.sortMode = e.target.value;
        renderPokemonRecommendations();
      } else if (e.target.id === 'rec-type-filter') {
        state.filterType = e.target.value;
        renderPokemonRecommendations();
      } else if (e.target.id === 'rec-mechanic-filter') {
        state.filterMechanic = e.target.value;
        renderPokemonRecommendations();
      } else if (e.target.id === 'toggle-pre-evos') {
        state.includePreEvos = e.target.checked;
        renderPokemonRecommendations();
      } else if (e.target.id === 'toggle-national-dex') {
        state.allowNationalDex = e.target.checked;
        renderPokemonRecommendations();
      } else if (e.target.id === 'picker-sort-mode') {
        state.pickerSort = e.target.value;
        renderPokedexPickerModalContent();
      } else if (e.target.id === 'picker-type-filter') {
        state.pickerType = e.target.value;
        renderPokedexPickerModalContent();
      } else if (e.target.id === 'picker-pre-evos') {
        state.pickerPreEvos = e.target.checked;
        renderPokedexPickerModalContent();
      } else if (e.target.id === 'picker-nat-dex') {
        state.pickerNatDex = e.target.checked;
        renderPokedexPickerModalContent();
      }
    });

    // Busca em tempo real na barra inferior
    const searchInput = document.getElementById('rec-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        renderPokemonRecommendations();
      });
    }

    // Botões de ação da Equipe
    const btnAutoComplete = document.getElementById('btn-auto-complete-team');
    if (btnAutoComplete) {
      btnAutoComplete.addEventListener('click', () => autoCompleteTeam());
    }

    const btnLoadPreset = document.getElementById('btn-load-champion-preset');
    if (btnLoadPreset) {
      btnLoadPreset.addEventListener('click', () => loadChampionPresetForCurrentGame());
    }

    const btnClearTeam = document.getElementById('btn-clear-team');
    if (btnClearTeam) {
      btnClearTeam.addEventListener('click', () => {
        state.team = [null, null, null, null, null, null];
        state.activeSavedTeamId = null;
        state.activeSlotIndex = 0;
        renderAll();
        showToast('🗑️ Equipe limpa! Clique em qualquer slot para montar sua equipe.');
      });
    }

    const btnExport = document.getElementById('btn-export-showdown');
    const modalEl = document.getElementById('export-modal');
    const modalTextarea = document.getElementById('export-textarea');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const btnCopyShowdown = document.getElementById('btn-copy-showdown');

    if (btnExport && modalEl && modalTextarea) {
      btnExport.addEventListener('click', () => {
        modalTextarea.value = exportShowdownText() || 'Sua equipe está vazia! Adicione Pokémon antes de exportar.';
        modalEl.classList.add('open');
      });
    }
    if (btnCloseModal && modalEl) {
      btnCloseModal.addEventListener('click', () => modalEl.classList.remove('open'));
    }
    if (btnCopyShowdown && modalTextarea) {
      btnCopyShowdown.addEventListener('click', () => {
        navigator.clipboard.writeText(modalTextarea.value);
        btnCopyShowdown.textContent = '✓ Copiado para a Área de Transferência!';
        setTimeout(() => {
          btnCopyShowdown.textContent = '📋 Copiar Formato Showdown';
        }, 2000);
      });
    }
  }

  // Inicialização ao carregar o DOM
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadFromStorage();
    renderAll();
  });
})();
