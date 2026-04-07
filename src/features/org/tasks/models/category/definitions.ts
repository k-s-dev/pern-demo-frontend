import {
  SCategoryCreateDataIn,
  TCategoryCreateDataIn,
  TCategoryIncludeAll,
} from "@/lib/definitions/backend/org/category";
import { Prisma } from "@/lib/definitions/backend/prisma/client";
import * as v from "valibot";

export type TCategoryUi = TCategoryIncludeAll;

export const SCategoryFormData = SCategoryCreateDataIn;
export type TCategoryFormData = TCategoryCreateDataIn;
export type TCategoryFormErrors = v.FlatErrors<typeof SCategoryCreateDataIn>;

export type TCategoryFormState = {
  status?: "success" | "error";
  data?: TCategoryFormData;
  errors?: TCategoryFormErrors;
  messages?: string[];
};

export type TCategoryWithChildren = Prisma.CategoryGetPayload<{
  include: { children: true };
}>;
