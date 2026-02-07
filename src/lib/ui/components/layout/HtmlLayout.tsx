import { ReactNode, Suspense } from "react";
import { poppins, roboto } from "../../fonts";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import Head from "next/head";
import Providers from "../providers/Providers";

/**
 * Html layout for errors.
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
        <Suspense>
          <ColorSchemeScript />
        </Suspense>
      </Head>
      <body>
        <Providers>
          {/* TODO: update nav once setup */}
          <h1>Navbar</h1>
          {children}
        </Providers>
      </body>
    </html>
  );
}
