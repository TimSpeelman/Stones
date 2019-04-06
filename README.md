# Stones
To run and make changes to this game, read `CONTRIBUTING.md`.

## How the game works
Stones is a simple turn-based game with a 2D board of `n by m` tiles. Each player starts on the board with `k` stones. During his turn, the player can move one of his stones to an adjacent tile if it is free, or taken by an enemy stone. If it is occupied by an enemy stone, this stone is removed from the board. The last player standing wins.

Each player is controlled by a logical processor. This processor receives information about the **state** of the board and the moves of each other player. Based on this information the processor computes its next step.

## The Game Model
The game state is modelled by an `n by m` nested array filled with an integer. `-1` represents an empty tile, `0, 1, 2, 3, ..` represent players 0, 1, 2 or 3 respectively. 

### Messages
The game play is modelled by a number of messages of different types:
- The `GameStart [board]` message indicates the game is started with some initial state (`k` tiles for each of player in certain positions). 
- The `TurnTo [playerId]` message indicates a player with a given id has the turn. 
- The `Move [playerId] [p0] [p1]` indicates a player moves a stone from position `p0` to `p1`.
- The `Hit [playerId] [p0]` indicates a player loses a stone at point `p0`.
- The `PlayerLost [playerId]` indicates a player has lost all his stones.
- The `PlayerWon [playerId]` indicates a player is the only one left, thus wins.

### Player
Each player's logical unit is contained in a class that implements a `PlayerInterface`. This interface has three methods:
- The `initialize(chat)` method is called at the start and provides the player with a chatbox where he can send messages to, as a way of logging.
- The `update(message, newGameState)` method takes any message of the above types and a new state object that can be used for reasoning. Within this method the player can update his own state for example to determine a strategy.
- The `getNextMove()` method asks the Player object for its next move. A `Move` message should be returned, which is then sent to all players (including this player).

### Game Flow
The game flows through the following steps:
1. Create an instance (`new PlayerX()`) of the selected players for this game and call `initialize` on them.
2. Create a board with some stones for each player.
3. Call `player.update` with `GameStart` to each player (starting from player 1) with the created board.
4. For each turn (starting at player 1), we call the player `p`:
    1. Send `TurnTo p` to all players in order.
    2. Call `player.getNextMove()` on player `p`, thereby receiving a move from `p0` to `p1`
    3. Verify the move and crash the game if invalid.
    4. If player `x`'s stone is at `p1` send `Hit x p1` to all players.
    5. Check if player `x` has any stone left, if not send `PlayerLost x`.
    6. Send `Move p p0 p1` to all players.
    7. If player `x` has lost check if `p` is the only player left. If so, send `PlayerWon p` and end the game.
    8. Otherwise, continue the turn for the next player.
