import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/panier.css";
import { Trash, ShoppingBag, ArrowLeft, Package, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';

const Panier = () => {
  const navigate = useNavigate();
  const { cartItems, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const shippingCost = 35;
  const DEFAULT_IMAGE = "/placeholder.png";

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    calculateTotal(cartItems);
  }, [cartItems]);

  const processImageUrl = (imagePath) => {
    if (!imagePath) return DEFAULT_IMAGE;
    if (imagePath.startsWith('http')) return imagePath;
    if (imagePath.startsWith('/uploads/')) return `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'}${imagePath}`;
    return `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:5001'}/uploads/${imagePath}`;
  };

  const calculateTotal = (items) => {
    const subtotal = items.reduce((sum, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return sum + (price * quantity);
    }, 0);
    setTotal(subtotal + shippingCost);
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeFromCart(productId);
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Vous devez être connecté pour passer une commande');
      navigate('/login');
      return;
    }

    localStorage.setItem('checkoutItems', JSON.stringify({
      items: cartItems,
      total: total,
      shippingCost: shippingCost
    }));

    navigate('/commander');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = DEFAULT_IMAGE;
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-cart">
          <Package size={48} className="loading-icon" />
          <p>Chargement du panier...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="empty-cart">
          <Lock size={64} className="empty-cart-icon" />
          <h2>Accès au panier restreint</h2>
          <p>Vous devez être connecté pour accéder à votre panier</p>
          <button onClick={handleLogin} className="login-button">
            Se connecter
          </button>
        </div>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container">
        <div className="empty-cart">
          <ShoppingBag size={64} className="empty-cart-icon" />
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos produits et commencez vos achats</p>
          <Link to="/produits" className="continue-shopping">
            <ArrowLeft size={20} />
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="cart">
        <h2 className="title">MON PANIER</h2>
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="item-info">
                <div className="item-image-container">
                  <img 
                    src={processImageUrl(item.image)}
                    alt={item.name} 
                    className="item-image"
                    onError={handleImageError}
                  />
                </div>
                <div className="item-details">
                  <h3 className="item-name">{item.name}</h3>
                  <p className="item-price">{parseFloat(item.price).toFixed(2)} MAD</p>
                </div>
              </div>
              <div className="item-actions">
                <div className="quantity-control">
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value > 0) {
                        handleQuantityChange(item.productId, value);
                      }
                    }}
                    min="1"
                    className="quantity-input"
                  />
                  <button 
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="delete-button"
                  onClick={() => handleRemoveItem(item.productId)}
                  title="Supprimer l'article"
                >
                  <Trash size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-actions">
          <button 
            className="clear-cart-button"
            onClick={handleClearCart}
            title="Vider le panier"
          >
            Vider le panier
          </button>
          <Link to="/produits" className="continue-shopping">
            <ArrowLeft size={20} />
            Continuer mes achats
          </Link>
        </div>
      </div>
      
      <div className="summary">
        <h3>RÉSUMÉ DE LA COMMANDE</h3>
        <div className="summary-content">
          <div className="summary-item">
            <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})</span>
            <span>
              {cartItems.reduce((sum, item) => {
                const price = parseFloat(item.price) || 0;
                const quantity = parseInt(item.quantity) || 0;
                return sum + (price * quantity);
              }, 0).toFixed(2)} MAD
            </span>
          </div>
          <div className="summary-item">
            <span>Frais de livraison</span>
            <span>{shippingCost.toFixed(2)} MAD</span>
          </div>
          <div className="summary-divider"></div>
          <div className="total">
            <span>TOTAL TTC</span>
            <span>{total.toFixed(2)} MAD</span>
          </div>
          <button 
            className="order-button"
            onClick={handleCheckout}
          >
            Passer la commande
          </button>
        </div>
      </div>
    </div>
  );
};

export default Panier;
