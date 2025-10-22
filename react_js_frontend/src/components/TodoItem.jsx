import React, { useEffect, useRef, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem renders a single task with toggle, edit, and delete controls.
 * Props:
 * - todo: { id, text, completed, createdAt }
 * - onToggle: () => void
 * - onDelete: () => void
 * - onUpdate: (text: string) => void
 */
export default function TodoItem({ todo, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const startEdit = () => {
    setDraft(todo.text);
    setEditing(true);
  };

  const saveEdit = () => {
    const v = draft.trim();
    if (v && v !== todo.text) {
      onUpdate(v);
    }
    setEditing(false);
  };

  const cancelEdit = () => {
    setDraft(todo.text);
    setEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') saveEdit();
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className="item" role="listitem">
      <input
        type="checkbox"
        className="checkbox"
        checked={!!todo.completed}
        onChange={onToggle}
        aria-label={todo.completed ? 'Mark as active' : 'Mark as completed'}
        title={todo.completed ? 'Mark as active' : 'Mark as completed'}
      />
      <div className="item-text-wrap" style={{ width: '100%' }}>
        {editing ? (
          <input
            ref={inputRef}
            className="item-edit-input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={saveEdit}
            aria-label="Edit task text"
          />
        ) : (
          <div
            className={`item-text ${todo.completed ? 'completed' : ''}`}
            onDoubleClick={startEdit}
            title="Double-click to edit"
          >
            {todo.text}
          </div>
        )}
      </div>
      <div className="item-actions">
        {!editing && (
          <button
            className="btn btn-icon btn-outline"
            onClick={startEdit}
            aria-label="Edit task"
            title="Edit"
          >
            ✏️
          </button>
        )}
        {editing ? (
          <>
            <button
              className="btn btn-small btn-outline success"
              onClick={saveEdit}
              aria-label="Save edit"
              title="Save"
            >
              Save
            </button>
            <button
              className="btn btn-small btn-ghost"
              onClick={cancelEdit}
              aria-label="Cancel edit"
              title="Cancel (Esc)"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            className="btn btn-icon btn-ghost danger"
            onClick={onDelete}
            aria-label="Delete task"
            title="Delete"
          >
            🗑️
          </button>
        )}
      </div>
    </div>
  );
}
