import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Task, User } from "@prisma/client";
import { User as UserIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import useTaskStore from "../_stores/tasks.store";
import { useHouseStore } from "../../../_stores/house.store";

export type AssigneeSelectorProps = {
  task: Task;
};

export const AssigneeSelector = (props: AssigneeSelectorProps) => {
  const { updateAssignee } = useTaskStore();
  const { users } = useHouseStore();

  const UserTile = (props: { user: User | null; concise: boolean }) => {
    return (
      <div className="flex items-center gap-2">
        {" "}
        {props.user ? (
          <>
            <Avatar>
              {props.user.image && <AvatarImage src={props.user.image} />}
              <AvatarFallback>{props.user.name?.[0] ?? "A"}</AvatarFallback>
            </Avatar>
            {props.concise && <p>{props.user.name}</p>}
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

  return (
    <>
      <Select
        onValueChange={(v) => {
          updateAssignee(v, props.task);
          props.task.assigneeId = v;
        }}
      >
        <SelectTrigger className="h-[50px] w-auto">
          <UserTile
            concise={false}
            user={users.find((v) => v.id == props.task.assigneeId)!}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assignee</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <UserTile concise user={user} />{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
