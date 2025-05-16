
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const products = [
  {
    id: 1,
    name: "Pure Shea Butter",
    description: "100% organic unrefined shea butter for skin and hair care.",
    price: 19.99,
    image: "/images/product-1.jpg",
    category: "moisturizers",
  },
  {
    id: 2,
    name: "African Black Soap",
    description: "Traditional handmade soap for all skin types.",
    price: 12.99,
    image: "/images/product-2.jpg",
    category: "cleansers",
  },
  {
    id: 3,
    name: "Moringa Oil",
    description: "Cold-pressed moringa oil for natural skin radiance.",
    price: 24.99,
    image: "/images/product-3.jpg",
    category: "oils",
  },
  {
    id: 4,
    name: "Coconut Body Butter",
    description: "Rich moisturizer blend with pure coconut oil.",
    price: 22.99,
    image: "/images/product-4.jpg",
    category: "moisturizers",
  },
  {
    id: 5,
    name: "Aloe Vera Gel",
    description: "Pure aloe vera gel for soothing skin relief.",
    price: 15.99,
    image: "/images/product-5.jpg",
    category: "moisturizers",
  },
  {
    id: 6,
    name: "Baobab Oil",
    description: "Nutrient-rich oil for skin and hair rejuvenation.",
    price: 29.99,
    image: "/images/product-6.jpg",
    category: "oils",
  },
  {
    id: 7,
    name: "Hibiscus Face Mask",
    description: "Exfoliating mask with natural hibiscus powder.",
    price: 18.99,
    image: "/images/product-7.jpg",
    category: "treatments",
  },
  {
    id: 8,
    name: "Cocoa Butter Lotion",
    description: "Luxurious lotion for deep hydration.",
    price: 21.99,
    image: "/images/product-8.jpg",
    category: "moisturizers",
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col">
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
            <TabsList className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <TabsTrigger 
                value="all"
                onClick={() => setActiveCategory("all")}
              >
                All Products
              </TabsTrigger>
              <TabsTrigger 
                value="moisturizers"
                onClick={() => setActiveCategory("moisturizers")}
              >
                Moisturizers
              </TabsTrigger>
              <TabsTrigger 
                value="cleansers"
                onClick={() => setActiveCategory("cleansers")}
              >
                Cleansers
              </TabsTrigger>
              <TabsTrigger 
                value="oils"
                onClick={() => setActiveCategory("oils")}
              >
                Oils
              </TabsTrigger>
              <TabsTrigger 
                value="treatments"
                onClick={() => setActiveCategory("treatments")}
              >
                Treatments
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="font-playfair">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4">{product.description}</p>
                      <p className="text-xl font-semibold text-primary">${product.price.toFixed(2)}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-primary hover:bg-primary/90">Add to Cart</Button>
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
