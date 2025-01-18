import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SocialHero = () => {
  return (
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
  );
};

export default SocialHero;