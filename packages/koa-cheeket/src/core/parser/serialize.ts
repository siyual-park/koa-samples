import isSerializable from "./is-serializable";

async function serialize(
  serializable: unknown
): Promise<Record<string, unknown> | unknown> {
  return isSerializable(serializable) ? serializable.toJSON() : serializable;
}

export default serialize;
