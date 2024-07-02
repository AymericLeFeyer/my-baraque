import type { Task } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import useTaskStore from "@/features/tasks/tasks.store";
import { useHouseStore } from "@/features/houses/house.store";
import { UserTile } from "./UserTile";

export type AssigneeSelectorProps = {
  task: Task;
};

export const AssigneeSelector = (props: AssigneeSelectorProps) => {
  const { updateAssignee } = useTaskStore();
  const { users } = useHouseStore();

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
            concise
            user={users.find((v) => v.id == props.task.assigneeId)!}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Assignee</SelectLabel>
            {users.map((user) => (
              <SelectItem key={user.id} value={user.id}>
                <UserTile concise={false} user={user} />{" "}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};
