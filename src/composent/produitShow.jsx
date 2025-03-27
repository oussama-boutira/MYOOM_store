import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const images = [
    "banner1.jpg",
    "banner2.jpg",
    "banner3.jpg",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div style={{ width: "80%", margin: "auto",  padding: "20px" ,marginBottom: "20px"}} >
      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Slide ${index + 1}`} style={{ width: "100%", borderRadius: "10px" }} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;


