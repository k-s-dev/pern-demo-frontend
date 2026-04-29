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
          closeAction: () => {},
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
    title: "Org",
    href: routes.org.root,
    links: [
      {
        title: "Tasks",
        href: routes.org.tasks.root,
        links: [{ title: "Settings", href: routes.org.tasks.settings.root }],
      },
      { title: "Timer", href: routes.org.timer.root },
      { title: "Counter", href: routes.org.counter.root },
    ],
  },
];
