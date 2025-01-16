import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import MinimalistTemplate from './MinimalistTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';
import ClassicTemplate from './ClassicTemplate';

import { TemplatePreviewProps } from '../types';

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  formData,
  template,
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  // Download as PNG
  const downloadAsPNG = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current, {
        scale: 3, // Increase scale for better quality (e.g., 3x)
        useCORS: true, // Enable cross-origin images
        logging: true, // Debugging
        allowTaint: true, // Allow tainted images
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0); // Highest quality
        const link = document.createElement('a');
        link.href = imgData;
        link.download = `${formData.name}_Resume.png`;
        link.click();
      });
    }
  };

  // Download as PDF with multi-page support
  const downloadAsPDF = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current, {
        scale: 3, // Increase scale for better quality
        useCORS: true, // Enable cross-origin images
        logging: true, // Debugging
        allowTaint: true, // Allow tainted images
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0); // Highest quality
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        // Calculate the number of pages needed
        const pageHeight = 297; // A4 height in mm
        let position = 0; // Track the position for multi-page support

        // Add the first page
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        position -= pageHeight;

        // Add additional pages if content exceeds the first page
        while (position > -imgHeight) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          position -= pageHeight;
        }

        // Save the PDF
        pdf.save(`${formData.name}_Resume.pdf`);
      });
    }
  };

  const resumeTemplates = {
    classic: <ClassicTemplate formData={formData} />,
    modern: <ProfessionalTemplate formData={formData} />,
    minimalist: <MinimalistTemplate formData={formData} />,
  };

  return (
    <div>
      {/* Download Buttons */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={downloadAsPNG}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Download as PNG
        </button>
        <button
          onClick={downloadAsPDF}
          className="bg-primary text-white px-4 py-2 rounded-lg"
        >
          Download as PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div ref={resumeRef}>{resumeTemplates[template]}</div>
    </div>
  );
};

export default TemplatePreview;
