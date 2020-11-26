import { classToPlain, Expose, plainToClass } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import StaticImplements from "../../core/util/static-implements.decorator";
import Deserializable from "../../core/parser/deserializable";
import Serializable from "../../core/parser/serializable";
import Validatable from "../../core/validate/validatable";
import validateOrThrow from "../../core/validate/validate-or-throw";

@StaticImplements<Deserializable<CreateTodoRequest>>()
class CreateTodoRequest implements Serializable, Validatable {
  @Expose()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  static from(plain: Record<string, unknown>): CreateTodoRequest {
    return plainToClass(CreateTodoRequest, plain);
  }

  async validate(): Promise<void> {
    await validateOrThrow(this);
  }

  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }
}

export default CreateTodoRequest;
