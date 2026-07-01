

# 🌍 AfriTalent — Plateforme de freelances tech africains

## Informations
- **Projet** : AfriTalent — Semestre 2
- **Auteur** : [SERIGNE FALLOU FALL]
- **Classe** : [L1 RT]
- **Date** : 2026

---

## Description

AfriTalent est le site vitrine d'une plateforme fictive de mise en relation entre freelances tech africains et entreprises locales et internationales. Le site présente la plateforme, ses fonctionnalités, ses tarifs, des profils de freelances, et convainc les visiteurs de s'inscrire.

---

## Technologies utilisées

- **HTML5** — Structure sémantique (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- **CSS3** — Variables CSS, Flexbox, CSS Grid, Bento Grid, animations, transitions, responsive design
- **Bootstrap 5.3** — Grille, navbar, carousel, accordion, modal (via CDN)
- **Bootstrap Icons 1.11** — Icônes (via CDN)
- **Google Fonts** — Baloo 2 (titres) + Inter (corps)
- **JavaScript Vanilla** — 7 fonctionnalités interactives

---

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Page d'accueil : Hero, Stats, Comment ça marche, Catégories, Témoignages, CTA |
| `freelances.html` | Catalogue de 9 freelances avec filtres dynamiques et modal |
| `tarifs.html` | 3 plans tarifaires + FAQ accordion Bootstrap |
| `about.html` | Histoire, Chiffres clés (Bento Grid), Équipe, Valeurs |
| `contact.html` | Formulaire validé JS + infos contact + Google Maps |

---

## Fonctionnalités JavaScript

1. ✅ **Dark / Light Mode** — toggle avec sauvegarde `localStorage`
2. ✅ **Compteurs animés** — `IntersectionObserver`, de 0 à la valeur cible
3. ✅ **Filtrage dynamique** — freelances filtrés par catégorie sans rechargement
4. ✅ **Validation de formulaire** — regex email, longueur message, messages d'erreur
5. ✅ **Navbar dynamique** — effet shrink + ombre au scroll
6. ✅ **Bouton "Retour en haut"** — smooth scroll
7. ✅ **Animations fade-in** — `IntersectionObserver` sur toutes les sections

---

## Arborescence

```
AfriTalent/
├── index.html
├── freelances.html
├── tarifs.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
├── docs/
│   └── Presentation.pptx
├── README.md
└── .gitignore
```

---

## Lancer le projet localement

```bash
git clone https://github.com/VOTRE-NOM/NOM-Prenom-AfriTalent.git
cd NOM-Prenom-AfriTalent
# Ouvrir index.html dans votre navigateur
open index.html
```

---

## Lien GitHub Pages

🔗 [https://VOTRE-NOM.github.io/NOM-Prenom-AfriTalent/](https://VOTRE-NOM.github.io/NOM-Prenom-AfriTalent/)

---

## Ressources consultées

- [MDN Web Docs](https://developer.mozilla.org/fr/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Google Fonts](https://fonts.google.com/)
- [CSS-Tricks — CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [W3C Validator](https://validator.w3.org/)