"use client";

import React, { useMemo } from "react";
import { marked } from "marked";

const PDF_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=16k61cKgsPdijBr9rRsmSSntPttStF8I5";

const RESUME_MARKDOWN = `# PUSHKAR AMAR SHINDE

Location: Dombivli, Maharashtra  
Website: pushkarshinde.in  
Phone: 9552556876  
Email: pushkarshinde006@gmail.com  
Links: [LinkedIn](https://www.linkedin.com/in/pushkarshinde6/) | [GitHub](https://github.com/Pushkar3232)  

---

## Professional Summary
Software Developer with strong skills in Full Stack Development and AI-based systems.  
Experienced in building scalable applications and mentoring 200+ students in Python and data analysis.  
Proficient in modern technologies like React, FastAPI, and Vector Databases, with a focus on solving real-world problems efficiently.

---

## Experience

### Python Mentor | V2V EdTech LLP  
June 2025 – August 2025  
Kalyan, Maharashtra (Onsite)

- Mentored 200+ students in Python and Data Analysis internship  
- Conducted interactive sessions and resolved technical doubts  
- Guided interns on industry best practices and project development  
- Contributed to organizing a Hackathon, promoting innovation and teamwork  
- LinkedIn post: [V2V Internship highlight](https://www.linkedin.com/feed/update/urn:li:activity:7382061648850718720/)  

---

## Key Projects

### V2V Internship Portal
- Developed a web platform used by 500+ interns for daily task submissions  
- Improved task submission efficiency by ~70% through streamlined workflow  
- Implemented secure document upload and real-time user tracking system  
- **Repository:** https://github.com/Pushkar3232/interns  
- **Technologies:** React, TypeScript, Firebase  

---

### Private AI Chatbot (Offline AI)
- Built a privacy-focused offline AI chatbot  
- Implemented RAG architecture with Vector DB (ChromaDB + MongoDB)  
- Developed backend using Python and FastAPI  
- **Repository:** https://github.com/Pushkar3232/PrivateAI  
- **Technologies:** Python, FastAPI, MongoDB, ChromaDB, React, JavaScript, PyTorch  

---

### FastShare – File Sharing Platform
- Created a platform used by 1000+ users for file sharing  
- Reduced file-sharing time by ~60% using optimized room-based system  
- **Repository:** https://github.com/Pushkar3232/FastShare  
- **Technologies:** Next.js, TypeScript, Supabase, PostgreSQL  

---

## Education

### Bachelor of Engineering, CSE (Data Science)  
2025 – 2028 (Currently Pursuing)  
A P Shah Institute of Technology, Thane  

### Diploma in Computer Engineering  
2022 – 2025  
Aggregate: 86.44%  
S H Jondhale Polytechnic, Dombivli  

---

## Technical Skills

- **Programming:** Python, JavaScript, TypeScript  
- **Web Development:** React.js, Next.js  
- **Mobile App Development:** Flutter  
- **Backend Development:** FastAPI, Flask, REST APIs  
- **Databases:** MongoDB, PostgreSQL, Firestore, Supabase  
- **AI:** RAG, Vector Databases, Model Fine-tuning  

---

## Key Accomplishments

- Finalist in 2 National Level Hackathons
`;

const ResumeWebView: React.FC = () => {
  const html = useMemo(() => {
    marked.setOptions({ breaks: true });
    return marked.parse(RESUME_MARKDOWN) as string;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Web Resume
          </p>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Clean, readable digital format
          </h2>
        </div>
        <a
          href={PDF_DOWNLOAD_URL}
          download
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:border-primary hover:text-primary"
        >
          Download PDF
        </a>
      </div>
      <div className="rounded-2xl border border-border bg-card/80 p-6 shadow-sm sm:p-8">
        <div
          className="resume-markdown"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default ResumeWebView;
