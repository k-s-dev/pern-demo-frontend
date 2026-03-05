"use server";

import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@mantine/core";
import NavThemeToggleButton, { TThemes } from "./NavThemeToggleButton";

export default async function NavThemeToggle() {
  const cookieStore = await cookies();

  /**
   * type casting depends on cookie being set on initial page load through
   * `public/js/setThemeScript.js`
   */
  const themeName = cookieStore.get("theme")?.value as TThemes;

  return (
    <Suspense fallback={<Skeleton circle height={20} w={20} />}>
      <NavThemeToggleButton themeName={themeName} />
    </Suspense>
  );
}
