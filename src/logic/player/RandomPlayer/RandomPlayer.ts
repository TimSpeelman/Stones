import _ from "lodash";
import { GameStateQuery } from "../../game/core/GameStateQuery";
import { Message } from "../../game/messages/Message";
import { Position } from "../../game/Position";
import { GameState } from "../../game/state/GameState";
import { randomInRange as randomIntegerBetween } from "../../util/randomInRange";
import { IPlayer } from "../IPlayer";

export class RandomPlayer implements IPlayer {

    public id: number = -1;

    public initialize(id: number): void { this.id = id; }

    public receive(message: Message.Any): void {
        // I don't care what others do.
    }

    public getNextMove(state: GameState): Message.Move {
        const query = new GameStateQuery(state);
        // I'll just move anywhere I can
        const myStones = query.getPositionsOfPlayer(this.id);
        if (myStones.length === 0) {
            throw new Error("Whoops! I have no stones left!");
        }
        let to: Position | null = null;
        let from: Position | null = null;

        while (!to || !from) {
            const random1 = randomIntegerBetween(0, myStones.length - 1);
            from = myStones[random1];
            let random2 = randomIntegerBetween(0, 7);
            // Cannot stay in same place, skip its own position.
            if (random2 >= 4) { random2++; }
            to = {
                x: from.x - 1 + random2 % 3,
                y: from.y - 1 + Math.floor(random2 / 3),
            };
            if (!state.board.isWithinBounds(to) ||
                state.board.getTileValue(to) === this.id) {
                to = null;
            }
        }
        return new Message.Move(this.id, from, to);
    }

}
