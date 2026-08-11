/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GraduationCap, MapPin, Phone, Mail, Globe, ExternalLink } from 'lucide-react';

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
    <footer id="main-app-footer" className="bg-slate-900/90 dark:bg-slate-950/90 border-t-4 border-niibs-yellow text-slate-300 pt-16 pb-12 transition-colors duration-300 no-print backdrop-blur-lg relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand/Description Column */}
          <div className="md:col-span-2 space-y-5">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="p-2.5 bg-white/10 text-niibs-yellow rounded-xl shadow-md border border-niibs-yellow/40 backdrop-blur-md">
                <svg className="w-5 h-5 text-niibs-yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.64 5.64l4.24 4.24M14.12 14.12l4.24 4.24M5.64 18.36l4.24-4.24M14.12 9.88l4.24-4.24" />
                </svg>
              </div>
              <div>
                <span className="font-display font-bold text-lg text-white tracking-tight">NIIBS</span>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-niibs-yellow block leading-none">
                  Nāgānanda Studies Portal
                </span>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The official-grade GPA and CGPA management suite for students of Nāgānanda International Institute for Buddhist Studies. Formulated strictly according to university grading directives and curriculum credit configurations.
            </p>

            <div className="flex items-center space-x-4">
              <a 
                href="https://niibs.lk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-full bg-slate-800 text-slate-300 hover:bg-niibs-yellow hover:text-slate-950 transition-all duration-300 border border-slate-700/50"
                title="Official website"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a 
                href="https://fcit.niibs.lk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs uppercase tracking-wider font-semibold font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FCIT <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
              <a 
                href="https://fbs.niibs.lk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs uppercase tracking-wider font-semibold font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FBS <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
              <a 
                href="https://fhss.niibs.lk" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs uppercase tracking-wider font-semibold font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FHSS <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Practical Navigation Utilities */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm mb-4 uppercase">
              Academic Toolsets
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => handleNav('calculator')} className="text-slate-400 hover:text-niibs-yellow transition-colors text-left flex items-center space-x-1">
                  <span>• Faculty GPA Calculator</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cgpa')} className="text-slate-400 hover:text-niibs-yellow transition-colors text-left flex items-center space-x-1">
                  <span>• CGPA History & Tracker</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('target_gpa')} className="text-slate-400 hover:text-niibs-yellow transition-colors text-left flex items-center space-x-1">
                  <span>• Target Goal Planner</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('resources')} className="text-slate-400 hover:text-niibs-yellow transition-colors text-left flex items-center space-x-1">
                  <span>• Comprehensive Reference Guides</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-slate-400 hover:text-niibs-yellow transition-colors text-left flex items-center space-x-1">
                  <span>• About & Disclaimer Notice</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide text-sm mb-4 uppercase">
              Institute Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-niibs-yellow shrink-0 mt-1" />
                <span>NIIBS, Manelwatta, Bollegala, Kelaniya, Sri Lanka</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-niibs-yellow shrink-0" />
                <span>+94 11 2 904 660 / 663</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-niibs-yellow shrink-0" />
                <span>info@niibs.edu.lk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom / Meta */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} Nāgānanda International Institute for Buddhist Studies (NIIBS). All intellectual rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-slate-400 transition-colors cursor-help" title="Lighthouse Compliant, PWA Webapp, Mobile First">
              Responsive Design Core v1.4.0
            </span>
            <a href="https://niibs.lk" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">
              NIIBS Web Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
