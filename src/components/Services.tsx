import { Heart, Activity, Brain, Baby, Bone, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Heart,
    title: "Cardiology",
    description: "Comprehensive heart care with advanced diagnostic and treatment options."
  },
  {
    icon: Activity,
    title: "Emergency Care",
    description: "24/7 emergency services with highly trained medical professionals."
  },
  {
    icon: Brain,
    title: "Neurology",
    description: "Expert neurological care for brain and nervous system disorders."
  },
  {
    icon: Baby,
    title: "Pediatrics",
    description: "Specialized care for infants, children, and adolescents."
  },
  {
    icon: Bone,
    title: "Orthopedics",
    description: "Advanced treatment for bone, joint, and muscle conditions."
  },
  {
    icon: Eye,
    title: "Ophthalmology",
    description: "Complete eye care from routine exams to complex surgeries."
  }
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare services delivered by expert medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
