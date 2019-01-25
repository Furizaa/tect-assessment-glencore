namespace Global {
  export type TAction<T extends string = string, P = void> = P extends void
    ? Readonly<{ type: T }>
    : Readonly<{ type: T; payload: P }>;

  export type TRenderProp<T> = (props: T) => React.Element<any>;

  export type TFunctionType = (...args: Array<any>) => any;

  export type TStringMap<T> = { [key: string]: T };

  export type TActionsUnion<A extends StringMap<TFunctionType>> = ReturnType<
    A[keyof A]
  >;

  export type TActionsOfType<U, T extends string> = U extends TAction<T>
    ? U
    : never;
}

declare module '*.svg' {
  const content: any;
  export default content;
}
