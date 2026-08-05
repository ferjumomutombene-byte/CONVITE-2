// rsvp.js — confirmação de presença com backend real (Google Sheets via Apps Script) + WhatsApp
(function () {
  // Número do casal em formato internacional, sem "+" nem espaços.
  const WHATSAPP_NUMBER = "258875696973";

  // >>> Cole aqui o URL do Apps Script depois de o publicar (ver README.md, secção "Backend") <<<
  const RSVP_ENDPOINT = "COLOCA_AQUI_O_URL_DO_APPS_SCRIPT";

  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');
  const statusEl = document.getElementById('rsvp-msg');

  if (!btnYes || !btnNo) return;

  function getNomeAtual() {
    return window.getGuestName ? window.getGuestName() : '';
  }

  function abrirWhatsApp(mensagem) {
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(mensagem);
    window.open(url, '_blank', 'noopener');
  }

  function gravarRSVP(dados) {
    if (!RSVP_ENDPOINT || RSVP_ENDPOINT.indexOf('https://script.google.com/macros/s/AKfycbxO42zI7n2egN5fC-t6Kq_RgozHgJKTuay5PsqnHEeBtDAzsIis83ySf8C2_u6EPSY/exec') !== -1) {
      return Promise.resolve(); // endpoint ainda não configurado — não bloqueia o convite
    }
    return fetch(RSVP_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(dados)
    }).catch(() => {});
  }

  btnYes.addEventListener('click', () => {
    const nome = getNomeAtual();
    if (!nome) {
      statusEl.textContent = "Escreve o teu nome no espaço acima antes de confirmar.";
      statusEl.style.display = 'block';
      document.getElementById('guestName')?.focus();
      return;
    }
    const mesa = window.getGuestMesa ? window.getGuestMesa() : '';
    const pessoas = window.getGuestPessoas ? window.getGuestPessoas() : '';

    let mensagem = "Olá! Sou " + nome + " e confirmo a minha presença no casamento de António & Saria, dia 14 de Setembro de 2026.";
    if (mesa) mensagem += " Mesa: " + mesa + ".";
    if (pessoas) mensagem += " Nº de pessoas: " + pessoas + ".";

    statusEl.style.display = 'block';
    statusEl.textContent = "A gravar a tua confirmação...";
    gravarRSVP({ nome, mesa, pessoas, status: 'Confirmado' }).then(() => {
      statusEl.textContent = "A abrir o WhatsApp para enviares a tua confirmação...";
      abrirWhatsApp(mensagem);
    });
  });

  btnNo.addEventListener('click', () => {
    const nome = getNomeAtual();
    if (!nome) {
      statusEl.textContent = "Escreve o teu nome no espaço acima antes de responder.";
      statusEl.style.display = 'block';
      document.getElementById('guestName')?.focus();
      return;
    }
    const mensagem = "Olá! Sou " + nome + " e, infelizmente, não poderei estar presente no casamento de António & Saria no dia 14 de Setembro de 2026.";

    statusEl.style.display = 'block';
    statusEl.textContent = "A gravar a tua resposta...";
    gravarRSVP({ nome, mesa: '', pessoas: '', status: 'Não vai' }).then(() => {
      statusEl.textContent = "A abrir o WhatsApp para enviares a tua resposta...";
      abrirWhatsApp(mensagem);
    });
  });
})();
