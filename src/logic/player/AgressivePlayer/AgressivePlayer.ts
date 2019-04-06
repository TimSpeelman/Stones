import _ from "lodash";
import { GameStateQuery } from "../../game/core/GameStateQuery";
import { Message } from "../../game/messages/Message";
import { Position } from "../../game/Position";
import { GameState } from "../../game/state/GameState";
import { distance } from "../../game/util/distance";
import { addOffset as withOffset, limitInEachDirection, offset } from "../../game/util/offset";
import { randomInRange as randomIntegerBetween } from "../../util/randomInRange";
import { IPlayer } from "../IPlayer";

/** Try to move to the closest enemy stone */
export class AgressivePlayer implements IPlayer {

    public id: number = -1;

    public initialize(id: number): void { this.id = id; }

    public receive(message: Message.Any): void {
        // I don't care what others do.
    }

    public getNextMove(state: GameState): Message.Move {
        const query = new GameStateQuery(state);
        let smallestDistance = Number.MAX_SAFE_INTEGER; // Infinity
        let myClosest = null;
        let theirClosest = null;
        const myStones = query.getPositionsOfPlayer(this.id);
        const theirStones = query.getPositionsOfEnemiesOf(this.id);

        // Find my stone closest to the enemy
        for (const mine of myStones) {
            for (const theirs of theirStones) {
                const dist = distance(mine, theirs);
                if (dist < smallestDistance) {
                    smallestDistance = dist;
                    myClosest = mine;
                    theirClosest = theirs;
                }
            }
        }

        if (smallestDistance < 0) {
            throw new Error("Something went wrong, expected a distance");
        }

        // Move my stone to the enemy stone as quickly as possible
        const offsetToClosestEnemy = offset(myClosest, theirClosest);
        const stepInRightDirection = limitInEachDirection(offsetToClosestEnemy, 1);
        const targetPosition = withOffset(myClosest, stepInRightDirection);

        return new Message.Move(this.id, myClosest, targetPosition);
    }

}
