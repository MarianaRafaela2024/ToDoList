import { useEffect, useId, useState } from 'react';
import './TaskModal.css';

export function TaskModal({ mode, task, onClose, onSubmit }) {
  const titleId = useId();
  const dateId = useId();
  const isEdit = mode === 'edit';

  const [title, setTitle] = useState(task?.title ?? '');
  const [dueDate, setDueDate] = useState(task?.due_date ? String(task.due_date).slice(0, 10) : '');
  const [titleError, setTitleError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = title.trim();

    if (!trimmed) {
      setTitleError('Informe um título para a tarefa.');
      return;
    }

    setTitleError('');
    setSubmitError('');
    setSubmitting(true);

    try {
      await onSubmit({
        title: trimmed,
        dueDate: dueDate || null,
      });
      onClose();
    } catch (err) {
      setSubmitError(err.message || 'Não foi possível salvar a tarefa.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="task-modal-title" className="modal-card__title">
          {isEdit ? 'Editar Tarefa' : 'Criar Tarefa'}
        </h2>

        <form className="modal-form" onSubmit={handleSubmit} noValidate>
          <div className="modal-field">
            <label htmlFor={titleId}>Título</label>
            <input
              id={titleId}
              type="text"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                if (titleError) setTitleError('');
              }}
              placeholder="Ex.: Estudar Fastify"
              autoFocus
              aria-invalid={Boolean(titleError)}
            />
            {titleError ? <span className="modal-field__error">{titleError}</span> : null}
          </div>

          <div className="modal-field">
            <label htmlFor={dateId}>Data limite (opcional)</label>
            <input
              id={dateId}
              type="date"
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

          {submitError ? <p className="modal-form__error">{submitError}</p> : null}

          <div className="modal-actions">
            <button type="button" className="btn btn--secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn--primary" disabled={submitting}>
              {submitting ? 'Salvando...' : isEdit ? 'Salvar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
