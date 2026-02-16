"use client";

import { useActionState } from "react";
import { useDisclosure } from "@mantine/hooks";
import {
  SResetPasswordForm,
  TResetPasswordFormState,
  TResetPasswordFormStateData,
} from "./definitions";
import { Button } from "@mantine/core";
import Form from "@/lib/ui/components/form/Form";
import {
  UserConfirmPassword,
  UserPassword,
} from "../../lib/ui/components/Fields";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import { resetPasswordClientAction } from "./client.action";

export default function ResetPasswordForm({
  token,
  formId = "reset-password-form",
}: PropsFormResetPassword) {
  const [visible, { toggle }] = useDisclosure(false);

  const initialFormData = {} as TResetPasswordFormStateData;

  const initialFormState: TResetPasswordFormState = {
    data: initialFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    resetPasswordClientAction.bind(null, SResetPasswordForm, token),
    initialFormState,
  );

  const formErrors = formState.errors?.root;

  return (
    <>
      <Form id={formId} action={formAction} noValidate>
        <UserPassword
          formId={formId}
          formState={formState}
          visible={visible}
          onVisibilityChange={toggle}
          data-test-cy="reset-password-password"
        />
        <UserConfirmPassword
          formId={formId}
          formState={formState}
          visible={visible}
          onVisibilityChange={toggle}
          data-test-cy="reset-password-confirmPassword"
        />

        <Button
          type="submit"
          form={formId}
          disabled={isPending}
          data-test-cy="reset-password-submit-btn"
          color="yellow.1"
        >
          Save
        </Button>
      </Form>
      <FormMessages error messages={formErrors} />
      <FormMessages messages={formState.messages} />
    </>
  );
}

export interface PropsFormResetPassword {
  token: string;
  formId?: string;
}
