import React, { useState } from "react";
import "../styles/SignupForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "user"
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Réinitialiser l'erreur à chaque tentative

    try {
      const response = await axios.post("http://localhost:5001/user/register", formData);
      console.log("Signup response:", response.data); // Debug log
      
      if (response.data) {
        // Vérifier si l'inscription a réussi
        if (response.data.statuscode === 201 || response.data.statuscode === 200) {
          navigate("/login");
        } else {
          setError(response.data.message || "Erreur lors de l'inscription");
        }
      }
    } catch (error) {
      console.error("Signup error details:", error.response?.data); // Debug log
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Une erreur est survenue lors de l'inscription"
      );
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}

        <label>Prénom</label>
        <input 
          type="text" 
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          placeholder="Entrez votre prénom" 
          required 
        />

        <label>Nom</label>
        <input 
          type="text" 
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          placeholder="Entrez votre nom" 
          required 
        />

        <label>Email</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Entrez votre email" 
          required 
        />

        <label>Mot de passe</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Entrez votre mot de passe" 
          required 
        />

        <button type="submit">S'inscrire</button>

        <p className="login-text">
          Tu as un compte ? <Link to={"/login"} className="LinkLS">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
