"use client";

import React, { useState } from "react";
import ResumePDFView from "@/components/ResumePDFView";
import ResumeWebView from "@/components/ResumeWebView";

type ResumeTab = "pdf" | "web";

const ResumeTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ResumeTab>("pdf");

  return (
    <div className="space-y-8">
      <div className="mx-auto w-full max-w-md rounded-full border border-border bg-muted/60 p-1">
        <div className="grid grid-cols-2">
          <button
            type="button"
            onClick={() => setActiveTab("pdf")}
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "pdf"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={activeTab === "pdf"}
          >
            PDF
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("web")}
            className={`flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "web"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
            aria-pressed={activeTab === "web"}
          >
            Web
          </button>
        </div>
      </div>

      <div>{activeTab === "pdf" ? <ResumePDFView /> : <ResumeWebView />}</div>
    </div>
  );
};

export default ResumeTabs;
