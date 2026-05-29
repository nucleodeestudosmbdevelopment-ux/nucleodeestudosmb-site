import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/nmb/Header";
import { Hero3D } from "@/components/nmb/Hero3D";
import { AboutSection } from "@/components/nmb/AboutSection";
import { MarciaSection } from "@/components/nmb/MarciaSection";
import { InsideNucleusSection } from "@/components/nmb/InsideNucleusSection";
import { LearningEnvironmentSection } from "@/components/nmb/LearningEnvironmentSection";
import { CommunicationSection } from "@/components/nmb/CommunicationSection";
import { TestimonialsSection } from "@/components/nmb/TestimonialsSection";
import { PreVestibularSection } from "@/components/nmb/PreVestibularSection";
import { FinalCTA } from "@/components/nmb/FinalCTA";
import { Footer } from "@/components/nmb/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Núcleo Márcia Baldi — Educação, comunicação e autonomia" },
      {
        name: "description",
        content:
          "Núcleo de ensino com acompanhamento próximo, metodologia personalizada e desenvolvimento acadêmico em oratória, redação, grupos de estudo e preparação.",
      },
      { property: "og:title", content: "Núcleo Márcia Baldi" },
      {
        property: "og:description",
        content: "Educação, comunicação e autonomia para alunos que querem ir mais longe.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { httpEquiv: "Content-Language", content: "pt-BR" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground antialiased">
      <Header />
      <Hero3D />
      <AboutSection />
      <MarciaSection />
      <InsideNucleusSection />
      <LearningEnvironmentSection />
      <CommunicationSection />
      <TestimonialsSection />
      <PreVestibularSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
