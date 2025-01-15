import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { motion } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }[];
  skills: string[];
  projects: {
    name: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

interface ResumePreviewProps {
  formData: FormData;
}

const ResumePreview = ({ formData }: ResumePreviewProps) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${formData.name}_Resume`,
    onAfterPrint: () => alert('Resume downloaded successfully!'),
  });

  // Check if any data is entered
  const isDataEntered =
    formData.name ||
    formData.email ||
    formData.phone ||
    formData.experience.length > 0 ||
    formData.education.length > 0 ||
    formData.skills.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div
        ref={componentRef}
        className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
      >
        {isDataEntered ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {formData.name}
            </h1>
            <p className="text-gray-600 mb-4">
              {formData.location} ■ {formData.email} □ {formData.phone}
            </p>
            <p className="text-gray-600 mb-4">
              LinkedIn:{' '}
              <a href={formData.linkedin} className="text-blue-500">
                {formData.linkedin}
              </a>
            </p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Summary
            </h2>
            <p className="text-gray-600">{formData.summary}</p>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Experience
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {formData.experience.map((exp, index) => (
                <li key={index}>
                  <strong>{exp.title}</strong> at {exp.company} ({exp.startDate}{' '}
                  - {exp.endDate || 'Present'})<p>{exp.description}</p>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Education
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {formData.education.map((edu, index) => (
                <li key={index}>
                  <strong>{edu.degree}</strong> from {edu.institution} (
                  {edu.startDate} - {edu.endDate || 'Present'})
                  <p>GPA: {edu.gpa}</p>
                </li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Skills
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {formData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
              Projects
            </h2>
            <ul className="list-disc list-inside text-gray-600">
              {formData.projects.map((project, index) => (
                <li key={index}>
                  <strong>{project.name}</strong> ({project.startDate} -{' '}
                  {project.endDate || 'Present'})<p>{project.description}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">
              No Preview Available
            </h2>
            <p>Start filling out the form to see your resume preview.</p>
          </div>
        )}
      </div>

      {/* Download Button (only show if data is entered) */}
      {isDataEntered && (
        <button
          onClick={() => handlePrint()}
          className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
        >
          Download as PDF
        </button>
      )}
    </motion.div>
  );
};

export default ResumePreview;
