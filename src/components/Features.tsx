import { motion } from 'framer-motion';

const features = [
  {
    icon: '🚀',
    title: 'ATS-Friendly Templates',
    description:
      'Professionally designed templates that are optimized for ATS.',
  },
  {
    icon: '🎨',
    title: 'Customizable Designs',
    description: 'Easily customize fonts, colors, and layouts.',
  },
  {
    icon: '📄',
    title: 'Real-Time Preview',
    description: 'See your resume update as you type.',
  },
];

const Features = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-white py-12"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Why Choose ResumeCraft Pro?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="bg-gray-50 p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Features;
