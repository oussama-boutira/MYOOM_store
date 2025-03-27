import "../styles/filter.css";

import { useState } from "react";

export default function Filter(props) {
  const [price, setPrice] = useState(15000);
  const CatigoList = [...new Set(props.products.map((product) => product.category))];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category) // Remove if selected
      : [...selectedCategories, category]; // Add if not selected
  
    setSelectedCategories(updatedCategories); 
    props.onCategoryChange(updatedCategories); // Send updated categories
  };
  
  // Handle price change
  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    setPrice(newPrice);
    props.onPriceChange(newPrice);
  };

  return (
    <aside>
      <div className="categories">
        <h3>Prix</h3>
        <hr />
        <div>
          <label>
            <input
            type="range"
            onChange={handlePriceChange}
            value={price}
            min={0}
            max={15000}
            />
            <p>{price}DH</p>
          </label>
        </div>
      </div>
      <div className="categories">
        <h3>category</h3>
        <hr />
        <div>
          {CatigoList.map((cat) => {
            return (
              <label>
                <span>{cat}</span>
                <input  type="checkbox"   
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}/>
              </label>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
