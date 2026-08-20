// src/data/imageMapping.js
// Maps university names to frontend images

export const universityImages = {
  // Map by short name
  "NUST": "/images/universities/nust.jpg",
  "LUMS": "/images/universities/lums.jpg",
  "UET": "/images/universities/uet.jpg",
  "KU": "/images/universities/ku.jpg",
  "FAST": "/images/universities/fast.jpg",
  "COMSATS": "/images/universities/comsats.jpg",
  "PIEAS": "/images/universities/pieas.jpg",
  "GIKI": "/images/universities/giki.jpg",
  "NED": "/images/universities/ned.jpg",
  "PU": "/images/universities/pu.jpg",
  "QAU": "/images/universities/qau.jpg",
  "AU": "/images/universities/au.jpg",
  
  // Default image
  "default": "/images/universities/default.jpg"
};

export const programImages = {
  "Computer Science": "/images/programs/cs.jpg",
  "Engineering": "/images/programs/engineering.jpg",
  "Business Administration": "/images/programs/business.jpg",
  "Medical": "/images/programs/medical.jpg",
  "Law": "/images/programs/law.jpg",
  "Arts": "/images/programs/arts.jpg",
  "default": "/images/programs/default.jpg"
};

// Helper function to get university image
export const getUniversityImage = (university) => {
  if (!university) return universityImages.default;
  
  // Try by short name
  if (university.shortName && universityImages[university.shortName]) {
    return universityImages[university.shortName];
  }
  // Try by name
  if (university.name && universityImages[university.name]) {
    return universityImages[university.name];
  }
  return universityImages.default;
};

// Helper function to get program image
export const getProgramImage = (program) => {
  if (!program) return programImages.default;
  
  if (program.name && programImages[program.name]) {
    return programImages[program.name];
  }
  return programImages.default;
};