import { IPlayer } from "../../player/IPlayer";
import { IMessageParty } from "../messages/IMessageParty";
import { Message } from "../messages/Message";
import { GameState } from "../state/GameState";

/** This class takes a player and creates a proper actor that will only send valid messages */
export class PlayerWrapper implements IMessageParty<Message.Any, GameState> {

    private player: IPlayer;
    constructor(player: IPlayer) {
        this.player = player;
    }

    public receive(message: Message.Any, state: GameState): Message.Any[] {
        // Always forward the message unless player lost
        if (state.playing[this.player.id]) {
            this.player.receive(message, state);
        } else {
            return [];
        }

        // If it's the players turn, ask for a move
        if (message instanceof Message.NextTurn &&
            message.playerId === this.player.id) {

            const move = this.player.getNextMove(state);
            const error = this.validateMove(state, move);
            if (error == null) {

                // If there is another stone, send out a hit first.
                const value = state.board.getTileValue(move.to);
                const hit = value >= 0 ? [new Message.Hit(value, move.to, this.player.id)] : [];
                return [...hit, move];
            } else {
                throw new Error(`Player ${this.player.id} made an error: ${error}`);
            }
        }
        return [];
    }

    private validateMove(state: GameState, message: Message.PlayerMessage): string | null {
        if (message instanceof Message.Move) {
            return !state.board.isWithinBounds(message.from)
                ? "'From' out of bounds"
                : !state.board.isWithinBounds(message.to)
                    ? "'To' out of bounds"
                    : state.board.getTileValue(message.from) !== this.player.id
                        ? "'From' not occupied by this player"
                        : state.board.getTileValue(message.to) === this.player.id
                            ? "'To' occupied by this player"
                            : this.player.id !== message.playerId
                                ? "Wrong player ID provided"
                                : null;
        }
        return "Not a MOVE message";
    }
}
