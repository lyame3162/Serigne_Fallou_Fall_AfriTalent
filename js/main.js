
'use strict';

// ============================================================
// 1. DARK MODE avec localStorage
// ============================================================
function initDarkMode() {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (!toggleBtn) return;
    const html = document.documentElement;
    const moonIcon = toggleBtn.querySelector('.fa-moon');
    const sunIcon = toggleBtn.querySelector('.fa-sun');

    // Restaurer le thème sauvegardé
    const savedTheme = localStorage.getItem('afritalent-theme');
    if (savedTheme === 'dark') {
        html.setAttribute('data-bs-theme', 'dark');
        moonIcon.classList.add('d-none');
        sunIcon.classList.remove('d-none');
    }

    toggleBtn.addEventListener('click', function () {
        const currentTheme = html.getAttribute('data-bs-theme');
        if (currentTheme === 'dark') {
            html.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('afritalent-theme', 'light');
            moonIcon.classList.remove('d-none');
            sunIcon.classList.add('d-none');
        } else {
            html.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('afritalent-theme', 'dark');
            moonIcon.classList.add('d-none');
            sunIcon.classList.remove('d-none');
        }
    });
}

// ============================================================
// 2. NAVBAR DYNAMIQUE AU SCROLL
// ============================================================
function initNavbarScroll() {
    const navbar = document.getElementById('mainNavbar');
    if (!navbar) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
}

// ============================================================
// 3. BOUTON RETOUR EN HAUT
// ============================================================
function initBackToTop() {
    const backBtn = document.getElementById('backToTop');
    if (!backBtn) return;
    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            backBtn.classList.add('visible');
        } else {
            backBtn.classList.remove('visible');
        }
    });
    backBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initDarkMode();
    initNavbarScroll();
    initBackToTop();
});

/* ============================================================
   4. COMPTEURS ANIMÉS AU SCROLL
   Utilise IntersectionObserver — de 0 à la valeur cible
   ============================================================ */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800; // ms
  const startTime = performance.now();

  function tick(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubique pour un effet naturel
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString('fr-FR');
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = target.toLocaleString('fr-FR');
    }
  }

  requestAnimationFrame(tick);
}

// Observer pour déclencher les compteurs quand ils entrent dans le viewport
const counters = document.querySelectorAll('[data-target]');

if (counters.length > 0) {
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = 'true'; // évite la double animation
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (counter) {
    counterObserver.observe(counter);
  });
}

/* ============================================================
   5. ANIMATIONS FADE-IN AU SCROLL
   Les sections apparaissent en fondu — IntersectionObserver
   ============================================================ */
const fadeEls = document.querySelectorAll('.fade-in-section');

if (fadeEls.length > 0) {
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        // Délai en cascade pour les éléments d'une même grille
        const delay = entry.target.dataset.delay || 0;
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });
}
