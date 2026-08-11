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
      className={`sticky top-0 z-50 transition-all duration-500 no-print ${
        isScrolled 
          ? 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl shadow-lg shadow-slate-200/20 dark:shadow-black/40 border-b border-slate-200/60 dark:border-slate-800/80 py-1' 
          : 'bg-transparent py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 transition-all duration-300">
          {/* Logo & University Branding */}
          <div
            id="brand-logo"
            onClick={() => handleNav('home')}
            className="flex items-center space-x-3 cursor-pointer group relative"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white/40 dark:bg-slate-800/60 backdrop-blur-md flex items-center justify-center rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/60 group-hover:scale-105 group-hover:border-niibs-blue/40 dark:group-hover:border-niibs-yellow/40 group-hover:shadow-md transition-all duration-300 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-niibs-blue/5 to-transparent dark:from-niibs-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-niibs-blue dark:text-niibs-yellow relative z-10" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-display font-bold text-xl sm:text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-niibs-blue dark:group-hover:text-niibs-yellow transition-colors">
                  NIIBS
                </span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-niibs-blue/10 dark:bg-niibs-yellow/20 text-niibs-blue dark:text-niibs-yellow font-mono font-bold tracking-wider shadow-sm border border-niibs-blue/10 dark:border-niibs-yellow/20">
                  CAMPUS
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] font-mono font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase block leading-none mt-0.5 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
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
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide font-display transition-all duration-300 border ${
                    isActive
                      ? 'bg-niibs-blue/10 dark:bg-niibs-yellow/10 text-niibs-blue dark:text-niibs-yellow border-niibs-blue/20 dark:border-niibs-yellow/30 shadow-inner'
                      : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-white/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60 hover:-translate-y-0.5 hover:shadow-sm'
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
              className="p-2 sm:p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-niibs-blue dark:focus:ring-niibs-yellow shadow-sm flex items-center space-x-1 backdrop-blur-md"
              title={`Theme: ${theme}`}
            >
              {theme === 'light' && <Sun className="w-4 h-4 text-niibs-yellow animate-pulse" />}
              {theme === 'dark' && <Moon className="w-4 h-4 text-[#4447b8]" />}
              {theme === 'system' && (
                <div className="flex items-center space-x-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1 text-slate-400 dark:text-slate-500 font-mono">SYS</span>
                  <Sun className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
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
                className={`flex items-center space-x-3 w-full px-4 py-3.5 rounded-xl text-left text-sm font-bold border transition-all duration-200 ${
                  isActive
                    ? 'bg-niibs-blue/10 dark:bg-niibs-yellow/10 text-niibs-blue dark:text-niibs-yellow border-niibs-blue/20 dark:border-niibs-yellow/30 shadow-sm'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/60 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/60'
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
