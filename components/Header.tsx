// components/Header.tsx
"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Home, User, Wrench, Briefcase, Trophy, FolderOpen, GraduationCap, Bot, Mail, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { ToggleTheme } from "@/components/ui/toggle-theme";

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
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="w-full flex items-center justify-center px-4 pt-4">
        <div className="flex items-center gap-3">
          <NavBar items={navItems} className="static translate-x-0 mb-0 pt-0" />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};

export default Header;
