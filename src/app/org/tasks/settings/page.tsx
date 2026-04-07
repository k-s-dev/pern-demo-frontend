import TagList from "@/features/org/tasks/models/tag/ui/List";
import WorkspaceList from "@/features/org/tasks/models/workspace/ui/List";
import AddWorkspaceQuick from "@/features/org/tasks/models/workspace/ui/QuickAdd";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";
import { Center, Container, Divider, Flex } from "@mantine/core";

export default async function Page() {
  return (
    <Layout03>
      <Container maw={{ base: "99%", md: "85%", lg: "75%" }}>
        <Center>
          <Flex direction={"column"} gap={"md"} mb={"xl"}>
            <h1>Workspaces</h1>
            <AddWorkspaceQuick />
            <Divider size={"sm"} />
            <WorkspaceList />
            <Divider size={"sm"} />
            <TagList />
          </Flex>
        </Center>
      </Container>
    </Layout03>
  );
}
