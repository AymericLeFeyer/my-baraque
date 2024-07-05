import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AuthButton } from "@/features/auth/AuthButton";
import { SignInButton } from "@/features/auth/SignInButton";
import { UserDropdown } from "@/features/auth/UserDropdown";
import { ContactFeedbackPopover } from "@/features/contact/feedback/ContactFeedbackPopover";
import { ContactSupportDialog } from "@/features/contact/support/ContactSupportDialog";
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
import type { PropsWithChildren, ReactNode } from "react";
import { DesktopVerticalMenu } from "../../src/features/navigation/DesktopVerticalMenu";
import { MobileDropdownMenu } from "../../src/features/navigation/MobileDropdownMenu";
import { HouseSelector } from "@/features/navigation/HouseSelector";
import { HouseMandatoryNavigation } from "./HouseMandatoryNavigation";
import type { User } from "@prisma/client";

export const DashboardNavigation = async (props: PropsWithChildren) => {
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
    <HouseMandatoryNavigation content={MinifiedLayout(user, props.children)}>
      <div className="flex h-full flex-col lg:flex-row lg:overflow-hidden">
        {/* Main container */}
        <DesktopNavbar {...user} />
        <div className="flex-1">
          {/* Header */}
          <Header {...user} />
          {/* Content of the page */}
          <main className="py-4 lg:max-h-[calc(100vh_-_64px)] lg:flex-1 lg:overflow-auto lg:py-8">
            {props.children}
          </main>
        </div>
      </div>
    </HouseMandatoryNavigation>
  );
};

const DesktopNavbar = (user: User) => {
  return (
    <div className="flex size-full max-w-[240px] flex-col border-r border-border px-2 py-4 max-lg:hidden">
      <div className="flex items-center gap-2">
        <Image src={SiteConfig.appIcon} alt="app logo" width={24} height={24} />
        <Link href="/houses" className="text-xl font-bold">
          {SiteConfig.title}
        </Link>
      </div>
      <div className="h-10" />
      <DesktopVerticalMenu user={user} forceHouse />
      <div className="flex-1" />
      <UserDropdown>
        <Button variant="outline" size="sm">
          <Avatar className="mr-2 size-6">
            <AvatarFallback>
              {user.email ? user.email.slice(0, 2) : "??"}
            </AvatarFallback>
            {user.image && <AvatarImage src={user.image} />}
          </Avatar>
          <span className="max-lg:hidden">{user.name}</span>
        </Button>
      </UserDropdown>
    </div>
  );
};

const Header = (user: User) => {
  return (
    <header className="w-full border-b bg-background max-lg:sticky max-lg:top-0 max-lg:z-40">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center gap-2 lg:hidden">
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

        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* Mobile header */}
          <nav className="flex items-center space-x-1 lg:hidden">
            <div className="mr-2">
              <HouseSelector />
            </div>
            <AuthButton />
            <ThemeToggle />
            <MobileDropdownMenu user={user} forceHouse />
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

const MinifiedLayout = (user: User, children: ReactNode) => {
  return (
    <div className="flex-1">
      {/* Main container */}
      <Header {...user} />
      <div className="p-4">{children}</div>
    </div>
  );
};
