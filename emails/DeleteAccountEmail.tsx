import { SiteConfig } from "@/site-config";
import { Link, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function DeleteAccountEmail({ email }: { email: string }) {
  return (
    <EmailLayout>
      <Section className="my-6">
        <Text className="text-lg leading-6">Bonjour,</Text>
        <Text className="text-lg leading-6">
          Votre compte associé à l'adresse email{" "}
          <Link
            className="text-sky-500 hover:underline"
            href={`mailto:${email}`}
          >
            {email}
          </Link>{" "}
          a été supprimé.
        </Text>
        <Text className="text-lg leading-6">
          Cette action est irréversible.
        </Text>
        <Text className="text-lg leading-6">
          Si vous avez des questions, veuillez nous contacter à l'adresse{" "}
          {SiteConfig.email.contact}.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
