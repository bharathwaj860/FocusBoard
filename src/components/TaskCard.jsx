import React from "react";
import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';

export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  const date = task.dueDate ? new Date(`${task.dueDate}T00:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric' }) : 'No due date';
  return (
    <article className={`task-card ${task.status === 'Completed' ? 'is-complete' : ''}`}>
      <div className="task-main">
        <div className="task-title-line"><h3>{task.title}</h3><div className="task-actions"><button title="Edit task" aria-label={`Edit ${task.title}`} onClick={() => onEdit(task)}><Pencil size={15} /></button><button title="Delete task" aria-label={`Delete ${task.title}`} onClick={() => onDelete(task.id)}><Trash2 size={15} /></button></div></div>
        {task.description && <p>{task.description}</p>}
        <div className="task-meta"><span className="category-pill">{task.category}</span><span className={`priority ${task.priority.toLowerCase()}`}>{task.priority} priority</span><span className="due-date"><CalendarDays size={14} />{date}</span></div>
      </div>
      <div className="task-status"><label className="sr-only" htmlFor={`status-${task.id}`}>Status for {task.title}</label><select id={`status-${task.id}`} value={task.status} onChange={(event) => onStatusChange(task.id, event.target.value)}><option>To do</option><option>In progress</option><option>Completed</option></select></div>
    </article>
  );
}