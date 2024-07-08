import { SiteConfig } from "@/site-config";
import { Preview, Section, Text } from "@react-email/components";
import { EmailLayout } from "./utils/EmailLayout";

export default function SuccessUpgradeEmail() {
  return (
    <EmailLayout>
      <Preview>
        Vous avez réussi à mettre à niveau votre compte vers ${SiteConfig.title}
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">Bonjour,</Text>
        <Text className="text-lg leading-6">
          Excellente nouvelle ! Votre paiement a été effectué avec succès et
          vous avez maintenant accès à toutes nos fonctionnalités premium.
          Préparez-vous à explorer tout ce que nous avons à offrir !
        </Text>
        <Text className="text-lg leading-6">
          Si vous avez des questions ou avez besoin d'assistance pendant que
          vous explorez, n'hésitez pas à nous contacter. Nous sommes là pour
          vous aider à profiter pleinement de votre expérience.
        </Text>
        <Text className="text-lg leading-6">Bonne découverte !</Text>
      </Section>
      <Text className="text-lg leading-6">
        Cordialement,
        <br />- {SiteConfig.maker.name} de {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
