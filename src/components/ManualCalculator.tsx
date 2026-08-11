import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ManualSubject, SemesterRecord } from '../types';
import { fcitGradingScheme } from '../data/faculties';
import { Plus, Trash, Printer, Share2, Save, Sparkles, AlertCircle, Layers, Check } from 'lucide-react';

interface ManualCalculatorProps {
  onSaveSemester: (record: SemesterRecord) => void;
}

export default function ManualCalculator({ onSaveSemester }: ManualCalculatorProps) {
  const [subjects, setSubjects] = useState<ManualSubject[]>([
    { id: '1', name: '', credits: 3, grade: '' },
  ]);

  const [customTermName, setCustomTermName] = useState('');
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
    const text = `My NIIBS Manual GPA Calculation Result 🎓\nTerm Name: ${customTermName}\nCalculated GPA: ${calculatedGpa.toFixed(3)}\nPercentage: ${gradePercentage.toFixed(1)}%\nCalculate yours online at: https://gpacalculator.niibs.lk`;
    navigator.clipboard.writeText(text);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div id="manual-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 max-w-6xl mx-auto">

      {/* Subject rows config - Left 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        <motion.div
          className="glass-card p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-lg flex items-center space-x-2">
                <Layers className="w-5 h-5 text-niibs-blue dark:text-niibs-yellow" />
                <span>Customize GPA Calculations</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Type course descriptors, credit weights, and letter grades. Unlimited rows are supported.
              </p>
            </div>
            
            <button
              onClick={addSubjectRow}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-niibs-blue to-indigo-700 dark:from-niibs-yellow dark:to-amber-400 dark:text-slate-950 hover:shadow-md transition-all cursor-pointer font-display shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Course Row</span>
            </button>
          </div>

          {/* Header titles for Desktop */}
          <div className="hidden sm:grid grid-cols-12 gap-3.5 px-4 text-[10px] uppercase tracking-wider font-mono font-bold text-slate-400">
            <div className="col-span-5">Subject Descriptor</div>
            <div className="col-span-3">Credit Weight</div>
            <div className="col-span-3">Letter Grade</div>
            <div className="col-span-1 text-right">Action</div>
          </div>

          {/* Table ledger input list */}
          <div className="space-y-3">
            {subjects.map((sub, index) => (
              <div 
                key={sub.id} 
                className="grid grid-cols-12 gap-3.5 p-4 rounded-2xl border border-slate-200/80 bg-white/40 dark:border-slate-800/80 dark:bg-slate-900/40 items-center backdrop-blur-md shadow-sm transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
              >
                {/* Course Name Index Field */}
                <div className="col-span-12 sm:col-span-5 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block sm:hidden">
                    Subject Name {index + 1}
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Software Architecture, Sanskrit Grammar..."
                    value={sub.name}
                    onChange={(e) => handleRowChange(sub.id, 'name', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium"
                  />
                </div>

                {/* Credits Input Selection */}
                <div className="col-span-6 sm:col-span-3 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block sm:hidden">Credits</span>
                  <select
                    value={sub.credits}
                    onChange={(e) => handleRowChange(sub.id, 'credits', Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-bold font-mono"
                  >
                    {[1, 2, 3, 4, 5, 6].map(c => (
                      <option key={c} value={c} className="dark:bg-slate-950 dark:text-slate-300">{c} Credits</option>
                    ))}
                  </select>
                </div>

                {/* Selection Grade Choice */}
                <div className="col-span-5 sm:col-span-3 space-y-1">
                  <span className="text-[10px] text-slate-400 font-mono font-bold block sm:hidden">Select Grade</span>
                  <select
                    value={sub.grade}
                    onChange={(e) => handleRowChange(sub.id, 'grade', e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-extrabold font-mono"
                  >
                    <option value="" className="dark:bg-slate-950 dark:text-slate-300">— Select —</option>
                    {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E'].map(g => (
                      <option key={g} value={g} className="dark:bg-slate-950 dark:text-slate-300">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Trash Delete field */}
                <div className="col-span-1 sm:col-span-1 text-right flex justify-end">
                  <button
                    onClick={() => deleteSubjectRow(sub.id)}
                    disabled={subjects.length <= 1}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
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
          className="glass-card p-6 sm:p-7 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-niibs-blue dark:text-niibs-yellow font-mono block">
              Result Board
            </span>
            <Sparkles className="w-4 h-4 text-niibs-yellow" />
          </div>

          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-br from-niibs-blue/5 via-transparent to-niibs-yellow/5 dark:bg-slate-900/40 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-inner">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block tracking-wider">
                TERM GPA
              </span>
              <span className="font-mono text-5xl font-black text-slate-950 dark:text-white block mt-2 tracking-tight">
                {calculatedGpa.toFixed(3)}
              </span>
              <span className="text-xs font-mono font-bold text-niibs-blue dark:text-niibs-yellow block mt-2">
                Total Credits: {totalCredits} Cr.
              </span>
            </div>

            {/* Sub analytic details */}
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 dark:border-slate-800/60 font-sans">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Earned Credits</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{earnedCredits} Credits</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200/60 dark:border-slate-800/60 font-sans">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Cumulative Marks Percent</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{gradePercentage.toFixed(1)}%</span>
              </div>
            </div>

            {/* Custom save layout */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block font-mono">
                  Custom Semester Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Year 1 Semester 2"
                  value={customTermName}
                  onChange={(e) => setCustomTermName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium"
                />
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleShareResult}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 backdrop-blur-md transition-all font-bold text-xs flex items-center justify-center space-x-2 cursor-pointer font-display"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{shareSuccess ? 'Copied' : 'Share'}</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  disabled={totalCredits === 0}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-niibs-blue to-indigo-700 dark:from-niibs-yellow dark:to-amber-400 text-white dark:text-slate-950 hover:shadow-lg transition-all font-bold text-xs flex items-center justify-center space-x-2 shadow-sm active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer font-display"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveSuccess ? 'Saved!' : 'Save Record'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Info advice panel */}
        <motion.div
          className="glass-card p-5 rounded-3xl border-l-4 border-l-niibs-yellow flex items-start space-x-3 text-xs text-slate-600 dark:text-slate-400 border-r border-t border-b border-slate-200/80 dark:border-slate-800/80"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <AlertCircle className="w-4.5 h-4.5 text-niibs-yellow shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Standard UGC computations automatically exclude grades where credits are unmarked or not yet completed. Only fill completed grades.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
