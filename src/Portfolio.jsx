import React, { useState } from "react";
import {
  FileText,
  Braces,
  Folder,
  FolderOpen,
  GraduationCap,
  Terminal,
  Github,
  Linkedin,
  Mail,
  Phone,
  ExternalLink,
  X,
  Menu,
  ChevronRight,
  ChevronDown,
  Circle,
} from "lucide-react";

const PROJECTS = [
  {
    id: "codetrackai",
    file: "codetrackai.js",
    title: "CodeTrackAI — LeetCode Progress Tracker",
    level: "ADVANCED",
    levelColor: "var(--red)",
    tech: ["React 18", "Vite", "Node.js", "Express", "MongoDB", "GraphQL API", "ApexCharts"],
    bullets: [
      "Full-stack analytics dashboard that visualizes LeetCode coding activity, contest performance, and streaks in real time",
      "Pulls live profile and contest data straight from LeetCode's GraphQL API — no mock data, ever",
      "Interactive contest-rating charts and GitHub-style submission heatmaps",
      "Built-in printable \"recruiter dossier\" view for sharing progress at a glance",
    ],
    github: "https://github.com/akxshay/CodeTrackAI",
    deployed: null,
  },
  {
    id: "todo",
    file: "to-do-app.py",
    title: "To-Do Web Application",
    level: "INTERMEDIATE",
    levelColor: "var(--yellow)",
    tech: ["Python", "Flask", "SQLite", "HTML/CSS/JS"],
    bullets: [
      "Full-stack task manager with per-user accounts and fully isolated data",
      "Secure auth: SHA-256 password hashing plus session-based protected routes",
      "Due-date tracking and task filtering in a clean, responsive UI",
      "Continuously deployed to production on Render straight from GitHub",
    ],
    github: "https://github.com/akxshay/to-do-list",
    deployed: "Render",
  },
  {
    id: "currency",
    file: "currency-converter.py",
    title: "Currency Converter Web App",
    level: "INTERMEDIATE",
    levelColor: "var(--yellow)",
    tech: ["Python", "Flask", "REST API", "HTML/CSS/JS"],
    bullets: [
      "Live converter supporting 25+ currencies via the ExchangeRate-API",
      "Real-time rates with instant conversion and a one-tap swap",
      "API keys kept out of source control using environment variables",
      "Continuously deployed to production on Vercel straight from GitHub",
    ],
    github: "https://github.com/akxshay/currency-convertor",
    deployed: "Vercel",
  },
  {
    id: "ipl",
    file: "ipl-tracker.js",
    title: "IPL Cricket Tracker",
    level: "INTERMEDIATE",
    levelColor: "var(--yellow)",
    tech: ["HTML5", "CSS3", "Vanilla JavaScript", "Cricket API"],
    bullets: [
      "Real-time IPL companion app for live scores, points table, schedules, and team profiles",
      "Built entirely in vanilla JS — zero framework overhead",
      "Actively evolving, with player stats and stadium info next on the roadmap",
    ],
    github: "https://github.com/akxshay/IPL-Cricket-Tracker",
    deployed: null,
  },
  {
    id: "pokefetch",
    file: "pokefetch.js",
    title: "PoKeFetch",
    level: "BEGINNER",
    levelColor: "var(--green)",
    tech: ["HTML", "CSS", "JavaScript", "PokeAPI"],
    bullets: [
      "Lightweight Pokémon lookup tool — search any name and pull its stats, types, and sprite",
      "An early project for getting comfortable with public REST APIs and async fetch in vanilla JS",
    ],
    github: "https://github.com/akxshay/PoKeFetch",
    deployed: null,
  },
];

const PROJECT_MAP = Object.fromEntries(PROJECTS.map((p) => [p.id, p]));

const FILE_META = {
  readme: { label: "README.md", icon: FileText, lang: "Markdown" },
  skills: { label: "skills.json", icon: Braces, lang: "JSON" },
  education: { label: "education.md", icon: GraduationCap, lang: "Markdown" },
  contact: { label: "contact.sh", icon: Terminal, lang: "Shell Script" },
};

PROJECTS.forEach((p) => {
  const lang = p.file.endsWith(".py")
    ? "Python"
    : p.file.endsWith(".js")
    ? "JavaScript"
    : "Text";
  FILE_META[p.id] = { label: p.file, icon: FileText, lang };
});

function Line({ n, children, indent }) {
  return (
    <div className="line">
      <span className="ln">{n}</span>
      <span className="lc" style={indent ? { paddingLeft: `${indent}em` } : undefined}>
        {children}
      </span>
    </div>
  );
}

function LevelTag({ level, color }) {
  return (
    <span className="level-tag" style={{ color, borderColor: color }}>
      {level}
    </span>
  );
}

function ProjectContent({ project, counter }) {
  const c = counter;
  const isPy = project.file.endsWith(".py");
  const commentTok = "#";
  return (
    <>
      <Line n={c()}>
        <span className="tok-muted">
          {commentTok} @level <LevelTag level={project.level} color={project.levelColor} />
        </span>
      </Line>
      <Line n={c()}>
        <span className="tok-muted">{commentTok} {project.title}</span>
      </Line>
      <Line n={c()}> </Line>
      <Line n={c()}>
        <span className="tok-purple">{isPy ? "tech_stack" : "const techStack"}</span>{" "}
        <span className="tok-fg">=</span> <span className="tok-fg">[</span>
      </Line>
      {project.tech.map((t, i) => (
        <Line n={c()} indent={1} key={t}>
          <span className="tok-green">"{t}"</span>
          <span className="tok-fg">{i < project.tech.length - 1 ? "," : ""}</span>
        </Line>
      ))}
      <Line n={c()}>
        <span className="tok-fg">]</span>
        {!isPy && <span className="tok-fg">;</span>}
      </Line>
      <Line n={c()}> </Line>
      <Line n={c()}>
        <span className="tok-purple">{isPy ? "highlights" : "const highlights"}</span>{" "}
        <span className="tok-fg">=</span> <span className="tok-fg">[</span>
      </Line>
      {project.bullets.map((b, i) => (
        <Line n={c()} indent={1} key={i}>
          <span className="tok-cyan">"{b}"</span>
          <span className="tok-fg">{i < project.bullets.length - 1 ? "," : ""}</span>
        </Line>
      ))}
      <Line n={c()}>
        <span className="tok-fg">]</span>
        {!isPy && <span className="tok-fg">;</span>}
      </Line>
      <Line n={c()}> </Line>
      <Line n={c()}>
        <span className="tok-muted">{commentTok} links</span>
      </Line>
      <Line n={c()}>
        <a className="link-pill" href={project.github} target="_blank" rel="noreferrer">
          <Github size={13} /> View source <ExternalLink size={11} />
        </a>
        {project.deployed && (
          <span className="deployed-badge">
            <Circle size={7} fill="var(--green)" stroke="none" /> Deployed on {project.deployed}
          </span>
        )}
      </Line>
    </>
  );
}

export default function Portfolio() {
  const [activeFile, setActiveFile] = useState("readme");
  const [openTabs, setOpenTabs] = useState(["readme"]);
  const [projectsExpanded, setProjectsExpanded] = useState(true);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const openFile = (id) => {
    setOpenTabs((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setActiveFile(id);
  };

  const closeTab = (id, e) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((t) => t !== id);
      const finalTabs = next.length ? next : ["readme"];
      if (activeFile === id) {
        setActiveFile(finalTabs[finalTabs.length - 1]);
      }
      return finalTabs;
    });
  };

  const makeCounter = () => {
    let n = 0;
    return () => {
      n += 1;
      return n;
    };
  };

  const renderReadme = () => {
    const c = makeCounter();
    return (
      <>
        <Line n={c()}>
          <span className="tok-purple tok-h1"># Akshay Kumar S</span>
        </Line>
        <Line n={c()}>
          <span className="tok-muted">{">"} Full-Stack Developer &amp; CS Engineering Student</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-fg">```</span>
        </Line>
        <Line n={c()}>
          <span className="tok-cyan">Location</span>
          <span className="tok-fg">: </span>
          <span className="tok-green">Kasaragod, Kerala, India</span>
        </Line>
        <Line n={c()}>
          <span className="tok-cyan">Email</span>
          <span className="tok-fg">: </span>
          <a className="tok-blue inline-link" href="mailto:akshaykumarz41919@gmail.com">
            akshaykumarz41919@gmail.com
          </a>
        </Line>
        <Line n={c()}>
          <span className="tok-cyan">Phone</span>
          <span className="tok-fg">: </span>
          <span className="tok-green">+91 9497264291</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">```</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-blue tok-h2">## About</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">
            Computer Science &amp; Engineering student who likes building full-stack apps end
            to end — from REST APIs to the dashboards on top of them. Comfortable moving across
            the stack in Java, Python, and JavaScript, and I've shipped more than one side
            project to a real production URL instead of leaving it on localhost.
          </span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-blue tok-h2">## Currently</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">- 🎓 B.E. in CS&amp;E @ Canara Engineering College, Mangalore — CGPA 8.11</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">- 🛠️ Building full-stack projects with React, Node.js, and Flask</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">- 📍 Based in Kasaragod, Kerala</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-muted">
            &lt;!-- open the explorer on the left to read skills.json, browse projects/, or run contact.sh --&gt;
          </span>
        </Line>
      </>
    );
  };

  const renderSkills = () => {
    const c = makeCounter();
    const groups = [
      ["languages", ["Java", "C++", "JavaScript", "SQL", "Python"]],
      ["frontend", ["React.js", "HTML5", "CSS3", "JavaScript", "jQuery"]],
      ["backend", ["Node.js", "Express.js", "Flask", "REST APIs"]],
      ["databases", ["MongoDB", "MySQL", "PostgreSQL", "SQLite"]],
      ["tools", ["Git", "GitHub", "VS Code", "Render", "Vercel", "Google Cloud"]],
    ];
    return (
      <>
        <Line n={c()}>
          <span className="tok-fg">{"{"}</span>
        </Line>
        {groups.map(([key, vals], gi) => (
          <React.Fragment key={key}>
            <Line n={c()} indent={1}>
              <span className="tok-red">"{key}"</span>
              <span className="tok-fg">: [</span>
            </Line>
            {vals.map((v, i) => (
              <Line n={c()} indent={2} key={v}>
                <span className="tok-green">"{v}"</span>
                <span className="tok-fg">{i < vals.length - 1 ? "," : ""}</span>
              </Line>
            ))}
            <Line n={c()} indent={1}>
              <span className="tok-fg">]{gi < groups.length - 1 ? "," : ""}</span>
            </Line>
          </React.Fragment>
        ))}
        <Line n={c()}>
          <span className="tok-fg">{"}"}</span>
        </Line>
      </>
    );
  };

  const renderEducation = () => {
    const c = makeCounter();
    return (
      <>
        <Line n={c()}>
          <span className="tok-purple tok-h1"># Education</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-blue tok-h2">## Canara Engineering College</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">Mangalore, Karnataka</span>
        </Line>
        <Line n={c()}>
          <span className="tok-green">Bachelor of Engineering, Computer Science &amp; Engineering</span>
        </Line>
        <Line n={c()}>
          <span className="tok-cyan">CGPA: </span>
          <span className="tok-yellow">8.11</span>
          <span className="tok-muted"> · March 2023 – Present</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-blue tok-h2">## Vittal Pre-University College</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">Vitla, Karnataka</span>
        </Line>
        <Line n={c()}>
          <span className="tok-green">Pre-University Course — PCMC</span>
        </Line>
        <Line n={c()}>
          <span className="tok-cyan">Percentage: </span>
          <span className="tok-yellow">78%</span>
          <span className="tok-muted"> · June 2021 – March 2023</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-blue tok-h2">## Relevant Coursework</span>
        </Line>
        <Line n={c()}>
          <span className="tok-fg">
            Data Structures &amp; Algorithms, Database Management Systems, Operating Systems,
            Computer Networks, Object-Oriented Programming
          </span>
        </Line>
      </>
    );
  };

  const renderContact = () => {
    const c = makeCounter();
    return (
      <>
        <Line n={c()}>
          <span className="tok-muted">#!/bin/bash</span>
        </Line>
        <Line n={c()}>
          <span className="tok-muted"># let's build something</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-purple">EMAIL</span>
          <span className="tok-fg">=</span>
          <a className="tok-green inline-link" href="mailto:akshaykumarz41919@gmail.com">
            "akshaykumarz41919@gmail.com"
          </a>
        </Line>
        <Line n={c()}>
          <span className="tok-purple">PHONE</span>
          <span className="tok-fg">=</span>
          <span className="tok-green">"+91 9497264291"</span>
        </Line>
        <Line n={c()}>
          <span className="tok-purple">LOCATION</span>
          <span className="tok-fg">=</span>
          <span className="tok-green">"Kasaragod, Kerala, India"</span>
        </Line>
        <Line n={c()}>
          <span className="tok-purple">GITHUB</span>
          <span className="tok-fg">=</span>
          <a className="tok-green inline-link" href="https://github.com/akxshay" target="_blank" rel="noreferrer">
            "github.com/akxshay"
          </a>
        </Line>
        <Line n={c()}>
          <span className="tok-purple">LINKEDIN</span>
          <span className="tok-fg">=</span>
          <a
            className="tok-green inline-link"
            href="https://linkedin.com/in/akshay-kumar-s-710861227"
            target="_blank"
            rel="noreferrer"
          >
            "linkedin.com/in/akshay-kumar-s"
          </a>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="tok-muted">echo</span> <span className="tok-green">"reach out — open to opportunities"</span>
        </Line>
        <Line n={c()}> </Line>
        <Line n={c()}>
          <span className="contact-buttons">
            <a className="link-pill" href="mailto:akshaykumarz41919@gmail.com">
              <Mail size={13} /> Email
            </a>
            <a className="link-pill" href="https://linkedin.com/in/akshay-kumar-s-710861227" target="_blank" rel="noreferrer">
              <Linkedin size={13} /> LinkedIn
            </a>
            <a className="link-pill" href="https://github.com/akxshay" target="_blank" rel="noreferrer">
              <Github size={13} /> GitHub
            </a>
            <a className="link-pill" href="tel:+919497264291">
              <Phone size={13} /> Call
            </a>
          </span>
        </Line>
        <Line n={c()}>
          <span className="cursor-blink">▌</span>
        </Line>
      </>
    );
  };

  const renderProject = (id) => {
    const c = makeCounter();
    return <ProjectContent project={PROJECT_MAP[id]} counter={c} />;
  };

  const renderActive = () => {
    if (activeFile === "readme") return renderReadme();
    if (activeFile === "skills") return renderSkills();
    if (activeFile === "education") return renderEducation();
    if (activeFile === "contact") return renderContact();
    if (PROJECT_MAP[activeFile]) return renderProject(activeFile);
    return null;
  };

  const activeMeta = FILE_META[activeFile];

  return (
    <div className="ide-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&display=swap');

        .ide-page {
          --bg: #282c34;
          --bg-side: #21252b;
          --bg-elev: #2c313c;
          --bg-hover: #2f343e;
          --border: #181a1f;
          --fg: #abb2bf;
          --fg-bright: #e6e6e6;
          --fg-muted: #5c6370;
          --blue: #61afef;
          --green: #98c379;
          --purple: #c678dd;
          --yellow: #e5c07b;
          --red: #e06c75;
          --cyan: #56b6c2;

          font-family: 'JetBrains Mono', ui-monospace, 'SFMono-Regular', Menlo, monospace;
          background: var(--bg);
          display: flex;
          box-sizing: border-box;
          width: 100%;
          height: 100vh;
        }
        .ide-page *, .ide-page *::before, .ide-page *::after { box-sizing: border-box; }

        .ide-window {
          width: 100%;
          height: 100%;
          background: var(--bg);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .titlebar {
          background: var(--bg-side);
          border-bottom: 1px solid var(--border);
          display: flex;
          align-items: center;
          padding: 10px 14px;
          gap: 12px;
          flex-shrink: 0;
        }
        .traffic-lights { display: flex; gap: 7px; flex-shrink: 0; }
        .dot { width: 11px; height: 11px; border-radius: 50%; }
        .dot.red { background: #e0605a; }
        .dot.yellow { background: #e5bf52; }
        .dot.green { background: #5cb85c; }
        .titlebar-title {
          flex: 1;
          text-align: center;
          font-size: 12px;
          color: var(--fg-muted);
          letter-spacing: 0.02em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .availability {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--green);
          flex-shrink: 0;
          white-space: nowrap;
        }
        .pulse-dot {
          width: 7px; height: 7px; border-radius: 50%; background: var(--green);
          box-shadow: 0 0 0 0 rgba(152,195,121,0.6);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(152,195,121,0.55); }
          70% { box-shadow: 0 0 0 6px rgba(152,195,121,0); }
          100% { box-shadow: 0 0 0 0 rgba(152,195,121,0); }
        }
        .sidebar-toggle {
          display: none;
          background: none; border: none; color: var(--fg-muted); cursor: pointer;
          padding: 2px;
        }

        .ide-body { display: flex; flex: 1; min-height: 0; }

        .sidebar {
          width: 240px;
          flex-shrink: 0;
          background: var(--bg-side);
          border-right: 1px solid var(--border);
          padding: 14px 0;
          overflow-y: auto;
        }
        .sidebar-label {
          font-size: 11px;
          color: var(--fg-muted);
          letter-spacing: 0.12em;
          padding: 0 16px 10px;
          font-weight: 700;
        }
        .tree-item {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 5px 16px;
          font-size: 13px;
          color: var(--fg);
          cursor: pointer;
          user-select: none;
          border-left: 2px solid transparent;
          white-space: nowrap;
        }
        .tree-item:hover { background: var(--bg-hover); }
        .tree-item.active {
          background: var(--bg-elev);
          color: var(--fg-bright);
          border-left: 2px solid var(--blue);
        }
        .tree-item svg { flex-shrink: 0; }
        .tree-children { padding-left: 14px; }
        .tree-folder-label { flex: 1; }
        .level-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; margin-left: auto; }
        .group-label {
          font-size: 10px;
          color: var(--fg-muted);
          padding: 8px 16px 2px 36px;
          letter-spacing: 0.08em;
        }

        .editor-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          min-height: 0;
        }

        .tabs {
          display: flex;
          background: var(--bg-side);
          border-bottom: 1px solid var(--border);
          overflow-x: auto;
          flex-shrink: 0;
        }
        .tab {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 9px 10px 9px 14px;
          font-size: 12.5px;
          color: var(--fg-muted);
          border-right: 1px solid var(--border);
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .tab:hover { color: var(--fg); }
        .tab.active {
          background: var(--bg);
          color: var(--fg-bright);
          box-shadow: inset 0 -2px 0 var(--blue);
        }
        .tab-close {
          opacity: 0;
          display: flex;
          border-radius: 3px;
          padding: 2px;
        }
        .tab:hover .tab-close { opacity: 0.7; }
        .tab-close:hover { opacity: 1 !important; background: rgba(255,255,255,0.08); }

        .content-pane {
          flex: 1;
          overflow-y: auto;
          padding: 18px 0 18px 0;
          font-size: 13px;
          line-height: 1.85;
        }

        .line { display: flex; padding: 0 18px; }
        .ln {
          width: 2.4em;
          flex-shrink: 0;
          text-align: right;
          padding-right: 1.2em;
          color: #495162;
          user-select: none;
          font-size: 12px;
        }
        .lc { flex: 1; min-width: 0; word-break: break-word; }

        .tok-fg { color: var(--fg); }
        .tok-muted { color: var(--fg-muted); font-style: italic; }
        .tok-blue { color: var(--blue); }
        .tok-green { color: var(--green); }
        .tok-purple { color: var(--purple); }
        .tok-yellow { color: var(--yellow); }
        .tok-red { color: var(--red); }
        .tok-cyan { color: var(--cyan); }
        .tok-h1 { font-size: 20px; font-weight: 800; }
        .tok-h2 { font-size: 14.5px; font-weight: 700; }

        .inline-link { text-decoration: none; }
        .inline-link:hover { text-decoration: underline; }

        .level-tag {
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.06em;
          border: 1px solid;
          border-radius: 4px;
          padding: 1px 6px;
          margin-left: 4px;
        }

        .link-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--bg-elev);
          border: 1px solid var(--border);
          color: var(--fg-bright);
          text-decoration: none;
          padding: 5px 11px;
          border-radius: 6px;
          font-size: 12.5px;
          margin-right: 8px;
          transition: border-color 0.15s ease;
        }
        .link-pill:hover { border-color: var(--blue); color: var(--blue); }

        .deployed-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 11.5px;
          color: var(--fg-muted);
        }

        .contact-buttons { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }

        .cursor-blink {
          color: var(--green);
          animation: blink 1s steps(1) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }

        .statusbar {
          background: var(--bg-side);
          border-top: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 14px;
          font-size: 11px;
          color: var(--fg-muted);
          flex-shrink: 0;
        }
        .statusbar-left, .statusbar-right { display: flex; align-items: center; gap: 14px; }
        .branch { display: flex; align-items: center; gap: 5px; color: var(--blue); }

        @media (max-width: 680px) {
          .sidebar-toggle { display: flex; }
          .sidebar {
            position: absolute;
            z-index: 5;
            height: 100%;
            box-shadow: 4px 0 16px rgba(0,0,0,0.4);
          }
          .sidebar.hidden { display: none; }
          .availability span.av-text { display: none; }
          .statusbar-left, .statusbar-right { gap: 8px; }
        }
      `}</style>

      <div className="ide-window">
        <div className="titlebar">
          <div className="traffic-lights">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <button
            className="sidebar-toggle"
            onClick={() => setSidebarVisible((v) => !v)}
            aria-label="Toggle file explorer"
          >
            <Menu size={16} />
          </button>
          <div className="titlebar-title">akshay-kumar-s — portfolio</div>
          <div className="availability">
            <span className="pulse-dot" />
            <span className="av-text">open to opportunities</span>
          </div>
        </div>

        <div className="ide-body">
          <div className={`sidebar ${sidebarVisible ? "" : "hidden"}`}>
            <div className="sidebar-label">EXPLORER</div>

            {["readme", "skills"].map((id) => {
              const meta = FILE_META[id];
              const Icon = meta.icon;
              return (
                <div
                  key={id}
                  className={`tree-item ${activeFile === id ? "active" : ""}`}
                  onClick={() => openFile(id)}
                >
                  <Icon size={14} color={id === "readme" ? "var(--blue)" : "var(--yellow)"} />
                  <span className="tree-folder-label">{meta.label}</span>
                </div>
              );
            })}

            <div className="tree-item" onClick={() => setProjectsExpanded((v) => !v)}>
              {projectsExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              {projectsExpanded ? (
                <FolderOpen size={14} color="var(--purple)" />
              ) : (
                <Folder size={14} color="var(--purple)" />
              )}
              <span className="tree-folder-label">projects</span>
            </div>

            {projectsExpanded && (
              <div className="tree-children">
                {["ADVANCED", "INTERMEDIATE", "BEGINNER"].map((level) => (
                  <React.Fragment key={level}>
                    <div className="group-label">// {level.toLowerCase()}</div>
                    {PROJECTS.filter((p) => p.level === level).map((p) => (
                      <div
                        key={p.id}
                        className={`tree-item ${activeFile === p.id ? "active" : ""}`}
                        style={{ paddingLeft: 30 }}
                        onClick={() => openFile(p.id)}
                      >
                        <FileText size={14} color="var(--fg-muted)" />
                        <span className="tree-folder-label">{p.file}</span>
                        <span className="level-dot" style={{ background: p.levelColor }} />
                      </div>
                    ))}
                  </React.Fragment>
                ))}
              </div>
            )}

            {["education", "contact"].map((id) => {
              const meta = FILE_META[id];
              const Icon = meta.icon;
              return (
                <div
                  key={id}
                  className={`tree-item ${activeFile === id ? "active" : ""}`}
                  onClick={() => openFile(id)}
                >
                  <Icon size={14} color={id === "education" ? "var(--cyan)" : "var(--green)"} />
                  <span className="tree-folder-label">{meta.label}</span>
                </div>
              );
            })}
          </div>

          <div className="editor-area">
            <div className="tabs">
              {openTabs.map((id) => {
                const meta = FILE_META[id];
                const Icon = meta.icon;
                return (
                  <div
                    key={id}
                    className={`tab ${activeFile === id ? "active" : ""}`}
                    onClick={() => setActiveFile(id)}
                  >
                    <Icon size={13} />
                    {meta.label}
                    <span className="tab-close" onClick={(e) => closeTab(id, e)}>
                      <X size={12} />
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="content-pane">{renderActive()}</div>

            <div className="statusbar">
              <div className="statusbar-left">
                <span className="branch">
                  ⎇ main
                </span>
                <span>{openTabs.length} file{openTabs.length !== 1 ? "s" : ""} open</span>
              </div>
              <div className="statusbar-right">
                <span>{activeMeta ? activeMeta.lang : ""}</span>
                <span>UTF-8</span>
                <span>LF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
