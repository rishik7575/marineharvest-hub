
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { marineProducts } from "../data/products";
import { useCart } from "../hooks/useCart";

const MarineProducts = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (productId: string) => {
    addToCart(marineProducts, productId);
  };

  return (
    <PageLayout
      heroTitle="Marine Products"
      heroSubtitle="Explore our selection of premium seafood, including sustainably farmed fish, shellfish, and sea vegetables."
      heroImage="https://images.unsplash.com/photo-1535090042247-30387644aec5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    >
      <ProductList 
        products={marineProducts} 
        addToCart={handleAddToCart} 
        title="Fresh Marine Products"
      />
    </PageLayout>
  );
};

export default MarineProducts;
