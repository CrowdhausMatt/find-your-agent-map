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
            <h3 className="mb-4 text-xl font-semibold">Expands Reach and Visibility</h3>
            <p className="text-gray-600">
              Social media platforms enable agents to showcase listings to a broader audience beyond traditional channels. With targeted ads, hashtags, and location-based posts, agents can attract local and global buyers, ensuring properties reach the right audience quickly.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 text-xl font-semibold">Enhances Personal Branding and Trust</h3>
            <p className="text-gray-600">
              Real estate is a relationship-driven industry, and social media allows agents to build trust by showcasing expertise, personality, and success stories. Platforms like Knok Knok Instagram, and TikTok provide spaces to share testimonials, market insights, and property tours.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="rounded-lg bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 text-xl font-semibold">Enables Engaging Content Marketing</h3>
            <p className="text-gray-600">
              From 360-degree property tours to "property porn" reels and buyer testimonials, social media offers dynamic formats to capture attention. Engaging, interactive content drives inquiries and builds excitement around listings, making properties stand out in a competitive market.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MetricsSpotlight;