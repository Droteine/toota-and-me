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
  } else {
    lockError.classList.remove('hidden');
  }
}

lockBtn.addEventListener('click', tryUnlock);
lockInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryUnlock();
});

// --- Timeline moments ---
// Add or edit moments here. photo: leave "" if you don't have the image yet.
// Add noPhoto: true to a moment to skip the photo box entirely (no placeholder shown).
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
        : `<div class="placeholder">📷 حطي الصورة هنا لاحقاً</div>`;
      photoBlock = `<div class="page-photo">${photoContent}</div>`;
    }

    page.innerHTML = `
      <div class="page-date"><span class="heart">❤️</span><span class="date-text">${m.date}</span></div>
      ${photoBlock}
      <div class="page-text">${m.text}</div>
    `;
    book.appendChild(page);
  });
  updateView();
}

function updateView() {
  const pages = document.querySelectorAll('.page');
  pages.forEach((page, i) => {
    page.classList.toggle('flipped', i < current);
  });
  pageCount.textContent = `${current + 1} / ${moments.length}`;
  prevBtn.disabled = current >= moments.length - 1;
  nextBtn.disabled = current <= 0;
  surpriseBtn.classList.toggle('hidden', current !== moments.length - 1);
}

nextBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    updateView();
  }
});

prevBtn.addEventListener('click', () => {
  if (current < moments.length - 1) {
    current++;
    updateView();
  }
});

surpriseBtn.addEventListener('click', () => {
  surpriseOverlay.classList.remove('hidden');
});

closeOverlay.addEventListener('click', () => {
  surpriseOverlay.classList.add('hidden');
});

surpriseOverlay.addEventListener('click', (e) => {
  if (e.target === surpriseOverlay) surpriseOverlay.classList.add('hidden');
});

buildPages();
