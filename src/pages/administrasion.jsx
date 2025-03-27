import React from 'react'
import "../styles/admin.css";
import UsersTable from '../composent/usersTable';
import ProductsTable from '../composent/productTable';

import { useState } from 'react';

export default function Administrasion() {
  const [page,setPage]=useState('');

  return (
    <>
      <div className='administrasion'>
          <h1>Administrasion</h1>
          <div>
              <div>
                  <a onClick={()=>setPage("productPage")}>Gestion des Produits</a>
              </div>
              <div>
                  <a onClick={()=>setPage("usersPage")} >Gestion des Utilisateurs</a>
              </div>
          </div>
      </div>
      {(page === 'usersPage') ? <UsersTable /> : null}
      {(page === 'productPage') ? <ProductsTable /> : null}

    </>
  )
}
