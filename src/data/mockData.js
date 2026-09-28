// PlacementAI - Master Mock Dataset & Presets

export const TARGET_ROLES = [
  { id: 'swe', name: 'Software Development Engineer (SDE)', category: 'Engineering' },
  { id: 'fullstack', name: 'Full Stack Web Developer', category: 'Web Development' },
  { id: 'data_scientist', name: 'Data Scientist / AI Engineer', category: 'Data & AI' },
  { id: 'cloud_devops', name: 'Cloud & DevOps Engineer', category: 'Cloud' },
  { id: 'mobile_dev', name: 'Mobile App Developer (Flutter/React Native)', category: 'Mobile' },
  { id: 'cyber_sec', name: 'Cyber Security Analyst', category: 'Security' },
  { id: 'product_mgr', name: 'Product Manager Associate', category: 'Management' }
];

export const RESUME_TEMPLATES = [
  {
    id: 'modern_pro',
    name: 'Modern Professional',
    description: 'Clean dual-column layout with high ATS compatibility and subtle gradient accent.',
    badge: 'Popular',
    accentColor: '#6366f1'
  },
  {
    id: 'executive_clean',
    name: 'Executive Minimalist',
    description: 'Single column classic layout favored by Fortune 500 tech recruiters.',
    badge: '98% ATS Score',
    accentColor: '#10b981'
  },
  {
    id: 'tech_compact',
    name: 'Tech Compact',
    description: 'High-density layout tailored for engineers with extensive project & skill listings.',
    badge: 'Tech Standard',
    accentColor: '#06b6d4'
  },
  {
    id: 'creative_sleek',
    name: 'Creative Sleek',
    description: 'Modern typography with elegant section dividers and highlight callouts.',
    badge: 'New',
    accentColor: '#8b5cf6'
  }
];

export const INITIAL_USER_PROFILE = {
  name: 'Janvi Parmar',
  email: 'janvi.parmar@placement.ai',
  phone: '+91 98765 43210',
  location: 'Mumbai, Maharashtra, India',
  role: 'Software Development Engineer (SDE)',
  gradYear: '2026',
  college: 'Indian Institute of Technology / Technology Institute',
  cgpa: '8.9 / 10.0',
  degree: 'B.Tech in Computer Science & Engineering',
  github: 'github.com/janviparmar',
  linkedin: 'linkedin.com/in/janviparmar',
  portfolio: 'janviparmar.dev',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  level: 'Level 5 Candidate',
  readinessScore: 89,
  streakDays: 14,
  coins: 450,
  skills: ['Data Structures & Algorithms', 'Java', 'Python', 'React.js', 'Node.js', 'SQL', 'System Design', 'Git', 'Docker'],
  softSkills: ['Problem Solving', 'Team Collaboration', 'Communication', 'Adaptability', 'Time Management'],
  achievements: [
    { title: 'Top 5% Aptitude Performer', date: 'Aug 2026', badge: '🥇 Gold' },
    { title: 'TCS Digital NQT Cleared (Mock)', date: 'Jul 2026', badge: '🚀 Verified' },
    { title: 'Full Stack Project Certification', date: 'Jun 2026', badge: '📜 Certified' }
  ]
};

export const INITIAL_RESUME_DATA = {
  personalInfo: {
    fullName: 'Janvi Parmar',
    title: 'Aspiring Software Development Engineer',
    email: 'janvi.parmar@placement.ai',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    linkedin: 'linkedin.com/in/janviparmar',
    github: 'github.com/janviparmar',
    website: 'janviparmar.dev'
  },
  summary: 'Motivated Computer Science undergraduate with strong expertise in Data Structures, System Design, and Full-Stack Web Development. Proven track record of building scalable web applications and solving 300+ DSA problems. Seeking an SDE role at a top-tier tech company.',
  objective: 'To secure a challenging Software Developer position where I can leverage my problem-solving skills and full-stack technical expertise to contribute to innovative software solutions.',
  education: [
    {
      degree: 'B.Tech in Computer Science & Engineering',
      college: 'Institute of Technology & Science',
      cgpa: '8.9 / 10',
      passingYear: '2026',
      location: 'Mumbai, India'
    }
  ],
  skills: {
    technical: ['Java', 'Python', 'C++', 'JavaScript (ES6+)', 'React.js', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Git', 'Docker'],
    soft: ['Analytical Thinking', 'Problem Solving', 'Effective Communication', 'Agile Teamwork']
  },
  projects: [
    {
      title: 'PlacementAI - AI Placement Prep Suite',
      description: 'Built a real-time AI platform featuring ATS resume analysis, live code execution editor, and speech-enabled AI HR mock interview system using React and Gemini API.',
      techStack: 'React, Node.js, Web Speech API, Tailwind, Vite',
      githubLink: 'https://github.com/janvi/placement-ai',
      liveLink: 'https://placement-ai.demo'
    },
    {
      title: 'Distributed E-Commerce Microservices',
      description: 'Engineered a scalable microservices backend with JWT auth, Redis caching, and Stripe payment gateway handling 1,000+ concurrent requests.',
      techStack: 'Java Spring Boot, Docker, PostgreSQL, Redis',
      githubLink: 'https://github.com/janvi/ecommerce-backend',
      liveLink: ''
    }
  ],
  experience: [
    {
      company: 'TechCorp Solutions',
      role: 'Software Developer Intern',
      duration: 'May 2025 - Jul 2025',
      location: 'Remote',
      description: 'Optimized frontend load times by 40% through code splitting and memoization. Integrated REST APIs and automated unit tests achieving 85% test coverage.'
    }
  ],
  certifications: [
    { name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services', year: '2025', link: 'https://aws.amazon.com/verify' },
    { name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera / Meta', year: '2024', link: 'https://coursera.org/verify' }
  ]
};

export const APTITUDE_QUESTIONS = [
  {
    id: 1,
    stage: 'beginner',
    category: 'Quant',
    question: 'A train 150 meters long passes a telegraph pole in 10 seconds. What is the speed of the train in km/hr?',
    options: ['36 km/hr', '45 km/hr', '54 km/hr', '60 km/hr'],
    correct: 2,
    explanation: 'Speed = Distance / Time = 150m / 10s = 15 m/s. Converting m/s to km/hr: 15 * (18/5) = 54 km/hr.'
  },
  {
    id: 2,
    stage: 'beginner',
    category: 'Logical',
    question: 'If CAT is coded as 3120, how is DOG coded in the same alphabet numerical pattern?',
    options: ['4157', '41515', '4147', '41514'],
    correct: 0,
    explanation: 'C=3, A=1, T=20. For DOG: D=4, O=15, G=7. Hence code is 4157.'
  },
  {
    id: 3,
    stage: 'intermediate',
    category: 'Quant',
    question: 'A & B together can do a piece of work in 12 days. B alone can finish it in 30 days. In how many days can A alone complete the work?',
    options: ['18 days', '20 days', '24 days', '25 days'],
    correct: 1,
    explanation: '1/A + 1/B = 1/12. Since 1/B = 1/30, 1/A = 1/12 - 1/30 = (5-2)/60 = 3/60 = 1/20. So A alone takes 20 days.'
  },
  {
    id: 4,
    stage: 'intermediate',
    category: 'English',
    question: 'Choose the antonym of the word "EPHEMERAL":',
    options: ['Transient', 'Eternal', 'Fleeting', 'Short-lived'],
    correct: 1,
    explanation: 'Ephemeral means lasting a very short time. Its antonym is Eternal (permanent).'
  },
  {
    id: 5,
    stage: 'advanced',
    category: 'Quant',
    question: 'Two pipes X and Y can fill a tank in 20 min and 30 min respectively. A third pipe Z empties the full tank in 15 min. If all three are opened together, how long will it take to fill the tank?',
    options: ['40 min', '50 min', '60 min', 'The tank will never fill'],
    correct: 2,
    explanation: 'Net rate = 1/20 + 1/30 - 1/15 = (3 + 2 - 4)/60 = 1/60. Tank fills in 60 minutes.'
  },
  {
    id: 6,
    stage: 'advanced',
    category: 'Logical',
    question: 'In a row of 40 students, Riya is 15th from the left and Amit is 18th from the right. How many students are between Riya and Amit?',
    options: ['7', '8', '9', '10'],
    correct: 0,
    explanation: 'Riya from left = 15. Amit from right = 18 => Amit from left = (40 - 18 + 1) = 23rd. Students between = 23 - 15 - 1 = 7.'
  }
];

export const TECHNICAL_QUESTIONS = [
  {
    id: 't1',
    tech: 'Java',
    stage: 'Stage 1: Fundamentals',
    type: 'mcq',
    question: 'Which of the following is NOT a feature of Java?',
    options: ['Object-Oriented', 'Use of pointers directly', 'Platform Independent', 'Multi-threaded'],
    correct: 1,
    explanation: 'Java does not support explicit pointers directly for security and memory safety reasons.'
  },
  {
    id: 't2',
    tech: 'Java',
    stage: 'Stage 2: Intermediate',
    type: 'coding',
    title: 'Two Sum Target Problem',
    problem: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to target.',
    initialCode: `public class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        for(int i=0; i<nums.length; i++) {
            for(int j=i+1; j<nums.length; j++) {
                if(nums[i] + nums[j] == target) return new int[]{i, j};
            }
        }
        return new int[]{};
    }
}`,
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' }
    ],
    solution: 'Use a HashMap to store complements in O(N) time complexity.'
  },
  {
    id: 't3',
    tech: 'SQL',
    stage: 'Stage 1: Fundamentals',
    type: 'coding',
    title: 'Find Second Highest Salary',
    problem: 'Write a SQL query to select the 2nd highest salary from the Employee table.',
    initialCode: `SELECT MAX(salary) AS SecondHighestSalary
FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);`,
    testCases: [
      { input: 'Employee table with salaries 100, 200, 300', expected: '200' }
    ],
    solution: 'Subquery filtering out the absolute maximum salary.'
  },
  {
    id: 't4',
    tech: 'Python',
    stage: 'Stage 1: Fundamentals',
    type: 'mcq',
    question: 'What is the time complexity of looking up a key in a Python dictionary on average?',
    options: ['O(1)', 'O(N)', 'O(log N)', 'O(N^2)'],
    correct: 0,
    explanation: 'Python dictionaries are implemented using Hash Tables, offering O(1) average lookup time.'
  },
  {
    id: 't5',
    tech: 'React',
    stage: 'Stage 2: Intermediate',
    type: 'mcq',
    question: 'Which Hook is best suited for side effects such as data fetching or subscriptions in React?',
    options: ['useState', 'useMemo', 'useEffect', 'useCallback'],
    correct: 2,
    explanation: 'useEffect handles side-effects like API calls, subscriptions, and DOM updates after rendering.'
  }
];

export const COMPANY_PREP_DATA = [
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    logo: '🏢',
    tagline: 'Ninja & Digital NQT Preparation',
    aptitudePattern: 'Quantitative (26 Qs), Reasoning (24 Qs), Verbal (24 Qs) - Total 75 Mins',
    technicalPattern: 'Advanced Coding (2 Problems: 1 Easy, 1 Medium in 45 Mins)',
    hrQuestions: [
      'Why TCS over other IT product/service companies?',
      'Are you comfortable working in night shifts and relocations?',
      'Tell me about a challenging project in your college curriculum.'
    ],
    experiences: [
      { student: 'Rahul Sharma (Placed in TCS Digital)', role: 'System Engineer', package: '7.2 LPA', review: 'Focus heavily on TCS NQT aptitude speed and HashMap coding questions!' },
      { student: 'Priya Verma (Placed in TCS Ninja)', role: 'Ninja Developer', package: '3.36 LPA', review: 'HR round was very smooth, emphasize your final year project and teamwork skills.' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logo: '⚡',
    tagline: 'System Engineer & Specialist Programmer',
    aptitudePattern: 'Mathematical (15 Qs), Logical (15 Qs), Verbal (20 Qs), Pseudo-code (5 Qs), Puzzle (4 Qs)',
    technicalPattern: '3 Coding Questions for HackWithInfy / DSE roles (Greedy, Dynamic Programming)',
    hrQuestions: [
      'Tell me about your experience with Java/Python Object Oriented Programming.',
      'How do you handle conflict in a software engineering team?'
    ],
    experiences: [
      { student: 'Aniket Gupta', role: 'Specialist Programmer', package: '9.5 LPA', review: 'DP and Graph questions are common in HackWithInfy round 2!' }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logo: '🚀',
    tagline: 'Associate Software Engineer (ASE & FSE)',
    aptitudePattern: 'Cognitive & Technical Assessment (90 Mins, 90 Questions)',
    technicalPattern: 'Coding Assessment (2 Questions in 45 Mins) + Communication Assessment (20 Mins)',
    hrQuestions: [
      'Give an example of a time you learned a new technology quickly.',
      'Where do you see yourself in 3 years at Accenture?'
    ],
    experiences: [
      { student: 'Sneha Patel', role: 'ASE', package: '4.5 LPA', review: 'Communication test evaluates fluency and listening comprehension clearly.' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '📦',
    tagline: 'SDE-1 Placement Prep',
    aptitudePattern: 'Amazon Online Assessment (OA): Debugging (7 Qs), Reasoning (24 Qs), Coding (2 Qs)',
    technicalPattern: 'Data Structures, Binary Trees, Dynamic Programming, System Design basics',
    hrQuestions: [
      'Tell me about a time you demonstrated Customer Obsession.',
      'Have you ever faced a deadline conflict? How did you prioritize?'
    ],
    experiences: [
      { student: 'Vikas Mehta', role: 'SDE-1', package: '28.5 LPA', review: 'Focus deeply on Amazon Leadership Principles for the HR & Bar Raiser round!' }
    ]
  }
];

export const HR_QUESTIONS_BANK = [
  {
    id: 'hr1',
    category: 'Round 1: Common HR',
    question: 'Tell me about yourself and your technical background.',
    tips: 'Keep it structured: Present background, Education, Key Projects, Skills, and why you are excited about this role (60-90 seconds).'
  },
  {
    id: 'hr2',
    category: 'Round 1: Common HR',
    question: 'What are your greatest strengths and weaknesses?',
    tips: 'Mention a relevant technical/interpersonal strength. For weakness, choose an authentic area of improvement + what you are actively doing to overcome it.'
  },
  {
    id: 'hr3',
    category: 'Round 1: Common HR',
    question: 'Where do you see yourself in 5 years?',
    tips: 'Focus on growth, mastering software architecture, taking ownership of products, and stepping into technical lead roles.'
  },
  {
    id: 'hr4',
    category: 'Advanced HR (Role-based)',
    question: 'Describe a situation where your project code failed or hit a bug right before deadline. How did you handle it?',
    tips: 'Use the STAR method (Situation, Task, Action, Result) showcasing calm debugging under pressure.'
  }
];
