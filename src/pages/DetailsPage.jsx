import React from "react";
import ProductDetails from "../composent/productDetails";
import Carousel from "../composent/Carousel";

function DetailsPage(props) {

  const detailTest = {
    name: "Nom du produit",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa tenetur facere odit officia accusantium eos atque. Et, veritatis alias nisi sequi accusantium sapiente reiciendis id repellendus quia error repellat magnam?",
    price: "3 000 MAD",
    image: "https://www.ultrapc.ma/41942-home_default/xtrmlab-delta-black.jpg"
  };
  return (
    <div>
      <ProductDetails product={detailTest} />
 
      <Carousel products={props.carouselTab} text={"Produits similaires"}/>
    </div>
  );
}

export default DetailsPage;
