import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { requiredAuth } from "@/lib/auth/helper";
import type { LayoutParams } from "@/types/next";
import { VerifyEmailButton } from "./verify-email/VerifyEmailButton";

export default async function RouteLayout(props: LayoutParams<{}>) {
  const user = await requiredAuth();

  const isEmailNotVerified = user.email && !user.emailVerified;
  return (
    <>
      {isEmailNotVerified ? (
        <Alert className="mb-4">
          <AlertTitle>Email non vérifié</AlertTitle>
          <AlertDescription>
            Merci de vérifier ton email pour accéder à ton compte.
          </AlertDescription>
          <VerifyEmailButton />
        </Alert>
      ) : null}
      {props.children}
    </>
  );
}
