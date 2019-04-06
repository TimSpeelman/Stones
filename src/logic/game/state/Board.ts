import _ from "lodash";
import { make2DArrayOf } from "../../util/make2DArrayOf";
import { OutOfBoundsError } from "../errors/OutOfBoundsError";
import { Position } from "../Position";

export class Board {

    public static createWithSize(numRows: number, numCols: number) {
        return new Board(make2DArrayOf(numRows, numCols, () => -1));
    }
    public readonly numRows: number;
    public readonly numCols: number;
    public readonly values: number[][];

    public constructor(values: number[][]) {
        this.values = values;
        this.numRows = values.length;
        this.numCols = values[0].length;
    }

    /** A list of tiles keeps the x, y and value together for easier processing. */
    public getListOfTiles(): Tile[] {
        return _.flatMap(this.values,
            (row, x) => row.map(
                (value, y) => new Tile({ x, y }, value)));
    }

    /** Get a new board where the player is put on the position */
    public put(position: Position, playerId: number): Board {
        return this.replace(position, playerId);
    }

    /** Get a new board where the player is removed from the position */
    public clear(position: Position): Board {
        return this.put(position, -1);
    }

    /** Move a stone from position a to b */
    public move(from: Position, to: Position): Board {
        this.assertWithinBounds(from);
        this.assertWithinBounds(to);
        const player = this.getTileValue(from);
        return this
            .clear(from)
            .put(to, player);
    }

    public isEmpty(position: Position): boolean {
        return this.getTileValue(position) === -1;
    }

    public getTileValue(position: Position): number {
        this.assertWithinBounds(position);
        return this.values[position.x][position.y];
    }

    public isWithinBounds(position: Position) {
        const { x, y } = position;
        return x >= 0 && x < this.numRows && y >= 0 && y < this.numCols;
    }

    public replace(position: Position, value: number) {
        this.assertWithinBounds(position);
        const newTiles = this.copyCells();
        newTiles[position.x][position.y] = value;
        return new Board(newTiles);
    }

    private assertWithinBounds(position: Position) {
        if (!this.isWithinBounds(position)) {
            throw new OutOfBoundsError(`Cell ${position.x}x${position.y} does not exist.`);
        }
    }

    private copyCells() {
        return this.values.slice().map((r) => r.slice());
    }
}

export class Tile {
    public readonly position: Position;
    public readonly value: number;

    constructor(position: Position, value: number) {
        this.position = position;
        this.value = value;
    }
}
