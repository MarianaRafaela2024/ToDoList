# Frontend — My Tasks

Aplicação React + Vite que consome a API do backend em `backend/src`.

## Como rodar

```bash
cd frontend
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`. Copie `.env.example` para `.env` se quiser alterar a URL da API:

```
VITE_API_URL=http://localhost:3333
```

O backend precisa estar rodando (padrão: porta `3333`).

No estado vazio, a lista exibe: **Você não tem tarefas pendentes**.

## Estrutura

```
frontend/
  index.html
  package.json
  vite.config.js
  .env.example
  src/
    main.jsx
    App.jsx
    App.css
    index.css
    services/api.js
    hooks/useDebounce.js
    hooks/useTasks.js
    utils/tasks.js
    components/
      SearchBar.jsx
      TaskList.jsx
      TaskItem.jsx
      TaskModal.jsx
      FloatingButton.jsx
      EmptyState.jsx
```

## Rotas usadas

| Funcionalidade | Método e rota |
| --- | --- |
| Listar tarefas, busca e contadores | `GET /api/tasks?search=` |
| Criar tarefa | `POST /api/tasks` body `{ title, dueDate }` |
| Editar título/data e marcar concluída | `PATCH /api/tasks/:id` body `{ title?, dueDate?, completed? }` |
| Excluir tarefa | `DELETE /api/tasks/:id` |
