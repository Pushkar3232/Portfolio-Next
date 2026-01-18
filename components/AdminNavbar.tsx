// components/AdminNavbar.tsx
"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  GraduationCap, 
  Building, 
  LayoutDashboard, 
  LogOut,
  User
} from 'lucide-react';

interface AdminNavbarProps {
  currentPage: 'dashboard' | 'education' | 'experience';
  title: string;
  subtitle: string;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ currentPage, title, subtitle }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Title */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-gray-900 rounded-lg flex items-center justify-center">
                {currentPage === 'education' && <GraduationCap className="w-5 h-5 text-white" />}
                {currentPage === 'experience' && <Building className="w-5 h-5 text-white" />}
                {currentPage === 'dashboard' && <LayoutDashboard className="w-5 h-5 text-white" />}
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link 
                href="/admin/dashboard"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'dashboard'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
              </Link>
              
              <Link 
                href="/admin/education"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'education'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <GraduationCap className="w-4 h-4 mr-2" />
                Education
              </Link>
              
              <Link 
                href="/admin/experience"
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  currentPage === 'experience'
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Building className="w-4 h-4 mr-2" />
                Experience
              </Link>
            </nav>
          </div>
          
          {/* Right Section - User Profile and Actions */}
          <div className="flex items-center space-x-4">
            {/* User Profile */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.email?.split('@')[0] || 'Admin'}
                </p>
              </div>
            </div>

            {/* Sign Out Button */}
            <button
              onClick={handleSignOut}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 hover:border-gray-400 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
