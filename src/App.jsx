import { useState, useEffect } from "react";
import { motion } from "motion/react";

// ── Color Palette ──────────────────────────────────────────────────────────────
const C = {
  saffron: "#FF6B2B",
  saffronLight: "#FFF0E8",
  green: "#138808",
  greenLight: "#E8F5E9",
  navy: "#1A2B5E",
  navyLight: "#EEF1F9",
  gold: "#F0A500",
  goldLight: "#FFF8E1",
  purple: "#7B2FBE",
  purpleLight: "#F3E8FF",
  teal: "#0891B2",
  tealLight: "#E0F2FE",
  red: "#DC2626",
  redLight: "#FEF2F2",
  slate: "#64748B",
  white: "#FFFFFF",
  // Dark mode colors
  darkBg: "#0F172A",
  darkCard: "#1E293B",
  darkBorder: "#334155",
  darkText: "#E2E8F0",
  darkAlt: "#1a2744",
};

// ── Translations ───────────────────────────────────────────────────────────────
const T = {
  en: {
    nav: {
      home: "Home",
      guidance: "AI Guidance",
      courses: "Courses",
      scholarships: "Scholarships",
      internships: "Internships",
      startup: "Startup Guide",
      mentors: "Talk to Mentor",
    },
    hero: {
      badge: "🏆 AI for Bharat Hackathon 2025",
      title: "Vidya AI",
      subtitle: "Empowering Rural Students with AI-Powered Academic Guidance",
      description: "Get personalized study plans, discover scholarships, connect with startups, and build your career — all powered by AI. Completely free for rural Indian students.",
      cta1: "Get My Free Guidance →",
      cta2: "Explore Features",
      stats: "10K+ Students Helped | 50+ Scholarships | 100% Free",
    },
    features: {
      title: "Explore Our Features",
      subtitle: "Everything a rural student needs to succeed — powered by AI",
      items: [
        { icon: "🎯", title: "AI Study Guidance", desc: "Personalized study plans based on your goals", color: C.saffron },
        { icon: "📚", title: "Free Courses", desc: "Curated courses from NPTEL, Swayam & more", color: C.green },
        { icon: "🏛️", title: "Scholarships", desc: "Find scholarships you're eligible for", color: C.purple },
        { icon: "🚀", title: "Startup Internships", desc: "Connect with startups hiring students", color: C.teal },
        { icon: "💡", title: "Startup Validator", desc: "Validate your startup idea with AI", color: C.gold },
        { icon: "📄", title: "Resume Builder", desc: "Generate professional resume instantly", color: C.red },
      ],
    },
    guidance: {
      title: "AI Study Guidance",
      name: "Your Name",
      namePh: "Enter your name",
      village: "Village / District",
      villagePh: "e.g. Nashik, Amravati",
      education: "Education Level",
      stream: "Stream / Subject",
      goal: "Career Goal",
      interests: "Your Interests",
      submit: "Generate My Guidance →",
      generating: "Analyzing your profile...",
      studyPlan: "Personalized Study Plan",
      strengths: "Your Strengths",
      focus: "Priority Focus Areas",
      daily: "Daily Routine",
      motivational: "Motivational Note",
    },
    courses: {
      title: "Free Courses for You",
      subtitle: "Learn from India's best platforms — completely free",
      free: "FREE",
      hours: "hrs",
      cert: "Certificate",
    },
    scholarships: {
      title: "Scholarships You May Qualify For",
      subtitle: "Financial support for your education journey",
      eligible: "Likely Eligible ✓",
      check: "Check Eligibility →",
      amount: "Up to",
    },
    internships: {
      title: "Startup Internship Opportunities",
      subtitle: "Gain real-world experience with growing startups",
      apply: "Express Interest ✉️",
      stipend: "Stipend",
      remote: "Remote",
      hybrid: "Hybrid",
    },
    govtSchemes: {
      title: "Government Schemes",
      subtitle: "Apply for relevant government initiatives and get support",
      apply: "Apply Now →",
      benefit: "Benefit",
    },
    startup: {
      title: "Startup Idea Validator",
      subtitle: "Get AI-powered validation for your startup idea",
      ideaLabel: "Describe Your Startup Idea",
      ideaPh: "e.g. I want to build an app that connects farmers to buyers directly",
      validate: "Validate My Idea →",
      validating: "Analyzing your idea...",
      score: "Validation Score",
      market: "Market Opportunity",
      skills: "Required Skills",
      funding: "Funding Schemes",
      nextStep: "Next Step",
      fitHigh: "High Fit",
      fitMedium: "Medium Fit",
      fitLow: "Low Fit",
    },
    mentors: {
      title: "Talk to a Mentor",
      subtitle: "Connect with experienced mentors for personalized guidance",
      search: "Search by name, subject, or language...",
      tableHeaders: ["Mentor", "Specialization", "Experience", "Languages", "Rating", "Action"],
      call: "CALL",
    },
    resume: {
      title: "Build Your Resume",
      subtitle: "Generate a professional resume in seconds",
      warning: "Please fill your profile in AI Guidance section first",
      generate: "📄 Generate My Resume",
      generating: "Creating your resume...",
      copy: "📋 Copy Resume Text",
      regenerate: "🔄 Regenerate",
      copied: "Copied!",
      objective: "Career Objective",
      education: "Education",
      skills: "Skills",
      projects: "Suggested Projects to Build",
      certifications: "Certifications to Pursue",
      languages: "Languages",
    },
    footer: {
      tagline: "Empowering Rural India with AI-Powered Education",
      disclaimer: "DEMO ONLY – For AI for Bharat Hackathon. Not official academic advice.",
    },
    educLevels: ["Class 8–10", "Class 11–12", "Diploma / ITI", "Undergraduate", "Postgraduate"],
    streams: ["Engineering", "Science (PCM)", "Science (PCB)", "Commerce", "Arts / Humanities", "Agriculture", "Vocational / ITI"],
    goals: ["Engineering", "Medicine", "Government Job", "Farming / Agri-tech", "Business / Startup", "Teaching", "Arts / Design", "Not sure yet"],
    interestsList: ["Technology", "Agriculture", "Healthcare", "Business", "Creative Arts", "Sports", "Social Work", "Environment"],
  },
  hi: {
    nav: {
      home: "होम",
      guidance: "AI मार्गदर्शन",
      courses: "कोर्स",
      scholarships: "छात्रवृत्ति",
      internships: "इंटर्नशिप",
      startup: "स्टार्टअप गाइड",
      mentors: "मेंटर से बात करें",
    },
    hero: {
      badge: "🏆 AI for Bharat हैकाथॉन 2025",
      title: "विद्या AI",
      subtitle: "ग्रामीण छात्रों को AI-संचालित शैक्षणिक मार्गदर्शन से सशक्त बनाना",
      description: "व्यक्तिगत अध्ययन योजनाएं प्राप्त करें, छात्रवृत्तियां खोजें, स्टार्टअप से जुड़ें और अपना करियर बनाएं — सब AI द्वारा संचालित। ग्रामीण भारतीय छात्रों के लिए पूरी तरह मुफ्त।",
      cta1: "मुफ्त मार्गदर्शन पाएं →",
      cta2: "फीचर्स देखें",
      stats: "10K+ छात्रों की मदद की | 50+ छात्रवृत्तियां | 100% मुफ्त",
    },
    features: {
      title: "हमारे फीचर्स देखें",
      subtitle: "ग्रामीण छात्र की सफलता के लिए सब कुछ — AI द्वारा संचालित",
      items: [
        { icon: "🎯", title: "AI अध्ययन मार्गदर्शन", desc: "आपके लक्ष्यों के आधार पर व्यक्तिगत योजना", color: C.saffron },
        { icon: "📚", title: "मुफ्त कोर्स", desc: "NPTEL, Swayam और अधिक से चुने गए कोर्स", color: C.green },
        { icon: "🏛️", title: "छात्रवृत्तियां", desc: "जिनके लिए आप पात्र हैं", color: C.purple },
        { icon: "🚀", title: "स्टार्टअप इंटर्नशिप", desc: "छात्रों को नियुक्त करने वाले स्टार्टअप", color: C.teal },
        { icon: "💡", title: "स्टार्टअप सत्यापनकर्ता", desc: "AI से अपने विचार को सत्यापित करें", color: C.gold },
        { icon: "📄", title: "रिज्यूमे बिल्डर", desc: "तुरंत पेशेवर रिज्यूमे बनाएं", color: C.red },
      ],
    },
    guidance: {
      title: "AI अध्ययन मार्गदर्शन",
      name: "आपका नाम",
      namePh: "अपना नाम दर्ज करें",
      village: "गाँव / जिला",
      villagePh: "जैसे नागपुर, पुणे",
      education: "शिक्षा स्तर",
      stream: "विषय / स्ट्रीम",
      goal: "करियर लक्ष्य",
      interests: "आपकी रुचियाँ",
      submit: "मेरा मार्गदर्शन बनाएं →",
      generating: "आपकी प्रोफाइल का विश्लेषण...",
      studyPlan: "व्यक्तिगत अध्ययन योजना",
      strengths: "आपकी शक्तियाँ",
      focus: "प्राथमिकता फोकस क्षेत्र",
      daily: "दैनिक दिनचर्या",
      motivational: "प्रेरक नोट",
    },
    courses: {
      title: "आपके लिए मुफ्त कोर्स",
      subtitle: "भारत के सर्वश्रेष्ठ प्लेटफार्मों से सीखें — पूरी तरह मुफ्त",
      free: "मुफ्त",
      hours: "घंटे",
      cert: "प्रमाणपत्र",
    },
    scholarships: {
      title: "आपके लिए उपयुक्त छात्रवृत्तियाँ",
      subtitle: "आपकी शिक्षा यात्रा के लिए वित्तीय सहायता",
      eligible: "संभवतः पात्र ✓",
      check: "पात्रता जांचें →",
      amount: "तक",
    },
    internships: {
      title: "स्टार्टअप इंटर्नशिप अवसर",
      subtitle: "बढ़ते स्टार्टअप के साथ वास्तविक अनुभव प्राप्त करें",
      apply: "रुचि दर्ज करें ✉️",
      stipend: "वजीफा",
      remote: "दूरस्थ",
      hybrid: "हाइब्रिड",
    },
    startup: {
      title: "स्टार्टअप विचार सत्यापनकर्ता",
      subtitle: "अपने स्टार्टअप विचार के लिए AI-संचालित सत्यापन प्राप्त करें",
      ideaLabel: "अपना स्टार्टअप विचार बताएं",
      ideaPh: "जैसे मैं एक ऐप बनाना चाहता हूं जो किसानों को खरीदारों से सीधे जोड़े",
      validate: "मेरे विचार को सत्यापित करें →",
      validating: "आपके विचार का विश्लेषण...",
      score: "सत्यापन स्कोर",
      market: "बाजार अवसर",
      skills: "आवश्यक कौशल",
      funding: "फंडिंग योजनाएं",
      nextStep: "अगला कदम",
      fitHigh: "उच्च उपयुक्तता",
      fitMedium: "मध्यम उपयुक्तता",
      fitLow: "कम उपयुक्तता",
    },
    mentors: {
      title: "मेंटर से बात करें",
      subtitle: "व्यक्तिगत मार्गदर्शन के लिए अनुभवी मेंटर से जुड़ें",
      search: "नाम, विषय या भाषा से खोजें...",
      tableHeaders: ["मेंटर", "विशेषज्ञता", "अनुभव", "भाषाएं", "रेटिंग", "कार्रवाई"],
      call: "कॉल करें",
    },
    resume: {
      title: "अपना रिज्यूमे बनाएं",
      subtitle: "सेकंडों में पेशेवर रिज्यूमे बनाएं",
      warning: "कृपया पहले AI मार्गदर्शन अनुभाग में अपनी प्रोफाइल भरें",
      generate: "📄 मेरा रिज्यूमे बनाएं",
      generating: "आपका रिज्यूमे बना रहे हैं...",
      copy: "📋 रिज्यूमे टेक्स्ट कॉपी करें",
      regenerate: "🔄 फिर से बनाएं",
      copied: "कॉपी हो गया!",
      objective: "करियर उद्देश्य",
      education: "शिक्षा",
      skills: "कौशल",
      projects: "बनाने के लिए सुझाए गए प्रोजेक्ट",
      certifications: "प्राप्त करने के लिए प्रमाणपत्र",
      languages: "भाषाएं",
    },
    footer: {
      tagline: "AI-संचालित शिक्षा से ग्रामीण भारत को सशक्त बनाना",
      disclaimer: "केवल डेमो – AI for Bharat हैकाथॉन के लिए। आधिकारिक शैक्षणिक सलाह नहीं।",
    },
    educLevels: ["कक्षा 8–10", "कक्षा 11–12", "डिप्लोमा / आईटीआई", "स्नातक", "स्नातकोत्तर"],
    streams: ["इंजीनियरिंग", "विज्ञान (PCM)", "विज्ञान (PCB)", "वाणिज्य", "कला / मानविकी", "कृषि", "व्यावसायिक / आईटीआई"],
    goals: ["इंजीनियरिंग", "चिकित्सा", "सरकारी नौकरी", "कृषि / एग्री-टेक", "व्यवसाय / स्टार्टअप", "शिक्षण", "कला / डिजाइन", "अभी तय नहीं"],
    interestsList: ["तकनीक", "कृषि", "स्वास्थ्य", "व्यवसाय", "रचनात्मक कला", "खेल", "सामाजिक कार्य", "पर्यावरण"],
  },
  mr: {
    nav: {
      home: "होम",
      guidance: "AI मार्गदर्शन",
      courses: "अभ्यासक्रम",
      scholarships: "शिष्यवृत्ती",
      internships: "इंटर्नशिप",
      startup: "स्टार्टअप गाइड",
      mentors: "मेंटरशी बोला",
    },
    hero: {
      badge: "🏆 AI for Bharat हॅकाथॉन 2025",
      title: "विद्या AI",
      subtitle: "ग्रामीण विद्यार्थ्यांना AI-चालित शैक्षणिक मार्गदर्शनाने सक्षम करणे",
      description: "वैयक्तिक अभ्यास योजना मिळवा, शिष्यवृत्ती शोधा, स्टार्टअपशी जोडा आणि तुमचे करिअर तयार करा — सर्व AI द्वारे चालित. ग्रामीण भारतीय विद्यार्थ्यांसाठी पूर्णपणे मोफत.",
      cta1: "मोफत मार्गदर्शन मिळवा →",
      cta2: "वैशिष्ट्ये पहा",
      stats: "10K+ विद्यार्थ्यांना मदत केली | 50+ शिष्यवृत्ती | 100% मोफत",
    },
    features: {
      title: "आमची वैशिष्ट्ये पहा",
      subtitle: "ग्रामीण विद्यार्थ्याच्या यशासाठी सर्व काही — AI द्वारे चालित",
      items: [
        { icon: "🎯", title: "AI अभ्यास मार्गदर्शन", desc: "तुमच्या ध्येयांवर आधारित वैयक्तिक योजना", color: C.saffron },
        { icon: "📚", title: "मोफत अभ्यासक्रम", desc: "NPTEL, Swayam आणि अधिक पासून निवडलेले", color: C.green },
        { icon: "🏛️", title: "शिष्यवृत्ती", desc: "ज्यासाठी तुम्ही पात्र आहात", color: C.purple },
        { icon: "🚀", title: "स्टार्टअप इंटर्नशिप", desc: "विद्यार्थ्यांना नियुक्त करणारे स्टार्टअप", color: C.teal },
        { icon: "💡", title: "स्टार्टअप सत्यापक", desc: "AI सह तुमची कल्पना तपासा", color: C.gold },
        { icon: "📄", title: "रिझ्युमे बिल्डर", desc: "त्वरित व्यावसायिक रिझ्युमे तयार करा", color: C.red },
      ],
    },
    guidance: {
      title: "AI अभ्यास मार्गदर्शन",
      name: "तुमचे नाव",
      namePh: "तुमचे नाव टाका",
      village: "गाव / जिल्हा",
      villagePh: "उदा. नाशिक, अमरावती",
      education: "शिक्षण स्तर",
      stream: "विषय / शाखा",
      goal: "करिअर ध्येय",
      interests: "तुमच्या आवडी",
      submit: "माझे मार्गदर्शन तयार करा →",
      generating: "तुमच्या प्रोफाइलचे विश्लेषण...",
      studyPlan: "वैयक्तिक अभ्यास योजना",
      strengths: "तुमची बलस्थाने",
      focus: "प्राधान्य फोकस क्षेत्रे",
      daily: "दैनंदिन दिनचर्या",
      motivational: "प्रेरक नोट",
    },
    courses: {
      title: "तुमच्यासाठी मोफत अभ्यासक्रम",
      subtitle: "भारताच्या सर्वोत्तम प्लॅटफॉर्मवरून शिका — पूर्णपणे मोफत",
      free: "मोफत",
      hours: "तास",
      cert: "प्रमाणपत्र",
    },
    scholarships: {
      title: "तुम्हाला मिळू शकणाऱ्या शिष्यवृत्ती",
      subtitle: "तुमच्या शिक्षण प्रवासासाठी आर्थिक सहाय्य",
      eligible: "बहुधा पात्र ✓",
      check: "पात्रता तपासा →",
      amount: "पर्यंत",
    },
    internships: {
      title: "स्टार्टअप इंटर्नशिप संधी",
      subtitle: "वाढत्या स्टार्टअपसह वास्तविक अनुभव मिळवा",
      apply: "स्वारस्य नोंदवा ✉️",
      stipend: "विद्यावेतन",
      remote: "दूरस्थ",
      hybrid: "हायब्रिड",
    },
    startup: {
      title: "स्टार्टअप कल्पना सत्यापक",
      subtitle: "तुमच्या स्टार्टअप कल्पनेसाठी AI-चालित सत्यापन मिळवा",
      ideaLabel: "तुमची स्टार्टअप कल्पना सांगा",
      ideaPh: "उदा. मी एक अॅप तयार करू इच्छितो जे शेतकऱ्यांना खरेदीदारांशी थेट जोडते",
      validate: "माझी कल्पना तपासा →",
      validating: "तुमच्या कल्पनेचे विश्लेषण...",
      score: "सत्यापन स्कोअर",
      market: "बाजार संधी",
      skills: "आवश्यक कौशल्ये",
      funding: "निधी योजना",
      nextStep: "पुढील पाऊल",
      fitHigh: "उच्च योग्यता",
      fitMedium: "मध्यम योग्यता",
      fitLow: "कमी योग्यता",
    },
    mentors: {
      title: "मेंटरशी बोला",
      subtitle: "वैयक्तिक मार्गदर्शनासाठी अनुभवी मेंटरशी जोडा",
      search: "नाव, विषय किंवा भाषेनुसार शोधा...",
      tableHeaders: ["मेंटर", "विशेषज्ञता", "अनुभव", "भाषा", "रेटिंग", "कृती"],
      call: "कॉल करा",
    },
    resume: {
      title: "तुमचा रिझ्युमे तयार करा",
      subtitle: "सेकंदात व्यावसायिक रिझ्युमे तयार करा",
      warning: "कृपया प्रथम AI मार्गदर्शन विभागात तुमची प्रोफाइल भरा",
      generate: "📄 माझा रिझ्युमे तयार करा",
      generating: "तुमचा रिझ्युमे तयार करत आहे...",
      copy: "📋 रिझ्युमे मजकूर कॉपी करा",
      regenerate: "🔄 पुन्हा तयार करा",
      copied: "कॉपी झाले!",
      objective: "करिअर उद्दिष्ट",
      education: "शिक्षण",
      skills: "कौशल्ये",
      projects: "तयार करण्यासाठी सुचवलेले प्रकल्प",
      certifications: "मिळवण्यासाठी प्रमाणपत्रे",
      languages: "भाषा",
    },
    footer: {
      tagline: "AI-चालित शिक्षणाने ग्रामीण भारताला सक्षम करणे",
      disclaimer: "केवळ डेमो – AI for Bharat हॅकाथॉनसाठी. अधिकृत शैक्षणिक सल्ला नाही.",
    },
    educLevels: ["इयत्ता 8–10", "इयत्ता 11–12", "डिप्लोमा / आयटीआय", "पदवी", "पदव्युत्तर"],
    streams: ["अभियांत्रिकी", "विज्ञान (PCM)", "विज्ञान (PCB)", "वाणिज्य", "कला / मानवता", "शेती", "व्यावसायिक / आयटीआय"],
    goals: ["अभियांत्रिकी", "वैद्यकीय", "सरकारी नोकरी", "शेती / एग्री-टेक", "व्यवसाय / स्टार्टअप", "शिक्षण", "कला / डिझाइन", "अजून ठरवले नाही"],
    interestsList: ["तंत्रज्ञान", "शेती", "आरोग्य", "व्यवसाय", "सृजनशील कला", "खेळ", "सामाजिक कार्य", "पर्यावरण"],
  },
};

// ── Static Data ───────────────────────────────────────────────────────────────
const COURSES = [
  { title: "NPTEL: Programming in Python", platform: "NPTEL / Swayam", hours: 40, cert: true, link: "https://onlinecourses.nptel.ac.in/" },
  { title: "Digital Agriculture Fundamentals", platform: "eNAM / ICAR", hours: 20, cert: true, link: "https://enam.gov.in/web/" },
  { title: "Spoken English for Rural Youth", platform: "IGNOU Open", hours: 15, cert: false, link: "http://ignou.ac.in/" },
  { title: "Basic Accounting & GST", platform: "Tally Education", hours: 30, cert: true, link: "https://tallyeducation.com/" },
  { title: "Entrepreneurship for Bharat", platform: "Startup India", hours: 25, cert: true, link: "https://www.startupindia.gov.in/" },
  { title: "Govt Scheme Awareness Course", platform: "DigiLocker Academy", hours: 10, cert: false, link: "https://www.digilocker.gov.in/" },
];

const SCHOLARSHIPS = [
  { name: "PM YASASVI Scholarship", amount: "1,25,000", ministry: "Ministry of Social Justice", deadline: "Sep 2025", criteria: "OBC/EBC, income < ₹2.5L", color: C.purple, link: "https://yet.nta.ac.in/" },
  { name: "NSP – State Merit Scholarship", amount: "36,000", ministry: "National Scholarship Portal", deadline: "Nov 2025", criteria: "Merit + Income based", color: C.navy, link: "https://scholarships.gov.in/" },
  { name: "Pragati Scholarship (Girls)", amount: "50,000", ministry: "AICTE", deadline: "Oct 2025", criteria: "Female, Diploma/Degree, 1st year", color: C.teal, link: "https://www.aicte-india.org/schemes/students-development-schemes" },
  { name: "Ishan Uday (NE States)", amount: "54,000", ministry: "UGC", deadline: "Dec 2025", criteria: "NE state domicile, UG student", color: C.green, link: "https://scholarships.gov.in/" },
];

const INTERNSHIPS = [
  { startup: "KrishiTech Solutions", role: "Agri-Data Intern", stipend: "5,000", mode: "Remote", skills: ["Excel", "Basic Python"], domain: "Agriculture", link: "https://internship.aicte-india.org/" },
  { startup: "RuralMed App", role: "Community Health Intern", stipend: "4,000", mode: "Hybrid", skills: ["Data Entry", "Communication"], domain: "Healthcare", link: "https://internship.aicte-india.org/" },
  { startup: "GramUdyog Mart", role: "Digital Marketing Intern", stipend: "6,000", mode: "Remote", skills: ["Social Media", "Canva"], domain: "Business", link: "https://internship.aicte-india.org/" },
  { startup: "EduSaathi", role: "Content Intern (Hindi/Marathi)", stipend: "3,500", mode: "Remote", skills: ["Writing", "Research"], domain: "Education", link: "https://internship.aicte-india.org/" },
];

const GOVT_SCHEMES = [
  { name: "PM Vishwakarma", benefit: "Toolkit + Loan up to ₹3L", sector: "Skill & Business", deadline: "Ongoing", color: C.saffron, link: "https://pmvishwakarma.gov.in/" },
  { name: "Ayushman Bharat PM-JAY", benefit: "Up to ₹5L Health Cover", sector: "Healthcare", deadline: "Ongoing", color: C.teal, link: "https://pmjay.gov.in/" },
  { name: "PMEGP Loan", benefit: "Up to ₹50L Subsidy Loan", sector: "Business", deadline: "Ongoing", color: C.gold, link: "https://www.kviconline.gov.in/pmegpeportal/" },
  { name: "PM Kisan Samman Nidhi", benefit: "₹6,000/year", sector: "Agriculture", deadline: "Ongoing", color: C.green, link: "https://pmkisan.gov.in/" },
];

const MENTORS = [
  { name: "Dr. Priya Sharma", location: "Pune", specialization: "Engineering & UPSC", experience: "10+ yrs", languages: ["English", "Hindi", "Marathi"], rating: 4.9 },
  { name: "Rahul Patil", location: "Nashik", specialization: "Agri-tech Startup", experience: "7+ yrs", languages: ["Marathi", "Hindi"], rating: 4.8 },
  { name: "Sneha Kulkarni", location: "Nagpur", specialization: "Commerce & Banking", experience: "8+ yrs", languages: ["Hindi", "English"], rating: 4.7 },
  { name: "Amit Desai", location: "Mumbai", specialization: "Business & Entrepreneurship", experience: "12+ yrs", languages: ["English", "Hindi", "Gujarati"], rating: 4.9 },
];

// ── API Functions ──────────────────────────────────────────────────────────────
async function getGuidance(profile) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
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
  } catch (e) {
    console.error(e);
    return {
      studyPlan: `As a ${profile.education} student aiming for ${profile.goal}, focus on building strong fundamentals. Use free resources like NPTEL and Swayam daily. Rural students have unique resilience — use that!`,
      strengths: ["Determination", "Practical thinking", "Community awareness"],
      focusAreas: ["Build core subject basics first", "Learn one digital skill (Excel / Python)", "Practice spoken English 30 min/day"],
      dailyRoutine: ["Morning: Study core subjects (2hrs)", "Afternoon: Online course (1hr)", "Evening: Revision + practice (1hr)"],
      motivationalNote: "Every great Indian success story started from a village. Your journey starts today."
    };
  }
}

async function validateStartup(idea) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        messages: [{
          role: "user",
          content: `You are a startup mentor for rural Indian entrepreneurs. Analyze this startup idea: ${idea}. Return ONLY valid JSON (no markdown):
{
  "validationScore": 75,
  "marketOpportunity": "2 sentence assessment of market potential",
  "requiredSkills": ["skill1", "skill2", "skill3", "skill4"],
  "fundingSchemes": [
    { "name": "MUDRA Loan", "amount": "₹10L", "fit": "High", "reason": "one line explanation" },
    { "name": "Startup India", "amount": "Tax benefits", "fit": "Medium", "reason": "one line explanation" },
    { "name": "PMEGP", "amount": "₹25L", "fit": "High", "reason": "one line explanation" },
    { "name": "Stand-up India", "amount": "₹1Cr", "fit": "Low", "reason": "one line explanation" }
  ],
  "nextStep": "single most important action to take this week"
}`
        }]
      })
    });
    const data = await response.json();
    const text = data.content.map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error(e);
    return {
      validationScore: 72,
      marketOpportunity: "India's agricultural sector is rapidly digitizing with government support. Direct farmer-to-buyer platforms can reduce middlemen costs by 20-30%.",
      requiredSkills: ["Mobile App Development", "Supply Chain Management", "Digital Marketing", "Farmer Communication"],
      fundingSchemes: [
        { name: "MUDRA Loan", amount: "₹10L", fit: "High", reason: "Perfect for initial app development and pilot testing" },
        { name: "Startup India", amount: "Tax benefits", fit: "High", reason: "Agri-tech startups get 3-year tax holiday" },
        { name: "PMEGP", amount: "₹25L", fit: "Medium", reason: "Good for scaling but requires manufacturing component" },
        { name: "Stand-up India", amount: "₹1Cr", fit: "Low", reason: "Better for larger infrastructure projects" }
      ],
      nextStep: "Interview 20 farmers this week to validate the problem and record their pain points."
    };
  }
}

async function buildResume(profile) {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Generate a clean simple resume for a rural Indian student with this profile:
Name: ${profile.name}, Location: ${profile.village}, Education: ${profile.education}, Stream: ${profile.stream}, Career Goal: ${profile.goal}, Interests: ${profile.interests.join(", ")}.
Return ONLY valid JSON (no markdown):
{
  "objective": "one sentence career objective",
  "education": "formatted education line",
  "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
  "projects": ["project idea 1 relevant to their goal", "project idea 2"],
  "certifications": ["relevant free certification 1", "relevant free certification 2"],
  "languages": ["Hindi", "English", "regional language if applicable"]
}`
        }]
      })
    });
    const data = await response.json();
    const text = data.content.map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch (e) {
    console.error(e);
    return {
      objective: `Aspiring ${profile.goal} professional from ${profile.village} seeking opportunities to apply technical skills`,
      education: `${profile.education} - ${profile.stream}`,
      skills: ["Problem Solving", "Communication", "Digital Literacy", "Team Collaboration", "Quick Learning"],
      projects: [`${profile.goal}-focused project using online resources`, `Digital solution for ${profile.village} community`],
      certifications: ["NPTEL Online Certification", "Google Digital Skills"],
      languages: ["Hindi", "English", "Marathi"]
    };
  }
}

// ── Main App Component ────────────────────────────────────────────────────────
export default function VidyaAI() {
  const [lang, setLang] = useState("en");
  const [isDark, setIsDark] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const t = T[lang];

  // Profile state
  const [profile, setProfile] = useState({
    name: "", village: "", education: "", stream: "", goal: "", interests: []
  });
  const [guidanceResult, setGuidanceResult] = useState(null);
  const [loadingGuidance, setLoadingGuidance] = useState(false);

  // Startup state
  const [startupIdea, setStartupIdea] = useState("");
  const [startupResult, setStartupResult] = useState(null);
  const [loadingStartup, setLoadingStartup] = useState(false);

  // Resume state
  const [resumeData, setResumeData] = useState(null);
  const [loadingResume, setLoadingResume] = useState(false);
  const [copiedResume, setCopiedResume] = useState(false);

  // Mentor search
  const [mentorSearch, setMentorSearch] = useState("");

  const toggleInterest = (item) => {
    setProfile(p => ({
      ...p,
      interests: p.interests.includes(item) ? p.interests.filter(x => x !== item) : [...p.interests, item]
    }));
  };

  const handleGenerateGuidance = async () => {
    if (!profile.name || !profile.education || !profile.stream || !profile.goal) return;
    setLoadingGuidance(true);
    try {
      const result = await getGuidance(profile);
      setGuidanceResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingGuidance(false);
    }
  };

  const handleValidateStartup = async () => {
    if (!startupIdea.trim()) return;
    setLoadingStartup(true);
    try {
      const result = await validateStartup(startupIdea);
      setStartupResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingStartup(false);
    }
  };

  const handleGenerateResume = async () => {
    if (!profile.name || !profile.education) return;
    setLoadingResume(true);
    try {
      const result = await buildResume(profile);
      setResumeData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingResume(false);
    }
  };

  const copyResumeText = () => {
    if (!resumeData) return;
    const text = `${profile.name}\n${profile.village}\n${profile.goal}\n\nCAREER OBJECTIVE\n${resumeData.objective}\n\nEDUCATION\n${resumeData.education}\n\nSKILLS\n${resumeData.skills.join(", ")}\n\nSUGGESTED PROJECTS\n${resumeData.projects.map((p, i) => `${i + 1}. ${p}`).join("\n")}\n\nCERTIFICATIONS TO PURSUE\n${resumeData.certifications.map((c, i) => `${i + 1}. ${c}`).join("\n")}\n\nLANGUAGES\n${resumeData.languages.join(", ")}`;
    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  const filteredMentors = MENTORS.filter(m =>
    m.name.toLowerCase().includes(mentorSearch.toLowerCase()) ||
    m.specialization.toLowerCase().includes(mentorSearch.toLowerCase()) ||
    m.languages.some(l => l.toLowerCase().includes(mentorSearch.toLowerCase()))
  );

  // Theme colors
  const bg = isDark ? C.darkBg : "#F8F9FA";
  const cardBg = isDark ? C.darkCard : C.white;
  const textColor = isDark ? C.darkText : "#1F2937";
  const borderColor = isDark ? C.darkBorder : "#E5E7EB";
  const navBg = isDark ? C.darkBg : C.white;
  const sectionBg = isDark ? C.darkBg : "#FFFFFF";
  const altBg = isDark ? C.darkAlt : "#F8F9FA";

  return (
    <div style={{ minHeight: "100vh", background: bg, fontFamily: "'Noto Sans', sans-serif", transition: "background 0.3s, color 0.3s" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800;900&family=Noto+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: ${isDark ? C.darkBg : "#F1F5F9"}; }
        ::-webkit-scrollbar-thumb { background: ${C.saffron}; border-radius: 4px; }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: navBg, borderBottom: `1px solid ${borderColor}`,
        padding: "16px 0", transition: "background 0.3s"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 32 }}>🎓</div>
            <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 24, fontWeight: 800, color: textColor }}>Vidya AI</span>
          </div>

          {/* Nav Links */}
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {[
              ["home", t.nav.home, "#"],
              ["guidance", t.nav.guidance, "#guidance"],
              ["courses", t.nav.courses, "#courses"],
              ["scholarships", t.nav.scholarships, "#scholarships"],
              ["internships", t.nav.internships, "#internships"],
              ["startup", t.nav.startup, "#startup"],
              ["mentors", t.nav.mentors, "#mentors"],
            ].map(([key, label, href]) => (
              <a key={key} href={href} onClick={() => setActiveNav(key)} style={{
                fontSize: 15, fontWeight: 600, color: activeNav === key ? C.saffron : textColor,
                textDecoration: "none", transition: "color 0.2s",
                borderBottom: activeNav === key ? `2px solid ${C.saffron}` : "none",
                paddingBottom: 4
              }}>
                {label}
              </a>
            ))}
          </div>

          {/* Right Controls */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {/* Dark Mode Toggle */}
            <button onClick={() => setIsDark(!isDark)} style={{
              background: "none", border: "none", cursor: "pointer", fontSize: 20, padding: 8
            }}>
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Language Toggle */}
            <div style={{ display: "flex", gap: 8 }}>
              {[["en", "EN"], ["hi", "हिं"], ["mr", "म"]].map(([code, label]) => (
                <button key={code} onClick={() => setLang(code)} style={{
                  padding: "6px 12px", borderRadius: 6, fontSize: 13, fontWeight: 700,
                  background: lang === code ? C.saffron : "transparent",
                  color: lang === code ? C.white : textColor,
                  border: `1px solid ${lang === code ? C.saffron : borderColor}`,
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} style={{
        background: "linear-gradient(135deg, #0F2347, #1A3A6B)",
        padding: "80px 24px", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{ position: "absolute", top: -50, right: -50, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,107,43,0.1)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: "rgba(19,136,8,0.1)", filter: "blur(80px)" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 1 }}>
          {/* Left Side */}
          <div>
            <div style={{
              display: "inline-block", background: "rgba(255,107,43,0.2)", color: C.saffron,
              padding: "6px 16px", borderRadius: 20, fontSize: 13, fontWeight: 700, marginBottom: 24
            }}>
              {t.hero.badge}
            </div>
            <h1 style={{
              fontFamily: "'Baloo 2', cursive", fontSize: 60, fontWeight: 900,
              color: C.white, marginBottom: 16, lineHeight: 1.1
            }}>
              {t.hero.title}
            </h1>
            <p style={{ fontSize: 22, color: "#94A3B8", marginBottom: 12, fontWeight: 600 }}>
              {t.hero.subtitle}
            </p>
            <p style={{ fontSize: 16, color: "#CBD5E1", marginBottom: 32, lineHeight: 1.7 }}>
              {t.hero.description}
            </p>
            <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
              <a href="#guidance" style={{
                padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
                background: C.saffron, color: C.white, textDecoration: "none",
                boxShadow: "0 4px 20px rgba(255,107,43,0.4)", transition: "transform 0.2s"
              }} onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
                onMouseOut={e => e.target.style.transform = "translateY(0)"}>
                {t.hero.cta1}
              </a>
              <a href="#features" style={{
                padding: "14px 32px", borderRadius: 12, fontSize: 16, fontWeight: 700,
                background: "transparent", color: C.white, textDecoration: "none",
                border: `2px solid ${C.white}`, transition: "all 0.2s"
              }} onMouseOver={e => { e.target.style.background = C.white; e.target.style.color = C.navy; }}
                onMouseOut={e => { e.target.style.background = "transparent"; e.target.style.color = C.white; }}>
                {t.hero.cta2}
              </a>
            </div>
            <div style={{ fontSize: 14, color: "#94A3B8", fontWeight: 600 }}>
              {t.hero.stats}
            </div>
          </div>

          {/* Right Side */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
              fontSize: 200, filter: "drop-shadow(0 0 60px rgba(255,107,43,0.5))",
              animation: "float 3s ease-in-out infinite"
            }}>
              🎓
            </div>
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}</style>
      </motion.section>

      {/* ── FEATURES SECTION ── */}
      <section id="features" style={{ padding: "80px 24px", background: sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12 }}>
            {t.features.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60 }}>
            {t.features.subtitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
            {t.features.items.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{
                  background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16,
                  padding: 32, textAlign: "left", cursor: "pointer", transition: "all 0.3s"
                }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                <div style={{
                  width: 64, height: 64, borderRadius: 12, background: `${item.color}15`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, marginBottom: 20
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: textColor, marginBottom: 12 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: C.slate, marginBottom: 16, lineHeight: 1.6 }}>
                  {item.desc}
                </p>
                <a href="#" style={{ fontSize: 14, fontWeight: 700, color: item.color, textDecoration: "none" }}>
                  Learn more →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI GUIDANCE SECTION ── */}
      <section id="guidance" style={{ padding: "80px 24px", background: altBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.guidance.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            Get personalized study guidance powered by AI
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Left: Form */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 32 }}>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 8 }}>{t.guidance.name}</label>
                <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })}
                  placeholder={t.guidance.namePh}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${borderColor}`, fontSize: 15, background: isDark ? C.darkCard : C.white, color: textColor }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 8 }}>{t.guidance.village}</label>
                <input value={profile.village} onChange={e => setProfile({ ...profile, village: e.target.value })}
                  placeholder={t.guidance.villagePh}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${borderColor}`, fontSize: 15, background: isDark ? C.darkCard : C.white, color: textColor }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 8 }}>{t.guidance.education}</label>
                <select value={profile.education} onChange={e => setProfile({ ...profile, education: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${borderColor}`, fontSize: 15, background: isDark ? C.darkCard : C.white, color: textColor }}>
                  <option value="">-- Select --</option>
                  {t.educLevels.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 8 }}>{t.guidance.stream}</label>
                <select value={profile.stream} onChange={e => setProfile({ ...profile, stream: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${borderColor}`, fontSize: 15, background: isDark ? C.darkCard : C.white, color: textColor }}>
                  <option value="">-- Select --</option>
                  {t.streams.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 8 }}>{t.guidance.goal}</label>
                <select value={profile.goal} onChange={e => setProfile({ ...profile, goal: e.target.value })}
                  style={{ width: "100%", padding: "12px 16px", borderRadius: 8, border: `1px solid ${borderColor}`, fontSize: 15, background: isDark ? C.darkCard : C.white, color: textColor }}>
                  <option value="">-- Select --</option>
                  {t.goals.map(g => <option key={g}>{g}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 12 }}>{t.guidance.interests}</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {t.interestsList.map(item => {
                    const sel = profile.interests.includes(item);
                    return (
                      <button key={item} onClick={() => toggleInterest(item)} style={{
                        padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600,
                        background: sel ? C.saffron : "transparent",
                        color: sel ? C.white : textColor,
                        border: `2px solid ${sel ? C.saffron : borderColor}`,
                        cursor: "pointer", transition: "all 0.2s"
                      }}>
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <button onClick={handleGenerateGuidance}
                disabled={!profile.name || !profile.education || !profile.stream || !profile.goal || loadingGuidance}
                style={{
                  width: "100%", padding: "14px", borderRadius: 10, fontSize: 16, fontWeight: 700,
                  background: C.saffron, color: C.white, border: "none", cursor: "pointer",
                  opacity: (!profile.name || !profile.education || !profile.stream || !profile.goal || loadingGuidance) ? 0.5 : 1,
                  transition: "all 0.2s"
                }}>
                {loadingGuidance ? t.guidance.generating : t.guidance.submit}
              </button>
            </div>

            {/* Right: Result */}
            <div>
              {!guidanceResult ? (
                <div style={{
                  background: cardBg, border: `2px dashed ${borderColor}`, borderRadius: 16,
                  padding: 60, textAlign: "center", minHeight: 400, display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>🎯</div>
                    <p style={{ fontSize: 16, color: C.slate }}>Your personalized guidance will appear here</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Study Plan */}
                  <div style={{
                    background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
                    borderRadius: 16, padding: 24, color: C.white
                  }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      {t.guidance.studyPlan}
                    </h3>
                    <p style={{ fontSize: 15, lineHeight: 1.7 }}>{guidanceResult.studyPlan}</p>
                  </div>

                  {/* Strengths */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      {t.guidance.strengths}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {guidanceResult.strengths.map((s, i) => (
                        <span key={i} style={{
                          background: C.saffronLight, color: C.saffron, padding: "6px 14px",
                          borderRadius: 20, fontSize: 13, fontWeight: 600
                        }}>
                          💪 {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Focus Areas */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      {t.guidance.focus}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {guidanceResult.focusAreas.map((f, i) => (
                        <div key={i} style={{
                          background: C.greenLight, padding: "12px 16px", borderRadius: 10,
                          display: "flex", gap: 12, alignItems: "flex-start"
                        }}>
                          <span style={{ color: C.green, fontWeight: 800, fontSize: 16 }}>→</span>
                          <span style={{ fontSize: 14, color: "#1a3a1a" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Daily Routine */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      {t.guidance.daily}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {guidanceResult.dailyRoutine.map((r, i) => (
                        <div key={i} style={{
                          background: C.goldLight, padding: "12px 16px", borderRadius: 10,
                          display: "flex", gap: 12, alignItems: "center"
                        }}>
                          <span style={{ fontSize: 16 }}>{["🌅", "🌞", "🌙"][i] || "📌"}</span>
                          <span style={{ fontSize: 14, color: "#5a3e00" }}>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Motivational Note */}
                  {guidanceResult.motivationalNote && (
                    <div style={{
                      background: C.navy, borderRadius: 16, padding: 24, textAlign: "center"
                    }}>
                      <p style={{ fontSize: 15, color: C.gold, fontWeight: 600, fontStyle: "italic" }}>
                        "{guidanceResult.motivationalNote}"
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── COURSES SECTION ── */}
      <section id="courses" style={{ padding: "80px 24px", background: sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.courses.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            {t.courses.subtitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
            {COURSES.map((c, i) => (
              <a href={c.link} target="_blank" rel="noreferrer" key={i} style={{
                background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 24,
                transition: "transform 0.2s", textDecoration: "none", color: "inherit", display: "block"
              }} onMouseOver={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: textColor, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: C.slate, marginBottom: 16 }}>{c.platform}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <span style={{ background: C.navyLight, color: C.navy, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                    {c.hours} {t.courses.hours}
                  </span>
                  <span style={{ background: C.greenLight, color: C.green, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                    {t.courses.free}
                  </span>
                  {c.cert && (
                    <span style={{ background: C.goldLight, color: C.gold, padding: "4px 10px", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
                      🏅 {t.courses.cert}
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCHOLARSHIPS SECTION ── */}
      <section id="scholarships" style={{ padding: "80px 24px", background: altBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.scholarships.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            {t.scholarships.subtitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {SCHOLARSHIPS.map((s, i) => (
              <div key={i} style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: s.color, padding: "20px 24px", color: C.white }}>
                  <div style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>₹{s.amount}</div>
                  <div style={{ fontSize: 14, opacity: 0.9 }}>{t.scholarships.amount}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: textColor }}>{s.name}</h3>
                    <span style={{ background: C.greenLight, color: C.green, padding: "4px 10px", borderRadius: 12, fontSize: 11, fontWeight: 700 }}>
                      {t.scholarships.eligible}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: C.slate, marginBottom: 6 }}>{s.ministry}</p>
                  <p style={{ fontSize: 13, color: C.slate, marginBottom: 6 }}>📅 {s.deadline}</p>
                  <p style={{ fontSize: 13, color: C.slate, marginBottom: 16 }}>{s.criteria}</p>
                  <a href={s.link} target="_blank" rel="noreferrer" style={{
                    display: "inline-block", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                    background: s.color, color: C.white, border: "none", cursor: "pointer", textDecoration: "none"
                  }}>
                    {t.scholarships.check}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNSHIPS SECTION ── */}
      <section id="internships" style={{ padding: "80px 24px", background: sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.internships.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            {t.internships.subtitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {INTERNSHIPS.map((intern, i) => (
              <div key={i} style={{
                background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 24
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: textColor, marginBottom: 4 }}>{intern.role}</h3>
                    <p style={{ fontSize: 15, color: C.teal, fontWeight: 600 }}>{intern.startup}</p>
                  </div>
                  <span style={{
                    background: C.tealLight, color: C.teal, padding: "6px 12px",
                    borderRadius: 12, fontSize: 12, fontWeight: 700
                  }}>
                    {intern.mode === "Remote" ? t.internships.remote : t.internships.hybrid}
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: C.green, marginBottom: 16 }}>
                  ₹{intern.stipend}/mo
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                  {intern.skills.map(sk => (
                    <span key={sk} style={{
                      background: C.tealLight, color: C.teal, padding: "4px 10px",
                      borderRadius: 12, fontSize: 12, fontWeight: 600
                    }}>
                      {sk}
                    </span>
                  ))}
                </div>
                <a href={intern.link} target="_blank" rel="noreferrer" style={{
                  display: "inline-block", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                  background: C.saffron, color: C.white, border: "none", cursor: "pointer", textDecoration: "none"
                }}>
                  {t.internships.apply}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOVT SCHEMES SECTION ── */}
      <section id="govtSchemes" style={{ padding: "80px 24px", background: sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.govtSchemes?.title || "Government Schemes"}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            {t.govtSchemes?.subtitle || "Apply for relevant government initiatives"}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {GOVT_SCHEMES.map((g, i) => (
              <div key={i} style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, overflow: "hidden" }}>
                <div style={{ background: g.color, padding: "20px 24px", color: C.white }}>
                  <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 4 }}>{g.name}</div>
                  <div style={{ fontSize: 14, opacity: 0.9 }}>{g.sector}</div>
                </div>
                <div style={{ padding: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: textColor }}>{g.benefit}</h3>
                  </div>
                  <p style={{ fontSize: 13, color: C.slate, marginBottom: 16 }}>📅 {g.deadline}</p>
                  <a href={g.link} target="_blank" rel="noreferrer" style={{
                    display: "inline-block", padding: "10px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                    background: g.color, color: C.white, border: "none", cursor: "pointer", textDecoration: "none"
                  }}>
                    {t.govtSchemes?.apply || "Apply Now →"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STARTUP GUIDE SECTION ── */}
      <section id="startup" style={{ padding: "80px 24px", background: altBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12, textAlign: "center" }}>
            {t.startup.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 60, textAlign: "center" }}>
            {t.startup.subtitle}
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
            {/* Left: Form */}
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 32 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.slate, marginBottom: 12 }}>
                {t.startup.ideaLabel}
              </label>
              <textarea value={startupIdea} onChange={e => setStartupIdea(e.target.value)}
                placeholder={t.startup.ideaPh}
                style={{
                  width: "100%", minHeight: 200, padding: "16px", borderRadius: 8,
                  border: `1px solid ${borderColor}`, fontSize: 15, fontFamily: "inherit",
                  background: isDark ? C.darkCard : C.white, color: textColor, resize: "vertical"
                }} />
              <button onClick={handleValidateStartup}
                disabled={!startupIdea.trim() || loadingStartup}
                style={{
                  width: "100%", padding: "14px", borderRadius: 10, fontSize: 16, fontWeight: 700,
                  background: C.gold, color: C.white, border: "none", cursor: "pointer",
                  marginTop: 20, opacity: (!startupIdea.trim() || loadingStartup) ? 0.5 : 1
                }}>
                {loadingStartup ? t.startup.validating : t.startup.validate}
              </button>
            </div>

            {/* Right: Result */}
            <div>
              {!startupResult ? (
                <div style={{
                  background: cardBg, border: `2px dashed ${borderColor}`, borderRadius: 16,
                  padding: 60, textAlign: "center", minHeight: 400, display: "flex",
                  alignItems: "center", justifyContent: "center"
                }}>
                  <div>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>💡</div>
                    <p style={{ fontSize: 16, color: C.slate }}>Your validation results will appear here</p>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  {/* Score Badge */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                    <div style={{
                      width: 120, height: 120, borderRadius: "50%",
                      background: startupResult.validationScore > 70 ? C.green : startupResult.validationScore > 50 ? C.gold : C.red,
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                      color: C.white, boxShadow: "0 4px 20px rgba(0,0,0,0.15)"
                    }}>
                      <div style={{ fontSize: 36, fontWeight: 900 }}>{startupResult.validationScore}</div>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>/100</div>
                    </div>
                  </div>

                  {/* Market Opportunity */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: 20, borderLeft: `4px solid ${C.navy}` }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.startup.market}
                    </h3>
                    <p style={{ fontSize: 14, color: C.slate, lineHeight: 1.7 }}>{startupResult.marketOpportunity}</p>
                  </div>

                  {/* Required Skills */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: 20 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.startup.skills}
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {startupResult.requiredSkills.map((skill, i) => (
                        <span key={i} style={{
                          background: C.saffronLight, color: C.saffron, padding: "6px 14px",
                          borderRadius: 20, fontSize: 13, fontWeight: 600
                        }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Funding Schemes */}
                  <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 12, padding: 20 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: textColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
                      {t.startup.funding}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {startupResult.fundingSchemes.map((scheme, i) => (
                        <div key={i} style={{
                          padding: 14, border: `1px solid ${borderColor}`, borderRadius: 10,
                          display: "flex", justifyContent: "space-between", alignItems: "center"
                        }}>
                          <div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: textColor }}>{scheme.name}</div>
                            <div style={{ fontSize: 13, color: C.slate, marginTop: 4 }}>{scheme.reason}</div>
                          </div>
                          <span style={{
                            background: scheme.fit === "High" ? C.greenLight : scheme.fit === "Medium" ? C.goldLight : "#F3F4F6",
                            color: scheme.fit === "High" ? C.green : scheme.fit === "Medium" ? C.gold : C.slate,
                            padding: "6px 12px", borderRadius: 12, fontSize: 12, fontWeight: 700
                          }}>
                            {scheme.fit === "High" ? t.startup.fitHigh : scheme.fit === "Medium" ? t.startup.fitMedium : t.startup.fitLow}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Step */}
                  <div style={{
                    background: `linear-gradient(135deg, ${C.gold}, #D97706)`,
                    borderRadius: 12, padding: 20, textAlign: "center"
                  }}>
                    <h3 style={{ fontSize: 13, fontWeight: 700, color: C.white, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                      {t.startup.nextStep}
                    </h3>
                    <p style={{ fontSize: 15, color: C.white, fontWeight: 600 }}>"{startupResult.nextStep}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── TALK TO MENTOR SECTION ── */}
      <section id="mentors" style={{ padding: "80px 24px", background: sectionBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div>
              <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 8 }}>
                {t.mentors.title}
              </h2>
              <p style={{ fontSize: 18, color: C.slate }}>{t.mentors.subtitle}</p>
            </div>
            <input value={mentorSearch} onChange={e => setMentorSearch(e.target.value)}
              placeholder={t.mentors.search}
              style={{
                padding: "12px 20px", borderRadius: 10, border: `1px solid ${borderColor}`,
                fontSize: 15, width: 320, background: isDark ? C.darkCard : C.white, color: textColor
              }} />
          </div>

          <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: isDark ? C.darkBg : "#F8F9FA" }}>
                  {t.mentors.tableHeaders.map((h, i) => (
                    <th key={i} style={{
                      padding: "16px 20px", textAlign: "left", fontSize: 13, fontWeight: 700,
                      color: textColor, textTransform: "uppercase", letterSpacing: 1
                    }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMentors.map((m, i) => (
                  <tr key={i} style={{
                    background: i % 2 === 0 ? cardBg : (isDark ? C.darkAlt : "#F8F9FA"),
                    borderTop: `1px solid ${borderColor}`
                  }}>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 48, height: 48, borderRadius: "50%",
                          background: `linear-gradient(135deg, ${C.saffron}, ${C.gold})`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: C.white, fontSize: 18, fontWeight: 700
                        }}>
                          {m.name[0]}
                        </div>
                        <div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: textColor }}>{m.name}</div>
                          <div style={{ fontSize: 13, color: C.slate }}>{m.location}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "20px" }}>
                      <span style={{
                        background: C.greenLight, color: C.green, padding: "6px 12px",
                        borderRadius: 12, fontSize: 13, fontWeight: 600
                      }}>
                        {m.specialization}
                      </span>
                    </td>
                    <td style={{ padding: "20px", fontSize: 14, color: textColor }}>{m.experience}</td>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {m.languages.map(l => (
                          <span key={l} style={{
                            background: isDark ? C.darkBorder : "#E5E7EB", color: textColor,
                            padding: "4px 8px", borderRadius: 8, fontSize: 12
                          }}>
                            {l}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: "20px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 16 }}>⭐</span>
                        <span style={{ fontSize: 15, fontWeight: 700, color: C.gold }}>{m.rating}</span>
                      </div>
                    </td>
                    <td style={{ padding: "20px" }}>
                      <button style={{
                        padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                        background: C.green, color: C.white, border: "none", cursor: "pointer"
                      }}>
                        {t.mentors.call}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── RESUME BUILDER SECTION ── */}
      <section id="resume" style={{ padding: "80px 24px", background: altBg, transition: "background 0.3s" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Baloo 2', cursive", fontSize: 42, fontWeight: 800, color: textColor, marginBottom: 12 }}>
            {t.resume.title}
          </h2>
          <p style={{ fontSize: 18, color: C.slate, marginBottom: 40 }}>
            {t.resume.subtitle}
          </p>

          {!profile.name || !profile.education ? (
            <div style={{
              background: C.redLight, border: `1px solid ${C.red}`, borderRadius: 12,
              padding: 20, color: C.red, fontSize: 15, marginBottom: 24
            }}>
              ⚠️ {t.resume.warning}
            </div>
          ) : null}

          {!resumeData ? (
            <button onClick={handleGenerateResume}
              disabled={!profile.name || !profile.education || loadingResume}
              style={{
                padding: "16px 40px", borderRadius: 12, fontSize: 18, fontWeight: 700,
                background: C.navy, color: C.white, border: "none", cursor: "pointer",
                opacity: (!profile.name || !profile.education || loadingResume) ? 0.5 : 1
              }}>
              {loadingResume ? t.resume.generating : t.resume.generate}
            </button>
          ) : (
            <div style={{ background: cardBg, border: `1px solid ${borderColor}`, borderRadius: 16, padding: 48, textAlign: "left" }}>
              {/* Header */}
              <div style={{ borderBottom: `2px solid ${C.navy}`, paddingBottom: 20, marginBottom: 24 }}>
                <h1 style={{ fontSize: 32, fontWeight: 900, color: C.navy, marginBottom: 8 }}>{profile.name}</h1>
                <p style={{ fontSize: 15, color: C.slate }}>{profile.village} | {profile.goal}</p>
              </div>

              {/* Objective */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.objective}
                </h3>
                <p style={{ fontSize: 15, color: textColor, lineHeight: 1.7 }}>{resumeData.objective}</p>
              </div>

              {/* Education */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.education}
                </h3>
                <p style={{ fontSize: 15, color: textColor }}>{resumeData.education}</p>
              </div>

              {/* Skills */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.skills}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {resumeData.skills.map((skill, i) => (
                    <span key={i} style={{
                      background: C.navyLight, color: C.navy, padding: "6px 14px",
                      borderRadius: 20, fontSize: 13, fontWeight: 600
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.projects}
                </h3>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {resumeData.projects.map((p, i) => (
                    <li key={i} style={{ fontSize: 14, color: textColor, marginBottom: 8, lineHeight: 1.6 }}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Certifications */}
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.certifications}
                </h3>
                <ul style={{ paddingLeft: 20, margin: 0 }}>
                  {resumeData.certifications.map((c, i) => (
                    <li key={i} style={{ fontSize: 14, color: textColor, marginBottom: 8 }}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Languages */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: C.navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  {t.resume.languages}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {resumeData.languages.map((l, i) => (
                    <span key={i} style={{
                      background: C.greenLight, color: C.green, padding: "6px 14px",
                      borderRadius: 20, fontSize: 13, fontWeight: 600
                    }}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={copyResumeText} style={{
                  flex: 1, padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  background: C.saffron, color: C.white, border: "none", cursor: "pointer"
                }}>
                  {copiedResume ? t.resume.copied : t.resume.copy}
                </button>
                <button onClick={() => setResumeData(null)} style={{
                  flex: 1, padding: "12px", borderRadius: 10, fontSize: 15, fontWeight: 700,
                  background: "transparent", color: C.navy, border: `2px solid ${C.navy}`, cursor: "pointer"
                }}>
                  {t.resume.regenerate}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: C.navy, padding: "60px 24px 24px", color: C.white }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ fontSize: 40 }}>🎓</div>
            <span style={{ fontFamily: "'Baloo 2', cursive", fontSize: 28, fontWeight: 800 }}>Vidya AI</span>
          </div>
          <p style={{ fontSize: 16, color: "#94A3B8", marginBottom: 32 }}>{t.footer.tagline}</p>

          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginBottom: 40 }}>
            {[
              [t.nav.home, "#"],
              [t.nav.guidance, "#guidance"],
              [t.nav.courses, "#courses"],
              [t.nav.scholarships, "#scholarships"],
              [t.nav.internships, "#internships"],
              [t.nav.startup, "#startup"],
              [t.nav.mentors, "#mentors"],
            ].map(([label, href], i) => (
              <a key={i} href={href} style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }}
                onMouseOver={e => e.target.style.color = C.saffron}
                onMouseOut={e => e.target.style.color = "#94A3B8"}>
                {label}
              </a>
            ))}
          </div>

          <div style={{
            background: C.redLight, color: C.red, padding: "12px 24px",
            borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: "uppercase",
            letterSpacing: 1, display: "inline-block"
          }}>
            {t.footer.disclaimer}
          </div>
        </div>
      </footer>
    </div>
  );
}
