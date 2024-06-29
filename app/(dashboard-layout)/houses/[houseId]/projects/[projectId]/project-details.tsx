"use client";

import type { House, Project } from "@prisma/client";
import { CreateTaskDialog } from "./_components/CreateTask";
import { getTasksByProjectId } from "./_actions/get-tasks";
import useTaskStore from "./_stores/tasks.store";
import { useEffect } from "react";
import { TaskItem } from "./_components/TaskItem";

export type ProjectDetailsProps = {
  house: House;
  project: Project;
};

export const ProjectDetails = (props: ProjectDetailsProps) => {
  const { tasks, setTasks, addTask, setCompleted } = useTaskStore();

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
      <p>Tasks</p>
      <CreateTaskDialog project={props.project} addTaskCallback={addTask} />
      <div className="mt-2 flex flex-col gap-4">
        {tasks
          .sort((t1, t2) =>
            t1.isComplete === t2.isComplete ? 0 : t1.isComplete ? 1 : -1,
          )
          .map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={() => {}}
              setCompleted={setCompleted}
            />
          ))}
      </div>
    </>
  );
};
