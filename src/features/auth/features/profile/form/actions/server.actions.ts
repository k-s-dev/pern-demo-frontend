"use server";

import { TUser } from "@/features/auth/lib/definitions";
import {
  SProfileForm,
  TProfileFormState,
  TProfileFormStateData,
} from "../definitions";
import * as v from "valibot";
import { parseFormData } from "@/lib/utils/form";
import { deleteUploadedFile, uploadFile } from "@/lib/utils/uploads";
import { betterAuthFetch } from "@/lib/data/betterFetchFactory";
import { authEndpoints } from "@/features/auth/lib/authEndpoints";
import { prepareHeaders } from "@/lib/data/utils";
import { revalidateTag } from "next/cache";

export async function updateProfileServerAction(
  user: TUser,
  imageFile: File | null,
  prevState: TProfileFormState | null,
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
      ...prevState,
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
        ...prevState,
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
        ...prevState,
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

  const response = await betterAuthFetch(authEndpoints["/update-user"], {
    headers: await prepareHeaders(),
    body: JSON.stringify({
      name: validationResult.output.name,
      image: imageUploadUrl,
    }),
  });

  if (response.error) {
    return {
      ...prevState,
      data: rawFormData as TProfileFormStateData,
      status: "error",
      messages: [
        "Profile update failed due to internal server error. Please try again later.",
      ],
    };
  }

  revalidateTag("session", "max");

  return {
    data: rawFormData as TProfileFormStateData,
    status: "success",
    messages: ["Profile updated successfully."],
  };
}
