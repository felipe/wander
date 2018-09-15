import { MapOct } from './mapOct'
import { Tile } from './tile'

export class MapSquare extends Tile {
  constructor(name: string,
              description: string,
              value: number, items: string[],
              top: MapSquare | MapOct | null = null,
              left: MapSquare | MapOct | null = null,
              right: MapSquare | MapOct | null = null,
              bottom: MapSquare | MapOct | null = null) {
    super(name, description, value, items);
    this.top = top
    if(top != null) { this.exits.push("top") }
    this.left = left
    if(left != null) { this.exits.push("left") }
    this.right = right
    if(right != null) { this.exits.push("right") }
    this.bottom = bottom
    if(bottom != null) { this.exits.push("bottom") }
  }
}
