/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, GraduationCap } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export default function Header({ currentView, onViewChange, theme, setTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home'},
    { id: 'calculator', label: 'GPA Calculator'},
    { id: 'cgpa', label: 'CGPA Tracker'},
    { id: 'target_gpa', label: 'Target Planner'},
    { id: 'resources', label: 'Academic Resources'},
    { id: 'about', label: 'About NIIBS'},
  ];

  const handleNav = (viewId: string) => {
    onViewChange(viewId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  return (
    <header
      id="main-app-header"
      className="sticky top-0 z-50 transition-all duration-300 no-print glass-nav"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & University Branding */}
          <div
            id="brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group relative"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 dark:bg-slate-800/40 backdrop-blur-md flex items-center justify-center rounded-xl shadow-sm border border-niibs-yellow/40 dark:border-niibs-yellow/60 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-[#2d3091] dark:text-niibs-yellow" />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display font-semibold text-xl sm:text-xl tracking-tight text-[#2d3091] dark:text-white">
                  NIIBS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-niibs-yellow/20 text-[#2d3091] dark:text-niibs-yellow font-mono font-medium tracking-wider">
                  CAMPUS
                </span>
              </div>
              <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide text-[#2d3091] dark:text-niibs-yellow uppercase block leading-none">
                GPA CALCULATOR
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5">
            {menuItems.map((item) => {
              const isActive = currentView === item.id;
              return (
                <button
                  id={`nav-btn-${item.id}`}
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium tracking-wide font-display transition-all duration-200 border ${
                    isActive
                      ? 'bg-niibs-blue/10 dark:bg-niibs-yellow/10 text-niibs-blue dark:text-niibs-yellow border-niibs-blue/20 dark:border-niibs-yellow/30 shadow-inner'
                      : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-white/40 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/40'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Configuration Actions */}
          <div className="flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggler"
              onClick={cycleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 bg-white/30 dark:bg-slate-800/30 text-slate-700 dark:text-slate-250 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all focus:outline-none focus:ring-2 focus:ring-niibs-yellow text-xs sm:text-sm font-mono flex items-center space-x-1 backdrop-blur-md"
              title={`Theme: ${theme}`}
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-niibs-yellow animate-pulse" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-[#4447b8]" />}
              {theme === 'system' && (
                <div className="flex items-center space-x-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1 text-slate-500">SYS</span>
                  <Sun className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-drawer-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:hidden rounded-xl bg-white/20 dark:bg-slate-800/20 text-slate-800 dark:text-white border border-slate-200/30 dark:border-slate-800/30 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200/40 dark:border-slate-800/30 bg-white/90 dark:bg-slate-900/90 shadow-2xl py-3 px-4 flex flex-col space-y-1.5 animate-in slide-in-from-top-4 duration-200 backdrop-blur-lg">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                id={`mobile-nav-btn-${item.id}`}
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-bold border transition-all ${
                  isActive
                    ? 'bg-niibs-blue/10 dark:bg-niibs-yellow/10 text-niibs-blue dark:text-niibs-yellow border-niibs-blue/25 dark:border-niibs-yellow/35'
                    : 'border-transparent text-slate-700 hover:text-slate-900 hover:bg-slate-100/40 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800/40'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
