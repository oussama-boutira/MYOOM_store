import React from 'react';
import '../styles/profil.css';
import { FaEdit } from "react-icons/fa"; // Modify icon
import { FiLogOut } from "react-icons/fi"; // Déconnexion icon
import { useState } from "react"
import { Link } from 'react-router-dom';


const Profil = () => {
  const image ="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  
  const [username, setUsername] = useState("Username");
  const [email, setEmail] = useState("email@gmail.com");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="profil-container">
        <section className="profil-header">
          <div className="mainProfil">
            <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} className="profil-pic" alt="Profil" />
            <div className="info">
              <h2>Username</h2>
              <p>email@gmail.com</p>
              <a className="edit-info" onClick={()=>setIsModalOpen(true)}>
              <FaEdit className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer" />
              Modifier les informations
              </a>
            </div>
            <button className="logout-btn">
            <FiLogOut className="text-red-500 hover:text-red-700 text-2xl cursor-pointer" /> 
            <Link className="logout-btn" to={"/login"}>Déconnexion</Link>
            </button>
          </div>
        </section>

        <section className="historique">
          <h2>Historique d'achats :</h2>
          <div className="historique-list">
            <div className="historique-item">
              <img src={image}  className="produit" alt="Produit" />
              <div className="details">
                <h3>Nom du Produit</h3>
                <p>Description du produit avec quelques détails supplémentaires.</p>
                <span className="price">Prix : 50€</span>
              </div>
            </div>

            <div className="historique-item">
              <img src={image} className="produit" alt="Produit" />
              <div className="details">
                <h3>Autre Produit</h3>
                <p>Une autre description avec des caractéristiques spécifiques.</p>
                <span className="price">Prix : 30€</span>
              </div>
            </div>
          </div>
        </section>
      </div>



      {isModalOpen && (
          <div className="modal-overlay" >
          <div className="modal-content">
            <h2>Modifier les informations</h2>
            <label>Nom d'utilisateur</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />

            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>mod de passe</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Nouveau mot de passe</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="modal-actions">
              <button className="cancel-btn" onClick={()=>setIsModalOpen(false)}>Annuler</button>
              <button className="save-btn" onClick={() => { alert("Informations mises à jour"); setIsModalOpen(false); }}>Sauvegarder</button>
            </div>
          </div>
        </div>
      )}
    </>


  );
};

export default Profil;
