import { SiteHeader } from "@/components/site-header";
import { SelectedWork } from "@/components/selected-work";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { EducationList } from "@/components/education-list";
import { CertificationsList } from "@/components/certifications-list";
import { SkillsList } from "@/components/skills-list";
import { AskSection } from "@/components/ask-section";
import { ContactSection } from "@/components/contact-section";

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
      <SiteHeader />
      <main id="main-content">
        <SelectedWork />
        <ExperienceTimeline />
        <EducationList />
        <CertificationsList />
        <SkillsList />
        <AskSection />
        <ContactSection />
      </main>
    </div>
  );
}
