
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const SustainableFarming = () => {
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
                <li><Link to="/sustainable-farming" className="relative font-medium text-gray-900 hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900">Sustainable Farming</Link></li>
                <li><Link to="/" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Marine Products</Link></li>
                <li><Link to="/equipment" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Equipment</Link></li>
              </ul>
            </nav>
            
            <div>
              <Link to="/">
                <Button variant="outline">Return to Store</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-12">
        <section className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">Sustainable Marine Farming</h1>
          
          <div className="bg-blue-50 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-semibold mb-4">Our Commitment to Sustainability</h2>
            <p className="text-gray-700 mb-4">
              At MarineHarvest, we believe that the future of seafood lies in responsible aquaculture. 
              Our sustainable farming practices are designed to minimize environmental impact while 
              producing the highest quality marine products.
            </p>
            <p className="text-gray-700">
              We implement cutting-edge technologies and stringent protocols to ensure that our 
              operations are environmentally sound, socially responsible, and economically viable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Environmental Protection</h3>
              <p className="text-gray-700">
                Our farms are strategically located in areas with optimal water flow to prevent 
                seabed impact. We continuously monitor water quality and maintain low stocking 
                densities to ensure minimal environmental footprint.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Responsible Feed Practices</h3>
              <p className="text-gray-700">
                We use sustainably sourced feed ingredients and implement efficient feeding systems 
                to minimize waste. Our feed conversion ratios are among the best in the industry, 
                reflecting our commitment to resource efficiency.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Fish Welfare</h3>
              <p className="text-gray-700">
                The health and welfare of our fish are paramount. We maintain optimal stocking 
                densities, implement regular health monitoring, and employ stress-reducing 
                handling techniques to ensure the well-being of our stock.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Community Engagement</h3>
              <p className="text-gray-700">
                We actively engage with local communities, providing employment opportunities 
                and supporting community initiatives. We believe that sustainable aquaculture 
                should benefit not just the environment, but also the people who depend on it.
              </p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/">
              <Button>Browse Our Sustainable Products</Button>
            </Link>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-400">&copy; {new Date().getFullYear()} MarineHarvest. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SustainableFarming;
