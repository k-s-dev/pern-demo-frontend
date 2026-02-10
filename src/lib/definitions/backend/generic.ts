import * as v from "valibot";

export const STRING_LENGTH_XS = 30;
export const STRING_LENGTH_SM = 100;
export const STRING_LENGTH_MD = 300;
export const STRING_LENGTH_LG = 1000;
export const STRING_LENGTH_XL = 3000;

export const SName = v.pipe(
  v.string(),
  v.minLength(3),
  v.maxLength(STRING_LENGTH_SM),
);

export const SEmail = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.email(),
  v.maxLength(STRING_LENGTH_XS),
);

export const SDescription = v.pipe(v.string(), v.maxLength(STRING_LENGTH_MD));
