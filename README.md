# Projeto Blog Node.js + MongoDB

Aplicação de blog desenvolvida em Node.js com Express, EJS e MongoDB. Permite cadastro de usuários, login, criação de posts, comentários, edição de perfil e navegação por posts populares e recentes.

## Funcionalidades

- Autenticação de usuário com login e logout
- Cadastro de novos usuários
- Criação de posts com título, conteúdo, tags e imagem
- Edição de posts e perfil de usuário
- Comentários em posts
- Página inicial com posts mais populares
- Página de exploração com busca, ordenação e paginação de posts
- Rotas protegidas para criação e edição usando middleware

## Tecnologias

- Node.js
- Express
- MongoDB / Mongoose
- EJS
- bcrypt
- jsonwebtoken
- cookie-parser
- method-override
- dotenv
- nodemon (dev)

## Estrutura do projeto

- `index.js` - arquivo principal do servidor
- `src/config/` - configuração de ambiente e conexão com MongoDB
- `src/model/` - modelos Mongoose (`User`, `Post`, `Comment`)
- `src/routes/` - rotas de autenticação, posts e usuários
- `src/middleware/` - middleware de identificação de usuário e proteção de rotas
- `src/views/` - templates EJS de páginas e parciais
- `src/public/` - arquivos estáticos (CSS, JS, imagens)

## Requisitos

- Node.js instalado
- MongoDB em execução localmente ou URI MongoDB disponível

## Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure variáveis de ambiente (opcional):

- `PORT` - porta do servidor (padrão `3000`)
- `JWT_SECRET` - segredo JWT para autenticação 
- `MONGODB_URI` - URI do MongoDB (padrão `mongodb://localhost/projetcBlog`)

Você pode criar um arquivo `.env` e carregar essas variáveis ou definir no ambiente.

## Executando

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

Acesse em `http://localhost:3000`

## Rotas principais

- `GET /` - página inicial
- `GET /about` - página sobre
- `GET /posts` - explorar posts
- `GET /posts/new` - criar novo post (usuário logado)
- `GET /posts/:postId` - visualizar post
- `POST /posts` - salvar novo post
- `POST /posts/:postId/comments` - adicionar comentário
- `GET /login` - página de login
- `POST /login` - autenticar usuário
- `GET /logout` - encerrar sessão
- `GET /users/register` - página de cadastro
- `POST /users/register` - criar usuário
- `GET /users/:userId` - ver perfil de usuário
- `PUT /users/:userId` - editar perfil (usuário logado)

## Observações

- As rotas de criação e edição dependem de autenticação via cookie JWT.
- O projeto usa `method-override` para permitir métodos HTTP como `PUT` e `DELETE` em formulários HTML.

## Contato

Este README foi gerado para documentar o projeto de blog em Node.js e MongoDB.
