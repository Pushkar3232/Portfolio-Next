"use client"

import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Award, Target, Building, Sparkles } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

  useEffect(() => {
    const q = query(
      collection(db, 'experiences'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const experiencesData: ExperienceData[] = [];
      querySnapshot.forEach((doc) => {
        experiencesData.push({
          id: doc.id,
          ...doc.data()
        } as ExperienceData);
      });
      setExperiences(experiencesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (experiences.length === 0) {
    return (
      <section id="experience" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Professional Experience
              </h2>
            </div>
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600">No experience entries available at the moment.</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

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

          {/* Experience Cards */}
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200 mb-12 overflow-hidden relative">
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
                        {experience.imageUrl ? (
                          <img 
                            src={experience.imageUrl} 
                            alt={`${experience.role} at ${experience.company}`}
                            className="w-full h-full object-cover object-center"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Building className="w-16 h-16 text-gray-400" />
                          </div>
                        )}
                      </div>
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
                    </div>

                    <p className="text-gray-600 leading-relaxed text-lg">
                      {experience.description}
                    </p>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="space-y-6 mb-8">
                  {/* Responsibilities */}
                  {experience.responsibilities.length > 0 && (
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
                  )}

                  {/* Skills */}
                  {experience.skills.length > 0 && (
                    <div className="pt-6 border-t border-gray-100">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Sparkles className="w-5 h-5 mr-2 text-purple-600" />
                        Core Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.skills.map((skill, index) => (
                          <span 
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 rounded-full text-sm border border-gray-200 hover:shadow-md hover:scale-105 transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;