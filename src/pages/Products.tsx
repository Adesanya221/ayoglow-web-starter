import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SEOHead from "@/components/SEO/SEOHead";

// Exchange rate (approximate)
const exchangeRate = 1500;

// Function to convert USD to Naira
const convertToNaira = (usdPrice: number) => {
  return Math.round(usdPrice * exchangeRate);
};

const products = [
  {
    id: 1,
    name: "Pure Shea Butter",
    description: "100% organic unrefined shea butter for skin and hair care.",
    price: 19.99,
    image: "/images/hero/newp.jpg",
    category: "moisturizers",
  },
  {
    id: 2,
    name: "African Black Soap",
    description: "Traditional handmade soap for all skin types.",
    price: 12.99,
    image: "/images/hero/newp.jpg",
    category: "cleansers",
  },
  {
    id: 3,
    name: "Moringa Oil",
    description: "Cold-pressed moringa oil for natural skin radiance.",
    price: 24.99,
    image: "/images/hero/newp.jpg",
    category: "oils",
  },
  {
    id: 4,
    name: "Coconut Body Butter",
    description: "Rich moisturizer blend with pure coconut oil.",
    price: 22.99,
    image: "/images/hero/newp.jpg",
    category: "moisturizers",
  },
  {
    id: 5,
    name: "Aloe Vera Gel",
    description: "Pure aloe vera gel for soothing skin relief.",
    price: 15.99,
    image: "/images/hero/newp.jpg",
    category: "moisturizers",
  },
  {
    id: 6,
    name: "Baobab Oil",
    description: "Nutrient-rich oil for skin and hair rejuvenation.",
    price: 29.99,
    image: "/images/hero/newp.jpg",  
    category: "oils",
  },
  {
    id: 7,
    name: "Hibiscus Face Mask",
    description: "Exfoliating mask with natural hibiscus powder.",
    price: 18.99,
    image: "/images/hero/newp.jpg",
    category: "treatments",
  },
  {
    id: 8,
    name: "Cocoa Butter Lotion",
    description: "Luxurious lotion for deep hydration.",
    price: 21.99,
    image: "/images/hero/newp.jpg",
    category: "moisturizers",
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // Structured data for product list page
  const productsStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": filteredProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.name,
        "description": product.description,
        "image": product.image,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        }
      }
    }))
  };

  // SEO title and description based on active category
  const getSeoTitle = () => {
    if (activeCategory === "all") {
      return "Organic African Skincare Products | AyoGlow Naturals";
    }
    
    // Capitalize first letter of category for title
    const categoryName = activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1);
    return `Organic African ${categoryName} | AyoGlow Naturals`;
  };

  const getSeoDescription = () => {
    switch (activeCategory) {
      case "moisturizers":
        return "Shop premium African moisturizers like raw shea butter and cocoa butter. Ethically sourced from Nigeria for natural skin hydration and nourishment.";
      case "cleansers":
        return "Experience traditional African cleansers including authentic black soap. Natural ingredients for effective cleansing suitable for all skin types.";
      case "oils":
        return "Discover premium African oils including baobab and moringa. Cold-pressed, organic oils for natural skin radiance and rejuvenation.";
      case "treatments":
        return "Shop our selection of organic African skin treatments with natural ingredients for targeted skincare concerns.";
      default:
        return "Shop our collection of premium organic African skincare products. Ethically sourced raw shea butter, black soap, and natural oils from Nigeria.";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={getSeoTitle()}
        description={getSeoDescription()}
        keywords={`buy raw shea butter from Nigeria, African skincare products export, organic ${activeCategory} from Africa, natural beauty products, AyoGlow Naturals`}
        ogType="product.group"
        structuredData={productsStructuredData}
      />
      <Navbar />
      <main className="flex-grow pt-8 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-playfair mb-4">
              Our Products
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our range of organic skincare products made from authentic African ingredients.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-12">
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
              <TabsTrigger 
                value="all"
                onClick={() => setActiveCategory("all")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                All Products
              </TabsTrigger>
              <TabsTrigger 
                value="moisturizers"
                onClick={() => setActiveCategory("moisturizers")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Moisturizers
              </TabsTrigger>
              <TabsTrigger 
                value="cleansers"
                onClick={() => setActiveCategory("cleansers")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Cleansers
              </TabsTrigger>
              <TabsTrigger 
                value="oils"
                onClick={() => setActiveCategory("oils")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Oils
              </TabsTrigger>
              <TabsTrigger 
                value="treatments"
                onClick={() => setActiveCategory("treatments")}
                className="data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Treatments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={`AyoGlow ${product.name} - Organic African Skincare Product`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 bg-[#FBF7F5]"
                        loading="lazy"
                        width={600}
                        height={600}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = `/images/products/product-${product.id}.svg`;
                        }}
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="font-playfair text-xl">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-4">
                      <p className="text-muted-foreground text-sm mb-3">{product.description}</p>
                      <p className="text-xl font-semibold text-primary">₦{convertToNaira(product.price).toLocaleString()}</p>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300"
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
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
