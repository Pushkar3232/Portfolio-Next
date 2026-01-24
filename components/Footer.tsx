// components/Footer.tsx

"use client";

import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

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
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Brand Section */}
            <div className="sm:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1.5 sm:mb-2">
                  <span className="text-blue-400">P</span>ushkar Amar Shinde
                </h3>
                <p className="text-blue-400 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm">
                  Full Stack Developer • ML Engineer • GenAI Engineer
                </p>
                <p className="text-gray-400 leading-relaxed text-xs sm:text-sm">
                  Building brains for machines and simplifying the world through software. 
                  Passionate about creating innovative solutions that solve real-world problems.
                </p>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-3 sm:space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 sm:p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors duration-200 group"
                    aria-label={link.name}
                  >
                    <div className="text-gray-400 group-hover:text-blue-400 transition-colors duration-200">
                      {link.icon}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Quick Links</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-xs sm:text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Get In Touch</h4>
              <div className="space-y-1.5 sm:space-y-2">
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-white font-medium">Email:</span><br />
                  pushkarshinde006@gmail.com
                </p>
                <p className="text-gray-400 text-xs sm:text-sm">
                  <span className="text-white font-medium">Status:</span><br />
                  <span className="text-green-400">Available for work</span>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-6 sm:pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-center sm:text-left">
                <p className="text-gray-400 text-xs sm:text-sm flex items-center justify-center sm:justify-start">
                  Made with <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 mx-1" /> by Pushkar Amar Shinde
                </p>
                <p className="text-gray-500 text-[10px] sm:text-xs mt-0.5 sm:mt-1">
                  © {new Date().getFullYear()} All rights reserved.
                </p>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition-all duration-200 group"
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
