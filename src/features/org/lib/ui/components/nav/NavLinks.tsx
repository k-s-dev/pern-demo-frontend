"use client";

import styles from "./NavLinks.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { Title } from "@mantine/core";
import { mantineTheme } from "@/lib/ui/mantine.theme";
import { renderNavLinks } from "@/lib/ui/components/nav/renderNavLinks";
import { INavLink } from "@/lib/ui/components/nav/definitions";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <Title>
        <Link href={routes.generic.home} className={styles.titleAnchor}>
          Next
        </Link>
        <Link
          href={routes.org.root}
          style={{ color: mantineTheme.colors.green[5] }}
          className={styles.titleAnchor}
        >
          Org
        </Link>
      </Title>
      {navLinks.map((link) => {
        return renderNavLinks({
          link,
          classNames: { base: styles.link, active: styles.active },
          pathname,
          screen: "phone-up",
          closeAction: () => {},
        });
      })}
    </>
  );
}

export const navLinks: INavLink[] = [
  {
    title: "Tasks",
    href: routes.org.tasks.root,
  },
  {
    title: "Settings",
    href: routes.org.tasks.settings.root,
  },
  {
    title: "Timer",
    href: routes.org.timer.root,
  },
  {
    title: "Counter",
    href: routes.org.counter.root,
  },
];
