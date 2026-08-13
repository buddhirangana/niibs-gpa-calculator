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
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(sem.id)}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-all cursor-pointer"
              title="Remove record"
            >
              <Trash className="w-4 h-4" />
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
                  >
                    <Save className="w-4 h-4" />
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

    const headers = ['Semester Name,Credits,GPA'];
    const rows = semesters.map(sem => `"${sem.name.replace(/"/g, '""')}",${sem.credits},${sem.gpa.toFixed(2)}`);
    
    const csvContent = headers.concat(rows).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cgpa-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = () => {
    if (semesters.length === 0) return;
    
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('CGPA Cumulative Report', 14, 22);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Total Credits: ${totalCredits}`, 14, 30);
    doc.text(`Overall CGPA: ${calculatedCgpa.toFixed(3)}`, 14, 36);
    doc.text(`Predicted Status: ${honorsClassification}`, 14, 42);

    const tableData = semesters.map(sem => [
      sem.name,
      sem.credits.toString(),
      sem.gpa.toFixed(2),
      sem.notes || ''
    ]);

    autoTable(doc, {
      startY: 50,
      head: [['Semester Name', 'Credits', 'Term GPA', 'Notes']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [45, 48, 145] },
      styles: { fontSize: 10, cellPadding: 4 },
    });

    doc.save(`cgpa-report-${new Date().toISOString().split('T')[0]}.pdf`);
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
    <div id="cgpa-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 print:block max-w-6xl mx-auto print-document">
      
      {/* Official Print Header */}
      <div className="hidden print-only print-header print-report-header">
        <div className="print-brand-row">
          <div className="print-brand-mark">NIIBS</div>
          <div>
            <h1>NIIBS GPA Calculators</h1>
            <p>Official academic transcript and cumulative summary</p>
          </div>
        </div>
        <div className="print-report-meta">
          <span>Generated: {new Date().toLocaleDateString()}</span>
          <span>Report Type: CGPA Summary</span>
        </div>
      </div>

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
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleExportPdf}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Download PDF Report"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center space-x-1.5 text-xs text-slate-600 dark:text-slate-300 font-mono font-bold border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                  title="Export to CSV"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="inline-flex items-center space-x-1 text-xs text-rose-600 dark:text-rose-400 font-mono font-bold border border-rose-200 dark:border-rose-900/60 px-3 py-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all cursor-pointer"
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
  );
}
