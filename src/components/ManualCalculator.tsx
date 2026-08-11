import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ManualSubject, SemesterRecord } from '../types';
import { fcitGradingScheme } from '../data/faculties';
import { Plus, Trash, Printer, Share2, Save, Sparkles, AlertCircle } from 'lucide-react';

interface ManualCalculatorProps {
  onSaveSemester: (record: SemesterRecord) => void;
}

export default function ManualCalculator({ onSaveSemester }: ManualCalculatorProps) {
  const [subjects, setSubjects] = useState<ManualSubject[]>([
    { id: '1', name: 'Software Development Core', credits: 3, grade: 'A' },
    { id: '2', name: 'Applied Mathematics', credits: 3, grade: 'B+' },
    { id: '3', name: 'Buddhist Fine Arts & Heritage', credits: 2, grade: 'A-' },
  ]);

  const [customTermName, setCustomTermName] = useState('Custom Term');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  const addSubjectRow = () => {
    const nextId = (Date.now()).toString();
    setSubjects(prev => [...prev, { id: nextId, name: '', credits: 3, grade: '' }]);
  };

  const deleteSubjectRow = (id: string) => {
    if (subjects.length <= 1) return;
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const handleRowChange = (id: string, field: keyof ManualSubject, val: string | number) => {
    setSubjects(prev =>
      prev.map(s => {
        if (s.id === id) {
          return { ...s, [field]: val };
        }
        return s;
      })
    );
  };

  // GPA calculation algorithms
  let totalCredits = 0;
  let earnedCredits = 0;
  let totalGradePoints = 0;

  subjects.forEach(s => {
    const creditsNum = Number(s.credits) || 0;
    if (creditsNum > 0 && s.grade) {
      const match = fcitGradingScheme.find(sch => sch.grade === s.grade);
      if (match) {
        totalCredits += creditsNum;
        if (s.grade !== 'E') {
          earnedCredits += creditsNum;
        }
        totalGradePoints += creditsNum * match.gpaValue;
      }
    }
  });

  const calculatedGpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
  const gradePercentage = totalCredits > 0 ? ((calculatedGpa / 4.0) * 100) : 0;

  // Save calculated result
  const handleSaveToHistory = () => {
    if (totalCredits === 0) return;

    const gradeDistribution: Record<string, number> = {};
    subjects.forEach(s => {
      const creditsNum = Number(s.credits) || 0;
      if (creditsNum > 0 && s.grade && s.grade !== '') {
        gradeDistribution[s.grade] = (gradeDistribution[s.grade] || 0) + 1;
      }
    });

    onSaveSemester({
      id: `manual-${Date.now()}`,
      name: customTermName.trim() || 'Manual Calculations',
      gpa: Number(calculatedGpa.toFixed(3)),
      credits: totalCredits,
      gradeDistribution,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Share result
  const handleShareResult = () => {
    const text = `My NIIBS Manual GPA Calculation Result 🎓\nTerm Name: ${customTermName}\nCalculated GPA: ${calculatedGpa.toFixed(3)}\nPercentage: ${gradePercentage.toFixed(1)}%\nCalculate yours standard or manual GPA online at: https://gpacalculator.niibs.lk`;
    navigator.clipboard.writeText(text);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div id="manual-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

      {/* Subject rows config - Left 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        <motion.div
          className="glass-card p-6 rounded-3xl space-y-4"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                Customize GPA Calculations
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Type course descriptors, credit bounds, and select points in real-time. Unlimited rows are supported.
              </p>
            </div>
            <button
              onClick={addSubjectRow}
              className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-niibs-blue hover:bg-niibs-blue-light dark:bg-niibs-yellow dark:text-slate-950 transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Class Row</span>
            </button>
          </div>

          {/* Table ledger input list */}
          <div className="space-y-3">
            {subjects.map((sub, index) => (
              <div 
                key={sub.id} 
                className="grid grid-cols-12 gap-3.5 p-4 rounded-2xl border border-slate-200/40 bg-white/20 dark:border-slate-800 dark:bg-slate-900/20 items-center backdrop-blur-md animate-in fade-in zoom-in-95 duration-200 shadow-sm"
              >
                {/* Course Name Index Field */}
                <div className="col-span-12 sm:col-span-6 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-400 font-mono font-bold block sm:hidden">
                    Subject Name {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Traditional Sanskrit Grammar, Software Arch..."
                    value={sub.name}
                    onChange={(e) => handleRowChange(sub.id, 'name', e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium"
                  />
                </div>

                {/* Credits Input Selection */}
                <div className="col-span-12 sm:col-span-2.5 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-400 font-mono font-bold block sm:hidden">Credits</span>
                  <select
                    value={sub.credits}
                    onChange={(e) => handleRowChange(sub.id, 'credits', Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-semibold font-mono"
                  >
                    {[1, 2, 3, 4, 5, 6].map(c => (
                      <option key={c} value={c} className="dark:bg-slate-950 dark:text-slate-300">{c} Credits</option>
                    ))}
                  </select>
                </div>

                {/* Selection Grade Choice */}
                <div className="col-span-12 sm:col-span-2.5 space-y-1">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-400 font-mono font-bold block sm:hidden">Select Grade</span>
                  <select
                    value={sub.grade}
                    onChange={(e) => handleRowChange(sub.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-bold font-mono"
                  >
                    <option value="" className="dark:bg-slate-950 dark:text-slate-300">— Select —</option>
                    {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E'].map(g => (
                      <option key={g} value={g} className="dark:bg-slate-950 dark:text-slate-300">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Trash Delete field */}
                <div className="col-span-12 sm:col-span-1 text-right flex justify-end">
                  <button
                    onClick={() => deleteSubjectRow(sub.id)}
                    disabled={subjects.length <= 1}
                    className="p-2 text-slate-400 hover:text-niibs-red hover:bg-niibs-red/10 dark:hover:bg-niibs-red/20 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Delete row"
                  >
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Manual Calculation Results Indicators - Right 1 Column */}
      <div className="lg:col-span-1 space-y-6">
        <motion.div
          className="glass-card p-6 rounded-3xl space-y-5"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#2d3091] dark:text-niibs-yellow font-mono block">
            Result Board
          </span>

          <div className="space-y-4">
            <div className="text-center p-6 bg-white/10 dark:bg-slate-800/10 rounded-2xl border border-slate-200/40 dark:border-slate-800/45 backdrop-blur-md">
              <span className="text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 font-bold block leading-none">
                TERM GPA
              </span>
              <span className="font-mono text-4xl font-extrabold text-[#2d3091] dark:text-niibs-yellow block mt-2">
                {calculatedGpa.toFixed(3)}
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400 block mt-1.5 leading-none">
                Total Credits Weight: {totalCredits} Cr.
              </span>
            </div>

            {/* Sub analytic details */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/40 dark:border-slate-800/45">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Earned Credits</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{earnedCredits} Credits</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/40 dark:border-slate-800/45">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Cumulative Marks Percent</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{gradePercentage.toFixed(1)}%</span>
              </div>
            </div>

            {/* Custom save layout */}
            <div className="space-y-4 pt-3">
              <div className="space-y-1.5">
                <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block font-mono">
                  Custom Semester Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Year 1 Semester 2"
                  value={customTermName}
                  onChange={(e) => setCustomTermName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/30 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium"
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={handleShareResult}
                  className="px-4 py-2.5 rounded-xl border border-slate-200/40 text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-800/20 backdrop-blur-md transition-all font-bold text-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareSuccess ? 'Copied' : 'Share'}</span>
                </button>
                <button
                  onClick={handleSaveToHistory}
                  disabled={totalCredits === 0}
                  className="px-4 py-2.5 rounded-xl bg-niibs-blue dark:bg-niibs-yellow hover:bg-niibs-blue-light transition-all text-white dark:text-slate-950 font-black text-xs flex items-center justify-center space-x-1.5 shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saveSuccess ? 'Saved!' : 'Save record'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info advice panel */}
        <motion.div
          className="glass-card p-5 rounded-3xl border-l-4 border-l-niibs-yellow flex items-start space-x-3 text-xs text-slate-600 dark:text-slate-300"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <AlertCircle className="w-4.5 h-4.5 text-niibs-yellow shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Standard UGC computations automatically exclude grades where credits are unmarked or not yet completed. Only fill completed grades.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
