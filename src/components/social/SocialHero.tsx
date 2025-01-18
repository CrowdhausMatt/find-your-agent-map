import { NominateAgentDialog } from "./NominateAgentDialog";

export default function SocialHero() {
  return (
    <section className="bg-[#9b87f5] py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
              Social Property Leaders
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
              Discover the most influential property agents on social media. These agents are changing the game with their innovative approach to real estate.
            </p>
          </div>
          <NominateAgentDialog />
        </div>
      </div>
    </section>
  );
}