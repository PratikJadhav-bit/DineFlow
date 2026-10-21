/* =============================================
   DINEFLOW — APP.JS
   All interactive features, data, and animations
   ============================================= */

'use strict';

// ===== DATA =====
const FOOD_ITEMS = [
  { emoji:'🥩', name:'Wagyu Beef Steak', price:'$64', rating:'⭐ 4.9', cat:'mains', desc:'A5 wagyu, truffle jus, smoked bone marrow', badge:'hot' },
  { emoji:'🦞', name:'Butter Poached Lobster', price:'$78', rating:'⭐ 4.8', cat:'mains', desc:'Maine lobster, saffron bisque, caviar butter', badge:'ai' },
  { emoji:'🍝', name:'Black Truffle Risotto', price:'$42', rating:'⭐ 4.9', cat:'mains', desc:'Carnaroli rice, Périgord truffle, aged parmigiano', badge:'ai' },
  { emoji:'🦀', name:'King Crab Bisque', price:'$32', rating:'⭐ 4.7', cat:'starters', desc:'Alaskan king crab, roasted pepper cream', badge:'new' },
  { emoji:'🥗', name:'Heirloom Tomato Salad', price:'$18', rating:'⭐ 4.6', cat:'starters', desc:'Rainbow tomatoes, burrata, basil oil, fleur de sel', badge:null },
  { emoji:'🍷', name:'Sommelier\'s Selection', price:'$24', rating:'⭐ 4.9', cat:'drinks', desc:'Curated glass from our cellar of 2000+ bottles', badge:'ai' },
  { emoji:'🍰', name:'Molten Chocolate Fondant', price:'$22', rating:'⭐ 4.8', cat:'desserts', desc:'Valrhona chocolate, salted caramel, vanilla cream', badge:'hot' },
  { emoji:'🍜', name:'Parisian Onion Soup', price:'$24', rating:'⭐ 4.7', cat:'starters', desc:'Classic gratinée, Comté cheese, croutons', badge:null },
  { emoji:'🐟', name:'Sea Bass en Papillote', price:'$52', rating:'⭐ 4.8', cat:'mains', desc:'Mediterranean sea bass, herbs de Provence, lemon', badge:'new' },
  { emoji:'🍹', name:'Artisan Cocktail', price:'$16', rating:'⭐ 4.7', cat:'drinks', desc:'House signature, seasonal botanicals, rare spirits', badge:'new' },
  { emoji:'🍮', name:'Crème Brûlée Trio', price:'$24', rating:'⭐ 4.9', cat:'desserts', desc:'Vanilla, lavender, espresso — caramelized perfection', badge:'ai' },
  { emoji:'🥂', name:'Krug Champagne', price:'$35', rating:'⭐ 5.0', cat:'drinks', desc:'House pour — Grande Cuvée, perfectly chilled', badge:null },
];

const FEATURES = [
  { icon:'📱', title:'QR Digital Menu', desc:'Beautiful scannable menus with real-time pricing, availability, and AI-powered upsell suggestions.', tag:'Guest Experience' },
  { icon:'🪑', title:'Table Reservations', desc:'AI-optimized booking with wait prediction, seating intelligence, and automated guest communications.', tag:'Reservations' },
  { icon:'🧠', title:'AI Customer Intelligence', desc:'Build rich guest profiles tracking preferences, allergies, anniversaries, and behavioral patterns.', tag:'AI Core' },
  { icon:'👨‍🍳', title:'Smart Kitchen Workflow', desc:'KDS integration with automated priority queuing, cook-time prediction, and waste reduction analytics.', tag:'Operations' },
  { icon:'📊', title:'Live Order Management', desc:'Real-time dashboard showing every order from placement to delivery with automated status updates.', tag:'Operations' },
  { icon:'📈', title:'AI Demand Forecasting', desc:'Machine learning models predict covers, revenue, and inventory needs up to 30 days in advance.', tag:'AI Core' },
  { icon:'⏱️', title:'Wait Time Prediction', desc:'Deep learning models trained on historical data to give guests accurate, real-time wait estimates.', tag:'AI Core' },
  { icon:'💎', title:'Loyalty Program', desc:'Points, tiers, perks and surprise rewards — all automatically managed by AI for maximum retention.', tag:'CRM' },
  { icon:'💳', title:'Smart Billing', desc:'AI-generated itemized bills, split payments, loyalty redemption, and instant digital receipts.', tag:'Payments' },
  { icon:'🚴', title:'Delivery Management', desc:'Integrated delivery tracking with route optimization, ETA prediction, and driver performance scoring.', tag:'Delivery' },
  { icon:'🍽️', title:'AI Food Recommendations', desc:'Hyper-personalized menu suggestions based on past orders, dietary profile, and trending dishes.', tag:'AI Core' },
  { icon:'📉', title:'Peak-Hour Analytics', desc:'Heatmaps, staffing optimization, and revenue maximization tools for your busiest periods.', tag:'Analytics' },
  { icon:'👥', title:'Staff Performance', desc:'360-degree staff insights including efficiency scores, customer ratings, and training recommendations.', tag:'HR' },
];

const KITCHEN_STATIONS = [
  { name:'Grill & Sauté', status:'busy', orders:[
    { dot:'amber', text:'Table 4 — Wagyu x2', time:'8m' },
    { dot:'green', text:'Table 9 — Sea Bass', time:'3m' },
    { dot:'red', text:'Table 2 — Duck Confit', time:'15m' },
  ]},
  { name:'Cold Kitchen', status:'active', orders:[
    { dot:'green', text:'Table 6 — Heirloom Salad', time:'2m' },
    { dot:'green', text:'Table 1 — Oysters', time:'1m' },
  ]},
  { name:'Pastry & Desserts', status:'active', orders:[
    { dot:'amber', text:'Table 7 — Fondant x3', time:'10m' },
    { dot:'green', text:'Table 3 — Crème Brûlée', time:'5m' },
  ]},
  { name:'Soup & Sauce', status:'idle', orders:[
    { dot:'green', text:'Table 8 — Bisque', time:'2m' },
  ]},
  { name:'Bar & Beverages', status:'active', orders:[
    { dot:'green', text:'Table 5 — Krug x4', time:'1m' },
    { dot:'green', text:'Table 11 — Cocktails x2', time:'1m' },
    { dot:'amber', text:'Table 4 — Wine Pairing', time:'6m' },
  ]},
  { name:'Plating & Expo', status:'busy', orders:[
    { dot:'red', text:'Table 2 — Full Course', time:'18m' },
    { dot:'amber', text:'Table 10 — Tasting Menu', time:'12m' },
  ]},
];

const LIVE_ORDERS = [
  { table:'T4', items:'Wagyu x2, Risotto x1, Krug x2', guests:4, status:'preparing', statusClass:'pill-preparing', total:'$248', time:'Placed 18 min ago' },
  { table:'T9', items:'Lobster x1, Sea Bass x1, Cocktail x2', guests:2, status:'ready', statusClass:'pill-ready', total:'$162', time:'Placed 8 min ago' },
  { table:'T2', items:'7-Course Tasting Menu x4', guests:4, status:'preparing', statusClass:'pill-preparing', total:'$520', time:'Placed 32 min ago' },
  { table:'T7', items:'King Crab Bisque x2, Salad x1', guests:2, status:'delivered', statusClass:'pill-delivered', total:'$82', time:'Placed 42 min ago' },
  { table:'T1', items:'Oysters x12, Champagne x2', guests:6, status:'pending', statusClass:'pill-pending', total:'$144', time:'Placed 2 min ago' },
  { table:'T11', items:'Truffle Pasta x3, Red Wine x3', guests:3, status:'preparing', statusClass:'pill-preparing', total:'$186', time:'Placed 14 min ago' },
];

const STAFF = [
  { initials:'JL', name:'James Laurent', role:'Head Chef', rating:4.9, covers:142, rating_count:38 },
  { initials:'SF', name:'Sophie Fontaine', role:'Sommelier', rating:4.8, covers:89, rating_count:24 },
  { initials:'MR', name:'Marco Ricci', role:'Maître d\'', rating:4.9, covers:210, rating_count:52 },
  { initials:'AL', name:'Amara Levi', role:'Sous Chef', rating:4.7, covers:98, rating_count:30 },
  { initials:'RK', name:'René Kowalski', role:'Pastry Chef', rating:4.8, covers:76, rating_count:22 },
  { initials:'NC', name:'Naomi Chen', role:'Bar Manager', rating:4.9, covers:118, rating_count:41 },
];

const DELIVERIES = [
  { id:'#D-2841', status:'En Route', statusColor:'#28c840', from:'DineFlow Central', to:'52 Rue Rivoli', eta:'12 min', rider:'🚴' },
  { id:'#D-2840', status:'Preparing', statusColor:'#febc2e', from:'DineFlow Central', to:'8 Ave Montaigne', eta:'25 min', rider:'⏳' },
  { id:'#D-2839', status:'Delivered', statusColor:'#c8a96e', from:'DineFlow Central', to:'19 Blvd Haussmann', eta:'Done', rider:'✅' },
];

const DEMAND_ITEMS = [
  { emoji:'🥩', name:'Wagyu Steak', pct:92 },
  { emoji:'🦞', name:'Poached Lobster', pct:78 },
  { emoji:'🍝', name:'Truffle Risotto', pct:85 },
  { emoji:'🍷', name:'Wine Pairings', pct:70 },
  { emoji:'🍰', name:'Chocolate Fondant', pct:88 },
];

const CX_METRICS = [
  { name:'Food Quality', value:97 },
  { name:'Service Speed', value:88 },
  { name:'Ambiance', value:95 },
  { name:'Value', value:82 },
];

const LIVE_INSIGHTS = [
  { icon:'🔥', text:'<strong>Peak hour starting</strong> in 38 minutes — recommend adding 2 waitstaff.' },
  { icon:'📦', text:'<strong>Wagyu stock low</strong> — 4 portions remaining. AI suggests featuring lobster.' },
  { icon:'⭐', text:'VIP guest <strong>Alexandra Chen</strong> has table #7 tonight. Preferred: window seat, Bordeaux.' },
  { icon:'📈', text:'Revenue <strong>23% above forecast</strong> for this Friday evening.' },
];

const LOYALTY_TIERS = [
  { icon:'🥉', name:'Bronze', req:'0–999 pts', badge:'Starter' },
  { icon:'🥈', name:'Silver', req:'1,000–2,999 pts', badge:'Regular' },
  { icon:'🥇', name:'Gold', req:'3,000–4,999 pts', badge:'Valued' },
  { icon:'💎', name:'Platinum', req:'5,000+ pts', badge:'Elite' },
];

const LOYALTY_PERKS = [
  { icon:'🍾', title:'Complimentary Welcome Drink', desc:'On every visit' },
  { icon:'🎂', title:'Birthday Surprise', desc:'Special dessert & wishes' },
  { icon:'🪑', title:'Priority Reservations', desc:'24h early access' },
  { icon:'💸', title:'10% Off Every Bill', desc:'Automatic deduction' },
];

const BILL_ITEMS = [
  { emoji:'🥩', name:'Wagyu Beef Steak', qty:'×2', price:'$128' },
  { emoji:'🍝', name:'Truffle Risotto', qty:'×1', price:'$42' },
  { emoji:'🥗', name:'Heirloom Salad', qty:'×1', price:'$18' },
  { emoji:'🍷', name:'Sommelier Selection', qty:'×3', price:'$72' },
  { emoji:'🍮', name:'Crème Brûlée Trio', qty:'×2', price:'$48' },
];

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNavbar();
  initParticles();
  initCounters();
  initShowcase();
  initFeaturesGrid();
  initMenuSection();
  initTableMap();
  initReservationForm();
  initDashboard();
  initAnalytics();
  initLoyalty();
  initBilling();
  initContactForm();
  initModals();
  initReveal();
  initQRCode();
  initWaitPrediction();
  initLiveUpdates();
});

// ===== PRELOADER =====
function initPreloader() {
  const preloader = document.getElementById('preloader');
  setTimeout(() => { preloader.classList.add('hidden'); }, 2400);
}

// ===== CURSOR =====
function initCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px'; dot.style.top = mouseY + 'px';
  });

  function animRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px'; ring.style.top = ringY + 'px';
    requestAnimationFrame(animRing);
  }
  animRing();

  const hoverTargets = document.querySelectorAll('a,button,.feature-card,.menu-item-card,.showcase-card,.tier-item,.lc-front');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveNav();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
}

// ===== PARTICLES =====
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${2 + Math.random() * 3}px;
      height: ${2 + Math.random() * 3}px;
      animation-duration: ${6 + Math.random() * 14}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${0.3 + Math.random() * 0.5};
    `;
    container.appendChild(p);
  }
}

// ===== COUNTERS =====
function initCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number[data-target]').forEach(el => {
          animateCounter(el, parseInt(el.dataset.target));
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) observer.observe(heroStats);
}
function animateCounter(el, target) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

// ===== FOOD SHOWCASE =====
function initShowcase() {
  const track = document.getElementById('showcaseTrack');
  if (!track) return;
  const allItems = [...FOOD_ITEMS, ...FOOD_ITEMS]; // duplicate for seamless loop
  allItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'showcase-card';
    card.innerHTML = `
      <div class="showcase-img">${item.emoji}</div>
      <div class="showcase-info">
        <div class="showcase-name">${item.name}</div>
        <div class="showcase-meta">
          <span class="showcase-price">${item.price}</span>
          <span class="showcase-rating">${item.rating}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', () => showToast(`${item.emoji} ${item.name} added to your wishlist!`));
    track.appendChild(card);
  });
}

// ===== FEATURES GRID =====
function initFeaturesGrid() {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  FEATURES.forEach((f, i) => {
    const card = document.createElement('div');
    card.className = 'feature-card reveal';
    card.style.transitionDelay = `${i * 0.05}s`;
    card.innerHTML = `
      <span class="feature-icon">${f.icon}</span>
      <div class="feature-title">${f.title}</div>
      <p class="feature-desc">${f.desc}</p>
      <span class="feature-tag">${f.tag}</span>
    `;
    grid.appendChild(card);
  });
}

// ===== QR CODE =====
function initQRCode() {
  const grid = document.getElementById('qrGrid');
  if (!grid) return;
  for (let i = 0; i < 100; i++) {
    const px = document.createElement('div');
    px.className = Math.random() > 0.45 ? 'qr-pixel' : 'qr-pixel white';
    // Make corners solid for realistic look
    const row = Math.floor(i / 10), col = i % 10;
    if ((row < 3 && col < 3) || (row < 3 && col > 6) || (row > 6 && col < 3)) px.className = 'qr-pixel';
    grid.appendChild(px);
  }
}

// ===== MENU SECTION =====
function initMenuSection() {
  renderMenuItems('all');
  document.getElementById('menuCategories')?.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenuItems(btn.dataset.cat);
    });
  });
}

function renderMenuItems(cat) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;
  const filtered = cat === 'all' ? FOOD_ITEMS : FOOD_ITEMS.filter(i => i.cat === cat);
  grid.innerHTML = '';
  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item-card reveal';
    const badgeHtml = item.badge ? `<span class="menu-item-badge badge-${item.badge}">${item.badge === 'ai' ? '✨ AI Pick' : item.badge === 'new' ? 'New' : '🔥 Hot'}</span>` : '';
    card.innerHTML = `
      ${badgeHtml}
      <div class="menu-item-img">${item.emoji}</div>
      <div class="menu-item-body">
        <div class="menu-item-name">${item.name}</div>
        <p class="menu-item-desc">${item.desc}</p>
        <div class="menu-item-footer">
          <span class="menu-item-price">${item.price}</span>
          <button class="menu-item-add" title="Add to order">+</button>
        </div>
      </div>
    `;
    card.querySelector('.menu-item-add').addEventListener('click', e => {
      e.stopPropagation();
      showToast(`${item.emoji} ${item.name} added to your order!`);
    });
    grid.appendChild(card);
  });
  // Re-trigger reveal
  setTimeout(() => document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('visible')) el.classList.add('visible');
  }), 50);
}

// ===== TABLE MAP =====
function initTableMap() {
  const map = document.getElementById('tableMap');
  if (!map) return;
  const statuses = ['available','available','available','occupied','reserved','available','occupied','available','reserved','available',
                    'occupied','available','available','available','reserved'];
  map.innerHTML = `
    <div class="table-map-title">🗺️ Floor Plan — Level 1</div>
    <div class="table-grid">${statuses.map((s,i) => `<div class="table-spot ${s}" title="Table ${i+1} — ${s}">${i+1}</div>`).join('')}</div>
    <div class="table-legend">
      <div class="tl-item"><div class="tl-dot g"></div>Available (9)</div>
      <div class="tl-item"><div class="tl-dot r"></div>Occupied (4)</div>
      <div class="tl-item"><div class="tl-dot a"></div>Reserved (3)</div>
    </div>
  `;
  map.querySelectorAll('.table-spot').forEach(spot => {
    spot.addEventListener('click', () => {
      if (spot.classList.contains('available')) {
        showToast(`Table ${spot.textContent} selected for reservation`);
      } else {
        showToast(`Table ${spot.textContent} is currently ${spot.classList[1]}`);
      }
    });
  });
}

// ===== RESERVATION FORM =====
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const dateInput = document.getElementById('resDate');
  if (dateInput) {
    const today = new Date();
    dateInput.min = today.toISOString().split('T')[0];
    dateInput.value = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  }
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = document.getElementById('resName').value;
      const date = document.getElementById('resDate').value;
      const time = document.getElementById('resTime').value;
      const guests = document.getElementById('resGuests').value;
      const modal = document.getElementById('reserveModal');
      const details = document.getElementById('modalDetails');
      if (details) {
        details.innerHTML = `
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', {weekday:'long',year:'numeric',month:'long',day:'numeric'})}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Party Size:</strong> ${guests}</p>
          <p style="margin-top:0.5rem;font-size:0.78rem;color:var(--gold-dark)">✓ A QR check-in code has been sent to your email.</p>
        `;
      }
      if (modal) modal.classList.add('open');
    });
  }
}

// ===== WAIT PREDICTION =====
function initWaitPrediction() {
  const sel = document.getElementById('resTime');
  const pred = document.getElementById('waitPrediction');
  if (!sel || !pred) return;
  const waits = { '12:00 PM':2, '12:30 PM':5, '1:00 PM':8, '7:00 PM':18, '7:30 PM':22, '8:00 PM':28, '8:30 PM':15, '9:00 PM':5 };
  function update() {
    const w = waits[sel.value] || 10;
    pred.innerHTML = `<span class="wait-icon">⏱️</span><span>Estimated wait: <strong>~${w} min</strong> at ${sel.value} — ${w < 10 ? 'Great time to dine!' : w < 20 ? 'Moderate traffic expected.' : 'Peak hours — consider another time?'}</span>`;
  }
  sel.addEventListener('change', update);
  update();
}

// ===== DASHBOARD =====
function initDashboard() {
  const tabs = document.querySelectorAll('.dash-tab');
  const body = document.getElementById('dashboardBody');
  if (!body) return;

  const renderers = { overview: renderOverview, kitchen: renderKitchen, orders: renderOrders, staff: renderStaff, delivery: renderDelivery };
  renderOverview();

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      body.style.opacity = '0';
      setTimeout(() => {
        renderers[tab.dataset.tab]?.();
        body.style.opacity = '1';
        body.style.transition = 'opacity 0.3s ease';
      }, 150);
    });
  });
}

function renderOverview() {
  const body = document.getElementById('dashboardBody');
  body.innerHTML = `
    <div class="overview-grid">
      ${[
        {label:'Total Revenue Today', value:'$8,420', change:'+23% vs yesterday', up:true},
        {label:'Active Covers', value:'87', change:'+12 since 7pm', up:true},
        {label:'Avg Order Value', value:'$96', change:'+8% vs last week', up:true},
        {label:'Table Turnover', value:'2.4×', change:'-0.1× vs target', up:false},
      ].map(m => `
        <div class="overview-metric">
          <div class="om-label">${m.label}</div>
          <div class="om-value">${m.value}</div>
          <div class="om-change ${m.up ? 'up' : 'down'}">${m.up ? '↑' : '↓'} ${m.change}</div>
        </div>
      `).join('')}
    </div>
    <div class="overview-bottom">
      <div class="oh-card">
        <div class="oh-title">Top Selling Dishes Tonight</div>
        ${[{e:'🥩',n:'Wagyu Steak',v:18},{e:'🍝',n:'Truffle Risotto',v:15},{e:'🦞',n:'Poached Lobster',v:11},{e:'🍰',n:'Fondant',v:22}]
          .map(d => `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0;border-bottom:1px solid var(--border);font-size:0.875rem;">
            <span>${d.e}</span><span style="flex:1;color:var(--text-secondary)">${d.n}</span>
            <span style="font-weight:700;color:var(--brown-deep)">${d.v} sold</span>
          </div>`).join('')}
      </div>
      <div class="oh-card">
        <div class="oh-title">Quick Stats</div>
        ${[['🎟️','Reservations Tonight','24/28'],['⭐','Avg Rating Today','4.9'],['🔄','Orders Completed','67'],['📦','Kitchen Queue','12']]
          .map(([icon,label,val]) => `<div style="display:flex;align-items:center;gap:0.75rem;padding:0.6rem 0;border-bottom:1px solid var(--border);font-size:0.85rem;">
            <span>${icon}</span><span style="flex:1;color:var(--text-secondary)">${label}</span>
            <span style="font-weight:700;color:var(--brown-deep)">${val}</span>
          </div>`).join('')}
      </div>
    </div>
  `;
}

function renderKitchen() {
  const body = document.getElementById('dashboardBody');
  body.innerHTML = `<div class="kitchen-grid">${KITCHEN_STATIONS.map(s => `
    <div class="kitchen-station">
      <div class="ks-header">
        <div class="ks-name">${s.name}</div>
        <div class="ks-status ${s.status}">${s.status.charAt(0).toUpperCase()+s.status.slice(1)}</div>
      </div>
      <div class="ks-orders">
        ${s.orders.map(o => `<div class="ks-order"><div class="ks-order-dot order-dot ${o.dot}"></div><span style="flex:1;font-size:0.8rem;color:var(--text-secondary)">${o.text}</span><span class="order-time">${o.time}</span></div>`).join('')}
      </div>
    </div>
  `).join('')}</div>`;
}

function renderOrders() {
  const body = document.getElementById('dashboardBody');
  body.innerHTML = `<div class="orders-list">${LIVE_ORDERS.map(o => `
    <div class="order-card">
      <div class="order-table-badge">${o.table}</div>
      <div class="order-info">
        <div class="order-items-text">${o.items}</div>
        <div class="order-meta-text">${o.guests} guests • ${o.time}</div>
      </div>
      <span class="order-status-pill ${o.statusClass}">${o.status}</span>
      <div class="order-total">${o.total}</div>
    </div>
  `).join('')}</div>`;
}

function renderStaff() {
  const body = document.getElementById('dashboardBody');
  body.innerHTML = `<div class="staff-grid">${STAFF.map(s => `
    <div class="staff-card">
      <div class="staff-avatar">${s.initials}</div>
      <div class="staff-name">${s.name}</div>
      <div class="staff-role">${s.role}</div>
      <div class="staff-rating">
        <span class="staff-stars">${'⭐'.repeat(Math.round(s.rating))}</span>
        <span class="staff-score">${s.rating}</span>
      </div>
      <div class="staff-metric">
        <div class="sm-item"><span class="sm-val">${s.covers}</span><span class="sm-lbl">Covers</span></div>
        <div class="sm-item"><span class="sm-val">${s.rating_count}</span><span class="sm-lbl">Reviews</span></div>
        <div class="sm-item"><span class="sm-val">On</span><span class="sm-lbl">Duty</span></div>
      </div>
    </div>
  `).join('')}</div>`;
}

function renderDelivery() {
  const body = document.getElementById('dashboardBody');
  body.innerHTML = `
    <div style="margin-bottom:1rem;display:flex;gap:1rem;flex-wrap:wrap;">
      ${[['📦','Total Today','42'],['🚴','Active Riders','6'],['⏱️','Avg Delivery','28 min'],['⭐','Delivery Rating','4.8']]
        .map(([i,l,v]) => `<div style="flex:1;min-width:140px;background:white;border:1px solid var(--border);border-radius:var(--radius);padding:1rem;">
          <div style="font-size:1.25rem">${i}</div>
          <div style="font-size:1.5rem;font-weight:700;color:var(--brown-deep);margin:0.25rem 0">${v}</div>
          <div style="font-size:0.75rem;color:var(--text-muted)">${l}</div>
        </div>`).join('')}
    </div>
    <div class="delivery-grid">${DELIVERIES.map(d => `
      <div class="delivery-card">
        <div class="dc-header">
          <div class="dc-id">${d.id}</div>
          <div class="dc-status" style="background:${d.statusColor}20;color:${d.statusColor}">${d.status}</div>
        </div>
        <div class="dc-route">
          <span style="font-size:0.8rem">${d.from}</span>
          <span class="dc-arrow">→</span>
          <span style="font-size:0.8rem">${d.to}</span>
        </div>
        <div class="dc-eta">ETA: <strong>${d.eta}</strong> ${d.rider}</div>
        <div class="delivery-map">
          <div class="map-dot origin"></div>
          <div class="map-dot rider"></div>
          <div class="map-dot dest"></div>
        </div>
      </div>
    `).join('')}</div>
  `;
}

// ===== ANALYTICS =====
function initAnalytics() {
  renderRevenueChart();
  renderHeatmap();
  renderWaitBreakdown();
  renderDemandItems();
  renderCxMetrics();
  renderInsights();

  document.getElementById('forecastWeek')?.addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('forecastMonth')?.classList.remove('active');
    renderRevenueChart('week');
  });
  document.getElementById('forecastMonth')?.addEventListener('click', function() {
    this.classList.add('active');
    document.getElementById('forecastWeek')?.classList.remove('active');
    renderRevenueChart('month');
  });
}

function renderRevenueChart(period = 'week') {
  const container = document.getElementById('revenueChart');
  if (!container) return;
  const labels = period === 'week' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['W1','W2','W3','W4'];
  const actual = period === 'week' ? [5200,4800,6100,5500,8400,9200,null] : [34000,38000,42000,null];
  const forecast = period === 'week' ? [5000,5100,6000,5800,8200,9000,8100] : [33000,37000,41000,45000];
  const max = Math.max(...forecast, ...actual.filter(Boolean));
  const w = 100, h = 100;

  const toPath = (data, solid) => {
    const pts = data.map((v, i) => v != null ? [i / (data.length - 1) * w, h - (v / max * h * 0.85)] : null).filter(Boolean);
    if (pts.length < 2) return '';
    const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
    return `<path d="${d}" fill="none" stroke="${solid ? '#2c1810' : 'var(--gold)'}" stroke-width="${solid ? 2.5 : 2}" stroke-dasharray="${solid ? 'none' : '4,3'}" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>`;
  };

  const areaPath = (data) => {
    const pts = data.map((v, i) => v != null ? [i / (data.length - 1) * w, h - (v / max * h * 0.85)] : null).filter(Boolean);
    if (pts.length < 2) return '';
    const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ') + ` L${pts[pts.length-1][0].toFixed(1)},${h} L0,${h} Z`;
    return `<path d="${d}" fill="url(#areaGrad)" opacity="0.15"/>`;
  };

  const xLabels = labels.map((l,i) => `<text x="${(i/(labels.length-1)*w).toFixed(1)}" y="${h+8}" text-anchor="middle" font-size="5" fill="var(--text-muted)">${l}</text>`).join('');

  container.innerHTML = `
    <svg class="chart-svg" viewBox="0 -5 100 120" preserveAspectRatio="none">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--gold)" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="var(--gold)" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${areaPath(actual)}
      ${toPath(forecast, false)}
      ${toPath(actual, true)}
      ${xLabels}
    </svg>
  `;
}

function renderHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  if (!grid) return;
  const hours = ['6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  const days = ['M','T','W','T','F','S','S'];
  // Simulate a realistic heatmap - morning low, lunch peak, evening peak
  const heatData = Array.from({length:7}, (_, d) => Array.from({length:12}, (_, h) => {
    const hr = h + 6;
    let val = 0.1;
    if (hr >= 12 && hr <= 14) val = 0.6 + (d >= 4 ? 0.3 : 0);
    if (hr >= 19 && hr <= 22) val = 0.7 + (d >= 4 ? 0.25 : 0) + Math.random() * 0.1;
    if (hr === 20 || hr === 21) val = Math.min(1, val + 0.1);
    return val;
  }));

  grid.innerHTML = '';
  grid.style.gridTemplateColumns = 'repeat(12, 1fr)';

  for (let h = 0; h < 12; h++) {
    for (let d = 0; d < 7; d++) {
      const val = heatData[d][h];
      const cell = document.createElement('div');
      cell.className = 'hm-cell';
      const opacity = 0.1 + val * 0.9;
      cell.style.background = val < 0.3 ? `rgba(200,169,110,${opacity})` : val < 0.7 ? `rgba(212,136,74,${opacity})` : `rgba(44,24,16,${opacity})`;
      cell.title = `${days[d]} ${h+6}:00 — ${Math.round(val*100)}% capacity`;
      grid.appendChild(cell);
    }
  }
}

function renderWaitBreakdown() {
  const el = document.getElementById('waitBreakdown');
  if (!el) return;
  const items = [['Lunch 12-2pm', 60, '8 min'], ['Dinner 7-9pm', 95, '22 min'], ['Late Night', 40, '5 min']];
  el.innerHTML = items.map(([l, pct, val]) => `
    <div class="wb-item">
      <span class="wb-label">${l}</span>
      <div class="wb-bar-wrap"><div class="wb-bar" style="width:${pct}%"></div></div>
      <span class="wb-val">${val}</span>
    </div>
  `).join('');
}

function renderDemandItems() {
  const el = document.getElementById('demandItems');
  if (!el) return;
  el.innerHTML = DEMAND_ITEMS.map(d => `
    <div class="demand-item">
      <span class="di-emoji">${d.emoji}</span>
      <div class="di-info">
        <div class="di-name">${d.name}</div>
        <div class="di-bar-wrap"><div class="di-bar" style="width:${d.pct}%"></div></div>
      </div>
      <span class="di-pct">${d.pct}%</span>
    </div>
  `).join('');
}

function renderCxMetrics() {
  const el = document.getElementById('cxMetrics');
  if (!el) return;
  el.innerHTML = CX_METRICS.map(m => `
    <div class="cx-item">
      <div class="cx-name">${m.name}</div>
      <div class="cx-bar-wrap"><div class="cx-bar" style="width:${m.value}%"></div></div>
    </div>
  `).join('');
}

function renderInsights() {
  const el = document.getElementById('insightsList');
  if (!el) return;
  el.innerHTML = LIVE_INSIGHTS.map(i => `
    <div class="insight-item">
      <span class="insight-icon">${i.icon}</span>
      <span class="insight-text">${i.text}</span>
    </div>
  `).join('');
}

// ===== LOYALTY =====
function initLoyalty() {
  const tiers = document.getElementById('loyaltyTiers');
  if (tiers) {
    tiers.innerHTML = LOYALTY_TIERS.map((t, i) => `
      <div class="tier-item ${i === 2 ? 'active' : ''}">
        <span class="tier-icon">${t.icon}</span>
        <div class="tier-info">
          <div class="tier-name">${t.name}</div>
          <div class="tier-req">${t.req}</div>
        </div>
        <span class="tier-badge">${t.badge}</span>
      </div>
    `).join('');
    tiers.querySelectorAll('.tier-item').forEach(item => {
      item.addEventListener('click', () => {
        tiers.querySelectorAll('.tier-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
      });
    });
  }

  const perks = document.getElementById('loyaltyPerks');
  if (perks) {
    perks.innerHTML = LOYALTY_PERKS.map(p => `
      <div class="perk-item">
        <span class="perk-icon">${p.icon}</span>
        <div>
          <div class="perk-title">${p.title}</div>
          <div class="perk-desc">${p.desc}</div>
        </div>
      </div>
    `).join('');
  }
}

// ===== BILLING =====
function initBilling() {
  const demo = document.getElementById('billingDemo');
  if (!demo) return;
  const subtotal = BILL_ITEMS.reduce((sum, i) => sum + parseFloat(i.price.replace('$','')), 0);
  const tax = (subtotal * 0.085).toFixed(2);
  const loyalty = -12.50;
  const total = (subtotal + parseFloat(tax) + loyalty).toFixed(2);

  demo.innerHTML = `
    <div class="bill-header">
      <div class="bill-restaurant">✦ DineFlow</div>
      <div class="bill-sub">The Grand Terrace — Table 4</div>
      <div class="bill-info">
        <span>May 26, 2026 · 8:32 PM</span>
        <span>Server: Marco R.</span>
        <span>Ref: #INV-4821</span>
      </div>
    </div>
    <div class="bill-body">
      <div class="bill-items">${BILL_ITEMS.map(i => `
        <div class="bill-item">
          <span class="bi-emoji">${i.emoji}</span>
          <span class="bi-name">${i.name}</span>
          <span class="bi-qty">${i.qty}</span>
          <span class="bi-price">${i.price}</span>
        </div>
      `).join('')}</div>
      <div class="bill-divider"></div>
      <div class="bill-totals">
        <div class="bt-row"><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
        <div class="bt-row"><span>Tax (8.5%)</span><span>$${tax}</span></div>
        <div class="bt-row" style="color:var(--gold-dark)"><span>🏆 Loyalty Discount</span><span>-$12.50</span></div>
        <div class="bill-divider"></div>
        <div class="bt-row total"><span>Total</span><span>$${total}</span></div>
      </div>
    </div>
    <div class="bill-pay">
      <div class="pay-methods">
        <button class="pay-btn active" id="payCard">💳 Card</button>
        <button class="pay-btn" id="payApple">  Apple Pay</button>
        <button class="pay-btn" id="payGoogle">G Google Pay</button>
      </div>
      <button class="pay-split-btn" id="paySplit">🔀 Split Bill Between Guests</button>
    </div>
    <div class="bill-loyalty">
      <span>🏆</span>
      <span>You'll earn <strong>308 loyalty points</strong> for this visit. Current balance: 4,588 pts.</span>
    </div>
  `;

  demo.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      demo.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });
  document.getElementById('paySplit')?.addEventListener('click', () => showToast('🔀 Bill split equally between 4 guests — $' + (parseFloat(total)/4).toFixed(2) + ' each'));
}

// ===== CONTACT FORM =====
function initContactForm() {
  document.getElementById('contactForm')?.addEventListener('submit', e => {
    e.preventDefault();
    document.getElementById('trialModal')?.classList.add('open');
    e.target.reset();
  });
}

// ===== MODALS =====
function initModals() {
  const closeReserve = document.getElementById('closeReserveModal');
  const reserveOk = document.getElementById('modalOkBtn');
  const closeDemo = document.getElementById('closeDemoModal');
  const closeTrial = document.getElementById('closeTrialModal');
  const trialOk = document.getElementById('trialOkBtn');
  const demoBtn = document.getElementById('demoBtn');
  const watchDemo = document.getElementById('watchDemo');
  const exploreBtn = document.getElementById('exploreBtn');
  const reserveNavBtn = document.getElementById('reserveNavBtn');

  [closeReserve, reserveOk].forEach(el => el?.addEventListener('click', () => document.getElementById('reserveModal')?.classList.remove('open')));
  [closeDemo].forEach(el => el?.addEventListener('click', () => document.getElementById('demoModal')?.classList.remove('open')));
  [closeTrial, trialOk].forEach(el => el?.addEventListener('click', () => document.getElementById('trialModal')?.classList.remove('open')));
  [demoBtn, watchDemo].forEach(el => el?.addEventListener('click', () => document.getElementById('demoModal')?.classList.add('open')));

  exploreBtn?.addEventListener('click', () => { document.getElementById('features')?.scrollIntoView({ behavior:'smooth' }); });
  reserveNavBtn?.addEventListener('click', () => { document.getElementById('reservation')?.scrollIntoView({ behavior:'smooth' }); });
  document.getElementById('scheduleDemoBtn')?.addEventListener('click', () => { document.getElementById('demoModal')?.classList.remove('open'); showToast('📅 Our team will reach out within 2 business hours!'); });

  // Close on overlay click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });
}

// ===== SCROLL REVEAL =====
function initReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .feature-card, .menu-item-card, .analytics-card, .tier-item, .overview-metric, .order-card, .staff-card, .delivery-card, .res-feat, .perk-item').forEach(el => {
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
    observer.observe(el);
  });
}

// ===== LIVE UPDATES =====
function initLiveUpdates() {
  // Update live order count
  const liveOrders = document.getElementById('liveOrders');
  if (liveOrders) {
    setInterval(() => {
      const n = 18 + Math.floor(Math.random() * 14);
      liveOrders.textContent = n;
    }, 4000);
  }

  // Animate gauge
  const gaugeFill = document.getElementById('gaugeFill');
  if (gaugeFill) {
    let offset = 100;
    setInterval(() => {
      offset = 60 + Math.random() * 80;
      gaugeFill.style.strokeDashoffset = offset;
      const mins = Math.round((251.2 - offset) / 251.2 * 30);
      const gaugeValue = document.getElementById('gaugeValue');
      if (gaugeValue) gaugeValue.textContent = Math.max(5, mins);
    }, 5000);
  }
}

// ===== TOAST =====
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
}
