import React from "react";
import { useForm } from "react-hook-form";
import "../styles/FORM.css";

const PanierForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panierForm">
      <h2>Panier</h2>

      {/* Genre */}
      <label>Genre:</label>
      <div>
        <input type="radio" value="Homme" {...register("genre", { required: true })} /> Homme
        <input type="radio" value="Femme" {...register("genre", { required: true })} /> Femme
      </div>
     

      {/* Nom */}
      <label>Nom:</label>
      <input type="text" {...register("nom", { required: true })} />
     

      {/* Prénom */}
      <label>Prénom:</label>
      <input type="text" {...register("prenom", { required: true })} />
      

      {/* Email */}
      <label>Email:</label>
      <input type="email" {...register("email", { required: true })} />
      
      
      <label>Numéro de téléphone:</label>
      <input type="tel" {...register("telephone", { required: true })} />
      
     
      <label>Adresse:</label>
      <input type="text" {...register("adresse", { required: true })} />
      

    
      <button type="submit">Valider</button>
    </form>
  );
};

export default PanierForm;