import { interfaces } from "cheeket";
import { Repository } from "typeorm";
import Todo from "../entity/todo.entity";

const Token = Object.freeze({
  TodoRepository: Symbol("TodoRepository") as interfaces.Token<
    Repository<Todo>
  >,
});

export default Token;
