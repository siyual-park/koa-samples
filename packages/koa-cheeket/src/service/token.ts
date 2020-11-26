import { interfaces } from "cheeket";
import TodoService from "./todo.service";

const Token = Object.freeze({
  TodoService: Symbol("TodoService") as interfaces.Token<TodoService>,
});

export default Token;
