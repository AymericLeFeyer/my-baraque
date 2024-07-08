import { getServerUrl } from "@/lib/server-url";
import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import Link from "next/link";
import { EmailLayout } from "./utils/EmailLayout";

export default function SubscribtionDowngradeEmail() {
  return (
    <EmailLayout>
      <Preview>Votre accès Premium a été suspendu</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Bonjour,</Text>
        <Text className="text-lg leading-6">
          Nous vous informons que votre compte est revenu à notre niveau d'accès
          de base. Ce changement est dû à des problèmes récents avec le paiement
          de votre abonnement premium.
        </Text>
        <Text className="text-lg leading-6">
          Bien que vous puissiez toujours profiter de nos services de base,
          l'accès aux fonctionnalités premium est maintenant limité. Nous
          serions ravis de vous accueillir à nouveau dans notre communauté
          premium !
        </Text>
        <Text className="text-lg leading-6">
          Pour réactiver votre statut premium, il vous suffit de mettre à jour
          vos informations de paiement ici :
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
          Si vous avez des questions ou avez besoin d'aide, notre équipe est
          toujours disponible pour vous aider.
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
