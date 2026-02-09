"use client";

import { Divider } from "@mantine/core";
import CredentialsSignInForm from "./credentials/Form";
import SignUpLinkButton from "../signUp/SignUpLinkButton";
import { useState } from "react";
import AuthCard from "../../lib/ui/components/AuthCard";
import AuthProviderIcons from "../../lib/ui/components/AuthProviderIcons";

export default function SignInCard() {
  const [resetKey, setResetKey] = useState(0);

  return (
    <AuthCard subTitle="Welcome Back">
      <CredentialsSignInForm
        key={resetKey}
        initialState={{ data: {} as TUserFormStateData, touched: false }}
        resetAction={() => setResetKey((p) => p + 1)}
      />
      <Divider size="md" label="SignIn with other providers..." />
      <AuthProviderIcons />
      <Divider size="md" label="Don't have an account?" />
      <SignUpLinkButton />
    </AuthCard>
  );
}
