import { useState, useEffect } from "react";
import { X, ShoppingBag, Minus, Plus, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart, formatPrice } from "@/contexts/CartContext";

interface CartOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartOverlay = ({ isOpen, onClose }: CartOverlayProps) => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    itemCount, 
    subtotal, 
    total 
  } = useCart();
  const [isClosing, setIsClosing] = useState(false);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  // Calculate shipping cost in USD
  const shipping = subtotal > 50 ? 0 : 5.99;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay background */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        style={{ opacity: isClosing ? 0 : 1 }}
      ></div>
      
      {/* Cart panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300",
          isClosing ? "translate-x-full" : "translate-x-0"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-semibold">Your Bag ({itemCount})</h2>
          </div>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Cart content */}
        <div className="flex-grow overflow-auto py-4 px-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium mb-2">Your bag is empty</h3>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any products to your bag yet.
              </p>
              <Button 
                onClick={handleClose}
                className="bg-primary hover:bg-accent text-white"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex border-b pb-6">
                  <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-grow">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.name}</h4>
                      <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    
                    {item.size && (
                      <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-2 py-1">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-gray-600 hover:text-gray-800"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Cart summary */}
        {cartItems.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <div className="text-xs text-gray-500">
                  Free shipping on orders over $50 ({formatPrice(50)})
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Link to="/checkout" onClick={handleClose} className="w-full">
                <Button className="w-full bg-primary hover:bg-accent text-white">
                  Checkout
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full border-primary text-primary hover:bg-primary/5"
                onClick={handleClose}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartOverlay; 