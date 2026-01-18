// components/Hackathon.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Award, Users, Target, ExternalLink, Sparkles } from 'lucide-react';
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
  imageUrl: string;
  projectUrl?: string;
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
            <div className="inline-flex items-center justify-center p-2 bg-yellow-100 rounded-full mb-4">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hackathon Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Competitive coding challenges and collaborative projects that showcase innovation and problem-solving
            </p>
          </div>

          {/* Hackathon Cards */}
          <div className="space-y-8">
            {hackathons.map((hackathon, index) => (
              <div
                key={hackathon.id}
                className={`group relative bg-gradient-to-br ${
                  index % 2 === 0 
                    ? 'from-white to-gray-50' 
                    : 'from-gray-50 to-white'
                } rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200`}
              >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-100 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-transparent rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>

                <div className="relative p-8 md:p-10">
                  <div className="grid md:grid-cols-3 gap-8 items-center">
                    {/* Image Section */}
                    <div className="md:col-span-1">
                      <div className="relative group/img">
                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl blur-lg opacity-20 group-hover/img:opacity-40 transition-opacity"></div>
                        <img
                          src={hackathon.imageUrl}
                          alt={hackathon.title}
                          className="relative w-full h-64 object-contain rounded-xl transform group-hover/img:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:col-span-2 space-y-6">
                      {/* Header */}
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                              {hackathon.title}
                            </h3>
                            <p className="text-lg text-blue-600 font-semibold flex items-center">
                              <Sparkles className="w-4 h-4 mr-2" />
                              {hackathon.organizer}
                            </p>
                          </div>
                        </div>

                        {/* Achievement Badge */}
                        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-semibold shadow-lg">
                          <Award className="w-4 h-4 mr-2" />
                          {hackathon.achievement}
                        </div>
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                          <Calendar className="w-4 h-4 mr-2" />
                          {hackathon.date}
                        </div>
                        <div className="flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium">
                          <MapPin className="w-4 h-4 mr-2" />
                          {hackathon.location}
                        </div>
                        <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium">
                          <Users className="w-4 h-4 mr-2" />
                          {hackathon.teamSize}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {hackathon.description}
                      </p>

                      {/* Technologies */}
                      <div>
                        <div className="flex items-center text-gray-700 font-semibold mb-3">
                          <Target className="w-4 h-4 mr-2" />
                          Technologies Used
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {hackathon.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Project Link */}
                      {hackathon.projectUrl && (
                        <div>
                          <a
                            href={hackathon.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
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
