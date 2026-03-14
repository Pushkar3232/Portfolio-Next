// components/Projects.tsx
'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Lock, Users, Zap } from 'lucide-react';
import { fadeInUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Private AI',
      description: 'Offline AI chatbot for corporate environments with fine-tuned models.',
      technologies: ['Python', 'FastAPI', 'React', 'Langchain', 'TailwindCSS'],
      github: 'PrivateAI',
      githubUrl: 'https://github.com/Pushkar3232/PrivateAI',
      liveUrl: null,
      isPrivate: false,
      icon: <Lock className="w-6 h-6" />,
      image: 'p1.avif'
    },
    {
      title: 'V2V Interns Portal',
      description: 'Task management platform for 500+ interns with tracking system.',
      technologies: ['TypeScript', 'Firebase', 'React', 'Material-UI'],
      github: 'interns',
      githubUrl: 'https://github.com/Pushkar3232/interns',
      liveUrl: null, // Live but not accessible
      isPrivate: false,
      icon: <Users className="w-6 h-6" />,
      image: 'p2.avif'
    },
    {
      title: 'Dynamic Portfolio Builder',
      description: 'Generate personalized portfolio websites with dynamic templates.',
      technologies: ['TypeScript', 'Firebase', 'React', 'Next.js'],
      github: 'EvoFolio',
      githubUrl: 'https://github.com/Pushkar3232/EvoFolio',
      liveUrl: 'https://evofolio.netlify.app/',
      isPrivate: false,
      icon: <Zap className="w-6 h-6" />,
      image: 'p3.avif'
    }
  ];

  return (
    <section id="projects" className="relative py-12 sm:py-16 lg:py-20 bg-background overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-4 font-bold">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-2">
              Innovative solutions showcasing expertise in AI and web development
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="relative bg-card rounded-lg sm:rounded-xl shadow-lg border border-border overflow-hidden"
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.12)', transition: { duration: 0.2 } }}
              >
                <GlowingEffect spread={40} glow={true} disabled={true} proximity={64} inactiveZone={0.01} borderWidth={2} />
                
                {/* Project Image */}
                <div className="relative h-32 sm:h-40 lg:h-48 bg-muted">
                  <Image
                    src={`/${project.image}`}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-2 sm:top-4 left-2 sm:left-4 text-white drop-shadow-lg text-sm sm:text-base">
                    {project.icon}
                  </div>
                  <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
                    <div className="flex space-x-1">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 bg-card/90 hover:bg-card rounded-full shadow transition-colors duration-200"
                      >
                        <Github className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-card/90 hover:bg-card rounded-full shadow transition-colors duration-200"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-3 sm:p-4 lg:p-5">
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 font-display">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-2 sm:mb-3 text-xs sm:text-sm">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-3 sm:mb-4">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-1.5 sm:px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-1.5 sm:px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs border border-border">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex gap-1.5 sm:gap-2">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-2 sm:px-3 border border-border hover:bg-muted text-foreground rounded-lg text-center text-xs transition-colors duration-200"
                    >
                      Code
                    </a>
                    {project.liveUrl ? (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-2 sm:px-3 bg-foreground hover:bg-foreground/90 text-background rounded-lg text-center text-xs transition-colors duration-200"
                      >
                        Live
                      </a>
                    ) : (
                      <div className="flex-1 py-2 px-2 sm:px-3 bg-muted text-muted-foreground rounded-lg text-center text-xs border border-border">
                        {project.title === 'Private AI' ? 'No Demo' : 'Private'}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View More Projects */}
          <motion.div
            className="text-center mt-8 sm:mt-10 lg:mt-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.a
              href="https://github.com/Pushkar3232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-foreground hover:bg-foreground/90 text-background rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View All Projects</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;