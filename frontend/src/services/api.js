const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

async function request(path, options = {}) {
  const { body, headers, ...rest } = options;

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (response.status === 204) {
    return null;
  }

  let data = null;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message = data?.message || 'Não foi possível concluir a requisição.';
    throw new Error(message);
  }

  return data;
}

export function getTasks({ search = '', status = 'all' } = {}) {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (status && status !== 'all') {
    params.set('status', status);
  }

  const query = params.toString();
  return request(`/api/tasks${query ? `?${query}` : ''}`);
}

export function createTask({ title, dueDate }) {
  return request('/api/tasks', {
    method: 'POST',
    body: {
      title,
      dueDate: dueDate || null,
    },
  });
}

export function updateTask(id, payload) {
  return request(`/api/tasks/${id}`, {
    method: 'PATCH',
    body: payload,
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
