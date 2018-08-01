import WorldDto from "./worldDto";

export interface LevelDto {
    levelNr: number;
    name: string;
    difficulty: Difficulty;
    world: WorldDto;
}

export enum Difficulty {
    Easy = 1,
    Normal = 2,
    Hard = 3
}