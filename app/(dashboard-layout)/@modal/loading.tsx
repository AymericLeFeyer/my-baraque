import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Loader } from "@/components/ui/loader";

export default async function RouteLoading() {
  return (
    <Dialog open={true}>
      <DialogContent className="flex items-center justify-center bg-card px-4 py-8">
        <DialogTitle>Loading...</DialogTitle>
        <Loader />
      </DialogContent>
    </Dialog>
  );
}
