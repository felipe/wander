import { Item } from '../types/item';

export class Users {
  public inventory: Map<string, Item> = new Map<string, Item>();

  constructor() {
    // silence
  }
}
