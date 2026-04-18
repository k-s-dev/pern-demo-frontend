"use client";

import styles from "../Table.module.scss";

import { Box } from "@mantine/core";
import { useActionState, useId, useState } from "react";
import { Updater } from "use-immer";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import { columnWidths, TData, TFormData, TFormState } from "../definitions";
import { clientAction } from "./actions/client";
import { TableCheckbox } from "../selection/TableCheckbox";
import {
  CellConfigureButton,
  CellDeleteButton,
  CellName,
  CellResetButton,
  CellSubmitButton,
} from "./Cells";

export default function Row({
  mode,
  rowData,
  selectedIds,
  setSelectedIdsAction,
}: TRowProps & (IRowCreateProps | IRowUpdateProps)) {
  const [resetKey, setResetKey] = useState(0);
  const randomFormId = useId();

  const formId =
    mode === "update"
      ? `workspace-update-form-${rowData.id}`
      : `workspace-create-form-row-${randomFormId}`;

  const initialFormState: TFormState = {
    data: { ...rowData } as TFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    clientAction.bind(null, rowData?.id, mode),
    initialFormState,
  );

  function handleReset() {
    setResetKey((p) => p + 1);
  }

  return (
    <>
      <form key={resetKey} id={formId} action={formAction}>
        <Box
          className={styles.formContainer}
          style={{ gridTemplateColumns: columnWidths }}
        >
          <TableCheckbox
            selectedIds={selectedIds}
            setSelectedIdsAction={setSelectedIdsAction}
            rowData={rowData}
          />

          <CellName formId={formId} formState={formState} />

          <CellConfigureButton id={rowData?.id} />
          <CellSubmitButton formId={formId} isPending={isPending} mode={mode} />
          <CellDeleteButton rowData={rowData} />
          <CellResetButton formId={formId} resetAction={handleReset} />
        </Box>
      </form>
      {formState.errors?.root && (
        <FormMessages error messages={formState.errors.root} />
      )}
      {formState.errors?.other && (
        <FormMessages error messages={formState.errors.other} />
      )}
      {formState.messages && <FormMessages messages={formState.messages} />}
    </>
  );
}

type TRowProps = {
  selectedIds: string[];
  setSelectedIdsAction: Updater<string[]>;
};

interface IRowCreateProps {
  mode: "create";
  rowData?: never;
}

interface IRowUpdateProps {
  mode: "update";
  rowData: TData;
}
