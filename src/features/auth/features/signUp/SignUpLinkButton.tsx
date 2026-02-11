import { routes } from "@/lib/routes";
import LinkButton from "@/lib/ui/components/LinkButton";
import { ButtonProps } from "@mantine/core";

export default function SignUpLinkButton({
  title = "Sign Up",
  ...restProps
}: TProps) {
  return (
    <LinkButton
      href={routes.auth.signUp}
      color="blue.1"
      {...restProps}
    >
      {title}
    </LinkButton>
  );
}

type TProps = {
  title?: string;
} & ButtonProps;
