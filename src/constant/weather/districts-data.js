
// Mock data for districts
export const districts = [
  // Maharashtra districts (as provided)
  { id: "ahmednagar", name: "अहिल्यानगर", stateId: "maharashtra" },
  { id: "aurangabad", name: "छ. संभाजीनगर", stateId: "maharashtra" },
  { id: "pune", name: "पुणे", stateId: "maharashtra" },
  { id: "mumbai", name: "मुंबई", stateId: "maharashtra" },
  { id: "nagpur", name: "नागपूर", stateId: "maharashtra" },
  { id: "nashik", name: "नाशिक", stateId: "maharashtra" },
  { id: "thane", name: "ठाणे", stateId: "maharashtra" },
  { id: "solapur", name: "सोलापूर", stateId: "maharashtra" },
  { id: "kolhapur", name: "कोल्हापूर", stateId: "maharashtra" },
  { id: "sangli", name: "सांगली", stateId: "maharashtra" },
  { id: "satara", name: "सातारा", stateId: "maharashtra" },
  { id: "ratnagiri", name: "रत्नागिरी", stateId: "maharashtra" },
  { id: "sindhudurg", name: "सिंधुदुर्ग", stateId: "maharashtra" },
  { id: "jalgaon", name: "जळगाव", stateId: "maharashtra" },
  { id: "dhule", name: "धुळे", stateId: "maharashtra" },
  { id: "nandurbar", name: "नंदुरबार", stateId: "maharashtra" },
  { id: "beed", name: "बीड", stateId: "maharashtra" },
  { id: "osmanabad", name: "उस्मानाबाद", stateId: "maharashtra" },
  { id: "jalna", name: "जालना", stateId: "maharashtra" },
  { id: "parbhani", name: "परभणी", stateId: "maharashtra" },
  { id: "hingoli", name: "हिंगोली", stateId: "maharashtra" },
  { id: "nanded", name: "नांदेड", stateId: "maharashtra" },
  { id: "latur", name: "लातूर", stateId: "maharashtra" },
  { id: "akola", name: "अकोला", stateId: "maharashtra" },
  { id: "amravati", name: "अमरावती", stateId: "maharashtra" },
  { id: "buldhana", name: "बुलढाणा", stateId: "maharashtra" },
  { id: "washim", name: "वाशीम", stateId: "maharashtra" },
  { id: "yavatmal", name: "यवतमाळ", stateId: "maharashtra" },
  { id: "wardha", name: "वर्धा", stateId: "maharashtra" },
  { id: "chandrapur", name: "चंद्रपूर", stateId: "maharashtra" },
  { id: "gadchiroli", name: "गडचिरोली", stateId: "maharashtra" },
  { id: "bhandara", name: "भंडारा", stateId: "maharashtra" },
  { id: "gondia", name: "गोंदिया", stateId: "maharashtra" },

  // Sample districts for Andhra Pradesh
  { id: "visakhapatnam", name: "विशाखापट्टनम", stateId: "andhrapradesh" },
  { id: "krishna", name: "कृष्णा", stateId: "andhrapradesh" },
  { id: "guntur", name: "गुंटूर", stateId: "andhrapradesh" },
  { id: "east-godavari", name: "पूर्व गोदावरी", stateId: "andhrapradesh" },
  { id: "west-godavari", name: "पश्चिम गोदावरी", stateId: "andhrapradesh" },

  // Sample districts for Assam
  { id: "kamrup-metropolitan", name: "कामरूप मेट्रोपॉलिटन", stateId: "assam" },
  { id: "dibrugarh", name: "डिब्रूगढ़", stateId: "assam" },
  { id: "jorhat", name: "जोरहाट", stateId: "assam" },
  { id: "sivasagar", name: "शिवसागर", stateId: "assam" },

  // Sample districts for Bihar
  { id: "patna", name: "पटना", stateId: "bihar" },
  { id: "gaya", name: "गया", stateId: "bihar" },
  { id: "bhagalpur", name: "भागलपुर", stateId: "bihar" },
  { id: "muzaffarpur", name: "मुजफ्फरपुर", stateId: "bihar" },

  // Sample districts for Gujarat
  { id: "ahmedabad", name: "अहमदाबाद", stateId: "gujarat" },
  { id: "surat", name: "सूरत", stateId: "gujarat" },
  { id: "vadodara", name: "वडोदरा", stateId: "gujarat" },
  { id: "rajkot", name: "राजकोट", stateId: "gujarat" },

  // Sample districts for Karnataka
  { id: "bangalore-urban", name: "बेंगलुरु शहरी", stateId: "karnataka" },
  { id: "mysore", name: "मैसूर", stateId: "karnataka" },
  { id: "belgaum", name: "बेलगाम", stateId: "karnataka" },
  { id: "hubli-dharwad", name: "हुबली-धारवाड़", stateId: "karnataka" },
];

// Mock data for villages
export const villages = [];

export function getDistrictByState(stateId) {
  return districts.filter((district) => district.stateId === stateId)
}

export function getVillagesByTaluka(talukaId) {
  return villages.filter((village) => village.talukaId === talukaId)
}

export function getDistrictById(id) {
  return districts.find((district) => district.id === id)
}

export function getVillageById(id) {
  return villages.find((village) => village.id === id)
}

