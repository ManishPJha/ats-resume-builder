import { MinimalistTemplateProps } from '../types';

const MinimalistTemplate: React.FC<MinimalistTemplateProps> = ({
  formData,
}) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{formData.name}</h1>
        <p className="text-lg text-gray-600">
          {formData.email} | {formData.phone}
        </p>
      </div>

      {/* Summary */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Summary</h2>
        <p className="text-gray-600">{formData.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Experience</h2>
        {formData.experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
            <p className="text-gray-600">
              {exp.company} | {exp.startDate} - {exp.endDate || 'Present'}
            </p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Education</h2>
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

      {/* Skills */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
        <ul className="list-disc list-inside text-gray-600">
          {formData.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
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
  );
};

export default MinimalistTemplate;
