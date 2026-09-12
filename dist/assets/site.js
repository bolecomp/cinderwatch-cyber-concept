(() => {
  const toggles = document.querySelectorAll('[data-nav-toggle]');
  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const menu = document.querySelector('[data-nav-links]');
      const isOpen = menu?.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
  });

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
