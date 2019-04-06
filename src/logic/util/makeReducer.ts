
export type Reducer<S, M> = (state: S, message: M) => S;

export function makeReducer<S, M>(reducers: Array<Reducer<S, M>>) {
    return (state: S, message: M) =>
        reducers.reduce((s, r) => r(s, message), state);
}
