
import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";
import { Product } from "../data/products";
import { CartItem } from "./ShoppingCart";

interface ProductListProps {
  products: Product[];
  addToCart: (productId: string) => void;
  title?: string;
}

const ProductList = ({ products, addToCart, title = "Products" }: ProductListProps) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map(product => product.category)))];

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

  return (
    <>
      {/* Search and Filters Section */}
      <section className="py-8 border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Categories */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
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
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-full"
                />
                {searchTerm && (
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
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
              {searchTerm ? `Search Results for "${searchTerm}"` : title}
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
    </>
  );
};

export default ProductList;
