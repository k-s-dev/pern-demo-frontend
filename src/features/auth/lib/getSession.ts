import { headers } from "next/headers";
import { auth } from "./auth";
import React from "react";

export const getSession = React.cache(async () => {
  const response = await auth.api.getSession({
    headers: await headers(),
  });
  return response;
});
