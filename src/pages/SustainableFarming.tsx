
import { Leaf, RefreshCw, Shield } from "lucide-react";
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
                <Shield className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ethical Practices</h3>
              <p className="text-gray-600">
                Our farms adhere to the highest standards of ethical practices, ensuring the well-being of marine life.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eco-Friendly Technology</h3>
              <p className="text-gray-600">
                We utilize innovative, eco-friendly technologies to minimize our environmental footprint.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Resources</h3>
              <p className="text-gray-600">
                Our commitment to sustainability extends to using renewable resources and responsible waste management.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Sustainable Products?</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Reduced environmental impact with responsible farming practices</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Higher quality products with better taste and nutritional value</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Support for local communities and fair economic practices</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <p className="text-gray-700">Long-term viability of marine ecosystems and biodiversity</p>
                </div>
              </div>
            </div>
            <div className="relative h-0 pb-[75%] overflow-hidden rounded-xl">
              <img 
                src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Sustainable fishing practices" 
                className="absolute inset-0 w-full h-full object-cover"
              />
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
