// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Home, User, Wrench, Briefcase, Trophy, FolderOpen, GraduationCap, Bot, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Header: React.FC = () => {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Skills", url: "#skills", icon: Wrench },
    { name: "Experience", url: "#experience", icon: Briefcase },
    { name: "Hackathon", url: "#hackathon", icon: Trophy },
    { name: "Projects", url: "#projects", icon: FolderOpen },
    { name: "Education", url: "#education", icon: GraduationCap },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return (
    <header className="fixed top-0 sm:top-0 bottom-0 sm:bottom-auto inset-x-0 z-50 mb-0 sm:mb-0 flex sm:flex items-end sm:items-start justify-center sm:justify-center px-2 sm:px-4 py-3 sm:pt-4 sm:pb-0">
      <nav className="sm:static sm:translate-x-0 mb-0 sm:pt-0">
        <NavBar items={navItems} className="static translate-x-0 mb-0 pt-0" />
      </nav>
    </header>
  );
};

export default Header;
