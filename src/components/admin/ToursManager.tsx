import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Tour {
  id: string;
  title: string;
  description: string | null;
  destination_id: string | null;
  price: number | null;
  duration: string | null;
  image_url: string | null;
  itinerary?: any;
  included?: string[] | null;
  excluded?: string[] | null;
  highlights?: string[] | null;
  max_group_size?: number | null;
  min_age?: number | null;
  difficulty_level?: string | null;
}

interface Destination {
  id: string;
  name: string;
}

const ToursManager = () => {
  const { toast } = useToast();
  const [tours, setTours] = useState<Tour[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination_id: "",
    image_url: "",
    price: "",
    duration: "",
    max_group_size: "",
    min_age: "",
    difficulty_level: "moderate",
    itinerary: "",
    included: "",
    excluded: "",
    highlights: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [toursResponse, destinationsResponse] = await Promise.all([
        supabase.from("tours").select("*").order("created_at", { ascending: false }),
        supabase.from("destinations").select("id, name").order("name"),
      ]);

      if (toursResponse.error) throw toursResponse.error;
      if (destinationsResponse.error) throw destinationsResponse.error;

      setTours(toursResponse.data || []);
      setDestinations(destinationsResponse.data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching data",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tourData = {
        title: formData.title,
        description: formData.description || null,
        destination_id: formData.destination_id || null,
        image_url: formData.image_url || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration: formData.duration || null,
        max_group_size: formData.max_group_size ? parseInt(formData.max_group_size) : null,
        min_age: formData.min_age ? parseInt(formData.min_age) : null,
        difficulty_level: formData.difficulty_level || "moderate",
        itinerary: formData.itinerary ? JSON.parse(formData.itinerary) : [],
        included: formData.included ? formData.included.split('\n').filter(i => i.trim()) : [],
        excluded: formData.excluded ? formData.excluded.split('\n').filter(i => i.trim()) : [],
        highlights: formData.highlights ? formData.highlights.split('\n').filter(i => i.trim()) : [],
      };

      if (editingId) {
        const { error } = await supabase
          .from("tours")
          .update(tourData)
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Tour updated successfully" });
      } else {
        const { error } = await supabase
          .from("tours")
          .insert([tourData]);

        if (error) throw error;
        toast({ title: "Tour created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error saving tour",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (tour: Tour) => {
    setEditingId(tour.id);
    setFormData({
      title: tour.title,
      description: tour.description || "",
      destination_id: tour.destination_id || "",
      image_url: tour.image_url || "",
      price: tour.price?.toString() || "",
      duration: tour.duration || "",
      max_group_size: tour.max_group_size?.toString() || "",
      min_age: tour.min_age?.toString() || "",
      difficulty_level: tour.difficulty_level || "moderate",
      itinerary: tour.itinerary ? JSON.stringify(tour.itinerary, null, 2) : "",
      included: Array.isArray(tour.included) ? tour.included.join('\n') : "",
      excluded: Array.isArray(tour.excluded) ? tour.excluded.join('\n') : "",
      highlights: Array.isArray(tour.highlights) ? tour.highlights.join('\n') : "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tour?")) return;

    try {
      const { error } = await supabase
        .from("tours")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Tour deleted successfully" });
      fetchData();
    } catch (error: any) {
      toast({
        title: "Error deleting tour",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      destination_id: "",
      image_url: "",
      price: "",
      duration: "",
      max_group_size: "",
      min_age: "",
      difficulty_level: "moderate",
      itinerary: "",
      included: "",
      excluded: "",
      highlights: "",
    });
    setEditingId(null);
  };

  const getDestinationName = (destId: string | null) => {
    if (!destId) return "-";
    const destination = destinations.find((d) => d.id === destId);
    return destination?.name || "-";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Tour
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Tour</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Select
                value={formData.destination_id}
                onValueChange={(value) => setFormData({ ...formData, destination_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest.id} value={dest.id}>
                      {dest.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                type="url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 7 Days"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="max_group_size">Max Group Size</Label>
                <Input
                  id="max_group_size"
                  type="number"
                  placeholder="e.g., 16"
                  value={formData.max_group_size}
                  onChange={(e) => setFormData({ ...formData, max_group_size: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="min_age">Min Age</Label>
                <Input
                  id="min_age"
                  type="number"
                  placeholder="e.g., 18"
                  value={formData.min_age}
                  onChange={(e) => setFormData({ ...formData, min_age: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty_level">Difficulty</Label>
                <Select
                  value={formData.difficulty_level}
                  onValueChange={(value) => setFormData({ ...formData, difficulty_level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="challenging">Challenging</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlights">Highlights (one per line)</Label>
              <Textarea
                id="highlights"
                placeholder="Professional tour guide&#10;All meals included&#10;Luxury accommodation"
                value={formData.highlights}
                onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="included">Included (one per line)</Label>
              <Textarea
                id="included"
                placeholder="Hotel accommodation&#10;Daily breakfast&#10;Airport transfers"
                value={formData.included}
                onChange={(e) => setFormData({ ...formData, included: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excluded">Not Included (one per line)</Label>
              <Textarea
                id="excluded"
                placeholder="International flights&#10;Personal expenses&#10;Travel insurance"
                value={formData.excluded}
                onChange={(e) => setFormData({ ...formData, excluded: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="itinerary">Itinerary (JSON format)</Label>
              <Textarea
                id="itinerary"
                placeholder='[{"title":"Day 1: Arrival","description":"Check-in and welcome dinner"},{"title":"Day 2: City Tour","description":"Explore main attractions"}]'
                value={formData.itinerary}
                onChange={(e) => setFormData({ ...formData, itinerary: e.target.value })}
                rows={4}
                className="font-mono text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Enter itinerary as JSON array with title and description for each day
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingId ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tours.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No tours yet. Add your first one!
              </TableCell>
            </TableRow>
          ) : (
            tours.map((tour) => (
              <TableRow key={tour.id}>
                <TableCell className="font-medium">{tour.title}</TableCell>
                <TableCell>{getDestinationName(tour.destination_id)}</TableCell>
                <TableCell>{tour.price ? `$${tour.price}` : "-"}</TableCell>
                <TableCell>{tour.duration || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(tour)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(tour.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ToursManager;