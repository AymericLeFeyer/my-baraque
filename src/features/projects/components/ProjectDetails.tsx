"use client";

import type { House, Project, Task } from "@prisma/client";
import { getTasksByProjectId } from "../../tasks/actions/get-tasks.action";
import useTaskStore from "../../tasks/tasks.store";
import { useEffect } from "react";
import { Typography } from "@/components/ui/typography";
import { CalendarClock, Check, List } from "lucide-react";
import { Divider } from "@/components/ui/divider";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { CreateTaskDialog } from "../../tasks/components/CreateTask";
import { TaskItem } from "@/features/tasks/components/TaskItem";

export type ProjectDetailsProps = {
  house: House;
  project: Project;
};

export const ProjectDetails = (props: ProjectDetailsProps) => {
  const { tasks, setTasks, addTask } = useTaskStore();

  const organizedTasks = {
    todo: tasks.filter(
      (t) =>
        !t.isComplete &&
        (t.effectiveDate === null || t.effectiveDate < new Date()),
    ),
    complete: tasks.filter((t) => t.isComplete),
    later: tasks.filter(
      (t) =>
        !t.isComplete &&
        t.effectiveDate !== null &&
        t.effectiveDate > new Date(),
    ),
  };

  const getDaysToGo = (task: Task) => {
    if (task.effectiveDate === null) return 0;
    return Math.ceil(
      (task.effectiveDate!.getTime() - new Date().getTime()) /
        (1000 * 60 * 60 * 24),
    );
  };

  // Get tasks from db
  useEffect(() => {
    setTasks([]);
    const fetchTasks = async () => {
      const rawTasks = await getTasksByProjectId(props.project.id);
      setTasks(rawTasks);
    };

    fetchTasks();
  }, [props.project.id, setTasks]);

  return (
    <>
      <p className="mb-8 text-xl">{props.project.description}</p>
      <div className="flex items-center justify-between">
        <Typography variant="h3" className="mt-6">
          Tâches
        </Typography>
        <CreateTaskDialog project={props.project} addTaskCallback={addTask} />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <List size={16} />
          <Typography variant="code">To do</Typography>
        </div>
        {organizedTasks.todo.map((task) => (
          <TaskItem key={task.id} task={task} houseId={props.house.id} />
        ))}
        <Divider className="mt-4" />
        <div className="flex items-center gap-2">
          <CalendarClock size={16} />
          <Typography variant="code">Programmées</Typography>
        </div>
        {organizedTasks.later
          .sort((t1, t2) => {
            return getDaysToGo(t1) > getDaysToGo(t2) ? 1 : -1;
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              daysToGo={getDaysToGo(task)}
              houseId={props.house.id}
            />
          ))}
        <Divider className="mt-4" />

        <Accordion type="single" collapsible>
          <AccordionItem value="completed">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Check size={16} />
                <Typography variant="code">Complétées</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {organizedTasks.complete.map((task) => (
                <TaskItem key={task.id} task={task} houseId={props.house.id} />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
