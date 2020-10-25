import Application from "koa";
import TodoRepository from "../database/repository/todo.repository";
import Todo from "../entity/todo";

class TodoHandler {
  constructor(private readonly todoRepository: TodoRepository) {}

  async post(
    { request, response }: Application.DefaultState,
    next: Application.Next
  ): Promise<void> {
    const { title, description } = request.body;

    const todo = new Todo();
    todo.title = title;
    todo.description = description;

    response.body = await this.todoRepository.save(todo);
    response.status = 201;

    await next();
  }
}

export default TodoHandler;
