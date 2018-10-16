import { Item } from '../types/item'

export class Users {
  inventory: Map<string, Item> =  new Map<string, Item>()

  constructor() {
  }
}
