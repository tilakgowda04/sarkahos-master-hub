import TravelHeader from "@/components/TravelHeader";
import TravelHero from "@/components/TravelHero";
import Destinations from "@/components/Destinations";
import Tours from "@/components/Tours";
import TravelAbout from "@/components/TravelAbout";
import TravelContact from "@/components/TravelContact";
import TravelFooter from "@/components/TravelFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TravelHeader />
      <TravelHero />
      <Destinations />
      <Tours />
      <TravelAbout />
      <TravelContact />
      <TravelFooter />
    </div>
  );
};

export default Index;
