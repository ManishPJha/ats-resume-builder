import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-primary py-12"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Build Your Resume?
        </h2>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/builder"
            className="bg-accent text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default CTA;
