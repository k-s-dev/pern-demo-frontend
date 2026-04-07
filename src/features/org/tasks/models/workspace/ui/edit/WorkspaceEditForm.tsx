"use client";

import { Button, Flex, Text, Title } from "@mantine/core";
import { useActionState } from "react";
import { workspaceUpdateClientAction } from "./clientAction";
import { FaArrowsRotate } from "react-icons/fa6";
import { InputText } from "@/lib/ui/components/form/fields/InputText";
import { RichTextInput } from "@/lib/ui/components/form/fields/RichTextInput";
import { useTasksContext } from "@/features/org/tasks/ui/hooks/TasksContext";
import { TWorkspaceFormData, TWorkspaceFormState } from "../../definitions";

export default function WorkspaceEditForm({
  id,
  formId,
}: {
  id: string;
  formId?: string;
}) {
  const formIdFinal = formId || "workspace-form";
  const tasksCtx = useTasksContext();
  const workspace = tasksCtx.state.workspaces.filter((workspace) => {
    return workspace.id === id;
  })[0];

  const initialFormState: TWorkspaceFormState = {
    data: { ...workspace } as TWorkspaceFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    workspaceUpdateClientAction.bind(null, id),
    initialFormState,
  );

  if (!workspace) {
    return null;
  }

  return (
    <div>
      <Title order={1} id="workspace">
        <Text component="span" fz={"h1"}>
          Configure Workspace:{" "}
        </Text>
        {workspace.name}
      </Title>
      <form id={formIdFinal} action={formAction}>
        <Flex direction={"column"} gap={"xs"}>
          <InputText
            formId={formIdFinal}
            required
            name="name"
            label="Name"
            placeholder="Name"
            defaultValue={formState.data?.name}
          />
          <Title order={5}>Description</Title>
          <RichTextInput
            textInputProps={{ form: formId, name: "description" }}
            initialValue={formState.data?.description || ""}
          />
          <Flex justify={"flex-end"}>
            <Button
              type="submit"
              form={formIdFinal}
              disabled={isPending}
              color="green"
              variant="light"
              w={100}
            >
              {isPending ? <FaArrowsRotate /> : "Save"}
            </Button>
          </Flex>
        </Flex>
      </form>
    </div>
  );
}
