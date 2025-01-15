import { motion } from 'framer-motion';

const tips = [
  {
    id: 1,
    title: 'Use Standard Headings',
    description:
      'Stick to common section headings like "Work Experience," "Education," and "Skills."',
  },
  {
    id: 2,
    title: 'Incorporate Keywords',
    description:
      "Use keywords from the job description to improve your resume's ATS score.",
  },
  {
    id: 3,
    title: 'Avoid Graphics and Tables',
    description:
      'ATS systems cannot parse images, tables, or columns. Use plain text instead.',
  },
  {
    id: 4,
    title: 'Use Bullet Points',
    description:
      'Organize your experience and skills using bullet points for better readability.',
  },
  {
    id: 5,
    title: 'Choose ATS-Friendly Fonts',
    description: 'Use standard fonts like Arial, Calibri, or Times New Roman.',
  },
  {
    id: 6,
    title: 'Save as a PDF',
    description: 'Always save your resume as a PDF to preserve formatting.',
  },
];

const AtsTips = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          ATS Optimization Tips
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {tip.title}
              </h2>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AtsTips;
