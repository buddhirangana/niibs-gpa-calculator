import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SemesterRecord } from '../types';
import { 
  Award, 
  GraduationCap, 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  HelpCircle, 
  Dumbbell, 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  TrendingUp,
  RotateCcw,
  CheckCircle2,
  Check
} from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Legend as RechartsLegend } from 'recharts';
import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

interface DashboardProps {
  semesters: SemesterRecord[];
  onNavigate: (viewId: string) => void;
  clearHistory: () => void;
}

export default function Dashboard({ semesters, onNavigate, clearHistory }: DashboardProps) {
  // Aggregate stats
  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0);
  const totalPoints = semesters.reduce((sum, s) => sum + (s.gpa * s.credits), 0);
  const calculatedCgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

  // Determine Class
  let degreeClass = 'No Active Record';
  let classColor = 'bg-slate-100 text-slate-600 dark:bg-slate-800/60 dark:text-slate-400 border-slate-200 dark:border-slate-700';
  if (totalCredits > 0) {
    if (calculatedCgpa >= 3.70) {
      degreeClass = 'First Class Honours';
      classColor = 'bg-amber-500/15 text-amber-700 dark:text-niibs-yellow border-amber-500/30';
    } else if (calculatedCgpa >= 3.30) {
      degreeClass = 'Second Class Upper Division';
      classColor = 'bg-niibs-blue/15 text-niibs-blue dark:text-indigo-300 border-niibs-blue/30';
    } else if (calculatedCgpa >= 3.00) {
      degreeClass = 'Second Class Lower Division';
      classColor = 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30';
    } else if (calculatedCgpa >= 2.00) {
      degreeClass = 'General Pass';
      classColor = 'bg-slate-200/70 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-700';
    } else {
      degreeClass = 'Below Minimum Grad Standing';
      classColor = 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30';
    }
  }

  // Deans list eligibility (if any semester GPA >= 3.7 && credits completed >= 12 in that semester)
  const deansListEligibleCount = semesters.filter(s => s.gpa >= 3.70 && s.credits >= 12).length;

  // Badge list logic
  const badges: { title: string; desc: string; icon: typeof Trophy; color: string; bgGradient: string }[] = [];
  if (totalCredits > 0) {
    badges.push({
      title: 'Academic Pilgrim',
      desc: 'Embarking on the NIIBS university level path.',
      icon: Trophy,
      color: 'text-teal-700 dark:text-teal-300 border-teal-500/30',
      bgGradient: 'from-teal-500/15 to-emerald-500/10'
    });
    if (calculatedCgpa >= 3.7) {
      badges.push({
        title: 'Lotus Transcendence',
        desc: 'Achieving pristine First Class standing (CGPA ≥ 3.70).',
        icon: Sparkles,
        color: 'text-amber-700 dark:text-niibs-yellow border-amber-500/30',
        bgGradient: 'from-amber-500/15 to-yellow-500/10'
      });
    }
    if (totalCredits >= 60) {
      badges.push({
        title: 'Master Scholar',
        desc: 'Overcame major credit hurdles (Completed ≥ 60 Credits).',
        icon: GraduationCap,
        color: 'text-purple-700 dark:text-purple-300 border-purple-500/30',
        bgGradient: 'from-purple-500/15 to-indigo-500/10'
      });
    }
    if (deansListEligibleCount > 0) {
      badges.push({
        title: "Dean's Laureate",
        desc: `Stellar standing in ${deansListEligibleCount} Semester(s).`,
        icon: Award,
        color: 'text-niibs-blue dark:text-indigo-300 border-niibs-blue/30',
        bgGradient: 'from-niibs-blue/15 to-indigo-500/10'
      });
    }
  }

  // Build high-fidelity SVG path for the Line Chart
  const svgWidth = 500;
  const svgHeight = 160;
  let chartPoints = '';
  let areaPoints = '';
  let dotCoords: { x: number; y: number; val: number; name: string }[] = [];

  if (semesters.length > 1) {
    const minVal = 0;
    const maxVal = 4.0;
    const stepX = svgWidth / (semesters.length - 1);

    dotCoords = semesters.map((sem, idx) => {
      const x = idx * stepX;
      // invert y since SVG 0 is top
      const y = svgHeight - ((sem.gpa - minVal) / (maxVal - minVal)) * (svgHeight - 30) - 15;
      return { x, y, val: sem.gpa, name: sem.name };
    });

    const linePath = dotCoords.map(p => `${p.x},${p.y}`).join(' L ');
    chartPoints = `M ${linePath}`;
    areaPoints = `M ${dotCoords[0].x},${svgHeight} L ${linePath} L ${dotCoords[dotCoords.length - 1].x},${svgHeight} Z`;
  }

  // Aggregate grade distribution
  const gradeDistribution: Record<string, number> = {};
  semesters.forEach(s => {
    if (s.gradeDistribution) {
      Object.entries(s.gradeDistribution).forEach(([grade, count]) => {
        gradeDistribution[grade] = (gradeDistribution[grade] || 0) + count;
      });
    }
  });

  const gradeDistributionData = Object.entries(gradeDistribution)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const COLORS = ['#2d3091', '#00a650', '#ffc013', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6', '#f97316'];

  const d3Container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!d3Container.current || gradeDistributionData.length === 0) return;

    let animationFrameId: number;
    const drawChart = () => {
      const gradeOrder = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D+', 'D', 'E', 'F'];
      const data = [...gradeDistributionData].sort((a, b) => {
        const idxA = gradeOrder.indexOf(a.name);
        const idxB = gradeOrder.indexOf(b.name);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        return a.name.localeCompare(b.name);
      });

      const container = d3Container.current;
      if (!container) return;

      const margin = { top: 25, right: 20, bottom: 35, left: 45 };
      const width = container.clientWidth - margin.left - margin.right;
      const height = 240 - margin.top - margin.bottom;

      d3.select(container).selectAll('*').remove();

      const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add Gradient for Bars
      const defs = svg.append('defs');
      const gradient = defs
        .append('linearGradient')
        .attr('id', 'd3-bar-gradient')
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '0%')
        .attr('y2', '100%');

      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#00a650');
      gradient.append('stop').attr('offset', '100%').attr('stop-color', '#007036');

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.25)
        .domain(data.map((d) => d.name));

      const maxVal = d3.max(data, (d) => d.value) || 0;
      const yMax = Math.max(maxVal + 1, 5);

      const y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([0, yMax]);

      // Grid lines
      svg
        .append('g')
        .attr('class', 'grid')
        .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => ''))
        .selectAll('line')
        .attr('stroke', 'rgba(148, 163, 184, 0.15)')
        .attr('stroke-dasharray', '4,4');

      svg.select('.grid .domain').remove();

      // X-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('fill', '#94a3b8')
        .style('font-family', 'JetBrains Mono')
        .style('font-size', '11px')
        .style('font-weight', '600');

      svg.selectAll('.domain, .tick line').attr('stroke', 'rgba(148, 163, 184, 0.2)');

      // Y-axis
      svg
        .append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')))
        .selectAll('text')
        .attr('fill', '#94a3b8')
        .style('font-family', 'JetBrains Mono')
        .style('font-size', '11px');

      svg.selectAll('.domain, .tick line').attr('stroke', 'rgba(148, 163, 184, 0.2)');

      // Bars
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar cursor-pointer')
        .attr('x', (d) => x(d.name)!)
        .attr('width', x.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .attr('fill', 'url(#d3-bar-gradient)')
        .attr('rx', 6)
        .attr('ry', 6)
        .transition()
        .duration(800)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value));

      // Labels above bars
      svg
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .text((d) => d.value)
        .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
        .attr('y', (d) => y(d.value) - 7)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'JetBrains Mono')
        .attr('fill', '#00a650')
        .attr('opacity', 0)
        .transition()
        .delay(400)
        .duration(400)
        .attr('opacity', 1);
    };

    drawChart();

    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(drawChart);
    });

    resizeObserver.observe(d3Container.current);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [gradeDistributionData]);

  return (
    <div id="academic-dashboard-view" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-6xl mx-auto">

      {/* Dynamic Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Cumulative GPA Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-slate-200/70 dark:border-slate-800/70"
          whileHover={{
            y: -4,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500">
                Cumulative CGPA
              </span>
              <div className="w-8 h-8 rounded-xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow flex items-center justify-center">
                <GraduationCap className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-4xl font-black text-niibs-blue dark:text-niibs-yellow tracking-tight">
                {totalCredits > 0 ? calculatedCgpa.toFixed(3) : '0.000'}
              </span>
              <span className="text-xs text-slate-400 font-mono font-semibold">/ 4.000</span>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/50 dark:border-slate-800/50 text-xs">
            {totalCredits > 0 ? (
              <span className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-between">
                <span>Calculated across</span>
                <span className="font-mono font-bold text-slate-800 dark:text-white px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800">
                  {semesters.length} terms
                </span>
              </span>
            ) : (
              <span className="text-slate-400 italic">No terms saved in memory yet.</span>
            )}
          </div>
        </motion.div>

        {/* Credits Completed Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden border border-slate-200/70 dark:border-slate-800/70"
          whileHover={{
            y: -4,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500">
                Credits Logged
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <BookOpen className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                {totalCredits}
              </span>
              <span className="text-xs text-slate-400 font-mono font-semibold">Earned Units</span>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-200/50 dark:border-slate-800/50 space-y-1.5">
            <div className="w-full bg-slate-200/70 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden p-0.5">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalCredits / 120) * 100)}%` }} 
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>{Math.round((totalCredits / 120) * 100)}% Goal</span>
              <span>120 Credits</span>
            </div>
          </div>
        </motion.div>

        {/* Predict Degree Class Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between sm:col-span-2 border border-slate-200/70 dark:border-slate-800/70"
          whileHover={{
            y: -4,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase font-bold font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
                Honors Graduation Standing
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 dark:text-niibs-yellow flex items-center justify-center">
                <Trophy className="w-4.5 h-4.5" />
              </div>
            </div>

            <div className="pt-1">
              <span className={`inline-flex items-center space-x-2 text-xs font-bold px-3.5 py-1.5 rounded-xl border ${classColor} shadow-sm font-display`}>
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>{degreeClass}</span>
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-4 pt-3 border-t border-slate-200/50 dark:border-slate-800/50">
            {totalCredits > 0 
              ? 'Based on registered units in local memory. Calculated strictly adhering to NIIBS Senate directives.' 
              : 'Add your semester values to automatically simulate your final academic Honors Class degree.'}
          </p>
        </motion.div>
      </div>

      {/* Main Board Block: Track & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: GPA Trend Chart & Logs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Trend Chart */}
          <motion.div
            className="glass-card p-6 sm:p-7 rounded-3xl space-y-4 border border-slate-200/70 dark:border-slate-800/70"
            whileHover={{
              y: -3,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                    Semester GPA Progress Trail
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Visualizing performance index changes across calculated semesters.
                  </p>
                </div>
              </div>
              
              {semesters.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="flex items-center space-x-1.5 text-xs text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 font-mono border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl bg-white/40 dark:bg-slate-900/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset History</span>
                </button>
              )}
            </div>

            {semesters.length > 1 ? (
              <div className="pt-4 font-sans">
                {/* Custom Line Chart */}
                <svg className="w-full overflow-visible" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                  <defs>
                    <linearGradient id="chart-area-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="rgba(45, 48, 145, 0.25)" className="dark:stop-color-[rgba(255,192,19,0.25)]" />
                      <stop offset="100%" stopColor="rgba(45, 48, 145, 0)" className="dark:stop-color-[rgba(255,192,19,0)]" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[1.0, 2.0, 3.0, 4.0].map((gl) => {
                    const yVal = svgHeight - (gl / 4.0) * (svgHeight - 30) - 15;
                    return (
                      <g key={gl}>
                        <line x1="0" y1={yVal} x2={svgWidth} y2={yVal} stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" className="text-slate-200 dark:text-slate-800/80" />
                        <text x="5" y={yVal - 5} fill="currentColor" className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-600">{gl.toFixed(1)}</text>
                      </g>
                    );
                  })}

                  {/* Gradient Area Fill under Path */}
                  <path d={areaPoints} fill="url(#chart-area-gradient)" />

                  {/* Outer Glow path */}
                  <path d={chartPoints} fill="none" stroke="currentColor" strokeWidth="6" className="text-niibs-blue/15 dark:text-niibs-yellow/15" />
                  
                  {/* Main path */}
                  <path d={chartPoints} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-niibs-blue dark:text-niibs-yellow" />
                  
                  {/* Nodes */}
                  {dotCoords.map((pt, idx) => (
                    <g key={idx} className="group/node cursor-pointer">
                      <circle cx={pt.x} cy={pt.y} r="6" fill="#FFFFFF" stroke="currentColor" strokeWidth="3" className="text-niibs-blue dark:text-niibs-yellow dark:fill-slate-950 transition-all duration-200 group-hover/node:r-8" />
                      <circle cx={pt.x} cy={pt.y} r="2.5" fill="currentColor" className="text-niibs-blue dark:text-niibs-yellow" />
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-200 pointer-events-none">
                        <rect x={pt.x - 50} y={pt.y - 38} width="100" height="26" rx="8" fill="#0F172A" className="dark:fill-slate-800 shadow-xl" />
                        <text x={pt.x} y={pt.y - 21} textAnchor="middle" fill="#FFFFFF" className="text-[11px] font-mono font-bold">
                          {pt.val.toFixed(2)} ({pt.name.split('-')[1] || pt.name})
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>
                <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/60">
                  <span>{semesters[0].name}</span>
                  <span>{semesters[semesters.length - 1].name}</span>
                </div>
              </div>
            ) : semesters.length === 1 ? (
              <div className="py-10 text-center text-slate-500 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm space-y-2">
                <HelpCircle className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto" />
                <p className="text-xs dark:text-slate-300 font-medium">At least two semesters are required in local memory to generate a curve.</p>
                <p className="text-xs text-slate-400">Current single point is recorded at <b className="font-mono text-niibs-blue dark:text-niibs-yellow">{semesters[0].gpa.toFixed(2)}</b>.</p>
              </div>
            ) : (
              <div className="py-14 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl flex flex-col items-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                <div className="space-y-1 text-center">
                  <h4 className="font-display font-bold text-slate-800 dark:text-white text-base">No Academic Milestones Logged</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Calculate your GPA and click "Save to Dashboard History" inside the calculators to begin tracking.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs bg-niibs-blue hover:bg-niibs-blue-light hover:shadow-lg text-white font-bold dark:bg-niibs-yellow dark:text-slate-950 dark:hover:bg-niibs-yellow-light transition-all cursor-pointer font-display"
                >
                  <span>Launch NIIBS Calculator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Grade Distribution Pie Chart */}
          {gradeDistributionData.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 border border-slate-200/70 dark:border-slate-800/70"
              whileHover={{
                y: -3,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    <PieChartIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      Grade Distribution
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Aggregate proportion of course letter grades earned.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={85}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.2)" />
                      ))}
                    </Pie>
                    <RechartsTooltip 
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
                    />
                    <RechartsLegend 
                      verticalAlign="bottom" 
                      height={36} 
                      wrapperStyle={{ fontSize: '11px', fontFamily: 'JetBrains Mono' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* D3 Grade Frequency Histogram */}
          {gradeDistributionData.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 border border-slate-200/70 dark:border-slate-800/70"
              whileHover={{
                y: -3,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <BarChartIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      Grade Frequency Breakdown
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Distribution of individual grades using D3.js histogram analysis.
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-60 w-full" ref={d3Container}></div>
            </motion.div>
          )}

          {/* Table of logs if semesters exist */}
          {semesters.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 sm:p-7 shadow-sm space-y-4 border border-slate-200/70 dark:border-slate-800/70"
              whileHover={{
                y: -3,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
              }}
              transition={{ duration: 0.2 }}
            >
              <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                Saved Academic Semester Records
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase tracking-widest text-[10px] font-mono">
                      <th className="py-3 px-2">Academic Term Name</th>
                      <th className="py-3 px-2">Term GPA</th>
                      <th className="py-3 px-2">Earned Units</th>
                      <th className="py-3 px-2">Dean's List Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850/60 text-slate-700 dark:text-slate-300">
                    {semesters.map((sem) => (
                      <tr key={sem.id} className="hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="py-3.5 px-2 font-display font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {sem.name}
                        </td>
                        <td className="py-3.5 px-2 font-mono font-extrabold text-niibs-blue dark:text-niibs-yellow text-sm">
                          {sem.gpa.toFixed(2)}
                        </td>
                        <td className="py-3.5 px-2 font-mono text-slate-600 dark:text-slate-400">
                          {sem.credits} Credits
                        </td>
                        <td className="py-3.5 px-2">
                          {sem.gpa >= 3.70 && sem.credits >= 12 ? (
                            <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-800 dark:text-niibs-yellow border border-amber-500/30 font-display">
                              <CheckCircle2 className="w-3 h-3 text-amber-500 dark:text-niibs-yellow" />
                              <span>Qualified</span>
                            </span>
                          ) : (
                            <span className="text-slate-400 font-mono text-[10px]">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right 1 Column: Badges & General Tips */}
        <div className="space-y-6">
          {/* Badge Achievements Panel */}
          <motion.div
            className="glass-card p-6 sm:p-7 rounded-3xl space-y-5 border border-slate-200/70 dark:border-slate-800/70"
            whileHover={{
              y: -3,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-500 dark:text-niibs-yellow" />
                <span>NIIBS GPA Badges</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-niibs-yellow font-mono text-xs font-bold border border-amber-500/30">
                {badges.length} Unlocked
              </span>
            </div>
            
            {badges.length > 0 ? (
              <div className="space-y-3 font-display">
                {badges.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div 
                      key={idx} 
                      className={`p-4 rounded-2xl border flex items-start space-x-3.5 transition-all text-sm font-sans bg-gradient-to-r ${b.bgGradient} ${b.color} shadow-sm`}
                    >
                      <div className="p-2.5 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-xl shadow-sm border border-white/40 dark:border-slate-700/40 mt-0.5 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-display font-bold text-slate-950 dark:text-slate-100 text-sm flex items-center space-x-1.5">
                          <span>{b.title}</span>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                        </h4>
                        <p className="text-[11px] opacity-85 leading-relaxed font-sans">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-10 text-center space-y-2 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" strokeWidth={1.5} />
                <p className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">No achievements unlocked yet.</p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto text-center px-4 leading-relaxed">
                  Saving terms to your dashboard triggers badges in response to high CGPA indexes.
                </p>
              </div>
            )}
          </motion.div>

          {/* Custom Motivational Wisdom Card */}
          <motion.div
            className="glass-card border-l-4 border-l-niibs-yellow rounded-3xl p-6 space-y-4 border-r border-t border-b border-slate-200/70 dark:border-slate-800/70"
            whileHover={{
              y: -3,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)"
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-4.5 h-4.5 text-niibs-yellow" />
              <h4 className="font-display font-bold text-niibs-blue dark:text-white text-xs uppercase tracking-wider">
                Academic Standing Notice
              </h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic font-serif">
              "Diligent effort of focus is the foundation of scholarship. One who studies step-by-step reaches high peaks of wisdom naturally."
            </p>
            <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-mono uppercase font-bold">
                Academic Advisory
              </span>
              <button 
                onClick={() => onNavigate('resources')}
                className="text-xs font-bold text-niibs-blue dark:text-niibs-yellow hover:underline flex items-center space-x-1 font-display cursor-pointer"
              >
                <span>Read Guidebook</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
