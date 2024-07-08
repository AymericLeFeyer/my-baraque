"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { enqueueDialog } from "@/features/dialogs-provider/DialogProvider";
import { toast } from "sonner";
import { deleteAccountAction } from "./delete-account.action";

export default function DeleteProfilePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Supprime ton profil</CardTitle>
        <CardDescription>
          Supprimer ton compte signifie que toutes tes données personnelles
          seront définitivement effacées et que ton abonnement en cours sera
          résilié. Veuillez noter que cette action est irréversible.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button
          variant="destructive"
          onClick={() => {
            enqueueDialog({
              title: "Supprime ton profil",
              description: "Es-tu sûr de vouloir supprimer ton profil ?",
              action: {
                label: "Delete",
                onClick: async () => {
                  await deleteAccountAction(null);
                  toast.success("Ton profil a été supprimé.");
                },
              },
            });
          }}
        >
          Supprimer
        </Button>
      </CardContent>
    </Card>
  );
}
