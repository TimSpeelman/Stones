import { IPlayer } from "../../player/IPlayer";
import { BoardLogger } from "../cli/BoardLogger";
import { Message } from "../messages/Message";
import { MessageBus } from "../messages/MessageBus";
import { Board } from "../state/Board";
import { GameReducer } from "../state/GameReducer";
import { GameState, GameStatus } from "../state/GameState";
import { GameLogic } from "./GameLogic";
import { PlayerWrapper } from "./PlayerWrapper";

const INTERVAL = 100;

export class Game {

    private board: Board;
    private players: IPlayer[];

    constructor(board: Board, players: IPlayer[]) {
        this.board = board;
        this.players = players;
    }

    public start() {
        this.initializePlayers();
        this.createDefaultState();
        const bus = this.createMessageBus();
        bus.enqueueMessage(new Message.Init());
        this.run(bus);
    }

    public run(bus: MessageBus<Message.Any, GameState>) {
        const logger = new BoardLogger();
        setInterval(() => {
            const snap = bus.next();
            if (snap) {
                logger.draw(snap.state);
            }
        }, INTERVAL);
    }

    private initializePlayers() {
        this.players.forEach((player, indexAsPlayerId) =>
            player.initialize(indexAsPlayerId));
    }

    private createDefaultState() {
        const defaultState: GameState = {
            board: this.board,
            currentPlayer: 0,
            players: this.players,
            playing: this.players.map((p) => true),
            status: GameStatus.Unstarted,
            turn: -1,
        };
        return defaultState;
    }

    private createMessageBus() {
        const logic = new GameLogic();
        const players = this.players.map((p) => new PlayerWrapper(p));
        const participants = [logic, ...players];
        const reducer = (state: GameState, msg: Message.Any) =>
            !state ? this.createDefaultState()
                : GameReducer(state, msg);
        const bus = new MessageBus<Message.Any, GameState>(participants, reducer);
        return bus;
    }

}
