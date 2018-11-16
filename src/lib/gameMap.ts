import { Game } from '../types/game';
import { MapOct } from '../types/mapOct';
import { MapSquare } from '../types/mapSquare';

export class GameMap {
  public tiles: Map<string, MapSquare> | Map<string, MapOct>;
  public startTile: MapSquare | MapOct;

  constructor(game: Game) {
    this.tiles = this.loadTiles(game.tileType, game.tiles);
    this.startTile = this.tiles.get(game.startTile) as MapSquare | MapOct;
  }

  public loadTiles(
    type: string,
    rawTiles: { [k: string]: MapSquare | MapOct } = {}
  ) {
    const loadedSquares: Map<string, MapSquare> = new Map<string, MapSquare>();
    const loadedOcts: Map<string, MapOct> = new Map<string, MapOct>();

    // Create Tiles
    Object.keys(rawTiles).forEach((key: string) => {
      const tile = rawTiles[key];
      switch (type) {
        case 'octagon':
          loadedOcts.set(
            key,
            new MapOct(tile.name, tile.description, tile.value, tile.items)
          );
          break;
        default:
          loadedSquares.set(
            key,
            new MapSquare(tile.name, tile.description, tile.value, tile.items)
          );
          break;
      }
    });

    // Assign Exits
    let exitMap: Map<string, MapSquare> | Map<string, MapOct>;
    switch (type) {
      case 'octagon':
        exitMap = loadedOcts;
        break;
      default:
        exitMap = loadedSquares;
        break;
    }
    exitMap.forEach((tile, key) => {
      const rawExits: string[] = rawTiles[key].exits;
      const rawExitAlias: Map<string, string> = rawTiles[key].exitAlias;
      const currentTile = exitMap.get(key);
      Object.keys(rawExits).forEach(exitKey => {
        currentTile!.addExit(
          exitKey,
          exitMap.get(rawExits[exitKey as any]) as MapSquare | MapOct,
          rawExitAlias[exitKey]
        );
      });
    });

    return exitMap;
  }
}
