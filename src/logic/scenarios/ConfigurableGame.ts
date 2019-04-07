import { TwoPlayersOneRowBoard } from "../boards/TwoPlayersOneRowBoard";
import { Game } from "../game/core/Game";
import { Board } from "../game/state/Board";
import { players, PlayerType } from "../player";
import { IPlayer } from "../player/IPlayer";
import { IGameFactory } from "./IGameFactory";

export interface TwoEdgeGameConfiguration {
    width: number;
    height: number;
    playerTypes: PlayerType[];
}

export class ConfigurableTwoEdgeGame implements IGameFactory {
    private config: TwoEdgeGameConfiguration;

    constructor(config: TwoEdgeGameConfiguration) {
        this.config = config;
    }
    public create() {
        const chosenPlayers: IPlayer[] = this.config.playerTypes.map(
            // @ts-ignore
            (ty: PlayerType) => players[ty]());

        return new Game(
            TwoPlayersOneRowBoard.create(this.config.width, this.config.height),
            chosenPlayers
        );
    }

}
