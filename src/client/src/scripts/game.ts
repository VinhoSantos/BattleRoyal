import * as signalR from '@aspnet/signalr';
import { Level } from './level';
import WorldDto from '../dtos/worldDto'; 
import { Player } from './player';
import { Difficulty } from '../dtos/levelDto';

export default class Game {
    
    private level: Level;
    private player: Player;
    private server = 'http://localhost:60860';
    private connection: signalR.HubConnection;

    public start() {
        this.setupConnection();

        this.level = new Level(1, "Trainingslevel", Difficulty.Easy);
        this.player = new Player(12, 10);

        this.level.start();
        this.player.init();

        window.addEventListener("keydown", event => this.keydown(event));
    }

    private setupConnection() {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.server}/hubs/client`)
            .build();

        this.connectToServer();

        //setTimeout(() => {
        //    this.disconnectFromServer();            
        //}, 3000);
    }

    private connectToServer(): any {
        
        this.connection.start()
            .then(() => console.log('connected to hub'))
            .catch((err: any) => console.error(err.toString()));
    }

    private disconnectFromServer(): any {
        
        this.connection.stop()
            .then(() => console.log('dicconnected from hub'))
            .catch((err: any) => console.error(err.toString()));
    }

    private keydown(event: KeyboardEvent) {
        if (event.defaultPrevented || this.player.isMoving) {
            return; // Should do nothing if the default action has been cancelled
        }

        this.player.isMoving = true;

        switch (event.code) {
            case 'ArrowUp':
                this.player.moveUp();
                break;
            case 'ArrowDown':
                this.player.moveDown();
                break;
            case 'ArrowLeft':
                this.player.moveLeft();
                break;
            case 'ArrowRight':
                this.player.moveRight();
                break;
        }
    }
}