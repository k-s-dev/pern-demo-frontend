"use client";

import { useActionState, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@mantine/core";
import { TSignInFormAction, TSignInFormState } from "./definitions";
import Form from "@/lib/ui/components/form/Form";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import {
  UserEmail,
  UserPassword,
} from "@/features/auth/lib/ui/components/Fields";
import { useRememberMeCtx } from "@/features/auth/lib/ui/components/AuthCard";
import { emailSignInFormClientAction } from "./actions/client.action";
import { routes } from "@/lib/routes";

export default function CredentialsSignInForm({
  initialState,
  resetAction,
  formId = "signIn-form",
}: CredentialsSigninProps) {
  const router = useRouter();
  const rememberMeCtx = useRememberMeCtx();
  const searchParams = useSearchParams();
  const [actionName, setActionName] = useState<TSignInFormAction | null>(null);

  const [signInFormState, signInAction, isPendingSignIn] = useActionState(
    emailSignInFormClientAction.bind(
      null,
      "signIn",
      setActionName,
      rememberMeCtx.rememberMe,
    ),
    { ...initialState, action: "signIn" },
  );

  const [resetFormState, resetPasswordAction, isPendingReset] = useActionState(
    emailSignInFormClientAction.bind(
      null,
      "reset",
      setActionName,
      rememberMeCtx.rememberMe,
    ),
    { ...initialState, action: "reset" },
  );

  const [
    verificationFormState,
    sendVerificationEmailFormAction,
    isPendingVerification,
  ] = useActionState(
    emailSignInFormClientAction.bind(
      null,
      "verify",
      setActionName,
      rememberMeCtx.rememberMe,
    ),
    {
      ...initialState,
      action: "verify",
    },
  );

  const knownErrors: string[] = [];
  if (searchParams.get("error") === "OAuthAccountNotLinked") {
    knownErrors.push(`Email already registered with another provider.`);
    knownErrors.push(`Use the initial provier used to sign in.`);
  }

  let formState: TSignInFormState = initialState;
  if (signInFormState.touched && actionName === "signIn")
    formState = signInFormState;
  if (resetFormState.touched && actionName === "reset")
    formState = resetFormState;
  if (verificationFormState.touched && actionName === "verify")
    formState = verificationFormState;

  if (formState.status === "success") {
    router.push(routes.DEFAULT_SIGNIN_REDIRECT);
  }

  return (
    <>
      <Form id={formId} noValidate>
        <UserEmail
          formId={formId}
          formState={formState}
          data-test-cy="signIn-email"
        />
        <UserPassword
          formId={formId}
          formState={formState}
          required
          data-test-cy="signIn-password"
        />
        <Button
          type="submit"
          form={formId}
          formAction={signInAction}
          disabled={isPendingSignIn || isPendingReset || isPendingVerification}
          color="green.1"
          data-test-cy="signIn-btn"
        >
          Sign In
        </Button>

        <Button
          type="submit"
          form={formId}
          formAction={sendVerificationEmailFormAction}
          disabled={isPendingSignIn || isPendingReset || isPendingVerification}
          color="gray.2"
          fullWidth
          data-test-cy="send_verification_link_email-btn"
        >
          Resend email verification link
        </Button>

        <Button
          type="submit"
          form={formId}
          formAction={resetPasswordAction}
          disabled={isPendingSignIn || isPendingReset || isPendingVerification}
          color="gray.2"
          fullWidth
          data-test-cy="reset_password-btn"
        >
          Reset Password
        </Button>

        <Button
          type="button"
          fullWidth
          variant="light"
          color="gray"
          onClick={() => resetAction()}
        >
          Reset
        </Button>
      </Form>
      {formState.errors?.root && (
        <FormMessages error messages={formState.errors.root} />
      )}
      {formState.messages && <FormMessages messages={formState.messages} />}
    </>
  );
}

export interface CredentialsSigninProps {
  initialState: TSignInFormState;
  resetAction: () => void;
  formId?: string;
}
