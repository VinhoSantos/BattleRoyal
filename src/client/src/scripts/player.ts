import Render from './render';
import { GameHelper } from './helper';

export class Player {

    coX: number;
    coY: number;
    posX: number;
    posY: number;
    gotoCoX: number;
    gotoCoY: number;
    vision = 2;
    speed = 1;
    private readonly render: Render;
    private isMoving = false;
    private startTime = -1;
    private animationLength = 200;

    constructor(coX: number, coY: number) {
        this.coX = coX;
        this.gotoCoX = coX;
        this.gotoCoY = coY;
        this.coY = coY;
        this.posX =  GameHelper.GetCell(coX);
        this.posY = GameHelper.GetCell(coY);
        this.render = new Render();
        
        window.addEventListener("keydown", event => this.keydown(event));
        
        console.log('player init');
    }

    public moveUp() {
        this.move(MoveDirection.Up);
    }

    public moveDown() {        
        this.move(MoveDirection.Down);
    }

    public moveLeft() {
        this.move(MoveDirection.Left);
    }

    public moveRight() {
        this.move(MoveDirection.Right);
    }

    private keydown(event: KeyboardEvent) {
        if (event.defaultPrevented || this.isMoving) {
            return; // Should do nothing if the default action has been cancelled
        }

        this.isMoving = true;

        switch (event.code) {
            case 'ArrowUp':
                this.moveUp();
                break;
            case 'ArrowDown':
                this.moveDown();
                break;
            case 'ArrowLeft':
                this.moveLeft();
                break;
            case 'ArrowRight':
                this.moveRight();
                break;
        }
    }

    private move(moveDirection: MoveDirection) {
        switch(moveDirection) {
            case MoveDirection.Up:
                this.gotoCoY = this.coY - this.speed;
                break;
            case MoveDirection.Down:
                this.gotoCoY = this.coY + this.speed;
                break;
            case MoveDirection.Left:
                this.gotoCoX = this.coX - this.speed;
                break;
            case MoveDirection.Right:
                this.gotoCoX = this.coX + this.speed;
                break;
        }
        
        this.movePlayerOnGrid();
    }

    private movePlayerOnGrid() {
        this.startTime = -1; //reset startTime before each animation
        requestAnimationFrame(this.playerAnimationLoop.bind(this));
    }

    private playerAnimationLoop(timestamp: number) {
        let progress = 0;

        if (this.startTime < 0) {
            this.startTime = timestamp;
        } else {
            progress = timestamp - this.startTime;
        }

        const startPosX = this.posX;
        const startPosY = this.posY;
        const endPosX = GameHelper.GetCell(this.gotoCoX);
        const endPosY = GameHelper.GetCell(this.gotoCoY);
        const difX = endPosX - startPosX;
        const difY = endPosY - startPosY;
        const progressPerc = (progress / this.animationLength);
        const posX = Math.round(startPosX + (difX * progressPerc));
        const posY = Math.round(startPosY + (difY * progressPerc));

        //console.log('draw animation @ [' + posX + ',' + posY + ']');
        
        if (progressPerc < 1) {
            this.render.redrawLevel(posX, posY, this.vision);
            this.render.drawPlayer(posX, posY);
            this.render.drawPlayerVision(posX, posY, this.vision);
        }

        if (progress < this.animationLength) {
            requestAnimationFrame(this.playerAnimationLoop.bind(this));
        } else {
            this.endPlayerAnimation();
        }
    }

    private endPlayerAnimation() {
        this.coX = this.gotoCoX;
        this.coY = this.gotoCoY;
        this.posX = GameHelper.GetCell(this.gotoCoX);
        this.posY = GameHelper.GetCell(this.gotoCoY);

        this.isMoving = false;
        
        this.render.redrawLevel(this.posX, this.posY, this.vision);
        this.render.drawPlayerAt(this.coX, this.coY);
        this.render.drawPlayerVision(this.posX, this.posY, this.vision);
    }
}

enum MoveDirection {
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}