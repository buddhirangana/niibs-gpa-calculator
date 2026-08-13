import { motion, AnimatePresence } from "motion/react";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Download, Smartphone, X, CheckCircle2, WifiOff } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Check if running as standalone PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Offline Status Pill Notification */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500/90 text-slate-950 text-xs font-bold shadow-lg backdrop-blur-md border border-amber-400 font-mono"
          >
            <WifiOff className="w-4 h-4 text-slate-950 animate-pulse" />
            <span>Working Offline • Data Saved Locally</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Install Banner */}
      <AnimatePresence>
        {deferredPrompt && !isDismissed && !isInstalled && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100%-3rem)] glass-card p-4 rounded-3xl border border-niibs-yellow/40 dark:border-niibs-yellow/30 shadow-2xl backdrop-blur-xl space-y-3 no-print"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-white/10 p-2 flex items-center justify-center shrink-0 border border-niibs-yellow/40 shadow-md backdrop-blur-md">
                  <img src="/favicon.png" alt="NIIBS GPA Calculator" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-sm text-slate-900 dark:text-white leading-tight">
                    Install NIIBS GPA App
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                    Fast offline access & home screen shortcut.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsDismissed(true)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss install prompt"
              >
                <X className="w-4 h-4" />
                <span className="sr-only">Dismiss install prompt</span>
              </button>
            </div>

            <div className="flex items-center space-x-2 pt-1">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-4 bg-niibs-yellow hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-md cursor-pointer font-display"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install Application</span>
              </button>

              <button
                onClick={() => setIsDismissed(true)}
                className="py-2 px-3 bg-slate-200 hover:bg-slate-300 text-slate-700 dark:bg-white/10 dark:hover:bg-white/20 dark:text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer font-display"
              >
                Later
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
