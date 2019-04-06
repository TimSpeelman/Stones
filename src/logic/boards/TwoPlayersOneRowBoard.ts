import { Board } from "../game/state/Board";
import { make2DArrayOf } from "../util/make2DArrayOf";

/**
 * Example:
 * width: 4, height: 5
 *
 * 0 0 0 0
 * - - - -
 * - - - -
 * - - - -
 * 1 1 1 1
 */
export class TwoPlayersOneRowBoard {
    public static create(width: number, height: number): Board {
        const values =
            make2DArrayOf(width, height, () => -1).map(
                // Top row player 0
                (r, rowIndex) => rowIndex === 0 ? r.map((c) => 0)
                    // Bottom row player 1
                    : rowIndex === height - 1 ? r.map((c) => 1) : r
            );

        return new Board(values);
    }
}
