import { useCallback, useEffect, useState } from 'react';
import { createTask, deleteTask, getTasks, updateTask } from '../services/api.js';
import { isCompleted, sortTasks } from '../utils/tasks.js';

export function useTasks(search) {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getTasks({ search });
      setTasks(sortTasks(data.tasks || []));
      setTotal(data.total ?? 0);
      setCompletedCount(Number(data.completed) || 0);
    } catch (err) {
      setError(err.message || 'Erro ao carregar tarefas.');
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const create = async ({ title, dueDate }) => {
    await createTask({ title, dueDate });
    await loadTasks();
  };

  const update = async (id, payload) => {
    await updateTask(id, payload);
    await loadTasks();
  };

  const toggleCompleted = async (task) => {
    await updateTask(task.id, { completed: !isCompleted(task) });
    await loadTasks();
  };

  const remove = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  return {
    tasks,
    total,
    completedCount,
    loading,
    error,
    reload: loadTasks,
    create,
    update,
    toggleCompleted,
    remove,
  };
}
