"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Award, Target, Building, Sparkles } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerContainerFast, viewportOnce } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { useFirebaseDataWithCache } from '@/lib/useFirebaseCache';
import { getCache, setCache, DEFAULT_TTL } from '@/lib/cacheUtils';

interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  imageUrl: string;
  isActive: boolean;
  order: number;
}

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);

  useEffect(() => {
    // Try to load from cache first
    const cachedExperiences = getCache<ExperienceData[]>('experiences');
    if (cachedExperiences) {
      setExperiences(cachedExperiences);
      setIsCached(true);
      setLoading(false);
    }

    // Set up real-time listener
    const q = query(
      collection(db, 'experiences'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(
      q, 
      (querySnapshot) => {
        const experiencesData: ExperienceData[] = [];
        querySnapshot.forEach((doc) => {
          experiencesData.push({
            id: doc.id,
            ...doc.data()
          } as ExperienceData);
        });
        setExperiences(experiencesData);
        setCache('experiences', experiencesData, DEFAULT_TTL);
        setIsCached(false);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching experiences:', error);
        // If index error, try simpler query without orderBy
        if ((error as any).code === 'failed-precondition') {
          const simpleQuery = query(
            collection(db, 'experiences'),
            where('isActive', '==', true)
          );
          onSnapshot(simpleQuery, (querySnapshot) => {
            const experiencesData: ExperienceData[] = [];
            querySnapshot.forEach((doc) => {
              experiencesData.push({
                id: doc.id,
                ...doc.data()
              } as ExperienceData);
            });
            // Sort on client side
            experiencesData.sort((a, b) => a.order - b.order);
            setExperiences(experiencesData);
            setCache('experiences', experiencesData, DEFAULT_TTL);
            setLoading(false);
          });
        } else {
          // If error and we have cached data, use it
          if (cachedExperiences) {
            setExperiences(cachedExperiences);
            setIsCached(true);
          }
          setLoading(false);
        }
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="relative py-12 sm:py-16 lg:py-20 bg-secondary overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-3 sm:px-6 relative z-10">
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

  if (experiences.length === 0) {
    return (
      <section id="experience" className="relative py-12 sm:py-16 lg:py-20 bg-secondary overflow-hidden">
        <GridBackground />
        <div className="container mx-auto px-3 sm:px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-10 sm:mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
                <Building className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-3 sm:mb-4 font-bold">
                Professional Experience
              </h2>
            </div>
            <div className="text-center py-8 sm:py-12">
              <Building className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-3 sm:mb-4" />
              <p className="text-muted-foreground text-sm sm:text-base">No experience entries available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="relative py-12 sm:py-16 lg:py-20 bg-secondary overflow-hidden">
      <GridBackground />
      <div className="container mx-auto px-3 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12 lg:mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="text-xs sm:text-sm text-primary mb-2 block font-semibold">Career</span>
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2 sm:mb-4">
              <Building className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-foreground mb-2 sm:mb-4 font-bold">
              Professional Experience
            </h2>
          </motion.div>

          {/* Experience Cards */}
          {experiences.map((experience, cardIndex) => (
            <motion.div
              key={experience.id}
              className="relative bg-card rounded-lg sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-xl border border-border mb-6 sm:mb-8 lg:mb-10 overflow-hidden"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              transition={{ delay: cardIndex * 0.1 }}
            >
              <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} borderWidth={2} />
              <div className="relative z-10">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-12 sm:translate-x-16 -translate-y-12 sm:-translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-tr from-accent to-transparent rounded-full transform -translate-x-8 sm:-translate-x-12 translate-y-8 sm:translate-y-12"></div>
              
              <div className="relative z-10">
                {/* Header Section with Image and Title */}
                <div className="grid lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 border-b border-border pb-4 sm:pb-5 lg:pb-6 mb-4 sm:mb-5 lg:mb-6">
                  {/* Professional Image */}
                  <div className="lg:col-span-1 flex justify-center">
                    <div className="relative group w-full max-w-xs">
                      <div className="w-full bg-secondary rounded-xl sm:rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                        {experience.imageUrl ? (
                          <img 
                            src={experience.imageUrl} 
                            alt={`${experience.role} at ${experience.company}`}
                            className="w-full h-auto"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-48 sm:h-56 lg:h-64 flex items-center justify-center">
                            <Building className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Title and Company Info */}
                  <div className="lg:col-span-2 space-y-3 sm:space-y-4 lg:space-y-5">
                    <div className="flex flex-col">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 font-display">{experience.role}</h3>
                      <p className="text-sm sm:text-base lg:text-lg text-primary font-semibold flex items-center">
                        <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                        {experience.company}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      <div className="flex items-center text-muted-foreground bg-secondary px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                        <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                        <span className="font-medium">{experience.duration}</span>
                      </div>
                      <div className="flex items-center text-muted-foreground bg-secondary px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
                        <span className="font-medium">{experience.location}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm lg:text-base">
                      {experience.description}
                    </p>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-3 sm:space-y-4 lg:space-y-5">
                  {/* Responsibilities */}
                  {experience.responsibilities.length > 0 && (
                    <div className="bg-secondary rounded-lg sm:rounded-xl p-3 sm:p-4 lg:p-5 border border-border">
                      <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3 flex items-center font-display">
                        <Target className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-primary" />
                        Key Responsibilities
                      </h4>
                      <ul className="space-y-1.5 sm:space-y-2">
                        {experience.responsibilities.map((responsibility, index) => (
                          <li key={index} className="text-muted-foreground flex items-start text-xs sm:text-sm">
                            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 mr-1.5 sm:mr-2 flex-shrink-0"></div>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {experience.skills.length > 0 && (
                    <div className="pt-3 sm:pt-4 border-t border-border">
                      <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3 flex items-center font-display">
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-primary" />
                        Core Skills
                      </h4>
                      <motion.div
                        className="flex flex-wrap gap-1"
                        variants={staggerContainerFast}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportOnce}
                      >
                        {experience.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            variants={fadeInUp}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 bg-secondary text-secondary-foreground rounded-full text-xs border border-border hover:shadow-md hover:scale-105 transition-all duration-200"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;