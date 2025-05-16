import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { optimizeVideoQuality } from "./VideoProcessor";

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Optimize video quality using our utility
    optimizeVideoQuality(videoRef.current);
  }, []);

  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* Background Video */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            // Apply hardware acceleration and prevent edge artifacts
            transform: 'translateZ(0) scale(1.01)',
            // Use best possible image rendering
            imageRendering: 'auto',
          }}
        >
          {/* WebM format for better quality/size ratio (if available) */}
          <source 
            src="/images/hero/back-video.webm" 
            type="video/webm"
            sizes="100vw"
          />
          {/* MP4 format as fallback */}
          <source 
            src="/images/hero/back-video.mp4" 
            type="video/mp4"
            sizes="100vw"
          />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-primary/60 z-10"></div>
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
                variant="ghost"
                className="text-white hover:bg-white/10 px-8 py-6 text-lg border-0"
              >
                Our Story
              </Button>
            </Link>
          </div>
          <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-lg">
            <p className="text-white text-lg">
              Discover the power of nature with our premium African skincare products. 
              Our formulations harness traditional beauty secrets passed down through generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
