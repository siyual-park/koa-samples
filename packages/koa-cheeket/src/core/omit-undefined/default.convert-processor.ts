import { ConvertProcessor } from "convable";

class DefaultConvertProcessor implements ConvertProcessor<unknown, unknown> {
  // eslint-disable-next-line class-methods-use-this
  convert(value: unknown): unknown {
    return value;
  }

  // eslint-disable-next-line class-methods-use-this
  isConvertible(): boolean {
    return true;
  }
}

export default DefaultConvertProcessor;
