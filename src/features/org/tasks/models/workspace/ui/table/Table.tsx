"use client";

import { Card, Flex } from "@mantine/core";
import { useImmer } from "use-immer";
import { useState } from "react";
import Row from "./row/Row";
import { TData } from "./definitions";
import { TableHeader } from "./TableHeader";
import { ColumnHeaderRow } from "./row/ColumnHeaderRow";

export default function WorkspaceTable({
  initialData,
}: {
  initialData: TData[];
}) {
  const [tableKey, setTableKey] = useState(0);
  const [selectedIds, setSelectedIds] = useImmer<string[]>([]);

  const allSelected =
    initialData.length > 0 &&
    initialData.every((row) => selectedIds.includes(row.id));
  const someSelected =
    initialData.length > 0 &&
    initialData.some((row) => selectedIds.includes(row.id));

  function handleToggleSelection() {
    if (allSelected) setSelectedIds([]);
    initialData.forEach((row) => {
      if (!selectedIds.includes(row.id))
        setSelectedIds((prev) => {
          prev.push(row.id);
        });
    });
  }

  return (
    <>
      <Card
        key={tableKey}
        withBorder
        shadow="md"
        px="md"
        style={{ overflow: "auto" }}
      >
        <TableHeader
          setTableKeyAction={setTableKey}
          selectedIds={selectedIds}
          setSelectedIdsAction={setSelectedIds}
        />
        <Flex gap={"xs"} direction={"column"}>
          <ColumnHeaderRow
            toggleAllAction={handleToggleSelection}
            checked={allSelected}
            indeterminate={!allSelected && someSelected}
          />
          {initialData.map((row) => {
            return (
              <Row
                key={row.id}
                mode="update"
                rowData={row}
                selectedIds={selectedIds}
                setSelectedIdsAction={setSelectedIds}
              />
            );
          })}
          <Row
            mode="create"
            selectedIds={selectedIds}
            setSelectedIdsAction={setSelectedIds}
          />
        </Flex>
      </Card>
    </>
  );
}
