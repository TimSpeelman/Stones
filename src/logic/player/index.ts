import { AgressivePlayer } from "./AgressivePlayer/AgressivePlayer";
import { RandomPlayer } from "./RandomPlayer/RandomPlayer";

/**
 * The list of all players. Add yours here to make it available in the game.
 */
export const players = {
    RandomPlayer: () => new RandomPlayer(),
    AgressivePlayer: () => new AgressivePlayer(),
};

export type PlayerType = keyof typeof players;
