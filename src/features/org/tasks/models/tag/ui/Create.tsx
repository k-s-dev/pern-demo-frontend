import { Box, Button, TextInput } from "@mantine/core";
import styles from "./Create.module.scss";
import { useImmer } from "use-immer";
import { Dispatch, SetStateAction } from "react";
import * as v from "valibot";
import { FaArrowsRotate } from "react-icons/fa6";
import { STagFieldName } from "@/lib/definitions/backend/org/tag";
import { tagCreate } from "../data";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import { useRouter } from "next/navigation";

export default function CreateTag({
  value,
  setValue,
  postCreateAction,
}: {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  postCreateAction?: () => void;
}) {
  const [errors, setErrors] = useImmer<string[]>([]);
  const router = useRouter();

  async function handleAddTag() {
    const names = value.split(",");
    names.forEach(async (name) => {
      if (name.trim().length === 0) {
        return;
      }

      const validationResult = v.safeParse(STagFieldName, name);
      if (!validationResult.success) {
        setErrors(
          validationResult.issues.map((issue) => issue as unknown as string),
        );
      }

      if (validationResult.success) {
        const response = await tagCreate({ name: name.trim() });

        if (response.error) {
          setErrors((draft) => {
            draft.push(response.error.message);
          });
          return;
        }

        setValue("");
        setErrors([]);
        if (postCreateAction) {
          postCreateAction();
        }
        router.refresh();
      }
    });
  }

  return (
    <Box className={styles.mainContainer}>
      <TextInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        error={errors.length > 0 && <FormMessages error messages={errors} />}
        placeholder="comma separated tag names ..."
      />
      <Button variant="light" onClick={handleAddTag}>
        Add
      </Button>
      <Button
        variant="light"
        color="gray"
        onClick={() => {
          setValue("");
          setErrors([]);
        }}
      >
        <FaArrowsRotate />
      </Button>
    </Box>
  );
}
