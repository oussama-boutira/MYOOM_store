import React, { useState, useEffect } from 'react';
import "../styles/admin.css";
import UsersTable from '../composent/usersTable';
import ProductsTable from '../composent/productTable';
import OrdersTable from '../composent/ordersTable';

export default function Administrasion() {
  const [page, setPage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role !== 'admin') {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className='administration'>
      <h1>Administration</h1>
      <div className="admin-nav">
        <button 
          className={page === 'productPage' ? 'active' : ''} 
          onClick={() => setPage("productPage")}
        >
          Gestion des Produits
        </button>
        <button 
          className={page === 'usersPage' ? 'active' : ''} 
          onClick={() => setPage("usersPage")}
        >
          Gestion des Utilisateurs
        </button>
        <button 
          className={page === 'ordersPage' ? 'active' : ''} 
          onClick={() => setPage("ordersPage")}
        >
          Gestion des Commandes
        </button>
      </div>

      <div className="admin-content">
        {page === 'usersPage' && <UsersTable />}
        {page === 'productPage' && <ProductsTable />}
        {page === 'ordersPage' && <OrdersTable />}
      </div>
    </div>
  );
}
