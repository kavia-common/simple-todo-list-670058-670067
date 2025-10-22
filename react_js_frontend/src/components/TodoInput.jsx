import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput allows users to add new tasks.
 * Props:
 * - onAdd: (text: string) => void
 */
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const submit = () => {
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText('');
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

  return (
    <div className="input-row" role="form" aria-label="Add new task">
      <input
        className="input"
        type="text"
        placeholder="Add a new task..."
        aria-label="New task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        className="btn btn-primary"
        onClick={submit}
        aria-label="Add task"
        title="Add task"
      >
        Add
      </button>
    </div>
  );
}
