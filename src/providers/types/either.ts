import { None, Optional, Some } from "./option";

export abstract class Either<L, R> {
  abstract left: L;
  abstract right: R;

  abstract isLeft: boolean; // means failed
  abstract isRight: boolean; // means success

  static left<L>(left: L): Left<L> {
    return new Left(left);
  }

  static right<R>(right: R): Right<R> {
    return new Right(right);
  }

  toOption(): Optional<R> {
    if (this.isRight) {
      return new Some(<R>this.right);
    }

    return new None();
  }

  map<U>(fn: (value: R) => U): Either<L, U> {
    if (this.isRight) {
      return new Right(fn(this.right));
    } else {
      return new Left(this.left);
    }
  }
}

export class Left<L> extends Either<L, never> {
  isLeft: boolean;
  isRight: boolean;
  left: L;
  right: never;

  constructor(left: L) {
    super();
    this.left = left;
    this.isLeft = true;
    this.isRight = false;
    this.right = <never>null;
  }
}

export class Right<R> extends Either<never, R> {
  isLeft: boolean;
  isRight: boolean;

  left: never;
  right: R;

  constructor(right: R) {
    super();
    this.right = right;
    this.left = <never>null;
    this.isLeft = false;
    this.isRight = true;
  }
}
