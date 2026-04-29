"use client";

import React from "react";

const PDF_PREVIEW_URL =
  "https://drive.google.com/file/d/16k61cKgsPdijBr9rRsmSSntPttStF8I5/preview";
const PDF_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=16k61cKgsPdijBr9rRsmSSntPttStF8I5";

const ResumePDFView: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-border bg-card">
        <div className="relative w-full aspect-[1/1.414]">
          <iframe
            title="Pushkar Shinde Resume PDF"
            src={PDF_PREVIEW_URL}
            allow="autoplay"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <a
          href={PDF_DOWNLOAD_URL}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
};

export default ResumePDFView;
