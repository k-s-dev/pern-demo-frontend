"use client";

import { Card, Switch } from "@mantine/core";
import AuthCardHeader from "./AuthCardHeader";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const RememberMeCtx = createContext<{
  rememberMe: boolean;
  setRememberMe: Dispatch<SetStateAction<boolean>>;
} | null>(null);

export function useRememberMeCtx() {
  const rememberMeCtx = useContext(RememberMeCtx);
  if (!rememberMeCtx) {
    throw new Error("RememberMeCtx not initialized.");
  }
  return rememberMeCtx;
}

export default function AuthCard({
  subTitle,
  children,
  addRememberMeSwitch = false,
}: {
  subTitle: string;
  children: React.ReactNode;
  addRememberMeSwitch?: boolean;
}) {
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <RememberMeCtx.Provider value={{ rememberMe, setRememberMe }}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        mx="auto"
        my={{ base: "1rem", xs: "3rem" }}
        w={{ base: "95%", sm: 450 }}
      >
        <AuthCardHeader subTitle={subTitle} />
        {children}
        {addRememberMeSwitch && (
          <Switch
            checked={rememberMe}
            onClick={() => setRememberMe((prev) => !prev)}
            label="Remain signed in?"
            labelPosition="left"
            my="sm"
            color="blue"
          />
        )}
      </Card>
    </RememberMeCtx.Provider>
  );
}
