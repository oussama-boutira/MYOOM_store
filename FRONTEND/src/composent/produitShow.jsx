import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "../styles/produitShow.css";

const ImageSlider = () => {
  const images = [
    "banner1.jpg",
    "banner2.jpg",
    "banner3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.87, 0, 0.13, 1)",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          dots: true,
          arrows: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index} className="slide-item">
            <img 
              src={img} 
              alt={`Slide ${index + 1}`} 
              className="slide-image"
            />
            <div className="slide-overlay">
              <h2 className="slide-title">Découvrez nos produits gaming</h2>
              <p className="slide-description">Les meilleurs équipements pour votre setup</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;


