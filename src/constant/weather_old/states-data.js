import { districts } from "./districts-data";

export const statesArray = {
    maharashtra: {
        id: "maharashtra",
        name: "महाराष्ट्र",
        districts: districts,
    },
    madhyaPradesh: {
        id: "madhya-pradesh",
        name: "मध्य प्रदेश",
        districts: [
            { name: "आगर-मालवा", code: "agar-malwa" },
            { name: "अलीराजपुर", code: "alirajpur" },
            { name: "अनूपपुर", code: "anuppur" },
            { name: "आसंगवाडा", code: "asangvada" },
            { name: "बैतूल", code: "baitul" },
            { name: "बुरहानपूर", code: "burhanpur" },
            { name: "छिंदवाडा", code: "chhindwara" },
            { name: "दतिया", code: "datia" },
            { name: "धार", code: "dhar" },
            { name: "धार", code: "dhar" },
            { name: "गुना", code: "guna" },
            { name: "ग्वालियर", code: "gwalior" },
            { name: "इंदौर", code: "indore" },
            { name: "झाबुआ", code: "jhabua" },
            { name: "जालौन", code: "jaloun" },
            { name: "कटनी", code: "katni" },
            { name: "खरगोन", code: "khargone" },
            { name: "खंडवा", code: "khandwa" },
            { name: "मंडला", code: "mandla" },
            { name: "मंदसौर", code: "mandsaur" },
            { name: "नर्मदाप्रसाद नर्मदा", code: "" }, // Add the correct district data
        ],
    }
}
  