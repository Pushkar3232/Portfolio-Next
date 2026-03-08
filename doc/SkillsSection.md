# Interactive Skills Section — Portfolio Component

A visually engaging skills section featuring a **half-circle category selector** on the left and **animated skill logos** on the right. Clicking a category reveals all its tech logos with smooth transitions.

---

## Component Preview Behavior

```
[ Half Circle ]          [ Skill Logos Grid ]
  🌐  ←── hover → "Programming"
  🤖  ←── hover → "Web Development"       Next.js  React  TailwindCSS
  🔥  ←── click  → active ──────────────►  
  🧠  ←── hover → "AI & Machine Learning"
```

---

## Full Component Code

```tsx
"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
  logo: string; // URL or local path to the logo image
}

interface SkillCategory {
  category: string;
  icon: string;       // emoji or icon component
  color: string;      // accent color for the active ring
  skills: Skill[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const skillCategories: SkillCategory[] = [
  {
    category: "Programming",
    icon: "🌐",
    color: "#6366f1",
    skills: [
      { name: "Python",     logo: "https://cdn.simpleicons.org/python" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript" },
      { name: "JavaScript", logo: "https://cdn.simpleicons.org/javascript" },
    ],
  },
  {
    category: "Web Development",
    icon: "🤖",
    color: "#0ea5e9",
    skills: [
      { name: "React",      logo: "https://cdn.simpleicons.org/react" },
      { name: "Next.js",    logo: "https://cdn.simpleicons.org/nextdotjs" },
      { name: "TailwindCSS",logo: "https://cdn.simpleicons.org/tailwindcss" },
    ],
  },
  {
    category: "Backend & Database",
    icon: "🔥",
    color: "#f97316",
    skills: [
      { name: "FastAPI",  logo: "https://cdn.simpleicons.org/fastapi" },
      { name: "Firebase", logo: "https://cdn.simpleicons.org/firebase" },
      { name: "MongoDB",  logo: "https://cdn.simpleicons.org/mongodb" },
    ],
  },
  {
    category: "AI & Machine Learning",
    icon: "🧠",
    color: "#a855f7",
    skills: [
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain" },
      { name: "Vector DB",  logo: "/icons/vectordb.svg" }, // custom icon
      { name: "GenAI",      logo: "/icons/genai.svg" },    // custom icon
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const active = skillCategories[activeIndex];

  return (
    <section className="skills-section">
      {/* ── Left: Half-Circle Selector ── */}
      <div className="half-circle-wrapper">
        <div className="half-circle">
          {skillCategories.map((cat, i) => (
            <button
              key={cat.category}
              className={`category-icon ${activeIndex === i ? "active" : ""}`}
              style={activeIndex === i ? { "--accent": cat.color } as React.CSSProperties : {}}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              aria-label={cat.category}
            >
              <span className="icon">{cat.icon}</span>

              {/* Tooltip on hover */}
              {hoveredIndex === i && (
                <span className="tooltip">{cat.category}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: Skill Logos ── */}
      <div className="skills-display">
        <h3 className="category-title">{active.category}</h3>

        <div className="logos-grid">
          {active.skills.map((skill) => (
            <div key={skill.name} className="logo-card">
              <Image
                src={skill.logo}
                alt={skill.name}
                width={64}
                height={64}
                className="skill-logo"
              />
              <span className="skill-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## CSS (Tailwind + Custom)

Add this to your `globals.css` or a module file:

```css
/* ── Layout ── */
.skills-section {
  display: flex;
  align-items: center;
  gap: 4rem;
  padding: 4rem 2rem;
  min-height: 420px;
}

/* ── Half Circle ── */
.half-circle-wrapper {
  position: relative;
  width: 220px;
  height: 400px;
  flex-shrink: 0;
}

.half-circle {
  position: absolute;
  left: -110px;               /* hide the right half off-screen left */
  width: 220px;
  height: 400px;
  border-radius: 50%;
  background: #e0e7ff;        /* light lavender — matches your screenshot */
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;      /* icons sit on the visible right edge */
  padding-right: 1.5rem;
  overflow: visible;
}

/* ── Category Icon Buttons ── */
.category-icon {
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.category-icon:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}

.category-icon.active {
  outline: 2.5px solid var(--accent, #6366f1);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--accent) 20%, transparent);
}

.icon {
  font-size: 1.25rem;
  pointer-events: none;
}

/* ── Tooltip ── */
.tooltip {
  position: absolute;
  left: calc(100% + 10px);
  white-space: nowrap;
  background: #1e1e2e;
  color: #fff;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 6px;
  pointer-events: none;
  animation: fadeIn 0.15s ease;
  z-index: 10;
}

.tooltip::before {
  content: "";
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  border: 5px solid transparent;
  border-right-color: #1e1e2e;
}

/* ── Skills Display ── */
.skills-display {
  flex: 1;
}

.category-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1e1e2e;
}

.logos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 1.5rem;
}

.logo-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: popIn 0.3s ease both;
}

.logo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.skill-logo {
  object-fit: contain;
}

.skill-name {
  font-size: 0.8rem;
  font-weight: 500;
  color: #475569;
  text-align: center;
}

/* ── Animations ── */
@keyframes fadeIn {
  from { opacity: 0; transform: translateX(-4px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes popIn {
  from { opacity: 0; transform: scale(0.85); }
  to   { opacity: 1; transform: scale(1); }
}
```

---

## How It Works

| Interaction | Behavior |
|---|---|
| **Hover** icon | Tooltip fades in showing category name |
| **Click** icon | Active state + accent ring, logos update on the right |
| **Logo appears** | `popIn` animation — each card scales in smoothly |
| **Logo hover** | Card lifts with a subtle shadow |

---

## Logo Sources

Use [Simple Icons CDN](https://simpleicons.org/) for most tech logos:

```
https://cdn.simpleicons.org/{icon-slug}
```

| Skill | Slug |
|---|---|
| Python | `python` |
| TypeScript | `typescript` |
| JavaScript | `javascript` |
| React | `react` |
| Next.js | `nextdotjs` |
| TailwindCSS | `tailwindcss` |
| FastAPI | `fastapi` |
| Firebase | `firebase` |
| MongoDB | `mongodb` |

> For **LangChain**, **Vector DB**, and **GenAI** — use custom SVGs placed in `/public/icons/`.

---

## Customization

```tsx
// Change the half-circle color
background: "#e0e7ff"   // → your brand color

// Adjust icon positions — change padding on .half-circle
padding-right: "1.5rem" // → more/less to shift icons

// Add more categories — just push to skillCategories array
```

---

## File Structure

```
components/
└── SkillsSection/
    ├── index.tsx          ← main component
    └── skills.css         ← styles (or use Tailwind classes inline)

public/
└── icons/
    ├── vectordb.svg
    └── genai.svg
```
