import { motion } from "framer-motion";

const MetricsSpotlight = () => {
  return (
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
  );
};

export default MetricsSpotlight;