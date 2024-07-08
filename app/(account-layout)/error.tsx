"use client";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@/features/auth/SignInButton";
import { logger } from "@/lib/logger";
import type { ErrorParams } from "@/types/next";
import { useEffect } from "react";

export default function RouteError({ error }: ErrorParams) {
  useEffect(() => {
    // Log the error to an error reporting service
    logger.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Tu dois être authentifié pour accéder à cette ressource.
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <SignInButton variant="invert" size="lg" />
      </CardFooter>
    </Card>
  );
}
