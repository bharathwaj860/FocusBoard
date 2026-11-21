import React from "react";
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

const notes = [
  { eyebrow: 'FOCUS TIP 01', title: 'Start with one small win.', body: 'Choose one important task and give it your full attention. Progress builds momentum.' },
  { eyebrow: 'FOCUS TIP 02', title: 'Make room for deep work.', body: 'Silence distractions and work in a short, focused session. Take a break when the timer ends.' },
  { eyebrow: 'FOCUS TIP 03', title: 'Celebrate what you finish.', body: 'Acknowledge completed tasks. Then choose the next clear action instead of multitasking.' }
];

export default function FocusNotes() {
  const [active, setActive] = useState(0);
  const move = (step) => setActive((current) => (current + step + notes.length) % notes.length);
  const note = notes[active];

  return (
    <section className="focus-panel" aria-label="Focus notes">
      <div className="focus-top"><span><Lightbulb size={16} /> FOCUS NOTES</span><div className="carousel-controls">
        <button aria-label="Previous note" onClick={() => move(-1)}><ArrowLeft size={16} /></button>
        <button aria-label="Next note" onClick={() => move(1)}><ArrowRight size={16} /></button>
      </div></div>
      <div className="note-content" aria-live="polite">
        <small>{note.eyebrow}</small><h3>{note.title}</h3><p>{note.body}</p>
      </div>
      <div className="note-dots">{notes.map((item, index) => <button key={item.eyebrow} aria-label={`Show note ${index + 1}`} aria-current={active === index ? 'true' : undefined} className={active === index ? 'active' : ''} onClick={() => setActive(index)} />)}</div>
    </section>
  );
}