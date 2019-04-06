import { IMessageParty } from "../messages/IMessageParty";
import { Message } from "../messages/Message";
import { GameState, GameStatus } from "../state/GameState";
import { GameStateQuery } from "./GameStateQuery";

const query = (s: GameState) => new GameStateQuery(s);

/**
 * A game rule responds to a message by sending more messages
 * when a certain condition is satisfied.
 */
type GameRule = (state: GameState, message: Message.Any) => Message.Any[];

const rules: GameRule[] = [
    // Trigger the game start
    (state, message) => (
        message instanceof Message.Init
    ) ? [new Message.GameStart(state)] : [],

    // Trigger the first round
    (state, message) => (
        message instanceof Message.GameStart
    ) ? [new Message.NextTurn(0, 0)] : [],

    // When a player is hit and has no more stones left, he loses.
    (state, message) => (
        message instanceof Message.Hit &&
        query(state).getPositionsOfPlayer(message.playerId).length === 0
    ) ?
        [new Message.PlayerLost(message.playerId)] : [],

    // When a player loses and only one is left, the latter wins.
    (state, message) => (
        message instanceof Message.PlayerLost &&
        query(state).remainingPlayers().length === 1
    ) ?
        [new Message.PlayerWon(query(state).remainingPlayers()[0])] : [],

    // When a player moved, go to the next round
    (state, message) => (
        message instanceof Message.Move &&
        state.status === GameStatus.Playing
    ) ? [new Message.NextTurn(query(state).nextAvailablePlayer(), state.turn + 1)] : [],

];

export class GameLogic implements IMessageParty<Message.Any, GameState> {
    public receive(message: Message.Any, state: GameState): Message.Any[] {
        const nil: Message.Any[] = [];
        return rules.reduce((responses, rule) =>
            [...responses, ...rule(state, message)], nil);
    }
}
