// import { TwoRandomPlayersGame } from "./logic/scenarios/TwoRandomPlayersGame";

import { RandomVsAgressiveGame } from "./logic/scenarios/RandomVsAgressiveGame";

// const game = new TwoRandomPlayersGame().create();
const game = new RandomVsAgressiveGame().create();
game.start();
