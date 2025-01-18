import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const SocialIndex = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 to-blue-500 py-20 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              KnokKnok Social Property Agent Index
            </h1>
            <p className="mb-8 text-xl opacity-90">
              Celebrating the Game-Changers in Real Estate
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100"
            >
              Nominate an Agent
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="leaders" className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="leaders">The Social Leaders</TabsTrigger>
              <TabsTrigger value="rising">Rising Stars</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Metrics Spotlight */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Why Social Matters</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Engagement Over Followers</h3>
              <p className="text-gray-600">
                Quality interactions matter more than quantity of followers
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Digital First</h3>
              <p className="text-gray-600">
                80% of buyers browse social media before viewing properties
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="rounded-lg bg-white p-6 shadow-lg"
            >
              <h3 className="mb-4 text-xl font-semibold">Trust Building</h3>
              <p className="text-gray-600">
                Social presence builds credibility and trust with potential clients
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SocialIndex;