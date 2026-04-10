"use client";

import { Button, Flex, Text, Title } from "@mantine/core";
import { useActionState } from "react";
import { categoryUpdateClientAction } from "./clientAction";
import { FaArrowsRotate } from "react-icons/fa6";
import {
  TCategoryFormData,
  TCategoryFormState,
  TCategoryWithChildren,
} from "../../definitions";
import { InputText } from "@/lib/ui/components/form/fields/InputText";
import { RichTextInput } from "@/lib/ui/components/form/fields/RichTextInput";
import FormMessages from "@/lib/ui/components/form/FormMessages";

export default function CategoryDetailForm({
  category,
  formId,
}: {
  category: TCategoryWithChildren;
  formId?: string;
}) {
  const formIdFinal = formId || "category-form";

  const initialFormState: TCategoryFormState = {
    data: { ...category } as TCategoryFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    categoryUpdateClientAction.bind(null, category),
    initialFormState,
  );

  if (!category) {
    return null;
  }

  return (
    <div>
      <Title order={1} id="category">
        <Text component="span" fz={"h1"}>
          Category: View/Edit Details
        </Text>
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
            errors={formState.errors?.nested?.name}
          />
          <InputText
            formId={formIdFinal}
            name="order"
            label="Order"
            defaultValue={formState.data?.order?.toString()}
            errors={formState.errors?.nested?.order}
          />
          <Title order={5}>Description</Title>
          <RichTextInput
            textInputProps={{ form: formId, name: "description" }}
            initialValue={formState.data?.description || ""}
          />
          <input
            type="text"
            hidden
            name="workspaceId"
            defaultValue={category.workspaceId}
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
          {formState.errors?.nested?.description && (
            <FormMessages
              error
              messages={formState.errors.nested.description}
            />
          )}
          {formState.errors?.root && (
            <FormMessages error messages={formState.errors.root} />
          )}
        </Flex>
      </form>
    </div>
  );
}
