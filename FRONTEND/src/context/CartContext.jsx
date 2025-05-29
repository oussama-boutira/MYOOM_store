import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const BACKEND_URL = "http://localhost:5001";

  const checkAndGetToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Vous devez être connecté pour accéder au panier');
    }
    // Remove 'Bearer ' if it exists in the stored token
    return token.startsWith('Bearer ') ? token : `Bearer ${token}`;
  };

  useEffect(() => {
    const fetchCartOnMount = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await fetchCart();
        }
      } catch (error) {
        console.error('Erreur lors du chargement initial du panier:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartOnMount();
  }, []);

  const fetchCart = async () => {
    try {
      const token = checkAndGetToken();

      const response = await fetch(`${BACKEND_URL}/api/cart`, {
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors du chargement du panier');
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  const addToCart = async (product) => {
    try {
      const token = checkAndGetToken();

      if (!product._id || !product.name || !product.price) {
        throw new Error('Données du produit invalides');
      }

      const cartItem = {
        productId: product._id,
        quantity: product.quantity || 1,
        price: product.price,
        name: product.name,
        image: product.image || product.imageUrl
      };

      const response = await fetch(`${BACKEND_URL}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(cartItem)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors de l\'ajout au panier');
      }

      const data = await response.json();
      setCartItems(data.items || []);
      return data;
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const token = checkAndGetToken();

      const response = await fetch(`${BACKEND_URL}/api/cart/update/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors de la mise à jour de la quantité');
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const token = checkAndGetToken();

      const response = await fetch(`${BACKEND_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors de la suppression du produit');
      }

      const data = await response.json();
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      const token = checkAndGetToken();

      const response = await fetch(`${BACKEND_URL}/api/cart/clear`, {
        method: 'DELETE',
        headers: {
          'Authorization': token
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors du vidage du panier');
      }

      setCartItems([]);
    } catch (error) {
      console.error('Erreur:', error);
      throw error;
    }
  };

  const value = {
    cartItems,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext; 