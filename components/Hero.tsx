
"use client";

import React, { useEffect, useState } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const roles = ['Full Stack Developer', 'ML Engineer', 'GenAI Engineer'];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = roles[currentIndex];
    let index = 0;
    setDisplayText('');
    
    const typeWriter = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typeWriter);
      }
    }, 80);

    return () => clearInterval(typeWriter);
  }, [currentIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-white">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f1f5f9 0%, transparent 50%), 
                           radial-gradient(circle at 75% 75%, #e2e8f0 0%, transparent 50%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      {/* Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 border border-gray-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 border border-blue-200 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-2 h-16 bg-gradient-to-b from-blue-500 to-transparent opacity-20"></div>
        <div className="absolute top-1/3 right-10 w-2 h-20 bg-gradient-to-b from-gray-400 to-transparent opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10">
        <div className={`max-w-6xl mx-auto transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              
              

              {/* Main Heading */}
              <div className="pt-16 sm:pt-20 lg:pt-0">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  <span className="block">
                    Pushk<span className="text-blue-600">a</span>r
                  </span>
                  <span className="block">
                    Sh<span className="text-blue-600">i</span>nde
                  </span>
                </h1>
                
                {/* Dynamic Role */}
                <div className="h-10 sm:h-12 mb-4 sm:mb-6">
                  <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 font-medium">
                    {displayText}
                    <span className="animate-pulse text-blue-600">|</span>
                  </p>
                </div>
                
                {/* Tagline */}
                <p className="text-base sm:text-lg text-blue-600 font-semibold mb-4 sm:mb-6">
                  I Build Brains for Machines
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-lg">
                Hey, I am Pushkar. I want to simplify the world through software. 
                My passion lies in solving real-world problems that people face every day.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="#projects"
                  className="group px-6 sm:px-8 py-3 sm:py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="/chatbot"
                  className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
>
                  
                  <span>Chat with AI</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center flex-wrap gap-1">
                <span className="text-gray-500 text-xs sm:text-sm mr-2 sm:mr-4">Connect with me:</span>
                {[
                  { icon: Github, href: "https://github.com/Pushkar3232", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/pushkarshinde6/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:pushkarshinde006@gmail.com", label: "Email" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target={social.icon !== Mail ? "_blank" : undefined}
                    rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                    className="p-3 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column - Photo */}
            <div className="flex justify-center lg:justify-end order-first lg:order-last mb-6 lg:mb-0">
              <div className="relative">
                {/* Photo Container */}
                <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-gray-100 rounded-2xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-blue-50 rounded-2xl transform -rotate-3"></div>
                  
                  {/* Photo Frame */}
                  <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-white">
                    {/* Placeholder for Photo */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <div className="text-center">
                        
                        <img 
                      src="2ed.jpg" 
                      alt="Pushkar Shinde" 
                      className="w-full h-full object-cover"
                    />
                      </div>
                    </div>
                    
                    
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-full shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gray-900 rounded-full shadow-lg"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-2 bg-white rounded-full shadow-lg border border-gray-200">
            <ChevronDown className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;