import { Converter, ConvertProcessor } from "convable";
import isPlainObject from "is-plain-object";

class ObjectConvertProcessor
  implements
    ConvertProcessor<Record<string, unknown>, Record<string, unknown>> {
  // eslint-disable-next-line class-methods-use-this
  convert(
    object: Record<string, unknown>,
    converter: Converter
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    Object.entries(object).forEach(([key, value]) => {
      if (value !== undefined) {
        result[key] = converter.convert(value);
      }
    });

    return result;
  }

  // eslint-disable-next-line class-methods-use-this
  isConvertible(value: unknown): boolean {
    return value != null && isPlainObject(value);
  }
}

export default ObjectConvertProcessor;
