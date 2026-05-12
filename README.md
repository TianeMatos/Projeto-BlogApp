# Projeto BlogApp 📝

Aplicação de blog completa desenvolvida com Node.js, Express, EJS e MongoDB. Permite cadastro e autenticação de usuários, criação e edição de posts com tags e imagem, comentários, busca com paginação e navegação por posts populares.
Acesse o **[BlogApp!](https://blogapp-7bgk.onrender.com)**

---

## 📸 Preview
  <img src="./src/public/images/About-BlogApp!.gif" alt="Gif Mostrando o Site" width="700">

---

## ✨ Funcionalidades

- 🔐 Autenticação com JWT via cookie (login e logout)
- 📝 Cadastro de usuários com validação
- ✍️ Criação de posts com título, conteúdo, tags e imagem
- ✏️ Edição de posts e perfil de usuário
- 💬 Comentários em posts
- 🏠 Página inicial com os posts mais populares
- 🔍 Exploração de posts com busca, ordenação e paginação
- 🛡️ Rotas protegidas via middleware de autenticação

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js + Express | Servidor e roteamento |
| MongoDB + Mongoose | Banco de dados |
| EJS | Template engine |
| bcrypt | Hash de senhas |
| jsonwebtoken | Autenticação JWT |
| cookie-parser | Leitura de cookies |
| method-override | Suporte a PUT/DELETE em formulários |
| helmet | Headers de segurança HTTP |
| dotenv | Variáveis de ambiente |
| nodemon | Hot-reload em desenvolvimento |

## 📁 Estrutura do projeto

- `index.js` — Ponto de entrada, configuração do servidor
- `src/config/` — Variáveis de ambiente e conexão com MongoDB
- `src/controllers/` — Lógica de negócio (auth, posts, usuários)
- `src/model/` — Modelos Mongoose (User, Post, Comment)
- `src/routes/` — Definição das rotas da aplicação
- `src/middleware/` — Identificação de usuário e proteção de rotas
- `src/views/` — Templates EJS (páginas e parciais)
- `src/public/` — Arquivos estáticos (CSS, JS, imagens)

---

## 🗺️ Rotas
> ✅ Requer autenticação &nbsp;|&nbsp; ❌ Pública

### Páginas

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/` | Página inicial com posts populares | ❌ |
| GET | `/about` | Página sobre | ❌ |

### Autenticação

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/login` | Página de login | ❌ |
| POST | `/login` | Autenticar usuário | ❌ |
| GET | `/logout` | Encerrar sessão | ✅ |

### Usuários

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/users/register` | Página de cadastro | ❌ |
| POST | `/users/register` | Criar novo usuário | ❌ |
| GET | `/users/:userId` | Ver perfil | ✅ |
| GET | `/users/:userId/edit` | Página de edição de perfil | ✅ |
| PUT | `/users/:userId` | Atualizar perfil | ✅ |

### Posts

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/posts` | Explorar posts (busca + paginação) | ❌ |
| GET | `/posts/new` | Página de criação de post | ✅ |
| POST | `/posts` | Salvar novo post | ✅ |
| GET | `/posts/:postId` | Visualizar post | ❌ |
| GET | `/posts/:postId/edit` | Página de edição de post | ✅ |
| PUT | `/posts/:postId` | Atualizar post | ✅ |
| POST | `/posts/:postId/comments` | Adicionar comentário | ✅ |


---

## 👤 Autora

Feito por **[Tiane Matos](https://github.com/TianeMatos)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/tiane-matos)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/TianeMatos)

