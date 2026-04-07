import { ERROR_MESSAGES } from "../constants";
import { TServerResponsePromise } from "../definitions/serverResponse";

export abstract class AbstractDataAccessLayer<
  GDataOut,
  GCreateDataIn,
  GUpdateDataIn,
> {
  abstract create(body: GCreateDataIn): TServerResponsePromise<GDataOut>;
  abstract getList(): TServerResponsePromise<GDataOut[]>;
  abstract get(id: string): TServerResponsePromise<GDataOut>;
  abstract update(
    id: string,
    body: GUpdateDataIn,
  ): TServerResponsePromise<GDataOut>;
  abstract delete(id: string): TServerResponsePromise<GDataOut>;
  abstract deleteMany(ids: string[]): TServerResponsePromise;

  prepareError(error: {
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
}
