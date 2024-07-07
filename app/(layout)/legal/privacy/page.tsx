import { Typography } from "@/components/ui/typography";
import { Layout, LayoutContent } from "@/features/page/layout";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const markdown = `## 1. Introduction

Welcome to Baraque - Organize your home. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.

## 2. Information We Collect

We collect the following personal information from you:
- Email address
- Name

## 3. How We Collect Information

We collect information when you:
- Register for an account
- Create or update your profile
- Contact us

## 4. Use of Your Information

We use the information we collect to:
- Provide and manage our services
- Communicate with you
- Improve our services

## 5. Data Sharing

We do not share your personal information with third parties.

## 6. Data Security

We implement security measures to protect your personal data. However, no security system is impenetrable, and we cannot guarantee the security of our systems 100%.

## 7. Your Rights

You have the right to:
- Access the personal data we hold about you
- Request correction of any inaccurate data
- Request deletion of your data
- Object to the processing of your data

You can exercise these rights by contacting us at lefeyer.aymeric@gmail.com.

## 8. Cookies and Similar Technologies

We may use cookies and similar technologies to enhance your experience on our website. You can manage your cookie preferences through your browser settings.

## 9. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be posted on this page and will be effective immediately upon posting.

## 10. Contact Us

If you have any questions about this Privacy Policy, please contact us at: lefeyer.aymeric@gmail.com

---

By using Baraque - Organize your home, you acknowledge that you have read and understood these Terms and Conditions and Privacy Policy and agree to be bound by them.`;

export default function page() {
  return (
    <div>
      <div className="flex w-full items-center justify-center bg-card p-8 lg:p-12">
        <Typography variant="h1">Privacy</Typography>
      </div>
      <Layout>
        <LayoutContent className="prose mb-8 dark:prose-invert">
          <MDXRemote source={markdown} />
        </LayoutContent>
      </Layout>
    </div>
  );
}
