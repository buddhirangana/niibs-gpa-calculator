import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Book, HelpCircle, FileText, Scale, Award, Search, CheckCircle } from 'lucide-react';
import { academicGuides, fcitGradingScheme, fbsGradingScheme } from '../data/faculties';

export default function AcademicGuides() {
  const [activeTab, setActiveTab] = useState<'what-is-gpa' | 'how-to-calculate' | 'grading-schemes' | 'degree-classes' | 'faqs'>('what-is-gpa');
  const [faqSearch, setFaqSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredFaqs = academicGuides.faqs.filter(
    faq => faq.q.toLowerCase().includes(faqSearch.toLowerCase()) || faq.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div id="academic-guides-view" className="space-y-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
      {/* View Header with Academic Branding */}
      <motion.div
        className="glass-card rounded-3xl p-6 sm:p-10 relative overflow-hidden border-b-2 border-niibs-yellow"
        whileHover={{
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{
          duration: 0.2
        }}>
        <div className="absolute top-0 right-0 opacity-5 dark:opacity-10 transform translate-x-12 -translate-y-12">
          {/* Subtle Buddhist Lotus/Dharma background shape */}
          <svg className="w-96 h-96 animate-spin-slow text-niibs-blue dark:text-niibs-yellow" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
            <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
            <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-niibs-yellow text-[#2d3091] font-mono text-xs font-bold uppercase tracking-wider">
            <Book className="w-3.5 h-3.5" />
            <span>Official Guidebook</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl tracking-tight text-slate-900 dark:text-white leading-tight">
            NIIBS Academic Grading & GPA Guidelines
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
            Understand how point systems are structures, how weights influence academic status standing, and how to calibrate your degree pathways step-by-step.
          </p>
        </div>
      </motion.div>

      {/* Navigation Tabs for Guides */}
      <div className="flex flex-wrap gap-2.5 pb-3 overflow-x-auto no-print">
        <button
          onClick={() => setActiveTab('what-is-gpa')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'what-is-gpa'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Book className="w-4 h-4 text-niibs-yellow current-color" />
          <span>What is GPA?</span>
        </button>
        <button
          onClick={() => setActiveTab('how-to-calculate')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'how-to-calculate'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Scale className="w-4 h-4 text-niibs-yellow current-color" />
          <span>Calculation Mechanics</span>
        </button>
        <button
          onClick={() => setActiveTab('grading-schemes')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'grading-schemes'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <FileText className="w-4 h-4 text-niibs-yellow current-color" />
          <span>Grading Schemes</span>
        </button>
        <button
          onClick={() => setActiveTab('degree-classes')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'degree-classes'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <Award className="w-4 h-4 text-niibs-yellow current-color" />
          <span>Class Awards</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-350 shrink-0 ${
            activeTab === 'faqs'
              ? 'bg-[#2d3091] text-white dark:bg-niibs-yellow dark:text-slate-900 shadow-md transform hover:scale-[1.02]'
              : 'glass-card text-slate-700 dark:text-slate-300 hover:bg-white/40 dark:hover:bg-slate-800/40'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-niibs-yellow current-color" />
          <span>Academic FAQ</span>
        </button>
      </div>

      {/* Guide Content Render Container */}
      <motion.div
        className="glass-card p-6 sm:p-8 rounded-3xl"
        whileHover={{
          y: -5,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        }}
        transition={{
          duration: 0.2
        }}>
        {/* Tab 1: What is GPA */}
        {activeTab === 'what-is-gpa' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="w-6 h-6 text-[#2d3091] dark:text-niibs-yellow" />
              <span>{academicGuides.gpaIntroduction.title}</span>
            </h2>
            <div className="text-slate-650 dark:text-slate-300 leading-relaxed space-y-4 text-justify whitespace-pre-wrap font-sans">
              {academicGuides.gpaIntroduction.content}
            </div>

            <div className="p-6 sm:p-7 rounded-3xl bg-white/10 dark:bg-slate-905/10 border border-slate-200/40 dark:border-slate-800/40 mt-6 md:grid md:grid-cols-2 md:gap-7 space-y-4 md:space-y-0 backdrop-blur-md animate-in fade-in duration-300">
              <div className="space-y-2">
                <h4 className="font-display font-bold text-slate-950 dark:text-white flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-niibs-yellow" />
                  <span>Why Keep Your GPA High?</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Consistently keeping high points is more than just passing. It prepares you for the national or international jobs market, offers academic credits, and makes you extremely eligible for high-honour fellowships.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-display font-bold text-slate-950 dark:text-white flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-niibs-blue dark:bg-amber-400" />
                  <span>Undergraduate Research Standing</span>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Professors in the faculties of Buddhist Studies and Computing review current CGPA levels before allocating thesis groups, research grants, and seminar presentation seats.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: How to Calculate */}
        {activeTab === 'how-to-calculate' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white flex items-center space-x-2">
              <Scale className="w-6 h-6 text-[#2d3091] dark:text-niibs-yellow" />
              <span>{academicGuides.gpaCalculationGuide.title}</span>
            </h2>

            {/* Formula Block */}
            <div className="p-6 bg-niibs-yellow/10 dark:bg-niibs-yellow/5 border border-niibs-yellow/20 rounded-3xl text-center space-y-3 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-850 dark:text-amber-350">
                Mathematics Definition Standard
              </span>
              <p className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-amber-200">
                {academicGuides.gpaCalculationGuide.formula}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Where earned points are multiplying the exact course credit value by the grade point index of that earned letter grade.
              </p>
            </div>

            {/* Step Block */}
            <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg mt-8">
              Calculating Your Grades Step-by-Step
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {academicGuides.gpaCalculationGuide.steps.map((step, idx) => (
                <div key={idx} className="relative p-5 rounded-3xl border border-slate-200/40 dark:border-slate-800/40 bg-white/10 dark:bg-slate-905/10 backdrop-blur-md">
                  <span className="absolute top-4 right-4 font-mono font-bold text-5xl text-[#2d3091]/15 dark:text-niibs-yellow/15">
                    0{idx + 1}
                  </span>
                  <div className="relative z-10 space-y-2">
                    <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                      {step.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-slate-200/40 dark:border-slate-800/40 pt-6">
              <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg mb-3">
                Cumulative GPA calculation (CGPA)
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-350 leading-relaxed">
                {academicGuides.gpaCalculationGuide.cgpaDescription}
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Grading Schemes */}
        {activeTab === 'grading-schemes' && (
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
              NIIBS Faculty Grading Scales
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Each faculty follows structured boards which map final exam marks to corresponding grade value point weights.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Computing Scale */}
              <div className="space-y-4">
                <div className="p-3.5 bg-white/10 dark:bg-slate-905/10 rounded-2xl border-l-4 border-[#2d3091] dark:border-niibs-yellow backdrop-blur-md font-medium">
                  <h3 className="font-display font-bold text-slate-950 dark:text-white text-sm">
                    Faculty of Computing & IT (FCIT) Scale
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/40 dark:border-slate-800/40 text-slate-500 uppercase tracking-wider font-bold">
                        <th className="py-3 px-2">Letter Grade</th>
                        <th className="py-3 px-2">GPA Value Points</th>
                        <th className="py-3 px-2">Traditional Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/30 font-mono">
                      {fcitGradingScheme.map((g, idx) => (
                        <tr key={idx} className="hover:bg-white/10 dark:hover:bg-slate-800/10 transition-colors duration-150">
                          <td className="py-3 px-2 font-bold text-[#2d3091] dark:text-niibs-yellow">{g.grade}</td>
                          <td className="py-3 px-2 text-slate-750 dark:text-slate-300 font-bold">{g.gpaValue.toFixed(2)}</td>
                          <td className="py-3 px-2 font-sans text-slate-500 dark:text-slate-400">{g.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Buddhist & Humanities */}
              <div className="space-y-4">
                <div className="p-3.5 bg-white/10 dark:bg-slate-905/10 rounded-2xl border-l-4 border-[#2d3091] dark:border-niibs-yellow backdrop-blur-md font-medium">
                  <h3 className="font-display font-bold text-slate-950 dark:text-white text-sm">
                    Buddhist Studies (FBS) & Humanities (FHSS) Scale
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200/40 dark:border-slate-800/40 text-slate-500 uppercase tracking-wider font-bold">
                        <th className="py-3 px-2">Letter Grade</th>
                        <th className="py-3 px-2">GPA Value Points</th>
                        <th className="py-3 px-2">Traditional Meaning</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/30 dark:divide-slate-800/30 font-mono">
                      {fbsGradingScheme.map((g, idx) => (
                        <tr key={idx} className="hover:bg-white/10 dark:hover:bg-slate-800/10 transition-colors duration-150">
                          <td className="py-3 px-2 font-bold text-[#2d3091] dark:text-niibs-yellow">{g.grade}</td>
                          <td className="py-3 px-2 text-slate-750 dark:text-slate-300 font-bold">{g.gpaValue.toFixed(2)}</td>
                          <td className="py-3 px-2 font-sans text-slate-500 dark:text-slate-400">{g.description}</td>
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
          <div className="space-y-6">
            <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white flex items-center space-x-2">
              <Award className="w-6 h-6 text-niibs-yellow" />
              <span>{academicGuides.degreeClassGuide.title}</span>
            </h2>
            <div className="text-slate-650 dark:text-slate-350 leading-relaxed text-sm whitespace-pre-wrap font-sans mb-8">
              {academicGuides.degreeClassGuide.content}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-3xl border-2 border-niibs-yellow bg-niibs-yellow/10 dark:bg-niibs-yellow/5 backdrop-blur-md text-slate-950 dark:text-white space-y-2.5 animate-in fade-in duration-350 hover:scale-[1.03] transition-transform duration-350">
                <span className="font-mono text-2xl font-bold text-amber-600 dark:text-niibs-yellow">≥ 3.70</span>
                <h4 className="font-display font-black text-sm text-[#2d3091] dark:text-amber-300">First Class Honours</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Requires impeccable study habits, highly organized planning, and pristine grading indexes.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/40 dark:border-slate-800/45 bg-white/10 dark:bg-slate-905/10 backdrop-blur-md text-slate-950 dark:text-white space-y-2.5 hover:scale-[1.03] transition-transform duration-350">
                <span className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-100">3.30 – 3.69</span>
                <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white">Second Class (Upper)</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Highly prestigious level. Very competitive, proving substantial grasp of IT/SE principles or Buddhist philosophy.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/40 dark:border-slate-800/45 bg-white/10 dark:bg-slate-905/10 backdrop-blur-md text-slate-950 dark:text-white space-y-2.5 hover:scale-[1.03] transition-transform duration-350">
                <span className="font-mono text-2xl font-bold text-slate-800 dark:text-slate-100">3.00 – 3.29</span>
                <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white">Second Class (Lower)</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  Establishes excellent technical capacity. Good eligibility for local programming roles and corporate positions.
                </p>
              </div>

              <div className="p-5 rounded-3xl border border-slate-200/40 dark:border-slate-800/45 bg-white/10 dark:bg-slate-905/10 backdrop-blur-md text-slate-950 dark:text-white space-y-2.5 hover:scale-[1.03] transition-transform duration-350">
                <span className="font-mono text-2xl font-bold text-slate-600 dark:text-slate-350">2.00 – 2.99</span>
                <h4 className="font-display font-bold text-sm text-slate-950 dark:text-white font-medium">General Degree / Pass</h4>
                <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed">
                  Requires successful accumulation of required units (90-120 credits) while maintaining positive academic standing.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Academic FAQ */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200/40 dark:border-slate-800/35 pb-5">
              <div>
                <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">
                  Frequently Answered Questions
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Have doubts about retakes, Dean's list criteria, or core calculations? Select answers directly.
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-800 dark:text-white text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-sm"
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
                      className="border border-slate-200/40 dark:border-slate-800/40 rounded-3xl p-5 transition-all duration-350 bg-white/10 dark:bg-slate-905/10 hover:bg-white/20 dark:hover:bg-slate-905/20 backdrop-blur-md hover:scale-[1.01] shadow-sm"
                    >
                      <button
                        onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                        className="flex items-center justify-between w-full text-left font-display font-bold text-slate-900 dark:text-white text-sm sm:text-base focus:outline-none"
                      >
                        <span className="pr-4">{faq.q}</span>
                        <HelpCircle className={`w-5 h-5 shrink-0 transition-transform text-niibs-yellow ${isExpanded ? 'rotate-180 text-[#2d3091] dark:text-niibs-yellow' : ''}`} />
                      </button>
                      
                      {isExpanded && (
                        <div className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200/30 dark:border-slate-800/30 pt-3 animate-in fade-in duration-300">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12">
                  <p className="text-sm text-slate-500 font-mono">No matching answers found in the guidebook database.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </motion.div>

      {/* Embedded Academic Disclaimer Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md flex items-start space-x-4">
        <CheckCircle className="w-5 h-5 text-[#00a650] mt-0.5 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-display font-bold text-slate-950 dark:text-slate-100 text-sm">
            NIIBS Board and UGC Compliance Guarantee
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            All calculations computed inside this portal comply with the standard GPA equations approved by the Sri Lankan University Grants Commission. However, final official transcripts are managed exclusively by the Office of Examinations at NIIBS bollegala campus.
          </p>
        </div>
      </div>
    </div>
  );
}
