
import PageLayout from "../components/PageLayout";
import ProductList from "../components/ProductList";
import { sustainableProducts } from "../data/products";
import { useCart } from "../hooks/useCart";

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
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Sustainability</h2>
            <p className="text-lg text-gray-700 mb-6">
              At MarineHarvest, we believe in farming practices that respect marine ecosystems while providing 
              the highest quality seafood products. Our sustainable approach ensures minimal environmental impact.
            </p>
            <p className="text-lg text-gray-700">
              We implement cutting-edge technology and eco-friendly methods to maintain the health and biodiversity of our oceans.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethical Practices</h3>
              <p className="text-gray-600">
                Our farms adhere to the highest standards of ethical practices, ensuring the well-being of marine life.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Technology</h3>
              <p className="text-gray-600">
                We utilize innovative, eco-friendly technologies to minimize our environmental footprint.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Resources</h3>
              <p className="text-gray-600">
                Our commitment to sustainability extends to using renewable resources and responsible waste management.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ProductList 
        products={sustainableProducts} 
        addToCart={handleAddToCart} 
        title="Sustainable Farming Products"
      />
    </PageLayout>
  );
};

export default SustainableFarming;
