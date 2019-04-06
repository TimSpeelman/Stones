/**
 * All parties communicating with messages must implement this interface.
 */
export interface IMessageParty<MsgType, StateType> {

    /**
     * A message party can receive a message and respond with zero or more messages.
     * It also receives the derived state which is alive after that message.
     */
    receive(message: MsgType, state: StateType): MsgType[];

}
