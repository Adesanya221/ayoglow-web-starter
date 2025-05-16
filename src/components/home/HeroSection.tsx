
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(93, 64, 55, 0.85), rgba(93, 64, 55, 0.7)), url('/images/hero-bg.jpg')",
        }}
      ></div>
      <div className="container mx-auto px-4 z-10 text-white">
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
