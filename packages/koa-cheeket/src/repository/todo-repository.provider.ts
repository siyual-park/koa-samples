import Todo from "../entity/todo.entity";
import Token from "../database-connection/token";
import createRepositoryProvider from "./create-repository-provider";

const todoRepositoryProvider = createRepositoryProvider(Token.Connection, Todo);

export default todoRepositoryProvider;
