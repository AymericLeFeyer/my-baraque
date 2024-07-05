import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Typography } from "@/components/ui/typography";
import type { Task } from "@prisma/client";
import { CalendarCheck2, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { deleteTask } from "../actions/delete-task.action";
import { EditTaskDialog } from "./EditTaskDialog";
import { activeTaskNow } from "../actions/active-task.action";
import useTaskStore from "../tasks.store";
import { updateTask } from "../actions/update-task.action";

export type TaskActionsProps = {
  task: Task;
};

export const TaskActions = (props: TaskActionsProps) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const { editTask } = useTaskStore();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreHorizontal size={24} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel
            className="flex cursor-pointer gap-2 rounded-md hover:bg-muted"
            onClick={() => setEditModalOpen(true)}
          >
            <Pencil size={16} />
            <Typography variant="small">Edit</Typography>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {props.task.effectiveDate &&
            props.task.effectiveDate > new Date() && (
              <>
                <DropdownMenuLabel
                  className="flex cursor-pointer gap-2 rounded-md hover:bg-muted"
                  onClick={() => {
                    activeTaskNow(props.task);
                    const updatedTask = {
                      ...props.task,
                      effectiveDate: new Date(),
                    };
                    updateTask(updatedTask).then(() => {
                      editTask(updatedTask);
                    });
                  }}
                >
                  <CalendarCheck2 size={16} />
                  <Typography variant="small">Active Now</Typography>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
          <DropdownMenuLabel
            className="flex cursor-pointer gap-2 rounded-md text-destructive hover:bg-muted"
            onClick={() => setDeleteModalOpen(true)}
          >
            <Trash size={16} />
            <Typography variant="small">Delete</Typography>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT TASK */}
      <Dialog open={editModalOpen} onOpenChange={(a) => setEditModalOpen(a)}>
        <EditTaskDialog
          task={props.task}
          close={() => setEditModalOpen(false)}
        />
      </Dialog>

      {/* DELETE TASK */}
      <Dialog
        open={deleteModalOpen}
        onOpenChange={(a) => setDeleteModalOpen(a)}
      >
        <DialogContent>
          <h1>Are you sure you want to delete this task?</h1>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => {
                deleteTask(props.task.id);
                setDeleteModalOpen(false);
              }}
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
