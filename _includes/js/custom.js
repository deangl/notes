// --- Enable Chinese search ---
// lunr's default trimmer strips all non-ASCII tokens (JS \w is ASCII-only),
// which would delete every CJK token. Replace it with a no-op.
lunr.trimmer = function (token) { return token; };
lunr.Pipeline.registerFunction(lunr.trimmer, 'noop-trimmer');

// lunr's tokenizer only splits on whitespace/hyphens, so a Chinese phrase is
// indexed as one token. Insert a space between adjacent Han characters so the
// original tokenizer yields one token per character.
var _origTokenizer = lunr.tokenizer;
var _han = /[\u4e00-\u9fff]/g;
lunr.tokenizer = function (str, metadata) {
  if (!lunr.tokenizer.separator) lunr.tokenizer.separator = _origTokenizer.separator;
  if (typeof str === 'string') {
    str = str.replace(_han, function (ch, offset) { return offset > 0 ? ' ' + ch : ch; });
  }
  return _origTokenizer.call(this, str, metadata);
};

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
