import React from "react";
import { FaFacebook, FaWhatsapp, FaInstagram, FaYoutube } from "react-icons/fa";
import "../styles/footer.css";
const Footer = () => {
  return (
    <footer>
      <div className="granddiv">
        <div className="div">
          <h1>🚚</h1>
          <h2>Livraison 24H/48h</h2>
          <p>Livraison a domicile partout au Afrique</p>
        </div>
        <div className="div">
          <h1>💰</h1>
          <h2>Paiement</h2>
          <p>Paiement a la livraison au Virement BC</p>
        </div>
        <div className="div">
          <h1>🎆</h1>
          <h2>Garantie</h2>
          <p>Garantie 1 an pieces et main d'oeuvre SAV +212666998384</p>
        </div>
        <div className="div">
          <h1>🥇</h1>
          <h2>Service Client</h2>
          <p>Disponible du lundi au samedi du 10h a 19h</p>
        </div>
      </div>{" "}
      <br></br> <br></br> <br></br> <br></br>
      <section>
        <aside>
          <img src="logo.png" width={"60px"} /> <h1>MYOOM store</h1>
        </aside>

        <aside>
          <ul>
            <li className="titre_list">A PROPOS</li> <br></br>
            <li>
              {" "}
              <a>A propos de nous</a>{" "}
            </li>{" "}
            <br></br>
            <li>
              {" "}
              <a>Contactez-nous</a>
            </li>{" "}
            <br></br>
            <li>
              <a>Termes et Conditions</a>
            </li>{" "}
            <br></br>
            <li>
              {" "}
              <a>Politique de confidientialite</a>{" "}
            </li>{" "}
            <br></br>
          </ul>
        </aside>
        <aside>
          <ul>
            <li className="titre_list"> SERVICES</li> <br></br>
            <li>
              {" "}
              <a>Support Client</a>{" "}
            </li>{" "}
            <br></br>
            <li>
              {" "}
              <a>Livraison</a>
            </li>{" "}
            <br></br>
            <li>
              <a>Garanties</a>
            </li>{" "}
            <br></br>
          </ul>
        </aside>
        <aside>
          <ul>
            <li className="titre_list">MAGASINS</li> <br></br>
            <li>marrakech </li> <br></br>
            <li>tanger </li> <br></br>
            <li>casablanca </li> <br></br>
            <li>rabat </li> <br></br>
          </ul>
        </aside>
      </section>
      <div className="liens">
        <p> &copy; 2025 MYOOM</p>
        <ul>
          <li>
            <a href="">
              <FaFacebook size={24} />
            </a>
          </li>
          <li>
            <a href="">
              <FaInstagram size={24} />
            </a>
          </li>
          <li>
            <a href="">
              {" "}
              <FaWhatsapp size={24} />
            </a>
          </li>
          <li>
            <a href="">
              <FaYoutube size={24} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;
