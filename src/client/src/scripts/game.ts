import { Level, Difficulty } from './level';

export default class Game {

    public start() {
        this.setup();

        const level = new Level(this, 1, "Trainingslevel", Difficulty.Easy);
        level.start();
    }

    private setup() {
        //setup needed before the game starts
        //ex. connection
    }
}