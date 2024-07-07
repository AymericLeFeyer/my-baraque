import { Typography } from "@/components/ui/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const markdown = `## 1. Introduction

Welcome to Baraque - Organize your home. These Terms and Conditions ("Terms") govern your use of our website and application. By accessing or using Baraque, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our service.

## 2. About Us

**Name of the Application:** Baraque - Organize your home  
**Creator:** Aymeric LE FEYER

## 3. Use of the Service

Baraque allows users to create projects and tasks to organize their home, and invite others to join and collaborate.

## 4. User Responsibilities

- Users must provide accurate information when creating an account.
- Users are responsible for maintaining the confidentiality of their account information.
- Users must use the service in compliance with all applicable laws and regulations.

## 5. Data Collection and Use

- We collect the following personal information: email addresses and names.
- This data is used to provide and improve our services, and to communicate with users.

## 6. Account Deletion

Users can delete their accounts at any time from the settings menu. Upon deletion, all personal data will be removed from our systems.

## 7. Unsubscribing from Emails

Users can unsubscribe from email campaigns by following the unsubscribe link in the emails they receive.

## 8. Data Sharing

We do not share your personal data with third parties.

## 9. Intellectual Property

All content provided on Baraque is the intellectual property of Aymeric LE FEYER unless otherwise stated. Users are not permitted to reproduce, distribute, or create derivative works from our content without express written permission.

## 10. Changes to Terms

We may update these Terms from time to time. Changes will be posted on this page and will be effective immediately upon posting. Continued use of the service after any such changes constitutes your acceptance of the new Terms.

## 11. Governing Law

These Terms are governed by and construed in accordance with the laws of [Your Country/State]. Any disputes arising from these Terms will be subject to the exclusive jurisdiction of the courts of [Your Country/State].

## 12. Contact Us

If you have any questions about these Terms, please contact us at: lefeyer.aymeric@gmail.com

---

By using Baraque - Organize your home, you acknowledge that you have read and understood these Terms and Conditions and Privacy Policy and agree to be bound by them.`;
export default function page() {
  return (
    <div>
      <div className="flex w-full items-center justify-center bg-card p-8 lg:p-12">
        <Typography variant="h1">Terms</Typography>
      </div>
      <Layout>
        <LayoutContent className="prose m-auto mb-8 dark:prose-invert">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
