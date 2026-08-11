import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Faculty, Program, Subject, FacultySelectedSubject, SemesterRecord } from '../types';
import { facultiesData } from '../data/faculties';
import { Check, Info, Save, Printer, Share2, Award, Calendar, RefreshCw } from 'lucide-react';

interface FacultyCalculatorProps {
  onSaveSemester: (record: SemesterRecord) => void;
  savedSemesters: SemesterRecord[];
  initialFacultyId?: string;
}

export default function FacultyCalculator({ onSaveSemester, savedSemesters, initialFacultyId }: FacultyCalculatorProps) {
  // Selector states
  const [selectedFacultyId, setSelectedFacultyId] = useState<string>(initialFacultyId || 'FCIT');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('');
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number>(1);

  // Sync initialFacultyId if it changes from outside
  useEffect(() => {
    if (initialFacultyId) {
      setSelectedFacultyId(initialFacultyId);
    }
  }, [initialFacultyId]);

  // Active Subject rows
  const [selectedSubjects, setSelectedSubjects] = useState<FacultySelectedSubject[]>([]);

  // Feedback states
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Derived collections
  const activeFaculty = facultiesData.find(f => f.id === selectedFacultyId) || facultiesData[0];
  const activePrograms = activeFaculty.programs;
  const activeProgram = activePrograms.find(p => p.id === selectedProgramId) || activePrograms[0];

  // Sync Program default value upon Faculty switch
  useEffect(() => {
    if (activePrograms.length > 0) {
      setSelectedProgramId(activePrograms[0].id);
      setSelectedSemesterIndex(1);
    }
  }, [selectedFacultyId]);

  // Load subject fields upon select adjustments
  useEffect(() => {
    if (activeProgram) {
      const activeSem = activeProgram.semesters.find(s => s.semesterNumber === selectedSemesterIndex);
      if (activeSem) {
        const mapped: FacultySelectedSubject[] = activeSem.subjects.map(s => {
          // Keep existing grade if returning, or reset
          const old = selectedSubjects.find(os => os.id === s.id);
          return {
            id: s.id,
            code: s.code,
            name: s.name,
            credits: s.credits,
            grade: old ? old.grade : '',
            included: old ? old.included : true,
          };
        });
        setSelectedSubjects(mapped);
      } else {
        setSelectedSubjects([]);
      }
    }
  }, [selectedProgramId, selectedSemesterIndex]);

  // Adjust specific grade selection
  const handleGradeChange = (subId: string, gradeStr: string) => {
    setSelectedSubjects(prev =>
      prev.map(s => (s.id === subId ? { ...s, grade: gradeStr } : s))
    );
  };

  // Adjust checkbox inclusion state
  const handleInclusionChange = (subId: string, isIncluded: boolean) => {
    setSelectedSubjects(prev =>
      prev.map(s => (s.id === subId ? { ...s, included: isIncluded } : s))
    );
  };

  // GPA calculation engine
  const activeScheme = activeFaculty.rules.gradingScheme;
  let totalCredits = 0;
  let totalGradePoints = 0;

  selectedSubjects.forEach(s => {
    if (s.included && s.grade) {
      const match = activeScheme.find(sch => sch.grade === s.grade);
      if (match) {
        totalCredits += s.credits;
        totalGradePoints += s.credits * match.gpaValue;
      }
    }
  });

  const calculatedGpa = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
  const deansListEligible = calculatedGpa >= 3.70 && totalCredits >= 12;

  // Save to History action
  const handleSaveToHistory = () => {
    if (totalCredits === 0) return;
    const termName = `${activeFaculty.shortName} - ${activeProgram.name.split(' (')[0]} Yr${Math.ceil(selectedSemesterIndex / 2)} Sem${(selectedSemesterIndex % 2) === 0 ? 2 : 1}`;
    
    const gradeDistribution: Record<string, number> = {};
    selectedSubjects.forEach(s => {
      if (s.included && s.grade && s.grade !== '') {
        gradeDistribution[s.grade] = (gradeDistribution[s.grade] || 0) + 1;
      }
    });

    onSaveSemester({
      id: `term-${selectedProgramId}-${selectedSemesterIndex}-${Date.now()}`,
      name: termName,
      gpa: Number(calculatedGpa.toFixed(3)),
      credits: totalCredits,
      gradeDistribution,
    });

    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Trigger print standard layout
  const handlePrint = () => {
    window.print();
  };

  // Copy GPA Results to Share
  const handleShareResult = () => {
    const text = `NIIBS GPA Calculator Result 🎓\nFaculty: ${activeFaculty.name}\nProgram: ${activeProgram.name}\nCalculated GPA: ${calculatedGpa.toFixed(3)}\nTotal Earned Credits: ${totalCredits}\nCalculate yours online at: https://gpacalculator.niibs.lk`;
    navigator.clipboard.writeText(text);
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  // Preset Grades to quickly simulate A
  const simulatePerfectGrades = () => {
    setSelectedSubjects(prev =>
      prev.map(s => ({ ...s, grade: 'A' }))
    );
  };

  const clearGrades = () => {
    setSelectedSubjects(prev =>
      prev.map(s => ({ ...s, grade: '' }))
    );
  };

  return (
    <div id="faculty-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

      {/* Selector Fields - Left 1 Column */}
      <div className="lg:col-span-1 space-y-6 no-print">
        <motion.div
          className="glass-card p-6 rounded-3xl space-y-5"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white pb-3 border-b border-slate-200/40 dark:border-slate-800/35">
            Syllabus Selector
          </h3>

          {/* Faculty Selector Selection */}
          <div className="space-y-1.5 flex flex-col">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block font-mono">
              Academic Faculty
            </label>
            <div className="grid grid-cols-1 gap-2">
              {facultiesData.map(fac => (
                <button
                  id={`fac-select-${fac.id}`}
                  key={fac.id}
                  onClick={() => setSelectedFacultyId(fac.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide transition-all ${
                    selectedFacultyId === fac.id
                      ? 'border-niibs-blue/30 dark:border-niibs-yellow/40 bg-niibs-blue/5 dark:bg-niibs-yellow/5 text-[#2d3091] dark:text-niibs-yellow shadow-inner'
                      : 'border-slate-200/40 dark:border-slate-800/40 text-slate-600 dark:text-slate-400 hover:bg-white/30 dark:hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex font-semibold justify-between items-center">
                    <span>{fac.name}</span>
                    <span className="text-[10px] bg-slate-200/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded tracking-wide font-mono text-slate-700 dark:text-slate-300">
                      {fac.shortName}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Program Select Options */}
          {activePrograms.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block font-mono">
                Degree Program Curriculum
              </label>
              <select
                id="program-selector-dropdown"
                value={selectedProgramId}
                onChange={(e) => setSelectedProgramId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 bg-white/20 dark:bg-slate-900/30 text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium"
              >
                {activePrograms.map(prog => (
                  <option key={prog.id} value={prog.id} className="dark:bg-slate-950 dark:text-slate-200">
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Semester Selector Grid */}
          {activeProgram && (
            <div className="space-y-1.5">
              <label className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block font-mono">
                Academic Semester
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {activeProgram.semesters.map(sem => (
                  <button
                    id={`sem-grid-btn-${sem.semesterNumber}`}
                    key={sem.semesterNumber}
                    onClick={() => setSelectedSemesterIndex(sem.semesterNumber)}
                    className={`py-2 rounded-lg text-xs font-mono font-bold border transition-all ${
                      selectedSemesterIndex === sem.semesterNumber
                        ? 'border-niibs-blue bg-niibs-blue text-white dark:border-niibs-yellow dark:bg-niibs-yellow dark:text-slate-950 shadow-sm'
                        : 'border-slate-200/40 dark:border-slate-800/40 bg-white/10 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100/40'
                    }`}
                  >
                    S{sem.semesterNumber}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Dynamic Rules Widget */}
        <motion.div
          className="glass-card p-5 rounded-3xl space-y-3"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-niibs-yellow" />
            <span className="font-display font-bold text-xs uppercase tracking-wider text-slate-950 dark:text-white">
              Rules Active For {activeFaculty.shortName}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
            Faculty Scale is set to <b className="font-mono">{activeFaculty.rules.gpaScale.toFixed(1)}</b>. First Class requires a cumulative CGPA of <b className="font-mono text-niibs-blue dark:text-niibs-yellow">{activeFaculty.rules.degreeClassifications.firstClass.toFixed(2)}</b>. Credits count towards final class honors unless excluded manually.
          </p>
        </motion.div>
      </div>

      {/* Main Subject Grades Calculation Table - Right 2 Columns */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Results Overview Hub */}
        <motion.div
          className="glass-card text-slate-900 dark:text-white rounded-3xl p-6 shadow-lg md:flex md:items-center md:justify-between border-l-4 border-l-niibs-yellow print-card"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#2d3091] dark:text-niibs-yellow font-mono block">
              In-Memory Term GPA Calculations
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-5xl font-extrabold text-[#2d3091] dark:text-white">
                {calculatedGpa.toFixed(3)}
              </span>
              <span className="text-slate-400 font-mono text-sm leading-none">/ 4.000</span>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Logged Credits: <b className="font-mono text-slate-800 dark:text-white">{totalCredits}</b> / Syllabus Potential: <b className="font-mono text-slate-500 dark:text-slate-400">{selectedSubjects.reduce((acc, s) => acc + s.credits, 0)}</b>
            </p>
          </div>

          <div className="mt-5 md:mt-0 flex flex-col items-center md:items-end space-y-3 shrink-0">
            {/* Eligibility Banner */}
            {deansListEligible ? (
              <div className="flex items-center space-x-1 px-3 py-1 bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow border border-niibs-yellow/30 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider">
                <Award className="w-3.5 h-3.5 animate-bounce" />
                <span>Dean's List Eligible</span>
              </div>
            ) : (
              <div className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wide">
                Dean's Threshold: 3.70 GPA & 12 Credits
              </div>
            )}

            {/* Quick Actions Actions */}
            <div className="flex items-center space-x-2 no-print">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-white/30 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                title="Print Transcript"
              >
                <Printer className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareResult}
                className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/60 bg-white/30 dark:bg-slate-800/30 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                title="Share Result String"
              >
                {shareSuccess ? (
                  <span className="text-[10px] text-niibs-green dark:text-niibs-green-light font-bold px-1 animate-pulse">Copied!</span>
                ) : (
                  <Share2 className="w-4 h-4" />
                )}
              </button>
              <button
                onClick={handleSaveToHistory}
                disabled={totalCredits === 0}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-extrabold text-white bg-niibs-blue hover:bg-niibs-blue-light dark:bg-niibs-yellow dark:text-slate-950 transition-all shadow-sm active:scale-95 disabled:opacity-40 select-none cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{saveSuccess ? 'Saved!' : 'Save Progress'}</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subjects List Panel */}
        <motion.div
          className="glass-card rounded-3xl p-5 sm:p-6 shadow-sm space-y-5"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-display font-bold text-slate-950 dark:text-white text-base">
                Semester Module Ledger
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Click weights, simulate grades, and instantly inspect performance indices. Select checkboxes to include.
              </p>
            </div>
            
            {/* Quick tools */}
            <div className="flex space-x-2 no-print shrink-0">
              <button
                onClick={simulatePerfectGrades}
                className="text-[10px] h-7 px-3 bg-white/10 border border-slate-200/40 text-slate-600 dark:text-slate-300 hover:bg-white/30 rounded-lg dark:hover:bg-slate-800/30 font-semibold transition-all backdrop-blur-md cursor-pointer"
              >
                Simulate As
              </button>
              <button
                onClick={clearGrades}
                className="text-[10px] h-7 px-3 bg-white/10 border border-slate-200/40 text-slate-500 dark:text-slate-400 hover:bg-white/30 rounded-lg dark:hover:bg-slate-800/30 font-semibold transition-all backdrop-blur-md cursor-pointer"
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Subjects Table Grid */}
          <div className="space-y-3.5">
            {selectedSubjects.length > 0 ? (
              selectedSubjects.map((sub) => (
                <div
                  key={sub.id}
                  className={`p-4 rounded-2xl border transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${
                    sub.included 
                      ? 'border-slate-200/40 bg-white/20 dark:border-slate-800/30 dark:bg-slate-900/20 backdrop-blur-md' 
                      : 'border-slate-100 opacity-60 bg-slate-100/10 dark:border-slate-800 dark:bg-transparent'
                  }`}
                >
                  {/* Left Column Description */}
                  <div className="flex items-start space-x-3 max-w-sm">
                    <input
                      type="checkbox"
                      checked={sub.included}
                      onChange={(e) => handleInclusionChange(sub.id, e.target.checked)}
                      className="mt-1 w-4 h-4 text-niibs-blue border-slate-300 dark:border-slate-800 rounded focus:ring-niibs-yellow no-print cursor-pointer"
                      id={`chk-${sub.id}`}
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-[10px] tracking-wider font-extrabold bg-[#2d3091]/10 dark:bg-niibs-yellow/10 text-[#2d3091] dark:text-niibs-yellow px-1.5 py-0.5 rounded leading-none">
                          {sub.code}
                        </span>
                        <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400 leading-none">
                          {sub.credits} Credits
                        </span>
                      </div>
                      <h5 className="font-display font-semibold text-slate-900 dark:text-white mt-1.5 text-sm">
                        {sub.name}
                      </h5>
                    </div>
                  </div>

                  {/* Right Column Select Grader */}
                  <div className="flex items-center space-x-2 shrink-0">
                    <div className="flex flex-wrap gap-1 max-w-[280px] sm:max-w-none justify-start sm:justify-end no-print">
                      {['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'E'].map(g => {
                        const isSelected = sub.grade === g;
                        return (
                          <button
                            id={`grade-btn-${sub.id}-${g}`}
                            key={g}
                            onClick={() => handleGradeChange(sub.id, g)}
                            className={`w-6.5 h-6.5 rounded font-mono font-bold text-[10px] transition-all border cursor-pointer ${
                              isSelected
                                ? 'bg-[#2d3091] text-white border-niibs-blue dark:bg-niibs-yellow dark:text-slate-950 dark:border-[#ffc113] font-black scale-110 shadow-md'
                                : 'bg-white/40 border-slate-200 text-slate-500 hover:bg-white/80 dark:bg-slate-800/40 dark:border-slate-800/40 dark:text-slate-300 dark:hover:bg-slate-800/80'
                            }`}
                          >
                            {g}
                          </button>
                        );
                      })}
                    </div>
                    {/* Prints value fallback static */}
                    <span className="hidden print-only font-mono font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded">
                      Grade: {sub.grade || 'Not Graded'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 font-mono">
                No subjects registered for this semester.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
