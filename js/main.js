
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