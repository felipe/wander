import { MapOct } from './mapOct';
import { Tile } from './tile';

export interface MapSquare extends Tile {
  name: string;
  description: string;
  value: number;
  items: string[];

  exits: string[];

  exitAlias: Map<string, string>;

  top: MapSquare | MapOct | null;
  left: MapSquare | MapOct | null;
  right: MapSquare | MapOct | null;
  bottom: MapSquare | MapOct | null;

  topLeft: MapSquare | MapOct | null;
  topRight: MapSquare | MapOct | null;
  bottomLeft: MapSquare | MapOct | null;
  bottomRight: MapSquare | MapOct | null;

  getTop(): MapSquare | MapOct | null;
  getTopRight(): MapSquare | MapOct | null;
  getRight(): MapSquare | MapOct | null;
  getBottomRight(): MapSquare | MapOct | null;
  getBottom(): MapSquare | MapOct | null;
  getBottomLeft(): MapSquare | MapOct | null;
  getLeft(): MapSquare | MapOct | null;
  getTopLeft(): MapSquare | MapOct | null;
  getOut(): MapSquare | MapOct | null;

  addExit(direction: string, tile: MapSquare | MapOct, alias?: string): void;
  getExits(): string;
}

export class MapSquare extends Tile {
  constructor(
    name: string,
    description: string,
    value: number,
    items: string[],
    top: MapSquare | MapOct | null = null,
    left: MapSquare | MapOct | null = null,
    right: MapSquare | MapOct | null = null,
    bottom: MapSquare | MapOct | null = null
  ) {
    super(name, description, value, items);
    this.top = top;
    if (top != null) {
      this.exits.push('top');
    }
    this.left = left;
    if (left != null) {
      this.exits.push('left');
    }
    this.right = right;
    if (right != null) {
      this.exits.push('right');
    }
    this.bottom = bottom;
    if (bottom != null) {
      this.exits.push('bottom');
    }
  }
}
