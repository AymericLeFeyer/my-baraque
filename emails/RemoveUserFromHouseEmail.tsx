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
      <Preview>Oops, you have been kicked from {houseName}</Preview>
      <Section className="my-6">
        <Text className="text-lg leading-6">
          We're sorry to inform you that you have been removed from the baraque{" "}
          {houseName}
        </Text>
        <Text className="text-lg leading-6">
          <Link
            className="text-sky-500 hover:underline"
            href={SiteConfig.prodUrl}
          >
            👉 However, you can still create your own house here 👈
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
