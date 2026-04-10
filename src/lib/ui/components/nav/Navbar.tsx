import { Suspense } from "react";
import styles from "./Navbar.module.scss";
import NavUser from "./NavUser";
import { NavLinks, NavLinksPhone } from "./NoSsrComponents";
import NavThemeToggle from "./theme/NavThemeToggle";
import { Skeleton } from "@mantine/core";

export default async function Navbar() {
  return (
    <nav className={styles.nav}>
      <NavPhoneUp />
      <NavPhone />
    </nav>
  );
}

export async function NavPhoneUp() {
  return (
    <section className="media-phone-up">
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <NavLinks />
        </div>
        <div className={styles.center}>
          <section></section>
        </div>
        <div className={styles.right}>
          <NavRight />
        </div>
      </div>
    </section>
  );
}

export async function NavPhone() {
  return (
    <>
      <section className="media-phone">
        <div className={styles.wrapper}>
          <NavLinksPhone />
          <NavThemeToggle />
          <Suspense fallback={<Skeleton circle h={30} w={30} />}>
            <NavUser />
          </Suspense>
        </div>
      </section>
    </>
  );
}

export async function NavPhoneSearch() {
  return (
    <section className="media-phone">
      <div className={styles.phoneSearch}>
        <section>Search</section>
      </div>
    </section>
  );
}

function NavRight() {
  return (
    <>
      <NavThemeToggle />
      <Suspense fallback={<Skeleton circle h={30} w={30} />}>
        <NavUser />
      </Suspense>
    </>
  );
}
