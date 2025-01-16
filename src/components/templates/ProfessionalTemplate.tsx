import React from 'react';

import { ProfessionalTemplateProps } from '../types';

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({
  formData,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg flex">
      {/* Left Column (Photo and Contact Info) */}
      <div className="w-1/3 bg-gray-100 p-6 rounded-lg">
        <div className="text-center mb-6">
          <img
            src={formData.photo || '/portrait_3.png'}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">{formData.name}</h1>
          <p className="text-lg text-gray-600">{formData.jobTitle}</p>
        </div>

        {/* Contact Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Contact</h2>
          <p className="text-gray-600">{formData.email}</p>
          <p className="text-gray-600">{formData.phone}</p>
          <p className="text-gray-600">{formData.location}</p>
          <a href={formData.linkedin} className="text-blue-500 hover:underline">
            LinkedIn
          </a>
        </div>

        {/* Skills */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-600">
            {formData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column (Main Content) */}
      <div className="w-2/3 pl-8">
        {/* Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
          <p className="text-gray-600">{formData.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Experience
          </h2>
          {formData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {exp.title}
              </h3>
              <p className="text-gray-600">
                {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
              </p>
              <p className="text-gray-600">{exp.description}</p>
            </div>
          ))}
        </div>

        {/* Education */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Education
          </h2>
          {formData.education.map((edu) => (
            <div key={edu.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {edu.degree}
              </h3>
              <p className="text-gray-600">
                {edu.institution} | {edu.startDate} - {edu.endDate || 'Present'}
              </p>
              <p className="text-gray-600">GPA: {edu.gpa}</p>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Projects</h2>
          {formData.projects.map((project) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {project.name}
              </h3>
              <p className="text-gray-600">
                {project.startDate} - {project.endDate || 'Present'}
              </p>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
