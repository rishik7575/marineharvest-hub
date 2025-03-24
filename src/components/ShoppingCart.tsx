
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { Product } from "../data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  showToast: (message: string, type?: string) => void;
}

const ShoppingCartComponent = ({ 
  isOpen, 
  setIsOpen, 
  cart, 
  setCart,
  showToast 
}: ShoppingCartProps) => {
  // Calculate cart totals
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Cart functions
  const removeFromCart = (productId: string) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    setCart(newCart);
    showToast("Item removed from cart", "info");
  };

  const increaseQuantity = (productId: string) => {
    const newCart = cart.map(item => 
      item.product.id === productId 
        ? { ...item, quantity: item.quantity + 1 } 
        : item
    );
    setCart(newCart);
  };

  const decreaseQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    
    if (item && item.quantity > 1) {
      const newCart = cart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
      setCart(newCart);
    } else {
      showToast("Item removed from cart", "info");
      const newCart = cart.filter(item => item.product.id !== productId);
      setCart(newCart);
    }
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart has been cleared", "info");
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      showToast("Your cart is empty!", "error");
      return;
    }
    
    showToast("Checkout completed! Thank you for your purchase.", "success");
    clearCart();
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} />
                <h2 className="text-lg font-medium">Your Cart</h2>
                <span className="text-sm text-gray-500">({itemCount} items)</span>
              </div>
              <button 
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <ShoppingCart className="text-gray-300 mb-4" size={64} />
                  <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 mb-6">Add some products to your cart and they will appear here</p>
                  <button 
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-lg transition-all duration-300 hover:bg-gray-800"
                    onClick={() => setIsOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.product.id} className="flex py-4 border-b border-gray-100">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base">
                          <h3 className="font-medium">{item.product.name}</h3>
                          <button
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">${item.product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-md">
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              onClick={() => decreaseQuantity(item.product.id)}
                              aria-label="Decrease quantity"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                            <button
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                              onClick={() => increaseQuantity(item.product.id)}
                              aria-label="Increase quantity"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <p className="font-medium">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {cart.length > 0 && (
              <div className="border-t border-gray-200 p-4 space-y-4">
                <button 
                  className="w-full flex items-center justify-center gap-2 py-2 text-gray-600 hover:text-red-500 transition-colors"
                  onClick={clearCart}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                    <line x1="10" x2="10" y1="11" y2="17"/>
                    <line x1="14" x2="14" y1="11" y2="17"/>
                  </svg>
                  <span>Clear Cart</span>
                </button>
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                
                <button 
                  className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-800 active:scale-98"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ShoppingCartComponent;
