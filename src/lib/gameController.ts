import { GameMap } from './gameMap'
import { Items } from './items'
import { User } from '../types/user'
import { Select } from './select'
import { Parse } from './parse'
import { MapOct } from '../types/mapOct'
import { MapSquare } from '../types/mapSquare'
import { AquireActions, ManipulationActions, MovementActions, ObservationActions } from '../types/actions'

const chalk = require('chalk')

export class GameController {
  user: User
  items: Items
  map: GameMap
  currentTile: MapSquare | MapOct
  constructor(map: GameMap, items: Items) {
    this.map = map
    this.items = items
    this.user = new User('clu')
    this.currentTile = this.map.startTile
    this.enterTile()
  }

  actionQuery() {
    let inputString = Select.getAction().trim()
    let parsedInput = new Parse(inputString)
    let selectedAction = parsedInput['action'].toLowerCase()
    let selectedSubject = parsedInput['subject']

    console.log(`>> THIS IS THE ACTION |${selectedAction}|`)

    // TODO: Move all this into the Parse class
    if (Object.values(AquireActions).includes(selectedAction)) {
      this.aquireAction(selectedAction, selectedSubject)
    } else if (Object.values(ManipulationActions).includes(selectedAction)) {
      this.manipulateAction(selectedAction)
    } else if (Object.values(MovementActions).includes(selectedAction)){
      console.log('Movement Action')
      if(selectedAction === 'out') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getOut())
      }
      if(selectedAction === 'top' || selectedAction === 'north') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getTop())
      }
      if(selectedAction === 'left' || selectedAction === 'west') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getLeft())
      }
      if(selectedAction === 'right' || selectedAction === 'east') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getRight())
      }
      if(selectedAction === 'bottom' || selectedAction === 'south') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getBottom())
      }
      if(selectedAction === 'top-left' || selectedAction === 'north-west') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getTopLeft())
      }
      if(selectedAction === 'top-right' || selectedAction === 'north-east') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getTopRight())
      }
      if(selectedAction === 'bottom-left' || selectedAction === 'south-west') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getBottomRight())
      }
      if(selectedAction === 'bottom-right' || selectedAction === 'south-east') {
        this.setTile(<MapSquare | MapOct> this.currentTile.getBottomRight())
      }
      this.enterTile()
    } else if (Object.values(ObservationActions).includes(selectedAction)) {
      console.log('Observation Action')
      this.observeAction(selectedAction, selectedSubject)
    } else if (selectedAction === "exit") {
      process.exit(0)
    } else {
      console.log('Invalid Action')
      this.actionQuery()
    }
  }

  setTile(tile: MapSquare | MapOct | null) {
    if(tile != null) {
      this.currentTile = tile
    } else {
      console.log("Invalid Direction")
    }
  }

  enterTile() {
    console.log()
    this.printFullDescription()
    this.currentTile.printExits()
    this.actionQuery()
  }

  aquireAction(action: string, subject: string) {
    console.log('Aquire action')
    let item = this.items.getItem(subject)
    if(item) {
      this.user.addToInventory(item)
    }
    console.log(this.user.listInventory())
    this.actionQuery()
  }

  manipulateAction(action: string) {
    console.log('Moved/Enabled Action')
    this.actionQuery()
  }

  observeAction(action: string, subject: string) {
    console.log(this.items.describe(this.currentTile, subject))
    this.actionQuery()
  }

  private printFullDescription() {
    console.log(this.currentTile.description + " " + this.getTextItemList())
  }

  private getTextItemList() {
    let items = ""
    this.currentTile.items.forEach((item)=>{
      items += `There is a ${chalk.underline.bold(this.items.getName(item))} here. `
    })
    return items
  }
}
