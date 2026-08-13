/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { SemesterRecord } from '../types';
import { getDegreeClassifications } from '../data/faculties';
import { 
  Award, 
  Plus, 
  Trash, 
  BookOpen, 
  AlertCircle, 
  Save, 
  Info, 
  Download, 
  Printer, 
  Target,
  Sparkles,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  FileSpreadsheet,
  FileText
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

interface CgpaCalculatorProps {
  semesters: SemesterRecord[];
  onAddSemester: (record: SemesterRecord) => void;
  onUpdateSemester: (record: SemesterRecord) => void;
  onDeleteSemester: (id: string) => void;
  onClearAll: () => void;
}

interface SemesterRowProps {
  key?: string;
  sem: SemesterRecord;
  index: number;
  onUpdate: (record: SemesterRecord) => void;
  onDelete: (id: string) => void;
}

function SemesterRow({
  sem,
  index,
  onUpdate,
  onDelete
}: SemesterRowProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(sem.notes || '');

  const handleSaveNotes = () => {
    onUpdate({ ...sem, notes: notesDraft });
    setIsEditingNotes(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{ duration: 0.25, delay: index * 0.04 }}
      className="py-4 px-4 flex flex-col hover:bg-slate-100/50 dark:hover:bg-slate-800/30 rounded-2xl transition-all duration-200 space-y-3 border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800/60"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
            {sem.name}
          </h4>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            Earned Units: <b className="text-slate-800 dark:text-slate-200 font-medium">{sem.credits} Credits</b>
          </span>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <div className="text-right">
            <span className="font-mono text-xl sm:text-2xl font-bold text-niibs-blue dark:text-niibs-yellow leading-none block">
              {sem.gpa.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Term GPA</span>
          </div>

          <div className="flex items-center space-x-1 border-l border-slate-200 dark:border-slate-800 pl-4 print:hidden">
            <button
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isEditingNotes || sem.notes 
                  ? 'text-niibs-blue dark:text-niibs-yellow bg-niibs-blue/10 dark:bg-niibs-yellow/15' 
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Notes"
              aria-label="Toggle semester notes"
            >
              <BookOpen className="w-4 h-4" />
              <span className="sr-only">Toggle Notes</span>
            </button>
            <button
              onClick={() => onDelete(sem.id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer"
              title="Remove record"
              aria-label="Remove semester record"
            >
              <Trash className="w-4 h-4" />
              <span className="sr-only">Remove Record</span>
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {(isEditingNotes || sem.notes) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 pl-1 border-t border-slate-200/60 dark:border-slate-800/60">
              {isEditingNotes ? (
                <div className="flex items-start space-x-2">
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add a short note about this semester..."
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-xs p-2.5 text-slate-800 dark:text-slate-200 min-h-[60px] focus:outline-none focus:ring-2 focus:ring-niibs-yellow font-sans resize-none"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="p-2.5 bg-niibs-blue dark:bg-niibs-yellow text-white dark:text-slate-950 rounded-xl hover:opacity-90 transition-opacity cursor-pointer font-bold"
                    title="Save Notes"
                    aria-label="Save semester notes"
                  >
                    <Save className="w-4 h-4" />
                    <span className="sr-only">Save Notes</span>
                  </button>
                </div>
              ) : (
                <p 
                  className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer hover:opacity-80 transition-opacity bg-slate-50 dark:bg-slate-900/40 p-2.5 rounded-xl border border-slate-200/40 dark:border-slate-800/40"
                  onClick={() => setIsEditingNotes(true)}
                  title="Click to edit notes"
                >
                  💬 {sem.notes}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CgpaCalculator({ semesters, onAddSemester, onUpdateSemester, onDeleteSemester, onClearAll }: CgpaCalculatorProps) {
  const [formData, setFormData] = useState({ name: '', gpa: '', credits: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const [targetPlan, setTargetPlan] = useState({ targetCgpa: '', totalDegreeCredits: '' });

  // Local calculations
  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = semesters.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

  // Target CGPA Planner calculations
  const targetCgpaVal = Number(targetPlan.targetCgpa);
  const totalDegreeCreditsVal = Number(targetPlan.totalDegreeCredits);
  
  let requiredGpa = null;
  let plannerMsg = '';
  let plannerStatus: 'idle' | 'possible' | 'impossible' = 'idle';

  if (!isNaN(targetCgpaVal) && !isNaN(totalDegreeCreditsVal) && targetCgpaVal > 0 && totalDegreeCreditsVal > totalCredits) {
    const creditsRemaining = totalDegreeCreditsVal - totalCredits;
    const pointsRequired = (targetCgpaVal * totalDegreeCreditsVal) - totalPoints;
    requiredGpa = pointsRequired / creditsRemaining;

    if (requiredGpa > 4.0) {
      plannerStatus = 'impossible';
      plannerMsg = `You would need a GPA of ${requiredGpa.toFixed(2)}, which is mathematically impossible (exceeds 4.0).`;
    } else if (requiredGpa < 0) {
      plannerStatus = 'possible';
      plannerMsg = `You have already secured this target CGPA! You could average 0.00 and still make it.`;
    } else {
      plannerStatus = 'possible';
      plannerMsg = `You need to maintain an average GPA of ${requiredGpa.toFixed(2)} over your remaining ${creditsRemaining} credits.`;
    }
  } else if (totalDegreeCreditsVal > 0 && totalDegreeCreditsVal <= totalCredits) {
    plannerStatus = 'impossible';
    plannerMsg = `Total degree credits must be greater than your completed credits (${totalCredits}).`;
  }

  // Predict Honors Degree Standing
  let honorsClassification = 'General Degree Standby';
  let bannerStyle = 'bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white';
  const thresholds = getDegreeClassifications(semesters);

  if (totalCredits > 0) {
    if (calculatedCgpa >= thresholds.firstClass) {
      honorsClassification = 'First Class Honours (Distinction)';
      bannerStyle = 'bg-gradient-to-r from-amber-500/15 via-yellow-500/5 to-transparent border border-amber-500/30 text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= thresholds.secondUpper) {
      honorsClassification = 'Second Class Upper Division';
      bannerStyle = 'bg-gradient-to-r from-niibs-blue/15 via-indigo-500/5 to-transparent border border-niibs-blue/30 text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= thresholds.secondLower) {
      honorsClassification = 'Second Class Lower Division';
      bannerStyle = 'bg-gradient-to-r from-emerald-500/15 via-teal-500/5 to-transparent border border-emerald-500/30 text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= thresholds.generalDegree) {
      honorsClassification = 'General Pass';
      bannerStyle = 'bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 text-slate-900 dark:text-white';
    } else {
      honorsClassification = 'Below Graduation Standby';
      bannerStyle = 'bg-gradient-to-r from-rose-500/15 via-red-500/5 to-transparent border border-rose-500/30 text-slate-900 dark:text-white';
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const gpaVal = Number(formData.gpa);
    const creditsVal = Number(formData.credits);

    if (!formData.name.trim()) {
      setErrorMsg('Please specify some descriptor for the semester name.');
      return;
    }
    if (isNaN(gpaVal) || gpaVal < 0 || gpaVal > 4.0) {
      setErrorMsg('Semester GPA must lie within standard boundaries (0.00 to 4.00).');
      return;
    }
    if (isNaN(creditsVal) || creditsVal <= 0 || creditsVal > 40) {
      setErrorMsg('Completed Credits must normally fall between 1 and 40.');
      return;
    }

    onAddSemester({
      id: `cgpa-${Date.now()}`,
      name: formData.name.trim(),
      gpa: gpaVal,
      credits: creditsVal,
    });

    setFormData({ name: '', gpa: '', credits: '' });
  };

  const handleExportCsv = () => {
    if (semesters.length === 0) return;

    const formattedDate = new Date().toISOString().split('T')[0];
    const generatedOn = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    let csvContent = `NIIBS GPA Calculator - Official Cumulative CGPA Summary Report\n`;
    csvContent += `Generated Date,"${generatedOn}"\n`;
    csvContent += `Overall CGPA,${calculatedCgpa.toFixed(3)}\n`;
    csvContent += `Total Completed Credits,${totalCredits}\n`;
    csvContent += `Honors Classification,"${honorsClassification.replace(/"/g, '""')}"\n`;
    csvContent += `Total Semesters Logged,${semesters.length}\n`;
    csvContent += `\n`;
    csvContent += `"#","Semester / Term Name","Credits","Term GPA","Total Grade Points","Notes"\n`;

    semesters.forEach((sem, idx) => {
      const termPoints = sem.gpa * sem.credits;
      const notesStr = sem.notes ? sem.notes.replace(/"/g, '""') : '';
      csvContent += `${idx + 1},"${sem.name.replace(/"/g, '""')}",${sem.credits},${sem.gpa.toFixed(2)},${termPoints.toFixed(2)},"${notesStr}"\n`;
    });

    const totalPoints = semesters.reduce((acc, sem) => acc + (sem.gpa * sem.credits), 0);
    csvContent += `\n`;
    csvContent += `"SUMMARY","CUMULATIVE TOTALS",${totalCredits},${calculatedCgpa.toFixed(3)},${totalPoints.toFixed(2)},"Status: ${honorsClassification.replace(/"/g, '""')}"\n`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `NIIBS-CGPA-Report-${formattedDate}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportPdf = async () => {
    if (semesters.length === 0) return;

    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');

    const doc = new jsPDF();
    const formattedDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    // Primary Header Banner
    doc.setFillColor(45, 48, 145); // NIIBS Blue
    doc.rect(0, 0, 210, 28, 'F');

    // Title inside Header Banner
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(255, 255, 255);
    doc.text('NIIBS GPA CALCULATOR', 14, 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(230, 235, 255);
    doc.text('Official Academic Cumulative CGPA Statement', 14, 22);

    doc.setFontSize(8);
    doc.text(`Issued: ${formattedDate}`, 196, 15, { align: 'right' });
    doc.text('Official Report', 196, 21, { align: 'right' });

    // Summary Box
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(14, 34, 182, 30, 3, 3, 'FD');

    // Column 1: CGPA
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('OVERALL CGPA', 20, 43);

    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(calculatedCgpa.toFixed(3), 20, 54);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('/ 4.000 Scale', 48, 54);

    // Column 2: Credits
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('TOTAL COMPLETED CREDITS', 82, 43);

    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(totalCredits.toString(), 82, 54);

    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('Credit Hours', 102, 54);

    // Column 3: Predicted Status
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text('PREDICTED HONORS STATUS', 142, 43);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(45, 48, 145);
    doc.text(honorsClassification, 142, 53);

    // Table of Semesters
    let totalGradePointsSum = 0;
    const tableData = semesters.map((sem, idx) => {
      const points = sem.gpa * sem.credits;
      totalGradePointsSum += points;
      return [
        (idx + 1).toString(),
        sem.name,
        sem.credits.toString(),
        sem.gpa.toFixed(2),
        points.toFixed(2),
        sem.notes || '—'
      ];
    });

    autoTable(doc, {
      startY: 70,
      head: [['#', 'Semester / Term Descriptor', 'Credits', 'Term GPA', 'Points Earned', 'Notes']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [45, 48, 145],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
        halign: 'left'
      },
      columnStyles: {
        0: { halign: 'center', cellWidth: 12 },
        1: { cellWidth: 70 },
        2: { halign: 'center', cellWidth: 22 },
        3: { halign: 'center', cellWidth: 24 },
        4: { halign: 'right', cellWidth: 26 },
        5: { cellWidth: 'auto' }
      },
      foot: [[
        'Total',
        'Cumulative Summary',
        totalCredits.toString(),
        `CGPA: ${calculatedCgpa.toFixed(3)}`,
        totalGradePointsSum.toFixed(2),
        `Status: ${honorsClassification}`
      ]],
      footStyles: {
        fillColor: [241, 245, 249],
        textColor: [15, 23, 42],
        fontStyle: 'bold',
        fontSize: 9
      },
      styles: {
        fontSize: 9,
        cellPadding: 4.5,
        textColor: [30, 41, 59]
      },
      alternateRowStyles: {
        fillColor: [248, 250, 252]
      }
    });

    const finalY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 15 : 200;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text('Disclaimer: This transcript summary is generated electronically via NIIBS GPA Calculator.', 14, Math.min(finalY, 275));
    doc.text('Official academic records must be verified directly with the NIIBS Examination Division.', 14, Math.min(finalY + 4, 279));

    doc.save(`NIIBS-CGPA-Report-${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handlePrint = () => {
    window.print();
  };

  const chartData = semesters.map((sem, index) => {
    const creditsUpToNow = semesters.slice(0, index + 1).reduce((sum, s) => sum + s.credits, 0);
    const pointsUpToNow = semesters.slice(0, index + 1).reduce((sum, s) => sum + (s.gpa * s.credits), 0);
    const cgpaUpToNow = creditsUpToNow > 0 ? (pointsUpToNow / creditsUpToNow) : 0;

    return {
      name: sem.name.length > 15 ? sem.name.substring(0, 15) + '...' : sem.name,
      fullName: sem.name,
      'Term GPA': Number(sem.gpa.toFixed(2)),
      'CGPA': Number(cgpaUpToNow.toFixed(2))
    };
  });

  const globalGradeDistribution: Record<string, number> = {};
  semesters.forEach(sem => {
    if (sem.gradeDistribution) {
      Object.entries(sem.gradeDistribution).forEach(([grade, count]) => {
        globalGradeDistribution[grade] = (globalGradeDistribution[grade] || 0) + count;
      });
    }
  });

  const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E'];
  const gradeChartData = Object.entries(globalGradeDistribution)
    .map(([grade, count]) => ({ grade, count }))
    .sort((a, b) => {
      const indexA = gradeOrder.indexOf(a.grade);
      const indexB = gradeOrder.indexOf(b.grade);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.grade.localeCompare(b.grade);
    });

  return (
    <>
      {/* Official Academic Print Report Document (Print Only) */}
      <div className="hidden print:block print-document-container w-full bg-white text-slate-900 font-sans">
        {/* Institutional Branding Header */}
        <div className="border-b-2 border-slate-900 pb-4 mb-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl border-2 border-slate-900 bg-white flex items-center justify-center p-1.5 shadow-sm shrink-0 overflow-hidden">
                <img src="/favicon.png" alt="NIIBS GPA Calculator Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold uppercase tracking-wider text-slate-950 font-sans leading-tight">
                  NIIBS GPA Calculator
                </h1>
                <p className="text-xs text-slate-700 font-sans tracking-wide font-medium">
                  Official Cumulative CGPA Performance Statement &amp; Transcript Summary
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="inline-block px-3 py-1 bg-slate-900 text-white font-mono text-[10px] font-semibold tracking-widest uppercase rounded-sm">
                CUMULATIVE REPORT
              </span>
              <p className="text-[10px] text-slate-600 font-mono mt-1">
                Issued: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Academic Metadata Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2 pt-3 border-t border-slate-300 text-xs text-slate-800">
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Evaluation Type</span>
              <span className="font-bold text-slate-950">Multi-Semester Cumulative CGPA Log</span>
            </div>
            <div>
              <span className="font-semibold text-slate-600 font-mono text-[10px] uppercase block">Semesters Logged</span>
              <span className="font-bold text-slate-950">{semesters.length} Academic Terms</span>
            </div>
          </div>
        </div>

        {/* Executive Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">OVERALL CGPA</span>
            <span className="text-3xl font-bold font-mono text-slate-950 leading-tight block mt-0.5">
              {calculatedCgpa.toFixed(3)}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">out of 4.000</span>
          </div>
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">TOTAL COMPLETED CREDITS</span>
            <span className="text-3xl font-bold font-mono text-slate-950 leading-tight block mt-0.5">
              {totalCredits}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Credit Hours</span>
          </div>
          <div className="p-3.5 border-2 border-slate-900 bg-slate-50 text-center rounded-md">
            <span className="text-[10px] uppercase tracking-wider font-mono font-semibold text-slate-600 block">PREDICTED HONORS STATUS</span>
            <span className="text-xs font-bold text-slate-950 block mt-2 font-sans">
              {honorsClassification}
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Based on logged semesters</span>
          </div>
        </div>

        {/* Semester Cumulative Ledger Table */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 font-mono mb-2 pb-1 border-b border-slate-900">
            Multi-Semester Cumulative Performance Log
          </h3>
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-slate-900 bg-slate-100 font-mono text-[11px] text-slate-900">
                <th className="py-2 px-2 w-8 text-center border-r border-slate-300">#</th>
                <th className="py-2 px-3 border-r border-slate-300">Semester Descriptor</th>
                <th className="py-2 px-3 w-20 text-center border-r border-slate-300">Credits</th>
                <th className="py-2 px-3 w-24 text-center border-r border-slate-300">Term GPA</th>
                <th className="py-2 px-3 w-28 text-right border-r border-slate-300">Grade Points</th>
                <th className="py-2 px-3 border-r border-slate-300">Notes / Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {semesters.map((sem, idx) => {
                const points = sem.gpa * sem.credits;
                return (
                  <tr key={sem.id} className={idx % 2 === 1 ? 'bg-slate-50/50' : ''}>
                    <td className="py-2 px-2 text-center font-mono text-slate-500 border-r border-slate-200">{idx + 1}</td>
                    <td className="py-2 px-3 font-medium text-slate-950 border-r border-slate-200">{sem.name}</td>
                    <td className="py-2 px-3 text-center font-mono border-r border-slate-200">{sem.credits}</td>
                    <td className="py-2 px-3 text-center font-mono font-bold border-r border-slate-200">{sem.gpa.toFixed(2)}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold border-r border-slate-200">{points.toFixed(2)}</td>
                    <td className="py-2 px-3 text-slate-600 border-r border-slate-200">{sem.notes || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 bg-slate-100 font-mono font-bold text-slate-950">
                <td colSpan={2} className="py-2.5 px-3 text-right uppercase tracking-wider text-[11px] border-r border-slate-300">
                  Cumulative Totals:
                </td>
                <td className="py-2.5 px-3 text-center border-r border-slate-300">{totalCredits}</td>
                <td className="py-2.5 px-3 text-center border-r border-slate-300">CGPA: {calculatedCgpa.toFixed(3)}</td>
                <td className="py-2.5 px-3 text-right text-sm border-r border-slate-300">
                  {semesters.reduce((acc, sem) => acc + (sem.gpa * sem.credits), 0).toFixed(2)}
                </td>
                <td className="py-2.5 px-3 text-xs font-bold">
                  Status: {honorsClassification}
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
              <p className="text-[10px] text-slate-500">I confirm the accuracy of term grades recorded above.</p>
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
      <div id="cgpa-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 print:hidden max-w-6xl mx-auto">

      {/* Semester details list - Left 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Dynamic overall indicator card */}
        <div className={`rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-md flex flex-col justify-between overflow-hidden relative print-summary-panel ${bannerStyle}`}>
          <div className="relative z-10 space-y-3">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-niibs-blue dark:text-niibs-yellow">
                Aggregated Graduation Prediction
              </span>
            </div>
            
            <div className="flex items-baseline space-x-3">
              <span className="font-mono text-5xl sm:text-6xl font-bold text-slate-950 dark:text-white tracking-tight">
                {calculatedCgpa.toFixed(3)}
              </span>
              <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400">Overall CGPA</span>
            </div>
            
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800/60">
              <p className="text-sm sm:text-base font-display font-medium tracking-wide text-niibs-blue dark:text-slate-100 flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-niibs-yellow" />
                <span>Predicted Status: {honorsClassification}</span>
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Calculated over a database of <b className="font-mono text-slate-900 dark:text-white font-medium">{totalCredits}</b> completed units.
              </p>
            </div>
          </div>
          <Award className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 text-niibs-blue dark:text-niibs-yellow pointer-events-none" />
        </div>

        {/* Saved historical data display ledger */}
        <motion.div
          className="glass-card rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 border border-slate-200/80 dark:border-slate-800/80 print-ledger"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h3 className="font-display font-semibold text-slate-900 dark:text-white text-lg">
                Multi-Semester Cumulative Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Individual academic terms currently loaded inside cumulative state memory.
              </p>
            </div>
            
            {semesters.length > 0 && (
              <div className="flex items-center flex-wrap gap-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Print Report"
                  aria-label="Print cumulative CGPA report"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleExportPdf}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Download PDF Report"
                  aria-label="Download PDF CGPA report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Export to CSV"
                  aria-label="Export to CSV spreadsheet"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="inline-flex items-center space-x-1 text-xs text-rose-600 dark:text-rose-400 font-mono font-bold border border-rose-200 dark:border-rose-900/60 px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
                  aria-label="Clear all recorded terms"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              </div>
            )}
          </div>

          {semesters.length > 0 ? (
            <div className="space-y-6">
              {totalCredits > 0 && calculatedCgpa < thresholds.secondLower && (
                <div className="bg-rose-500/10 border border-rose-500/30 text-rose-950 dark:text-rose-200 p-4.5 rounded-2xl flex items-start space-x-3 animate-in fade-in zoom-in-95 duration-200">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-sm">Honors Threshold Warning</h4>
                    <p className="text-xs leading-relaxed opacity-90">
                      Your current CGPA ({calculatedCgpa.toFixed(2)}) is below the {thresholds.secondLower.toFixed(2)} threshold required for an honors degree bracket. You will need to achieve higher term averages in upcoming semesters to elevate your cumulative standing.
                    </p>
                  </div>
                </div>
              )}

              {semesters.length > 0 && (
                <div className="pt-2 pb-2 h-60 sm:h-68 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }} 
                        dy={10}
                      />
                      <YAxis 
                        domain={[0, 4.0]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }} 
                      />
                      <ReferenceLine 
                        y={thresholds.secondLower} 
                        stroke="#ef4444" 
                        strokeDasharray="4 4" 
                        opacity={0.6}
                        label={{ position: 'insideBottomRight', value: `Honors Min (${thresholds.secondLower.toFixed(1)})`, fill: '#ef4444', fontSize: 10, offset: 5, fontFamily: 'JetBrains Mono' }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          backdropFilter: 'blur(12px)',
                          borderRadius: '16px', 
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: '12px',
                          fontWeight: 'bold',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                        }} 
                        itemStyle={{ color: '#e2e8f0' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px', fontFamily: 'JetBrains Mono' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px', fontFamily: 'JetBrains Mono' }} />
                      <Line 
                        name="Term GPA"
                        type="monotone" 
                        dataKey="Term GPA" 
                        stroke="#2d3091" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 0, fill: '#2d3091' }} 
                        activeDot={{ r: 6, stroke: '#2d3091', strokeWidth: 2, fill: '#fff' }} 
                      />
                      <Line 
                        name="Cumulative GPA"
                        type="monotone" 
                        dataKey="CGPA" 
                        stroke="#ffc013" 
                        strokeWidth={3} 
                        dot={{ r: 4, strokeWidth: 0, fill: '#ffc013' }} 
                        activeDot={{ r: 6, stroke: '#ffc013', strokeWidth: 2, fill: '#fff' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {gradeChartData.length > 0 && (
                <div className="pt-6 pb-2 h-56 sm:h-64 w-full border-t border-slate-200/80 dark:border-slate-800/80 mt-6">
                  <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200 mb-4 text-center">
                    Grade Frequency Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={gradeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.15)" />
                      <XAxis 
                        dataKey="grade" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 11, fill: '#64748b', fontWeight: 'bold', fontFamily: 'JetBrains Mono' }} 
                        dy={10}
                      />
                      <YAxis 
                        allowDecimals={false}
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontFamily: 'JetBrains Mono' }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                          backdropFilter: 'blur(12px)',
                          borderRadius: '16px', 
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: '#f8fafc',
                          fontSize: '12px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
                        }} 
                        itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                        cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                      />
                      <Bar dataKey="count" name="Frequency" fill="#2d3091" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="divide-y divide-slate-100 dark:divide-slate-800/60 pt-2">
                <AnimatePresence>
                  {semesters.map((sem, index) => (
                    <SemesterRow 
                      key={sem.id}
                      sem={sem}
                      index={index}
                      onUpdate={onUpdateSemester}
                      onDelete={onDeleteSemester}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
              <div className="space-y-1 text-center">
                <h4 className="font-display font-semibold text-base text-slate-800 dark:text-white">Cumulative Slate is Clean</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto p-1 leading-relaxed">
                  Use the quick form on the right or any of the GPA calculators to save core semester benchmarks here.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Manual fast entry form - Right 1 Column */}
      <div className="lg:col-span-1 space-y-6 print:hidden">
        <motion.div
          className="glass-card p-6 sm:p-7 rounded-3xl space-y-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="pb-3.5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-slate-950 dark:text-white text-base">
                Add Term Record
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Quickly append pre-calculated semester grades.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
              <Plus className="w-4.5 h-4.5" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Term Name Descriptor */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                Semester Descriptor
              </label>
              <input
                type="text"
                placeholder="e.g. FCIT - Year 1 Semester 1"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-display font-medium backdrop-blur-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* GPA score */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Term GPA Index
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  placeholder="e.g. 3.65"
                  value={formData.gpa}
                  onChange={(e) => setFormData(prev => ({ ...prev, gpa: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>

              {/* Completed Credits load */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Semester Credits
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  placeholder="e.g. 18"
                  value={formData.credits}
                  onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs rounded-xl leading-relaxed flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-niibs-blue to-indigo-700 dark:from-niibs-yellow dark:to-amber-400 dark:text-slate-950 hover:shadow-lg transition-all cursor-pointer font-display"
            >
              <Plus className="w-4 h-4" />
              <span>Log Semester Term</span>
            </button>
          </form>
        </motion.div>

        {/* Target CGPA Planner widget */}
        <motion.div
          className="glass-card p-6 sm:p-7 rounded-3xl space-y-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xl"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="pb-3.5 border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
            <div>
              <h3 className="font-display font-semibold text-slate-950 dark:text-white text-base">
                Target CGPA Planner
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calculate needed GPA for remaining credits.
              </p>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:text-niibs-yellow">
              <Target className="w-4.5 h-4.5" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Target CGPA
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.00"
                  max="4.00"
                  placeholder="e.g. 3.50"
                  value={targetPlan.targetCgpa}
                  onChange={(e) => setTargetPlan(prev => ({ ...prev, targetCgpa: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-medium tracking-wider text-slate-500 dark:text-slate-400 font-mono block">
                  Total Degree Credits
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 120"
                  value={targetPlan.totalDegreeCredits}
                  onChange={(e) => setTargetPlan(prev => ({ ...prev, totalDegreeCredits: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>
            </div>

            {plannerStatus !== 'idle' && (
              <div className={`p-4 rounded-2xl border ${
                plannerStatus === 'possible' 
                  ? requiredGpa && requiredGpa > 3.7 
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200' 
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-950 dark:text-rose-200'
              } text-xs leading-relaxed space-y-2`}>
                <div className="flex items-start space-x-2">
                  <AlertCircle className={`w-4 h-4 shrink-0 mt-0.5 ${
                    plannerStatus === 'possible' 
                      ? requiredGpa && requiredGpa > 3.7 ? 'text-amber-500' : 'text-emerald-500' 
                      : 'text-rose-500'
                  }`} />
                  <p>{plannerMsg}</p>
                </div>
                {plannerStatus === 'possible' && requiredGpa !== null && requiredGpa >= 0 && requiredGpa <= 4.0 && (
                  <div className="pt-2 mt-2 border-t border-black/10 dark:border-white/10 flex justify-between items-end font-mono">
                    <span className="text-[10px] uppercase tracking-wide opacity-80 font-bold">Required Avg:</span>
                    <span className="text-xl font-black leading-none">{requiredGpa.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Informative advice widget */}
        <motion.div
          className="glass-card p-5 rounded-3xl border-l-4 border-l-niibs-yellow flex items-start space-x-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 border-r border-t border-b border-slate-200/80 dark:border-slate-800/80"
          whileHover={{
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.06), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
          }}
          transition={{ duration: 0.2 }}
        >
          <Info className="w-5 h-5 text-niibs-yellow shrink-0 mt-0.5" />
          <p>
            Your overall CGPA is computed by gathering total point values (credit hours multiplied by the GPA achieved) across all recorded terms, divided by total accumulated credits.
          </p>
        </motion.div>
      </div>
    </div>
  </>
);
}
