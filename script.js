// ===================== DARK MODE =====================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.classList.toggle('dark', savedTheme === 'dark');
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon(isDark ? 'dark' : 'light');
});

function updateThemeIcon(theme) {
  themeToggle.innerHTML = theme === 'dark'
    ? `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    : `<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
}

// ===================== MOBILE NAV =====================
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});
document.querySelectorAll('#mobileMenu a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ===================== SMOOTH SCROLL =====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===================== NAVBAR SCROLL =====================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('shadow-lg', window.scrollY > 50);
  navbar.classList.toggle('py-2', window.scrollY > 50);
  const backTop = document.getElementById('backToTop');
  backTop.classList.toggle('opacity-0', window.scrollY < 300);
  backTop.classList.toggle('pointer-events-none', window.scrollY < 300);
});

// ===================== BACK TO TOP =====================
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================== GALLERY FILTER =====================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active-filter'));
    btn.classList.add('active-filter');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeInUp 0.4s ease forwards';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ===================== LIGHTBOX =====================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxDesc = document.getElementById('lightboxDesc');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const title = item.dataset.title || '';
    const desc = item.dataset.desc || '';
    lightboxImg.src = img.src;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent = desc;
    lightbox.classList.remove('hidden');
    lightbox.classList.add('flex');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('closeLightbox').addEventListener('click', closeLB);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

function closeLB() {
  lightbox.classList.add('hidden');
  lightbox.classList.remove('flex');
  document.body.style.overflow = '';
}

// ===================== FEATURED CAROUSEL =====================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');

function goToSlide(n) {
  slides[currentSlide].classList.remove('opacity-100');
  slides[currentSlide].classList.add('opacity-0');
  dots[currentSlide].classList.remove('bg-orange-500', 'w-6');
  dots[currentSlide].classList.add('bg-white/40', 'w-3');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.remove('opacity-0');
  slides[currentSlide].classList.add('opacity-100');
  dots[currentSlide].classList.add('bg-orange-500', 'w-6');
  dots[currentSlide].classList.remove('bg-white/40', 'w-3');
}

document.getElementById('prevSlide')?.addEventListener('click', () => goToSlide(currentSlide - 1));
document.getElementById('nextSlide')?.addEventListener('click', () => goToSlide(currentSlide + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
setInterval(() => goToSlide(currentSlide + 1), 4500);

// ===================== CATEGORY CARDS FILTER =====================
document.querySelectorAll('.cat-card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat;
    document.querySelector('#gallery').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      document.querySelector(`.filter-btn[data-filter="${cat}"]`)?.click();
    }, 600);
  });
});

// ===================== CONTACT FORM =====================
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg = document.getElementById('fmessage').value.trim();
  const err = document.getElementById('formError');
  const suc = document.getElementById('formSuccess');
  err.classList.add('hidden'); suc.classList.add('hidden');

  if (!name || !email || !msg) {
    err.textContent = 'Please fill in all fields.';
    err.classList.remove('hidden'); return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    err.textContent = 'Please enter a valid email address.';
    err.classList.remove('hidden'); return;
  }
  suc.classList.remove('hidden');
  contactForm.reset();
  setTimeout(() => suc.classList.add('hidden'), 4000);
});

// ===================== SCROLL REVEAL =====================
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// ===================== LOADING SCREEN =====================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.style.opacity = '0'; setTimeout(() => loader.remove(), 500); }, 800);
});

// ===================== HERO PARTICLES =====================
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = canvas.parentElement.offsetHeight;
  const colors = ['#f97316', '#ec4899', '#facc15', '#a855f7', '#06b6d4'];
  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 3 + 1,
    dx: (Math.random() - 0.5) * 0.6,
    dy: (Math.random() - 0.5) * 0.6,
    color: colors[Math.floor(Math.random() * colors.length)],
    alpha: Math.random() * 0.6 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = canvas.parentElement.offsetHeight;
  });
})();
