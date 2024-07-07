"use client";

import { EmailFormSection } from "@/features/email/EmailFormSection";
import { FAQSection } from "@/features/landing/FAQSection";
import { LandingHeader } from "@/features/landing/LandingHeader";
import { SectionDivider } from "@/features/landing/SectionDivider";
import { Video } from "@/features/landing/Video";

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
              question: "What is Baraque?",
              answer:
                "Baraque is a platform that allows you to create projects and tasks about your own house. You can create reschedulable tasks for your house yearly maintenance for example.",
            },
            {
              question: "How many projects can I create?",
              answer:
                "You can create as many projects as you want. There is no limit to the number of projects you can create.",
            },
            {
              question: "How to know who needs to do what?",
              answer:
                "Good question, you can assign tasks to your family members or roommates. They will receive a notification and an email to remind them of the task.",
            },
            {
              question: "What is the price of Baraque?",
              answer:
                "Baraque is free to use. You can create as many projects as you want and assign as many tasks as you want. We are planning to add a premium plan in the future.",
            },
          ]}
        />

        <EmailFormSection />

        <SectionDivider />
      </div>
    </>
  );
}
