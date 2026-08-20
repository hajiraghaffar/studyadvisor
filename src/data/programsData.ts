// src/data/programsData.ts
export interface Program {
  id: number;
  name: string;
  category: string;
  degree: string;
  duration: string;
  universityId: number;
  universityName: string;
  imagePath: string;
}

export const programsData: Program[] = [
  // Engineering Programs
  { id: 1, name: "Computer Science", category: "Engineering", degree: "BS", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/cs.jpg" },
  { id: 2, name: "Software Engineering", category: "Engineering", degree: "BS", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/se.jpg" },
  { id: 3, name: "Electrical Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/ee.jpg" },
  { id: 4, name: "Mechanical Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/me.jpg" },
  { id: 5, name: "Civil Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/ce.jpg" },
  
  // Business Programs
  { id: 6, name: "Business Administration", category: "Business", degree: "BBA", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/bba.jpg" },
  { id: 7, name: "Accounting & Finance", category: "Business", degree: "BS", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/af.jpg" },
  { id: 8, name: "Marketing", category: "Business", degree: "BS", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/marketing.jpg" },
  { id: 9, name: "Supply Chain Management", category: "Business", degree: "BS", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/scm.jpg" },
  
  // More programs...
  { id: 10, name: "Data Science", category: "Engineering", degree: "BS", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/ds.jpg" },
  { id: 11, name: "Artificial Intelligence", category: "Engineering", degree: "BS", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/ai.jpg" },
  { id: 12, name: "Cyber Security", category: "Engineering", degree: "BS", duration: "4 years", universityId: 1, universityName: "NUST", imagePath: "/images/programs/cs.jpg" },
  { id: 13, name: "Economics", category: "Social Sciences", degree: "BS", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/economics.jpg" },
  { id: 14, name: "Political Science", category: "Social Sciences", degree: "BA", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/political.jpg" },
  { id: 15, name: "Psychology", category: "Social Sciences", degree: "BS", duration: "4 years", universityId: 2, universityName: "LUMS", imagePath: "/images/programs/psychology.jpg" },
  
  // Add 35 more programs (total 50)
  { id: 16, name: "Chemical Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 3, universityName: "UET", imagePath: "/images/programs/default.jpg" },
  { id: 17, name: "Petroleum Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 3, universityName: "UET", imagePath: "/images/programs/default.jpg" },
  { id: 18, name: "Environmental Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 3, universityName: "UET", imagePath: "/images/programs/default.jpg" },
  { id: 19, name: "MBBS", category: "Medical", degree: "MBBS", duration: "5 years", universityId: 4, universityName: "Karachi University", imagePath: "/images/programs/medical.jpg" },
  { id: 20, name: "BDS", category: "Medical", degree: "BDS", duration: "4 years", universityId: 4, universityName: "Karachi University", imagePath: "/images/programs/dental.jpg" },
  { id: 21, name: "Pharmacy", category: "Medical", degree: "PharmD", duration: "5 years", universityId: 4, universityName: "Karachi University", imagePath: "/images/programs/pharmacy.jpg" },
  { id: 22, name: "Nursing", category: "Medical", degree: "BSN", duration: "4 years", universityId: 4, universityName: "Karachi University", imagePath: "/images/programs/nursing.jpg" },
  { id: 23, name: "Architecture", category: "Design", degree: "BArch", duration: "5 years", universityId: 3, universityName: "UET", imagePath: "/images/programs/architecture.jpg" },
  { id: 24, name: "Graphic Design", category: "Design", degree: "BDes", duration: "4 years", universityId: 5, universityName: "FAST", imagePath: "/images/programs/design.jpg" },
  { id: 25, name: "Game Development", category: "Engineering", degree: "BS", duration: "4 years", universityId: 5, universityName: "FAST", imagePath: "/images/programs/game.jpg" },
  { id: 26, name: "Telecommunication", category: "Engineering", degree: "BE", duration: "4 years", universityId: 6, universityName: "COMSATS", imagePath: "/images/programs/default.jpg" },
  { id: 27, name: "Biotechnology", category: "Sciences", degree: "BS", duration: "4 years", universityId: 6, universityName: "COMSATS", imagePath: "/images/programs/biotech.jpg" },
  { id: 28, name: "Mathematics", category: "Sciences", degree: "BS", duration: "4 years", universityId: 7, universityName: "PIEAS", imagePath: "/images/programs/math.jpg" },
  { id: 29, name: "Physics", category: "Sciences", degree: "BS", duration: "4 years", universityId: 7, universityName: "PIEAS", imagePath: "/images/programs/physics.jpg" },
  { id: 30, name: "Chemistry", category: "Sciences", degree: "BS", duration: "4 years", universityId: 7, universityName: "PIEAS", imagePath: "/images/programs/chemistry.jpg" },
  { id: 31, name: "Robotics", category: "Engineering", degree: "BS", duration: "4 years", universityId: 8, universityName: "GIKI", imagePath: "/images/programs/robotics.jpg" },
  { id: 32, name: "Nanotechnology", category: "Engineering", degree: "BS", duration: "4 years", universityId: 8, universityName: "GIKI", imagePath: "/images/programs/default.jpg" },
  { id: 33, name: "Urban Planning", category: "Design", degree: "BS", duration: "4 years", universityId: 9, universityName: "NED", imagePath: "/images/programs/default.jpg" },
  { id: 34, name: "English Literature", category: "Arts", degree: "BA", duration: "4 years", universityId: 10, universityName: "Punjab University", imagePath: "/images/programs/english.jpg" },
  { id: 35, name: "History", category: "Arts", degree: "BA", duration: "4 years", universityId: 10, universityName: "Punjab University", imagePath: "/images/programs/history.jpg" },
  { id: 36, name: "Sociology", category: "Social Sciences", degree: "BS", duration: "4 years", universityId: 10, universityName: "Punjab University", imagePath: "/images/programs/sociology.jpg" },
  { id: 37, name: "International Relations", category: "Social Sciences", degree: "BS", duration: "4 years", universityId: 11, universityName: "QAU", imagePath: "/images/programs/ir.jpg" },
  { id: 38, name: "Aerospace Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 12, universityName: "Air University", imagePath: "/images/programs/aerospace.jpg" },
  { id: 39, name: "Aviation Management", category: "Business", degree: "BS", duration: "4 years", universityId: 12, universityName: "Air University", imagePath: "/images/programs/default.jpg" },
  { id: 40, name: "Marine Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 18, universityName: "MUET", imagePath: "/images/programs/marine.jpg" },
  { id: 41, name: "Petroleum & Gas Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 18, universityName: "MUET", imagePath: "/images/programs/default.jpg" },
  { id: 42, name: "Textile Engineering", category: "Engineering", degree: "BE", duration: "4 years", universityId: 14, universityName: "GCU", imagePath: "/images/programs/textile.jpg" },
  { id: 43, name: "Food Science", category: "Sciences", degree: "BS", duration: "4 years", universityId: 15, universityName: "UAF", imagePath: "/images/programs/food.jpg" },
  { id: 44, name: "Agriculture", category: "Sciences", degree: "BS", duration: "4 years", universityId: 15, universityName: "UAF", imagePath: "/images/programs/agriculture.jpg" },
  { id: 45, name: "Forestry", category: "Sciences", degree: "BS", duration: "4 years", universityId: 15, universityName: "UAF", imagePath: "/images/programs/forestry.jpg" },
  { id: 46, name: "Veterinary Medicine", category: "Medical", degree: "DVM", duration: "5 years", universityId: 30, universityName: "UVAS", imagePath: "/images/programs/veterinary.jpg" },
  { id: 47, name: "Media Studies", category: "Arts", degree: "BS", duration: "4 years", universityId: 19, universityName: "IBA", imagePath: "/images/programs/media.jpg" },
  { id: 48, name: "Film Production", category: "Arts", degree: "BFA", duration: "4 years", universityId: 5, universityName: "FAST", imagePath: "/images/programs/film.jpg" },
  { id: 49, name: "Animation", category: "Design", degree: "BFA", duration: "4 years", universityId: 5, universityName: "FAST", imagePath: "/images/programs/animation.jpg" },
  { id: 50, name: "Fashion Design", category: "Design", degree: "BDes", duration: "4 years", universityId: 14, universityName: "GCU", imagePath: "/images/programs/fashion.jpg" },
];