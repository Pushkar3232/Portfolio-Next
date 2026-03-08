// components/Skills.tsx
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Globe, Brain } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer, staggerContainerFast, viewportOnce } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Skills: React.FC = () => {
  const skillCategories = [
    {
      category: 'Programming',
      icon: <Code className="w-6 h-6" />,
      skills: ['Python', 'TypeScript', 'JavaScript']
    },
    {
      category: 'Web Development',
      icon: <Globe className="w-6 h-6" />,
      skills: ['React', 'Next.js', 'TailwindCSS']
    },
    {
      category: 'Backend & Database',
      icon: <Database className="w-6 h-6" />,
      skills: ['FastAPI', 'Firebase', 'MongoDB']
    },
    {
      category: 'AI & Machine Learning',
      icon: <Brain className="w-6 h-6" />,
      skills: ['Langchain', 'Vector DB', 'GenAI']
    }
  ];

  const allTechnologies = [
    'Python', 'React', 'TypeScript', 'Firebase', 'MongoDB', 'FastAPI', 
    'Langchain', 'TailwindCSS', 'Vector DB', 'Next.js', 'GenAI'
  ];

  return (
    <section id="skills" className="relative py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-10 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-display text-foreground mb-3 sm:mb-4">
              Skills & Technologies
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
              Specialized in AI & GenAI with full-stack development expertise
            </p>
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-10 sm:mb-12 lg:mb-16"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={scaleIn}
                className="relative bg-card rounded-lg sm:rounded-xl p-4 sm:p-5 lg:p-6 shadow-lg border border-border"
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)', transition: { duration: 0.2 } }}
              >
                <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                <div className="relative z-10">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="text-foreground">
                      {category.icon}
                    </div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-foreground">{category.category}</h3>
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="text-muted-foreground font-medium text-xs sm:text-sm lg:text-base">
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Technologies Cloud */}
          <motion.div
            className="text-center mb-10 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 lg:mb-8">All Technologies</h3>
            <motion.div
              className="flex flex-wrap justify-center gap-2 sm:gap-3"
              variants={staggerContainerFast}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {allTechnologies.map((tech, index) => (
                <motion.span
                  key={index}
                  variants={scaleIn}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200 text-xs sm:text-sm cursor-default"
                  whileHover={{ scale: 1.1, backgroundColor: '#e5e7eb' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;