export default function Hero() {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Welcome to ShopZone</h1>
        <p>Discover amazing products at unbeatable prices. Your one-stop shop for everything you need!</p>
        <button className="btn btn-primary" onClick={() => scrollToSection('products')}>
          Shop Now
        </button>
      </div>
    </section>
  );
}