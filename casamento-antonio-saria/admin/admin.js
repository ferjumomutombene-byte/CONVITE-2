// admin.js — painel de confirmações, protegido por password, ligado ao Apps Script (Google Sheets)

// >>> Cole aqui o MESMO URL do Apps Script usado no assets/js/rsvp.js <<<
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbxO42zI7n2egN5fC-t6Kq_RgozHgJKTuay5PsqnHEeBtDAzsIis83ySf8C2_u6EPSY/exec";

// Palavra-passe simples só para não ficar aberto a qualquer pessoa com o link.
// Não é segurança bancária — troca-a por algo só vosso antes de publicar.
const SENHA = "CASAMENTO";

let dadosAtuais = [];

function entrar() {
  const val = document.getElementById('pass').value;
  if (val === SENHA) {
    sessionStorage.setItem('admin_ok', '1');
    document.getElementById('lockBox').style.display = 'none';
    document.getElementById('painel').style.display = 'block';
    carregar();
  } else {
    document.getElementById('erroLogin').textContent = "Palavra-passe incorreta.";
  }
}

document.getElementById('pass').addEventListener('keydown', e => {
  if (e.key === 'Enter') entrar();
});

// Se já autenticado nesta sessão do navegador, entra automaticamente
if (sessionStorage.getItem('admin_ok') === '1') {
  document.getElementById('lockBox').style.display = 'none';
  document.getElementById('painel').style.display = 'block';
  carregar();
}

async function carregar() {
  const conteudo = document.getElementById('conteudo');
  conteudo.innerHTML = '<div class="estado">A carregar...</div>';
  if (!RSVP_ENDPOINT || RSVP_ENDPOINT.indexOf('COLOCA_AQUI') !== -1) {
    conteudo.innerHTML = '<div class="estado">Ainda não configuraste o URL do Apps Script neste ficheiro.</div>';
    return;
  }
  try {
    const resp = await fetch(RSVP_ENDPOINT);
    const json = await resp.json();
    dadosAtuais = json.dados || [];
    atualizarCards();
    renderizarTabela();
  } catch (err) {
    conteudo.innerHTML = '<div class="estado">Não foi possível carregar os dados. Verifica o URL do Apps Script.</div>';
  }
}

function atualizarCards() {
  const total = dadosAtuais.length;
  const sim = dadosAtuais.filter(d => d.status === 'Confirmado').length;
  const nao = dadosAtuais.filter(d => d.status === 'Não vai').length;
  const pessoas = dadosAtuais.reduce((soma, d) => soma + (parseInt(d.pessoas) || (d.status === 'Confirmado' ? 1 : 0)), 0);
  document.getElementById('cTotal').textContent = total;
  document.getElementById('cSim').textContent = sim;
  document.getElementById('cNao').textContent = nao;
  document.getElementById('cPessoas').textContent = pessoas;
}

function renderizarTabela() {
  const busca = document.getElementById('busca').value.trim().toLowerCase();
  const filtro = document.getElementById('filtro').value;
  let lista = dadosAtuais.slice().sort((a, b) => new Date(b.dataHora) - new Date(a.dataHora));
  if (filtro) lista = lista.filter(d => d.status === filtro);
  if (busca) lista = lista.filter(d =>
    (d.nome || '').toLowerCase().includes(busca) || (String(d.mesa) || '').toLowerCase().includes(busca)
  );
  const conteudo = document.getElementById('conteudo');
  if (!lista.length) {
    conteudo.innerHTML = '<div class="estado">Nenhuma resposta encontrada ainda.</div>';
    return;
  }
  let html = '<table><tr><th>Nome</th><th>Mesa</th><th>Pessoas</th><th>Estado</th><th>Quando</th></tr>';
  lista.forEach(d => {
    const tagClasse = d.status === 'Confirmado' ? 'sim' : 'nao';
    const quando = d.dataHora ? new Date(d.dataHora).toLocaleString('pt-PT', { dateStyle: 'short', timeStyle: 'short' }) : '';
    html += `<tr><td>${escapeHtml(d.nome)}</td><td>${escapeHtml(d.mesa || '—')}</td><td>${escapeHtml(String(d.pessoas || '—'))}</td><td><span class="tag ${tagClasse}">${escapeHtml(d.status)}</span></td><td>${quando}</td></tr>`;
  });
  html += '</table>';
  conteudo.innerHTML = html;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function exportarCSV() {
  if (!dadosAtuais.length) return;
  const linhas = [["Nome", "Mesa", "Pessoas", "Estado", "Data/Hora"]];
  dadosAtuais.forEach(d => linhas.push([d.nome, d.mesa, d.pessoas, d.status, d.dataHora]));
  const csv = linhas.map(l => l.map(v => `"${String(v ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'confirmacoes-antonio-saria.csv'; a.click();
  URL.revokeObjectURL(url);
}

document.getElementById('busca').addEventListener('input', renderizarTabela);
document.getElementById('filtro').addEventListener('change', renderizarTabela);
