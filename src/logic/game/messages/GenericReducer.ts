
/** Given a state and a message, create a new state */
export type GenericReducer<MsgType, StateType> =
    (state: StateType | null, message?: MsgType) => StateType;
