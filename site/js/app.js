// ═══════════════════════════════════════════════════════
// KIMSWAP — Main Application
// ═══════════════════════════════════════════════════════
(function() {
  'use strict';

  // ── Year ─────────────────────────────────────────
  document.getElementById('year').textContent = new Date().getFullYear();

  // ── Wallet Init ──────────────────────────────────
  loadWallet();
  updateWalletBadge();

  // ── Header Stats ─────────────────────────────────
  function updateHeaderStats() {
    document.getElementById('total-petitions').textContent = PETITIONS.length;
    const total = getTotalClaims();
    document.getElementById('total-amount').textContent = formatAmount(total).replace('$', '');
  }
  updateHeaderStats();

  // ── Wallet Badge Click ───────────────────────────
  document.getElementById('wallet-badge').addEventListener('click', openWalletModal);

  // ── Broadcast Init ───────────────────────────────
  initBroadcast();

  // ── Render Featured Petition ─────────────────────
  function renderFeaturedPetition() {
    const el = document.getElementById('featured-petition');
    const p = getFeaturedPetition();
    if (!p) { el.style.display = 'none'; return; }

    const progress = Math.min(100, (p.boosts / 10) * 100);

    el.innerHTML = `
      <div class="pet-card-top">
        <span class="pet-number">VICTIM CLAIM #${p.id}</span>
        <span class="pet-status ${p.status}">${getStatusLabel(p.status)}</span>
      </div>
      <div class="pet-event">★ ${p.event} ★</div>
      <p class="pet-story">"${p.story}"</p>
      <div class="pet-meta">
        <div><strong>${p.name}</strong><br>Filed by</div>
        <div><strong>${p.amount}</strong><br>Amount Lost</div>
        <div><strong>${p.chain}</strong><br>Chain</div>
        <div><strong>${p.boosts} boosts</strong><br>Community Support</div>
      </div>
      <div class="pet-boost-bar">
        <div class="pet-boost-fill" style="width: ${progress}%"></div>
      </div>
      <div class="pet-boost-actions">
        <span>Progress to FEATURED: ${p.boosts}/10 boosts</span>
        <button class="button button-red boost-btn" data-id="${p.id}">BOOST WITH $KIM</button>
      </div>
    `;
    el.style.display = 'block';
    el.querySelector('.boost-btn').addEventListener('click', e => {
      e.stopPropagation();
      openBoostModal(p.id);
    });
  }

  // ── Render Petition Grid ─────────────────────────
  let visibleCount = 9;
  function renderPetitionGrid() {
    const grid = document.getElementById('petition-grid');
    const featured = getFeaturedPetition();
    const sorted = getSortedPetitions().filter(p => p.id !== featured?.id);
    const visible = sorted.slice(0, visibleCount);

    grid.innerHTML = visible.map(p => {
      const progress = Math.min(100, (p.boosts / 10) * 100);
      return `
      <div class="petition-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View petition ${p.id}">
        <div class="pet-card-top">
          <span class="pet-number">VICTIM CLAIM #${p.id}</span>
          <span class="pet-status ${p.status}">${getStatusLabel(p.status)}</span>
        </div>
        <div class="pet-event">${p.event}</div>
        <p class="pet-story">"${p.story}"</p>
        <div class="pet-meta">
          <div><strong>${p.name}</strong><br>Filed by</div>
          <div><strong>${p.amount}</strong><br>Amount Lost</div>
        </div>
        <div class="pet-boost-bar">
          <div class="pet-boost-fill" style="width: ${progress}%"></div>
        </div>
        <div class="pet-boost-info">
          <span><strong>${p.boosts}</strong> boosts</span>
          <span>${progress >= 100 ? 'FEATURED' : progress >= 30 ? 'BOOSTED' : ''}</span>
        </div>
      </div>
    `;
    }).join('');

    grid.querySelectorAll('.petition-card').forEach(card => {
      card.addEventListener('click', () => openPetitionModal(card.dataset.id));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') openPetitionModal(card.dataset.id); });
    });

    const loadMore = document.getElementById('load-more');
    if (sorted.length > visibleCount) {
      loadMore.style.display = 'block';
      document.getElementById('load-more-btn').onclick = () => {
        visibleCount += 6;
        renderPetitionGrid();
      };
    } else {
      loadMore.style.display = 'none';
    }
  }

  // ── Petition Detail Modal ────────────────────────
  function openPetitionModal(id) {
    const p = PETITIONS.find(p => p.id === id);
    if (!p) return;

    const progress = Math.min(100, (p.boosts / 10) * 100);
    const modal = document.getElementById('petition-modal');
    const content = document.getElementById('modal-content');

    content.innerHTML = `
      <div class="detail-event">★ ${p.event} ★</div>
      <div class="detail-number">VICTIM CLAIM #${p.id} — FILED ${new Date(p.submittedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
      <p class="detail-story">"${p.story}"</p>
      <div class="detail-meta">
        <div class="detail-meta-item"><label>FILED BY</label><span>${p.name}</span></div>
        <div class="detail-meta-item"><label>AMOUNT LOST</label><span>${p.amount}</span></div>
        <div class="detail-meta-item"><label>USD VALUE</label><span>${p.amountUsd}</span></div>
        <div class="detail-meta-item"><label>CHAIN</label><span>${p.chain}</span></div>
        ${p.wallet ? `<div class="detail-meta-item"><label>WALLET</label><span style="font-size:12px;font-family:monospace">${p.wallet}</span></div>` : ''}
        <div class="detail-meta-item"><label>STATUS</label><span class="pet-status ${p.status}">${getStatusLabel(p.status)}</span></div>
      </div>
      <div class="detail-boost-section">
        <div class="detail-boost-header">
          <strong>${p.boosts} BOOSTS</strong>
          <span>Community support for this petition</span>
        </div>
        <div class="detail-boost-bar">
          <div class="detail-boost-fill" style="width: ${progress}%"></div>
        </div>
        <p style="font-size:13px;color:var(--muted);margin-bottom:16px">
          ${progress >= 100 ? 'This petition is FEATURED and will receive priority Ministry attention.' :
            `Requires ${10 - p.boosts} more boosts to reach FEATURED status.`}
        </p>
        <button class="button button-red button-full" id="modal-boost-btn">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
          Boost with $KIM
        </button>
      </div>
      <div class="detail-share">
        <a class="share-btn" href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Petition #${p.id}: ${p.name} lost ${p.amount} (${p.amountUsd}) in the ${p.event}. The Ministry of Repatriation is reviewing. #KimSwap #CryptoJustice`)}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          Share on X
        </a>
        <button class="share-btn" id="copy-link-btn">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5m4-14l9 9m0 0h-4m4 0v4"/></svg>
          Copy Link
        </button>
      </div>
    `;

    content.querySelector('#modal-boost-btn').addEventListener('click', () => {
      closePetitionModal();
      setTimeout(() => openBoostModal(id), 100);
    });

    content.querySelector('#copy-link-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href + '?petition=' + id).catch(() => {});
      const btn = content.querySelector('#copy-link-btn');
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h5m4-14l9 9m0 0h-4m4 0v4"/></svg> Copy Link`;
      }, 1500);
    });

    modal.hidden = false;
    modal.querySelector('.modal').scrollTop = 0;
  }

  function closePetitionModal() {
    document.getElementById('petition-modal').hidden = true;
  }

  document.getElementById('modal-close').addEventListener('click', closePetitionModal);
  document.getElementById('petition-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closePetitionModal();
  });

  // ── Boost Modal ──────────────────────────────────
  function openBoostModal(id) {
    const p = PETITIONS.find(p => p.id === id);
    if (!p || !wallet) return;

    const modal = document.getElementById('boost-modal');
    const content = document.getElementById('boost-modal-content');

    content.innerHTML = `
      <div style="padding:32px">
        <div style="text-align:center;margin-bottom:20px">
          <svg viewBox="0 0 24 24" width="40" height="40" fill="#c41e3a"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
        </div>
        <h2 style="font-family:var(--font-head);font-size:24px;letter-spacing:2px;text-align:center;margin-bottom:4px">BOOST THIS PETITION</h2>
        <p style="text-align:center;font-size:14px;color:var(--muted);margin-bottom:24px">Victim Claim #${p.id} — ${p.event}</p>
        <div class="boost-wallet-info">
          <span>Your $KIM Balance</span>
          <strong>${wallet.balance.toLocaleString()} $KIM</strong>
        </div>
        <div class="boost-input-group">
          <label>Amount of $KIM to spend</label>
          <div class="boost-input-row">
            <input type="number" id="boost-amount" value="100" min="1" max="${wallet.balance}" placeholder="100">
            <span>$KIM</span>
          </div>
          <div class="boost-presets">
            <button class="boost-preset" data-amount="50">50</button>
            <button class="boost-preset" data-amount="100">100</button>
            <button class="boost-preset" data-amount="250">250</button>
            <button class="boost-preset" data-amount="500">500</button>
          </div>
        </div>
        <div class="boost-impact">
          <strong id="boost-equivalent">+1 boost</strong>
          <span id="boost-desc">This will raise petition #${p.id} by 1 position in the feed.</span>
        </div>
        <button class="button button-red button-full" id="confirm-boost-btn" style="margin-bottom:12px">Confirm Boost</button>
        <button class="button button-outline button-full" id="cancel-boost-btn">Cancel</button>
      </div>
    `;

    content.querySelectorAll('.boost-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('boost-amount').value = btn.dataset.amount;
        updateBoostImpact();
      });
    });

    function updateBoostImpact() {
      const amount = parseInt(document.getElementById('boost-amount').value) || 0;
      const equiv = Math.ceil(amount / 10);
      document.getElementById('boost-equivalent').textContent = `+${equiv} boost${equiv !== 1 ? 's' : ''}`;
      document.getElementById('boost-desc').textContent = `This will raise petition #${p.id} by ${equiv} position${equiv !== 1 ? 's' : ''} in the feed.`;
    }

    document.getElementById('boost-amount').addEventListener('input', updateBoostImpact);

    document.getElementById('confirm-boost-btn').addEventListener('click', () => {
      const amount = parseInt(document.getElementById('boost-amount').value) || 0;
      if (amount <= 0) return;
      if (amount > wallet.balance) {
        alert('Insufficient $KIM balance.');
        return;
      }
      if (boostPetition(id, amount)) {
        closeBoostModal();
        renderFeaturedPetition();
        renderPetitionGrid();
        updateHeaderStats();
        showBoostConfirmation(id, amount);
      }
    });

    document.getElementById('cancel-boost-btn').addEventListener('click', closeBoostModal);
    modal.hidden = false;
  }

  function closeBoostModal() {
    document.getElementById('boost-modal').hidden = true;
  }

  document.getElementById('boost-modal-close').addEventListener('click', closeBoostModal);
  document.getElementById('boost-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeBoostModal();
  });

  function showBoostConfirmation(id, amount) {
    const modal = document.getElementById('boost-modal');
    const content = document.getElementById('boost-modal-content');
    const equiv = Math.ceil(amount / 10);

    content.innerHTML = `
      <div style="padding:48px 40px;text-align:center">
        <div class="confirm-icon">★</div>
        <div class="confirm-title">BOOST CONFIRMED</div>
        <p class="confirm-message">
          You have contributed <strong style="color:var(--gold)">${amount.toLocaleString()} $KIM</strong> to the repatriation effort.
          Petition #${id} has received <strong style="color:var(--red)">+${equiv} boost${equiv !== 1 ? 's' : ''}</strong>.
        </p>
        <p style="font-size:14px;color:var(--muted)">The Ministry thanks you for your service to the Republic.</p>
        <button class="button button-outline" onclick="document.getElementById('boost-modal').hidden=true" style="margin-top:24px">Close</button>
      </div>
    `;
    modal.hidden = false;
  }

  // ── Submission Form ──────────────────────────────
  const form = document.getElementById('petition-form');
  const storyTextarea = document.getElementById('form-story');
  const storyCount = document.getElementById('story-count');

  storyTextarea.addEventListener('input', () => {
    storyCount.textContent = storyTextarea.value.length;
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

    const data = {
      name: form.querySelector('#form-name').value.trim(),
      event: form.querySelector('#form-event').value.trim(),
      amount: form.querySelector('#form-amount').value.trim(),
      chain: form.querySelector('#form-chain').value,
      wallet: form.querySelector('#form-wallet').value.trim(),
      story: form.querySelector('#form-story').value.trim(),
      evidence: form.querySelector('#form-evidence').value.trim(),
      kimAddress: form.querySelector('#form-kim-address') ? form.querySelector('#form-kim-address').value.trim() : '',
      amountUsd: form.querySelector('#form-amount').value.trim(),
    };

    let valid = true;
    if (!data.name) { showError('form-name', 'Display name is required.'); valid = false; }
    if (!data.event) { showError('form-event', 'Event name is required.'); valid = false; }
    if (!data.amount) { showError('form-amount', 'Amount lost is required.'); valid = false; }
    if (!data.chain) { showError('form-chain', 'Please select a chain.'); valid = false; }
    if (!data.story || data.story.length < 20) {
      showError('form-story', 'Please write at least 20 characters describing your situation.'); valid = false;
    }

    if (!valid) return;

    const caseId = addPetition(data);
    form.reset();
    storyCount.textContent = '0';
    showSubmissionConfirmation(caseId);
    updateHeaderStats();
  });

  function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const group = field.closest('.form-group');
    group.classList.add('error');
    let errEl = group.querySelector('.error-msg');
    if (!errEl) {
      errEl = document.createElement('span');
      errEl.className = 'error-msg';
      group.appendChild(errEl);
    }
    errEl.textContent = msg;
  }

  function showSubmissionConfirmation(caseId) {
    const modal = document.getElementById('confirm-modal');
    const content = document.getElementById('confirm-content');

    content.innerHTML = `
      <div class="confirm-content">
        <div class="confirm-icon">✓</div>
        <div class="confirm-title">PETITION SUBMITTED</div>
        <div class="confirm-case-number">★ CASE #${caseId} RECEIVED ★</div>
        <p class="confirm-message">
          Your claim has been received and filed with the Ministry of Repatriation.
          The People's Republic will review your submission.
        </p>
        <p class="confirm-message" style="font-size:14px">
          You may receive correspondence regarding verification of ownership.
          Please remain at your terminal.
        </p>
        <div class="confirm-note">
          Your petition is now in the review queue. Once verified by the Ministry,
          it will appear publicly. You can track it using Case #${caseId}.
        </div>
        <button class="button button-red" style="margin-top:24px" onclick="document.getElementById('confirm-modal').hidden=true">
          Return to the Ministry
        </button>
      </div>
    `;
    modal.hidden = false;
  }

  // ── Wallet Modal ─────────────────────────────────
  function openWalletModal() {
    const modal = document.getElementById('wallet-modal');
    const content = document.getElementById('wallet-modal-content');

    content.innerHTML = `
      <div class="wallet-header">
        <h2>YOUR $KIM WALLET</h2>
        <p>Demo wallet — $KIM has no real value</p>
      </div>
      <div class="wallet-address-box">
        <code id="wallet-address-display">${wallet.address}</code>
        <button class="copy-btn" id="copy-address-btn">Copy</button>
      </div>
      <div class="wallet-balance-display">
        <strong id="wallet-modal-balance">${wallet.balance.toLocaleString()}</strong>
        <span>$KIM</span>
      </div>
      <div class="wallet-actions">
        <button class="button button-outline" id="refill-btn">Get More $KIM (+5,000)</button>
      </div>
      <div class="wallet-note">
        <p>This is a demo wallet for testing. $KIM tokens have no real value.
        Boosting petitions helps signal community support — nothing more.</p>
      </div>
    `;

    document.getElementById('copy-address-btn').addEventListener('click', () => {
      navigator.clipboard.writeText(wallet.address).catch(() => {});
      const btn = document.getElementById('copy-address-btn');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1500);
    });

    document.getElementById('refill-btn').addEventListener('click', () => {
      updateWalletBalance(5000);
      document.getElementById('wallet-modal-balance').textContent = wallet.balance.toLocaleString();
      updateWalletBadge();
    });

    modal.hidden = false;
  }

  document.getElementById('wallet-modal-close').addEventListener('click', () => {
    document.getElementById('wallet-modal').hidden = true;
  });
  document.getElementById('wallet-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) document.getElementById('wallet-modal').hidden = true;
  });

  // ── Confirm Modal Close ──────────────────────────
  document.getElementById('confirm-modal').addEventListener('click', e => {
    if (e.target === e.currentTarget) document.getElementById('confirm-modal').hidden = true;
  });

  // ── Escape key ───────────────────────────────────
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    document.getElementById('petition-modal').hidden = true;
    document.getElementById('boost-modal').hidden = true;
    document.getElementById('confirm-modal').hidden = true;
    document.getElementById('wallet-modal').hidden = true;
  });

  // ── URL petition param ───────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const petitionParam = urlParams.get('petition');
  if (petitionParam) {
    setTimeout(() => openPetitionModal(petitionParam), 500);
  }

  // ── Smooth scroll ────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  // ── Init ─────────────────────────────────────────
  renderFeaturedPetition();
  renderPetitionGrid();

})();
