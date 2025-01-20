import { motion } from 'framer-motion';

const FullPageLoader = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-300 to-blue-100 bg-opacity-75 z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full"
      />
    </motion.div>
  );
};

export default FullPageLoader;
