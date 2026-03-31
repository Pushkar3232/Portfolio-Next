// components/Footer.tsx

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import { fadeInUp, viewportOnce } from '@/lib/animations';

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Chat with AI', href: '/chatbot' },
  ];

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Pushkar3232',
      icon: <Github className="w-5 h-5" />
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/pushkarshinde6/',
      icon: <Linkedin className="w-5 h-5" />
    },
    {
      name: 'Email',
      href: 'mailto:pushkarshinde006@gmail.com',
      icon: <Mail className="w-5 h-5" />
    }
  ];

  return (
    <footer className="bg-card border-t border-border pb-16 sm:pb-0">
      <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 lg:py-10">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-5 sm:mb-6 lg:mb-8">
            {/* Brand Section */}
            <div className="sm:col-span-2">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-1 font-display">
                  <span className="text-primary">P</span>ushkar Amar Shinde
                </h3>
                <p className="text-primary font-semibold mb-1 sm:mb-2 text-xs sm:text-sm">
                  Full Stack Developer • ML Engineer • GenAI Engineer
                </p>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  Building brains for machines and simplifying the world through software. 
                  Passionate about creating innovative solutions that solve real-world problems.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-2 sm:space-x-3">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-muted rounded-full hover:bg-accent transition-colors duration-200 group"
                    aria-label={link.name}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <div className="text-muted-foreground group-hover:text-primary transition-colors duration-200 text-sm">
                      {link.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-foreground mb-2 sm:mb-3 lg:mb-4">Quick Links</h4>
              <ul className="space-y-1">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Get In Touch</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-muted-foreground text-xs sm:text-sm">
                  <span className="text-foreground font-medium">Email:</span><br />
                  pushkarshinde006@gmail.com
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  <span className="text-foreground font-medium">Status:</span><br />
                  <span className="text-primary">Available for work</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 sm:pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-muted-foreground text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                  Made with <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mx-1" /> by Pushkar Amar Shinde
                </p>
                <p className="text-muted-foreground/60 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                  © <span suppressHydrationWarning>{new Date().getFullYear()}</span> All rights reserved.
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-muted hover:bg-accent text-muted-foreground hover:text-foreground rounded-lg transition-all duration-200 group"
              >
                <ArrowUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:-translate-y-1 transform transition-transform duration-200" />
                <span className="text-xs sm:text-sm">Back to Top</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
