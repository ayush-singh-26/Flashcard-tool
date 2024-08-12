import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
// import './index.css'

function App() {
  return (
    <Router>
      <div>
        <nav className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="text-white text-2xl font-bold">Flashcard Tool</Link>
            <div className="flex space-x-4">
              <Link to="/" className="text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:text-black transition-colors duration-300">Home</Link>
              <Link to="/dashboard" className="text-white px-4 py-2 rounded-md hover:bg-gray-600 hover:text-black transition-colors duration-300">Dashboard</Link>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
