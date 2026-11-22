# AromaCafé — Backend (NestJS)

API da cafeteria AromaCafé. Consumida pelo frontend Angular (`aromacafe-frontend`).

## Stack

NestJS 12 (ESM) · MongoDB Atlas (Mongoose) · Swagger · Vitest · oxlint

## Como rodar

1. Instale as dependências com `npm install`.
2. Crie o `.env` a partir do modelo com `copy .env.example .env` e preencha a senha do banco (peça à coordenação por um canal privado, nunca pelo repositório).
3. Suba em modo desenvolvimento com `npm run start:dev`.
4. Teste a API em http://localhost:3000/api/health e o Swagger (contrato) em http://localhost:3000/docs.

## Variáveis de ambiente

| Variável | Exemplo | Uso |
|---|---|---|
| `PORT` | `3000` | Porta da API |
| `MONGODB_URI` | `mongodb+srv://USUARIO:SENHA@aromacafe.uxuya1r.mongodb.net/aromacafe` | Conexão com o MongoDB Atlas (obrigatória) |
| `FRONTEND_URL` | `http://localhost:4200` | Origem liberada no CORS |

O `.env` está no `.gitignore` e **nunca** deve ser enviado ao GitHub.

## Padrão das rotas

- Todas as rotas começam com `/api`.
- Listas respondem `{ "total": number, "data": [...] }`.
- Cada módulo fica na sua pasta em `src/` (controller, service, module, dto, schemas).
- Imports locais terminam em `.js` (projeto ESM).
- Todo controller usa `@ApiTags`, `@ApiOperation` e `@ApiOkResponse` para aparecer no Swagger.

Contrato completo: [docs/API-CONTRACT.md](docs/API-CONTRACT.md).

## Integração com o Angular

Em desenvolvimento, o Angular chama caminhos relativos (`/api/foods`) e o `ng serve` encaminha para esta API pelo `proxy.conf.json` (configurado em `angular.json`, em `serve.options.proxyConfig`). Rode os dois projetos ao mesmo tempo:

| Projeto | Comando | Porta |
|---|---|---|
| Backend | `npm run start:dev` | 3000 |
| Frontend | `npm start` | 4200 |

## Scripts

| Comando | O que faz |
|---|---|
| `npm run start:dev` | Servidor com recarga automática |
| `npm run build` | Compila o projeto |
| `npm run lint` | Verifica o código com oxlint |
| `npm test` | Testes unitários (Vitest) |
| `npm run test:e2e` | Testes e2e (precisam do `.env` com acesso ao MongoDB) |

## Fluxo da equipe

1. Cada pessoa trabalha numa branch: `git checkout -b feature/nome-do-modulo`.
2. Mexa só na pasta do seu módulo. Quem edita `main.ts` e `app.module.ts` é a coordenação: envie a linha de `import` do seu módulo.
3. Alterou o contrato? Atualize `docs/API-CONTRACT.md` e avise o frontend antes do merge.
4. Abra um Pull Request e peça revisão de outra pessoa.
