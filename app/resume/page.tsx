import Link from "next/link";
import ResumeTabs from "@/components/ResumeTabs";
import { GridBackground } from "@/components/ui/grid-background";

export const metadata = {
  title: "Resume",
  description: "Download or view Pushkar Shinde's resume in PDF or web format.",
};

const ResumePage = () => {
  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <GridBackground className="opacity-40" />
      <section className="relative mx-auto w-full max-w-6xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
              Resume
            </p>
            <h1 className="text-display text-foreground">Resume</h1>
            <p className="mt-2 max-w-2xl text-base text-muted-foreground">
              View the PDF or browse the web version below.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
          >
            Back to Home
          </Link>
        </div>
        <ResumeTabs />
      </section>
    </main>
  );
};

export default ResumePage;
