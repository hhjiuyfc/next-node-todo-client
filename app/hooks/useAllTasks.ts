import React from "react";
import useSWR, { KeyedMutator } from "swr";
import { apiUrl } from "../constants/apiUrl";

type useAllTasksType = () => {
  tasks: any;
  error: any;
  isLoading: boolean;
  mutate: KeyedMutator<any>;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useAllTasks: useAllTasksType = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `${apiUrl}/allTasks`,
    fetcher,
  );

  return {
    tasks: data,
    error,
    isLoading,
    mutate,
  };
};
