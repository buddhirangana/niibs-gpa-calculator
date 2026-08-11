import { motion } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SemesterRecord } from '../types';
import { Award, GraduationCap, Trophy, Sparkles, AlertTriangle, ArrowRight, BookOpen, Calendar, HelpCircle, Dumbbell, BarChart as BarChartIcon } from 'lucide-react';
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
  let classColor = 'bg-white/10 dark:bg-slate-800/20 border border-slate-200/30 text-slate-800 dark:text-slate-200';
  if (totalCredits > 0) {
    if (calculatedCgpa >= 3.70) {
      degreeClass = 'First Class Honours';
      classColor = 'bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow border border-niibs-yellow/40';
    } else if (calculatedCgpa >= 3.30) {
      degreeClass = 'Second Class Upper Division';
      classColor = 'bg-niibs-blue/10 text-niibs-blue dark:text-indigo-300 border border-niibs-blue/20';
    } else if (calculatedCgpa >= 3.00) {
      degreeClass = 'Second Class Lower Division';
      classColor = 'bg-niibs-green/10 text-[#00a650] dark:text-niibs-green-light border border-niibs-green/20';
    } else if (calculatedCgpa >= 2.00) {
      degreeClass = 'General Pass';
      classColor = 'bg-slate-50 border border-slate-200/60 text-slate-700 dark:bg-slate-800/30 dark:border-slate-800 dark:text-slate-300';
    } else {
      degreeClass = 'Below Minimum Grad Standing';
      classColor = 'bg-niibs-red/10 text-niibs-red border border-niibs-red/20';
    }
  }

  // Deans list eligibility (if any semester GPA >= 3.7 && credits completed >= 12 in that semester)
  const deansListEligibleCount = semesters.filter(s => s.gpa >= 3.70 && s.credits >= 12).length;

  // Badge list logic
  const badges: { title: string; desc: string; icon: typeof Trophy; color: string }[] = [];
  if (totalCredits > 0) {
    badges.push({
      title: 'Academic Pilgrim',
      desc: 'Embarking on the NIIBS university level path.',
      icon: Trophy,
      color: 'bg-teal-500/10 text-teal-800 dark:text-teal-400 border-teal-500/20'
    });
    if (calculatedCgpa >= 3.7) {
      badges.push({
        title: 'Lotus Transcendence',
        desc: 'Achieving pristine First Class standing (CGPA ≥ 3.70).',
        icon: Sparkles,
        color: 'bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow border-niibs-yellow/30'
      });
    }
    if (totalCredits >= 60) {
      badges.push({
        title: 'Master Scholar',
        desc: 'Overcame major credit hurdles (Completed ≥ 60 Credits).',
        icon: GraduationCap,
        color: 'bg-purple-500/10 text-purple-800 dark:text-purple-400 border-purple-500/20'
      });
    }
    if (deansListEligibleCount > 0) {
      badges.push({
        title: "Dean's Laureate",
        desc: `Stellar standing in ${deansListEligibleCount} Semester(s).`,
        icon: Award,
        color: 'bg-niibs-blue/10 text-niibs-blue dark:text-indigo-400 border-niibs-blue/20'
      });
    }
  }

  // Build high-fidelity SVG path for the Line Chart
  const svgWidth = 500;
  const svgHeight = 150;
  let chartPoints = '';
  let dotCoords: { x: number; y: number; val: number; name: string }[] = [];

  if (semesters.length > 1) {
    const minVal = 0;
    const maxVal = 4.0;
    const stepX = svgWidth / (semesters.length - 1);

    dotCoords = semesters.map((sem, idx) => {
      const x = idx * stepX;
      // invert y since SVG 0 is top
      const y = svgHeight - ((sem.gpa - minVal) / (maxVal - minVal)) * (svgHeight - 20) - 10;
      return { x, y, val: sem.gpa, name: sem.name };
    });

    chartPoints = dotCoords.map(p => `${p.x},${p.y}`).join(' L ');
    chartPoints = `M ${chartPoints}`;
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

  const COLORS = ['#2d3091', '#00a650', '#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e', '#14b8a6', '#f97316'];

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

      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const width = container.clientWidth - margin.left - margin.right;
      const height = 250 - margin.top - margin.bottom;

      d3.select(container).selectAll('*').remove();

      const svg = d3
        .select(container)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3
        .scaleBand()
        .range([0, width])
        .padding(0.2)
        .domain(data.map((d) => d.name));

      // Calculate max value for Y axis (at least 5 for better visuals)
      const maxVal = d3.max(data, (d) => d.value) || 0;
      const yMax = Math.max(maxVal, 5);

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
        .attr('stroke', '#e2e8f0')
        .attr('stroke-dasharray', '3,3');

      svg.select('.grid .domain').remove();

      // X-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('fill', '#64748b')
        .style('font-family', 'JetBrains Mono');

      svg.selectAll('.domain, .tick line').attr('stroke', '#cbd5e1');

      // Y-axis
      svg
        .append('g')
        .call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('d')))
        .selectAll('text')
        .attr('fill', '#64748b')
        .style('font-family', 'JetBrains Mono');

      svg.selectAll('.domain, .tick line').attr('stroke', '#cbd5e1');

      // Bars
      svg
        .selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => x(d.name)!)
        .attr('width', x.bandwidth())
        .attr('y', height)
        .attr('height', 0)
        .attr('fill', '#00a650') // niibs-green
        .attr('rx', 4)
        .attr('ry', 4)
        .transition()
        .duration(800)
        .attr('y', (d) => y(d.value))
        .attr('height', (d) => height - y(d.value));

      // Labels
      svg
        .selectAll('.label')
        .data(data)
        .enter()
        .append('text')
        .attr('class', 'label')
        .text((d) => d.value)
        .attr('x', (d) => x(d.name)! + x.bandwidth() / 2)
        .attr('y', (d) => y(d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '10px')
        .attr('font-family', 'JetBrains Mono')
        .attr('fill', '#475569')
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
    <div id="academic-dashboard-view" className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">

      {/* Dynamic Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Cumulative GPA Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-semibold font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
              Cumulative CGPA
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="font-mono text-4xl font-extrabold text-niibs-blue dark:text-niibs-yellow">
                {totalCredits > 0 ? calculatedCgpa.toFixed(3) : '0.000'}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ 4.00</span>
            </div>
          </div>
          <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/35 text-xs">
            {totalCredits > 0 ? (
              <span className="text-slate-500 font-medium leading-none dark:text-slate-400">
                Accumulated across <b className="font-mono">{semesters.length}</b> terms.
              </span>
            ) : (
              <span className="text-slate-400">No semesters saved yet.</span>
            )}
          </div>
          <GraduationCap className="absolute -bottom-2 -right-2 w-16 h-16 text-niibs-blue/5 dark:text-niibs-yellow/5 -z-0 pointer-events-none" />
        </motion.div>

        {/* Credits Completed Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between relative overflow-hidden font-display"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="space-y-2 font-sans">
            <span className="text-[10px] uppercase font-semibold font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
              Credits Logged
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="font-mono text-4xl font-extrabold text-[#00a650] dark:text-niibs-green-light">
                {totalCredits}
              </span>
              <span className="text-xs text-slate-400 block font-mono">Completed</span>
            </div>
          </div>
          <div className="mt-4 pt-3.5 border-t border-slate-200/40 dark:border-slate-800/35 text-xs">
            <div className="w-full bg-black/10 dark:bg-slate-800/60 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-niibs-green h-full rounded-full transition-all duration-500" 
                style={{ width: `${Math.min(100, (totalCredits / 120) * 100)}%` }} 
              />
            </div>
            <div className="flex justify-between mt-1.5 text-[10px] text-slate-400 font-mono">
              <span>0%</span>
              <span>120 Credits Goal</span>
            </div>
          </div>
        </motion.div>

        {/* Predict Degree Class Card */}
        <motion.div
          className="glass-card p-6 rounded-3xl flex flex-col justify-between sm:col-span-2"
          whileHover={{
            y: -5,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          transition={{
            duration: 0.2
          }}>
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-semibold font-mono tracking-wider text-slate-400 dark:text-slate-500 block">
              Graduation standing Prediction
            </span>
            <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${classColor}`}>
              {degreeClass}
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">
            {totalCredits > 0 
              ? 'Based on registered units in local storage. Calculated strictly adhering to NIIBS Senate directives.' 
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
            className="glass-card p-6 rounded-3xl space-y-4"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{
              duration: 0.2
            }}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                  Semester GPA Progress Trail
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Visualizing performance index changes across calculated semesters.
                </p>
              </div>
              {semesters.length > 0 && (
                <button 
                  onClick={clearHistory}
                  className="text-[10px] text-slate-500 hover:text-niibs-red dark:text-slate-400 dark:hover:text-niibs-red font-mono border border-slate-200/50 dark:border-slate-800 px-2.5 py-1 rounded-xl bg-white/10 dark:bg-slate-800/10 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                >
                  Reset History
                </button>
              )}
            </div>

            {semesters.length > 1 ? (
              <div className="py-4 font-sans">
                {/* Custom Line Chart */}
                <svg className="w-full overflow-visible" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
                  {/* Grid Lines */}
                  {[1.0, 2.0, 3.0, 4.0].map((gl) => {
                    const yVal = svgHeight - (gl / 4.0) * (svgHeight - 20) - 10;
                    return (
                      <g key={gl}>
                        <line x1="0" y1={yVal} x2={svgWidth} y2={yVal} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" className="dark:stroke-slate-800" />
                        <text x="5" y={yVal - 4} fill="#94a3b8" className="text-[9px] font-mono font-bold leading-none">{gl.toFixed(1)}</text>
                      </g>
                    );
                  })}
                  {/* Glow path */}
                  <path d={chartPoints} fill="none" stroke="currentColor" strokeWidth="8" className="text-niibs-blue/5 dark:text-niibs-yellow/5" />
                  {/* Main path */}
                  <path d={chartPoints} fill="none" stroke="currentColor" strokeWidth="3" className="text-niibs-blue dark:text-niibs-yellow animate-chart-draw" />
                  {/* Nodes */}
                  {dotCoords.map((pt, idx) => (
                    <g key={idx} className="group/node cursor-pointer">
                      <circle cx={pt.x} cy={pt.y} r="6" fill="#FFFFFF" stroke="currentColor" strokeWidth="3" className="text-niibs-blue dark:text-niibs-yellow dark:fill-slate-950 transition-all duration-300 group-hover/node:r-8" />
                      <circle cx={pt.x} cy={pt.y} r="2" fill="currentColor" className="text-niibs-blue dark:text-niibs-yellow" />
                      <g className="opacity-0 group-hover/node:opacity-100 transition-opacity duration-200">
                        <rect x={pt.x - 45} y={pt.y - 35} width="90" height="24" rx="6" fill="#0F172A" className="dark:fill-slate-800" />
                        <text x={pt.x} y={pt.y - 20} textAnchor="middle" fill="#FFFFFF" className="text-[10px] font-mono font-bold">
                          {pt.val.toFixed(2)} ({pt.name})
                        </text>
                      </g>
                    </g>
                  ))}
                </svg>
                <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-3">
                  <span>{semesters[0].name}</span>
                  <span>{semesters[semesters.length - 1].name}</span>
                </div>
              </div>
            ) : semesters.length === 1 ? (
              <div className="py-12 text-center text-slate-500 border border-slate-200/40 dark:border-slate-800/50 rounded-2xl bg-white/20 dark:bg-slate-800/10 backdrop-blur-sm">
                <HelpCircle className="w-10 h-10 text-slate-400 dark:text-slate-700 mx-auto mb-2" />
                <p className="text-xs dark:text-slate-400">At least two semesters are required in local memory to generate a curve.</p>
                <p className="text-[11px] text-slate-400 mt-1">Current single point is recorded at <b className="font-mono text-niibs-blue dark:text-niibs-yellow">{semesters[0].gpa.toFixed(2)}</b>.</p>
              </div>
            ) : (
              <div className="py-16 text-center border-2 border-dashed border-slate-200/50 dark:border-slate-800 rounded-3xl flex flex-col items-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600" />
                <div className="space-y-1 text-center">
                  <h4 className="font-display font-semibold text-sm text-slate-700 dark:text-white">No Academic Milestones Logged</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto p-1">
                    Calculate your GPA and click "Save to Dashboard History" inside the calculators to begin tracking.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="inline-flex items-center space-x-1.5 px-4.5 py-2.5 rounded-xl text-xs bg-niibs-blue hover:bg-niibs-blue-light hover:shadow-md text-white font-medium dark:bg-niibs-yellow dark:text-slate-950 font-bold tracking-wide transition-all"
                >
                  <span>Launch NIIBS Calculator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </motion.div>

          {/* Grade Distribution Pie Chart */}
          {gradeDistributionData.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 shadow-sm space-y-4"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{
                duration: 0.2
              }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-niibs-blue dark:text-niibs-yellow" />
                    <span>Grade Distribution</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Aggregate of all individual course grades achieved across saved semesters.
                  </p>
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
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
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
                    />
                    <RechartsLegend 
                      verticalAlign="bottom" 
                      height={36} 
                      wrapperStyle={{ fontSize: '11px' }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* D3 Grade Frequency Histogram */}
          {gradeDistributionData.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 shadow-sm space-y-4"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{
                duration: 0.2
              }}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                    <BarChartIcon className="w-5 h-5 text-[#00a650] dark:text-niibs-green-light" />
                    <span>Grade Frequency</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Frequency of each letter grade using D3.js
                  </p>
                </div>
              </div>
              <div className="h-64 w-full" ref={d3Container}></div>
            </motion.div>
          )}

          {/* Table of logs if semesters exist */}
          {semesters.length > 0 && (
            <motion.div
              className="glass-card rounded-3xl p-6 shadow-sm space-y-3"
              whileHover={{
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              transition={{
                duration: 0.2
              }}>
              <h4 className="font-display font-semibold text-slate-900 dark:text-white text-base">
                Saved Academic Semester Records
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-slate-200/40 dark:border-slate-800/60 text-slate-500 uppercase tracking-widest text-[10px]">
                      <th className="py-2.5">Academic Term Name</th>
                      <th className="py-2.5">Term GPA Calculated</th>
                      <th className="py-2.5">Earned Units</th>
                      <th className="py-2.5">Dean's List</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-850/40 text-slate-600 dark:text-slate-300">
                    {semesters.map((sem) => (
                      <tr key={sem.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10">
                        <td className="py-3 font-display font-bold text-slate-900 dark:text-slate-100">{sem.name}</td>
                        <td className="py-3 font-mono font-bold text-niibs-blue dark:text-niibs-yellow text-sm">
                          {sem.gpa.toFixed(2)}
                        </td>
                        <td className="py-3 font-mono text-slate-600 dark:text-slate-400">{sem.credits} Credits</td>
                        <td className="py-3">
                          {sem.gpa >= 3.70 && sem.credits >= 12 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow border border-niibs-yellow/20">
                              Yes, Qualified
                            </span>
                          ) : (
                            <span className="text-slate-400 text-[10px]">—</span>
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
            className="glass-card p-6 rounded-3xl space-y-4"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{
              duration: 0.2
            }}>
            <h3 className="font-display font-bold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Trophy className="w-5 h-5 text-niibs-yellow" />
              <span>NIIBS GPA Badges ({badges.length})</span>
            </h3>
            
            {badges.length > 0 ? (
              <div className="space-y-3 font-display">
                {badges.map((b, idx) => {
                  const Icon = b.icon;
                  return (
                    <div key={idx} className={`p-4 rounded-2xl border flex items-start space-x-3.5 transition-all text-sm font-sans ${b.color}`}>
                      <div className="p-2 bg-white/20 dark:bg-slate-900/30 backdrop-blur-sm rounded-lg shadow-sm border mt-0.5 shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-display font-black text-slate-950 dark:text-slate-100 text-sm">{b.title}</h4>
                        <p className="text-[11px] opacity-80 leading-relaxed font-sans">{b.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center space-y-2 border border-slate-200/40 dark:border-slate-800/50 rounded-2xl bg-white/20 dark:bg-slate-800/10 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" strokeWidth={1.5} />
                <p className="text-xs font-mono text-slate-500 dark:text-slate-400">No achievements unlocked yet.</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-xs mx-auto text-center px-4 leading-relaxed">
                  Saving terms to your dashboard triggers badges in response to high CPGA indexes.
                </p>
              </div>
            )}
          </motion.div>

          {/* Custom Motivational Wisdom Card */}
          <motion.div
            className="glass-card border-l-4 border-l-niibs-yellow rounded-3xl p-6 space-y-4"
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
            transition={{
              duration: 0.2
            }}>
            <div className="flex items-center space-x-2">
              <Dumbbell className="w-4.5 h-4.5 text-niibs-yellow" />
              <h4 className="font-display font-bold text-[#2d3091] dark:text-white text-xs uppercase tracking-wider">
                Academic Standing Notice
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-300 leading-relaxed italic font-serif">
              "Diligent effort of focus is the foundation of scholarship. One who studies step-by-step reaches high peaks of wisdom naturally."
            </p>
            <div className="pt-2.5 border-t border-slate-200/50 dark:border-slate-800/40 flex items-center justify-between">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-400 font-mono uppercase font-bold">
                Academic Advisory
              </span>
              <button 
                onClick={() => onNavigate('resources')}
                className="text-[11px] font-bold text-niibs-blue dark:text-niibs-yellow hover:underline flex items-center space-x-1"
              >
                <span>Read Guidebook</span>
                <ArrowRight className="w-3" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
