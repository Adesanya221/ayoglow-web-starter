import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, ShoppingBag, Search } from "lucide-react";
import CartOverlay from "@/components/cart/CartOverlay";
import SoundControl from "@/components/layout/SoundControl";
import { useCart, formatPrice } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount, isCartOpen, setIsCartOpen } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        {/* Top promotional bar */}
        <div className="bg-primary text-white text-center text-sm py-2">
          <p>Free shipping on orders over {formatPrice(50)}. Use code AYOGLOW10 for 10% off your first order!</p>
        </div>
        
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-playfair font-bold text-primary">
                AyoGlow <span className="text-accent">Naturals</span>
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="font-medium hover:text-secondary transition-colors">
                Home
              </Link>
              <Link to="/products" className="font-medium hover:text-secondary transition-colors">
                Products
              </Link>
              <Link to="/about" className="font-medium hover:text-secondary transition-colors">
                About
              </Link>
              <Link to="/contact" className="font-medium hover:text-secondary transition-colors">
                Contact
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => {
                  setIsSearchOpen(true);
                  
                  // Play notification sound
                  import('@/services/SoundService').then(module => {
                    const SoundService = module.default;
                    SoundService.playNotification();
                  });
                }}
                className="text-gray-600 hover:text-primary transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <SoundControl />
              
              <Link to="/login" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                <User className="w-5 h-5" />
              </Link>
              
              <button 
                className="relative text-gray-600 hover:text-primary transition-colors"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              
              <Link to="/products">
                <Button className="bg-primary hover:bg-primary/90">
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Mobile Navigation Toggle and Icons */}
            <div className="md:hidden flex items-center space-x-4">
              <button 
                className="text-gray-600 hover:text-primary"
                onClick={() => {
                  setIsSearchOpen(true);
                  
                  // Play notification sound
                  import('@/services/SoundService').then(module => {
                    const SoundService = module.default;
                    SoundService.playNotification();
                  });
                }}
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
              
              <SoundControl />
              
              <Link to="/login" className="text-gray-600 hover:text-primary">
                <User className="w-5 h-5" />
              </Link>
              
              <button 
                className="relative text-gray-600 hover:text-primary"
                onClick={() => setIsCartOpen(true)}
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              
              <button
                className="text-primary"
                onClick={toggleMenu}
                aria-label="Toggle Menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16m-7 6h7"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
              <Link
                to="/"
                className="block py-2 font-medium hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="block py-2 font-medium hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className="block py-2 font-medium hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block py-2 font-medium hover:text-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4">
                <Link to="/products" className="w-full">
                  <Button className="w-full justify-center bg-primary hover:bg-primary/90">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      {/* Cart Overlay */}
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Simple Search Overlay - can be expanded later */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Search Products</h2>
              <button onClick={() => setIsSearchOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for products..."
                className="w-full border rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-primary"
                autoFocus
              />
              <Search className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
