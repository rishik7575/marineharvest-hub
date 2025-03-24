
import { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { marineProducts, sustainableProducts, equipmentProducts } from "../data/products";
import { useCart } from "../hooks/useCart";

const Index = () => {
  const { 
    cart,
    setCart,
    isCartOpen,
    setIsCartOpen,
    toastMessage,
    toastVisible,
    toastType,
    showToast,
    addToCart
  } = useCart();

  // Combine all products for the home page
  const allProducts = [...marineProducts, ...sustainableProducts, ...equipmentProducts];

  const handleAddToCart = (productId: string) => {
    // Find the product in any of the product arrays
    const product = allProducts.find(p => p.id === productId);
    if (product) {
      // Once we find the product, we can determine which array it belongs to
      if (marineProducts.some(p => p.id === productId)) {
        addToCart(marineProducts, productId);
      } else if (sustainableProducts.some(p => p.id === productId)) {
        addToCart(sustainableProducts, productId);
      } else if (equipmentProducts.some(p => p.id === productId)) {
        addToCart(equipmentProducts, productId);
      }
    }
  };

  return (
    <PageLayout>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Welcome to MarineHarvest</h2>
            <p className="text-lg text-gray-700 mb-6">
              Explore our complete collection of marine products, sustainable farming solutions, and professional equipment.
            </p>
            <p className="text-lg text-gray-700">
              We are dedicated to providing the highest quality products while maintaining sustainable practices.
            </p>
          </div>
        </div>
      </section>
      
      <ProductList 
        products={allProducts} 
        addToCart={handleAddToCart} 
        title="All Products"
      />
    </PageLayout>
  );
};

export default Index;
