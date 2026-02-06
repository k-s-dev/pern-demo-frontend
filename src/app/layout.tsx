import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Roboto } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/tiptap/styles.css";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import Providers from "@/lib/ui/components/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const roboto = Roboto({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "Nextjs Expressjs Demo",
  description:
    "Sample project[s] built with Nextjs, Expressjs, Typescript, Better-Auth, custom Sass, Mantine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const htmlClassNames = clsx(
    poppins.className,
    roboto.className,
    geistMono.className,
    geistSans.className,
  );

  return (
    <html lang="en" className={htmlClassNames} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          {children}
          <Notifications autoClose={3000} />
        </Providers>
      </body>
    </html>
  );
}
