import React from 'react';
import { Code, Brain, Zap, Users } from 'lucide-react';

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
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Full-stack developer passionate about AI and mentoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Simplifying the World Through Software
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Full Stack Developer, ML Engineer, and GenAI specialist focused on creating 
                meaningful solutions that make a difference.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Currently mentoring 200+ interns at V2V EdTech LLP while building 
                next-generation AI applications.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">200+</div>
                  <div className="text-gray-600 text-sm">Interns Mentored</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">3+</div>
                  <div className="text-gray-600 text-sm">Major Projects</div>
                </div>
              </div>
            </div>

            {/* Right Content - Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <div 
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-gray-900 p-2 bg-gray-50 rounded-lg">
                      {highlight.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {highlight.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {highlight.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;