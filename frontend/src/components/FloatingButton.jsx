import { Plus } from 'lucide-react';
import './FloatingButton.css';

export function FloatingButton({ onClick }) {
  return (
    <button
      type="button"
      className="floating-button"
      onClick={onClick}
      aria-label="Criar tarefa"
    >
      <Plus size={28} strokeWidth={2.4} />
    </button>
  );
}
