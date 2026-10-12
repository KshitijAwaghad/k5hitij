import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { TechStack } from "@/components/tech-stack";
import { About } from "@/components/about";
import { TimelineSection } from "@/components/timeline-section";
import { GitHubActivity } from "@/components/github-activity";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Selected Projects (Top 3) */}
      <ProjectsSection />

      {/* 3. Tech Stack */}
      <TechStack />

      {/* 4. Engineering Background */}
      <About />

      {/* 5. Academic Background */}
      <TimelineSection />

      {/* 6. Live GitHub Activity */}
      <GitHubActivity />

      {/* 7. Quick Connect & Resume */}
      <ContactSection />
    </div>
  );
}
