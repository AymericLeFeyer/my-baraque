"use client";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Typography } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import type { Task } from "@prisma/client";
import { RotateCw } from "lucide-react";
import { AssigneeSelector } from "../../tasks/components/AssigneeSelector";
import { TaskActions } from "./TaskActions";
import useTaskStore from "../tasks.store";
import { updateTask } from "../actions/update-task.action";
import { rescheduleTask } from "../actions/reschedule-task.action";
import { toast } from "sonner";

export type TaskItemProps = {
  task: Task;
  houseId: string;
  daysToGo?: number;
};

export const TaskItem = (props: TaskItemProps) => {
  const { addTask, setCompleted } = useTaskStore();
  const isLaterTask = props.daysToGo !== undefined && props.daysToGo > 0;

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-4 justify-between",
          {
            "opacity-50 line-through": props.task.isComplete,
          },
          {
            "opacity-50 ": isLaterTask,
          },
        )}
      >
        <div className="flex grow items-center gap-2">
          <Checkbox
            checked={props.task.isComplete}
            onCheckedChange={(v) => {
              if (v == true) {
                updateTask(props.task).then((updatedTask) => {
                  setCompleted(true, updatedTask);
                  if (updatedTask.nextTimeInDays !== null) {
                    rescheduleTask(updatedTask).then((newTask) => {
                      toast.success("Task rescheduled");
                      addTask(newTask);
                    });
                  }
                });
              }
            }}
            disabled={props.task.isComplete || isLaterTask}
          />
          <div className="flex">
            <div className="ml-2">
              <div className="flex items-center gap-2">
                {props.task.nextTimeInDays != null &&
                  props.daysToGo == null && <RotateCw size={16} />}
                <Typography variant="large">{props.task.title}</Typography>
              </div>

              <Typography variant="small">{props.task.content}</Typography>
              {isLaterTask && !props.task.isComplete && (
                <Badge variant="default" className="mt-2">
                  in {props.daysToGo} days
                </Badge>
              )}
            </div>
          </div>
        </div>
        <div className="flex-none">
          <AssigneeSelector task={props.task} />
        </div>
        <div className="flex-none pt-1">
          <TaskActions task={props.task} />
        </div>
      </div>
    </>
  );
};
