import React, { useState, useEffect, useReducer } from 'react';
import '../styles/profil.css';
import { FaEdit, FaUser, FaEnvelope, FaCalendarAlt } from "react-icons/fa";
import { FiLogOut, FiShoppingBag } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Reducer for managing component state
const profileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload, error: '', loading: false };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_MODAL_OPEN':
      return { ...state, isModalOpen: action.payload };
    case 'UPDATE_USER_DATA':
      return { ...state, userData: { ...state.userData, ...action.payload } };
    case 'SET_PURCHASES':
      return { ...state, purchases: action.payload };
    case 'SET_FORM_ERRORS':
      return { ...state, formErrors: action.payload };
    default:
      return state;
  }
};

const initialState = {
  userData: null,
  purchases: [],
  isModalOpen: false,
  error: "",
  loading: true,
  formErrors: {}
};

const Profil = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(profileReducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({
    from: '',
    to: ''
  });

  // Validation function
  const validateForm = (data) => {
    const errors = {};
    
    if (!data.firstname?.trim()) {
      errors.firstname = "Le prénom est requis";
    } else if (data.firstname.trim().length < 2) {
      errors.firstname = "Le prénom doit contenir au moins 2 caractères";
    }
    
    if (!data.lastname?.trim()) {
      errors.lastname = "Le nom est requis";
    } else if (data.lastname.trim().length < 2) {
      errors.lastname = "Le nom doit contenir au moins 2 caractères";
    }
    
    if (!data.email?.trim()) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = "Format d'email invalide";
    }
    
    return errors;
  };

  // Fetch user data
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
      console.log("No token found, redirecting to login");
      navigate("/login");
      return;
    }

    // Extract the actual token without the Bearer prefix
    const actualToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;

    // Validate token format
    if (!actualToken.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
      console.log("Invalid token format");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        const response = await axios.get("http://localhost:5001/user/profile", {
          headers: { 
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.data) {
          throw new Error("No data received in response");
        }
        
        dispatch({ type: 'SET_USER_DATA', payload: response.data });
        
        // Fetch purchase history
        fetchPurchaseHistory(token);
        
      } catch (error) {
        console.error("Error fetching user data:", error);
        
        if (error.response?.status === 401) {
          console.log("Unauthorized access, clearing tokens");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }
        
        dispatch({ 
          type: 'SET_ERROR', 
          payload: "Erreur lors de la récupération des données du profil" 
        });
      }
    };

    fetchUserData();
  }, [navigate]);

  // Fetch purchase history
  const fetchPurchaseHistory = async (token) => {
    try {
      const response = await axios.get("http://localhost:5001/api/orders/my-orders", {
        headers: { 
          'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
        }
      });
      dispatch({ type: 'SET_PURCHASES', payload: response.data || [] });
    } catch (error) {
      console.error("Error fetching purchase history:", error);
      dispatch({ type: 'SET_PURCHASES', payload: [] });
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Handle form input changes
  const handleInputChange = (field, value) => {
    dispatch({ 
      type: 'UPDATE_USER_DATA', 
      payload: { [field]: value } 
    });
    
    // Clear specific field error when user starts typing
    if (state.formErrors[field]) {
      const newErrors = { ...state.formErrors };
      delete newErrors[field];
      dispatch({ type: 'SET_FORM_ERRORS', payload: newErrors });
    }
  };

  // Handle profile update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(state.userData);
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_FORM_ERRORS', payload: errors });
      return;
    }

    dispatch({ type: 'SET_ERROR', payload: '' });
    dispatch({ type: 'SET_FORM_ERRORS', payload: {} });
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.put(
        "http://localhost:5001/user/profile",
        {
          firstname: state.userData.firstname.trim(),
          lastname: state.userData.lastname.trim(),
          email: state.userData.email.trim()
        },
        {
          headers: { 
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.data || !response.data.firstname) {
        throw new Error("Invalid data received after update");
      }
      
      dispatch({ type: 'SET_USER_DATA', payload: response.data });
      dispatch({ type: 'SET_MODAL_OPEN', payload: false });
      
    } catch (error) {
      console.error("Update error:", error);
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error.response?.data?.message || "Erreur lors de la mise à jour du profil" 
      });
      
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'Non disponible';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add this function to handle order expansion
  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  // Add this function to format date for input value
  const formatDateForInput = (date) => {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  };

  // Update the filter function to include date range
  const getFilteredOrders = () => {
    if (!state.purchases) return [];
    
    return state.purchases.filter(order => {
      // Status filter
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
      
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        order._id.toLowerCase().includes(searchLower) ||
        order.items.some(item => item.productId.name.toLowerCase().includes(searchLower));
      
      // Date range filter
      let matchesDateRange = true;
      const orderDate = new Date(order.createdAt);
      
      if (dateRange.from) {
        const fromDate = new Date(dateRange.from);
        fromDate.setHours(0, 0, 0, 0);
        matchesDateRange = matchesDateRange && orderDate >= fromDate;
      }
      
      if (dateRange.to) {
        const toDate = new Date(dateRange.to);
        toDate.setHours(23, 59, 59, 999);
        matchesDateRange = matchesDateRange && orderDate <= toDate;
      }
      
      return matchesStatus && matchesSearch && matchesDateRange;
    });
  };

  // Add handler for date changes
  const handleDateChange = (field, value) => {
    setDateRange(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Loading state
  if (state.loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement du profil...</p>
      </div>
    );
  }

  // Error state
  if (state.error && !state.userData) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Erreur</h2>
          <p className="error-message">{state.error}</p>
          <button onClick={() => navigate("/login")} className="return-login">
            Retourner à la page de connexion
          </button>
        </div>
      </div>
    );
  }

  // No user data state
  if (!state.userData) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>Profil non trouvé</h2>
          <p className="error-message">Impossible de charger les données du profil</p>
          <button onClick={() => navigate("/login")} className="return-login">
            Retourner à la page de connexion
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="profil-container">
        {/* Profile Header Section */}
        <section className="profil-header">
          <div className="mainProfil">
            <div className="profile-image-container">
              <img 
                src={state.userData.profileImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} 
                className="profil-pic" 
                alt="Photo de profil" 
              />
              <div className="online-indicator"></div>
            </div>
            
            <div className="info">
              <h1 className="user-name">
                {state.userData.firstname} {state.userData.lastname}
              </h1>
              
              <div className="user-details">
                <div className="detail-item">
                  <FaEnvelope className="detail-icon" />
                  <span>{state.userData.email}</span>
                </div>
                
                <div className="detail-item">
                  <FaUser className="detail-icon" />
                  <span className="user-role">
                    {state.userData.role || 'Utilisateur'}
                  </span>
                </div>
                
                {state.userData.createdAt && (
                  <div className="detail-item">
                    <FaCalendarAlt className="detail-icon" />
                    <span>Membre depuis {formatDate(state.userData.createdAt)}</span>
                  </div>
                )}
              </div>

              <button 
                className="edit-info-btn" 
                onClick={() => dispatch({ type: 'SET_MODAL_OPEN', payload: true })}
              >
                <FaEdit className="btn-icon" />
                Modifier les informations
              </button>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
              <FiLogOut className="logout-icon" />
              <span>Déconnexion</span>
            </button>
          </div>
        </section>

        {/* Purchase History Section */}
        <section className="historique">
          <div className="section-header">
            <h2>
              <FiShoppingBag className="section-icon" />
              Historique d'achats
            </h2>
          </div>

          <div className="filter-bar">
            <div className="search-box">
              <input
                type="text"
                placeholder="Rechercher par ID ou article..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="date-filter">
              <div className="date-inputs">
                <div className="date-field">
                  <label htmlFor="date-from">Du:</label>
                  <input
                    type="date"
                    id="date-from"
                    value={dateRange.from}
                    onChange={(e) => handleDateChange('from', e.target.value)}
                    className="date-input"
                  />
                </div>
                <div className="date-field">
                  <label htmlFor="date-to">Au:</label>
                  <input
                    type="date"
                    id="date-to"
                    value={dateRange.to}
                    onChange={(e) => handleDateChange('to', e.target.value)}
                    className="date-input"
                  />
                </div>
              </div>
            </div>

            <div className="status-filter">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="status-select"
              >
                <option value="all">Tous les statuts</option>
                <option value="pending">En attente</option>
                <option value="processing">En cours</option>
                <option value="shipped">Expédié</option>
                <option value="delivered">Livré</option>
                <option value="cancelled">Annulé</option>
              </select>
            </div>
          </div>
          
          <div className="historique-content">
            {state.purchases && state.purchases.length > 0 ? (
              <div className="historique-list">
                {getFilteredOrders().map((purchase, index) => (
                  <div key={purchase._id || index} className="historique-item">
                    <div className="purchase-summary">
                      <div className="purchase-main-info">
                        <h3>Commande #{purchase._id.substring(0, 8)}</h3>
                        <p className="purchase-date">{formatDate(purchase.createdAt)}</p>
                        <p className="purchase-amount">Montant total: {purchase.totalAmount}€</p>
                        <p className="purchase-status">Statut: {purchase.status || 'En attente'}</p>
                      </div>
                      <button 
                        className="details-button"
                        onClick={() => toggleOrderDetails(purchase._id)}
                      >
                        {expandedOrders[purchase._id] ? 'Masquer les détails' : 'Voir les détails'}
                      </button>
                    </div>
                    
                    {expandedOrders[purchase._id] && (
                      <div className="purchase-details">
                        <div className="purchase-items">
                          <h4>Articles commandés:</h4>
                          <ul>
                            {purchase.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                {item.productId.name} - Quantité: {item.quantity}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="delivery-info">
                          <p><strong>Adresse de livraison:</strong> {purchase.address}</p>
                          <p><strong>Téléphone:</strong> {purchase.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-purchases">
                <div className="no-purchases-icon">
                  <FiShoppingBag />
                </div>
                <h3>Aucun achat pour le moment</h3>
                <p>Votre historique d'achats apparaîtra ici une fois que vous aurez effectué votre première commande.</p>
                <Link to="/products" className="shop-now-btn">
                  Découvrir nos produits
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Edit Profile Modal */}
      {state.isModalOpen && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.className === 'modal-overlay') {
            dispatch({ type: 'SET_MODAL_OPEN', payload: false });
          }
        }}>
          <div className="modal-content">
            <div className="modal-header">
              <h2>Modifier les informations</h2>
              <button 
                className="modal-close"
                onClick={() => dispatch({ type: 'SET_MODAL_OPEN', payload: false })}
              >
                ×
              </button>
            </div>
            
            {state.error && (
              <div className="error-banner">
                {state.error}
              </div>
            )}
            
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <div className="form-group">
                <label htmlFor="firstname">Prénom *</label>
                <input
                  id="firstname"
                  type="text"
                  value={state.userData.firstname || ''}
                  onChange={(e) => handleInputChange('firstname', e.target.value)}
                  className={state.formErrors.firstname ? 'error' : ''}
                  placeholder="Entrez votre prénom"
                  required
                />
                {state.formErrors.firstname && (
                  <span className="field-error">{state.formErrors.firstname}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="lastname">Nom *</label>
                <input
                  id="lastname"
                  type="text"
                  value={state.userData.lastname || ''}
                  onChange={(e) => handleInputChange('lastname', e.target.value)}
                  className={state.formErrors.lastname ? 'error' : ''}
                  placeholder="Entrez votre nom"
                  required
                />
                {state.formErrors.lastname && (
                  <span className="field-error">{state.formErrors.lastname}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email"
                  type="email"
                  value={state.userData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={state.formErrors.email ? 'error' : ''}
                  placeholder="Entrez votre email"
                  required
                />
                {state.formErrors.email && (
                  <span className="field-error">{state.formErrors.email}</span>
                )}
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="cancel-btn" 
                  onClick={() => dispatch({ type: 'SET_MODAL_OPEN', payload: false })}
                  disabled={isSubmitting}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="save-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Profil;