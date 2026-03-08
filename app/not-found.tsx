// app/not-found.tsx

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative bg-background">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f1f5f9 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #e2e8f0 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-border rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-primary/30 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-2 h-16 bg-gradient-to-b from-primary to-transparent opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-2 h-20 bg-gradient-to-b from-muted-foreground to-transparent opacity-20"></div>
      </div>

      <div className="text-center z-10 px-4">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold text-muted/50 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl md:text-8xl font-bold text-foreground">
              4<span className="text-primary">0</span>4
            </span>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        {/* Decorative Line */}
        <div className="flex justify-center items-center gap-2 mb-10">
          <div className="w-12 h-0.5 bg-border"></div>
          <div className="w-2 h-2 bg-primary rounded-full"></div>
          <div className="w-12 h-0.5 bg-border"></div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/"
            className="inline-flex items-center justify-center px-8 py-3 bg-foreground hover:bg-foreground/90 text-background font-medium rounded-lg transition-all duration-300 group"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
          <a
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-card border border-border hover:border-primary/30 text-foreground font-medium rounded-lg transition-all duration-300"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Contact Me
          </a>
        </div>

        {/* Footer Text */}
        <p className="mt-12 text-muted-foreground text-sm">
          © 2025 Pushk<span className="text-primary">a</span>r Sh<span className="text-primary">i</span>nde
        </p>
      </div>
    </div>
  )
}
