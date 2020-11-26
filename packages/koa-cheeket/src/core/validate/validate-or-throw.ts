import { ValidatorOptions } from "class-validator/types/validation/ValidatorOptions";
import { validateOrReject } from "class-validator";

import ValidateError from "./validate-error";

async function validateOrThrow(
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: object,
  validatorOptions?: ValidatorOptions
): Promise<void> {
  try {
    await validateOrReject(object, validatorOptions);
  } catch (e) {
    throw new ValidateError(e);
  }
}

export default validateOrThrow;
