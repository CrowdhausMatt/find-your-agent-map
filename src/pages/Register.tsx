import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { geocodeLocation } from '@/utils/geocoding';

interface RegisterFormData {
  name: string;
  agency: string;
  email: string;
  about: string;
  sweetSpot: string;
  area: string;
  photo: FileList;
}

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      let photoUrl = null;
      
      // Upload photo if provided
      if (data.photo && data.photo[0]) {
        const file = data.photo[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('user-images')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabase.storage
          .from('user-images')
          .getPublicUrl(filePath);

        photoUrl = publicUrl;
      }

      // Geocode the area to get coordinates
      const [latitude, longitude] = await geocodeLocation(data.area);

      // Insert the new agent
      const { error } = await (supabase
        .from('agents' as any)
        .insert({
          name: data.name,
          agency: data.agency,
          email: data.email,
          about: data.about,
          sweet_spot: data.sweetSpot,
          area: data.area,
          latitude,
          longitude,
          photo: photoUrl,
        } as any) as any);

      if (error) throw error;

      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to register. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Register as an Agent</h1>
          <p className="text-muted-foreground mt-2">Join our network of property agents</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Agency"
                {...register('agency', { required: 'Agency is required' })}
              />
              {errors.agency && (
                <p className="text-sm text-destructive mt-1">{errors.agency.message}</p>
              )}
            </div>

            <div>
              <Input
                type="email"
                placeholder="Email"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Textarea
                placeholder="About you"
                {...register('about', { required: 'About is required' })}
              />
              {errors.about && (
                <p className="text-sm text-destructive mt-1">{errors.about.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Sweet spot (e.g., '£750,000 - £1,500,000')"
                {...register('sweetSpot', { required: 'Sweet spot is required' })}
              />
              {errors.sweetSpot && (
                <p className="text-sm text-destructive mt-1">{errors.sweetSpot.message}</p>
              )}
            </div>

            <div>
              <Input
                placeholder="Area covered (e.g., 'Hackney')"
                {...register('area', { required: 'Area is required' })}
              />
              {errors.area && (
                <p className="text-sm text-destructive mt-1">{errors.area.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Profile Image
              </label>
              <Input
                type="file"
                accept="image/*"
                {...register('photo', { required: 'Photo is required' })}
              />
              {errors.photo && (
                <p className="text-sm text-destructive mt-1">{errors.photo.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/')}>
              Cancel
            </Button>
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;