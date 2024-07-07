"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const BackButton = () => {
  const router = useRouter();

  return (
    <>
      <ChevronLeft className="cursor-pointer" onClick={() => router.back()} />
    </>
  );
};
