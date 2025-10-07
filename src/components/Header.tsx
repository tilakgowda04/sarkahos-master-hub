import { Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-2xl text-primary-foreground font-bold">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sarka Hospital</h1>
              <p className="text-xs text-muted-foreground">Excellence in Healthcare</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Home
            </a>
            <a href="#services" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Services
            </a>
            <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              About
            </a>
            <a href="#doctors" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Our Doctors
            </a>
            <a href="#contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </a>
          </nav>

          <Button className="hidden md:inline-flex">
            Book Appointment
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
