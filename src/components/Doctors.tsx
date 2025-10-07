import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    specialty: "Chief Cardiologist",
    initials: "SM",
    experience: "15+ years experience"
  },
  {
    name: "Dr. James Chen",
    specialty: "Neurosurgeon",
    initials: "JC",
    experience: "12+ years experience"
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatric Specialist",
    initials: "ER",
    experience: "10+ years experience"
  },
  {
    name: "Dr. Michael Thompson",
    specialty: "Orthopedic Surgeon",
    initials: "MT",
    experience: "18+ years experience"
  }
];

const Doctors = () => {
  return (
    <section id="doctors" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Our Expert Doctors</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our team of highly qualified and experienced medical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doctor, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <Avatar className="w-24 h-24 mx-auto mb-4 bg-primary/10">
                  <AvatarFallback className="text-2xl font-semibold text-primary">
                    {doctor.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold text-foreground">{doctor.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-primary font-medium mb-2">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground">{doctor.experience}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
