import {
  FieldErrors,
  SubmitHandler,
  useForm,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import toast from "react-hot-toast";
import { useAllTasks } from "./useAllTasks";
import { apiUrl } from "../constants/apiUrl";

type Inputs = {
  taskTitle: string;
};

type useCreateTaskType = () => {
  register: UseFormRegister<Inputs>;
  handleSubmit: UseFormHandleSubmit<Inputs, undefined>;
  errors: FieldErrors<Inputs>;
  onSubmit: SubmitHandler<Inputs>;
};

const useCreateTask: useCreateTaskType = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Inputs>();

  const { tasks, mutate } = useAllTasks();

  const onSubmit: SubmitHandler<Inputs> = async (task) => {
    // console.log(data.taskTitle);

    // APIを叩く
    try {
      const response = await fetch(`${apiUrl}/createTask`, {
        method: "POST",
        body: JSON.stringify({
          title: task.taskTitle,
          isCompleted: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      const newTask = await response.json();

      mutate([...tasks, newTask]);

      reset();

      toast("タスクを追加しました。");
    } catch (err) {
      console.log(err);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
  };
};

export default useCreateTask;
