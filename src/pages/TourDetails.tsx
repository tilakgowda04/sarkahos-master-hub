import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Calendar, MapPin, DollarSign, Clock, Users, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TravelHeader from "@/components/TravelHeader";
import TravelFooter from "@/components/TravelFooter";

interface Tour {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  image_url: string | null;
  destination_id: string | null;
}

interface Destination {
  id: string;
  name: string;
  description: string | null;
}

const TourDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tour, setTour] = useState<Tour | null>(null);
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkAuth();
    fetchTourDetails();
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
  };

  const fetchTourDetails = async () => {
    try {
      if (!id) return;

      const { data: tourData, error: tourError } = await supabase
        .from("tours")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (tourError) throw tourError;
      if (!tourData) {
        toast({
          title: "Tour not found",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setTour(tourData);

      if (tourData.destination_id) {
        const { data: destData, error: destError } = await supabase
          .from("destinations")
          .select("*")
          .eq("id", tourData.destination_id)
          .maybeSingle();

        if (!destError && destData) {
          setDestination(destData);
        }
      }
    } catch (error: any) {
      toast({
        title: "Error loading tour details",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to book this tour",
      });
      navigate("/auth");
    } else {
      toast({
        title: "Booking Initiated",
        description: "Redirecting to booking form...",
      });
      // Future: navigate to booking form
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!tour) {
    return null;
  }

  const highlights = [
    "Professional tour guide",
    "All accommodations included",
    "Daily breakfast and select meals",
    "Ground transportation",
    "Entrance fees to attractions",
    "Travel insurance"
  ];

  return (
    <div className="min-h-screen bg-background">
      <TravelHeader />
      
      <main className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Tours
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Image */}
            {tour.image_url && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>
            )}

            {/* Title and Description */}
            <div>
              <h1 className="text-4xl font-bold mb-2">{tour.title}</h1>
              {destination && (
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{destination.name}</span>
                </div>
              )}
              <p className="text-lg text-muted-foreground">
                {tour.description || "Experience an unforgettable journey"}
              </p>
            </div>

            <Separator />

            {/* Tour Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                <TabsTrigger value="included">What's Included</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6 space-y-4">
                <h3 className="text-xl font-semibold">Tour Overview</h3>
                <p className="text-muted-foreground">
                  {tour.description || "Embark on an extraordinary adventure that will create memories to last a lifetime. This carefully crafted tour combines authentic experiences with comfortable accommodations and expert guidance."}
                </p>
                {destination?.description && (
                  <>
                    <h4 className="text-lg font-semibold mt-6">About the Destination</h4>
                    <p className="text-muted-foreground">{destination.description}</p>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="itinerary" className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Sample Itinerary</h3>
                <div className="space-y-4">
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold">Day 1-2: Arrival & Orientation</h4>
                    <p className="text-muted-foreground text-sm">Meet your tour guide and fellow travelers. City orientation and welcome dinner.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold">Day 3-5: Main Attractions</h4>
                    <p className="text-muted-foreground text-sm">Explore the highlights and hidden gems with guided tours and free time.</p>
                  </div>
                  <div className="border-l-2 border-primary pl-4">
                    <h4 className="font-semibold">Final Days: Leisure & Departure</h4>
                    <p className="text-muted-foreground text-sm">Free time for personal exploration before departure.</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="included" className="mt-6">
                <h3 className="text-xl font-semibold mb-4">What's Included</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Book This Tour</CardTitle>
                <CardDescription>Secure your spot today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tour.price && (
                  <div className="flex items-baseline gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-3xl font-bold">{tour.price}</span>
                    <span className="text-muted-foreground">per person</span>
                  </div>
                )}

                <Separator />

                <div className="space-y-3">
                  {tour.duration && (
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{tour.duration}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Group Size</p>
                      <p className="font-semibold">Small groups (8-16)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Next Departure</p>
                      <p className="font-semibold">Multiple dates available</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {!isLoggedIn && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-3">
                      Please login to proceed with booking
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/auth")}
                    >
                      Login / Sign Up
                    </Button>
                  </div>
                )}

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleBookNow}
                  disabled={!isLoggedIn}
                >
                  {isLoggedIn ? "Book Now" : "Login to Book"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Free cancellation up to 48 hours before departure
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <TravelFooter />
    </div>
  );
};

export default TourDetails;