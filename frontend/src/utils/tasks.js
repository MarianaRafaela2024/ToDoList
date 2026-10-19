export function isCompleted(task) {
  return task?.completed === true || task?.completed === 1 || task?.completed === '1';
}

export function parseDueDate(dueDate) {
  if (!dueDate) return null;
  const datePart = String(dueDate).slice(0, 10);
  const [year, month, day] = datePart.split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

export function formatDueDate(dueDate) {
  const date = parseDueDate(dueDate);
  if (!date) return '';
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function isOverdue(task) {
  if (isCompleted(task) || !task?.due_date) return false;
  const due = parseDueDate(task.due_date);
  if (!due) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return String(a.due_date).localeCompare(String(b.due_date));
  });
}
