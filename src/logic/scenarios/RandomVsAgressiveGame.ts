import { TwoPlayersOneRowBoard } from "../boards/TwoPlayersOneRowBoard";
import { Game } from "../game/core/Game";
import { AgressivePlayer } from "../player/AgressivePlayer/AgressivePlayer";
import { RandomPlayer } from "../player/RandomPlayer/RandomPlayer";
import { IGameFactory } from "./IGameFactory";

export class RandomVsAgressiveGame implements IGameFactory {

    public create() {
        const width = 15;
        const height = 3;
        const board = TwoPlayersOneRowBoard.create(width, height);
        const players = [new RandomPlayer(), new AgressivePlayer()];
        const game = new Game(board, players);
        return game;
    }

}
