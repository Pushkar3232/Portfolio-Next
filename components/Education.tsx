// components/Education.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink, Trophy } from 'lucide-react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { cn } from '@/lib/utils';
import {
  IconBrain,
  IconCertificate,
  IconRobot,
  IconCode,
  IconCloud,
  IconDatabase,
  IconUsers,
} from '@tabler/icons-react';

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

// Certificate image header component
const CertificateImage = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-100">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
          <IconCertificate className="w-10 h-10 text-gray-400" />
        </div>
      )}
    </div>
  );
};

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
      collection(db, 'certificates')
    );
    
    const unsubCerts = onSnapshot(certQuery, (snapshot) => {
      const data: Certificate[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Certificate);
      });
      
      // Sort certificates by date (newest first)
      // Handles formats like "22/2/2025", "07/03/2025" (DD/MM/YYYY)
      const sortedData = data.sort((a, b) => {
        const parseDate = (dateStr: string) => {
          // Handle DD/MM/YYYY format
          const parts = dateStr.split('/');
          if (parts.length === 3) {
            const day = parseInt(parts[0]);
            const month = parseInt(parts[1]) - 1; // months are 0-indexed
            const year = parseInt(parts[2]);
            return new Date(year, month, day);
          }
          return new Date(0);
        };
        return parseDate(b.date).getTime() - parseDate(a.date).getTime();
      });
      
      setCertificates(sortedData);
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
        return <IconBrain className="w-4 h-4" />;
      case 'Leadership':
        return <IconUsers className="w-4 h-4" />;
      case 'Cloud':
        return <IconCloud className="w-4 h-4" />;
      case 'Development':
        return <IconCode className="w-4 h-4" />;
      default:
        return <IconCertificate className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'text-violet-600';
      case 'Leadership':
        return 'text-emerald-600';
      case 'Cloud':
        return 'text-sky-600';
      case 'Development':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
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
    <section id="education" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education & Certifications
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Continuous learning in technology and development
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
              <GraduationCap className="w-7 h-7 mr-3 text-gray-900" />
              Academic Background
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {educationData.length === 0 ? (
                <div className="md:col-span-2 lg:col-span-3 bg-white rounded-2xl p-8 shadow-sm border border-gray-200 text-center">
                  <GraduationCap className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No education entries yet</p>
                </div>
              ) : (
                educationData.map((edu) => (
                  <div 
                    key={edu.id} 
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-bold text-gray-900 leading-tight">
                            {edu.degree}
                          </h4>
                          <p className="text-gray-700 font-medium text-sm mt-1">
                            {edu.institution}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">{edu.status} • {edu.year}</span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Certifications Section - Bento Grid */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
              <Award className="w-7 h-7 mr-3 text-gray-900" />
              Professional Certifications
            </h3>
            
            {certificates.length === 0 ? (
              <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm text-center max-w-md mx-auto">
                <Award className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No certificates yet</p>
              </div>
            ) : (
              <BentoGrid className="max-w-6xl mx-auto">
                {certificates.map((cert) => (
                  <BentoGridItem
                    key={cert.id}
                    title={
                      <span className="line-clamp-2">{cert.title}</span>
                    }
                    description={
                      <div className="space-y-3">
                        <p className="text-gray-700 font-medium">{cert.provider}</p>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {cert.date}
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 mt-2"
                        >
                          <Award className="w-3 h-3 mr-1.5" />
                          View Credential
                          <ExternalLink className="w-3 h-3 ml-1.5" />
                        </a>
                      </div>
                    }
                    header={<CertificateImage image={cert.image} title={cert.title} />}
                    icon={
                      <div className={cn("flex items-center gap-1.5", getCategoryColor(cert.category))}>
                        {getCategoryIcon(cert.category)}
                        <span className="text-xs font-semibold">{cert.category}</span>
                      </div>
                    }
                  />
                ))}
              </BentoGrid>
            )}
          </div>

          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{certificates.length}+</h4>
              <p className="text-gray-600">Professional Certifications</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <IconBrain className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{aiMlCertCount > 0 ? 'AI/ML' : 'Tech'}</h4>
              <p className="text-gray-600">Specialization Focus</p>
            </div>
            <div className="text-center bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-3xl font-bold text-gray-900 mb-2">{latestYear}</h4>
              <p className="text-gray-600">Most Recent Year</p>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 shadow-xl max-w-3xl">
              <h3 className="text-2xl font-bold text-white mb-4">
                Learning Philosophy
              </h3>
              <p className="text-gray-300 leading-relaxed">
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