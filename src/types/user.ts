import { Item } from './item';

export class User {
  private readonly id: string;
  private readonly name: string;
  private inventory: Map<string, Item> = new Map<string, Item>();

  constructor(id: string) {
    this.id = id;
    this.name = id;
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public addToInventory(item: Item): string {
    this.inventory.set(item.getId(), item);
    return `${item.getName()} has been added to your Inventory`;
  }

  public checkInventory(itemName: string): Item | undefined {
    return this.inventory.get(itemName);
  }

  public listInventory(): string {
    let list = '';
    this.inventory.forEach(item => {
      const nl = list !== '' ? '\r\n' : '';
      list = list + nl + `${item.getQuantity()}x ${item.getName()}`;
    });
    return list;
  }
}
