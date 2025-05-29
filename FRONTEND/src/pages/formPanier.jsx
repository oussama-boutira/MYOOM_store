import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../styles/FORM.css";
import { useCart } from '../context/CartContext';

const PanierForm = () => {
  const navigate = useNavigate();
  const [checkoutData, setCheckoutData] = useState(null);
  const { clearCart } = useCart();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { state: { from: '/commander' } });
      return;
    }

    const data = localStorage.getItem('checkoutItems');
    if (!data) {
      navigate('/panier');
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      if (!parsedData.items || parsedData.items.length === 0) {
        navigate('/panier');
        return;
      }
      setCheckoutData(parsedData);
    } catch (error) {
      console.error('Error parsing checkout data:', error);
      navigate('/panier');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      if (!checkoutData) {
        throw new Error('Données du panier non trouvées');
      }

      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login', { state: { from: '/commander' } });
        return;
      }

      // Format token properly
      const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;

      // Prepare order data
      const orderData = {
        phone: data.telephone,
        address: data.adresse,
        items: checkoutData.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: checkoutData.total
      };

      // Send order to backend
      const response = await fetch('http://localhost:5001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authToken
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login', { state: { from: '/commander' } });
          throw new Error('Session expirée, veuillez vous reconnecter');
        }
        throw new Error(errorData.message || 'Erreur lors de la création de la commande');
      }

      const responseData = await response.json();

      // Clear cart after successful order
      try {
        await clearCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
        // Continue with order confirmation even if cart clearing fails
      }

      // Save order details for confirmation page
      localStorage.setItem('lastOrder', JSON.stringify(responseData));
      
      // Clear checkout data
      localStorage.removeItem('checkoutItems');
      
      // Redirect to success page
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert(`Erreur: ${error.message}`);
    }
  };

  if (!checkoutData) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panierForm">
      <h2>Finaliser la commande</h2>

      <div className="order-summary">
        <p>Total de la commande: {checkoutData.total.toFixed(2)} MAD</p>
        <p>Frais de livraison: {checkoutData.shippingCost.toFixed(2)} MAD</p>
      </div>

      <label>Numéro de téléphone:</label>
      <input 
        type="tel" 
        {...register("telephone", { 
          required: "Le numéro de téléphone est requis",
          pattern: {
            value: /^[0-9]{10}$/,
            message: "Veuillez entrer un numéro de téléphone valide"
          }
        })} 
      />
      {errors.telephone && <span className="error">{errors.telephone.message}</span>}

      <label>Adresse de livraison:</label>
      <textarea 
        {...register("adresse", { 
          required: "L'adresse est requise",
          minLength: {
            value: 10,
            message: "L'adresse doit contenir au moins 10 caractères"
          }
        })} 
      />
      {errors.adresse && <span className="error">{errors.adresse.message}</span>}

      <button type="submit">Valider la commande</button>
    </form>
  );
};

export default PanierForm;