"use client";

import Link from "next/link";

interface CustomLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export function LinkWithoutScroll({ children, ...props }: CustomLinkProps) {
  return (
    <Link scroll={false} {...props}>
      {children}
    </Link>
  );
}
