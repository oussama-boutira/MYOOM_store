import React from "react";
import "../styles/SignupForm.css";
import { Link } from "react-router-dom";

const SignupForm = () => {
  return (
    <div className="signup-container">
      <form className="signup-form">
        <h2>Sign Up</h2>

        <label>Nom d'utilisateur</label>
        <input type="text" placeholder="Entrez votre nom d'utilisateur" required />

        <label>Email</label>
        <input type="email" placeholder="Entrez votre email" required />

        <label>Adresse</label>
        <input type="text" placeholder="Entrez votre adresse" required />

        <label>Numéro de téléphone</label>
        <input type="tel" placeholder="Entrez votre numéro de téléphone" required />

        <button type="submit"><Link to={"/login"}>S'inscrire</Link></button>

        <p className="login-text">
          Tu as un compte ? <Link to={"/login"} className="LinkLS">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
