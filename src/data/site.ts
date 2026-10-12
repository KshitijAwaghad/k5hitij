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
    { label: "// architecture", href: "#architecture" },
    { label: "// skills", href: "#skills" },
    { label: "// about", href: "#about" },
    { label: "// timeline", href: "#timeline" },
    { label: "// github", href: "#github" },
    { label: "// notes", href: "#notes" },
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
        github: "https://github.com/KshitijAwaghad/ExpenseWise", // TODO: add exact project repo link
        live: undefined, // TODO: add live deployment link if available
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
            sublabel: "React 19 Server & Client Components",
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
            tech: "Next.js unstable_cache & Redis",
            description: "Memoizes complex monthly group-by computations to avoid re-querying raw transaction rows repeatedly.",
            rationale: "Cuts down database I/O by over 70% during peak user activity and dashboard views.",
          },
        ],
      },
    },
    {
      slug: "smart-campus-grievance",
      title: "Smart Campus Grievance Management System",
      tagline: "Streamlining student grievance redressal with lifecycle tracking and status transparency",
      description: "TODO: add real description for Smart Campus Grievance Management System. A portal connecting campus students and administration for ticketing, triage, and resolution.",
      role: "Lead Full-Stack Developer",
      category: "Web Application",
      featured: true,
      tech: ["TypeScript", "React", "Node.js", "Express", "MongoDB"],
      links: {
        github: "https://github.com/KshitijAwaghad/CampusResolve",
      },
      caseStudy: {
        problem: "TODO: add detailed problem statement. Traditional grievance systems in educational campuses rely on fragmented email threads or manual paperwork, leading to lost inquiries and zero status visibility.",
        roleDetails: "TODO: add detailed role description. Led database modeling, role-based access control (Student, Admin, Department Head), and notification triggers.",
        keyFeatures: [
          "Role-based authentication & permissions (Student, Staff, Admin)",
          "Real-time ticket status tracking and updates",
          "Department routing based on complaint categorization",
          "Audit trail of actions and resolution remarks",
        ],
        challengesLearned: [
          "Designing fine-grained authorization gates for sensitive grievance complaints.",
          "Implementing clean status-transition state machines to avoid invalid ticket lifecycle states.",
        ],
        architectureSummary: "RESTful architecture decoupling the React frontend from an Express microservice, backed by document-based storage for flexible complaint attachments.",
      },
    },
    {
      slug: "sai-shoes",
      title: "Sai Shoes",
      tagline: "Modern responsive e-commerce storefront with catalog filtering and smooth cart workflows",
      description: "TODO: add real description for Sai Shoes. An intuitive footwear retail storefront focused on high-performance product browsing, search, and checkout ergonomics.",
      role: "Frontend & Full-Stack Developer",
      category: "Web Application",
      featured: false,
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
      links: {
        github: "https://github.com/KshitijAwaghad/Sai-Shoes",
        live: "https://sai-shoes.vercel.app",
      },
      caseStudy: {
        problem: "TODO: add detailed problem statement. Retail footwear browsing requires fast visual filtering (size, category, price) without sluggish full-page reloads.",
        roleDetails: "TODO: add detailed role description. Implemented catalog layout, local storage persistent shopping cart, and animated drawer micro-interactions.",
        keyFeatures: [
          "Dynamic product filtering by brand, size, and price",
          "Persistent cart drawer with instant quantity modifications",
          "Responsive mobile-first layout with high-resolution thumbnail switching",
        ],
        challengesLearned: [
          "Preventing layout shifts during lazy image loading of varying shoe picture dimensions.",
          "Handling state hydration synchronization between browser localStorage and SSR.",
        ],
        architectureSummary: "JAMstack architecture leveraging server-side rendered catalog pages with client-side reactive state for the shopping cart.",
      },
    },
    {
      slug: "issue-tracker",
      title: "Issue Tracker for Engineering Teams",
      tagline: "Lightweight, keyboard-first defect and sprint tracking application",
      description: "TODO: add real description for Issue Tracker. A developer-centric task and bug tracking tool built for quick ticket logging, tag filtering, and Kanban sprint boards.",
      role: "Full-Stack Developer",
      category: "Systems",
      featured: false,
      tech: ["TypeScript", "React", "PostgreSQL", "Node.js", "Tailwind CSS"],
      links: {
        github: "https://github.com/KshitijAwaghad", // TODO: add exact project repo link
        live: undefined, // TODO: add live deployment link if available
      },
      caseStudy: {
        problem: "TODO: add detailed problem statement. Enterprise issue trackers are frequently bloated and slow. Built as a snappy, keyboard-friendly alternative for small engineering groups.",
        roleDetails: "TODO: add detailed role description. Implemented drag-and-drop Kanban state management and relational schema for sprints and issues.",
        keyFeatures: [
          "Interactive Kanban board with drag-and-drop column transitions",
          "Search & filter by priority, assignee, and custom tag labels",
          "Keyboard shortcuts for rapid issue creation and modal inspection",
        ],
        challengesLearned: [
          "Managing complex client-side optimistic drag-and-drop reordering without race conditions.",
          "Designing an index strategy for multi-column query filtering (status, priority, project_id).",
        ],
        architectureSummary: "Client-heavy interface with robust state management talking to a normalized relational PostgreSQL backend.",
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
    {
      id: "exp-1",
      type: "experience",
      role: "Full-Stack Developer Intern / Project Collaborator",
      organization: "TODO: add real organization / freelance / project title",
      location: "India (Remote / On-site)",
      period: "TODO: add real timeframe",
      description: [
        "TODO: add real responsibility 1 (e.g., Developed responsive full-stack features using TypeScript and React).",
        "TODO: add real responsibility 2 (e.g., Designed REST APIs, optimized SQL queries, and integrated third-party services).",
        "Collaborated in agile team sprints, code reviews, and Git version control workflows.",
      ],
      skills: ["TypeScript", "React", "Node.js", "Git", "REST APIs"],
      isCurrent: false,
    },
  ],
  notes: [
    {
      slug: "type-safe-full-stack-typescript",
      title: "Building End-to-End Type Safety from Database to Client Component",
      date: "Oct 2024",
      readTime: "4 min read",
      excerpt: "How pairing Prisma or Kysely with Zod and Next.js Route Handlers eliminates runtime payload discrepancies across the stack.",
      tags: ["TypeScript", "Next.js", "Architecture"],
      content: `Type safety is often treated as a compile-time convenience, but in modern full-stack development, it is your first line of defense against data corruption and runtime crashes.

When architecting full-stack TypeScript applications, the biggest point of failure traditionally occurs at network boundaries. The client sends a JSON payload; the server expects a certain shape; the database requires specific constraints. If any of these get out of sync, runtime errors occur.

### The Solution: The Single Source of Truth Pipeline
1. **Schema Definition**: Define runtime constraints with validation libraries (such as Zod).
2. **Database Models**: Align database ORM definitions with strict types.
3. **Contract Invariants**: Infer request/response types directly from validators rather than writing manual interfaces.

By locking down boundaries with inferred types and automated validation, refactoring becomes effortless and runtime undefined errors are drastically reduced.`,
    },
    {
      slug: "optimistic-ui-patterns",
      title: "Optimistic UI: Delivering Sub-50ms Perceived Speed in Web Apps",
      date: "Sep 2024",
      readTime: "5 min read",
      excerpt: "A practical guide to optimistic updates, rollback state handling, and why perceived latency matters more than network time.",
      tags: ["React", "UX", "Performance"],
      content: `Users judge speed not by network round-trip times, but by how quickly an interface responds to their intent. When a user clicks a button to add an expense or toggle an issue state, waiting 300ms for a network round-trip feels sluggish.

### What is Optimistic UI?
Optimistic UI assumes the network request will succeed. It immediately mutates the client state and renders the updated view, while dispatching the background asynchronous mutation.

### The Core Rules of Optimistic Design
1. **Immediate Feedback**: Render the desired end-state within the current frame (under 16ms).
2. **Explicit Rollback**: Keep a snapshot of the prior state. If the server responds with a 4xx or 5xx, revert smoothly and present a toast notification.
3. **Idempotent Identifiers**: Use client-generated UUIDs so temporary items can be matched once the server returns the persistent identifier.`,
    },
    {
      slug: "clean-git-workflows-for-solo-devs",
      title: "Pragmatic Git Workflows: Clean History Even When Coding Solo",
      date: "Aug 2024",
      readTime: "3 min read",
      excerpt: "Why atomic commits, descriptive PR summaries, and rebase strategies pay massive dividends as projects scale.",
      tags: ["Git", "Workflow", "DevOps"],
      content: `Many solo developers treat Git as a cloud backup: single-word commit messages like "fix" or "wip", and dumping dozens of unrelated changes into a single push.

Treating personal repositories with professional rigor transforms code maintenance:
- **Atomic Commits**: Each commit does exactly one thing. If you need to bisect a bug later, you can pinpoint the offending line in seconds.
- **Conventional Commits**: Prefixes like \`feat:\`, \`fix:\`, \`refactor:\`, and \`chore:\` make commit history instantly readable.
- **Self-Review Pull Requests**: Branching before major features and reviewing your own diff before merging forces you to catch dead code, console logs, and edge cases before they hit main.`,
    },
  ],
};
