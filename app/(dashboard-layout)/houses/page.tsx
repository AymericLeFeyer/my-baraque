import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <>
      <h1>Dashboard</h1>
      <Link href="/toto">test</Link>
    </>
  );
}
