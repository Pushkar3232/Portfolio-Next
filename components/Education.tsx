import React from 'react';
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink, Trophy } from 'lucide-react';

const Education: React.FC = () => {
  const education = {
    degree: 'Diploma in Computer Engineering',
    status: 'Recently Graduated',
    institution: 'Technical Institute',
    year: '2025',
    description: 'Comprehensive program covering software development and engineering principles.'
  };

  const certificates = [
    {
      title: "Maths and Statistics for AI",
      provider: "CodeBasics",
      date: "26/1/2025",
      image: "/images/Skill/Maths for AI.jpg",
      credentialUrl: "https://codebasics.io/certificate/CB-63-491529",
      category: "AI/ML"
    },
    {
      title: "Introduction to Large Language Models",
      provider: "LinkedIn Learning",
      date: "22/2/2025",
      image: "/images/Skill/Introduction to Large Language Models.jpg",
      credentialUrl: "https://www.linkedin.com/learning/certificates/9bbc571a842663a0cd3f70a5b552ffd72294b0922eecdd7c6da0484cf3226d32",
      category: "AI/ML"
    },
    {
      title: "Generative AI vs. Traditional AI",
      provider: "LinkedIn Learning",
      date: "23/2/2025",
      image: "/images/Skill/Generative AI vs. Traditional AI.jpg",
      credentialUrl: "https://www.linkedin.com/learning/certificates/e277172a1fdee20b33dd7dd2a4370bbaddbb5c9fc7409d0805c67e31da0fce52",
      category: "AI/ML"
    },
    {
      title: "Generative AI: Working with Large Language Models",
      provider: "LinkedIn Learning",
      date: "25/2/2025",
      image: "/images/Skill/Generative AI Working with Large Language.jpg",
      credentialUrl: "https://www.linkedin.com/learning/certificates/977524b5d18a86fd0a17653cc7c37c73c49d70d068242a4dd93ed1311523526a?trk=share_certificate",
      category: "AI/ML"
    },
    {
      title: "Leading Your Team Through Change",
      provider: "LinkedIn Learning",
      date: "25/2/2025",
      image: "/images/Skill/Leading Your Team Through Change.jpg",
      credentialUrl: "https://www.linkedin.com/learning/certificates/d0ce5e8cf5b24c9e2e29c5e7be3f848e5c9ed2052d76e489b95a19eeaf236fc4?trk=share_certificate",
      category: "Leadership"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return <BookOpen className="w-4 h-4" />;
      case 'Leadership':
        return <Trophy className="w-4 h-4" />;
      default:
        return <Award className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Leadership':
        return 'bg-green-50 text-green-600 border-green-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <section id="education" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education & Certifications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Continuous learning in technology and development
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <GraduationCap className="w-6 h-6 mr-3 text-gray-900" />
                Education
              </h3>
              
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">
                      {education.degree}
                    </h4>
                    <p className="text-gray-900 font-medium mb-2">
                      {education.institution}
                    </p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">{education.status} • {education.year}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {education.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-gray-900" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certificates.map((cert, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:border-gray-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getCategoryColor(cert.category)}`}>
                          {getCategoryIcon(cert.category)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                            {cert.title}
                          </h4>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cert.category)} flex items-center gap-1`}>
                            {getCategoryIcon(cert.category)}
                            {cert.category}
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">
                          {cert.provider}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-500 text-xs flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {cert.date}
                          </span>
                          <a
                            href={cert.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105"
                          >
                            <Award className="w-3 h-3 mr-1" />
                            View Certificate
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-900">Note:</span> Continuously updating skills - 
                  more certificates earned regularly
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">5+</h4>
              <p className="text-gray-600">Recent Certifications</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">AI/ML</h4>
              <p className="text-gray-600">Specialization Focus</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">2025</h4>
              <p className="text-gray-600">Most Recent Year</p>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-3xl">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Learning Philosophy
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Staying ahead in technology requires continuous learning. My focus on AI/ML and leadership 
                skills reflects my commitment to both technical excellence and professional growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;