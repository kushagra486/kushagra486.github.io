import { DocumentViewer } from '@/components/apps/DocumentViewer';

export function ResumeViewer() {
  return (
    <DocumentViewer
      title="Resume"
      fileUrl="/resume/Kushagra_Gupta_Resume.pdf"
      fileName="Kushagra_Gupta_Resume.pdf"
      fileSizeLabel="1 page"
      description="A concise, 1-page summary of skills, experience, and top projects."
    />
  );
}
