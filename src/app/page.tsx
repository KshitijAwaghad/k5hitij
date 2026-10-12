import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { TechStack } from "@/components/tech-stack";
import { About } from "@/components/about";
import { GitHubActivity } from "@/components/github-activity";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Selected Projects (Top 3) */}
      <ProjectsSection />

      {/* 3. Tech Stack */}
      <TechStack />

      {/* 4. Engineering & Academic Background (2-Column Combined) */}
      <About />

      {/* 5. Live GitHub Activity & Repositories */}
      <GitHubActivity />

      {/* 6. Quick Connect & Resume */}
      <ContactSection />
    </div>
  );
}
