import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section brand">
          <div className="brand-info">
            <img src="/logo.png" alt="MYOOM Store Logo" className="footer-logo" />
            <h2>MYOOM Store</h2>
          </div>
          <p className="brand-description">
            Votre destination gaming et tech de confiance au Maroc
          </p>
          <div className="contact-info">
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>+212 666 998 384</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>contact@myoom.store</span>
            </div>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Navigation</h3>
          <ul>
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/produits">Produits</Link></li>
            <li><Link to="/about">À propos</Link></li>
          </ul>
        </div>

        <div className="footer-section services">
          <h3>Services</h3>
          <ul>
            <li><Link to="/support">Support Client</Link></li>
            <li><Link to="/livraison">Livraison</Link></li>
            <li><Link to="/garantie">Garantie</Link></li>
            <li><Link to="/conditions">Conditions Générales</Link></li>
          </ul>
        </div>

        <div className="footer-section stores">
          <h3>Nos Magasins</h3>
          <ul>
            <li>
              <FaMapMarkerAlt className="location-icon" />
              <span>Marrakech - Guéliz</span>
            </li>
            <li>
              <FaMapMarkerAlt className="location-icon" />
              <span>Tanger - Centre Ville</span>
            </li>
            <li>
              <FaMapMarkerAlt className="location-icon" />
              <span>Casablanca - Maarif</span>
            </li>
            <li>
              <FaMapMarkerAlt className="location-icon" />
              <span>Rabat - Agdal</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} MYOOM Store. Tous droits réservés</p>
        </div>
        <div className="social-links">
          <a href="https://facebook.com/myoom" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com/myoom" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://wa.me/212666998384" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
          <a href="https://youtube.com/myoom" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
