import { ConvertManager } from "convable";
import ArrayConvertProcessor from "./array.convert-processor";
import ObjectConvertProcessor from "./object.convert-processor";
import DefaultConvertProcessor from "./default.convert-processor";

const convertManager = new ConvertManager();

convertManager
  .register(new DefaultConvertProcessor())
  .register(new ObjectConvertProcessor())
  .register(new ArrayConvertProcessor());

function omitUndefined<T>(value: unknown): T {
  return convertManager.convert(value) as T;
}

export default omitUndefined;
