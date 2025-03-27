import React from "react";
import { useForm } from "react-hook-form";
import "../styles/FormAjouter.css";

const categories = [
  "Clavier",
  "Casque",
  "Micro",
  "Setup complet",
  "PC",
  "Moniteur",
  "Chaise",
  "RAM",
  "SSD",
  "Carte graphique",
  "Carte mère",
  "Power supply",
  "Processeur"
];

const AjouterProduitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    console.log("Produit ajouté:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ajouterForm">
       <h2>Ajouter produit</h2>

      {/* Image */}
      <label>Image:</label>
      <input type="text" {...register("image", { required: true })} />
      {errors.image && <p>L'image est requise</p>}

      {/* Nom du produit */}
      <label>Nom du produit:</label>
      <input type="text" {...register("nom", { required: true })} />
      {errors.nom && <p>Nom requis</p>}

      {/* Prix */}
      <label>Prix:</label>
      <input type="number" step="0.01" {...register("prix", { required: true })} />
      {errors.prix && <p>Prix requis</p>}

      {/* Description */}
      <label>Description:</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <p>Description requise</p>}

      {/* Quantité */}
      <label>Quantité:</label>
      <input type="number" {...register("quantite", { required: true })} />
      {errors.quantite && <p>Quantité requise</p>}

      {/* Catégorie (Select) */}
      <label>Catégorie:</label>
      <select {...register("categorie", { required: true })}>
        <option value="">Sélectionner une catégorie</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      {errors.categorie && <p>Catégorie requise</p>}

      {/* Bouton Ajouter Produit */}
      <button type="submit">Ajouter produit</button>
    </form>
  );
};

export default AjouterProduitForm;