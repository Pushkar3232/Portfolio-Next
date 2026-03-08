"use client"

import React from 'react';
import { cn } from '@/lib/utils';

interface LogoItem {
  icon: React.ReactNode;
  className: string;
  name: string;
}

interface SpinningLogosProps {
  logos: LogoItem[];
  centerContent?: React.ReactNode;
  onLogoClick?: (index: number) => void;
  activeIndex?: number;
  radius?: number;
  iconSize?: number;
  showLabel?: boolean;
}

export const SpinningLogos: React.FC<SpinningLogosProps> = ({
  logos,
  centerContent,
  onLogoClick,
  activeIndex,
  radius = 130,
  iconSize = 56,
  showLabel = false,
}) => {
  // Extra padding to accommodate labels if shown
  const ringPadding = showLabel ? 64 : 40;
  const toRadians = (degrees: number): number => (Math.PI / 180) * degrees;

  return (
    <div className="flex justify-center items-center">
      <div
        style={{
          width: radius * 2 + iconSize + ringPadding,
          height: radius * 2 + iconSize + ringPadding,
        }}
        className="relative rounded-full bg-muted/30 shadow-lg border border-border"
      >
        <div className="absolute inset-0 animate-spin-slow">
          {logos.map((logo, index) => {
            const angle = (360 / logos.length) * index;
            const isActive = activeIndex === index;
            return (
              /* Wrapper div carries the position + counter-rotation so label stays upright */
              <div
                key={index}
                className="absolute flex flex-col items-center animate-spin-reverse"
                style={{
                  top: `calc(50% - ${iconSize / 2}px + ${radius * Math.sin(toRadians(angle))}px)`,
                  left: `calc(50% - ${iconSize / 2}px + ${radius * Math.cos(toRadians(angle))}px)`,
                }}
              >
                <button
                  onClick={() => onLogoClick?.(index)}
                  style={{ width: iconSize, height: iconSize }}
                  className={cn(
                    "flex items-center justify-center rounded-full shadow-md border-2 cursor-pointer transition-all duration-300",
                    "border-border",
                    isActive ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-110" : "hover:scale-105",
                    logo.className
                  )}
                  aria-label={logo.name}
                >
                  {logo.icon}
                </button>
                {showLabel && (
                  <span
                    className="mt-1.5 text-[10px] font-semibold text-center whitespace-nowrap"
                    style={{ color: 'var(--muted-foreground)', maxWidth: '72px' }}
                  >
                    {logo.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-background rounded-full w-3/5 h-3/5 flex items-center justify-center shadow-inner border-4 border-border">
            {centerContent || (
              <span className="text-lg sm:text-xl font-bold text-foreground text-center px-4 font-display">
                Skills
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
