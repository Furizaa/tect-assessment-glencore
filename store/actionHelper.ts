export function createAction<T extends string>(type: T): Global.TAction<T>;

export function createAction<T extends string, P>(
  type: T,
  payload: P
): Global.TAction<T, P>;

export function createAction<T extends string, P>(type: T, payload?: P) {
  const action = payload === undefined ? { type } : { type, payload };

  return action;
}
