interface Deserializable<T> {
  from(plain: unknown): T | Promise<T>;
}

export default Deserializable;
