import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ResumeForm from '../components/ResumeForm';

import { FormData, Templates } from '../components/types';
import TemplatePreview from '../components/templates/TemplatePreview';

// Define a union type for valid keys
type FormDataKey = 'experience' | 'education' | 'skills' | 'projects';

const defaultValues = {
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
};

const Builder = () => {
  const [formData, setFormData] = useState<FormData>(defaultValues);

  const [selectedTemplate, setSelectedTemplate] =
    useState<Templates>('classic'); // Default template
  const [currentStep, setCurrentStep] = useState(0); // Current step in the form

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const template = queryParams.get('template') || 'classic'; // Default to 'classic'

  // Define steps
  const steps = [
    'Personal Details',
    'Experience',
    'Education',
    'Skills',
    'Projects',
    'Summary',
  ];

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

  // Go to the next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  useEffect(() => {
    // console.log(`Selected template: ${template}`);
    if (template) setSelectedTemplate(template as Templates);
  }, [template]);

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

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <p className="text-gray-800">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
            </p>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ResumeForm
              onInputChange={setFormData}
              formData={formData}
              currentStep={currentStep}
            />
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="resume-sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <TemplatePreview
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
