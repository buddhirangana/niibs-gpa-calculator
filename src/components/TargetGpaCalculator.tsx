import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TargetGPAPlan } from '../types';
import { Target, Compass, Sparkles, CheckCircle2, AlertTriangle, ArrowRight, BookOpen, GraduationCap, ShieldCheck, Zap } from 'lucide-react';

export default function TargetGpaCalculator() {
  const [currentCgpa, setCurrentCgpa] = useState<string>('');
  const [completedCredits, setCompletedCredits] = useState<string>('');
  const [targetCgpa, setTargetCgpa] = useState<string>('');
  const [remainingCredits, setRemainingCredits] = useState<string>('');

  const [plan, setPlan] = useState<TargetGPAPlan | null>(null);

  useEffect(() => {
    calculatePlanForTarget();
  }, [currentCgpa, completedCredits, targetCgpa, remainingCredits]);

  const calculatePlanForTarget = () => {
    const currCgpa = Number(currentCgpa) || 0;
    const compCr = Number(completedCredits) || 0;
    const targCgpa = Number(targetCgpa) || 0;
    const remCr = Number(remainingCredits) || 0;

    if (targCgpa <= 0 || remCr <= 0) {
      setPlan(null);
      return;
    }

    const totalCr = compCr + remCr;
    // Formula: Required GPA = ((Target * Total) - (Current * Completed)) / Remaining
    const totalPointsNeeded = targCgpa * totalCr;
    const pointsAlreadyEarned = currCgpa * compCr;
    const pointDebt = totalPointsNeeded - pointsAlreadyEarned;
    const requiredGpa = pointDebt / remCr;

    let isPossible = true;
    let message = '';

    if (requiredGpa > 4.0) {
      isPossible = false;
      message = `Unattainable. To log a CGPA of ${targCgpa.toFixed(2)}, you would need a remaining semester GPA of ${requiredGpa.toFixed(2)}, which exceeds the maximum possible 4.00 ceiling. Consider adjusting your target CGPA down, or checking if more credits remain.`;
    } else if (requiredGpa < 0) {
      isPossible = true;
      message = `Easily attainable. You have accumulated substantial grade credits already. Even if you score below a 1.0 (with a required min GPA equivalent of 0.0), your final CGPA will remain above your target of ${targCgpa.toFixed(2)}!`;
    } else {
      isPossible = true;
      message = `Mathematically viable. To log your final target of ${targCgpa.toFixed(2)}, you must maintain a highly dedicated average GPA of ${requiredGpa.toFixed(2)} in your remaining ${remCr} credits.`;
    }

    setPlan({
      currentCgpa: currCgpa,
      completedCredits: compCr,
      targetCgpa: targCgpa,
      remainingCredits: remCr,
      requiredGpa: requiredGpa,
      isPossible: isPossible,
      message: message,
    });
  };

  return (
    <div id="target-gpa-calculator" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-6xl mx-auto">

      {/* Parameter settings form panel - Left 1 Column */}
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
            <div>
              <h3 className="font-display font-bold text-slate-950 dark:text-white text-base">
                Target Calibration
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Input historical statistics and targets.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
              <Target className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="space-y-4">
            {/* Current CGPA indicator input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Current Cumulative CGPA
              </label>
              <input
                type="number"
                step="0.01"
                min="0.00"
                max="4.00"
                value={currentCgpa}
                onChange={(e) => setCurrentCgpa(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
              />
            </div>

            {/* Total credits earned input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Completed Credits (Units)
              </label>
              <input
                type="number"
                min="0"
                max="160"
                value={completedCredits}
                onChange={(e) => setCompletedCredits(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
              />
            </div>

            {/* Target CGPA desired */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Target CGPA Goal
              </label>
              <input
                type="number"
                step="0.01"
                min="0.00"
                max="4.00"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
              />
            </div>

            {/* Remaining credits upcoming */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Remaining Credits (Upcoming)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={remainingCredits}
                onChange={(e) => setRemainingCredits(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Numerical calculations feedback board - Right 2 Columns */}
      <div className="lg:col-span-2 space-y-6">
        
        {plan ? (
          <div className="space-y-6">
            
            {/* Core Required Index Card */}
            <motion.div
              className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden border border-slate-200/80 dark:border-slate-800/80 shadow-xl bg-gradient-to-r from-niibs-blue/5 via-transparent to-niibs-yellow/5"
              whileHover={{
                y: -2,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="space-y-2 relative z-10">
                <span className="text-[10px] uppercase font-bold tracking-wider text-niibs-blue dark:text-niibs-yellow font-mono block">
                  Calculated Target Path
                </span>
                <h3 className="font-display font-black text-2xl text-slate-950 dark:text-white">
                  Incoming Semester Target
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                  Required average points across the remaining <b className="font-mono text-slate-800 dark:text-white font-bold">{plan.remainingCredits}</b> upcoming course credits.
                </p>
              </div>

              {/* Necessary GPA visual */}
              <div className="text-center md:text-right shrink-0 p-6 bg-white/40 dark:bg-slate-900/40 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md min-w-[200px] shadow-sm">
                <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-wider font-bold">
                  Required GPA
                </span>
                <span className={`font-mono text-4xl sm:text-5xl font-black block mt-2 tracking-tight ${
                  !plan.isPossible 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : (plan.requiredGpa || 0) > 3.6 
                      ? 'text-amber-600 dark:text-niibs-yellow' 
                      : 'text-niibs-blue dark:text-amber-400'
                }`}>
                  {plan.requiredGpa !== null ? Math.max(0, plan.requiredGpa).toFixed(3) : 'N/A'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono block uppercase mt-2 font-bold">
                  Scale Limit: 4.000
                </span>
              </div>
            </motion.div>

            {/* Feasibility assessment block */}
            <div className={`p-5 rounded-3xl border flex items-start space-x-4 backdrop-blur-md shadow-sm ${
              !plan.isPossible 
                ? 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200' 
                : (plan.requiredGpa || 0) > 3.5 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200' 
                  : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
            }`}>
              {!plan.isPossible ? (
                <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600 dark:text-rose-400" />
              ) : (
                <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${(plan.requiredGpa || 0) > 3.5 ? 'text-amber-500 dark:text-niibs-yellow' : 'text-emerald-600 dark:text-emerald-400'}`} />
              )}
              <div className="space-y-1">
                <h4 className="font-display font-bold text-base">
                  {!plan.isPossible 
                    ? 'Target Mathematically Impossible' 
                    : (plan.requiredGpa || 0) > 3.5 
                      ? 'High Effort Required' 
                      : 'Achievable Pathway Confirmed'}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed opacity-95">
                  {plan.message}
                </p>
              </div>
            </div>

            {/* Strategic Advice ledger */}
            {plan.isPossible && (
              <motion.div
                className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-5 border border-slate-200/80 dark:border-slate-800/80"
                whileHover={{
                  y: -2,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
                }}
                transition={{ duration: 0.2 }}
              >
                <h4 className="font-display font-bold text-slate-950 dark:text-white text-lg flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-niibs-yellow" />
                  <span>Strategy Guide for this Goal</span>
                </h4>
                
                <div className="space-y-4 text-xs sm:text-sm font-sans">
                  <div className="p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5 backdrop-blur-md">
                    <span className="font-display font-bold text-slate-950 dark:text-slate-100 text-sm block">
                      1. Core Weight Prioritization
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
                      Focus intensively on courses with 3 or 4 credits. A higher grade in a 4-credit course provides 4x the impact of a 1-credit seminar, giving you maximum leverage to boost cumulative scores.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5 backdrop-blur-md">
                    <span className="font-display font-bold text-slate-950 dark:text-slate-100 text-sm block">
                      2. Repeating Failed/Weak Subjects
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs sm:text-sm">
                      If you have previous "E", "D", or "C-" grades, check with your Faculty Board about repeating these papers. Upgrading a failing grade of 0.0 to a pass grade of 2.0 (C) is often the fastest mathematical way to elevate cumulative averages.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            className="py-20 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center space-y-3 glass-card bg-white/40 dark:bg-slate-900/40"
            whileHover={{
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}
            transition={{ duration: 0.2 }}
          >
            <Target className="w-12 h-12 text-slate-300 dark:text-slate-600" />
            <div className="space-y-1 text-center">
              <h4 className="font-display font-bold text-base text-slate-800 dark:text-white">Enter Target Parameters</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto p-1 leading-relaxed">
                Type completed points details to generate custom goal targets and mathematical strategies.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
