import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList renders a list of todos.
 * Props:
 * - todos: Array<{ id, text, completed, createdAt }>
 * - onToggle: (id: string) => void
 * - onDelete: (id: string) => void
 * - onUpdate: (id: string, text: string) => void
 */
export default function TodoList({ todos, onToggle, onDelete, onUpdate }) {
  if (!todos?.length) {
    return (
      <div className="list" role="list">
        <div className="item" role="listitem">
          <div className="item-text muted">No tasks yet — add your first one!</div>
        </div>
      </div>
    );
  }

  return (
    <div className="list" role="list" aria-label="Todo list">
      {todos.map((t) => (
        <TodoItem
          key={t.id}
          todo={t}
          onToggle={() => onToggle(t.id)}
          onDelete={() => onDelete(t.id)}
          onUpdate={(text) => onUpdate(t.id, text)}
        />
      ))}
    </div>
  );
}
