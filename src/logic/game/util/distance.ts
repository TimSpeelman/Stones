import { Position } from "../Position";

/** Euclidean distance between two points */
export const distance = (a: Position, b: Position) =>
    Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2);
