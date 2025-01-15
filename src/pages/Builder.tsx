import { useState } from 'react';
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

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Resume Builder
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Form */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ResumeForm onInputChange={setFormData} />
          </div>

          {/* Resume Preview */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <ResumePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
