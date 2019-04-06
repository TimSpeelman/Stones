import { RandomPlayer } from "./RandomPlayer/RandomPlayer";

/**
 * The list of all players. Add yours here to make it available in the game.
 */
export const players = [
    () => new RandomPlayer(),
];
