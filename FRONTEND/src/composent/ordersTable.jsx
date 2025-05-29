import React, { useState, useEffect } from 'react';
import '../styles/ordersTable.css';
import { useNavigate } from 'react-router-dom';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:5001/api/orders', {
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        if (response.status === 403) {
          setError('Accès refusé: Réservé aux administrateurs');
          return;
        }
        throw new Error('Erreur lors du chargement des commandes');
      }

      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        throw new Error('Erreur lors de la mise à jour du statut');
      }

      // Refresh orders list
      fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      setError(error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      return;
    }

    try {
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:5001/api/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }
        throw new Error('Erreur lors de la suppression de la commande');
      }

      // Remove the deleted order from state
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      setError(error.message);
    }
  };

  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="loading">Chargement des commandes...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="orders-table">
      <h2>Gestion des Commandes</h2>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Date</th>
            <th>Total</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.userId ? 
                  `${order.userId.firstname} ${order.userId.lastname}` : 
                  'Utilisateur inconnu'}
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</td>
              <td>{order.totalAmount.toFixed(2)} MAD</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className={`status-${order.status}`}
                >
                  <option value="pending">En attente</option>
                  <option value="processing">En traitement</option>
                  <option value="shipped">Expédiée</option>
                  <option value="delivered">Livrée</option>
                  <option value="cancelled">Annulée</option>
                </select>
              </td>
              <td className="actions-cell">
                <button 
                  onClick={() => viewOrderDetails(order)}
                  className="view-btn"
                >
                  Détails
                </button>
                <button 
                  onClick={() => deleteOrder(order._id)}
                  className="delete-btn"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Détails de la Commande</h3>
            <div className="order-details">
              <p><strong>ID:</strong> {selectedOrder._id}</p>
              <p><strong>Client:</strong> {selectedOrder.userId ? 
                `${selectedOrder.userId.firstname} ${selectedOrder.userId.lastname}` : 
                'Utilisateur inconnu'}
              </p>
              <p><strong>Email:</strong> {selectedOrder.userId?.email}</p>
              <p><strong>Téléphone:</strong> {selectedOrder.phone}</p>
              <p><strong>Adresse:</strong> {selectedOrder.address}</p>
              <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString('fr-FR')}</p>
              <p><strong>Statut:</strong> {selectedOrder.status}</p>
              
              <h4>Articles</h4>
              <table className="items-table">
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix unitaire</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId?.name || 'Produit inconnu'}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price.toFixed(2)} MAD</td>
                      <td>{(item.quantity * item.price).toFixed(2)} MAD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <p className="total-amount">
                <strong>Total:</strong> {selectedOrder.totalAmount.toFixed(2)} MAD
              </p>
            </div>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable; 