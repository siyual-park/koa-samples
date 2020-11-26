import { Converter, ConvertProcessor } from "convable";

class ArrayConvertProcessor
  implements ConvertProcessor<Array<unknown>, Array<unknown>> {
  // eslint-disable-next-line class-methods-use-this
  convert(value: Array<unknown>, converter: Converter): Array<unknown> {
    return value.map((element) => converter.convert(element));
  }

  // eslint-disable-next-line class-methods-use-this
  isConvertible(value: unknown): boolean {
    return value instanceof Array;
  }
}

export default ArrayConvertProcessor;
