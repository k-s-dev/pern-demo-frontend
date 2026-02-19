"use client";

import styles from "./NavLinks.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Title } from "@mantine/core";
import { renderNavLinks } from "./renderNavLinks";
import { routes } from "@/lib/routes";
import { mantineTheme } from "../../mantine.theme";
import { INavLink } from "./definitions";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <NavLinksTitle />
      {navLinks.map((link) => {
        return renderNavLinks({
          link,
          classNames: { base: styles.link, active: styles.active },
          pathname,
          screen: "phone-up",
        });
      })}
    </>
  );
}

export function NavLinksTitle() {
  return (
    <Title order={6} size="h1">
      <Link href={routes.generic.home}>Next</Link>
      <Link
        href={routes.generic.home}
        style={{ color: mantineTheme.colors.green[5] }}
      >
        Demo
      </Link>
    </Title>
  );
}

export const navLinks: INavLink[] = [
  {
    title: "API-Test",
    href: routes.auth.apiTest,
  },
  {
    title: "Org",
    href: "/org",
    links: [
      {
        title: "Tasks",
        href: "/org/tasks",
      },
    ],
  },
];
