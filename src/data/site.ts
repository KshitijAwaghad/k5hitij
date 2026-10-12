export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  handle: string;
}

export interface SkillCategory {
  category: "Frontend" | "Backend" | "Database" | "Tools & DevOps";
  skills: Array<{
    name: string;
    icon?: string;
    featured?: boolean;
  }>;
}

export interface ArchitectureNode {
  id: string;
  label: string;
  sublabel: string;
  type: "client" | "api" | "db" | "queue" | "auth" | "cache";
  description: string;
  rationale: string;
  tech: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  role: string;
  category: "Full-Stack" | "Web Application" | "Systems";
  featured: boolean;
  tech: string[];
  links: {
    github?: string;
    live?: string;
  };
  caseStudy: {
    problem: string;
    roleDetails: string;
    keyFeatures: string[];
    challengesLearned: string[];
    architectureSummary: string;
    architectureNodes?: ArchitectureNode[];
  };
  imagePlaceholder?: string;
}

export interface ExperienceItem {
  id: string;
  type: "experience" | "education";
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  skills?: string[];
  isCurrent?: boolean;
}

export interface NoteItem {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
  content?: string;
}

export interface SiteConfig {
  owner: {
    name: string;
    handle: string;
    role: string;
    headline: string;
    location: string;
    bio: string;
    learningNow: string[];
    statusBadge: string;
    isAvailableForWork: boolean;
    email: string;
    resumeUrl: string; // e.g. "/resume.pdf"
  };
  socials: {
    github: string;
    linkedin: string;
    x: string;
    email: string;
  };
  navLinks: Array<{ label: string; href: string }>;
  skills: SkillCategory[];
  projects: Project[];
  timeline: ExperienceItem[];
  notes: NoteItem[];
}

export const siteData: SiteConfig = {
  owner: {
    name: "Kshitij Awaghad",
    handle: "k5hitij",
    role: "Full-Stack Developer",
    headline: "Building resilient, performant web software with modern TypeScript systems.",
    location: "India",
    bio: "I am a full-stack developer dedicated to crafting fast, accessible, and maintainable web applications. I focus on end-to-end TypeScript architectures, responsive interface engineering, and robust backend integrations.",
    learningNow: [
      "Distributed systems patterns & event-driven queues",
      "Advanced Next.js App Router internal caching & partial prerendering",
      "Database indexing & query execution plan optimization",
    ],
    statusBadge: "Open to internships & collaborative projects",
    isAvailableForWork: true,
    email: "kshitijavaghad255@gmail.com",
    resumeUrl: "/resume.pdf",
  },
  socials: {
    github: "https://github.com/KshitijAwaghad",
    linkedin: "https://www.linkedin.com/in/kshitijawaghad",
    x: "https://x.com/k5hitij_5",
    email: "mailto:kshitijavaghad255@gmail.com",
  },
  navLinks: [
    { label: "// projects", href: "#projects" },
    { label: "// skills", href: "#skills" },
    { label: "// education", href: "#education" },
    { label: "// github", href: "#github" },
    { label: "// contact", href: "#contact" },
  ],
  skills: [
    {
      category: "Frontend",
      skills: [
        { name: "React 19 / 18", featured: true },
        { name: "Next.js (App Router)", featured: true },
        { name: "TypeScript", featured: true },
        { name: "Tailwind CSS", featured: true },
        { name: "Framer Motion" },
        { name: "HTML5 & Semantic Markup" },
        { name: "CSS3 / Modern CSS" },
        { name: "Responsive & Accessible UI" },
      ],
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", featured: true },
        { name: "Express.js" },
        { name: "Next.js Route Handlers", featured: true },
        { name: "RESTful APIs", featured: true },
        { name: "Server Actions" },
        { name: "Authentication (JWT / OAuth / Auth.js)" },
      ],
    },
    {
      category: "Database",
      skills: [
        { name: "PostgreSQL", featured: true },
        { name: "MongoDB" },
        { name: "Prisma ORM", featured: true },
        { name: "SQL Schema Design" },
        { name: "Redis Caching" },
      ],
    },
    {
      category: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", featured: true },
        { name: "Vercel Deployment", featured: true },
        { name: "Docker (Basics)" },
        { name: "Postman" },
        { name: "Linux / Bash" },
        { name: "VS Code" },
      ],
    },
  ],
  projects: [
    {
      slug: "expensewise",
      title: "ExpenseWise",
      tagline: "Full-stack personal finance tracker engineered for speed and clarity",
      description: "A comprehensive personal finance tracking suite with categorized expense logging, recurring budget thresholds, and analytical breakdown reports.",
      role: "Full-Stack Developer (Design, Schema, Full Implementation)",
      category: "Full-Stack",
      featured: true,
      tech: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
      links: {
        github: "https://github.com/KshitijAwaghad/ExpenseWise",
        live: undefined,
      },
      caseStudy: {
        problem: "Users often find budgeting tools either overwhelmingly complex or lacking real-time transactional clarity. ExpenseWise was built to eliminate manual friction while providing instant insights into recurring spending.",
        roleDetails: "Architected the relational schema, developed the transactional Next.js API endpoints, created interactive analytical views, and implemented responsive client components with optimistic UI states.",
        keyFeatures: [
          "Interactive dashboard with visual expense category distributions",
          "Custom budgeting caps with threshold alert markers",
          "Optimistic UI updates for instant entry creation and deletion",
          "Automated monthly breakdown summaries",
        ],
        challengesLearned: [
          "Mitigating rounding inconsistencies by standardizing currency calculations into integer cents.",
          "Structuring composite indexes in PostgreSQL to keep ledger aggregation queries sub-50ms.",
          "Preventing waterfall client fetches through Next.js Server Components streaming.",
        ],
        architectureSummary: "Built around a Next.js Server Component client connected to Route Handlers and Prisma ORM accessing an indexed PostgreSQL database, with an in-memory caching layer for aggregated monthly stats.",
        architectureNodes: [
          {
            id: "client",
            label: "Next.js App Client",
            sublabel: "React Server & Client Components",
            type: "client",
            tech: "Next.js, Tailwind, Framer Motion",
            description: "Renders the dashboard with zero-layout-shift data hydration, managing user state and optimistic ledger updates.",
            rationale: "Selected for fast first contentful paint and streamlined streaming of server-rendered ledger tables.",
          },
          {
            id: "api",
            label: "API & Server Actions",
            sublabel: "Type-safe route handlers",
            type: "api",
            tech: "Next.js Route Handlers + Zod",
            description: "Validates incoming financial payload records, runs authorization checks, and dispatches transactional mutations.",
            rationale: "Ensures type contract safety from form input directly into database writes with strict runtime validation schemas.",
          },
          {
            id: "db",
            label: "PostgreSQL Database",
            sublabel: "Normalized ledger storage",
            type: "db",
            tech: "PostgreSQL + Prisma",
            description: "Stores transactions, category rules, budget limits, and user profiles with foreign key integrity.",
            rationale: "Relational integrity is non-negotiable for ledger balances; guarantees consistency across concurrent updates.",
          },
          {
            id: "cache",
            label: "Aggregations & Cache",
            sublabel: "Summary memoization",
            type: "cache",
            tech: "Next.js Cache & In-Memory Store",
            description: "Memoizes complex monthly group-by computations to avoid re-querying raw transaction rows repeatedly.",
            rationale: "Cuts down database I/O by over 70% during peak user activity and dashboard views.",
          },
        ],
      },
    },
    {
      slug: "k5hitij-dev",
      title: "k5hitij.dev",
      tagline: "Minimal, high-performance developer portfolio with keyboard-first terminal ergonomics",
      description: "Personal portfolio and engineering showcase designed with Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, and interactive developer utilities.",
      role: "Product Designer & Front-End Engineer",
      category: "Web Application",
      featured: true,
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "cmdk"],
      links: {
        github: "https://github.com/KshitijAwaghad/k5hitij.dev",
        live: "https://k5hitij.dev",
      },
      caseStudy: {
        problem: "Developer portfolios often suffer from either generic template aesthetics or bloated animations that hinder readability. The goal was to build a fast, keyboard-first, terminal-inspired site that communicates engineering competence within 3 seconds.",
        roleDetails: "Designed the design system, implemented dark-mode first UI components, configured cmdk command palette and backtick terminal console, and optimized for sub-100ms interactions and zero layout shift.",
        keyFeatures: [
          "Command Palette (Cmd/Ctrl+K) with instant navigation, theme switching, and clipboard actions",
          "Interactive drop-down mini terminal (backtick shortcut) with custom commands",
          "Dynamic GitHub telemetry syncing live commits and pinned repository metadata",
          "Accessible, responsive layout respecting prefers-reduced-motion",
        ],
        challengesLearned: [
          "Eliminating hydration mismatches across client-side theme switching and persistent state.",
          "Optimizing font and SVG rendering pipelines to achieve zero cumulative layout shift.",
          "Building seamless keyboard shortcuts that gracefully handle focus traps and modal closures.",
        ],
        architectureSummary: "Next.js App Router application utilizing React Server Components for zero-bundle data fetching, combined with lightweight client islands for interactive terminal and modal layers.",
        architectureNodes: [
          {
            id: "client",
            label: "Next.js App Client",
            sublabel: "React 19 Server & Client Components",
            type: "client",
            tech: "Next.js, Tailwind CSS, Framer Motion",
            description: "Renders server components with instant streaming and mounts interactive islands for Cmd+K and mini terminal.",
            rationale: "Provides near-instant first paint while keeping total JavaScript client payload minimal.",
          },
          {
            id: "api",
            label: "Server Components & Handlers",
            sublabel: "Cached external API integration",
            type: "api",
            tech: "Next.js App Router + TypeScript",
            description: "Fetches live GitHub contribution calendar and repository stats with ISR hourly revalidation.",
            rationale: "Prevents client-side API rate limits and CORS errors while serving fresh telemetry data.",
          },
          {
            id: "db",
            label: "Typed Project Data",
            sublabel: "Static typed metadata",
            type: "db",
            tech: "TypeScript Config & Schemas",
            description: "Stores curated case studies, technical skills, and educational milestones with compile-time type guarantees.",
            rationale: "Ensures type safety and lightning-fast static page generation for all project routes.",
          },
        ],
      },
    },
    {
      slug: "campusresolve",
      title: "CampusResolve",
      tagline: "Smart campus grievance redressal and transparent workflow tracking platform",
      description: "A digital platform bridging campus students, department authorities, and college administration for ticket triage, automated routing, and audit resolution.",
      role: "Lead Full-Stack Developer",
      category: "Full-Stack",
      featured: true,
      tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
      links: {
        github: "https://github.com/KshitijAwaghad/CampusResolve",
        live: "https://campus-resolve-nine.vercel.app",
      },
      caseStudy: {
        problem: "Traditional grievance systems in educational campuses rely on fragmented email threads or manual paperwork, leading to lost inquiries and zero status visibility for students.",
        roleDetails: "Led database modeling, role-based access control (Student, Admin, Department Head), and real-time status update workflows.",
        keyFeatures: [
          "Role-based authentication & permissions (Student, Staff, Admin)",
          "Real-time ticket status tracking and department routing",
          "Automated complaint triage and notification triggers",
          "Audit trail of actions and resolution remarks",
        ],
        challengesLearned: [
          "Designing fine-grained authorization gates for sensitive grievance complaints.",
          "Implementing clean status-transition state machines to avoid invalid ticket lifecycle states.",
          "Handling multi-tenant document schemas in MongoDB efficiently.",
        ],
        architectureSummary: "RESTful architecture decoupling the React frontend from an Express microservice, backed by document-based storage for flexible complaint attachments.",
        architectureNodes: [
          {
            id: "client",
            label: "React Client",
            sublabel: "Role-based student portal",
            type: "client",
            tech: "React, Tailwind CSS",
            description: "Provides responsive dashboards for students to lodge complaints and staff to review open tickets.",
            rationale: "Fast client-side routing and optimistic feedback for smooth ticket submissions.",
          },
          {
            id: "api",
            label: "Express API Backend",
            sublabel: "RESTful microservice",
            type: "api",
            tech: "Node.js, Express, JWT",
            description: "Validates requests, enforces RBAC policies, and handles complaint status transitions.",
            rationale: "Lightweight and modular backend for rapid API development and routing logic.",
          },
          {
            id: "db",
            label: "MongoDB Database",
            sublabel: "Document store",
            type: "db",
            tech: "MongoDB & Mongoose",
            description: "Stores complaint documents, audit histories, and user credentials with indexing on student IDs and status.",
            rationale: "Flexible document structure accommodates attachments and evolving ticket metadata.",
          },
        ],
      },
    },
  ],
  timeline: [
    {
      id: "edu-1",
      type: "education",
      role: "Bachelor of Engineering",
      organization: "University of Pune",
      location: "India",
      period: "2023 - Present", // TODO: add real dates
      description: [
        "Major: Electronics and Computer Engineering",
        "Focus on Data Structures, Algorithms, Database Management Systems, and Web Architecture.",
        "Active contributor to student technical clubs and collaborative software hackathons.",
      ],
      skills: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
      isCurrent: true,
    },
  ],
  notes: [],
};
