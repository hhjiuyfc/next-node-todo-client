"use client";

import TaskList from "./components/TaskList";
import { TaskType } from "./types/Task";
import { FaSpinner } from "react-icons/fa";
import useCreateTask from "./hooks/useCreateTask";
import { Toaster } from "react-hot-toast";
import { useAllTasks } from "./hooks/useAllTasks";

export default function Home() {
  const { handleSubmit, onSubmit, register, errors } = useCreateTask();

  const { tasks, isLoading } = useAllTasks();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <FaSpinner className="animate-spins text-6xl text-slate-800" />;
      </div>
    );
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center">
      <div className="my-20 min-h-[350px] w-[600px] bg-white p-10 shadow-lg">
        <h1 className="text-center text-4xl font-bold">Task App</h1>
        {/* 入力フォーム */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-5 flex w-full items-center gap-x-5 p-5">
            <div className="flex w-full flex-col gap-y-4">
              <input
                type="text"
                placeholder="タスクを入力"
                {...register("taskTitle", { required: true })}
                className="w-full rounded border-b-2 border-indigo-500 px-4 py-2 text-2xl outline-none placeholder:mb-4"
              />
              {/* エラーメッセージ */}
              {errors.taskTitle && (
                <span className="whitespace-nowrap font-bold text-red-500">
                  タスクを入力してください。
                </span>
              )}
            </div>
            {/* 追加ボタン */}
            <button className="whitespace-nowrap rounded bg-teal-500 px-4 py-3 text-white transition-all duration-300 hover:bg-teal-800">
              追加
            </button>
            {/* トースト */}
            <Toaster />
          </div>
        </form>
        {/* タスクリスト */}
        <ul>
          {tasks?.map((task: TaskType) => (
            <TaskList key={task.id} task={task} />
          ))}
        </ul>
      </div>
    </div>
  );
}
