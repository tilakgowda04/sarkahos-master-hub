import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Users, Calendar } from "lucide-react";

interface Tour {
  id: string;
  title: string;
  description: string | null;
  price: number | null;
  duration: string | null;
  image_url: string | null;
}

const staticTours = [
  {
    title: "European Grand Tour",
    description: "Visit 7 countries including France, Italy, Switzerland, and more",
    rating: 4.9,
    reviews: 234,
    groupSize: "12-16 people",
    duration: "14 days",
    category: "Cultural"
  },
  {
    title: "African Safari Adventure",
    description: "Witness the Big Five in their natural habitat",
    rating: 5.0,
    reviews: 189,
    groupSize: "8-12 people",
    duration: "10 days",
    category: "Adventure"
  },
  {
    title: "Southeast Asia Discovery",
    description: "Explore Thailand, Vietnam, and Cambodia's hidden gems",
    rating: 4.8,
    reviews: 312,
    groupSize: "10-15 people",
    duration: "12 days",
    category: "Cultural"
  },
  {
    title: "Norwegian Fjords Cruise",
    description: "Sail through spectacular landscapes and charming villages",
    rating: 4.9,
    reviews: 156,
    groupSize: "50+ people",
    duration: "8 days",
    category: "Cruise"
  }
];

const Tours = () => {
  const navigate = useNavigate();
  const [dbTours, setDbTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const { data, error } = await supabase
        .from("tours")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDbTours(data || []);
    } catch (error) {
      console.error("Error fetching tours:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (tourId: string) => {
    navigate(`/tour/${tourId}`);
  };

  return (
    <section id="tours" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Tours
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our expertly curated group tours for unforgettable experiences
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {dbTours.length > 0 ? (
              dbTours.map((tour) => (
                <Card key={tour.id} className="hover:shadow-lg transition-shadow">
                  {tour.image_url && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={tour.image_url} 
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{tour.title}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                      {tour.duration && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {tour.duration}
                        </div>
                      )}
                      {tour.price && (
                        <div className="text-2xl font-bold text-foreground">
                          ${tour.price}
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full"
                      onClick={() => handleViewDetails(tour.id)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))
            ) : (
              staticTours.map((tour, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="secondary">{tour.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-bold">{tour.rating}</span>
                        <span className="text-muted-foreground text-sm">({tour.reviews})</span>
                      </div>
                    </div>
                    <CardTitle>{tour.title}</CardTitle>
                    <CardDescription>{tour.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        {tour.groupSize}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {tour.duration}
                      </div>
                    </div>
                    <Button className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tours;
