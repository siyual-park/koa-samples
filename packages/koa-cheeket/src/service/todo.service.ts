import { inject, injectable } from "@cheeket/injector";
import { Repository } from "typeorm";
import Token from "../repository/token";
import Todo from "../entity/todo.entity";
import CreateTodoRequest from "../payload/todo/create-todo.request";
import NotFoundError from "../error/not-found-error";
import UpdateTodoRequest from "../payload/todo/update-todo.request";
import omitUndefined from "../core/omit-undefined";

@injectable()
class TodoService {
  constructor(
    @inject(Token.TodoRepository)
    private readonly repository: Repository<Todo>
  ) {}

  async create(request: CreateTodoRequest): Promise<Todo> {
    const todo = new Todo();
    todo.title = request.title;
    todo.description = request.description;

    return this.repository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.repository.find();
  }

  async deleteAll(): Promise<void> {
    return this.repository.clear();
  }

  async updateById(id: string, request: UpdateTodoRequest): Promise<Todo> {
    await this.repository.update(id, omitUndefined({ ...request }));
    return this.findById(id);
  }

  async deleteById(id: string): Promise<void> {
    await this.findById(id);
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Todo> {
    const todo = await this.repository.findOne(id);
    if (todo == null) throw new NotFoundError();

    return todo;
  }
}

export default TodoService;
