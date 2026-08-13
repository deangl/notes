// Sidebar toggle: hidden by default on desktop, button in the main header shows/hides it.
jtd.onReady(function () {
  var toggle = document.getElementById('jtd-nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function (e) {
      e.preventDefault();
      var open = document.body.classList.toggle('jtd-nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Clicking a category row also expands/collapses its article list.
  var nav = document.getElementById('site-nav');
  if (nav) {
    nav.addEventListener('click', function (e) {
      var cat = e.target.closest('.nav-category');
      if (!cat) return;
      var item = cat.closest('.nav-list-item');
      var expander = item && item.querySelector(':scope > .nav-list-expander');
      if (!expander) return;
      e.preventDefault();
      expander.ariaExpanded = item.classList.toggle('active');
    });
  }
});
