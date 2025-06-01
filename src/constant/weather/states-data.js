export const statesArray = [
    { id: "andhra-pradesh", name: "आंध्र प्रदेश" },
    { id: "arunachal-pradesh", name: "अरुणाचल प्रदेश" },
    { id: "assam", name: "असम" },
    { id: "bihar", name: "बिहार" },
    { id: "chhattisgarh", name: "छत्तीसगढ़" },
    { id: "goa", name: "गोवा" },
    { id: "gujarat", name: "गुजरात" },
    { id: "haryana", name: "हरियाणा" },
    { id: "himachal-pradesh", name: "हिमाचल प्रदेश" },
    { id: "jharkhand", name: "झारखंड" },
    { id: "karnataka", name: "कर्नाटक" },
    { id: "kerala", name: "केरल" },
    { id: "madhya-pradesh", name: "मध्य प्रदेश" },
    { id: "maharashtra", name: "महाराष्ट्र" },
    { id: "manipur", name: "मणिपुर" },
    { id: "meghalaya", name: "मेघालय" },
    { id: "mizoram", name: "मिज़ोरम" },
    { id: "nagaland", name: "नागालैंड" },
    { id: "odisha", name: "ओडिशा" },
    { id: "punjab", name: "पंजाब" },
    { id: "rajasthan", name: "राजस्थान" },
    { id: "sikkim", name: "सिक्किम" },
    { id: "tamil-nadu", name: "तमिलनाडु" },
    { id: "telangana", name: "तेलंगाना" },
    { id: "tripura", name: "त्रिपुरा" },
    { id: "uttar-pradesh", name: "उत्तर प्रदेश" },
    { id: "uttarakhand", name: "उत्तराखंड" },
    { id: "west-bengal", name: "पश्चिम बंगाल" },
];

export function getStateById(id = "maharashtra") {
    return statesArray.find((state) => state.id === id)
}