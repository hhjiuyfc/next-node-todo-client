"use client";

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { TaskType } from "../types/Task";
import toast, { Toaster } from "react-hot-toast";
import { FC } from "react";
import { useUpdateTasks } from "../hooks/useUpdateTasks";
import useDeleteTask from "../hooks/useDeleteTask";
import useCompleteTasks from "../hooks/useCompleteTasks";

type TaskProps = {
  task: TaskType;
};

const TaskList: FC<TaskProps> = ({ task }) => {
  const { isEditing, updateTitle, handleChangeTitle, handleUpdateTask } =
    useUpdateTasks(task);

  const { handleDelateTask } = useDeleteTask(task);

  const { handleCompleted } = useCompleteTasks(task);

  return (
    <div>
      {/* task */}
      <li className="my-4 flex justify-between">
        <div className="flex gap-x-4">
          {/* 完了未完了 */}
          <input
            type="checkbox"
            onChange={() => handleCompleted(task.isCompleted)}
            className="px-3 py-2 text-xl"
          />
          {isEditing ? (
            <input
              value={updateTitle}
              onChange={handleChangeTitle}
              className="w-full rounded border-2 border-indigo-500 px-3 py-2 text-xl outline-none"
            />
          ) : (
            <p
              className={`text-xl font-bold text-slate-500 ${task.isCompleted ? "line-through" : ""}`}
            >
              {task.title}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-x-5">
          {/* 編集 保存ボタン 切り替え */}
          <button onClick={handleUpdateTask}>
            {isEditing ? (
              <p className="text-xl font-bold text-slate-600">保存</p>
            ) : (
              <FaEdit className="cursor-pointer text-2xl text-blue-500" />
            )}
          </button>
          {/* トースター */}
          <Toaster />
          {/* 削除ボタン */}
          <button onClick={() => handleDelateTask(task.id)}>
            <MdDelete className="cursor-pointer text-2xl text-red-500" />
          </button>
        </div>
      </li>
      <hr />
    </div>
  );
};

export default TaskList;
