import React from "react";
import Card from "./card";
import "../styles/produits.css";
import { Link } from "react-router-dom";




export default function ProduitsList(props){
  return (
    <div className="produitsList">
      {props.products.map((product,id) => (
        <Link to={"/produits/details/"+product._id} key={id}>
          <Card
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.imageUrl}
          />
        </Link>
      ))}
  

      
    </div>
  );
};

