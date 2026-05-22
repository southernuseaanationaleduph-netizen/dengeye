/* ============================================================
   DengEYE App Showcase — script.js
   Auto-animated sequential demo player
   ============================================================ */

'use strict';

// ─── FEATURE SEQUENCE ────────────────────────────────────────
const FEATURES = [
  {
    id: 'splash',
    label: 'App Launch',
    icon: '🦟',
    title: 'DengEYE',
    desc: 'Your AI-powered companion in the fight against dengue fever. Smart, fast, and community-driven.',
    bullets: ['AI-powered mosquito detection', 'Community surveillance network', 'Real-time outbreak alerts'],
    screens: ['main_interface'],
    duration: 4000,
    transition: 'fade',
  },
  {
    id: 'account',
    label: 'Account & Roles',
    icon: '👤',
    title: 'Account & Role Setup',
    desc: 'Personalized roles for citizens, health workers, and barangay officials — each with tailored features.',
    bullets: ['Role-based access control', 'Multi-language support (Filipino/English)', 'Secure profile management'],
    screens: ['account_1', 'account_2', 'account_3'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'bantay',
    label: 'Bantay-Kagat',
    icon: '🗺️',
    title: 'Bantay-Kagat: Hotspot Map',
    desc: 'See live dengue hotspots updated weekly in your barangay. Know before the outbreak spreads.',
    bullets: ['Weekly hotspot updates', 'Barangay-level resolution', 'Color-coded risk zones'],
    screens: ['bantay_kagat_1', 'bantay_kagat_2', 'bantay_kagat_3'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'pugad',
    label: 'Pugad Siyasat AI',
    icon: '🎯',
    title: 'Pugad Siyasat — AI Scanner',
    desc: 'Point your camera at stagnant water or dark areas. YOLO-based AI detects mosquito larvae instantly.',
    bullets: ['YOLO v8 real-time detection', 'Works in low-light conditions', 'GPS-stamped evidence logging'],
    screens: ['yolo_1', 'yolo_2', 'yolo_3'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'glint',
    label: 'GLINT / LIWANAG',
    icon: '🔦',
    title: 'GLINT: Light-Based Detection',
    desc: 'Advanced AI uses your phone flashlight to reveal larvae hidden in dark containers and drains.',
    bullets: ['Flashlight-assisted scanning', 'Dark area larval detection', 'High sensitivity analysis mode'],
    screens: ['glint_1', 'glint_2', 'glint_3'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'patrol',
    label: 'Pugad-Patrol',
    icon: '🛡️',
    title: 'Pugad-Patrol: Community Missions',
    desc: 'Join guided neighborhood patrol missions. Earn points while actively eliminating breeding sites.',
    bullets: ['Mission-based patrol system', 'GPS-tracked routes', 'Team coordination tools'],
    screens: ['patrol_1', 'patrol_2', 'patrol_3'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'kumarites',
    label: 'Kumarites Community',
    icon: '🤝',
    title: 'Kumarites: Peer Network',
    desc: 'Connect with your neighbors. Report cases, share alerts, and crowdsource dengue data for your community.',
    bullets: ['Peer-to-peer reporting', 'AI DengBot assistant chat', 'Bayanihan data pooling'],
    screens: ['kumarites_network', 'kumarites_bot', 'bayanihan'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'tanaw',
    label: 'Tanaw Klima',
    icon: '🌦️',
    title: 'Tanaw Klima: Climate Tracker',
    desc: 'Correlate weather patterns with dengue risk. Know when conditions are ripe for a mosquito surge.',
    bullets: ['Weather–vector correlation', 'Rainfall risk forecasting', '7-day dengue risk index'],
    screens: ['tanaw_1', 'tanaw_2'],
    duration: 3800,
    transition: 'slide',
  },
  {
    id: 'tuklas',
    label: 'Tuklas',
    icon: '🔍',
    title: 'Tuklas: Discover & Learn',
    desc: 'Educational content about dengue prevention, symptoms, and treatment — curated and easy to understand.',
    bullets: ['Interactive dengue guide', 'Symptom checker tool', 'Prevention tips & FAQs'],
    screens: ['tuklas_1', 'tuklas_2'],
    duration: 3800,
    transition: 'slide',
  },
  {
    id: 'lodi',
    label: 'Lodi Leaderboard',
    icon: '🏆',
    title: 'Lodi sa Dengue: Leaderboard',
    desc: 'Earn Lodi Points for every report, patrol, and detection. Compete and be recognized as a dengue defender.',
    bullets: ['Points for every action', 'Community rankings board', 'Badges and achievements'],
    screens: ['lodi_leaderboard', 'lodi_points', 'lodi_profile'],
    duration: 3600,
    transition: 'slide',
  },
  {
    id: 'contact',
    label: 'Contact Tracing',
    icon: '📍',
    title: 'Contact Tracing Lite',
    desc: 'Quick case flagging to identify potential exposure areas. Lightweight and privacy-respecting.',
    bullets: ['One-tap case flagging', 'Proximity-based alerts', 'Anonymous data sharing'],
    screens: ['contact_1', 'contact_2'],
    duration: 3800,
    transition: 'slide',
  },
  {
    id: 'notifs',
    label: 'Real-Time Alerts',
    icon: '🔔',
    title: 'Push Notifications & Alerts',
    desc: 'Never miss a dengue outbreak near you. Get instant push alerts from health authorities and your community.',
    bullets: ['Instant outbreak push alerts', 'Barangay-level targeting', 'Customizable notification radius'],
    screens: ['notifications'],
    duration: 4000,
    transition: 'fade',
  },
];

// ─── STATE ──────────────────────────────────────────────────
let currentFeatureIdx = 0;
let currentScreenIdx  = 0;
let autoTimer         = null;
let screenTimer       = null;
let isPaused          = false;

// Active screen img reference (managed by showScreen)
let activeImg = null;

// ─── ELEMENTS (resolved after DOMContentLoaded) ──────────────
let heroScreenImg, featureInfo, featureIconWrap, featureTitle,
    featureDesc, featureBullets, demoTrack, progressDots,
    tapRipple, swipeArrow, sectionLabelText, statusTime,
    ctaPhone1, ctaPhone2, demoScreen;

// ─── INIT ────────────────────────────────────────────────────
function init() {
  heroScreenImg   = document.getElementById('heroScreenImg');
  featureInfo     = document.getElementById('featureInfo');
  featureIconWrap = document.getElementById('featureIconWrap');
  featureTitle    = document.getElementById('featureTitle');
  featureDesc     = document.getElementById('featureDesc');
  featureBullets  = document.getElementById('featureBullets');
  demoTrack       = document.getElementById('demoTrack');
  progressDots    = document.getElementById('progressDots');
  tapRipple       = document.getElementById('tapRipple');
  swipeArrow      = document.getElementById('swipeArrow');
  sectionLabelText= document.getElementById('sectionLabelText');
  statusTime      = document.getElementById('statusTime');
  ctaPhone1       = document.getElementById('ctaPhone1');
  ctaPhone2       = document.getElementById('ctaPhone2');
  demoScreen      = document.getElementById('demoScreen');

  if (typeof APP_SCREENSHOTS === 'undefined') {
    console.error('APP_SCREENSHOTS not loaded');
    return;
  }

  buildTrack();
  buildProgressDots();
  setHeroScreen();
  setCTAPhones();
  updateClock();
  setInterval(updateClock, 30000);

  showFeature(0, true);
  startAutoPlay();
  startHeroCycle();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAutoPlay();
    else resumeAutoPlay();
  });

  const demoPhone = document.getElementById('demoPhone');
  if (demoPhone) {
    demoPhone.addEventListener('click', (e) => {
      const rect = demoPhone.getBoundingClientRect();
      triggerTap(e.clientX - rect.left, e.clientY - rect.top);
      advanceScreen();
    });
  }
}

// ─── CLOCK ──────────────────────────────────────────────────
function updateClock() {
  if (!statusTime) return;
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  statusTime.textContent = h + ':' + m;
}

// ─── HERO + CTA ──────────────────────────────────────────────
function setHeroScreen() {
  if (!heroScreenImg) return;
  const src = APP_SCREENSHOTS['main_interface'];
  if (src) { heroScreenImg.src = src; heroScreenImg.classList.add('active'); }
}

function setCTAPhones() {
  if (ctaPhone1) ctaPhone1.src = APP_SCREENSHOTS['lodi_leaderboard'] || '';
  if (ctaPhone2) ctaPhone2.src = APP_SCREENSHOTS['patrol_1'] || '';
}

const HERO_SCREENS = [
  'main_interface','bantay_kagat_1','patrol_1','lodi_leaderboard',
  'glint_1','kumarites_network','yolo_1','patrol_2'
];
let heroIdx = 0;

function startHeroCycle() {
  setInterval(() => {
    if (!heroScreenImg) return;
    heroIdx = (heroIdx + 1) % HERO_SCREENS.length;
    heroScreenImg.style.opacity = '0';
    heroScreenImg.style.transform = 'scale(1.04)';
    setTimeout(() => {
      heroScreenImg.src = APP_SCREENSHOTS[HERO_SCREENS[heroIdx]] || '';
      heroScreenImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      heroScreenImg.style.opacity = '1';
      heroScreenImg.style.transform = 'scale(1)';
    }, 350);
  }, 3200);
}

// ─── BUILD TRACK ─────────────────────────────────────────────
function buildTrack() {
  if (!demoTrack) return;
  demoTrack.innerHTML = '';
  FEATURES.forEach((f, idx) => {
    const item = document.createElement('div');
    item.className = 'demo-track-item';
    item.dataset.idx = idx;
    const src = APP_SCREENSHOTS[f.screens[0]] || '';
    item.innerHTML = `
      <img class="track-thumb" src="${src}" alt="${f.label}" loading="lazy"/>
      <span class="track-label">${f.label}</span>
    `;
    item.addEventListener('click', () => {
      clearTimers();
      showFeature(idx, false);
      startAutoPlay();
    });
    demoTrack.appendChild(item);
  });
}

// ─── PROGRESS DOTS ───────────────────────────────────────────
function buildProgressDots() {
  if (!progressDots) return;
  progressDots.innerHTML = '';
  FEATURES.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    dot.addEventListener('click', () => {
      clearTimers();
      showFeature(idx, false);
      startAutoPlay();
    });
    progressDots.appendChild(dot);
  });
  updateProgressDots(0);
}

function updateProgressDots(idx) {
  if (!progressDots) return;
  progressDots.querySelectorAll('.progress-dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
}

function updateTrackActive(idx) {
  if (!demoTrack) return;
  demoTrack.querySelectorAll('.demo-track-item').forEach((item, i) => {
    item.classList.toggle('active', i === idx);
    if (i === idx) item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

// ─── SHOW FEATURE ─────────────────────────────────────────────
function showFeature(featureIdx, immediate) {
  currentFeatureIdx = featureIdx % FEATURES.length;
  currentScreenIdx  = 0;
  const feature = FEATURES[currentFeatureIdx];

  updateTrackActive(currentFeatureIdx);
  updateProgressDots(currentFeatureIdx);
  if (sectionLabelText) sectionLabelText.textContent = feature.label;

  animateFeatureInfo(feature);
  showScreen(feature.screens[0], immediate ? 'none' : feature.transition);

  // Multi-screen cycling
  if (feature.screens.length > 1) {
    let sIdx = 0;
    const cycleDuration = Math.floor(feature.duration / feature.screens.length);
    screenTimer = setInterval(() => {
      sIdx = (sIdx + 1) % feature.screens.length;
      currentScreenIdx = sIdx;
      showScreen(feature.screens[sIdx], feature.transition);
      showSwipeHint();
    }, cycleDuration);
  }
}

function animateFeatureInfo(feature) {
  if (!featureInfo) return;
  featureInfo.style.opacity = '0';
  featureInfo.style.transform = 'translateY(14px)';
  setTimeout(() => {
    if (featureIconWrap) featureIconWrap.textContent = feature.icon;
    if (featureTitle)    featureTitle.textContent    = feature.title;
    if (featureDesc)     featureDesc.textContent     = feature.desc;
    if (featureBullets) {
      featureBullets.innerHTML = feature.bullets.map(b => `<li>${b}</li>`).join('');
    }
    featureInfo.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    featureInfo.style.opacity    = '1';
    featureInfo.style.transform  = 'translateY(0)';
  }, 140);
}

// ─── SHOW SCREEN ─────────────────────────────────────────────
function showScreen(key, transition) {
  if (!demoScreen) return;
  const src = APP_SCREENSHOTS[key] || '';

  // Remove any old transition imgs
  const oldImgs = demoScreen.querySelectorAll('img.screen-img:not(#__placeholder)');

  if (transition === 'none' || oldImgs.length === 0) {
    // Clean slate
    oldImgs.forEach(img => img.remove());
    const img = makeScreenImg(src);
    img.classList.add('active');
    demoScreen.insertBefore(img, demoScreen.firstChild);
    activeImg = img;
    return;
  }

  // Animate out old, in new
  const outImg = oldImgs[oldImgs.length - 1]; // most recent
  const inImg  = makeScreenImg(src);

  // Position incoming
  inImg.classList.add(transition === 'slide' ? 'entering-right' : 'entering-right');
  demoScreen.insertBefore(inImg, demoScreen.firstChild);

  // Trigger reflow then animate
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      inImg.classList.remove('entering-right');
      inImg.classList.add('active');
      if (outImg) outImg.classList.add('exiting-left');
    });
  });

  // Clean up old image
  setTimeout(() => {
    if (outImg && outImg.parentNode === demoScreen) outImg.remove();
    // Remove extra imgs if stacked
    const imgs = demoScreen.querySelectorAll('img.screen-img');
    imgs.forEach((img, i) => { if (i > 0) img.remove(); });
    activeImg = inImg;
  }, 700);
}

function makeScreenImg(src) {
  const img = document.createElement('img');
  img.className = 'screen-img';
  img.alt = 'App Screen';
  img.src = src;
  return img;
}

// ─── AUTO PLAY ───────────────────────────────────────────────
function startAutoPlay() {
  clearTimers();
  const feature = FEATURES[currentFeatureIdx];
  const delay   = feature.duration + 500;
  autoTimer = setTimeout(() => {
    clearScreenTimer();
    showFeature((currentFeatureIdx + 1) % FEATURES.length, false);
    startAutoPlay();
  }, delay);
}

function pauseAutoPlay() {
  isPaused = true;
  clearTimers();
}

function resumeAutoPlay() {
  if (!isPaused) return;
  isPaused = false;
  startAutoPlay();
}

function clearTimers() {
  if (autoTimer) { clearTimeout(autoTimer); autoTimer = null; }
  clearScreenTimer();
}

function clearScreenTimer() {
  if (screenTimer) { clearInterval(screenTimer); screenTimer = null; }
}

// ─── MANUAL ADVANCE ──────────────────────────────────────────
function advanceScreen() {
  const feature = FEATURES[currentFeatureIdx];
  if (feature.screens.length <= 1) {
    // Advance to next feature instead
    clearTimers();
    showFeature((currentFeatureIdx + 1) % FEATURES.length, false);
    startAutoPlay();
    return;
  }
  clearScreenTimer();
  currentScreenIdx = (currentScreenIdx + 1) % feature.screens.length;
  showScreen(feature.screens[currentScreenIdx], 'slide');
  // Resume multi-screen cycling
  const cycleDuration = Math.floor(feature.duration / feature.screens.length);
  screenTimer = setInterval(() => {
    currentScreenIdx = (currentScreenIdx + 1) % feature.screens.length;
    showScreen(feature.screens[currentScreenIdx], 'slide');
    showSwipeHint();
  }, cycleDuration);
}

// ─── TAP RIPPLE ──────────────────────────────────────────────
function triggerTap(x, y) {
  if (!tapRipple) return;
  tapRipple.style.left  = x + 'px';
  tapRipple.style.top   = y + 'px';
  tapRipple.classList.remove('animate');
  void tapRipple.offsetWidth; // reflow
  tapRipple.classList.add('animate');
  setTimeout(() => tapRipple.classList.remove('animate'), 600);
}

// ─── SWIPE HINT ──────────────────────────────────────────────
function showSwipeHint() {
  if (!swipeArrow) return;
  swipeArrow.classList.add('show');
  setTimeout(() => swipeArrow.classList.remove('show'), 1400);
}

// ─── SCROLL REVEAL ───────────────────────────────────────────
function setupScrollReveal() {
  const cards = document.querySelectorAll('.feat-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 70);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(28px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    io.observe(card);
  });
}

// ─── BOOT ────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  init();
  setupScrollReveal();
});
