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
              <div className="p-2.5 bg-white/10 text-niibs-yellow rounded-xl shadow-md border border-niibs-yellow/40 backdrop-blur-md" strokeWidth="2">
                <GraduationCap className="w-6 h-6 text-niibs-yellow" />
              </div>
              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-display font-semibold text-xl sm:text-xl tracking-tight text-white">
                    NIIBS
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-niibs-yellow/20 text-niibs-yellow font-mono font-medium tracking-wider">
                    CAMPUS
                  </span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono font-medium tracking-wide text-niibs-yellow uppercase block leading-none">
                  GPA CALCULATOR
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              The NIIBS GPA Calculator is a free, online tool designed for students to easily calculate and track their semester and cumulative Grade Point Averages (GPA & CGPA) based on official university credit weightage and grade point values.
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
                className="text-xs uppercase tracking-wider font-medium font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FCIT <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
              <a
                href="https://fbs.niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider font-medium font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FBS <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
              <a
                href="https://fhss.niibs.lk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider font-medium font-mono text-slate-400 hover:text-niibs-yellow transition-colors"
              >
                FHSS <ExternalLink className="w-3 h-3 inline pb-0.5 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Practical Navigation Utilities */}
          <div>
            <h3 className="font-display font-medium text-white tracking-wide text-sm mb-4 uppercase">
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
            <h3 className="font-display font-medium text-white tracking-wide text-sm mb-4 uppercase">
              Institute Info
            </h3>
            <ul className="space-y-3 text-sm text-slate-400 font-sans">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-niibs-yellow shrink-0 mt-1" />
                <span>Nāgānanda International Institute for Buddhist Studies (NIIBS), Manelwatta, Bollegala, Kelaniya, Sri Lanka.</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-niibs-yellow shrink-0" />
                <span><a href="tel:+94112904666" className="hover:text-niibs-yellow transition-colors">+94 11 2904 666</a></span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-niibs-yellow shrink-0" />
                <span><a href="mailto:info@niibs.edu.lk" className="hover:text-niibs-yellow transition-colors">info@niibs.edu.lk</a></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-10 p-4 sm:p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 text-xs text-slate-400 leading-relaxed text-center md:text-left">
          <strong className="text-slate-300 font-semibold block mb-1">Disclaimer</strong>
          <p>
            This GPA calculator is an independent tool created using NIIBS Student Handbooks. It is not affiliated with, endorsed by, or sponsored by the Nāgānanda International Institute for Buddhist Studies (NIIBS). The accuracy of results is not guaranteed. Please use this tool at your own discretion.
          </p>
        </div>

        {/* Footer Bottom / Meta */}
        <div className="border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {currentYear} NIIBS GPA Calculator. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="transition-colors">
              Made with ❤️ by <a href="https://buddhirangana.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 transition-colors">
                Buddhi Rangana.
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
