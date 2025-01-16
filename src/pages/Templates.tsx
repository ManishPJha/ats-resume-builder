import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const templates = [
  {
    id: 1,
    name: 'Classic',
    thumbnail: '/cover_cv_classic.png',
    description:
      'A clean and professional template suitable for all industries.',
    layout: 'classic',
  },
  {
    id: 2,
    name: 'Modern',
    thumbnail: '/cover_cv_modern.jpg',
    description: 'A sleek and contemporary design for tech and creative roles.',
    layout: 'modern',
  },
  {
    id: 3,
    name: 'Minimalist',
    thumbnail: '/cover_cv_minimalist.avif',
    description: 'A simple and elegant template for a minimalist look.',
    layout: 'minimalist',
  },
];

const Templates = () => {
  const navigate = useNavigate();

  const handleTemplateSelect = (layout: string) => {
    // Navigate to the Builder page with the selected template layout
    navigate(`/builder?template=${layout}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Resume Templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => handleTemplateSelect(template.layout)}
            >
              <img
                src={template.thumbnail}
                alt={template.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {template.name}
              </h2>
              <p className="text-gray-600 mb-4">{template.description}</p>
              <button
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-all"
                onClick={() => handleTemplateSelect(template.layout)}
              >
                Use This Template
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
