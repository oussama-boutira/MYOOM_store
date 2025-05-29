import React from "react";
import { useForm } from "react-hook-form";
import "../styles/FormAjouter.css";

const categories = [
  "Clavier", "Casque", "Micro", "Setup complet", "PC", "Moniteur",
  "Chaise", "RAM", "SSD", "Carte graphique", "Carte mère",
  "Power supply", "Processeur"
];

const AjouterProduitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]); // Fichier image
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("category", data.category);

    try {
      const response = await fetch("http://localhost:5001/product", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        console.log("✅ Produit ajouté avec succès:", result);
      } else {
        console.error("❌ Erreur serveur:", result.error);
      }
    } catch (error) {
      console.error("❌ Erreur réseau:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ajouterForm">
      <h2>Ajouter produit</h2>

      {/* Image */}
      <label>Image:</label>
      <input type="file" {...register("image", { required: true })}  />
      {errors.image && <p>L'image est requise</p>}

      {/* Nom du produit */}
      <label>Nom du produit:</label>
      <input type="text" {...register("name", { required: true })} />
      {errors.name && <p>Nom requis</p>}

      {/* Prix */}
      <label>Prix:</label>
      <input type="number" step="0.01" {...register("price", { required: true })} />
      {errors.price && <p>Prix requis</p>}

      {/* Description */}
      <label>Description:</label>
      <textarea {...register("description", { required: true })} />
      {errors.description && <p>Description requise</p>}

      {/* Quantité */}
      <label>Quantité:</label>
      <input type="number" {...register("stock", { required: true })} />
      {errors.stock && <p>Quantité requise</p>}

      {/* Catégorie */}
      <label>Catégorie:</label>
      <select {...register("category", { required: true })}>
        <option value="">Sélectionner une catégorie</option>
        {categories.map((cat, index) => (
          <option key={index} value={cat}>{cat}</option>
        ))}
      </select>
      {errors.category && <p>Catégorie requise</p>}

      {/* Bouton */}
      <button type="submit">Ajouter produit</button>
    </form>
  );
};

export default AjouterProduitForm;
