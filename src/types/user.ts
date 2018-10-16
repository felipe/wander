import { Item } from './item'

export interface User {
  _id: string //TODO: Should be UUID
  _name: string
  _inventory: Map<string, Item>
}

export class User {
  _id: string
  _name: string
  _inventory: Map<string, Item> =  new Map<string, Item>()

  constructor(id: string) {
    this._id = this._name = id //TODO: Split once UUIDs are set
  }

  public addToInventory(item: Item) {
    this._inventory.set(item.getId(), item)
    console.log(`${item.getName()} has been added to your Inventory`)
  }

  public checkInventory(itemName: string) {
    return this._inventory.get(itemName)
  }

  public listInventory() {
    return this._inventory.keys()
  }
}
