"use client";

import { Flex, SimpleGrid } from "@mantine/core";
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
  return (
    <Flex direction={"column"} gap={"md"}>
      <WorkspaceEditForm workspace={workspace} />
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <CategoryList workspace={workspace} />
      </SimpleGrid>
      <PriorityList workspace={workspace} />
      <StatusList workspace={workspace} />
    </Flex>
  );
}
