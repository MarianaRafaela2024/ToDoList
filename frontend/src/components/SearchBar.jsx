import { Search } from 'lucide-react';
import './SearchBar.css';

export function SearchBar({ value, onChange }) {
  return (
    <label className="search-bar">
      <Search className="search-bar__icon" size={18} strokeWidth={2} aria-hidden="true" />
      <input
        type="search"
        className="search-bar__input"
        placeholder="Buscar tarefas..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Buscar tarefas"
      />
    </label>
  );
}
