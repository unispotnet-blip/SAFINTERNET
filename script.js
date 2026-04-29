/* =========================================================
   Safinternet — JS interactions
   ========================================================= */
(function () {
  'use strict';

  /* -------- Header shadow on scroll -------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 10) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------- Mobile nav toggle -------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navToggle.classList.remove('active');
        mainNav.classList.remove('open');
      });
    });
  }

  /* -------- Scroll reveal -------- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('in-view'));
  }

  /* -------- Smooth scroll for in-page anchors -------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (ev) => {
      const id = link.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          ev.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* -------- Call popup (5s, once per session) -------- */
  const popup = document.getElementById('callPopup');
  const popupClose = document.getElementById('popupClose');
  const popupCloseBtn = document.getElementById('popupCloseBtn');
  const popupOverlay = document.getElementById('popupOverlay');

  function showPopup() {
    if (!popup) return;
    if (sessionStorage.getItem('cp_popup_shown') === '1') return;
    popup.classList.add('show');
    popup.setAttribute('aria-hidden', 'false');
    sessionStorage.setItem('cp_popup_shown', '1');
  }
  function hidePopup() {
    if (!popup) return;
    popup.classList.remove('show');
    popup.setAttribute('aria-hidden', 'true');
  }
  if (popup) {
    setTimeout(showPopup, 5000);
    [popupClose, popupCloseBtn, popupOverlay].forEach((el) => {
      if (el) el.addEventListener('click', hidePopup);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') hidePopup();
    });
  }
})();

/* -------- Contact form submit (no backend; show success) -------- */
function handleContactSubmit(ev) {
  ev.preventDefault();
  const form = ev.target;
  const success = document.getElementById('formSuccess');
  if (success) {
    success.classList.add('show');
    success.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  form.reset();
  return false;
}
