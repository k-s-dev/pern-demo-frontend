"use client";

import { routes } from "@/lib/routes";
import Link from "next/link";
import { FaBullseye } from "react-icons/fa6";

export default function NavIcon() {
  return (
    <Link href={routes.generic.home}>
      <FaBullseye />
    </Link>
  );
}
