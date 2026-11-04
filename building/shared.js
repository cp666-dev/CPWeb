/* The Building · helpers. Reads BUILDS / MORE / WORKS from ../assets/site-data.js (the same data as the classic site). */
const S = { BUILDS, MORE, WORKS };
const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
const media = p => p.replace(/^assets\//, '../assets/');   // site-data paths are relative to the site root
const POSTERS = ['booth', 'overkill', 'okinstruments', 'chops', 'blueprint', 'elevenideas'];
const posterFor = src => {
  const k = src.split('/').pop().replace('-demo.mp4', '');
  return POSTERS.includes(k) ? `assets/posters/${k}-poster.jpg` : null;   // poster frames for videos (see README)
};
const strip = h => h.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&');
const MEDIA_KIND = p => p.media === 'video' ? 'Video demo' : p.media === 'images' ? `${p.src.length} screenshots` : p.media === 'image' ? 'Screenshot' : 'Demo on a call';

function ctaFor(p) {
  if (p.buy) return { label: 'Buy now', href: p.buy };
  if (p.try) return { label: 'Try now', href: p.try };
  if (p.url) return { label: p.url.replace(/^https?:\/\//, ''), href: p.url };
  return null;
}

function tabsFor(p) {
  const t = [['Overview', p.desc]];
  if (p.case) t.push(['The problem', p.case.problem], ["How it's built", p.case.build], [p.case.apiLabel || 'API, integration &amp; deployment', p.case.api]);
  else if (p.build) t.push(["How it's built", p.build]);
  return t;
}

function mediaHTML(p) {
  if (p.media === 'video') {
    const poster = posterFor(p.src);
    return `<div class="m m-video" data-src="${media(p.src)}">
      ${poster ? `<img src="${poster}" alt="${p.name} screen recording, poster frame">` : `<video preload="metadata" muted playsinline src="${media(p.src)}#t=1"></video>`}
      <button class="m-play" aria-label="Play ${p.name} screen recording"><svg viewBox="0 0 24 24" width="26" height="26"><path d="M7 4v16l13-8z" fill="currentColor"/></svg></button>
      <span class="m-note">Loads only when you press play</span></div>`;
  }
  if (p.media === 'image') return `<div class="m m-image"><img src="${media(p.src)}" alt="${p.name} screenshot" loading="lazy"></div>`;
  if (p.media === 'images') return `<div class="m m-car" data-i="0">
      <div class="m-slides">${p.src.map((s, i) => `<img src="${media(s)}" alt="${p.name} screenshot ${i + 1} of ${p.src.length}" ${i ? 'hidden' : ''} loading="lazy">`).join('')}</div>
      <button class="m-arrow prev" aria-label="Previous screenshot">‹</button><button class="m-arrow next" aria-label="Next screenshot">›</button>
      <div class="m-thumbs">${p.src.map((s, i) => `<button class="m-thumb${i ? '' : ' on'}" aria-label="Screenshot ${i + 1}"><img src="${media(s)}" alt=""></button>`).join('')}<span class="m-count">1 / ${p.src.length}</span></div></div>`;
  return `<div class="m m-none"><b>Demo available on a call</b><span>No recording for this one yet. Happy to walk you through it.</span><a class="m-call" href="https://calendly.com/connor-panayi/30min" target="_blank" rel="noopener">Book a call</a></div>`;
}

function bindMedia(root) {
  root.querySelectorAll('.m-video').forEach(v => {
    v.querySelector('.m-play').addEventListener('click', () => {
      v.innerHTML = `<video controls autoplay playsinline src="${v.dataset.src}"></video>`;
      v.classList.add('playing');
      root.dispatchEvent(new CustomEvent('mediaplay', { bubbles: true }));
    });
  });
  const car = root.querySelector('.m-car');
  if (!car) return { step() {} };
  const imgs = car.querySelectorAll('.m-slides img'), th = car.querySelectorAll('.m-thumb'), cnt = car.querySelector('.m-count');
  const go = i => {
    i = (i + imgs.length) % imgs.length; car.dataset.i = i;
    imgs.forEach((im, k) => im.hidden = k !== i); th.forEach((t, k) => t.classList.toggle('on', k === i));
    cnt.textContent = `${i + 1} / ${imgs.length}`;
  };
  car.querySelector('.prev').onclick = () => go(+car.dataset.i - 1);
  car.querySelector('.next').onclick = () => go(+car.dataset.i + 1);
  th.forEach((t, k) => t.onclick = () => go(k));
  let x0 = null;
  car.addEventListener('touchstart', e => x0 = e.touches[0].clientX, { passive: true });
  car.addEventListener('touchend', e => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) go(+car.dataset.i + (dx < 0 ? 1 : -1)); x0 = null; });
  return { step: d => go(+car.dataset.i + d) };
}

/* Opt-in sound. Nothing plays until the visitor turns it on. */
const Snd = {
  on: false, ctx: null,
  toggle() { this.on = !this.on; if (this.on && !this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)(); return this.on; },
  tone(f, d = .08, type = 'square', vol = .05, when = 0) {
    if (!this.on) return; const c = this.ctx, t = c.currentTime + when, o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.value = f; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
    o.connect(g).connect(c.destination); o.start(t); o.stop(t + d + .02);
  },
  noise(d = .12, vol = .08, freq = 900, q = .7) {
    if (!this.on) return; const c = this.ctx, b = c.createBuffer(1, c.sampleRate * d, c.sampleRate), a = b.getChannelData(0);
    for (let i = 0; i < a.length; i++) a[i] = (Math.random() * 2 - 1) * (1 - i / a.length) ** 2;
    const s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q; g.gain.value = vol; s.buffer = b; s.connect(f).connect(g).connect(c.destination); s.start();
  }
};
