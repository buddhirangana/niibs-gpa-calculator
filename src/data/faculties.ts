/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Faculty } from '../types';

// Standard FCIT Grading Scale
export const fcitGradingScheme = [
  { grade: 'A+', gpaValue: 4.00, description: 'Superior' },
  { grade: 'A', gpaValue: 4.00, description: 'Superior' },
  { grade: 'A-', gpaValue: 3.70, description: 'Superior' },
  { grade: 'B+', gpaValue: 3.30, description: 'Meritorious' },
  { grade: 'B', gpaValue: 3.00, description: 'Meritorious' },
  { grade: 'B-', gpaValue: 2.70, description: 'Meritorious' },
  { grade: 'C+', gpaValue: 2.30, description: 'Adequate' },
  { grade: 'C', gpaValue: 2.00, description: 'Adequate' },
  { grade: 'C-', gpaValue: 1.70, description: 'Unsatisfactory' },
  { grade: 'D+', gpaValue: 1.30, description: 'Unsatisfactory' },
  { grade: 'D', gpaValue: 1.00, description: 'Unsatisfactory' },
  { grade: 'E', gpaValue: 0.00, description: 'Failure' },
];

// Standard FBS & FHSS (except ACMT) Grading Scale
export const fbsGradingScheme = [
  { grade: 'A+', gpaValue: 4.00, description: 'Distinction' },
  { grade: 'A', gpaValue: 4.00, description: 'Excellent' },
  { grade: 'A-', gpaValue: 3.70, description: 'Very Good' },
  { grade: 'B+', gpaValue: 3.30, description: 'Good' },
  { grade: 'B', gpaValue: 3.00, description: 'Satisfactory' },
  { grade: 'B-', gpaValue: 2.70, description: 'Fairly Good' },
  { grade: 'C+', gpaValue: 2.30, description: 'Fair' },
  { grade: 'C', gpaValue: 2.00, description: 'Satisfactory Pass' },
  { grade: 'C-', gpaValue: 1.70, description: 'Weak Pass' },
  { grade: 'D+', gpaValue: 1.30, description: 'Poor' },
  { grade: 'D', gpaValue: 1.00, description: 'Very Poor' },
  { grade: 'E', gpaValue: 0.00, description: 'Fail' },
];

// Standard  FHSS ACMT Grading Scale
export const fhssAppliedMediaGradingScheme = [
  { grade: 'A+', gpaValue: 4.00, description: 'Superior' },
  { grade: 'A', gpaValue: 4.00, description: 'Superior' },
  { grade: 'A-', gpaValue: 3.70, description: 'Superior' },
  { grade: 'B+', gpaValue: 3.20, description: 'Meritorious' },
  { grade: 'B', gpaValue: 3.00, description: 'Meritorious' },
  { grade: 'B-', gpaValue: 2.70, description: 'Meritorious' },
  { grade: 'C+', gpaValue: 2.30, description: 'Adequate' },
  { grade: 'C', gpaValue: 2.00, description: 'Adequate' },
  { grade: 'C-', gpaValue: 1.70, description: 'Adequate' },
  { grade: 'D+', gpaValue: 1.30, description: 'Minimal' },
  { grade: 'D', gpaValue: 1.00, description: 'Minimal' },
  { grade: 'D-', gpaValue: 0.75, description: 'Minimal' },
  { grade: 'E', gpaValue: 0.00, description: 'Failure' },
];

export const facultiesData: Faculty[] = [
  {
    id: 'FCIT',
    name: 'Faculty of Computing and Information Technology',
    shortName: 'FCIT',
    description: 'Empowering future technology leaders through modern research and industry-relevant programs.',
    bannerImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    rules: {
      facultyId: 'FCIT',
      facultyName: 'Faculty of Computing and Information Technology',
      gpaScale: 4.0,
      gradingScheme: fcitGradingScheme,
      degreeClassifications: {
        firstClass: 3.70,
        secondUpper: 3.25,
        secondLower: 3.00,
        generalDegree: 2.00
      }
    },
    programs: [
      {
        id: 'bsc-it',
        name: 'BSc (Hons.) in Information Technology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'inte11012', code: 'INTE11012', name: 'Computer Fundamentals', credits: 2 },
              { id: 'inte11022', code: 'INTE11022', name: 'IT Applications', credits: 2 },
              { id: 'inte11032', code: 'INTE11032', name: 'Mathematics for Computing', credits: 2 },
              { id: 'inte11043', code: 'INTE11043', name: 'Computer Hardware & Operating systems', credits: 3 },
              { id: 'inte11052', code: 'INTE11052', name: 'Communication Skills for IT', credits: 2 },
              { id: 'inte11062', code: 'INTE11062', name: 'Software Engineering', credits: 2 },
              { id: 'inte11072', code: 'INTE11072', name: 'Introduction to Programming', credits: 2 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'inte12013', code: 'INTE12013', name: 'Data Communication and Computer Networks', credits: 3 },
              { id: 'inte12022', code: 'INTE12022', name: 'Information Security', credits: 2 },
              { id: 'inte12033', code: 'INTE12033', name: 'Database Management Systems', credits: 3 },
              { id: 'inte12043', code: 'INTE12043', name: 'Data Structures and Algorithms', credits: 3 },
              { id: 'inte12053', code: 'INTE12053', name: 'Computer Graphic and multimedia', credits: 3 },
              { id: 'inte12062', code: 'INTE12062', name: 'Probability and Statistics', credits: 2 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'inte21013', code: 'INTE21013', name: 'Object Oriented Programming', credits: 3 },
              { id: 'inte21023', code: 'INTE21023', name: 'System Analysis and Design', credits: 3 },
              { id: 'inte21033', code: 'INTE21033', name: 'Advanced Database Management Systems', credits: 3 },
              { id: 'inte21042', code: 'INTE21042', name: 'Information Systems', credits: 2 },
              { id: 'inte21051', code: 'INTE21051', name: 'Discrete Mathematics', credits: 1 },
              { id: 'inte21064', code: 'INTE21064', name: 'Web Application Development', credits: 4 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'inte22013', code: 'INTE22013', name: 'Web Technologies and Web Development', credits: 3 },
              { id: 'inte22023', code: 'INTE22023', name: 'Big Data Technologies', credits: 3 },
              { id: 'inte22032', code: 'INTE22032', name: 'IT Change Management', credits: 2 },
              { id: 'inte22042', code: 'INTE22042', name: 'Management Information System and Enterprise Resource Planning System', credits: 2 },
              { id: 'inte22052', code: 'INTE22052', name: 'Advanced Software Engineering', credits: 2 },
              { id: 'inte22062', code: 'INTE22062', name: 'IT Project', credits: 2 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'inte31013', code: 'INTE31013', name: 'Mobile Application Development', credits: 3 },
              { id: 'inte31023', code: 'INTE31023', name: 'Internet Technologies and Social Media', credits: 3 },
              { id: 'inte31034', code: 'INTE31034', name: 'IT Project Management', credits: 4 },
              { id: 'inte31043', code: 'INTE31043', name: 'Data Management and Business Intelligence (Elective)', credits: 3 },
              { id: 'inte31053', code: 'INTE31053', name: 'Software Engineering Tools and Metrics (Elective)', credits: 3 },
              { id: 'inte31063', code: 'INTE31063', name: 'Artificial Intelligence (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'inte32013', code: 'INTE32013', name: 'Software Quality Assurance', credits: 3 },
              { id: 'inte32023', code: 'INTE32023', name: 'Cyber Security and IT Risk Management', credits: 3 },
              { id: 'inte32032', code: 'INTE32032', name: 'Research Methodology', credits: 2 },
              { id: 'inte32043', code: 'INTE32043', name: 'E-Business and Strategy (Elective)', credits: 3 },
              { id: 'inte32053', code: 'INTE32053', name: 'Global Systems Outsourcing (Elective)', credits: 3 },
              { id: 'inte32063', code: 'INTE32063', name: 'Innovation and Technology (Elective)', credits: 3 },
              { id: 'inte32073', code: 'INTE32073', name: 'Robotics (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'inte43019', code: 'INTE43019', name: 'Research Project', credits: 9 },
              { id: 'inte41023', code: 'INTE41023', name: 'IT Policy and E Governance', credits: 3 },
              { id: 'inte41033', code: 'INTE41033', name: 'IT Strategic Planning and Management (Elective)', credits: 3 },
              { id: 'inte41043', code: 'INTE41043', name: 'Advanced Artificial Intelligence (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'inte42016', code: 'INTE42016', name: 'IT Industry Placement', credits: 6 },
              { id: 'inte42022', code: 'INTE42022', name: 'Current trends in ICT', credits: 2 },
              { id: 'inte42032', code: 'INTE42032', name: 'Managerial Leadership', credits: 2 },
              { id: 'inte42042', code: 'INTE42042', name: 'International Communication', credits: 2 },
              { id: 'inte42053', code: 'INTE42053', name: 'IT Start-ups and Entrepreneurship (Elective)', credits: 3 },
              { id: 'inte42063', code: 'INTE42063', name: 'Business Analytics (Elective)', credits: 3 },
            ]
          }
        ]
      },
    ]
  },
  {
    id: 'FBS',
    name: 'Faculty of Buddhist Studies',
    shortName: 'FBS',
    description: 'Nurturing deep scholarship and understanding of ancient Buddhist traditions, Pali canonical literature, and mindfulness philosophy.',
    bannerImage: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800',
    rules: {
      facultyId: 'FBS',
      facultyName: 'Faculty of Buddhist Studies',
      gpaScale: 4.0,
      gradingScheme: fbsGradingScheme,
      degreeClassifications: {
        firstClass: 3.70,
        secondUpper: 3.30,
        secondLower: 3.00,
        generalDegree: 2.00
      }
    },
    programs: [
      {
        id: 'ba-bs-gen',
        name: 'BA (General) in Buddhist Studies',
        durationYears: 3,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'bust11013', code: 'BUST 11013', name: 'Fundamentals of Early Buddhism', credits: 3 },
              { id: 'bust11023', code: 'BUST 11023', name: 'Principles of Buddhist Social Philosophy', credits: 3 },
              { id: 'bust11033', code: 'BUST 11033', name: 'Introduction to Theravāda Canonical Literature', credits: 3 },
              { id: 'bust11043', code: 'BUST 11043', name: 'Principles of Buddhist Communication', credits: 3 },
              { id: 'bust11053', code: 'BUST 11053', name: 'Pre-Buddhist and Contemporary Religious and Cultural Background of India', credits: 3 },
              { id: 'ctlo11011', code: 'CTLO 11011', name: 'Critical Thinking and Logic - I', credits: 1 },
              { id: 'come11011', code: 'COME 11011', name: 'Compulsory English - I', credits: 1 },
              { id: 'comi11011', code: 'COMI 11011', name: 'Compulsory ICT', credits: 1 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'bust12063', code: 'BUST 12063', name: 'Introduction to Buddhist Social Work', credits: 3 },
              { id: 'bust12073', code: 'BUST 12073', name: 'Buddhist Meditation', credits: 3 },
              { id: 'bust12083', code: 'BUST 12083', name: 'An Approach to Theravāda Literary Sources', credits: 3 },
              { id: 'bust12093', code: 'BUST 12093', name: 'Principles of Buddhist Management', credits: 3 },
              { id: 'bust12103', code: 'BUST 12103', name: 'Principles of Buddhist Civilization', credits: 3 },
              { id: 'ctlo12021', code: 'CTLO 12021', name: 'Critical Thinking and Logic - II', credits: 1 },
              { id: 'come12021', code: 'COME 12021', name: 'Compulsory English - II', credits: 1 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'bust21113', code: 'BUST 21113', name: 'Cultural Background of Pre-Buddhist Sri Lanka', credits: 3 },
              { id: 'bust21123', code: 'BUST 21123', name: 'Syntactic and Semantic Study of Theravada Sutta Literature', credits: 3 },
              { id: 'bust21133', code: 'BUST 21133', name: 'Buddhism and Six Indian Philosophical Traditions', credits: 3 },
              { id: 'bust21143', code: 'BUST 21143', name: 'Buddhist Psychology', credits: 3 },
              { id: 'bust21153', code: 'BUST 21153', name: 'Origins and Evolution of Sri Lankan Buddhist Culture', credits: 3 },
              { id: 'come21031', code: 'COME 21031', name: 'Compulsory English - III', credits: 1 },
              { id: 'pali21011', code: 'PALI 21011', name: 'Pali Language - I', credits: 1 },
              { id: 'busa21011', code: 'BUSA 21011', name: 'An Approach to Buddhist Sanskrit - I', credits: 1 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'bust22183', code: 'BUST 22183', name: 'Evolution of Early Buddhist Schools', credits: 3 },
              { id: 'bust22193', code: 'BUST 22193', name: 'Buddhist Thought in Pali Nikāyas', credits: 3 },
              { id: 'bust22203', code: 'BUST 22203', name: 'Expansion of Buddhist Culture in Asia', credits: 3 },
              { id: 'bust22213', code: 'BUST 22213', name: 'Buddhist Epistemology', credits: 3 },
              { id: 'bust22223', code: 'BUST 22223', name: 'Buddhist Rituals and Ceremonies', credits: 3 },
              { id: 'come22041', code: 'COME 22041', name: 'Compulsory English - IV', credits: 1 },
              { id: 'pali22021', code: 'PALI 22021', name: 'Pali Language - II', credits: 1 },
              { id: 'busa22021', code: 'BUSA 22021', name: 'An Approach to Buddhist Sanskrit - II', credits: 1 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'bust31253', code: 'BUST 31253', name: 'Buddhism and Modern World', credits: 3 },
              { id: 'bust31263', code: 'BUST 31263', name: 'Theravāda Abhidhamma Studies', credits: 3 },
              { id: 'bust31273', code: 'BUST 31273', name: 'Buddhist Ethics', credits: 3 },
              { id: 'bust31283', code: 'BUST 31283', name: 'Mahāyāna Culture', credits: 3 },
              { id: 'bust31293', code: 'BUST 31293', name: 'Buddhist Aesthetics', credits: 3 },
              { id: 'come31051', code: 'COME 31051', name: 'Compulsory English - V', credits: 1 },
              { id: 'pali31031', code: 'PALI 31031', name: 'Pali Language -III', credits: 1 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'bust32323', code: 'BUST 32323', name: 'Buddhist Art and Architecture', credits: 3 },
              { id: 'bust32333', code: 'BUST 32333', name: 'Reading Comprehension of Pali Commentarial Literature', credits: 3 },
              { id: 'bust32343', code: 'BUST 32343', name: 'Buddhism and World Religions', credits: 3 },
              { id: 'bust32353', code: 'BUST 32353', name: 'Theravāda Vinaya Studies', credits: 3 },
              { id: 'bust32363', code: 'BUST 32363', name: 'Buddhist Logic', credits: 3 },
              { id: 'come32061', code: 'COME 32061', name: 'Compulsory English - VI', credits: 1 },
              { id: 'pali32041', code: 'PALI 32041', name: 'Traditions of Pali Grammar', credits: 1 },
            ]
          }
        ]
      },
      {
        id: 'ba-bs-hons',
        name: 'BA (Hons.) in Buddhist Studies',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'bust11013', code: 'BUST 11013', name: 'Fundamentals of Early Buddhism', credits: 3 },
              { id: 'bust11023', code: 'BUST 11023', name: 'Principles of Buddhist Social Philosophy', credits: 3 },
              { id: 'bust11033', code: 'BUST 11033', name: 'Introduction to Theravāda Canonical Literature', credits: 3 },
              { id: 'bust11043', code: 'BUST 11043', name: 'Principles of Buddhist Communication', credits: 3 },
              { id: 'bust11053', code: 'BUST 11053', name: 'Pre-Buddhist and Contemporary Religious and Cultural Background of India', credits: 3 },
              { id: 'ctlo11011', code: 'CTLO 11011', name: 'Critical Thinking and Logic - I', credits: 1 },
              { id: 'come11011', code: 'COME 11011', name: 'Compulsory English - I', credits: 1 },
              { id: 'comi11011', code: 'COMI 11011', name: 'Compulsory ICT', credits: 1 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'bust12063', code: 'BUST 12063', name: 'Introduction to Buddhist Social Work', credits: 3 },
              { id: 'bust12073', code: 'BUST 12073', name: 'Buddhist Meditation', credits: 3 },
              { id: 'bust12083', code: 'BUST 12083', name: 'An Approach to Theravāda Literary Sources', credits: 3 },
              { id: 'bust12093', code: 'BUST 12093', name: 'Principles of Buddhist Management', credits: 3 },
              { id: 'bust12103', code: 'BUST 12103', name: 'Principles of Buddhist Civilization', credits: 3 },
              { id: 'ctlo12021', code: 'CTLO 12021', name: 'Critical Thinking and Logic - II', credits: 1 },
              { id: 'come12021', code: 'COME 12021', name: 'Compulsory English - II', credits: 1 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'bust21113', code: 'BUST 21113', name: 'Cultural Background of Pre-Buddhist Sri Lanka', credits: 3 },
              { id: 'bust21123', code: 'BUST 21123', name: 'Syntactic and Semantic Study of Theravada Sutta Literature', credits: 3 },
              { id: 'bust21133', code: 'BUST 21133', name: 'Buddhism and Six Indian Philosophical Traditions', credits: 3 },
              { id: 'bust21163', code: 'BUST 21163', name: 'Buddhist Psychology and Counselling', credits: 3 },
              { id: 'bust21173', code: 'BUST 21173', name: 'Buddhism in Colonial Sri Lanka and Renaissance', credits: 3 },
              { id: 'come21031', code: 'COME 21031', name: 'Compulsory English - III', credits: 1 },
              { id: 'pali21011', code: 'PALI 21011', name: 'Pali Language - I', credits: 1 },
              { id: 'busa21011', code: 'BUSA 21011', name: 'An Approach to Buddhist Sanskrit - I', credits: 1 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'bust22183', code: 'BUST 22183', name: 'Evolution of Early Buddhist Schools', credits: 3 },
              { id: 'bust22193', code: 'BUST 22193', name: 'Buddhist Thought in Pali Nikāyas', credits: 3 },
              { id: 'bust22203', code: 'BUST 22203', name: 'Expansion of Buddhist Culture in Asia', credits: 3 },
              { id: 'bust22233', code: 'BUST 22233', name: 'Buddhism and Western Theories of Knowledge', credits: 3 },
              { id: 'bust22243', code: 'BUST 22243', name: 'Syntactic and Semantic Studies on Abhidhamma Piṭaka and Vinaya Piṭaka', credits: 3 },
              { id: 'come22041', code: 'COME 22041', name: 'Compulsory English - IV', credits: 1 },
              { id: 'pali22021', code: 'PALI 22021', name: 'Pali Language - II', credits: 1 },
              { id: 'busa22021', code: 'BUSA 22021', name: 'An Approach to Buddhist Sanskrit - II', credits: 1 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'bust31253', code: 'BUST 31253', name: 'Buddhism and Modern World', credits: 3 },
              { id: 'bust31263', code: 'BUST 31263', name: 'Theravāda Abhidhamma Studies', credits: 3 },
              { id: 'bust31273', code: 'BUST 31273', name: 'Buddhist Ethics', credits: 3 },
              { id: 'bust31303', code: 'BUST 31303', name: 'Buddhist Education Philosophy', credits: 3 },
              { id: 'bust31313', code: 'BUST 31313', name: 'Mahāyāna Philosophy', credits: 3 },
              { id: 'come31051', code: 'COME 31051', name: 'Compulsory English - V', credits: 1 },
              { id: 'pali31031', code: 'PALI 31031', name: 'Pali Language - III', credits: 1 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'bust32323', code: 'BUST 32323', name: 'Buddhist Art and Architecture', credits: 3 },
              { id: 'bust32333', code: 'BUST 32333', name: 'Reading Comprehension of Pali Commentarial Literature', credits: 3 },
              { id: 'bust32343', code: 'BUST 32343', name: 'Buddhism and World Religions', credits: 3 },
              { id: 'bust32373', code: 'BUST 32373', name: 'Buddhist Legal and Ethical Philosophy', credits: 3 },
              { id: 'bust32383', code: 'BUST 32383', name: 'Buddhist Logic and Western Logic', credits: 3 },
              { id: 'come32061', code: 'COME 32061', name: 'Compulsory English - VI', credits: 1 },
              { id: 'pali32041', code: 'PALI 32041', name: 'Traditions of Pali Grammar', credits: 1 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'bust41393', code: 'BUST 41393', name: 'Buddhism and Western Thought', credits: 3 },
              { id: 'bust41403', code: 'BUST 41403', name: 'Buddhist Studies in the West', credits: 3 },
              { id: 'bust41413', code: 'BUST 41413', name: 'Research Methodology for Buddhist Studies', credits: 3 },
              { id: 'bust41423', code: 'BUST 41423', name: 'Buddhist Sanskrit Literature', credits: 3 },
              { id: 'bust40436', code: 'BUST 40436', name: 'Independent Study', credits: 6 },
              { id: 'pali41051', code: 'PALI 41051', name: 'The Linguistic Approach to Pali Grammar', credits: 1 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'bust42443', code: 'BUST 42443', name: 'Studies on Buddhist Manuscripts and Inscriptions', credits: 3 },
              { id: 'bust42453', code: 'BUST 42453', name: 'Chinese and Tibetan Buddhist Literature', credits: 3 },
              { id: 'bust42466', code: 'BUST 42466', name: 'Internship', credits: 6 },
              { id: 'bust40436_s2', code: 'BUST 40436', name: 'Independent Study', credits: 6 },
              { id: 'prak42011', code: 'PRAK 42011', name: 'An Approach to Prakrit Language', credits: 1 },
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'FHSS',
    name: 'Faculty of Humanities and Social Sciences',
    shortName: 'FHSS',
    description: 'Fostering expressive dialogue, cultural conservation, and critical analyses of communication platforms and anthropological evolutions.',
    bannerImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=800',
    rules: {
      facultyId: 'FHSS',
      facultyName: 'Faculty of Humanities and Social Sciences',
      gpaScale: 4.0,
      gradingScheme: fbsGradingScheme, // use standard scale
      degreeClassifications: {
        firstClass: 3.70,
        secondUpper: 3.30,
        secondLower: 3.00,
        generalDegree: 2.00
      }
    },
    programs: [
      {
        id: 'ba-acmt',
        name: 'BA (Hons.) in Applied Communication and Media Technology',
        durationYears: 4,
        gradingScheme: fhssAppliedMediaGradingScheme,
        degreeClassifications: {
          firstClass: 3.50,
          secondUpper: 3.25,
          secondLower: 3.00,
          generalDegree: 2.00
        },
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'acmt11514', code: 'ACMT 11514', name: 'Principles of Communication', credits: 4 },
              { id: 'acmt11523', code: 'ACMT 11523', name: 'Evolution of Communication', credits: 3 },
              { id: 'aarc11513', code: 'AARC 11513', name: 'Introduction to Applied Archaeology', credits: 3 },
              { id: 'anth11553', code: 'ANTH 11553', name: 'Introduction to Anthropology', credits: 3 },
              { id: 'engl11512', code: 'ENGL 11512', name: 'Advanced English Grammar', credits: 2 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'acmt12533', code: 'ACMT 12533', name: 'Media Literacy and Criticism', credits: 3 },
              { id: 'acmt12544', code: 'ACMT 12544', name: 'Study of Contemporary Media Technology and Applications', credits: 4 },
              { id: 'aarc12573', code: 'AARC 12573', name: 'Introduction to Epigraphy and Paleography', credits: 3 },
              { id: 'anth12613', code: 'ANTH 12613', name: 'Introduction to Non-material and Material Culture', credits: 3 },
              { id: 'engl12532', code: 'ENGL 12532', name: 'Advanced English Grammar', credits: 2 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'acmt21513', code: 'ACMT 21513', name: 'Legal and Ethical concerns of Media applications in Society', credits: 3 },
              { id: 'acmt21524', code: 'ACMT 21524', name: 'Regional Media Studies of South Asia', credits: 4 },
              { id: 'acmt21535', code: 'ACMT 21535', name: 'Principal of Media Technology', credits: 5 },
              { id: 'acmt21545', code: 'ACMT 21545', name: 'Virtual Communication', credits: 5 },
              { id: 'acmt22555', code: 'ACMT 22555', name: 'Advertising and Marketing Communication', credits: 5 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'eacmt22563', code: 'EACMT 22563', name: 'Fundamental of English Grammar', credits: 3 },
              { id: 'acmt22575', code: 'ACMT 22575', name: 'Organizational Behaviour and Media Management', credits: 5 },
              { id: 'acmt22583', code: 'ACMT 22583', name: 'Culture and Globalization', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'acmt31514', code: 'ACMT 31514', name: 'Introduction to Research and Research Methodology', credits: 4 },
              { id: 'acmt31523', code: 'ACMT 31523', name: 'Student Symposium of Communication Studies', credits: 3 },
              { id: 'acmt31533', code: 'ACMT 31533', name: 'Mindful Communication and Buddhism', credits: 3 },
              { id: 'acmt31545', code: 'ACMT 31545', name: 'Practical oriented assessment (internship)', credits: 5 },
              { id: 'acmt32555', code: 'ACMT 32555', name: 'Communication for Development and Extension', credits: 5 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'acmt32563', code: 'ACMT 32563', name: 'Comprehensive English Grammar for Media', credits: 3 },
              { id: 'acmt32574', code: 'ACMT 32574', name: 'Applied Media Technologies - Radio Communication', credits: 4 },
              { id: 'acmt32584', code: 'ACMT 32584', name: 'Applied Media Technologies - TV and Cinema', credits: 4 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'acmt41515', code: 'ACMT 41515', name: 'Applied Media Technologies - Print Communication', credits: 5 },
              { id: 'acmt41523', code: 'ACMT 41523', name: 'Language for Communication', credits: 3 },
              { id: 'coit41534', code: 'COIT 41534', name: 'Common IT (offered by FCIT)', credits: 4 },
              { id: 'acmt41543', code: 'ACMT 41543', name: 'Traditional Communication and New Applications', credits: 3 },
              { id: 'eacmt42553', code: 'EACMT 42553', name: 'Advanced English Writing for Media', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'acmt42564', code: 'ACMT 42564', name: 'Creative Communication and New Trends', credits: 4 },
              { id: 'acmt42578', code: 'ACMT 42578', name: 'Theses', credits: 8 },
            ]
          }
        ]
      },
      {
        id: 'ba-anth',
        name: 'BA (Hons.) in Anthropology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'anth11513', code: 'ANTH 11513', name: 'Introduction to Socio-cultural Anthropology', credits: 3 },
              { id: 'anth11523', code: 'ANTH 11523', name: 'Introduction to Biological Anthropology', credits: 3 },
              { id: 'anth11532', code: 'ANTH 11532', name: 'Basic Academic English - I', credits: 2 },
              { id: 'anth11542', code: 'ANTH 11542', name: 'Introduction of Information Communication Technology', credits: 2 },
              { id: 'aarc11553', code: 'AARC 11553', name: 'Introduction to Archaeology', credits: 3 },
              { id: 'comd11563', code: 'COMD 11563', name: 'Fundamentals of Communication (Elective)', credits: 3 },
              { id: 'bust11573', code: 'BUST 11573', name: 'Fundamentals of Early Buddhism (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'anth12583', code: 'ANTH 12583', name: 'Physical Anthropology', credits: 3 },
              { id: 'anth12593', code: 'ANTH 12593', name: 'Intangible Cultural Heritage', credits: 3 },
              { id: 'anth12602', code: 'ANTH 12602', name: 'English for Professionals - I', credits: 2 },
              { id: 'anth12612', code: 'ANTH 12612', name: 'Computer Applications for Anthropology', credits: 2 },
              { id: 'aarc12623', code: 'AARC 12623', name: 'Evolution of Culture', credits: 3 },
              { id: 'comd12633', code: 'COMD 12633', name: 'History of Comparative Media Studies (Elective)', credits: 3 },
              { id: 'bust12643', code: 'BUST 12643', name: 'Principles of Buddhist Civilization (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'anth21513', code: 'ANTH 21513', name: 'Theoretical Perspective in Socio-Cultural Anthropology', credits: 3 },
              { id: 'anth21523', code: 'ANTH 21523', name: 'Hydraulic Civilization', credits: 3 },
              { id: 'anth21533', code: 'ANTH 21533', name: 'Qualitative and Quantitative Methods in Anthropology', credits: 3 },
              { id: 'anth21543', code: 'ANTH 21543', name: 'English for Professionals - II', credits: 3 },
              { id: 'anth21553', code: 'ANTH 21553', name: 'Introduction of Statistical Package for the Social Sciences', credits: 3 },
              { id: 'anth21563', code: 'ANTH 21563', name: 'Anthropology of Food and Nutrition (Elective)', credits: 3 },
              { id: 'bust21573', code: 'BUST 21573', name: 'Principles of Buddhist Social Philosophy (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'anth22583', code: 'ANTH 22583', name: 'Evolution and Human Behaviour', credits: 3 },
              { id: 'anth22593', code: 'ANTH 22593', name: 'Mind Body and Anthropology', credits: 3 },
              { id: 'anth22603', code: 'ANTH 22603', name: 'Primate Behavior: Ecology and Conservation', credits: 3 },
              { id: 'anth22613', code: 'ANTH 22613', name: 'English for Anthropology', credits: 3 },
              { id: 'aarc22623', code: 'AARC 22623', name: 'Environmental Archaeology', credits: 3 },
              { id: 'bust22633', code: 'BUST 22633', name: 'Pre Buddhist and Contemporary Religious and Cultural Background of India (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'anth31513', code: 'ANTH 31513', name: 'Alternative Medical System', credits: 3 },
              { id: 'anth31523', code: 'ANTH 31523', name: 'Linguistic Anthropology', credits: 3 },
              { id: 'anth31533', code: 'ANTH 31533', name: 'Sri Lanka: Culture, Society and Modernity', credits: 3 },
              { id: 'anth31543', code: 'ANTH 31543', name: 'Research methodology in Socio-Cultural Anthropology', credits: 3 },
              { id: 'anth31553', code: 'ANTH 31553', name: 'Applied Anthropology', credits: 3 },
              { id: 'anth31563', code: 'ANTH 31563', name: 'Applied Statistics in Anthropology Using SPSS (Elective)', credits: 3 },
              { id: 'bust31573', code: 'BUST 31573', name: 'Buddhist Social Work (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'aarc32583', code: 'AARC 32583', name: 'Ethnoarchaeology', credits: 3 },
              { id: 'anth32593', code: 'ANTH 32593', name: 'Human Osteology', credits: 3 },
              { id: 'anth32603', code: 'ANTH 32603', name: 'Human Ontology', credits: 3 },
              { id: 'anth32613', code: 'ANTH 32613', name: 'Geographical Information System (GIS)', credits: 3 },
              { id: 'aarc32623', code: 'AARC 32623', name: 'Settlement Archaeology (Elective)', credits: 3 },
              { id: 'bust32633', code: 'BUST 32633', name: 'Principles of Buddhist Management (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'anth41513', code: 'ANTH 41513', name: 'Anthropology of Development', credits: 3 },
              { id: 'anth41523', code: 'ANTH 41523', name: 'Genetics and Evolution', credits: 3 },
              { id: 'anth41533', code: 'ANTH 41533', name: 'Introduction to Paleoanthropology', credits: 3 },
              { id: 'anth41543', code: 'ANTH 41543', name: 'Religion in Digital Age', credits: 3 },
              { id: 'anth41553', code: 'ANTH 41553', name: 'Genocide: Through Anthropological Perspective', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'anth42563', code: 'ANTH 42563', name: 'Cultural Tourism', credits: 3 },
              { id: 'anth42573', code: 'ANTH 42573', name: 'Collecting culture: Anthropology and Museum', credits: 3 },
              { id: 'anth42586', code: 'ANTH 42586', name: 'Industrial Training', credits: 6 },
              { id: 'anth42596', code: 'ANTH 42596', name: 'Dissertation', credits: 6 },
            ]
          }
        ]
      },
      {
        id: 'ba-arch',
        name: 'BA (Hons.) in Applied Archaeology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'aarc11513', code: 'AARC 11513', name: 'Introduction to Archaeology', credits: 3 },
              { id: 'aarc11523', code: 'AARC 11523', name: 'Theories in Contemporary Archaeology', credits: 3 },
              { id: 'engl11532', code: 'ENGL 11532', name: 'Basic Academic English', credits: 2 },
              { id: 'anth11542', code: 'ANTH 11542', name: 'Introduction to Anthropology', credits: 2 },
              { id: 'comp11552', code: 'COMP 11552', name: 'Introduction of Information Communication Technology', credits: 2 },
              { id: 'bust11563', code: 'BUST 11563', name: 'Fundamentals of Early Buddhism (Elective)', credits: 3 },
              { id: 'comd11573', code: 'COMD 11573', name: 'Fundamentals of Communication (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'aarc12583', code: 'AARC 12583', name: 'Epigraphy and Paleography', credits: 3 },
              { id: 'aarc12593', code: 'AARC 12593', name: 'Evolution of Culture', credits: 3 },
              { id: 'engl12602', code: 'ENGL 12602', name: 'English for Professionals', credits: 2 },
              { id: 'comp12612', code: 'COMP 12612', name: 'Computer Applications for Archaeology', credits: 2 },
              { id: 'anth12623', code: 'ANTH 12623', name: 'Introduction to Material and Non-material Culture', credits: 3 },
              { id: 'bust12633', code: 'BUST 12633', name: 'Principles of Buddhist Civilization (Elective)', credits: 3 },
              { id: 'comd11643', code: 'COMD 11643', name: 'Comparative Media Studies (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'aarc21513', code: 'AARC 21513', name: 'Hydraulic Civilization', credits: 3 },
              { id: 'aarc21523', code: 'AARC 21523', name: 'Art and Architecture', credits: 3 },
              { id: 'aarc21533', code: 'AARC 21533', name: 'Trade and Numismatics', credits: 3 },
              { id: 'engl21543', code: 'ENGL 21543', name: 'English for Archaeology - I', credits: 3 },
              { id: 'comp21553', code: 'COMP 21553', name: 'Introduction of Statistical Package for the Social Science', credits: 3 },
              { id: 'bust21563', code: 'BUST 21563', name: 'Principles of Buddhist Social Philosophy (Elective)', credits: 3 },
              { id: 'anth21573', code: 'ANTH 21573', name: 'Qualitative and Quantitative Methods in Anthropology (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'aarc22583', code: 'AARC 22583', name: 'Indigenous Technology', credits: 3 },
              { id: 'aarc22593', code: 'AARC 22593', name: 'Industrial Archaeology', credits: 3 },
              { id: 'aarc22603', code: 'AARC 22603', name: 'Environmental Archaeology', credits: 3 },
              { id: 'engl22612', code: 'ENGL 22612', name: 'English for Archaeology - II', credits: 2 },
              { id: 'bust22623', code: 'BUST 22623', name: 'Pre Buddhist and Contemporary Religious and Culture Background of India (Elective)', credits: 3 },
              { id: 'anth22633', code: 'ANTH 22633', name: 'Theoretical Perspective in Socio-Cultural Anthropology (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'aarc31513', code: 'AARC 31513', name: 'Ethnoarchaeology', credits: 3 },
              { id: 'aarc31523', code: 'AARC 31523', name: 'Museology - Principles and Practices', credits: 3 },
              { id: 'aarc31533', code: 'AARC 31533', name: 'Bioarchaeology', credits: 3 },
              { id: 'aarc31543', code: 'AARC 31543', name: 'Geographical Information System', credits: 3 },
              { id: 'comp31553', code: 'COMP 31553', name: 'Advance of Statistical Package for the Social Sciences (SPSS)', credits: 3 },
              { id: 'bust31563', code: 'BUST 31563', name: 'Buddhist Social Work (Elective)', credits: 3 },
              { id: 'anth31573', code: 'ANTH 31573', name: 'Genetics and Evolution (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'aarc32583', code: 'AARC 32583', name: 'Field Work 01: Exploration Methods and Practice', credits: 3 },
              { id: 'aarc32593', code: 'AARC 32593', name: 'Settlement Archaeology', credits: 3 },
              { id: 'aarc32603', code: 'AARC 32603', name: 'Public Archaeology', credits: 3 },
              { id: 'aarc32613', code: 'AARC 32613', name: 'Computer-Aided Design and Drafting Software Application', credits: 3 },
              { id: 'aarc32624', code: 'AARC 32624', name: 'Heritage Management', credits: 4 },
              { id: 'aarc32633', code: 'AARC 32633', name: 'Estimation and Procurement', credits: 3 },
              { id: 'anth32643', code: 'ANTH 32643', name: 'Applied Anthropology (Elective)', credits: 3 },
              { id: 'bust32653', code: 'BUST 32653', name: 'Principles of Buddhist Management (Elective)', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'aarc41513', code: 'AARC 41513', name: 'Culture Tourism', credits: 3 },
              { id: 'aarc41523', code: 'AARC 41523', name: 'Archaeological Photography', credits: 3 },
              { id: 'aarc41533', code: 'AARC 41533', name: 'Field Work 02: Excavation Methods and Practice', credits: 3 },
              { id: 'aarc41543', code: 'AARC 41543', name: 'Maritime Archaeology', credits: 3 },
              { id: 'aarc41553', code: 'AARC 41553', name: 'Research Methodology', credits: 3 },
              { id: 'aarc41563', code: 'AARC 41563', name: 'Archaeochemisty', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'aarc42573', code: 'AARC 42573', name: 'Archaeological Drafting and Cartography', credits: 3 },
              { id: 'aarc42583', code: 'AARC 42583', name: 'Legal Protocols of Archaeological Activities in Sri Lanka', credits: 3 },
              { id: 'aarc42593', code: 'AARC 42593', name: 'Preservation and Conservation', credits: 3 },
              { id: 'aarc42606', code: 'AARC 42606', name: 'Industrial Training', credits: 6 },
              { id: 'aarc42616', code: 'AARC 42616', name: 'Dissertation', credits: 6 },
            ]
          }
        ]
      }
    ]
  }
];

export function getDegreeClassifications(semesters: any[]) {
  const defaultClassifications = {
    firstClass: 3.70,
    secondUpper: 3.30,
    secondLower: 3.00,
    generalDegree: 2.00
  };

  if (!semesters || semesters.length === 0) return defaultClassifications;

  for (let i = semesters.length - 1; i >= 0; i--) {
    if (!semesters[i].id) continue;
    for (const fac of facultiesData) {
      for (const prog of fac.programs) {
        if (semesters[i].id.startsWith(`term-${prog.id}-`)) {
          return prog.degreeClassifications || fac.rules.degreeClassifications;
        }
      }
    }
  }
  return defaultClassifications;
}

// Academic Guide resources content (1500+ words across structured fields)
export const academicGuides = {
  gpaIntroduction: {
    title: 'What is GPA?',
    content: `GPA stands for Grade Point Average. It is a globally recognized, standardized measurement of a student's academic achievement at NIIBS. This numerical index represents the average value of accumulated final grades earned in all completed subjects weighted by their relative credit values. 

A high Grade Point Average demonstrates academic excellence, personal discipline, and specialized subject comprehension. Your GPA is calculation-bound after every single semesterly assessment, reflecting progress, strengths, and target milestones.

At NIIBS, Grade Point Average serves numerous academic thresholds:
1. It is the primary credential utilized for predicting degrees and final Class Honors.
2. It dictates standing criteria such as "President's List" and "Dean's List" eligibility.
3. It regulates academic standing notices, determining if a student requires specific counselling support (e.g. Probation status when GPA drops below 2.0).
4. It provides vital evidence during postgraduate admissions (MA, MPhil, PhD) and professional recruitments.`,
  },
  gpaCalculationGuide: {
    title: 'How to Calculate GPA & CGPA?',
    steps: [
      {
        title: 'Determine Grade Points',
        description: 'For each course, translate your letter grade into point equivalents (e.g., A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, E = 0.0) based on your Faculty grading scheme.',
      },
      {
        title: 'Calculate Grade Points Earned',
        description: 'Multiply the Credit value of each subject by the numeric Grade Point value. (e.g., if a 3-credit course yields a B grade (3.0), Grade Points = 3 * 3.0 = 9.0).',
      },
      {
        title: 'Sum and Divide',
        description: 'Sum up all Grade Points across your selected courses, then divide that sum by the sum of corresponding Credits.',
      },
    ],
    formula: 'GPA = Σ (Subject Credits * Grade Points) / Total Credits',
    cgpaDescription: 'CGPA (Cumulative Grade Point Average) is an average of all semesters combined. Its formula is identical, aggregating total earned Grade Points across all semesters divided by the cumulative credits completed throughout your degree.',
  },
  niibsGradingRules: {
    title: 'How NIIBS Calculates GPA',
    content: `Each Faculty at Nāgānanda International Institute for Buddhist Studies administers examinations under specific university ordinances. Faculty rules specify grading schemas and pass/fail thresholds.

Key ordinances guidelines:
- **Credit Value Weighted**: Not all subjects carry the same weight. A 3-credit software architecture course influences your CGPA three times as much as a 1-credit seminar course. This highlights the importance of maximizing performance in heavy core modules.
- **Incompletes & Retakes**: If a student fails a course (E) or repeats to upgrade, the retaken course grade is governed by faculty instructions (such as capping the upgraded grade at a maximum grade of C (2.00) or retaining the original fail point until a clear pass is registered).
- **Minimum Requirements for Graduation**: To qualify for a Bachelor's Degree at NIIBS, a student must normally register a final CGPA of at least 2.00, accumulate 90-100 credits for a General Degree (3 years) or 120-130 credits for an Honours Degree (4 years), and pass crucial language as well as professional internship modules.`,
  },
  degreeClassGuide: {
    title: 'Degree Classification Guide',
    content: `Your final cumulative score directly predicts your degree standing. NIIBS follows the Sri Lankan University Grants Commission (UGC) standards for final degree classifications:

- **First Class (Honours)**: Earned when your final CGPA is **3.70** or above. This represents exceptional academic performance, putting you in the top tier of students nationally. Outstanding prospects for immediate postgrad research fellowships.
- **Second Class Upper Division (Honours)**: Earned when your final CGPA falls between **3.30 and 3.69**. This indicates a very high caliber of scholarship, highly desirable to top global technology employers and elite global universities.
- **Second Class Lower Division (Honours)**: Earned when your final CGPA falls between **3.00 and 3.29**. A solid, respectable academic standing reflecting solid professional capabilities and systematic core comprehension.
- **General Pass / Pass**: Earned when your final CGPA is between **2.00 and 2.99**. This demonstrates successful, satisfactory fulfillment of all prescribed graduation criteria.`,
  },
  faqs: [
    {
      q: 'Will failing a subject permanently ruin my GPA?',
      a: 'An initial "E" grade registers 0.0 grade points, which heavily drags down your GPA. However, NIIBS allows course repeat exams. In most programs, passing the retake will replace the 0.0 value or average with your pass grade (typically capped at a C (2.0) grade point, depending on the Faculty’s Board of Study guidelines).',
    },
    {
      q: 'What are the Dean’s List and Vice-Chancellor’s List awards?',
      a: 'These prestigious awards are exclusive to the Faculty of Computing and Information Technology (FCIT). They are calculated annually (over a full academic year of two semesters). To qualify for the Dean’s List, students must achieve a GPA of 3.70 or higher in both semesters. The Vice-Chancellor’s List requires a GPA above 3.80 in both semesters. Additional conditions such as no failed subjects may apply.',
    },
    {
      q: 'What is the difference between GPA and CGPA?',
      a: 'GPA applies to a specific, singular term (e.g. your Semester 1 GPA). CGPA (Cumulative Grade Point Average) is the combined average across all completed semesters in your degree program up to that point.',
    },
    {
      q: 'Can a student fail a course but still pass the degree?',
      a: 'All core subjects must be passed to graduate. If a student fails an elective course, they may register on a different elective, provided they fulfill the required minimum credits constraint.',
    },
  ]
};
