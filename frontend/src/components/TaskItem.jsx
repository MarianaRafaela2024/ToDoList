import { Check, Pencil, Trash2 } from 'lucide-react';
import { formatDueDate, isCompleted, isOverdue } from '../utils/tasks.js';
import './TaskItem.css';

export function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const completed = isCompleted(task);
  const overdue = isOverdue(task);

  return (
    <li className={`task-item${completed ? ' task-item--completed' : ''}`}>
      <button
        type="button"
        className={`task-item__check${completed ? ' is-checked' : ''}`}
        onClick={() => onToggle(task)}
        aria-pressed={completed}
        aria-label={completed ? 'Desmarcar tarefa' : 'Marcar como concluída'}
      >
        {completed ? <Check size={14} strokeWidth={3} /> : null}
      </button>

      <div className="task-item__content">
        <div className="task-item__title-row">
          <p className={`task-item__title${overdue ? ' is-overdue' : ''}`}>{task.title}</p>
          {overdue ? <span className="task-item__badge">Em atraso</span> : null}
        </div>
        {task.due_date ? (
          <span className="task-item__date">{formatDueDate(task.due_date)}</span>
        ) : null}
      </div>

      <div className="task-item__actions">
        <button
          type="button"
          className="task-item__action"
          onClick={() => onEdit(task)}
          aria-label="Editar tarefa"
        >
          <Pencil size={16} />
        </button>
        <button
          type="button"
          className="task-item__action task-item__action--danger"
          onClick={() => onDelete(task)}
          aria-label="Excluir tarefa"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </li>
  );
}
