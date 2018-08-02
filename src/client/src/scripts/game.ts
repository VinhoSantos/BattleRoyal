import * as signalR from '@aspnet/signalr';
import Render from './render';
import { Level } from './level';
import WorldDto from '../dtos/worldDto'; 
import { Player } from './player';
import { Difficulty } from '../dtos/levelDto';

export default class Game {
    
    private render: Render;
    private level: Level;
    private player: Player;
    private server = 'http://localhost:60860';
    private connection: signalR.HubConnection;

    constructor() {
        this.render = Render.getInstance();
    }

    public start() {
        
        this.drawLoadingScreen();
        this.setupConnection();               
    }

    private setupConnection() {

        this.connection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.server}/hubs/client`)
            .build();

        this.connectToServer();        
    }

    private connectToServer(): void {
        
        this.connection.start()
            .then(() => {
                console.log('connected to hub');
                this.connectPlayer();
            })
            .catch((err: any) => console.error(err.toString()));
    }

    private connectPlayer(): void {
        this.connection.invoke('Connect', 'Speler 1')
            .then(() => {
                console.log('Speler 1 geconnecteerd');

                this.startLevel();                
                
                window.addEventListener("keydown", event => this.keydown(event));
                window.addEventListener("beforeunload", event => this.disconnectFromServer());
            })
            .catch((err: any) => console.error(err.toString()));
    }

    private drawLoadingScreen(): void {
        this.render.drawLoadingScreen();
    }

    private startLevel(): void {
        this.connection.invoke("OnStartLevel").catch(err => console.error(err.toString()))
        this.level = new Level(1, "Trainingslevel", Difficulty.Easy);
        this.player = new Player(12, 10);

        this.level.start();
        this.player.init();
    }

    private disconnectFromServer(): void {
        
        this.connection.stop()
            .then(() => console.log('disconnected from hub'))
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