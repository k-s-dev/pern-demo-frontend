"use server";

import { cookies } from "next/headers";
import { TThemes } from "./NavThemeToggleButton";
import { NavThemeToggleButton } from "../NoSsrComponents";
import { Suspense } from "react";
import { Skeleton } from "@mantine/core";

export default async function NavThemeToggle() {
  const cookieStore = await cookies();

  /**
   * type casting depends on cookie being set on initial page load through
   * `public/js/setThemeScript.js`
   */
  const themeName = cookieStore.get("theme")?.value as TThemes;

  return (
    <Suspense fallback={<Skeleton circle height={20} />}>
      <NavThemeToggleButton themeName={themeName} />
    </Suspense>
  );
}
