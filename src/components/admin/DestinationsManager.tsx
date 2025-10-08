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

interface Destination {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  price: number | null;
  duration: string | null;
}

const DestinationsManager = () => {
  const { toast } = useToast();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    duration: "",
  });

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from("destinations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setDestinations(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching destinations",
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
      const destinationData = {
        name: formData.name,
        description: formData.description || null,
        image_url: formData.image_url || null,
        price: formData.price ? parseFloat(formData.price) : null,
        duration: formData.duration || null,
      };

      if (editingId) {
        const { error } = await supabase
          .from("destinations")
          .update(destinationData)
          .eq("id", editingId);

        if (error) throw error;
        toast({ title: "Destination updated successfully" });
      } else {
        const { error } = await supabase
          .from("destinations")
          .insert([destinationData]);

        if (error) throw error;
        toast({ title: "Destination created successfully" });
      }

      setDialogOpen(false);
      resetForm();
      fetchDestinations();
    } catch (error: any) {
      toast({
        title: "Error saving destination",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingId(destination.id);
    setFormData({
      name: destination.name,
      description: destination.description || "",
      image_url: destination.image_url || "",
      price: destination.price?.toString() || "",
      duration: destination.duration || "",
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;

    try {
      const { error } = await supabase
        .from("destinations")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Destination deleted successfully" });
      fetchDestinations();
    } catch (error: any) {
      toast({
        title: "Error deleting destination",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image_url: "",
      price: "",
      duration: "",
    });
    setEditingId(null);
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
            Add Destination
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit" : "Add"} Destination</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {destinations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-muted-foreground">
                No destinations yet. Add your first one!
              </TableCell>
            </TableRow>
          ) : (
            destinations.map((destination) => (
              <TableRow key={destination.id}>
                <TableCell className="font-medium">{destination.name}</TableCell>
                <TableCell>{destination.price ? `$${destination.price}` : "-"}</TableCell>
                <TableCell>{destination.duration || "-"}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(destination)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(destination.id)}
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

export default DestinationsManager;