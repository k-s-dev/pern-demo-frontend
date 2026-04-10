"use client";

import {
  generateCheckboxCell,
  generateCheckboxHeader,
} from "@/lib/ui/table/TableCheckbox";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Button, Text } from "@mantine/core";
import Link from "next/link";
import { routes } from "@/lib/routes";
import { Workspace } from "@/lib/definitions/backend/prisma/client";
import { DataTableWrapper } from "@/lib/ui/table/DataTable";
import DeleteModalButton from "@/lib/ui/components/form/DeleteModal";
import { useTasksContext } from "../../../ui/hooks/TasksContext";
import { workspaceDelete, workspaceDeleteMany } from "../data";

export default function WorkspaceList() {
  const tasksCtx = useTasksContext();
  const workspaces = tasksCtx.state.workspaces;
  const [workspaceTableResetKey, setWorkspaceTableResetKey] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns = useMemo<ColumnDef<Workspace, any>[]>(() => {
    return [
      {
        id: "select",
        header: ({ table }) => {
          return generateCheckboxHeader({ table });
        },
        cell: ({ row }) => {
          return generateCheckboxCell({ row });
        },
      },
      {
        accessorKey: "name",
        id: "name",
        header: "Name",
        cell: (props) => props.getValue(),
      },
      {
        id: "view",
        header: "View",
        cell: (props) => (
          <Button
            component={Link}
            href={routes.org.tasks.workspace.withId(props.row.original.id)}
            variant="outline"
            color="blue"
          >
            View, Configure
          </Button>
        ),
      },
      {
        id: "Delete",
        header: "Delete",
        cell: (props) => (
          <DeleteModalButton
            deleteAction={async () => {
              const response = await workspaceDelete(props.row.original.id);
              return response;
            }}
            variant="outline"
            color="red"
          >
            <Text fz={"h3"} c={"red"}>
              Workspace <b>{props.row.original.name}</b> will be permanently
              deleted.
            </Text>
            <Text>
              All related settings like categories, tags, statuses, priorities
              will be deleted too.
            </Text>
          </DeleteModalButton>
        ),
      },
    ];
  }, []);

  return (
    <>
      <DataTableWrapper
        key={Number(workspaceTableResetKey)}
        columns={columns}
        data={workspaces}
        deleteModalContent={
          <>
            <Text c={"red"} fz={"h3"} mb={"md"}>
              Selected workspaces will be deleted permanently.
            </Text>
            <Text>
              All related settings like categories, tags, statuses, priorities
              will be deleted too.
            </Text>
          </>
        }
        rowSelectionAction={async (ids) => {
          if (ids.length === 0) return { error: { message: "No selection." } };
          const response = await workspaceDeleteMany(ids);
          return response;
        }}
        rowSelectionActionTitle="Workspace"
        tableProps={{ id: "workspace-list-table", fz: "lg" }}
        show={{
          pagination: { top: true, bottom: false },
          info: { top: true, bottom: false },
        }}
      />
    </>
  );
}
