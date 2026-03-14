// components/Education.tsx
"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getCache, setCache, DEFAULT_TTL } from '@/lib/cacheUtils';
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
    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-muted">
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover/bento:scale-105"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted/70 to-muted/50">
          <IconCertificate className="w-10 h-10 text-muted-foreground" />
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
    // Try to load from cache first
    const cachedEducation = getCache<EducationData[]>('education');
    const cachedCerts = getCache<Certificate[]>('certificates');

    if (cachedEducation) {
      setEducationData(cachedEducation);
    }
    if (cachedCerts) {
      setCertificates(cachedCerts);
    }

    // If both are cached, set loading to false immediately
    if (cachedEducation && cachedCerts) {
      setLoading(false);
    }

    // Fetch Education Data
    const educationQuery = query(
      collection(db, 'education'),
      orderBy('year', 'asc')
    );
    
    const unsubEducation = onSnapshot(
      educationQuery,
      (snapshot) => {
        const data: EducationData[] = [];
        snapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() } as EducationData);
        });
        setEducationData(data);
        setCache('education', data, DEFAULT_TTL);
        console.log('Education data loaded:', data);
      },
      (error) => {
        console.error('Error fetching education:', error);
        // Use cached data if available
        if (!cachedEducation) {
          setLoading(false);
        }
      }
    );

    // Fetch Certificates
    const certQuery = query(
      collection(db, 'certificates')
    );
    
    const unsubCerts = onSnapshot(
      certQuery,
      (snapshot) => {
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
        setCache('certificates', sortedData, DEFAULT_TTL);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching certificates:', error);
        // Use cached data if available
        if (!cachedCerts) {
          setLoading(false);
        }
      }
    );

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
      <section id="education" className="relative py-12 sm:py-16 lg:py-20 bg-card overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-3 sm:px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[300px] sm:min-h-[400px]">
            <div className="flex flex-col items-center space-y-3 sm:space-y-4">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-muted-foreground font-medium text-sm sm:text-base">Loading education data...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const aiMlCertCount = certificates.filter(c => c.category === 'AI/ML').length;
  const latestYear = educationData.length > 0 ? educationData[0].year : new Date().getFullYear();

  return (
    <section id="education" className="relative py-10 sm:py-14 lg:py-18 bg-card overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-4 font-bold">
              Education & Certifications
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2">
              Continuous learning in technology and development
            </p>
          </div>

          {/* Education Section - Timeline View */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2 sm:mb-3 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 sm:w-6 md:w-7 sm:h-6 md:h-7 mr-2 text-primary" />
                Academic Background
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm">My educational journey and milestones</p>
            </div>
            
            {educationData.length === 0 ? (
              <div className="bg-card rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-sm border border-border text-center max-w-md mx-auto">
                <GraduationCap className="w-10 h-10 sm:w-12 text-muted-foreground mx-auto mb-2 sm:mb-3" />
                <p className="text-muted-foreground text-sm">No education entries yet</p>
              </div>
            ) : (
              <div className="relative">
                {/* Timeline connector line - vertical center */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 transform -translate-x-1/2"></div>
                
                <div className="space-y-6 sm:space-y-8 lg:space-y-10">
                  {educationData.map((edu, index) => {
                    const isCurrentOrLatest = edu.status.toLowerCase().includes('current') || edu.status.toLowerCase().includes('pursuing');
                    const isAlternate = index % 2 === 1;
                    
                    return (
                      <div key={edu.id} className="relative">
                        {/* Timeline dot */}
                        <div className="hidden md:flex absolute left-1/2 top-8 w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary/80 border-4 border-background shadow-lg transform -translate-x-1/2 items-center justify-center z-10">
                          <div className={`absolute inset-0 rounded-full animate-pulse ${isCurrentOrLatest ? 'bg-primary/50' : 'bg-primary/20'}`}></div>
                        </div>
                        
                        {/* Content card */}
                        <div className={`md:w-1/2 ${isAlternate ? 'md:ml-auto md:pl-6 lg:pl-8' : 'md:pr-6 lg:pr-8'}`}>
                          <div 
                            className={`relative group overflow-hidden rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-xl transition-all duration-500 border border-primary/20 hover:border-primary/50
                              ${isCurrentOrLatest 
                                ? 'bg-primary/25' 
                                : 'bg-secondary/40'
                              }
                            `}
                          >
                            <div className="relative z-10 space-y-4">
                              {/* Header with status badge */}
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-x-110 group-hover:scale-y-110 
                                      ${isCurrentOrLatest 
                                        ? 'bg-gradient-to-br from-primary to-primary/80 shadow-lg shadow-primary/30' 
                                        : 'bg-gradient-to-br from-muted-foreground/40 to-muted-foreground/50 shadow-lg shadow-muted-foreground/20'
                                      }`}>
                                      <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                                    </div>
                                    <div className="flex-1">
                                      <h4 className="text-sm sm:text-base lg:text-lg font-bold text-foreground">
                                        {edu.degree}
                                      </h4>
                                    </div>
                                  </div>
                                  <p className="text-foreground font-semibold text-xs sm:text-sm lg:text-base">
                                    {edu.institution}
                                  </p>
                                </div>
                                
                                {/* Status badge */}
                                {isCurrentOrLatest && (
                                  <div className="inline-flex items-center px-3 py-1.5 rounded-full text-primary-foreground text-xs font-semibold bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/40 animate-pulse whitespace-nowrap">
                                    <span className="inline-block w-2 h-2 rounded-full bg-primary-foreground mr-1.5 animate-pulse"></span>
                                    Current
                                  </div>
                                )}
                              </div>
                              
                              {/* Year and details */}
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                                <div className="flex items-center text-muted-foreground text-xs sm:text-sm font-semibold">
                                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary/60" />
                                  <span>{edu.year}</span>
                                </div>
                                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-muted-foreground/40"></div>
                                <span className="text-muted-foreground text-xs sm:text-sm font-medium px-3 py-1 rounded-full bg-muted/40">
                                  {edu.status}
                                </span>
                              </div>
                              
                              {/* Description */}
                              <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed bg-background/40 rounded-lg p-3 sm:p-4">
                                {edu.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Certifications Section - Bento Grid */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-5 lg:mb-6 flex items-center justify-center">
              <Award className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6 mr-2 text-foreground" />
              Professional Certifications
            </h3>
            
            {certificates.length === 0 ? (
              <div className="bg-card rounded-lg sm:rounded-xl p-6 sm:p-8 border border-border shadow-sm text-center max-w-md mx-auto">
                <Award className="w-10 h-10 sm:w-12 text-muted-foreground mx-auto mb-2 sm:mb-3" />
                <p className="text-muted-foreground text-sm">No certificates yet</p>
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
            <div className="relative text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-primary to-primary/70 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <Trophy className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-primary-foreground" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{certificates.length}+</h4>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Professional Certifications</p>
              </div>
            </div>
            <div className="relative text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-accent to-accent/70 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <IconBrain className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-accent-foreground" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{aiMlCertCount > 0 ? 'AI/ML' : 'Tech'}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Specialization Focus</p>
              </div>
            </div>
            <div className="relative text-center bg-card rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm border border-border hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10">
                <div className="w-10 h-10 sm:w-12 lg:w-14 sm:h-12 lg:h-14 bg-gradient-to-br from-primary to-accent rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <GraduationCap className="w-5 h-5 sm:w-6 lg:w-7 sm:h-6 lg:h-7 text-primary-foreground" />
                </div>
                <h4 className="text-2xl sm:text-3xl font-bold text-foreground mb-1 sm:mb-2">{latestYear}</h4>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">Most Recent Year</p>
              </div>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="mt-10 sm:mt-12 lg:mt-16 text-center">
            <div className="relative inline-block bg-secondary rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8 shadow-xl max-w-3xl mx-4 overflow-hidden">
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10">
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
      </div>
    </section>
  );
};

export default Education;