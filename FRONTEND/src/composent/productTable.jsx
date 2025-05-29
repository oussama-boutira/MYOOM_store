import React, { useState, useEffect } from "react";
import "../styles/productsTable.css";
import AjouterProduitForm from "./AjouterForm";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [affAdd, setAffAdd] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/product")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleEditClick = (product) => {
    setCurrentProduct({ ...product, image: null }); // reset image to null
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", currentProduct.name);
    formData.append("price", currentProduct.price);
    formData.append("description", currentProduct.description);
    formData.append("category", currentProduct.category);
    formData.append("stock", currentProduct.stock);

    if (currentProduct.image) {
      formData.append("image", currentProduct.image); // new uploaded image
    }

    try {
      const response = await fetch(`http://localhost:5001/product/${currentProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      const updatedProduct = await response.json();

      setProducts((prev) =>
        prev.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCurrentProduct((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:5001/product/${id}`, {
        method: "DELETE",
      });

      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      {affAdd ? (
        <AjouterProduitForm />
      ) : (
        <div className="table-container">
          <button
            onClick={() => setAffAdd(true)}
            style={{
              border: "none",
              padding: "10px",
              backgroundColor: "#FFC000",
              borderRadius: "3px",
              color: "#fff",
            }}
          >
            ajouter produit
          </button>
          <h2 className="table-title">Products List</h2>
          <table className="products-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="product-image"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isModalOpen && currentProduct && (
            <div className="modal">
              <div className="modal-content">
                <span className="close-btn" onClick={handleCloseModal}>
                  &times;
                </span>
                <h3>Update Product Info</h3>
                <form onSubmit={handleUpdateProduct} encType="multipart/form-data">
                  <div>
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={currentProduct.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>New Image:</label>
                    <input
                      type="file"
                      name="imageUrl"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      value={currentProduct.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={currentProduct.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Category:</label>
                    <input
                      type="text"
                      name="category"
                      value={currentProduct.category}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label>Stock:</label>
                    <input
                      type="number"
                      name="stock"
                      value={currentProduct.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <button type="submit" className="update-btn">
                    Update
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductsTable;
