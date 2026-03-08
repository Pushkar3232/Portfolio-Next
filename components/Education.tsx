// components/Education.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { GraduationCap, Award, BookOpen, Calendar, ExternalLink, Trophy } from 'lucide-react';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { cn } from '@/lib/utils';
import { GridBackground } from '@/components/ui/grid-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';
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
      <section id="education" className="relative py-20 bg-card overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-muted-foreground font-medium">Loading education data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aiMlCertCount = certificates.filter(c => c.category === 'AI/ML').length;
  const latestYear = educationData.length > 0 ? educationData[0].year : new Date().getFullYear();

  return (
    <section id="education" className="relative py-12 sm:py-16 lg:py-20 bg-card overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-display text-foreground mb-3 sm:mb-4">
              Education & Certifications
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto px-2">
              Continuous learning in technology and development
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 mr-2 sm:mr-3 text-foreground" />
              Academic Background
            </h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
              {educationData.length === 0 ? (
                <div className="sm:col-span-2 lg:col-span-3 bg-card rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm border border-border text-center">
                  <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">No education entries yet</p>
                </div>
              ) : (
                educationData.map((edu) => (
                  <div 
                    key={edu.id} 
                    className="relative bg-background rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-lg hover:border-foreground/20 transition-all duration-300 group"
                  >
                    <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                        <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-foreground to-muted rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <GraduationCap className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-background" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                            {edu.degree}
                          </h4>
                          <p className="text-foreground font-medium text-xs sm:text-sm mt-0.5 sm:mt-1">
                            {edu.institution}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center text-muted-foreground mb-2 sm:mb-3">
                        <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                        <span className="text-xs sm:text-sm font-medium">{edu.status} • {edu.year}</span>
                      </div>
                      <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-grow">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Certifications Section - Bento Grid */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-5 sm:mb-6 lg:mb-8 flex items-center justify-center">
              <Award className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 mr-2 sm:mr-3 text-foreground" />
              Professional Certifications
            </h3>
            
            {certificates.length === 0 ? (
              <div className="bg-card rounded-xl p-8 border border-border shadow-sm text-center max-w-md mx-auto">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No certificates yet</p>
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
                        <p className="text-foreground font-medium">{cert.provider}</p>
                        <div className="flex items-center text-muted-foreground text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {cert.date}
                        </div>
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-medium rounded-lg transition-all duration-200 hover:shadow-md hover:scale-105 mt-2"
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
          <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            <div className="text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-primary to-primary/70 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Trophy className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-primary-foreground" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{certificates.length}+</h4>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Professional Certifications</p>
            </div>
            <div className="text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-accent to-accent/70 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <IconBrain className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-accent-foreground" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{aiMlCertCount > 0 ? 'AI/ML' : 'Tech'}</h4>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Specialization Focus</p>
            </div>
            <div className="text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300">
              <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <GraduationCap className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-primary-foreground" />
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{latestYear}</h4>
              <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Most Recent Year</p>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <div className="inline-block bg-secondary rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl max-w-3xl mx-4">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-3 sm:mb-4">
                Learning Philosophy
              </h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm lg:text-base">
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