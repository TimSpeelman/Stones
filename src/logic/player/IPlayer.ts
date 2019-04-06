import { Message } from "../game/messages/Message";
import { GameState } from "../game/state/GameState";

/** Each Player class will implement this interface */
export interface IPlayer {
    readonly id: number;
    /**
     * Before the game starts, each player gets the necessary dependencies.
     * Currently, there are none.
     */
    initialize(id: number): void;

    /** The player can receive any message at any time. */
    receive(message: Message.Any, state: GameState): void;

    /** At its turn, the player is asked for a move. */
    getNextMove(state: GameState): Message.Move;

}
