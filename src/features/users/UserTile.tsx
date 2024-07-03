import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@prisma/client";
import { UserIcon } from "lucide-react";

export const UserTile = (props: { user: User | null; concise: boolean }) => {
  return (
    <div className="flex items-center gap-2">
      {" "}
      {props.user ? (
        <>
          <Avatar>
            <AvatarImage src={props.user.image!} />
            <AvatarFallback>{props.user.name?.[0] ?? "A"}</AvatarFallback>
          </Avatar>
          {!props.concise && <p>{props.user.name}</p>}
        </>
      ) : (
        <>
          <Avatar>
            <AvatarFallback>
              <UserIcon size={16} />
            </AvatarFallback>
          </Avatar>
          <p>No assignee</p>
        </>
      )}
    </div>
  );
};
