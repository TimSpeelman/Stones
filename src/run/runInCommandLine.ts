/**
 * Run this script with F5
 */
import readline = require("readline");
import { players, PlayerType } from "../logic/player";
import { ConfigurableTwoEdgeGame } from "../logic/scenarios/ConfigurableGame";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const playerTypes = Object.entries(players).map(([name, pl]) => name);
const playerList = playerTypes.map((name, index) => `${index}: ${name}`).join("\n");

rl.question("Width of the board?", (widthAns) => {
    const width = parseInt(widthAns, 10);

    rl.question("Height of the board?", (heightAns) => {
        const height = parseInt(heightAns, 10);

        rl.question("Type of player 1?\n" + playerList, (playerOneAns) => {
            // @ts-ignore
            const playerOne: PlayerType = playerTypes[parseInt(playerOneAns, 10)];

            rl.question("Type of player 2?\n" + playerList, (playerTwoAns) => {
                // @ts-ignore
                const playerTwo: PlayerType = playerTypes[parseInt(playerTwoAns, 10)];

                const game = new ConfigurableTwoEdgeGame({
                    height,
                    width,
                    playerTypes: [playerOne, playerTwo],
                }).create();
                game.start();

                rl.close();
            });
        });
    });
});
