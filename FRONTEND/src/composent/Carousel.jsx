import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Carousel.css';

function Carousel(props) {
    const [index, setIndex] = useState(0);
    const navigate = useNavigate();
    const BACKEND_URL = "http://localhost:5001";
    const DEFAULT_IMAGE = "/uploads/image-1747667972465-319429541.png";

    // Debug log pour les produits
    useEffect(() => {
        console.log('Products in Carousel:', props.products);
    }, [props.products]);

    // Fonction pour passer au produit suivant
    const nextSlide = () => {
        if (index < props.products.length - 3) {
            setIndex(index + 1);
        }
    };

    // Fonction pour revenir au produit précédent
    const prevSlide = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    // Fonction pour naviguer vers la page de détails du produit
    const handleViewDetails = (productId) => {
        navigate(`/produits/details/${productId}`);
    };

    // Fonction pour traiter l'URL de l'image
    const processImageUrl = (imagePath) => {
        console.log('Processing image path:', imagePath); // Debug log
        
        if (!imagePath) {
            console.log('No image path provided, using default image');
            return DEFAULT_IMAGE;
        }
        
        // Si c'est déjà une URL complète
        if (imagePath.startsWith('http')) {
            console.log('Using full URL:', imagePath);
            return imagePath;
        }
        
        // Si c'est un chemin relatif commençant par /uploads
        if (imagePath.startsWith('/uploads/')) {
            const fullUrl = `${BACKEND_URL}${imagePath}`;
            console.log('Using relative path with backend URL:', fullUrl);
            return fullUrl;
        }
        
        // Si c'est juste le nom du fichier
        const fullUrl = `${BACKEND_URL}/uploads/${imagePath}`;
        console.log('Using filename with backend URL:', fullUrl);
        return fullUrl;
    };

    // Fonction pour gérer les erreurs de chargement d'image
    const handleImageError = (e) => {
        console.error('Image loading error:', e.target.src);
        e.target.onerror = null;
        e.target.src = DEFAULT_IMAGE;
    };

    // Fonction pour formater le prix
    const formatPrice = (price) => {
        try {
            // Si le prix est une chaîne de caractères
            if (typeof price === 'string') {
                // Supprimer le symbole € et convertir en nombre
                const numericPrice = parseFloat(price.replace('€', ''));
                return numericPrice.toFixed(2) + " MAD";
            }
            // Si le prix est un nombre
            else if (typeof price === 'number') {
                return price.toFixed(2) + " MAD";
            }
            // Si le prix est undefined ou null
            else {
                return "0.00 MAD";
            }
        } catch (error) {
            console.error('Error formatting price:', error);
            return "0.00 MAD";
        }
    };

    // Vérifier si les produits sont valides
    if (!props.products || !Array.isArray(props.products)) {
        console.log('No valid products provided to Carousel');
        return null;
    }

    return (
        <div>
            <section className="related-products">
                <h2>{props.text}</h2>
                {/* Carrousel */}
                <div className="carousel">
                    <button 
                        className="prev" 
                        onClick={prevSlide} 
                        aria-label="Produit précédent"
                        disabled={index === 0}
                    >
                        ❮
                    </button>
                    <div className="carousel-container">
                        {props.products.slice(index, index + 3).map((product, idx) => {
                            console.log('Rendering product:', product); // Debug log
                            return (
                                <div 
                                    key={`${product._id || product.id || idx}-${index}`} 
                                    className="product-slide"
                                >
                                    <img 
                                        src={processImageUrl(product.imageUrl || product.img)}
                                        alt={product.name} 
                                        className="carousel-img"
                                        onError={handleImageError}
                                    />
                                    <h3 className="carousel-title">{product.name}</h3>
                                    <p className="carousel-price">{formatPrice(product.price)}</p>
                                    <button 
                                        className="view-details"
                                        onClick={() => handleViewDetails(product._id || product.id)}
                                    >
                                        Voir les détails
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <button 
                        className="next" 
                        onClick={nextSlide} 
                        aria-label="Produit suivant"
                        disabled={index >= props.products.length - 3}
                    >
                        ❯
                    </button>
                </div>
            </section>
        </div>
    );
}

export default Carousel;
