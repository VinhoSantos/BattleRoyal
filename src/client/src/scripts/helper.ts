export class Global {
    static readonly GRIDSIZE = 800; //breedte en hoogte van het grid
    static readonly CELLSIZE = 32; //breedte en hoogte van 1 cell in het grid
    static readonly CELLBORDER = 2;
}

export class GameHelper {
    static GetCell(coordinate: number): number {
        return coordinate * Global.CELLSIZE + Global.CELLSIZE / 2;
    }
}