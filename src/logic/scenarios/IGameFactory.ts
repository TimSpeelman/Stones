import { Game } from "../game/core/Game";

export interface IGameFactory {
    create(): Game;
}
