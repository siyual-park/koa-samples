import { interfaces } from "cheeket";
import { ConnectionOptions } from "typeorm";
import uniqid from "uniqid";
import path from "path";

const connectionOptionsProvider: interfaces.Provider<ConnectionOptions> = async () => {
  return {
    type: "sqlite",
    database: `:memory/${uniqid()}.sqlite`,
    synchronize: true,
    logging: "all",
    entities: [path.join(__dirname, "../entity/**/*.entity.{ts,js}")],
  };
};

export default connectionOptionsProvider;
