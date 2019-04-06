export function make2DArrayOf<T>(rows: number, cols: number, intializeCell: (row: number, col: number) => T): T[][] {
    return new Array(rows).fill(0).map(
        (row, i) => new Array(cols).fill(0).map(
            (cell, j) => intializeCell(i, j)
        )
    );
}
