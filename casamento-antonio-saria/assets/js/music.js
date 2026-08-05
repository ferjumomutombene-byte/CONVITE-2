// music.js — música de fundo com botão flutuante
document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('bg-music');
  const btn = document.getElementById('music-toggle');
  if (!audio || !btn) return;

  let playing = false;

  function setIcon() {
    btn.innerHTML = playing
      ? '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  }

  setIcon();

  btn.addEventListener('click', async () => {
    try {
      if (playing) {
        audio.pause();
      } else {
        await audio.play();
      }
      playing = !playing;
      setIcon();
    } catch (err) {
      // autoplay bloqueado pelo navegador até haver interação — normal, ignore
      console.warn('Não foi possível reproduzir a música automaticamente.', err);
    }
  });
});
