import React, { useState, useEffect, useCallback } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskModal from "./components/TaskModal";
import { fetchTasks, createTask, updateTask, deleteTask } from "./services/api";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 5;

  const loadTasks = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchTasks({
        page,
        size: pageSize,
        status: statusFilter,
        search,
      });
      setTasks(data.content);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
    setPage(0);
  };

  const handleAddTask = async (taskData) => {
    setIsLoading(true);
    try {
      await createTask(taskData);
      loadTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (task) => {
    const updatedStatus = task.status === "COMPLETED" ? "PENDING" : "COMPLETED";
    setIsLoading(true);
    try {
      await updateTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: updatedStatus,
      });
      loadTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEditedTask = async (id, updatedData) => {
    setIsLoading(true);
    try {
      await updateTask(id, updatedData);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Task Management System
          </h1>

        </header>

        <TaskForm onAddTask={handleAddTask} isLoading={isLoading} />

        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-blue-600 focus:bg-white"
            />
          </div>
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:bg-white cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="PENDING">PENDING</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-sm">
              No tasks found.
            </div>
          ) : (
            tasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={(t) => setEditingTask(t)}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
              />
            ))
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600">
            <span>
              Showing {tasks.length} of {totalElements} tasks
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0 || isLoading}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:opacity-40"
              >
                Previous
              </button>
              <span>
                Page {page + 1} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1 || isLoading}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <TaskModal
          task={editingTask}
          isOpen={!!editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleSaveEditedTask}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
