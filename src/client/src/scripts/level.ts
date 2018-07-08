import { Player } from './player';
import Game from './game';
import Render from './render';

export class Level {
    id: number;
    name: string;
    difficulty: Difficulty
    completed = false;
    private readonly render: Render;
    private player: Player;

    /**
     * This sets up a new level which is going to be played by the player
     */
    constructor(private readonly game: Game, id: number, name: string, difficulty: Difficulty) {
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.render = new Render();
        this.player = new Player(12, 10);
    }

    public start() {

        this.draw();        
        console.log(`Level ${this.id}: ${this.name} STARTED`);
    }

    public draw() {
        this.drawLevel(this.player.posX, this.player.posY, this.player.vision);
        this.render.drawPlayerAt(this.player.coX, this.player.coY);
        this.render.drawPlayerVision(this.player.posX, this.player.posY, this.player.vision);
    }

    public drawLevel(playerX: number, playerY: number, vision: number) {
        this.render.drawGrid();
        this.render.drawRoomAt(7, 5, 10, 15);
        this.render.drawWallAt(15, 11, 15, 17);
        this.render.drawWallAt(9, 13, 13, 13);
        this.render.drawEndGoalAt(16, 16);
    }

    public redraw() {
        this.render.clearGrid();
        this.draw();
    }
}

export enum Difficulty {
    Easy = 1,
    Normal = 2,
    Hard = 3
}