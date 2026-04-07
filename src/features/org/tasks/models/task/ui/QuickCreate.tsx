import {
  Button,
  Card,
  ComboboxItemGroup,
  Flex,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useImmer } from "use-immer";
import { useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import { ERROR_MESSAGES } from "@/lib/constants/index";
import styles from "./QuickCreate.module.scss";
import {
  useGetDefaultPriorityByCategoryId,
  useGetDefaultStatusByCategoryId,
  useTasksContext,
} from "../../../ui/hooks/TasksContext";
import { taskCreate } from "../data";
import { CardHeader } from "@/lib/ui/components/card";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import * as v from "valibot";
import { STaskFieldName } from "@/lib/definitions/backend/org/task";

export default function TaskQuickCreate({
  parentId,
  postAddAction = () => {},
}: {
  parentId?: string | null;
  postAddAction?: () => void;
}) {
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useImmer<string[]>([]);
  const [resetKey, setResetKey] = useState(0);
  const tasksCtx = useTasksContext();

  const parent = tasksCtx.state.tasks.find((el) => el.id === parentId);

  const categoryChoices: ComboboxItemGroup[] = [];
  tasksCtx.state.workspaces.forEach((workspace) => {
    const group: ComboboxItemGroup = {
      group: `Workspace: ${workspace.name}`,
      items: [],
    };
    workspace.categories.forEach((category) => {
      group.items.push({
        label: category.name,
        value: category.id,
      });
    });
    categoryChoices.push(group);
  });

  const [categoryId, setcategoryId] = useState<string>(
    parent ? parent.categoryId : "",
  );

  const defaultPriority = useGetDefaultPriorityByCategoryId(categoryId);
  const defaultStatus = useGetDefaultStatusByCategoryId(categoryId);

  async function handleAdd() {
    setErrors([]);
    if (title.trim().length === 0) {
      setErrors((draft) => {
        draft.push("Title cannot be empty.");
      });
      return;
    }

    const validation = v.safeParse(STaskFieldName, title);
    if (!validation.success) {
      const errors = v.flatten<typeof STaskFieldName>(validation.issues);
      setErrors((draft) => {
        errors.root?.forEach((e) => draft.push(e));
      });
      return;
    }

    if (!categoryId) {
      setErrors((draft) => {
        draft.push("Category cannot be empty.");
      });
      return;
    }

    if (!defaultStatus || !defaultPriority) {
      setErrors((draft) => {
        draft.push(ERROR_MESSAGES.internalServer);
      });

      return;
    }

    const response = await taskCreate({
      title: title.trim(),
      categoryId,
      parentId,
      priorityId: defaultPriority.id,
      statusId: defaultStatus.id,
    });

    if (response.error) {
      setErrors((draft) => {
        draft.push(response.error.message);
      });
    }

    setTitle("");
    setErrors([]);
    setResetKey((p) => p + 1);
    postAddAction();
  }

  if (
    tasksCtx.state.workspaces.length === 0 ||
    (!parentId && categoryChoices.length === 0)
  ) {
    return (
      <Text>
        To add tasks, there needs to be at least 1 workspace and 1 category.
      </Text>
    );
  }

  return (
    <Card shadow="md" mb={"xs"} p={"xs"}>
      <CardHeader>
        <Title order={2}>Add</Title>
      </CardHeader>

      <Flex justify={"flex-start"} align={"flex-start"} wrap="wrap" gap={"xs"}>
        <TextInput
          key={resetKey}
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          error={errors.length > 0 && <FormMessages error messages={errors} />}
          placeholder="task title ..."
          className={styles.title}
        />
        {!parentId && (
          <Select
            name="categoryId"
            placeholder="category"
            data={categoryChoices}
            value={categoryId}
            onChange={(value) => {
              setcategoryId(value || "");
            }}
            error={errors.length > 0}
            className={styles.category}
            maw={200}
          />
        )}
        <Button variant="light" onClick={handleAdd} maw={150}>
          Add
        </Button>
        <Button
          variant="light"
          color="gray"
          maw={150}
          onClick={() => {
            setTitle("");
            setErrors([]);
            setResetKey((p) => p + 1);
          }}
        >
          <FaArrowsRotate />
        </Button>
      </Flex>
    </Card>
  );
}
