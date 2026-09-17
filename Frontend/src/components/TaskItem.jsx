import React from "react";

export default function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const isCompleted = task.status === "COMPLETED";

  const priorityBadges = {
    HIGH: "bg-red-50 text-red-700 border-red-200",
    MEDIUM: "bg-amber-50 text-amber-700 border-amber-200",
    LOW: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const statusBadges = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    PENDING: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div
      className={`rounded-2xl border p-5 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isCompleted ? "bg-slate-50 border-slate-200 opacity-80" : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-start gap-3.5 flex-1">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onToggleStatus && onToggleStatus(task)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer shrink-0"
        />

        <div className="space-y-1.5 flex-1">
          <h3
            className={`text-base font-semibold ${
              isCompleted ? "line-through text-slate-400" : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p
              className={`text-sm leading-relaxed ${
                isCompleted ? "line-through text-slate-400" : "text-slate-600"
              }`}
            >
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 pt-1">
            <span
              className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold uppercase ${
                priorityBadges[task.priority] || priorityBadges.MEDIUM
              }`}
            >
              {task.priority}
            </span>
            <span
              className={`rounded-lg border px-2.5 py-0.5 text-[11px] font-semibold uppercase ${
                statusBadges[task.status] || statusBadges.PENDING
              }`}
            >
              {task.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => onEdit(task)}
          className="rounded-xl border border-blue-600 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="rounded-xl border border-blue-600 bg-transparent px-3.5 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
