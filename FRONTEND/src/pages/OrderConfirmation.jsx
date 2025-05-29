import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const orderDetails = JSON.parse(localStorage.getItem('lastOrder') || '{}');

  useEffect(() => {
    if (!orderDetails._id) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="order-confirmation">
      <div className="confirmation-card">
        <CheckCircle size={64} className="success-icon" />
        <h1>Commande Confirmée!</h1>
        <p className="order-id">Numéro de commande: {orderDetails._id}</p>
        <div className="order-summary">
          <h2>Résumé de la commande</h2>
          <div className="summary-details">
            <div className="detail-row">
              <span>Total:</span>
              <span>{orderDetails.totalAmount?.toFixed(2)} MAD</span>
            </div>
            <div className="detail-row">
              <span>Adresse de livraison:</span>
              <span>{orderDetails.address}</span>
            </div>
            <div className="detail-row">
              <span>Téléphone:</span>
              <span>{orderDetails.phone}</span>
            </div>
          </div>
        </div>
        <div className="confirmation-actions">
          <button onClick={() => navigate('/produits')} className="continue-shopping">
            Continuer mes achats
          </button>
          <button onClick={() => navigate('/profile')} className="view-orders">
            Voir mes commandes
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation; 