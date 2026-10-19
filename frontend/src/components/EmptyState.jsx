import { ClipboardCheck } from 'lucide-react';
import './EmptyState.css';

export function EmptyState() {
  return (
    <div className="empty-state">
      <ClipboardCheck className="empty-state__icon" size={48} strokeWidth={1.5} />
      <p className="empty-state__text">Você não tem tarefas pendentes</p>
    </div>
  );
}
