import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hospital-hero.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Sarka Hospital - Modern Healthcare Facility" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-accent/70" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl text-white">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Your Health is Our Priority
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Providing world-class healthcare services with compassion, expertise, and cutting-edge technology. Your wellness journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" variant="secondary" className="text-lg">
              Book Appointment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 border-white/30 text-white hover:bg-white/20">
              <Phone className="mr-2 h-5 w-5" />
              Emergency: 911
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
