import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign } from "lucide-react";

const destinations = [
  {
    title: "Bali, Indonesia",
    description: "Experience spiritual temples, lush rice terraces, and pristine beaches",
    duration: "7 Days",
    price: "$899",
    image: "🏝️"
  },
  {
    title: "Paris, France",
    description: "Romance, art, and culture in the City of Light",
    duration: "5 Days",
    price: "$1,299",
    image: "🗼"
  },
  {
    title: "Tokyo, Japan",
    description: "Blend of ancient traditions and cutting-edge technology",
    duration: "8 Days",
    price: "$1,499",
    image: "🏯"
  },
  {
    title: "Santorini, Greece",
    description: "White-washed buildings and stunning sunset views",
    duration: "6 Days",
    price: "$1,099",
    image: "🇬🇷"
  },
  {
    title: "Dubai, UAE",
    description: "Luxury, modern architecture, and desert adventures",
    duration: "5 Days",
    price: "$1,399",
    image: "🏙️"
  },
  {
    title: "Maldives",
    description: "Crystal-clear waters and overwater bungalows",
    duration: "7 Days",
    price: "$1,799",
    image: "🏖️"
  }
];

const Destinations = () => {
  return (
    <section id="destinations" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our handpicked destinations around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-7xl">
                {destination.image}
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {destination.title}
                </CardTitle>
                <CardDescription>{destination.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {destination.duration}
                  </div>
                  <div className="flex items-center gap-2 text-lg font-bold text-primary">
                    <DollarSign className="h-5 w-5" />
                    {destination.price}
                  </div>
                </div>
                <Button className="w-full">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destinations;
