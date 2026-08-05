// countdown.js — contagem regressiva até ao grande dia
(function () {
  // Data e hora da cerimónia civil (Maputo, UTC+2)
  const WEDDING_DATE = new Date('2026-09-14T09:00:00+02:00');

  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
  };

  if (!els.days) return; // secção de contagem não existe nesta página

  function pad(n) { return String(n).padStart(2, '0'); }

  function update() {
    const now = new Date();
    let diff = WEDDING_DATE - now;

    if (diff <= 0) {
      els.days.textContent = '00';
      els.hours.textContent = '00';
      els.minutes.textContent = '00';
      els.seconds.textContent = '00';
      const label = document.getElementById('cd-label');
      if (label) label.textContent = 'É hoje! 🎉';
      clearInterval(timer);
      return;
    }

    const day = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / day);
    const hours = Math.floor((diff % day) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    els.days.textContent = pad(days);
    els.hours.textContent = pad(hours);
    els.minutes.textContent = pad(minutes);
    els.seconds.textContent = pad(seconds);
  }

  update();
  const timer = setInterval(update, 1000);
})();
