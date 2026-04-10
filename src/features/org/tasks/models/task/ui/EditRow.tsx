import {
  Box,
  Card,
  Checkbox,
  CheckboxProps,
  Flex,
  Modal,
  Select,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useImmer } from "use-immer";
import {
  FaAngleDown,
  FaAnglesDown,
  FaAnglesUp,
  FaAngleUp,
} from "react-icons/fa6";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import TaskDetailForm from "./detail/Form";
import { useState } from "react";
import {
  AddIcon,
  ResetIcon,
  SaveIcon,
  ViewIcon,
} from "@/lib/ui/components/icons/TooltipIcons";
import { TTaskIncludeAll } from "@/lib/definitions/backend/org/task";
import { useTasksContext } from "../../../ui/hooks/TasksContext";
import { taskDelete, taskUpdate } from "../data";
import { mantineTheme } from "@/lib/ui/mantine.theme";
import TooltipIcon from "@/lib/ui/components/icons/TooltipIcon";
import DeleteModalIcon from "@/lib/ui/components/form/DeleteModalIcon";
import FormMessages from "@/lib/ui/components/form/FormMessages";
import { TServerResponsePromise } from "@/lib/definitions/serverResponse";
import { useRouter } from "next/navigation";

const GRID_COLUMNS = "25px 200px 60px 60px 120px 40px 100px";

export default function EditTaskRow({
  task,
  open,
  selected,
  isLeaf,
  toggleSelectionAction,
  toggleOpenAction,
  toggleOpenAllAction,
  toggleAddChildAction,
  setResetKeyAction,
  deleteSelectionAction,
}: {
  task: TTaskIncludeAll;
  open: boolean;
  selected: boolean;
  isLeaf: boolean;
  toggleSelectionAction: () => void;
  toggleOpenAction: () => void;
  toggleOpenAllAction: () => void;
  toggleAddChildAction: () => void;
  setResetKeyAction: () => void;
  deleteSelectionAction: () => void;
}) {
  const [data, setData] = useImmer<TTaskIncludeAll>(task);
  const [errors, setErrors] = useImmer<string[]>([]);
  const tasksCtx = useTasksContext();
  const router = useRouter();

  const workspace = tasksCtx.state.workspaces.find(
    (el) => el.id === task.category.workspaceId,
  );

  async function handleEdit() {
    const response = await taskUpdate(task.id, data);

    if (response.error) {
      setErrors((draft) => {
        draft.push(response.error.message);
      });
    }

    router.refresh();
  }

  async function handleDelete() {
    const response = await taskDelete(task.id);

    if (response.error) {
      setErrors((draft) => {
        draft.push(response.error.message);
      });
    }

    deleteSelectionAction();
    router.refresh();

    return response;
  }

  let highlightColor = "";
  if (!task.is_archived && task.priority && task.priority.group === 2)
    highlightColor = mantineTheme.colors.yellow[2];
  if (!task.is_archived && task.priority && task.priority.group === 3)
    highlightColor = mantineTheme.colors.red[2];

  return (
    <Card
      p={2}
      px={"xs"}
      shadow="xs"
      style={{
        boxShadow:
          highlightColor !== "" ? `1px 1px 2px 1px ${highlightColor}` : "",
      }}
      bg={task.is_archived ? "gray.1" : ""}
    >
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={"xs"}
        align={{ base: "flex-start", sm: "center" }}
        justify={"space-between"}
      >
        <Box
          display={"grid"}
          style={{
            gap: ".5rem",
            gridTemplateColumns: GRID_COLUMNS,
            alignItems: "center",
          }}
        >
          <Checkbox checked={selected} onChange={toggleSelectionAction} />
          <TextInput
            value={data.title}
            onChange={(e) => {
              setData((draft) => {
                draft.title = e.target.value;
              });
            }}
          />
          <Select
            data={workspace?.statuses.map((el) => {
              return { label: el.code, value: el.id };
            })}
            value={data.statusId}
            onChange={(value) => {
              setData((draft) => {
                draft.statusId = value;
              });
            }}
          />
          <Select
            data={workspace?.priorities.map((el) => {
              return { label: el.code, value: el.id };
            })}
            value={data.priorityId}
            onChange={(value) => {
              setData((draft) => {
                draft.priorityId = value;
              });
            }}
          />
          <DateInput
            value={data.end_date}
            onChange={(value) => {
              setData((draft) => {
                draft.end_date = value ? new Date(value) : null;
              });
            }}
            valueFormat="DD MMM YYYY"
            placeholder="due on?"
            clearable
          />
          <Checkbox
            checked={data.is_archived}
            onChange={(e) => {
              setData((draft) => {
                draft.is_archived = e.target.checked;
              });
            }}
          />
          {!task.parentId && (
            <Text component="span" fz="xs">
              {data.category.name}
            </Text>
          )}
        </Box>
        <Flex gap={"xs"} align={"center"}>
          {!isLeaf && (
            <>
              <TooltipIcon
                label={open ? "Collapse" : "Expand"}
                textProps={{ c: "gray", onClick: toggleOpenAction }}
              >
                {open ? <FaAngleUp /> : <FaAngleDown />}
              </TooltipIcon>
              <TooltipIcon
                label={open ? "Collapse All" : "Expand All"}
                textProps={{ c: "gray", onClick: toggleOpenAllAction }}
              >
                {open ? <FaAnglesUp /> : <FaAnglesDown />}
              </TooltipIcon>
            </>
          )}

          <AddIcon action={toggleAddChildAction} label="Toggle add child row" />

          <SaveIcon action={handleEdit} />

          <DetailModal task={task} />

          <DeleteModalIcon deleteAction={handleDelete}>
            <Text fz={"h3"} c={"red"}>
              Task: {task.title}, will be deleted permanently.{" "}
            </Text>
            <Text c={"gray"}>Confirm to delete.</Text>
          </DeleteModalIcon>

          <ResetIcon action={setResetKeyAction} />
        </Flex>
      </Flex>
      {errors.length > 0 && <FormMessages error messages={errors} />}
    </Card>
  );
}

function DetailModal({ task }: { task: TTaskIncludeAll }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [resetKey, setResetKey] = useState(0);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Task: ${task.id}`}
        centered
        size="xl"
      >
        <TaskDetailForm
          key={resetKey}
          task={task}
          resetAction={() => setResetKey((p) => p + 1)}
        />
      </Modal>

      <ViewIcon action={open} />
    </>
  );
}

export function TaskEditRowTitle({
  selectedProps,
  deleteAction,
  deleteDisabled,
}: {
  selectedProps: CheckboxProps;
  deleteAction: () => TServerResponsePromise;
  deleteDisabled: boolean;
}) {
  return (
    <Card p={2} px={"xs"} shadow="xs">
      <Flex gap={"xs"} align={"center"} justify={"space-between"}>
        <Box
          display={"grid"}
          style={{
            gap: ".5rem",
            gridTemplateColumns: GRID_COLUMNS,
            alignItems: "center",
          }}
        >
          <Tooltip label="Select">
            <Text c="gray" component="span" size="xs">
              <Checkbox {...selectedProps} />
            </Text>
          </Tooltip>
          <Text c="gray" component="span" size="xs">
            Title
          </Text>
          <Text c="gray" component="span" size="xs">
            Status
          </Text>
          <Text c="gray" component="span" size="xs">
            Priority
          </Text>
          <Text c="gray" component="span" size="xs">
            Due Date
          </Text>
          <Text c="gray" component="span" size="xs">
            Archive
          </Text>
          <Text c="gray" component="span" size="xs">
            Category
          </Text>
        </Box>
        <Flex justify={"flex-end"} align={"center"}>
          <DeleteModalIcon
            deleteAction={deleteAction}
            disabled={deleteDisabled}
            tooltipLabel="Delete Selected"
          >
            <Text fz={"h3"} c={"red"}>
              Selected tasks will be deleted permanently.{" "}
            </Text>
            <Text c={"gray"}>Confirm to delete.</Text>
          </DeleteModalIcon>
        </Flex>
      </Flex>
    </Card>
  );
}
