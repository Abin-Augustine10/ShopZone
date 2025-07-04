export default function Categories({ setCurrentFilter, currentFilter }) {
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      description: 'Latest gadgets and devices',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=300&h=200&fit=crop'
    },
    {
      id: 'clothing',
      name: 'Clothing',
      description: 'Fashion for every occasion',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300&h=200&fit=crop'
    },
    {
      id: 'home',
      name: 'Home & Garden',
      description: 'Transform your living space',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'
    },
    {
      id: 'books',
      name: 'Books',
      description: 'Knowledge at your fingertips',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    setCurrentFilter(categoryId);
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="categories" id="categories">
      <div className="container">
        <h2 className="section-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map(category => (
            <div 
              key={category.id}
              className="category-card" 
              onClick={() => handleCategoryClick(category.id)}
            >
              <img src={category.image} alt={category.name} />
              <div className="category-card-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
