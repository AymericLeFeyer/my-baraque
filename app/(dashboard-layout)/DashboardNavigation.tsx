import { Button } from "@/components/ui/button";
import { AuthButton } from "@/features/auth/AuthButton";
import { SignInButton } from "@/features/auth/SignInButton";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/features/page/layout";
import { ThemeToggle } from "@/features/theme/ThemeToggle";
import { auth } from "@/lib/auth/helper";
import { SiteConfig } from "@/site-config";
import Image from "next/image";
import Link from "next/link";
import type { PropsWithChildren } from "react";
import { MobileDropdownMenu } from "../../src/features/navigation/MobileDropdownMenu";
import { HouseSelector } from "@/features/navigation/HouseSelector";
import type { User } from "@prisma/client";
import { BackButton } from "@/features/navigation/BackButton";
import { DesktopNavbar } from "@/features/navigation/DesktopNavbar";

export const DashboardNavigation = async (props: PropsWithChildren) => {
  const user = await auth();

  if (user == null) {
    return (
      <>
        <Header user={null} />
        <Layout>
          <LayoutHeader>
            <LayoutTitle>
              Sorry, you need to be authenticated to access this resource.
            </LayoutTitle>
          </LayoutHeader>
          <LayoutContent className="flex gap-4">
            <SignInButton />
            <Link href={"/"}>
              <Button variant="invert" size="sm">
                Go back home
              </Button>
            </Link>
          </LayoutContent>
        </Layout>
      </>
    );
  }

  return (
    <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden">
      {/* Main container */}
      <DesktopNavbar user={user} />
      <div className="flex-1">
        {/* Header */}
        <Header user={user} />
        {/* Content of the page */}
        <main className="py-4 lg:max-h-[calc(100vh_-_64px)] lg:flex-1 lg:overflow-auto lg:py-8">
          {props.children}
        </main>
      </div>
    </div>
  );
};

const Header = (props: { user: User | null }) => {
  return (
    <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2 lg:hidden">
          <BackButton />
          <Image
            src={SiteConfig.appIcon}
            alt="app logo"
            width={32}
            height={32}
          />
          <div className="lg:hidden">
            <div className="mr-2">
              <HouseSelector />
            </div>
          </div>
          <Link href="/" className="text-lg font-bold max-lg:hidden ">
            {SiteConfig.title}
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Mobile header */}
          <nav className="flex items-center space-x-1 lg:hidden">
            <AuthButton />
            <ThemeToggle />
            {props.user && <MobileDropdownMenu user={props.user} forceHouse />}
          </nav>
          {/* Desktop header */}
          <nav className="flex items-center space-x-1 max-lg:hidden">
            <ContactFeedbackPopover>
              <Button variant="outline" size="sm">
                Feedback
              </Button>
            </ContactFeedbackPopover>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
