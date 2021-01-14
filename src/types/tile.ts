import { MapOct } from './mapOct';
import { MapSquare } from './mapSquare';
import { Meta } from './meta';
import { Oct } from './oct';

import chalk from 'chalk';

export interface Tile extends Meta, Oct {}

export class Tile implements Tile {
  public id = '';
  public name = '';
  public description = '';
  public detailedDescription = '';
  public value = 0;
  public items: string[] = [];

  public exits: string[] = [];

  public exitAlias: Map<string, string> = new Map<string, string>();

  // x axis
  public top: MapSquare | MapOct | null = null;
  public left: MapSquare | MapOct | null = null;
  public right: MapSquare | MapOct | null = null;
  public bottom: MapSquare | MapOct | null = null;

  public topLeft: MapSquare | MapOct | null = null;
  public topRight: MapSquare | MapOct | null = null;
  public bottomLeft: MapSquare | MapOct | null = null;
  public bottomRight: MapSquare | MapOct | null = null;

  // y axis
  public up: MapSquare | MapOct | null = null;
  public down: MapSquare | MapOct | null = null;

  constructor(
    id: string,
    name: string,
    description: string,
    detailedDescription: string,
    value: number,
    items: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.detailedDescription = detailedDescription;
    this.value = value;
    this.items = items;
  }

  public getFullDescription(): string {
    return this.getTextFullDescription();
  }

  public getExit(direction: string): MapSquare | MapOct | null {
    switch (direction) {
      // x axis
      case 'top':
        return this.getTop();
      case 'left':
        return this.getLeft();
      case 'right':
        return this.getRight();
      case 'bottom':
        return this.getBottom();
      case 'topLeft':
        return this.getTopLeft();
      case 'topRight':
        return this.getTopRight();
      case 'bottomLeft':
        return this.getBottomLeft();
      case 'bottomRight':
        return this.getBottomRight();

      // y axis
      case 'up':
        return this.getUp();
      case 'down':
        return this.getDown();
    }

    return null;
  }

  public getExits(): string {
    const exitsText = this.getTextExitList();
    if (exitsText.length === 0) {
      return `There are no exits.`;
    } else {
      return `Exits are: \r\n ${exitsText}`;
    }
  }

  public addExit(direction: string, tile: MapSquare | MapOct, alias?: string) {
    switch (direction) {
      // x axis
      case 'top':
        this.setTop(tile);
        break;
      case 'left':
        this.setLeft(tile);
        break;
      case 'right':
        this.setRight(tile);
        break;
      case 'bottom':
        this.setBottom(tile);
        break;
      case 'topLeft':
        this.setTopLeft(tile);
        break;
      case 'topRight':
        this.setTopRight(tile);
        break;
      case 'bottomLeft':
        this.setBottomLeft(tile);
        break;
      case 'bottomRight':
        this.setBottomRight(tile);
        break;

      // y axis
      case 'up':
        this.setUp(tile);
        break;
      case 'down':
        this.setDown(tile);
        break;
    }
    if (alias) {
      this.exitAlias.set(direction, alias);
    }
    this.exits.push(direction);
  }

  public getIn(): MapSquare | MapOct | null {
    const inside: string[] = [];
    this.exitAlias.forEach((alias, tile) => {
      // TODO: This wont work if there is more than one "in" location in the tile.
      if (alias.startsWith('In ')) {
        inside.push(tile);
      }
    });

    return inside.length === 1 ? this.getExit(inside[0]) : null;
  }

  // TODO: This only works with squares in the x axis
  public getOut(): MapSquare | MapOct | null {
    if (this.exits.length === 1) {
      if (this.top !== null) {
        return this.top;
      } else if (this.left !== null) {
        return this.left;
      } else if (this.right !== null) {
        return this.right;
      } else if (this.bottom !== null) {
        return this.bottom;
      }
    }
    // console.log('Either no exits, or more than one exit. Out is not enough description.')

    return null;
  }

  // x axis gets
  public getTop(): MapSquare | MapOct | null {
    return this.top;
  }

  public getLeft(): MapSquare | MapOct | null {
    return this.left;
  }

  public getRight(): MapSquare | MapOct | null {
    return this.right;
  }

  public getBottom(): MapSquare | MapOct | null {
    return this.bottom;
  }

  public getTopLeft(): MapSquare | MapOct | null {
    return this.topLeft;
  }

  public getTopRight(): MapSquare | MapOct | null {
    return this.topRight;
  }

  public getBottomLeft(): MapSquare | MapOct | null {
    return this.bottomLeft;
  }

  public getBottomRight(): MapSquare | MapOct | null {
    return this.bottomRight;
  }

  // y axis gets
  public getUp(): MapSquare | MapOct | null {
    return this.up;
  }

  public getDown(): MapSquare | MapOct | null {
    return this.down;
  }

  // x axis sets
  private setTop(tile: MapSquare | MapOct): void {
    this.top = tile;
  }

  private setLeft(tile: MapSquare | MapOct): void {
    this.left = tile;
  }

  private setRight(tile: MapSquare | MapOct): void {
    this.right = tile;
  }

  private setBottom(tile: MapSquare | MapOct): void {
    this.bottom = tile;
  }

  private setTopLeft(tile: MapSquare | MapOct): void {
    this.topLeft = tile;
  }

  private setTopRight(tile: MapSquare | MapOct): void {
    this.topRight = tile;
  }

  private setBottomLeft(tile: MapSquare | MapOct): void {
    this.bottomLeft = tile;
  }

  private setBottomRight(tile: MapSquare | MapOct): void {
    this.bottomRight = tile;
  }

  // y axis sets
  private setUp(tile: MapSquare | MapOct): void {
    this.up = tile;
  }

  private setDown(tile: MapSquare | MapOct): void {
    this.down = tile;
  }

  private getTextExitList(): string {
    let exits = '';
    this.exits.forEach((exit: string, index) => {
      exits += `${chalk.bold(
        this.exitAlias.get(exit) ? (this.exitAlias.get(exit) as string) : exit
      )}`;
      exits += index < this.exits.length - 1 ? ', ' : '';
    });
    return exits;
  }

  private getTextFullDescription(): string {
    return this.description + ' ' + this.getTextItemList();
  }

  private getTextItemList(): string {
    let items = '';
    this.items.forEach((item) => {
      items += `There is a ${chalk.underline.bold(item)} here. `;
    });
    return items;
  }
}
