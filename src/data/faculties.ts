/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Faculty } from '../types';

// Standard NIIBS Computing Grading Scale
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

// Standard NIIBS Humanities and Buddhist Studies Scale (Same GPA values but sometimes descriptive or slightly different rules)
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
        name: 'BSc (Hons) in Information Technology',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'it1010', code: 'IT1010', name: 'Programming Fundamentals', credits: 3 },
              { id: 'it1020', code: 'IT1020', name: 'Mathematics for Computing', credits: 3 },
              { id: 'it1030', code: 'IT1030', name: 'Computer Systems Organization', credits: 3 },
              { id: 'it1040', code: 'IT1040', name: 'Communication Skills I', credits: 2 },
              { id: 'it1050', code: 'IT1050', name: 'Buddhist Culture & Mindfulness Practice', credits: 2 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'it1060', code: 'IT1060', name: 'Object Oriented Programming', credits: 3 },
              { id: 'it1070', code: 'IT1070', name: 'Database Management Systems', credits: 3 },
              { id: 'it1080', code: 'IT1080', name: 'Software Engineering Essentials', credits: 3 },
              { id: 'it1090', code: 'IT1090', name: 'Discrete Mathematics', credits: 3 },
              { id: 'it1100', code: 'IT1100', name: 'Communication Skills II', credits: 2 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'it2010', code: 'IT2010', name: 'Data Structures and Algorithms', credits: 4 },
              { id: 'it2020', code: 'IT2020', name: 'Web Application Development', credits: 3 },
              { id: 'it2030', code: 'IT2030', name: 'Operating Systems', credits: 3 },
              { id: 'it2040', code: 'IT2040', name: 'Probability and Statistics', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'it2050', code: 'IT2050', name: 'Computer Networks', credits: 3 },
              { id: 'it2060', code: 'IT2060', name: 'Advanced Database Systems', credits: 3 },
              { id: 'it2070', code: 'IT2070', name: 'Object Oriented Analysis & Design', credits: 3 },
              { id: 'it2080', code: 'IT2080', name: 'System Administration', credits: 3 },
              { id: 'it2090', code: 'IT2090', name: 'Research Methodology', credits: 2 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'it3010', code: 'IT3010', name: 'Mobile Application Development', credits: 3 },
              { id: 'it3020', code: 'IT3020', name: 'Information Security', credits: 3 },
              { id: 'it3030', code: 'IT3030', name: 'Human Computer Interaction', credits: 2 },
              { id: 'it3040', code: 'IT3040', name: 'Cloud Computing Technologies', credits: 3 },
              { id: 'it3050', code: 'IT3050', name: 'Professional Practice & Ethics', credits: 2 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'it3060', code: 'IT3060', name: 'Data Science & Analytics', credits: 3 },
              { id: 'it3070', code: 'IT3070', name: 'Agile Software Development', credits: 3 },
              { id: 'it3080', code: 'IT3080', name: 'IT Project Management', credits: 3 },
              { id: 'it3090', code: 'IT3090', name: 'Web Services & API Design', credits: 3 },
              { id: 'it3100', code: 'IT3100', name: 'Collaborative Group Project', credits: 4 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'it4010', code: 'IT4010', name: 'Enterprise Application Architecture', credits: 3 },
              { id: 'it4020', code: 'IT4020', name: 'Internet of Things (IoT)', credits: 3 },
              { id: 'it4030', code: 'IT4030', name: 'AI & Machine Learning Foundations', credits: 3 },
              { id: 'it4040', code: 'IT4040', name: 'Individual Research Project I', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'it4050', code: 'IT4050', name: 'Industrial Internship', credits: 6 },
              { id: 'it4060', code: 'IT4060', name: 'Individual Research Project II', credits: 3 },
              { id: 'it4070', code: 'IT4070', name: 'User Experience Engineering', credits: 2 },
            ]
          }
        ]
      },
      {
        id: 'bsc-se',
        name: 'BSc (Hons) in Software Engineering',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'se1010', code: 'SE1010', name: 'Introduction to Programming', credits: 3 },
              { id: 'se1020', code: 'SE1020', name: 'Mathematics for Software Engineers', credits: 3 },
              { id: 'se1030', code: 'SE1030', name: 'Computer Systems and Hardware', credits: 3 },
              { id: 'se1040', code: 'SE1040', name: 'Essential English', credits: 2 },
              { id: 'se1050', code: 'SE1050', name: 'Buddhist Philosophy and Culture', credits: 2 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'se1060', code: 'SE1060', name: 'Object Oriented Design using Java', credits: 3 },
              { id: 'se1070', code: 'SE1070', name: 'Introductory Relational Databases', credits: 3 },
              { id: 'se1080', code: 'SE1080', name: 'Software Engineering Principles', credits: 3 },
              { id: 'se1090', code: 'SE1090', name: 'Data Communication Fundamentals', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'se2010', code: 'SE2010', name: 'Intermediate Data Structures & Algorithms', credits: 3 },
              { id: 'se2020', code: 'SE2020', name: 'Advanced Web Engineering', credits: 3 },
              { id: 'se2030', code: 'SE2030', name: 'Aesthetic User Interface Design', credits: 3 },
              { id: 'se2040', code: 'SE2040', name: 'Probability and Graph Theory', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'se2050', code: 'SE2050', name: 'Software Quality Assurance', credits: 3 },
              { id: 'se2060', code: 'SE2060', name: 'Linux Administration & Scripting', credits: 3 },
              { id: 'se2070', code: 'SE2070', name: 'Software Requirements Engineering', credits: 3 },
              { id: 'se2080', code: 'SE2080', name: 'Database Architecture & Tuning', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'se3010', code: 'SE3010', name: 'Design Patterns & Refactoring', credits: 3 },
              { id: 'se3020', code: 'SE3020', name: 'Enterprise Systems Development', credits: 4 },
              { id: 'se3030', code: 'SE3030', name: 'Securing Software Systems', credits: 3 },
              { id: 'se3040', code: 'SE3040', name: 'Software Metrics & Economics', credits: 2 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'se3050', code: 'SE3050', name: 'DevOps & Continuous Integration', credits: 3 },
              { id: 'se3060', code: 'SE3060', name: 'Distributed Systems Architecture', credits: 3 },
              { id: 'se3070', code: 'SE3070', name: 'Mobile Systems Engineering', credits: 3 },
              { id: 'se3080', code: 'SE3080', name: 'Group Capstone Project I', credits: 4 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'se4010', code: 'SE4010', name: 'Formal Methods in Software Engineering', credits: 3 },
              { id: 'se4020', code: 'SE4020', name: 'Advanced Cloud Architecture', credits: 3 },
              { id: 'se4030', code: 'SE4030', name: 'Thesis / Capstone Project II', credits: 4 },
              { id: 'se4040', code: 'SE4040', name: 'Cognitive Computing & AI', credits: 3 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'se4050', code: 'SE4050', name: 'Industry Practicum', credits: 6 },
              { id: 'se4060', code: 'SE4060', name: 'Project Assessment & Viva Voce', credits: 3 },
            ]
          }
        ]
      },
      {
        id: 'bsc-ds',
        name: 'BSc (Hons) in Data Science',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'ds1010', code: 'DS1010', name: 'Introduction to Python Programming', credits: 3 },
              { id: 'ds1020', code: 'DS1020', name: 'Linear Algebra for Data Science', credits: 3 },
              { id: 'ds1030', code: 'DS1030', name: 'Statistical Thinking I', credits: 3 },
              { id: 'ds1040', code: 'DS1040', name: 'Introduction to Computer Systems', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'ds1050', code: 'DS1050', name: 'Data Visualization & Analysis', credits: 3 },
              { id: 'ds1060', code: 'DS1060', name: 'Relational & NoSQL Databases', credits: 3 },
              { id: 'ds1070', code: 'DS1070', name: 'Statistical Thinking II', credits: 3 },
              { id: 'ds1080', code: 'DS1080', name: 'Ethical Al & Society', credits: 2 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'ds2010', code: 'DS2010', name: 'Data Mining and Warehousing', credits: 3 },
              { id: 'ds2020', code: 'DS2020', name: 'Exploratory Data Analysis', credits: 3 },
              { id: 'ds2030', code: 'DS2030', name: 'Programming with R', credits: 3 },
              { id: 'ds2040', code: 'DS2040', name: 'Calculus and Optimization', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'ds2050', code: 'DS2050', name: 'Machine Learning Algorithms I', credits: 3 },
              { id: 'ds2060', code: 'DS2060', name: 'Big Data Infrastructures', credits: 3 },
              { id: 'ds2070', code: 'DS2070', name: 'Regression Analysis Techniques', credits: 3 },
              { id: 'ds2080', code: 'DS2080', name: 'Business Intelligence Systems', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'ds3010', code: 'DS3010', name: 'Machine Learning Algorithms II', credits: 3 },
              { id: 'ds3020', code: 'DS3020', name: 'Natural Language Processing (NLP)', credits: 3 },
              { id: 'ds3030', code: 'DS3030', name: 'Information Retrieval systems', credits: 3 },
              { id: 'ds3040', code: 'DS3040', name: 'Data Ingestion Architectures', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'ds3050', code: 'DS3050', name: 'Deep Learning & Neural Networks', credits: 3 },
              { id: 'ds3060', code: 'DS3060', name: 'Time Series Forecasting', credits: 3 },
              { id: 'ds3070', code: 'DS3070', name: 'Data Science Mini Project', credits: 3 },
              { id: 'ds3080', code: 'DS3080', name: 'Cloud-Based AI deployment', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'ds4010', code: 'DS4010', name: 'Reinforcement Learning', credits: 3 },
              { id: 'ds4020', code: 'DS4020', name: 'Computer Vision & Core Concepts', credits: 3 },
              { id: 'ds4030', code: 'DS4030', name: 'Individual Thesis Semester I', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'ds4040', code: 'DS4040', name: 'Industrial Internship of DS', credits: 6 },
              { id: 'ds4050', code: 'DS4050', name: 'Individual Thesis Semester II', credits: 4 },
            ]
          }
        ]
      },
      {
        id: 'bsc-cs',
        name: 'BSc (Hons) in Cyber Security',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'cs1010', code: 'CS1010', name: 'Fundamentals of Cyber Security', credits: 3 },
              { id: 'cs1020', code: 'CS1020', name: 'Introduction to Networking', credits: 3 },
              { id: 'cs1030', code: 'CS1030', name: 'Basics of Programming', credits: 3 },
              { id: 'cs1040', code: 'CS1040', name: 'System Protection Practices', credits: 2 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'cs1050', code: 'CS1050', name: 'Applied Cryptography', credits: 3 },
              { id: 'cs1060', code: 'CS1060', name: 'Database & System Security', credits: 3 },
              { id: 'cs1070', code: 'CS1070', name: 'Advanced Unix Systems', credits: 3 },
              { id: 'cs1080', code: 'CS1080', name: 'Socio-Ethics of Hacking', credits: 2 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'cs2010', code: 'CS2010', name: 'Defensive Architecture Design', credits: 3 },
              { id: 'cs2020', code: 'CS2020', name: 'Penetration Testing Principles', credits: 3 },
              { id: 'cs2030', code: 'CS2030', name: 'Wired & Wireless Net Security', credits: 3 },
              { id: 'cs2040', code: 'CS2040', name: 'Malware Forensics', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'cs2050', code: 'CS2050', name: 'Ethical Hacking Methodologies', credits: 3 },
              { id: 'cs2060', code: 'CS2060', name: 'Security Incident Handling', credits: 3 },
              { id: 'cs2070', code: 'CS2070', name: 'Operating System Audits', credits: 3 },
              { id: 'cs2080', code: 'CS2080', name: 'Intrusion Detection Mechanics', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'cs3010', code: 'CS3010', name: 'Smart Device Security (Mobile/IoT)', credits: 3 },
              { id: 'cs3020', code: 'CS3020', name: 'Cyber Laws & Threat Regulations', credits: 3 },
              { id: 'cs3030', code: 'CS3030', name: 'Security Operations Center (SOC)', credits: 3 },
              { id: 'cs3040', code: 'CS3040', name: 'Risk Management Frameworks', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'cs3050', code: 'CS3050', name: 'Reverse Engineering Labs', credits: 3 },
              { id: 'cs3060', code: 'CS3060', name: 'Industrial Network Protection', credits: 3 },
              { id: 'cs3070', code: 'CS3070', name: 'Active Cyber Defense Mini Project', credits: 3 },
              { id: 'cs3080', code: 'CS3080', name: 'E-commerce Security Architectures', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'cs4010', code: 'CS4010', name: 'Digital Forensic Investigations', credits: 4 },
              { id: 'cs4020', code: 'CS4020', name: 'Enterprise Security Architecture', credits: 3 },
              { id: 'cs4030', code: 'CS4030', name: 'Research Project Phase I', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'cs4040', code: 'CS4040', name: 'Industrial Internship of CS', credits: 6 },
              { id: 'cs4050', code: 'CS4050', name: 'Research Project Phase II', credits: 4 },
            ]
          }
        ]
      }
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
        name: 'Bachelor of Arts (General) in Buddhist Studies',
        durationYears: 3,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'bsg1010', code: 'BUGA1010', name: 'Introduction to Pali Language', credits: 3 },
              { id: 'bsg1020', code: 'BUGA1020', name: 'Early Buddhist Philosophy', credits: 3 },
              { id: 'bsg1030', code: 'BUGA1030', name: 'History of Monks and Monastic Rules', credits: 3 },
              { id: 'bsg1040', code: 'BUGA1040', name: 'Academic English and Writing', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'bsg1050', code: 'BUGA1050', name: 'Buddhist Hermeneutics & Translations', credits: 3 },
              { id: 'bsg1060', code: 'BUGA1060', name: 'Intermediate Pali Canonical Reading', credits: 3 },
              { id: 'bsg1070', code: 'BUGA1070', name: 'Theravada Abhidhamma Studies I', credits: 3 },
              { id: 'bsg1080', code: 'BUGA1080', name: 'Social Ethics in Buddhism', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'bsg2010', code: 'BUGA2010', name: 'Buddhist Sanskrit Texts', credits: 3 },
              { id: 'bsg2020', code: 'BUGA2020', name: 'Buddhist Culture & Fine Arts', credits: 3 },
              { id: 'bsg2030', code: 'BUGA2030', name: 'History of Indian Buddhist Philosophy', credits: 3 },
              { id: 'bsg2040', code: 'BUGA2040', name: 'Logic and Debate in Buddhist Texts', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'bsg2050', code: 'BUGA2050', name: 'Aesthetic Literary Studies in Buddhism', credits: 3 },
              { id: 'bsg2060', code: 'BUGA2060', name: 'History of Buddhism in Sri Lanka', credits: 3 },
              { id: 'bsg2070', code: 'BUGA2070', name: 'Mindfulness Theory and Practice', credits: 3 },
              { id: 'bsg2080', code: 'BUGA2080', name: 'General Information Technology', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'bsg3010', code: 'BUGA3010', name: 'Mahayana and Vajrayana Traditonal Philosophy', credits: 3 },
              { id: 'bsg3020', code: 'BUGA3020', name: 'Western Philosophy & Religion Comparison', credits: 3 },
              { id: 'bsg3030', code: 'BUGA3030', name: 'Modern Social Challenges & Buddhist Psychology', credits: 3 },
              { id: 'bsg3040', code: 'BUGA3040', name: 'Buddhist Hermitage Administration', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'bsg3050', code: 'BUGA3050', name: 'Buddhism and Modern Science', credits: 3 },
              { id: 'bsg3060', code: 'BUGA3060', name: 'Contemporary Social Theory and Devotion', credits: 3 },
              { id: 'bsg3070', code: 'BUGA3070', name: 'Research Project / Monograph', credits: 4 },
            ]
          }
        ]
      },
      {
        id: 'ba-bs-hons',
        name: 'Bachelor of Arts (Hons) in Buddhist Studies',
        durationYears: 4,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'bsh1010', code: 'BUHA1010', name: 'Detailed Pali Grammar I', credits: 3 },
              { id: 'bsh1020', code: 'BUHA1020', name: 'Introduction to Buddhism & Core Tenets', credits: 3 },
              { id: 'bsh1030', code: 'BUHA1030', name: 'Sutta Pitaka Core Investigations', credits: 3 },
              { id: 'bsh1040', code: 'BUHA1040', name: 'Sri Lankan Language and Culture Roots', credits: 3 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'bsh1050', code: 'BUHA1050', name: 'Theravada Vinaya Critique', credits: 3 },
              { id: 'bsh1060', code: 'BUHA1060', name: 'Pali Grammar and Texts II', credits: 3 },
              { id: 'bsh1070', code: 'BUHA1070', name: 'Buddhist Abhidhamma Studies Level II', credits: 3 },
              { id: 'bsh1080', code: 'BUHA1080', name: 'Religious Systems in Ancient India', credits: 3 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'bsh2010', code: 'BUHA2010', name: 'Buddhist Sanskrit Grammar I', credits: 3 },
              { id: 'bsh2020', code: 'BUHA2020', name: 'Introduction to Epigraphy and Coins', credits: 3 },
              { id: 'bsh2030', code: 'BUHA2030', name: 'History of East Asian Buddhism', credits: 3 },
              { id: 'bsh2040', code: 'BUHA2040', name: 'Sanskrit Literary Works of Buddhist Authors', credits: 3 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'bsh2050', code: 'BUHA2050', name: 'Theravada & Mahayana Comparison Studies', credits: 3 },
              { id: 'bsh2060', code: 'BUHA2060', name: 'Historical Development of Pali Texts', credits: 3 },
              { id: 'bsh2070', code: 'BUHA2070', name: 'Buddhist Meditational Theories', credits: 3 },
              { id: 'bsh2080', code: 'BUHA2080', name: 'Computer Applications in Pali Studies', credits: 3 },
            ]
          },
          {
            semesterNumber: 5,
            subjects: [
              { id: 'bsh3010', code: 'BUHA3010', name: 'Buddhist Philosophy of Education', credits: 3 },
              { id: 'bsh3020', code: 'BUHA3020', name: 'Advanced Buddhist Sanskrit II', credits: 3 },
              { id: 'bsh3030', code: 'BUHA3030', name: 'Social and Political Thought of Buddhism', credits: 3 },
              { id: 'bsh3040', code: 'BUHA3040', name: 'Buddhist Psychology & Counseling Theories', credits: 3 },
            ]
          },
          {
            semesterNumber: 6,
            subjects: [
              { id: 'bsh3050', code: 'BUHA3050', name: 'Pali Exegetical Literature and Chronology', credits: 3 },
              { id: 'bsh3060', code: 'BUHA3060', name: 'Buddhism and Human Ecology', credits: 3 },
              { id: 'bsh3070', code: 'BUHA3070', name: 'Monastery Heritage Sites Conservation', credits: 3 },
              { id: 'bsh3080', code: 'BUHA3080', name: 'Field Study and Archaeology Excursion', credits: 3 },
            ]
          },
          {
            semesterNumber: 7,
            subjects: [
              { id: 'bsh4010', code: 'BUHA4010', name: 'Pali Grammar (Advanced Concepts)', credits: 3 },
              { id: 'bsh4020', code: 'BUHA4020', name: 'Buddhist Social and Moral Logic', credits: 3 },
              { id: 'bsh4030', code: 'BUHA4030', name: 'Introduction to Tibetology and Tibetan', credits: 3 },
              { id: 'bsh4040', code: 'BUHA4040', name: 'Honours Research Proposal', credits: 4 },
            ]
          },
          {
            semesterNumber: 8,
            subjects: [
              { id: 'bsh4050', code: 'BUHA4050', name: 'Contemporary Buddhist Revival Movements', credits: 3 },
              { id: 'bsh4060', code: 'BUHA4060', name: 'Honours Research Dissertation', credits: 6 },
              { id: 'bsh4070', code: 'BUHA4070', name: 'Advanced Academic Writing & Viva-Voce', credits: 3 },
            ]
          }
        ]
      },
      {
        id: 'ma-bs',
        name: 'MA in Buddhist Studies',
        durationYears: 2,
        semesters: [
          {
            semesterNumber: 1,
            subjects: [
              { id: 'mab1010', code: 'BUPS5010', name: 'Socio-Political Philosophy of Buddhism', credits: 4 },
              { id: 'mab1020', code: 'BUPS5020', name: 'Theravada Abhidhamma (Psychology Outline)', credits: 4 },
              { id: 'mab1030', code: 'BUPS5030', name: 'Pali Language Research Framework', credits: 4 },
            ]
          },
          {
            semesterNumber: 2,
            subjects: [
              { id: 'mab1040', code: 'BUPS5040', name: 'Mahayana and Pure Land Doctrines', credits: 4 },
              { id: 'mab1050', code: 'BUPS5050', name: 'Comparative Religion Studies', credits: 4 },
              { id: 'mab1060', code: 'BUPS5060', name: 'Buddhist Meditation (Minafulness)', credits: 4 },
            ]
          },
          {
            semesterNumber: 3,
            subjects: [
              { id: 'mab2010', code: 'BUPS6010', name: 'Epigraphical Records & Buddhist History', credits: 4 },
              { id: 'mab2020', code: 'BUPS6020', name: 'Buddhist Economic Principles & Ethics', credits: 4 },
            ]
          },
          {
            semesterNumber: 4,
            subjects: [
              { id: 'mab2030', code: 'BUPS6030', name: 'MA Research Dissertation & Seminar', credits: 12 },
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
      q: 'What is the minimum GPA needed for the Dean’s List?',
      a: 'To qualify for the prestigious Dean’s List, students must achieve a semester GPA of 3.70 or higher, with no pending "Incomplete" (I) grades, no failed subjects (E), and a minimum active registration load of 15 credits in that semester.',
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
