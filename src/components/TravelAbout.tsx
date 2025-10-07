import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Heart, Shield } from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "150+ Destinations",
    description: "Access to exclusive locations worldwide"
  },
  {
    icon: Award,
    title: "Award-Winning Service",
    description: "Recognized for excellence in travel"
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your safety is our top priority"
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description: "Tailored trips to match your dreams"
  }
];

const TravelAbout = () => {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose Wanderlust?
          </h2>
          <p className="text-xl text-muted-foreground">
            With over a decade of experience, we've helped thousands of travelers discover the world's most incredible destinations. Our passion is creating unforgettable journeys that exceed expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="bg-primary/5 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Travelers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelAbout;
