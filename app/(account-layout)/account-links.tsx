import type { NavigationLinkGroups } from "@/features/navigation/navigation.type";
import { AlertCircle, Mail, User2 } from "lucide-react";

export const ACCOUNT_LINKS: NavigationLinkGroups[] = [
  {
    title: "INFORMATIONS PERSONNELLES",
    links: [
      { url: "/account", title: "Profil", icon: <User2 /> },
      {
        url: "/account/delete",
        title: "Supprime ton profil",
        icon: <AlertCircle />,
      },
    ],
    url: "",
    icon: <User2 />,
  },
  {
    title: "PARAMÈTRES DES EMAILS",
    links: [{ url: "/account/email", title: "Paramètres", icon: <Mail /> }],
    url: "",
    icon: <Mail />,
  },
];
