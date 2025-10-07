import { Plane, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const TravelFooter = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-foreground">Wanderlust</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your trusted partner for unforgettable travel experiences around the world.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#home" className="hover:text-primary transition-colors">Home</a></li>
              <li><a href="#destinations" className="hover:text-primary transition-colors">Destinations</a></li>
              <li><a href="#tours" className="hover:text-primary transition-colors">Tours</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Services</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Group Tours</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Custom Packages</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Travel Insurance</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Visa Assistance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe for exclusive deals and travel tips
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-1 px-3 py-2 bg-background border border-input rounded-md text-sm"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 Wanderlust Travel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default TravelFooter;
