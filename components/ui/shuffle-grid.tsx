"use client"

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ShuffleItem {
  id: number;
  icon: React.ReactNode;
  label: string;
}

interface ShuffleGridProps {
  items: ShuffleItem[];
  className?: string;
}

const shuffle = <T,>(array: T[]): T[] => {
  const arr = [...array];
  let currentIndex = arr.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
  }
  return arr;
};

const ShuffleGrid = ({ items, className }: ShuffleGridProps) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cols = Math.ceil(Math.sqrt(items.length));

  const generateSquares = () => {
    return shuffle(items).map((item) => (
      <motion.div
        key={item.id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className={cn(
          "w-full h-full rounded-lg overflow-hidden bg-card border border-border",
          "flex flex-col items-center justify-center gap-2 p-3"
        )}
      >
        <div className="text-primary">{item.icon}</div>
        <span className="text-xs sm:text-sm font-medium text-foreground text-center leading-tight">
          {item.label}
        </span>
      </motion.div>
    ));
  };

  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    setSquares(generateSquares());
  }, [items]);

  useEffect(() => {
    const shuffleSquares = () => {
      setSquares(generateSquares());
      timeoutRef.current = setTimeout(shuffleSquares, 3000);
    };
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [items]);

  return (
    <div
      className={cn("grid gap-2 sm:gap-3 h-[300px] sm:h-[350px] lg:h-[400px]", className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gridTemplateRows: `repeat(${cols}, 1fr)`,
      }}
    >
      {squares.map((sq) => sq)}
    </div>
  );
};

export { ShuffleGrid };
export type { ShuffleItem };
