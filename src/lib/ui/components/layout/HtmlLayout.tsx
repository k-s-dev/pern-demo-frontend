"use client";

import "@/lib/ui/styles/index.scss";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/tiptap/styles.css";
import { ReactNode } from "react";
import { poppins, roboto } from "../../fonts";
import { ColorSchemeScript, Flex, mantineHtmlProps } from "@mantine/core";
import Head from "next/head";
import Providers from "../providers/Providers";
import NavLinks from "../nav/NavLinks";

/**
 * Html layout for components without access to app layout, e.g. Global-Error etc.
 */
export default function HtmlLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-theme=""
      className={`${poppins.className} ${roboto.className}`}
      {...mantineHtmlProps}
    >
      <Head>
        <ColorSchemeScript />
      </Head>
      <body>
        <Providers>
          <Flex gap={"xs"} p={"xs"} style={{ borderBottom: "1px solid black" }}>
            <NavLinks />
          </Flex>
          {children}
        </Providers>
      </body>
    </html>
  );
}
