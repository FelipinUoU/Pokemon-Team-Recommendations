// ==========================================================================
// POKÉMON TEAM RECOMMENDATIONS — CONTROLADOR MOBILE & INTEGRAÇÃO CAPACITOR
// ==========================================================================
(function () {
  'use strict';

  const VIEWS = ['equipe', 'editor', 'sinergia', 'salvas'];
  let activeView = 'equipe';

  const VIEW_HEADERS = {
    equipe: {
      title: 'Pokémon Team <span class="text-primary">Recommendations</span>',
      subtitle: 'Planejador de Equipes • Gen 1–9 & Fan Games'
    },
    editor: {
      title: 'Editor do <span class="text-primary">Slot</span>',
      subtitle: 'Ataques, Itens, Mecânicas, EVs & IVs'
    },
    sinergia: {
      title: 'Sinergia &amp; <span class="text-primary">Cobertura</span>',
      subtitle: 'Diagnóstico Defensivo e Matriz de 18 Tipos'
    },
    salvas: {
      title: 'Equipes <span class="text-primary">Salvas</span>',
      subtitle: 'Salvas localmente no seu aparelho'
    }
  };

  function switchView(viewName, options = {}) {
    if (!VIEWS.includes(viewName)) return;
    activeView = viewName;
    document.body.setAttribute('data-active-view', viewName);

    // Mostrar/ocultar seções
    document.querySelectorAll('.m-view').forEach(sec => {
      if (sec.dataset.view === viewName) {
        sec.classList.add('active');
      } else {
        sec.classList.remove('active');
      }
    });

    // Atualizar botões da barra inferior
    document.querySelectorAll('#m-bottom-nav [data-nav]').forEach(btn => {
      if (btn.dataset.nav === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Atualizar Top App Bar
    const backBtn = document.getElementById('m-btn-back');
    const emblem = document.getElementById('m-brand-emblem');
    const titleEl = document.getElementById('m-title');
    const subtitleEl = document.getElementById('m-subtitle');

    if (backBtn && emblem) {
      if (viewName === 'equipe') {
        backBtn.classList.add('hidden');
        emblem.classList.remove('hidden');
      } else {
        backBtn.classList.remove('hidden');
        emblem.classList.add('hidden');
      }
    }

    const meta = VIEW_HEADERS[viewName] || VIEW_HEADERS.equipe;
    if (titleEl) titleEl.innerHTML = meta.title;
    if (subtitleEl) subtitleEl.textContent = meta.subtitle;

    // Se abrir a aba Editor e o painel estiver fechado mas houver Pokémon na equipe,
    // seleciona automaticamente o slot ativo (ou o primeiro preenchido)
    if (viewName === 'editor') {
      ensureEditorVisible();
    }

    syncMobileEnhancements();

    if (!options.keepScroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function ensureEditorVisible() {
    const editorEl = document.getElementById('slot-detail-editor');
    if (!editorEl) return;

    // Se o editor está vazio/oculto, tenta clicar em um card preenchido para forçar o app.js a abrir o editor
    if (editorEl.classList.contains('hidden') || !editorEl.innerHTML.trim()) {
      const activeCard = document.querySelector('#team-slots-grid .slot-card.active-slot-glow[data-slot-index]')
        || document.querySelector('#team-slots-grid .slot-card[data-slot-index]');
      if (activeCard) {
        const statsBtn = activeCard.querySelector('[data-edit-tab="moves"]') || activeCard.querySelector('[data-edit-tab="stats"]');
        if (statsBtn) {
          statsBtn.click();
        } else {
          activeCard.click();
        }
      }
    }
  }

  function syncMobileEnhancements() {
    syncMiniSynergyCard();
    syncEditorSlotStrip();
    syncEditorEmptyState();
  }

  // 1. Mini card de sinergia na tela principal "Equipe"
  function syncMiniSynergyCard() {
    const miniEl = document.getElementById('m-mini-synergy');
    const scoreBadgeEl = document.getElementById('synergy-score-badge');
    const alertsBoxEl = document.getElementById('synergy-alerts-box');
    if (!miniEl || !scoreBadgeEl) return;

    // Extrair porcentagem do SVG gauge já renderizado pelo app.js
    const pctText = scoreBadgeEl.querySelector('.text-2xl')?.textContent?.trim() || '0%';
    const rankText = scoreBadgeEl.querySelector('span.uppercase')?.textContent?.trim() || 'Rank';
    const circleEl = scoreBadgeEl.querySelectorAll('circle')[1];
    const strokeColor = circleEl ? (circleEl.getAttribute('stroke') || '#30c88f') : '#30c88f';

    // Resumo de alertas
    let alertSummaryHtml = '';
    if (alertsBoxEl) {
      const badges = alertsBoxEl.querySelectorAll('.type-badge');
      const hasCrit = alertsBoxEl.innerHTML.includes('Fraquezas Críticas');
      if (hasCrit && badges.length > 0) {
        alertSummaryHtml = `
          <div class="px-2.5 py-1 rounded-md bg-error-container/20 border border-error/40 text-error font-mono text-[11px] truncate">
            ⚠️ Atenção às fraquezas críticas
          </div>
        `;
      } else {
        alertSummaryHtml = `
          <div class="px-2.5 py-1 rounded-md bg-tertiary-container/15 border border-tertiary/35 text-tertiary font-mono text-[11px] truncate">
            🛡️ Cobertura defensiva equilibrada
          </div>
        `;
      }
    }

    miniEl.innerHTML = `
      <div class="w-16 h-16 rounded-full flex flex-col items-center justify-center shrink-0 border-4 bg-surface-container-lowest" style="border-color:${strokeColor}">
        <span class="font-headline font-extrabold text-base text-on-surface leading-none">${pctText}</span>
        <span class="font-mono text-[9px] text-on-surface-variant uppercase mt-0.5">Sinergia</span>
      </div>
      <div class="flex-1 min-w-0 space-y-1.5">
        <div class="flex items-center gap-1.5">
          <span class="px-2 py-0.5 rounded bg-tertiary-container/20 text-tertiary font-mono text-[10px] font-bold uppercase truncate">${rankText}</span>
        </div>
        ${alertSummaryHtml}
      </div>
    `;
  }

  // 2. Faixa horizontal dos 6 slots no topo da aba "Editor"
  function syncEditorSlotStrip() {
    const stripEl = document.getElementById('m-editor-slot-strip');
    const gridEl = document.getElementById('team-slots-grid');
    if (!stripEl || !gridEl) return;

    const cards = Array.from(gridEl.children);
    stripEl.innerHTML = cards.map((card, idx) => {
      const isSelected = card.classList.contains('active-slot-glow');
      const hasMon = card.hasAttribute('data-slot-index');
      if (!hasMon) {
        return `
          <button type="button" data-m-strip-empty="${idx}" class="m-strip-chip opacity-75">
            <span class="material-symbols-outlined text-primary text-[18px]">add_circle</span>
            <span>Slot #${idx + 1}</span>
          </button>
        `;
      }
      const img = card.querySelector('img');
      const name = card.querySelector('h3')?.textContent?.trim() || `Slot #${idx + 1}`;
      const src = img ? img.getAttribute('src') : '';
      return `
        <button type="button" data-m-strip-slot="${idx}" class="m-strip-chip ${isSelected ? 'active' : ''}">
          ${src ? `<img src="${src}" alt="${name}" />` : ''}
          <span>#${idx + 1} ${name}</span>
        </button>
      `;
    }).join('');
  }

  // 3. Estado vazio do Editor
  function syncEditorEmptyState() {
    const emptyEl = document.getElementById('m-editor-empty');
    const editorEl = document.getElementById('slot-detail-editor');
    if (!emptyEl || !editorEl) return;

    const isHidden = editorEl.classList.contains('hidden') || !editorEl.innerHTML.trim();
    if (isHidden) {
      emptyEl.classList.remove('hidden');
    } else {
      emptyEl.classList.add('hidden');
    }
  }

  // Compartilhamento / Exportação nativa no Android (Capacitor Share / Filesystem)
  async function shareTextNative(title, text) {
    try {
      const SharePlugin = window.Capacitor?.Plugins?.Share;
      if (SharePlugin) {
        await SharePlugin.share({ title, text, dialogTitle: title });
        return true;
      }
      if (navigator.share) {
        await navigator.share({ title, text });
        return true;
      }
    } catch (e) {
      // Usuário cancelou ou plugin indisponível
    }
    return false;
  }

  function setupMobileEvents() {
    // Clique nas 4 abas da barra inferior
    document.getElementById('m-bottom-nav')?.addEventListener('click', e => {
      const btn = e.target.closest('[data-nav]');
      if (!btn) return;
      switchView(btn.dataset.nav);
    });

    // Botões de navegação interna (data-nav-to="sinergia", etc.)
    document.body.addEventListener('click', e => {
      const navTo = e.target.closest('[data-nav-to]');
      if (navTo) {
        e.preventDefault();
        switchView(navTo.dataset.navTo);
        return;
      }

      // Faixa de slots no topo do Editor
      const stripSlot = e.target.closest('[data-m-strip-slot]');
      if (stripSlot) {
        const idx = Number(stripSlot.dataset.mStripSlot);
        const card = document.querySelector(`#team-slots-grid .slot-card[data-slot-index="${idx}"]`);
        if (card) {
          const movesBtn = card.querySelector('[data-edit-tab="moves"]');
          if (movesBtn) movesBtn.click();
          else card.click();
        }
        setTimeout(syncMobileEnhancements, 30);
        return;
      }

      const stripEmpty = e.target.closest('[data-m-strip-empty]');
      if (stripEmpty) {
        const idx = Number(stripEmpty.dataset.mStripEmpty);
        const emptyCard = document.querySelector(`#team-slots-grid [data-open-picker-slot="${idx}"]`);
        if (emptyCard) emptyCard.click();
        return;
      }

      // Na tela Equipe, quando o usuário clica num card preenchido ou em "⚔️ 4 Ataques / 🎒 Item / 📊 Stats",
      // leva automaticamente para a aba "Editor" com o Pokémon aberto!
      const editTrigger = e.target.closest('#team-slots-grid [data-edit-tab], #team-slots-grid .slot-card[data-slot-index]');
      const isRemoveOrSwap = e.target.closest('[data-remove-slot], [data-open-picker-slot], [data-quick-fill-slot]');
      if (editTrigger && !isRemoveOrSwap) {
        setTimeout(() => {
          const editorEl = document.getElementById('slot-detail-editor');
          // Se o clique acabou fechando o editor por ser toggle, reabre para garantir exibição no mobile
          if (editorEl && editorEl.classList.contains('hidden')) {
            const idx = editTrigger.dataset.slotIndex || editTrigger.closest('[data-slot-index]')?.dataset.slotIndex;
            const card = document.querySelector(`#team-slots-grid .slot-card[data-slot-index="${idx}"]`);
            const movesBtn = card?.querySelector('[data-edit-tab="moves"]');
            if (movesBtn) movesBtn.click();
          }
          switchView('editor');
        }, 25);
        return;
      }

      // No Editor, evitar que clicar na mesma aba feche o painel inteiro no mobile
      const editorTabBtn = e.target.closest('#slot-detail-editor [data-editor-tab]');
      if (editorTabBtn) {
        setTimeout(() => {
          const editorEl = document.getElementById('slot-detail-editor');
          if (editorEl && editorEl.classList.contains('hidden')) {
            editorTabBtn.click();
          }
          syncMobileEnhancements();
        }, 20);
        return;
      }

      // Quando carregar uma equipe salva na aba "Salvas", ir para a aba "Equipe"
      if (e.target.closest('[data-load-saved]')) {
        setTimeout(() => switchView('equipe'), 40);
      }
    });

    // Botão Voltar no topo
    document.getElementById('m-btn-back')?.addEventListener('click', () => {
      switchView('equipe');
    });

    // Botão Compartilhar Showdown no modal
    document.getElementById('m-btn-share-showdown')?.addEventListener('click', async () => {
      const txt = document.getElementById('export-textarea')?.value || '';
      if (!txt) return;
      const shared = await shareTextNative('Minha Equipe Pokémon (Showdown)', txt);
      if (!shared) {
        navigator.clipboard?.writeText(txt);
      }
    });

    // Interceptar Backup (.json) para também oferecer compartilhamento nativo no Android
    const btnExportJson = document.getElementById('btn-export-json-pc');
    if (btnExportJson) {
      btnExportJson.addEventListener('click', async () => {
        try {
          const raw = localStorage.getItem('poketeam_pro_saved_teams_v2');
          if (!raw) return;
          const payload = JSON.stringify({
            app: 'Pokémon Team Recommendations',
            exportedAt: new Date().toISOString(),
            savedTeams: JSON.parse(raw)
          }, null, 2);
          await shareTextNative('Backup — Minhas Equipes Pokémon (.json)', payload);
        } catch (err) {}
      });
    }

    // Observar mudanças no DOM feitas pelo app.js para manter o mini card e a faixa de slots sincronizados
    const observer = new MutationObserver(() => {
      syncMobileEnhancements();
    });
    const teamGrid = document.getElementById('team-slots-grid');
    const scoreBadge = document.getElementById('synergy-score-badge');
    const editorSec = document.getElementById('slot-detail-editor');
    if (teamGrid) observer.observe(teamGrid, { childList: true });
    if (scoreBadge) observer.observe(scoreBadge, { childList: true });
    if (editorSec) observer.observe(editorSec, { attributes: true, childList: true });
  }

  function setupCapacitorNative() {
    const Cap = window.Capacitor;
    if (!Cap) return;

    // StatusBar escura combinando com #0d1322
    try {
      const StatusBar = Cap.Plugins?.StatusBar;
      if (StatusBar) {
        StatusBar.setBackgroundColor?.({ color: '#0d1322' });
        StatusBar.setStyle?.({ style: 'DARK' });
      }
    } catch (e) {}

    // Esconder SplashScreen quando pronto
    try {
      Cap.Plugins?.SplashScreen?.hide?.();
    } catch (e) {}

    // Botão Voltar físico/gesto do Android
    try {
      const AppPlugin = Cap.Plugins?.App;
      if (AppPlugin && AppPlugin.addListener) {
        AppPlugin.addListener('backButton', () => {
          // 1. Se algum modal estiver aberto, fecha o modal
          const openModal = document.querySelector('.modal-backdrop.open');
          if (openModal) {
            openModal.classList.remove('open');
            return;
          }
          // 2. Se estiver em outra aba, volta para "Equipe"
          if (activeView !== 'equipe') {
            switchView('equipe');
            return;
          }
          // 3. Na aba principal, minimiza/sai do app
          AppPlugin.exitApp?.();
        });
      }
    } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupMobileEvents();
    setupCapacitorNative();
    setTimeout(() => {
      switchView('equipe', { keepScroll: true });
      syncMobileEnhancements();
    }, 60);
  });
})();
