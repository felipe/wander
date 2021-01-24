import chalk from 'chalk';

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

  public wasTaken(itemName: string) {
    const item = this.items.get(itemName);
    return item ? item.wasTaken() : false;
  }

  public getName(itemName: string) {
    let response = '';
    const item = this.items.get(itemName);
    if (item) {
      response = item.getName();
    }
    return response;
  }

  public getItem(location: Tile, itemName: string) {
    const formattedItemName = this.getItemId(itemName);
    const item = this.items.get(formattedItemName);
    return item && this.validate(location, item, formattedItemName)
      ? item
      : null;
  }

  public describe(location: Tile, itemName: string) {
    const formattedItemName = this.getItemId(itemName);
    const item = this.items.get(formattedItemName);
    return item && this.validate(location, item, formattedItemName)
      ? `${item.getDescription()}${this.getTextItemList(
          location,
          item.getItems()
        )}`
      : `There is no ${itemName} here.`;
  }

  public getItemId(subject: string) {
    const camelizedString = this.camelize(subject);
    return this.items.has(camelizedString)
      ? camelizedString
      : this.findByAlias(camelizedString);
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

  private getTextItemList(location: Tile, items: string[]): string {
    let itemString = ` It contains `;

    items.forEach((item) => {
      const currentItem = this.getItem(location, item);
      itemString += `${chalk.underline.bold(currentItem?.getName())}`;
    });

    return items.length > 0 ? itemString : '';
  }

  private findByAlias(subject: string): string {
    let name = '';
    // Todo: Clean this up, this foreach might not be the best way of doing it and the catch is not great
    try {
      this.items.forEach((i) => {
        name = i.hasAlias(subject) ? i.getId() : '';
        if (name !== '') {
          throw Error(); // This is just to break out of the loop
        }
      });
    } catch (e) {
      // Silence
    }
    return name;
  }

  private camelize(phrase: string): string {
    return phrase
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }
}
