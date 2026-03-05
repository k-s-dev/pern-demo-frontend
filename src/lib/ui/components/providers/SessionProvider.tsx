"use client";

import { TSessionData } from "@/lib/definitions/backend/auth/generic";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const SessionContext = createContext<ISessionContext | null>(null);

export function useSessionContext() {
  const sessionCtx = useContext(SessionContext);
  if (!sessionCtx) {
    throw new Error("Session context is null.");
  }
  return sessionCtx;
}

export function SessionProvider({
  initialSessionDataPromise,
  children,
}: {
  initialSessionDataPromise: Promise<TSessionData | null> | null;
  children: React.ReactNode;
}) {
  const [sessionDataPromise, setSessionDataPromise] =
    useState<Promise<TSessionData | null> | null>(initialSessionDataPromise);

  return (
    <SessionContext.Provider
      value={{ sessionDataPromise, setSessionDataPromise }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export interface ISessionContext {
  sessionDataPromise: Promise<TSessionData | null> | null;
  setSessionDataPromise: Dispatch<
    SetStateAction<Promise<TSessionData | null> | null>
  >;
}
