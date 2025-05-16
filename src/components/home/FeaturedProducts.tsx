
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const products = [
  {
    id: 1,
    name: "Pure Shea Butter",
    description: "100% organic unrefined shea butter for skin and hair care.",
    price: 19.99,
    image: "/images/product-1.jpg",
  },
  {
    id: 2,
    name: "African Black Soap",
    description: "Traditional handmade soap for all skin types.",
    price: 12.99,
    image: "/images/product-2.jpg",
  },
  {
    id: 3,
    name: "Moringa Oil",
    description: "Cold-pressed moringa oil for natural skin radiance.",
    price: 24.99,
    image: "/images/product-3.jpg",
  },
  {
    id: 4,
    name: "Coconut Body Butter",
    description: "Rich moisturizer blend with pure coconut oil.",
    price: 22.99,
    image: "/images/product-4.jpg",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Featured Products
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our best-selling products made with organic ingredients
            sourced directly from African farms.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
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

        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
