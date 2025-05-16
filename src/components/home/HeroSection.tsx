
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="object-cover w-full h-full"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-pouring-coconut-oil-in-a-bottle-with-a-dropper-10525-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
