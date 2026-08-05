// personalizacao.js — personalização do convite por convidado via link
// Exemplo de link personalizado:
//   index.html?nome=Chelton+Chingubo&mesa=5&pessoas=2
(function () {
  const params = new URLSearchParams(window.location.search);
  const guestNomeFromUrl = (params.get('nome') || '').trim();
  const guestMesa = (params.get('mesa') || '').trim();
  const guestPessoas = (params.get('pessoas') || '').trim();

  const guestNameEl = document.getElementById('guestName');
  const guestHintEl = document.getElementById('guestHint');
  const mesaEl = document.getElementById('mesaVal');
  const pessoasEl = document.getElementById('pessoasVal');

  if (!guestNameEl) return;

  if (guestNomeFromUrl) {
    // Veio de um link personalizado — mostra o nome e não deixa editar
    guestNameEl.textContent = guestNomeFromUrl;
    guestNameEl.contentEditable = 'false';
    guestNameEl.setAttribute('data-locked', 'true');
    if (guestHintEl) guestHintEl.style.display = 'none';
  } else {
    // Sem link personalizado — o próprio convidado escreve o nome
    guestNameEl.addEventListener('input', () => {
      if (guestHintEl) {
        guestHintEl.style.display = guestNameEl.textContent.trim() ? 'none' : 'block';
      }
    });
  }

  function setupCampo(el, valorUrl) {
    if (!el) return;
    if (valorUrl) {
      el.textContent = valorUrl;
      el.contentEditable = 'false';
      el.setAttribute('data-locked', 'true');
    } else {
      el.addEventListener('focus', () => {
        if (el.textContent.trim() === '______') el.textContent = '';
      });
      el.addEventListener('blur', () => {
        if (el.textContent.trim() === '') el.textContent = '______';
      });
    }
  }

  setupCampo(mesaEl, guestMesa);
  setupCampo(pessoasEl, guestPessoas);

  // Expor uma função simples para o rsvp.js ler o nome atual
  window.getGuestName = function () {
    return (guestNameEl.textContent || '').trim();
  };
  window.getGuestMesa = function () {
    const v = (mesaEl?.textContent || '').trim();
    return v && v !== '______' ? v : '';
  };
  window.getGuestPessoas = function () {
    const v = (pessoasEl?.textContent || '').trim();
    return v && v !== '______' ? v : '';
  };
})();
