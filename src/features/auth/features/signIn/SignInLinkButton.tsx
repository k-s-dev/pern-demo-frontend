import { routes } from "@/lib/routes";
import LinkButton from "@/lib/ui/components/LinkButton";
import { ButtonProps } from "@mantine/core";

export default function SignInLinkButton({
  title = "Sign In",
  ...restProps
}: TProps) {
  return (
    <LinkButton href={routes.auth.signIn} color="green.1" {...restProps}>
      {title}
    </LinkButton>
  );
}

type TProps = {
  title?: string;
} & ButtonProps;
