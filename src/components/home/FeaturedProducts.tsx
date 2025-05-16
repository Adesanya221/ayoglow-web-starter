import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Star, ShoppingBag, Heart } from "lucide-react";
import { useCart, formatPrice } from "@/contexts/CartContext";
import { toast } from "@/components/ui/use-toast";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  bestSeller?: boolean;
  new?: boolean;
};

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Shea Butter Moisturizer",
    description: "Rich moisturizer made with pure African shea butter.",
    price: 24.99,
    image: "/images/hero/newp.jpg",
    rating: 4.5,
    category: "moisturizers",
    bestSeller: true
  },
  {
    id: "p2",
    name: "Baobab Oil Serum",
    description: "Nutrient-rich facial serum with antioxidant properties.",
    price: 32.99,
    image: "/images/hero/girlf.jpg",
    rating: 4.8,
    category: "serums",
    new: true
  },
  {
    id: "p3",
    name: "African Black Soap",
    description: "Traditional cleansing soap for all skin types.",
    price: 18.50,
    image: "/images/hero/newp.jpg",
    rating: 4.7,
    category: "cleansers",
    bestSeller: true
  },
  {
    id: "p4",
    name: "Marula Hydrating Mask",
    description: "Deep hydration treatment with pure marula oil.",
    price: 28.95,
    image: "/images/hero/istockphoto-2159948396-612x612.jpg",
    rating: 4.6,
    category: "masks"
  }
];

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
      variant: "default",
      duration: 2000
    });
  };

  const handleBuyNow = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setIsCartOpen(true);
  };

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Product badge */}
      {product.bestSeller && (
        <div className="absolute top-2 left-2 z-10 bg-accent text-primary text-xs font-semibold px-2 py-1 rounded">
          BEST SELLER
        </div>
      )}
      {product.new && (
        <div className="absolute top-2 left-2 z-10 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
          NEW
        </div>
      )}
      
      {/* Wishlist button */}
      <button className="absolute top-2 right-2 z-10 bg-white/80 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Heart className="w-5 h-5 text-primary" />
      </button>
      
      {/* Product image */}
      <Link to={`/products/${product.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <div className="flex items-center mb-1">
          {/* Star rating */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : i < product.rating 
                      ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                      : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-xs text-gray-600 ml-1">({product.rating})</span>
        </div>
        
        <Link to={`/products/${product.id}`}>
          <h3 className="font-medium text-primary hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-semibold">{formatPrice(product.price)}</span>
          
          <Button 
            size="sm" 
            className="rounded-full bg-primary hover:bg-accent text-white px-3"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair">
            Featured Products
          </h2>
          <p className="mt-2 text-gray-600">
            Discover our most loved African skincare treasures
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/products">
            <Button 
              className="bg-primary hover:bg-accent text-white px-8 py-6"
              size="lg"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
