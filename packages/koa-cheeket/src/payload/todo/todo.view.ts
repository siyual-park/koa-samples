import { classToPlain, Expose, plainToClass } from "class-transformer";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

import StaticImplements from "../../core/util/static-implements.decorator";
import Deserializable from "../../core/parser/deserializable";
import Serializable from "../../core/parser/serializable";
import Validatable from "../../core/validate/validatable";
import validateOrThrow from "../../core/validate/validate-or-throw";

@StaticImplements<Deserializable<TodoView>>()
class TodoView implements Serializable, Validatable {
  @Expose()
  @IsNotEmpty()
  @IsString()
  id!: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  title!: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @Expose()
  @IsDate()
  createdAt!: Date;

  @Expose()
  @IsDate()
  updatedAt!: Date;

  static from(plain: Record<string, unknown>): TodoView {
    return plainToClass(TodoView, plain);
  }

  async validate(): Promise<void> {
    await validateOrThrow(this);
  }

  toJSON(): Record<string, unknown> {
    return classToPlain(this);
  }
}

export default TodoView;
