import React from "react";
import { cn } from "@/lib/utils";

export const LoaderThree = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative w-24 h-24">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-purple-500 animate-spin"></div>
        
        {/* Middle rotating ring */}
        <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-purple-500 border-r-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 animate-pulse opacity-50"></div>
        
        {/* Center logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-2xl font-bold text-white">P</span>
          </div>
        </div>
      </div>
    </div>
  );
};
