import { Flex, Text } from "@mantine/core";
import {
  Layout01,
  Layout01Left,
  Layout01Main,
} from "@/lib/ui/components/layout/01/01/Layout";
import SidebarNavLinks from "@/features/org/tasks/models/workspace/ui/SidebarNavLinks";
import WorkspaceDetails from "@/features/org/tasks/models/workspace/ui/Details";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    return <Text c={"orange"}>Workspace id not provided.</Text>;
  }

  return (
    <>
      <Layout01>
        <Layout01Left>
          <aside>
            <Flex direction={"column"}>
              <SidebarNavLinks />
            </Flex>
          </aside>
        </Layout01Left>
        <Layout01Main>
          <main>
            <WorkspaceDetails workspaceId={id} />
          </main>
        </Layout01Main>
      </Layout01>
    </>
  );
}
