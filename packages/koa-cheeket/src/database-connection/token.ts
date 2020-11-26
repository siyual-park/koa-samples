import { interfaces } from "cheeket";
import { Connection, ConnectionOptions } from "typeorm";

const Token = Object.freeze({
  ConnectionOptions: Symbol("ConnectionOptions") as interfaces.Token<
    ConnectionOptions
  >,
  Connection: Symbol("Connection") as interfaces.Token<Connection>,
});

export default Token;
