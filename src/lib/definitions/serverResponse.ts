import { ERROR_MESSAGES } from "../constants";

export interface ServerActionProps<TFormState> {
  prevState: TFormState;
  formData: FormData;
}

export type TServerAction<TFormState> = (
  prevState: TFormState | null,
  formData: FormData,
) => Promise<TFormState>;

type TServerResponseWithData<GData> = {
  data: GData;
  message?: string;
  messages?: string[];
  error?: never;
};

type TServerResponseWithError = {
  data?: never;
  message?: never;
  messages?: never;
  error: {
    message: string;
    messages?: string[];
  };
};

export type TServerResponse<GData = unknown> =
  | TServerResponseWithData<GData>
  | TServerResponseWithError;

export type TServerResponsePromise<GData = unknown> = Promise<
  TServerResponse<GData>
>;

export function prepareError(error: {
  status: number;
  statusText: string;
  message?: string;
}) {
  return {
    error: {
      message:
        error.message || error.statusText || ERROR_MESSAGES.internalServer,
    },
  };
}
