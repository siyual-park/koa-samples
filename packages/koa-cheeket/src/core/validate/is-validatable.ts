import Validatable from "./validatable";

function isValidatable(canValidatable: unknown): canValidatable is Validatable {
  if (typeof canValidatable !== "object") {
    return false;
  }
  return (
    typeof (canValidatable as Record<string, unknown>).validate === "function"
  );
}

export default isValidatable;
