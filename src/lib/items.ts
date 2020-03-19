// import { User } from '../types/user'
import { Item } from '../types/item';
import { Tile } from '../types/tile';

export class Items {
  public items: Map<string, Item>;
  constructor(items: {}) {
    this.items = this.loadItems(items);
  }

  public isHidden(itemName: string) {
    const item = this.items.get(itemName);
    return item ? item.isHidden() : false;
  }

  public getName(itemName: string) {
    let response = '';
    const item = this.items.get(itemName);
    if (item) {
      response = item.getName();
    }
    return response;
  }

  public getItem(itemName: string) {
    return this.items.get(this.getItemId(itemName));
  }

  public describe(location: Tile, itemName: string) {
    let response: string;
    const formattedItemName = this.getItemId(itemName);
    const item = this.items.get(formattedItemName);
    response =
      item && this.validate(location, item, formattedItemName)
        ? item.getDescription()
        : `There is no ${itemName} here.`;

    return response;
  }

  public getItemId(subject: string) {
    return this.camelize(subject);
  }

  private loadItems(rawItems: {}): Map<string, Item> {
    const loadedItems: Map<string, Item> = new Map<string, Item>();
    // Create Items
    Object.keys(rawItems).forEach((key: string) => {
      const item = rawItems[key];
      loadedItems.set(key, new Item(key, item));
    });
    return loadedItems;
  }

  // Make sure the item is at the location or in the inventory
  private validate(
    location: Tile,
    item: Item | undefined,
    formattedItemName: string
  ) {
    return (
      item && location.items.includes(formattedItemName) && !item.isDestroyed()
    );
  }

  private camelize(phrase: string): string {
    return phrase
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
