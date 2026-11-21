import React from "react";
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const emptyTask = { title: '', description: '', category: 'Work', status: 'To do', priority: 'Medium', dueDate: '' };

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(task || emptyTask);
  useEffect(() => setForm(task || emptyTask), [task]);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, title: form.title.trim(), id: task?.id || `task-${Date.now()}` });
  };

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
        <div className="modal-heading"><div><span className="eyebrow">{task ? 'UPDATE YOUR WORK' : 'MAKE IT HAPPEN'}</span><h2 id="task-form-title">{task ? 'Edit task' : 'Create a task'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20} /></button></div>
        <form onSubmit={submit}>
          <label>Task title<input name="title" value={form.title} onChange={update} placeholder="e.g. Complete project design" required autoFocus /></label>
          <label>Description<textarea name="description" value={form.description} onChange={update} placeholder="Add a few details..." rows="3" /></label>
          <div className="form-grid">
            <label>Category<select name="category" value={form.category} onChange={update}><option>Work</option><option>Learning</option><option>Personal</option><option>Design</option></select></label>
            <label>Due date<input type="date" name="dueDate" value={form.dueDate} onChange={update} /></label>
            <label>Status<select name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></label>
            <label>Priority<select name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></label>
          </div>
          <div className="modal-actions"><button type="button" className="button secondary" onClick={onClose}>Cancel</button><button type="submit" className="button primary">{task ? 'Save changes' : 'Create task'}</button></div>
        </form>
      </section>
    </div>
  );
}