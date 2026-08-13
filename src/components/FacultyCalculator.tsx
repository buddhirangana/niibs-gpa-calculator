import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Faculty, Program, Subject, FacultySelectedSubject, SemesterRecord } from '../types';
import { facultiesData } from '../data/faculties';
import { Check, Info, Save, Printer, Share2, Award, Calendar, RefreshCw, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

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
  const activeScheme = activeProgram?.gradingScheme || activeFaculty.rules.gradingScheme;
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
    const text = `NIIBS GPA Calculator Result 🎓\nFaculty: ${activeFaculty.name}\nProgram: ${activeProgram.name}\nCalculated GPA: ${calculatedGpa.toFixed(3)}\nTotal Earned Credits: ${totalCredits}\n`;
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
    <>
      {/* Official Academic Print Report Document (Print Only) */}
      <div className="hidden print:block print-document-container w-full bg-white text-slate-900 font-sans">
        {/* Institutional Branding Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl border-2 border-slate-900 bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0 overflow-hidden">
                <img src="/favicon.png" alt="NIIBS Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold uppercase tracking-wider text-slate-950 font-sans leading-tight">
                  NIIBS GPA Calculator
                </h1>
                <p className="text-xs text-slate-700 font-sans tracking-wide font-medium">
                  Official Academic Evaluation &amp; Semester GPA Statement
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-[10px] font-semibold tracking-widest uppercase rounded-sm">
                OFFICIAL TRANSCRIPT
              </span>
              <p className="text-[10px] text-slate-600 font-mono mt-1">
                Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Academic Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-3 border-t border-slate-300 text-xs text-slate-800">
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Academic Faculty</span>
              <span className="font-bold text-slate-950">{activeFaculty.name} ({activeFaculty.shortName})</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Degree Program</span>
              <span className="font-bold text-slate-950">{activeProgram.name}</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Curriculum Term</span>
              <span className="font-bold text-slate-950">Year {Math.ceil(selectedSemesterIndex / 2)} &bull; Semester {(selectedSemesterIndex % 2) === 0 ? 2 : 1} (Semester {selectedSemesterIndex})</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Faculty Grading Directive</span>
              <span className="font-bold text-slate-950">{activeFaculty.rules.gpaScale.toFixed(1)} Scale Standard (First Class &ge; {activeFaculty.rules.degreeClassifications.firstClass.toFixed(2)})</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">SEMESTER GPA</span>
            <span className="text-3xl font-bold font-mono text-slate-950 leading-tight block mt-0.5">
              {calculatedGpa.toFixed(3)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">out of 4.000</span>
          </div>
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">CREDITS LOGGED</span>
            <span className="text-3xl font-bold font-mono text-slate-950 leading-tight block mt-0.5">
              {totalCredits} <span className="text-sm font-normal text-slate-600">/ {selectedSubjects.reduce((acc, s) => acc + s.credits, 0)}</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Credit Hours</span>
          </div>
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">ACADEMIC STANDING</span>
            <span className="text-xs font-bold text-slate-950 block mt-2 font-sans">
              {calculatedGpa >= activeFaculty.rules.degreeClassifications.firstClass
                ? 'First Class Benchmark'
                : calculatedGpa >= activeFaculty.rules.degreeClassifications.secondUpper
                ? 'Second Upper Benchmark'
                : calculatedGpa >= activeFaculty.rules.degreeClassifications.secondLower
                ? 'Second Lower Benchmark'
                : calculatedGpa >= 2.0
                ? 'Pass Benchmark'
                : 'Pending / Unsatisfactory'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Based on active grades</span>
          </div>
        </div>

        {/* Module Ledger Table */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2 pb-1 border-b border-slate-900">
            Registered Course Modules Ledger
          </h3>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-slate-900 bg-slate-100 font-mono text-[11px] text-slate-900">
                <th className="py-2 px-2 w-8 text-center border-r border-slate-300">#</th>
                <th className="py-2 px-3 w-28 border-r border-slate-300">Code</th>
                <th className="py-2 px-3 border-r border-slate-300">Course Title</th>
                <th className="py-2 px-3 w-16 text-center border-r border-slate-300">Credits</th>
                <th className="py-2 px-3 w-16 text-center border-r border-slate-300">Grade</th>
                <th className="py-2 px-3 w-20 text-center border-r border-slate-300">Point Val</th>
                <th className="py-2 px-3 w-24 text-right border-r border-slate-300">Credit Pts</th>
                <th className="py-2 px-2 w-20 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {selectedSubjects.map((sub, idx) => {
                const match = activeScheme.find(sch => sch.grade === sub.grade);
                const gpaVal = match ? match.gpaValue : null;
                const creditPts = (sub.included && gpaVal !== null) ? (sub.credits * gpaVal).toFixed(2) : '—';
                return (
                  <tr key={sub.id} className={!sub.included ? 'opacity-40 bg-slate-50' : idx % 2 === 1 ? 'bg-slate-50/50' : ''}>
                    <td className="py-2 px-2 text-center font-mono text-slate-500 border-r border-slate-200">{idx + 1}</td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-900 border-r border-slate-200">{sub.code}</td>
                    <td className="py-2 px-3 font-medium text-slate-950 border-r border-slate-200">{sub.name}</td>
                    <td className="py-2 px-3 text-center font-mono border-r border-slate-200">{sub.credits}</td>
                    <td className="py-2 px-3 text-center font-mono font-bold border-r border-slate-200">
                      {sub.grade || '—'}
                    </td>
                    <td className="py-2 px-3 text-center font-mono border-r border-slate-200">
                      {gpaVal !== null ? gpaVal.toFixed(2) : '—'}
                    </td>
                    <td className="py-2 px-3 text-right font-mono font-bold border-r border-slate-200">{creditPts}</td>
                    <td className="py-2 px-2 text-center font-mono text-[10px]">
                      {sub.included ? (
                        <span className="font-semibold text-slate-900">INCLUDED</span>
                      ) : (
                        <span className="text-slate-400 italic">EXCLUDED</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 bg-slate-100 font-mono font-bold text-slate-950">
                <td colSpan={3} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px] border-r border-slate-300">
                  Semester Summary Totals:
                </td>
                <td className="py-2.5 px-3 text-center border-r border-slate-300">{totalCredits}</td>
                <td className="py-2.5 px-3 text-center border-r border-slate-300">—</td>
                <td className="py-2.5 px-3 text-center border-r border-slate-300">—</td>
                <td className="py-2.5 px-3 text-right text-sm border-r border-slate-300">{totalGradePoints.toFixed(2)}</td>
                <td className="py-2.5 px-2 text-center text-xs font-black">
                  GPA: {calculatedGpa.toFixed(3)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Official Footer Notice and Signatures */}
        <div className="pt-4 border-t border-slate-300 mt-auto break-inside-avoid">
          <p className="text-[10px] text-slate-500 font-sans italic leading-tight text-center mb-8">
            Disclaimer: This evaluation report is computer-generated based on NIIBS faculty curriculum rules. Official academic transcripts must be requested directly from the NIIBS Examination Division.
          </p>

          <div className="grid grid-cols-2 gap-12 pt-6 font-mono text-xs text-slate-800">
            <div>
              <div className="border-b border-slate-400 mb-1.5 h-8"></div>
              <p className="font-bold text-slate-950">Student Signature &amp; Date</p>
              <p className="text-[10px] text-slate-500">I confirm the accuracy of course grades entered above.</p>
            </div>
            <div>
              <div className="border-b border-slate-400 mb-1.5 h-8"></div>
              <p className="font-bold text-slate-950">Authorized Academic Verifier</p>
              <p className="text-[10px] text-slate-500">NIIBS Academic Records Division / Seal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Interactive Web View (Hidden when printing) */}
      <div id="faculty-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 max-w-6xl mx-auto print:hidden">

        {/* Selector Fields - Left 1 Column */}
        <div className="lg:col-span-1 space-y-6 print-selector-panel print:hidden">
          <motion.div
            className="glass-card p-6 sm:p-7 rounded-3xl space-y-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xl print-form-block"
            whileHover={{
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="pb-3 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between print-header-row">
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white print-title">
                Syllabus Selector
              </h3>
              <BookOpen className="w-5 h-5 text-niibs-blue dark:text-niibs-yellow print-icon" />
            </div>

            {/* Faculty Selector Selection */}
            <div className="space-y-2 flex flex-col print-field-group">
              <label className="text-[10px] uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 block font-mono print-label">
                Academic Faculty
              </label>
              <div className="grid grid-cols-1 gap-2 print-options-list">
                {facultiesData.map(fac => {
                  const isSelected = selectedFacultyId === fac.id;
                  return (
                    <button
                      id={`fac-select-${fac.id}`}
                      key={fac.id}
                      onClick={() => setSelectedFacultyId(fac.id)}
                      className={`w-full text-left px-4 py-3 rounded-2xl border text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer font-display print-option-btn ${isSelected
                          ? 'border-niibs-blue dark:border-niibs-yellow bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow shadow-md shadow-slate-900/5'
                          : 'border-slate-200/80 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50'
                        }`}
                    >
                      <div className="flex justify-between items-center">
                        <span>{fac.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold print-option-tag ${isSelected
                            ? 'bg-niibs-blue text-white dark:bg-niibs-yellow dark:text-slate-950'
                            : 'bg-slate-200/60 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400'
                          }`}>
                          {fac.shortName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Program Select Options */}
            {activePrograms.length > 0 && (
              <div className="space-y-2 print-field-group">
                <label className="text-[10px] uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 block font-mono print-label">
                  Degree Program Curriculum
                </label>
                <select
                  id="program-selector-dropdown"
                  value={selectedProgramId}
                  onChange={(e) => setSelectedProgramId(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs sm:text-sm focus:ring-2 focus:ring-niibs-yellow focus:outline-none backdrop-blur-md font-medium print-select"
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
              <div className="space-y-2 print-field-group">
                <label className="text-[10px] uppercase tracking-wider font-medium text-slate-500 dark:text-slate-400 block font-mono print-label">
                  Academic Semester
                </label>
                <div className="grid grid-cols-4 gap-2 print-semester-grid">
                  {activeProgram.semesters.map(sem => {
                    const isSelected = selectedSemesterIndex === sem.semesterNumber;
                    return (
                      <button
                        id={`sem-grid-btn-${sem.semesterNumber}`}
                        key={sem.semesterNumber}
                        onClick={() => setSelectedSemesterIndex(sem.semesterNumber)}
                        className={`py-2 rounded-xl text-xs font-mono font-semibold border transition-all duration-200 cursor-pointer print-semester-btn ${isSelected
                            ? 'border-niibs-blue bg-niibs-blue text-white dark:border-niibs-yellow dark:bg-niibs-yellow dark:text-slate-950 shadow-md'
                            : 'border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                          }`}
                      >
                        Sem {sem.semesterNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>

          {/* Dynamic Rules Widget */}
          <motion.div
            className="glass-card p-6 rounded-3xl space-y-3 border-l-4 border-l-niibs-yellow border-t border-r border-b border-slate-200/80 dark:border-slate-800/80"
            whileHover={{
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Info className="w-4 h-4 text-niibs-yellow" />
              <span className="font-display font-semibold text-xs uppercase tracking-wider text-slate-950 dark:text-white">
                Rules Active For {activeFaculty.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Faculty Scale is set to <b className="font-mono">{activeFaculty.rules.gpaScale.toFixed(1)}</b>. First Class requires a cumulative CGPA of <b className="font-mono text-niibs-blue dark:text-niibs-yellow font-bold">{activeFaculty.rules.degreeClassifications.firstClass.toFixed(2)}</b>. Credits count towards final class honors unless excluded manually.
            </p>
          </motion.div>
        </div>

        {/* Main Subject Grades Calculation Table - Right 2 Columns */}
        <div className="lg:col-span-2 space-y-6">

          {/* Results Overview Hub */}
          <motion.div
            className="glass-card text-slate-900 dark:text-white rounded-3xl p-6 sm:p-8 shadow-xl md:flex md:items-center md:justify-between border border-slate-200/80 dark:border-slate-800/80 border-l-4 border-l-niibs-yellow bg-gradient-to-r from-niibs-blue/5 via-transparent to-niibs-yellow/5 print-card"
            whileHover={{
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="space-y-3">
              <span className="text-[10px] sm:text-xs uppercase font-medium tracking-wider text-niibs-blue dark:text-niibs-yellow font-mono block">
                Calculated Term GPA Index
              </span>
              <div className="flex items-baseline space-x-3">
                <span className="font-mono text-5xl sm:text-6xl font-bold text-slate-950 dark:text-white tracking-tight">
                  {calculatedGpa.toFixed(3)}
                </span>
                <span className="text-slate-400 font-mono text-xs sm:text-sm leading-none font-semibold">/ 4.000</span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                Logged Credits: <b className="font-mono text-slate-800 dark:text-white font-bold">{totalCredits}</b> / Syllabus Potential: <b className="font-mono text-slate-500 dark:text-slate-400 font-bold">{selectedSubjects.reduce((acc, s) => acc + s.credits, 0)}</b>
              </p>
            </div>

            <div className="mt-5 md:mt-0 flex flex-col items-center md:items-end space-y-3 shrink-0">
              {/* Eligibility Banner */}

              {/* Quick Actions */}
              <div className="flex items-center space-x-2.5 no-print">
                <button
                  onClick={handlePrint}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
                  title="Print Transcript"
                  aria-label="Print Transcript"
                >
                  <Printer className="w-4 h-4" />
                  <span className="sr-only">Print Transcript</span>
                </button>

                <button
                  onClick={handleSaveToHistory}
                  disabled={totalCredits === 0}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-niibs-blue to-indigo-700 dark:from-niibs-yellow dark:to-amber-400 dark:text-slate-950 transition-all shadow-md active:scale-95 disabled:opacity-40 select-none cursor-pointer font-display"
                >
                  <Save className="w-4 h-4" />
                  <span>{saveSuccess ? 'Saved!' : 'Save Progress'}</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Subjects List Panel */}
          <motion.div
            className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-slate-200/80 dark:border-slate-800/80"
            whileHover={{
              y: -2,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h4 className="font-display font-semibold text-slate-950 dark:text-white text-lg">
                  Semester Module Ledger
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-0.5">
                  Select letter grades for each module. Check boxes to include or exclude courses.
                </p>
              </div>

              {/* Quick tools */}
              <div className="flex space-x-2 no-print shrink-0">
                <button
                  onClick={simulatePerfectGrades}
                  className="text-xs px-3.5 py-1.5 bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 rounded-xl font-semibold transition-all backdrop-blur-md cursor-pointer font-display"
                >
                  Simulate As
                </button>
                <button
                  onClick={clearGrades}
                  className="text-xs px-3.5 py-1.5 bg-white/40 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl font-semibold transition-all backdrop-blur-md cursor-pointer font-display"
                >
                  Reset All
                </button>
              </div>
            </div>

            {/* Subjects Table Grid */}
            <div className="space-y-4">
              {selectedSubjects.length > 0 ? (
                selectedSubjects.map((sub) => (
                  <div
                    key={sub.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${sub.included
                        ? 'border-slate-200/80 bg-white/40 dark:border-slate-800/80 dark:bg-slate-900/40 backdrop-blur-md shadow-sm'
                        : 'border-slate-200/40 opacity-50 bg-slate-100/20 dark:border-slate-800/40 dark:bg-transparent'
                      }`}
                  >
                    {/* Left Column Description */}
                    <div className="flex items-start space-x-3.5 max-w-sm">
                      <input
                        type="checkbox"
                        checked={sub.included}
                        onChange={(e) => handleInclusionChange(sub.id, e.target.checked)}
                        className="mt-1 w-4 h-4 text-niibs-blue border-slate-300 dark:border-slate-800 rounded focus:ring-niibs-yellow no-print cursor-pointer"
                        id={`chk-${sub.id}`}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-[11px] font-medium bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow px-2 py-0.5 rounded-md">
                            {sub.code}
                          </span>
                          <span className="font-mono text-xs font-medium text-slate-500 dark:text-slate-400">
                            {sub.credits} Credits
                          </span>
                        </div>
                        <h5 className="font-display font-semibold text-slate-900 dark:text-white mt-1.5 text-sm sm:text-base">
                          {sub.name}
                        </h5>
                      </div>
                    </div>

                    {/* Right Column Select Grader */}
                    <div className="flex items-center space-x-2 shrink-0">
                      <div className="flex flex-wrap gap-1 max-w-[290px] sm:max-w-none justify-start sm:justify-end no-print">
                        {activeScheme.map(sch => sch.grade).map(g => {
                          const isSelected = sub.grade === g;
                          return (
                            <button
                              id={`grade-btn-${sub.id}-${g}`}
                              key={g}
                              onClick={() => handleGradeChange(sub.id, g)}
                              className={`w-7 h-7 rounded-lg font-mono font-medium text-[12px] transition-all duration-150 border cursor-pointer ${isSelected
                                  ? 'bg-niibs-blue text-white border-niibs-blue dark:bg-niibs-yellow dark:text-slate-950 dark:border-niibs-yellow scale-110 shadow-md'
                                  : 'bg-white/50 border-slate-200/80 text-slate-600 hover:bg-white dark:bg-slate-800/40 dark:border-slate-800/80 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`}
                            >
                              {g}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-slate-400 font-mono">
                  No subjects registered for this semester.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
