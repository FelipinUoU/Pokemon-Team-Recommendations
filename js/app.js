// ============================================================================
// CONTROLADOR DA APLICAÇÃO WEB — POKÉMON TEAM RECOMMENDATIONS
// Design: Google Stitch ("Tactical Esports Deck") + Motor Dinâmico Gen 1–9 + Unbound & Lazarus
// ============================================================================

(function () {
  const { TYPES, GAMES, MECHANICS, ITEMS, MOVES, POKEMON, PRESET_TEAMS } = window.POKE_DATA;
  const ENGINE = window.POKE_ENGINE;

  const STORAGE_KEY_ACTIVE = 'poketeam_pro_state_v3';
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
    // Editor detalhado (abre/fecha ao clicar em Stats/Ataques/Item/Mecânica)
    editorOpen: false,
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
        moves: s.moves,
        evIvEnabled: Boolean(s.evIvEnabled),
        ivs: s.ivs ? { ...s.ivs } : { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
        evs: s.evs ? { ...s.evs } : { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 }
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
      const defStats = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
      result[idx] = {
        pokemon: mon,
        mechanic: item.mechanic || null,
        megaVariant: item.megaVariant || 'default',
        teraType: item.teraType || mon.bestTera || mon.types[0],
        applyTeraDefense: Boolean(item.applyTeraDefense),
        ability: item.ability || (mon.abilities && mon.abilities[0]) || 'Overgrow',
        nature: item.nature || mon.bestNature || 'Adamant (+Atk, -SpA)',
        item: item.item || null,
        moves: Array.isArray(item.moves) ? [...item.moves] : [null, null, null, null],
        evIvEnabled: Boolean(item.evIvEnabled),
        ivs: item.ivs ? { ...defStats, ...item.ivs } : { ...defStats },
        evs: item.evs ? { ...defStats, ...item.evs } : { ...defStats }
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
      <span>${t.icon}</span> ${t.name}
    </span>`;
  }

  // Selo de Pokémon exclusivo de versão (com a cor da versão). Não exibe nada se o Pokémon estiver em ambas as versões.
  function renderVersionExclusiveBadge(mon) {
    if (!ENGINE.getVersionExclusiveInfo || !mon) return '';
    const info = ENGINE.getVersionExclusiveInfo(mon, getCurrentGame(), state.selectedVersion);
    if (!info) return '';
    const title = info.isTrade
      ? `Exclusivo de ${info.version} — disponível na sua versão apenas por troca`
      : `Exclusivo da versão ${info.version}`;
    return `<span class="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded font-mono text-[10px] font-bold leading-none shrink-0 align-middle border border-white/20 shadow-sm" style="background:${info.color}; color:${info.textColor};" title="${title}">${info.isTrade ? '🔄 ' : ''}${info.version}</span>`;
  }

  // ==========================================================================
  // 0. RENDERIZAÇÃO DO MENU LATERAL DE EQUIPES SALVAS (STITCH DRAWER)
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
        <div class="bg-surface-container rounded-xl p-space-md border border-dashed border-outline-variant/30 text-center space-y-1.5">
          <span class="material-symbols-outlined text-primary text-[28px]">folder_open</span>
          <p class="font-headline font-bold text-xs text-on-surface">Nenhuma equipe salva ainda</p>
          <p class="text-[11px] text-on-surface-variant leading-relaxed">
            Monte sua equipe ao lado, digite o nome no campo acima e clique em <strong>"Salvar Equipe Localmente"</strong>!
          </p>
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
          return `<div class="w-9 h-9 rounded bg-surface-container flex items-center justify-center border border-dashed border-outline-variant/30">
            <span class="material-symbols-outlined text-xs text-outline">add</span>
          </div>`;
        }
        return `
          <div class="w-9 h-9 rounded bg-surface-container flex items-center justify-center overflow-hidden" title="${formatDexNum(mon.dex)} ${mon.name}">
            <img src="${ENGINE.getSpriteUrl(mon.spriteId || mon.dex)}" alt="${mon.name}" class="w-8 h-8 object-contain" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${mon.dex}.png'" />
          </div>
        `;
      }).join('');

      return `
        <div class="bg-surface-container-high rounded-xl p-space-md transition-all ${isActive ? 'border-l-4 border-primary-container shadow-md' : 'border border-outline-variant/20 hover:bg-surface-container-highest/60'}">
          <div class="flex items-start justify-between gap-2 mb-1">
            <div class="min-w-0">
              <h3 class="font-headline font-bold text-sm text-on-surface truncate">${saved.name}</h3>
              <p class="text-[11px] text-on-surface-variant truncate">${saved.gameName} • ${saved.version}</p>
            </div>
            ${isActive ? `<span class="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[10px] font-bold shrink-0">ATIVA</span>` : ''}
          </div>

          <div class="grid grid-cols-6 gap-1 my-2.5 bg-surface-container-lowest p-1.5 rounded-lg">
            ${spritesHtml}
          </div>

          <div class="flex items-center gap-1.5 pt-1">
            <button data-load-saved="${saved.id}" class="flex-1 py-1.5 px-2 rounded bg-primary-container/20 hover:bg-primary-container/30 text-primary font-label-sm text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer" title="Carregar esta equipe no construtor">
              <span class="material-symbols-outlined text-[14px]">folder_open</span>
              Carregar
            </button>
            <button data-update-saved="${saved.id}" class="py-1.5 px-2 rounded bg-surface-container hover:bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-label-sm text-[11px] flex items-center justify-center gap-1 transition-colors cursor-pointer" title="Sobrescrever esta equipe salva com a equipe atual da tela">
              <span class="material-symbols-outlined text-[14px]">refresh</span>
              Atualizar
            </button>
            <button data-delete-saved="${saved.id}" class="p-1.5 rounded bg-error-container/20 hover:bg-error-container/40 text-error transition-colors cursor-pointer" title="Excluir equipe salva">
              <span class="material-symbols-outlined text-[14px]">delete</span>
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
    showToast(`💾 Equipe "${customName}" salva localmente no seu PC!`);
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
  // 1. RENDERIZAÇÃO DO PAINEL DE CONFIGURAÇÃO DO JOGO (STITCH HUD)
  // ==========================================================================
  function renderGameHeader() {
    const game = getCurrentGame();
    const gameSelectEl = document.getElementById('game-select');
    const versionContainer = document.getElementById('version-pills');
    const mechanicsContainer = document.getElementById('game-mechanics-badges');

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
        const isActive = v === state.selectedVersion;
        return `<button data-version="${v}" class="flex-1 py-1.5 px-2.5 rounded-md font-headline text-xs transition-all cursor-pointer ${
          isActive
            ? 'bg-primary-container text-on-primary-container font-bold shadow'
            : 'text-on-surface-variant hover:text-on-surface font-medium'
        }">${v}</button>`;
      }).join('');
    }

    if (mechanicsContainer) {
      if (game.mechanics.length === 0) {
        mechanicsContainer.innerHTML = `
          <span class="px-2.5 py-1.5 rounded-lg bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1.5">
            ⚔️ Batalha Clássica (Sem Transformações Especiais)
          </span>
        `;
      } else {
        mechanicsContainer.innerHTML = game.mechanics.map(mId => {
          const m = MECHANICS[mId];
          if (!m) return '';
          return `
            <span class="px-2.5 py-1.5 rounded-lg font-label-sm text-label-sm flex items-center gap-1.5 border" style="border-color:${m.badgeColor}66; color:${m.badgeColor}; background:${m.badgeColor}18" title="${m.description}">
              <span>${m.icon}</span> ${m.name}
            </span>
          `;
        }).join('');
      }
    }
  }

  // ==========================================================================
  // 2. RENDERIZAÇÃO DOS 6 SLOTS DA EQUIPE (STITCH TACTICAL CARDS)
  // ==========================================================================
  function renderTeamSlots() {
    const gridEl = document.getElementById('team-slots-grid');
    const counterEl = document.getElementById('team-filled-counter');
    if (!gridEl) return;
    const game = getCurrentGame();

    const filledCount = state.team.filter(s => s && s.pokemon).length;
    if (counterEl) {
      counterEl.textContent = `${filledCount} / 6 Preenchidos`;
    }

    // O botão "Auto-Completar" só deve aparecer se houver 1 ou mais espaços vazios
    const btnAutoCompleteEl = document.getElementById('btn-auto-complete-team');
    if (btnAutoCompleteEl) {
      if (filledCount >= 6) {
        btnAutoCompleteEl.classList.add('hidden');
      } else {
        btnAutoCompleteEl.classList.remove('hidden');
      }
    }

    // Top 3 recomendações de sinergia para sugerir nos slots vazios (como no design do Stitch)
    const topRecsForEmpty = ENGINE.getRecommendedPokemonForTeam(state.team, game, {
      includePreEvos: false,
      allowNationalDex: state.allowNationalDex,
      selectedVersion: state.selectedVersion
    }).slice(0, 6);

    let emptyRecCursor = 0;

    gridEl.innerHTML = state.team.map((slot, idx) => {
      const isSelected = idx === state.activeSlotIndex;

      // CARD DE SLOT VAZIO (COM SUGESTÃO DE ALTA SINERGIA INLINE DO STITCH)
      if (!slot || !slot.pokemon) {
        const recHint = topRecsForEmpty[emptyRecCursor++] || topRecsForEmpty[0];
        return `
          <article class="slot-card bg-surface-container-low/75 rounded-xl p-space-md flex flex-col justify-between border-2 border-dashed ${
            isSelected ? 'border-primary active-slot-glow' : 'border-outline-variant/30 hover:border-primary/50'
          } transition-all relative overflow-hidden cursor-pointer" data-open-picker-slot="${idx}">
            <div class="flex items-center justify-between gap-space-xs">
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-bold tracking-wider">
                SLOT #${idx + 1} — VAGA ABERTA
              </span>
              <span class="text-[11px] font-mono text-primary">Clique para Escolher</span>
            </div>

            <div class="my-4 flex flex-col items-center justify-center text-center py-2">
              <div class="w-14 h-14 rounded-full bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mb-2.5 group-hover:scale-105 transition-transform">
                <span class="material-symbols-outlined text-primary text-3xl">add_circle</span>
              </div>
              <h3 class="font-headline font-bold text-sm text-on-surface mb-1">Escolher Pokémon para o Slot #${idx + 1}</h3>
              <p class="text-xs text-on-surface-variant max-w-[260px]">
                Abra a Pokédex de <strong>${game.name}</strong> e pesquise por Nome ou Nº (#001–#1025)
              </p>
            </div>

            ${recHint ? `
              <div class="bg-surface-container rounded-lg p-2.5 border border-tertiary/25 flex items-center justify-between gap-2" onclick="event.stopPropagation()">
                <div class="flex items-center gap-2 min-w-0">
                  <img src="${ENGINE.getSpriteUrl(recHint.state.spriteId)}" alt="${recHint.pokemon.name}" class="w-9 h-9 object-contain shrink-0" loading="lazy" />
                  <div class="min-w-0">
                    <span class="text-[10px] font-mono uppercase text-tertiary block font-bold">💡 Sugestão (${recHint.synergyPercent}% Sinergia)</span>
                    <p class="text-xs font-semibold text-on-surface truncate">${formatDexNum(recHint.pokemon.dex)} ${recHint.pokemon.name}</p>
                  </div>
                </div>
                <button data-quick-fill-slot="${idx}" data-quick-mon="${recHint.pokemon.id}" class="px-2.5 py-1 rounded bg-tertiary-container/20 hover:bg-tertiary-container/35 text-tertiary border border-tertiary/30 font-mono text-[11px] font-bold shrink-0 cursor-pointer">
                  + Usar
                </button>
              </div>
            ` : ''}
          </article>
        `;
      }

      // CARD DE SLOT PREENCHIDO (STITCH TACTICAL CARD)
      const eff = ENGINE.getEffectivePokemonState(slot, game);
      const itemObj = slot.item ? ITEMS[slot.item] : null;
      const mechObj = slot.mechanic ? MECHANICS[slot.mechanic] : null;

      const movesHtml = [0, 1, 2, 3].map(mIdx => {
        const mId = slot.moves[mIdx];
        const mv = mId ? MOVES[mId] : null;
        if (!mv) {
          return `
            <div data-slot-index="${idx}" data-edit-tab="moves" data-move-idx="${mIdx}" class="bg-surface-container-lowest px-2.5 py-1.5 rounded border border-dashed border-outline-variant/40 flex items-center justify-between text-on-surface-variant hover:text-primary hover:border-primary/50 transition-colors">
              <span class="text-xs italic truncate">+ Golpe #${mIdx + 1}</span>
            </div>
          `;
        }
        const t = TYPES[mv.type] || TYPES.normal;
        return `
          <div data-slot-index="${idx}" data-edit-tab="moves" data-move-idx="${mIdx}" class="bg-surface-container-lowest px-2.5 py-1.5 rounded flex items-center justify-between gap-1 hover:brightness-125 transition-all" style="border-left: 3px solid ${t.color}">
            <span class="text-xs font-semibold text-on-surface truncate">${mv.name}</span>
            <span class="font-mono text-[10px] shrink-0" style="color:${t.color}">${t.icon}${mv.power || 'ST'}</span>
          </div>
        `;
      }).join('');

      return `
        <article class="slot-card ${isSelected ? 'bg-surface-container-high active-slot-glow' : 'bg-surface-container hover:bg-surface-container-high'} rounded-xl p-space-md flex flex-col justify-between transition-all relative overflow-hidden cursor-pointer border border-outline-variant/15" data-slot-index="${idx}">
          <!-- Top Bar -->
          <div class="flex items-center justify-between gap-space-xs pb-space-xs">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="px-2 py-0.5 rounded ${isSelected ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface'} font-label-sm text-label-sm font-bold tracking-wider">
                SLOT #${idx + 1}
              </span>
              <span class="font-mono text-xs text-on-surface-variant font-bold">${formatDexNum(eff.dex)}</span>
              ${mechObj ? `
                <span class="px-2 py-0.5 rounded font-label-sm text-[11px] font-bold flex items-center gap-1 border" style="background:${mechObj.badgeColor}20; color:${mechObj.badgeColor}; border-color:${mechObj.badgeColor}55">
                  ${mechObj.icon} ${slot.mechanic === 'tera' ? `Tera ${TYPES[slot.teraType]?.name || ''}` : mechObj.shortName}
                </span>
              ` : ''}
            </div>
            <div class="flex items-center gap-1">
              <button data-open-picker-slot="${idx}" class="px-2 h-6 rounded bg-surface-container-lowest hover:bg-primary-container/20 text-on-surface-variant hover:text-primary font-mono text-[11px] flex items-center gap-1 transition-colors cursor-pointer" title="Trocar Pokémon deste slot">
                <span class="material-symbols-outlined text-[14px]">swap_horiz</span>
                Trocar
              </button>
              <button data-remove-slot="${idx}" class="w-6 h-6 rounded bg-surface-container-lowest hover:bg-error-container/40 flex items-center justify-center text-error transition-colors cursor-pointer" title="Remover Pokémon">
                <span class="material-symbols-outlined text-[15px]">close</span>
              </button>
            </div>
          </div>

          <!-- Center Identity -->
          <div class="flex items-center gap-space-md my-space-xs">
            <div class="w-20 h-20 rounded-xl bg-surface-container-lowest p-1.5 flex items-center justify-center relative shrink-0 border border-outline-variant/20 group" title="Clique para abrir/fechar o status deste Pokémon">
              <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="w-16 h-16 object-contain drop-shadow-[0_4px_8px_rgba(56,189,248,0.25)] group-hover:scale-110 transition-transform" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eff.dex}.png'" />
            </div>

            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 min-w-0">
                <h3 class="font-headline font-extrabold text-base text-on-surface truncate">${eff.name}</h3>
                ${renderVersionExclusiveBadge(slot.pokemon)}
              </div>

              <div class="flex flex-wrap gap-1 my-1.5">
                ${eff.types.map(t => renderTypeBadge(t, 'xs')).join('')}
              </div>

              <div class="text-[11px] text-on-surface-variant space-y-0.5">
                ${game.hasAbilities ? `<div class="truncate">✨ Hab: <strong class="text-on-surface">${eff.ability}</strong></div>` : ''}
                ${game.hasItems ? `
                  <div class="truncate flex items-center gap-1">
                    🎒 Item:
                    <button data-slot-index="${idx}" data-edit-tab="item" class="text-secondary hover:underline font-semibold truncate cursor-pointer">
                      ${itemObj ? `${itemObj.icon} ${itemObj.name}` : '+ Escolher Item'}
                    </button>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>

          <!-- 2x2 Moveset Mini Grid -->
          <div class="grid grid-cols-2 gap-1.5 my-space-xs pt-space-xs border-t border-outline-variant/20">
            ${movesHtml}
          </div>

          <!-- Quick Slot Footer Actions -->
          <div class="flex items-center justify-between pt-space-xs gap-1">
            <button data-slot-index="${idx}" data-edit-tab="moves" class="px-2.5 py-1 rounded ${
              state.editorOpen && isSelected && state.activeEditorTab === 'moves'
                ? 'bg-primary-container text-on-primary-container font-bold'
                : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
            } font-label-sm text-[11px] flex items-center gap-1 cursor-pointer">
              ⚔️ 4 Ataques
            </button>
            <div class="flex items-center gap-1">
              ${game.hasItems ? `
                <button data-slot-index="${idx}" data-edit-tab="item" class="px-2 py-1 rounded ${
                  state.editorOpen && isSelected && state.activeEditorTab === 'item'
                    ? 'bg-primary-container text-on-primary-container font-bold'
                    : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                } font-label-sm text-[11px] cursor-pointer">🎒 Item</button>
              ` : ''}
              <button data-slot-index="${idx}" data-edit-tab="stats" class="px-2 py-1 rounded ${
                state.editorOpen && isSelected && state.activeEditorTab === 'stats'
                  ? 'bg-primary-container text-on-primary-container font-bold'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
              } font-label-sm text-[11px] cursor-pointer" title="Abrir/Fechar Atributos e Defesas">📊 Stats</button>
            </div>
          </div>
        </article>
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
    const countBarEl = document.getElementById('picker-count-bar');
    const gridEl = document.getElementById('picker-pokemon-grid');
    const typeSelectEl = document.getElementById('picker-type-filter');

    if (titleEl) {
      const currentSlotMon = state.team[state.pickerTargetSlot]?.pokemon;
      titleEl.textContent = currentSlotMon
        ? `🔄 Trocar Pokémon do Slot #${state.pickerTargetSlot + 1} (Atual: ${currentSlotMon.name})`
        : `🔍 Escolher Pokémon para o Slot #${state.pickerTargetSlot + 1}`;
    }

    if (typeSelectEl && typeSelectEl.options.length <= 1) {
      const activeTypes = ENGINE.getActiveTypesForGame(game);
      typeSelectEl.innerHTML = `<option value="all">Todos os Tipos (${activeTypes.length})</option>` +
        activeTypes.map(t => `<option value="${t}" ${state.pickerType === t ? 'selected' : ''}>${TYPES[t].icon} ${TYPES[t].name}</option>`).join('');
    }

    const scopeInfo = ENGINE.getDexScopeInfo ? ENGINE.getDexScopeInfo(game) : { eraNationalGen: game.generation || 9, natMaxNum: 1025 };
    const activeVerLabel = state.selectedVersion || game.region;
    const pickerSwitchEl = document.getElementById('picker-dex-scope-switch');
    if (pickerSwitchEl) {
      pickerSwitchEl.innerHTML = `
        <button type="button" data-picker-dex-scope="pokedex" class="px-3 py-1.5 rounded-lg font-headline text-xs transition-all cursor-pointer ${
          !state.pickerNatDex
            ? 'bg-primary-container text-on-primary-container font-bold shadow'
            : 'text-on-surface-variant hover:text-on-surface font-semibold'
        }">
          📖 Pokédex (${activeVerLabel})
        </button>
        <button type="button" data-picker-dex-scope="national" class="px-3 py-1.5 rounded-lg font-headline text-xs transition-all cursor-pointer ${
          state.pickerNatDex
            ? 'bg-primary-container text-on-primary-container font-bold shadow'
            : 'text-on-surface-variant hover:text-on-surface font-semibold'
        }">
          🌐 National Dex (Gen 1–${scopeInfo.eraNationalGen})
        </button>
      `;
    }

    const candidates = ENGINE.getRecommendedPokemonForTeam(state.team, game, {
      typeFilter: state.pickerType,
      searchQuery: state.pickerSearch,
      includePreEvos: state.pickerPreEvos,
      allowNationalDex: state.pickerNatDex,
      selectedVersion: state.selectedVersion,
      includeCurrentTeam: true
    });

    if (state.pickerSort === 'dex') {
      candidates.sort((a, b) => a.pokemon.dex - b.pokemon.dex);
    } else if (state.pickerSort === 'alpha') {
      candidates.sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name));
    } else {
      candidates.sort((a, b) => b.synergyPercent - a.synergyPercent);
    }

    if (countBarEl) {
      countBarEl.innerHTML = `
        <span>Encontrados <strong class="text-primary">${candidates.length} Pokémon</strong> na <strong>${state.pickerNatDex ? `National Dex da época de ${game.name} (Até Gen ${scopeInfo.eraNationalGen} • #${scopeInfo.natMaxNum})` : `Pokédex da versão ${activeVerLabel} (${game.region})`}</strong></span>
        <span>Clique em qualquer card para selecionar no <strong class="text-on-surface">Slot #${state.pickerTargetSlot + 1}</strong></span>
      `;
    }

    if (!gridEl) return;
    if (candidates.length === 0) {
      gridEl.innerHTML = `
        <div class="col-span-full bg-surface-container-low rounded-xl p-8 text-center border border-outline-variant/20">
          <p class="text-sm font-semibold text-on-surface">Nenhum Pokémon encontrado para <strong>"${state.pickerSearch}"</strong> neste filtro.</p>
          <p class="text-xs text-on-surface-variant mt-2">Dica: marque a opção <strong>"🌐 National Dex"</strong> acima para pesquisar Pokémon de outras gerações!</p>
        </div>
      `;
      return;
    }

    const currentTeamIds = new Set(state.team.filter(s => s && s.pokemon).map(s => s.pokemon.id));

    gridEl.innerHTML = candidates.map(rec => {
      const { pokemon, state: eff, synergyPercent, reasonText } = rec;
      const alreadyInTeam = currentTeamIds.has(pokemon.id);
      return `
        <div data-pick-modal-mon="${pokemon.id}" class="bg-surface-container-low hover:bg-surface-container-high rounded-xl p-space-md border ${
          alreadyInTeam ? 'border-tertiary/50 bg-tertiary-container/5' : 'border-outline-variant/20 hover:border-primary/50'
        } flex flex-col justify-between gap-2.5 transition-all cursor-pointer group">
          <div class="flex items-center justify-between">
            <span class="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-xs font-bold text-primary">${formatDexNum(pokemon.dex)}</span>
            <span class="px-2 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-mono text-[11px] font-bold">${synergyPercent}% Sinergia</span>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 border border-outline-variant/15">
              <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${pokemon.name}" class="w-12 h-12 object-contain group-hover:scale-110 transition-transform" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dex}.png'" />
            </div>
            <div class="min-w-0">
              <div class="flex items-center gap-1.5 min-w-0">
                <h4 class="font-headline font-bold text-sm text-on-surface truncate group-hover:text-primary">${pokemon.name}</h4>
                ${renderVersionExclusiveBadge(pokemon)}
              </div>
              <div class="flex flex-wrap gap-1 mt-1">
                ${eff.types.map(t => renderTypeBadge(t, 'xs')).join('')}
                <span class="font-mono text-[10px] text-on-surface-variant self-center ml-1">${eff.bst} BST</span>
              </div>
            </div>
          </div>

          <p class="text-[11px] text-on-surface-variant line-clamp-2 leading-relaxed">${reasonText}</p>

          <button class="w-full py-2 rounded-lg font-headline font-bold text-xs transition-all cursor-pointer ${
            alreadyInTeam
              ? 'bg-tertiary-container/25 text-tertiary border border-tertiary/40'
              : 'bg-primary-container/20 group-hover:bg-primary-container text-primary group-hover:text-on-primary-container border border-primary/30'
          }">
            ${alreadyInTeam ? '✓ Já está na Equipe (Selecionar)' : `+ Escolher para o Slot #${state.pickerTargetSlot + 1}`}
          </button>
        </div>
      `;
    }).join('');
  }

  // ==========================================================================
  // 3. PAINEL DE EDIÇÃO PROFUNDA DO POKÉMON ATIVO (STITCH 4-TAB DEEP EDITOR)
  // ==========================================================================
  function computeSingleStatDisplay(statKey, baseVal, natureObj, slot, pokemonId) {
    const iv = (slot.ivs && typeof slot.ivs[statKey] === 'number') ? slot.ivs[statKey] : 0;
    const ev = (slot.evs && typeof slot.evs[statKey] === 'number') ? slot.evs[statKey] : 0;
    const evIvOn = Boolean(slot.evIvEnabled);

    if (!evIvOn) {
      let calcVal = baseVal;
      let modTag = '';
      let valClass = 'text-on-surface';
      if (natureObj.up === statKey) {
        calcVal = Math.floor(baseVal * 1.1);
        modTag = `<span class="text-[10px] text-tertiary font-mono ml-1">(+10% ↑ • Base ${baseVal})</span>`;
        valClass = 'text-tertiary';
      } else if (natureObj.down === statKey) {
        calcVal = Math.floor(baseVal * 0.9);
        modTag = `<span class="text-[10px] text-error font-mono ml-1">(-10% ↓ • Base ${baseVal})</span>`;
        valClass = 'text-error';
      }
      const pct = Math.min(100, Math.round((calcVal / 180) * 100));
      return { calcVal, modTag, valClass, pct, iv, ev };
    }

    // Cálculo com EVs e IVs ativados (Status Editado Nv. 100)
    const evBonus = Math.floor(ev / 4);
    let calcVal = baseVal;
    let modTag = '';
    let valClass = (iv > 0 || ev > 0) ? 'text-primary' : 'text-on-surface';

    if (statKey === 'hp') {
      calcVal = pokemonId === 'shedinja' ? 1 : (2 * baseVal + iv + evBonus + 110);
      modTag = `<span class="text-[10px] text-on-surface-variant font-mono ml-1">(Base ${baseVal} • +${iv} IV • +${evBonus} EV)</span>`;
    } else {
      const rawStat = 2 * baseVal + iv + evBonus + 5;
      let natureMult = 1.0;
      let natLabel = '';
      if (natureObj.up === statKey) {
        natureMult = 1.1;
        natLabel = ' • +10%↑';
        valClass = 'text-tertiary';
      } else if (natureObj.down === statKey) {
        natureMult = 0.9;
        natLabel = ' • -10%↓';
        valClass = 'text-error';
      }
      calcVal = Math.floor(rawStat * natureMult);
      modTag = `<span class="text-[10px] ${natureObj.up === statKey ? 'text-tertiary' : (natureObj.down === statKey ? 'text-error' : 'text-on-surface-variant')} font-mono ml-1">(Base ${baseVal}${natLabel})</span>`;
    }

    const pct = Math.min(100, Math.round((calcVal / 520) * 100));
    return { calcVal, modTag, valClass, pct, iv, ev };
  }

  function renderActiveSlotEditor(teamAnalysis) {
    const container = document.getElementById('slot-detail-editor');
    if (!container) return;

    const game = getCurrentGame();
    const slot = state.team[state.activeSlotIndex];

    if (!state.editorOpen || !slot || !slot.pokemon) {
      container.classList.add('hidden');
      container.innerHTML = '';
      return;
    }

    container.classList.remove('hidden');

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

    // ABA 1: 4 ATAQUES RECOMENDADOS
    if (state.activeEditorTab === 'moves') {
      const currentMoves = slot.moves || [null, null, null, null];
      const moveSlotsBar = [0, 1, 2, 3].map(idx => {
        const mId = currentMoves[idx];
        const mv = mId ? MOVES[mId] : null;
        const isCurrentMoveSlot = idx === state.activeMoveSlotIndex;
        if (!mv) {
          return `
            <div data-select-move-slot="${idx}" class="p-3 rounded-xl bg-surface-container-lowest border-2 ${
              isCurrentMoveSlot ? 'border-primary shadow-md' : 'border-dashed border-outline-variant/40'
            } cursor-pointer transition-all">
              <div class="flex items-center justify-between mb-1">
                <span class="font-mono text-[11px] text-primary font-bold">ATAQUE #${idx + 1}</span>
                <span class="text-[10px] text-on-surface-variant">Vazio</span>
              </div>
              <p class="text-xs text-on-surface-variant italic">Clique num golpe recomendado abaixo</p>
            </div>
          `;
        }
        const t = TYPES[mv.type] || TYPES.normal;
        return `
          <div data-select-move-slot="${idx}" class="p-3 rounded-xl bg-surface-container-lowest border-2 ${
            isCurrentMoveSlot ? 'border-primary shadow-md' : 'border-outline-variant/25 hover:border-outline-variant/60'
          } cursor-pointer transition-all" style="border-left: 4px solid ${t.color}">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0 flex-1">
                <span class="font-mono text-[10px] text-on-surface-variant uppercase block mb-0.5">ATAQUE #${idx + 1} • ${mv.category}</span>
                <div class="font-headline font-bold text-sm text-on-surface truncate">${mv.name}</div>
                <div class="text-[11px] font-mono text-on-surface-variant mt-1">
                  Poder: <strong class="text-on-surface">${mv.power || '—'}</strong> • Prec: <strong class="text-on-surface">${mv.acc}%</strong>
                </div>
              </div>
              <div class="flex flex-col items-end gap-1.5 shrink-0">
                ${renderTypeBadge(mv.type, 'xs')}
                <button type="button" data-remove-move-slot="${idx}" class="px-2 py-0.5 rounded bg-error-container/25 hover:bg-error-container/50 text-error border border-error/35 font-mono text-[10px] font-bold flex items-center gap-0.5 transition-colors cursor-pointer" title="Tirar este ataque escolhido">
                  <span class="material-symbols-outlined text-[12px]">close</span>
                  Tirar
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      const recommendedListHtml = moveRecs.allScoredMoves.map(m => {
        const isEquipped = currentMoves.includes(m.id);
        const isTop4 = moveRecs.top4Ids.includes(m.id);
        return `
          <div data-pick-move="${m.id}" class="p-3 rounded-xl ${
            isEquipped
              ? 'bg-tertiary-container/15 border border-tertiary/40'
              : 'bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/20'
          } flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all cursor-pointer">
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2">
                <span class="font-headline font-bold text-sm text-on-surface">${m.name}</span>
                ${renderTypeBadge(m.type, 'xs')}
                <span class="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-[10px] text-on-surface-variant">${m.category}</span>
                <span class="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                  isTop4 ? 'bg-primary-container/25 text-primary border border-primary/30' : 'bg-surface-container-highest text-on-surface-variant'
                }">${isTop4 ? '⭐ Top 4 Recomendado • ' : ''}${m.badge}</span>
              </div>
              <p class="text-xs text-on-surface-variant">${m.reason} — <em class="text-on-surface/80">${m.desc}</em></p>
            </div>

            <div class="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <div class="text-right font-mono text-xs text-on-surface-variant">
                <div>PWR: <strong class="text-on-surface">${m.power || '—'}</strong></div>
                <div>ACC: <strong class="text-on-surface">${m.acc}%</strong></div>
              </div>
              <button class="px-3 py-1.5 rounded-lg font-headline font-bold text-xs cursor-pointer ${
                isEquipped
                  ? 'bg-tertiary-container text-on-tertiary-fixed'
                  : 'bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container'
              }">
                ${isEquipped ? '✓ Equipado' : `Equipar no #${state.activeMoveSlotIndex + 1}`}
              </button>
            </div>
          </div>
        `;
      }).join('');

      tabBodyHtml = `
        <div class="p-space-lg space-y-space-md">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">Escolha os 4 Ataques de ${eff.name}</h4>
              <p class="text-xs text-on-surface-variant">Clique em um dos 4 slots abaixo e selecione um golpe recomendado para cobrir as fraquezas da equipe.</p>
            </div>
            <button id="btn-auto-fill-moves" class="px-3.5 py-2 rounded-lg bg-primary-container/20 hover:bg-primary-container/30 text-primary border border-primary/40 font-headline font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer">
              <span class="material-symbols-outlined text-[16px]">auto_fix_high</span>
              Preencher 4 Melhores Golpes
            </button>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            ${moveSlotsBar}
          </div>

          <div class="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scroll">
            ${recommendedListHtml}
          </div>
        </div>
      `;
    }
    // ABA 2: ITEM SEGURADO RECOMENDADO
    else if (state.activeEditorTab === 'item') {
      if (!game.hasItems) {
        tabBodyHtml = `
          <div class="p-space-lg text-center text-sm text-on-surface-variant">
            🚫 Os jogos <strong>${game.name}</strong> (1ª Geração) não possuem a mecânica de Itens Segurados em batalha.
          </div>
        `;
      } else {
        const itemsHtml = itemRecs.map((it, i) => {
          const isEquipped = slot.item === it.id;
          return `
            <div data-pick-item="${it.id}" class="p-space-md rounded-xl ${
              isEquipped
                ? 'bg-tertiary-container/15 border-2 border-tertiary'
                : 'bg-surface-container-low hover:bg-surface-container-high border border-outline-variant/20'
            } flex items-center justify-between gap-3 transition-all cursor-pointer">
              <div class="flex items-center gap-3 min-w-0">
                <div class="w-11 h-11 rounded-xl bg-surface-container-lowest flex items-center justify-center text-2xl shrink-0 border border-outline-variant/20">
                  ${it.icon}
                </div>
                <div class="min-w-0">
                  <div class="flex flex-wrap items-center gap-2">
                    <strong class="font-headline font-bold text-sm text-on-surface">${it.name}</strong>
                    <span class="px-2 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                      i === 0 ? 'bg-secondary-container/25 text-secondary border border-secondary/40' : 'bg-surface-container-highest text-primary'
                    }">${it.badge}</span>
                  </div>
                  <p class="text-xs text-on-surface-variant mt-0.5">${it.reason}</p>
                </div>
              </div>
              <button class="px-3 py-1.5 rounded-lg font-headline font-bold text-xs shrink-0 cursor-pointer ${
                isEquipped
                  ? 'bg-tertiary-container text-on-tertiary-fixed'
                  : 'bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container'
              }">
                ${isEquipped ? '✓ Equipado' : 'Equipar'}
              </button>
            </div>
          `;
        }).join('');

        tabBodyHtml = `
          <div class="p-space-lg space-y-space-md">
            <div>
              <h4 class="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">Escolha o Item Segurado (Held Item) para ${eff.name}</h4>
              <p class="text-xs text-on-surface-variant">Itens recomendados conforme os atributos, função, habilidade e geração do jogo.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              ${itemsHtml}
            </div>
          </div>
        `;
      }
    }
    // ABA 3: MECÂNICAS ESPECIAIS DO JOGO
    else if (state.activeEditorTab === 'mechanics') {
      const canMega = game.mechanics.includes('mega') && Boolean(slot.pokemon.mega);
      const canPrimal = game.mechanics.includes('primal') && Boolean(slot.pokemon.primal);
      const canZMove = game.mechanics.includes('zmove');
      const canDynamax = game.mechanics.includes('dynamax');
      const canTera = game.mechanics.includes('tera');
      const activeTypes = ENGINE.getActiveTypesForGame(game);

      tabBodyHtml = `
        <div class="p-space-lg space-y-space-md">
          <div>
            <h4 class="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">Mecânicas Especiais de Batalha (${game.name})</h4>
            <p class="text-xs text-on-surface-variant">Ative transformações disponíveis neste jogo para recalcular tipos, atributos, habilidade e sinergia da equipe.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div data-set-mechanic="none" class="p-space-md rounded-xl border transition-all cursor-pointer ${
              !slot.mechanic ? 'bg-primary-container/15 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20'
            }">
              <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                <span>⚪</span> Forma Base Padrão
              </div>
              <p class="text-xs text-on-surface-variant">Usa ${slot.pokemon.name} em sua forma base mantendo o slot de item livre (Leftovers, Life Orb, Choice, etc.).</p>
            </div>

            ${game.mechanics.includes('mega') ? `
              <div ${canMega ? 'data-set-mechanic="mega"' : ''} class="p-space-md rounded-xl border transition-all ${
                slot.mechanic === 'mega'
                  ? 'bg-primary-container/15 border-2 border-primary cursor-pointer'
                  : (canMega ? 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20 cursor-pointer' : 'bg-surface-container-lowest/50 border-outline-variant/10 opacity-50 cursor-not-allowed')
              }">
                <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                  <span>🧬</span> Mega Evolução ${canMega ? `(${slot.pokemon.mega.name})` : '(Indisponível)'}
                </div>
                <p class="text-xs text-on-surface-variant">${canMega ? slot.pokemon.mega.note : `${slot.pokemon.name} não possui Mega Evolução oficial.`}</p>
                ${canMega && slot.pokemon.megaAlt ? `
                  <div class="flex gap-2 mt-3">
                    <button data-mega-variant="default" class="flex-1 py-1.5 px-2 rounded font-mono text-xs font-bold cursor-pointer ${
                      slot.megaVariant !== 'x' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface'
                    }">${slot.pokemon.mega.name}</button>
                    <button data-mega-variant="x" class="flex-1 py-1.5 px-2 rounded font-mono text-xs font-bold cursor-pointer ${
                      slot.megaVariant === 'x' ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-highest text-on-surface'
                    }">${slot.pokemon.megaAlt.name}</button>
                  </div>
                ` : ''}
              </div>
            ` : ''}

            ${canPrimal ? `
              <div data-set-mechanic="primal" class="p-space-md rounded-xl border transition-all cursor-pointer ${
                slot.mechanic === 'primal' ? 'bg-primary-container/15 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20'
              }">
                <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                  <span>🌋</span> Primal Reversion (${slot.pokemon.primal.name})
                </div>
                <p class="text-xs text-on-surface-variant">${slot.pokemon.primal.note}</p>
              </div>
            ` : ''}

            ${canZMove ? `
              <div data-set-mechanic="zmove" class="p-space-md rounded-xl border transition-all cursor-pointer ${
                slot.mechanic === 'zmove' ? 'bg-primary-container/15 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20'
              }">
                <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                  <span>💎</span> Portador de Z-Crystal (Z-Move)
                </div>
                <p class="text-xs text-on-surface-variant">Equipa automaticamente o Cristal Z ideal para disparar uma explosão STAB única na batalha.</p>
              </div>
            ` : ''}

            ${canDynamax ? `
              <div data-set-mechanic="dynamax" class="p-space-md rounded-xl border transition-all cursor-pointer ${
                slot.mechanic === 'dynamax' ? 'bg-primary-container/15 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20'
              }">
                <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                  <span>🌩️</span> Dynamax ${slot.pokemon.hasGmax ? '/ Gigantamax Ace' : 'Ace'}
                </div>
                <p class="text-xs text-on-surface-variant">Dobra o HP por 3 turnos e converte todos os golpes em Max Moves com efeitos secundários de campo.</p>
              </div>
            ` : ''}

            ${canTera ? `
              <div data-set-mechanic="tera" class="p-space-md rounded-xl border transition-all cursor-pointer ${
                slot.mechanic === 'tera' ? 'bg-primary-container/15 border-2 border-primary' : 'bg-surface-container-low hover:bg-surface-container-high border-outline-variant/20'
              }">
                <div class="flex items-center gap-2 font-headline font-bold text-sm text-on-surface mb-1">
                  <span>👑</span> Fenômeno Terastal (Tera Type)
                </div>
                <p class="text-xs text-on-surface-variant mb-2">Tera Recomendado: <strong>${TYPES[slot.pokemon.bestTera]?.name || 'Fada'}</strong></p>
                <div class="tera-selector-row space-y-2" onclick="event.stopPropagation()">
                  <select id="select-tera-type" class="w-full bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-2.5 py-1.5 text-xs text-on-surface">
                    ${activeTypes.map(t => `<option value="${t}" ${slot.teraType === t ? 'selected' : ''}>${TYPES[t].icon} Tera ${TYPES[t].name} ${t === slot.pokemon.bestTera ? '★ (Recomendado)' : ''}</option>`).join('')}
                  </select>
                  <label class="flex items-center gap-1.5 text-[11px] text-on-surface-variant cursor-pointer">
                    <input type="checkbox" id="toggle-tera-defense" ${slot.applyTeraDefense ? 'checked' : ''} class="accent-primary" />
                    <span>Simular defesa do Tera Type na Matriz</span>
                  </label>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }
    // ABA 4: ATRIBUTOS BASE & MATRIZ DEFENSIVA INDIVIDUAL (STITCH 7-COL / 5-COL LAYOUT)
    else if (state.activeEditorTab === 'stats') {
      const natureObj = ENGINE.getNatureInfo ? ENGINE.getNatureInfo(slot.nature) : { id: slot.nature, up: null, down: null };
      const naturesList = ENGINE.NATURES || [];
      const idealNature = slot.pokemon.bestNature || 'Adamant (+Atk, -SpA)';
      const abilityDesc = ENGINE.getAbilityDescription ? ENGINE.getAbilityDescription(eff.ability) : '';

      if (!slot.ivs) slot.ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
      if (!slot.evs) slot.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
      const evIvOn = Boolean(slot.evIvEnabled);

      const statNames = [
        { k: 'hp', label: 'HP', val: eff.stats.hp, color: '#30c88f' },
        { k: 'atk', label: 'Attack', val: eff.stats.atk, color: '#38bdf8' },
        { k: 'def', label: 'Defense', val: eff.stats.def, color: '#8ed5ff' },
        { k: 'spa', label: 'Sp. Atk', val: eff.stats.spa, color: '#ffb95f' },
        { k: 'spd', label: 'Sp. Def', val: eff.stats.spd, color: '#a855f7' },
        { k: 'spe', label: 'Speed', val: eff.stats.spe, color: '#56e5a9' }
      ];

      const allMaxed = evIvOn && statNames.every(s => (slot.ivs[s.k] === 31) && (slot.evs[s.k] === 252));

      let adjustedTotal = 0;
      const computedStats = statNames.map(s => {
        const rowInfo = computeSingleStatDisplay(s.k, s.val, natureObj, slot, slot.pokemon.id);
        adjustedTotal += rowInfo.calcVal;
        return { ...s, ...rowInfo };
      });

      tabBodyHtml = `
        <div class="p-space-lg grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          <!-- Left 7 Cols: Base Stats Bars & Ability/Nature -->
          <div class="lg:col-span-7 space-y-space-sm">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div class="flex flex-wrap items-center gap-2">
                <h4 class="font-headline font-bold text-sm text-on-surface uppercase tracking-wider">Atributos (${eff.name})</h4>
                <button type="button" data-toggle-ev-iv="true" class="px-2.5 py-1 rounded-lg font-headline font-bold text-[11px] flex items-center gap-1.5 border transition-all cursor-pointer ${
                  evIvOn
                    ? 'bg-primary-container text-on-primary-container border-primary shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant border-outline-variant/30'
                }" title="Ativar ou desativar edição de EVs e IVs">
                  <span class="material-symbols-outlined text-[14px]">${evIvOn ? 'toggle_on' : 'toggle_off'}</span>
                  EVs &amp; IVs: ${evIvOn ? 'Ativado' : 'Desativado'}
                </button>
                ${evIvOn ? `
                  <button type="button" data-max-all-ev-iv="true" class="px-2.5 py-1 rounded-lg font-headline font-bold text-[11px] flex items-center gap-1 border transition-all cursor-pointer ${
                    allMaxed
                      ? 'bg-surface-container-highest text-on-surface border-outline-variant/40 hover:bg-error-container/25 hover:text-error'
                      : 'bg-secondary-container/25 hover:bg-secondary-container/40 text-secondary border-secondary/40'
                  }" title="Ver como o Pokémon fica com todos os EVs (252) e IVs (31) no máximo">
                    <span class="material-symbols-outlined text-[14px]">${allMaxed ? 'restart_alt' : 'bolt'}</span>
                    ${allMaxed ? 'Zerar EVs & IVs' : 'Todos EVs & IVs no Máximo'}
                  </button>
                ` : ''}
              </div>
              <span id="stats-total-summary" class="font-mono text-xs text-primary font-bold">
                ${evIvOn
                  ? `BST Base: ${eff.bst} • Total Status Editados: ${adjustedTotal}`
                  : `Total Base (BST): ${eff.bst} ${adjustedTotal !== eff.bst ? `• Com Natureza: ${adjustedTotal}` : ''}`
                }
              </span>
            </div>
            <div class="space-y-3 bg-surface-container-low p-space-md rounded-xl border border-outline-variant/15">
              ${computedStats.map(s => {
                return `
                  <div class="space-y-1.5 ${evIvOn ? 'pb-2.5 border-b border-outline-variant/15 last:border-b-0 last:pb-0' : ''}">
                    <div class="grid grid-cols-12 items-center gap-2 text-xs">
                      <span class="col-span-2 font-mono font-semibold text-on-surface-variant">${s.label}</span>
                      <span id="stat-val-${s.k}" class="col-span-4 font-mono font-bold ${s.valClass} text-right">${s.calcVal}${s.modTag}</span>
                      <div class="col-span-6 h-2.5 bg-surface-container-lowest rounded-full overflow-hidden">
                        <div id="stat-bar-${s.k}" class="h-full rounded-full transition-all" style="width:${s.pct}%; background:${s.color}"></div>
                      </div>
                    </div>
                    ${evIvOn ? `
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 pt-1 text-[11px] font-mono">
                        <div class="flex items-center gap-2 bg-surface-container-lowest/80 px-2.5 py-1.5 rounded-lg border border-outline-variant/15">
                          <span class="text-primary font-bold w-7 shrink-0">IV</span>
                          <input type="range" min="0" max="31" step="1" value="${s.iv}" data-stat-iv="${s.k}" class="ev-iv-slider flex-1" />
                          <span id="iv-val-${s.k}" class="text-on-surface font-bold w-11 text-right shrink-0">${s.iv}/31</span>
                        </div>
                        <div class="flex items-center gap-2 bg-surface-container-lowest/80 px-2.5 py-1.5 rounded-lg border border-outline-variant/15">
                          <span class="text-secondary font-bold w-7 shrink-0">EV</span>
                          <input type="range" min="0" max="252" step="4" value="${s.ev}" data-stat-ev="${s.k}" class="ev-iv-slider ev-slider flex-1" />
                          <span id="ev-val-${s.k}" class="text-on-surface font-bold w-14 text-right shrink-0">${s.ev}/252</span>
                        </div>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>

            <!-- Habilidade + Descrição da Habilidade -->
            ${game.hasAbilities ? `
              <div class="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/15 space-y-2 text-xs">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <label for="editor-ability-select" class="flex items-center gap-2 text-on-surface-variant font-semibold">
                    <span>✨ Habilidade Ativa:</span>
                    <select id="editor-ability-select" class="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-2.5 py-1.5 text-on-surface font-bold cursor-pointer">
                      ${(slot.pokemon.abilities || ['Overgrow']).map(ab => `<option value="${ab}" ${slot.ability === ab ? 'selected' : ''}>${ab}</option>`).join('')}
                    </select>
                  </label>
                  ${slot.mechanic === 'mega' || slot.mechanic === 'primal' ? `<span class="font-mono text-[11px] text-primary">Habilidade da Forma: <strong>${eff.ability}</strong></span>` : ''}
                </div>
                <p class="text-xs text-on-surface-variant leading-relaxed bg-surface-container-lowest/70 p-2.5 rounded-lg border border-outline-variant/15">
                  <strong class="text-primary">${eff.ability}:</strong> ${abilityDesc}
                </p>
              </div>
            ` : ''}

            <!-- Natureza Ideal + Seletor de Naturezas para ver as contas -->
            <div class="bg-surface-container-low p-space-md rounded-xl border border-outline-variant/15 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span class="text-on-surface-variant">Natureza Ideal:</span>
                <strong class="text-secondary ml-1">${idealNature}</strong>
              </div>
              <label for="editor-nature-select" class="flex flex-wrap items-center gap-2 text-on-surface-variant">
                <span>Simular Natureza:</span>
                <select id="editor-nature-select" class="bg-surface-container-lowest border border-outline-variant/40 rounded-lg px-2.5 py-1.5 text-on-surface font-semibold cursor-pointer">
                  ${naturesList.map(n => `<option value="${n.id}" ${natureObj.name === n.name ? 'selected' : ''}>${n.label}</option>`).join('')}
                </select>
              </label>
            </div>
          </div>

          <!-- Right 5 Cols: Individual Defensive Profile -->
          <div class="lg:col-span-5 bg-surface-container-low p-space-md rounded-xl flex flex-col justify-between border border-outline-variant/15 space-y-4">
            <div>
              <h4 class="font-headline font-bold text-sm text-on-surface uppercase tracking-wider mb-3">Matriz Defensiva Individual (${eff.name})</h4>
              <div class="mb-3">
                <span class="text-xs font-semibold text-error block mb-1.5">⚠️ Fraquezas Recebidas (2x / 4x):</span>
                <div class="flex flex-wrap gap-1.5">
                  ${myWeak.map(x => `
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-error-container/30 border border-error/40 text-xs">
                      ${renderTypeBadge(x.t, 'xs')} <strong class="font-mono text-error">${x.m}x</strong>
                    </span>
                  `).join('') || '<em class="text-xs text-on-surface-variant">Nenhuma fraqueza!</em>'}
                </div>
              </div>

              <div>
                <span class="text-xs font-semibold text-tertiary block mb-1.5">🛡️ Resistências &amp; Imunidades (½x / ¼x / 0x):</span>
                <div class="flex flex-wrap gap-1.5">
                  ${myRes.map(x => `
                    <span class="inline-flex items-center gap-1 px-2 py-1 rounded bg-tertiary-container/15 border border-tertiary/30 text-xs">
                      ${renderTypeBadge(x.t, 'xs')} <strong class="font-mono text-tertiary">${x.m === 0 ? 'IMUNE (0x)' : `${x.m}x`}</strong>
                    </span>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <!-- Editor Top Header -->
      <div class="bg-surface-container-high p-space-lg border-b border-outline-variant/20 flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div class="flex items-center gap-space-md">
          <div class="w-16 h-16 rounded-2xl bg-surface-container-lowest p-1.5 flex items-center justify-center border border-primary/30 relative shrink-0">
            <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="w-14 h-14 object-contain" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eff.dex}.png'" />
          </div>
          <div>
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-primary-container text-on-primary-container font-mono text-xs font-bold">SLOT #${state.activeSlotIndex + 1} EM FOCO</span>
              <span class="font-mono text-xs text-on-surface-variant font-bold">${formatDexNum(eff.dex)}</span>
              <span class="px-2.5 py-0.5 rounded-full bg-secondary-container/20 text-secondary border border-secondary/30 font-mono text-xs">${eff.role}</span>
              <button data-open-picker-slot="${state.activeSlotIndex}" class="px-2.5 py-1 rounded-lg bg-surface-container-lowest hover:bg-primary-container/20 text-primary border border-primary/30 font-mono text-xs font-bold flex items-center gap-1 cursor-pointer">
                <span class="material-symbols-outlined text-[14px]">swap_horiz</span>
                Trocar Pokémon
              </button>
            </div>
            <div class="flex flex-wrap items-center gap-2 mt-1">
              <h2 class="font-headline text-headline-md text-on-surface">${eff.name}</h2>
              ${renderVersionExclusiveBadge(slot.pokemon)}
              ${eff.types.map(t => renderTypeBadge(t, 'sm')).join('')}
            </div>
            <p class="text-xs text-on-surface-variant mt-0.5">
              ${slot.pokemon.name}: <strong class="text-on-surface">${ENGINE.getPokemonCategory ? ENGINE.getPokemonCategory(slot.pokemon) : 'Pokémon'}</strong>
            </p>
          </div>
        </div>

        <!-- 4 Editor Tabs + Botão Fechar fora da seleção -->
        <div class="flex items-center gap-2">
          <div class="flex flex-wrap gap-1.5 bg-surface-container-lowest p-1.5 rounded-xl border border-outline-variant/25">
            <button data-editor-tab="moves" class="px-3 py-2 rounded-lg font-headline font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              state.activeEditorTab === 'moves' ? 'bg-primary-container text-on-primary-container shadow' : 'text-on-surface-variant hover:text-on-surface'
            }">
              <span class="material-symbols-outlined text-[16px]">swords</span>
              4 Ataques
            </button>
            ${game.hasItems ? `
              <button data-editor-tab="item" class="px-3 py-2 rounded-lg font-headline font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                state.activeEditorTab === 'item' ? 'bg-primary-container text-on-primary-container shadow' : 'text-on-surface-variant hover:text-on-surface'
              }">
                <span class="material-symbols-outlined text-[16px]">backpack</span>
                Item Recomendado
              </button>
            ` : ''}
            ${game.mechanics.length > 0 ? `
              <button data-editor-tab="mechanics" class="px-3 py-2 rounded-lg font-headline font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                state.activeEditorTab === 'mechanics' ? 'bg-primary-container text-on-primary-container shadow' : 'text-on-surface-variant hover:text-on-surface'
              }">
                <span class="material-symbols-outlined text-[16px]">auto_awesome</span>
                Mecânicas
              </button>
            ` : ''}
            <button data-editor-tab="stats" class="px-3 py-2 rounded-lg font-headline font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              state.activeEditorTab === 'stats' ? 'bg-primary-container text-on-primary-container shadow' : 'text-on-surface-variant hover:text-on-surface'
            }">
              <span class="material-symbols-outlined text-[16px]">monitoring</span>
              Atributos &amp; Defesas
            </button>
          </div>
          <button data-close-editor="true" class="px-2.5 py-2 rounded-lg bg-error-container/20 hover:bg-error-container/40 text-error font-headline font-bold text-xs flex items-center justify-center transition-all cursor-pointer shrink-0" title="Fechar Painel">
            <span class="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      </div>

      ${tabBodyHtml}
    `;
  }

  // ==========================================================================
  // 4. MATRIZ DE DEFESA ELEMENTAL & COBERTURA OFENSIVA (STITCH SVG GAUGE + 18-TYPE GRID)
  // ==========================================================================
  function renderSynergyDashboard(analysis) {
    const scoreEl = document.getElementById('synergy-score-badge');
    const alertsEl = document.getElementById('synergy-alerts-box');
    const matrixEl = document.getElementById('elemental-matrix-grid');

    if (scoreEl) {
      const score = analysis.synergyScore;
      const circumference = 264;
      const dashOffset = Math.round(circumference - (circumference * score) / 100);
      let strokeColor = '#30c88f';
      let rankLabel = 'Rank S • Equipe Campeã';
      if (score < 50) {
        strokeColor = '#ffb4ab';
        rankLabel = 'Rank C • Em Construção';
      } else if (score < 78) {
        strokeColor = '#ffb95f';
        rankLabel = 'Rank A • Boa Cobertura';
      }

      scoreEl.innerHTML = `
        <div class="relative w-24 h-24 flex items-center justify-center shrink-0">
          <svg class="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#242a3a" stroke-width="10"></circle>
            <circle cx="50" cy="50" r="42" fill="none" stroke="${strokeColor}" stroke-width="10" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" stroke-linecap="round"></circle>
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span class="font-headline font-extrabold text-2xl text-on-surface leading-none">${score}%</span>
            <span class="font-mono text-[10px] text-tertiary uppercase mt-0.5">Sinergia</span>
          </div>
        </div>
        <div>
          <span class="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-mono text-[11px] font-bold uppercase">${rankLabel}</span>
          <h3 class="font-headline font-bold text-base text-on-surface mt-1">Sinergia Geral da Equipe</h3>
          <p class="text-xs text-on-surface-variant mt-0.5">
            Cálculo de defesas compartilhadas, imunidades de habilidades e cobertura ofensiva dos movesets.
          </p>
        </div>
      `;
    }

    if (alertsEl) {
      if (analysis.filledCount === 0) {
        alertsEl.innerHTML = `
          <div class="md:col-span-2 bg-surface-container-low p-space-md rounded-xl border border-outline-variant/20 flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-2xl">info</span>
            <p class="text-xs text-on-surface-variant">
              Clique em qualquer um dos <strong>6 Slots</strong> acima para abrir a Pokédex do jogo e ver a análise completa de fraquezas e cobertura elemental!
            </p>
          </div>
        `;
      } else {
        const critHtml = analysis.criticalWeaknesses.length > 0
          ? `
            <div class="bg-error-container/20 border-l-4 border-error p-space-md rounded-r-xl flex flex-col justify-between">
              <div class="flex items-center gap-2 text-error font-headline font-bold text-xs uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-[18px]">warning</span>
                ⚠️ Fraquezas Críticas Descobertas
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                Cuidado com golpes de: ${analysis.criticalWeaknesses.slice(0, 4).map(c => `${renderTypeBadge(c.type, 'xs')} <span class="font-mono text-[11px] text-error">(${c.totalWeak} fracos / ${c.totalSafe} res)</span>`).join(' ')}
              </p>
            </div>
          `
          : `
            <div class="bg-tertiary-container/15 border-l-4 border-tertiary p-space-md rounded-r-xl flex flex-col justify-between">
              <div class="flex items-center gap-2 text-tertiary font-headline font-bold text-xs uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-[18px]">verified_user</span>
                🛡️ Defesa Elemental Sólida!
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                Todas as fraquezas elementais da sua equipe possuem cobertura defensiva ou imunidades.
              </p>
            </div>
          `;

        const coveredCount = analysis.activeTypes.length - analysis.offensiveGaps.length;
        const gapHtml = analysis.offensiveGaps.length > 0
          ? `
            <div class="bg-secondary-container/15 border-l-4 border-secondary p-space-md rounded-r-xl flex flex-col justify-between">
              <div class="flex items-center gap-2 text-secondary font-headline font-bold text-xs uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-[18px]">swords</span>
                ⚔️ Cobertura Ofensiva (${coveredCount}/${analysis.activeTypes.length} Tipos)
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                Sem golpe 2x contra: ${analysis.offensiveGaps.slice(0, 5).map(t => renderTypeBadge(t, 'xs')).join(' ')}
              </p>
            </div>
          `
          : `
            <div class="bg-tertiary-container/15 border-l-4 border-tertiary p-space-md rounded-r-xl flex flex-col justify-between">
              <div class="flex items-center gap-2 text-tertiary font-headline font-bold text-xs uppercase tracking-wider mb-1">
                <span class="material-symbols-outlined text-[18px]">bolt</span>
                ⚡ Cobertura Ofensiva Total (${analysis.activeTypes.length}/${analysis.activeTypes.length} Tipos)
              </div>
              <p class="text-xs text-on-surface leading-relaxed">
                Seus 4 ataques escolhidos atingem todos os tipos existentes no jogo com dano Super Efetivo (2x)!
              </p>
            </div>
          `;

        alertsEl.innerHTML = critHtml + gapHtml;
      }
    }

    if (matrixEl) {
      matrixEl.innerHTML = analysis.activeTypes.map(t => {
        const def = analysis.defenseMatrix[t];
        const off = analysis.offensiveCoverage[t];
        const typeMeta = TYPES[t];

        const isCritical = (def.totalWeak >= 2 && def.totalSafe === 0) || def.netScore <= -2;
        const borderClass = isCritical
          ? 'bg-error-container/15 border-2 border-error/60 shadow-lg shadow-error/5'
          : 'bg-surface-container-low border border-outline-variant/20';

        return `
          <div class="${borderClass} rounded-lg p-2.5 flex flex-col justify-between" title="Fracos: ${def.weakMembers.map(m => `${m.name}(${m.mult})`).join(', ') || 'Nenhum'} | Resistentes/Imunes: ${def.safeMembers.map(m => `${m.name}(${m.mult})`).join(', ') || 'Nenhum'}">
            <div class="flex items-center justify-between mb-1.5">
              ${renderTypeBadge(t, 'xs')}
              <span class="font-mono text-[10px] ${off.superEffectiveCount > 0 ? 'text-primary font-bold' : 'text-error'}" title="Quantos Pokémon seus têm ataques 2x contra ${typeMeta.name}">
                ⚔️ ${off.superEffectiveCount}x
              </span>
            </div>
            <div class="flex items-center justify-between text-[11px] font-mono pt-1 border-t border-outline-variant/15">
              <span class="${def.totalWeak > 0 ? 'text-error font-bold' : 'text-on-surface-variant'}" title="Pokémons Fracos">🔴 ${def.totalWeak}</span>
              <span class="${def.totalSafe > 0 ? 'text-tertiary font-bold' : 'text-on-surface-variant'}" title="Pokémons Resistentes ou Imunes">🟢 ${def.totalSafe} Res${def.immune > 0 ? `(${def.immune}★)` : ''}</span>
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
    const bottomSwitchEl = document.getElementById('bottom-dex-scope-switch');
    if (!listEl) return;

    const scopeInfo = ENGINE.getDexScopeInfo ? ENGINE.getDexScopeInfo(game) : { eraNationalGen: game.generation || 9 };
    if (bottomSwitchEl) {
      bottomSwitchEl.innerHTML = `
        <button type="button" data-bottom-dex-scope="pokedex" class="px-3 py-1.5 rounded-lg font-headline text-xs transition-all cursor-pointer ${
          !state.allowNationalDex
            ? 'bg-primary-container text-on-primary-container font-bold shadow'
            : 'text-on-surface-variant hover:text-on-surface font-semibold'
        }">
          📖 Pokédex (${game.region})
        </button>
        <button type="button" data-bottom-dex-scope="national" class="px-3 py-1.5 rounded-lg font-headline text-xs transition-all cursor-pointer ${
          state.allowNationalDex
            ? 'bg-primary-container text-on-primary-container font-bold shadow'
            : 'text-on-surface-variant hover:text-on-surface font-semibold'
        }">
          🌐 National Dex (Gen 1–${scopeInfo.eraNationalGen})
        </button>
      `;
    }

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
      allowNationalDex: state.allowNationalDex,
      selectedVersion: state.selectedVersion
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
        <div class="col-span-full bg-surface-container-low rounded-xl p-6 text-center border border-outline-variant/20 space-y-3">
          <p class="text-sm text-on-surface">Nenhum Pokémon encontrado nos filtros atuais para <strong>"${state.searchQuery}"</strong>.</p>
          <div class="flex justify-center gap-2">
            <button id="btn-fetch-pokeapi" class="px-3.5 py-2 rounded-lg bg-primary-container text-on-primary-container font-headline font-bold text-xs cursor-pointer">
              🌐 Buscar "${state.searchQuery}" na PokéAPI
            </button>
            <button id="btn-reset-filters" class="px-3.5 py-2 rounded-lg bg-surface-container-high text-on-surface font-headline font-semibold text-xs cursor-pointer">
              Limpar Filtros
            </button>
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
        <div class="bg-surface-container-low hover:bg-surface-container-high rounded-xl p-space-md border ${
          isTopSynergy ? 'border-primary/50 shadow-md' : 'border-outline-variant/20'
        } flex flex-col justify-between gap-3 transition-all">
          <div class="flex items-center justify-between gap-2">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="px-2 py-0.5 rounded bg-surface-container-highest font-mono text-xs font-bold text-primary">${formatDexNum(pokemon.dex)}</span>
              ${isTopSynergy ? `<span class="px-2 py-0.5 rounded bg-secondary-container/25 text-secondary font-mono text-[11px] font-bold">🏆 Top #${idx + 1}</span>` : `<span class="text-[11px] font-mono text-on-surface-variant">${pokemon.role}</span>`}
              ${isStarterInGame ? `<span class="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary font-mono text-[10px]">🌟 Inicial</span>` : ''}
              ${pokemon.mega && game.mechanics.includes('mega') ? `<span class="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">🧬 Mega</span>` : ''}
            </div>
            <span class="px-2.5 py-0.5 rounded-full bg-tertiary-container/20 text-tertiary border border-tertiary/30 font-mono text-xs font-bold shrink-0">
              ${synergyPercent}% Sinergia
            </span>
          </div>

          <div class="flex items-center gap-3">
            <div class="w-16 h-16 rounded-xl bg-surface-container-lowest p-1.5 flex items-center justify-center shrink-0 border border-outline-variant/15">
              <img src="${ENGINE.getSpriteUrl(eff.spriteId)}" alt="${eff.name}" class="w-14 h-14 object-contain" loading="lazy" onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.dex}.png'" />
            </div>
            <div class="min-w-0 flex-1">
              <h4 class="font-headline font-bold text-base text-on-surface truncate flex items-center gap-1.5">
                <span class="truncate">${pokemon.name} ${canBeTeamMega ? `<small class="text-xs text-primary font-normal">(${pokemon.mega.name})</small>` : ''}</span>
                ${renderVersionExclusiveBadge(pokemon)}
              </h4>
              <div class="flex flex-wrap items-center gap-1 my-1">
                ${eff.types.map(t => renderTypeBadge(t, 'xs')).join('')}
                <span class="font-mono text-[11px] text-on-surface-variant ml-1">${eff.bst} BST</span>
              </div>
              <p class="text-xs text-on-surface-variant leading-relaxed">${reasonText}</p>
            </div>
          </div>

          <div class="bg-surface-container-lowest px-3 py-2 rounded-lg text-[11px] text-on-surface-variant border border-outline-variant/15 truncate">
            <strong class="text-on-surface">Golpes Sugeridos:</strong> ${(pokemon.bestMoves || []).slice(0, 4).map(m => MOVES[m]?.name || m).join(', ')}
          </div>

          <button data-add-mon="${pokemon.id}" class="w-full py-2 px-3 rounded-lg bg-primary-container/20 hover:bg-primary-container text-primary hover:text-on-primary-container border border-primary/30 font-headline font-bold text-xs transition-all cursor-pointer">
            + Adicionar ao Slot #${targetSlot + 1} (Com Melhores Ataques &amp; Item)
          </button>
        </div>
      `;
    }).join('');

    const showMoreBtnHtml = (!state.showAllInBottomGrid && !state.searchQuery && recommendations.length > 60)
      ? `<div class="col-span-full text-center pt-2">
          <button id="btn-show-all-bottom-dex" class="px-5 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary border border-primary/30 font-headline font-bold text-xs cursor-pointer">
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
        allowNationalDex: state.allowNationalDex,
        selectedVersion: state.selectedVersion
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
    // Alternar Menu Lateral de Equipes Salvas (Stitch Drawer)
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const sidebarEl = document.getElementById('saved-teams-sidebar');
    if (btnToggleSidebar && sidebarEl) {
      btnToggleSidebar.addEventListener('click', () => {
        sidebarEl.classList.toggle('collapsed');
        document.body.classList.toggle('sidebar-closed');
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
        a.download = 'minhas-equipes-pokemon.json';
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
        state.allowNationalDex = false;
        state.pickerNatDex = false;

        const pickerTypeSelect = document.getElementById('picker-type-filter');
        if (pickerTypeSelect) pickerTypeSelect.innerHTML = '<option value="all">Todos os Tipos</option>';

        let removedCount = 0;
        const removedNames = [];

        state.team.forEach((slot, idx) => {
          if (!slot || !slot.pokemon) return;

          // Se o Pokémon não existe/não está disponível na geração/jogo selecionado, retira da seleção
          const isAvailable = ENGINE.isPokemonAvailableInGame(slot.pokemon, g, false, state.selectedVersion);
          if (!isAvailable) {
            removedNames.push(slot.pokemon.name);
            state.team[idx] = null;
            removedCount++;
            return;
          }

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

        if (removedCount > 0) {
          showToast(`⚠️ ${removedCount} Pokémon incompatível(is) com ${g.name} foi(ram) retirado(s) da equipe: ${removedNames.join(', ')}.`);
        }
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
      // Switch entre Pokédex Regional e National Dex da época no Modal
      const pickerScopeBtn = e.target.closest('[data-picker-dex-scope]');
      if (pickerScopeBtn) {
        state.pickerNatDex = pickerScopeBtn.dataset.pickerDexScope === 'national';
        renderPokedexPickerModalContent();
        return;
      }

      // Switch entre Pokédex Regional e National Dex da época na Grade Inferior
      const bottomScopeBtn = e.target.closest('[data-bottom-dex-scope]');
      if (bottomScopeBtn) {
        state.allowNationalDex = bottomScopeBtn.dataset.bottomDexScope === 'national';
        renderAll();
        return;
      }
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

      // Botão rápido de sugestão inline dentro de um slot vazio
      const quickFillBtn = e.target.closest('[data-quick-fill-slot]');
      if (quickFillBtn) {
        e.stopPropagation();
        const slotIdx = Number(quickFillBtn.dataset.quickFillSlot);
        const monId = quickFillBtn.dataset.quickMon;
        addPokemonToTeam(monId, null, null, slotIdx);
        showToast(`✨ Pokémon adicionado ao Slot #${slotIdx + 1}!`);
        return;
      }

      // Abrir Modal Seletor da Pokédex do Jogo ao clicar em "Escolher / Trocar Pokémon" ou num slot vazio
      const openPickerTrigger = e.target.closest('[data-open-picker-slot]');
      if (openPickerTrigger && !e.target.closest('[data-remove-slot]') && !e.target.closest('[data-edit-tab]') && !e.target.closest('[data-quick-fill-slot]')) {
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

      // Fechar Painel de Status / Edição do Pokémon
      if (e.target.closest('[data-close-editor]')) {
        state.editorOpen = false;
        renderAll();
        return;
      }

      // Atalho de aba de edição dentro do card do slot (ex: 📊 Stats, ⚔️ 4 Ataques, 🎒 Item, 🧬 Mecânica)
      // Se já estiver aberto no mesmo slot e mesma aba, clicar novamente fecha/esconde o painel!
      const editTabTrigger = e.target.closest('[data-edit-tab]');
      if (editTabTrigger) {
        e.stopPropagation();
        const clickedSlot = Number(editTabTrigger.dataset.slotIndex);
        const clickedTab = editTabTrigger.dataset.editTab;
        const hasSpecificMoveIdx = editTabTrigger.dataset.moveIdx !== undefined;

        if (state.editorOpen && state.activeSlotIndex === clickedSlot && state.activeEditorTab === clickedTab && !hasSpecificMoveIdx) {
          state.editorOpen = false;
          renderAll();
          return;
        }

        state.activeSlotIndex = clickedSlot;
        state.activeEditorTab = clickedTab;
        state.editorOpen = true;
        if (hasSpecificMoveIdx) {
          state.activeMoveSlotIndex = Number(editTabTrigger.dataset.moveIdx);
        }
        renderAll();
        const editorEl = document.getElementById('slot-detail-editor');
        if (editorEl) editorEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        return;
      }

      // Clicar em um Pokémon já escolhido abre o status dele; clicar de novo esconde as informações!
      const slotCard = e.target.closest('[data-slot-index]');
      if (slotCard) {
        const clickedIdx = Number(slotCard.dataset.slotIndex);
        if (state.editorOpen && state.activeSlotIndex === clickedIdx) {
          state.editorOpen = false;
        } else {
          state.activeSlotIndex = clickedIdx;
          state.activeEditorTab = 'stats';
          state.editorOpen = true;
        }
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

      // Trocar de aba no Editor Detalhado (clicar na mesma aba já aberta também fecha o painel)
      const editorTabBtn = e.target.closest('[data-editor-tab]');
      if (editorTabBtn) {
        const clickedTab = editorTabBtn.dataset.editorTab;
        if (state.editorOpen && state.activeEditorTab === clickedTab) {
          state.editorOpen = false;
        } else {
          state.activeEditorTab = clickedTab;
          state.editorOpen = true;
        }
        renderAll();
        return;
      }

      // Remover / Tirar ataque escolhido de um dos 4 slots de golpe
      const remMoveBtn = e.target.closest('[data-remove-move-slot]');
      if (remMoveBtn) {
        e.stopPropagation();
        const mIdx = Number(remMoveBtn.dataset.removeMoveSlot);
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon && Array.isArray(slot.moves)) {
          slot.moves[mIdx] = null;
          state.activeMoveSlotIndex = mIdx;
          renderAll();
          showToast('🗑️ Ataque removido do slot!');
        }
        return;
      }

      // Selecionar qual dos 4 slots de ataque está sendo editado
      const moveSlotEl = e.target.closest('[data-select-move-slot]');
      if (moveSlotEl) {
        state.activeMoveSlotIndex = Number(moveSlotEl.dataset.selectMoveSlot);
        renderAll();
        return;
      }

      // Ativar ou Desativar edição de EVs e IVs nos Atributos
      if (e.target.closest('[data-toggle-ev-iv]')) {
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon) {
          slot.evIvEnabled = !slot.evIvEnabled;
          if (!slot.ivs) slot.ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
          if (!slot.evs) slot.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
          renderAll();
        }
        return;
      }

      // Botão para colocar Todos EVs (252) e IVs (31) no Máximo (ou zerar caso já estejam no máximo)
      if (e.target.closest('[data-max-all-ev-iv]')) {
        const slot = state.team[state.activeSlotIndex];
        if (slot && slot.pokemon) {
          slot.evIvEnabled = true;
          const keys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];
          if (!slot.ivs) slot.ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
          if (!slot.evs) slot.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
          const alreadyMax = keys.every(k => slot.ivs[k] === 31 && slot.evs[k] === 252);
          keys.forEach(k => {
            slot.ivs[k] = alreadyMax ? 0 : 31;
            slot.evs[k] = alreadyMax ? 0 : 252;
          });
          renderAll();
          showToast(alreadyMax
            ? `↺ EVs e IVs de ${slot.pokemon.name} foram zerados!`
            : `⚡ Todos os EVs (252) e IVs (31) de ${slot.pokemon.name} no máximo!`
          );
        }
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
          showToast(`⚔️ 4 melhores ataques equipados em ${slot.pokemon.name}!`);
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
      } else if (e.target.id === 'editor-nature-select') {
        const slot = state.team[state.activeSlotIndex];
        if (slot) {
          slot.nature = e.target.value;
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
      } else if (e.target.dataset && (e.target.dataset.statIv || e.target.dataset.statEv)) {
        saveToStorage();
      }
    });

    // Atualização em tempo real ao arrastar as barras escalonáveis de IVs (0–31) e EVs (0–252)
    document.body.addEventListener('input', e => {
      const ivKey = e.target.dataset ? e.target.dataset.statIv : null;
      const evKey = e.target.dataset ? e.target.dataset.statEv : null;
      if (!ivKey && !evKey) return;

      const slot = state.team[state.activeSlotIndex];
      if (!slot || !slot.pokemon) return;
      if (!slot.ivs) slot.ivs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
      if (!slot.evs) slot.evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };

      const statKey = ivKey || evKey;
      const numVal = Math.max(0, Number(e.target.value) || 0);
      if (ivKey) {
        slot.ivs[statKey] = Math.min(31, numVal);
        const ivLabel = document.getElementById(`iv-val-${statKey}`);
        if (ivLabel) ivLabel.textContent = `${slot.ivs[statKey]}/31`;
      } else {
        slot.evs[statKey] = Math.min(252, numVal);
        const evLabel = document.getElementById(`ev-val-${statKey}`);
        if (evLabel) evLabel.textContent = `${slot.evs[statKey]}/252`;
      }

      const game = getCurrentGame();
      const eff = ENGINE.getEffectivePokemonState(slot, game);
      const natureObj = ENGINE.getNatureInfo ? ENGINE.getNatureInfo(slot.nature) : { id: slot.nature, up: null, down: null };
      const keys = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'];

      let totalEdited = 0;
      keys.forEach(k => {
        const info = computeSingleStatDisplay(k, eff.stats[k], natureObj, slot, slot.pokemon.id);
        totalEdited += info.calcVal;
        if (k === statKey) {
          const valEl = document.getElementById(`stat-val-${k}`);
          if (valEl) {
            valEl.className = `col-span-4 font-mono font-bold ${info.valClass} text-right`;
            valEl.innerHTML = `${info.calcVal}${info.modTag}`;
          }
          const barEl = document.getElementById(`stat-bar-${k}`);
          if (barEl) {
            barEl.style.width = `${info.pct}%`;
          }
        }
      });

      const summaryEl = document.getElementById('stats-total-summary');
      if (summaryEl) {
        summaryEl.textContent = `BST Base: ${eff.bst} • Total Status Editados: ${totalEdited}`;
      }

      const maxBtn = document.querySelector('[data-max-all-ev-iv]');
      if (maxBtn) {
        const allMaxed = keys.every(k => slot.ivs[k] === 31 && slot.evs[k] === 252);
        maxBtn.className = `px-2.5 py-1 rounded-lg font-headline font-bold text-[11px] flex items-center gap-1 border transition-all cursor-pointer ${
          allMaxed
            ? 'bg-surface-container-highest text-on-surface border-outline-variant/40 hover:bg-error-container/25 hover:text-error'
            : 'bg-secondary-container/25 hover:bg-secondary-container/40 text-secondary border-secondary/40'
        }`;
        maxBtn.innerHTML = `
          <span class="material-symbols-outlined text-[14px]">${allMaxed ? 'restart_alt' : 'bolt'}</span>
          ${allMaxed ? 'Zerar EVs & IVs' : 'Todos EVs & IVs no Máximo'}
        `;
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
    const championConfirmModal = document.getElementById('champion-confirm-modal');
    const championConfirmGameName = document.getElementById('champion-confirm-game-name');
    const btnConfirmChampion = document.getElementById('btn-confirm-champion-preset');
    const btnCancelChampion = document.getElementById('btn-cancel-champion-preset');
    const btnCancelChampionX = document.getElementById('btn-cancel-champion-x');

    if (btnLoadPreset) {
      btnLoadPreset.addEventListener('click', () => {
        const hasAnyPokemon = state.team.some(s => s && s.pokemon);
        if (hasAnyPokemon) {
          const g = getCurrentGame();
          if (championConfirmGameName) championConfirmGameName.textContent = g.name;
          if (championConfirmModal) {
            championConfirmModal.classList.add('open');
          } else if (window.confirm(`Deseja substituir os Pokémon selecionados pelos melhores Pokémon de ${g.name}?`)) {
            loadChampionPresetForCurrentGame();
          }
        } else {
          loadChampionPresetForCurrentGame();
        }
      });
    }

    if (btnConfirmChampion && championConfirmModal) {
      btnConfirmChampion.addEventListener('click', () => {
        championConfirmModal.classList.remove('open');
        loadChampionPresetForCurrentGame();
      });
    }
    if (btnCancelChampion && championConfirmModal) {
      btnCancelChampion.addEventListener('click', () => championConfirmModal.classList.remove('open'));
    }
    if (btnCancelChampionX && championConfirmModal) {
      btnCancelChampionX.addEventListener('click', () => championConfirmModal.classList.remove('open'));
    }
    if (championConfirmModal) {
      championConfirmModal.addEventListener('click', e => {
        if (e.target === championConfirmModal) championConfirmModal.classList.remove('open');
      });
    }

    const btnClearTeam = document.getElementById('btn-clear-team');
    const clearConfirmModal = document.getElementById('clear-confirm-modal');
    const btnConfirmClear = document.getElementById('btn-confirm-clear-team');
    const btnCancelClear = document.getElementById('btn-cancel-clear-team');
    const btnCancelClearX = document.getElementById('btn-cancel-clear-x');

    if (btnClearTeam) {
      btnClearTeam.addEventListener('click', () => {
        if (clearConfirmModal) {
          clearConfirmModal.classList.add('open');
        } else if (window.confirm('Deseja apagar tudo?')) {
          state.team = [null, null, null, null, null, null];
          state.activeSavedTeamId = null;
          state.activeSlotIndex = 0;
          state.editorOpenSlotIndex = null;
          renderAll();
          showToast('🗑️ Equipe limpa! Clique em qualquer slot para montar sua equipe.');
        }
      });
    }

    if (btnConfirmClear && clearConfirmModal) {
      btnConfirmClear.addEventListener('click', () => {
        state.team = [null, null, null, null, null, null];
        state.activeSavedTeamId = null;
        state.activeSlotIndex = 0;
        state.editorOpenSlotIndex = null;
        clearConfirmModal.classList.remove('open');
        renderAll();
        showToast('🗑️ Equipe limpa! Clique em qualquer slot para montar sua equipe.');
      });
    }

    if (btnCancelClear && clearConfirmModal) {
      btnCancelClear.addEventListener('click', () => clearConfirmModal.classList.remove('open'));
    }
    if (btnCancelClearX && clearConfirmModal) {
      btnCancelClearX.addEventListener('click', () => clearConfirmModal.classList.remove('open'));
    }
    if (clearConfirmModal) {
      clearConfirmModal.addEventListener('click', e => {
        if (e.target === clearConfirmModal) clearConfirmModal.classList.remove('open');
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

  // Inicialização ao carregar o DOM (sempre inicia sem Pokémon padrão para o usuário escolher)
  document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    try {
      localStorage.removeItem('poketeam_pro_state_v2');
    } catch (e) {}
    loadFromStorage();

    // "Minhas Equipes" só aparece aberta ao abrir o site se já houver 1 ou mais equipes salvas
    const sidebarEl = document.getElementById('saved-teams-sidebar');
    if (sidebarEl) {
      if (state.savedTeams && state.savedTeams.length > 0) {
        sidebarEl.classList.remove('collapsed');
        document.body.classList.remove('sidebar-closed');
      } else {
        sidebarEl.classList.add('collapsed');
        document.body.classList.add('sidebar-closed');
      }
    }

    renderAll();
  });
})();
