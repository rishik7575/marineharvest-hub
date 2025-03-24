
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type NavigationMenuProps = {
  itemCount: number;
  setIsCartOpen: (isOpen: boolean) => void;
};

const NavigationMenu = ({ itemCount, setIsCartOpen }: NavigationMenuProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  
  // Determine active link
  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  // Handle clicks outside mobile nav to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileNavOpen && !(e.target as Element).closest("#mobileNav") && !(e.target as Element).closest("#menuBtn")) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileNavOpen]);

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-semibold text-gray-900">MarineHarvest</Link>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className={`relative font-medium ${isActive('/') ? 'text-gray-900 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-300`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/sustainable-farming" 
                className={`relative font-medium ${isActive('/sustainable-farming') ? 'text-gray-900 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-300`}
              >
                Sustainable Farming
              </Link>
            </li>
            <li>
              <Link 
                to="/marine-products" 
                className={`relative font-medium ${isActive('/marine-products') ? 'text-gray-900 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-300`}
              >
                Marine Products
              </Link>
            </li>
            <li>
              <Link 
                to="/equipment" 
                className={`relative font-medium ${isActive('/equipment') ? 'text-gray-900 after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gray-900' : 'text-gray-500 hover:text-gray-900'} transition-colors duration-300`}
              >
                Equipment
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center">
          <button 
            className="relative p-2 mr-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping cart"
          >
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full">
                {itemCount}
              </span>
            )}
          </button>
          
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Menu"
            id="menuBtn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"/>
              <line x1="4" x2="20" y1="6" y2="6"/>
              <line x1="4" x2="20" y1="18" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div 
            id="mobileNav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute w-full bg-white shadow-lg z-50"
          >
            <ul className="p-4 space-y-4">
              <li><Link to="/" className="block py-2 font-medium text-gray-900">Home</Link></li>
              <li><Link to="/sustainable-farming" className="block py-2 font-medium text-gray-500">Sustainable Farming</Link></li>
              <li><Link to="/marine-products" className="block py-2 font-medium text-gray-500">Marine Products</Link></li>
              <li><Link to="/equipment" className="block py-2 font-medium text-gray-500">Equipment</Link></li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavigationMenu;
