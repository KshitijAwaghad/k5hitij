# k5hitij.dev — Personal Portfolio & Systems Showcase

> Modern, developer-centric personal portfolio website for **Kshitij Awaghad (k5hitij)** — Full-Stack Developer based in India. Built with Next.js 16 App Router, strict TypeScript, Tailwind CSS v3.4, and Framer Motion.

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, static site generation + route caching)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict mode, zero `any`)
- **Styling**: [Tailwind CSS v3.4](https://tailwindcss.com/) + PostCSS + CSS custom properties
- **Command Palette**: [cmdk](https://cmdk.paco.me/) (`Cmd/Ctrl + K` navigation)
- **Animations**: Restrained CSS & motion micro-interactions with full `prefers-reduced-motion` compliance
- **Typography**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) (code accents, labels, terminal) & [Inter](https://fonts.google.com/specimen/Inter) (body)
- **Icons**: [lucide-react](https://lucide.dev/) + crisp vector brand SVGs (GitHub, LinkedIn, X)
- **API & Contact**: Next.js Route Handler supporting Resend, Formspree, or local zero-config fallback
- **SEO & Social**: Dynamic metadata, OpenGraph image generator (`next/og`), `sitemap.xml`, `robots.txt`, and Schema.org `Person` JSON-LD

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production
```bash
npm run build
```

### 4. Run lint checks
```bash
npm run lint
```

---

## 🛠️ Environment Variables Configuration

Create a `.env.local` file in the root directory:

```env
# Contact Form Options:
# Option 1: Resend (Recommended)
RESEND_API_KEY="re_123456789"
CONTACT_EMAIL="your-email@example.com"

# Option 2: Formspree (Alternative)
# FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"
```

> **Note**: If neither environment variable is configured, the contact endpoint runs in **safe development simulation mode** — logging submissions to the terminal console and returning a friendly success message so testing works immediately.

---

## 📝 How to Customize Content (`src/data/site.ts`)

**All portfolio content is decoupled from the UI layer.** You never need to modify UI code to update your profile, projects, or background.

Open [`src/data/site.ts`](./src/data/site.ts) to update:

1. **`owner`**:
   - `name`, `handle`, `role`, `location`, `headline`, `bio`
   - `learningNow`: List of current learning topics
   - `statusBadge`: Status indicator pill text
   - `email`: Your primary contact email
   - `resumeUrl`: Link or path to your resume file (place PDF in `/public/resume.pdf` and set `"/resume.pdf"`)

2. **`socials`**:
   - Direct URLs to GitHub, LinkedIn, and X (Twitter)

3. **`projects`**:
   - Add, edit, or remove projects. Each project generates its own dynamic case study page at `/projects/[slug]`.
   - Fields: `title`, `tagline`, `description`, `role`, `category`, `tech`, `links` (`github`, `live`), and `caseStudy` details (`problem`, `roleDetails`, `architectureNodes`, `keyFeatures`, `challengesLearned`).
   - If a project does not have a live URL or repository link yet, omit the property or set it to `undefined` — the UI will automatically hide the button instead of showing dead links.

4. **`skills`**:
   - Grouped by `Frontend`, `Backend`, `Database`, and `Tools & DevOps`. Toggle `featured: true` to highlight core daily tools with an emerald beacon.

5. **`timeline`**:
   - Educational degrees and professional internships/work milestones.

6. **`notes`**:
   - Technical essays and engineering articles. Each generates a dedicated reading route at `/notes/[slug]`.

---

## ☁️ Deployment on Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete developer portfolio"
   git branch -M main
   git remote add origin https://github.com/KshitijAwaghad/k5hitij.git
   git push -u origin main
   ```
2. Import the project into [Vercel](https://vercel.com/new).
3. (Optional) Add your `.env.local` variables (`RESEND_API_KEY`, `CONTACT_EMAIL`).
4. Click **Deploy**. Vercel will automatically build the static pages and edge/serverless routes.

---

## 📋 Owner TODO Checklist

Before sharing with recruiters, fill in the following marked `TODO` fields in [`src/data/site.ts`](./src/data/site.ts):

- [ ] **Contact Email**: Replace `siteData.owner.email` with your real personal/work email.
- [ ] **Resume PDF**: Add your latest resume PDF into `public/resume.pdf` and set `resumeUrl: "/resume.pdf"` in `siteData.owner.resumeUrl`.
- [ ] **Education Details**:
  - [ ] University / College name in `siteData.timeline[0].organization`
  - [ ] Degree name & specialization in `siteData.timeline[0].role`
- [ ] **Experience Details**:
  - [ ] Real employer or organization title in `siteData.timeline[1].organization`
  - [ ] Accurate date range in `siteData.timeline[1].period`
  - [ ] Key contributions in `siteData.timeline[1].description`
- [ ] **Project Details**:
  - [ ] **ExpenseWise**: Update repository link when public (`siteData.projects[0].links.github`).
  - [ ] **Smart Campus Grievance Management System**: Description & role details verified.
  - [ ] **Sai Shoes**: Description & role details verified.
  - [ ] **Issue Tracker for Engineering Teams**: Fill in description, features, and repository link once created.
