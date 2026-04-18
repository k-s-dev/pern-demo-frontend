"use client";

import { CardHeader } from "@/lib/ui/components/card";
import { Button, Flex, Title } from "@mantine/core";
import { htmlTitleId, title } from "./definitions";
import { DeleteSelectionModal } from "./selection/DeleteSeletionModal";
import { Dispatch, SetStateAction } from "react";
import { Updater } from "use-immer";

export function TableHeader({
  setTableKeyAction,
  selectedIds,
  setSelectedIdsAction,
}: {
  setTableKeyAction: Dispatch<SetStateAction<number>>;
  selectedIds: string[];
  setSelectedIdsAction: Updater<string[]>;
}) {
  function handleReset() {
    setSelectedIdsAction([]);
    setTableKeyAction((prev) => prev + 1);
  }

  return (
    <CardHeader>
      <Flex justify={"space-between"} mb={"xs"}>
        <Title order={2} id={htmlTitleId}>
          {title}
        </Title>
        <Flex gap={"xs"}>
          <DeleteSelectionModal
            selectedIds={selectedIds}
            setSelectedIdsAction={setSelectedIdsAction}
          />
          <Button onClick={handleReset} color="gray" variant="light">
            Reset
          </Button>
        </Flex>
      </Flex>
    </CardHeader>
  );
}
