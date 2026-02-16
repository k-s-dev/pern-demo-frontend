import { USER_ROLE } from "@/features/auth/lib/definitions";
import {
  InputPassword,
  InputPasswordProps,
} from "@/lib/ui/components/form/fields/InputPassword";
import {
  InputText,
  InputTextProps,
} from "@/lib/ui/components/form/fields/InputText";
import { SelectSingle } from "@/lib/ui/components/form/fields/SelectSingle";
import { Checkbox, SelectProps } from "@mantine/core";
import { InputDateTimeProps } from "@/lib/ui/components/form/fields/InputDateTime";
import { DynamicFormStateForFields } from "@/lib/definitions/form";

export function UserEmail<
  GFormState extends DynamicFormStateForFields<"email">,
>({ formId, formState, ...props }: UserTextFieldProps<GFormState>) {
  return (
    <InputText
      formId={formId}
      name="email"
      label="Email"
      placeholder="e.g. user@gmail.com"
      defaultValue={formState.data?.email}
      errors={formState.errors?.nested?.email}
      required
      data-test-cy="email-input"
      {...props}
    />
  );
}

export function UserName<GFormState extends DynamicFormStateForFields<"name">>({
  formId,
  formState,
  ...props
}: UserTextFieldProps<GFormState>) {
  return (
    <InputText
      formId={formId}
      name="name"
      label="Name"
      placeholder="e.g. First Last"
      defaultValue={formState.data?.name}
      errors={formState.errors?.nested?.name}
      required
      {...props}
    />
  );
}

export function UserPassword<
  GFormState extends DynamicFormStateForFields<"password">,
>({ formId, formState, ...props }: UserPasswordFieldProps<GFormState>) {
  return (
    <InputPassword
      formId={formId}
      name="password"
      label="Password"
      placeholder="Password"
      defaultValue={formState.data?.password}
      errors={formState.errors?.nested?.password}
      required
      {...props}
    />
  );
}

export function UserConfirmPassword<
  GFormState extends DynamicFormStateForFields<"confirmPassword">,
>({ formId, formState, ...props }: UserPasswordFieldProps<GFormState>) {
  return (
    <InputPassword
      formId={formId}
      name="confirmPassword"
      label="Confirm Password"
      placeholder="Confirm Password"
      defaultValue={formState.data?.confirmPassword}
      errors={formState.errors?.nested?.confirmPassword}
      required
      {...props}
    />
  );
}

export function UserRole<
  GFormState extends DynamicFormStateForFields<"role", USER_ROLE>,
>({ formId, formState, ...props }: UserFieldRoleProps<GFormState>) {
  /**
   * Separate node for rendering disabled field is needed
   * to avoid random functionality clashes
   */
  if (formState.data?.role === USER_ROLE.ADMIN) {
    return (
      <SelectSingle
        formId={formId}
        data={[USER_ROLE.ADMIN]}
        defaultValue={USER_ROLE.ADMIN}
        errors={formState.errors?.nested?.role}
        name="role"
        label="Role"
        placeholder="Role"
        disabled
        {...props}
      />
    );
  }
  return (
    <SelectSingle
      formId={formId}
      data={Object.values(USER_ROLE)}
      defaultValue={formState.data?.role}
      errors={formState.errors?.nested?.role}
      name="role"
      label="Role"
      placeholder="Role"
      {...props}
    />
  );
}

export function UserEmailVerified<
  GFormState extends DynamicFormStateForFields<"emailVerified", boolean>,
>({ formId, formState, ...props }: UserFieldProps<GFormState>) {
  return (
    <Checkbox
      form={formId}
      defaultChecked={formState.data?.emailVerified}
      name="emailVerified"
      label="Email Verified"
      labelPosition="left"
      size="lg"
      {...props}
    />
  );
}

export interface UserFieldProps<GFormState> {
  formId: string;
  formState: GFormState;
}

export interface UserTextFieldProps<GFormState>
  extends UserFieldProps<GFormState>, InputTextProps {}

export interface UserPasswordFieldProps<GFormState>
  extends UserFieldProps<GFormState>, InputPasswordProps {}

export interface UserConfirmPasswordsProps<GFormState> {
  formId: string;
  passwordFormState: GFormState;
  confirmPasswordFormState: GFormState;
}

export interface UserFieldRoleProps<GFormState>
  extends UserFieldProps<GFormState>, SelectProps {}
export interface UserFieldDateTimeProps<GFormState>
  extends UserFieldProps<GFormState>, InputDateTimeProps {}
