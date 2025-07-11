// components/Skills.tsx
import React from 'react';
import { Code, Database, Globe, Brain } from 'lucide-react';

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
    'Langchain', 'TailwindCSS', 'DeepSeek R1', 'Vector DB', 'Next.js', 'GenAI'
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Skills & Technologies
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Specialized in AI & GenAI with full-stack development expertise
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-gray-700">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="text-gray-600 font-medium">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Technologies Cloud */}
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">All Technologies</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {allTechnologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full border border-gray-200 hover:bg-gray-200 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Special Focus */}
          <div className="text-center">
            <div className="inline-block bg-gray-50 rounded-2xl p-8 border border-gray-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Primary Focus
              </h3>
              <p className="text-2xl text-gray-900 font-semibold mb-2">
                Artificial Intelligence & GenAI
              </p>
              <p className="text-gray-600">
                Building intelligent solutions and next-generation AI applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;