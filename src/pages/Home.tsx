import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4"
        >
          Create ATS-Optimized Resumes in Minutes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8"
        >
          Land your dream job with resumes designed to beat Applicant Tracking
          Systems.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            to="/builder"
            className="bg-accent text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-all"
          >
            Get Started for Free
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <Features />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Call-to-Action Section */}
      <CTA />
    </div>
  );
};

export default Home;
