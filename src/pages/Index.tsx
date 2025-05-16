import HeroSection from "@/components/home/HeroSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BrandStory from "@/components/home/BrandStory";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import SustainabilitySection from "@/components/home/SustainabilitySection";
import SkinQuiz from "@/components/home/SkinQuiz";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEO/SEOHead";

const Index = () => {
  // Homepage structured data
  const homeStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AyoGlow Naturals",
    "url": "https://www.ayoglow.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.ayoglow.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://www.facebook.com/ayoglownaturals",
      "https://www.instagram.com/ayoglow_naturals",
      "https://twitter.com/ayoglow_naturals",
      "https://www.pinterest.com/ayoglownaturals"
    ]
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="AyoGlow Naturals | Premium African Skincare Products"
        description="Discover authentic African skincare made with organic ingredients. Shop our collection of raw shea butter, black soap, and natural oils ethically sourced from Nigeria and across Africa."
        keywords="african skincare products, raw shea butter, organic black soap, nigerian beauty exports, natural skincare, african beauty ingredients"
        structuredData={homeStructuredData}
      />
      <Navbar />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedProducts />
        <SkinQuiz />
        <BrandStory />
        <SustainabilitySection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
