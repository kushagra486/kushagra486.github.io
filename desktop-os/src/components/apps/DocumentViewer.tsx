'use client';

import { useState } from 'react';

interface DocumentViewerProps {
  title: string;
  fileUrl: string;
  fileName: string;
  fileSizeLabel: string;
  description: string;
}

export function DocumentViewer({ title, fileUrl, fileName, fileSizeLabel, description }: DocumentViewerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex h-[75vh] flex-col gap-3">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-[11px] text-white/40">
            {description} · PDF · {fileSizeLabel}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-white/20"
          >
            Open in tab ↗
          </a>
          <a
            href={fileUrl}
            download={fileName}
            className="rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300"
          >
            Download ↓
          </a>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden rounded-lg border border-white/10 bg-white/95 shadow-inner">
        {!loaded && (
          <p className="absolute inset-0 flex items-center justify-center text-xs text-black/40">
            Loading {title.toLowerCase()}…
          </p>
        )}
        <iframe
          src={`${fileUrl}#view=FitH`}
          title={title}
          onLoad={() => setLoaded(true)}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
