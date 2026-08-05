// effects.js — partículas douradas subtis no fundo do hero
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('particles');
  if (!container) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return; // respeita preferência de menos movimento

  const TOTAL = 26;

  for (let i = 0; i < TOTAL; i++) {
    const p = document.createElement('span');
    const size = Math.random() * 3 + 2; // 2px a 5px
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10; // 10s a 20s
    const delay = Math.random() * 12;

    p.style.position = 'absolute';
    p.style.bottom = '-10px';
    p.style.left = left + '%';
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.borderRadius = '50%';
    p.style.background = 'rgba(217,193,154,0.75)';
    p.style.boxShadow = '0 0 6px rgba(217,193,154,0.8)';
    p.style.animation = `floatParticle ${duration}s linear ${delay}s infinite`;

    container.appendChild(p);
  }
});
