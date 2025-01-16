export interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  summary: string;
  photo?: string;
  jobTitle?: string;
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

export interface ResumeFormProps {
  onInputChange: (data: FormData) => void;
  formData: FormData;
  currentStep: number;
}

export interface ResumePreviewProps {
  formData: FormData;
  template: string;
}

export interface MinimalistTemplateProps {
  formData: FormData;
}

export interface ProfessionalTemplateProps {
  formData: FormData;
}

export interface ClassicTemplateProps {
  formData: FormData;
}

export type Templates = 'classic' | 'modern' | 'minimalist';

export interface TemplatePreviewProps {
  formData: FormData;
  template: Templates;
}
