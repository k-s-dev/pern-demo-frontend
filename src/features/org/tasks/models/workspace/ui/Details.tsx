"use client";

import { Blockquote, Flex, Paper, SimpleGrid, Text } from "@mantine/core";
import { FaCircleExclamation } from "react-icons/fa6";
import WorkspaceEditForm from "./edit/WorkspaceEditForm";
import CategoryList from "../../category/ui/List";
import PriorityList from "../../priority/ui/List";
import StatusList from "../../status/ui/List";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";

export default function WorkspaceDetails({
  workspace,
}: {
  workspace: TWorkspaceIncludeAll;
}) {
  if (!workspace) {
    return (
      <Flex justify={"center"} align={"center"} mt={"xl"}>
        <Paper shadow="md">
          <Blockquote color="red" icon={<FaCircleExclamation />}>
            <Text>Workspace not found.</Text>
          </Blockquote>
        </Paper>
      </Flex>
    );
  }

  return (
    <Flex direction={"column"} gap={"md"}>
      <WorkspaceEditForm id={workspace.id} />
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <CategoryList workspace={workspace} />
      </SimpleGrid>
      <PriorityList workspace={workspace} />
      <StatusList workspace={workspace} />
    </Flex>
  );
}
