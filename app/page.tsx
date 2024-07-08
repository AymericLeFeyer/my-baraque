"use client";

import { EmailFormSection } from "@/features/email/EmailFormSection";
import { FAQSection } from "@/features/landing/FAQSection";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { SectionDivider } from "@/features/landing/SectionDivider";
import { Video } from "@/features/landing/Video";
import { Footer } from "@/features/layout/Footer";

export default function HomePage() {
  return (
    <>
      <div className="relative flex h-fit flex-col bg-background text-foreground">
        <div className="mt-16"></div>

        <LandingHeader />

        <Video />

        <FAQSection
          faq={[
            {
              question: "Qu'est-ce que Baraque ?",
              answer:
                "Baraque est une plateforme qui vous permet de créer des projets et des tâches pour votre maison. Vous pouvez créer des tâches récurrentes pour l'entretien annuel de votre maison, par exemple.",
            },
            {
              question: "Combien de projets puis-je créer ?",
              answer:
                "Vous pouvez créer autant de projets que vous le souhaitez. Il n'y a pas de limite au nombre de projets que vous pouvez créer.",
            },
            {
              question: "Comment savoir qui doit faire quoi ?",
              answer:
                "Bonne question ! Vous pouvez assigner des tâches à vos membres de famille ou colocataires. Ils recevront une notification et un email pour leur rappeler la tâche.",
            },
            {
              question: "Quel est le prix de Baraque ?",
              answer:
                "Baraque est gratuit. Vous pouvez créer autant de projets que vous le souhaitez et assigner autant de tâches que vous le souhaitez. Nous prévoyons d'ajouter un plan premium à l'avenir.",
            },
          ]}
        />

        <EmailFormSection />

        <SectionDivider />

        <Footer />
      </div>
    </>
  );
}
