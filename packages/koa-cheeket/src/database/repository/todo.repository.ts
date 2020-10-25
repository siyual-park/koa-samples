import { Repository } from "typeorm";
import Todo from "../../entity/todo";

type TodoRepository = Repository<Todo>;

export const token = Symbol("todo-repository");
export default TodoRepository;
