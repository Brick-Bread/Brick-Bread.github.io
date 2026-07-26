/* ==========================================================================
   brick_bread — site behaviour
   Plain ES5, no build step. Every block guards on the elements it needs, so
   the same file can be loaded by the home page and the case-study page.
   ========================================================================== */

(function () {
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {

    /* ---- mobile menu ---- */
    var burger = document.getElementById('bb-burger');
    var sheet = document.getElementById('bb-sheet');
    if (burger && sheet) {
      burger.addEventListener('click', function () {
        var open = sheet.classList.toggle('bb-open');
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      sheet.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          sheet.classList.remove('bb-open');
          burger.setAttribute('aria-expanded', 'false');
          burger.setAttribute('aria-label', 'Open menu');
        });
      });
    }


    /* ---- reveal on scroll ---- */
    var rises = document.querySelectorAll('.bb-rise');
    if (rises.length) {
      if (reduced || !('IntersectionObserver' in window)) {
        rises.forEach(function (el) { el.classList.add('bb-in'); });
      } else {
        var seen = new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add('bb-in');
              seen.unobserve(e.target);
            }
          });
        }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });
        rises.forEach(function (el) { seen.observe(el); });
      }
    }

    /* ---- mark the section you're currently reading in the nav ---- */
    var navlinks = document.querySelectorAll('.bb-navlink[href^="#"]');
    if (navlinks.length && 'IntersectionObserver' in window) {
      var byId = {};
      var targets = [];
      navlinks.forEach(function (a) {
        var el = document.getElementById(a.getAttribute('href').slice(1));
        if (el) { byId[el.id] = a; targets.push(el); }
      });
      var here = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          navlinks.forEach(function (a) { a.removeAttribute('aria-current'); });
          if (byId[e.target.id]) byId[e.target.id].setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      targets.forEach(function (el) { here.observe(el); });
    }

    /* ---- case-study routing (projects/ only) ----
       Each write-up is a section that shows when its hash is active, so the
       whole set stays in one file and one request. */
    var cases = document.querySelectorAll('.bb-case');
    if (cases.length) {
      var ids = [];
      cases.forEach(function (c) { ids.push(c.id); });

      var show = function (want) {
        var id = ids.indexOf(want) > -1 ? want : ids[0];
        cases.forEach(function (c) {
          c.classList.toggle('bb-case-on', c.id === id);
        });
        document.querySelectorAll('.bb-case-switch a').forEach(function (a) {
          if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
          else a.removeAttribute('aria-current');
        });
        var open = document.getElementById(id);
        if (open) {
          var h = open.querySelector('h1');
          if (h) document.title = h.textContent.trim() + ' — brick_bread';
        }
      };

      show((location.hash || '').replace('#', ''));
      window.addEventListener('hashchange', function () {
        show((location.hash || '').replace('#', ''));
        window.scrollTo(0, 0);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
