"use client";

import { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import Products from "../components/Products";
import CartSidebar from "../components/CartSidebar";
import Modal from "../components/Modal";
import Footer from "../components/Footer";
import { products } from "../data/products";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedDarkMode);

    // Apply dark mode class to body
    if (savedDarkMode) {
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    // Save preference to localStorage
    localStorage.setItem("darkMode", newDarkMode.toString());

    // Toggle body class
    if (newDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  };

  // Add to cart function
  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showNotification("Product added to cart!");
  };

  // Update quantity
  const updateQuantity = (productId, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQuantity = item.quantity + change;
            return newQuantity <= 0 ? null : { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Show notification
  const showNotification = (message, type = "success") => {
    // Simple notification - you can enhance this with a toast library
    const notification = document.createElement("div");
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 2rem;
      background: ${type === "success" ? "#28a745" : "#dc3545"};
      color: white;
      border-radius: 5px;
      z-index: 1003;
      animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Toggle cart
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Open modal
  const openModal = (modalId) => {
    setActiveModal(modalId);
  };

  // Close modal
  const closeModal = () => {
    setActiveModal(null);
  };

  // Filter products
  const getFilteredProducts = () => {
    let filtered =
      currentFilter === "all"
        ? products
        : products.filter((product) => product.category === currentFilter);

    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  // Calculate total
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        cartItemCount={cartItemCount}
        toggleCart={toggleCart}
        openModal={openModal}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Hero />

      <Categories
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
      />

      <Products
        products={getFilteredProducts()}
        addToCart={addToCart}
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      <CartSidebar
        isOpen={isCartOpen}
        cart={cart}
        cartTotal={cartTotal}
        toggleCart={toggleCart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        openModal={openModal}
        showNotification={showNotification}
      />

      <Modal
        activeModal={activeModal}
        closeModal={closeModal}
        openModal={openModal}
        cart={cart}
        setCart={setCart}
        showNotification={showNotification}
      />

      <Footer />
    </>
  );
}
