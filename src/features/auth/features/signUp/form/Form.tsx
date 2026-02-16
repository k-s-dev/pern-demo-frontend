"use client";

import styles from "./Form.module.scss";
import { useActionState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { signUpClientAction } from "./client.action";
import {
  UserConfirmPassword,
  UserEmail,
  UserName,
  UserPassword,
} from "@/features/auth/lib/ui/components/Fields";
import { Button, Text } from "@mantine/core";
import { TSignUpFormState, TSignUpFormStateData } from "./definitions";
import Form from "@/lib/ui/components/form/Form";
import FormMessages from "@/lib/ui/components/form/FormMessages";

export default function SignUpForm({
  formId = "signUp-form",
}: SignUpFormProps) {
  const [visible, { toggle }] = useDisclosure(false);

  const initialFormData = {} as TSignUpFormStateData;

  const initialFormState: TSignUpFormState = {
    data: initialFormData,
  };

  const [formState, formAction, isPending] = useActionState(
    signUpClientAction,
    initialFormState,
  );

  const formErrors = formState.errors?.root;

  if (formState.status === "success") {
    return (
      <div
        className={styles.successMessage}
        data-test-cy="signUp-success-message"
      >
        <p>User created successfully.</p>
        <p>
          Verification link has been sent to email:
          <br />
          <Text component="span" fw={"bold"}>
            {formState.data?.email}
          </Text>
        </p>

        <p className={styles.verificationNotice}>
          Email verification is needed to be able to sign in using email and
          password.
        </p>
      </div>
    );
  }

  return (
    <>
      <Form id={formId} noValidate>
        <UserEmail
          formId={formId}
          formState={formState}
          data-test-cy="signUp-email"
        />
        <UserPassword
          formId={formId}
          formState={formState}
          visible={visible}
          onVisibilityChange={toggle}
          data-test-cy="signUp-password"
        />
        <UserConfirmPassword
          formId={formId}
          formState={formState}
          visible={visible}
          onVisibilityChange={toggle}
          data-test-cy="signUp-confirmPassword"
        />

        <UserName
          formId={formId}
          formState={formState}
          data-test-cy="signUp-name"
        />

        <Button
          type="submit"
          form={formId}
          formAction={formAction}
          disabled={isPending}
          data-test-cy="signUp-btn"
          color="blue.1"
        >
          Sign Up
        </Button>
      </Form>
      <FormMessages error messages={formErrors} />
      <FormMessages messages={formState.messages} />
    </>
  );
}

export interface SignUpFormProps {
  formId?: string;
}
