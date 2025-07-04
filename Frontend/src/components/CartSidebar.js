import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
export default function CartSidebar({
  isOpen,
  cart,
  cartTotal,
  toggleCart,
  updateQuantity,
  removeFromCart,
  openModal,
  showNotification
}) {
  const handleCheckout = () => {
    if (cart.length === 0) {
      // alert('Your cart is empty!');
      // Toastify({
      //   text: "Your cart is empty!",
      //   duration: 3000,
      //   gravity: "top",
      //   position: "right",
      //   backgroundColor: "#667eea",
      //   stopOnFocus: true,
      //   style: {
      //     width: "300px",
      //     textAlign: "start",
      //     fontSize: "17px",
      //   },
      // }).showToast();
      showNotification("Your cart is empty!", "error");
      return;
    }
    toggleCart();
    openModal("checkoutModal");
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("cart-overlay")) {
      toggleCart();
    }
  };

  return (
    <>
      {/* Cart Overlay */}
      {isOpen && (
        <div className="cart-overlay" onClick={handleOverlayClick}></div>
      )}

      <div className={`cart-sidebar ${isOpen ? "open" : ""}`}>
        <div className="cart-header">
          <h3>Shopping Cart</h3>
          <button className="close-cart" onClick={toggleCart}>
            ×
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                    <button
                      className="quantity-btn"
                      onClick={() => removeFromCart(item.id)}
                      style={{ marginLeft: "10px", background: "#dc3545" }}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-total">
          <div className="total-amount">Total: ${cartTotal.toFixed(2)}</div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
