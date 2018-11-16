import { MapSquare } from './MapSquare';

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
