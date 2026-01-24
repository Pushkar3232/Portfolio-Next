// components/Projects.tsx
import React from 'react';
import { Github, ExternalLink, Lock, Users, Zap, Image } from 'lucide-react';

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
    <section id="projects" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Innovative solutions showcasing expertise in AI and web development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Project Image */}
                <div className="relative h-36 sm:h-44 lg:h-48 bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 text-white drop-shadow-lg">
                    {project.icon}
                  </div>
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                    <div className="flex space-x-1.5 sm:space-x-2">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-full shadow transition-colors duration-200"
                      >
                        <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 sm:p-2 bg-white/90 hover:bg-white rounded-full shadow transition-colors duration-200"
                        >
                          <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-3 sm:mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-4 sm:mb-6">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm border border-gray-200">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-2 sm:space-x-3">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 sm:px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-center text-xs sm:text-sm transition-colors duration-200"
                    >
                      Code
                    </a>
                    {project.liveUrl ? (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-3 sm:px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-center text-xs sm:text-sm transition-colors duration-200"
                      >
                        Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 py-2 px-3 sm:px-4 bg-gray-100 text-gray-500 rounded-lg text-center text-xs sm:text-sm border border-gray-200">
                        {project.title === 'Private AI' ? 'No Live Demo' : 'Private Access'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Projects */}
          <div className="text-center mt-8 sm:mt-10 lg:mt-12">
            <a 
              href="https://github.com/Pushkar3232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>View All Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;