/* eslint-disable @next/next/no-img-element */
import { Typography } from "@/components/ui/typography";
import { SiteConfig } from "@/site-config";
import Link from "next/link";

export const Maker = () => {
  return (
    <div className="flex w-fit items-center gap-2 rounded-full border bg-gradient-to-r from-primary/20 to-secondary/20 px-3 py-2  font-bold transition-all hover:brightness-110">
      <img
        className="size-12 rounded-full border border-gray-500/50"
        src={SiteConfig.maker.image}
        alt="my face"
      />
      <div className="flex flex-col gap-0">
        <Typography variant="large">
          Créé par{" "}
          <Link
            target="_blank"
            className="font-extrabold text-blue-500 hover:underline"
            href="https://aymeric.lefeyer.fr"
          >
            {SiteConfig.maker.name}
          </Link>
        </Typography>
        <Link
          target="_blank"
          href={SiteConfig.maker.youtube}
          className="text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
        >
          Rejoins-moi sur YouTube
        </Link>
      </div>
    </div>
  );
};
