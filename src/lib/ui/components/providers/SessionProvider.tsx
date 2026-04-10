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
  initialSessionData,
  children,
}: {
  initialSessionData: TSessionData | null;
  children: React.ReactNode;
}) {
  const [sessionData, setSessionData] = useState<TSessionData | null>(
    initialSessionData,
  );

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
}

export interface ISessionContext {
  sessionData: TSessionData | null;
  setSessionData: Dispatch<SetStateAction<TSessionData | null>>;
}
