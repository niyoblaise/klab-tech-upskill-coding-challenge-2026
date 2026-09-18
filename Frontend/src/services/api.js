const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || "https://klab-backend-xsdf.onrender.com";
const API_BASE_URL = `${BACKEND_URL}/tasks`;


export async function fetchTasks({ page = 0, size = 10, status = "", search = "" } = {}) {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: "status,desc",
  });
  queryParams.append("sort", "createdAt,desc");
  queryParams.append("sort", "id,desc");

  if (status) queryParams.append("status", status);
  if (search) queryParams.append("search", search);

  const res = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  const data = await res.json();

  if (Array.isArray(data)) {
    const sorted = [...data].sort((a, b) => {
      if (a.status !== b.status) return a.status === "PENDING" ? -1 : 1;
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      if (timeA !== timeB) return timeB - timeA;
      return b.id - a.id;
    });
    return { content: sorted, totalPages: 1, totalElements: sorted.length, page: 0 };
  }


  const pageMeta = data.page || {};

  const totalPages = pageMeta.totalPages ?? data.totalPages ?? 1;
  const totalElements = pageMeta.totalElements ?? data.totalElements ?? (data.content ? data.content.length : 0);
  const pageNumber = pageMeta.number ?? data.number ?? 0;

  return {
    content: data.content || [],
    totalPages,
    totalElements,
    page: pageNumber,
  };
}

export async function createTask(taskData) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    throw new Error("Failed to create task");
  }
  return await res.json();
}

export async function updateTask(id, taskData) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) {
    throw new Error("Failed to update task");
  }
  return await res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to delete task");
  }
}
