"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Task, User } from "@prisma/client";
import { RotateCw } from "lucide-react";
import { AssigneeSelector } from "./AssigneeSelector";

export type TaskItemProps = {
  task: Task;
  houseId: string;
  onDelete: () => void;
  setCompleted: (completed: boolean, task: Task) => void;
  daysToGo?: number;
};

export const TaskItem = (props: TaskItemProps) => {
  const isLaterTask = props.daysToGo !== undefined && props.daysToGo > 0;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-4 justify",
          {
            "opacity-50 line-through": props.task.isComplete,
          },
          {
            "opacity-50 ": isLaterTask,
          },
        )}
      >
        <Checkbox
          checked={props.task.isComplete}
          onCheckedChange={(v) => props.setCompleted(v as boolean, props.task)}
          disabled={props.task.isComplete || isLaterTask}
        />
        <div className="flex">
          <div>
            <Typography variant="large">
              <div className="flex items-center gap-2">
                {props.task.nextTimeInDays != null &&
                  props.daysToGo == null && <RotateCw size={16} />}
                {props.task.title}
              </div>
            </Typography>
            <Typography variant="small">{props.task.content}</Typography>
            {isLaterTask && !props.task.isComplete && (
              <Badge variant="default" className="mt-2">
                in {props.daysToGo} days
              </Badge>
            )}
          </div>
        </div>
        <AssigneeSelector houseId={props.houseId} task={props.task} />
      </div>
    </>
  );
};
