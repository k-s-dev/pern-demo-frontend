import { Button, Flex, Text, TextInput } from "@mantine/core";
import { TData, TFormState } from "../definitions";
import { useRouter } from "next/navigation";
import DeleteModalButton from "@/lib/ui/components/form/DeleteModal";
import { workspaceDelete } from "../../../data";
import { FaArrowsRotate } from "react-icons/fa6";
import LinkButton from "@/lib/ui/components/LinkButton";
import { routes } from "@/lib/routes";

export function CellName({ formId, formState }: IFieldCellProps) {
  return (
    <TextInput
      form={formId}
      name="name"
      defaultValue={formState.data?.name}
      error={formState.errors?.nested?.name && formState.errors.nested.name}
    />
  );
}

export function CellConfigureButton({ id }: { id?: string }) {
  const buttonText = "Details";

  if (!id) {
    return (
      <Button disabled variant="outline">
        {buttonText}
      </Button>
    );
  }
  return (
    <LinkButton
      href={routes.org.tasks.workspace.withId(id)}
      variant="outline"
      color="blue"
    >
      {buttonText}
    </LinkButton>
  );
}

export function CellSubmitButton({
  formId,
  isPending,
  mode,
}: {
  formId: string;
  isPending: boolean;
  mode: "create" | "update";
}) {
  return (
    <Button
      type="submit"
      form={formId}
      disabled={isPending}
      color="green"
      variant="outline"
    >
      <Flex display={"inline-flex"} gap={"xs"}>
        {mode === "create" ? "Add" : "Save"} {isPending && <FaArrowsRotate />}
      </Flex>
    </Button>
  );
}

export function CellDeleteButton({ rowData }: { rowData?: TData }) {
  const router = useRouter();

  return (
    <DeleteModalButton
      deleteAction={async () => {
        if (rowData) {
          const response = await workspaceDelete(rowData.id);
          router.refresh();
          return response;
        }
        return { error: { message: "No selection." } };
      }}
      color="red"
      variant="outline"
      disabled={!rowData}
    >
      <Text fz={"xl"} c={"red"}>
        Workspace {rowData?.name} will be deleted permanently.
      </Text>
    </DeleteModalButton>
  );
}

export function CellResetButton({
  formId,
  resetAction,
}: {
  formId: string;
  resetAction: () => void;
}) {
  return (
    <Button form={formId} onClick={resetAction} color="gray" variant="outline">
      Reset
    </Button>
  );
}

interface IFieldCellProps {
  formId: string;
  formState: TFormState;
}
