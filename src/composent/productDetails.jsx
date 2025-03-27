import React from "react";
import '../styles/ProductDetails.css';

function ProductDetails({ product }) {
  return (
    <div className="product-container">
      <section className="product-details">
        {/* Section Image */}
        <div className="product-details__image">
          <img src={product.image} alt={product.name} className="main-product-img" />
        </div>


        {/* Section Informations Produit */}
        <div className="product-details__info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-description">{product.description}</p>
          <label className="quantity-label">Quantité :</label>
          <input type="number" defaultValue={1} min={1} max={10} className="quantity-input" />
          <h2 className="product-price">Prix : <span>{product.price}</span></h2>        
          <button className="add-to-cart">Ajouter au panier</button>
        </div>

      </section>
    </div>
  );
}

export default ProductDetails;
