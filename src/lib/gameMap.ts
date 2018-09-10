import { Tile } from '../types/tile'
import { MapOct } from '../types/mapOct'
import { MapSquare } from '../types/mapSquare'

export class GameMap {

  tiles: Map<string, MapSquare> | Map<string, MapOct>;
  startTile: MapSquare | MapOct

  constructor(game: string) {
    const games: any = {
      action_castle: {
        title: "Action Castle",
        copyright: "Memento Mori Games",
        startTile: 'cottage',
        tileType: "square",
        tiles: {
          cottage: {
            name: "Cottage",
            description: "You are standing in a small cottage.",
            objects: [ "Fishing Pole" ],
            value: 1,
            exits: {
              right: "gardenPath"
            }
          },
          gardenPath: {
            name: "Lush Garden Path",
            description: "You are standing on a lush garden path. There is a cottage here.",
            objects: [ "Rose Bush" ],
            value: 1,
            exits: {
              left: "cottage",
              bottom: "fishingPond"
            }
          },
          fishingPond: {
            name: "Fishing Pond",
            description: "You are at the edge of a small fishing pond.",
            objects: [ "Fish" ],
            value: 1,
            exits: {
              top: "gardenPath"
            }
          }
        },
        objects: []
      }
    }

    this.tiles = this.loadTiles(games[game].tileType, games[game].tiles)
    this.startTile = <MapSquare | MapOct> this.tiles.get(games[game].startTile)
  }

  loadTiles(type: string, rawTiles: Tile[]) {
    let loadedSquares = new Map<string, MapSquare>();
    let loadedOcts = new Map<string, MapOct>();

    // Create Tiles
    Object.keys(rawTiles).forEach((key:string)=>{
      let tile = rawTiles[key];
      switch(type) {
        case 'octagon':
          loadedOcts.set(key, new MapOct(tile.name, tile.description, tile.value, tile.objects))
          break
        default:
          loadedSquares.set(key, new MapSquare(tile.name, tile.description, tile.value, tile.objects))
          break
      }
    })

    // Assign Exits
    let exitMap: Map<string, MapSquare> | Map<string, MapOct>;
    switch(type) {
      case 'octagon':
        exitMap = loadedOcts
        break
      default:
        exitMap = loadedSquares
        break
    }
    exitMap.forEach((tile, key) => {
      const rawExits = rawTiles[key].exits
      const currentTile = exitMap.get(key)
      Object.keys(rawExits).forEach((exitKey:string)=>{
        currentTile.addExit(exitKey, exitMap.get(rawExits[exitKey]))
      })
    })

    return exitMap
  }
}
