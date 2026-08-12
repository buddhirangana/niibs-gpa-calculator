/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
}

export interface SemesterData {
  semesterNumber: number; // 1 to 8
  subjects: Subject[];
}

export interface Program {
  id: string;
  name: string;
  durationYears: number;
  semesters: SemesterData[];
  gradingScheme?: GradingScheme[];
  degreeClassifications?: {
    firstClass: number;
    secondUpper: number;
    secondLower: number;
    generalDegree: number;
  };
}

export interface GradingScheme {
  grade: string;
  gpaValue: number;
  description: string;
}

export interface FacultyRules {
  facultyId: string; // e.g., 'FCIT'
  facultyName: string; // e.g., 'Faculty of Computing and Information Technology'
  gpaScale: number; // 4.0
  gradingScheme: GradingScheme[];
  degreeClassifications: {
    firstClass: number; // e.g., 3.70
    secondUpper: number; // e.g., 3.30
    secondLower: number; // e.g., 3.00
    generalDegree: number; // e.g., 2.00
  };
}

export interface Faculty {
  id: string; // e.g., 'FCIT'
  name: string;
  shortName: string;
  description: string;
  bannerImage: string;
  rules: FacultyRules;
  programs: Program[];
}

// User-entered states
export interface FacultySelectedSubject {
  id: string;
  code: string;
  name: string;
  credits: number;
  grade: string; // "A+", "A", etc. or "" if not selected
  included: boolean; // is it included in calculation (checkbox)
}

export interface ManualSubject {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

export interface SemesterRecord {
  id: string; // e.g. sem-1
  name: string; // e.g. "Year 1 - Semester 1"
  gpa: number;
  credits: number;
  gradeDistribution?: Record<string, number>;
  notes?: string;
}

export interface TargetGPAPlan {
  currentCgpa: number;
  completedCredits: number;
  targetCgpa: number;
  remainingCredits: number;
  requiredGpa: number | null;
  isPossible: boolean;
  message: string;
}

export interface GPAHistory {
  date: string;
  cgpa: number;
  facultyId: string | null;
  programId: string | null;
  completedCredits: number;
}
