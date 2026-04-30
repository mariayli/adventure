

// ── Security helpers ─────────────────────────────────────────────────────────
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const VALID_COLS = new Set([
  "var(--copper)",
  "var(--red)",
  "var(--gold)",
  "var(--sepia)",
  "var(--sage)",
  "var(--amber)",
  "var(--purple)",
  "var(--cyan)",
  "var(--pink)",
  "var(--lime)",
  "var(--cream-dim)",
]);

function safeCol(val) {
  return VALID_COLS.has(val) ? val : "var(--cream-dim)";
}

function sanitizeTask(t) {
  const CATS = [
    "TUTKIMUS",
    "LUOVUUS",
    "SOSIAALINEN",
    "HENKINEN",
    "LUONTO",
    "OPPIMINEN",
    "RUOKA",
    "LIIKUNTA",
  ];
  const DIFFS = ["Helppo", "Keskitaso", "Haastava"];
  return {
    id: Number.isFinite(t.id) ? t.id : 0,
    icon: String(t.icon || "").slice(0, 8),
    cat: CATS.includes(t.cat) ? t.cat : "TUTKIMUS",
    col: safeCol(t.col),
    title: String(t.title || "").slice(0, 120),
    desc: String(t.desc || "").slice(0, 600),
    time: String(t.time || "").slice(0, 20),
    diff: DIFFS.includes(t.diff) ? t.diff : "Helppo",
    hasMap: !!t.hasMap,
    mapQ: t.mapQ ? String(t.mapQ).slice(0, 60) : null,
  };
}

// ── Data ──────────────────────────────────────────────────────────────────────
const TASKS = [
  // TUTKIMUS
  {
    id: 0,
    icon: "🚶",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Tuntematon reitti",
    desc: "Lähde ulos ja käänny ensimmäiseen katuun tai polkuun, jolla et muista koskaan kulkeneesi. Kävele se päästä päähän.",
    time: "30–60 min",
    diff: "Helppo",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 1,
    icon: "🚌",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Satunnainen matka",
    desc: "Nouse lähimpään bussiin tai raitiovaunuun. Istu kolme pysäkkiä. Poistu ja tutki ympäristöä 20 minuuttia ennen paluuta.",
    time: "1–1.5 h",
    diff: "Keskitaso",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 2,
    icon: "🏚️",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Vanhin rakennus",
    desc: "Kävele ympäristössäsi ja etsi vanhin rakennus tai rakenne, jonka löydät. Yritä selvittää sen ikä.",
    time: "45 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 3,
    icon: "🗺️",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Tarkoituksellinen eksyminen",
    desc: "Mene ulos ja eksy tarkoituksella. Kävele 30 minuuttia ilman suuntaa. Löydä tiesi takaisin ilman navigaattoria.",
    time: "1 h",
    diff: "Keskitaso",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 4,
    icon: "🔭",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Korkein piste",
    desc: "Etsi lähistöltä korkein paikka — kukkulan laki, parveke, silta. Seiso siellä ja katso horisonttiviivaa.",
    time: "45 min",
    diff: "Helppo",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 5,
    icon: "🏘️",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Tuntematon naapurusto",
    desc: "Valitse suunta, johon et yleensä mene. Kävele siihen suuntaan 15 minuuttia. Tutki mitä löytyy.",
    time: "45 min",
    diff: "Helppo",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 6,
    icon: "🎲",
    cat: "TUTKIMUS",
    col: "var(--copper)",
    title: "Nopan päätös",
    desc: "Arvo luku 1–6 puhelimella. 1=pohjoinen, 2=etelä, 3=itä, 4=länsi, 5=korkein paikka läheltä, 6=lähin vesistö. Mene sinne.",
    time: "1 h",
    diff: "Keskitaso",
    hasMap: true,
    mapQ: null,
  },

  // LUOVUUS
  {
    id: 7,
    icon: "📸",
    cat: "LUOVUUS",
    col: "var(--red)",
    title: "Sininen hetki",
    desc: "Ota viisi valokuvaa, joissa pääelementti on sininen. Ei suodattimia — vain luonnollinen sininen.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 8,
    icon: "🌑",
    cat: "LUOVUUS",
    col: "var(--red)",
    title: "Varjojen tarina",
    desc: "Kuvaa viisi varjoa, jotka kertovat jotain. Ei kohteita, vain varjot. Parasta auringonpaisteella tai keinovalossa.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 9,
    icon: "🪞",
    cat: "LUOVUUS",
    col: "var(--red)",
    title: "Symmetria",
    desc: "Etsi viisi symmetristä asiaa ympäristöstäsi. Kuvaa ne täsmälleen symmetrisesti.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 10,
    icon: "✏️",
    cat: "LUOVUUS",
    col: "var(--red)",
    title: "Kymmenen minuutin piirros",
    desc: "Istu ulkona ja piirrä näkemäsi kohde paperille tai puhelimen muistilehtiöön. Kymmenen minuuttia — ei kauemmin.",
    time: "15 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 11,
    icon: "🌈",
    cat: "LUOVUUS",
    col: "var(--red)",
    title: "Kaikkien värien päivä",
    desc: "Etsi yksi esine jokaista sateenkaaren väriä (punainen, oranssi, keltainen, vihreä, sininen, violetti). Ei saa ottaa mukaan — vain löytää.",
    time: "1 h",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },

  // SOSIAALINEN
  {
    id: 12,
    icon: "☕",
    cat: "SOSIAALINEN",
    col: "var(--gold)",
    title: "Uusi paikka",
    desc: "Etsi lähin kahvila, kioski tai ruokapaikka, jossa et ole ikinä käynyt. Tilaa jotain, mitä et yleensä valitsisi.",
    time: "45 min",
    diff: "Helppo",
    hasMap: true,
    mapQ: "kahvila",
  },
  {
    id: 13,
    icon: "🎤",
    cat: "SOSIAALINEN",
    col: "var(--gold)",
    title: "Vieras ihminen",
    desc: "Aloita keskustelu täysin tuntemattoman ihmisen kanssa. Kysy heiltä yksi kysymys, johon et tiedä vastausta.",
    time: "30 min",
    diff: "Haastava",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 14,
    icon: "🧭",
    cat: "SOSIAALINEN",
    col: "var(--gold)",
    title: "Paikallinen suositus",
    desc: 'Kysy lähellä olevalta ihmiseltä: "Mikä on lempipaikkasi täällä?" Mene sinne.',
    time: "1 h",
    diff: "Haastava",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 15,
    icon: "📬",
    cat: "SOSIAALINEN",
    col: "var(--gold)",
    title: "Kirje",
    desc: "Kirjoita lyhyt viesti jollekin, jolle et ole puhunut pitkään aikaan. Lähetä se tänään.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },

  // HENKINEN
  {
    id: 16,
    icon: "🤫",
    cat: "HENKINEN",
    col: "var(--sepia)",
    title: "Viisitoista minuuttia",
    desc: "Mene ulos. Istu tai seiso hiljaa täysin paikallaan viisitoista minuuttia. Puhelin taskussa.",
    time: "15 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 17,
    icon: "🌅",
    cat: "HENKINEN",
    col: "var(--sepia)",
    title: "Auringonlasku",
    desc: "Katso auringonlasku alusta loppuun. Etsi korkea tai avoin paikka. Ei puhelinta käteen silloin kun se laskee.",
    time: "1 h",
    diff: "Helppo",
    hasMap: true,
    mapQ: null,
  },
  {
    id: 18,
    icon: "🙏",
    cat: "HENKINEN",
    col: "var(--sepia)",
    title: "Kiitollisuuskävely",
    desc: "Kävele 20 minuuttia ja etsi kolme asiaa, joista olet kiitollinen mutta et yleensä huomaa. Kirjoita ne ylös.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 19,
    icon: "🐢",
    cat: "HENKINEN",
    col: "var(--sepia)",
    title: "Hidastaminen",
    desc: "Tee jokin tavallinen asia tahallisen hitaasti: kävele puolet normaalista vauhdista, tai syö yksi ateria ilman kiirettä.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },

  // LUONTO
  {
    id: 20,
    icon: "🌿",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Vihreä löytö",
    desc: "Löydä jokin kasvava asia — puu, pensas, ruoho, sammal — jota et ole ennen huomannut. Tutki sitä minuutti läheltä.",
    time: "20 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 21,
    icon: "🌊",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Veden ääreen",
    desc: "Etsi jokin vesi — joki, järvi, meri, oja tai jopa suihkulähde. Istu sen äärellä vähintään kymmenen minuuttia.",
    time: "1–2 h",
    diff: "Helppo",
    hasMap: true,
    mapQ: "järvi",
  },
  {
    id: 22,
    icon: "☁️",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Pilvien katselu",
    desc: "Makaa selälläsi ja katso taivaalle kymmenen minuuttia. Laske pilvet tai niiden muodot. Ei puhelinta.",
    time: "15 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 23,
    icon: "🌙",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Iltatähti",
    desc: "Mene ulos pimeän jälkeen. Etsi yksi tähti tai planeetta. Katso sitä kolme minuuttia liikkumatta.",
    time: "20 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 24,
    icon: "🐦",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Lintujen äänet",
    desc: "Mene paikkaan, jossa kuulet lintuja. Istu hiljaa ja laske kuinka monta eri ääntä tunnistat.",
    time: "20 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 25,
    icon: "🍄",
    cat: "LUONTO",
    col: "var(--sage)",
    title: "Maanpinnan tutkimus",
    desc: "Istu maahan ja tutki sitä läheltä viisi minuuttia. Laske kuinka monta eri elävää asiaa löydät puolen kämmenen alalta.",
    time: "15 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },

  // OPPIMINEN
  {
    id: 26,
    icon: "📚",
    cat: "OPPIMINEN",
    col: "var(--amber)",
    title: "Kirjastoarpa",
    desc: "Mene kirjastoon. Kävele hyllyjen välissä silmät puoliksi kiinni. Pysähdy. Nosta kirja. Lue 20 sivua siitä kohtaa, mihin sormi osuu.",
    time: "1–1.5 h",
    diff: "Helppo",
    hasMap: true,
    mapQ: "kirjasto",
  },
  {
    id: 27,
    icon: "📜",
    cat: "OPPIMINEN",
    col: "var(--amber)",
    title: "Paikallinen historia",
    desc: "Etsi lähistöltä historiallinen merkki, muistokivi tai tietokyltti. Lue se kokonaan. Ota siitä kuva.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 28,
    icon: "🔤",
    cat: "OPPIMINEN",
    col: "var(--amber)",
    title: "Kylttiretki",
    desc: "Kävele korttelin verran ja lue jokainen kyltti ääneen (hiljaa itseksesi). Kiinnitä huomiota kaikkiin yksityiskohtiin.",
    time: "20 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 29,
    icon: "🎓",
    cat: "OPPIMINEN",
    col: "var(--amber)",
    title: "Uusi taito",
    desc: "Opi yksi konkreettinen pieni taito tänään. Solmu, origami, taikatempu, näppäinyhdistelmä. Harjoittele kunnes se onnistuu.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },

  // RUOKA
  {
    id: 30,
    icon: "🍜",
    cat: "RUOKA",
    col: "var(--red)",
    title: "Tuntematon maku",
    desc: "Osta tai tilaa jokin ruoka tai juoma, jota et ole koskaan maistanut. Voi olla kaupan hyllyltä tai ravintolasta.",
    time: "30 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 31,
    icon: "🛒",
    cat: "RUOKA",
    col: "var(--red)",
    title: "Pimeä ostos",
    desc: "Mene ruokakauppaan. Valitse kolme tuotetta satunnaisesti — ota ensimmäinen asia, jonka silmäsi kohtaavat joka hyllyllä. Tee niistä ateria.",
    time: "1.5 h",
    diff: "Haastava",
    hasMap: true,
    mapQ: "ruokakauppa",
  },
  {
    id: 32,
    icon: "🌍",
    cat: "RUOKA",
    col: "var(--red)",
    title: "Maailman makuja",
    desc: "Etsi ravintola tai kauppa, joka edustaa kulttuuria, jonka ruokaa et ole koskaan maistanut. Tilaa jotain.",
    time: "1 h",
    diff: "Helppo",
    hasMap: true,
    mapQ: "ravintola",
  },

  // LIIKUNTA
  {
    id: 33,
    icon: "🏃",
    cat: "LIIKUNTA",
    col: "var(--copper)",
    title: "Fartlek",
    desc: "Mene ulos. Juokse 30 sekuntia, kävele 90 sekuntia — toista kahdeksan kertaa. Valitse reitti suoraan nenäsi edestä.",
    time: "25 min",
    diff: "Keskitaso",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 34,
    icon: "🪜",
    cat: "LIIKUNTA",
    col: "var(--copper)",
    title: "Portaiden etsintä",
    desc: "Löydä niin monta erilaista portaikkoa tai askelmaa lähistöltä kuin mahdollista. Nouse jokainen.",
    time: "45 min",
    diff: "Helppo",
    hasMap: false,
    mapQ: null,
  },
  {
    id: 35,
    icon: "💃",
    cat: "LIIKUNTA",
    col: "var(--copper)",
    title: "Tanssihetki",
    desc: "Valitse kappale. Mene paikkaan, jossa olet yksin. Tanssi se kokonaan läpi. Ei puolivillaisesti.",
    time: "10 min",
    diff: "Haastava",
    hasMap: false,
    mapQ: null,
  },
];

let allTasks = [...TASKS];
const diffColor = {
  Helppo: "var(--sage)",
  Keskitaso: "var(--amber)",
  Haastava: "var(--red)",
};
const FAKE_SLOTS = ["🧭", "⚔️", "🏺", "🗝️", "📜", "🪶", "🔭", "⛵", "🗡️", "🏛️"];

let state = {
  done: 0,
  completed: new Set(),
  dismissed: new Set(),
  currentTask: null,
  rolling: false,
};

const STORE_KEY = "seikkailu-v1";

function saveState() {
  try {
    const generated = allTasks.slice(TASKS.length);
    localStorage.setItem(
      STORE_KEY,
      JSON.stringify({
        completed: [...state.completed],
        dismissed: [...state.dismissed],
        generated,
      }),
    );
  } catch (e) {}
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved)) {
      state.completed = new Set(saved);
    } else {
      if (Array.isArray(saved.generated) && saved.generated.length) {
        const nextId = TASKS.length;
        saved.generated.forEach((t, i) => {
          allTasks.push(sanitizeTask({ ...t, id: nextId + i }));
        });
      }
      state.completed = new Set(
        Array.isArray(saved.completed) ? saved.completed : [],
      );
      state.dismissed = new Set(
        Array.isArray(saved.dismissed) ? saved.dismissed : [],
      );
    }
    state.done = state.completed.size;
  } catch (e) {}
}

// ── Confetti ──────────────────────────────────────────────────────────────────
let canvas,
  ctx,
  particles = [],
  animId = null;
const CCOLS = [
  "#c89a1a",
  "#8b1a1a",
  "#b87030",
  "#6b8c42",
  "#e0d4b4",
  "#d4880a",
  "#c4a050",
  "#7a4a20",
];

function initConfetti() {
  canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
}

function resizeCanvas() {
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
}

function spawnConfetti(n = 90) {
  for (let i = 0; i < n; i++)
    particles.push({
      x: Math.random() * canvas.width,
      y: -10 - Math.random() * 50,
      vx: (Math.random() - 0.5) * 5,
      vy: 2 + Math.random() * 4,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: CCOLS[Math.floor(Math.random() * CCOLS.length)],
      rot: Math.random() * Math.PI * 2,
      spin: (Math.random() - 0.5) * 0.3,
      life: 1.0,
    });
  if (!animId) animateConfetti();
}

function animateConfetti() {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.spin;
    p.vy += 0.1;
    p.vx *= 0.99;
    if (p.y > canvas.height - 20) p.life -= 0.04;
    ctx.save();
    ctx.globalAlpha = Math.max(0, p.life);
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.restore();
  });
  particles = particles.filter((p) => p.life > 0);
  animId = particles.length ? requestAnimationFrame(animateConfetti) : null;
  if (!animId) ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ── Toast ─────────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, color = "var(--gold)") {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.style.borderColor = color;
  t.style.color = color;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 3000);
}

// ── Map / Geolocation ─────────────────────────────────────────────────────────
let leafletMap = null;
let userLatLng = null;
let geoDenied = false;
let geoAsked = false;

function initLeaflet() {
  if (leafletMap) return;

  const mapEl = document.getElementById("leaflet-map");
  if (!mapEl) return;

  leafletMap = L.map(mapEl, { zoomControl: true });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
    maxZoom: 18,
  }).addTo(leafletMap);

  const icon = L.divIcon({
    html: `<div style="width:12px;height:12px;background:#c89a1a;border:2px solid #e0d4b4;border-radius:50%;box-shadow:0 0 8px rgba(200,154,26,0.7);"></div>`,
    className: "",
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      userLatLng = [pos.coords.latitude, pos.coords.longitude];
      leafletMap.setView(userLatLng, 14);
      L.marker(userLatLng, { icon })
        .addTo(leafletMap)
        .bindPopup("Olet tässä")
        .openPopup();
      updateMapsLink(state.currentTask);
    },
    () => {
      geoDenied = true;
      mapEl.style.display = "none";
      document.getElementById("map-denied").style.display = "flex";
    },
    { timeout: 12000 },
  );
  geoAsked = true;
}

// Turvallinen Google Maps HTTPS-linkki
function updateMapsLink(task) {
  const btn = document.getElementById("map-open-btn");
  if (!btn || !userLatLng || !task) return;

  const [lat, lng] = userLatLng;
  if (task.mapQ) {
    btn.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(task.mapQ)}`;
  } else {
    btn.href = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
}

function showMap(task) {
  const section = document.getElementById("map-section");
  if (!section) return;

  if (task && task.hasMap) {
    section.classList.add("visible");
    if (!geoAsked) initLeaflet();
    setTimeout(() => leafletMap && leafletMap.invalidateSize(), 60);
    updateMapsLink(task);
  } else {
    section.classList.remove("visible");
  }
}

// ── Roll & Core Logic ─────────────────────────────────────────────────────────
function rollAdventure() {
  if (state.rolling) return;
  const available = allTasks.filter(
    (t) => !state.completed.has(t.id) && !state.dismissed.has(t.id),
  );
  if (!available.length) {
    showToast("✦ Kaikki seikkailut tehty!", "var(--gold)");
    return;
  }

  state.rolling = true;
  document.getElementById("roll-btn").disabled = true;
  document.getElementById("secondary-actions").classList.remove("visible");
  document.getElementById("main-card").classList.add("rolling");
  showMap(null);

  const spinEl = document.getElementById("spin-icon");
  const titEl = document.getElementById("task-title");
  const catEl = document.getElementById("task-category");

  let ticks = 0;
  const interval = setInterval(() => {
    spinEl.textContent = FAKE_SLOTS[ticks % FAKE_SLOTS.length];
    titEl.innerHTML = `<span style="opacity:.25;font-size:1rem;letter-spacing:6px;font-family:var(--font-h)">${"— ".repeat(3 + (ticks % 3))}</span>`;
    catEl.textContent = "· · ·";
    if (++ticks >= 20) {
      clearInterval(interval);
      finishRoll(available);
    }
  }, 90);
}

function finishRoll(available) {
  let pool = available.filter(
    (t) => !state.currentTask || t.id !== state.currentTask.id,
  );
  if (!pool.length) pool = available;
  const task = pool[Math.floor(Math.random() * pool.length)];
  state.currentTask = task;

  document.getElementById("main-card").classList.remove("rolling");
  document.getElementById("roll-btn").disabled = false;
  state.rolling = false;

  renderTask(task);
  showToast(`✦ ${task.title}`, task.col);
}

function renderTask(task) {
  document.getElementById("spin-icon").textContent = task.icon;
  document.getElementById("task-category").textContent = task.cat;
  document.getElementById("task-category").style.color = safeCol(task.col);
  document.getElementById("task-title").textContent = task.title;
  document.getElementById("task-desc").textContent = task.desc;

  const dc = diffColor[task.diff] || "var(--amber)";
  document.getElementById("task-meta").innerHTML =
    `<div class="meta-pill"><div class="dot" style="background:${dc}"></div>${esc(task.diff)}</div>` +
    `<div class="meta-pill"><div class="dot" style="background:var(--gold)"></div>${esc(task.time)}</div>`;

  showMap(task);

  document
    .querySelectorAll(".task-item")
    .forEach((el) => el.classList.remove("active"));
  const li = document.querySelector(`.task-item[data-id="${task.id}"]`);
  if (li) {
    li.classList.add("active");
    li.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  document.getElementById("secondary-actions").classList.add("visible");
}

function markCurrentDone() {
  if (state.currentTask) markDone(state.currentTask);
}

function markDone(task) {
  if (state.completed.has(task.id)) return;
  state.completed.add(task.id);
  state.done++;
  saveState();
  updateCounters();
  spawnConfetti(90);
  showToast(`✦ ${task.title}`, "var(--sage)");

  const li = document.querySelector(`.task-item[data-id="${task.id}"]`);
  if (li) {
    li.classList.add("completed");
    const chk = li.querySelector(".task-check");
    chk.innerHTML = "✦";
    Object.assign(chk.style, {
      background: "rgba(200,154,26,0.15)",
      borderColor: "rgba(200,154,26,0.5)",
      color: "var(--gold)",
      fontWeight: "900",
    });
  }

  if (state.currentTask && state.currentTask.id === task.id) {
    state.currentTask = null;
    document.getElementById("secondary-actions").classList.remove("visible");
  }
}

function updateCounters() {
  const active = allTasks.filter((t) => !state.dismissed.has(t.id)).length;
  const badge = document.getElementById("done-badge");
  if (badge) {
    badge.textContent = `${state.done} / ${active} seikkailua tehty`;
    badge.classList.toggle("has-done", state.done > 0);
  }
  const countEl = document.getElementById("tasks-count");
  if (countEl) countEl.textContent = `${state.done} / ${active}`;
}

function appendTaskToList(t) {
  if (state.dismissed.has(t.id)) return;

  const list = document.getElementById("tasks-list");
  if (!list) return;

  const el = document.createElement("div");
  el.className = "task-item" + (state.completed.has(t.id) ? " completed" : "");
  el.dataset.id = t.id;
  el.innerHTML =
    `<div class="task-icon">${esc(t.icon)}</div>` +
    `<div class="task-info"><div class="task-name">${esc(t.title)}</div><div class="task-cat" style="color:${safeCol(t.col)}">${esc(t.cat)}</div></div>` +
    `<div class="task-check">${state.completed.has(t.id) ? "✦" : ""}</div>` +
    `<button class="dismiss-btn" title="Poista listalta" aria-label="Poista">×</button>`;

  if (state.completed.has(t.id)) {
    const chk = el.querySelector(".task-check");
    Object.assign(chk.style, {
      background: "rgba(200,154,26,0.15)",
      borderColor: "rgba(200,154,26,0.5)",
      color: "var(--gold)",
      fontWeight: "900",
    });
  }

  el.querySelector(".dismiss-btn").addEventListener("click", (e) => {
    e.stopPropagation();
    dismissTask(t.id);
  });

  el.addEventListener("click", () => {
    if (state.completed.has(t.id)) return;
    state.currentTask = t;
    renderTask(t);
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  list.appendChild(el);
}

function renderTaskList() {
  allTasks.forEach((t) => appendTaskToList(t));
}

// ── AI Generation ─────────────────────────────────────────────────────────────
// VAROITUS: Tuotantokäytössä API-avain tulisi pitää suojattuna erillisellä taustapalvelimella (backend).
const GEMINI_KEY = "AIzaSyAgK_J3hK17vBcjByH_P5lW7sUa5aXubDg";

async function generateTasks() {
  if (!GEMINI_KEY) {
    showToast("Gemini-avain puuttuu lähdekoodista", "var(--red)");
    return;
  }

  const btn = document.getElementById("gen-btn");
  btn.disabled = true;
  btn.classList.add("loading");
  btn.textContent = "";

  const existingTitles = allTasks.map((t) => t.title).join(", ");

  const prompt = `Generoi 5 uutta suomalaista seikkailua JSON-taulukkona. Vastaa VAIN JSON-taulukolla — ei selityksiä, ei markdown-koodia, pelkkä JSON.
Kaavio per elementti:
{"icon":"emoji","cat":"KATEGORIA","col":"var(--copper)","title":"Otsikko","desc":"Kuvaus suomeksi.","time":"X min","diff":"Helppo|Keskitaso|Haastava","hasMap":true|false,"mapQ":null}

Kategoriat ja col-arvot:
- TUTKIMUS → var(--copper)
- LUOVUUS → var(--red)
- SOSIAALINEN → var(--gold)
- HENKINEN → var(--sepia)
- LUONTO → var(--sage)
- OPPIMINEN → var(--amber)
- RUOKA → var(--red)
- LIIKUNTA → var(--copper)

Ohjeet:
- Tehtävät sopivat kaupunkiin, lähiöön JA maaseudulle
- hasMap:true vain jos tehtävä hyötyy sijainnin näyttämisestä
- mapQ on Googlehaku kuten "kahvila" tai null
- Kuvaukset ovat konkreettisia, ytimekkäitä, max 2 virkettä
- Vältä näitä jo olemassa olevia aiheita: ${existingTitles}

Palauta vain JSON-taulukko.`;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 1.1, maxOutputTokens: 2048 },
        }),
      },
    );

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      const msg = err.error?.message || `HTTP ${res.status}`;
      showToast(`Virhe: ${msg}`, "var(--red)");
      return;
    }

    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    const match = text.match(/\[[\s\S]*\]/);
    if (!match) {
      showToast("Vastaus ei ollut JSON", "var(--red)");
      return;
    }

    const newTasks = JSON.parse(match[0]);
    if (!Array.isArray(newTasks) || !newTasks.length) {
      showToast("Tyhjä vastaus", "var(--red)");
      return;
    }

    const startId = allTasks.length;
    newTasks.forEach((t, i) => {
      const safe = sanitizeTask({ ...t, id: startId + i });
      allTasks.push(safe);
      appendTaskToList(safe);
    });

    saveState();
    updateCounters();
    showToast(`✦ ${newTasks.length} uutta seikkailua lisätty`, "var(--gold)");
  } catch (e) {
    showToast("Verkkovirhe — yritä uudelleen", "var(--red)");
  } finally {
    btn.disabled = false;
    btn.classList.remove("loading");
    btn.textContent = "✦ Generoi uusia seikkailuja";
  }
}

function dismissTask(id) {
  state.dismissed.add(id);
  saveState();
  updateCounters();

  if (state.currentTask && state.currentTask.id === id) {
    state.currentTask = null;
    document.getElementById("secondary-actions").classList.remove("visible");
    document.getElementById("spin-icon").textContent = "🧭";
    document.getElementById("task-category").textContent = "Odottaa komentoa";
    document.getElementById("task-category").style.color = "var(--gold)";
    document.getElementById("task-title").innerHTML =
      '<span class="idle-prompt">Paina nappia ja aloita seikkailu</span>';
    document.getElementById("task-desc").textContent = "";
    document.getElementById("task-meta").innerHTML = "";
    showMap(null);
  }

  const li = document.querySelector(`.task-item[data-id="${id}"]`);
  if (li) {
    li.classList.add("dismissing");
    setTimeout(() => li.remove(), 330);
  }

  showToast("Poistettu listalta", "var(--cream-dim)");
}

function toggleLog() {
  const section = document.querySelector(".tasks-section");
  const badge = document.getElementById("log-badge");
  const header = section.querySelector("h2");
  const logEmpty = document.getElementById("log-empty");
  const logActive = section.classList.toggle("log-mode");

  badge.classList.toggle("log-active", logActive);
  badge.querySelector("span").textContent = logActive
    ? "← Kaikki seikkailut"
    : "Expedition Log";
  header.textContent = logActive ? "Expedition Log" : "Kaikki seikkailut";

  const items = section.querySelectorAll(".task-item");

  if (logActive) {
    let shown = 0;
    items.forEach((item) => {
      const isDone = item.classList.contains("completed");
      item.style.display = isDone ? "" : "none";
      if (isDone) shown++;
    });
    logEmpty.style.display = shown === 0 ? "block" : "none";
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    items.forEach((item) => {
      item.style.display = "";
    });
    logEmpty.style.display = "none";
  }
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initConfetti();
  loadState();
  renderTaskList();
  updateCounters();

  const genSection = document.getElementById("generate-section");
  if (genSection && !GEMINI_KEY) {
    genSection.style.display = "none";
  }

  // Kiinnitetään tapahtumankuuntelijat DOM-elementteihin turvallisesti JS:n kautta
  const bind = (id, event, fn) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener(event, fn);
  };

  bind("log-badge", "click", toggleLog);
  bind("roll-btn", "click", rollAdventure);
  bind("reroll-btn", "click", rollAdventure);
  bind("done-btn", "click", markCurrentDone);
  bind("gen-btn", "click", generateTasks);
});
