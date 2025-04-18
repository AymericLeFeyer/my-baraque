import type { Task } from "@prisma/client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import useTaskStore from "@/features/tasks/tasks.store";
import { UserTile } from "../../users/UserTile";
import { useCurrentHouseStore } from "@/features/houses/current-house.store";
import { updateTask } from "../actions/update-task.action";

export type AssigneeSelectorProps = {
  task: Task;
};

export const AssigneeSelector = (props: AssigneeSelectorProps) => {
  const { updateAssignee } = useTaskStore();
  const { users } = useCurrentHouseStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="h-[50px] w-auto">
          <UserTile
            concise
            user={users.find((v) => v.id == props.task.assigneeId)!}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            {users.map((user) => (
              <DropdownMenuItem
                key={user.id}
                onClick={() => {
                  props.task.assigneeId = user.id;

                  updateTask(props.task).then(() => {
                    updateAssignee(user.id, props.task);
                  });
                }}
              >
                <UserTile concise={false} user={user} />{" "}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
