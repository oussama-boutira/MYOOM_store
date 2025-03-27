import React, { useState } from "react";
import "../styles/productsTable.css";
import AjouterProduitForm from "./AjouterForm"



// Example product data
const products = [
  { id: 1, image: "data:image/jpeg;base64,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", 
  name: "Product 1", price: 29.99, description: "Description for product 1", category: "Electronics", stock: 50 },
  { id: 2, image: "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 2", price: 49.99, description: "Description for product 2", category: "Clothing", stock: 100 },
  { id: 3, image: "https://plus.unsplash.com/premium_photo-1671439308358-3c95189519ae?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", name: "Product 3", price: 19.99, description: "Description for product 3", category: "Books", stock: 200 },
];



const ProductsTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const [affAdd,setAffAdd] =useState(false)

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    // Handle updating the product info here
    console.log("Updated product: ", currentProduct);
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({
      ...currentProduct,
      [name]: value,
    });
  };

  return (<>
    {(affAdd) ? (<AjouterProduitForm />) : (
     
      <div className="table-container">
      <button onClick={()=>setAffAdd(true)} style={{border:"none" , padding:"10px" , backgroundColor:"#FFC000" ,borderRadius:"3px" , color:"#fff"}}>ajouter produit</button>
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
            <tr key={product.id}>
              <td><img src={product.image} alt={product.name} className="product-image" /></td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.stock}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEditClick(product)}>Edit</button>
                <button className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      

      {isModalOpen && currentProduct && (
        <div className="modal">
          <div className="modal-content">
            <span className="close-btn" onClick={handleCloseModal}>&times;</span>
            <h3>Update Product Info</h3>
            <form onSubmit={handleUpdateProduct}>
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
                <label>Image URL:</label>
                <input
                  type="text"
                  name="image"
                  value={currentProduct.image}
                  onChange={handleInputChange}
                  required
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
              <button type="submit" className="update-btn">Update</button>
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
