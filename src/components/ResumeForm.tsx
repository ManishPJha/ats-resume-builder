import { ChangeEvent, useState } from 'react';

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

interface ResumeFormProps {
  onInputChange: (data: FormData) => void;
}

const ResumeForm = ({ onInputChange }: ResumeFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: '',
    experience: [],
    education: [],
    skills: [],
    projects: [],
  });

  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [newEducation, setNewEducation] = useState({
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    onInputChange({ ...formData, [name]: value });
  };

  const addExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.startDate &&
      newExperience.description
    ) {
      const updatedExperience = [...formData.experience, newExperience];
      const updatedFormData = { ...formData, experience: updatedExperience };
      setFormData(updatedFormData);
      setNewExperience({
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      onInputChange(updatedFormData);
    }
  };

  const addEducation = () => {
    if (
      newEducation.degree &&
      newEducation.institution &&
      newEducation.startDate &&
      newEducation.gpa
    ) {
      const updatedEducation = [...formData.education, newEducation];
      const updatedFormData = { ...formData, education: updatedEducation };
      setFormData(updatedFormData);
      setNewEducation({
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        gpa: '',
      });
      onInputChange(updatedFormData);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...formData.skills, newSkill.trim()];
      const updatedFormData = { ...formData, skills: updatedSkills };
      setFormData(updatedFormData);
      setNewSkill('');
      onInputChange(updatedFormData);
    }
  };

  const addProject = () => {
    if (newProject.name && newProject.startDate && newProject.description) {
      const updatedProjects = [...formData.projects, newProject];
      const updatedFormData = { ...formData, projects: updatedProjects };
      setFormData(updatedFormData);
      setNewProject({
        name: '',
        startDate: '',
        endDate: '',
        description: '',
      });
      onInputChange(updatedFormData);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Personal Details
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn Profile URL"
        value={formData.linkedin}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      />

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Summary
      </h2>
      <textarea
        name="summary"
        placeholder="Write a brief summary about yourself..."
        value={formData.summary}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        rows={4}
      />

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Experience
      </h2>
      <div className="space-y-4">
        {formData.experience.map((exp, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
            <p className="text-gray-600">{exp.company}</p>
            <p className="text-gray-600">
              {exp.startDate} - {exp.endDate || 'Present'}
            </p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Job Title"
            value={newExperience.title}
            onChange={(e) =>
              setNewExperience({ ...newExperience, title: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Start Date (e.g., Oct 2021)"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="End Date (e.g., Present)"
            value={newExperience.endDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, endDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Job Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          <button
            onClick={addExperience}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Add Experience
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Education
      </h2>
      <div className="space-y-4">
        {formData.education.map((edu, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              {edu.degree}
            </h3>
            <p className="text-gray-600">{edu.institution}</p>
            <p className="text-gray-600">
              {edu.startDate} - {edu.endDate || 'Present'}
            </p>
            <p className="text-gray-600">GPA: {edu.gpa}</p>
          </div>
        ))}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Degree (e.g., B.Tech in Computer Science)"
            value={newEducation.degree}
            onChange={(e) =>
              setNewEducation({ ...newEducation, degree: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Institution (e.g., RK University)"
            value={newEducation.institution}
            onChange={(e) =>
              setNewEducation({ ...newEducation, institution: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Start Date (e.g., 2017)"
            value={newEducation.startDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, startDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="End Date (e.g., 2021)"
            value={newEducation.endDate}
            onChange={(e) =>
              setNewEducation({ ...newEducation, endDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="GPA (e.g., 7.22)"
            value={newEducation.gpa}
            onChange={(e) =>
              setNewEducation({ ...newEducation, gpa: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={addEducation}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Add Education
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Skills</h2>
      <div className="space-y-4">
        {formData.skills.map((skill, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            {skill}
          </div>
        ))}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={addSkill}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Add
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Projects
      </h2>
      <div className="space-y-4">
        {formData.projects.map((project, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              {project.name}
            </h3>
            <p className="text-gray-600">
              {project.startDate} - {project.endDate || 'Present'}
            </p>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) =>
              setNewProject({ ...newProject, name: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="Start Date (e.g., Dec 2021)"
            value={newProject.startDate}
            onChange={(e) =>
              setNewProject({ ...newProject, startDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="End Date (e.g., Present)"
            value={newProject.endDate}
            onChange={(e) =>
              setNewProject({ ...newProject, endDate: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
          />
          <button
            onClick={addProject}
            className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Add Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
