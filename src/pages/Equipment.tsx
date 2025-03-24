
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Equipment products data
const products = [
  {
    id: "net-commercial",
    name: "Commercial Fishing Net",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1565287753977-e51188de492c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Nets",
    description: "Heavy-duty commercial grade fishing net designed for large-scale operations."
  },
  {
    id: "sonar-fish-finder",
    name: "Advanced Sonar Fish Finder",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    description: "State-of-the-art sonar technology for precise fish location and depth measurement."
  },
  {
    id: "aquaculture-tank",
    name: "Commercial Aquaculture Tank",
    price: 1249.99,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Aquaculture",
    description: "Large capacity tank for commercial aquaculture with integrated filtration system."
  },
  {
    id: "underwater-camera",
    name: "Underwater Monitoring Camera",
    price: 489.99,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    description: "Waterproof camera system for monitoring aquatic environments and fish behavior."
  }
];

const Equipment = () => {
  // State
  const [cart, setCart] = useState<Array<{product: any, quantity: number}>>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    // First filter by category
    let result = selectedCategory === "All" 
      ? products 
      : products.filter(product => product.category === selectedCategory);
    
    // Then filter by search term if present
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(term) || 
          product.description.toLowerCase().includes(term)
      );
    }
    
    // Finally sort
    switch (sortOrder) {
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...result].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return result;
    }
  };

  const filteredProducts = getFilteredAndSortedProducts();

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

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("marineHarvestCart", JSON.stringify(cart));
  }, [cart]);

  // Calculate cart totals
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  // Cart functions
  const addToCart = (productId: string) => {
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

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    showToast("Item removed from cart", "info");
  };

  const increaseQuantity = (productId: string) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  const decreaseQuantity = (productId: string) => {
    setCart(prevCart => {
      const item = prevCart.find(item => item.product.id === productId);
      
      if (item && item.quantity > 1) {
        return prevCart.map(item => 
          item.product.id === productId 
            ? { ...item, quantity: item.quantity - 1 } 
            : item
        );
      } else {
        showToast("Item removed from cart", "info");
        return prevCart.filter(item => item.product.id !== productId);
      }
    });
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
    setIsCartOpen(false);
  };

  // Toast notification
  const showToast = (message: string, type = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
    
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // Handle clicks outside mobile nav to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileNavOpen && !(e.target as Element).closest("#mobileNav") && !(e.target as Element).closest("#menuBtn")) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-40 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-xl font-semibold text-gray-900">MarineHarvest</Link>
            
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li><Link to="/" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Home</Link></li>
                <li><Link to="/sustainable-farming" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Sustainable Farming</Link></li>
                <li><Link to="/" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Marine Products</Link></li>
                <li><Link to="/equipment" className="relative font-medium text-gray-900 hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900">Equipment</Link></li>
              </ul>
            </nav>
            
            <div className="flex items-center">
              <button 
                className="relative p-2 mr-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                    {itemCount}
                  </span>
                )}
              </button>
              
              <button 
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label="Menu"
                id="menuBtn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div 
              id="mobileNav"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute w-full bg-white shadow-lg z-50"
            >
              <ul className="p-4 space-y-4">
                <li><Link to="/" className="block py-2 font-medium text-gray-500">Home</Link></li>
                <li><Link to="/sustainable-farming" className="block py-2 font-medium text-gray-500">Sustainable Farming</Link></li>
                <li><Link to="/" className="block py-2 font-medium text-gray-500">Marine Products</Link></li>
                <li><Link to="/equipment" className="block py-2 font-medium text-gray-900">Equipment</Link></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center mt-16">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1566922838200-63d50294cc6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Marine equipment" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Marine Equipment</h1>
            <p className="text-lg md:text-xl opacity-90">
              Professional-grade equipment for marine farming, fishing, and aquaculture operations.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Search and Filters Section */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {["All", "Nets", "Electronics", "Aquaculture"].map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category 
                      ? "bg-gray-900 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search equipment..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                />
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  {searchTerm && <X size={16} />}
                </button>
              </div>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="default">Sort by: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-medium">
              {searchTerm ? `Search Results for "${searchTerm}"` : `${selectedCategory} Equipment`}
            </h2>
            <span className="text-gray-500">{filteredProducts.length} products</span>
          </div>
          
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-0 pb-[75%] overflow-hidden rounded-t-xl">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <button 
                      className="absolute right-4 bottom-4 z-10 p-2 bg-white rounded-full shadow-md opacity-0 transform scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
                      onClick={() => addToCart(product.id)}
                      aria-label={`Quick add ${product.name} to cart`}
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                      <span className="text-lg font-semibold">${product.price.toFixed(2)}</span>
                    </div>
                    
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{product.description}</p>
                    
                    <button 
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900 text-white rounded-lg transition-all duration-300 hover:bg-gray-800 active:scale-98"
                      onClick={() => addToCart(product.id)}
                    >
                      <ShoppingCart size={16} />
                      <span className="font-medium">Add to Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setIsCartOpen(false)}
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
                  onClick={() => setIsCartOpen(false)}
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
                      onClick={() => setIsCartOpen(false)}
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
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg text-white z-50 ${
              toastType === "success" ? "bg-emerald-500" :
              toastType === "error" ? "bg-red-500" :
              "bg-blue-500" // info
            }`}
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">MarineHarvest</h3>
              <p className="text-gray-400 mb-4">
                Professional equipment and solutions for sustainable marine farming and aquaculture.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08c2.643 0 2.987.012 4.043.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/sustainable-farming" className="text-gray-400 hover:text-white transition-colors">Sustainable Farming</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Marine Products</Link></li>
                <li><Link to="/equipment" className="text-gray-400 hover:text-white transition-colors">Equipment</Link></li>
                <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="not-italic text-gray-400">
                <p className="mb-2">123 Ocean Drive</p>
                <p className="mb-2">Seaview, CA 90210</p>
                <p className="mb-2">United States</p>
                <p className="mb-4">
                  <a href="mailto:info@marineharvest.com" className="hover:text-white transition-colors">
                    info@marineharvest.com
                  </a>
                </p>
                <p>
                  <a href="tel:+1234567890" className="hover:text-white transition-colors">
                    +1 (234) 567-890
                  </a>
                </p>
              </address>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} MarineHarvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Equipment;
