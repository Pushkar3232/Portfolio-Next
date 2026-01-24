// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Hackathon", href: "#hackathon" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "AI", href: "/chatbot" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Wrapper for centering */}
      <div
        className={cn(
          "w-full flex justify-center",
          isScrolled ? "px-4 pt-4" : "px-0 pt-0"
        )}
        style={{
          transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
        }}
      >
        <nav
          className={cn(
            "flex items-center justify-between",
            isScrolled
              ? "bg-white shadow-lg border border-gray-200 rounded-full px-6 py-2"
              : "bg-white border-b border-gray-100 rounded-none px-6 py-4"
          )}
          style={{
            width: isScrolled ? "auto" : "100%",
            maxWidth: isScrolled ? "fit-content" : "100%",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)"
          }}
        >
          {/* Logo - Always visible, doesn't shrink */}
          <a
            href="#home"
            className="text-xl font-bold text-gray-900 whitespace-nowrap flex-shrink-0"
          >
            <span className="text-gray-500">P</span>ushkar
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 mx-8 flex-shrink-0">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 whitespace-nowrap"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button - Always visible, doesn't shrink */}
          <a
            href="#contact"
            className="hidden lg:inline-flex px-5 py-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            Contact Me
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-900 flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed top-20 inset-x-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-gray-100">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white text-center font-semibold rounded-lg transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
