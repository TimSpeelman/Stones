import { Position } from "../Position";
import { GameState } from "../state/GameState";

export class GameStateQuery {
    public readonly state: GameState;
    constructor(state: GameState) {
        this.state = state;
    }
    public getPositionsOfPlayer(playerId: number): Position[] {
        const tiles = this.state.board.getListOfTiles();
        return tiles
            .filter((tile) => tile.value === playerId)
            .map((tile) => tile.position);
    }
    public getPositionsOfEnemiesOf(playerId: number): Position[] {
        const tiles = this.state.board.getListOfTiles();
        return tiles
            .filter((tile) => tile.value !== playerId && tile.value >= 0)
            .map((tile) => tile.position);
    }
    public remainingPlayers(): number[] {
        return this.state.playing
            .map((p, i) => p === true ? i : -1)
            .filter((p) => p >= 0);
    }
    public nextAvailablePlayer(): number {
        const remaining = this.remainingPlayers();
        const higher = remaining.find((r) => r > this.state.currentPlayer);
        return higher ? higher : remaining[0];
    }
}
