import { AvatarFallback, Avatar, AvatarImage } from "@/components/ui/avatar";
import type { Task, User } from "@prisma/client";
import { getUserById } from "../../../../_actions/get-user";
import { useEffect, useState } from "react";
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

export const AssigneeSelector = async (props: AssigneeSelectorProps) => {
  const [assignee, setAssignee] = useState<User | null>(null);
  const { updateAssignee } = useTaskStore();
  const { house, users } = useHouseStore();

  useEffect(() => {
    if (props.task.assigneeId) {
      getUserById(props.task.assigneeId).then((user) => {
        setAssignee(user);
      });
    }
  }, []);

  const UserTile = (props: { user: User | null }) => {
    return (
      <div className="flex items-center gap-2">
        {" "}
        {props.user ? (
          <>
            <Avatar>
              {props.user.image && <AvatarImage src={props.user.image} />}
              <AvatarFallback>{props.user.name?.[0] ?? "A"}</AvatarFallback>
            </Avatar>
            <p>{props.user.name}</p>
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
          const userSelected = users.find((user) => user.id === v);
          setAssignee(userSelected!);
          updateAssignee(v, props.task);
        }}
      >
        <SelectTrigger className="h-[50px] w-auto">
          <UserTile user={assignee} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assignee</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <UserTile user={user} />{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
