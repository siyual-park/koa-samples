import { Container } from "cheeket";

interface AsyncModule<T> {
  configured(
    container: Container,
    configure: (configuration: T) => void | Promise<void>
  ): Promise<void>;

  onPreStart?: (container: Container) => Promise<void>;
}

export default AsyncModule;
