import AppShell from "@/lib/ui/components/layout/01/AppShell";
import styles from "./page.module.scss";
import { Button, Card, Flex, Text } from "@mantine/core";
import Link from "next/link";
import Navbar from "@/lib/ui/components/nav/Navbar";
import { CardHeader } from "@/lib/ui/components/card";

export default async function Page() {
  return (
    <AppShell nav={<Navbar />}>
      <main className={styles.mainContainer}>
        <header className={styles.mainHeader}>
          <h1>Nextjs Express Demo App</h1>
        </header>

        <section className={styles.stackAndFeaturesContainer}>
          <Card withBorder shadow="md">
            <header>
              <CardHeader>
                <Flex direction={"column"} align={"flex-start"}>
                  <h2>Stack</h2>
                  <Text c={"gray"} fw={"normal"} fz="h4" ta={"left"}>
                    PERN (Postgresql Expressjs React Nodejs) stack using Nextjs
                    app router written with Typescript.
                  </Text>
                </Flex>
              </CardHeader>
            </header>
            <section>
              <header>
                <Flex direction={"column"} align={"flex-start"}>
                  <h3>Frontend</h3>
                </Flex>
              </header>
              <article className={styles.stackRow}>
                {stack.frontend.map(([title, href], idx) => {
                  return <Item key={idx} href={href} title={title} />;
                })}
              </article>
            </section>
            <section>
              <header>
                <Flex direction={"column"} align={"flex-start"}>
                  <h3>Backend</h3>
                </Flex>
              </header>
              <article className={styles.stackRow}>
                {stack.backend.map(([title, href], idx) => {
                  return <Item key={idx} href={href} title={title} />;
                })}
              </article>
            </section>
          </Card>
        </section>
      </main>
    </AppShell>
  );
}

function Item({ href, title }: { href: string; title: string }) {
  return (
    <Link
      href={href}
      target={href.length === 0 ? "_self" : "_blank"}
      referrerPolicy="no-referrer"
    >
      <Button fullWidth fz="md" fw="normal" color="yellow.1">
        {title}
      </Button>
    </Link>
  );
}

const stack = {
  frontend: [
    ["Vercel", "https://www.vercel.com/"],
    ["Nextjs", "https://www.nextjs.org/"],
    ["Better-Auth", "https://www.better-auth.com/"],
    ["Valibot", "https://valibot.dev/"],
    ["Mantine UI", "https://mantine.dev/"],
    ["Cypress", "https://www.cypress.io/"],
    ["Jest", "https://jestjs.io/"],
    ["Vercel Blob", "https://vercel.com/storage/blob"],
  ],
  backend: [
    ["Vercel", "https://www.vercel.com/"],
    ["Express", "https://expressjs.com/"],
    ["Pino", "https://getpino.io/"],
    ["Better-Auth", "https://www.better-auth.com/"],
    ["Prisma", "https://www.prisma.io/"],
    ["Postgres", "https://www.postgresql.org"],
    ["Valibot", "https://valibot.dev/"],
  ],
};
