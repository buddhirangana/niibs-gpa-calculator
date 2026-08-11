import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Compass, Home, Calculator, BookOpen, ArrowLeft } from "lucide-react";

interface NotFoundViewProps {
  onNavigate: (view: string) => void;
}

export default function NotFoundView({ onNavigate }: NotFoundViewProps) {
  return (
    <div id="not-found-view" className="max-w-4xl mx-auto py-12 px-4 space-y-8 animate-in fade-in duration-300 text-center">
      
      {/* 404 Glass Hero Container */}
      <motion.div
        className="glass-card p-8 sm:p-14 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-2xl space-y-6 relative overflow-hidden bg-gradient-to-b from-niibs-blue/5 via-transparent to-niibs-yellow/5"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative Compass Badge */}
        <motion.div
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 border border-niibs-blue/20 dark:border-niibs-yellow/30 text-niibs-blue dark:text-niibs-yellow flex items-center justify-center mx-auto shadow-lg backdrop-blur-md"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        >
          <Compass className="w-10 h-10 sm:w-12 sm:h-12" />
        </motion.div>

        {/* 404 Large Monospace Code */}
        <div className="space-y-2">
          <span className="font-mono text-6xl sm:text-8xl font-black block tracking-tighter text-niibs-blue dark:text-niibs-yellow drop-shadow-sm">
            404
          </span>
          <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-950 dark:text-white">
            Page Not Found • Lost in the Curriculum?
          </h1>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed pt-1">
            The resource or view descriptor you are searching for does not exist, has been moved, or is currently unavailable in the NIIBS GPA Calculator suite.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-3.5 bg-gradient-to-r from-niibs-blue to-indigo-700 hover:from-indigo-700 hover:to-niibs-blue dark:from-niibs-yellow dark:to-amber-400 dark:hover:from-amber-400 dark:hover:to-niibs-yellow text-white dark:text-slate-950 font-bold rounded-2xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm font-display cursor-pointer flex items-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => onNavigate("calculator")}
            className="px-6 py-3.5 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm font-display cursor-pointer flex items-center space-x-2 backdrop-blur-md"
          >
            <Calculator className="w-4 h-4" />
            <span>Open GPA Calculator</span>
          </button>

          <button
            onClick={() => onNavigate("resources")}
            className="px-6 py-3.5 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 font-bold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all text-xs sm:text-sm font-display cursor-pointer flex items-center space-x-2 backdrop-blur-md"
          >
            <BookOpen className="w-4 h-4" />
            <span>Reference Guides</span>
          </button>
        </div>
      </motion.div>

    </div>
  );
}
