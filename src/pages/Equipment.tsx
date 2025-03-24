
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { equipmentProducts } from "../data/products";
import { useCart } from "../hooks/useCart";

const Equipment = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    addToCart(equipmentProducts, productId);
  };

  return (
    <PageLayout
      heroTitle="Marine Equipment"
      heroSubtitle="Professional equipment for marine farming, fishing, and seafood processing."
      heroImage="https://images.unsplash.com/photo-1565800489013-c64a474cd8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    >
      <ProductList 
        products={equipmentProducts} 
        addToCart={handleAddToCart} 
        title="Marine Equipment"
      />
    </PageLayout>
  );
};

export default Equipment;
