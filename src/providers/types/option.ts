export abstract class Optional<T> {
  value: T;
  constructor(value: T) {
    this.value = value;
  }

  isDefined(): boolean {
    return this instanceof Some;
  }

  isEmpty(): boolean {
    return this instanceof None;
  }

  get(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): Optional<U> {
    if (this.isDefined()) {
      return new Some(fn(this.value));
    }
    return new None();
  }

  getOrElse(elseCase: T): T {
    return this.isDefined() ? this.value : elseCase;
  }

  fold<U>(ifEmpty: U, fn: (value: T) => U): U {
    return this.isDefined() ? fn(this.value) : ifEmpty;
  }

  static wrap<T>(value: T): Optional<T> {
    return value === null || value === undefined ? new Some(value) : new None();
  }
}

export class Some<T> extends Optional<T> {}

export class None extends Optional<never> {
  constructor() {
    super(<never>null);
  }
}
