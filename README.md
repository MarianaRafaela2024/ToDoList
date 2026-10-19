# To Do List

Sistema de lista de tarefas com API Node.js (Fastify + MySQL) e frontend React + Vite.

## Requisitos

- Node.js
- MySQL
- Banco `todolist` com tabela `tasks`

## Como rodar

Na raiz, instale as dependências do backend e suba a API:

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3333`.

Em outro terminal, rode o frontend:

```bash
cd frontend
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`.

## Variáveis de ambiente

**Backend** (arquivo `.env` na raiz):

```
PORT=3333
CORS_ORIGIN=http://localhost:5173
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=todolist
```

**Frontend** (`frontend/.env`):

```
VITE_API_URL=http://localhost:3333
```

O CORS já está configurado para `http://localhost:5173`. Se o front usar outra origem, altere `CORS_ORIGIN`.

## Funcionalidades

- Listar tarefas com total e quantidade de concluídas
- Criar, editar e excluir tarefas
- Marcar/desmarcar como concluída
- Busca em tempo real com debounce
- Ordenação por data limite (sem data vai para o fim)
- Destaque de tarefas em atraso
- Estado vazio: "Você não tem tarefas pendentes"

## API

| Funcionalidade | Método e rota | Corpo |
| --- | --- | --- |
| Listar / buscar | `GET /api/tasks?search=` | — |
| Criar | `POST /api/tasks` | `{ "title", "dueDate" }` |
| Editar / concluir | `PATCH /api/tasks/:id` | `{ "title?", "dueDate?", "completed?" }` |
| Excluir | `DELETE /api/tasks/:id` | — |
| Saúde | `GET /health` | — |

Resposta de cada tarefa: `id`, `title`, `completed`, `due_date`, `created_at`.

Exemplos em `backend/rotas.http`.

## Estrutura

```
backend/
  src/
    server.js
    db.js
    routes/tasks.js
  rotas.http
frontend/
  src/
    App.jsx
    services/api.js
    hooks/
    components/
```
