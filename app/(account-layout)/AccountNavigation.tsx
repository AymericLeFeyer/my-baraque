import { Separator } from "@/components/ui/separator";
import { AuthButton } from "@/features/auth/AuthButton";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { DesktopVerticalMenu } from "../../src/features/navigation/DesktopVerticalMenu";
import { MobileDropdownMenu } from "../../src/features/navigation/MobileDropdownMenu";
import { ACCOUNT_LINKS } from "./account-links";
import { auth } from "@/lib/auth/helper";
import { SignInButton } from "@/features/auth/SignInButton";
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
import { Button } from "@/components/ui/button";

export const AccountNavigation = async (props: PropsWithChildren) => {
  const user = await auth();

  if (user == null) {
    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>
            Sorry, you need to be authenticated to access this resource.
          </LayoutTitle>
        </LayoutHeader>
        <LayoutContent className="flex gap-4">
          <SignInButton />
          <ContactSupportDialog>
            <Button variant="secondary" size="sm">
              Contact support
            </Button>
          </ContactSupportDialog>
        </LayoutContent>
      </Layout>
    );
  }

  return (
    <div className="flex min-h-full flex-col">
      <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2">
            <Image
              src={SiteConfig.appIcon}
              alt="app logo"
              width={32}
              height={32}
            />
            <Link href="/" className="text-lg font-bold ">
              {SiteConfig.title}
            </Link>
          </div>

          <nav className="flex flex-1 items-center justify-end space-x-1">
            <AuthButton />
            <ThemeToggle />
            <MobileDropdownMenu className="lg:hidden" links={ACCOUNT_LINKS} />
          </nav>
        </div>
      </header>
      {/* Desktop ONLY Navigation bar */}
      <Layout className="flex flex-row items-start gap-4">
        <DesktopVerticalMenu
          links={ACCOUNT_LINKS}
          className="max-lg:hidden"
          user={user}
        />
        <Separator className="max-lg:hidden" orientation="vertical" />
        <main className="flex-1">{props.children}</main>
      </Layout>
    </div>
  );
};
