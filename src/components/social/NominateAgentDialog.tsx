import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

interface NominationFormData {
  name: string;
  agency: string;
  social_handle: string;
  video?: FileList;
}

export function NominateAgentDialog() {
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const form = useForm<NominationFormData>();

  const onSubmit = async (data: NominationFormData) => {
    try {
      setIsUploading(true);

      // First create the social agent with both flags set to false
      const { data: agent, error } = await (supabase
        .from('social_agents' as any)
        .insert({
          name: data.name,
          agency: data.agency,
          instagram_handle: data.social_handle,
          email: `${data.social_handle}@placeholder.com`,
          is_rising_star: false,
          is_leader: false
        } as any)
        .select()
        .single() as any);

      if (error) throw error;

      // If there's a video, upload it
      if (data.video?.[0]) {
        const formData = new FormData();
        formData.append('video', data.video[0]);
        formData.append('agentId', agent.id);

        const response = await supabase.functions.invoke('upload-agent-video', {
          body: formData
        });

        if (response.error) {
          throw new Error('Failed to upload video');
        }
      }

      toast.success("Agent nominated successfully!");
      setOpen(false);
      form.reset();
    } catch (error) {
      toast.error("Failed to nominate agent. Please try again.");
      console.error('Nomination error:', error);
    } finally {
      setIsUploading(false);
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
              name="video"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <FormLabel>Video (optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="video/*"
                        onChange={(e) => onChange(e.target.files)}
                        {...field}
                      />
                      {value && value[0] && (
                        <span className="text-sm text-gray-500">
                          {value[0].name}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isUploading}
            >
              {isUploading ? (
                <span className="flex items-center gap-2">
                  <Upload className="w-4 h-4 animate-spin" />
                  Uploading...
                </span>
              ) : (
                'Submit Nomination'
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}