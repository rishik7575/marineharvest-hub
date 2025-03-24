
import { useEffect } from "react";
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { marineProducts } from "../data/products";
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

  const handleAddToCart = (productId: string) => {
    addToCart(marineProducts, productId);
  };

  return (
    <PageLayout>
      <ProductList 
        products={marineProducts} 
        addToCart={handleAddToCart} 
        title="Marine Products"
      />
    </PageLayout>
  );
};

export default Index;
