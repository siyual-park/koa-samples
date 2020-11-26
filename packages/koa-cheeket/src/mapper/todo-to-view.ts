import Todo from "../entity/todo.entity";
import TodoView from "../payload/todo/todo.view";

function todoToView(todo: Todo): TodoView {
  return TodoView.from({ ...todo });
}

export default todoToView;
