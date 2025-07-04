import Image from 'next/image';
import logo from '../assets/logo.png';
export default function Header({
  searchTerm,
  setSearchTerm,
  cartItemCount,
  toggleCart,
  openModal,
  isDarkMode,
  toggleDarkMode
}) {
  const handleSearch = () => {
    // Search is handled by the parent component through searchTerm state
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="header">
      <div className="nav-container">
        <div className="logo nav-menu"><a href="#home"><Image src={logo} alt="logo" width={180} height={80}></Image></a></div>
        <nav className="nav-menu">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSearch}>🔍</button>
          </div>

          {/* ADD THIS DARK MODE TOGGLE BUTTON */}
          <button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <button className="btn-secondary" onClick={() => openModal('loginModal')}>
            Login
          </button>
          <button className="cart-btn" onClick={toggleCart}>
            🛒
            <span className="cart-count">{cartItemCount}</span>
          </button>
        </div>
      </div>
    </header>
  );
}