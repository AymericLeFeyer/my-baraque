import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import Link from "next/link";
import { EmailLayout } from "./utils/EmailLayout";

export default function SubscribtionFailedEmail() {
  return (
    <EmailLayout>
      <Preview>
        Informations importantes concernant votre compte ${SiteConfig.title}
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Bonjour,</Text>
        <Text className="text-lg leading-6">
          Votre dernier paiement n'a pas été accepté, ce qui bloque l'accès à
          vos fonctionnalités supplémentaires.
        </Text>
        <Text className="text-lg leading-6">
          Nous avons remarqué un problème avec votre paiement récent, ce qui
          affecte votre accès à nos fonctionnalités premium.
        </Text>
        <Text className="text-lg leading-6">
          Pour résoudre cela et continuer à profiter de tous les avantages, il
          vous suffit de mettre à jour vos informations de paiement via le lien
          ci-dessous. C'est rapide et simple !
        </Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={`${getServerUrl()}/account/billing`}
          >
            Cliquez ici pour mettre à jour votre paiement et continuer à
            utiliser ${SiteConfig.title}
          </Link>
        </Text>
        <Text className="text-lg leading-6">
          Merci de votre attention rapide à ce sujet. Nous sommes là pour vous
          aider si vous avez des questions.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
