import { redirect } from "next/navigation";
import { routes } from "@/lib/routes";
import { getSession } from "@/features/auth/lib/getSession";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (session) {
    return redirect(routes.DEFAULT_SIGNIN_REDIRECT);
  }

  return <>{children}</>;
}
