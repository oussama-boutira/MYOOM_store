import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../composent/productDetails";
import Carousel from "../composent/Carousel";
import axios from "axios";

function DetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [similarProducts, setSimilarProducts] = useState([]);

  useEffect(() => {
    const fetchProductAndSimilar = async () => {
      try {
        // Récupérer le produit principal
        const response = await axios.get(`http://localhost:5001/product/${id}`);
        setProduct(response.data);
        
        // Récupérer les produits de la même catégorie
        const similarResponse = await axios.get(`http://localhost:5001/product`);
        const products = similarResponse.data;
        
        // Filtrer les produits de la même catégorie, excluant le produit actuel
        const similar = products.filter(p => 
          p.category === response.data.category && p._id !== id
        );
        
        // Formater les produits pour le carousel
        const formattedProducts = similar.map(p => ({
          id: p._id,
          name: p.name,
          price: `${p.price}€`,
          img: p.imageUrl,
          category: p.category
        }));
        
        setSimilarProducts(formattedProducts);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits:", error);
        setError("Erreur lors du chargement des produits");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProductAndSimilar();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Chargement du produit...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!product) {
    return <div className="error">Produit non trouvé</div>;
  }

  return (
    <div>
      <ProductDetails product={product} />
      {similarProducts.length > 0 && (
        <Carousel 
          products={similarProducts} 
          text={`Produits similaires - ${product.category}`} 
        />
      )}
    </div>
  );
}

export default DetailsPage;
