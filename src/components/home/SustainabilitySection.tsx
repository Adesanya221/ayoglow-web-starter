import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf, Users, Shield, Award } from "lucide-react";

const SustainabilitySection = () => {
  const sustainabilityPillars = [
    {
      icon: <Leaf className="w-10 h-10 text-green-600" />,
      title: "Ethically Sourced",
      description: "All our ingredients are ethically sourced directly from African farming communities, ensuring sustainable practices and fair wages."
    },
    {
      icon: <Users className="w-10 h-10 text-green-600" />,
      title: "Community Trade",
      description: "Our community trade program empowers local women's cooperatives across Africa through fair prices and long-term partnerships."
    },
    {
      icon: <Shield className="w-10 h-10 text-green-600" />,
      title: "100% Vegan",
      description: "Our products are 100% vegan and cruelty-free. We never test on animals and ensure all ingredients are plant-based."
    },
    {
      icon: <Award className="w-10 h-10 text-green-600" />,
      title: "Eco-Friendly Packaging",
      description: "We're committed to reducing waste with recyclable and biodegradable packaging made from sustainable materials."
    }
  ];

  return (
    <section className="py-16 bg-[#f5f2e9]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-2">
            Our Commitment
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Rooted in Sustainability
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            At AyoGlow, we believe beauty and responsibility go hand in hand. Our commitment to sustainable sourcing and ethical practices is at the heart of everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {sustainabilityPillars.map((pillar, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <div className="inline-flex items-center justify-center rounded-full bg-green-100 p-4 mb-4">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary">{pillar.title}</h3>
              <p className="text-gray-600">{pillar.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img 
                src="/images/hero/a479bd9e19175121bf92fe45cc6ebaea--ivory-coast-small-farm.jpg" 
                alt="Women harvesting shea nuts" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-bold font-playfair mb-4">Our Impact Story</h3>
              <p className="mb-6 text-gray-700">
                We work directly with over 20 women's cooperatives across West Africa, providing fair wages and sustainable livelihoods for more than 2,000 women and their families.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-16 h-4 bg-green-200 rounded-full mr-4">
                    <div className="h-full w-3/4 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">75% reduction in plastic usage since 2022</span>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-4 bg-green-200 rounded-full mr-4">
                    <div className="h-full w-4/5 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">80% of profits reinvested in communities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-16 h-4 bg-green-200 rounded-full mr-4">
                    <div className="h-full bg-green-600 rounded-full"></div>
                  </div>
                  <span className="text-sm text-gray-600">100% transparent supply chain</span>
                </div>
              </div>
              <Link to="/sustainability" className="mt-6 inline-block">
                <Button className="bg-green-700 hover:bg-green-800 text-white">
                  Learn More About Our Impact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection; 