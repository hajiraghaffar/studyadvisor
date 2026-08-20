// src/data/universitiesData.ts
export interface University {
  id: number;
  name: string;
  shortName: string;
  city: string;
  province: string;
  type: 'Public' | 'Private';
  ranking: number;
  imagePath: string;  // Path to image in public folder
}

export const universitiesData: University[] = [
  // Top 10 Universities
  { id: 1, name: "National University of Sciences & Technology", shortName: "NUST", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 1, imagePath: "/assets/images/universities/u1.webp" },
  { id: 2, name: "Lahore University of Management Sciences", shortName: "LUMS", city: "Lahore", province: "Punjab", type: "Private", ranking: 2,
   imagePath: "/assets/images/universities/u3.webp" },
  { id: 3, name: "University of Engineering & Technology", shortName: "UET", city: "Lahore", province: "Punjab", type: "Public", ranking: 3, imagePath: "/assets//images/universities/u4.png" },
  { id: 4, name: "University of Karachi", shortName: "KU", city: "Karachi", province: "Sindh", type: "Public", ranking: 4, imagePath: "/assets/images/universities/u5.png" },
  { id: 5, name: "FAST National University", shortName: "FAST", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 5, imagePath: "/assets/images/universities/u6.jpg" },
  { id: 6, name: "COMSATS University", shortName: "CUI", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 6, imagePath: "/assets/images/universities/u7.jpg" },
  { id: 7, name: "Pakistan Institute of Engineering & Applied Sciences", shortName: "PIEAS", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 7, imagePath: "/assets/images/universities/u8.jpg" },
  { id: 8, name: "Ghulam Ishaq Khan Institute", shortName: "GIKI", city: "Swabi", province: "KPK", type: "Private", ranking: 8, imagePath: "/assets/images/universities/u...png" },
  { id: 9, name: "NED University of Engineering & Technology", shortName: "NED", city: "Karachi", province: "Sindh", type: "Public", ranking: 9, imagePath: "/assets/images/universities/u9.jpg" },
  { id: 10, name: "University of the Punjab", shortName: "PU", city: "Lahore", province: "Punjab", type: "Public", ranking: 10, imagePath: "/assets/images/universities/u10.webp" },
  
  // Next 10 Universities
  { id: 11, name: "Quaid-i-Azam University", shortName: "QAU", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 11, imagePath: "/assets/images/universities/u11.webp" },
  { id: 12, name: "Air University", shortName: "AU", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 12, imagePath: "/assets/images/universities/u12.webp" },
  { id: 13, name: "Bahria University", shortName: "BU", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 13, imagePath: "/assets/images/universities/bahria.jpg" },
  { id: 14, name: "Government College University", shortName: "GCU", city: "Lahore", province: "Punjab", type: "Public", ranking: 14, imagePath: "/assets/images/universities/gcu.jpg" },
  { id: 15, name: "University of Agriculture", shortName: "UAF", city: "Faisalabad", province: "Punjab", type: "Public", ranking: 15, imagePath: "/assets/images/universities/uaf.jpg" },
  { id: 16, name: "University of Peshawar", shortName: "UOP", city: "Peshawar", province: "KPK", type: "Public", ranking: 16, imagePath: "/assets/images/universities/peshawar.jpg" },
  { id: 17, name: "University of Balochistan", shortName: "UOB", city: "Quetta", province: "Balochistan", type: "Public", ranking: 17, imagePath: "/assets/images/universities/balochistan.jpg" },
  { id: 18, name: "Mehran University of Engineering & Technology", shortName: "MUET", city: "Jamshoro", province: "Sindh", type: "Public", ranking: 18, imagePath: "/assets/images/universities/mehran.jpg" },
  { id: 19, name: "Institute of Business Administration", shortName: "IBA", city: "Karachi", province: "Sindh", type: "Public", ranking: 19, imagePath: "/assets/images/universities/iba.jpg" },
  { id: 20, name: "Lahore College for Women University", shortName: "LCWU", city: "Lahore", province: "Punjab", type: "Public", ranking: 20, imagePath: "/assets/images/universities/lcwu.jpg" },
  
  // 30 more universities (total 50)
  { id: 21, name: "Islamia University Bahawalpur", shortName: "IUB", city: "Bahawalpur", province: "Punjab", type: "Public", ranking: 21, imagePath: "/assets/images/universities/default.jpg" },
  { id: 22, name: "University of Sindh", shortName: "US", city: "Jamshoro", province: "Sindh", type: "Public", ranking: 22, imagePath: "/assets/images/universities/default.jpg" },
  { id: 23, name: "Abdul Wali Khan University", shortName: "AWKUM", city: "Mardan", province: "KPK", type: "Public", ranking: 23, imagePath: "/assets/images/universities/default.jpg" },
  { id: 24, name: "University of Gujrat", shortName: "UOG", city: "Gujrat", province: "Punjab", type: "Public", ranking: 24, imagePath: "/assets/images/universities/default.jpg" },
  { id: 25, name: "University of Sargodha", shortName: "UOS", city: "Sargodha", province: "Punjab", type: "Public", ranking: 25, imagePath: "/assets/images/universities/default.jpg" },
  { id: 26, name: "Hazara University", shortName: "HU", city: "Mansehra", province: "KPK", type: "Public", ranking: 26, imagePath: "/assets/images/universities/default.jpg" },
  { id: 27, name: "Shaheed Zulfiqar Ali Bhutto Institute", shortName: "SZABIST", city: "Karachi", province: "Sindh", type: "Private", ranking: 27, imagePath: "/assets/images/universities/default.jpg" },
  { id: 28, name: "Institute of Space Technology", shortName: "IST", city: "Islamabad", province: "Islamabad", type: "Public", ranking: 28, imagePath: "/assets/images/universities/default.jpg" },
  { id: 29, name: "National University of Computer & Emerging Sciences", shortName: "NUCES", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 29, imagePath: "/assets/images/universities/default.jpg" },
  { id: 30, name: "University of Veterinary & Animal Sciences", shortName: "UVAS", city: "Lahore", province: "Punjab", type: "Public", ranking: 30, imagePath: "/assets/images/universities/default.jpg" },
  { id: 31, name: "Sindh Agriculture University", shortName: "SAU", city: "Tandojam", province: "Sindh", type: "Public", ranking: 31, imagePath: "/assets/images/universities/default.jpg" },
  { id: 32, name: "Khyber Medical University", shortName: "KMU", city: "Peshawar", province: "KPK", type: "Public", ranking: 32, imagePath: "/assets/images/universities/default.jpg" },
  { id: 33, name: "Dow University of Health Sciences", shortName: "DUHS", city: "Karachi", province: "Sindh", type: "Public", ranking: 33, imagePath: "/assets/images/universities/default.jpg" },
  { id: 34, name: "Jinnah University for Women", shortName: "JUW", city: "Karachi", province: "Sindh", type: "Private", ranking: 34, imagePath: "/assets/images/universities/default.jpg" },
  { id: 35, name: "Federal Urdu University", shortName: "FUU", city: "Karachi", province: "Sindh", type: "Public", ranking: 35, imagePath: "/assets/images/universities/default.jpg" },
  { id: 36, name: "Lasbela University of Agriculture", shortName: "LUAWMS", city: "Lasbela", province: "Balochistan", type: "Public", ranking: 36, imagePath: "/assets/images/universities/default.jpg" },
  { id: 37, name: "University of Malakand", shortName: "UOM", city: "Malakand", province: "KPK", type: "Public", ranking: 37, imagePath: "/assets/images/universities/default.jpg" },
  { id: 38, name: "Shaheed Benazir Bhutto University", shortName: "SBBU", city: "Sheringal", province: "KPK", type: "Public", ranking: 38, imagePath: "/assets/images/universities/default.jpg" },
  { id: 39, name: "Bacha Khan University", shortName: "BKU", city: "Charsadda", province: "KPK", type: "Public", ranking: 39, imagePath: "/assets/images/universities/default.jpg" },
  { id: 40, name: "Karachi Institute of Economics & Technology", shortName: "KIET", city: "Karachi", province: "Sindh", type: "Private", ranking: 40, imagePath: "/assets/images/universities/default.jpg" },
  { id: 41, name: "Mohammad Ali Jinnah University", shortName: "MAJU", city: "Karachi", province: "Sindh", type: "Private", ranking: 41, imagePath: "/assets/images/universities/default.jpg" },
  { id: 42, name: "Sir Syed University of Engineering & Technology", shortName: "SSUET", city: "Karachi", province: "Sindh", type: "Private", ranking: 42, imagePath: "/assets/images/universities/default.jpg" },
  { id: 43, name: "Indus University", shortName: "IU", city: "Karachi", province: "Sindh", type: "Private", ranking: 43, imagePath: "/assets/images/universities/default.jpg" },
  { id: 44, name: "Hajvery University", shortName: "HU", city: "Lahore", province: "Punjab", type: "Private", ranking: 44, imagePath: "/assets/images/universities/default.jpg" },
  { id: 45, name: "University of Central Punjab", shortName: "UCP", city: "Lahore", province: "Punjab", type: "Private", ranking: 45, imagePath: "/assets/images/universities/default.jpg" },
  { id: 46, name: "University of Lahore", shortName: "UOL", city: "Lahore", province: "Punjab", type: "Private", ranking: 46, imagePath: "/assets/images/universities/default.jpg" },
  { id: 47, name: "University of Faisalabad", shortName: "TUF", city: "Faisalabad", province: "Punjab", type: "Private", ranking: 47, imagePath: "/assets/images/universities/default.jpg" },
  { id: 48, name: "Riphah International University", shortName: "RIU", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 48, imagePath: "/assets/images/universities/default.jpg" },
  { id: 49, name: "Capital University of Science & Technology", shortName: "CUST", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 49, imagePath: "/assets/images/universities/default.jpg" },
  { id: 50, name: "Foundation University", shortName: "FUI", city: "Islamabad", province: "Islamabad", type: "Private", ranking: 50, imagePath: "/assets/images/universities/default.jpg" },
];