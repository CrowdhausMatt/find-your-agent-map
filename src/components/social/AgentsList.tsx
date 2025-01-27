import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import AgentSocialCard from "@/components/AgentSocialCard";
import PropertyOfWeekCard from "@/components/social/PropertyOfWeekCard";
import { SocialAgent, PropertyOfWeek } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const AgentsList = () => {
  const [socialLeaders, setSocialLeaders] = useState<SocialAgent[]>([]);
  const [risingStars, setRisingStars] = useState<SocialAgent[]>([]);
  const [propertyOfWeek, setPropertyOfWeek] = useState<PropertyOfWeek[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        // Fetch social leaders
        const { data: leaders, error: leadersError } = await supabase
          .from('social_agents')
          .select('*')
          .eq('is_leader', true);

        if (leadersError) throw leadersError;

        // Calculate rating and sort leaders
        const leadersWithRating = leaders?.map(leader => {
          // Get the public URL for the video if it exists
          const videoUrl = leader.video_url 
            ? supabase.storage
                .from('agent-videos')
                .getPublicUrl(leader.video_url.split('/').pop() || '')
                .data.publicUrl
            : null;

          return {
            ...leader,
            rating: (leader.follower_count * Number(leader.engagement_rate)) / 100,
            tiktok_handle: null, // Add default value
            video_url: videoUrl
          };
        }) || [];

        // Sort by rating
        const sortedLeaders = leadersWithRating.sort((a, b) => (b.rating || 0) - (a.rating || 0));

        // Find top 5 engagement rates
        const topEngagementAgents = new Set(
          [...leaders || []].sort((a, b) => Number(b.engagement_rate) - Number(a.engagement_rate))
            .slice(0, 5)
            .map(agent => agent.id)
        );

        // Add isTopEngagement flag
        const finalLeaders = sortedLeaders.map(leader => ({
          ...leader,
          isTopEngagement: topEngagementAgents.has(leader.id)
        }));

        // Fetch rising stars
        const { data: rising, error: risingError } = await supabase
          .from('social_agents')
          .select('*')
          .eq('is_rising_star', true)
          .order('nomination_date', { ascending: false });

        if (risingError) throw risingError;

        // Add tiktok_handle to rising stars data and process video URLs
        const risingWithTiktok = rising?.map(star => {
          // Get the public URL for the video if it exists
          const videoUrl = star.video_url 
            ? supabase.storage
                .from('agent-videos')
                .getPublicUrl(star.video_url.split('/').pop() || '')
                .data.publicUrl
            : null;

          return {
            ...star,
            tiktok_handle: null, // Add default value
            video_url: videoUrl
          };
        }) || [];

        setSocialLeaders(finalLeaders);
        setRisingStars(risingWithTiktok);

        // Fetch property of the week
        const { data: properties, error: propertiesError } = await supabase
          .from('property_of_week')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);

        if (propertiesError) throw propertiesError;

        setPropertyOfWeek(properties || []);
      } catch (error) {
        console.error('Error fetching agents:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (isLoading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <>
      <TabsContent value="leaders">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {socialLeaders.map((agent, index) => (
            <AgentSocialCard 
              key={agent.id} 
              agent={agent} 
              ranking={index + 1}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="rising">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {risingStars.map((agent) => (
            <AgentSocialCard key={agent.id} agent={agent} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="property-of-week">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {propertyOfWeek.map((property) => (
            <PropertyOfWeekCard key={property.id} property={property} />
          ))}
        </div>
      </TabsContent>
    </>
  );
};

export default AgentsList;