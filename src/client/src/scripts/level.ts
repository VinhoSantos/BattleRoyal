import { Player } from './player';
import Game from './game';
import Render from './render';
import { LevelDto,  Difficulty } from '../dtos/levelDto';

export class Level {
    id: number;
    name: string;
    difficulty: Difficulty
    completed = false;
    levelDto: LevelDto;
    private render: Render;

    /**
     * This sets up a new level which is going to be played by the player
     */
    constructor(id: number, name: string, difficulty: Difficulty) {
        this.id = id;
        this.name = name;
        this.difficulty = difficulty;
        this.render = Render.getInstance();
    }

    public start() {
        this.draw();        
        console.log(`Level ${this.id}: ${this.name} STARTED`);
    }

    public draw() {
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