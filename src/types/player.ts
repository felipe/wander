import { Item } from './item';
import { User } from './user';

export class Player implements User {
  _name: string;
  _inventory: ReadonlyArray<Item>;

  constructor(name: string, inventory: ReadonlyArray<Item>) {
    this._name = name;
    this._inventory = inventory;
  }

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}
