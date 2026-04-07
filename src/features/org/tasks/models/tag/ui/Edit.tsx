import { Tag } from "@/lib/definitions/backend/prisma/client";
import { Card, Checkbox, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { Updater, useImmer } from "use-immer";
import { tagDelete, tagUpdate } from "../data";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import { SaveIcon } from "@/lib/ui/components/icons/TooltipIcons";
import DeleteModalIcon from "@/lib/ui/components/form/DeleteModalIcon";

export default function EditTag({
  tag,
  selected,
  setSelectionAction,
}: {
  tag: Tag;
  selected: boolean;
  setSelectionAction: Updater<string[]>;
}) {
  const [value, setValue] = useState(tag.name);
  const [errors, setErrors] = useImmer<string[]>([]);

  async function handleEdit() {
    const response = await tagUpdate(tag.id, { name: value });

    if (response.error && response.error.messages) {
      setErrors((draft) => {
        draft.push(response.error.message);
      });
    }
  }

  async function handleDelete() {
    const response = await tagDelete(tag.id);

    if (response.error) {
      setErrors((draft) => {
        draft.push(response.error.message);
      });
    }

    return response;
  }

  function toggleSelection() {
    if (!selected)
      setSelectionAction((draft) => {
        draft.push(tag.id);
      });
    if (selected)
      setSelectionAction((draft) => {
        const idx = draft.findIndex((id) => id === tag.id);
        draft.splice(idx, 1);
      });
  }

  return (
    <Card shadow="md" maw={250} p={5}>
      <Flex gap={"xs"} align={"center"}>
        <Checkbox checked={selected} onChange={toggleSelection} />
        <TextInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          error={errors.length > 0 && <FormMessages error messages={errors} />}
        />
        <SaveIcon action={handleEdit} />
        <DeleteModalIcon
          deleteAction={handleDelete}
          title={`Confirm to delete tag: ${tag.name}`}
        />
      </Flex>
    </Card>
  );
}
