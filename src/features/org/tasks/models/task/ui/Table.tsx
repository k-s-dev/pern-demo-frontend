"use client";

import { Flex } from "@mantine/core";
import SelectTaskView from "./SelectView";
import { useTasksContext } from "../../../ui/hooks/TasksContext";

export default function TaskTable() {
  const tasksCtx = useTasksContext();

  return (
    <>
      <Flex justify="space-between" align="center">
        <h1>Tasks Table</h1>
        <SelectTaskView view={"table"} />
      </Flex>
      {tasksCtx.state.tasks.map((task) => task.title)}
    </>
  );
}
