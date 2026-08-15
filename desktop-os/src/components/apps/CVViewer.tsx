import { DocumentViewer } from '@/components/apps/DocumentViewer';

export function CVViewer() {
  return (
    <DocumentViewer
      title="CV"
      fileUrl="/resume/Kushagra_Gupta_CV.pdf"
      fileName="Kushagra_Gupta_CV.pdf"
      fileSizeLabel="6 pages"
      description="The full curriculum vitae — every project, certification, and job simulation in detail."
    />
  );
}
