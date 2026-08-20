export const IMAGES = {
  hero: 'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939854575_a435e022.jpg',
  universities: [
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939874409_ed2f3c69.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939874346_3f39353c.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939877877_316038c5.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939885114_fb4799db.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939885553_c66ec578.jpg',
  ],
  students: [
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939964789_a4a9b1c0.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939963759_76344991.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939966878_2ce63e39.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939973486_32386e25.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939972159_2ea1c51e.jpg',
  ],
  blogs: [
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773939998278_6d64c49f.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773940002360_bc2ca27f.jpg',
    'https://d64gsuwffb70l.cloudfront.net/69bc2c0e96bc12953877c1f3_1773940001451_fcb03333.jpg',
  ],
};

export interface University {
  id: string;
  name: string;
  code: string;
  city: string;
  province: string;
  description: string;
  programsCount: number;
  ranking: string;
  coverImage: string;
  contact: string;
}

export const universities: University[] = [
  { id: 'uog', name: 'University of Gujrat', code: 'UOG', city: 'Gujrat', province: 'Punjab', description: 'A leading public university in Punjab known for quality education and research.', programsCount: 72, ranking: 'W4', coverImage: IMAGES.universities[0], contact: '+92-53-3643112' },
  { id: 'pu', name: 'University of the Punjab', code: 'PU', city: 'Lahore', province: 'Punjab', description: 'The oldest and largest university in Pakistan, established in 1882.', programsCount: 120, ranking: 'W4', coverImage: IMAGES.universities[1], contact: '+92-42-99231098' },
  { id: 'nust', name: 'National University of Sciences & Technology', code: 'NUST', city: 'Islamabad', province: 'Islamabad', description: 'Pakistan\'s premier STEM university with world-class research facilities.', programsCount: 95, ranking: 'W3', coverImage: IMAGES.universities[2], contact: '+92-51-90856000' },
  { id: 'comsats', name: 'COMSATS University Islamabad', code: 'COMSATS', city: 'Islamabad', province: 'Islamabad', description: 'A leading technology university with campuses across Pakistan.', programsCount: 88, ranking: 'W4', coverImage: IMAGES.universities[3], contact: '+92-51-9247000' },
  { id: 'fast', name: 'FAST National University', code: 'FAST-NUCES', city: 'Lahore', province: 'Punjab', description: 'Pakistan\'s top computer science and IT university.', programsCount: 45, ranking: 'W4', coverImage: IMAGES.universities[4], contact: '+92-42-111128128' },
  { id: 'ku', name: 'University of Karachi', code: 'KU', city: 'Karachi', province: 'Sindh', description: 'One of the largest universities in Asia, offering diverse programs.', programsCount: 110, ranking: 'W4', coverImage: IMAGES.universities[0], contact: '+92-21-99261300' },
  { id: 'uet', name: 'University of Engineering & Technology', code: 'UET', city: 'Lahore', province: 'Punjab', description: 'Pakistan\'s premier engineering institution since 1921.', programsCount: 65, ranking: 'W3', coverImage: IMAGES.universities[1], contact: '+92-42-99029202' },
  { id: 'lums', name: 'Lahore University of Management Sciences', code: 'LUMS', city: 'Lahore', province: 'Punjab', description: 'Pakistan\'s top private university known for business and liberal arts.', programsCount: 40, ranking: 'W3', coverImage: IMAGES.universities[2], contact: '+92-42-35608000' },
  { id: 'uop', name: 'University of Peshawar', code: 'UoP', city: 'Peshawar', province: 'KPK', description: 'A historic university serving the Khyber Pakhtunkhwa region.', programsCount: 85, ranking: 'W4', coverImage: IMAGES.universities[3], contact: '+92-91-9216701' },
  { id: 'uob', name: 'University of Balochistan', code: 'UoB', city: 'Quetta', province: 'Balochistan', description: 'The premier educational institution in Balochistan province.', programsCount: 55, ranking: 'W4', coverImage: IMAGES.universities[4], contact: '+92-81-9211264' },
  { id: 'muet', name: 'Mehran University of Engineering & Technology', code: 'MUET', city: 'Jamshoro', province: 'Sindh', description: 'A leading engineering university in Sindh with strong industry ties.', programsCount: 48, ranking: 'W4', coverImage: IMAGES.universities[0], contact: '+92-22-2772250' },
  { id: 'qau', name: 'Quaid-i-Azam University', code: 'QAU', city: 'Islamabad', province: 'Islamabad', description: 'A top research university in Pakistan\'s capital city.', programsCount: 75, ranking: 'W3', coverImage: IMAGES.universities[1], contact: '+92-51-90643000' },
];

export interface Program {
  id: string;
  name: string;
  universityId: string;
  universityName: string;
  universityCode: string;
  level: 'Undergraduate' | 'Graduate' | 'PhD' | 'Diploma';
  duration: string;
  feeRange: string;
  feeMin: number;
  feeMax: number;
  city: string;
  province: string;
  category: string;
  description: string;
  requirements: string;
}

export const programs: Program[] = [
  { id: 'p1', name: 'BS Computer Science', universityId: 'fast', universityName: 'FAST National University', universityCode: 'FAST-NUCES', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 120k - 180k/semester', feeMin: 120000, feeMax: 180000, city: 'Lahore', province: 'Punjab', category: 'Computer Science', description: 'Comprehensive CS program covering algorithms, AI, and software engineering.', requirements: 'FSc Pre-Engineering/ICS with 60% marks, FAST Entry Test' },
  { id: 'p2', name: 'MBBS', universityId: 'kemu', universityName: 'King Edward Medical University', universityCode: 'KEMU', level: 'Undergraduate', duration: '5 Years', feeRange: 'PKR 80k - 150k/semester', feeMin: 80000, feeMax: 150000, city: 'Lahore', province: 'Punjab', category: 'Medical', description: 'Premier medical program producing top physicians for over a century.', requirements: 'FSc Pre-Medical with 80% marks, MDCAT' },
  { id: 'p3', name: 'MBA', universityId: 'lums', universityName: 'Lahore University of Management Sciences', universityCode: 'LUMS', level: 'Graduate', duration: '2 Years', feeRange: 'PKR 350k - 500k/semester', feeMin: 350000, feeMax: 500000, city: 'Lahore', province: 'Punjab', category: 'Business', description: 'Pakistan\'s top MBA program with global recognition and strong alumni network.', requirements: 'Bachelor\'s degree with 2.5 CGPA, GMAT/GRE, 2 years work experience' },
  { id: 'p4', name: 'BS Electrical Engineering', universityId: 'uet', universityName: 'University of Engineering & Technology', universityCode: 'UET', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 60k - 100k/semester', feeMin: 60000, feeMax: 100000, city: 'Lahore', province: 'Punjab', category: 'Engineering', description: 'Flagship engineering program with state-of-the-art labs and industry partnerships.', requirements: 'FSc Pre-Engineering with 60% marks, UET Entry Test' },
  { id: 'p5', name: 'BS Software Engineering', universityId: 'uog', universityName: 'University of Gujrat', universityCode: 'UOG', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 40k - 70k/semester', feeMin: 40000, feeMax: 70000, city: 'Gujrat', province: 'Punjab', category: 'Computer Science', description: 'Modern software engineering curriculum with focus on practical skills.', requirements: 'FSc Pre-Engineering/ICS with 50% marks, UOG Entry Test' },
  { id: 'p6', name: 'LLB', universityId: 'pu', universityName: 'University of the Punjab', universityCode: 'PU', level: 'Undergraduate', duration: '5 Years', feeRange: 'PKR 30k - 60k/semester', feeMin: 30000, feeMax: 60000, city: 'Lahore', province: 'Punjab', category: 'Law', description: 'Comprehensive law program from Pakistan\'s oldest university.', requirements: 'FSc/FA with 45% marks, PU Law Entry Test' },
  { id: 'p7', name: 'B.Arch Architecture', universityId: 'ned', universityName: 'NED University of Engineering & Technology', universityCode: 'NED', level: 'Undergraduate', duration: '5 Years', feeRange: 'PKR 70k - 120k/semester', feeMin: 70000, feeMax: 120000, city: 'Karachi', province: 'Sindh', category: 'Architecture', description: 'Top architecture program with focus on sustainable design and urban planning.', requirements: 'FSc Pre-Engineering with 60% marks, NED Entry Test, Portfolio' },
  { id: 'p8', name: 'Pharm-D', universityId: 'ku', universityName: 'University of Karachi', universityCode: 'KU', level: 'Undergraduate', duration: '5 Years', feeRange: 'PKR 50k - 90k/semester', feeMin: 50000, feeMax: 90000, city: 'Karachi', province: 'Sindh', category: 'Medical', description: 'Comprehensive pharmacy program with clinical training and research opportunities.', requirements: 'FSc Pre-Medical with 60% marks, KU Entry Test' },
  { id: 'p9', name: 'MS Data Science', universityId: 'nust', universityName: 'National University of Sciences & Technology', universityCode: 'NUST', level: 'Graduate', duration: '2 Years', feeRange: 'PKR 150k - 250k/semester', feeMin: 150000, feeMax: 250000, city: 'Islamabad', province: 'Islamabad', category: 'Computer Science', description: 'Cutting-edge data science program with industry collaborations.', requirements: 'BS in CS/IT/Math with 2.5 CGPA, GAT General, NUST Entry Test' },
  { id: 'p10', name: 'BBA', universityId: 'comsats', universityName: 'COMSATS University Islamabad', universityCode: 'COMSATS', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 80k - 130k/semester', feeMin: 80000, feeMax: 130000, city: 'Islamabad', province: 'Islamabad', category: 'Business', description: 'Business administration program with modern curriculum and entrepreneurship focus.', requirements: 'FSc/FA with 50% marks, COMSATS Entry Test' },
  { id: 'p11', name: 'BS Psychology', universityId: 'qau', universityName: 'Quaid-i-Azam University', universityCode: 'QAU', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 25k - 50k/semester', feeMin: 25000, feeMax: 50000, city: 'Islamabad', province: 'Islamabad', category: 'Arts', description: 'Leading psychology program with research opportunities and clinical training.', requirements: 'FSc/FA with 50% marks, QAU Entry Test' },
  { id: 'p12', name: 'BS Civil Engineering', universityId: 'muet', universityName: 'Mehran University of Engineering & Technology', universityCode: 'MUET', level: 'Undergraduate', duration: '4 Years', feeRange: 'PKR 35k - 65k/semester', feeMin: 35000, feeMax: 65000, city: 'Jamshoro', province: 'Sindh', category: 'Engineering', description: 'Strong civil engineering program with focus on infrastructure development.', requirements: 'FSc Pre-Engineering with 60% marks, MUET Entry Test' },
];

export interface Testimonial {
  id: string;
  name: string;
  university: string;
  photo: string;
  quote: string;
  rating: number;
  year: string;
  program: string;
}

export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Ayesha Khan', university: 'LUMS', photo: IMAGES.students[0], quote: 'StudyAdvisor made my university application process so smooth. I applied to 5 universities through one platform and got accepted into my dream school!', rating: 5, year: '2025', program: 'BBA' },
  { id: 't2', name: 'Ahmed Raza', university: 'NUST', photo: IMAGES.students[1], quote: 'The counseling service was incredible. They helped me choose the right engineering program and guided me through every step of the application.', rating: 5, year: '2025', program: 'BS Electrical Engineering' },
  { id: 't3', name: 'Fatima Malik', university: 'FAST-NUCES', photo: IMAGES.students[2], quote: 'I was confused about which CS program to choose. StudyAdvisor\'s comparison tool and expert guidance helped me make the perfect decision.', rating: 4, year: '2024', program: 'BS Computer Science' },
  { id: 't4', name: 'Hassan Ali', university: 'UET Lahore', photo: IMAGES.students[3], quote: 'Tracking all my applications from one dashboard saved me so much time and stress. The deadline reminders were a lifesaver!', rating: 5, year: '2025', program: 'BS Mechanical Engineering' },
  { id: 't5', name: 'Sana Tariq', university: 'University of Gujrat', photo: IMAGES.students[4], quote: 'As a first-generation university student, I had no idea where to start. StudyAdvisor guided me from program selection to enrollment. Forever grateful!', rating: 5, year: '2024', program: 'BS Software Engineering' },
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  { id: 'b1', title: 'Complete Guide to University Admissions in Pakistan 2026', excerpt: 'Everything you need to know about applying to universities in Pakistan - from entry tests to document requirements.', image: IMAGES.blogs[0], category: 'Admissions Guide', date: 'March 15, 2026', readTime: '8 min read', author: 'StudyAdvisor Team' },
  { id: 'b2', title: 'Top 10 In-Demand Degrees in Pakistan for 2026', excerpt: 'Discover which degrees offer the best career prospects and highest salaries in Pakistan\'s evolving job market.', image: IMAGES.blogs[1], category: 'Career Tips', date: 'March 10, 2026', readTime: '6 min read', author: 'Dr. Amna Siddiqui' },
  { id: 'b3', title: 'How to Write a Winning Personal Statement', excerpt: 'Expert tips on crafting a compelling personal statement that will make your university application stand out.', image: IMAGES.blogs[2], category: 'Application Tips', date: 'March 5, 2026', readTime: '5 min read', author: 'Hajira Ghaffar' },
];

export interface Deadline {
  id: string;
  universityName: string;
  programName: string;
  deadline: string;
  daysRemaining: number;
  urgent: boolean;
}

export const deadlines: Deadline[] = [
  { id: 'd1', universityName: 'NUST', programName: 'BS Computer Science', deadline: 'April 15, 2026', daysRemaining: 0, urgent: false },
  { id: 'd2', universityName: 'LUMS', programName: 'MBA Program', deadline: 'March 31, 2026', daysRemaining: 0, urgent: true },
  { id: 'd3', universityName: 'FAST-NUCES', programName: 'BS Software Engineering', deadline: 'April 5, 2026', daysRemaining: 0, urgent: true },
  { id: 'd4', universityName: 'UET Lahore', programName: 'BS Electrical Engineering', deadline: 'April 20, 2026', daysRemaining: 2, urgent: false },
  { id: 'd5', universityName: 'King Edward Medical', programName: 'MBBS', deadline: 'May 1, 2026', daysRemaining: 12, urgent: false },
  { id: 'd6', universityName: 'University of Gujrat', programName: 'BS Software Engineering', deadline: 'April 10, 2026', daysRemaining: 22, urgent: false },
];

export const partnerUniversities = [
  'University of Gujrat (UOG)',
  'University of the Punjab (PU)',
  'NUST (Islamabad)',
  'COMSATS University',
  'FAST-NUCES',
  'University of Karachi',
  'UET Lahore',
  'LUMS',
  'University of Peshawar',
  'University of Balochistan',
  'Mehran University (MUET)',
  'Quaid-i-Azam University (QAU)',
];

export const provinces = ['All Provinces', 'Punjab', 'Sindh', 'KPK', 'Balochistan', 'Islamabad', 'AJK', 'Gilgit-Baltistan'];
export const categories = ['All Subjects', 'Computer Science', 'Engineering', 'Medical', 'Business', 'Law', 'Arts', 'Architecture'];
export const levels = ['All Levels', 'Undergraduate', 'Graduate', 'PhD', 'Diploma'];
