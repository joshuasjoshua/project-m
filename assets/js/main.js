// Mobile menu, dropdowns, work filter and scroll reveal.
(function () {
  var body = document.body;
  var toggle = document.querySelector('.nav-toggle');
  var header = document.querySelector('.site-header');

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = !body.classList.contains('nav-open');
      document.documentElement.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
      body.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open);
    });
  }

  document.querySelectorAll('.has-menu > button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.parentElement;
      var open = !li.classList.contains('open');
      document.querySelectorAll('.has-menu.open').forEach(function (o) {
        o.classList.remove('open');
        o.firstElementChild.setAttribute('aria-expanded', 'false');
      });
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.has-menu') && window.innerWidth > 960) {
      document.querySelectorAll('.has-menu.open').forEach(function (o) { o.classList.remove('open'); });
    }
  });

  // Work page filter
  var chips = document.querySelectorAll('.chip[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chips.forEach(function (c) { c.classList.remove('is-active'); });
      chip.classList.add('is-active');
      var f = chip.getAttribute('data-filter');
      document.querySelectorAll('.filterable > [data-industry]').forEach(function (el) {
        el.style.display = f === 'all' || el.getAttribute('data-industry') === f ? '' : 'none';
      });
    });
  });

  // Reveal on scroll
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.card, .project, .product, .insight, .steps li, .section-head').forEach(function (el) {
      el.classList.add('reveal');
      io.observe(el);
    });
  }
})();
