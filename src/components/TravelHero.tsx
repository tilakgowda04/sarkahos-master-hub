import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import heroImage from "@/assets/travel-hero.jpg";

const TravelHero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Explore the World - Beautiful Tropical Paradise" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Explore the World with Wanderlust
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/95">
            Discover breathtaking destinations, create unforgettable memories, and experience the adventure of a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" variant="secondary" className="text-lg">
              <Search className="mr-2 h-5 w-5" />
              Explore Destinations
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
              <MapPin className="mr-2 h-5 w-5" />
              Plan Your Trip
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg">
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">150+</div>
              <div className="text-sm text-white/80">Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">50K+</div>
              <div className="text-sm text-white/80">Happy Travelers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-secondary">4.9★</div>
              <div className="text-sm text-white/80">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelHero;
