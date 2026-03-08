import React from "react";

const LoadingLines: React.FC = () => {
  const letters = "Loading".split("");

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes transformAnim {
          0% { transform: translate(-55%); }
          100% { transform: translate(55%); }
        }
        @keyframes opacityAnim {
          0%, 100% { opacity: 0; }
          15% { opacity: 1; }
          65% { opacity: 0; }
        }
        @keyframes letterAnim {
          0% { opacity: 0; }
          5% { opacity: 1; text-shadow: 0 0 4px currentColor; transform: scale(1.1) translateY(-2px); }
          20% { opacity: 0.2; }
          100% { opacity: 0; }
        }
        .loading-letter {
          position: relative;
          display: inline-block;
          opacity: 0;
          z-index: 2;
          animation: letterAnim 4s linear infinite;
          color: var(--foreground);
        }
        .loading-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background: transparent;
          mask: repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px);
          -webkit-mask: repeating-linear-gradient(90deg, transparent 0, transparent 6px, black 7px, black 8px);
        }
        .loading-gradient {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image:
            radial-gradient(circle at 50% 50%, #ff0 0%, transparent 50%),
            radial-gradient(circle at 45% 45%, #f00 0%, transparent 45%),
            radial-gradient(circle at 55% 55%, #0ff 0%, transparent 45%),
            radial-gradient(circle at 45% 55%, #0f0 0%, transparent 45%),
            radial-gradient(circle at 55% 45%, #00f 0%, transparent 45%);
          mask: radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%);
          -webkit-mask: radial-gradient(circle at 50% 50%, transparent 0%, transparent 10%, black 25%);
          animation: transformAnim 2s infinite alternate cubic-bezier(0.6, 0.8, 0.5, 1), opacityAnim 4s infinite;
        }
      `}} />
      <div className="relative flex items-center justify-center h-[120px] w-auto m-8 font-sans text-[1.6em] font-semibold select-none scale-[2]">
        {letters.map((letter, idx) => (
          <span
            key={idx}
            className="loading-letter"
            style={{ animationDelay: `${0.1 + idx * 0.105}s` }}
          >
            {letter}
          </span>
        ))}
        <div className="loading-mask">
          <div className="loading-gradient" />
        </div>
      </div>
    </>
  );
};

export default LoadingLines;
