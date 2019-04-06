import { Position } from "../Position";
import { GameState } from "../state/GameState";

/**
 * All messages that can be communicated within the system.
 */
export namespace Message {

    /** Union type of all possible messages */
    export type Any =
        Init |
        GameStart |
        NextTurn |
        Move |
        Hit |
        PlayerLost |
        PlayerWon |
        Chat;

    /** Union type of possible messages sent by players */
    export type PlayerMessage =
        Move |
        Chat;

    /** This is the first message to be sent */
    export class Init { }

    /**
     * The `GameStart [board]` message indicates the game is started with some initial state
     * (`k` tiles for each of player in certain positions).
     */
    export class GameStart {
        constructor(readonly state: GameState) { }
    }

    /** The `TurnTo [playerId]` message indicates a player with a given id has the turn.  */
    export class NextTurn {
        constructor(
            readonly playerId: number,
            readonly turn: number
        ) { }
    }

    /** The `Move [playerId] [p0] [p1]` indicates a player moves a stone from position `p0` to `p1`. */
    export class Move {
        constructor(
            readonly playerId: number,
            readonly from: Position,
            readonly to: Position
        ) { }

    }

    /** The `Hit [t] [p0] [p]` indicates a player t loses a stone at point `p0`, due to player p. */
    export class Hit {
        constructor(
            readonly playerId: number,
            readonly position: Position,
            readonly byPlayer: number,
        ) { }
    }

    /** The `PlayerLost [playerId]` indicates a player has lost all his stones. */
    export class PlayerLost {
        constructor(readonly playerId: number) { }
    }

    /** The `PlayerWon [playerId]` indicates a player is the only one left, thus wins. */
    export class PlayerWon {
        constructor(
            readonly playerId: number,
        ) { }
    }

    /** The `Chat` message indicates a player said something. */
    export class Chat {
        constructor(
            readonly playerId: number,
            readonly message: string,
        ) { }
    }

}
