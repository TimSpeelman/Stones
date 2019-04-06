import { TwoPlayersOneRowBoard } from "../boards/TwoPlayersOneRowBoard";
import { Game } from "../game/core/Game";
import { RandomPlayer } from "../player/RandomPlayer/RandomPlayer";
import { IGameFactory } from "./IGameFactory";

export class TwoRandomPlayersGame implements IGameFactory {

    public create() {
        const width = 5;
        const height = 5;
        const board = TwoPlayersOneRowBoard.create(width, height);
        const players = [new RandomPlayer(), new RandomPlayer()];
        const game = new Game(board, players);
        return game;
    }

}
