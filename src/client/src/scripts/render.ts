import { Global } from './helper';

export default class Render {
    
    private static instance: Render;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    private playerColor = '#0a0';
    private gridlinesColor = '#ccc';
    private roomColor = '#333';
    private wallColor = '#888';
    private endGoalColor = '#f00';
    private shadowColor = '#333';
    
    /**
     * This class is used to draw the world on the canvas
     */
    constructor() { }

    static getInstance() {
        if (!Render.instance) {
            Render.instance = new Render();
            
            // ... any one time initialization goes here ...
            Render.instance.canvas = <HTMLCanvasElement>document.getElementById('canvas');
            Render.instance.canvas.width = Global.GRIDSIZE;
            Render.instance.canvas.height = Global.GRIDSIZE;
            Render.instance.ctx = Render.instance.canvas.getContext('2d') as CanvasRenderingContext2D;
        }
        return Render.instance;
    }

    public drawLevel(playerX: number, playerY: number, vision: number) {
        this.drawGrid();
        this.drawRoomAt(7, 5, 10, 15);
        this.drawWallAt(15, 11, 15, 17);
        this.drawWallAt(9, 13, 13, 13);
        this.drawEndGoalAt(16, 16);
    }

    public drawPlayerVision(playerX: number, playerY: number, vision: number) {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';

        const minX = playerX - (vision + 0.5) * Global.CELLSIZE;
        const maxX = playerX + (vision + 0.5) * Global.CELLSIZE;
        const minY = playerY - (vision + 0.5) * Global.CELLSIZE;
        const maxY = playerY + (vision + 0.5) * Global.CELLSIZE;
        
        this.ctx.fillRect(0, 0, minX, Global.GRIDSIZE);
        this.ctx.fillRect(maxX, 0, Global.GRIDSIZE - maxX, Global.GRIDSIZE);
        this.ctx.fillRect(minX, 0, maxX - minX, minY);
        this.ctx.fillRect(minX, maxY, maxX - minX, Global.GRIDSIZE - maxY);

        //console.log('[' + minX + ',' + minY + '][' + maxX + ',' + maxY + ']');
    }

    // private playerHasVision(gridX: number, gridY: number, playerX: number, playerY: number, vision: number): boolean {
    //     if (gridX >= (playerX - vision) && gridX < (playerX + vision + 1) && gridY >= (playerY - vision) && gridY < (playerY + vision + 1)) {
    //         console.log('player has vision on [' + gridX + ',' + gridY + ']');
    //         return true;
    //     }

    //     console.log('player has NO vision on [' + gridX + ',' + gridY + ']');
    //     return false;
    // }

    public drawPlayerAt(gridX: number, gridY: number) {
        const x = gridX * Global.CELLSIZE + (Global.CELLSIZE / 2);
        const y = gridY * Global.CELLSIZE + (Global.CELLSIZE / 2);
                
        this.drawPlayer(x, y);
    }

    public drawPlayer(x: number, y: number) {
        const r = Global.CELLSIZE / 2;

        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.playerColor;
        this.ctx.fill();
    }

    public clearGrid() {
        this.ctx.clearRect(0, 0, Global.GRIDSIZE, Global.GRIDSIZE);
    }

    public clearSquareAt(startX: number, startY: number, width: number, height: number) {
        const x = startX * Global.CELLSIZE;
        const y = startY * Global.CELLSIZE;
        const w = width * Global.CELLSIZE;
        const h = height * Global.CELLSIZE;

        this.clearSquare(x, y, w, h);
    }

    public clearSquare(x: number, y: number, w: number, h: number) {
        this.ctx.clearRect(x, y, w, h);
    }

    public redrawLevel(playerX: number, playerY: number, vision: number) {
        this.clearGrid();
        this.drawLevel(playerX, playerY, vision);
    }

    public drawGrid() {
        this.ctx.beginPath();

        this.ctx.strokeStyle = this.gridlinesColor;
        this.ctx.lineWidth = Global.CELLBORDER;

        for (let i = 0; i <= Global.GRIDSIZE; i += Global.CELLSIZE) {
            //horizontale lijn
            this.ctx.moveTo(0, i);
            this.ctx.lineTo(Global.GRIDSIZE, i);
            //verticale lijn
            this.ctx.moveTo(i, 0);
            this.ctx.lineTo(i, Global.GRIDSIZE);
        }

        this.ctx.stroke();
    }

    public drawRoomAt(startX: number, startY: number, width: number, height: number) {
        const x = startX * Global.CELLSIZE + (Global.CELLSIZE / 2);
        const y = startY * Global.CELLSIZE + (Global.CELLSIZE / 2);
        const w = width * Global.CELLSIZE;
        const h = height * Global.CELLSIZE;

        this.drawRoom(x, y, w, h);
    }

    private drawRoom(x: number, y: number, w: number, h: number) {    
        this.ctx.beginPath();    
        this.ctx.strokeStyle = this.roomColor;
        this.ctx.lineWidth = Global.CELLSIZE;    
        this.ctx.strokeRect(x, y, w, h);
    }

    public drawWallUnitAt(gridX: number, gridY: number) {
        const x = gridX * Global.CELLSIZE;
        const y = gridY * Global.CELLSIZE;

        this.drawWallUnit(x, y);
    }

    public drawWallUnit(x: number, y: number) {
        this.ctx.fillStyle = this.wallColor;
        this.ctx.fillRect(x, y, Global.CELLSIZE, Global.CELLSIZE);
    }
    
    public drawWallAt(startX: number, startY: number, endX: number, endY: number) {
        if (startX < endX) {
            let x = startX;
            while (x <= endX) {
                this.drawWallUnitAt(x, startY);
                x++;
            }
        }
    
        if (startY < endY) {
            let y = startY;
            while (y <= endY) {
                this.drawWallUnitAt(startX, y);
                y++;
            }
        }
    }

    public drawEndGoalAt(gridX: number, gridY: number) {
        let x = gridX * Global.CELLSIZE + (Global.CELLSIZE / 2);
        let y = gridY * Global.CELLSIZE + (Global.CELLSIZE / 2);
        this.drawEndGoal(x, y);
    }
    
    private drawEndGoal(x: number, y: number) {
        const r = Global.CELLSIZE / 3;
    
        this.ctx.beginPath();
        this.ctx.arc(x, y, r, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.endGoalColor;
        this.ctx.fill();
    }
}