import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface NominationFormData {
  name: string;
  agency: string;
  social_handle: string;
  area: string;
  about: string;
}

export function NominateAgentDialog() {
  const [open, setOpen] = useState(false);
  const form = useForm<NominationFormData>();

  const onSubmit = async (data: NominationFormData) => {
    try {
      const { error } = await supabase
        .from('social_agents')
        .insert({
          name: data.name,
          agency: data.agency,
          instagram_handle: data.social_handle,
          email: `${data.social_handle}@placeholder.com`,
          area: data.area,
          about: data.about,
          is_rising_star: true // New nominations start as rising stars
        });

      if (error) throw error;

      toast.success("Agent nominated successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to nominate agent. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="px-8">
          Nominate Agent
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nominate an Agent</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              rules={{ required: "Agent name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agent name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="agency"
              rules={{ required: "Agency name is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agency</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter agency name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="area"
              rules={{ required: "Area is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Area</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter area (e.g., Mayfair, Chelsea)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social_handle"
              rules={{ required: "Social media handle is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Handle</FormLabel>
                  <FormControl>
                    <Input placeholder="@handle" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="about"
              rules={{ required: "Brief description is required" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief description of the agent" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Submit Nomination</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}