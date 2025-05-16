
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically integrate with an email service
    toast({
      title: "Success!",
      description: "You have been subscribed to our newsletter.",
      duration: 5000,
    });
    
    // Clear the form
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section className="py-16 bg-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to receive updates on new products, special offers, and skincare tips.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow"
              required
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 whitespace-nowrap">
              Subscribe Now
            </Button>
          </form>

          <p className="mt-4 text-sm text-muted-foreground">
            By subscribing, you agree to our Privacy Policy and consent to receive our marketing emails.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
