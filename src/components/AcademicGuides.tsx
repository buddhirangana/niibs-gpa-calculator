import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Book, 
  HelpCircle, 
  FileText, 
  Scale, 
  Award, 
  Search, 
  CheckCircle,
  ChevronDown,
  Sparkles,
  GraduationCap,
  Calculator,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { academicGuides, fcitGradingScheme, fbsGradingScheme, fhssAppliedMediaGradingScheme } from '../data/faculties';

export default function AcademicGuides() {
  const [activeTab, setActiveTab] = useState<'what-is-gpa' | 'how-to-calculate' | 'grading-schemes' | 'degree-classes' | 'faqs'>('what-is-gpa');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const filteredFaqs = academicGuides.faqs.filter(
    faq => faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div id="academic-guides-view" className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-6xl mx-auto">
      {/* View Header with Academic Branding */}
      <motion.div
        className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xl bg-gradient-to-r from-niibs-blue/5 via-transparent to-niibs-yellow/5"
        whileHover={{
          y: -3,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
        }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-0 right-0 opacity-5 dark:opacity-10 transform translate-x-12 -translate-y-12 pointer-events-none">
          {/* Subtle Buddhist Lotus / Dharma wheel ornament SVG */}
          <svg className="w-96 h-96 animate-spin-slow text-niibs-blue dark:text-niibs-yellow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-niibs-yellow/20 border border-niibs-yellow/40 text-amber-800 dark:text-niibs-yellow font-mono text-xs font-medium uppercase tracking-wider">
            <Book className="w-3.5 h-3.5" />
            <span>Official Academic Guidebook</span>
          </div>
          
          <h1 className="font-display font-bold text-3xl sm:text-5xl tracking-tight text-slate-950 dark:text-white leading-tight">
            NIIBS Grading & GPA Guidelines
          </h1>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Understand how point systems are structured, how weights influence academic standing, and how to calibrate your degree pathways step-by-step.
          </p>
        </div>
      </motion.div>

      {/* Navigation Tabs for Guides */}
      <div className="flex flex-wrap gap-2.5 pb-3 overflow-x-auto no-print">
        <button
          onClick={() => setActiveTab('what-is-gpa')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'what-is-gpa'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Book className={`w-4 h-4 ${activeTab === 'what-is-gpa' ? 'text-niibs-yellow dark:text-[#2d3091]' : 'text-niibs-yellow'}`} />
          <span>What is GPA?</span>
        </button>
        <button
          onClick={() => setActiveTab('how-to-calculate')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'how-to-calculate'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Scale className={`w-4 h-4 ${activeTab === 'how-to-calculate' ? 'text-niibs-yellow dark:text-[#2d3091]' : 'text-niibs-yellow'}`} />
          <span>Calculation Mechanics</span>
        </button>
        <button
          onClick={() => setActiveTab('grading-schemes')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'grading-schemes'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <FileText className={`w-4 h-4 ${activeTab === 'grading-schemes' ? 'text-niibs-yellow dark:text-[#2d3091]' : 'text-niibs-yellow'}`} />
          <span>Grading Schemes</span>
        </button>
        <button
          onClick={() => setActiveTab('degree-classes')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'degree-classes'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Award className={`w-4 h-4 ${activeTab === 'degree-classes' ? 'text-niibs-yellow dark:text-[#2d3091]' : 'text-niibs-yellow'}`} />
          <span>Class Awards</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-semibold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'faqs'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${activeTab === 'faqs' ? 'text-niibs-yellow dark:text-[#2d3091]' : 'text-niibs-yellow'}`} />
          <span>Academic FAQ</span>
        </button>
      </div>

      {/* Guide Content Render Container */}
      <motion.div
        className="glass-card p-6 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
        whileHover={{
          y: -2,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Tab 1: What is GPA */}
        {activeTab === 'what-is-gpa' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                  <Award className="w-6 h-6" />
                </div>
                <span>{academicGuides.gpaIntroduction.title}</span>
              </h2>
            </div>

            <div className="text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base font-sans">
              {academicGuides.gpaIntroduction.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
                <div className="flex items-center space-x-2 text-niibs-blue dark:text-niibs-yellow">
                  <Sparkles className="w-5 h-5" />
                  <h4 className="font-display font-semibold text-slate-950 dark:text-white text-base">
                    Why Keep Your GPA High?
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Consistently keeping high points is more than just passing. It prepares you for the national or international jobs market, offers academic credits, and makes you extremely eligible for high-honour fellowships.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-3">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400">
                  <GraduationCap className="w-5 h-5" />
                  <h4 className="font-display font-semibold text-slate-950 dark:text-white text-base">
                    Undergraduate Research Standing
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  Professors in the faculties of Buddhist Studies, Computing, and Humanities review current CGPA levels before allocating thesis groups, research grants, and seminar presentation seats.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: How to Calculate */}
        {activeTab === 'how-to-calculate' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="space-y-3">
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-niibs-yellow/20 text-amber-700 dark:text-niibs-yellow">
                  <Scale className="w-6 h-6" />
                </div>
                <span>{academicGuides.gpaCalculationGuide.title}</span>
              </h2>
            </div>

            {/* Formula Block */}
            <div className="p-6 sm:p-8 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-transparent border border-amber-500/30 rounded-3xl text-center space-y-3 backdrop-blur-md">
              <span className="text-xs uppercase font-mono font-medium tracking-widest text-amber-800 dark:text-amber-300 block">
                Mathematics Definition Standard
              </span>
              <p className="font-mono text-xl sm:text-3xl font-semibold text-slate-950 dark:text-amber-200 py-2">
                {academicGuides.gpaCalculationGuide.formula}
              </p>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
                Where earned points equal the exact course credit weight multiplied by the grade point index of that earned letter grade.
              </p>
            </div>

            {/* Step Block */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-semibold text-slate-950 dark:text-white text-xl">
                Calculating Your Grades Step-by-Step
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {academicGuides.gpaCalculationGuide.steps.map((step, idx) => (
                  <div key={idx} className="relative p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md">
                    <span className="absolute top-4 right-4 font-mono font-bold text-5xl text-slate-300/40 dark:text-slate-800/60">
                      0{idx + 1}
                    </span>
                    <div className="relative z-10 space-y-2">
                      <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200/80 dark:border-slate-800/80 pt-6">
              <h3 className="font-display font-semibold text-slate-950 dark:text-white text-lg mb-2">
                Cumulative GPA calculation (CGPA)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {academicGuides.gpaCalculationGuide.cgpaDescription}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Grading Schemes */}
        {activeTab === 'grading-schemes' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                  <FileText className="w-6 h-6" />
                </div>
                <span>NIIBS Faculty Grading Scales</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
                Each faculty follows structured examination boards mapping marks to grade point indices.
              </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Computing Scale */}
              <div className="space-y-4">
                <div className="p-4 bg-indigo-500/10 rounded-2xl border-l-4 border-niibs-blue dark:border-niibs-yellow backdrop-blur-md">
                  <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm">
                    FCIT Scale
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium text-[10px] uppercase">
                        <th className="py-3 px-2">Grade</th>
                        <th className="py-3 px-2">GPA Points</th>
                        <th className="py-3 px-2">Traditional Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-mono">
                      {fcitGradingScheme.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2 font-semibold text-niibs-blue dark:text-niibs-yellow text-sm">
                            {g.grade}
                          </td>
                          <td className="py-3 px-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                            {g.gpaValue.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 font-sans text-slate-500 dark:text-slate-400">
                            {g.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Buddhist & Humanities */}
              <div className="space-y-4">
                <div className="p-4 bg-amber-500/10 rounded-2xl border-l-4 border-amber-500 dark:border-niibs-yellow backdrop-blur-md">
                  <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm">
                    FBS & FHSS Scale (Except ACMT)
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium text-[10px] uppercase">
                        <th className="py-3 px-2">Grade</th>
                        <th className="py-3 px-2">GPA Points</th>
                        <th className="py-3 px-2">Traditional Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-mono">
                      {fbsGradingScheme.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2 font-semibold text-niibs-blue dark:text-niibs-yellow text-sm">
                            {g.grade}
                          </td>
                          <td className="py-3 px-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                            {g.gpaValue.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 font-sans text-slate-500 dark:text-slate-400">
                            {g.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* FHSS ACMT Scale */}
              <div className="space-y-4">
                <div className="p-4 bg-emerald-500/10 rounded-2xl border-l-4 border-emerald-500 dark:border-emerald-400 backdrop-blur-md">
                  <h3 className="font-display font-semibold text-slate-950 dark:text-white text-sm">
                    FHSS - ACMT Scale
                  </h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-medium text-[10px] uppercase">
                        <th className="py-3 px-2">Grade</th>
                        <th className="py-3 px-2">GPA Points</th>
                        <th className="py-3 px-2">Traditional Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 font-mono">
                      {fhssAppliedMediaGradingScheme.map((g, idx) => (
                        <tr key={idx} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                          <td className="py-3 px-2 font-semibold text-niibs-blue dark:text-niibs-yellow text-sm">
                            {g.grade}
                          </td>
                          <td className="py-3 px-2 text-slate-800 dark:text-slate-200 font-semibold text-sm">
                            {g.gpaValue.toFixed(2)}
                          </td>
                          <td className="py-3 px-2 font-sans text-slate-500 dark:text-slate-400">
                            {g.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Degree Classes */}
        {activeTab === 'degree-classes' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-500 dark:text-niibs-yellow">
                  <Award className="w-6 h-6" />
                </div>
                <span>{academicGuides.degreeClassGuide.title}</span>
              </h2>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed mt-4 max-w-4xl space-y-3">
                  {academicGuides.degreeClassGuide.content.split('\n').map((line, i) => (
                    <p key={i} className="whitespace-pre-line">
                      {line.split('**').map((part, j) => 
                        j % 2 === 1 ? <strong key={j} className="font-semibold text-slate-900 dark:text-slate-100">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* First Class */}
              <div className="p-6 rounded-3xl border-2 border-niibs-yellow bg-gradient-to-br from-amber-500/15 via-yellow-500/5 to-transparent backdrop-blur-md text-slate-950 dark:text-white space-y-3 shadow-lg shadow-amber-500/5 hover:scale-[1.02] transition-transform duration-200">
                <span className="font-mono text-3xl font-bold text-amber-600 dark:text-niibs-yellow block">≥ 3.70</span>
                <h4 className="font-display font-semibold text-base text-niibs-blue dark:text-amber-300">First Class Honours</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Requires highly organized study habits, consistent preparation, and pristine grading indexes.
                </p>
              </div>

              {/* Second Upper */}
              <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-950 dark:text-white space-y-3 hover:scale-[1.02] transition-transform duration-200">
                <span className="font-mono text-3xl font-bold text-slate-800 dark:text-slate-100 block">3.30 - 3.70</span>
                <h4 className="font-display font-semibold text-base text-slate-950 dark:text-white">Second Class (Upper)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Highly prestigious level. Proves substantial grasp of computing, IT, or Buddhist philosophy subjects.
                </p>
              </div>

              {/* Second Lower */}
              <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-950 dark:text-white space-y-3 hover:scale-[1.02] transition-transform duration-200">
                <span className="font-mono text-3xl font-bold text-slate-800 dark:text-slate-100 block">3.00 - 3.30</span>
                <h4 className="font-display font-semibold text-base text-slate-950 dark:text-white">Second Class (Lower)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Establishes excellent technical capacity. Strong eligibility for local software and corporate roles.
                </p>
              </div>

              {/* General Pass */}
              <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md text-slate-950 dark:text-white space-y-3 hover:scale-[1.02] transition-transform duration-200">
                <span className="font-mono text-3xl font-bold text-slate-600 dark:text-slate-400 block">2.00 - 3.00</span>
                <h4 className="font-display font-semibold text-base text-slate-950 dark:text-white">General Pass</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Requires successful accumulation of required units (90-120 credits) while maintaining positive academic standing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Academic FAQ */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6">
              <div>
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 dark:text-white flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                    <HelpCircle className="w-6 h-6" />
                  </div>
                  <span>Frequently Answered Questions</span>
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Have doubts about retakes, Dean's list criteria, or core calculations? Filter questions directly.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-white text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 transition-all duration-200 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="flex items-center justify-between w-full text-left font-display font-semibold text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none cursor-pointer"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-200 text-slate-400 ${isExpanded ? 'rotate-180 text-niibs-blue dark:text-niibs-yellow' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200/60 dark:border-slate-800/60 pt-3 animate-in fade-in duration-200">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-slate-500 font-mono">No matching questions found in the guidebook index.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Embedded Academic Disclaimer Card */}
      <div className="p-6 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md flex items-start space-x-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-medium text-slate-950 dark:text-slate-100 text-base">
            NIIBS Board and UGC Compliance Guarantee
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            All calculations computed inside this portal comply with the standard GPA equations approved by the Sri Lankan University Grants Commission. However, final official transcripts are managed exclusively by the Board of Examinations at NIIBS Campus.
          </p>
        </div>
      </div>
    </div>
  );
}
