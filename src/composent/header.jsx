import React from "react";
import Search from "./serche";

import "../styles/header.css";
import { FaShoppingCart, FaUser} from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>

          <div className="logo" >
          <Link to={"/"}><img src="logo.png" alt="logo" /></Link>

          </div>
   
          <nav className="nav">
              
          <a><Link to={"/"}>Accueil</Link></a>
          <a><Link to={"/produits"}>Produits</Link></a>
          <a><Link to={"/administrasion"}>Administration</Link></a>
         

      
            <a  href="/profile"><FaUser/></a> 
            <a href="/panier"><FaShoppingCart/></a> 
          </nav>
 
   
    </header>
  );
};

export default Header;
