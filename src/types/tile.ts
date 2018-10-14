import { Meta } from './meta'
import { Oct } from './oct'
import { MapOct } from './mapOct'
import { MapSquare } from './mapSquare'

const chalk = require('chalk')

export interface Tile extends Meta, Oct {
}

export  class Tile implements Tile {
    public name = ""
    public description = ""
    public value = 0
    public items: string[] = []

    public exits: string[] = []

    public exitAlias: Map<string, string> = new Map<string, string>()

    public top: MapSquare | MapOct | null = null
    public left: MapSquare | MapOct | null = null
    public right: MapSquare | MapOct | null = null
    public bottom: MapSquare | MapOct | null = null

    public topLeft: MapSquare | MapOct | null = null
    public topRight: MapSquare | MapOct | null = null
    public bottomLeft: MapSquare | MapOct | null = null
    public bottomRight: MapSquare | MapOct | null = null

    constructor(name: string, description: string, value: number, items: string[]){
      this.name = name
      this.description = description
      this.value = value
      this.items = items
    }

    public printFullDescription() {
      console.log(this.getTextFullDescription())
    }

    public printExits() {
      let exitsText = this.getTextExitList()
      if(exitsText.length === 0) {
        console.log(`There are no exits.`)
      } else {
        console.log(`Exits are: \r\n ${exitsText}`)
      }
    }

    public addExit(direction: string, tile: MapSquare | MapOct, alias?: string) {
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
      if(alias) { this.exitAlias.set(direction, alias) }
      this.exits.push(direction)
    }

    public getOut(): MapSquare | MapOct | null {
      if (this.exits.length === 1) {
        if(this.top !== null) {
          return this.top
        } else if(this.left !== null) {
          return this.left
        } else if(this.right !== null) {
          return this.right
        } else if(this.bottom !== null) {
          return this.bottom
        } else {
          console.log('This is not setup')
        }
      } else {
        console.log('Either no exits, or more than one exit. Out is not enough description.')
      }
      return null
    }

    private setTop(tile: MapSquare | MapOct) {
      this.top = tile
    }

    public getTop() {
      return this.top
    }

    private setLeft(tile: MapSquare | MapOct) {
      this.left = tile
    }

    public getLeft() {
      return this.left
    }

    private setRight(tile: MapSquare | MapOct) {
      this.right = tile
    }

    public getRight() {
      return this.right
    }

    private setBottom(tile: MapSquare | MapOct) {
      this.bottom = tile
    }

    public getBottom() {
      return this.bottom
    }

    private setTopLeft(tile: MapSquare | MapOct) {
      this.topLeft = tile
    }

    public getTopLeft() {
      return this.topLeft
    }

    private setTopRight(tile: MapSquare | MapOct) {
      this.topRight = tile
    }

    public getTopRight() {
      return this.topRight
    }

    private setBottomLeft(tile: MapSquare | MapOct) {
      this.bottomLeft = tile
    }

    public getBottomLeft() {
      return this.bottomLeft
    }

    private setBottomRight(tile: MapSquare | MapOct) {
      this.bottomRight = tile
    }

    public getBottomRight() {
      return this.bottomRight
    }

    private getTextExitList() {
      let exits = ""
      this.exits.forEach((exit, index)=>{
        exits += `${chalk.bold((this.exitAlias.get(exit))? this.exitAlias.get(exit) : exit)}`
        exits += (index < this.exits.length-1) ? ", " : ""
      })
      return exits
    }

    private getTextFullDescription() {
      return this.description + " " + this.getTextItemList()
    }

    private getTextItemList() {
      let items = ""
      this.items.forEach((item)=>{
        items += `There is a ${chalk.underline.bold(item)} here. `
      })
      return items
    }
}
