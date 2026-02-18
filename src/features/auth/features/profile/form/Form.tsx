"use client";

import Form from "@/lib/ui/components/form/Form";
import { useActionState, useState } from "react";
import { InputImage } from "@/lib/ui/components/form/fields/InputImage";
import { TProfileFormState, TProfileFormStateData } from "./definitions";
import { Button, Flex } from "@mantine/core";
import {
  UserEmailVerified,
  UserName,
} from "@/features/auth/lib/ui/components/Fields";
import { TUser } from "@/features/auth/lib/definitions";
import { updateProfileClientAction } from "./actions/client.action";
import FormMessages from "@/lib/ui/components/form/FormMessages";

export function ProfileForm({
  user,
  formId = `user-update-form`,
}: {
  user: TUser;
  formId?: string;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const initialFormState: TProfileFormState = {
    data: { ...user } as TProfileFormStateData,
  };

  const [formState, formAction, isPending] = useActionState(
    updateProfileClientAction.bind(null, user, imageFile),
    initialFormState,
  );

  return (
    <>
      <Form
        id={formId}
        noValidate
        action={formAction}
        style={{ width: "100%" }}
      >
        <UserName formId={formId} formState={formState} />

        <InputImage
          formId={formId}
          imageFile={imageFile}
          setImageFile={setImageFile}
          initialImageUrl={user.image || undefined}
          errors={formState.errors?.nested?.image}
        />

        <Flex justify="flex-end">
          <Button
            type="submit"
            form={formId}
            formAction={formAction}
            disabled={isPending}
            variant="light"
            color="blue"
          >
            Save
          </Button>
        </Flex>

        <UserEmailVerified formId={formId} formState={formState} disabled />
      </Form>
      <FormMessages error messages={formState.errors?.root} />
      <FormMessages messages={formState.messages} />
    </>
  );
}
