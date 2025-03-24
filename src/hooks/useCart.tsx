
import { useState, useEffect } from "react";
import { Product } from "../data/products";
import { CartItem } from "../components/ShoppingCart";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("success");
  
  // Toast notification
  const showToast = (message: string, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("marineHarvestCart", JSON.stringify(cart));
  }, [cart]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem("marineHarvestCart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart", error);
      }
    }
  }, []);

  // Add to cart function
  const addToCart = (products: Product[], productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === productId);
      
      if (existingItem) {
        // Increase quantity if already in cart
        return prevCart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Add new item to cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    showToast(`Added ${product.name} to cart`);
  };

  return {
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    toastMessage,
    toastVisible,
    toastType,
    showToast,
    addToCart
  };
};
