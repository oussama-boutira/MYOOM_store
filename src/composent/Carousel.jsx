import React, { useState } from "react";
import '../styles/Carousel.css';

function Carousel(props) {
    const [index, setIndex] = useState(0);

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

    return (
        <div>
            <section className="related-products">
                <h2>{props.text}</h2>
                {/* Carrousel */}
                <div className="carousel">
                    <button className="prev" onClick={prevSlide} aria-label="Produit précédent">❮</button>
                    <div className="carousel-container">
                        {props.products.slice(index, index + 3).map((product) => (
                            <div key={product.id} className="product-slide">
                                <img src={product.img} alt={product.name} className="carousel-img" />
                                <h3 className="carousel-title">{product.name}</h3>
                                <p className="carousel-price">{product.price}</p>
                                <button className="view-details">Voir les détails</button>
                            </div>
                        ))}
                    </div>
                    <button className="next" onClick={nextSlide} aria-label="Produit suivant">❯</button>
                </div>
            </section>
        </div>
    );
}

export default Carousel;
