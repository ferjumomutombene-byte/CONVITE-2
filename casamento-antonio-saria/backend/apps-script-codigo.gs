/**
 * BASE DE DADOS DO CONVITE — António & Saria
 * ---------------------------------------------------------
 * Este código transforma uma Google Sheet numa mini base de dados
 * grátis e sempre online, para receber as confirmações do convite
 * e alimentar o painel de controlo de presença.
 *
 * Não precisas de saber programar para o usar — segue o
 * PAINEL-LEIA-ME.md passo a passo.
 */

const NOME_FOLHA = "RSVPs";

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(NOME_FOLHA);
  if (!sheet) {
    sheet = ss.insertSheet(NOME_FOLHA);
    sheet.appendRow(["Data/Hora", "Nome", "Mesa", "Pessoas", "Status"]);
  }
  return sheet;
}

// Recebe as confirmações vindas do convite (botão Confirmar / Não poderei ir)
function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    sheet.appendRow([
      new Date(),
      dados.nome || "",
      dados.mesa || "",
      dados.pessoas || "",
      dados.status || ""
    ]);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, erro: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Devolve todas as confirmações em JSON, para o painel de controlo ler
function doGet(e) {
  const sheet = getSheet_();
  const valores = sheet.getDataRange().getValues();
  const linhas = valores.slice(1); // ignora o cabeçalho
  const dados = linhas
    .filter(l => l[1]) // ignora linhas sem nome
    .map(l => ({
      dataHora: l[0] instanceof Date ? l[0].toISOString() : String(l[0]),
      nome: l[1],
      mesa: l[2],
      pessoas: l[3],
      status: l[4]
    }));
  return ContentService.createTextOutput(JSON.stringify({ ok: true, dados }))
    .setMimeType(ContentService.MimeType.JSON);
}
