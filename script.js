// --- Simple lock screen ---
const CORRECT_PASSWORD = "toota"; // change this to whatever word you want

const lockScreen = document.getElementById('lockScreen');
const mainContent = document.getElementById('mainContent');
const lockInput = document.getElementById('lockInput');
const lockBtn = document.getElementById('lockBtn');
const lockError = document.getElementById('lockError');

function tryUnlock() {
  if (lockInput.value.trim().toLowerCase() === CORRECT_PASSWORD.toLowerCase()) {
    lockScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    setTimeout(typeSubtitle, 300);
  } else {
    lockError.classList.remove('hidden');
  }
}

lockBtn.addEventListener('click', tryUnlock);
lockInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

// --- Typing effect for subtitle ---
function typeSubtitle() {
  const el = document.getElementById('subtitle');
  const text = 'دي حكايتنا... من يوم ما بقينا "إحنا" لحد دلوقتي';
  el.textContent = '';
  let i = 0;
  function step() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(step, 45);
    }
  }
  step();
}

// --- Floating hearts background ---
const heartsBg = document.getElementById('heartsBg');

function spawnFloatingHeart() {
  const heart = document.createElement('div');
  heart.className = 'floating-heart';
  heart.textContent = '❤';
  const left = Math.random() * 100;
  const size = 12 + Math.random() * 16;
  const duration = 8 + Math.random() * 7;
  heart.style.left = left + 'vw';
  heart.style.setProperty('--size', size + 'px');
  heart.style.setProperty('--duration', duration + 's');
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000 + 500);
}

setInterval(spawnFloatingHeart, 700);
for (let i = 0; i < 5; i++) {
  setTimeout(spawnFloatingHeart, i * 300);
}

// --- Burst hearts on surprise click ---
function burstHearts(x, y) {
  for (let i = 0; i < 18; i++) {
    const h = document.createElement('div');
    h.className = 'burst-heart';
    h.textContent = '❤️';
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 120;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    h.style.setProperty('--tx', tx + 'px');
    h.style.setProperty('--ty', ty + 'px');
    h.style.left = x + 'px';
    h.style.top = y + 'px';
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 950);
  }
}

// --- Timeline moments ---
const moments = [
  {
    date: "25 October 2023",
    photo: "images/first-message.jpg",
    text: "فاكرة أول رد بعتهولك على الستوري؟ ولا أنا ولا انتي كنا متخيلين إن ده هيبقى بداية كل حاجة"
  },
  {
    date: "5 November 2023",
    photo: "",
    noPhoto: true,
    text: "اليوم اللي بقينا فيه احنا الاتنين رسمي... من ساعتها وانتي أحلى حاجة حصلتلي يا توت"
  },
  {
    date: "29 August 2025",
    photo: "images/engagement.jpg",
    text: "يوم الخطوبة! يوم قولنا فيه بجد إحنا هنكمل مع بعض للأبد"
  },
  {
    date: "دلوقتي",
    photo: "images/now.jpg",
    text: "كان فيه أيام حلوة وأيام تعبانة، زي أي حكاية حقيقية كده... بس المهم إننا لسه هنا، ولسه مختارين بعض كل يوم"
  }
];

const book = document.getElementById('book');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageCount = document.getElementById('pageCount');
const surpriseBtn = document.getElementById('surpriseBtn');
const surpriseOverlay = document.getElementById('surpriseOverlay');
const closeOverlay = document.getElementById('closeOverlay');

let current = 0;

function buildPages() {
  book.innerHTML = '';
  moments.forEach((m, i) => {
    const page = document.createElement('div');
    page.className = 'page';
    page.style.zIndex = moments.length - i;

    let photoBlock = '';
    if (!m.noPhoto) {
      const photoContent = m.photo
        ? `<img src="${m.photo}" alt="${m.date}">`
