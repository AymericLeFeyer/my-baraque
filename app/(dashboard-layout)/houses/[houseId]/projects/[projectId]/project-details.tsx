"use client";

import type { House, Project, Task } from "@prisma/client";
import { CreateTaskDialog } from "./_components/CreateTask";
import { getTasksByProjectId } from "./_actions/get-tasks";
import useTaskStore from "./_stores/tasks.store";
import { useEffect } from "react";
import { TaskItem } from "./_components/TaskItem";
import { Typography } from "@/components/ui/typography";
import { CalendarClock, Check, List } from "lucide-react";
import { Divider } from "@/components/ui/divider";
import { Accordion, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionContent, AccordionItem } from "@radix-ui/react-accordion";

export type ProjectDetailsProps = {
  house: House;
  project: Project;
};

export const ProjectDetails = (props: ProjectDetailsProps) => {
  const { tasks, setTasks, addTask, setCompleted } = useTaskStore();

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
    const fetchTasks = async () => {
      const rawTasks = await getTasksByProjectId(props.project.id);
      setTasks(rawTasks);
    };

    fetchTasks();
  }, [props.project.id, setTasks]);

  return (
    <>
      <p>{props.project.description}</p>
      <CreateTaskDialog project={props.project} addTaskCallback={addTask} />
      <div className="mt-4 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <List size={24} />
          <Typography variant="large">To do</Typography>
        </div>
        {organizedTasks.todo.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={() => {}}
            setCompleted={setCompleted}
          />
        ))}
        <Divider className="mt-4" />
        <div className="flex items-center gap-2">
          <CalendarClock size={24} />
          <Typography variant="large">Scheduled</Typography>
        </div>
        {organizedTasks.later
          .sort((t1, t2) => {
            return getDaysToGo(t1) > getDaysToGo(t2) ? 1 : -1;
          })
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => {}}
              setCompleted={setCompleted}
              daysToGo={getDaysToGo(task)}
            />
          ))}
        <Divider className="mt-4" />

        <Accordion type="single" collapsible>
          <AccordionItem value="completed">
            <AccordionTrigger>
              <div className="flex items-center gap-2">
                <Check size={24} />
                <Typography variant="large">Completed</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-2">
              {organizedTasks.complete.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onDelete={() => {}}
                  setCompleted={setCompleted}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
};
