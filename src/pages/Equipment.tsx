
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Equipment = () => {
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
                <li><Link to="/sustainable-farming" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Sustainable Farming</Link></li>
                <li><Link to="/" className="relative font-medium text-gray-500 hover:text-gray-900 transition-colors duration-300">Marine Products</Link></li>
                <li><Link to="/equipment" className="relative font-medium text-gray-900 hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900">Equipment</Link></li>
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
          <h1 className="text-4xl font-bold mb-8 text-center">Marine Farming Equipment</h1>
          
          <div className="bg-blue-50 p-8 rounded-xl mb-12">
            <h2 className="text-2xl font-semibold mb-4">Professional Equipment for Marine Farming</h2>
            <p className="text-gray-700 mb-4">
              MarineHarvest offers a comprehensive range of high-quality equipment for professional 
              marine farming operations. Our products are designed to enhance efficiency, ensure 
              sustainability, and maximize yield in aquaculture settings.
            </p>
            <p className="text-gray-700">
              Whether you're setting up a new marine farm or upgrading your existing operations, 
              we have the tools and equipment you need to succeed.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Farming Systems</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Cage systems and netting</li>
                <li>Floating platforms</li>
                <li>Submersible cage technology</li>
                <li>Recirculating aquaculture systems</li>
                <li>Integrated multi-trophic aquaculture equipment</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Monitoring & Control</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Water quality sensors</li>
                <li>Automated feeding systems</li>
                <li>Environmental monitoring stations</li>
                <li>Remote surveillance equipment</li>
                <li>Data management software</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Harvesting & Processing</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Harvesting systems</li>
                <li>Grading equipment</li>
                <li>Fish pumps and handling systems</li>
                <li>Processing machinery</li>
                <li>Packaging solutions</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm mb-12">
            <h3 className="text-xl font-semibold mb-3">Custom Solutions</h3>
            <p className="text-gray-700 mb-4">
              We understand that every marine farming operation is unique. That's why we offer 
              custom equipment solutions tailored to your specific needs, environment, and target species.
            </p>
            <p className="text-gray-700">
              Our team of experts will work with you to design and implement equipment solutions 
              that optimize your operations and help you achieve your production goals sustainably.
            </p>
          </div>
          
          <div className="text-center">
            <Link to="/">
              <Button>Return to Main Store</Button>
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

export default Equipment;
