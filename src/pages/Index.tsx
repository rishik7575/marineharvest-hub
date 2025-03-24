
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
      <ProductList 
        products={allProducts} 
        addToCart={handleAddToCart} 
        title="All Products"
      />
    </PageLayout>
  );
};

export default Index;
