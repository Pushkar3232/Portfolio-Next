// components/Hackathon.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Award, Users, Target, ExternalLink, FileText } from 'lucide-react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

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
      <section id="hackathon" className="py-20 bg-gray-50">
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

  if (hackathons.length === 0) {
    return null;
  }

  return (
    <section id="hackathon" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl mb-4 shadow-sm">
              <Trophy className="w-7 h-7 text-yellow-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hackathon Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-500 mx-auto mb-6 rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Competitive coding challenges and collaborative projects that showcase innovation and problem-solving
            </p>
          </div>

          {/* Hackathon Cards */}
          <div className={`grid gap-6 ${hackathons.length === 1 ? 'max-w-2xl mx-auto' : 'lg:grid-cols-2'}`}>
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden rounded-t-xl group flex items-center justify-center max-h-52">
                  <img
                    src={hackathon.imageUrl}
                    alt={hackathon.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Achievement Badge */}
                  <div className="absolute top-2.5 right-2.5 transform transition-all duration-300 group-hover:scale-105">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-white rounded-full text-xs font-bold shadow-md backdrop-blur-sm border border-white/20">
                      <Award className="w-3.5 h-3.5" />
                      {hackathon.achievement}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-5">
                  {/* Title & Organizer */}
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
                      {hackathon.title}
                    </h3>
                    <div className="flex items-center text-blue-600 font-medium text-xs">
                      <div className="w-1 h-1 bg-blue-600 rounded-full mr-2"></div>
                      <span className="truncate">{hackathon.organizer}</span>
                    </div>
                  </div>

                  {/* Meta Info */}
                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    <div className="flex flex-col items-center justify-center text-center p-2 bg-blue-50 rounded-md">
                      <Calendar className="w-3.5 h-3.5 text-blue-600 mb-0.5" />
                      <span className="text-xs font-medium text-gray-700 leading-tight">{hackathon.date}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-2 bg-purple-50 rounded-md">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 mb-0.5" />
                      <span className="text-xs font-medium text-gray-700 leading-tight">{hackathon.location}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center p-2 bg-green-50 rounded-md">
                      <Users className="w-3.5 h-3.5 text-green-600 mb-0.5" />
                      <span className="text-xs font-medium text-gray-700 leading-tight">{hackathon.teamSize}</span>
                    </div>
                  </div>

                  {/* Team Info */}
                  {hackathon.teamName && (
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-3 mb-3 border border-indigo-100">
                      <div className="flex items-center gap-2.5">
                        {hackathon.teamLogo && (
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-white rounded-lg p-1.5 shadow-sm flex items-center justify-center">
                              <img
                                src={hackathon.teamLogo}
                                alt={hackathon.teamName}
                                className="w-full h-full object-contain"
                              />
                            </div>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-0.5">
                            <Target className="w-3 h-3 text-indigo-600 flex-shrink-0" />
                            <span className="text-xs text-indigo-600 font-semibold uppercase">Team</span>
                          </div>
                          <p className="text-xs font-bold text-gray-900 truncate">{hackathon.teamName}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                    {hackathon.description}
                  </p>

                  {/* Technologies */}
                  <div className="mb-4">
                    <div className="flex items-center gap-1 mb-2">
                      <Target className="w-3 h-3 text-gray-700" />
                      <span className="text-xs font-bold text-gray-700 uppercase">Tech</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {hackathon.technologies.slice(0, 6).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200"
                        >
                          {tech}
                        </span>
                      ))}
                      {hackathon.technologies.length > 6 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium border border-gray-200">
                          +{hackathon.technologies.length - 6}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project and Certificate Links */}
                  {(hackathon.projectUrl || hackathon.certificateUrl) && (
                    <div className={`flex gap-2 pt-3 border-t border-gray-100 ${!hackathon.projectUrl || !hackathon.certificateUrl ? 'justify-center' : ''}`}>
                      {hackathon.projectUrl && (
                        <a
                          href={hackathon.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Project</span>
                        </a>
                      )}
                      {hackathon.certificateUrl && (
                        <a
                          href={hackathon.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded-lg transition-all"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Certificate</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hackathon;
