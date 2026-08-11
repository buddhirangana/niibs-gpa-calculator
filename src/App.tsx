import { motion, AnimatePresence } from "motion/react";
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
  AlertCircle
} from "lucide-react";

export default function App() {
  const [currentView, setCurrentView] = useState<string>("home");
  const [theme, setTheme] = useLocalStorage<"light" | "dark" | "system">(
    "niibs-theme",
    "system",
  );
  const [semesters, setSemesters] = useLocalStorage<SemesterRecord[]>(
    "niibs-saved-semesters",
    [
      {
        id: "sample-1",
        name: "FCIT - Year 1 Semester 1",
        gpa: 3.65,
        credits: 13,
      },
      {
        id: "sample-2",
        name: "FCIT - Year 1 Semester 2",
        gpa: 3.82,
        credits: 14,
      },
    ],
  );

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
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full ambient-glow-1 filter blur-3xl opacity-80" />
        <div className="absolute top-1/4 -right-48 w-[600px] h-[600px] rounded-full ambient-glow-2 filter blur-3xl opacity-70" />
        <div className="absolute bottom-12 left-12 w-[500px] h-[500px] rounded-full ambient-glow-3 filter blur-3xl opacity-80" />
      </div>

      {/* Branding Header Area */}
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        theme={theme}
        setTheme={setTheme}
      />

      {/* Main Content Arena */}
      <main className="relative z-10 flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Render View Router */}
        {currentView === "home" && (
          <div className="space-y-16 animate-in fade-in duration-350">
            {/* Hero Banner Section */}
            <section className="text-center space-y-6 max-w-4xl mx-auto py-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-niibs-yellow/15 border border-niibs-yellow/30 text-niibs-yellow dark:text-niibs-yellow font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Modern Academic Foresight Platform</span>
              </div>

              <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight text-slate-950 dark:text-white leading-tight">
                Calculate & Calibrate Your{" "}
                <span className="text-niibs-blue dark:text-niibs-yellow">
                  NIIBS GPA
                </span>{" "}
                Instantly
              </h1>

              <p className="text-sm sm:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                The standard-grade GPA calculator for Nāgānanda International
                Institute for Buddhist Studies. Preload program subjects,
                simulate target grades, and predict your final honors degree
                standing.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-3">
                <button
                  id="hero-go-calculators"
                  onClick={() => {
                    setCurrentView("calculator");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 bg-niibs-blue hover:bg-niibs-blue-light text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-sm sm:text-base cursor-pointer dark:bg-niibs-yellow dark:text-slate-950 flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>Launch GPA Calculators</span>
                </button>
                <button
                  id="hero-go-dashboard"
                  onClick={() => {
                    setCurrentView("cgpa");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/30 font-bold rounded-xl text-xs sm:text-sm tracking-wide transition-all text-slate-800 dark:text-slate-200 flex items-center justify-center space-x-2 backdrop-blur-md"
                >
                  <Award className="w-5 h-5 text-niibs-yellow animate-pulse" />
                  <span>Academic Trend Dashboard</span>
                </button>
              </div>
            </section>

            {/* Quick Overall Summary Analytics Widget */}
            <motion.section
              className="glass-card rounded-3xl p-6 sm:p-10"
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Dashboard
                semesters={semesters}
                onNavigate={setCurrentView}
                clearHistory={handleClearHistory}
              />
            </motion.section>

            {/* Faculty Profiles Cards */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="font-display font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  Academic Faculties Offered
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
                  Pre-configured curriculums aligned exactly with department
                  bylaws and credit point balances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5">
                {/* Faculty 1: Computing */}
                <motion.div
                  className="glass-card p-6 rounded-3xl flex flex-col justify-between"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 bg-indigo-50/50 dark:bg-indigo-950/20 text-niibs-blue dark:text-indigo-400 rounded-xl border border-indigo-200/50 flex items-center justify-center">
                      <Cpu className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        Computing & IT (FCIT)
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Preloads software development, network security,
                        database architectures, and AI curricula.
                      </p>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <li>• BSc (Hons) Software Engineering</li>
                      <li>• BSc (Hons) Information Technology</li>
                      <li>• BSc (Hons) Data Science</li>
                      <li>• BSc (Hons) Cyber Security</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FCIT");
                      setActiveCalcTab("faculty");
                      setCurrentView("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-6 text-center py-2 border hover:bg-white/40 dark:hover:bg-slate-800/30 border-slate-200/60 rounded-lg text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-400 flex items-center justify-center space-x-1 transition-all"
                  >
                    <span>Load FCIT Subject Grid</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Faculty 2: Buddhist Studies */}
                <motion.div
                  className="glass-card p-6 rounded-3xl flex flex-col justify-between"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 bg-amber-50/50 dark:bg-amber-950/20 text-niibs-yellow dark:text-niibs-yellow rounded-xl border border-amber-200/50 flex items-center justify-center">
                      <Flower className="w-6 h-6 animate-pulse" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        Buddhist Studies (FBS)
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Features ancient Theravada and Mahayana philosophy, Pali
                        grammar, and Sanskrit literary analyses.
                      </p>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <li>• BA (General / Hons) Buddhist Studies</li>
                      <li>• MA in Buddhist Studies (Masters)</li>
                      <li>• MPhil in Buddhist Studies Research</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FBS");
                      setActiveCalcTab("faculty");
                      setCurrentView("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-6 text-center py-2 border hover:bg-white/40 dark:hover:bg-slate-800/30 border-slate-200/60 rounded-lg text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-400 flex items-center justify-center space-x-1 transition-all"
                  >
                    <span>Load FBS Subject Grid</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>

                {/* Faculty 3: Humanities */}
                <motion.div
                  className="glass-card p-6 rounded-3xl flex flex-col justify-between"
                  whileHover={{
                    y: -5,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  }}
                  transition={{
                    duration: 0.2,
                  }}
                >
                  <div className="space-y-4">
                    <div className="w-11 h-11 bg-teal-50/50 dark:bg-teal-950/20 text-niibs-green dark:text-niibs-green-light rounded-xl border border-teal-200/50 flex items-center justify-center">
                      <Globe className="w-5 h-5 animate-spin-slow" />
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-display font-bold text-lg text-slate-950 dark:text-white">
                        Humanities & Social Sciences (FHSS)
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Curicculum profiles spanning mass communication,
                        creative typography, tribal anthropology, and applied
                        archaeology.
                      </p>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <li>• BA (Hons) Applied Communication</li>
                      <li>• BA (Hons) Anthropology</li>
                      <li>• BA (Hons) Applied Archaeology</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => {
                      setTargetFacultyId("FHSS");
                      setActiveCalcTab("faculty");
                      setCurrentView("calculator");
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="w-full mt-6 text-center py-2 border hover:bg-white/40 dark:hover:bg-slate-800/30 border-slate-200/60 rounded-lg text-xs font-semibold text-slate-700 dark:border-slate-800 dark:text-slate-400 flex items-center justify-center space-x-1 transition-all"
                  >
                    <span>Load FHSS Subject Grid</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              </div>
            </section>

            {/* University Standards and Integrity Banner */}
            <motion.section
              className="glass-card p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6"
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <div className="flex items-start space-x-4">
                <ShieldAlert className="w-8 h-8 text-niibs-yellow shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-slate-900 dark:text-white text-base">
                    Official Board Verification Standards
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                    Our dynamic calculation mechanisms align directly with the
                    criteria laid down by the UGC Sri Lanka and the academic
                    advisory council of NIIBS. This utility is entirely
                    client-side, respecting student data privacy.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentView("resources");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="px-5 py-3 bg-niibs-blue hover:bg-niibs-blue-light hover:shadow-lg hover:shadow-niibs-blue/15 text-white rounded-xl dark:bg-niibs-yellow dark:text-slate-950 dark:hover:bg-niibs-yellow-light text-xs font-bold leading-none shrink-0 transition-all font-display"
              >
                Inspect Official Directives
              </button>
            </motion.section>
          </div>
        )}

        {currentView === "calculator" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* View Title */}
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-950 dark:text-white flex items-center space-x-2">
                <Calculator className="w-7 h-7 text-niibs-blue dark:text-niibs-yellow" />
                <span>NIIBS GPA Calculators</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-1">
                Choose between calculating via predefined faculty syllabus, or
                typing manual credit points directly.
              </p>
            </div>

            {/* Toggle tabs select */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 pb-2 space-x-3.5 no-print">
              <button
                onClick={() => setActiveCalcTab("faculty")}
                className={`py-2 text-sm font-bold tracking-wide transition-all border-b-2 font-display ${
                  activeCalcTab === "faculty"
                    ? "border-niibs-blue text-niibs-blue dark:border-niibs-yellow dark:text-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Faculty Syllabus Preloads
              </button>
              <button
                onClick={() => setActiveCalcTab("manual")}
                className={`py-2 text-sm font-bold tracking-wide transition-all border-b-2 font-display ${
                  activeCalcTab === "manual"
                    ? "border-niibs-blue text-niibs-blue dark:border-niibs-yellow dark:text-white"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                Manual Entry Calculator
              </button>
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
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-950 dark:text-white flex items-center space-x-2">
                <Award className="w-7 h-7 text-niibs-blue dark:text-niibs-yellow animate-bounce" />
                <span>CGPA Tracker & Semester Log</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
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
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-slate-950 dark:text-white flex items-center space-x-2">
                <GraduationCap className="w-7 h-7 text-niibs-blue dark:text-niibs-yellow" />
                <span>NIIBS Target CGPA Planner</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Input completed stats and desired overall target. The planner
                computes core points needed in subsequent semesters.
              </p>
            </div>

            <TargetGpaCalculator />
          </div>
        )}

        {currentView === "resources" && <AcademicGuides />}

        {currentView === "about" && (
          <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            {/* About Headline block */}
            <div className="text-center space-y-3">
              <Landmark className="w-12 h-12 text-niibs-blue dark:text-niibs-yellow mx-auto" />
              <h1 className="font-display font-black text-3xl sm:text-4xl text-slate-950 dark:text-white leading-tight">
                About the NIIBS GPA Calculator
              </h1>
              <p className="text-sm font-mono text-slate-400 uppercase tracking-widest font-bold">
                Student Integrity & Innovation Portal
              </p>
            </div>

            {/* In depth description */}
            <motion.div
              className="glass-card rounded-3xl p-6 sm:p-10 text-sm space-y-6 text-justify leading-relaxed"
              whileHover={{
                y: -5,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <p>
                The <b>NIIBS GPA Calculator</b> is formulated to empower
                students at the Nāgānanda International Institute for Buddhist
                Studies to seamlessly evaluate and manage academic standing
                metrics. Understanding CGPA changes, honors degree brackets, and
                Dean’s List criteria is essential to guide study structures
                efficiently.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5 p-4 rounded-xl bg-white/20 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800/40">
                  <h4 className="font-display font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider">
                    Full Client-Side Security
                  </h4>
                  <p className="text-xs text-slate-500">
                    Your semester logs, marks selections, and goals are stored
                    exclusively inside local storage. We do not collect,
                    transmit, or monitor data.
                  </p>
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-white/20 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800/40">
                  <h4 className="font-display font-bold text-slate-950 dark:text-white text-xs uppercase tracking-wider">
                    UGC Compliant Model
                  </h4>
                  <p className="text-xs text-slate-500">
                    Formulated adhering strictly to public standards approved by
                    the Sri Lankan University Grants Commission and NIIBS
                    department ordinances.
                  </p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 rounded-2xl bg-white/20 dark:bg-slate-800/40 border border-slate-200/40 dark:border-slate-800/40 flex items-start space-x-3 text-xs leading-relaxed text-slate-500">
                <Info className="w-5 h-5 text-niibs-yellow shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <b className="font-display font-semibold text-slate-900 dark:text-white">
                    General Portal Disclaimer
                  </b>
                  <p>
                    All values computed are generated directly using math
                    algorithms for guiding and forecasting purposes. Official
                    transcripts, final certificate ratings, and credit approvals
                    remain under the sole jurisdiction of the Board of
                    Examinations at the Bollegala, Kelaniya campus of NIIBS.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* University Portal Portal Footer */}
      <Footer onViewChange={setCurrentView} />

      {/* Global Toast Notification Overlay */}
      <AnimatePresence>
        {toast.type && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-5 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md text-sm font-medium ${
              toast.type === 'success' 
                ? 'bg-[#00a650]/90 border-[#00a650] text-white' 
                : toast.type === 'error'
                  ? 'bg-red-500/90 border-red-600 text-white'
                  : 'bg-white/90 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-white shrink-0" />}
            {toast.type === 'info' && <AlertCircle className="w-5 h-5 text-[#2d3091] dark:text-[#ffc013] shrink-0" />}
            {toast.type === 'error' && <XCircle className="w-5 h-5 text-white shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
