interface Serializable {
  toJSON(): Record<string, unknown> | Promise<Record<string, unknown>>;
}

export default Serializable;
