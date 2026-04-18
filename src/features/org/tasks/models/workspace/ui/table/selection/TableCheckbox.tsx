"use client";

import { Checkbox } from "@mantine/core";
import { Updater } from "use-immer";

export function TableCheckbox<GRowData extends { id: string }>({
  selectedIds,
  setSelectedIdsAction,
  rowData,
}: {
  selectedIds: string[];
  setSelectedIdsAction: Updater<string[]>;
  rowData?: GRowData;
}) {
  function toggleSelection() {
    if (rowData) {
      if (selectedIds.includes(rowData.id)) {
        setSelectedIdsAction((draft) => {
          return draft.filter((id) => id !== rowData.id);
        });
      }
      if (!selectedIds.includes(rowData.id)) {
        setSelectedIdsAction((draft) => {
          draft.push(rowData.id);
        });
      }
    }
  }

  return (
    <Checkbox
      checked={selectedIds.includes(rowData?.id || "")}
      onClick={toggleSelection}
    />
  );
}
