import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { 
  Home, 
  Video, 
  VideoOff, 
  CreditCard, 
  BarChart, 
  LogOut, 
  GraduationCap,
  User,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const { signOut, userAttributes } = useAuth();
  const { darkMode } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const isCoach = userAttributes && userAttributes['custom:user_type'] === 'COACH';
  const isChurch = userAttributes && userAttributes['custom:user_type'] === 'CHURCH';
  
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  const NavItem = ({ to, icon, label }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-md mb-1 transition-all duration-200 ${
          isActive 
            ? 'bg-primary-600 text-white dark:bg-primary-800' 
            : 'text-gray-300 hover:bg-primary-700/50 hover:text-white dark:hover:bg-primary-900/50'
        }`}
        onClick={() => setIsMobileOpen(false)}
      >
        <div className="flex items-center">
          {icon}
          {(!isCollapsed || isMobileOpen) && (
            <motion.span 
              initial={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
              animate={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="ml-3"
            >
              {label}
            </motion.span>
          )}
        </div>
      </Link>
    );
  };

  // Sidebar content
  const sidebarContent = (
    <>
      <div className="px-4 py-6">
        <div className={`flex items-center ${isCollapsed && !isMobileOpen ? 'justify-center' : 'justify-between'} mb-8`}>
          {(!isCollapsed || isMobileOpen) && (
            <motion.h1 
              initial={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
              animate={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
              className="text-2xl font-bold text-white"
            >
              CoachFlow
            </motion.h1>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none hidden md:block"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronRight size={20} className={`transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
          <button 
            onClick={toggleMobileSidebar}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none md:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="space-y-1">
          <NavItem to="/" icon={<Home size={20} />} label="Dashboard" />
          
          {(isCoach || isChurch) && (
            <>
              <NavItem to="/content" icon={<Video size={20} />} label="Content Management" />
              <NavItem to="/live" icon={<VideoOff size={20} />} label="Live Sessions" />
              <NavItem to="/payments" icon={<CreditCard size={20} />} label="Payment Settings" />
              <NavItem to="/analytics" icon={<BarChart size={20} />} label="Analytics" />
            </>
          )}
          
          <NavItem to="/learn" icon={<GraduationCap size={20} />} label="Learning Portal" />
          <NavItem to="/profile" icon={<User size={20} />} label="Profile" />
          
          <button 
            onClick={handleLogout}
            className={`flex items-center w-full px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-700 hover:text-red-300 rounded-md mt-8 transition-all duration-200`}
          >
            <LogOut size={20} />
            {(!isCollapsed || isMobileOpen) && (
              <motion.span 
                initial={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
                animate={isCollapsed && !isMobileOpen ? { opacity: 0, width: 0 } : { opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="ml-3"
              >
                Logout
              </motion.span>
            )}
          </button>
        </nav>
      </div>
      
      <div className={`mt-auto p-4 ${isCollapsed && !isMobileOpen ? 'flex justify-center' : ''}`}>
        <ThemeToggle />
      </div>
    </>
  );
  
  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-20">
        <button
          onClick={toggleMobileSidebar}
          className="p-2 rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 focus:outline-none"
          aria-label="Open sidebar"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Mobile sidebar */}
      <div 
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-gray-900 opacity-75" onClick={toggleMobileSidebar}></div>
        <div className={`relative flex flex-col h-full max-w-xs w-full bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {sidebarContent}
        </div>
      </div>
      
      {/* Desktop sidebar */}
      <div className={`hidden md:flex h-screen sticky top-0 flex-col bg-gray-800 dark:bg-gray-900 text-white transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar;