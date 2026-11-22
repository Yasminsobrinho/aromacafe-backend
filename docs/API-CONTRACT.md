# Contrato das APIs — AromaCafé

Este documento é o acordo entre o backend (NestJS) e o frontend (Angular).
A versão navegável fica no Swagger: `http://localhost:3000/docs`.

## Padrões gerais

| Item | Regra |
|---|---|
| Prefixo | Todas as rotas começam com `/api` |
| Formato | JSON (`Content-Type: application/json`) |
| Listas | Sempre `{ "total": number, "data": [...] }` |
| Identificador | Campo `id` (texto), nunca `_id` |
| Erros | Padrão do Nest: `{ "statusCode": 400, "message": "...", "error": "Bad Request" }` |
| Códigos | 200 leitura, 201 criação, 204 remoção sem corpo, 400 dados inválidos, 401 sem login, 403 sem permissão, 404 não encontrado |
| Validação | Campos fora do contrato são recusados (400) |
| Autenticação | Header `Authorization: Bearer <token>` nas rotas protegidas |
| CORS | Origem liberada: variável `FRONTEND_URL` (padrão `http://localhost:4200`) |
| Dados de cartão | NUNCA enviar número, validade ou CVV ao backend |

## Variáveis de ambiente (`.env`)

| Variável | Exemplo | Uso |
|---|---|---|
| `PORT` | `3000` | Porta da API |
| `MONGODB_URI` | `mongodb+srv://USUARIO:SENHA@aromacafe.uxuya1r.mongodb.net/aromacafe` | Conexão com o MongoDB Atlas (obrigatória) |
| `FRONTEND_URL` | `http://localhost:4200` | Origem permitida no CORS |

O `.env` nunca vai para o Git. Use o `.env.example` como modelo.

## Endpoints definidos (contrato fechado)

### Health

| Método | Rota | Resposta |
|---|---|---|
| GET | `/api/health` | 200 `{ "status": "ok" }` |

### Foods (o Angular já consome)

| Método | Rota | Resposta |
|---|---|---|
| GET | `/api/foods` | 200 `{ total, data: [Food] }` |
| GET | `/api/foods/:categoria` | 200 `{ total, data: [Food] }`; 404 se não houver itens |

`:categoria` aceita `salgados` ou `doces`.

Campos de Food:

| Campo | Tipo | Exemplo |
|---|---|---|
| `id` | texto | `"664f1c2e8a1b2c3d4e5f6a7b"` |
| `categoria` | `salgados` ou `doces` | `"doces"` |
| `nome` | texto | `"Brownie"` |
| `descricao` | texto | `"Chocolate com nozes"` |
| `preco` | número | `7` |
| `precoAntigo` | texto ou vazio | `"16,99"` |
| `imagem` | texto (arquivo na pasta `public` do Angular) | `"brownie.jpg"` |

### Drinks (o Angular já consome)

| Método | Rota | Resposta |
|---|---|---|
| GET | `/api/drinks` | 200 `{ total, data: [Drink] }` |

Campos de Drink (em inglês porque o `cardapio.ts` do Angular lê assim):

| Campo | Tipo | Exemplo |
|---|---|---|
| `id` | texto | `"664f1c2e8a1b2c3d4e5f6a7c"` |
| `name` | texto | `"Latte"` |
| `type` | `hot` ou `cold` | `"hot"` |
| `price` | número | `4` |
| `description` | texto (opcional) | `"Café com leite vaporizado"` |
| `image` | texto (opcional) | `"lattedebaunilha.jpg"` |

### Pedidos (checkout)

| Método | Rota | Resposta |
|---|---|---|
| POST | `/api/pedidos` | 201 `{ numero, total, desconto }`; 400 se inválido |

Campos enviados no corpo:

| Campo | Tipo | Obrigatório | Exemplo |
|---|---|---|---|
| `nome` | texto (mín. 3) | sim | `"Maria Silva"` |
| `email` | e-mail | sim | `"maria@email.com"` |
| `telefone` | texto (mín. 10) | sim | `"21999998888"` |
| `cep` | texto | não | `"20040-020"` |
| `endereco` | texto (mín. 3) | sim | `"Av. Rio Branco"` |
| `numero` | texto | sim | `"100"` |
| `bairro` | texto (mín. 3) | sim | `"Centro"` |
| `complemento` | texto | não | `"Apto 12"` |
| `formaPagamento` | `Cartão`, `Dinheiro` ou `Pix` | sim | `"Pix"` |
| `tipoCartao` | `credito` ou `debito` | não | `"credito"` |
| `valorTroco` | número | não | `50` |
| `desconto` | número | não | `0` |
| `itens` | lista de `{ nome, preco, quantidade }` (mín. 1 item) | sim | `[{ "nome": "Brownie", "preco": 7, "quantidade": 2 }]` |

O total é recalculado no servidor a partir dos itens.

## Endpoints propostos (a definir por cada responsável)

Cada responsável detalha os campos no Swagger do próprio módulo e atualiza este arquivo.

| Responsável | Método e rota | Descrição |
|---|---|---|
| 1. Autenticação | POST `/api/auth/cadastro` | Cria usuário |
| 1. Autenticação | POST `/api/auth/login` | Login com e-mail e senha, devolve token |
| 1. Autenticação | POST `/api/auth/google` | Login com token do Google |
| 1. Autenticação | POST `/api/auth/apple` | Login com token da Apple |
| 1. Autenticação | GET, PATCH, DELETE `/api/usuarios/me` | Perfil do usuário logado |
| 2. Administração | POST `/api/admin/login` | Login do administrador |
| 2. Administração | POST, PATCH, DELETE `/api/foods` e `/api/drinks` | Gerenciar cardápio (admin) |
| 2. Administração | GET `/api/admin/resumo` | Números do painel |
| 3. Pedidos | GET `/api/pedidos/meus` | Histórico do usuário |
| 3. Pedidos | GET `/api/pedidos/:numero` | Detalhe de um pedido |
| 3. Pedidos | GET `/api/pedidos` | Todos os pedidos (admin) |
| 3. Pedidos | PATCH `/api/pedidos/:numero/status` | Atualiza status (admin) |
| 3. Pedidos | POST `/api/cupons/validar` | Valida cupom de desconto |
| 4. Avaliações e contatos | GET, POST `/api/avaliacoes` | Lista e cria avaliações |
| 4. Avaliações e contatos | POST `/api/contatos` | Mensagem de contato |
| 5. Uploads | POST `/api/uploads/avatar` | PNG, GIF ou MP4 até 20 MB |
| 5. Uploads | POST `/api/uploads/produto` | Imagem de produto (admin) |
| 6. Infraestrutura | GET `/api/destaques` | "Nossos Favoritos" com selos |
| 6. Infraestrutura | GET `/api/cep/:cep` | Consulta de CEP (proxy do ViaCEP) |

## Regras para a equipe

1. Cada pessoa mexe só na pasta do seu módulo em `src/`.
2. Só a coordenação edita `main.ts` e `app.module.ts`: cada pessoa envia a linha de `import` do seu módulo.
3. Todo controller usa `@ApiTags`, `@ApiOperation` e `@ApiOkResponse` (ou equivalente) para aparecer no Swagger.
4. Imports locais terminam em `.js` (projeto ESM).
5. Alterou o contrato? Atualize este arquivo e avise o frontend antes de mergear.
