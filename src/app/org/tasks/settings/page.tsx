import VerifySession from "@/features/auth/lib/ui/components/VerifySession";
import { tagGetList } from "@/features/org/tasks/models/tag/data";
import TagList from "@/features/org/tasks/models/tag/ui/List";
import { workspaceGetList } from "@/features/org/tasks/models/workspace/data";
import WorkspaceTable from "@/features/org/tasks/models/workspace/ui/table/Table";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";
import { Box, Divider, Flex } from "@mantine/core";

export default async function Page() {
  const workspaceResponse = await workspaceGetList();
  const tagResponse = await tagGetList();

  return (
    <Layout03>
      <VerifySession />
      <Box
        mx="auto"
        w={{ base: "99%", md: "85%", lg: "75%" }}
        style={{ overflow: "auto" }}
        px="md"
        mb="md"
      >
        <Flex direction={"column"} gap={"md"} my={"xl"}>
          <WorkspaceTable initialData={workspaceResponse.data || []} />
          <Divider size={"sm"} />
          <TagList initialData={tagResponse.data || []} />
        </Flex>
      </Box>
    </Layout03>
  );
}
