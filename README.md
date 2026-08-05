# Convite de Casamento — António & Saria 💍

Convite digital interativo com **conteúdo real** do casal, personalização por convidado
e um **backend real** (Google Sheets), para a cerimónia de **14 de Setembro de 2026, Maputo**.

## Estrutura do projeto

```
casamento-antonio-saria/
├── index.html                  → página principal do convite
├── assets/
│   ├── css/ (style, animations, responsive)
│   ├── js/
│   │   ├── app.js              → inicialização geral e scroll suave
│   │   ├── countdown.js        → contagem regressiva (Sáb. 14/09, 09h00, Maputo)
│   │   ├── gallery.js          → galeria em ecrã inteiro (lightbox)
│   │   ├── music.js            → botão de música de fundo
│   │   ├── personalizacao.js   → lê ?nome=&mesa=&pessoas= do link e bloqueia os campos
│   │   ├── rsvp.js             → grava no Google Sheets + abre o WhatsApp
│   │   └── effects.js          → partículas douradas subtis
│   ├── images/                 → capa.jpg, noivos.jpg, galeria-1/2.jpg (fotos reais já incluídas)
│   ├── music/                  → cancao-casamento.mp3 (ver nota abaixo)
│   ├── icons/, fonts/          → reservados
├── admin/
│   ├── index.html              → painel com ecrã de password
│   ├── admin.css
│   └── admin.js                → lê os dados do Google Sheets
├── backend/
│   └── apps-script-codigo.gs   → código do backend (Google Apps Script)
└── README.md
```

## ⚠️ Falta a música

O ficheiro `cancao-casamento.mp3` não chegou a ser reenviado desta vez, por isso a pasta
`assets/music/` está vazia. Basta colocar lá o ficheiro com esse nome exato para a música voltar a funcionar.

## Conteúdo já incluído (extraído do convite anterior)

- Foto de capa (`capa.jpg`) e foto do casal (`noivos.jpg`) — fotos reais, já embutidas como ficheiros
- Nomes dos pais, incluindo "em memória"
- Versículo (Eclesiastes 9:9)
- Programa completo do fim de semana (cerimónia civil, copo de água, cerimónia religiosa de domingo, endereços e links do Google Maps)
- Contactos para mais informações (+258 84 924 8857 · +258 87 398 5951 · +258 87 845 6057)
- Número de WhatsApp para o RSVP (258875696973)
- Nota "Não extensivo a crianças"

## Personalização por convidado

O convite pode ser enviado com um link único por convidado, por exemplo:

```
https://seusite.com/index.html?nome=Chelton+Chingubo&mesa=5&pessoas=2
```

Quando o link tem esses parâmetros, o nome/mesa/pessoas aparecem já preenchidos e
**bloqueados** (o convidado não pode alterar). Sem parâmetros, o próprio convidado
escreve o nome ao tocar no espaço do convite.

## Backend real (Google Sheets) — passo a passo

Isto substitui por completo o `localStorage` da versão anterior por uma base de dados
central e gratuita.

1. Crie uma **Google Sheet** nova (em sheets.google.com).
2. Vá a **Extensões → Apps Script**.
3. Apague o conteúdo de exemplo e cole o conteúdo de `backend/apps-script-codigo.gs`.
4. Clique em **Implementar → Nova implementação**.
5. Escolha o tipo **"Aplicação Web"**.
6. Em "Quem tem acesso", escolha **"Qualquer pessoa"**.
7. Clique em **Implementar** e autorize as permissões pedidas.
8. Copie o **URL da aplicação Web** gerado (algo como `https://script.google.com/macros/s/AKfycb.../exec`).
9. Cole esse URL em **dois** sítios:
   - `assets/js/rsvp.js` → constante `RSVP_ENDPOINT`
   - `admin/admin.js` → constante `RSVP_ENDPOINT`

Pronto — a partir daí, cada confirmação (sim/não) fica gravada automaticamente numa
aba "RSVPs" da sua Google Sheet, e o painel administrativo lê esses dados em tempo real,
de qualquer dispositivo.

## Painel administrativo (/admin)

- Protegido por password (`AntonioSaria2026` por omissão — troque isto em `admin/admin.js`, constante `SENHA`, antes de publicar).
- Mostra totais (respostas, confirmados, não vão, total de pessoas), tabela com pesquisa e filtro, e exportação para CSV.
- Lê diretamente do Google Sheets — já não depende do navegador de quem respondeu.

**Nota sobre segurança:** esta password é uma barreira simples para não ficar aberto a qualquer pessoa com o link, não é segurança de nível bancário (a password fica visível no código-fonte da página). Para um casamento, é normalmente suficiente.

## Publicar o site (GitHub Pages)

1. Crie um repositório no GitHub e envie esta pasta para lá.
2. Em **Settings → Pages**, escolha a branch `main` e a pasta raiz `/`.
3. O site fica disponível em `https://seu-usuario.github.io/nome-do-repositorio/`.

## Notas finais

- 100% responsivo (telemóvel, tablet, desktop).
- Respeita `prefers-reduced-motion` para pessoas sensíveis a animações.
- As duas fotos da galeria são, por agora, as mesmas duas fotos da capa/noivos — adicione mais fotos em `assets/images/` e novas tags `<img>` na secção `#galeria` do `index.html` se tiver mais fotos disponíveis.
