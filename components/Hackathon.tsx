// components/Hackathon.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Calendar, MapPin, Award, Users, Target, ExternalLink, FileText } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';

interface HackathonData {
  id: string;
  title: string;
  organizer: string;
  date: string;
  location: string;
  description: string;
  achievement: string;
  technologies: string[];
  teamSize: string;
  teamName?: string;
  teamLogo?: string;
  imageUrl: string;
  projectUrl?: string;
  certificateUrl?: string;
  isActive: boolean;
  order: number;
}

const Hackathon: React.FC = () => {
  const [hackathons, setHackathons] = useState<HackathonData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'hackathons'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(
      q, 
      (querySnapshot) => {
        const hackathonsData: HackathonData[] = [];
        querySnapshot.forEach((doc) => {
          hackathonsData.push({
            id: doc.id,
            ...doc.data()
          } as HackathonData);
        });
        setHackathons(hackathonsData);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching hackathons:', error);
        if (error.code === 'failed-precondition') {
          const simpleQuery = query(
            collection(db, 'hackathons'),
            where('isActive', '==', true)
          );
          onSnapshot(simpleQuery, (querySnapshot) => {
            const hackathonsData: HackathonData[] = [];
            querySnapshot.forEach((doc) => {
              hackathonsData.push({
                id: doc.id,
                ...doc.data()
              } as HackathonData);
            });
            hackathonsData.sort((a, b) => a.order - b.order);
            setHackathons(hackathonsData);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="hackathon" className="py-12 sm:py-16 lg:py-20 bg-secondary">
        <div className="container mx-auto px-3 sm:px-6">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-6 sm:h-8 bg-muted rounded w-48 sm:w-64 mx-auto mb-3 sm:mb-4"></div>
              <div className="h-3 sm:h-4 bg-muted rounded w-64 sm:w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (hackathons.length === 0) {
    return null;
  }

  return (
    <section id="hackathon" className="relative py-10 sm:py-14 lg:py-18 bg-secondary overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-14"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-lg sm:rounded-xl mb-2 sm:mb-3 shadow-sm">
              <Trophy className="w-4 h-4 sm:w-5 md:w-6 sm:h-5 md:h-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-4 font-bold">
              Hackathon Achievements
            </h2>
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-primary to-primary/60 mx-auto mb-3 sm:mb-5 rounded-full"></div>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Competitive coding challenges and collaborative projects that showcase innovation and problem-solving
            </p>
          </motion.div>

          {/* Hackathon Cards */}
          <motion.div
            className={`grid gap-3 sm:gap-4 lg:gap-5 ${hackathons.length === 1 ? 'max-w-2xl mx-auto' : 'md:grid-cols-2 lg:grid-cols-2'}`}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            {hackathons.map((hackathon) => (
              <motion.div
                key={hackathon.id}
                variants={fadeInUp}
                className="relative bg-card rounded-lg sm:rounded-xl shadow-sm overflow-hidden border border-border"
                whileHover={{ y: -6, boxShadow: '0 16px 32px rgba(0,0,0,0.1)', transition: { duration: 0.2 } }}
              >
                <GlowingEffect spread={40} glow={true} disabled={true} proximity={64} inactiveZone={0.01} borderWidth={2} />
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-muted to-secondary overflow-hidden group h-40 sm:h-44 md:h-48">
                  <img
                    src={hackathon.imageUrl}
                    alt={hackathon.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Achievement Badge */}
                  <div className="absolute top-2 right-2 sm:top-2.5 sm:right-2.5 transform transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-0.5 px-2 sm:px-2.5 py-1 bg-primary text-primary-foreground rounded-full text-xs font-bold shadow-md backdrop-blur-sm">
                      <Award className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {hackathon.achievement}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-2.5 sm:p-3 md:p-4">
                  {/* Title & Organizer */}
                  <div className="mb-2">
                    <h3 className="text-sm sm:text-base font-bold text-foreground mb-0.5 line-clamp-2 leading-snug font-display">
                      {hackathon.title}
                    </h3>
                    <div className="flex items-center text-primary font-medium text-xs">
                      <div className="w-1 h-1 bg-primary rounded-full mr-1"></div>
                      <span className="truncate">{hackathon.organizer}</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-3 gap-0.5 sm:gap-1 mb-2">
                    <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 bg-primary/10 rounded-sm sm:rounded-md">
                      <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary mb-0.5" />
                      <span className="text-[10px] sm:text-xs font-medium text-foreground leading-tight">{hackathon.date}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 bg-accent rounded-sm sm:rounded-md">
                      <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary mb-0.5" />
                      <span className="text-[10px] sm:text-xs font-medium text-foreground leading-tight">{hackathon.location}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 bg-accent rounded-sm sm:rounded-md">
                      <Users className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary mb-0.5" />
                      <span className="text-[10px] sm:text-xs font-medium text-foreground leading-tight">{hackathon.teamSize}</span>
                    </div>
                  </div>

                  {/* Team Info */}
                  {hackathon.teamName && (
                    <div className="bg-accent rounded-lg p-1.5 sm:p-2 mb-2 border border-border">
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {hackathon.teamLogo && (
                          <div className="flex-shrink-0">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-card rounded-md p-0.5 sm:p-1 shadow-sm flex items-center justify-center">
                              <img
                                src={hackathon.teamLogo}
                                alt={hackathon.teamName}
                                className="w-full h-full object-contain"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-0.5 mb-0.5">
                            <Target className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-primary flex-shrink-0" />
                            <span className="text-[10px] sm:text-xs text-primary font-semibold uppercase">Team</span>
                          </div>
                          <p className="text-xs font-bold text-foreground truncate">{hackathon.teamName}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-muted-foreground text-xs leading-relaxed mb-2 line-clamp-2">
                    {hackathon.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-0.5 mb-1">
                      <Target className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-foreground" />
                      <span className="text-[10px] sm:text-xs font-bold text-foreground uppercase">Tech</span>
                    </div>
                    <div className="flex flex-wrap gap-0.5 sm:gap-1">
                      {hackathon.technologies.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-1 sm:px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] sm:text-xs font-medium border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {hackathon.technologies.length > 4 && (
                        <span className="px-1 sm:px-1.5 py-0.5 bg-secondary text-secondary-foreground rounded text-[10px] sm:text-xs font-medium border border-border">
                          +{hackathon.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project and Certificate Links */}
                  {(hackathon.projectUrl || hackathon.certificateUrl) && (
                    <div className={`flex gap-1 sm:gap-1.5 pt-1.5 sm:pt-2 border-t border-border ${!hackathon.projectUrl || !hackathon.certificateUrl ? 'justify-center' : ''}`}>
                      {hackathon.projectUrl && (
                        <a
                          href={hackathon.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] sm:text-xs font-semibold rounded-lg transition-all"
                        >
                          <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Project</span>
                        </a>
                      )}
                      {hackathon.certificateUrl && (
                        <a
                          href={hackathon.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 bg-foreground hover:bg-foreground/90 text-background text-[10px] sm:text-xs font-semibold rounded-lg transition-all"
                        >
                          <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          <span>Certificate</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hackathon;
