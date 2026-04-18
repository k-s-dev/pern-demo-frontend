"use client";

import { Button, Flex, Text, Title } from "@mantine/core";
import { useActionState } from "react";
import { workspaceUpdateClientAction } from "./clientAction";
import { FaArrowsRotate } from "react-icons/fa6";
import { InputText } from "@/lib/ui/components/form/fields/InputText";
import { RichTextInput } from "@/lib/ui/components/form/fields/RichTextInput";
import { TWorkspaceFormData, TWorkspaceFormState } from "../../definitions";
import { TWorkspaceIncludeAll } from "@/lib/definitions/backend/org/workspace";

export default function WorkspaceEditForm({
  workspace,
  formId,
}: {
  workspace: TWorkspaceIncludeAll;
  formId?: string;
}) {
  const formIdFinal = formId || "workspace-form";

  const initialFormState: TWorkspaceFormState = {
    data: workspace as TWorkspaceFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    workspaceUpdateClientAction.bind(null, workspace.id),
    initialFormState,
  );

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
