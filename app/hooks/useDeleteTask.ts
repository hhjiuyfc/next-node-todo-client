import useSWR from "swr";
import { TaskType } from "../types/Task";
import toast from "react-hot-toast";
import { useAllTasks } from "./useAllTasks";
import { apiUrl } from "../constants/apiUrl";

type useDeleteTaskType = (task: TaskType) => {
  handleDelateTask: (id: number) => Promise<void>;
};

const useDeleteTask: useDeleteTaskType = (task: TaskType) => {
  const { tasks, mutate } = useAllTasks();
  const handleDelateTask = async (id: number) => {
    try {
      const response = await fetch(`${apiUrl}/deleteTask/${task.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const newTasks = tasks.filter((t: TaskType) => t.id !== id);
        mutate(newTasks);

        toast("タスクの削除に成功しました。");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    handleDelateTask,
  };
};

export default useDeleteTask;
