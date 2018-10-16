import { User } from '../types/user'
import { Item } from '../types/item'
import { Tile } from '../types/tile'

export class Items {
  _items: Map<string, Item>
  constructor(items: {}) {
    this._items = this.loadItems(items)
  }

  private loadItems(rawItems: {}): Map<string, Item> {
    let loadedItems: Map<string, Item> = new Map<string, Item>()
    // Create Items
    Object.keys(rawItems).forEach((key:string)=>{
      let item = rawItems[key]
      loadedItems.set(key, new Item(key, item))
    })
    return loadedItems
  }

  public getName(itemName: string) {
    let response = ''
    let item = this._items.get(itemName)
    if (item) {
      response = item.getName()
    }
    return response
  }

  public getItem(itemName: string) {
    return this._items.get(this.getItemId(itemName))
  }

  public describe(location: Tile, itemName: string) {
    let response: string
    let formattedItemName = this.getItemId(itemName)
    let item = (this._items.get(formattedItemName))
    if (item && this.validate(location, item, formattedItemName)) {
      response = item.getDescription()
    } else {
      response = `There is no ${itemName} here.`
    }
    return response
  }

  // Make sure the item is at the location or in the inventory
  private validate(location: Tile, item: Item | undefined, formattedItemName: string) {
    return (item && location.items.includes(formattedItemName) && !item.isDestroyed())
  }

  public getItemId (subject: string) {
    return this.camelize(subject)
  }

  private camelize (phrase: string): string {
    return phrase.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
}
