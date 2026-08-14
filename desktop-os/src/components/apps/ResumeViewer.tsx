import { DocumentViewer } from '@/components/apps/DocumentViewer';

export function ResumeViewer() {
  return (
    <DocumentViewer
      title="Resume"
      fileUrl="/resume/Kushagra_Gupta_Resume.docx"
      fileName="Kushagra_Gupta_Resume.docx"
      fileSizeLabel="1 page"
      description="A concise, 1-page summary of skills, experience, and top projects."
    />
  );
}
