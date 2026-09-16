(() => {
  'use strict';
  document.body.classList.add('enhanced');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  menu.hidden = false;
  const closeMenu = () => { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); };
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); }
  });

  const positions = {
    P1: ['P1 is the short-distance, unrotated source.', '50 mm / 0°. It provides the reference corner within the permitted source geometries.'],
    P2: ['P2 shares the target angle, but not its distance.', '50 mm / 45°. It is a source domain and is also weak under within-position diagnostics. P4 was not proven uniquely difficult.'],
    P3: ['P3 shares the target distance, but not its angle.', '150 mm / 0°. The source data include the longer distance without the rotated acquisition angle.'],
    P4: ['P4 combines two familiar factors in an unseen way.', 'P2 supplies the angle; P3 supplies the distance. Their joint corner stays outside source-only development.']
  };
  document.querySelectorAll('[data-position]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-position]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const [lead, copy] = positions[button.dataset.position];
    const strong = document.createElement('strong'); strong.textContent = lead;
    document.querySelector('#geometry-caption').replaceChildren(strong, document.createTextNode(' ' + copy));
  }));

  const sweeps = document.querySelector('#sweep-grid');
  for (let index = 0; index < 50; index++) { const dot = document.createElement('i'); dot.setAttribute('aria-hidden', 'true'); sweeps.append(dot); }
  document.querySelectorAll('[data-group-mode]').forEach(button => button.addEventListener('click', () => {
    const grouped = button.dataset.groupMode === 'blocks';
    document.querySelectorAll('[data-group-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    sweeps.classList.toggle('grouped', grouped);
    sweeps.setAttribute('aria-label', grouped ? 'Fifty repeated sweeps enclosed as one physical condition block' : 'Fifty rows, all repeated sweeps of the same physical condition');
    document.querySelector('#block-caption').textContent = grouped
      ? 'One condition. One split assignment. All 50 sweeps remain together across the principal train/test boundaries.'
      : 'Fifty rows, one physical condition. Splitting these repeated sweeps independently could place related measurements on both sides of a train/test boundary.';
  }));

  // Read the accessible source tables so displayed charts cannot drift from their tabular values.
  const rows = id => Array.from(document.querySelectorAll('#' + id + ' tbody tr')).map(row => Array.from(row.cells).map(cell => cell.textContent.trim()));
  const number = value => Number(value.replace('−', '-'));
  const seedRows = rows('seed-data');
  const seedChart = document.querySelector('#seed-chart');
  seedChart.innerHTML = seedRows.map(row => '<div class="chart-row"><span>Seed ' + row[0] + '</span><span class="chart-track"><i class="chart-bar" style="--bar:' + (number(row[2]) / .25 * 100) + '%"></i></span><strong>' + (number(row[2]) * 100).toFixed(2) + '%</strong></div>').join('')
    + '<div class="chart-axis seed-axis"><span>0</span><span>25%</span></div><p class="chart-reference">Dashed line: uniform-random accuracy reference, 14.29%</p>';
  const representationChart = document.querySelector('#representation-chart');
  representationChart.innerHTML = rows('representation-data').map(row => '<div class="rep-group"><div class="rep-heading"><strong>' + row[0] + '</strong><span>' + (row[0] === 'P4' ? 'Encoder-clean' : 'Familiar') + '</span></div><div class="rep-bars">' + row.slice(1).map((value, i) => '<div class="rep-bar ' + ['raw-key', 'diff-key', 'embed-key'][i] + '" style="--bar:' + number(value) * 100 + '%" data-value="' + number(value).toFixed(3) + '" role="img" aria-label="' + row[0] + ' ' + ['RAW', 'First difference', 'Embedding'][i] + ', Macro-F1 ' + value + '"></div>').join('') + '</div><div class="rep-axis"><span>Bar height: 0–1 Macro-F1</span></div></div>').join('');
  const effectChart = document.querySelector('#effect-chart');
  const x = value => (value + .08) / .16 * 100;
  effectChart.innerHTML = rows('effect-data').map(row => {
    const delta = number(row[3]), low = number(row[4]), high = number(row[5]);
    const signed = value => (value >= 0 ? '+' : '−') + Math.abs(value).toFixed(4);
    return '<div class="effect-row"><strong>' + row[0] + '</strong><div class="effect-track" role="img" aria-label="' + row[0] + ' effect ' + signed(delta) + ', 95 percent interval ' + signed(low) + ' to ' + signed(high) + '"><i class="effect-interval" style="--low:' + x(low) + '%;--width:' + (x(high)-x(low)) + '%"></i><i class="effect-dot" style="--point:' + x(delta) + '%"></i></div><span class="effect-value">' + signed(delta) + ' [' + signed(low) + ', ' + signed(high) + ']</span></div>';
  }).join('') + '<div class="chart-axis effect-axis"><span>−0.08</span><span>0</span><span>+0.08</span></div>';

  const panelButtons = Array.from(document.querySelectorAll('[data-panel]'));
  const showPanel = id => {
    if (!panelButtons.some(button => button.dataset.panel === id)) return;
    panelButtons.forEach(button => {
      const selected = button.dataset.panel === id;
      button.setAttribute('aria-pressed', String(selected));
      document.getElementById(button.dataset.panel).hidden = !selected;
    });
  };
  showPanel('representation');
  panelButtons.forEach(button => button.addEventListener('click', () => showPanel(button.dataset.panel)));
  document.querySelectorAll('[data-open-panel]').forEach(link => link.addEventListener('click', () => showPanel(link.dataset.openPanel)));
  const openHash = () => {
    const id = decodeURIComponent(location.hash.slice(1));
    if (['signal', 'representation', 'readout'].includes(id)) showPanel(id);
    const element = document.getElementById(id);
    if (element) {
      for (let parent = element; parent; parent = parent.parentElement) {
        if (parent instanceof HTMLDetailsElement) parent.open = true;
      }
    }
  };
  openHash(); window.addEventListener('hashchange', openHash);

  const chapterLinks = Array.from(document.querySelectorAll('.chapter-nav a'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (!visible) return;
      chapterLinks.forEach(link => {
        if (link.hash === '#' + visible.target.id) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, {rootMargin:'-140px 0px -50% 0px', threshold:0});
    chapterLinks.forEach(link => { const section = document.querySelector(link.hash); if(section) observer.observe(section); });
  }

  const dialog = document.querySelector('#figure-dialog');
  const expanded = document.querySelector('#expanded-figure');
  let figureTrigger;
  document.querySelectorAll('[data-figure]').forEach(link => link.addEventListener('click', event => {
    if (typeof dialog.showModal !== 'function') return;
    event.preventDefault(); figureTrigger = link;
    expanded.src = link.href; expanded.alt = link.querySelector('img').alt;
    dialog.showModal();
  }));
  document.querySelector('#close-figure').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => { expanded.removeAttribute('src'); if (figureTrigger) figureTrigger.focus(); });
})();
