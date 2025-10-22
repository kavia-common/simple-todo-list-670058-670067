import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

// PUBLIC_INTERFACE
export default function App() {
  /** This is the main Todo application component. It manages task state,
   * persistence to localStorage, and wires UI components together.
   */

  const STORAGE_KEY = 'todos_v1';

  const [todos, setTodos] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed;
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // Swallow errors to avoid breaking UI if storage is unavailable
    }
  }, [todos]);

  const addTodo = (text) => {
    if (!text || !text.trim()) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const updateTodo = (id, text) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, text: text.trim() } : t))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((t) => !t.completed));
  };

  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);

  return (
    <div className="app-root">
      <Header />
      <main className="container">
        <section className="card surface shadow-md">
          <TodoInput onAdd={addTodo} />
          <div className="toolbar">
            <div className="filters" role="group" aria-label="Filter tasks">
              <button
                className={`chip ${filter === 'all' ? 'chip-active' : ''}`}
                onClick={() => setFilter('all')}
                aria-pressed={filter === 'all'}
                aria-label="Show all tasks"
              >
                All
              </button>
              <button
                className={`chip ${filter === 'active' ? 'chip-active' : ''}`}
                onClick={() => setFilter('active')}
                aria-pressed={filter === 'active'}
                aria-label="Show active tasks"
              >
                Active
              </button>
              <button
                className={`chip ${filter === 'completed' ? 'chip-active' : ''}`}
                onClick={() => setFilter('completed')}
                aria-pressed={filter === 'completed'}
                aria-label="Show completed tasks"
              >
                Completed
              </button>
            </div>
            <div className="counts">
              <span className="muted">{activeCount} active</span>
              <span className="dot" aria-hidden="true">•</span>
              <span className="muted">{completedCount} completed</span>
              {completedCount > 0 && (
                <button
                  className="btn btn-ghost danger"
                  onClick={clearCompleted}
                  aria-label="Clear completed tasks"
                  title="Clear completed"
                >
                  Clear completed
                </button>
              )}
            </div>
          </div>

          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onUpdate={updateTodo}
          />
        </section>
      </main>
      <footer className="footer muted">
        <span>Tasks are saved in your browser.</span>
      </footer>
    </div>
  );
}
