import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Contact Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get in touch with us for appointments, inquiries, or emergencies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <Card className="border-border">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Address</h3>
                  <p className="text-muted-foreground">123 Medical Center Drive, Healthcare District, City 12345</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">General: +1 (555) 123-4567</p>
                  <p className="text-muted-foreground">Emergency: 911</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">info@sarkahospital.com</p>
                  <p className="text-muted-foreground">appointments@sarkahospital.com</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="flex items-start gap-4 p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Hours</h3>
                  <p className="text-muted-foreground">Emergency: 24/7</p>
                  <p className="text-muted-foreground">Outpatient: Mon-Fri 8AM-8PM</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border">
            <CardContent className="p-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Your Name" className="w-full" />
                </div>
                <div>
                  <Input type="email" placeholder="Your Email" className="w-full" />
                </div>
                <div>
                  <Input placeholder="Subject" className="w-full" />
                </div>
                <div>
                  <Textarea placeholder="Your Message" rows={6} className="w-full" />
                </div>
                <Button type="submit" className="w-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
