import { makeReducer } from "../../util/makeReducer";
import { Message } from "../messages/Message";
import { Board } from "./Board";
import { GameState, GameStatus } from "./GameState";

/**
 * The GameReducer is a pure function which calculates a new state
 * based on a previous state and a message.
 */
export const GameReducer = makeReducer<GameState, Message.Any>([

    // Change the status when the game starts or ends.
    (state, m) => m instanceof Message.GameStart
        ? { ...state, status: GameStatus.Playing } : state,
    (state, m) => m instanceof Message.PlayerWon
        ? { ...state, status: GameStatus.Finished } : state,

    // Player Lifecycle Events
    (state, m) => m instanceof Message.PlayerLost
        ? {
            ...state,
            playing: state.playing.map((p, i) => i === m.playerId ? false : p)
        } : state,

    // Turn
    (state, m) => m instanceof Message.NextTurn
        ? { ...state, turn: m.turn, currentPlayer: m.playerId } : state,

    // Delegate `hit` and `move` to board
    (state, m) => (m instanceof Message.Hit || m instanceof Message.Move)
        ? { ...state, board: boardReducer(state.board, m) } : state,

]);

const boardReducer = makeReducer<Board, Message.Any>([

    // Move a stone
    (state, m) => m instanceof Message.Move
        ? state.move(m.from, m.to) : state,

    // When hit, remove a stone
    (state, m) => m instanceof Message.Hit
        ? state.clear(m.position) : state,

]);
