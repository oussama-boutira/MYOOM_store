import React, { useState, useEffect } from "react";
import ProduitsShow from "../composent/produitShow";
import Carousel from "../composent/Carousel";
import axios from "axios";
import "../styles/Accueil.css";

const Accueil = () => {
  const [specialOffers, setSpecialOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSpecialOffers = async () => {
      try {
        const response = await axios.get('http://localhost:5001/product');
        const allProducts = response.data;
        
        // Filtrer les produits de la catégorie "Setup complet" et les trier par prix
        const setupProducts = allProducts
          .filter(product => product.category === "Setup complet")
          .sort((a, b) => a.price - b.price)
          .slice(0, 10); // Prendre les 10 premiers (les moins chers)

        setSpecialOffers(setupProducts);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching special offers:', err);
        setError('Erreur lors du chargement des offres spéciales');
        setLoading(false);
      }
    };

    fetchSpecialOffers();
  }, []);

  if (loading) {
    return <div>Chargement des offres spéciales...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <ProduitsShow />
      <Carousel products={specialOffers} text={"Offres Spéciales - Setup Complet"} />
    </>
  );
};

export default Accueil;