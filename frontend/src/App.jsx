import { useState, useEffect } from 'react';

export default function App() {
  const [theme, setTheme] = useState('light');

  
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content p-8">
      <h1 className="text-3xl font-bold mb-4">DaisyUI Theme Test</h1>
      
      {/* Theme selector controls */}
      <div className="flex gap-2 mb-6">
        <button className="btn btn-primary" onClick={() => setTheme('light')}>Light</button>
        <button className="btn btn-secondary" onClick={() => setTheme('dark')}>Dark</button>
        <button className="btn btn-accent" onClick={() => setTheme('cupcake')}>Cupcake</button>
      </div>

      {/* Component to test active theme styling */}
      <div className="card w-96 bg-base-200 shadow-xl p-4">
        <h2 className="card-title">Test Card</h2>
        <p>Current active theme is: {theme}</p>
      </div>
    </div>
  );
}
