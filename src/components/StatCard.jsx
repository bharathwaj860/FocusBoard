import React from "react";
import { CheckCircle2, CircleDashed, ListTodo, TrendingUp } from 'lucide-react';

const icons = {
  total: ListTodo,
  progress: CircleDashed,
  completed: CheckCircle2,
  rate: TrendingUp
};

export default function StatCard({ type, label, value, note }) {
  const Icon = icons[type];
  return (
    <article className="stat-card">
      <div className={`stat-icon ${type}`}><Icon size={19} /></div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong>{value}</strong>
        <small>{note}</small>
      </div>
    </article>
  );
}