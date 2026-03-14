// components/Header.tsx
"use client";

import React from "react";
import { Home, User, Wrench, Briefcase, Trophy, FolderOpen, GraduationCap, Mail } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const Header: React.FC = () => {
  const navItems = [
    { name: "Home", url: "#home", icon: Home },
    { name: "About", url: "#about", icon: User },
    { name: "Skills", url: "#skills", icon: Wrench },
    { name: "Experience", url: "#experience", icon: Briefcase },
    { name: "Education", url: "#education", icon: GraduationCap },
    { name: "Hackathon", url: "#hackathon", icon: Trophy },
    { name: "Projects", url: "#projects", icon: FolderOpen },
    { name: "Contact", url: "#contact", icon: Mail },
  ];

  return (
    <header className="z-50">
      <NavBar items={navItems} />
    </header>
  );
};

export default Header;
