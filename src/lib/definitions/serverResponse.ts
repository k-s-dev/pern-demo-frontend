export interface ServerActionProps<TFormState> {
  prevState: TFormState;
  formData: FormData;
}

export type TServerAction<TFormState> = (
  prevState: TFormState | null,
  formData: FormData,
) => Promise<TFormState>;

export type TDataRequestMode = "server" | "client";

export type TServerResponseStatus = "error" | "success";

type TServerResponseWithData<GData> = {
  data: GData;
  messages: string[];
  error?: never;
};

type TServerResponseWithError = {
  data?: never;
  messages?: never;
  error: {
    messages: string[];
    status?: number;
    statusText?: string;
  };
};

export type TServerResponse<GData = unknown> =
  | TServerResponseWithData<GData>
  | TServerResponseWithError;

export type TServerResponsePromise<GData = unknown> = Promise<
  TServerResponse<GData>
>;
