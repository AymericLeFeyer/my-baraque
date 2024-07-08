import { SiteConfig } from "@/site-config";
import { Link, Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function InvitationEmail({
  userName,
  houseName,
}: {
  userName: string;
  houseName: string;
}) {
  return (
    <EmailLayout>
      <Preview>
        {userName} vous a invité(e) à rejoindre {houseName}
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          Vous avez été invité(e) par {userName} à rejoindre la maison{" "}
          {houseName} sur Baraque !
        </Text>
        <Text>
          Si vous n'avez pas fait cette demande, veuillez ignorer cet email.
        </Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={SiteConfig.prodUrl}
          >
            👉 Cliquez ici pour commencer l'aventure 👈
          </Link>
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
