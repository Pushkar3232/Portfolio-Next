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
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Innovative solutions showcasing expertise in AI and web development
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Project Image */}
                <div className="relative h-48 bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  <div className="absolute top-4 left-4 text-white drop-shadow-lg">
                    {project.icon}
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="flex space-x-2">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-white/90 hover:bg-white rounded-full shadow transition-colors duration-200"
                      >
                        <Github className="w-4 h-4 text-gray-600" />
                      </a>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/90 hover:bg-white rounded-full shadow transition-colors duration-200"
                        >
                          <ExternalLink className="w-4 h-4 text-gray-600" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm border border-gray-200">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Links */}
                  <div className="flex space-x-3">
                    <a 
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-center text-sm transition-colors duration-200"
                    >
                      Code
                    </a>
                    {project.liveUrl ? (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 px-4 bg-gray-900 hover:bg-gray-800 text-white rounded-lg text-center text-sm transition-colors duration-200"
                      >
                        Live Demo
                      </a>
                    ) : (
                      <div className="flex-1 py-2 px-4 bg-gray-100 text-gray-500 rounded-lg text-center text-sm border border-gray-200">
                        {project.title === 'Private AI' ? 'No Live Demo' : 'Private Access'}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Projects */}
          <div className="text-center mt-12">
            <a 
              href="https://github.com/Pushkar3232"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              <span>View All Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;