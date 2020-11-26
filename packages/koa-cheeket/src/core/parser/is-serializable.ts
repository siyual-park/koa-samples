import Serializable from "./serializable";

function isSerializable(
  canSerializable: unknown
): canSerializable is Serializable {
  if (typeof canSerializable !== "object") {
    return false;
  }
  return (
    typeof (canSerializable as Record<string, unknown>).toJSON === "function"
  );
}

export default isSerializable;
