import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageLoading() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Paramètres des mails</CardTitle>
        <CardDescription>
          Mets à jour les paramètres de tes notifications par email pour qu'ils
          correspondent à tes préférences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}
