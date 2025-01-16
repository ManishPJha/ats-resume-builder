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

  // Check if form data is empty
  const isFormEmpty =
    !formData.name &&
    !formData.email &&
    !formData.phone &&
    !formData.summary &&
    formData.experience.length === 0 &&
    formData.education.length === 0 &&
    formData.skills.length === 0 &&
    formData.projects.length === 0;

  const addWatermarkToCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Set watermark text properties
      ctx.font = '48px Arial';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Rotate the watermark text and repeat it across the canvas
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((-45 * Math.PI) / 180);

      // Repeat the watermark across the entire canvas with spacing
      const watermarkText = 'ResumeCraft Pro';
      const textWidth = ctx.measureText(watermarkText).width; // Measure the width of the watermark text
      const horizontalSpacing = textWidth * 1.2; // Add horizontal spacing (2x the text width)
      const verticalSpacing = 200; // Add vertical spacing (200px)

      for (let x = -canvas.width; x < canvas.width; x += horizontalSpacing) {
        for (let y = -canvas.height; y < canvas.height; y += verticalSpacing) {
          ctx.fillText(watermarkText, x, y);
        }
      }

      ctx.restore();
    }
  };

  // Download as PNG
  const downloadAsPNG = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current, {
        scale: 3, // Increase scale for better quality (e.g., 3x)
        useCORS: true, // Enable cross-origin images
        logging: true, // Debugging
        allowTaint: true, // Allow tainted images
      }).then((canvas) => {
        // Add watermark to the canvas
        addWatermarkToCanvas(canvas);

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
        // Add watermark to the canvas
        addWatermarkToCanvas(canvas);

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
          disabled={isFormEmpty}
          className={`bg-primary text-white px-4 py-2 rounded-lg ${isFormEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Download as PNG
        </button>
        <button
          onClick={downloadAsPDF}
          disabled={isFormEmpty}
          className={`bg-primary text-white px-4 py-2 rounded-lg ${isFormEmpty ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Download as PDF
        </button>
      </div>

      {/* Resume Preview */}
      <div ref={resumeRef}>
        {isFormEmpty ? (
          <div className="bg-gray-100 p-8 rounded-lg shadow-lg text-center h-[14rem]">
            <p className="text-gray-600">
              No data available. Please fill in the form to preview your resume.
            </p>
          </div>
        ) : (
          <>{resumeTemplates[template]}</>
        )}
      </div>
    </div>
  );
};

export default TemplatePreview;
