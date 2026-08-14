interface DocumentViewerProps {
  title: string;
  fileUrl: string;
  fileName: string;
  fileSizeLabel: string;
  description: string;
}

export function DocumentViewer({ title, fileUrl, fileName, fileSizeLabel, description }: DocumentViewerProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
      <span className="text-5xl">📄</span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs text-white/50">{description}</p>
        <p className="mt-1 text-[11px] text-white/30">Word document (.docx) · {fileSizeLabel}</p>
      </div>
      <a
        href={fileUrl}
        download={fileName}
        className="rounded-md bg-cyan-400/90 px-4 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300"
      >
        Download {title} ↓
      </a>
    </div>
  );
}
