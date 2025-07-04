import { useState } from 'react';

export default function Modal({ 
  activeModal, 
  closeModal, 
  openModal, 
  cart, 
  setCart, 
  showNotification 
}) {
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.email && formData.password) {
      showNotification('Login successful!');
      closeModal();
    } else {
      showNotification('Please fill in all fields.', 'error');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.regName && formData.regEmail && formData.regPassword) {
      showNotification('Registration successful!');
      closeModal();
    } else {
      showNotification('Please fill in all fields.', 'error');
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    showNotification('Order placed successfully! Thank you for your purchase.');
    setCart([]);
    closeModal();
  };

  const handleModalClick = (e) => {
    if (e.target.classList.contains('modal')) {
      closeModal();
    }
  };

  return (
    <>
      {/* Login Modal */}
      <div 
        className={`modal ${activeModal === 'loginModal' ? 'active' : ''}`}
        onClick={handleModalClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 style={{ textAlign: 'center', width: '100%' }}>Login</h3>
            <button className="close-modal" onClick={closeModal}>×</button>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password" 
                name="password" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              Login
            </button>
          </form>
          <p style={{ textAlign: 'center', marginTop: '0rem', marginBottom: '2rem' }}>
            Don&apos;t have an account?{' '}
            <a 
              href="#" 
              onClick={() => { closeModal(); openModal('registerModal'); }}
            >
              Register here
            </a>
          </p>
        </div>
      </div>

      {/* Register Modal */}
      <div 
        className={`modal ${activeModal === 'registerModal' ? 'active' : ''}`}
        onClick={handleModalClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 style={{ textAlign: 'center', width: '100%' }}>SignUp</h3>
            <button className="close-modal" onClick={closeModal}>×</button>
          </div>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <label htmlFor="regName">Full Name</label>
              <input 
                type="text" 
                name="regName" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="regEmail">Email</label>
              <input 
                type="email" 
                name="regEmail" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="regPassword">Password</label>
              <input 
                type="password" 
                name="regPassword" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' , marginTop: '1rem' }}>
              SignUp
            </button>
          </form>
        </div>
      </div>

      {/* Checkout Modal */}
      <div 
        className={`modal ${activeModal === 'checkoutModal' ? 'active' : ''}`}
        onClick={handleModalClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Checkout</h3>
            <button className="close-modal" onClick={closeModal}>×</button>
          </div>
          <form onSubmit={handleCheckout}>
            <div className="form-group">
              <label htmlFor="shippingAddress">Shipping Address:</label>
              <input 
                type="text" 
                name="shippingAddress" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input 
                type="text" 
                name="city" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code:</label>
              <input 
                type="text" 
                name="zipCode" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="paymentMethod">Payment Method:</label>
              <select name="paymentMethod" required onChange={handleInputChange}>
                <option value="">Select Payment Method</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="cardNumber">Card Number:</label>
              <input 
                type="text" 
                name="cardNumber" 
                placeholder="1234 5678 9012 3456" 
                required 
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Place Order
            </button>
          </form>
        </div>
      </div>
    </>
  );
}