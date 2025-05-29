import React, { useState } from "react";
import '../styles/ProductDetails.css';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function ProductDetails({ product }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    if (isLoading) return;
    setError('');

    try {
      setIsLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('Vous devez être connecté pour ajouter des produits au panier');
        navigate('/login', { state: { from: window.location.pathname } });
        return;
      }

      if (!product._id || !product.name || !product.price) {
        setError('Données du produit invalides');
        return;
      }

      await addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.imageUrl || product.image,
        quantity: quantity
      });

      // Show success message
      setError('');
      alert('Produit ajouté au panier avec succès !');
    } catch (error) {
      console.error('Erreur:', error);
      if (error.message.includes('Session expirée')) {
        navigate('/login', { state: { from: window.location.pathname } });
      }
      setError(error.message || 'Une erreur est survenue lors de l\'ajout au panier');
    } finally {
      setIsLoading(false);
    }
  };

  if (!product) {
    return <div className="error">Produit non disponible</div>;
  }

  return (
    <div className="product-container">
      <section className="product-details">
        {/* Section Image */}
        <div className="product-details__image">
          <img 
            src={product.imageUrl || product.image} 
            alt={product.name} 
            className="main-product-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/400x400?text=Image+non+disponible';
            }}
          />
        </div>

        {/* Section Informations Produit */}
        <div className="product-details__info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          
          <div className="product-meta">
            <p className="product-category">Catégorie: {product.category}</p>
            <p className="product-stock">En stock: {product.stock}</p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="quantity-section">
            <label className="quantity-label">Quantité :</label>
            <input 
              type="number" 
              value={quantity}
              onChange={handleQuantityChange}
              min={1} 
              max={product.stock} 
              className="quantity-input" 
            />
          </div>

          <h2 className="product-price">Prix : <span>{product.price} MAD</span></h2>
          
          <button 
            className={`add-to-cart ${isLoading ? 'loading' : ''}`}
            onClick={handleAddToCart}
            disabled={!product.stock || isLoading}
          >
            {isLoading ? 'Ajout en cours...' : 
             !product.stock ? 'Produit indisponible' : 
             'Ajouter au panier'}
          </button>
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
