import { IPlayer } from "../../player/IPlayer";
import { Board } from "./Board";

/**
 * After each message sent in the game, the state of the game changes.
 *
 * This object contains all information of the game state.
 */
export interface GameState {
    readonly board: Board;
    readonly currentPlayer: number;
    readonly players: IPlayer[];
    readonly playing: boolean[];
    readonly status: GameStatus;
    readonly turn: number;
}

export enum GameStatus {
    Unstarted = "Unstarted",
    Playing = "Playing",
    Finished = "Finished",
}
