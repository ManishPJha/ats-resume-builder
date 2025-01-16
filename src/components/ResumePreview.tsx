import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { ResumePreviewProps } from './types';

const ResumePreview: React.FC<ResumePreviewProps> = ({
  formData,
  template,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);

  // Export canvas as PDF
  const handleDownloadPDF = () => {
    const input = componentRef.current;

    if (!input) return;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png', 100);
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 size in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('download.pdf');
    });
  };

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${formData.name}_Resume`,
    onAfterPrint: () => alert('Resume downloaded successfully!'),
  });

  // Template-specific styles
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return 'bg-gray-800 text-white';
      case 'minimalist':
        return 'bg-white text-gray-800 border-2 border-gray-200';
      default:
        return 'bg-white text-gray-800'; // Classic template
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div
        ref={componentRef}
        className={`p-8 rounded-lg shadow-lg ${getTemplateStyles()}`}
      >
        <h1 className="text-3xl font-bold mb-2">{formData.name}</h1>
        <p className="mb-4">
          {formData.location} ■ {formData.email} □ {formData.phone}
        </p>
        <p className="mb-4">
          LinkedIn:{' '}
          <a href={formData.linkedin} className="text-blue-500">
            {formData.linkedin}
          </a>
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Summary</h2>
        <p className="mb-4">{formData.summary}</p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Experience</h2>
        <ul className="list-disc list-inside">
          {formData.experience.map((exp) => (
            <li key={exp.id}>
              <strong>{exp.title}</strong> at {exp.company} ({exp.startDate} -{' '}
              {exp.endDate || 'Present'})<p>{exp.description}</p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Education</h2>
        <ul className="list-disc list-inside">
          {formData.education.map((edu) => (
            <li key={edu.id}>
              <strong>{edu.degree}</strong> from {edu.institution} (
              {edu.startDate} - {edu.endDate || 'Present'})<p>GPA: {edu.gpa}</p>
            </li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Skills</h2>
        <ul className="list-disc list-inside">
          {formData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Projects</h2>
        <ul className="list-disc list-inside">
          {formData.projects.map((project) => (
            <li key={project.id}>
              <strong>{project.name}</strong> ({project.startDate} -{' '}
              {project.endDate || 'Present'})<p>{project.description}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Download Button */}
      <button
        onClick={() => handleDownloadPDF()}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
      >
        Download as PDF
      </button>
      {/* Print Button */}
      <button
        onClick={() => handlePrint()}
        className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all"
      >
        Print Result
      </button>
    </motion.div>
  );
};

export default ResumePreview;
