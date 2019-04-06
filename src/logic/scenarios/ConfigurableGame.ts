// import { IGameFactory } from "./IGameFactory";
// import { Game } from "../game/core/Game";
// import { Board } from "../game/state/Board";

// export interface GameConfiguration {
//     width: number;
//     height: number;
//     boardType: BoardTypes;
//     playerTypes: PlayerType[];
// }

// export class ConfigurableGame implements IGameFactory{
//     private config: GameConfiguration
//     constructor(config: GameConfiguration) {
//         this.config = config;
//     }
//     create() {
//         return new Game(new Board(this.config.width, this.config.height)
//     }

// }