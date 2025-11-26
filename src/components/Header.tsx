import React from 'react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'list' | 'form') => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand fs-4" href="#" onClick={() => onNavigate('home')}>
          <i className="bi bi-collection-fill me-2"></i>Catálogo Pessoal
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('list')}>
                <i className="bi bi-card-list me-1"></i>
                Ver Catálogo
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={() => onNavigate('form')}>
                <i className="bi bi-plus-square me-1"></i>
                Novo Registro
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export default Header;