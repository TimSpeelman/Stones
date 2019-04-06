import { Direction as D } from "../Direction";
import { Position } from "../Position";
import { Board } from "../state/Board";

class Navigator implements Position {

    public readonly x: number;
    public readonly y: number;
    private board: Board;

    constructor(position: Position, board: Board) {
        this.x = position.x;
        this.y = position.y;
        this.board = board;
    }

    public get() {
        const { x, y } = this;
        return { x, y };
    }

    public north() {
        return this.offset(0, -1);
    }

    public northeast() {
        return this.offset(1, -1);
    }

    public east() {
        return this.offset(1, 0);
    }

    public southeast() {
        return this.offset(1, 1);
    }

    public south() {
        return this.offset(0, 1);
    }

    public southwest() {
        return this.offset(-1, 1);
    }

    public west() {
        return this.offset(-1, 0);
    }

    public northwest() {
        return this.offset(-1, -1);
    }

    public offset(x: number, y: number) {
        const newPos = { x: this.x + x, y: this.y + y };
        return new Navigator(newPos, this.board);
    }
}
