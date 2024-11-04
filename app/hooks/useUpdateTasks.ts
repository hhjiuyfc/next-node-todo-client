import { ChangeEvent, useCallback, useMemo, useState } from "react";
import useSWR, { KeyedMutator } from "swr";
import { TaskType } from "../types/Task";

import toast from "react-hot-toast";
import { useAllTasks } from "./useAllTasks";
import { apiUrl } from "../constants/apiUrl";

type useUpdateTaskType = (task: TaskType) => {
  isEditing: boolean;
  updateTitle: string;
  handleChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateTask: () => Promise<void>;
};

export const useUpdateTasks: useUpdateTaskType = (task: TaskType) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [updateTitle, setUpdateTitle] = useState<string>(task.title);
  const { tasks, mutate } = useAllTasks();

  const handleChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(e.target.value);
  }, []);

  const handleUpdateTask = useCallback(async () => {
    setIsEditing((prevState) => !prevState);

    if (!updateTitle) return; // 何もしない

    // 編集のAPIを叩く

    if (isEditing) {
      try {
        const response = await fetch(`${apiUrl}/editTask/${task.id}`, {
          method: "PUT",
          body: JSON.stringify({ title: updateTitle }),
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

          if (updateTitle) {
            toast("タスクの編集に成功しました。");
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [isEditing, tasks, mutate, updateTitle, task.id]);

  return useMemo(
    () => ({
      isEditing,
      updateTitle,
      handleChangeTitle,
      handleUpdateTask,
    }),
    [handleChangeTitle, handleUpdateTask, isEditing, updateTitle],
  );
};
