import React from 'react';
import { MapPin, Calendar, Users, Award, Target, Building, Sparkles } from 'lucide-react';

const Experience: React.FC = () => {
  const experience = {
    role: 'Mentor',
    company: 'V2V EdTech LLP',
    duration: 'Current Position',
    location: 'Kalyan',
    description: 'Leading and mentoring 200+ interns across technical domains, specializing in Data Analysis and providing comprehensive technical support.',
    responsibilities: [
      'Mentoring 200+ interns in web development, AI, and Data Analysis',
      'Providing technical support and guidance to interns',
      'Conducting code reviews and feedback sessions',
      'Specializing in Data Analysis mentoring and training',
      'Developing and maintaining task submission portal',
      'Providing career guidance and progress tracking'
    ],
    // achievements: [
    //   '200+ interns successfully mentored across multiple domains',
    //   'Developed comprehensive Data Analysis training programs',
    //   'Created and deployed task submission portal for streamlined workflow',
    //   'Established technical support system for intern assistance',
    //   'Designed industry-relevant projects and assignments'
    // ],
    
  };

  const skills = [
     'Data Analysis Mentoring',
      'Technical Support',
      'Portal Development',
      'Team Leadership',
      'Training & Development'
  ];

  return (
    <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Professional Experience
            </h2>
            
          </div>

          {/* Main Experience Card */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-12 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-50 to-transparent rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10">
              {/* Header Section with Image and Title */}
              <div className="grid lg:grid-cols-4 gap-8 border-b border-gray-100 pb-8 mb-8">
                {/* Professional Image */}
                <div className="lg:col-span-1 flex justify-center lg:justify-start">
                  <div className="relative group">
                    <div className="w-full max-w-xs h-48 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <img 
                        src="3rd.png" 
                        alt="Professional Photo"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    
                    {/* Decorative ring */}
                    
                  </div>
                </div>

                {/* Title and Company Info */}
                <div className="lg:col-span-3 space-y-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">{experience.role}</h3>
                      <p className="text-xl text-blue-600 font-semibold flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        {experience.company}
                      </p>
                    </div>
                    <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{experience.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">{experience.location}</span>
                    </div>
                    <div className="flex items-center text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium">200+ Interns</span>
                    </div>
                  </div>

                  <p className="text-gray-600 leading-relaxed text-lg">
                    {experience.description}
                  </p>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="space-y-6 mb-8">
                {/* Two Column Layout for Responsibilities and Achievements */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Responsibilities */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Key Responsibilities
                    </h4>
                    <ul className="space-y-3">
                      {experience.responsibilities.map((responsibility, index) => (
                        <li key={index} className="text-gray-600 flex items-start text-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  {/* <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2 text-blue-600" />
                      Key Achievements
                    </h4>
                    <div className="space-y-3">
                      {experience.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>

                {/* Skills */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Experience;