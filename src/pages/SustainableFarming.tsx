
import { useCart } from "../hooks/useCart";
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { sustainableProducts } from "../data/products";

const SustainableFarming = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    addToCart(sustainableProducts, productId);
  };

  return (
    <PageLayout
      heroTitle="Sustainable Farming"
      heroSubtitle="Discover our eco-friendly approach to marine farming and the sustainable products we offer."
      heroImage="https://images.unsplash.com/photo-1533745848184-3db07256e163?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    >
      <ProductList 
        products={sustainableProducts} 
        addToCart={handleAddToCart} 
        title="Sustainable Farming Products"
      />
    </PageLayout>
  );
};

export default SustainableFarming;
