import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Plane, LogOut, MapPin, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DestinationsManager from "@/components/admin/DestinationsManager";
import ToursManager from "@/components/admin/ToursManager";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();

      if (roleError || !roleData) {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setIsAdmin(true);
      
      // Get user profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (profileData?.full_name) {
        setUserName(profileData.full_name);
      }
    } catch (error) {
      console.error("Auth check error:", error);
      navigate("/auth");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out successfully",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Plane className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Wanderlust Admin</h1>
              {userName && <p className="text-sm text-muted-foreground">Welcome, {userName}</p>}
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="destinations" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="destinations">
              <MapPin className="h-4 w-4 mr-2" />
              Destinations
            </TabsTrigger>
            <TabsTrigger value="tours">
              <Calendar className="h-4 w-4 mr-2" />
              Tours
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="destinations" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Destinations</CardTitle>
                <CardDescription>Add, edit, or remove destinations</CardDescription>
              </CardHeader>
              <CardContent>
                <DestinationsManager />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tours" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Manage Tours</CardTitle>
                <CardDescription>Add, edit, or remove tour packages</CardDescription>
              </CardHeader>
              <CardContent>
                <ToursManager />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;