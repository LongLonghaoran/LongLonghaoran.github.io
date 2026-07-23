(function () {
  'use strict';

  // ===== Theme Management =====
  function initTheme() {
    var saved = localStorage.getItem('theme');
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateThemeIcon(next);
  }

  function updateThemeIcon(theme) {
    var btn = document.querySelector('.theme-toggle');
    if (btn) {
      btn.textContent = theme === 'dark' ? '\u2600\uFE0F' : '\u{1F319}';
    }
  }

  // ===== Navbar Scroll Effect =====
  function initNavbarScroll() {
    var navbar = document.querySelector('.navbar');
    if (!navbar) return;
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scroll = window.pageYOffset;
      if (scroll > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
      } else {
        navbar.style.boxShadow = 'none';
      }
      lastScroll = scroll;
    });
  }

  // ===== Article Category Filter =====
  function initCategoryFilter() {
    var filterBtns = document.querySelectorAll('.filter-btn');
    var cards = document.querySelectorAll('.article-card');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var category = btn.getAttribute('data-category');
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        cards.forEach(function (card) {
          if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = '';
            card.classList.add('fade-in');
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== Article Search =====
  function initArticleSearch() {
    var searchInput = document.getElementById('article-search');
    if (!searchInput) return;
    var cards = document.querySelectorAll('.article-card');

    searchInput.addEventListener('input', function () {
      var query = searchInput.value.toLowerCase().trim();
      cards.forEach(function (card) {
        var title = (card.querySelector('.article-card-title') || {}).textContent || '';
        var desc = (card.querySelector('.article-card-desc') || {}).textContent || '';
        var match = title.toLowerCase().indexOf(query) !== -1 || desc.toLowerCase().indexOf(query) !== -1;
        card.style.display = match ? '' : 'none';
      });
    });
  }

  // ===== Scroll Reveal =====
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ===== Active Nav Link =====
  function initActiveNav() {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('.navbar-links a');
    links.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // ===== Init =====
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initNavbarScroll();
    initCategoryFilter();
    initArticleSearch();
    initScrollReveal();
    initActiveNav();

    var themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
  });
})();
