import React from 'react';
import { cn } from '@/lib/utils';

export interface MasonryCardData {
  id: string;
  src: string;
  alt: string;
  content: string;
  linkHref: string;
  linkText: string;
}

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MasonryCardData[];
}

const MasonryGridCSS = () => (
  <style>{`
    @keyframes slide-in {
      from {
        opacity: 0;
        transform: scale(0.85) rotate(calc(var(--side, 1) * (5deg * var(--amp, 1))));
      }
      to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
      }
    }

    .masonry-card-wrapper {
      &:nth-of-type(2n + 1) { transform-origin: 25vw 100%; }
      &:nth-of-type(2n) { transform-origin: -25vw 100%; }

      @media (min-width: 768px) {
        &:nth-of-type(4n + 1) { transform-origin: 50vw 100%; }
        &:nth-of-type(4n + 2) { transform-origin: 25vw 100%; }
        &:nth-of-type(4n + 3) { transform-origin: -25vw 100%; }
        &:nth-of-type(4n) { transform-origin: -50vw 100%; }
      }

      @media (min-width: 1024px) {
        &:nth-of-type(6n + 1) { transform-origin: 75vw 100%; }
        &:nth-of-type(6n + 2) { transform-origin: 50vw 100%; }
        &:nth-of-type(6n + 3) { transform-origin: 25vw 100%; }
        &:nth-of-type(6n + 4) { transform-origin: -25vw 100%; }
        &:nth-of-type(6n + 5) { transform-origin: -50vw 100%; }
        &:nth-of-type(6n) { transform-origin: -75vw 100%; }
      }

      @media (prefers-reduced-motion: no-preference) {
        animation: slide-in linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 15%;
      }
    }
  `}</style>
);

const MasonryCard = ({
  item,
  className,
  ...props
}: { item: MasonryCardData } & React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('grid gap-2', className)} {...props}>
    <article className="bg-card border rounded-lg shadow-md p-3 space-y-2">
      <img
        src={item.src}
        alt={item.alt}
        height={500}
        width={500}
        className="bg-muted rounded-md aspect-square object-cover w-full"
      />
      <p className="text-sm text-muted-foreground leading-tight line-clamp-2">
        {item.content}
      </p>
      <a
        href={item.linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        {item.linkText}
      </a>
    </article>
  </div>
);

const MasonryGrid = React.forwardRef<HTMLDivElement, MasonryGridProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <>
        <MasonryGridCSS />
        <div
          ref={ref}
          className={cn(
            'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4',
            className,
          )}
          {...props}
        >
          {items.map((item, index) => (
            <MasonryCard
              key={item.id}
              item={item}
              className="masonry-card-wrapper"
              style={
                {
                  '--side': index % 2 === 0 ? 1 : -1,
                  '--amp': Math.ceil((index % 8) / 2),
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </>
    );
  },
);

MasonryGrid.displayName = 'MasonryGrid';

export { MasonryGrid, MasonryCard };
