import React from "react";
import "../styles/panier.css" ;
import { Trash } from "lucide-react";
import {Link} from "react-router-dom"

const Panier = () => {
  return (
    <div className="container">
      <div className="cart">
        <h2 className="title">PANIER</h2>
        <div className="cart-item">
          <div className="item-info">
            <img src="produit1.jpg" alt="ATTACK SHARK R1" className="item-image" />
            <div>
              <p className="item-name">Souris Gaming Pictek PC257 , Noir(Rouge)</p>
              <p className="item-price">399,00 MAD</p>
            </div>
          </div>
          <div className="item-actions">
            <input type="number" defaultValue={1} className="quantity" />
            <button className="delete-button">
              <Trash size={18} />
            </button>
          </div>
        </div>
        <Link to={"/produits"} className="continue-shopping">&laquo; Continuer mes achats</Link>
      </div>
      
      <div className="summary">
        <div className="summary-item">
          <span>1 article</span>
          <span>399,00 MAD</span>
        </div>
        <div className="summary-item">
          <span>Livraison</span>
          <span>35,00 MAD</span>
        </div>

        <div className="total">
          <span>TOTAL TTC</span>
          <span>434,00 MAD</span>
        </div>
        <Link to={"/commander"}><button className="order-button">Commander</button></Link>
      </div>
    </div>
  );
};

export default Panier;
