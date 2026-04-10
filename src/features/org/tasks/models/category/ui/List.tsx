"use client";

import { Blockquote, Card, Flex, Modal, Text, Title } from "@mantine/core";
import { CardContent, CardHeader } from "@/lib/ui/components/card";
import CategoryTree from "./Tree";
import { FaCircleExclamation, FaExclamation } from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";

export default function CategoryList({
  workspace,
}: {
  workspace: TWorkspaceIncludeAll;
}) {
  if (!workspace) {
    return null;
  }

  return (
    <>
      <Card withBorder shadow="md" miw={800}>
        <CardHeader>
          <Flex justify={"space-between"} align={"center"}>
            <Title order={2} id="categories">
              Categories
            </Title>
            <Info />
          </Flex>
        </CardHeader>
        <CardContent>
          <CategoryTree workspace={workspace} />
        </CardContent>
      </Card>
    </>
  );
}

function Info() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal opened={opened} onClose={close} title="Info">
        <Blockquote icon={<FaExclamation />} color="blue">
          <Text>Fields: Name, Order. Order specified is used for sorting.</Text>
        </Blockquote>
      </Modal>

      <Text
        component="span"
        c={"blue"}
        fz={"xl"}
        onClick={open}
        p={"xs"}
        style={{ cursor: "pointer" }}
      >
        <FaCircleExclamation />
      </Text>
    </>
  );
}
