// components/Education.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink, Trophy } from 'lucide-react';

interface EducationData {
  id: string;
  degree: string;
  status: string;
  institution: string;
  year: string;
  description: string;
}

interface Certificate {
  id: string;
  title: string;
  provider: string;
  date: string;
  image: string;
  credentialUrl: string;
  category: string;
}

const Education: React.FC = () => {
  const [educationData, setEducationData] = useState<EducationData[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch Education Data
    const educationQuery = query(
      collection(db, 'education'),
      orderBy('year', 'desc')
    );
    
    const unsubEducation = onSnapshot(educationQuery, (snapshot) => {
      const data: EducationData[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as EducationData);
      });
      setEducationData(data);
    });

    // Fetch Certificates
    const certQuery = query(
      collection(db, 'certificates'),
      orderBy('date', 'desc')
    );
    
    const unsubCerts = onSnapshot(certQuery, (snapshot) => {
      const data: Certificate[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Certificate);
      });
      setCertificates(data);
      setLoading(false);
    });

    return () => {
      unsubEducation();
      unsubCerts();
    };
  }, []);

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

  if (loading) {
    return (
      <section id="education" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-600 font-medium">Loading education data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aiMlCertCount = certificates.filter(c => c.category === 'AI/ML').length;
  const latestYear = educationData.length > 0 ? educationData[0].year : new Date().getFullYear();

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
              
              <div className="space-y-4">
                {educationData.length === 0 ? (
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
                    <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No education entries yet</p>
                  </div>
                ) : (
                  educationData.map((edu) => (
                    <div key={edu.id} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-900 font-medium mb-2">
                            {edu.institution}
                          </p>
                          <div className="flex items-center text-gray-600 mb-4">
                            <Calendar className="w-4 h-4 mr-2" />
                            <span className="text-sm">{edu.status} • {edu.year}</span>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-gray-900" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certificates.length === 0 ? (
                  <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 text-center">
                    <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500">No certificates yet</p>
                  </div>
                ) : (
                  certificates.map((cert) => (
                    <div 
                      key={cert.id}
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
                            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(cert.category)} flex items-center gap-1 ml-2`}>
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
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{certificates.length}+</h4>
              <p className="text-gray-600">Recent Certifications</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{aiMlCertCount > 0 ? 'AI/ML' : 'Tech'}</h4>
              <p className="text-gray-600">Specialization Focus</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-2">{latestYear}</h4>
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