import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="logo">📋</span>
        <h1>TaskBoard AI</h1>
      </Link>
      <div className="navbar-links">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          🗂️ Board
        </Link>
        <Link 
          to="/categories" 
          className={`nav-link ${location.pathname === '/categories' ? 'active' : ''}`}
        >
          🏷️ Categories
        </Link>
      </div>
    </nav>
  );
}
