"use client";

import DeleteModalButton from "@/lib/ui/components/form/DeleteModal";
import { Text, Tooltip } from "@mantine/core";
import { Updater } from "use-immer";
import { workspaceDeleteMany } from "../../../data";
import { useRouter } from "next/navigation";

export function DeleteSelectionModal({
  selectedIds,
  setSelectedIdsAction,
}: {
  selectedIds: string[];
  setSelectedIdsAction: Updater<string[]>;
}) {
  const router = useRouter();

  return (
    <DeleteModalButton
      triggerContent={
        <>
          <Tooltip label="Delete selected">
            <Text component="span">Delete Selected</Text>
          </Tooltip>
        </>
      }
      deleteAction={async () => {
        const response = await workspaceDeleteMany(selectedIds);
        setSelectedIdsAction([]);
        router.refresh();
        return response;
      }}
      disabled={selectedIds.length <= 0}
      color="red"
      variant="light"
      mb={"xs"}
    >
      <Text fz={"xl"} c={"red"}>
        Selected workspaces will be deleted permanently.
      </Text>
    </DeleteModalButton>
  );
}
