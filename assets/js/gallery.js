// gallery.js — galeria com visualização premium em ecrã inteiro
document.addEventListener('DOMContentLoaded', () => {
  const thumbs = Array.from(document.querySelectorAll('.gallery img'));
  if (!thumbs.length) return;

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const btnClose = document.getElementById('lightbox-close');
  const btnPrev = document.getElementById('lightbox-prev');
  const btnNext = document.getElementById('lightbox-next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = thumbs[currentIndex].src;
    lightboxImg.alt = thumbs[currentIndex].alt || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showNext(step) {
    currentIndex = (currentIndex + step + thumbs.length) % thumbs.length;
    lightboxImg.src = thumbs[currentIndex].src;
  }

  thumbs.forEach((img, i) => {
    img.addEventListener('click', () => openLightbox(i));
  });

  btnClose?.addEventListener('click', closeLightbox);
  btnNext?.addEventListener('click', () => showNext(1));
  btnPrev?.addEventListener('click', () => showNext(-1));

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext(1);
    if (e.key === 'ArrowLeft') showNext(-1);
  });
});
