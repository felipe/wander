import { GameMap } from './gameMap'
import { Select } from './select'
import { MapOct } from '../types/mapOct'
import { MapSquare } from '../types/mapSquare'

enum MovementActions {
    up,
    down,
    left,
    right,
}

export class GameController {
  map: GameMap
  currentTile: MapSquare | MapOct
  constructor(map: GameMap) {
    this.map = map
    this.currentTile = this.map.startTile
    this.enterTile()
  }

  actionQuery() {
    let selectedAction = Select.getAction().toLowerCase()
    console.log('THIS IS THE ACTION ', selectedAction)

    if(Object.values(MovementActions).includes(selectedAction)){
      console.log('Movement Action')
      if(selectedAction == 'right') {
        this.currentTile = <MapSquare | MapOct> this.currentTile.getRight()
      }
      this.enterTile()
    } else if (selectedAction === "examine") {
      console.log('Other Action')
      this.performAction(selectedAction)
    } else {
      console.log('Invalid Action')
      this.actionQuery()
    }
  }

  //enterTile(tile: MapSquare | MapOct) {
  enterTile() {
    this.currentTile.printFullDescription()
    this.currentTile.printExits()
    this.actionQuery()
  }

  performAction(action: string) {
    console.log('performed action')
    this.actionQuery()
  }
}
