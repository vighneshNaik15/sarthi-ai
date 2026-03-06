import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

// ── Palette & Tokens ──────────────────────────────────────────────────────────
const C = {
  saffron: "#FF6B2B",
  saffronLight: "#FFF0E8",
  saffronMid: "#FFD5BE",
  green: "#138808",
  greenLight: "#E8F5E9",
  navy: "#1A2B5E",
  navyLight: "#EEF1F9",
  gold: "#F0A500",
  goldLight: "#FFF8E1",
  white: "#FFFFFF",
  offWhite: "#F8F7F4",
  slate: "#6B7280",
  slateLight: "#F3F4F6",
  red: "#DC2626",
  redLight: "#FEF2F2",
};

// ── Translations ───────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle: "Vidya AI",
    appSubtitle: "Rural Academic Empowerment Platform",
    disclaimer: "DEMO ONLY – For AI for Bharat Hackathon. Not official academic advice.",
    steps: ["Profile", "AI Guidance", "Courses", "Scholarships", "Internships", "Roadmap"],
    profile: {
      title: "Tell us about yourself",
      name: "Your Name",
      namePh: "Enter your name",
      education: "Current Education Level",
      stream: "Stream / Subject",
      goal: "Career Goal",
      interests: "Your Interests (select all that apply)",
      village: "Village / District",
      villagePh: "e.g. Nashik, Amravati",
      start: "Get My Personalized Guidance →",
      analyzing: "Analyzing your profile with AI...",
      ruralContext: "Considering rural India opportunities...",
    },
    educLevels: ["Class 8–10", "Class 11–12", "Diploma / ITI", "Undergraduate", "Postgraduate"],
    streams: ["Science (PCM)", "Science (PCB)", "Commerce", "Arts / Humanities", "Agriculture", "Vocational / ITI"],
    goals: ["Engineering", "Medicine", "Government Job", "Farming / Agri-tech", "Business / Startup", "Teaching", "Arts / Design", "Not sure yet"],
    interests: ["Technology", "Agriculture", "Healthcare", "Business", "Creative Arts", "Sports", "Social Work", "Environment"],
    guidance: {
      title: "Your AI Study Guidance",
      studyPlan: "Personalized Study Plan",
      strengths: "Your Strengths to Build On",
      focus: "Priority Focus Areas",
      daily: "Suggested Daily Routine",
    },
    courses: {
      title: "Recommended Free Courses",
      subtitle: "Curated for your goal & location",
      free: "FREE",
      hours: "hrs",
    },
    scholarships: {
      title: "Scholarships You May Qualify For",
      eligible: "Likely Eligible",
      check: "Check Eligibility",
      amount: "Up to ₹",
    },
    internships: {
      title: "Startup Internship Matches",
      subtitle: "Student-to-Startup Connections",
      apply: "Express Interest",
      stipend: "Stipend: ₹",
      remote: "Remote",
      hybrid: "Hybrid",
    },
    roadmap: {
      title: "Your 12-Month Learning Roadmap",
      month: "Month",
      milestone: "Milestone",
      restart: "Start New Profile",
    },
    next: "Next Step →",
    back: "← Back",
  },
  hi: {
    appTitle: "विद्या AI",
    appSubtitle: "ग्रामीण शैक्षणिक सशक्तिकरण मंच",
    disclaimer: "केवल डेमो – AI for Bharat हैकाथॉन के लिए। यह आधिकारिक शैक्षणिक सलाह नहीं है।",
    steps: ["प्रोफाइल", "AI मार्गदर्शन", "कोर्स", "छात्रवृत्ति", "इंटर्नशिप", "रोडमैप"],
    profile: {
      title: "अपने बारे में बताएं",
      name: "आपका नाम",
      namePh: "अपना नाम दर्ज करें",
      education: "वर्तमान शिक्षा स्तर",
      stream: "विषय / स्ट्रीम",
      goal: "करियर लक्ष्य",
      interests: "आपकी रुचियाँ (सभी चुनें जो लागू हों)",
      village: "गाँव / जिला",
      villagePh: "जैसे नागपुर, पुणे",
      start: "मेरा मार्गदर्शन पाएं →",
      analyzing: "AI आपकी प्रोफाइल का विश्लेषण कर रही है...",
      ruralContext: "ग्रामीण भारत के अवसर देख रहे हैं...",
    },
    educLevels: ["कक्षा 8–10", "कक्षा 11–12", "डिप्लोमा / आईटीआई", "स्नातक", "स्नातकोत्तर"],
    streams: ["विज्ञान (PCM)", "विज्ञान (PCB)", "वाणिज्य", "कला / मानविकी", "कृषि", "व्यावसायिक / आईटीआई"],
    goals: ["इंजीनियरिंग", "चिकित्सा", "सरकारी नौकरी", "कृषि / एग्री-टेक", "व्यवसाय / स्टार्टअप", "शिक्षण", "कला / डिजाइन", "अभी तय नहीं"],
    interests: ["तकनीक", "कृषि", "स्वास्थ्य", "व्यवसाय", "रचनात्मक कला", "खेल", "सामाजिक कार्य", "पर्यावरण"],
    guidance: {
      title: "आपका AI अध्ययन मार्गदर्शन",
      studyPlan: "व्यक्तिगत अध्ययन योजना",
      strengths: "आपकी शक्तियाँ",
      focus: "प्राथमिक फोकस क्षेत्र",
      daily: "दैनिक दिनचर्या सुझाव",
    },
    courses: {
      title: "अनुशंसित मुफ्त कोर्स",
      subtitle: "आपके लक्ष्य के लिए चुने गए",
      free: "मुफ्त",
      hours: "घंटे",
    },
    scholarships: {
      title: "आपके लिए उपयुक्त छात्रवृत्तियाँ",
      eligible: "संभवतः पात्र",
      check: "पात्रता जाँचें",
      amount: "₹ तक",
    },
    internships: {
      title: "स्टार्टअप इंटर्नशिप मैच",
      subtitle: "छात्र-स्टार्टअप कनेक्शन",
      apply: "रुचि दर्ज करें",
      stipend: "वजीफा: ₹",
      remote: "दूरस्थ",
      hybrid: "हाइब्रिड",
    },
    roadmap: {
      title: "आपका 12 महीने का रोडमैप",
      month: "महीना",
      milestone: "मील का पत्थर",
      restart: "नई प्रोफाइल शुरू करें",
    },
    next: "अगला →",
    back: "← वापस",
  },
  mr: {
    appTitle: "विद्या AI",
    appSubtitle: "ग्रामीण शैक्षणिक सक्षमीकरण व्यासपीठ",
    disclaimer: "केवल डेमो – AI for Bharat हॅकाथॉनसाठी. अधिकृत शैक्षणिक सल्ला नाही.",
    steps: ["प्रोफाइल", "AI मार्गदर्शन", "अभ्यासक्रम", "शिष्यवृत्ती", "इंटर्नशिप", "रोडमॅप"],
    profile: {
      title: "तुमच्याबद्दल सांगा",
      name: "तुमचे नाव",
      namePh: "नाव टाका",
      education: "सध्याचे शिक्षण स्तर",
      stream: "विषय / शाखा",
      goal: "करिअर ध्येय",
      interests: "तुमच्या आवडी (सर्व निवडा)",
      village: "गाव / जिल्हा",
      villagePh: "उदा. नाशिक, अमरावती",
      start: "माझे मार्गदर्शन मिळवा →",
      analyzing: "AI तुमची प्रोफाइल तपासत आहे...",
      ruralContext: "ग्रामीण महाराष्ट्राच्या संधी पाहत आहे...",
    },
    educLevels: ["इयत्ता 8–10", "इयत्ता 11–12", "डिप्लोमा / आयटीआय", "पदवी", "पदव्युत्तर"],
    streams: ["विज्ञान (PCM)", "विज्ञान (PCB)", "वाणिज्य", "कला / मानवता", "शेती", "व्यावसायिक / आयटीआय"],
    goals: ["अभियांत्रिकी", "वैद्यकीय", "सरकारी नोकरी", "शेती / एग्री-टेक", "व्यवसाय / स्टार्टअप", "शिक्षण", "कला / डिझाइन", "अजून ठरवले नाही"],
    interests: ["तंत्रज्ञान", "शेती", "आरोग्य", "व्यवसाय", "सृजनशील कला", "खेळ", "सामाजिक कार्य", "पर्यावरण"],
    guidance: {
      title: "तुमचे AI अभ्यास मार्गदर्शन",
      studyPlan: "वैयक्तिक अभ्यास योजना",
      strengths: "तुमची बलस्थाने",
      focus: "प्राधान्य फोकस क्षेत्रे",
      daily: "दैनंदिन दिनचर्या सूचना",
    },
    courses: {
      title: "शिफारस केलेले मोफत अभ्यासक्रम",
      subtitle: "तुमच्या ध्येयासाठी निवडलेले",
      free: "मोफत",
      hours: "तास",
    },
    scholarships: {
      title: "तुम्हाला मिळू शकणाऱ्या शिष्यवृत्ती",
      eligible: "बहुधा पात्र",
      check: "पात्रता तपासा",
      amount: "₹ पर्यंत",
    },
    internships: {
      title: "स्टार्टअप इंटर्नशिप जुळणी",
      subtitle: "विद्यार्थी-स्टार्टअप कनेक्शन",
      apply: "स्वारस्य नोंदवा",
      stipend: "विद्यावेतन: ₹",
      remote: "दूरस्थ",
      hybrid: "हायब्रिड",
    },
    roadmap: {
      title: "तुमचा 12 महिन्यांचा रोडमॅप",
      month: "महिना",
      milestone: "मैलाचा दगड",
      restart: "नवीन प्रोफाइल सुरू करा",
    },
    next: "पुढे →",
    back: "← मागे",
  },
};

// ── Static Data ───────────────────────────────────────────────────────────────
const COURSES = [
  { title: "NPTEL: Programming in Python", platform: "NPTEL / Swayam", hours: 40, tag: "Technology", cert: true },
  { title: "Digital Agriculture Fundamentals", platform: "eNAM / ICAR", hours: 20, tag: "Agriculture", cert: true },
  { title: "Spoken English for Rural Youth", platform: "IGNOU Open", hours: 15, tag: "Communication", cert: false },
  { title: "Basic Accounting & GST", platform: "Tally Education", hours: 30, tag: "Business", cert: true },
  { title: "Govt Scheme Awareness Course", platform: "DigiLocker Academy", hours: 10, tag: "Civics", cert: false },
  { title: "Entrepreneurship for Bharat", platform: "Startup India", hours: 25, tag: "Business", cert: true },
];

const SCHOLARSHIPS = [
  { name: "PM YASASVI Scholarship", amount: "1,25,000", ministry: "Ministry of Social Justice", deadline: "Sep 2025", criteria: "OBC/EBC, income < ₹2.5L" },
  { name: "NSP – State Merit Scholarship", amount: "36,000", ministry: "National Scholarship Portal", deadline: "Nov 2025", criteria: "Merit + Income based" },
  { name: "Pragati Scholarship (Girls)", amount: "50,000", ministry: "AICTE", deadline: "Oct 2025", criteria: "Female, Diploma/Degree, 1st year" },
  { name: "Ishan Uday (NE States)", amount: "54,000", ministry: "UGC", deadline: "Dec 2025", criteria: "NE state domicile, UG student" },
];

const INTERNSHIPS = [
  { startup: "KrishiTech Solutions", role: "Agri-Data Intern", stipend: "5,000", mode: "Remote", skills: ["Excel", "Basic Python"], domain: "Agriculture" },
  { startup: "RuralMed App", role: "Community Health Intern", stipend: "4,000", mode: "Hybrid", skills: ["Data Entry", "Communication"], domain: "Healthcare" },
  { startup: "GramUdyog Mart", role: "Digital Marketing Intern", stipend: "6,000", mode: "Remote", skills: ["Social Media", "Canva"], domain: "Business" },
  { startup: "EduSaathi", role: "Content Intern (Hindi/Marathi)", stipend: "3,500", mode: "Remote", skills: ["Writing", "Research"], domain: "Education" },
];

const ROADMAP = [
  { months: "1–2", milestone: "Complete profile & identify skill gaps. Enroll in 1 free NPTEL course." },
  { months: "3–4", milestone: "Finish first course. Apply for 2 scholarships via NSP portal." },
  { months: "5–6", milestone: "Start internship application. Practice communication daily (30 min)." },
  { months: "7–8", milestone: "Mid-year review. Update resume. Connect with startup mentor." },
  { months: "9–10", milestone: "Complete internship / project. Document learnings for portfolio." },
  { months: "11–12", milestone: "Apply to next level education / job. Refer a friend to Vidya AI." },
];

// ── Gemini AI Call ─────────────────────────────────────────────────────────────
async function getPersonalizedGuidance(profile) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are an expert Indian academic counselor helping rural students. A student has this profile:

Name: ${profile.name}
Education: ${profile.education}
Stream: ${profile.stream}
Career Goal: ${profile.goal}
Interests: ${profile.interests.join(", ")}
Location: ${profile.village}

Give personalized study guidance. Return ONLY valid JSON (no markdown):
{
  "studyPlan": "2-3 sentences of personalized study advice specific to their goal and rural context",
  "strengths": ["strength 1", "strength 2", "strength 3"],
  "focusAreas": ["focus area 1 with brief tip", "focus area 2 with brief tip", "focus area 3 with brief tip"],
  "dailyRoutine": ["Morning: specific task (1hr)", "Afternoon: specific task (1hr)", "Evening: specific task (30min)"],
  "motivationalNote": "One encouraging sentence in the context of rural India achieving dreams"
}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content.map(b => b.text || "").join("");
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

// ── Sub-components ─────────────────────────────────────────────────────────────
function StepDot({ label, idx, currentIdx }) {
  const done = currentIdx > idx;
  const active = currentIdx === idx;
  return (
    <div className="flex flex-col items-center">
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: done ? C.green : active ? C.saffron : C.slateLight,
        color: done || active ? C.white : C.slate,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontWeight: 700, fontSize: 13,
        boxShadow: active ? `0 0 0 4px ${C.saffronMid}` : "none",
        transition: "all 0.3s",
      }}>
        {done ? "✓" : idx + 1}
      </div>
      <span style={{ fontSize: 9, marginTop: 4, color: active ? C.saffron : C.slate, fontWeight: active ? 700 : 400, whiteSpace: "nowrap" }}>
        {label}
      </span>
    </div>
  );
}

function Card({ children, style = {} }) {
  return (
    <div style={{
      background: C.white,
      borderRadius: 20,
      boxShadow: "0 4px 24px rgba(26,43,94,0.08)",
      border: `1px solid ${C.navyLight}`,
      overflow: "hidden",
      ...style
    }}>
      {children}
    </div>
  );
}

function Badge({ text, color = C.saffron, bg = C.saffronLight }) {
  return (
    <span style={{ background: bg, color, fontSize: 11, fontWeight: 700, padding: "2px 10px", borderRadius: 20 }}>
      {text}
    </span>
  );
}

function Btn({ children, onClick, disabled, outline, full, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      padding: "13px 28px",
      borderRadius: 14,
      fontWeight: 700, fontSize: 15,
      cursor: disabled ? "not-allowed" : "pointer",
      background: outline ? C.white : disabled ? C.slateLight : C.saffron,
      color: outline ? C.saffron : disabled ? C.slate : C.white,
      border: outline ? `2px solid ${C.saffron}` : "none",
      width: full ? "100%" : "auto",
      opacity: disabled ? 0.6 : 1,
      transition: "all 0.2s",
      boxShadow: !outline && !disabled ? "0 4px 14px rgba(255,107,43,0.3)" : "none",
      ...style
    }}>
      {children}
    </button>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function VidyaAI() {
  const [lang, setLang] = useState("en");
  const t = T[lang];
  const STEPS = t.steps;
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "", education: "", stream: "", goal: "", interests: [], village: ""
  });
  const [aiResult, setAiResult] = useState(null);

  const toggleInterest = (item) => {
    setProfile(p => ({
      ...p,
      interests: p.interests.includes(item) ? p.interests.filter(x => x !== item) : [...p.interests, item]
    }));
  };

  const handleStart = async () => {
    setLoading(true);
    setStep(1);
    try {
      const result = await getPersonalizedGuidance(profile);
      setAiResult(result);
      setStep(2); // move to courses after getting AI result
    } catch (e) {
      console.error(e);
      setAiResult({
        studyPlan: `As a ${profile.education} student aiming for ${profile.goal}, focus on building strong fundamentals. Use free resources like NPTEL and Swayam daily. Rural students have unique resilience — use that!`,
        strengths: ["Determination", "Practical thinking", "Community awareness"],
        focusAreas: ["Build core subject basics first", "Learn one digital skill (Excel / Python)", "Practice spoken English 30 min/day"],
        dailyRoutine: ["Morning: Study core subjects (2hrs)", "Afternoon: Online course (1hr)", "Evening: Revision + practice (1hr)"],
        motivationalNote: "Every great Indian success story started from a village. Your journey starts today."
      });
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const canStart = profile.name && profile.education && profile.stream && profile.goal;

  return (
    <div style={{ minHeight: "100vh", background: C.offWhite, fontFamily: "'Noto Sans', 'Hind', sans-serif", paddingBottom: 80 }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700;900&family=Hind:wght@400;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input, select, textarea { font-family: inherit; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.saffronMid}; border-radius: 2px; }
      `}</style>

      {/* ── Header ── */}
      <header style={{
        background: C.white,
        borderBottom: `3px solid ${C.saffron}`,
        position: "sticky", top: 0, zIndex: 50,
        padding: "12px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 2px 16px rgba(255,107,43,0.1)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 12,
            background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20, boxShadow: "0 4px 12px rgba(255,107,43,0.3)"
          }}>
            🎓
          </div>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18, color: C.navy, letterSpacing: -0.5 }}>{t.appTitle}</div>
            <div style={{ fontSize: 10, color: C.slate }}>{t.appSubtitle}</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {["en", "hi", "mr"].map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: "5px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, cursor: "pointer",
              background: lang === l ? C.navy : C.navyLight,
              color: lang === l ? C.white : C.navy,
              border: "none", transition: "all 0.2s"
            }}>
              {l === "en" ? "EN" : l === "hi" ? "हिं" : "म"}
            </button>
          ))}
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div style={{ background: C.white, padding: "20px 16px 28px", borderBottom: `1px solid ${C.navyLight}`, overflowX: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minWidth: "max-content", margin: "0 auto" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <StepDot label={s} idx={i} currentIdx={step === 0 ? 0 : step === 1 ? 1 : step} />
              {i < STEPS.length - 1 && (
                <div style={{ width: 28, height: 2, background: step > i ? C.green : C.slateLight, margin: "0 2px", marginBottom: 16, transition: "background 0.3s" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <main style={{ maxWidth: 640, margin: "0 auto", padding: "24px 16px" }}>
        <AnimatePresence mode="wait">
          {/* ── Step 0: Profile ── */}
          {step === 0 && (
            <motion.div key="profile" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card>
                <div style={{ padding: "20px 24px", background: `linear-gradient(135deg, ${C.navy}, #2A4080)`, color: C.white }}>
                  <h2 style={{ fontSize: 20, fontWeight: 800 }}>✏️ {t.profile.title}</h2>
                </div>
                <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 18 }}>
                  <div>
                    <label style={lblStyle}>{t.profile.name}</label>
                    <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                      placeholder={t.profile.namePh} style={inputStyle} />
                  </div>
                  <div>
                    <label style={lblStyle}>{t.profile.village}</label>
                    <input value={profile.village} onChange={e => setProfile({ ...profile, village: e.target.value })}
                      placeholder={t.profile.villagePh} style={inputStyle} />
                  </div>
                  <div>
                    <label style={lblStyle}>{t.profile.education}</label>
                    <select value={profile.education} onChange={e => setProfile({ ...profile, education: e.target.value })} style={inputStyle}>
                      <option value="">-- Select --</option>
                      {t.educLevels.map(l => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lblStyle}>{t.profile.stream}</label>
                    <select value={profile.stream} onChange={e => setProfile({ ...profile, stream: e.target.value })} style={inputStyle}>
                      <option value="">-- Select --</option>
                      {t.streams.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lblStyle}>{t.profile.goal}</label>
                    <select value={profile.goal} onChange={e => setProfile({ ...profile, goal: e.target.value })} style={inputStyle}>
                      <option value="">-- Select --</option>
                      {t.goals.map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lblStyle}>{t.profile.interests}</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 6 }}>
                      {t.interests.map(item => {
                        const sel = profile.interests.includes(item);
                        return (
                          <button key={item} onClick={() => toggleInterest(item)} style={{
                            padding: "7px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: "pointer",
                            background: sel ? C.saffron : C.saffronLight,
                            color: sel ? C.white : C.saffron,
                            border: `2px solid ${sel ? C.saffron : C.saffronMid}`,
                            transition: "all 0.15s"
                          }}>
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <Btn onClick={handleStart} disabled={!canStart} full>{t.profile.start}</Btn>
                </div>
              </Card>
            </motion.div>
          )}

          {/* ── Step 1: Loading ── */}
          {step === 1 && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", gap: 24 }}>
              <div style={{ position: "relative", width: 96, height: 96 }}>
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "50%",
                  border: `4px solid ${C.saffronLight}`,
                  borderTopColor: C.saffron,
                  animation: "spin 1s linear infinite"
                }} />
                <div style={{ position: "absolute", inset: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>
                  🎓
                </div>
              </div>
              <p style={{ fontSize: 20, fontWeight: 700, color: C.navy }}>{t.profile.analyzing}</p>
              <p style={{ fontSize: 14, color: C.slate }}>{t.profile.ruralContext}</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); }}`}</style>
            </motion.div>
          )}

          {/* ── Step 2: AI Guidance ── */}
          {step === 2 && aiResult && (
            <motion.div key="guidance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card>
                <div style={{ padding: "18px 22px", background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`, color: C.white }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>✨ {t.guidance.title}</h2>
                  <p style={{ fontSize: 13, opacity: 0.9, marginTop: 4 }}>Hi {profile.name}! Here's your personal plan.</p>
                </div>
                <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ padding: 16, background: C.navyLight, borderRadius: 14, borderLeft: `4px solid ${C.navy}` }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
                      {t.guidance.studyPlan}
                    </h3>
                    <p style={{ fontSize: 14, color: "#2D3748", lineHeight: 1.7 }}>{aiResult.studyPlan}</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.guidance.strengths}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {aiResult.strengths.map((s, i) => <Badge key={i} text={`💪 ${s}`} />)}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.guidance.focus}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {aiResult.focusAreas.map((f, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 14px", background: C.greenLight, borderRadius: 12 }}>
                          <span style={{ color: C.green, fontWeight: 800, fontSize: 16 }}>→</span>
                          <span style={{ fontSize: 14, color: "#1a3a1a" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.guidance.daily}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {aiResult.dailyRoutine.map((r, i) => (
                        <div key={i} style={{ display: "flex", gap: 10, padding: "10px 14px", background: C.goldLight, borderRadius: 12, alignItems: "center" }}>
                          <span style={{ fontSize: 16 }}>{["🌅", "🌞", "🌙"][i] || "📌"}</span>
                          <span style={{ fontSize: 13, color: "#5a3e00" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {aiResult.motivationalNote && (
                    <div style={{ padding: 16, background: C.navy, borderRadius: 14, textAlign: "center" }}>
                      <p style={{ fontSize: 14, color: C.gold, fontWeight: 600, fontStyle: "italic" }}>
                        "{aiResult.motivationalNote}"
                      </p>
                    </div>
                  )}
                </div>
              </Card>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn outline onClick={() => setStep(0)}>{t.back}</Btn>
                <Btn onClick={() => setStep(3)} full>{t.next}</Btn>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Courses ── */}
          {step === 3 && (
            <motion.div key="courses" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card>
                <div style={{ padding: "18px 22px", background: `linear-gradient(135deg, ${C.green}, #0a5a06)`, color: C.white }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>📚 {t.courses.title}</h2>
                  <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{t.courses.subtitle}</p>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {COURSES.map((c, i) => (
                    <div key={i} style={{ padding: 16, border: `1px solid ${C.navyLight}`, borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.navy, marginBottom: 4 }}>{c.title}</div>
                        <div style={{ fontSize: 12, color: C.slate }}>{c.platform}</div>
                        <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                          <Badge text={`${c.hours} ${t.courses.hours}`} color={C.navy} bg={C.navyLight} />
                          <Badge text={t.courses.free} color={C.green} bg={C.greenLight} />
                          {c.cert && <Badge text="🏅 Certificate" color={C.gold} bg={C.goldLight} />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn outline onClick={() => setStep(2)}>{t.back}</Btn>
                <Btn onClick={() => setStep(4)} full>{t.next}</Btn>
              </div>
            </motion.div>
          )}

          {/* ── Step 4: Scholarships ── */}
          {step === 4 && (
            <motion.div key="scholarships" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card>
                <div style={{ padding: "18px 22px", background: `linear-gradient(135deg, #7B2FBE, #4A1580)`, color: C.white }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>🏛️ {t.scholarships.title}</h2>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {SCHOLARSHIPS.map((s, i) => (
                    <div key={i} style={{ padding: 16, border: `1px solid #EDE9FE`, borderRadius: 14, background: "#FAFAFF" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.navy }}>{s.name}</div>
                        <Badge text={t.scholarships.eligible} color="#7B2FBE" bg="#F3E8FF" />
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#7B2FBE", margin: "8px 0" }}>
                        {t.scholarships.amount}{s.amount}
                      </div>
                      <div style={{ fontSize: 12, color: C.slate, marginBottom: 4 }}>{s.ministry}</div>
                      <div style={{ fontSize: 12, color: C.slate, marginBottom: 8 }}>
                        📅 {s.deadline} &nbsp;|&nbsp; {s.criteria}
                      </div>
                      <button style={{
                        padding: "7px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                        background: "#7B2FBE", color: C.white, border: "none", cursor: "pointer"
                      }}>
                        {t.scholarships.check} →
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn outline onClick={() => setStep(3)}>{t.back}</Btn>
                <Btn onClick={() => setStep(5)} full>{t.next}</Btn>
              </div>
            </motion.div>
          )}

          {/* ── Step 5: Internships ── */}
          {step === 5 && (
            <motion.div key="internships" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card>
                <div style={{ padding: "18px 22px", background: `linear-gradient(135deg, #0891B2, #0E4F6A)`, color: C.white }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>🚀 {t.internships.title}</h2>
                  <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{t.internships.subtitle}</p>
                </div>
                <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
                  {INTERNSHIPS.map((intern, i) => (
                    <div key={i} style={{ padding: 16, border: `1px solid #E0F2FE`, borderRadius: 14, background: "#F0F9FF" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15, color: C.navy }}>{intern.role}</div>
                          <div style={{ fontSize: 13, color: "#0891B2", fontWeight: 600 }}>{intern.startup}</div>
                        </div>
                        <Badge text={intern.mode === "Remote" ? t.internships.remote : t.internships.hybrid} color="#0891B2" bg="#E0F2FE" />
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 800, color: C.green, margin: "8px 0" }}>
                        {t.internships.stipend}{intern.stipend}/mo
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                        {intern.skills.map(sk => <Badge key={sk} text={sk} color="#0891B2" bg="#E0F2FE" />)}
                      </div>
                      <button style={{
                        padding: "7px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                        background: C.saffron, color: C.white, border: "none", cursor: "pointer"
                      }}>
                        {t.internships.apply} ✉️
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ display: "flex", gap: 12 }}>
                <Btn outline onClick={() => setStep(4)}>{t.back}</Btn>
                <Btn onClick={() => setStep(6)} full>{t.next}</Btn>
              </div>
            </motion.div>
          )}

          {/* ── Step 6: Roadmap ── */}
          {step === 6 && (
            <motion.div key="roadmap" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Card>
                <div style={{ padding: "18px 22px", background: `linear-gradient(135deg, ${C.navy}, #2A4080)`, color: C.white }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800 }}>🗺️ {t.roadmap.title}</h2>
                  <p style={{ fontSize: 12, opacity: 0.85, marginTop: 4 }}>{profile.name}'s personalized journey</p>
                </div>
                <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 0 }}>
                  {ROADMAP.map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, paddingBottom: i < ROADMAP.length - 1 ? 20 : 0 }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                          background: i === 0 ? C.saffron : i < 3 ? C.gold : C.green,
                          color: C.white, display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 800, fontSize: 12
                        }}>
                          {i + 1}
                        </div>
                        {i < ROADMAP.length - 1 && <div style={{ width: 2, flex: 1, background: C.navyLight, marginTop: 4 }} />}
                      </div>
                      <div style={{ paddingTop: 8 }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: C.slate, textTransform: "uppercase", letterSpacing: 1 }}>
                          {t.roadmap.month} {r.months}
                        </div>
                        <div style={{ fontSize: 14, color: C.navy, marginTop: 4, lineHeight: 1.6 }}>{r.milestone}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <div style={{ textAlign: "center", padding: 24, background: C.white, borderRadius: 20, boxShadow: "0 4px 24px rgba(26,43,94,0.08)" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: C.navy, marginBottom: 8 }}>
                  Your journey is set, {profile.name}!
                </h3>
                <p style={{ fontSize: 14, color: C.slate, marginBottom: 20 }}>
                  Every big dream starts with a single step. You've got this! 🇮🇳
                </p>
                <Btn onClick={() => { 
                  setStep(0); 
                  setProfile({ name: "", education: "", stream: "", goal: "", interests: [], village: "" }); 
                  setAiResult(null); 
                }} full style={{ background: C.navy }}>
                  {t.roadmap.restart}
                </Btn>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Bottom Nav ── */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: C.white, borderTop: `2px solid ${C.navyLight}`,
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 0 14px",
      }}>
        {[["0", "👤", "Profile"], ["2", "✨", "Guidance"], ["3", "📚", "Courses"], ["4", "🏛️", "Scholar"], ["5", "🚀", "Intern"]].map(([s, icon, label]) => (
          <button key={s} onClick={() => { if (parseInt(s) <= step || (parseInt(s) === 2 && aiResult)) setStep(parseInt(s)); }}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              background: "none", border: "none", cursor: "pointer",
              color: step === parseInt(s) ? C.saffron : C.slate,
              fontWeight: step === parseInt(s) ? 700 : 400
            }}>
            <span style={{ fontSize: 18 }}>{icon}</span>
            <span style={{ fontSize: 9 }}>{label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

// shared style consts
const lblStyle = { display: "block", fontSize: 11, fontWeight: 700, color: "#6B7280", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 };
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 12, border: "1.5px solid #E5E7EB", fontSize: 14, background: "#FAFAFA", outline: "none", color: "#1A2B5E" };
