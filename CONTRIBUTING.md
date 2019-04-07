# Contributing

## Installing
After pulling in new code from GitHub, run `npm install` in the command line to download all dependencies (packages).

## Running the Game
Run `npm start` in the command line. Answer the questions to configure a game and it will start running.

## Submitting code changes
For git-noobs. After you have made changes which you want to share with the others, do the following:
1. 'Stage' all code you want to commit by running `git add [filepath]` for individual files or `git add .` for all files you have changed.
2. Make a 'commit' (a snapshot of your code) by running `git commit -m "[message]"` with a suitable message that represents you code change.
3. Push your code to the GitHub server: `git push`

## Adding a Player
To add a new player, think of a crazy name. 
1. Add a folder under `src/logic/player` with that crazy name.
2. Add a file in that folder `[CrazyName].ts`
3. Copy the code from another player, change the name.
4. Add the player in `src/logic/player/index.ts`
5. You should now be able to play the game with that player.
6. Change the code as you desire.
