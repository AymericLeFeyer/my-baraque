import { SiteConfig } from "@/site-config";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SiteConfig.title,
    short_name: SiteConfig.title,
    description: SiteConfig.description,
    start_url: "/houses",
    display: "standalone",
    background_color: "#fff",
    theme_color: SiteConfig.brand.primary,
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
