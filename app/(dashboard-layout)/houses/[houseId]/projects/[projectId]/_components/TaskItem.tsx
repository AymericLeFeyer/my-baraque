"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import type { Task } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";

export type TaskItemProps = {
  task: Task;
  onDelete: () => void;
  setCompleted: (completed: boolean, task: Task) => void;
};

export const TaskItem = (props: TaskItemProps) => {
  return (
    <>
      <div className="flex items-center gap-4">
        <Checkbox
          checked={props.task.isComplete}
          onCheckedChange={(v) => props.setCompleted(v as boolean, props.task)}
        />
        <div className="flex justify-between">
          <div>
            <Typography variant="large">{props.task.title}</Typography>
            <Typography variant="small">{props.task.content}</Typography>
          </div>
          <MoreHorizontal
            onClick={props.onDelete}
            className="hover:text-danger"
          />
        </div>
      </div>
    </>
  );
};
