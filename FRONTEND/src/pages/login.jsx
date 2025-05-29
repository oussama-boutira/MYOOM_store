import React, { useState } from "react";
import "../styles/LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await axios.post("http://localhost:5001/user/login", formData);
      console.log("Login response:", response.data); // Debug log

      if (response.data && response.data.token) {
        // Store the token with 'Bearer ' prefix
        const token = `Bearer ${response.data.token}`;
        const userData = response.data.user;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));
        
        console.log("Token stored:", token); // Debug log
        console.log("User stored:", userData); // Debug log
        
        // Update the user state in App component
        setUser(userData);
        
        // Navigation vers /profile
        navigate("/profile");
      } else {
        setError("Erreur lors de la connexion: Token manquant");
      }
    } catch (error) {
      console.error("Login error details:", error.response?.data); // Debug log
      setError(
        error.response?.data?.message || 
        error.response?.data?.error || 
        "Une erreur est survenue lors de la connexion"
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <button type="submit">Login</button>

        <p className="signup-text">
          You don't have an account? <Link to={"/signup"} className="LinkLS">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;



