"use client";

import { Divider, Flex } from "@mantine/core";
import TaskTree from "./Tree";
import { TTaskIncludeAll } from "@/lib/definitions/backend/org/task";

export default function TaskList({ tasks }: { tasks: TTaskIncludeAll[] }) {
  return (
    <>
      <Flex direction="column" gap={"sm"} mb={"sm"}>
        <h1>Task List</h1>
        <Divider />
        <Flex direction="column" gap="sm" mb={"sm"} py={"sm"}>
          <TaskTree tasks={tasks} />
        </Flex>
      </Flex>
    </>
  );
}
