/**
 * Type for use in generic form state to be provided to construct field components.
 * Takes field name and value type as arguments to construct required 
 * form state type.
 * Value type is string by default and is optional.
 * e.g. 
```
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
```
 */
export type DynamicFormStateForFields<K extends PropertyKey, V = string> = {
  data?: { [P in K]?: V };
  errors?: { nested?: { [P in K]?: string[] } };
};


