import _ from "lodash";
import { GenericReducer } from "./GenericReducer";
import { IMessageParty } from "./IMessageParty";

/**
 * The message bus maintains a queue of messages. Upon each iteration a
 * message is sent to all participants. They can reply with messages which
 * will be added to the end of the queue.
 *
 * If the game ends, the queue should be empty.
 */
export class MessageBus<MsgType, StateType> {

    private participants: Array<IMessageParty<MsgType, StateType>>;

    private processedMessages: MsgType[] = [];
    private messageQueue: MsgType[] = [];

    /** The state reducer is used to derive state from the messages */
    private stateReducer: GenericReducer<MsgType, StateType>;
    private currentState: StateType = null;

    constructor(
        participants: Array<IMessageParty<MsgType, StateType>>,
        stateReducer: GenericReducer<MsgType, StateType>) {

        this.participants = participants;
        this.stateReducer = stateReducer;
    }

    /** Put one or more messages in the queue */
    public enqueueMessage(message: MsgType | MsgType[]) {
        this.messageQueue = message instanceof Array
            ? [...this.messageQueue, ...message]
            : [...this.messageQueue, message];
    }

    /** Process a message off the queue */
    public next(): Snapshot<MsgType, StateType> | false {
        if (this.messageQueue.length === 0) {
            return false;
        } else {
            const message = this.dequeueMessage();
            const answers = this.processMessage(message);
            this.enqueueMessage(answers);

            return new Snapshot(message, this.currentState);
        }
    }

    private dequeueMessage(): MsgType {
        return this.messageQueue.shift();
    }

    /** Derives a new state and communicates the message with all parties */
    private processMessage(message: MsgType): MsgType[] {
        this.processedMessages.push(message);

        const newState = this.computeNewState(message);
        const newMessages = this.sendMessageToAllPartiesAndReceive(message, newState, this.currentState);
        this.currentState = newState;

        return newMessages;
    }

    private computeNewState(message: MsgType): StateType {
        return this.stateReducer(this.currentState, message);
    }

    private sendMessageToAllPartiesAndReceive(message: MsgType, newState: StateType, oldState: StateType): MsgType[] {
        return _.flatMap(this.participants, (party) => party.receive(message, newState));
    }

}

/** After each message, a certain state is alive. This data object combines those. */
export class Snapshot<MsgType, StateType> {
    public readonly message: MsgType;
    public readonly state: StateType;

    constructor(message: MsgType, state: StateType) {
        this.message = message;
        this.state = state;
    }
}
