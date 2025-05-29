import "../styles/filter.css";
import { useState, useEffect } from "react";

export default function Filter({ products, onCategoryChange, onPriceChange }) {
  const [price, setPrice] = useState(5000);
  const [isSticky, setIsSticky] = useState(false);
  const categoryList = [...new Set(products.map((product) => product.category))]
    .sort()
    .slice(0, 6);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCategoryChange = (category) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updatedCategories);
    onCategoryChange(updatedCategories);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value, 10);
    setPrice(newPrice);
    onPriceChange(newPrice);
  };

  const formatPrice = (price) => {
    return `${price.toLocaleString()} DH`;
  };

  return (
    <aside className={`filter-sidebar ${isSticky ? 'sticky' : ''}`}>
      <div className="filter-content">
        <div className="filter-section">
          <h3 className="filter-title">Prix</h3>
          <hr className="filter-divider" />
          <div className="price-range">
            <input
              type="range"
              className="price-slider"
              onChange={handlePriceChange}
              value={price}
              min={0}
              max={5000}
              step={50}
            />
            <p className="price-value">{formatPrice(price)}</p>
          </div>
        </div>

        {categoryList.length > 0 && (
          <div className="filter-section">
            <h3 className="filter-title">Filtres</h3>
            <hr className="filter-divider" />
            <div className="category-list">
              {categoryList.map((category, index) => (
                <label key={index} className="category-item">
                  <span className="category-name">
                    {category.length > 15 ? `${category.slice(0, 15)}...` : category}
                  </span>
                  <div className="category-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span className="checkmark"></span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

