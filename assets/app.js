/* ============================================================
   MARAYA — 全站共用逻辑
   页头 / 页脚 / 币种 / 询盘清单 / WhatsApp 报文
   ============================================================ */
(function () {
  var S = window.STORE;
  var CART_KEY = 'maraya_inquiry_v1';
  var CUR_KEY = 'maraya_currency_v1';

  /* ---------------- helpers ---------------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function cur() {
    try { return localStorage.getItem(CUR_KEY) || S.currency || 'USD'; } catch (e) { return 'USD'; }
  }
  function money(usd) {
    var c = cur();
    var rate = (S.rates && S.rates[c]) || 1;
    var v = usd * rate;
    var zero = (c === 'IDR' || c === 'PHP');
    var num = v.toLocaleString('en-US', {
      minimumFractionDigits: zero ? 0 : 2,
      maximumFractionDigits: zero ? 0 : 2
    });
    return ((S.symbols && S.symbols[c]) || (c + ' ')) + num;
  }
  function initials(name) {
    return name.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('');
  }
  function phHTML(p, cls) {
    var tint = p.tint || ['#D8CDBD', '#8A7157'];
    var inner = p.image
      ? '<img src="' + esc(p.image) + '" alt="' + esc(p.name) + '" loading="lazy">'
      : '<span class="ph-mono">' + esc(initials(p.name)) + '</span>';
    return '<div class="ph ' + (cls || '') + '" style="--t1:' + tint[0] + ';--t2:' + tint[1] + '">' + inner + '</div>';
  }
  function bySlug(slug) {
    for (var i = 0; i < S.products.length; i++) if (S.products[i].slug === slug) return S.products[i];
    return null;
  }

  /* ---------------- toast ---------------- */
  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('on');
    clearTimeout(toastEl._t);
    toastEl._t = setTimeout(function () { toastEl.classList.remove('on'); }, 2200);
  }

  /* ---------------- header ---------------- */
  function renderChrome(active) {
    var nav = [
      ['shop.html', 'Shop'],
      ['about.html', 'Our Story'],
      ['shipping.html', 'Shipping &amp; FAQ'],
      ['contact.html', 'Contact']
    ];
    var links = nav.map(function (n) {
      var on = n[0] === active ? ' aria-current="page"' : '';
      return '<a href="' + n[0] + '"' + on + '>' + n[1] + '</a>';
    }).join('');

    var ann = document.createElement('div');
    ann.className = 'ann';
    ann.innerHTML = 'Worldwide dispatch from our studio &nbsp;·&nbsp; <b>Quotations in USD · AED · SAR · MYR</b> &nbsp;·&nbsp; No payment until you approve';
    document.body.insertBefore(ann, document.body.firstChild);

    var hdr = document.createElement('header');
    hdr.className = 'hdr';
    hdr.innerHTML =
      '<div class="wrap hdr-in">' +
        '<a class="brand" href="index.html">' + esc(S.brand) + '</a>' +
        '<nav class="nav" id="nav">' + links + '</nav>' +
        '<div class="hdr-act">' +
          '<select class="cur" id="cur" aria-label="Currency"></select>' +
          '<button class="cart-btn" id="cartOpen" type="button">Inquiry <span class="cart-count" id="cartCount">0</span></button>' +
          '<button class="burger" id="burger" type="button" aria-label="Menu"><span></span></button>' +
        '</div>' +
      '</div>';
    ann.parentNode.insertBefore(hdr, ann.nextSibling);

    /* currency options */
    var sel = $('#cur');
    Object.keys(S.rates || { USD: 1 }).forEach(function (c) {
      var o = document.createElement('option');
      o.value = c; o.textContent = c;
      if (c === cur()) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () {
      try { localStorage.setItem(CUR_KEY, sel.value); } catch (e) {}
      paintPrices();
      renderCart();
    });

    $('#burger').addEventListener('click', function () { $('#nav').classList.toggle('open'); });
    $('#cartOpen').addEventListener('click', function () { openDrawer(); });
  }

  function paintPrices() {
    $$('.js-price').forEach(function (el) {
      el.textContent = money(parseFloat(el.getAttribute('data-usd')) || 0);
    });
  }

  /* ---------------- footer ---------------- */
  function renderFooter() {
    var f = document.createElement('footer');
    f.className = 'ftr';
    f.innerHTML =
      '<div class="wrap">' +
        '<div class="ftr-grid">' +
          '<div>' +
            '<div class="ftr-brand">' + esc(S.brand) + '</div>' +
            '<p>' + esc(S.tagline) + '. Made by hand in small batches, shipped worldwide from our studio.</p>' +
          '</div>' +
          '<div>' +
            '<h4>Shop</h4>' +
            '<ul>' +
              '<li><a href="shop.html">All objects</a></li>' +
              '<li><a href="shop.html?cat=Ceramics">Ceramics</a></li>' +
              '<li><a href="shop.html?cat=Textiles">Textiles</a></li>' +
              '<li><a href="shop.html?cat=Lighting">Lighting</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Help</h4>' +
            '<ul>' +
              '<li><a href="shipping.html">Shipping &amp; lead time</a></li>' +
              '<li><a href="shipping.html#returns">Returns</a></li>' +
              '<li><a href="about.html">Our story</a></li>' +
              '<li><a href="contact.html">Contact</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Talk to us</h4>' +
            '<ul>' +
              '<li><a href="https://wa.me/' + esc(S.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a></li>' +
              '<li><a href="mailto:' + esc(S.email) + '">' + esc(S.email) + '</a></li>' +
              '<li>@' + esc(S.instagram) + '</li>' +
              '<li>' + esc(S.leadTime) + '</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div class="ftr-bot">' +
          '<span>© ' + new Date().getFullYear() + ' ' + esc(S.brand) + '. All rights reserved.</span>' +
          '<span>Ships to ' + S.markets.length + ' markets in Southeast Asia &amp; the Gulf</span>' +
        '</div>' +
      '</div>';
    document.body.appendChild(f);

    var fab = document.createElement('a');
    fab.className = 'wa-fab';
    fab.href = 'https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent('Hello ' + S.brand + ' — I have a question about your collection.');
    fab.target = '_blank'; fab.rel = 'noopener';
    fab.innerHTML = '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1112 20zm4.5-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1-.2.2-.6.8-.7.9-.1.2-.3.2-.5.1-.2-.1-.9-.3-1.7-1-.6-.6-1-1.3-1.2-1.5-.1-.2 0-.3.1-.4l.4-.4.2-.4v-.4c0-.1-.5-1.3-.7-1.7-.2-.5-.4-.4-.5-.4h-.5c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 1.9s.8 2.2.9 2.4c.1.2 1.6 2.5 4 3.5.6.2 1 .4 1.4.5.6.2 1.1.2 1.5.1.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .2-1.1-.1-.2-.2-.2-.4-.3z"/></svg>WhatsApp';
    document.body.appendChild(fab);
  }

  /* ---------------- cart / inquiry ---------------- */
  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); } catch (e) { return []; }
  }
  function writeCart(items) {
    try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch (e) {}
    updateCount(); renderCart();
  }
  function addToCart(slug, qty) {
    var items = readCart();
    var hit = null;
    items.forEach(function (it) { if (it.slug === slug) hit = it; });
    if (hit) hit.qty += (qty || 1);
    else items.push({ slug: slug, qty: qty || 1 });
    writeCart(items);
  }
  function cartTotal() {
    return readCart().reduce(function (sum, it) {
      var p = bySlug(it.slug);
      return sum + (p ? p.price * it.qty : 0);
    }, 0);
  }
  function updateCount() {
    var n = readCart().reduce(function (s, it) { return s + it.qty; }, 0);
    var el = $('#cartCount');
    if (el) { el.textContent = n; el.style.display = n ? 'inline-flex' : 'none'; }
  }

  function buildDrawer() {
    var bd = document.createElement('div');
    bd.className = 'backdrop'; bd.id = 'bd';
    var d = document.createElement('aside');
    d.className = 'drawer'; d.id = 'drawer';
    d.innerHTML =
      '<div class="drawer-head">' +
        '<h3>Your inquiry</h3>' +
        '<button class="drawer-close" id="drawerClose" type="button" aria-label="Close">×</button>' +
      '</div>' +
      '<div class="drawer-body" id="drawerBody"></div>' +
      '<div class="drawer-foot">' +
        '<div class="sum"><span>Estimated total</span><b id="drawerTotal">—</b></div>' +
        '<p class="sum-note">Estimate only — freight and any duties are confirmed in your quotation. <b>Nothing is charged on this site.</b></p>' +
        '<div class="field"><label for="shipTo">Ship to</label><select id="shipTo">' +
          S.markets.map(function (m) { return '<option>' + esc(m) + '</option>'; }).join('') +
        '</select></div>' +
        '<div class="field-row">' +
          '<div class="field"><label for="buyerName">Name</label><input id="buyerName" type="text" placeholder="Your name"></div>' +
          '<div class="field"><label for="buyerQtyLabel">Notes</label><input id="buyerNote" type="text" placeholder="Optional"></div>' +
        '</div>' +
        '<button class="btn clay block" id="sendWa" type="button">Send inquiry on WhatsApp</button>' +
        '<div style="display:flex;gap:8px;margin-top:8px">' +
          '<button class="btn ghost block sm" id="sendMail" type="button">Email instead</button>' +
          '<button class="btn ghost block sm" id="copyMsg" type="button">Copy message</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bd);
    document.body.appendChild(d);

    $('#drawerClose').addEventListener('click', closeDrawer);
    bd.addEventListener('click', closeDrawer);

    $('#sendWa').addEventListener('click', function () {
      if (!readCart().length) { toast('Your inquiry is empty'); return; }
      window.open('https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(buildMessage()), '_blank', 'noopener');
    });
    $('#sendMail').addEventListener('click', function () {
      if (!readCart().length) { toast('Your inquiry is empty'); return; }
      location.href = 'mailto:' + S.email + '?subject=' + encodeURIComponent('Quotation request — ' + S.brand) + '&body=' + encodeURIComponent(buildMessage());
    });
    $('#copyMsg').addEventListener('click', function () {
      if (!readCart().length) { toast('Your inquiry is empty'); return; }
      copy(buildMessage(), 'Message copied — paste it anywhere');
    });
  }

  function buildMessage() {
    var items = readCart();
    var lines = ['Hello ' + S.brand + ' — I would like a quotation:', ''];
    items.forEach(function (it, i) {
      var p = bySlug(it.slug);
      if (!p) return;
      lines.push((i + 1) + '. ' + p.name + ' × ' + it.qty + ' — ' + money(p.price * it.qty));
    });
    var name = ($('#buyerName') || {}).value || '';
    var note = ($('#buyerNote') || {}).value || '';
    var ship = ($('#shipTo') || {}).value || '';
    lines.push('');
    lines.push('Estimated total: ' + money(cartTotal()));
    if (ship) lines.push('Ship to: ' + ship);
    if (name.trim()) lines.push('Name: ' + name.trim());
    if (note.trim()) lines.push('Notes: ' + note.trim());
    lines.push('');
    lines.push('Please confirm availability and freight. Thank you.');
    return lines.join('\n');
  }

  function renderCart() {
    var box = $('#drawerBody');
    if (!box) return;
    var items = readCart().filter(function (it) { return bySlug(it.slug); });
    if (!items.length) {
      box.innerHTML = '<div class="empty">Nothing here yet.<br>Add pieces from the collection to request a quotation.</div>';
    } else {
      box.innerHTML = items.map(function (it) {
        var p = bySlug(it.slug);
        return '<div class="ci" data-slug="' + esc(p.slug) + '">' +
          phHTML(p) +
          '<div class="ci-main">' +
            '<div class="ci-name">' + esc(p.name) + '</div>' +
            '<div class="ci-price">' + money(p.price * it.qty) + '</div>' +
            '<div class="ci-qty">' +
              '<button type="button" data-act="dec">−</button>' +
              '<span>' + it.qty + '</span>' +
              '<button type="button" data-act="inc">+</button>' +
            '</div>' +
          '</div>' +
          '<button class="ci-rm" type="button" data-act="rm">Remove</button>' +
        '</div>';
      }).join('');
    }
    $('#drawerTotal').textContent = items.length ? money(cartTotal()) : '—';

    $$('[data-act]', box).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var slug = btn.closest('.ci').getAttribute('data-slug');
        var items2 = readCart();
        var idx = -1;
        items2.forEach(function (it, i) { if (it.slug === slug) idx = i; });
        if (idx < 0) return;
        var act = btn.getAttribute('data-act');
        if (act === 'inc') items2[idx].qty += 1;
        if (act === 'dec') items2[idx].qty -= 1;
        if (act === 'rm' || items2[idx].qty <= 0) items2.splice(idx, 1);
        writeCart(items2);
      });
    });
  }

  function openDrawer() {
    if (!$('#drawer')) return;
    renderCart();
    $('#bd').classList.add('on');
    $('#drawer').classList.add('on');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    $('#bd') && $('#bd').classList.remove('on');
    $('#drawer') && $('#drawer').classList.remove('on');
    document.body.style.overflow = '';
  }

  function copy(text, okMsg) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { toast(okMsg || 'Copied'); }, function () { toast('Copy failed'); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast(okMsg || 'Copied'); } catch (e) { toast('Copy failed'); }
      document.body.removeChild(ta);
    }
  }

  /* ---------------- product card ---------------- */
  function cardHTML(p) {
    return '<a class="card" href="product.html?slug=' + encodeURIComponent(p.slug) + '">' +
      '<div class="card-media">' +
        (p.tag ? '<span class="card-tag">' + esc(p.tag) + '</span>' : '') +
        phHTML(p) +
        '<span class="card-quick">View piece</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<div><div class="card-name">' + esc(p.name) + '</div><div class="card-cat">' + esc(p.cat) + '</div></div>' +
        '<div class="card-price js-price" data-usd="' + p.price + '">' + money(p.price) + '</div>' +
      '</div>' +
      '<p class="card-blurb">' + esc(p.blurb) + '</p>' +
    '</a>';
  }

  /* ---------------- reveal ---------------- */
  function reveals() {
    if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    $$('.reveal').forEach(function (e) { io.observe(e); });
  }

  /* ---------------- boot ---------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var active = document.body.getAttribute('data-page') || '';
    renderChrome(active);
    renderFooter();
    buildDrawer();
    updateCount();
    renderCart();
    paintPrices();
    /* 页面内自行渲染商品后，允许再刷一次价格与观察器 */
    window.MARAYA = {
      money: money, phHTML: phHTML, cardHTML: cardHTML, bySlug: bySlug,
      addToCart: addToCart, openDrawer: openDrawer, toast: toast,
      paintPrices: paintPrices, reveals: reveals, esc: esc, $: $, $$: $$
    };
    reveals();
  });
})();
