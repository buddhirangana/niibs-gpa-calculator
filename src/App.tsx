import { motion, AnimatePresence } from "motion/react";
import { Analytics } from '@vercel/analytics/react';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import AcademicGuides from "./components/AcademicGuides";
import FacultyCalculator from "./components/FacultyCalculator";
import ManualCalculator from "./components/ManualCalculator";
import CgpaCalculator from "./components/CgpaCalculator";
import TargetGpaCalculator from "./components/TargetGpaCalculator";
import AboutView from "./components/AboutView";
import NotFoundView from "./components/NotFoundView";
import PwaInstallPrompt from "./components/PwaInstallPrompt";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { SemesterRecord } from "./types";
import {
  Compass,
  Calculator,
  Award,
  GraduationCap,
  BookOpen,
  Landmark,
  ChevronRight,
  Cpu,
  Flower,
  Globe,
  ShieldAlert,
  Info,
  Layers,
  Sparkles,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  BarChart3
} from "lucide-react";

const VALID_VIEWS = ["home", "calculator", "cgpa", "target_gpa", "resources", "about"];

const getViewFromUrl = (): string => {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "");
  const searchParams = new URLSearchParams(window.location.search);
  const viewParam = searchParams.get("view");

  if (viewParam) {
    if (VALID_VIEWS.includes(viewParam)) return viewParam;
    return "404";
  }

  if (!path || path === "home") return "home";
  if (path === "calculator") return "calculator";
  if (path === "cgpa") return "cgpa";
  if (path === "target-gpa" || path === "target_gpa") return "target_gpa";
  if (path === "resources" || path === "academic-resources") return "resources";
  if (path === "about") return "about";

  return "404";
};

export default function App() {
  const [currentView, setCurrentView] = useState<string>(getViewFromUrl);

  const handleViewChange = (viewId: string) => {
    setCurrentView(viewId);
    let targetPath = "/";
    if (viewId === "calculator") targetPath = "/calculator";
    else if (viewId === "cgpa") targetPath = "/cgpa";
    else if (viewId === "target_gpa") targetPath = "/target-gpa";
    else if (viewId === "resources") targetPath = "/resources";
    else if (viewId === "about") targetPath = "/about";
    else if (viewId === "404") targetPath = "/404";

    if (window.location.pathname !== targetPath) {
      window.history.pushState({ view: viewId }, "", targetPath);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentView(getViewFromUrl());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);
  const [theme, setTheme] = useLocalStorage<"light" | "dark" | "system">(
    "niibs-theme",
    "system",
  );
  const [semesters, setSemesters] = useLocalStorage<SemesterRecord[]>(
    "niibs-saved-semesters",
    [],
  );

  // Clear legacy sample data if present in localStorage
  useEffect(() => {
    if (semesters.some((s) => s.id.startsWith("sample-"))) {
      setSemesters((prev) => prev.filter((s) => !s.id.startsWith("sample-")));
    }
  }, []);

  const [activeCalcTab, setActiveCalcTab] = useState<"faculty" | "manual">(
    "faculty",
  );
  const [targetFacultyId, setTargetFacultyId] = useState<string>("FCIT");

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' | null; id: number }>({ message: '', type: null, id: 0 });

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  useEffect(() => {
    if (toast.type) {
      const timer = setTimeout(() => {
        setToast(prev => ({ ...prev, type: null }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Handle dark mode side-effects
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "light") {
      root.classList.remove("dark");
    } else {
      // system preference
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (mediaQuery.matches) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }

      const handleChange = (e: MediaQueryListEvent) => {
        if (e.matches) {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }
      };
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  // Semester actions
  const handleSaveSemester = (record: SemesterRecord) => {
    // Check for duplicates
    setSemesters((prev) => {
      const filtered = prev.filter((s) => s.name !== record.name);
      return [...filtered, record];
    });
    showToast(`Semester "${record.name}" saved successfully!`, 'success');
  };

  const handleDeleteSemester = (id: string) => {
    setSemesters((prev) => {
      const sem = prev.find(s => s.id === id);
      if (sem) {
        showToast(`Semester "${sem.name}" deleted.`, 'info');
      }
      return prev.filter((s) => s.id !== id);
    });
  };

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Are you sure you would like to permanently wipe all stored history and semester records from local memory?",
      )
    ) {
      setSemesters([]);
      showToast('All history cleared.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-400 transition-colors duration-300 flex flex-col font-sans relative overflow-clip print:bg-white print:text-black">
      {/* Background decoration - Glowing blobs for Glassmorphism */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full ambient-glow-1 filter blur-3xl opacity-80" />
        <div className="absolute top-1/3 -right-48 w-[650px] h-[650px] rounded-full ambient-glow-2 filter blur-3xl opacity-70" />
        <div className="absolute bottom-10 left-12 w-[550px] h-[550px] rounded-full ambient-glow-3 filter blur-3xl opacity-80" />
      </div>

      {/* Branding Header Area */}
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Arena */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Render View Router */}
        {currentView === "home" && (
          <div className="space-y-16 animate-in fade-in duration-350">
            {/* Hero Banner Section */}
            <section className="text-center space-y-8 max-w-4xl mx-auto py-6 sm:py-10">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center space-x-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-niibs-yellow/20 via-amber-500/10 to-niibs-yellow/20 border border-niibs-yellow/40 text-niibs-yellow dark:text-niibs-yellow font-mono text-xs font-normal uppercase tracking-wider shadow-sm"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-niibs-yellow opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-niibs-yellow"></span>
                </span>
                <Sparkles className="w-3.5 h-3.5 text-niibs-yellow" />
                <span>Modern Academic Foresight Platform</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-950 dark:text-white leading-[1.12]"
              >
                Calculate & Calibrate Your{" "}
                <span className="bg-gradient-to-r from-niibs-blue via-indigo-600 to-niibs-blue dark:from-niibs-yellow dark:via-amber-300 dark:to-niibs-yellow bg-clip-text text-transparent">
                  NIIBS GPA
                </span>{" "}
                Instantly
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal"
              >
                Calculate your GPA with precision using official curriculum data. Add your module names, credits and grades to get your current CGPA.
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <button
                  id="hero-go-calculators"
                  onClick={() => {
                    handleViewChange("calculator");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-niibs-blue to-indigo-700 hover:from-indigo-700 hover:to-niibs-blue dark:from-niibs-yellow dark:to-amber-400 dark:hover:from-amber-400 dark:hover:to-niibs-yellow text-white dark:text-slate-950 font-semibold rounded-2xl shadow-xl shadow-niibs-blue/20 dark:shadow-niibs-yellow/20 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-sm sm:text-base cursor-pointer flex items-center justify-center space-x-2.5 font-display"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Launch GPA Calculators</span>
                  <ArrowRight className="w-4 h-4 ml-1 opacity-80" />
                </button>
                
                <button
                  id="hero-go-dashboard"
                  onClick={() => {
                    handleViewChange("cgpa");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-8 py-4 border border-slate-200/80 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 font-semibold rounded-2xl text-xs sm:text-sm tracking-wide transition-all duration-200 text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-2.5 backdrop-blur-md shadow-sm hover:shadow-md cursor-pointer font-display"
                >
                  <Award className="w-5 h-5 text-niibs-yellow animate-pulse" />
                  <span>Academic Trend Dashboard</span>
                </button>
              </motion.div>

              {/* Quick Feature Stats Counter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto"
              >
                <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                  <div className="flex items-center justify-center text-niibs-blue dark:text-niibs-yellow mb-1">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="font-display font-semibold text-lg text-slate-900 dark:text-white">3 Faculties</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">FCIT, FBS, FHSS</div>
                </div>

                <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                  <div className="flex items-center justify-center text-niibs-green dark:text-niibs-green-light mb-1">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div className="font-display font-semibold text-lg text-slate-900 dark:text-white">100% Private</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Client-Side Storage</div>
                </div>

                <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                  <div className="flex items-center justify-center text-amber-500 dark:text-niibs-yellow mb-1">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div className="font-display font-semibold text-lg text-slate-900 dark:text-white">UGC Aligned</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Official Grading Scale</div>
                </div>

                <div className="glass-card p-3.5 rounded-2xl text-center space-y-1">
                  <div className="flex items-center justify-center text-indigo-500 dark:text-indigo-400 mb-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div className="font-display font-semibold text-lg text-slate-900 dark:text-white">Real-Time</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">GPA Forecasting</div>
                </div>
              </motion.div>
            </section>

            {/* Quick Overall Summary Analytics Widget */}
            <section className="max-w-6xl mx-auto">
              <Dashboard
                semesters={semesters}
                onNavigate={handleViewChange}
                clearHistory={handleClearHistory}
              />
            </section>

            {/* Faculty Profiles Cards */}
            <section className="space-y-8 max-w-6xl mx-auto">
              <div className="text-center space-y-2">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-200/50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 text-xs font-medium uppercase tracking-wider font-mono">
                  <BarChart3 className="w-3.5 h-3.5 text-niibs-blue dark:text-niibs-yellow" />
                  <span>Syllabus Grid Matrix</span>
                </div>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-slate-900 dark:text-white">
                  Academic Faculties Offered
                </h2>
                <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                  Pre-configured curriculums aligned exactly with department
                  bylaws and credit point balances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Faculty 1: Computing */}
                <motion.div
                  className="glass-card p-7 rounded-3xl flex flex-col justify-between border border-indigo-100/60 dark:border-indigo-900/30 hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 30px -10px rgba(79, 70, 229, 0.15)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-niibs-blue text-white rounded-2xl shadow-md shadow-indigo-500/20 flex items-center justify-center">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-mono font-medium">
                        FCIT
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-xl text-slate-950 dark:text-white">
                        Computing & IT (FCIT)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Preloads software development, network security,
                        database architectures and AI curricula.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BSc (Hons.) in Information Technology
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FCIT");
                      setActiveCalcTab("faculty");
                      handleViewChange("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-7 text-center py-3 border border-indigo-200 dark:border-indigo-800/60 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white rounded-xl text-xs font-semibold text-indigo-700 dark:text-indigo-300 flex items-center justify-center space-x-2 transition-all duration-200 group font-display"
                  >
                    <span>Load FCIT Subject Grid</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Faculty 2: Buddhist Studies */}
                <motion.div
                  className="glass-card p-7 rounded-3xl flex flex-col justify-between border border-amber-100/60 dark:border-amber-900/30 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition-all duration-300"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 30px -10px rgba(245, 158, 11, 0.15)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-niibs-yellow text-slate-950 rounded-2xl shadow-md shadow-amber-500/20 flex items-center justify-center">
                        <Flower className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-niibs-yellow text-[11px] font-mono font-medium">
                        FBS
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-xl text-slate-950 dark:text-white">
                        Buddhist Studies (FBS)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Features ancient Theravada and Mahayana philosophy, Pali
                        grammar and Sanskrit literary analyses.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BA (Hons.) in Buddhist Studies
                      </span>
                       <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BA (General) in Buddhist Studies
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FBS");
                      setActiveCalcTab("faculty");
                      handleViewChange("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-7 text-center py-3 border border-amber-200 dark:border-amber-800/60 hover:bg-amber-500 hover:text-slate-950 dark:hover:bg-niibs-yellow dark:hover:text-slate-950 rounded-xl text-xs font-semibold text-amber-800 dark:text-niibs-yellow flex items-center justify-center space-x-2 transition-all duration-200 group font-display"
                  >
                    <span>Load FBS Subject Grid</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>

                {/* Faculty 3: Humanities */}
                <motion.div
                  className="glass-card p-7 rounded-3xl flex flex-col justify-between border border-teal-100/60 dark:border-teal-900/30 hover:border-teal-400/50 dark:hover:border-teal-500/50 transition-all duration-300"
                  whileHover={{
                    y: -6,
                    boxShadow:
                      "0 20px 30px -10px rgba(20, 184, 166, 0.15)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-niibs-green text-white rounded-2xl shadow-md shadow-teal-500/20 flex items-center justify-center">
                        <Globe className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-[11px] font-mono font-medium">
                        FHSS
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-semibold text-xl text-slate-950 dark:text-white">
                        Humanities & Social Sciences (FHSS)
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Curriculum profiles spanning mass communication,
                        creative typography, anthropology, and applied
                        archaeology.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BA (Hons.) in Applied Communication & Media Technology
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BA (Hons.) in Anthropology
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-[11px] font-medium">
                        BA (Hons.) in Applied Archaeology
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FHSS");
                      setActiveCalcTab("faculty");
                      handleViewChange("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-7 text-center py-3 border border-teal-200 dark:border-teal-800/60 hover:bg-teal-600 hover:text-white dark:hover:bg-teal-500 dark:hover:text-white rounded-xl text-xs font-semibold text-teal-700 dark:text-teal-300 flex items-center justify-center space-x-2 transition-all duration-200 group font-display"
                  >
                    <span>Load FHSS Subject Grid</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              </div>
            </section>

            {/* University Standards and Integrity Banner */}
            <motion.section
              className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md max-w-6xl mx-auto bg-white/40 dark:bg-slate-900/40"
              whileHover={{
                y: -4,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-niibs-yellow/10 border border-niibs-yellow/30 text-niibs-yellow flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="space-y-1.5">
                  <h4 className="font-display font-semibold text-slate-900 dark:text-white text-lg flex items-center space-x-2">
                    <span>Official Board Verification Standards</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
                    Our dynamic calculation mechanisms align directly with the
                    criteria laid down by the UGC Sri Lanka and the academic
                    advisory council of NIIBS. This utility is entirely
                    client-side, respecting student data privacy.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  handleViewChange("resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="w-full md:w-auto px-6 py-3.5 bg-niibs-blue hover:bg-niibs-blue-light hover:shadow-lg hover:shadow-niibs-blue/20 text-white rounded-xl dark:bg-niibs-yellow dark:text-slate-950 dark:hover:bg-niibs-yellow-light text-xs font-semibold leading-none shrink-0 transition-all font-display cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Inspect Official Directives</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.section>
          </div>
        )}

        {currentView === "calculator" && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
            {/* View Title */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-6 print:hidden">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-950 dark:text-white flex items-center space-x-3">
                  <div className="p-2.5 rounded-2xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                    <Calculator className="w-7 h-7" />
                  </div>
                  <span>NIIBS GPA Calculators</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-2 max-w-xl">
                  Select predefined faculty course grids or manually enter course titles, credit weights, and letter grades.
                </p>
              </div>

              {/* Segmented Control Pill Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-slate-200/70 dark:bg-slate-900/70 border border-slate-300/50 dark:border-slate-800/80 backdrop-blur-md self-start sm:self-center">
                <button
                  onClick={() => setActiveCalcTab("faculty")}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-display cursor-pointer ${
                    activeCalcTab === "faculty"
                      ? "bg-white dark:bg-slate-800 text-niibs-blue dark:text-niibs-yellow shadow-md shadow-slate-900/5"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Faculty Syllabus Grid</span>
                </button>
                <button
                  onClick={() => setActiveCalcTab("manual")}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all font-display cursor-pointer ${
                    activeCalcTab === "manual"
                      ? "bg-white dark:bg-slate-800 text-niibs-blue dark:text-niibs-yellow shadow-md shadow-slate-900/5"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Manual Entry Mode</span>
                </button>
              </div>
            </div>

            {/* Tab view renders */}
            {activeCalcTab === "faculty" ? (
              <FacultyCalculator
                onSaveSemester={handleSaveSemester}
                savedSemesters={semesters}
                initialFacultyId={targetFacultyId}
              />
            ) : (
              <ManualCalculator onSaveSemester={handleSaveSemester} />
            )}
          </div>
        )}

        {currentView === "cgpa" && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
            <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-6 print:hidden">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-950 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-niibs-yellow/20 text-niibs-yellow dark:text-niibs-yellow">
                  <Award className="w-7 h-7 text-niibs-yellow" />
                </div>
                <span>CGPA Tracker & Semester Log</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                Accumulate multi-semester grades to forecast overall GPA values
                and predicted degree classification brackets.
              </p>
            </div>

            <CgpaCalculator
              semesters={semesters}
              onAddSemester={(record) =>
                setSemesters((prev) => [...prev, record])
              }
              onUpdateSemester={(updated) =>
                setSemesters((prev) =>
                  prev.map((s) => (s.id === updated.id ? updated : s)),
                )
              }
              onDeleteSemester={handleDeleteSemester}
              onClearAll={handleClearHistory}
            />
          </div>
        )}

        {currentView === "target_gpa" && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-6xl mx-auto">
            <div className="border-b border-slate-200/80 dark:border-slate-800/80 pb-6 print:hidden">
              <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-950 dark:text-white flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-niibs-blue/10 dark:bg-niibs-yellow/15 text-niibs-blue dark:text-niibs-yellow">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <span>NIIBS Target CGPA Planner</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-xl">
                Input completed stats and desired overall target. The planner
                computes core points needed in subsequent semesters.
              </p>
            </div>

            <TargetGpaCalculator />
          </div>
        )}

        {currentView === "resources" && <AcademicGuides />}

        {currentView === "about" && <AboutView onNavigate={handleViewChange} />}

        {!["home", "calculator", "cgpa", "target_gpa", "resources", "about"].includes(currentView) && (
          <NotFoundView onNavigate={handleViewChange} />
        )}
      </main>

      {/* University Portal Footer */}
      <Footer onViewChange={handleViewChange} />

      {/* PWA Install & Offline Status Prompt */}
      <PwaInstallPrompt />

      {/* Global Toast Notification Overlay */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl text-sm font-semibold ${
              toast.type === 'success' 
                ? 'bg-emerald-600/90 border-emerald-500 text-white shadow-emerald-600/20' 
                : toast.type === 'error'
                  ? 'bg-rose-600/90 border-rose-500 text-white shadow-rose-600/20'
                  : 'bg-white/90 dark:bg-slate-900/90 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-slate-900/20'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-white shrink-0" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-niibs-blue dark:text-niibs-yellow shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-white shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <Analytics />
    </div>
  );
}
