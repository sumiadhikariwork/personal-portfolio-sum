/* ══════════════════════════════════════════════════════
   Sumedha Adhikari — portfolio interactions
   Vanilla JS, no dependencies.
   ══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ---------- year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- photo fallbacks ----------
     If a photo hasn't been dropped in yet, hide the broken <img>
     so the designed gradient monogram underneath shows instead. */
  Array.prototype.forEach.call(document.querySelectorAll('img[data-fallback]'), function (img) {
    var hide = function () { img.style.display = 'none'; };
    img.addEventListener('error', hide);
    if (img.complete && img.naturalWidth === 0) hide();
  });

  /* ---------- sticky nav ---------- */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 24);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- scroll reveals ---------- */
  var revealables = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // gentle stagger for siblings entering together
        setTimeout(function () { el.classList.add('in'); }, Math.min(i * 70, 350));
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('in'); });
  }

  /* ---------- animated counters ---------- */
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  var format = function (n) {
    return n >= 1000 ? n.toLocaleString('en-US') : String(n);
  };

  var runCount = function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    if (reduced) { el.textContent = format(target) + suffix; return; }
    var dur = 1600, start = null;
    var step = function (ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      el.textContent = format(Math.round(target * easeOut(p))) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  var counters = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        runCount(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    Array.prototype.forEach.call(counters, function (el) { cio.observe(el); });
  } else {
    Array.prototype.forEach.call(counters, runCount);
  }

  /* ---------- hero word swap ---------- */
  var swap = document.getElementById('swap');
  if (swap && !reduced) {
    var words = ['ship it', 'build it', 'prototype it', 'measure it', 'automate it'];
    var idx = 0;
    setInterval(function () {
      var current = swap.querySelector('.swap__word');
      if (!current) return;
      idx = (idx + 1) % words.length;
      var next = document.createElement('span');
      next.className = 'swap__word in';
      next.textContent = words[idx];
      current.classList.add('out');
      swap.appendChild(next);
      setTimeout(function () {
        if (current.parentNode === swap) swap.removeChild(current);
        next.classList.remove('in');
      }, 600);
    }, 2600);
  }

  /* ---------- cursor spotlight ---------- */
  var spot = document.querySelector('.spotlight');
  if (spot && finePointer && !reduced) {
    var sx = window.innerWidth / 2, sy = window.innerHeight / 2, tx = sx, ty = sy;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      // only reveal the glow once the visitor actually moves a pointer,
      // otherwise it sits as a stray smudge mid-screen on load
      if (!document.body.classList.contains('has-pointer')) {
        sx = tx; sy = ty;
        document.body.classList.add('has-pointer');
      }
    }, { passive: true });
    (function loop() {
      sx += (tx - sx) * 0.09;
      sy += (ty - sy) * 0.09;
      spot.style.transform = 'translate3d(' + (sx - 260) + 'px,' + (sy - 260) + 'px,0)';
      requestAnimationFrame(loop);
    })();
    // spotlight is positioned from its top-left once we translate manually
    spot.style.left = '0'; spot.style.top = '0';
  }

  /* ---------- magnetic buttons ---------- */
  if (finePointer && !reduced) {
    Array.prototype.forEach.call(document.querySelectorAll('.magnetic'), function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.32;
        el.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
      });
      el.addEventListener('pointerleave', function () { el.style.transform = ''; });
    });
  }

  /* ---------- 3D tilt on project cards ---------- */
  if (finePointer && !reduced) {
    Array.prototype.forEach.call(document.querySelectorAll('.tilt'), function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform =
          'perspective(900px) rotateX(' + (-py * 5).toFixed(2) + 'deg) rotateY(' +
          (px * 6).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('pointerleave', function () { card.style.transform = ''; });
    });
  }

  /* ---------- toast ---------- */
  var toastEl = document.getElementById('toast');
  var toastTimer;
  var toast = function (msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 3200);
  };

  /* ---------- colour mood shuffle ---------- */
  var moods = [
    { name: 'Marigold', accent: '#FF6A1A', deep: '#D6470A', two: '#FFC42E', soft: '#FFE9D6' },
    { name: 'Sunbeam',  accent: '#FFB000', deep: '#B87400', two: '#FFDE59', soft: '#FFF3CF' },
    { name: 'Ember',    accent: '#E8471F', deep: '#A82C0C', two: '#FFA62B', soft: '#FFE0D2' },
    { name: 'Turmeric', accent: '#F08A24', deep: '#C05C05', two: '#FFD84D', soft: '#FFEFD4' }
  ];
  var moodIdx = 0;
  var moodBtn = document.getElementById('moodBtn');
  if (moodBtn) {
    moodBtn.addEventListener('click', function () {
      moodIdx = (moodIdx + 1) % moods.length;
      var m = moods[moodIdx];
      var s = document.documentElement.style;
      s.setProperty('--accent', m.accent);
      s.setProperty('--accent-deep', m.deep);
      s.setProperty('--accent-2', m.two);
      s.setProperty('--accent-soft', m.soft);
      toast('Mood: ' + m.name);
    });
  }

  /* ---------- confetti ---------- */
  var burst = function (originX, originY) {
    if (reduced) return;
    var colors = getComputedStyle(document.documentElement);
    var palette = [
      colors.getPropertyValue('--accent').trim() || '#FF6A1A',
      colors.getPropertyValue('--accent-2').trim() || '#FFC42E',
      '#16130F', '#FFFFFF', '#EFE3D0'
    ];
    for (var i = 0; i < 46; i++) {
      (function () {
        var bit = document.createElement('span');
        bit.className = 'confetti';
        var size = 5 + Math.random() * 8;
        bit.style.width = size + 'px';
        bit.style.height = (size * (0.4 + Math.random())) + 'px';
        bit.style.background = palette[(Math.random() * palette.length) | 0];
        document.body.appendChild(bit);

        var angle = Math.random() * Math.PI * 2;
        var speed = 5 + Math.random() * 11;
        var vx = Math.cos(angle) * speed;
        var vy = Math.sin(angle) * speed - 8;
        var x = originX, y = originY, rot = Math.random() * 360, life = 0;

        (function fall() {
          life += 1;
          vy += 0.42;          // gravity
          vx *= 0.99;          // drag
          x += vx; y += vy; rot += 9;
          bit.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) rotate(' + rot + 'deg)';
          bit.style.opacity = String(Math.max(0, 1 - life / 92));
          if (life < 92 && y < window.innerHeight + 120) {
            requestAnimationFrame(fall);
          } else if (bit.parentNode) {
            bit.parentNode.removeChild(bit);
          }
        })();
      })();
    }
  };

  /* ---------- easter egg: the rotating stamp ---------- */
  var stamp = document.getElementById('stamp');
  if (stamp) {
    var clicks = 0;
    var lines = [
      'Curiosity is the whole job. 🧡',
      'Still clicking? That is exactly the trait I hire for.',
      'Okay — you clearly like poking at things. We would get along.',
      'Fine, one more: I once fixed a rating process with a prototype and a Friday.'
    ];
    stamp.addEventListener('click', function (e) {
      var r = stamp.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top + r.height / 2);
      toast(lines[Math.min(clicks, lines.length - 1)]);
      clicks++;
      e.preventDefault();
    });
  }

  /* ---------- konami-lite: type "hire" ---------- */
  var typed = '';
  window.addEventListener('keydown', function (e) {
    if (e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-4);
    if (typed === 'hire') {
      burst(window.innerWidth / 2, window.innerHeight / 2);
      toast('Excellent instinct. sumiadhikari96@gmail.com 🧡');
      typed = '';
    }
  });

})();
