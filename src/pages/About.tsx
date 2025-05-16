
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/home/Newsletter";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(93, 64, 55, 0.85), rgba(93, 64, 55, 0.7)), url('/images/about-hero.jpg')",
            }}
          ></div>
          <div className="container mx-auto px-4 z-10 relative">
            <div className="max-w-2xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold font-playfair mb-4">
                About AyoGlow Naturals
              </h1>
              <p className="text-xl">
                Our journey from the farms of Nigeria to homes worldwide
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold font-playfair mb-6 text-center">
                Our <span className="text-secondary">Story</span>
              </h2>
              <div className="prose prose-lg max-w-none">
                <p>
                  AyoGlow Naturals was founded in 2020 by Adesanya Oluwafisayomi Ignatius, who grew up watching his grandmother create natural skincare remedies using ingredients from their family farm. These traditional formulations had been passed down through generations, and Adesanya was determined to share these natural treasures with the world.
                </p>
                <p>
                  After studying Cosmetic Science and working with leading skincare brands, Adesanya returned to his roots in Nigeria with a mission: to create a skincare line that honored the traditional ingredients and methods of his homeland while meeting modern quality standards.
                </p>
                <p>
                  He began by establishing direct relationships with local farmers across Nigeria, ensuring sustainable harvesting practices and fair compensation. Every ingredient we use is ethically sourced and carefully selected for its natural benefits.
                </p>
                <p>
                  Today, AyoGlow Naturals has grown from a small workshop in Lagos to an international brand loved by customers in over 30 countries. Despite our growth, we remain committed to our founding principles: authenticity, sustainability, and celebrating the rich natural heritage of Africa.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-playfair mb-12 text-center">
              Our <span className="text-secondary">Values</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-playfair text-center mb-3">Authenticity</h3>
                <p className="text-center">
                  We stay true to traditional African ingredients and methods, bringing centuries of natural skincare wisdom to modern customers.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-playfair text-center mb-3">Sustainability</h3>
                <p className="text-center">
                  We work directly with farmers using sustainable harvesting methods and eco-friendly packaging to minimize our environmental impact.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold font-playfair text-center mb-3">Community</h3>
                <p className="text-center">
                  We believe in supporting the communities that make our products possible, ensuring fair wages and investing in local education.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-playfair mb-12 text-center">
              Meet Our <span className="text-secondary">Team</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/team-1.jpg"
                    alt="Adesanya Oluwafisayomi Ignatius"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-playfair mb-1">Adesanya Oluwafisayomi Ignatius</h3>
                <p className="text-secondary font-medium mb-2">Founder & CEO</p>
                <p className="text-muted-foreground">
                  Visionary behind AyoGlow Naturals with extensive knowledge of traditional African skincare.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/team-2.jpg"
                    alt="Amina Okafor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-playfair mb-1">Amina Okafor</h3>
                <p className="text-secondary font-medium mb-2">Lead Formulator</p>
                <p className="text-muted-foreground">
                  Certified cosmetic chemist with a passion for natural ingredients and innovative formulations.
                </p>
              </div>
              
              <div className="text-center">
                <div className="rounded-full overflow-hidden w-48 h-48 mx-auto mb-4">
                  <img
                    src="/images/team-3.jpg"
                    alt="Daniel Mensah"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold font-playfair mb-1">Daniel Mensah</h3>
                <p className="text-secondary font-medium mb-2">Sustainability Director</p>
                <p className="text-muted-foreground">
                  Environmental scientist ensuring our practices remain eco-friendly and sustainable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default About;
