import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Droppable from '../components/Droppable';
import ResumeForm from '../components/ResumeForm';
import ResumePreview from '../components/ResumePreview';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }[];
  skills: string[];
  projects: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
}

// Define a union type for valid keys
type FormDataKey = 'experience' | 'education' | 'skills' | 'projects';

const Builder = () => {
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

  const [selectedTemplate, setSelectedTemplate] = useState('classic'); // Default template

  // Handle drag-and-drop for sections
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Define valid sections
    const sections: FormDataKey[] = [
      'experience',
      'education',
      'skills',
      'projects',
    ];

    // Get the source and destination sections
    const sourceSection = sections[source.index] as FormDataKey;
    const destinationSection = sections[destination.index] as FormDataKey;

    // Reorder sections
    const newFormData = { ...formData };
    const [movedSection] = newFormData[sourceSection].splice(source.index, 1);
    newFormData[destinationSection].splice(
      destination.index,
      0,
      movedSection as string
    );

    setFormData(newFormData);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Resume Builder
        </h1>

        {/* Template Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Select Template
          </h2>
          <div className="flex gap-4">
            <button
              onClick={() => setSelectedTemplate('classic')}
              className={`px-4 py-2 rounded-lg ${
                selectedTemplate === 'classic'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              Classic
            </button>
            <button
              onClick={() => setSelectedTemplate('modern')}
              className={`px-4 py-2 rounded-lg ${
                selectedTemplate === 'modern'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              Modern
            </button>
            <button
              onClick={() => setSelectedTemplate('minimalist')}
              className={`px-4 py-2 rounded-lg ${
                selectedTemplate === 'minimalist'
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-800'
              }`}
            >
              Minimalist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ResumeForm onInputChange={setFormData} formData={formData} />
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="resume-sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <ResumePreview
                      formData={formData}
                      template={selectedTemplate}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
