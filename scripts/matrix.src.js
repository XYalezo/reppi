/* Signal, Structure, Agent. Canvas 2D, 30 fps, one rAF loop, three depth layers at 16 degrees off vertical. */
(function () {
  'use strict';
  var ANG = (16 * Math.PI) / 180, DX = -Math.sin(ANG), DY = Math.cos(ANG);
  var TOK = ['0', '1', '0', '1', '1', '0', '{', '}', '</>', '=>', '0x', 'API', 'SQL', 'M365'];
  // size, speed px/s, alpha, divisor for stream count, parallax px
  var LAYERS = [
    { size: 12, speed: 34, alpha: 0.16, div: 48, par: 4, grow: 0 },
    { size: 16, speed: 62, alpha: 0.3, div: 76, par: 8, grow: 0 },
    { size: 22, speed: 104, alpha: 0.48, div: 150, par: 12, grow: 0.25 },
  ];
  var FORM = 1200, HOLD = 2500, MELT = 900, EVERY = 10000, FIRST = 3500, PULSE = 1300;
  var NODES = [[15.6, 22.9], [48.4, 21.1], [22.9, 47.5], [49.5, 45.5]];

  function rnd(a, b) { return a + Math.random() * (b - a); }
  function pick() { return TOK[(Math.random() * TOK.length) | 0]; }
  function clamp(v) { return v < 0 ? 0 : v > 1 ? 1 : v; }
  function ease(p) { return 1 - Math.pow(1 - p, 3); }

  window.phanelloMatrix = function (canvas) {
    var ctx = canvas.getContext('2d');
    if (!ctx) return function () {};
    var root = getComputedStyle(document.documentElement);
    var body = root.getPropertyValue('--color-green-400').trim();
    var head = root.getPropertyValue('--color-green-200').trim();
    var mono = root.getPropertyValue('--font-plex-mono').trim() || 'ui-monospace, monospace';
    var words = [];
    try { words = JSON.parse(canvas.getAttribute('data-words') || '[]'); } catch (e) {}
    var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var fine = matchMedia('(pointer: fine)').matches;
    var box = canvas.parentElement;
    var w = 0, h = 0, dpr = 1, streams = [], masks = [], zone = null;
    var raf = 0, last = 0, visible = true, t0 = performance.now(), px = 0, py = 0, tx = 0, ty = 0;
    var word = null, wordIndex = -1, cycle = -1;

    function spawn(s, first) {
      var L = LAYERS[s.l];
      s.v = L.speed * rnd(0.8, 1.2);
      s.n = (rnd(8, 16) * (0.8 + s.l * 0.15)) | 0;
      s.g = [];
      for (var i = 0; i < s.n; i++) s.g.push(pick());
      s.x = rnd(0, w + h * Math.tan(ANG));
      s.y = first ? rnd(0, h) : rnd(-s.n * L.size, 0);
    }

    function build() {
      streams = [];
      LAYERS.forEach(function (L, l) {
        var n = Math.max(6, Math.round(w / L.div));
        for (var i = 0; i < n; i++) { var s = { l: l }; spawn(s, true); streams.push(s); }
      });
    }

    function measure() {
      var cr = canvas.getBoundingClientRect();
      masks = [];
      var right = 0;
      document.querySelectorAll('[data-matrix-mask]').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (!r.width) return;
        var m = { l: r.left - cr.left - 24, t: r.top - cr.top - 24, r: r.right - cr.left + 24, b: r.bottom - cr.top + 24 };
        masks.push(m);
        // A full-width band (the family index) keeps glyphs off its text but does not move the word zone.
        if (el.getAttribute('data-matrix-mask') !== 'band' && m.r > right) right = m.r;
      });
      var left = Math.max(w * 0.56, right + 48);
      zone = w >= 900 && words.length ? { l: left, r: w - 48 } : null;
    }

    function resize() {
      w = box.clientWidth; h = box.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure(); build();
      if (reduce) still(); else draw(performance.now());
    }

    // 0 inside the text zone, rising to 1 over 96 px outside it. Applied per glyph, so the text zone stays clean Ink.
    function mask(x, y) {
      var m = 1;
      for (var i = 0; i < masks.length; i++) {
        var k = masks[i];
        var dx = Math.max(k.l - x, 0, x - k.r), dy = Math.max(k.t - y, 0, y - k.b);
        var d = clamp(Math.sqrt(dx * dx + dy * dy) / 96);
        if (d < m) m = d * d * (3 - 2 * d);
      }
      return m;
    }

    function step(dt) {
      for (var i = 0; i < streams.length; i++) {
        var s = streams[i];
        s.x += s.v * dt * DX; s.y += s.v * dt * DY;
        if (Math.random() < 0.12) s.g[(Math.random() * s.n) | 0] = pick();
        if (s.y - s.n * LAYERS[s.l].size * 1.4 > h || s.x < -80) spawn(s, false);
      }
    }

    function makeWord(i, ty0, formed) {
      var text = words[i % words.length];
      var fs = Math.max(14, Math.min(34, (zone.r - zone.l) / (text.length * 0.6 + 3)));
      ctx.font = '500 ' + fs + 'px ' + mono;
      var cw = ctx.measureText('M').width;
      var x0 = zone.l + fs * 3, chars = [];
      for (var c = 0; c < text.length; c++) {
        var dist = rnd(140, 420);
        chars.push({ ch: text.charAt(c), x: x0 + c * cw, y: ty0, ox: -DX * dist, oy: -DY * dist });
      }
      return { fs: fs, chars: chars, x: x0 - fs * 1.6, y: ty0 - fs * 0.35, born: formed ? -1e9 : performance.now() };
    }

    function glyph(x, y, text, size, a, color) {
      ctx.globalAlpha = a; ctx.fillStyle = color; ctx.font = size + 'px ' + mono; ctx.fillText(text, x, y);
    }

    function layer(l) {
      var L = LAYERS[l], step = L.size * 1.15;
      ctx.save();
      ctx.translate(px * L.par, py * L.par);
      for (var i = 0; i < streams.length; i++) {
        var s = streams[i];
        if (s.l !== l) continue;
        var sc = 1 + L.grow * clamp(s.y / h), size = Math.round(L.size * sc);
        ctx.font = size + 'px ' + mono;
        for (var g = 0; g < s.n; g++) {
          var x = s.x - g * step * sc * DX, y = s.y - g * step * sc * DY;
          if (y < -size || y > h + size || x < -size || x > w + size) continue;
          var a = L.alpha * Math.pow(1 - g / s.n, 1.4) * mask(x, y);
          if (a < 0.015) continue;
          ctx.globalAlpha = g === 0 ? Math.min(0.85, a * 1.8) : a;
          ctx.fillStyle = g === 0 ? head : body;
          ctx.fillText(s.g[g], x, y);
        }
      }
      ctx.restore();
    }

    function mark(cx, cy, R, a) {
      var k = R / 24, o = 32;
      ctx.globalAlpha = a; ctx.strokeStyle = head; ctx.fillStyle = head; ctx.lineWidth = Math.max(1, k * 1.6);
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, 6.283); ctx.stroke();
      ctx.globalAlpha = a * 0.7; ctx.beginPath(); ctx.arc(cx, cy, 14.5 * k, 0, 6.283); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + (NODES[0][0] - o) * k, cy + (NODES[0][1] - o) * k); ctx.lineTo(cx, cy);
      ctx.lineTo(cx + (NODES[1][0] - o) * k, cy + (NODES[1][1] - o) * k);
      ctx.moveTo(cx, cy); ctx.lineTo(cx + (NODES[2][0] - o) * k, cy + (NODES[2][1] - o) * k);
      ctx.moveTo(cx, cy); ctx.lineTo(cx + (NODES[3][0] - o) * k, cy + (NODES[3][1] - o) * k);
      ctx.stroke();
      ctx.globalAlpha = a;
      NODES.forEach(function (n) { ctx.beginPath(); ctx.arc(cx + (n[0] - o) * k, cy + (n[1] - o) * k, 3.6 * k, 0, 6.283); ctx.fill(); });
      ctx.beginPath(); ctx.arc(cx, cy, 5.8 * k, 0, 6.283); ctx.fill();
    }

    function drawWord(wd, now) {
      var age = now - wd.born, lock = FORM, out = FORM + HOLD;
      if (age < 0 || age > out + MELT) return age > 0 ? false : true;
      var p = age < lock ? ease(age / lock) : 1, melt = age > out ? clamp((age - out) / MELT) : 0;
      var a = 0.45 * clamp(p * 1.4) * (1 - melt);
      ctx.font = '500 ' + wd.fs + 'px ' + mono;
      for (var i = 0; i < wd.chars.length; i++) {
        var c = wd.chars[i];
        var x = c.x + c.ox * (1 - p) + (melt ? -DX * melt * melt * 220 : 0), y = c.y + c.oy * (1 - p) + (melt ? DY * melt * melt * 220 : 0);
        glyph(x, y, c.ch, wd.fs, a, head);
      }
      var pulse = (age - lock) / PULSE;
      if (pulse > 0 && pulse < 1) mark(wd.x, wd.y, wd.fs * (0.9 + 0.5 * pulse), Math.sin(pulse * Math.PI) * 0.7);
      return true;
    }

    function draw(now) {
      ctx.clearRect(0, 0, w, h);
      ctx.textBaseline = 'alphabetic';
      for (var l = 0; l < LAYERS.length; l++) layer(l);
      if (zone) {
        var k = Math.floor((now - t0 - FIRST) / EVERY);
        if (k >= 0 && k !== cycle) { cycle = k; wordIndex = k; word = makeWord(wordIndex, h * (0.36 + 0.1 * (k % 3)), false); }
        if (word && !drawWord(word, now)) word = null;
      }
      ctx.globalAlpha = 1;
    }

    // Reduced motion: one composed frame, three resolved names and one node.
    function still() {
      ctx.clearRect(0, 0, w, h);
      for (var l = 0; l < LAYERS.length; l++) layer(l);
      if (zone) {
        [[0, 0.34], [3, 0.48], [6, 0.62]].forEach(function (p, n) {
          var wd = makeWord(p[0], h * p[1], true);
          wd.chars.forEach(function (c) { c.ox = 0; c.oy = 0; });
          ctx.font = '500 ' + wd.fs + 'px ' + mono;
          wd.chars.forEach(function (c) { glyph(c.x, c.y, c.ch, wd.fs, 0.45, head); });
          if (n === 1) mark(wd.x, wd.y, wd.fs * 1.2, 0.6);
        });
      }
      ctx.globalAlpha = 1;
    }

    function loop(ts) {
      raf = 0;
      if (!canvas.isConnected) return;
      if (ts - last >= 33) {
        var dt = Math.min(ts - last, 100) / 1000;
        last = ts;
        px += (tx - px) * 0.08; py += (ty - py) * 0.08;
        step(dt); draw(ts);
      }
      raf = requestAnimationFrame(loop);
    }
    function play() { if (!raf && !reduce && visible && !document.hidden) { last = performance.now(); raf = requestAnimationFrame(loop); } }
    function pause() { if (raf) { cancelAnimationFrame(raf); raf = 0; } }
    function onVis() { if (document.hidden) pause(); else play(); }
    function onMove(e) { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2; }

    var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (en) { visible = en[0].isIntersecting; if (visible) play(); else pause(); }) : null;
    if (io) io.observe(box);
    var ro = 'ResizeObserver' in window ? new ResizeObserver(function () { if (box.clientWidth !== w || box.clientHeight !== h) resize(); }) : null;
    if (ro) ro.observe(box);
    document.addEventListener('visibilitychange', onVis);
    if (fine && !reduce) window.addEventListener('pointermove', onMove, { passive: true });
    resize(); play();

    return function () {
      pause();
      if (io) io.disconnect();
      if (ro) ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onMove);
    };
  };
})();
