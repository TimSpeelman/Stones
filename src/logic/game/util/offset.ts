import { Offset } from "../Offset";
import { Position } from "../Position";

export const offset = (from: Position, to: Position): Offset =>
    ({ dx: to.x - from.x, dy: to.y - from.y });

export const addOffset = (from: Position, offs: Offset): Position =>
    ({ x: from.x + offs.dx, y: from.y + offs.dy });

export const limitInEachDirection = (offs: Offset, limit: number): Offset =>
    ({ dx: absLimit(offs.dx, limit), dy: absLimit(offs.dy, limit) });

/**
 * Limits a number in absolute sense
 * ( -3, 2 ) => -2
 * (  4, 1 ) =>  1
 */
function absLimit(num: number, limit: number) {
    return num < 0 ? Math.max(num, -limit) : Math.min(num, limit);
}
