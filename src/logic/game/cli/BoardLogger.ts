import { GameStateQuery } from "../core/GameStateQuery";
import { GameState } from "../state/GameState";

export class BoardLogger {
    public draw(state: GameState) {
        console.clear();
        const str =
            state.board.values.map(
                (row) => row.map(
                    (value) => value < 0 ? "-" : value
                ).join(" ")
            ).join("\n");
        const query = new GameStateQuery(state);
        const plyr = state.players.map(
            (player, i) => `Player ${i}: ${query.getPositionsOfPlayer(i).length} stones`
        ).join("\n");
        console.log(str + "\n\n====\n\n" + plyr);
    }
}
