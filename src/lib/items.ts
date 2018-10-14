import { Item } from '../types/item'
import { Tile } from '../types/tile'

export class Items {
  _items: Map<string, Item>
  inventory: Map<string, Item>

  constructor(items: {}) {
    this._items = this.loadItems(items)
    this.inventory = new Map<string, Item>()
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

  public describe(location: Tile, itemName: string) {
    let response: string
    let formattedItemName = this.camelize(itemName)
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

  private camelize (string: string): string {
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    }).replace(/\s+/g, '');
  }
}
