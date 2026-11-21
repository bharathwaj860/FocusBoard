import React from "react";
import { useMemo, useState } from 'react';
import { Check, ChevronDown, CircleHelp, Command, LayoutDashboard, Plus, Search, Settings2, Sparkles } from 'lucide-react';
import { sampleTasks } from './data/sampleTasks';
import { useLocalStorage } from './hooks/useLocalStorage';
import StatCard from './components/StatCard';
import FocusNotes from './components/FocusNotes';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

const tabs = ['All tasks', 'To do', 'In progress', 'Completed'];

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard-tasks', sampleTasks);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('All tasks');
  const [priority, setPriority] = useState('All priorities');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.status === 'Completed').length;
    const inProgress = tasks.filter((task) => task.status === 'In progress').length;
    return { total: tasks.length, completed, inProgress, rate: tasks.length ? Math.round(completed / tasks.length * 100) : 0 };
  }, [tasks]);

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(query.toLowerCase());
    const matchesTab = activeTab === 'All tasks' || task.status === activeTab;
    const matchesPriority = priority === 'All priorities' || task.priority === priority;
    return matchesSearch && matchesTab && matchesPriority;
  }), [tasks, query, activeTab, priority]);

  const saveTask = (task) => {
    setTasks((current) => editingTask ? current.map((item) => item.id === task.id ? task : item) : [task, ...current]);
    setShowForm(false); setEditingTask(null);
  };
  const editTask = (task) => { setEditingTask(task); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditingTask(null); };
  const deleteTask = (id) => { if (window.confirm('Are you sure you want to delete this task?')) setTasks((current) => current.filter((task) => task.id !== id)); };
  const changeStatus = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task));

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="FocusBoard home"><span className="brand-mark"><Check size={19} /></span><span>focus<span>board</span></span></a>
        <div className="workspace-label">WORKSPACE</div>
        <nav><a className="nav-link selected" href="#dashboard"><LayoutDashboard size={18} />Dashboard</a></nav>
        <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18} /></div><strong>Need a hand?</strong><p>Make every day a little more focused.</p><a href="mailto:hello@example.com">Get help <span>↗</span></a></div><div className="profile"><div className="avatar">B</div><div><strong>Your workspace</strong><small>Personal account</small></div><Settings2 size={17} /></div></div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <strong>Dashboard</strong></div><div className="topbar-right"><span className="today-label">YOUR PRODUCTIVITY SPACE</span><div className="avatar small">B</div></div></header>
        <div className="page-wrap">
          <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL WORKSPACE</div><h1>Make today count<span>.</span></h1><p>A clear mind starts with a clear plan. Let's get things done.</p></div><button className="button primary create-button" onClick={() => setShowForm(true)}><Plus size={18} /> New task</button></section>

          <section className="stats-grid" aria-label="Task statistics">
            <StatCard type="total" label="Total tasks" value={stats.total} note="Tasks in your workspace" />
            <StatCard type="progress" label="In progress" value={stats.inProgress} note="Currently being worked on" />
            <StatCard type="completed" label="Completed" value={stats.completed} note="Great work, keep going" />
            <StatCard type="rate" label="Completion rate" value={`${stats.rate}%`} note="Based on all tasks" />
          </section>

          <FocusNotes />

          <section className="tasks-section">
            <div className="section-heading"><div><span className="eyebrow">YOUR WORK, ORGANIZED</span><h2>My tasks <span className="task-count">{visibleTasks.length}</span></h2></div><button className="button outline" onClick={() => setShowForm(true)}><Plus size={16} /> Add task</button></div>
            <div className="toolbar"><div className="tabs" role="tablist" aria-label="Filter tasks by status">{tabs.map((tab) => <button role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="filters"><label className="search-box"><Search size={16} /><span className="sr-only">Search task titles</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks..." /></label><label className="priority-filter"><Settings2 size={15} /><span className="sr-only">Filter by priority</span><select value={priority} onChange={(event) => setPriority(event.target.value)}><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select><ChevronDown size={14} /></label></div></div>
            <div className="task-list">{visibleTasks.length ? visibleTasks.map((task) => <TaskCard key={task.id} task={task} onEdit={editTask} onDelete={deleteTask} onStatusChange={changeStatus} />) : <div className="empty-state"><div className="empty-icon"><Command size={22} /></div><h3>No tasks found</h3><p>Try changing your search or filters, or create a new task.</p><button className="button primary" onClick={() => { setQuery(''); setPriority('All priorities'); setActiveTab('All tasks'); }}>Clear filters</button></div>}</div>
          </section>
          <footer className="footer">Made for focused days <span>✦</span> Keep moving forward.</footer>
        </div>
      </main>
      {showForm && <TaskForm task={editingTask} onSave={saveTask} onClose={closeForm} />}
    </div>
  );
}