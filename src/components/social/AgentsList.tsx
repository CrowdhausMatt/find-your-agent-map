import { Agent } from "@/types";
import { TabsContent } from "@/components/ui/tabs";
import AgentSocialCard from "@/components/AgentSocialCard";

interface AgentsListProps {
  socialLeaders: Agent[];
  risingStars: Agent[];
}

const AgentsList = ({ socialLeaders, risingStars }: AgentsListProps) => {
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