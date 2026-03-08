// components/Skills.tsx
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Database, Globe, Brain } from 'lucide-react';
import { fadeInUp, viewportOnce } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';
import { SkillCarousel, type SkillItem } from '@/components/ui/3d-carousel';

// ─── Types ────────────────────────────────────────────────────────────────────

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  color: string;
  skills: SkillItem[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    category: 'Programming',
    icon: <Code className="w-4 h-4" />,
    color: '#6366f1',
    skills: [
      { name: 'Python',     logo: 'https://cdn.simpleicons.org/python' },
      { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
      { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript' },
      { name: 'Java',       logo: 'https://cdn.simpleicons.org/openjdk' },
      { name: 'HTML',       logo: 'https://cdn.simpleicons.org/html5' },
      { name: 'CSS',        logo: 'https://cdn.simpleicons.org/css3' },
      { name: 'XML',        logo: null },
    ],
  },
  {
    category: 'Web & Mobile',
    icon: <Globe className="w-4 h-4" />,
    color: '#0ea5e9',
    skills: [
      { name: 'React',       logo: 'https://cdn.simpleicons.org/react' },
      { name: 'Next.js',     logo: 'https://cdn.simpleicons.org/nextdotjs' },
      { name: 'TailwindCSS', logo: 'https://cdn.simpleicons.org/tailwindcss' },
      { name: 'Flutter',     logo: 'https://cdn.simpleicons.org/flutter' },
      { name: 'PWA',         logo: null },
    ],
  },
  {
    category: 'Backend & Database',
    icon: <Database className="w-4 h-4" />,
    color: '#f97316',
    skills: [
      { name: 'FastAPI',  logo: 'https://cdn.simpleicons.org/fastapi' },
      { name: 'Django',   logo: 'https://cdn.simpleicons.org/django' },
      { name: 'Flask',    logo: 'https://cdn.simpleicons.org/flask' },
      { name: 'MongoDB',  logo: 'https://cdn.simpleicons.org/mongodb' },
      { name: 'Firebase', logo: 'https://cdn.simpleicons.org/firebase' },
      { name: 'Supabase', logo: 'https://cdn.simpleicons.org/supabase' },
      { name: 'SQL',      logo: null },
    ],
  },
  {
    category: 'AI/ML & DevOps',
    icon: <Brain className="w-4 h-4" />,
    color: '#a855f7',
    skills: [
      { name: 'LangChain',      logo: 'https://cdn.simpleicons.org/langchain' },
      { name: 'HuggingFace',    logo: 'https://cdn.simpleicons.org/huggingface' },
      { name: 'Docker',         logo: 'https://cdn.simpleicons.org/docker' },
      { name: 'AWS',            logo: 'https://cdn.simpleicons.org/amazonwebservices' },
      { name: 'Vercel',         logo: 'https://cdn.simpleicons.org/vercel' },
      { name: 'GitHub Actions', logo: 'https://cdn.simpleicons.org/githubactions' },
      { name: 'RAG',            logo: null },
    ],
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const Skills: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = skillCategories[activeIndex];

  return (
    <section id="skills" className="relative py-10 sm:py-12 lg:py-16 bg-background overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-4 font-bold">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Specialized in AI & GenAI with full-stack development expertise
            </p>
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            className="flex justify-center gap-1.5 sm:gap-2 lg:gap-3 mb-6 sm:mb-8 flex-wrap px-1"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {skillCategories.map((cat, i) => (
              <button
                key={cat.category}
                onClick={() => setActiveIndex(i)}
                className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition-all duration-200"
                style={{
                  borderColor: activeIndex === i ? cat.color : 'var(--border)',
                  color: activeIndex === i ? cat.color : 'var(--muted-foreground)',
                  background: activeIndex === i
                    ? `color-mix(in srgb, ${cat.color} 12%, transparent)`
                    : 'transparent',
                  boxShadow: activeIndex === i
                    ? `0 0 0 3px color-mix(in srgb, ${cat.color} 15%, transparent)`
                    : 'none',
                }}
              >
                {cat.icon}
                <span className="hidden sm:inline">{cat.category}</span>
                <span className="sm:hidden text-xs">{cat.category.split(' ')[0]}</span>
              </button>
            ))}
          </motion.div>

          {/* 3D Carousel — full width, switches per category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.28 }}
            >
              <SkillCarousel
                skills={active.skills}
                accentColor={active.color}
              />
            </motion.div>
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};

export default Skills;
