"use server";

import {
  SProfileForm,
  TProfileFormState,
  TProfileFormStateData,
} from "../definitions";
import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { deleteUploadedFile, uploadFile } from "@/lib/utils/uploads";
import { prepareHeaders } from "@/lib/data/prepareHeaders";
import { auth } from "@/features/auth/lib/auth";
import { TSessionUser } from "@/lib/definitions/backend/auth/user";

export async function updateProfileServerAction(
  user: TSessionUser,
  imageFile: File | null,
  _prevState: TProfileFormState | null,
  formData: FormData,
): Promise<TProfileFormState> {
  const rawFormData = Object.fromEntries(formData);
  const parsedFormData = parseFormData({
    formData,
    excludeKeys: ["imageFile"],
  });

  const validationResult = v.safeParse(SProfileForm, parsedFormData);

  if (!validationResult.success) {
    const errors = v.flatten<typeof SProfileForm>(validationResult.issues);
    return {
      data: rawFormData as TProfileFormStateData,
      status: "error",
      errors: errors,
    };
  }

  // handle image upload
  let imageUploadUrl = null;

  if (user.image) {
    try {
      await deleteUploadedFile({ uploadUrl: user.image });
    } catch {
      return {
        data: rawFormData as TProfileFormStateData,
        status: "error",
        errors: {
          root: [
            "Failed to clear user image. Please try and update user again.",
          ],
        },
      };
    }
  }

  if (imageFile && imageFile.size > 0) {
    try {
      imageUploadUrl = await uploadFile({
        uploadFile: imageFile,
        uploadDir: `uploads/user/${user.id}/images/`,
        fileNameWoExt: `profile-pic-${new Date().toISOString()}`,
      });
    } catch (error) {
      console.log(error);
      return {
        data: rawFormData as TProfileFormStateData,
        status: "error",
        errors: {
          root: [
            "User updated but image upload failed. Please try and update user again.",
          ],
        },
      };
    }
  }

  try {
    await auth.api.updateUser({
      headers: await prepareHeaders(),
      body: {
        name: validationResult.output.name,
        image: imageUploadUrl,
      },
    });
  } catch {
    return {
      data: rawFormData as TProfileFormStateData,
      status: "error",
      messages: [
        "Profile update failed due to internal server error. Please try again later.",
      ],
    };
  }

  return {
    data: rawFormData as TProfileFormStateData,
    status: "success",
    messages: ["Profile updated successfully."],
  };
}
