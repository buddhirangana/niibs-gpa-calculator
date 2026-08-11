/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { SemesterRecord } from '../types';
import { Award, Plus, Trash, BookOpen, AlertCircle, Save, Info, Download, Printer } from 'lucide-react';
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
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="py-4 flex flex-col hover:bg-white/10 dark:hover:bg-slate-850/10 px-3 rounded-2xl transition-colors space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="font-display font-bold text-slate-900 dark:text-slate-100 text-sm sm:text-base">
            {sem.name}
          </h4>
          <span className="text-xs text-slate-450 dark:text-slate-400 font-mono">
            Completed Units: <b className="text-slate-700 dark:text-slate-300 font-bold">{sem.credits} Cr.</b>
          </span>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <div className="text-right">
            <span className="font-mono text-lg sm:text-2xl font-extrabold text-niibs-blue dark:text-niibs-yellow leading-none block">
              {sem.gpa.toFixed(2)}
            </span>
            <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">Term GPA</span>
          </div>

          <div className="flex items-center space-x-1 border-l border-slate-200/40 dark:border-slate-800/40 pl-4 print:hidden">
            <button
              onClick={() => setIsEditingNotes(!isEditingNotes)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                isEditingNotes || sem.notes 
                  ? 'text-niibs-blue dark:text-niibs-yellow bg-niibs-blue/5 dark:bg-niibs-yellow/10' 
                  : 'text-slate-440 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title="Notes"
            >
              <BookOpen className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(sem.id)}
              className="p-2 text-slate-440 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all cursor-pointer"
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
            <div className="pt-2 pl-1 border-t border-slate-100/50 dark:border-slate-800/30">
              {isEditingNotes ? (
                <div className="flex items-start space-x-2">
                  <textarea
                    value={notesDraft}
                    onChange={(e) => setNotesDraft(e.target.value)}
                    placeholder="Add a short note about this semester..."
                    className="w-full bg-white/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/60 rounded-xl text-xs p-2 text-slate-700 dark:text-slate-300 min-h-[60px] focus:outline-none focus:ring-1 focus:ring-niibs-blue/50 dark:focus:ring-niibs-yellow/50 resize-none font-sans"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveNotes}
                    className="p-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl hover:opacity-90 transition-opacity"
                    title="Save Notes"
                  >
                    <Save className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p 
                  className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setIsEditingNotes(true)}
                  title="Click to edit notes"
                >
                  {sem.notes}
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
  let bannerStyle = 'bg-white/10 dark:bg-slate-800/10 border border-slate-200/30 dark:border-slate-800/30 text-slate-900 dark:text-white';

  if (totalCredits > 0) {
    if (calculatedCgpa >= 3.70) {
      honorsClassification = 'First Class Honours (Distinction)';
      bannerStyle = 'bg-niibs-yellow/15 border-l-4 border-l-niibs-yellow text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= 3.30) {
      honorsClassification = 'Second Class Upper Division';
      bannerStyle = 'bg-niibs-blue/10 border-l-4 border-l-niibs-blue text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= 3.00) {
      honorsClassification = 'Second Class Lower Division';
      bannerStyle = 'bg-niibs-green/10 border-l-4 border-l-niibs-green text-slate-900 dark:text-white';
    } else if (calculatedCgpa >= 2.00) {
      honorsClassification = 'General Pass';
      bannerStyle = 'bg-white/10 dark:bg-slate-800/10 border border-slate-200/40 dark:border-slate-800/40 text-slate-900 dark:text-white';
    } else {
      honorsClassification = 'Below Graduation Standby';
      bannerStyle = 'bg-niibs-red/10 border-l-4 border-l-niibs-red text-slate-900 dark:text-white';
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
    <div id="cgpa-calculator-component" className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 print:block">
      
      {/* Official Print Header */}
      <div className="hidden print-only print-header">
        <h1>Official Academic Transcript</h1>
        <p>Generated: {new Date().toLocaleDateString()}</p>
        <p>Cumulative Summary Report</p>
      </div>

      {/* Semester details list - Left 2 columns */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Dynamic overall indicator card */}
        <div className={`rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-md flex flex-col justify-between overflow-hidden relative ${bannerStyle}`}>
          <div className="relative z-10 space-y-3">
            <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest text-[#2d3091] dark:text-niibs-yellow">
              Aggregated Graduation Prediction
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-5xl sm:text-6xl font-black text-slate-950 dark:text-white">
                {calculatedCgpa.toFixed(3)}
              </span>
              <span className="text-xs sm:text-sm font-mono text-slate-600 dark:text-slate-400">Overall CGPA</span>
            </div>
            
            <div className="pt-3.5 border-t border-slate-200/40 dark:border-slate-800/35">
              <p className="text-sm sm:text-base font-display font-extrabold tracking-wide text-[#2d3091] dark:text-slate-100">
                Predicted Status: {honorsClassification}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calculated over a database of <b className="font-mono text-slate-900 dark:text-white">{totalCredits}</b> completed units.
              </p>
            </div>
          </div>
          <Award className="absolute -bottom-4 -right-4 w-28 h-28 opacity-5 text-niibs-blue dark:text-niibs-yellow pointer-events-none" />
        </div>

        {/* Saved historical data display ledger */}
        <motion.div
          className="glass-card rounded-3xl p-6 shadow-sm space-y-5"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                Multi-Semester Cumulative Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Individual academic terms currently loaded inside cumulative state memory.
              </p>
            </div>
            {semesters.length > 0 && (
              <div className="flex items-center space-x-2 print:hidden">
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center space-x-1.5 text-[10px] text-slate-500 hover:text-niibs-blue dark:text-slate-400 dark:hover:text-niibs-yellow font-mono font-bold uppercase tracking-wider border border-slate-200/40 dark:border-slate-805 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Print Report"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
                <button
                  onClick={handleExportPdf}
                  className="inline-flex items-center space-x-1.5 text-[10px] text-slate-500 hover:text-niibs-blue dark:text-slate-400 dark:hover:text-niibs-yellow font-mono font-bold uppercase tracking-wider border border-slate-200/40 dark:border-slate-805 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Download PDF Report"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF Report</span>
                </button>
                <button
                  onClick={handleExportCsv}
                  className="inline-flex items-center space-x-1.5 text-[10px] text-slate-500 hover:text-niibs-blue dark:text-slate-400 dark:hover:text-niibs-yellow font-mono font-bold uppercase tracking-wider border border-slate-200/40 dark:border-slate-805 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Export to CSV"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>CSV</span>
                </button>
                <button
                  onClick={onClearAll}
                  className="text-[10px] text-slate-500 hover:text-niibs-red dark:text-slate-400 dark:hover:text-niibs-red font-mono font-bold uppercase tracking-wider border border-slate-200/40 dark:border-slate-805 px-3 py-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Clear records
                </button>
              </div>
            )}
          </div>

          {semesters.length > 0 ? (
            <div className="space-y-6">
              
              {totalCredits > 0 && calculatedCgpa < 3.00 && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-950 dark:text-rose-200 p-4 rounded-3xl flex items-start space-x-3 animate-in fade-in zoom-in-95 duration-300">
                  <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-display font-bold text-sm">Honors Threshold Warning</h4>
                    <p className="text-xs leading-relaxed opacity-90">
                      Your current CGPA ({calculatedCgpa.toFixed(2)}) is below the 3.00 threshold required for an honors degree bracket. You will need to achieve higher term averages in upcoming semesters to elevate your cumulative standing.
                    </p>
                  </div>
                </div>
              )}

              {semesters.length > 0 && (
                <div className="pt-2 pb-2 h-56 sm:h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" opacity={0.15} />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b' }} 
                        dy={10}
                      />
                      <YAxis 
                        domain={[0, 4.0]} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b' }} 
                      />
                      <ReferenceLine 
                        y={3.0} 
                        stroke="#ef4444" 
                        strokeDasharray="4 4" 
                        opacity={0.5}
                        label={{ position: 'insideBottomRight', value: 'Honors Min (3.0)', fill: '#ef4444', fontSize: 10, offset: 5 }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
                          backdropFilter: 'blur(8px)',
                          borderRadius: '16px', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f8fafc',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                        itemStyle={{ color: '#e2e8f0' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                      />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                      <Line 
                        name="Term GPA"
                        type="monotone" 
                        dataKey="Term GPA" 
                        stroke="#2d3091" 
                        strokeWidth={2.5} 
                        dot={{ r: 3.5, strokeWidth: 0, fill: '#2d3091' }} 
                        activeDot={{ r: 5, stroke: '#2d3091', strokeWidth: 2, fill: '#fff' }} 
                      />
                      <Line 
                        name="Cumulative GPA"
                        type="monotone" 
                        dataKey="CGPA" 
                        stroke="#f59e0b" 
                        strokeWidth={2.5} 
                        dot={{ r: 3.5, strokeWidth: 0, fill: '#f59e0b' }} 
                        activeDot={{ r: 5, stroke: '#f59e0b', strokeWidth: 2, fill: '#fff' }} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              )}

              {gradeChartData.length > 0 && (
                <div className="pt-6 pb-2 h-56 sm:h-64 w-full border-t border-slate-200/40 dark:border-slate-800/40 mt-6">
                  <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200 mb-4 text-center">
                    Grade Frequency Distribution
                  </h4>
                  <ResponsiveContainer width="100%" height="80%">
                    <BarChart data={gradeChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#64748b" opacity={0.15} />
                      <XAxis 
                        dataKey="grade" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} 
                        dy={10}
                      />
                      <YAxis 
                        allowDecimals={false}
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fontSize: 10, fill: '#64748b' }} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(15, 23, 42, 0.85)', 
                          backdropFilter: 'blur(8px)',
                          borderRadius: '16px', 
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          color: '#f8fafc',
                          fontSize: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }} 
                        itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                        labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                        cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }}
                      />
                      <Bar dataKey="count" name="Frequency" fill="#2d3091" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              )}

              <div className="divide-y divide-slate-200/30 dark:divide-slate-800/40">
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
            <div className="py-16 text-center border-2 border-dashed border-slate-200/40 dark:border-slate-800 rounded-3xl flex flex-col items-center space-y-3">
              <BookOpen className="w-12 h-12 text-slate-350 dark:text-slate-650" strokeWidth={1.5} />
              <div className="space-y-1 text-center">
                <h4 className="font-display font-semibold text-sm text-slate-755 dark:text-white">Cumulative Slate is Clean</h4>
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
          className="glass-card p-6 rounded-3xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="pb-3 border-b border-slate-200/40 dark:border-slate-800/35">
            <h3 className="font-display font-bold text-slate-950 dark:text-white text-base">
              Add Term Record
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Quickly append pre-calculated semester grades without loading individual subject ledger tables.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Term Name Descriptor */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-slate-455 dark:text-slate-400 font-mono block">
                Semester Descriptor
              </label>
              <input
                type="text"
                placeholder="e.g. Year 1 - Semester 1"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-850 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-display font-medium backdrop-blur-md"
              />
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {/* GPA score */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-455 dark:text-slate-400 font-mono block">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-850 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>

              {/* Completed Credits load */}
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-455 dark:text-slate-400 font-mono block">
                  Semester Credits
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  placeholder="e.g. 18"
                  value={formData.credits}
                  onChange={(e) => setFormData(prev => ({ ...prev, credits: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-850 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 bg-niibs-red/10 text-niibs-red border border-niibs-red/20 text-[11px] rounded-xl leading-relaxed flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl text-xs font-black text-white bg-niibs-blue hover:bg-niibs-blue-light dark:bg-niibs-yellow dark:text-slate-950 transition-all shadow-sm focus:outline-none cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Semester Term</span>
            </button>
          </form>
        </motion.div>

        {/* Target CGPA Planner widget */}
        <motion.div
          className="glass-card p-6 rounded-3xl space-y-5 animate-in fade-in zoom-in-95 duration-300"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="pb-3 border-b border-slate-200/40 dark:border-slate-800/35">
            <h3 className="font-display font-bold text-slate-950 dark:text-white text-base">
              Target CGPA Planner
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Set a target and find out what GPA you need for the remaining credits.
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3.5">
              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-455 dark:text-slate-400 font-mono block">
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
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-850 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase font-bold tracking-wider text-slate-455 dark:text-slate-400 font-mono block">
                  Total Degree Credits
                </label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g. 120"
                  value={targetPlan.totalDegreeCredits}
                  onChange={(e) => setTargetPlan(prev => ({ ...prev, totalDegreeCredits: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-850 bg-white/30 dark:bg-slate-900/30 text-slate-850 dark:text-slate-200 text-xs focus:ring-2 focus:ring-niibs-yellow focus:outline-none font-mono font-medium backdrop-blur-md"
                />
              </div>
            </div>

            {plannerStatus !== 'idle' && (
              <div className={`p-4 rounded-2xl border ${
                plannerStatus === 'possible' 
                  ? requiredGpa && requiredGpa > 3.7 
                    ? 'bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-200' 
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-200'
                  : 'bg-rose-500/10 border-rose-500/20 text-rose-950 dark:text-rose-200'
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
                  <div className="pt-2 mt-2 border-t border-black/10 dark:border-white/10 flex justify-between items-end">
                    <span className="font-mono text-[10px] uppercase tracking-wide opacity-80">Required Avg:</span>
                    <span className="font-mono text-xl font-black leading-none">{requiredGpa.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Informative advice widget */}
        <motion.div
          className="glass-card p-5 rounded-3xl border-l-4 border-l-niibs-yellow flex items-start space-x-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <Info className="w-5 h-5 text-niibs-yellow shrink-0 mt-0.5" />
          <p>
            Your overall CGPA is computed by gathering total point values (credit hours multiplied by the GPA achieved) across all recorded terms, divided by total accumulated credits.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
