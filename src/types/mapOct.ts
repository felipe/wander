import { MapSquare } from './mapSquare';

export interface MapOct extends MapSquare {
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

export class MapOct extends MapSquare {
  constructor(
    name: string,
    description: string,
    value: number,
    items: string[],
    topLeft: MapSquare | MapOct | null = null,
    top: MapSquare | MapOct | null = null,
    topRight: MapSquare | MapOct | null = null,
    left: MapSquare | MapOct | null = null,
    right: MapSquare | MapOct | null = null,
    bottomLeft: MapSquare | MapOct | null = null,
    bottom: MapSquare | MapOct | null = null,
    bottomRight: MapSquare | MapOct | null = null
  ) {
    super(name, description, value, items, top, left, right, bottom);
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }
}
