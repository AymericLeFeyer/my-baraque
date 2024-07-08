"use client";

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "../SectionLayout";
import { SignInButton } from "@/features/auth/SignInButton";

export function CTASectionCard() {
  return (
    <SectionLayout>
      <Card className="relative isolate mt-24 overflow-hidden px-6 py-12 text-center shadow-2xl sm:rounded-3xl sm:px-16">
        <Typography variant="h2">Alors, tout est prêt ?</Typography>
        <Typography variant="base" className="mt-4 text-muted-foreground">
          Rejoins Baraque et commence à organiser ta maison.
        </Typography>
        <div className="mt-10 flex items-center justify-center gap-6">
          <SignInButton variant={"default"} />
        </div>
      </Card>
    </SectionLayout>
  );
}
