import { ChangeEvent, useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';

import Droppable from './Droppable';

import { ResumeFormProps } from './types';

const ResumeForm: React.FC<ResumeFormProps> = ({
  onInputChange,
  formData,
  currentStep,
}) => {
  const [newExperience, setNewExperience] = useState({
    id: `exp-${Date.now()}`,
    title: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [newEducation, setNewEducation] = useState({
    id: `edu-${Date.now()}`,
    degree: '',
    institution: '',
    startDate: '',
    endDate: '',
    gpa: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newProject, setNewProject] = useState({
    id: `proj-${Date.now()}`,
    name: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    onInputChange(updatedFormData); // Update formData in the Builder component
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
      onInputChange(updatedFormData); // Update formData in the Builder component
      setNewExperience({
        id: `exp-${Date.now()}`,
        title: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
      });
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
      onInputChange(updatedFormData); // Update formData in the Builder component
      setNewEducation({
        id: `edu-${Date.now()}`,
        degree: '',
        institution: '',
        startDate: '',
        endDate: '',
        gpa: '',
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = [...formData.skills, newSkill.trim()];
      const updatedFormData = { ...formData, skills: updatedSkills };
      onInputChange(updatedFormData); // Update formData in the Builder component
      setNewSkill('');
    }
  };

  const addProject = () => {
    if (newProject.name && newProject.startDate && newProject.description) {
      const updatedProjects = [...formData.projects, newProject];
      const updatedFormData = { ...formData, projects: updatedProjects };
      onInputChange(updatedFormData); // Update formData in the Builder component
      setNewProject({
        id: `proj-${Date.now()}`,
        name: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  // Handle drag-and-drop for experience, education, and projects
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination, type } = result;

    if (type === 'experience') {
      const updatedExperience = [...formData.experience];
      const [movedExperience] = updatedExperience.splice(source.index, 1);
      updatedExperience.splice(destination.index, 0, movedExperience);
      const updatedFormData = { ...formData, experience: updatedExperience };
      onInputChange(updatedFormData); // Update formData in the Builder component
    } else if (type === 'education') {
      const updatedEducation = [...formData.education];
      const [movedEducation] = updatedEducation.splice(source.index, 1);
      updatedEducation.splice(destination.index, 0, movedEducation);
      const updatedFormData = { ...formData, education: updatedEducation };
      onInputChange(updatedFormData); // Update formData in the Builder component
    } else if (type === 'projects') {
      const updatedProjects = [...formData.projects];
      const [movedProject] = updatedProjects.splice(source.index, 1);
      updatedProjects.splice(destination.index, 0, movedProject);
      const updatedFormData = { ...formData, projects: updatedProjects };
      onInputChange(updatedFormData); // Update formData in the Builder component
    }
  };

  // Render the current step's form section
  const renderStep = () => {
    switch (currentStep) {
      case 0: // Personal Details
        return (
          <>
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
          </>
        );
      case 1: // Experience
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Experience
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="experience" type="experience">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formData.experience.map((exp, index) => (
                      <Draggable
                        key={exp.id}
                        draggableId={exp.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 p-4 rounded-lg mb-4"
                          >
                            <h3 className="text-lg font-semibold text-gray-800">
                              {exp.title}
                            </h3>
                            <p className="text-gray-600">{exp.company}</p>
                            <p className="text-gray-600">
                              {exp.startDate} - {exp.endDate || 'Present'}
                            </p>
                            <p className="text-gray-600">{exp.description}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
                  setNewExperience({
                    ...newExperience,
                    company: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., Oct 2021)"
                value={newExperience.startDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    startDate: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="End Date (e.g., Present)"
                value={newExperience.endDate}
                onChange={(e) =>
                  setNewExperience({
                    ...newExperience,
                    endDate: e.target.value,
                  })
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
          </>
        );
      case 2: // Education
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Education
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="education" type="education">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formData.education.map((edu, index) => (
                      <Draggable
                        key={edu.id}
                        draggableId={edu.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 p-4 rounded-lg mb-4"
                          >
                            <h3 className="text-lg font-semibold text-gray-800">
                              {edu.degree}
                            </h3>
                            <p className="text-gray-600">{edu.institution}</p>
                            <p className="text-gray-600">
                              {edu.startDate} - {edu.endDate || 'Present'}
                            </p>
                            <p className="text-gray-600">GPA: {edu.gpa}</p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
                  setNewEducation({
                    ...newEducation,
                    institution: e.target.value,
                  })
                }
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="text"
                placeholder="Start Date (e.g., 2017)"
                value={newEducation.startDate}
                onChange={(e) =>
                  setNewEducation({
                    ...newEducation,
                    startDate: e.target.value,
                  })
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
          </>
        );
      case 3: // Skills
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Skills
            </h2>
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
          </>
        );
      case 4: // Projects
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Projects
            </h2>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="projects" type="projects">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {formData.projects.map((project, index) => (
                      <Draggable
                        key={project.id}
                        draggableId={project.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-gray-50 p-4 rounded-lg mb-4"
                          >
                            <h3 className="text-lg font-semibold text-gray-800">
                              {project.name}
                            </h3>
                            <p className="text-gray-600">
                              {project.startDate} -{' '}
                              {project.endDate || 'Present'}
                            </p>
                            <p className="text-gray-600">
                              {project.description}
                            </p>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
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
          </>
        );
      case 5: // Summary
        return (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
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
          </>
        );
      default:
        return null;
    }
  };

  return <div className="space-y-6">{renderStep()}</div>;
};

export default ResumeForm;
