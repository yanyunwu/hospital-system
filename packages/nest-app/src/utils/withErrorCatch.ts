function isAsyncFunc<T extends (...args: any[]) => any>(func: T): boolean {
  return func.constructor.name === 'AsyncFunction';
}

export function withErrorCatch<T extends (...args: any[]) => any, E = Error>(
  fn: T,
  errCallback?: (err: E) => void,
): T {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const _this = this;
  return function (...args) {
    const isAsync = isAsyncFunc(fn);
    if (isAsync) {
      const result = fn.call(_this, ...args) as Promise<any>;
      return result.catch((err) => errCallback(err));
    } else {
      return fn.call(_this, ...args);
    }
  } as T;
}
