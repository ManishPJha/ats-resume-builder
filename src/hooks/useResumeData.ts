import { useQuery } from '@tanstack/react-query';

// Define the type for the resume data
interface ResumeData {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string[];
  education: string[];
  skills: string[];
}

// Mock API function to fetch resume data
const fetchResumeData = async (): Promise<ResumeData> => {
  const response = await fetch('/api/resume-data');
  if (!response.ok) throw new Error('Failed to fetch resume data');
  return response.json();
};

// React Query hook
export const useResumeData = () => {
  return useQuery<ResumeData, Error>({
    queryKey: ['resumeData'], // Unique key for the query
    queryFn: fetchResumeData, // Function to fetch data
  });
};
