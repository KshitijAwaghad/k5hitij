import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { TechStack } from "@/components/tech-stack";
import { About } from "@/components/about";
import { TimelineSection } from "@/components/timeline-section";
import { GitHubActivity } from "@/components/github-activity";
import { NotesSection } from "@/components/notes-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Featured Projects & All Projects */}
      <ProjectsSection />

      {/* 3. Interactive Systems Topology */}
      <ArchitectureDiagram />

      {/* 4. Tech Stack */}
      <TechStack />

      {/* 5. About (Bio & Currently Learning) */}
      <About />

      {/* 6. Experience & Education Timeline */}
      <TimelineSection />

      {/* 7. Live GitHub Activity & Open Source */}
      <GitHubActivity />

      {/* 8. Notes & Technical Write-ups */}
      <NotesSection />

      {/* 9. Contact & Handshake */}
      <ContactSection />
    </div>
  );
}
