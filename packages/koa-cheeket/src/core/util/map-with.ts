function mapWith<T, U>(
  ...functions: ((value: any) => any)[]
): (values: T[]) => U[] {
  return (values: T[]): U[] => {
    return values.map((value) => {
      return functions.reduce(
        (previousValue, currentValue) => currentValue(value),
        value as any
      );
    });
  };
}

export default mapWith;
