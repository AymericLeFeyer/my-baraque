import { SiteConfig } from "@/site-config";
import { Link, Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function RemoveUserFromHouseEmail({
  houseName,
}: {
  houseName: string;
}) {
  return (
    <EmailLayout>
      <Preview>Oups, vous avez été exclu(e) de {houseName}</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          Nous sommes désolés de vous informer que vous avez été retiré(e) de la
          baraque {houseName}.
        </Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={SiteConfig.prodUrl}
          >
            👉 Cependant, vous pouvez toujours créer votre propre maison ici 👈
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
