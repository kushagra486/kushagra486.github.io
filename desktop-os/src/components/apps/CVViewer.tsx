import { DocumentViewer } from '@/components/apps/DocumentViewer';

export function CVViewer() {
  return (
    <DocumentViewer
      title="CV"
      fileUrl="/resume/Kushagra_Gupta_CV.docx"
      fileName="Kushagra_Gupta_CV.docx"
      fileSizeLabel="full detail"
      description="The full curriculum vitae — every project, certification, and job simulation in detail."
    />
  );
}
