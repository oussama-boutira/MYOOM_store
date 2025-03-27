import { useState } from "react";
import ProduitsList from "../composent/produitsList";
import Filter from "../composent/filter";
import Search from "../composent/serche";

export default function Produits(props) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxPrice, setMaxPrice] = useState(150000);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (inp) => {
    setSearchQuery(inp);
  }


  // Handle category selection
  const handleCategoryChange = (categories) => {
    setSelectedCategories(categories);
  };

  // Handle price selection
  const handlePriceChange = (price) => {
    setMaxPrice(price);
  };

  // Filter products based on category and price
  const filteredProducts = props.products.filter((product) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price <= maxPrice;
    const matchesSearch =
      searchQuery.trim() === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase());
  
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <>
      <Search sendData={handleSearchChange}/>
      <section style={{ display: "flex", alignItems: "top", justifyContent: "space-between" }}>
        <Filter
          products={props.products}
          onCategoryChange={handleCategoryChange}
          onPriceChange={handlePriceChange}
        />
        <ProduitsList products={filteredProducts} />
      </section>
    </>
  );
}
