import React from "react";
import ProduitsShow from "../composent/produitShow";
import Carousel from "../composent/Carousel";

import "../styles/Accueil.css";




const Accueil = (props) => {
  return (
    <>
      <ProduitsShow />
      <Carousel products={props.carouselTab} text={"Special Offers"}/>
    </>
  );
};

export default Accueil;