import { Button } from "@/components/ui/button";
import { Menu, Plane } from "lucide-react";
import { useState } from "react";

const TravelHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Wanderlust</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors">Destinations</a>
            <a href="#tours" className="text-foreground hover:text-primary transition-colors">Tours</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>

          <div className="hidden md:block">
            <Button>Book Now</Button>
          </div>

          <button 
            className="md:hidden text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 flex flex-col gap-4">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#destinations" className="text-foreground hover:text-primary transition-colors">Destinations</a>
            <a href="#tours" className="text-foreground hover:text-primary transition-colors">Tours</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            <Button className="w-full">Book Now</Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default TravelHeader;
