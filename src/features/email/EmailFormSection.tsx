import { Typography } from "@/components/ui/typography";
import { SectionLayout } from "../landing/SectionLayout";
import { EmailForm } from "./EmailForm";

export const EmailFormSection = () => {
  return (
    <SectionLayout
      size="lg"
      className="relative flex w-full flex-col items-center gap-16"
    >
      <div className="relative m-auto flex max-w-xl flex-col gap-4 text-center">
        <Typography
          variant="small"
          className="font-extrabold uppercase text-primary"
        >
          Sois alerté(e) des nouveautés
        </Typography>
        <Typography variant="h2" className="text-center text-4xl lg:text-5xl">
          Rejoins la newsletter de{" "}
          <span className="text-gradient bg-gradient-to-r from-orange-600 via-red-400 to-yellow-400 font-mono font-extrabold uppercase">
            Baraque
          </span>
        </Typography>

        <div className="mx-auto mt-6 w-full max-w-md">
          <EmailForm
            submitButtonLabel="Join"
            successMessage="Thank you for joining the newsletter"
          />
        </div>
      </div>
    </SectionLayout>
  );
};
