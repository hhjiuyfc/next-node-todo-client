import React from "react";
import { TaskType } from "../types/Task";
import { useAllTasks } from "./useAllTasks";
import { apiUrl } from "../constants/apiUrl";

type useCompleteTasksType = (task: TaskType) => {
  handleCompleted: (isCompleted: boolean) => Promise<void>;
};

const useCompleteTasks: useCompleteTasksType = (task: TaskType) => {
  const { tasks, mutate } = useAllTasks();

  const handleCompleted = async (isCompleted: boolean) => {
    try {
      const response = await fetch(`${apiUrl}/editTask/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ isCompleted: !isCompleted }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      if (response.ok) {
        const updateTask = await response.json();

        const newTasks = tasks.map((task: TaskType) =>
          task.id === updateTask.id ? { ...updateTask } : { ...task },
        );
        console.log(newTasks);
        mutate(newTasks);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleCompleted,
  };
};

export default useCompleteTasks;
