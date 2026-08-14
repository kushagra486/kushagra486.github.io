'use client';

import { useEffect, useState } from 'react';

interface DocumentViewerProps {
  title: string;
  fileUrl: string;
  fileName: string;
  fileSizeLabel: string;
  description: string;
}

type LoadState = { status: 'loading' } | { status: 'ready'; html: string } | { status: 'error' };

export function DocumentViewer({ title, fileUrl, fileName, fileSizeLabel, description }: DocumentViewerProps) {
  const [state, setState] = useState<LoadState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: 'loading' });

    (async () => {
      try {
        const [mammoth, res] = await Promise.all([import('mammoth'), fetch(fileUrl)]);
        const arrayBuffer = await res.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
        if (!cancelled) setState({ status: 'ready', html });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  return (
    <div className="flex h-[70vh] flex-col gap-3">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="mt-0.5 text-[11px] text-white/40">
            {description} · Word document (.docx) · {fileSizeLabel}
          </p>
        </div>
        <a
          href={fileUrl}
          download={fileName}
          className="shrink-0 rounded-md bg-cyan-400/90 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-cyan-300"
        >
          Download ↓
        </a>
      </div>

      <div className="flex-1 overflow-auto rounded-lg border border-white/10 bg-white/95 p-6 shadow-inner">
        {state.status === 'loading' && (
          <p className="text-center text-xs text-black/40">Rendering {title.toLowerCase()}…</p>
        )}
        {state.status === 'error' && (
          <div className="flex flex-col items-center gap-2 py-8 text-center">
            <span className="text-4xl">📄</span>
            <p className="text-xs text-black/60">
              Couldn&apos;t render a preview here — use the download button above to open it directly.
            </p>
          </div>
        )}
        {state.status === 'ready' && (
          <div
            className="docx-preview text-[13px] leading-relaxed text-black/85"
            dangerouslySetInnerHTML={{ __html: state.html }}
          />
        )}
      </div>
    </div>
  );
}
