
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
/* ============================================================
   6. FILTRAGE DYNAMIQUE DES FREELANCES
   Filtre les cartes par catégorie sans rechargement de page
   ============================================================ */
const filterBtns = document.querySelectorAll('.filter-btn');
const flCards    = document.querySelectorAll('.fl-card-wrapper');

filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    // Mise à jour du bouton actif
    filterBtns.forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    // Afficher / masquer les cartes selon la catégorie
    flCards.forEach(function (card) {
      const cat = card.getAttribute('data-cat');
      if (filter === 'all' || cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ============================================================
   7. VALIDATION DE FORMULAIRE — page contact
   Validation complète avec messages d'erreur visuels
   ============================================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Pas d'envoi réel
    let isValid = true;

    // --- Réinitialise tous les états ---
    contactForm.querySelectorAll('.form-control, .form-select').forEach(function (el) {
      el.classList.remove('is-valid', 'is-invalid');
    });
    contactForm.querySelectorAll('.error-msg').forEach(function (el) {
      el.classList.remove('show');
    });

    // --- Nom ---
    const nom = document.getElementById('nom');
    if (!nom.value.trim()) {
      showError(nom, 'nomError', 'Le nom est obligatoire.');
      isValid = false;
    } else {
      nom.classList.add('is-valid');
    }

    // --- Prénom ---
    const prenom = document.getElementById('prenom');
    if (!prenom.value.trim()) {
      showError(prenom, 'prenomError', 'Le prénom est obligatoire.');
      isValid = false;
    } else {
      prenom.classList.add('is-valid');
    }

    // --- Email — vérification par regex ---
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'emailError', 'L\'email est obligatoire.');
      isValid = false;
    } else if (!emailRegex.test(email.value.trim())) {
      showError(email, 'emailError', 'Veuillez entrer un email valide (ex : nom@domaine.com).');
      isValid = false;
    } else {
      email.classList.add('is-valid');
    }

    // --- Sujet ---
    const sujet = document.getElementById('sujet');
    if (!sujet.value) {
      showError(sujet, 'sujetError', 'Veuillez choisir un sujet.');
      isValid = false;
    } else {
      sujet.classList.add('is-valid');
    }

    // --- Message — minimum 20 caractères ---
    const message = document.getElementById('message');
    if (!message.value.trim()) {
      showError(message, 'messageError', 'Le message est obligatoire.');
      isValid = false;
    } else if (message.value.trim().length < 20) {
      showError(message, 'messageError', 'Le message doit contenir au moins 20 caractères.');
      isValid = false;
    } else {
      message.classList.add('is-valid');
    }

    // --- Succès ---
    if (isValid) {
      const toast = document.getElementById('successToast');
      if (toast) {
        toast.classList.add('show');
        // Réinitialise le formulaire après 3s
        setTimeout(function () {
          contactForm.reset();
          toast.classList.remove('show');
          contactForm.querySelectorAll('.form-control, .form-select').forEach(function (el) {
            el.classList.remove('is-valid', 'is-invalid');
          });
        }, 3500);
      }
    }
  });
}

/**
 * Affiche un message d'erreur sous un champ
 * @param {HTMLElement} field  - Le champ en erreur
 * @param {string} errorId     - L'id de l'élément d'erreur
 * @param {string} msg         - Le message à afficher
 */
function showError(field, errorId, msg) {
  field.classList.add('is-invalid');
  const errEl = document.getElementById(errorId);
  if (errEl) {
    errEl.textContent = msg;
    errEl.classList.add('show');
  }
}

/* ============================================================
   FOOTER — Année dynamique
   ============================================================ */
const yearEls = document.querySelectorAll('.current-year');
yearEls.forEach(function (el) {
  el.textContent = new Date().getFullYear();
});

/* ============================================================
   MODAL — Gestion du bouton "Voir le profil"
   ============================================================ */
const profileBtns = document.querySelectorAll('.btn-profile');
profileBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    const card = btn.closest('.fl-card');
    if (!card) return;
    const name = card.querySelector('.fl-name')?.textContent || '';
    const role = card.querySelector('.fl-role')?.textContent || '';
    const rate = card.querySelector('.fl-rate')?.textContent || '';

    // Injecte les données dans la modal
    const modalName = document.getElementById('modalName');
    const modalRole = document.getElementById('modalRole');
    const modalRate = document.getElementById('modalRate');
    if (modalName) modalName.textContent = name;
    if (modalRole) modalRole.textContent = role;
    if (modalRate) modalRate.textContent = rate;
  });
});