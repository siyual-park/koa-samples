import { Container } from "cheeket";
import Identifier from "cheeket/dist/identifier/identifier";
import AsyncModule from "./async-module";

abstract class ContainerModule
  extends Container
  implements AsyncModule<undefined> {
  protected constructor(
    private readonly token: Identifier<unknown>,
    private readonly importIds: Identifier<Container>[] = []
  ) {
    super();
    this.configuredInjection();
  }

  async configured(container: Container): Promise<void> {
    container.import(this);
    container.bind(this.token, () => this);

    await Promise.all(
      this.importIds.map(async (token) => {
        const dependencyContainer: Container = await container.resolve(token);
        this.import(dependencyContainer);
      })
    );
  }

  abstract configuredInjection(): void;
}

export default ContainerModule;
