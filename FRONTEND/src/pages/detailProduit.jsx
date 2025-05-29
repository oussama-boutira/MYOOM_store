import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/detailProduit.css';

const DetailProduit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const BACKEND_URL = "http://localhost:5001";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Produit non trouvé');
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Vous devez être connecté pour ajouter des produits au panier');
      navigate('/login');
      return;
    }

    try {
      await addToCart(product);
      alert('Produit ajouté au panier avec succès');
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.message);
    }
  };

  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Produit non trouvé</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-image">
        <img 
          src={product.image.startsWith('http') ? product.image : `${BACKEND_URL}${product.image}`} 
          alt={product.name} 
        />
      </div>
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">{product.price} MAD</p>
        <p className="description">{product.description}</p>
        <div className="quantity-selector">
          <button 
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
            disabled={quantity <= 1}
          >
            -
          </button>
          <span>{quantity}</span>
          <button 
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>
        </div>
        <button 
          className="add-to-cart-button"
          onClick={handleAddToCart}
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default DetailProduit; 