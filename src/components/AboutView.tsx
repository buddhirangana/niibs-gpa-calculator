import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { 
  Landmark, 
  User, 
  ShieldCheck, 
  Lock, 
  Info, 
  Globe, 
  Github, 
  ExternalLink
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (view: string) => void;
}

export default function AboutView({ onNavigate }: AboutViewProps) {
  return (
    <div id="about-tool-view" className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* About Headline Hero */}
      <div className="text-center space-y-3 py-2">
        <motion.div 
          className="w-16 h-16 sm:w-18 sm:h-18 rounded-3xl bg-gradient-to-br from-niibs-blue to-indigo-700 dark:from-niibs-yellow dark:to-amber-500 text-white dark:text-slate-950 flex items-center justify-center mx-auto shadow-xl shadow-niibs-blue/20 dark:shadow-niibs-yellow/20"
          whileHover={{ scale: 1.05, rotate: 3 }}
          transition={{ duration: 0.2 }}
        >
          <Landmark className="w-8 h-8 sm:w-9 sm:h-9" />
        </motion.div>
        
        <div className="space-y-1.5">
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-slate-950 dark:text-white leading-tight">
            About NIIBS GPA Calculator
          </h1>
          <p className="text-xs sm:text-sm font-mono text-niibs-blue dark:text-niibs-yellow uppercase tracking-widest font-small">
            Academic Evaluation Suite & Developer Information • Version 1.0
          </p>
        </div>
        
        <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          An open, privacy-focused academic engine built specifically for undergraduates and researchers at Nāgānanda International Institute for Buddhist Studies (NIIBS).
        </p>
      </div>

      {/* Developer Profile Card */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-3xl border border-niibs-yellow/40 dark:border-niibs-yellow/30 bg-gradient-to-r from-niibs-yellow/10 via-transparent to-niibs-blue/10 shadow-xl relative overflow-hidden"
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
          {/* Developer Official Photo */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg border-1 border-niibs-yellow/50 dark:border-niibs-yellow/40 bg-slate-900">
            <img
              src="/buddhi-rangana-img.webp"
              alt="Buddhi Rangana - Developer of NIIBS GPA Calculator"
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bio Details */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-mono font-medium tracking-widest text-niibs-blue dark:text-niibs-yellow block">
                  Lead Platform Engineer & Designer
                </span>
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-950 dark:text-white">
                  Buddhi Rangana
                </h2>
              </div>

              <div className="flex items-center justify-center md:justify-end space-x-2">
                <a
                  href="https://buddhirangana.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/60 dark:bg-slate-900/60 hover:bg-niibs-yellow hover:text-slate-950 dark:hover:bg-niibs-yellow dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 text-xs font-medium font-mono transition-all duration-200 border border-slate-200 dark:border-slate-800 flex items-center space-x-1.5 shadow-sm"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Portfolio</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href="https://github.com/buddhirangana/niibs-gpa-calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-white/60 dark:bg-slate-900/60 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 text-slate-700 dark:text-slate-300 transition-all duration-200 border border-slate-200 dark:border-slate-800 shadow-sm"
                  title="GitHub Repository"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
              Engineered and designed by <b>Buddhi Rangana</b> to provide NIIBS undergraduates with an intuitive, highly responsive and reliable academic calculation tool. The initiative aims to demystify complex credit weight calculations, degree class boundary rules and target forecasting across all university faculties.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 justify-center md:justify-start">
              <span className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-medium">
                React 19
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-medium">
                TypeScript
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-medium">
                Tailwind CSS
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-medium">
                Vite Engine
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-medium">
                D3.js & Recharts
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Streamlined Standards & Disclaimer Card */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 space-y-6 shadow-lg"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-niibs-blue dark:text-niibs-yellow">
              <Lock className="w-4.5 h-4.5" />
              <h4 className="font-display font-semibold text-slate-950 dark:text-white text-xs uppercase tracking-wider">
                Full Client-Side Privacy
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Your semester logs, marks selections, and goals are stored exclusively inside local storage. We do not collect, transmit, or monitor data.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4.5 h-4.5" />
              <h4 className="font-display font-semibold text-slate-950 dark:text-white text-xs uppercase tracking-wider">
                UGC Sri Lanka Standardized
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Algorithms follow official University Grants Commission Sri Lanka standards and NIIBS senate guidelines for Grade Point Values (A+ = 4.0, A = 4.0 ... E = 0.0).
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start space-x-3.5 text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <Info className="w-5 h-5 text-niibs-yellow shrink-0 mt-0.5" />
          <div className="space-y-1">
            <b className="font-display font-semibold text-slate-900 dark:text-white text-sm block">
              General Portal Disclaimer
            </b>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
              All values computed are generated directly using math algorithms for guiding and forecasting purposes. Official transcripts, final certificate ratings, and credit approvals remain under the sole jurisdiction of the Board of Examinations at the NIIBS Campus, Bollegala, Kelaniya.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Quick Action Navigation Buttons */}
      <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => onNavigate('calculator')}
          className="px-6 py-3 bg-gradient-to-r from-niibs-blue to-indigo-700 hover:from-indigo-700 hover:to-niibs-blue dark:from-niibs-yellow dark:to-amber-400 dark:hover:from-amber-400 dark:hover:to-niibs-yellow text-white dark:text-slate-950 font-semibold rounded-2xl shadow-lg transition-all duration-200 text-xs sm:text-sm font-display cursor-pointer"
        >
          Open GPA Calculator
        </button>
        <button
          onClick={() => onNavigate('cgpa')}
          className="px-6 py-3 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-semibold rounded-2xl shadow-sm transition-all duration-200 text-xs sm:text-sm font-display cursor-pointer"
        >
          View CGPA Tracker
        </button>
      </div>

    </div>
  );
}
