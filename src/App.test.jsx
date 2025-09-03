import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function SimpleApp() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Portfolio Test</h1>
      <p>Wenn du das siehst, funktioniert React!</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<SimpleApp />);
