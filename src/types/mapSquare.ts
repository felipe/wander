import { MapOct } from './MapOct';
import { Tile } from './tile';

const chalk = require('chalk');

export class MapSquare implements Tile {
  public name = "";
  public description = "";
  public value = 0;
  public objects: string[] = [];

  public exits: string[] = [];

  public topLeft: MapSquare | MapOct | null = null;
  public topRight: MapSquare | MapOct | null = null;
  public bottomLeft: MapSquare | MapOct | null = null;
  public bottomRight: MapSquare | MapOct | null = null;

  public top: MapSquare | MapOct | null = null;
  public left: MapSquare | MapOct | null = null;
  public right: MapSquare | MapOct | null = null;
  public bottom: MapSquare | MapOct | null = null;

  constructor(name: string,
              description: string,
              value: number, objects: string[],
              top: MapSquare | MapOct | null = null,
              left: MapSquare | MapOct | null = null,
              right: MapSquare | MapOct | null = null,
              bottom: MapSquare | MapOct | null = null) {

    this.name = name;
    this.description = description;
    this.value = value;
    this.objects = objects;

    this.top = top;
    if(top != null) { this.exits.push("top"); }
    this.left = left;
    if(left != null) { this.exits.push("left"); }
    this.right = right;
    if(right != null) { this.exits.push("right"); }
    this.bottom = bottom;
    if(bottom != null) { this.exits.push("bottom"); }
  }

  public printFullDescription() {
    console.log(this.getTextFullDescription());
  }

  public printExits() {
    let exitsText = this.getTextExitList();
    if(exitsText.length === 0) {
      console.log(`There are no exits.`);
    } else {
      console.log(`Exits are: \r\n ${exitsText}`);
    }
  }

  public addExit(direction: string, tile: MapSquare | MapOct) {
    switch(direction) {
      case 'top':
        this.setTop(tile)
        break
      case 'left':
        this.setLeft(tile)
        break
      case 'right':
        this.setRight(tile)
        break
      case 'bottom':
        this.setBottom(tile)
        break
      case 'topLeft':
        this.setTopLeft(tile)
        break
      case 'topRight':
        this.setTopRight(tile)
        break
      case 'bottomLeft':
        this.setBottomLeft(tile)
        break
      case 'bottomRight':
        this.setBottomRight(tile)
        break
    }
    this.exits.push(direction)
  }

  private setTop(tile: MapSquare | MapOct) {
    this.top = tile
  }
  private setLeft(tile: MapSquare | MapOct) {
    this.left = tile
  }
  private setRight(tile: MapSquare | MapOct) {
    this.right = tile
  }
  private setBottom(tile: MapSquare | MapOct) {
    this.bottom = tile
  }
  private setTopLeft(tile: MapSquare | MapOct) {
    this.topLeft = tile
  }
  private setTopRight(tile: MapSquare | MapOct) {
    this.topRight = tile
  }
  private setBottomLeft(tile: MapSquare | MapOct) {
    this.bottomLeft = tile
  }
  private setBottomRight(tile: MapSquare | MapOct) {
    this.bottomRight = tile
  }
  private getTextExitList() {
    let exits = "";
    this.exits.forEach((exit, index)=>{
      exits += `${chalk.bold(exit)}`;
      exits += (index == this.exits.length) ? ", " : "";
    });
    return exits;
  }

  private getTextFullDescription() {
    return this.description + " " + this.getTextObjectList();
  }

  private getTextObjectList() {
    let objects = "";
    this.objects.forEach((object)=>{
      objects += `There is a ${chalk.underline.bold(object)} here. `;
    });
    return objects;
  }
}
