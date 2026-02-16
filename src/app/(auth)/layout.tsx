import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { routes } from "@/lib/routes";
import AppShell from "@/lib/ui/components/layout/01/AppShell";
import Navbar from "@/lib/ui/components/nav/Navbar";
import Layout03 from "@/lib/ui/components/layout/01/03/Layout03";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const currentPath = headerList.get("x-current-path") || "/";
  const session = null;

  if (!!session) {
    if (
      currentPath === routes.auth.signIn ||
      currentPath === routes.auth.signUp
    ) {
      return redirect(routes.DEFAULT_SIGNIN_REDIRECT);
    }
  }

  return (
    <AppShell nav={<Navbar />}>
      <Layout03>{children}</Layout03>
    </AppShell>
  );
}
