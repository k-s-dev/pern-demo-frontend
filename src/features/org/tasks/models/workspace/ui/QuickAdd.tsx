"use client";

import { Button, Flex, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { FaArrowsRotate } from "react-icons/fa6";
import * as v from "valibot";
import { SName } from "@/lib/definitions/backend";
import { workspaceCreate } from "../data";

export default function AddWorkspaceQuick() {
  type TIssue = v.InferIssue<typeof SName>;

  const [name, setName] = useState<string>("");
  const [error, setError] = useState<TIssue[] | { message: string }[] | null>(
    null,
  );
  const [status, setStatus] = useState<
    "untouched" | "touched" | "error" | "pending" | "success"
  >("untouched");

  async function handleSubmit() {
    const validation = v.safeParse(SName, name);

    if (!validation.success) {
      setError(validation.issues);
    }

    if (validation.success) {
      setError(null);
      setName(validation.output);
      setStatus("pending");
      const response = await workspaceCreate({ name: validation.output });
      if (response.error) {
        setStatus("error");
        setError([
          {
            message: response.error.message || "Failed to create workspace.",
          },
        ]);
      }
      if (!response.error) {
        setStatus("success");
        setTimeout(() => {
          setStatus("untouched");
          setName("");
        }, 2000);
      }
    }
  }

  return (
    <>
      <Flex gap={"xs"} wrap={"wrap"}>
        <TextInput
          required
          name="name"
          placeholder="Name ..."
          value={name}
          error={error?.map((e) => (
            <span key={e.message}>{e.message}</span>
          ))}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setStatus("touched");
          }}
          style={{ flexGrow: 99999 }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit()}
          disabled={status === "pending"}
          style={{ flexGrow: 1 }}
        >
          Add Workspace
          {status === "pending" && (
            <Text mx={"xs"}>
              <FaArrowsRotate />
            </Text>
          )}
        </Button>
      </Flex>
      {status === "success" && (
        <Text bg={"green.1"} my={"xs"} p={"xs"} w={"fit-content"}>
          Workspace created successfully.
        </Text>
      )}
    </>
  );
}
