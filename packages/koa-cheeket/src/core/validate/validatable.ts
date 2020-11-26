interface Validatable {
  validate(): void | Promise<void>;
}

export default Validatable;
