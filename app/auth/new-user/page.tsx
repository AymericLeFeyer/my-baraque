import { buttonVariants } from "@/components/ui/button";
import { Header } from "@/features/layout/Header";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { redirect } from "next/navigation";

/**
 * This page is show when a user loggin. You can add an onboarding process here.
 */
export default function NewUserPage(props: PageParams) {
  const callbackUrl =
    typeof props.searchParams.callbackUrl === "string"
      ? props.searchParams.callbackUrl
      : "/houses";

  redirect(callbackUrl);

  return (
    <>
      <Header />
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Connecté</LayoutTitle>
          <LayoutDescription>
            Tu peux désormais utiliser Baraque !
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <Link href="/" className={buttonVariants({ size: "lg" })}>
            Commencer
          </Link>
        </LayoutContent>
      </Layout>
    </>
  );
}
