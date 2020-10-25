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
    container.imports(this);
    container.bind(this.token).to(() => this);

    await Promise.all(
      this.importIds.map(async (token) => {
        const dependencyContainer = await container.resolveOrThrow(token);
        this.imports(dependencyContainer);
      })
    );
  }

  abstract configuredInjection(): void;
}

export default ContainerModule;
