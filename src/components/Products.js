import { useState } from 'react';

export default function Products({ 
  products, 
  addToCart, 
  currentFilter, 
  setCurrentFilter 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const filters = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'books', name: 'Books' }
  ];

  const handleFilterClick = (filterId) => {
    setIsLoading(true);
    setCurrentFilter(filterId);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const ProductCard = ({ product }) => (
    <div className="product-card fade-in-up">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="product-price">${product.price.toFixed(2)}</div>
        <div className="product-rating">
          <span className="stars">
            {'★'.repeat(Math.floor(product.rating))}
            {'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span>({product.reviews} reviews)</span>
        </div>
        <button 
          className="add-to-cart" 
          onClick={() => addToCart(product.id)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );

  return (
    <section className="products" id="products">
      <div className="container">
        <h2 className="section-title">Featured Products</h2>
        <div className="filters">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`filter-btn ${currentFilter === filter.id ? 'active' : ''}`}
              onClick={() => handleFilterClick(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}