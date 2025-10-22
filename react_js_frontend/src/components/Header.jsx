import React from 'react';

// PUBLIC_INTERFACE
export default function Header() {
  /** Header component displaying the app title and subtitle. */
  return (
    <header className="header">
      <div className="container">
        <h1 className="brand">Ocean Tasks</h1>
        <p className="subtitle">Minimal, modern todo list</p>
      </div>
    </header>
  );
}
