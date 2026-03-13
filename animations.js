/* =====================================================
   peplogix — Scroll Reveal Animations
   IntersectionObserver-based scroll triggers
   ===================================================== */

(function () {
  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal--left, .reveal--right, .reveal--scale').forEach(function (el) {
    observer.observe(el);
  });
})();
