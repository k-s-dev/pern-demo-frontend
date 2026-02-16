import { routes } from "@/lib/routes";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>Sign in failed.</p>
      <Link href={routes.auth.signIn} className="btn">
        Back to signIn
      </Link>
    </div>
  );
}
