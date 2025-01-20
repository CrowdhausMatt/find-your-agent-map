import { useEffect, useState } from "react";
import { TabsContent } from "@/components/ui/tabs";
import AgentSocialCard from "@/components/AgentSocialCard";
import { SocialAgent } from "@/types";
import { supabase } from "@/integrations/supabase/client";

const AgentsList = () => {
  const [socialLeaders, setSocialLeaders] = useState<SocialAgent[]>([]);
  const [risingStars, setRisingStars] = useState<SocialAgent[]>([]);
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
        const leadersWithRating = leaders?.map(leader => ({
          ...leader,
          rating: (leader.follower_count * Number(leader.engagement_rate)) / 100,
          tiktok_handle: null // Add default value
        })) || [];

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

        // Add tiktok_handle to rising stars data
        const risingWithTiktok = rising?.map(star => ({
          ...star,
          tiktok_handle: null // Add default value
        })) || [];

        setSocialLeaders(finalLeaders);
        setRisingStars(risingWithTiktok);
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
    </>
  );
};

export default AgentsList;