import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";

import "../styles/header.css";

const Header = ({ user }) => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <header>
      <nav>
        <div className="logo">
          <Link to="/">MYOOM</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Accueil</Link>
          <Link to="/produits">Produits</Link>
          <Link to="/about">À propos</Link>
          {user?.role === 'admin' && (
            <Link to="/administrasion">Administration</Link>
          )}
        </div>
        <div className="nav-icons">
          <Link to="/panier" className="cart-icon">
            <ShoppingCart size={24} />
          </Link>
          {user ? (
            <div className="user-menu">
              <User size={24} />
              <div className="dropdown-menu">
                <Link to="/profile">Mon Profil</Link>
                <button onClick={handleLogout}>Déconnexion</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="login-btn">Connexion</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
