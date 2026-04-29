
"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ArrowRight } from 'lucide-react';
import { fadeInUp, staggerContainerSlow } from '@/lib/animations';
import { GridBackground } from '@/components/ui/grid-background';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const roles = ['Full Stack Developer', 'ML Engineer', 'GenAI Engineer'];

  useEffect(() => {
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
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-background overflow-hidden pt-20 sm:pt-24 lg:pt-0">
      <GridBackground />

      <div className="container mx-auto px-3 sm:px-6 relative z-10 w-full">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-16 items-center">
            
            {/* Left Column - Content */}
            <motion.div
              className="space-y-5 sm:space-y-8"
              variants={staggerContainerSlow}
              initial="hidden"
              animate="visible"
            >
              {/* Main Heading */}
              <motion.div variants={fadeInUp} className="pt-8 sm:pt-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground mb-2 sm:mb-4 leading-tight font-bold">
                  <span className="block">
                    Pushk<span className="text-primary">a</span>r
                  </span>
                  <span className="block">
                    Sh<span className="text-primary">i</span>nde
                  </span>
                </h1>
                
                {/* Dynamic Role */}
                <div className="h-8 sm:h-12 mb-3 sm:mb-6">
                  <p className="text-base sm:text-xl lg:text-2xl text-muted-foreground font-medium font-display">
                    {displayText}
                    <span className="animate-pulse text-primary">|</span>
                  </p>
                </div>
                
                {/* Tagline */}
                <p className="text-sm sm:text-lg text-primary font-semibold mb-3 sm:mb-6 font-display">
                  I Build Brains for Machines
                </p>
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeInUp} className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                Hey, I am Pushkar. I want to simplify the world through software. 
                My passion lies in solving real-world problems that people face every day.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <a
                  href="/chatbot"
                  className="group px-5 sm:px-8 py-3 sm:py-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Chat with AI</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
                <a
                  href="/resume"
                  className="group px-5 sm:px-8 py-3 sm:py-4 border border-border bg-card text-foreground rounded-lg font-medium hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                >
                  <span>Resume</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={fadeInUp} className="flex items-center flex-wrap gap-1">
                <span className="text-muted-foreground text-xs sm:text-sm mr-2 sm:mr-4">Connect with me:</span>
                {[
                  { icon: Github, href: "https://github.com/Pushkar3232", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com/in/pushkarshinde6/", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:pushkarshinde006@gmail.com", label: "Email" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target={social.icon !== Mail ? "_blank" : undefined}
                    rel={social.icon !== Mail ? "noopener noreferrer" : undefined}
                    className="p-2.5 sm:p-3 text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-all duration-300"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Photo */}
            <motion.div
              className="flex justify-center lg:justify-end order-first lg:order-last mb-4 sm:mb-0"
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              <motion.div
                className="relative"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Photo Container */}
                <div className="relative w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                  {/* Background Elements */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary rounded-2xl transform rotate-3"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary to-primary/10 rounded-2xl transform -rotate-3"></div>
                  
                  {/* Photo Frame */}
                  <div className="relative w-full h-full bg-card rounded-2xl shadow-2xl overflow-hidden border-4 sm:border-8 border-card">
                    <div className="w-full h-full bg-gradient-to-br from-muted to-secondary flex items-center justify-center">
                      <div className="text-center">
                        <Image
                          src="/2ed.jpg"
                          alt="Pushkar Shinde"
                          fill
                          sizes="(max-width: 640px) 192px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 448px"
                          className="w-full h-full object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full shadow-lg"
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-6 h-6 bg-foreground rounded-full shadow-lg"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-20 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-2 bg-card rounded-full shadow-lg border border-border">
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;