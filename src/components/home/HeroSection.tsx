
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

const HeroSection = () => {
  const skinCareImages = [
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1470&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1335&auto=format&fit=crop"
  ];

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Carousel className="w-full h-full" autoPlay loop>
          <CarouselContent className="h-full">
            {skinCareImages.map((image, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="h-full w-full">
                  <img 
                    src={image} 
                    alt={`Skincare image ${index + 1}`} 
                    className="object-cover w-full h-full"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-primary/70 z-10"></div>
      </div>
      
      <div className="container mx-auto px-4 z-20 text-white">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-4">
            Natural Beauty, <br />
            <span className="text-accent">African Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Discover organic skincare made from pure African ingredients.
            <br />
            <span className="italic">Rooted in Africa. Loved Worldwide.</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button className="bg-accent text-primary hover:bg-accent/90 px-8 py-6 text-lg">
                Shop Now
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
