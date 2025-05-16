
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="/images/hero/girlf.jpg"
              alt="AyoGlow Natural Ingredients"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-6">
              Our <span className="text-secondary">Brand Story</span>
            </h2>
            <p className="mb-4">
              Founded by Adesanya Oluwafisayomi Ignatius, AyoGlow Naturals was born from a passion for natural beauty and a desire to share Africa's skin-nurturing treasures with the world.
            </p>
            <p className="mb-4">
              Our journey began in the heart of Nigeria, where we connected with local farmers to source the purest ingredients like shea butter, black soap, coconut oil, and moringa.
            </p>
            <p className="mb-6">
              Every product is handcrafted using traditional methods passed down through generations, ensuring the highest quality and potency of our natural formulations.
            </p>
            <Link to="/about">
              <Button className="bg-secondary hover:bg-secondary/90">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
