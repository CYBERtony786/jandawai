/* JanDawai — MVP search UI + offline fuzzy engine + Phase 3 impact features. */

(() => {
  'use strict';

  const DATA_URL = './data/medicines.json';

  const TEXTS = {
    hi: {
      skipToResults: 'Results par jayen',
      tagline: 'जन औषधि की सस्ती दवाई, आपकी जेब में',
      searchLabel: 'दवाई का नाम खोजें',
      searchPlaceholder: 'दवाई का नाम लिखें — जैसे "Dolo 650"',
      clear: 'साफ़ करें',
      quickPicks: 'एक टैप में देखें',
      offlineReady: 'ऑफ़लाइन भी चलेगा',
      askDoctor: 'अंतिम फैसले के लिए डॉक्टर या फार्मासिस्ट से सलाह लें।',
      disclaimerTitle: 'महत्वपूर्ण सूचना:',
      disclaimer: 'Yeh sirf keemat aur molecule (salt) ki jaankari hai, medical substitution advice nahi. Dawai lene se pehle Doctor ya Pharmacist se zaroor salah lein.',
      engineFuse: 'Fuse.js (ऑनलाइन)',
      engineBuiltin: 'ऑफ़लाइन खोज चालू है',
      countOne: '1 नतीजा',
      countMany: '{n} नतीजे',
      headerBrand: 'ब्रांडेड दवाई',
      headerGeneric: 'जेनेरिक नमक (मॉलेक्यूल)',
      headerStrength: 'ताकत / डोज़',
      headerPack: 'पैक साइज़',
      headerUse: 'किस काम आती है',
      savingsLabel: 'MRP तुलना',
      bachat: 'बचत',
      typeToSearch: 'ऊपर बॉक्स में कोई ब्रांडेड दवाई का नाम टाइप करें।',
      guardrail: 'Yeh dawai abhi humari verified list mein nahi hai — hum galat andaza (guess) nahi lagate.',
      notFoundHint: 'Kisi bhi verified list ke dawai ke liye apne pharmacist se naam puchhein.',
      disambig: '{n} मिलते-जुलते नतीजे — अपनी ताकत (strength) और पैक साइज़ देखकर चुनें:',
      closeMatches: 'कोई verified नतीजा नहीं मिला',
      askDocCard: 'डॉक्टर या फार्मासिस्ट से सलाह लें।',
      // Phase 3
      slipButton: 'Chemist Slip Dikhaye',
      speakButton: 'Bol Ke Suno',
      saveButton: 'Parche Mein Jode',
      savedButton: 'Parche Mein Jude',
      yearlyLabel: 'Roz Khane Wali Dawai?',
      yearlyHint: '12 mahine ka hisaab',
      yearlyLine: '12 mahine mein bachat',
      kulBachat: 'Kul Bachat:',
      resetTotal: 'Kul bachat reset karein',
      slipTitle: 'Chemist Slip Dikhaye',
      slipSalt: 'Generic Salt Name',
      slipStrength: 'Strength',
      slipCode: 'Jan Aushadhi Code',
      slipNote: 'Dawai lene se pehle Doctor ya Pharmacist se zaroor salah lein.',
      whatsapp: 'Share on WhatsApp',
      closeModal: 'Band karein',
      speaking: 'Bol ke suna rahe hain…',
      speakUnsupported: 'Is browser mein awaaz support nahi hai.',
    },
    en: {
      skipToResults: 'Skip to results',
      tagline: 'Jan Aushadhi generic equivalent, price and savings — instantly.',
      searchLabel: 'Search medicine name',
      searchPlaceholder: 'Type a branded medicine name — e.g. "Dolo 650"',
      clear: 'Clear',
      quickPicks: 'Tap to see',
      offlineReady: 'Works offline too',
      askDoctor: 'Ask a doctor or pharmacist before making a final decision.',
      disclaimerTitle: 'Important notice:',
      disclaimer: 'Yeh sirf keemat aur molecule (salt) ki jaankari hai, medical substitution advice nahi. Dawai lene se pehle Doctor ya Pharmacist se zaroor salah lein.',
      engineFuse: 'Fuse.js (online)',
      engineBuiltin: 'Offline search active',
      countOne: '1 result',
      countMany: '{n} results',
      headerBrand: 'Branded medicine',
      headerGeneric: 'Generic salt (molecule)',
      headerStrength: 'Strength / dose',
      headerPack: 'Pack size',
      headerUse: 'Used for',
      savingsLabel: 'MRP comparison',
      bachat: 'Save',
      typeToSearch: 'Type a branded medicine name in the box above.',
      guardrail: 'Yeh dawai abhi humari verified list mein nahi hai — hum galat andaza (guess) nahi lagate.',
      disambig: '{n} close matches — pick by strength and pack size:',
      closeMatches: 'No verified match found',
      notFoundHint: 'Kisi bhi verified list ke dawai ke liye apne pharmacist se naam puchhein.',
      askDocCard: 'Ask your doctor or pharmacist before switching.',
      // Phase 3
      slipButton: 'Chemist Slip Dikhaye',
      speakButton: 'Bol Ke Suno',
      saveButton: 'Parche Mein Jode',
      savedButton: 'Added to Wallet',
      yearlyLabel: 'Roz Khane Wali Dawai?',
      yearlyHint: '12-month view',
      yearlyLine: 'Savings over 12 months',
      kulBachat: 'Kul Bachat:',
      resetTotal: 'Reset total savings',
      slipTitle: 'Chemist Slip Dikhaye',
      slipSalt: 'Generic Salt Name',
      slipStrength: 'Strength',
      slipCode: 'Jan Aushadhi Code',
      slipNote: 'Ask your doctor or pharmacist before starting this medicine.',
      whatsapp: 'Share on WhatsApp',
      closeModal: 'Close',
      speaking: 'Reading it out…',
      speakUnsupported: 'Speech is not supported in this browser.',
    },
  };

  const QUICK_CHIPS = [
    { condition: 'Bukhar', conditionHi: 'बुखार', brand: 'Dolo 650', brandHi: 'डोलो 650' },
    { condition: 'Gas', conditionHi: 'गैस / एसिडिटी', brand: 'Pan-D', brandHi: 'पैन-डी' },
    { condition: 'Antibiotic', conditionHi: 'एंटीबायोटिक', brand: 'Augmentin 625', brandHi: 'ऑग्मेंटिन 625' },
    { condition: 'BP', conditionHi: 'ब्लड प्रेशर', brand: 'Telma 40', brandHi: 'तेलमा 40' },
    { condition: 'Sugar', conditionHi: 'शुगर (डायबिटीज)', brand: 'Glycomet GP2', brandHi: 'ग्लाइकोमेट जीपी2' },
    { condition: 'Calcium', conditionHi: 'कैल्शियम', brand: 'Shelcal 500', brandHi: 'शेलकैल 500' },
  ];

  let medicines = [];
  let fuse = null;
  let engine = 'builtin'; // 'fuse' | 'builtin'
  let lang = 'hi';
  let currentQuery = '';

  // Wallet of "saved" savings. Keyed by medicine id, survives re-renders.
  const wallet = new Map(); // id -> { savings, yearly, added }

  let lastFocus = null;

  const els = {
    q: document.getElementById('q'),
    clear: document.getElementById('clear'),
    chips: document.getElementById('chips'),
    results: document.getElementById('results'),
    engineBadge: document.getElementById('engineBadge'),
    countBadge: document.getElementById('countBadge'),
    offlineBadge: document.getElementById('offlineBadge'),
    disclaimerText: document.getElementById('disclaimerText'),
    langButtons: document.querySelectorAll('.lang-switch button'),
    savingsFooter: document.getElementById('savingsFooter'),
    savingsTotal: document.getElementById('savingsTotal'),
    savingsLabel: document.getElementById('savingsLabel'),
    savingsReset: document.getElementById('savingsReset'),
    savingsResetLabel: document.getElementById('savingsResetLabel'),
    slipModal: document.getElementById('slipModal'),
    slipTitle: document.getElementById('slipTitle'),
    slipClose: document.getElementById('slipClose'),
    slipCloseLabel: document.getElementById('slipCloseLabel'),
    slipBody: document.getElementById('slipBody'),
    slipWhatsapp: document.getElementById('slipWhatsapp'),
    slipWhatsappLabel: document.getElementById('slipWhatsappLabel'),
  };

  /* ---------- i18n ---------- */

  function t(key) {
    return TEXTS[lang][key] || key;
  }

  function applyLang() {
    document.documentElement.lang = lang;
    els.langButtons.forEach((btn) => {
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
    });
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder || el.dataset.i18n);
    });
    renderChips();
    renderDisclaimer();
    renderFooter();
    renderResults(currentQuery, search(currentQuery));
  }

  /* ---------- quick-tap chips ---------- */

  function renderChips() {
    if (!els.chips) return;
    els.chips.innerHTML = '';
    QUICK_CHIPS.forEach((chip) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'chip';
      btn.setAttribute('aria-pressed', 'false');
      btn.dataset.brand = chip.brand;
      btn.innerHTML = `
        <span class="chip-condition">${lang === 'hi' ? chip.conditionHi : chip.condition}</span>
        <span class="chip-brand">${lang === 'hi' ? chip.brandHi : chip.brand}</span>
      `;
      btn.addEventListener('click', () => {
        els.q.value = chip.brand;
        els.q.focus();
        els.q.dispatchEvent(new Event('input', { bubbles: true }));
      });
      els.chips.appendChild(btn);
    });
  }

  /* ---------- built-in offline fuzzy engine ---------- */

  function levenshtein(a, b) {
    a = String(a).toLowerCase();
    b = String(b).toLowerCase();
    const m = a.length, n = b.length;
    if (!m) return n;
    if (!n) return m;
    let prev = Array.from({ length: n + 1 }, (_, i) => i);
    for (let i = 1; i <= m; i++) {
      const curr = [i];
      for (let j = 1; j <= n; j++) {
        curr.push(Math.min(
          prev[j] + 1,
          curr[j - 1] + 1,
          prev[j - 1] + (a[i - 1] !== b[j - 1] ? 1 : 0)
        ));
      }
      prev = curr;
    }
    return prev[n];
  }

  function trigramSet(s) {
    s = String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
    const set = new Set();
    for (let i = 0; i + 2 < s.length; i++) set.add(s.slice(i, i + 3));
    return set;
  }

  function trigramOverlap(q, s) {
    const qt = trigramSet(q);
    if (qt.size === 0) return 0;
    const st = trigramSet(s);
    let inter = 0;
    for (const t of qt) if (st.has(t)) inter++;
    return inter / qt.size;
  }

  function fieldScore(qLower, field) {
    const fl = String(field).toLowerCase();
    if (!fl) return 0;

    // Exact match.
    if (fl === qLower) return 200;

    // Prefix match: "pan" for "pan-d" is almost always the user's intent.
    if (fl.startsWith(qLower)) return 160;

    // Substring match, scored relative to the QUERY length so a long generic
    // name ("amoxicillin + potassium clavulanate") does not look close to a
    // short query just because both are long strings.
    if (fl.includes(qLower)) {
      const rel = qLower.length / fl.length;
      return 90 + 40 * rel;
    }

    // Word-boundary match: "dolo" in "dolo 650".
    const words = fl.split(/[^a-z0-9]+/).filter(Boolean);
    if (words.some((w) => w.startsWith(qLower))) {
      return 70 + 30 * (qLower.length / Math.max(...words.map((w) => w.length)));
    }

    let best = 0;

    // Levenshtein, normalised by the query length: only near-misses of a short
    // query should score, not incidental similarity of a long field.
    const dist = levenshtein(qLower, fl);
    const normDist = dist / qLower.length;
    if (normDist <= 0.5) {
      best = Math.max(best, 55 * (1 - normDist));
    }

    // Trigram overlap.
    best = Math.max(best, 40 * trigramOverlap(qLower, fl));

    return best;
  }

  function scoreMedicine(qLower, med) {
    const fields = [
      med.brand_name,
      ...med.common_typos.split(',').map((t) => t.trim()).filter(Boolean),
      med.generic_name,
    ];
    let best = 0;
    for (const f of fields) {
      best = Math.max(best, fieldScore(qLower, f));
    }
    return best;
  }

  const BUILTIN_MIN_SCORE = 45;

  function builtinSearch(q) {
    const qLower = q.toLowerCase().trim();
    if (!qLower) return [];
    return medicines
      .map((med) => ({ med, score: scoreMedicine(qLower, med) }))
      .filter((x) => x.score >= BUILTIN_MIN_SCORE)
      .sort((a, b) => b.score - a.score || a.med.brand_name.localeCompare(b.med.brand_name))
      .slice(0, 20)
      .map((x) => x.med);
  }

  /* ---------- Fuse.js ---------- */

  function initFuse() {
    if (typeof window.Fuse === 'function') {
      fuse = new window.Fuse(medicines, {
        threshold: 0.3,
        ignoreLocation: true,
        minMatchCharLength: 2,
        includeScore: true,
        keys: [
          { name: 'brand_name', weight: 0.6 },
          { name: 'common_typos', weight: 0.25 },
          { name: 'generic_name', weight: 0.15 },
        ],
      });
      engine = 'fuse';
    } else {
      engine = 'builtin';
    }
    updateEngineBadge();
  }

  function fuseSearch(q) {
    if (!fuse) return builtinSearch(q);
    const qLower = q.toLowerCase().trim();
    const res = fuse.search(q);
    // Fuse finds the candidate set; the local scorer ranks it. This keeps the
    // online and offline engines producing the same order for the same query.
    return res
      .map((r) => ({ med: r.item, score: scoreMedicine(qLower, r.item) }))
      .filter((x) => x.score >= BUILTIN_MIN_SCORE)
      .sort((a, b) => b.score - a.score || a.med.brand_name.localeCompare(b.med.brand_name))
      .map((x) => x.med);
  }

  function search(q) {
    return engine === 'fuse' ? fuseSearch(q) : builtinSearch(q);
  }

  /* ---------- data loading ---------- */

  async function loadMedicines() {
    try {
      const res = await fetch(DATA_URL, { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      medicines = await res.json();
    } catch (err) {
      console.warn('JanDawai: could not fetch dataset, trying cache', err);
      // Cache-only fallback (service worker may have it).
      const cached = await caches.match(DATA_URL);
      if (cached) medicines = await cached.json();
      else medicines = [];
    }
    initFuse();
    renderResults(currentQuery, search(currentQuery));
  }

  /* ---------- helpers ---------- */

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s == null ? '' : String(s);
    return div.innerHTML;
  }

  function money(n) {
    return '₹' + Number(n).toLocaleString('en-IN');
  }

  function savingsPct(branded, ja) {
    if (!branded) return 0;
    return Math.round(((branded - ja) / branded) * 100);
  }

  /* ---------- savings wallet ("Parche Mein Jode") ---------- */

  function walletEntry(med) {
    let entry = wallet.get(med.id);
    if (!entry) {
      entry = { savings: med.branded_mrp - med.janaushadhi_mrp, yearly: false, added: false };
      wallet.set(med.id, entry);
    }
    return entry;
  }

  // What the user banks: 12 months' worth when the daily-medicine checkbox is
  // ticked, otherwise a single course.
  function effectiveSavings(med) {
    const entry = walletEntry(med);
    return entry.savings * (entry.yearly ? 12 : 1);
  }

  function totalSavings() {
    let sum = 0;
    for (const entry of wallet.values()) {
      if (entry.added) sum += entry.savings * (entry.yearly ? 12 : 1);
    }
    return sum;
  }

  function renderFooter() {
    if (!els.savingsFooter) return;
    const total = totalSavings();
    els.savingsLabel.textContent = t('kulBachat');
    els.savingsTotal.textContent = money(total);
    els.savingsFooter.hidden = total <= 0;
    if (els.savingsResetLabel) els.savingsResetLabel.textContent = t('resetTotal');
  }

  function toggleWallet(med, btn) {
    const entry = walletEntry(med);
    entry.added = !entry.added;
    renderFooter();
    if (btn) {
      btn.classList.toggle('is-added', entry.added);
      btn.textContent = entry.added ? t('savedButton') : t('saveButton');
    }
  }

  function resetWallet() {
    wallet.clear();
    renderFooter();
    // Cards keep their own toggle state, so re-render to reset the labels.
    renderResults(currentQuery, search(currentQuery));
  }

  /* ---------- Chemist Slip modal ---------- */

  function buildSlip(med) {
    const code = med.id || '—';
    els.slipBody.innerHTML = `
      <div class="slip-row">
        <span class="slip-label">${escapeHtml(t('slipSalt'))}</span>
        <span class="slip-value">${escapeHtml(med.generic_name)}</span>
      </div>
      <div class="slip-row">
        <span class="slip-label">${escapeHtml(t('slipStrength'))}</span>
        <span class="slip-value">${escapeHtml(med.strength)}</span>
      </div>
      <div class="slip-row">
        <span class="slip-label">${escapeHtml(t('slipCode'))}</span>
        <span class="slip-value code">${escapeHtml(code)}</span>
      </div>
      <p class="slip-note">${escapeHtml(t('slipNote'))}</p>
    `;

    const text = [
      'Jan Aushadhi Chemist Slip',
      `${t('slipSalt')}: ${med.generic_name}`,
      `${t('slipStrength')}: ${med.strength}`,
      `${t('slipCode')}: ${code}`,
    ].join('\n');

    els.slipWhatsapp.href = 'https://wa.me/?text=' + encodeURIComponent(text);
  }

  function openSlip(med) {
    lastFocus = document.activeElement;
    buildSlip(med);
    els.slipTitle.textContent = t('slipTitle');
    els.slipCloseLabel.textContent = t('closeModal');
    els.slipWhatsappLabel.textContent = t('whatsapp');
    els.slipModal.hidden = false;
    document.body.classList.add('modal-open');
    els.slipClose.focus();
  }

  function closeSlip() {
    els.slipModal.hidden = true;
    document.body.classList.remove('modal-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    lastFocus = null;
  }

  /* ---------- Bol Ke Suno (speech) ---------- */

  function hindiVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    return (
      voices.find((v) => v.lang === 'hi-IN') ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('hi')) ||
      null
    );
  }

  function speak(med, noteEl) {
    if (!('speechSynthesis' in window)) {
      noteEl.hidden = false;
      noteEl.textContent = t('speakUnsupported');
      return;
    }
    const amount = effectiveSavings(med);
    const text = `Iska generic salt ${med.generic_name} hai, aur aapki bachat ${amount} rupaye hai.`;

    window.speechSynthesis.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'hi-IN';
    const voice = hindiVoice();
    if (voice) utter.voice = voice;
    utter.rate = 0.95;
    utter.pitch = 1;

    noteEl.hidden = false;
    noteEl.textContent = t('speaking');
    utter.onend = () => { noteEl.textContent = ''; };
    utter.onerror = () => { noteEl.textContent = ''; };

    window.speechSynthesis.speak(utter);
  }

  /* ---------- rendering ---------- */

  function promptEl() {
    const p = document.createElement('p');
    p.className = 'prompt';
    p.textContent = t('typeToSearch');
    return p;
  }

  function notfoundEl(query) {
    const box = document.createElement('div');
    box.className = 'notfound';
    box.innerHTML = `
      <strong>${t('guardrail')}</strong>
      <p>${t('closeMatches')} — "${escapeHtml(query)}".</p>
      <p class="hint">${t('notFoundHint')}</p>
    `;
    return box;
  }

  function buildCard(med) {
    const article = document.createElement('article');
    article.className = 'card';
    article.setAttribute('role', 'listitem');
    article.tabIndex = 0;

    const savings = med.branded_mrp - med.janaushadhi_mrp;
    const pct = savingsPct(med.branded_mrp, med.janaushadhi_mrp);
    const useLabel = t('headerUse');
    const entry = walletEntry(med);

    article.innerHTML = `
      <div class="card-head">
        <h2 class="card-brand">${escapeHtml(med.brand_name)}</h2>
        <div class="card-tags">
          <span class="tag">${med.is_chronic ? 'लंबी बीमारी / Chronic' : 'तात्कालिक / Acute'}</span>
        </div>
      </div>
      <p class="savings-line">
        <span class="was">${money(med.branded_mrp)}</span>
        <span class="arrow">&#8594;</span>
        <span class="now">${money(med.janaushadhi_mrp)}</span>
      </p>
      <p class="savings-sub">
        ${t('bachat')} <strong>${money(savings)}</strong> (${pct}%)
      </p>
      <p class="yearly" hidden>
        ${escapeHtml(t('yearlyLine'))}: <strong>${money(savings * 12)}</strong>
      </p>
      <label class="yearly-check">
        <input type="checkbox" class="yearly-toggle"${entry.yearly ? ' checked' : ''}>
        <span>${escapeHtml(t('yearlyLabel'))}</span>
        <span class="yearly-hint">${escapeHtml(t('yearlyHint'))}</span>
      </label>
      <div class="card-body">
        <div class="field">
          <span class="field-label">${t('headerGeneric')}</span>
          <span class="field-value big">${escapeHtml(med.generic_name)}</span>
        </div>
        <div class="strength-row">
          <span class="pill-strong">${t('headerStrength')}: ${escapeHtml(med.strength)}</span>
          <span class="pill-pack">${t('headerPack')}: ${escapeHtml(med.pack_size)}</span>
        </div>
        <div class="field">
          <span class="field-label">${useLabel}</span>
          <span class="field-value" lang="hi">${escapeHtml(med.use_hi)}</span>
        </div>
        <p class="ask-doc">${t('askDocCard')}</p>
        <div class="card-actions">
          <button type="button" class="btn btn-slip" data-action="slip">
            <span aria-hidden="true">📝</span>
            <span>${escapeHtml(t('slipButton'))}</span>
          </button>
          <button type="button" class="btn btn-speak" data-action="speak">
            <span aria-hidden="true">🔊</span>
            <span>${escapeHtml(t('speakButton'))}</span>
          </button>
          <button type="button" class="btn btn-save${entry.added ? ' is-added' : ''}" data-action="save">
            <span aria-hidden="true">🧾</span>
            <span>${escapeHtml(entry.added ? t('savedButton') : t('saveButton'))}</span>
          </button>
        </div>
        <p class="speak-note" role="status" aria-live="polite" hidden></p>
      </div>
    `;

    const yearlyStrip = article.querySelector('.yearly');
    const yearlyToggle = article.querySelector('.yearly-toggle');
    const noteEl = article.querySelector('.speak-note');

    if (entry.yearly) yearlyStrip.hidden = false;

    yearlyToggle.addEventListener('click', (e) => e.stopPropagation());
    yearlyToggle.addEventListener('change', (e) => {
      e.stopPropagation();
      entry.yearly = yearlyToggle.checked;
      yearlyStrip.hidden = !entry.yearly;
      renderFooter();
    });

    article.querySelectorAll('.card-actions .btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        if (action === 'slip') {
          openSlip(med);
        } else if (action === 'speak') {
          speak(med, noteEl);
        } else if (action === 'save') {
          toggleWallet(med, btn);
        }
      });
    });

    article.addEventListener('click', () => {
      els.q.value = med.brand_name;
      els.q.focus();
      els.q.dispatchEvent(new Event('input', { bubbles: true }));
    });

    return article;
  }

  function renderResults(query, matches) {
    const container = els.results;
    container.innerHTML = '';

    if (!query) {
      container.appendChild(promptEl());
      return;
    }

    const note = document.createElement('p');
    note.className = 'disambig-note';
    note.textContent = t('disambig').replace('{n}', String(matches.length));
    container.appendChild(note);

    if (matches.length === 0) {
      container.appendChild(notfoundEl(query));
      return;
    }

    matches.forEach((med) => {
      container.appendChild(buildCard(med));
    });
  }

  function updateBadges(matches) {
    if (matches.length === 1) {
      els.countBadge.textContent = t('countOne');
    } else {
      els.countBadge.textContent = t('countMany').replace('{n}', String(matches.length));
    }
    updateEngineBadge();
  }

  function updateEngineBadge() {
    els.engineBadge.textContent = engine === 'fuse' ? t('engineFuse') : t('engineBuiltin');
  }

  function doSearch() {
    const q = els.q.value.trim();
    currentQuery = q;
    if (q) {
      els.clear.hidden = false;
    } else {
      els.clear.hidden = true;
    }
    const matches = search(q);
    renderResults(q, matches);
    updateBadges(matches);
  }

  /* ---------- disclaimer ---------- */

  function renderDisclaimer() {
    const p = els.disclaimerText;
    p.innerHTML = '';
    const strong = document.createElement('strong');
    strong.textContent = t('disclaimerTitle') + ' ';
    p.appendChild(strong);
    p.appendChild(document.createTextNode(t('disclaimer')));
  }

  /* ---------- wiring ---------- */

  function wireEvents() {
    els.q.addEventListener('input', doSearch);
    els.q.addEventListener('focus', () => {
      els.q.select ? els.q.select() : null;
    });

    els.clear.addEventListener('click', () => {
      els.q.value = '';
      els.clear.hidden = true;
      currentQuery = '';
      renderResults('', []);
      updateBadges([]);
    });

    els.langButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        lang = btn.dataset.lang;
        applyLang();
      });
    });

    if (els.savingsReset) {
      els.savingsReset.addEventListener('click', resetWallet);
    }

    if (els.slipClose) {
      els.slipClose.addEventListener('click', closeSlip);
    }

    if (els.slipModal) {
      els.slipModal.addEventListener('click', (e) => {
        if (e.target === els.slipModal) closeSlip();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && els.slipModal && !els.slipModal.hidden) closeSlip();
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  /* ---------- boot ---------- */

  document.addEventListener('DOMContentLoaded', () => {
    renderDisclaimer();
    renderChips();
    renderFooter();
    wireEvents();
    loadMedicines();
  });

})();
