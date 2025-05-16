import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardTitle 
} from "@/components/ui/card";
import SEOHead from "@/components/SEO/SEOHead";
import { Star, StarHalf } from "lucide-react";

// Exchange rate
const exchangeRate = 1500;

// Function to convert USD to Naira
const convertToNaira = (usdPrice: number) => {
  return Math.round(usdPrice * exchangeRate);
};

// Sample product data - in a real app, this would come from your API
const productDetails = {
  id: 1,
  name: "Raw Unrefined Shea Butter",
  subtitle: "Premium Grade A from Nigeria",
  slug: "raw-unrefined-shea-butter-500g",
  description: "100% pure, unprocessed shea butter ethically sourced directly from women's cooperatives in Nigeria. Our raw unrefined shea butter retains all its natural nutrients, making it perfect for deeply moisturizing dry skin, soothing irritation, and providing natural protection against environmental stressors.",
  fullDescription: `
    <p>AyoGlow's Raw Unrefined Shea Butter is harvested using traditional methods that have been passed down through generations in Nigeria. The shea nuts are hand-picked, washed, and crushed before being roasted to perfection. The roasted nuts are then ground into a paste and whipped into a rich, creamy butter.</p>
    <p>Unlike refined shea butter, our raw, unrefined product maintains all its natural vitamins, minerals, and fatty acids that make it so beneficial for your skin and hair. The ivory to slightly yellow color and nutty aroma are signs of its purity and high quality.</p>
    <p>Each 500g jar contains enough premium shea butter to transform your skincare routine. Use it as a daily moisturizer, hair treatment, or as a base for DIY beauty products.</p>
  `,
  price: 24.99,
  originalPrice: 32.99,
  size: "500g",
  images: [
    "/images/hero/girlf.jpg",
    "/images/hero/lumin.jpg",
    "/images/hero/newp.jpg",
    "/images/hero/istockphoto-2159948396-612x612.jpg"
  ],
  category: "moisturizers",
  tags: ["shea butter", "moisturizer", "raw", "unrefined", "natural", "organic"],
  benefits: [
    "Deep moisturization for dry skin",
    "Soothes eczema and psoriasis",
    "Reduces appearance of stretch marks",
    "Natural hair conditioner",
    "Anti-inflammatory properties",
    "Rich in vitamins A, E, and F"
  ],
  ingredients: ["100% Pure Butyrospermum Parkii (Shea) Butter"],
  howToUse: "Take a small amount and warm between your palms until it melts. Apply to clean, slightly damp skin for best absorption. For hair, apply to ends to tame frizz or use as a deep conditioning treatment.",
  rating: 4.8,
  reviewCount: 127,
  inStock: true,
  isOrganic: true,
  isFeatured: true,
  relatedProducts: [2, 4, 8] // IDs of related products
};

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(productDetails.images[0]);
  const [quantity, setQuantity] = useState(1);
  const { slug } = useParams();
  
  // This would normally be a DB lookup or API call based on the slug
  // For the demo, we're using the static product data

  // Handle quantity changes
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Generate breadcrumbs structured data
  const breadcrumbsStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.ayoglow.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Shop",
        "item": "https://www.ayoglow.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Moisturizers",
        "item": "https://www.ayoglow.com/products?category=moisturizers"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": productDetails.name,
        "item": `https://www.ayoglow.com/products/${productDetails.slug}`
      }
    ]
  };

  // Generate product structured data
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${productDetails.name} - ${productDetails.size}`,
    "image": productDetails.images,
    "description": productDetails.description,
    "sku": "SB-500G",
    "mpn": "AYG-SB500",
    "brand": {
      "@type": "Brand",
      "name": "AyoGlow Naturals"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.ayoglow.com/products/${productDetails.slug}`,
      "priceCurrency": "USD",
      "price": productDetails.price,
      "priceValidUntil": "2024-12-31",
      "availability": productDetails.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": productDetails.rating,
      "reviewCount": productDetails.reviewCount
    }
  };

  // Combined structured data
  const structuredData = [breadcrumbsStructuredData, productStructuredData];

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={`${productDetails.name} - ${productDetails.size} | AyoGlow Naturals`}
        description={`Buy premium ${productDetails.name.toLowerCase()} directly sourced from Nigeria. 100% organic, unrefined African skincare for natural skin nourishment and hair care. Free global shipping available.`}
        keywords={`buy raw shea butter from Nigeria, unrefined shea butter, organic African skincare, natural moisturizer, stretch mark treatment, eczema relief, export African beauty products`}
        ogType="product"
        ogImage={productDetails.images[0]}
        canonicalUrl={`https://www.ayoglow.com/products/${productDetails.slug}`}
        structuredData={structuredData}
      />
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <a href="/" className="text-gray-600 hover:text-primary">Home</a>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="/products" className="text-gray-600 hover:text-primary">Shop</a>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <a href="/products?category=moisturizers" className="text-gray-600 hover:text-primary">Moisturizers</a>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-primary">{productDetails.name}</span>
                </div>
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden bg-white">
                <img 
                  src={mainImage} 
                  alt={`AyoGlow ${productDetails.name} - Organic African Skincare`} 
                  className="w-full h-full object-cover bg-[#FBF7F5]" 
                  loading="eager"
                  width={1200}
                  height={1200}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "/images/hero/girlf.jpg";
                  }}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {productDetails.images.map((image, index) => (
                  <button 
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden border-2 ${mainImage === image ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setMainImage(image)}
                    aria-label={`View product image ${index + 1}`}
                  >
                    <img 
                      src={image} 
                      alt={`${productDetails.name} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover bg-[#FBF7F5]"
                      loading="lazy"
                      width={300}
                      height={300}
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/images/hero/girlf.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div>
              {productDetails.isOrganic && (
                <div className="mb-4">
                  <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                    100% Organic
                  </span>
                </div>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-2">
                {productDetails.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">{productDetails.subtitle}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(Math.floor(productDetails.rating))].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                  {productDetails.rating % 1 !== 0 && (
                    <StarHalf size={18} fill="currentColor" />
                  )}
                </div>
                <span className="text-sm text-gray-600">
                  {productDetails.rating} ({productDetails.reviewCount} reviews)
                </span>
              </div>
              
              <div className="mb-6">
                <p className="text-3xl font-bold text-primary">
                  ₦{convertToNaira(productDetails.price).toLocaleString()}
                  {productDetails.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ₦{convertToNaira(productDetails.originalPrice).toLocaleString()}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  ${productDetails.price.toFixed(2)} USD
                </p>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{productDetails.description}</p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div>
                  <h3 className="font-semibold mb-2">Key Benefits:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {productDetails.benefits.slice(0, 4).map((benefit, index) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Size:</h3>
                  <p className="text-gray-700">{productDetails.size}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Availability:</h3>
                  <p className={`${productDetails.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {productDetails.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="mr-4 font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={decreaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border-r"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input 
                      type="text" 
                      value={quantity} 
                      readOnly 
                      className="w-12 h-10 text-center"
                      aria-label="Product quantity"
                    />
                    <button 
                      onClick={increaseQuantity}
                      className="w-10 h-10 flex items-center justify-center border-l"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button 
                    className="flex-1 py-6 bg-primary hover:bg-primary/90"
                    onClick={() => {
                      // Add to cart logic would go here
                      
                      // Play add to cart sound
                      import('@/services/SoundService').then(module => {
                        const SoundService = module.default;
                        SoundService.playAddToCart();
                      });
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="py-6 px-4 border-primary text-primary hover:bg-primary/10">
                    ♡
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button className="py-4 px-6 border-b-2 border-primary font-medium text-primary">
                  Description
                </button>
                <button className="py-4 px-6 text-gray-600 hover:text-primary">
                  Ingredients
                </button>
                <button className="py-4 px-6 text-gray-600 hover:text-primary">
                  How to Use
                </button>
                <button className="py-4 px-6 text-gray-600 hover:text-primary">
                  Reviews ({productDetails.reviewCount})
                </button>
              </div>
            </div>
            
            <div className="py-8">
              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: productDetails.fullDescription }} />
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold font-playfair mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <Card key={item} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`/images/hero/${item === 1 ? 'girlf' : 
                            item === 2 ? 'lumin' : 
                            item === 3 ? 'newp' : 
                            'istockphoto-2159948396-612x612'}.jpg`}
                      alt={`Related product ${item}`}
                      className="w-full h-full object-cover transition-transform hover:scale-110 duration-500 bg-[#FBF7F5]"
                      loading="lazy"
                      width={600}
                      height={600}
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "/images/hero/girlf.jpg";
                      }}
                    />
                  </div>
                  <CardContent className="p-4">
                    <CardTitle className="text-lg font-playfair mb-2">Related Product {item}</CardTitle>
                    <p className="text-gray-600 text-sm mb-2">Short description here</p>
                    <p className="text-lg font-semibold text-primary">₦{convertToNaira(18.99).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail; 