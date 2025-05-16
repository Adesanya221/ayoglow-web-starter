
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    quote: "AyoGlow's shea butter completely transformed my skin. After years of using commercial products, I finally found something that truly nourishes my skin naturally.",
    name: "Sarah Johnson",
    location: "United States",
    rating: 5,
  },
  {
    id: 2,
    quote: "The black soap has been amazing for my acne-prone skin. It's gentle yet effective, and I love knowing I'm using something all-natural and ethically sourced.",
    name: "David Okafor",
    location: "Nigeria",
    rating: 5,
  },
  {
    id: 3,
    quote: "I've been using the moringa oil for my hair, and the results are incredible. My hair is softer, shinier, and healthier than it's ever been before.",
    name: "Emma Wilson",
    location: "United Kingdom",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover why customers around the world love our natural skincare products.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-muted/50 border-none shadow-sm">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? "text-accent" : "text-gray-300"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ))}
                </div>

                <p className="italic mb-6 text-gray-700">"{testimonial.quote}"</p>

                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
