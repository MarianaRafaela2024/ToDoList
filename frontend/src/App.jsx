import { useState } from 'react';
import { EmptyState } from './components/EmptyState.jsx';
import { FloatingButton } from './components/FloatingButton.jsx';
import { SearchBar } from './components/SearchBar.jsx';
import { TaskList } from './components/TaskList.jsx';
import { TaskModal } from './components/TaskModal.jsx';
import { useDebounce } from './hooks/useDebounce.js';
import { useTasks } from './hooks/useTasks.js';
import './App.css';

function App() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const { tasks, total, completedCount, loading, error, create, update, toggleCompleted, remove } =
    useTasks(debouncedSearch);

  const [modal, setModal] = useState(null);
  const [actionError, setActionError] = useState('');

  const closeModal = () => setModal(null);

  const handleCreate = async ({ title, dueDate }) => {
    await create({ title, dueDate });
  };

  const handleEdit = async ({ title, dueDate }) => {
    await update(modal.task.id, { title, dueDate });
  };

  const handleDelete = async (task) => {
    setActionError('');
    try {
      await remove(task.id);
    } catch (err) {
      setActionError(err.message || 'Não foi possível excluir a tarefa.');
    }
  };

  const handleToggle = async (task) => {
    setActionError('');
    try {
      await toggleCompleted(task);
    } catch (err) {
      setActionError(err.message || 'Não foi possível atualizar a tarefa.');
    }
  };

  const visibleError = actionError || error;

  return (
    <div className="page">
      <main className="app-card">
        <header className="app-header">
          <h1>My Tasks</h1>
          <p>
            {total} total · {completedCount} concluídas
          </p>
        </header>

        <SearchBar value={search} onChange={setSearch} />

        {visibleError ? <p className="app-feedback app-feedback--error">{visibleError}</p> : null}
        {loading ? <p className="app-feedback">Carregando tarefas...</p> : null}

        {!loading && tasks.length === 0 ? <EmptyState /> : null}
        {tasks.length > 0 ? (
          <TaskList
            tasks={tasks}
            onToggle={handleToggle}
            onEdit={(task) => setModal({ mode: 'edit', task })}
            onDelete={handleDelete}
          />
        ) : null}
      </main>

      <FloatingButton onClick={() => setModal({ mode: 'create' })} />

      {modal ? (
        <TaskModal
          key={modal.mode === 'edit' ? modal.task.id : 'create'}
          mode={modal.mode}
          task={modal.task}
          onClose={closeModal}
          onSubmit={modal.mode === 'edit' ? handleEdit : handleCreate}
        />
      ) : null}
    </div>
  );
}

export default App;
