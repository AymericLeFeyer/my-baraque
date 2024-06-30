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
        {userName} invited you to {houseName}
      </Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          You have been invited by {userName} to join the {houseName} house in
          Baraque !
        </Text>
        <Text>If you didn't request this, please ignore this email.</Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={SiteConfig.prodUrl}
          >
            👉 Click here to start the adventure 👈
          </Link>
        </Text>
      </Section>
      <Text className="text-lg leading-6">
        Best,
        <br />- {SiteConfig.maker.name} from {SiteConfig.title}
      </Text>
    </EmailLayout>
  );
}
