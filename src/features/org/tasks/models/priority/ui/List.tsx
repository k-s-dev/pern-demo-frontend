"use client";

import { Button, Card, Flex, Text, Title, Tooltip } from "@mantine/core";
import { Updater, useImmer } from "use-immer";
import { useId, useState } from "react";
import PriorityFormRow, { PriorityFormHeader } from "./form/Form";
import { CardHeader } from "@/lib/ui/components/card";
import DeleteModalButton from "@/lib/ui/components/form/DeleteModal";
import { priorityDeleteMany } from "../data";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";

export default function PriorityList({
  workspace,
}: {
  workspace: TWorkspaceIncludeAll;
}) {
  const randomFormId = useId();
  const [resetKey, setResetKey] = useState(0);
  const [selectedIds, setSelectedIds] = useImmer<string[]>([]);
  const router = useRouter();

  if (!workspace) {
    return null;
  }

  const priorities = workspace.priorities;

  const allSelected =
    priorities.length > 0 &&
    priorities.every((p) => selectedIds.includes(p.id));
  const someSelected =
    priorities.length > 0 &&
    priorities.some((el) => selectedIds.includes(el.id));

  function handleReset() {
    setSelectedIds([]);
    setResetKey((p) => p + 1);
  }

  function handleToggleSelection() {
    if (allSelected) setSelectedIds([]);
    priorities.forEach((el) => {
      if (!selectedIds.includes(el.id))
        setSelectedIds((prev) => {
          prev.push(el.id);
        });
    });
  }

  return (
    <>
      <Card key={resetKey} withBorder shadow="md" miw={800}>
        <CardHeader>
          <Flex justify={"space-between"} mb={"xs"}>
            <Title order={2} id="priorities">
              Priorities
            </Title>
            <Flex gap={"xs"}>
              <DeleteSelected
                selectedIds={selectedIds}
                setSelectedIdsAction={setSelectedIds}
                router={router}
              />
              <Button onClick={handleReset} color="gray" variant="light">
                Reset
              </Button>
            </Flex>
          </Flex>
        </CardHeader>
        <Flex gap={"xs"} direction={"column"}>
          <PriorityFormHeader
            toggleAllAction={handleToggleSelection}
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
          />
          {priorities.map((priority) => {
            return (
              <PriorityFormRow
                key={priority.id}
                mode="update"
                workspace={workspace}
                priority={priority}
                selectedIds={selectedIds}
                setSelectedIdsAction={setSelectedIds}
              />
            );
          })}
          <PriorityFormRow
            mode="create"
            workspace={workspace}
            randomFormId={randomFormId}
            selectedIds={selectedIds}
            setSelectedIdsAction={setSelectedIds}
          />
        </Flex>
      </Card>
    </>
  );
}

function DeleteSelected({
  selectedIds,
  setSelectedIdsAction,
  router,
}: {
  selectedIds: string[];
  setSelectedIdsAction: Updater<string[]>;
  router: AppRouterInstance;
}) {
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
        const response = await priorityDeleteMany(selectedIds);
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
        Selected priorities will be deleted permanently.
      </Text>
    </DeleteModalButton>
  );
}
