/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, MapPin, Phone, Mail, Globe, ExternalLink, AlertCircle, Heart, Calendar } from 'lucide-react';

interface FooterProps {
  onViewChange: (view: string) => void;
}

export default function Footer({ onViewChange }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNav = (viewId: string) => {
    onViewChange(viewId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-app-footer" className="bg-slate-950 text-slate-300 pt-16 pb-8 transition-colors duration-300 no-print relative z-10 overflow-hidden mt-12 border-t border-slate-900">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-niibs-blue via-niibs-yellow to-niibs-green opacity-90"></div>
      
      {/* Background ambient glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-niibs-blue/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 -right-20 w-80 h-80 bg-niibs-yellow/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand/Description Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer group w-max" onClick={() => handleNav('home')}>
              <div className="p-2.5 bg-white/5 text-niibs-yellow rounded-xl shadow-md border border-white/10 group-hover:border-niibs-yellow/40 group-hover:bg-niibs-yellow/10 transition-all duration-300 backdrop-blur-md">
                <GraduationCap className="w-6 h-6 text-niibs-yellow" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-display font-semibold text-xl tracking-tight text-white">
                    NIIBS
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-niibs-yellow/20 text-niibs-yellow font-mono font-bold tracking-wider">
                    v1.0
                  </span>
                  {/* <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center space-x-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Updated: Aug 2026</span>
                  </span> */}
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide text-niibs-yellow uppercase block leading-none mt-0.5">
                  GPA CALCULATOR
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The NIIBS GPA Calculator is a free, online tool designed for students to easily calculate and track their semester and cumulative Grade Point Averages based on official university credit weightage.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-slate-300 hover:bg-niibs-yellow hover:text-slate-950 transition-all duration-300 border border-white/10 hover:border-niibs-yellow hover:-translate-y-1 shadow-sm"
                title="Official website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="https://fcit.niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-10 rounded-full flex items-center bg-white/5 text-slate-300 hover:bg-niibs-yellow hover:text-slate-950 transition-all duration-300 border border-white/10 hover:border-niibs-yellow hover:-translate-y-1 text-xs uppercase tracking-wider font-semibold font-mono shadow-sm"
              >
                FCIT <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
              </a>
              <a
                href="https://fbs.niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-10 rounded-full flex items-center bg-white/5 text-slate-300 hover:bg-niibs-yellow hover:text-slate-950 transition-all duration-300 border border-white/10 hover:border-niibs-yellow hover:-translate-y-1 text-xs uppercase tracking-wider font-semibold font-mono shadow-sm"
              >
                FBS <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
              </a>
              <a
                href="https://fhss.niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 h-10 rounded-full flex items-center bg-white/5 text-slate-300 hover:bg-niibs-yellow hover:text-slate-950 transition-all duration-300 border border-white/10 hover:border-niibs-yellow hover:-translate-y-1 text-xs uppercase tracking-wider font-semibold font-mono shadow-sm"
              >
                FHSS <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />
              </a>
            </div>
          </div>

          {/* Practical Navigation Utilities */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wider text-sm mb-5 uppercase opacity-90">
              Academic Toolsets
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handleNav('calculator')} className="text-slate-400 hover:text-white transition-all text-left flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-niibs-yellow transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Faculty GPA Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cgpa')} className="text-slate-400 hover:text-white transition-all text-left flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-niibs-yellow transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">CGPA History & Tracker</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('target_gpa')} className="text-slate-400 hover:text-white transition-all text-left flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-niibs-yellow transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Target Goal Planner</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="text-slate-400 hover:text-white transition-all text-left flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-niibs-yellow transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Reference Guides</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-slate-400 hover:text-white transition-all text-left flex items-center space-x-2.5 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-niibs-yellow transition-colors"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">About & Disclaimers</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wider text-sm mb-5 uppercase opacity-90">
              Institute Info
            </h3>
            <ul className="space-y-4 text-sm text-slate-400 font-sans">
              <li className="flex items-start space-x-3 group cursor-default">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-niibs-yellow/40 group-hover:bg-niibs-yellow/10 transition-colors mt-0.5 shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-niibs-yellow transition-colors" />
                </div>
                <span className="leading-relaxed">Nāgānanda International Institute for Buddhist Studies (NIIBS), Manelwatta, Bollegala, Kelaniya.</span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-niibs-yellow/40 group-hover:bg-niibs-yellow/10 transition-colors shrink-0">
                  <Phone className="w-3.5 h-3.5 text-slate-400 group-hover:text-niibs-yellow transition-colors" />
                </div>
                <span><a href="tel:+94112904666" className="hover:text-white transition-colors">+94 11 2904 666</a></span>
              </li>
              <li className="flex items-center space-x-3 group">
                <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-niibs-yellow/40 group-hover:bg-niibs-yellow/10 transition-colors shrink-0">
                  <Mail className="w-3.5 h-3.5 text-slate-400 group-hover:text-niibs-yellow transition-colors" />
                </div>
                <span><a href="mailto:info@niibs.edu.lk" className="hover:text-white transition-colors">info@niibs.edu.lk</a></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-8 p-5 sm:p-6 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800/80 shadow-inner relative overflow-hidden flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-5 group">
          <div className="absolute inset-0 bg-gradient-to-br from-niibs-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
          <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700/50 shrink-0 shadow-sm group-hover:border-niibs-yellow/30 transition-colors">
            <AlertCircle className="w-5 h-5 text-niibs-yellow" />
          </div>
          <div className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center md:text-left flex-1">
            <strong className="text-slate-200 font-display tracking-wide font-semibold block mb-1">Disclaimer</strong>
            <p className="font-sans">
              This GPA calculator is an independent tool created using NIIBS Student Handbooks. It is not affiliated with, endorsed by, or sponsored by the Nāgānanda International Institute for Buddhist Studies (NIIBS). The accuracy of results is not guaranteed. Please use this tool at your own discretion.
            </p>
          </div>
        </div>

        {/* Footer Bottom / Meta */}
        <div className="border-t border-slate-800/80 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 font-medium gap-4">
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
            <p className="flex items-center space-x-1">
              <span>© {currentYear} NIIBS GPA Calculator.</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </p>
            <span className="hidden sm:inline text-slate-600">•</span>
            <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full border border-slate-700 font-mono text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-niibs-yellow shrink-0" />
              <span>Last Updated: August 13, 2026</span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-niibs-red animate-pulse" fill="currentColor" />
              <span>by</span>
              <a href="https://buddhirangana.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition-colors ml-0.5 font-semibold">
                Buddhi Rangana
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
