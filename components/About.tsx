'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Code, Brain, Zap, Users } from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerContainerSlow, viewportOnce } from '@/lib/animations';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { GridBackground } from '@/components/ui/grid-background';

const About: React.FC = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Web Development',
      description: 'Modern, responsive web applications'
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Artificial Intelligence',
      description: 'Intelligent solutions for real problems'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'GenAI Applications',
      description: 'Next-generation AI applications'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Mentoring',
      description: 'Guiding 200+ interns in tech'
    }
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-20 bg-secondary overflow-hidden">
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
            <span className="text-eyebrow text-primary mb-2 block">Who I Am</span>
            <h2 className="text-display text-foreground mb-3 sm:mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
              Full-stack developer passionate about AI and mentoring
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <motion.div
              className="relative bg-card rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-sm border border-border"
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-4 sm:mb-6 font-display">
                Simplifying the World Through Software
              </h3>
              <p className="text-muted-foreground mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                Full Stack Developer, ML Engineer, and GenAI specialist focused on creating 
                meaningful solutions that make a difference.
              </p>
              <p className="text-muted-foreground mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                Currently mentoring 200+ interns at V2V EdTech LLP while building 
                next-generation AI applications.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-border">
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2 font-display">200+</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">Interns Mentored</div>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2 font-display">3+</div>
                  <div className="text-muted-foreground text-xs sm:text-sm">Major Projects</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Highlights */}
            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={staggerContainerSlow}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
            >
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  variants={fadeInRight}
                  className="relative bg-card p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow duration-300"
                  whileHover={{ x: 6, transition: { duration: 0.2 } }}
                >
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="text-foreground p-1.5 sm:p-2 bg-secondary rounded-lg flex-shrink-0">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 font-display">
                        {highlight.title}
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;