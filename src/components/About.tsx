import { CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">About Sarka Hospital</h2>
            <p className="text-lg text-muted-foreground mb-6">
              For over 25 years, Sarka Hospital has been at the forefront of medical excellence, 
              providing compassionate care and innovative treatments to our community.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              Our state-of-the-art facility combines advanced technology with a patient-centered 
              approach, ensuring the highest quality of care for every individual who walks through our doors.
            </p>

            <div className="space-y-4">
              {[
                "Board-certified physicians and specialists",
                "Advanced medical technology and equipment",
                "24/7 emergency care services",
                "Comfortable patient rooms and facilities"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card className="p-8 text-center border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-muted-foreground">Years of Service</div>
            </Card>
            <Card className="p-8 text-center border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Expert Doctors</div>
            </Card>
            <Card className="p-8 text-center border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Patients</div>
            </Card>
            <Card className="p-8 text-center border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Emergency Care</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
