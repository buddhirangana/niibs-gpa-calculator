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
        name: 'BA (Hons) in Applied Communication and Media Technology',
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
              { id: 'ac1010', code: 'ACMT1010', name: 'Understanding Media & Communication', credits: 3 },
              { id: 'ac1020', code: 'ACMT1020', name: 'Principles of Applied Journalism', credits: 3 },
              { id: 'ac1030', code: 'ACMT1030', name: 'Introduction to Creative Graphic Design', credits: 3 },
              { id: 'ac1040', code: 'ACMT1040', name: 'Language Proficiency for Media I', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'ac1050', code: 'ACMT1050', name: 'Development Communication Concepts', credits: 3 },
              { id: 'ac1060', code: 'ACMT1060', name: 'Digital Typography & Layout Systems', credits: 3 },
              { id: 'ac1070', code: 'ACMT1070', name: 'Photography and Visual Composition', credits: 3 },
              { id: 'ac1080', code: 'ACMT1080', name: 'Language Proficiency for Media II', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'ac2010', code: 'ACMT2010', name: 'Audio Design & Broadcasting Tech', credits: 3 },
              { id: 'ac2020', code: 'ACMT2020', name: 'Public Relations and Media Relations', credits: 3 },
              { id: 'ac2030', code: 'ACMT2030', name: 'Web Content Strategy & Blogging', credits: 3 },
              { id: 'ac2040', code: 'ACMT2040', name: 'Sociology of Communication Mechanics', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'ac2050', code: 'ACMT2050', name: 'Video Recording and Production Basics', credits: 3 },
              { id: 'ac2060', code: 'ACMT2060', name: 'Mass Media Ethics, Copyrights & Law', credits: 3 },
              { id: 'ac2070', code: 'ACMT2070', name: 'Sri Lankan Cultural Heritage & Media', credits: 3 },
              { id: 'ac2080', code: 'ACMT2080', name: 'Statistical Tools for Communication', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'ac3010', code: 'ACMT3010', name: 'Documentary Storytelling and Scripting', credits: 3 },
              { id: 'ac3020', code: 'ACMT3020', name: 'Advanced Graphic Design & UX Design', credits: 3 },
              { id: 'ac3030', code: 'ACMT3030', name: 'Integrated Marketing and Advertising', credits: 3 },
              { id: 'ac3040', code: 'ACMT3040', name: 'Cultural Studies and Media Performance', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'ac3050', code: 'ACMT3050', name: 'Non-Linear Video Post-Production', credits: 3 },
              { id: 'ac3060', code: 'ACMT3060', name: 'Applied Research Methodology', credits: 3 },
              { id: 'ac3070', code: 'ACMT3070', name: 'Digital Marketing & Social Media Strategy', credits: 3 },
              { id: 'ac3080', code: 'ACMT3080', name: 'Field Placement Project', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'ac4010', code: 'ACMT4010', name: 'Political Communication & Campaigns', credits: 4 },
              { id: 'ac4020', code: 'ACMT4020', name: 'Special Investigative Journalism', credits: 3 },
              { id: 'ac4030', code: 'ACMT4030', name: 'Applied Portfolio & Thesis Design I', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'ac4040', code: 'ACMT4040', name: 'Senior Media Internship', credits: 6 },
              { id: 'ac4050', code: 'ACMT4050', name: 'Applied Portfolio & Thesis Design II', credits: 4 },
            ]
          }
        ]
      },
      {
        id: 'ba-anth',
        name: 'BA (Hons) in Anthropology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'an1010', code: 'ANTH1010', name: 'Introduction to Anthropology', credits: 3 },
              { id: 'an1020', code: 'ANTH1020', name: 'Man and Environment Evolution', credits: 3 },
              { id: 'an1030', code: 'ANTH1030', name: 'Basic Academic Communication', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'an1040', code: 'ANTH1040', name: 'Social & Cultural Anthropology', credits: 3 },
              { id: 'an1050', code: 'ANTH1050', name: 'Linguistic Diversity and Identity', credits: 3 },
              { id: 'an1060', code: 'ANTH1060', name: 'Human Biology & Genetic Archetypes', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'an2010', code: 'ANTH2010', name: 'Anthropological Theory Chronicles', credits: 3 },
              { id: 'an2020', code: 'ANTH2020', name: 'Kinship, Gender and Social Structure', credits: 3 },
              { id: 'an2030', code: 'ANTH2030', name: 'Economic Systems of Tribal Societies', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'an2040', code: 'ANTH2040', name: 'Political Systems in Primitives', credits: 3 },
              { id: 'an2050', code: 'ANTH2050', name: 'Religion, Ritual & Spiritual Systems', credits: 3 },
              { id: 'an2060', code: 'ANTH2060', name: 'Visual Anthropology & Movie Review', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'an3010', code: 'ANTH3010', name: 'Ethnographic Fieldwork Methodology', credits: 4 },
              { id: 'an3020', code: 'ANTH3020', name: 'Medical Anthropology & Healing Traditions', credits: 3 },
              { id: 'an3030', code: 'ANTH3030', name: 'Anthropological Ecology and Crises', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'an3040', code: 'ANTH3040', name: 'Anthropology of Sri Lanka Indigenous Vedda', credits: 3 },
              { id: 'an3050', code: 'ANTH3050', name: 'Applied Anthropology in NGO Dev', credits: 3 },
              { id: 'an3060', code: 'ANTH3060', name: 'Academic Research Preparation Seminar', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'an4010', code: 'ANTH4010', name: 'Postmodern Anthropological Debate', credits: 4 },
              { id: 'an4020', code: 'ANTH4020', name: 'Symbolic Anthropology Paradigms', credits: 4 },
              { id: 'an4030', code: 'ANTH4030', name: 'Field monograph Synthesis part I', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'an4040', code: 'ANTH4040', name: 'Dissertation Thesis & Defence', credits: 8 },
              { id: 'an4050', code: 'ANTH4050', name: 'Contemporary Globalization Anthropologies', credits: 4 },
            ]
          }
        ]
      },
      {
        id: 'ba-arch',
        name: 'BA (Hons) in Applied Archaeology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'ar1010', code: 'ARCH1010', name: 'Introduction to Archaeology', credits: 3 },
              { id: 'ar1020', code: 'ARCH1020', name: 'Geological Methods in Civilizations', credits: 3 },
              { id: 'ar1030', code: 'ARCH1030', name: 'Ancient Civilization Chronologies', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'ar1040', code: 'ARCH1040', name: 'Archaeological Fieldwork Methods', credits: 3 },
              { id: 'ar1050', code: 'ARCH1050', name: 'Human Evolution and Paleontology Basics', credits: 3 },
              { id: 'ar1060', code: 'ARCH1060', name: 'Sri Lankan Pre-History Framework', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'ar2010', code: 'ARCH2010', name: 'Surveying and Mapping in Archeology', credits: 3 },
              { id: 'ar2020', code: 'ARCH2020', name: 'Epigraphy and Paleography Foundations', credits: 3 },
              { id: 'ar2030', code: 'ARCH2030', name: 'Numismatics (Ancient Coins & Trade)', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'ar2040', code: 'ARCH2040', name: 'Ceramic studies and Artifact Logging', credits: 3 },
              { id: 'ar2050', code: 'ARCH2050', name: 'Principles of Conservation Science', credits: 3 },
              { id: 'ar2060', code: 'ARCH2060', name: 'Buddhist Monastic Architecture Sites', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'ar3010', code: 'ARCH3010', name: 'Excavation Practicum (Field Site)', credits: 4 },
              { id: 'ar3020', code: 'ARCH3020', name: 'Physical Material Conservation Lab', credits: 3 },
              { id: 'ar3030', code: 'ARCH3030', name: 'Geo-Archaeology and Climate History', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'ar3040', code: 'ARCH3040', name: 'Cultural Heritage Management & Laws', credits: 3 },
              { id: 'ar3050', code: 'ARCH3050', name: 'Maritime Archeology on Shipwrecks', credits: 3 },
              { id: 'ar3060', code: 'ARCH3060', name: 'GIS Mapping & Spatial Archeo-Analysis', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'ar4010', code: 'ARCH4010', name: 'Advanced Museology and Public display', credits: 4 },
              { id: 'ar4020', code: 'ARCH4020', name: 'Archeological Project Management', credits: 4 },
              { id: 'ar4030', code: 'ARCH4030', name: 'Monograph Thesis Preparation Part I', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'ar4040', code: 'ARCH4040', name: 'Field Dissertation & Public Defence', credits: 8 },
              { id: 'ar4050', code: 'ARCH4050', name: 'Digital & 3D Heritage Reconstructions', credits: 4 },
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
